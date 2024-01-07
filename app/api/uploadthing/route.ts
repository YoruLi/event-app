import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter, type OurFileRouter } from "./core";
// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
