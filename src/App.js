import Folder from "../Folder";
import "./styles.css";
import React, { useState } from "react";

const folders = [
  {
    type: "folder",
    name: "Drive C",
    id: 1,
    subFolder: [],
  },
  {
    type: "folder",
    name: "Drive D",
    id: 2,
    subFolder: [],
  },
];

export default function App() {
  const [obj, setObj] = useState(folders);
  return (
    <div className="App">
      <h1>Folder Structure</h1>
      <Folder obj={obj} setObj={setObj} />
    </div>
  );
}
