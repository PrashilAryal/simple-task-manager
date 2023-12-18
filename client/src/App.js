import React, { useEffect, useState } from "react";
import "./app.css";
import SearchBox from "./components/common/SearchBox";
import ListItem from "./components/ListItem";
import axios from "axios";
import TaskAdd from "./components/TaskAdd";
import Button from "./components/common/Button";
import DeleteTask from "./components/DeleteTask";
// require("dotenv").config();

function App() {
  const [data, setData] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showAddBox, setShowAddBox] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/todo`);

      // if (!response.ok) {
      //   console.log(response);
      //   throw new Error(`HTTP error: ${response.status}`, response);
      // }
      // const jsonData = await response.json();
      setData(response.data);
      // setData(response.data);
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
    setUncompletedTasks(data.filter((task) => !task.is_complete));
    setCompletedTasks(data.filter((task) => task.is_complete));
    // }
  }, [data]);

  const onAddTaskModalClick = () => {
    if (!showAddBox) {
      setShowAddBox(true);
    } else {
      setShowAddBox(false);
    }
  };
  return (
    <div className="app">
      <h1 className="app__title">Simple Task Manager</h1>
      <div className="app__showAddTaskButton">
        <Button onClick={onAddTaskModalClick} children={"Add Task"}></Button>
      </div>
      {/* {!showAddBox && ( */}
      <div className="app__searchBox">
        <SearchBox getData={getData}></SearchBox>
      </div>
      <DeleteTask></DeleteTask>
      {/* )} */}
      {showAddBox && (
        <div className="app__addTaskBox">
          <TaskAdd getData={getData} onClick={onAddTaskModalClick}></TaskAdd>
          {/* <SearchBox></SearchBox> */}
        </div>
      )}
      <div className="app__listContainer">
        <p className="app__listContainer__heading">To be Done</p>
        {data.length === 0 ? (
          <p>Loading...</p>
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
