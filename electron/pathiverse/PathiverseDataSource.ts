import { PathiverseFileAccess } from "./PathiverseFileAccess";
import { StorySpecification } from "./StorySpecification";

export class PathiverseDataSource {
  constructor(private readonly fileAccess: PathiverseFileAccess) {}

  public getStoryList() {
    return this.fileAccess.getStoryList();
  }

  public async saveStory(storySpec: StorySpecification) {
    const baseStoryList = await this.getStoryList();
    const adjustedStoryList = baseStoryList.some((s) => s.id === storySpec.id)
      ? baseStoryList.map((s) => (s.id === storySpec.id ? storySpec : s))
      : [...baseStoryList, storySpec];
    await this.fileAccess.writeStoryList(adjustedStoryList);
  }

  public async getScene(storyId: string, scenePath: string) {
    const storySpec = await this.getStorySpec(storyId);
    return this.fileAccess.getScene(storySpec.relativeSceneRoot, scenePath);
  }

  public async getContent(storyId: string, contentPath: string) {
    const storySpec = await this.getStorySpec(storyId);
    return this.fileAccess.getContent(storySpec.relativeSceneRoot, contentPath);
  }

  private async getStorySpec(storyId: string) {
    const storyList = await this.getStoryList();
    return storyList.find((storySpec) => storySpec.id === storyId)!;
  }
}
