import React from "react";
import CardListContainer from "./components/CardListContainer";
import FinalButtons from "./components/FinalButtons";
import ProjectTitle from "./components/ProjectTitle";
import { CardListContextProvider } from "./store/CardListContext";

const App = () => {
  return (
    <CardListContextProvider>
      <div className="bg-main h-screen w-screen overflow-y-auto">
        <div className="text-xl text-center pt-3">施工照片</div>
        <div className="w-10/12 mx-auto flex flex-col py-4 md:w-9/12 lg:w-8/12">
          <FinalButtons />
          <ProjectTitle />
          <CardListContainer />
        </div>
      </div>
    </CardListContextProvider>
  );
};

export default App;
