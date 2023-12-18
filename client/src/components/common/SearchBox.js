import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "../../assets/css/searchBox.css";

const SearchBox = () => {
  const [searchName, setSearchName] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

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

  useEffect(() => {
    getAllData();
    // console.log("useEffect on SearchBox.js * searchData:", searchData);
  }, []);
  // }, [searchData]);

  return (
    <div className="searchContainer">
      <p>Search</p>
      <div className="searchContainer__select">
        <Select
          isClearable={true}
          value={{ label: searchName, value: searchName }}
          onChange={handleListItemClick}
          onInputChange={handleInputChange}
          options={suggestions.map((item) => ({
            label: item.task_name,
            value: item.task_name,
          }))}
          placeholder="Type here..."
        ></Select>
      </div>

      <div className="searchContainer__button">
        <Button onClick={getSearchData} children={"Search"}></Button>
      </div>
      {/* <button onClick={getSearchData}>Search</button> */}
      <div>
        {/* {searchData && <p>{searchData}</p>} */}
        {error || searchData == null ? (
          <p>{error}</p>
        ) : searchData.id ? (
          <p>
            ID: {searchData.id}, Name:{searchData.task_name}
          </p>
        ) : (
          <p>No matching result</p>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
