import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server  // ✅ SSR حقيقي - كل الروتات هتتعمل render على السيرفر
  }
];
