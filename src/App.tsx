import React from "react";
import { StorySpecification } from "../pathiverse/StorySpecification";
import { ApiService } from "./model/ApiService";
import { StorySelection } from "./screens/StorySelectionScreen/StorySelection";

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
          }}
        />
      )}
    </div>
  );
}

export default App;
