import React from "react";
import { StorySpecification } from "../pathiverse/StorySpecification";

const serverApiRoot = "http://localhost:3005/api";

function App() {
  const [data, setData] = React.useState<StorySpecification[]>();
  React.useEffect(() => {
    if (!data) {
      getJsonResource<StorySpecification[]>(
        `${serverApiRoot}/story/list.json`,
      ).then(setData);
    }
  }, [data]);
  return <div className="App">Data: {data && JSON.stringify(data)}</div>;
}

export default App;

async function getJsonResource<T>(uri: string): Promise<T> {
  const result = await fetch(uri);
  return await result.json();
}
