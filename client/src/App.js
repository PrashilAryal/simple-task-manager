import React, { useEffect, useState } from "react";
import "./app.css";
import SearchBox from "./components/common/SearchBox";
import ListItem from "./components/ListItem";
import axios from "axios";
import TaskAdd from "./components/TaskAdd";
import Button from "./components/common/Button";

function App() {
  const [data, setData] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showAddBox, setShowAddBox] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(true);
  const [showDeleteBox, setShowDeleteBox] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/todo`);

      setData(response.data);
      console.log("getData on App.js * data: ", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    console.log("useEffect on App.js * data: ", data);
  }, []);
  useEffect(() => {
    // if (data != null) {
    setUncompletedTasks(
      data && data.filter ? data.filter((task) => !task.is_complete) : []
    );
    setCompletedTasks(
      data && data.filter ? data.filter((task) => task.is_complete) : []
    );
    // }
  }, [data]);

  const onAddTaskModalClick = () => {
    if (!showAddBox) {
      setShowAddBox(true);
    } else {
      setShowAddBox(false);
    }
  };

  const onSearchTaskModalClick = () => {
    if (!showSearchBox) {
      setShowSearchBox(true);
      setShowDeleteBox(false);
    } else {
      setShowSearchBox(false);
      setShowDeleteBox(false);
    }
  };
  const onDeleteTaskModalClick = () => {
    if (!showDeleteBox) {
      setShowDeleteBox(true);
      // setShowSearchBox(false);
    } else {
      setShowDeleteBox(false);
      // setShowSearchBox(false);
    }
  };

  return (
    <div className="app">
      <h1 className="app__title">Simple Task Manager</h1>
      <div className="app__searchAddButton">
        <Button onClick={onAddTaskModalClick} children={"Add Task"}></Button>
      </div>
      {showSearchBox && (
        <div className="app__searchBox">
          <SearchBox getData={getData}></SearchBox>
        </div>
      )}

      {showAddBox && (
        <div className="app__addTaskBox">
          <TaskAdd getData={getData} onClick={onAddTaskModalClick}></TaskAdd>
        </div>
      )}
      <div className="app__listContainer">
        <p className="app__listContainer__heading">To be Done</p>
        {data.length === 0 ? (
          <p>No data found!</p>
        ) : (
          uncompletedTasks.map((todo) => (
            <ListItem key={todo.id} data={todo} getData={getData} />
          ))
        )}
      </div>
      <div className="app__listContainer">
        <p className="app__listContainer__heading">Completed</p>
        {completedTasks.map((todo) => (
          <ListItem key={todo.id} data={todo} getData={getData} />
        ))}
      </div>
    </div>
  );
}

export default App;
