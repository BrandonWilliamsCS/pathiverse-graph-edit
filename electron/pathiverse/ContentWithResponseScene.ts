import { ActionInteractionOption } from "./ActionInteractionOption";
import { IndicatedContent, indicatedContentType } from "./IndicatedContent";

export interface ContentWithResponseScene {
  id: string;
  name: string;
  type: string;
  content: IndicatedContent;
  responsePrompt?: string;
  responseOptions: ActionInteractionOption[];
}

export const contentWithResponseSceneType =
  "pathiverse.scene.contentWithResponse";

export const markdownContentType = "pathiverse.content.markdown";

export function createEmptyScene(
  id: string,
  name: string,
): ContentWithResponseScene {
  return {
    id,
    name,
    type: contentWithResponseSceneType,
    content: {
      type: indicatedContentType,
      directContentType: markdownContentType,
      indicator: {
        type: "relativePath",
        requiresContext: true,
        value: `${id}.md`,
      },
    },
    responsePrompt: "What's next?",
    responseOptions: [],
  };
}
