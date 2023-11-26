import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharactersPage from "../characters/page";

// Mock API call
global.fetch = jest.fn((url) => {
  const searchTerm = new URL(url).searchParams.get("search");
  if (searchTerm === "Luke") {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            {
              name: "Luke Skywalker",
              gender: "male",
              films: [
                "A New Hope",
                "The Empire Strikes Back",
                "Return of the Jedi",
              ],
              url: "https://swapi.dev/api/people/1/",
            },
          ],
        }),
    });
  } else {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });
  }
});

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  fetch.mockClear();
});

test("user can search for Luke and view details", async () => {
  render(<CharactersPage />);

  // Input "Luke" into the search field and simulate "Enter" key press to submit
  const searchInput = screen.getByRole("textbox", {
    name: /search/i,
  });
  userEvent.type(searchInput, "Luke{enter}");

  // Wait for search results to appear
  await waitFor(() => screen.getByText("Luke Skywalker"));

  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
});

test("no results are found for a non-existent character", async () => {
  render(<CharactersPage />);

  // Input a non-existent character name and simulate "Enter" key press
  const searchInput = screen.getByRole("textbox", { name: /search/i });
  userEvent.type(searchInput, "NonExistentCharacter{enter}");

  // Wait for the message indicating no results
  await waitFor(() => screen.getByText(/no results found/i));

  expect(screen.getByText(/no results found/i)).toBeInTheDocument();
});
