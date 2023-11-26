"use client";

import { useState } from "react";

const useSearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (searchData) => {
    setHasSearched(true);
    setSearchResults(searchData);
  };
  return {
    searchResults,
    handleSearch,
    hasSearched,
  };
};

export default useSearchResults;
