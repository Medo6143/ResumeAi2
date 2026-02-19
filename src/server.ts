import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

import { LANGUAGE } from './app/core/config/language.token';

/**
 * Helper function to parse cookies from request
 */
function parseCookies(cookieHeader?: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=');
    if (name) {
      cookies[name] = decodeURIComponent(rest.join('='));
    }
  });
  
  return cookies;
}

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  // Priority: 1. x-lang header, 2. lang cookie, 3. accept-language header, 4. default 'en'
  const cookies = parseCookies(req.headers.cookie);
  const xLangHeader = req.headers['x-lang'];
  const xLang = Array.isArray(xLangHeader) ? xLangHeader[0] : xLangHeader;
  
  const acceptLang = req.headers['accept-language'];
  const acceptLangStr = typeof acceptLang === 'string' 
    ? acceptLang.split(',')[0]?.split('-')[0]?.trim() 
    : undefined;
  
  const langStr = xLang || cookies['lang'] || acceptLangStr || 'en';
  const lang: string = typeof langStr === 'string' ? langStr : 'en';

  // Normalize language (only 'en' or 'ar' supported)
  const normalizedLang = (lang === 'ar' || lang.startsWith('ar')) ? 'ar' : 'en';

  angularApp
    .handle(req, {
      providers: [
        { provide: LANGUAGE, useValue: normalizedLang }
      ]
    })
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
