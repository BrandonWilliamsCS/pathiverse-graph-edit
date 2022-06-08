import { promises as fs } from "fs";
import * as path from "path";
import { ResourceIndicator } from "../pathiverse/ResourceIndicator";
import { ContentWithResponseScene } from "./ContentWithResponseScene";
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

  public async writeScene(
    sceneRootIndicator: ResourceIndicator,
    scenePath: string,
    scene: ContentWithResponseScene,
  ) {
    const fullScenePath = this.resolveScenePath(sceneRootIndicator, scenePath);
    return await this.writeJsonContents(fullScenePath, scene);
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

  public async ensureContent(
    contentRootIndicator: ResourceIndicator,
    contentPath: string,
  ) {
    const fullContentPath = this.resolveScenePath(
      contentRootIndicator,
      contentPath,
    );
    await this.ensureFile(fullContentPath);
  }

  private getRawContents(filePath: string) {
    return fs.readFile(filePath, { encoding: "utf8" });
  }

  private async getJsonContents(filePath: string) {
    const fileContents = await fs.readFile(filePath, { encoding: "utf8" });
    return JSON.parse(fileContents);
  }

  private async writeJsonContents(filePath: string, data: any) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    return await fs.writeFile(filePath, JSON.stringify(data, null, 2), {
      encoding: "utf8",
    });
  }

  private async ensureFile(filePath: string) {
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, "", {
        encoding: "utf8",
        flag: "wx",
      });
    } finally {
    }
  }
}
