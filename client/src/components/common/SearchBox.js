import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/searchBox.css";

const SearchBox = () => {
  const [searchName, setSearchName] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [error, setError] = useState(null);

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
  useEffect(() => {
    console.log("useEffect on SearchBox.js * searchData:", searchData);
  }, [searchData]);

  return (
    <div className="searchContainer">
      <p>Search</p>
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        id="searchTodo"
      ></input>
      <Button onClick={getSearchData} children={"Search"}></Button>
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
