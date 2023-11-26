import SearchView from "../components/SearchView";

export default function CharactersPage() {
  return (
    <SearchView
      type="character"
      searchEndpoint="https://swapi.dev/api/people/"
    />
  );
}
