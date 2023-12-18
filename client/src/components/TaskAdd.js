import React, { useState } from "react";
import "../assets/css/taskAdd.css";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import axios from "axios";

const TaskAdd = ({ getData, onClick }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState(1);
  const [error, setError] = useState("");

  const handleTextChange = (text) => {
    setTaskName(text);
  };
  const handlePriorityChange = (e) => {
    setPriority(parseInt(e.target.value, 10));
  };

  const addTask = async () => {
    if (taskName !== "") {
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/todo`, {
          task_name: taskName,
          priority: priority,
        });

        if (response.status !== 200) {
          console.log("error");
        } else {
          getData();
          console.log("success");
          onClick();
        }
      } catch (error) {
        console.log("Error on addTask: ", error);
        setError("Task already added");
      }
    } else {
      setError("Please enter a Task");
    }
  };
  return (
    <div className="taskAdd__container">
      <button className="closeButton" onClick={onClick}>
        X
      </button>
      <div className="taskAdd__container__item1">
        <label className="label">Task</label>
        <div className="taskAdd__container__item1--field">
          <TextBox
            type={"text"}
            placeholder={"Task Name"}
            onTextChange={handleTextChange}
          ></TextBox>
        </div>
      </div>
      <div className="taskAdd__container__item2">
        <div className="taskAdd__container__item2--priority">
          <label className="label">Priority</label>
          <select onChange={handlePriorityChange} value={priority}>
            {/* <option disabled>Select...</option> */}
            <option value={1}>High</option>
            <option value={2}>Moderate</option>
            <option value={3}>Low</option>
          </select>
        </div>
      </div>
      <div className="taskAdd__container__item3">
        <Button onClick={addTask} children={"Add"}></Button>
      </div>
      <p className="taskAddError">{error}</p>
    </div>
  );
};

export default TaskAdd;
