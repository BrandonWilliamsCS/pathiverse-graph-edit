import React from "react";
import { InputField } from "../../common/InputField";
import { ContentWithResponseScene } from "../../pathiverse/ContentWithResponseScene";
import {
  isResolveAndAdvanceSceneAction,
  ResolveAndAdvanceSceneAction,
} from "../../pathiverse/ResolveAndAdvanceSceneAction";
import { SceneConnection } from "../../pathiverse/SceneConnection";
import { SceneEdit } from "../../pathiverse/SceneEdit";
import { SceneConnectionsSubform } from "./SceneConnectionsSubform";

export interface SceneEditFormProps {
  onSceneEdit: (sceneEdit: SceneEdit) => Promise<void>;
  scene: ContentWithResponseScene;
  sceneList: ContentWithResponseScene[];
  storyId: string;
}

export function SceneEditForm({
  onSceneEdit,
  scene,
  sceneList,
  storyId,
}: SceneEditFormProps) {
  const [responsePrompt, setResponsePrompt] = React.useState<
    string | undefined
  >(scene.responsePrompt);
  const [connections, setConnections] = React.useState<SceneConnection[]>(() =>
    getInitialConnections(scene),
  );
  return (
    <div className="scene-view">
      <h2 className="scene-name">{scene.name}</h2>
      <form
        className="scene-edit-form"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!responsePrompt) {
            return;
          }
          await onSceneEdit({
            storyId,
            id: scene.id,
            responsePrompt,
            connections,
          });
        }}
      >
        <h3 className="form-title">Edit Scene</h3>
        <InputField
          label="Response Prompt"
          name="responsePrompt"
          value={responsePrompt}
          onValueChange={setResponsePrompt}
        />
        <SceneConnectionsSubform
          connections={connections}
          setConnections={setConnections}
          sceneList={sceneList}
          sourceSceneId={scene.id}
        />
        <button className="form-submit" disabled={!responsePrompt}>
          Save Scene
        </button>
      </form>
    </div>
  );
}

function getInitialConnections(
  scene: ContentWithResponseScene,
): SceneConnection[] {
  return scene.responseOptions
    .filter((responseOption) =>
      isResolveAndAdvanceSceneAction(responseOption.action),
    )
    .map((responseOption) => ({
      sourceSceneId: scene.id,
      label: responseOption.label,
      targetSceneId: getIdFromPath(
        (responseOption.action as ResolveAndAdvanceSceneAction).sceneIndicator
          .value,
      ),
    }));
}

function getIdFromPath(scenePath: string) {
  return scenePath.match(/\/?([^/]+\/)*(.+)\.json/)![2];
}
