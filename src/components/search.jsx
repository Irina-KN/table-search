import React from "react";
import { data } from "../constants/data.js";

function SearchComponent() {
  const [searchText, setSearchText] = React.useState("");
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: "asc",
  });
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };
  let searchTextInData = React.useMemo(() => {
    if (!searchText) return data;
    const searchLower = searchText.toLowerCase();
    return data.filter((item) => {
      const fields = ["first_name", "last_name", "email", "phone"];
      return fields.some((field) => {
        return item[field].toLowerCase().startsWith(searchLower);
      });
    });
  }, [searchText]);
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return searchTextInData;
    return [...searchTextInData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      } else {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    });
  }, [searchTextInData, sortConfig]);
  return (
    <div className="searchContainer">
      <input
        type="search"
        placeholder="Print text"
        value={searchText}
        onChange={handleSearch}
      />
      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th
                onClick={() => {
                  handleSort("first_name");
                }}
              >
                First name
                {sortConfig.key === "first_name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => {
                  handleSort("last_name");
                }}
              >
                Last name
                {sortConfig.key === "last_name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => {
                  handleSort("email");
                }}
              >
                Email
                {sortConfig.key === "email" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => {
                  handleSort("phone");
                }}
              >
                Phone
                {sortConfig.key === "phone" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default SearchComponent;
