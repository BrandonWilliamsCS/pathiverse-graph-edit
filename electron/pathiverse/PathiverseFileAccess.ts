import { promises as fs } from "fs";
import * as path from "path";
import { ResourceIndicator } from "../pathiverse/ResourceIndicator";
import { StorySpecification } from "./StorySpecification";

export class PathiverseFileAccess {
  constructor(public readonly rootPath: string) {}

  public resolveStoryListPath() {
    return path.join(this.rootPath, "/story/storyList.json");
  }

  public resolveScenePath(
    sceneRootIndicator: ResourceIndicator,
    scenePath: string,
  ) {
    if (!sceneRootIndicator.requiresContext) {
      return path.join(sceneRootIndicator.value, scenePath);
    }
    const storyListPath = this.resolveStoryListPath();
    return path.join(storyListPath, sceneRootIndicator.value, scenePath);
  }

  public async getStoryList() {
    const fullPath = this.resolveStoryListPath();
    return (await this.getJsonContents(fullPath)) as StorySpecification[];
  }

  public async writeStoryList(storyList: StorySpecification[]) {
    const fullPath = this.resolveStoryListPath();
    await this.writeJsonContents(fullPath, storyList);
  }

  public async getScene(
    sceneRootIndicator: ResourceIndicator,
    scenePath: string,
  ) {
    const fullScenePath = this.resolveScenePath(sceneRootIndicator, scenePath);
    return await this.getJsonContents(fullScenePath);
  }

  public async getContent(
    sceneRootIndicator: ResourceIndicator,
    contentPath: string,
  ) {
    const fullContentPath = this.resolveScenePath(
      sceneRootIndicator,
      contentPath,
    );
    return await this.getRawContents(fullContentPath);
  }

  private getRawContents(path: string) {
    return fs.readFile(path, { encoding: "utf8" });
  }

  private async getJsonContents(path: string) {
    const fileContents = await fs.readFile(path, { encoding: "utf8" });
    return JSON.parse(fileContents);
  }

  private writeJsonContents(path: string, data: any) {
    return fs.writeFile(path, JSON.stringify(data, null, 2), {
      encoding: "utf8",
    });
  }
}
