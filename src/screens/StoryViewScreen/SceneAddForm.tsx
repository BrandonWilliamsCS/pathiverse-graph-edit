import React from "react";

import { InputField } from "../../common/InputField";
import { idifyName } from "../../pathiverse/idifyName";
import { NewScene } from "../../pathiverse/NewScene";

export interface SceneAddFormProps {
  onSceneCreate: (newScene: NewScene) => Promise<void>;
  storyId: string;
}

export function SceneAddForm({ onSceneCreate, storyId }: SceneAddFormProps) {
  const [name, setName] = React.useState<string>();
  const [responsePrompt, setResponsePrompt] = React.useState<
    string | undefined
  >("What's next?");
  return (
    <form
      className="story-add-form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!name || !responsePrompt) {
          return;
        }
        await onSceneCreate({
          storyId,
          id: idifyName(name),
          name,
          responsePrompt,
        });
        setName(undefined);
      }}
    >
      <h3 className="form-title">Create New Scene</h3>
      <InputField
        label="Scene Name"
        name="name"
        value={name}
        onValueChange={setName}
      />
      <InputField
        label="Response Prompt"
        name="responsePrompt"
        value={responsePrompt}
        onValueChange={setResponsePrompt}
      />
      <button className="form-submit" disabled={!name || !responsePrompt}>
        Create
      </button>
    </form>
  );
}
