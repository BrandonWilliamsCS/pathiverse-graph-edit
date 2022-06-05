import * as cors from "cors";
import * as express from "express";
import { getContent, getStoryList, getScene } from "./access";

export function startServer(apiAccessRoot: string, port: number) {
  const server = express();
  server.use(cors());
  // All api urls go through the dedicated router
  server.use("/api", buildApiRouter(apiAccessRoot));
  server.listen(port, () => {
    console.log(`Pathiverse edit server listening on port ${port}`);
  });
}

function buildApiRouter(apiAccessRoot: string) {
  const apiRouter = express.Router();
  // Story list
  apiRouter.get("/story/list.json", async (_, res) => {
    const storySpec = await getStoryList(apiAccessRoot);
    res.json(storySpec);
  });
  // Scene, based on story url
  apiRouter.get(
    "/story/:storyId/scene/*",
    async (req: express.Request<any>, res) => {
      const storyId = req.params.storyId;
      const scenePath = req.params[0];
      const scene = await getScene(apiAccessRoot, storyId, scenePath);
      res.json(scene);
    },
  );
  // Content, also based on story url
  apiRouter.get(
    "/story/:storyId/content/*",
    async (req: express.Request<any>, res) => {
      const storyId = req.params.storyId;
      const contentPath = req.params[0];
      const content = await getContent(apiAccessRoot, storyId, contentPath);
      res.type("text/plain");
      res.send(content);
    },
  );
  // Ensure that all other api urls are 404s.
  apiRouter.get("*", function (_, res) {
    res.status(404).send();
  });
  return apiRouter;
}
