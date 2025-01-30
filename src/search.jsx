import React from "react";
import { data } from "./data.js";

function SearchComponent() {
  const [searchText, setSearchText] = React.useState("");
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  let searchTextInData = data.filter((item) => {
    if (item.first_name.toLowerCase().startsWith(searchText.toLowerCase())) {
      return item;
    }
    if (item.last_name.toLowerCase().startsWith(searchText.toLowerCase())) {
      return item;
    }
    if (item.email.toLowerCase().startsWith(searchText.toLowerCase())) {
      return item;
    }
    if (item.phone.toLowerCase().startsWith(searchText.toLowerCase())) {
      return item;
    }
  });
  let listSerialNumber = 0;
  let list = searchTextInData.map((item) => {
    listSerialNumber = listSerialNumber + 1;
    return (
      <tr key={item.id}>
        <td>{listSerialNumber}</td>
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
      </tr>
    );
  });
  return (
    <div className="searchContainer">
      <input
        type="search"
        placeholder="Print text"
        value={searchText}
        onChange={handleSearch}
      ></input>
      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </div>
  );
}
export default SearchComponent;
