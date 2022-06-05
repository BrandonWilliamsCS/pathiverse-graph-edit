import { StorySpecification } from "../../pathiverse/StorySpecification";

export class ApiService {
  private readonly apiRoot = "http://localhost:3005/api";

  public getStoryList(): Promise<StorySpecification[]> {
    return this.getJsonResource<StorySpecification[]>("/story/list.json");
  }

  private async getJsonResource<T>(relativePath: string): Promise<T> {
    const result = await fetch(this.apiRoot + relativePath);
    return await result.json();
  }
}
