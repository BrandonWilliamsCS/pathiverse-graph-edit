import { ContentWithResponseScene } from "../pathiverse/ContentWithResponseScene";
import { NewScene } from "../pathiverse/NewScene";
import { NewStory } from "../pathiverse/NewStory";
import { StorySpecification } from "../pathiverse/StorySpecification";

export class ApiService {
  private readonly apiRoot = "http://localhost:3005/api";

  public getStoryList(): Promise<StorySpecification[]> {
    return this.getJsonResource<StorySpecification[]>("/story/list.json");
  }

  public createStory(newStory: NewStory): Promise<StorySpecification> {
    return this.postJsonData<StorySpecification>("/story/create", newStory);
  }

  public getSceneList(storyId: string): Promise<ContentWithResponseScene[]> {
    return this.getJsonResource<ContentWithResponseScene[]>(
      `/story/${storyId}/scenes`,
    );
  }

  public createScene(newScene: NewScene): Promise<ContentWithResponseScene> {
    return this.postJsonData<ContentWithResponseScene>(
      `/story/${newScene.storyId}/create`,
      newScene,
    );
  }

  private async getJsonResource<T>(relativePath: string): Promise<T> {
    const result = await fetch(this.apiRoot + relativePath);
    return await result.json();
  }

  private async postJsonData<T = void>(
    relativePath: string,
    data: any,
  ): Promise<T> {
    const result = await fetch(this.apiRoot + relativePath, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await result.json();
  }
}
