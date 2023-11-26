import SearchView from "../components/SearchView";

export default function MoviesPage() {
  return (
    <SearchView type="movie" searchEndpoint="https://swapi.dev/api/films/" />
  );
}
