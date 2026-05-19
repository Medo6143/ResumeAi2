// Vercel Serverless Function Bridge for Angular SSR
// This loads the compiled Angular Express server and forwards all requests to it.
export default async (req, res) => {
  const { reqHandler } = await import('../dist/resume-ai/server/server.mjs');
  return reqHandler(req, res);
};
