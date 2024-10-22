import React, { useEffect, useState } from 'react';

const DragAndDrop = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  // Handle drag start
  const handleDragStart = (event) => {
    event.dataTransfer.setData('class', event.target.className); 
    event.dataTransfer.setData('text', event.target.textContent);
  };

  // Handle drop
  const handleDrop = (event) => {
    event.preventDefault();
    const data = {
      class: event.dataTransfer.getData('class'),
      text: event.dataTransfer.getData('text'),
    };

    // Add the dropped item identifier to the droppedItems array
    setDroppedItems((prevItems) => [...prevItems, data]);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Allow drop by preventing default behavior
  };

  useEffect(()=>{
    if(droppedItems.length !== 0){
        console.log(droppedItems);
    }
    
  }, [droppedItems])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Draggable Items */}
      <div className="flex gap-4">
        <div
          draggable
          onDragStart={handleDragStart}
          className="w-24 h-24 bg-blue-500 flex items-center justify-center text-white font-bold"
        >
          Item 1
        </div>
        <div
          draggable
          onDragStart={handleDragStart}
          className="w-24 h-24 bg-green-500 flex items-center justify-center text-white font-bold"
        >
          Item 2
        </div>
        <div
          draggable
          onDragStart={handleDragStart}
          className="w-24 h-24 bg-red-500 flex items-center justify-center text-white font-bold"
        >
          Item 3
        </div>
      </div>

      {/* Drop Box */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-96 h-64 mt-10 border-4 border-dashed border-gray-500 flex items-start justify-start flex-wrap p-2"
      >
        {droppedItems.map((item, index) => (
          <div key={index} className={`${item.class} rounded-2xl`}>
            {item.text} 
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDrop;
