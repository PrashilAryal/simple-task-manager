import Button from "../components/common/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import Modal from "react-modal";
import "../assets/css/deleteTask.css";
Modal.setAppElement("#root");

const DeleteTask = ({ getData }) => {
  const [searchName, setSearchName] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/todo`);
      const data = response.data;
      setSuggestions(data);
    } catch (error) {
      console.log("Error fetching all data: ", error);
      setSuggestions([]);
    }
  };
  const getSearchData = async () => {
    if (searchName === "") {
      console.log("No word");
    } else {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/todo/search/${searchName}`
        );
        const item = response.data[0];
        setSearchData(() => item);
        console.log("getSearchData on SearchBox.js: ", response.data[0]);
        setError(null);
        console.log(response);
        if (item) {
          setIsModalOpen(true);
        } else {
          setError("No matching result");
        }
      } catch (error) {
        console.error("Error: ", error);
        setSearchData(null);
        setError("Error");
      }
    }
  };

  const handleDeletionConfirm = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}/todo/delete/${searchName}`
      );
      setSearchName("");
      setSearchData(null);
      setError(null);
      setIsModalOpen(false);
      console.log("Todo deleted successfully");
      getData();
    } catch (error) {
      console.log("Error while deleting: ", error);
      setSearchData(null);
      setError("Error");
    }
  };
  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (newValue, { action }) => {
    if (action === "input-change") {
      setSearchName(newValue);
    }
  };

  const handleListItemClick = (selectedOption) => {
    setSearchName(selectedOption ? selectedOption.label : "");
  };

  useEffect(() => {
    getAllData();
    // console.log("useEffect on SearchBox.js * searchData:", searchData);
  }, [getData]);
  // }, [searchData]);

  return (
    <div className="delete__container">
      <p>Delete</p>
      <div className="delete__container__select">
        <Select
          isClearable={true}
          value={{ label: searchName, value: searchName }}
          onChange={handleListItemClick}
          onInputChange={handleInputChange}
          options={
            suggestions && suggestions.map
              ? suggestions.map((item) => ({
                  label: item.task_name,
                  value: item.task_name,
                }))
              : []
          }
          placeholder="Type here..."
        ></Select>
      </div>

      <div className="delete__container__button">
        <Button onClick={getSearchData} children={"Delete"}></Button>
      </div>
      <div className="delete__task__modal">
        <Modal
          className={"modal-box"}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Confirmation Modal"
        >
          <p>Are you sure you want to delete this item?</p>
          <button onClick={handleDeletionConfirm}>Yes</button>
          <button onClick={handleDeleteCancel}>Cancel</button>
        </Modal>
      </div>
    </div>
  );
};

export default DeleteTask;
