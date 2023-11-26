import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SearchResultDetails({ data, type }) {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Avoid unnecessary fetches: Only perform fetches if data.films or data.characters is not empty
    if (
      data &&
      ((type === "character" && data.films.length) ||
        (type === "movie" && data.characters.length))
    ) {
      setIsLoading(true);
      setError(null);

      const urls = type === "character" ? data.films : data.characters;

      Promise.all(
        urls.map((url) =>
          fetch(url)
            .then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.json();
            })
            .catch((error) => {
              console.error("Fetch error for URL", url, error.message);
              return null; // Handle each fetch error individually
            })
        )
      )
        .then((results) => {
          setDetails(results.filter((result) => result != null)); // Filter out failed fetches
        })
        .catch((error) => {
          console.error("Error fetching details", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [data, type]);

  if (isLoading && !error) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error && !isLoading) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
        aria-label={`${type} details`}
      >
        <Typography variant="h6">
          {type === "character" ? data.name : data.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ mx: 2 }}
        id="panel-content"
        aria-labelledby="panel-header"
      >
        {type === "character" ? (
          <>
            <Typography variant="subtitle1">Name: {data.name}</Typography>
            <Typography variant="subtitle1">Gender: {data.gender}</Typography>
            <Typography variant="subtitle1" component="div">
              Films:
            </Typography>
            <ul>
              {details.map((film) => (
                <li key={film.url}>{film.title}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <Typography variant="subtitle1">Title: {data.title}</Typography>
            <Typography variant="subtitle1">
              Director: {data.director}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Characters:
            </Typography>
            <ul>
              {details.map((character) => (
                <li key={character.url}>{character.name}</li>
              ))}
            </ul>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
