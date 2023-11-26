"use client";

import { Grid } from "@mui/material";
import Search from "./Search";
import { useState } from "react";
import PageToggle from "./PageToggle";
import useSearchResults from "../hooks/useSearchResults";
import SearchResults from "./SearchResults";
import SearchResultDetails from "./SearchResultDetails";
import styles from "./searchView.module.css";

export default function SearchView({ type, searchEndpoint }) {
  const { searchResults, handleSearch, hasSearched } = useSearchResults();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <Grid container className={styles.viewHeight}>
      <Grid item xs={12} className={styles.searchBar}>
        <PageToggle />
        <Search onSearch={handleSearch} searchEndpoint={searchEndpoint} />
      </Grid>
      <Grid item xs={12} className={styles.searchResults}>
        <SearchResults
          searchResults={searchResults}
          type={type}
          hasSearched={hasSearched}
          onSelectItem={setSelectedItem}
        />
      </Grid>
      <Grid item xs={12} className={styles.searchResults}>
        {selectedItem && (
          <SearchResultDetails data={selectedItem} type={type} />
        )}
      </Grid>
    </Grid>
  );
}
