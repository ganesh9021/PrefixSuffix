import React, { useState } from "react";
import "./dragdrop.css";

const DragDrop = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    // Add more items as needed
  ]);

  const [dropTarget, setDropTarget] = useState({
    targetItem: null,
    dropPosition: null,
  });

  const handleDragStart = (e, draggedItem) => {
    e.dataTransfer.setData("text/plain", draggedItem.id);
  };

  const handleDragOver = (e, targetItem) => {
    e.preventDefault();

    const targetElement = e.target;
    const mouseY = e.clientY;
    const targetRect = targetElement.getBoundingClientRect();
    const dropPosition =
      mouseY < targetRect.top + targetRect.height / 2 ? "above" : "below";

    targetElement.classList.toggle(
      "drop-target-above",
      dropPosition === "above"
    );
    targetElement.classList.toggle(
      "drop-target-below",
      dropPosition === "below"
    );

    e.dataTransfer.dropEffect = "move";

    setDropTarget({ targetItem, dropPosition });
  };

  const handleDrop = (e, droppedItem, dropPosition) => {
    e.preventDefault();
    console.log(droppedItem)

    const draggedItemId = e.dataTransfer.getData("text/plain");
    const updatedItems = [...items];

    // Find the index of the dragged item
    const draggedIndex = updatedItems.findIndex(
      (item) => item.id === Number(draggedItemId)
    );

    // Find the index of the dropped item
    const droppedIndex = updatedItems.findIndex(
      (item) => item.id === droppedItem.id
    );

    // Calculate the actual drop position based on the parameter
    const actualDropPosition =
      dropPosition === "above" ? droppedIndex : droppedIndex + 1;

    // Move the dragged item to the actual drop position
    updatedItems.splice(
      actualDropPosition,
      0,
      updatedItems.splice(draggedIndex, 1)[0]
    );

    setItems(updatedItems);
  };

  return (
    <div className="drag-and-drop-container">
      {items.map((item) => (
        <div
          key={item.id}
          className={`drag-item ${
            dropTarget.targetItem === item &&
            `drop-target-${dropTarget.dropPosition}`
          }`}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={(e) => handleDragOver(e, item)}
          onDrop={(e) => handleDrop(e, item, dropTarget.dropPosition)}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default DragDrop;
