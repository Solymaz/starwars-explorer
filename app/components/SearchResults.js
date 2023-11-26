import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const NoResults = () => (
  <Typography variant="subtitle1" textAlign="center" marginTop={2}>
    No results found! 😞 <br />
    Try again 💪🏼
  </Typography>
);

export default function SearchResults({
  searchResults,
  hasSearched,
  onSelectItem,
  type,
}) {
  if (hasSearched && searchResults.length === 0) {
    return <NoResults />;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} justifyContent="flex-start">
        {searchResults.map((item) => (
          <Grid item key={item.url} xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined">
              <CardActionArea onClick={() => onSelectItem(item)}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    align="center"
                  >
                    {type === "character" ? item.name : item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
