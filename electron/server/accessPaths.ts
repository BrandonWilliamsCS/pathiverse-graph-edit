import * as path from "path";
import { ResourceIndicator } from "../../pathiverse/ResourceIndicator";

export function resolveStoryListPath(apiAccessRoot: string) {
  return path.join(apiAccessRoot, "/story/storyList.json");
}

export function resolveScenePath(
  apiAccessRoot: string,
  sceneRootIndicator: ResourceIndicator,
  scenePath: string,
) {
  if (!sceneRootIndicator.requiresContext) {
    return path.join(sceneRootIndicator.value, scenePath);
  }
  const storyListPath = resolveStoryListPath(apiAccessRoot);
  return path.join(storyListPath, sceneRootIndicator.value, scenePath);
}
