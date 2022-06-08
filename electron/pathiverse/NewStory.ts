import { StorySpecification } from "./StorySpecification";

export interface NewStory {
  id: string;
  name: string;
  initialSceneName: string;
}

export function buildSpecForNewStory(
  newStory: NewStory,
  accessRoot: string,
  pathJoiner: (parts: string[]) => string,
): StorySpecification {
  return {
    id: newStory.id,
    name: newStory.name,
    relativeSceneRoot: {
      type: "directoryPath",
      requiresContext: false,
      value: pathJoiner([accessRoot, "/story/scenes/", newStory.id]),
    },
    initialSceneIndicator: {
      type: "relativePath",
      requiresContext: true,
      value: `${newStory.initialSceneName}.json`,
    },
  };
}
