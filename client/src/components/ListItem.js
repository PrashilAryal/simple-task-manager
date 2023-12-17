import React, { useState } from "react";
// import React from "react";
import axios from "axios";
import "../assets/css/listItem.css";

const ListItem = ({ data, getData }) => {
  const [isChecked, setIsChecked] = useState(data.is_complete);

  const handleCheckboxChange = async () => {
    try {
      setIsChecked(!isChecked);
      console.log("HandleCheckboxChange * ID: ");
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/todo/${data.id}`,
        {
          is_complete: !isChecked,
        }
      );

      if (response.status !== 200) {
        setIsChecked(!isChecked);
      } else {
        getData();
      }
    } catch (error) {
      console.log("Error on HandleCheckboxChange: ", error);
      setIsChecked(!isChecked);
    }
  };
  return (
    <div>
      <div className="listItem">
        <div className="listItem__details">
          <p>{data.task_name}</p>
          <span>
            {data.priority} ID:{data.id}
          </span>
        </div>
        <input
          type="checkbox"
          className={isChecked ? "completedTask" : "incompleteTask"}
          checked={isChecked}
          onChange={handleCheckboxChange}
        ></input>
      </div>
    </div>
  );
};

export default ListItem;
