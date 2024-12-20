import React from "react";
import { useSearchParams } from "react-router-dom";

const SortFilterBar = ({ setSortBy, setFilterBy, filterBy, sortBy }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sort_by: sortBy,
    });
    setSortBy(sortBy);
  };

  const handleFilterChange = (e) => {
    const filterBy = e.target.value;
    const params = { ...Object.fromEntries(searchParams) };
    if (filterBy) {
      params.filter_by = filterBy;
    } else {
      delete params.filter_by;
    }
    setSearchParams(params);
    setFilterBy(filterBy);
  };

  return (
    <div className="sort-filter-bar">
      <label>
        Sort By:
        <select onChange={handleSortChange} value={sortBy}>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>
      </label>
      <label>
        Filter By Topic:
        <select onChange={handleFilterChange} value={filterBy}>
          <option value="">All</option>
          <option value="coding">Coding</option>
          <option value="cooking">Cooking</option>
          <option value="football">Football</option>
        </select>
      </label>
    </div>
  );
};

export default SortFilterBar;