import { ResourceIndicator } from "./ResourceIndicator";

export const indicatedContentType = "pathiverse.content.indicated" as const;

export interface IndicatedContent {
  type: typeof indicatedContentType;
  directContentType: string;
  indicator: ResourceIndicator;
}
