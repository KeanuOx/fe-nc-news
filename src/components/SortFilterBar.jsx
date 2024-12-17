import React from "react";

const SortFilterBar = ({ setSortBy, setFilterBy }) => {
  return (
    <div className="sort-filter-bar">
      <label>
        Sort By:
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>
      </label>

      <label>
        Filter By Topic:
        <select onChange={(e) => setFilterBy(e.target.value)}>
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