import React from "react";
import logo from "../../load.png";

const Loading = () => {
  return (
    <div className="loading">
      <header className="loading-header">
        <p>Loading ...</p>
        <br />
        <br />

        <img src={logo} className="loading-logo" alt="logo" />
      </header>
    </div>
  );
};

export default Loading;
