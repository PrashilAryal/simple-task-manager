import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "../../assets/css/searchBox.css";
import Modal from "react-modal";

const SearchBox = ({ getData }) => {
  const [searchName, setSearchName] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
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
        setShowSearchResult(true);
        console.log("getSearchData on SearchBox.js: ", response.data[0]);
        setError(null);
        if (item.priority === 1) {
          setTaskPriority("High");
        } else if (item.priority === 2) {
          setTaskPriority("Moderate");
        } else {
          setTaskPriority("Low");
        }
        if (item.is_complete === true) {
          setTaskStatus("Done");
        } else {
          setTaskStatus("Not Done");
        }
        console.log(response);
      } catch (error) {
        console.error("Error: ", error);
        setSearchData(null);
        setError("Error");
      }
    }
  };
  const handleInputChange = (newValue, { action }) => {
    if (action === "input-change") {
      setSearchName(newValue);
    }
  };

  const handleListItemClick = (selectedOption) => {
    setSearchName(selectedOption ? selectedOption.label : "");
  };

  const onSearchResultCancelClick = () => {
    setShowSearchResult(false);
  };
  const onSearchResultDeleteClick = () => {
    setIsModalOpen(true);
  };

  // Deletion
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

  useEffect(() => {
    getAllData();
    if (searchData === null) {
      setShowSearchResult(false);
    }
  }, [getData]);

  return (
    <div className="searchContainer">
      <div className="searchContainer__box">
        <p>Search</p>
        <div className="searchContainer__select">
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
          ></Select>
        </div>

        <div className="searchContainer__button">
          <Button onClick={getSearchData} children={"Search"}></Button>
        </div>
      </div>
      {showSearchResult && (
        <div className="search__container__result">
          {error || searchData == null ? (
            <p>{error}</p>
          ) : searchData.id ? (
            <div className="search__container__result__data">
              <p className="result__task">{searchData.task_name}</p>
              <p className="result__priority">Priority: {taskPriority}</p>
              <p className="result__status">Status: {taskStatus}</p>
              <div className="result__button">
                <Button
                  onClick={onSearchResultCancelClick}
                  children={"Cancel"}
                ></Button>
                <Button
                  onClick={onSearchResultDeleteClick}
                  children={"Delete"}
                ></Button>
              </div>
            </div>
          ) : (
            <p>No matching result</p>
          )}
        </div>
      )}
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

export default SearchBox;
