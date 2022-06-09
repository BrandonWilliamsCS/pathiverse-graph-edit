import { ActionInteractionOption } from "./ActionInteractionOption";

export interface ContentWithResponseScene {
  id: string;
  name: string;
  type: string;
  responsePrompt?: string;
  responseOptions: ActionInteractionOption[];
}

export const contentWithResponseSceneType =
  "pathiverse.scene.contentWithResponse";
