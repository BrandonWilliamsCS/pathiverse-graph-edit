import { StorySpecification } from "../../pathiverse/StorySpecification";

export interface StorySelectionProps {
  onStorySelection: (storySpec: StorySpecification) => void;
  storyList: StorySpecification[];
}

export function StorySelection({
  onStorySelection,
  storyList,
}: StorySelectionProps) {
  return (
    <div className="story-list">
      <h2 className="story-list-title">Story List</h2>
      <ul className="story-list-content">
        {storyList.map((storySpec) => (
          <li key={storySpec.id}>
            <button
              onClick={() => {
                onStorySelection(storySpec);
              }}
            >
              {storySpec.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
