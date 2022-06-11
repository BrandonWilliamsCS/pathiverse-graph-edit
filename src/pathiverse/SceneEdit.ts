import { SceneConnection } from "./SceneConnection";

export interface SceneEdit {
  storyId: string;
  id: string;
  responsePrompt: string;
  connections: SceneConnection[];
}
