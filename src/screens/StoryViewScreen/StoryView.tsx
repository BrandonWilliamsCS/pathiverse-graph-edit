import React from "react";
import { ApiService } from "../../model/ApiService";
import { ContentWithResponseScene } from "../../pathiverse/ContentWithResponseScene";
import { StorySpecification } from "../../pathiverse/StorySpecification";
import { SceneAddForm } from "./SceneAddForm";
import { SceneEditForm } from "./SceneEditForm";
import { SceneList } from "./SceneList";

export interface StoryViewProps {
  apiService: ApiService;
  onExit: () => void;
  story: StorySpecification;
}

export function StoryView({ apiService, onExit, story }: StoryViewProps) {
  const [sceneList, setSceneList] =
    React.useState<ContentWithResponseScene[]>();
  React.useEffect(() => {
    if (!sceneList) {
      apiService.getSceneList(story.id).then((x) => {
        setSceneList(x);
      });
    }
  }, [sceneList]);

  const [selectedScene, setSelectedScene] =
    React.useState<ContentWithResponseScene>();
  return (
    <div className="story-view">
      <div className="story-view-side">
        <button type="button" onClick={onExit}>
          Back to story list
        </button>
        {sceneList && (
          <>
            <SceneList
              sceneList={sceneList}
              onSceneSelection={setSelectedScene}
            />
            <SceneAddForm
              storyId={story.id}
              onSceneCreate={async (newScene) => {
                const sceneSpec = await apiService.createScene(newScene);
                setSelectedScene(sceneSpec);
                const newSceneList = await apiService.getSceneList(story.id);
                setSceneList(newSceneList);
              }}
            />
          </>
        )}
      </div>
      <div className="story-view-main">
        <h2 className="story-view-title">{story.name}</h2>
        {selectedScene && (
          <SceneEditForm
            scene={selectedScene}
            storyId={story.id}
            onSceneEdit={async (sceneEdit) => {
              const sceneSpec = await apiService.editScene(sceneEdit);
              setSelectedScene(sceneSpec);
              const newSceneList = await apiService.getSceneList(story.id);
              setSceneList(newSceneList);
            }}
          />
        )}
      </div>
    </div>
  );
}
