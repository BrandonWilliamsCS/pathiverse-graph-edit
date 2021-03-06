import React from "react";
import { ApiService } from "./model/ApiService";
import { StorySpecification } from "./pathiverse/StorySpecification";
import { StorySelection } from "./screens/StorySelectionScreen/StorySelection";
import { StoryView } from "./screens/StoryViewScreen/StoryView";

function App() {
  const [apiService] = React.useState(() => new ApiService());
  const [storyList, setStoryList] = React.useState<StorySpecification[]>();
  const [selectedStory, setSelectedStory] =
    React.useState<StorySpecification>();
  React.useEffect(() => {
    if (!storyList) {
      apiService.getStoryList().then(setStoryList);
    }
  }, [storyList]);
  return (
    <div className="App">
      {!storyList && "Loading..."}
      {storyList && !selectedStory && (
        <StorySelection
          storyList={storyList}
          onStorySelection={setSelectedStory}
          onStoryCreate={async (newStory) => {
            const storySpec = await apiService.createStory(newStory);
            setSelectedStory(storySpec);
            apiService.getStoryList().then(setStoryList);
          }}
        />
      )}
      {selectedStory && (
        <StoryView
          key={selectedStory.id}
          apiService={apiService}
          onExit={() => {
            setSelectedStory(undefined);
          }}
          story={selectedStory}
        />
      )}
    </div>
  );
}

export default App;
