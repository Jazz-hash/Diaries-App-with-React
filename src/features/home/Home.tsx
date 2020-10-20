import React, { FC } from "react";
import Diaries from "../diary/Diaries";
import Editor from "../entry/Editor";

const Home: FC = () => {
  return (
    <div className="two-cols" style={{backgroundColor:"white"}}>
      <div className="left">
        <Diaries />
      </div>
      <div className="right">
        <Editor />
      </div>
    </div>
  );
};

export default Home;
