import React from "react";
import BottomNav from "./bottomNav";
import "./index.scss";

const AppWrapper = ({children}) => {
  return (
    <div className="appWrapper">
      <div className="appWrapper-content">{children}</div>
      <BottomNav className="appWrapper-nav" />
    </div>
  );
};

export default AppWrapper;
