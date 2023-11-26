"use client";

import { useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import styles from "./search.module.css";

export default function Search({ onSearch, searchEndpoint }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchedTerm, setLastSearchedTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setLastSearchedTerm(searchTerm);
    setError(null);
    setIsLoading(true);

    const fullUrl = `${searchEndpoint}?search=${searchTerm}`;

    fetch(fullUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        onSearch(data.results), setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors that occur during the fetch or during response processing
        setError(error.message);
        onSearch([]); // Clear search results on error
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <label htmlFor="search" className={styles.hiddenLabel}>
          Search Star Wars
        </label>
        <input
          className={styles.input}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          id="search"
          aria-labelledby="search"
        />
      </form>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {lastSearchedTerm && !isLoading && !error && (
            <p>
              Showing results for <strong>{lastSearchedTerm}</strong>
            </p>
          )}
          {error && !isLoading && (
            <Typography color="error">{error}</Typography>
          )}
        </>
      )}
    </>
  );
}
