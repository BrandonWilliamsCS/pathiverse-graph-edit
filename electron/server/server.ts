import * as cors from "cors";
import * as express from "express";
import * as path from "path";
import { createScene } from "../pathiverse/ContentWithResponseScene";
import { NewScene } from "../pathiverse/NewScene";
import { buildSpecForNewStory, NewStory } from "../pathiverse/NewStory";
import { PathiverseDataSource } from "../pathiverse/PathiverseDataSource";
import { PathiverseFileAccess } from "../pathiverse/PathiverseFileAccess";
import { adjustScene, SceneEdit } from "../pathiverse/SceneEdit";

export function startServer(apiAccessRoot: string, port: number) {
  const server = express();
  server.use(cors());
  server.use(express.json());
  // All api urls go through the dedicated router
  server.use("/api", buildApiRouter(apiAccessRoot));
  server.listen(port, () => {
    console.log(`Pathiverse edit server listening on port ${port}`);
  });
}

function buildApiRouter(apiAccessRoot: string) {
  const fileAccess = new PathiverseFileAccess(apiAccessRoot);
  const dataSource = new PathiverseDataSource(fileAccess);
  const apiRouter = express.Router();
  // Story list
  apiRouter.get("/story/list.json", async (_, res) => {
    const storySpec = await dataSource.getStoryList();
    res.json(storySpec);
  });
  apiRouter.post("/story/create", async (req, res) => {
    const newStory: NewStory = req.body;
    const newStorySpec = buildSpecForNewStory(
      newStory,
      apiAccessRoot,
      (parts) => path.join(...parts),
    );
    await dataSource.saveStory(newStorySpec);
    // Make sure the story's initial scene is created, too.
    const scene = createScene(
      newStory.initialSceneId,
      newStory.initialSceneName,
    );
    await dataSource.saveScene(
      newStorySpec.id,
      newStorySpec.initialSceneIndicator.value,
      scene,
    );
    res.json(newStorySpec);
  });
  // Scene, based on story url
  apiRouter.get(
    "/story/:storyId/scenes",
    async (req: express.Request<any>, res) => {
      const { storyId }: { storyId: string } = req.params;
      const scenes = await dataSource.getScenes(storyId);
      res.json(scenes);
    },
  );
  apiRouter.get(
    "/story/:storyId/scene/*",
    async (req: express.Request<any>, res) => {
      const { storyId }: { storyId: string } = req.params;
      const [scenePath]: [string] = req.params;
      const scene = await dataSource.getScene(storyId, scenePath);
      res.json(scene);
    },
  );
  apiRouter.post("/story/:storyId/create", async (req, res) => {
    const { storyId }: { storyId: string } = req.params;
    const newScene: NewScene = req.body;
    const newSceneSpec = createScene(
      newScene.id,
      newScene.name,
      newScene.responsePrompt,
    );
    await dataSource.saveScene(
      storyId,
      `${newSceneSpec.id}.json`,
      newSceneSpec,
    );
    res.json(newSceneSpec);
  });
  apiRouter.post(
    "/story/:storyId/editScene/*",
    async (req: express.Request<any>, res) => {
      const { storyId }: { storyId: string } = req.params;
      const [scenePath]: [string] = req.params;
      const sceneEdit: SceneEdit = req.body;
      const initialScene = await dataSource.getScene(storyId, scenePath);
      const adjustedScene = adjustScene(initialScene, sceneEdit);
      await dataSource.saveScene(
        storyId,
        `${sceneEdit.id}.json`,
        adjustedScene,
      );
      res.json(adjustedScene);
    },
  );
  // Content, also based on story url
  apiRouter.get(
    "/story/:storyId/content/*",
    async (req: express.Request<any>, res) => {
      const { storyId }: { storyId: string } = req.params;
      const [contentPath]: [string] = req.params;
      const content = await dataSource.getContent(storyId, contentPath);
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
