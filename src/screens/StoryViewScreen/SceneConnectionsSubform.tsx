import React from "react";
import { InputField } from "../../common/InputField";
import { InputSelect } from "../../common/InputSelect";
import { ContentWithResponseScene } from "../../pathiverse/ContentWithResponseScene";
import { SceneConnection } from "../../pathiverse/SceneConnection";

export interface SceneConnectionsSubformProps {
  connections: SceneConnection[];
  sceneList: ContentWithResponseScene[];
  setConnections: React.Dispatch<React.SetStateAction<SceneConnection[]>>;
  sourceSceneId: string;
}

export function SceneConnectionsSubform({
  connections,
  sceneList,
  setConnections,
  sourceSceneId,
}: SceneConnectionsSubformProps) {
  const [label, setLabel] = React.useState<string>();
  const [targetSceneId, setTargetSceneId] = React.useState<string>();
  return (
    <div className="scene-connections">
      {connections.map((connection) => (
        <li key={connection.label}>
          {connection.label} (
          {computeSceneName(connection.targetSceneId, sceneList)})
          <button
            onClick={() => {
              setConnections((cs) =>
                cs.filter(
                  (c) =>
                    c.label !== connection.label ||
                    c.targetSceneId !== connection.targetSceneId,
                ),
              );
            }}
          >
            Remove
          </button>
        </li>
      ))}

      <div className="scene-connection-add-form">
        <h3 className="form-title">Add Scene Connection</h3>
        <InputField
          label="Label"
          name="label"
          value={label}
          onValueChange={setLabel}
        />
        <InputSelect
          label="Target Scene"
          name="targetSceneId"
          value={targetSceneId}
          onValueChange={setTargetSceneId}
          options={sceneList
            .filter((scene) => scene.id !== sourceSceneId)
            .map((scene) => ({
              label: scene.name,
              value: scene.id,
            }))}
        />
        <button
          className="form-submit"
          type="button"
          disabled={!label || !targetSceneId}
          onClick={() => {
            if (!label || !targetSceneId) {
              return;
            }
            setConnections((cs) => [
              ...cs,
              { label, targetSceneId, sourceSceneId },
            ]);
            setLabel(undefined);
            setTargetSceneId(undefined);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

function computeSceneName(
  sceneId: string,
  sceneList: ContentWithResponseScene[],
) {
  return sceneList.find((scene) => scene.id === sceneId)!.name;
}
