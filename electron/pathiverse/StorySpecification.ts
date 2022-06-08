import { ResourceIndicator } from "./ResourceIndicator";

export interface StorySpecification {
  id: string;
  name: string;
  relativeSceneRoot: ResourceIndicator;
  initialSceneIndicator: ResourceIndicator;
}
