import { ApiService } from "../../model/ApiService";
import { StorySpecification } from "../../pathiverse/StorySpecification";

export interface StoryViewProps {
  apiService: ApiService;
  onExit: () => void;
  story: StorySpecification;
}

export function StoryView({ apiService, onExit, story }: StoryViewProps) {
  return (
    <div className="story-view">
      <h2 className="story-view-title">{story.name}</h2>
      <button type="button" onClick={onExit}>
        Back to story list
      </button>
    </div>
  );
}
