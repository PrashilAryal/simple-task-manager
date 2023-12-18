import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "../../assets/css/searchBox.css";

const SearchBox = ({ getData }) => {
  const [searchName, setSearchName] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);

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
        // console.log("HELL0O");
        // console.log(searchName);
        // console.log(searchData.id);
        console.log(response);
      } catch (error) {
        console.error("Error: ", error);
        // console.log(error);
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

  const onSearchResultClick = () => {
    setShowSearchResult(false);
  };

  useEffect(() => {
    getAllData();
    if (searchData === null) {
      setShowSearchResult(false);
    }
    // console.log("useEffect on SearchBox.js * searchData:", searchData);
  }, [getData]);
  // }, [searchData]);

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
        {/* <button onClick={getSearchData}>Search</button> */}
      </div>
      {showSearchResult && (
        <div className="search__container__result">
          {/* {searchData && <p>{searchData}</p>} */}
          {error || searchData == null ? (
            <p>{error}</p>
          ) : searchData.id ? (
            <div className="search__container__result__data">
              <p className="result__task">{searchData.task_name}</p>
              <p className="result__priority">Priority: {taskPriority}</p>
              <p className="result__status">Status: {taskStatus}</p>
              <div className="result__button">
                <Button onClick={onSearchResultClick} children={"OK"}></Button>
              </div>
            </div>
          ) : (
            <p>No matching result</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
