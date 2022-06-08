import React from "react";

import { InputField } from "../../common/InputField";
import { idifyName } from "../../pathiverse/idifyName";
import { NewStory } from "../../pathiverse/NewStory";

export interface StoryAddFormProps {
  onStoryCreate: (newStory: NewStory) => void;
}

export function StoryAddForm({ onStoryCreate }: StoryAddFormProps) {
  const [name, setName] = React.useState<string>();
  const [initialSceneName, setInitialSceneName] = React.useState<
    string | undefined
  >("start");
  return (
    <form
      className="story-add-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name || !initialSceneName) {
          return;
        }
        onStoryCreate({
          id: idifyName(name),
          name,
          initialSceneId: idifyName(initialSceneName),
          initialSceneName,
        });
      }}
    >
      <h3 className="form-title">Create New Story</h3>
      <InputField
        label="Story Name"
        name="name"
        value={name}
        onValueChange={setName}
      />
      <InputField
        label="Initial Scene Name"
        name="initialSceneName"
        value={initialSceneName}
        onValueChange={setInitialSceneName}
      />
      <button className="form-submit" disabled={!name || !initialSceneName}>
        Create
      </button>
    </form>
  );
}
