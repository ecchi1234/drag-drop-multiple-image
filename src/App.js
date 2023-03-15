import "./App.css";
import { useState } from "react";

export const listImage = [
  {
    id: 1,
    path: "https://images.unsplash.com/photo-1678729465418-ee8127e8c5cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 2,
    path: "https://images.unsplash.com/photo-1678382154583-b45867cfc331?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80",
  },
  {
    id: 3,
    path: "https://images.unsplash.com/photo-1678794144519-9aadc02edb53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 4,
    path: "https://images.unsplash.com/photo-1678817546297-8b897343b8ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1290&q=80",
  },
];
let divEle;

function App() {
  const [selected, setSelected] = useState([]);
  const handleClick = (item) => {
    const selectedIndex = selected.indexOf(item);
    const newSelected = [...selected];
    if (selectedIndex === -1) {
      newSelected.push(item);
    } else {
      newSelected.splice(selectedIndex, 1);
    }
    setSelected(newSelected);
  };
  const isSelected = (item) => selected.indexOf(item) !== -1;
  const handleDragStart = (ev) => {
    ev.target.style.opacity = "40%";
    divEle = document.createElement("div");
    divEle.style.width = "200px";
    divEle.style.height = "200px";

    divEle.style.position = "relative";
    document.body.appendChild(divEle);
    selected.forEach((selectedImage) => {
      const imageToAdd = document.createElement("img");
      const imageItem = listImage.filter((item) => item.id === selectedImage);
      imageToAdd.src = imageItem[0]?.path;
      imageToAdd.style.position = "absolute";
      imageToAdd.style.width = "100%";
      imageToAdd.style.height = "100%";
      imageToAdd.style.objectFit = "contain";
      imageToAdd.style.top = "0px";
      imageToAdd.style.left = "0px";
      divEle.appendChild(imageToAdd);
    });

    // count selected item
    const countSelected = document.createElement("div");
    countSelected.style.width = "30px";
    countSelected.style.height = "30px";
    countSelected.style.backgroundColor = "blue";
    countSelected.style.position = "absolute";
    countSelected.style.top = "50%";
    countSelected.style.left = "50%";
    countSelected.style.display = "flex";
    countSelected.style.justifyContent = "center";
    countSelected.style.color = "white";
    countSelected.style.alignItems = "center";
    countSelected.style.transform = "translate(-50%, -50%)";
    countSelected.innerText = selected.length;

    divEle.appendChild(countSelected);

    ev.dataTransfer.setDragImage(divEle, 10, 10);
  };
  const handleDragEnd = (ev) => {
    ev.target.style.opacity = "1";
    document.body.removeChild(divEle);
  };

  return (
    <div className="App">
      <div style={{ display: "flex", gap: 10 }}>
        {listImage.map((item) => {
          return (
            <div
              style={{
                width: 200,
                height: 200,
                backgroundColor: isSelected(item.id) ? "greenyellow" : "#ccc",
              }}
              key={item?.id}
              id={item?.id}
              draggable
              onDragOver={(e) => e.preventDefault()}
              onClick={() => handleClick(item.id)}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <img
                src={item?.path}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
