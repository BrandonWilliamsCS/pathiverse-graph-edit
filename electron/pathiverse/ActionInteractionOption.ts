import { Action } from "./Action";

export const actionInteractionOptionType =
  "pathiverse.interactionOption.action" as const;

export interface ActionInteractionOption {
  type: typeof actionInteractionOptionType;
  label: string;
  action: Action;
}
