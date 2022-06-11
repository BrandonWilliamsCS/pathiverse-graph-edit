import { ContentWithResponseScene } from "./ContentWithResponseScene";
import { SceneConnection } from "./SceneConnection";

export interface SceneEdit {
  storyId: string;
  id: string;
  responsePrompt: string;
  connections: SceneConnection[];
}

export function adjustScene(
  scene: ContentWithResponseScene,
  sceneEdit: SceneEdit,
): ContentWithResponseScene {
  return {
    ...scene,
    responsePrompt: sceneEdit.responsePrompt,
    responseOptions: sceneEdit.connections.map((connection) => ({
      type: "pathiverse.interactionOption.action",
      label: connection.label,
      action: {
        type: "pathiverse.action.resolveAndAdvanceScene",
        sceneIndicator: {
          type: "relativePath",
          requiresContext: true,
          value: `${connection.targetSceneId}.json`,
        },
      },
    })),
  };
}
