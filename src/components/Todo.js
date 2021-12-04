import React, { useState, useEffect } from "react";

const getLocalData = () => {
  const lists = localStorage.getItem("todoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [toggleButton, setToggleButton] = useState(false);
  const [editItemId, setEditItemId] = useState("");

  // Add Function
  const addItem = () => {
    if (!inputData) {
      alert("Please enter data .... ");
      // Code for edit the existing item
      // Due to editItem function, inputData will be filled by existing description of the item
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === editItemId) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData("");
      setEditItemId("");
      setToggleButton(false);      
      // Code for inserting new item
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // Edit Item Function
  // Through the below code, id of the selected item will be determined for editing
  const editItem = (index) => {
    const editedItem = items.find((curElem) => {
      // alert("curElem id is " + index)
      return curElem.id === index;
      
    });
    
    setInputData(editedItem.name);
    setToggleButton(true);
    setEditItemId(index);
  };

  // Delete Item Function
  const deleteItem = (index) => {
    const filteredItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(filteredItems);
  };

  // Remove all Items
  const removeAll = () => {
    setItems([]);
  };

  // Use Effection Fucntion
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="/images/todo.svg" alt="todo" />
            <figcaption>Add your list here</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              className="form-control"
              placeholder="✍ Please enter the text here .... "
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
                <i className="fa fa-edit add-btn" onClick={addItem}></i>                
            ) : (
                <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* Show Items List */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove all Items */}
          <div className="showItems">
            <button 
              className="btn effect04" 
              onClick={removeAll}
              data-sm-link-text="Remove All">
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;