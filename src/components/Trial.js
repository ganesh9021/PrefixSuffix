import React, { useEffect, useState } from "react";

const Trial = () => {
  const [state, setState] = useState("hi");

  const handleclick = () => {
    console.log("button gets clicked");
    setState("hello");
  };

  useEffect(() => {
    console.log("useeffect called");
  },[state]);

  return (
    <div>
      <label>This is trial on useEffect</label> <br />
      <button onClick={handleclick}>click me</button>
      <br />
      <span>{state}</span>
    </div>
  );
};

export default Trial;
