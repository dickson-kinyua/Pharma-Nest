"use client";

import { useEffect, useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchResults from "./SearchResults";
import { FaSearch } from "react-icons/fa";

const placeholders = [
  "Looking for cough syrup or antibiotics?",
  "Explore immunity boosters ...",
  "Search for medicines, health products",
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(placeholders[0]);

  const fetchSearchResults = useDebouncedCallback(
    useCallback(async (event) => {
      const term = event.target.value.trim();
      setSearchTerm(term);

      if (!term) {
        setResults(null);
        return;
      }

      setLoading(true); // Start loading

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${term}`,
          {
            cache: "no-store",
          }
        );
        const data = await response.json();

        if (!response.ok) {
          console.error(data.error);
          setResults(null);
        } else {
          setResults(data);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults(null);
      } finally {
        setLoading(false); // Stop loading
      }
    }, []),
    2000
  );

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setPlaceholder(placeholders[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2 mx-3">
      <form
        className="w-full sm:w-1/2 mx-auto border bg-white border-blue-400 p-2 relative rounded-xl flex gap-2 items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <FaSearch size={20} />
        <input
          type="text"
          onChange={fetchSearchResults}
          placeholder={placeholder}
          className="border-none outline-none w-full"
        />
      </form>

      {loading ? (
        <div className="flex items-center justify-center">Loading...</div>
      ) : searchTerm && results ? (
        results.length > 0 ? (
          <SearchResults results={results} />
        ) : (
          <div className="flex items-center justify-center">
            No results found
          </div>
        )
      ) : null}
    </div>
  );
};

export default Search;
