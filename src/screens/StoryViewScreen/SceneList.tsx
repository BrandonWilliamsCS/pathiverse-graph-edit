import { ContentWithResponseScene } from "../../pathiverse/ContentWithResponseScene";

export interface SceneListProps {
  onSceneSelection: (scene: ContentWithResponseScene) => void;
  sceneList: ContentWithResponseScene[];
}

export function SceneList({ onSceneSelection, sceneList }: SceneListProps) {
  return (
    <div className="scene-list">
      {sceneList.map((scene) => (
        <li key={scene.name}>
          <button
            onClick={() => {
              onSceneSelection(scene);
            }}
          >
            {scene.name}
          </button>
        </li>
      ))}
    </div>
  );
}
