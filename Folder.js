import React, { useState } from "react";

const Folder = ({ obj, setObj }) => {
  const [show, setShow] = useState({});
  const [addItem, setAddItem] = useState("");
  const [inputValue, setInputValue] = useState({
    value: "",
    folderName: "",
  });

  const handleToggle = (name) => {
    setShow((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
    setInputValue({ value: "", folderName: "" });
  };

  const handleBtn = (e, name, type) => {
    e.stopPropagation();
    setShow((prev) => ({
      ...prev,
      [name]: true,
    }));
    setAddItem(type);
    setInputValue({ value: "", folderName: name });
  };

  const handleRemoveBtn = (e, id) => {
    e.stopPropagation(); // Stops event from affecting parent elements

    const removeFolder = (folders) => {
      return folders
        .filter((folder) => folder.id !== id) // Step 1: Remove if ID matches
        .map((folder) =>
          folder.type === "folder"
            ? { ...folder, subFolder: removeFolder(folder.subFolder) } // Step 2: Check subfolders recursively
            : folder
        );
    };

    setObj((prev) => removeFolder(prev));
  };

  const addFile = (id) => {
    if (!inputValue.value.trim()) return; // Prevent empty names

    let updateObj = (pre) => {
      return pre.map((folder) => {
        if (folder.id === id) {
          return {
            ...folder,
            subFolder: [
              ...folder.subFolder,
              {
                type: addItem === "folder" ? "folder" : "file",
                name: inputValue.value,
                subFolder: addItem === "folder" ? [] : undefined,
                id: Math.random(0, 9999),
              },
            ],
          };
        } else if (folder.type === "folder") {
          return { ...folder, subFolder: updateObj(folder?.subFolder) };
        }
        return folder;
      });
    };

    setObj((pre) => updateObj(pre));
    setInputValue({ value: "", folderName: "" });
    setAddItem("");
  };

  return (
    <div>
      {obj?.map((folder, index) => (
        <div
          key={index}
          style={{
            padding: ".5rem",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <span
            onClick={() => handleToggle(folder?.name)}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            {folder?.type === "folder" && (
              <div>
                📂 {folder?.name}{" "}
                <button
                  onClick={(e) => handleBtn(e, folder.name, "folder")}
                  style={{ cursor: "pointer" }}
                >
                  Folder +
                </button>{" "}
                <button
                  onClick={(e) => handleBtn(e, folder.name, "file")}
                  style={{ cursor: "pointer" }}
                >
                  File +
                </button>
                <button
                  onClick={(e) => handleRemoveBtn(e, folder.id)}
                  style={{ cursor: "pointer" }}
                >
                  remove -
                </button>
              </div>
            )}
          </span>

          {inputValue.folderName === folder.name && (
            <div onClick={(e) => e.stopPropagation()}>
              {addItem === "folder" ? "📂" : "📄"}
              <input
                value={inputValue.value}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addFile(folder.id);
                }}
              >
                Add +
              </button>
            </div>
          )}

          {folder?.type === "file" && <div>📄 {folder?.name}</div>}

          {show[folder.name] && folder?.subFolder && (
            <Folder obj={folder?.subFolder} setObj={setObj} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Folder;
