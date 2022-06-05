import { promises as fs } from "fs";
import { StorySpecification } from "../../pathiverse/StorySpecification";
import { resolveStoryListPath, resolveScenePath } from "./accessPaths";

export async function getStoryList(apiAccessRoot: string) {
  const fullPath = resolveStoryListPath(apiAccessRoot);
  return (await getJsonContents(fullPath)) as StorySpecification[];
}

export async function getStorySpec(apiAccessRoot: string, storyId: string) {
  const storyList = await getStoryList(apiAccessRoot);
  return storyList.find((storySpec) => storySpec.id === storyId)!;
}

export async function getScene(
  apiAccessRoot: string,
  storyId: string,
  scenePath: string,
) {
  const storySpec = await getStorySpec(apiAccessRoot, storyId);
  const fullScenePath = resolveScenePath(
    apiAccessRoot,
    storySpec.relativeSceneRoot,
    scenePath,
  );
  return await getJsonContents(fullScenePath);
}

export async function getContent(
  apiAccessRoot: string,
  storyId: string,
  contentPath: string,
) {
  const storySpec = await getStorySpec(apiAccessRoot, storyId);
  const fullContentPath = resolveScenePath(
    apiAccessRoot,
    storySpec.relativeSceneRoot,
    contentPath,
  );
  return await getRawContents(fullContentPath);
}

async function getRawContents(path: string) {
  return fs.readFile(path, { encoding: "utf8" });
}

async function getJsonContents(path: string) {
  const fileContents = await fs.readFile(path, { encoding: "utf8" });
  return JSON.parse(fileContents);
}
