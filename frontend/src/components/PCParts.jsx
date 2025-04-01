import { useState, useEffect } from "react";
import axios from "axios";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function PCParts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rateLimited, setRateLimited] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (!debouncedSearchTerm || rateLimited) {
      setParts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(
        `http://127.0.0.1:8000/api/parts/scrape/?search=${debouncedSearchTerm}`
      )
      .then((response) => {
        if (response.data.parts && response.data.parts.length > 0) {
          setParts(response.data.parts);
        } else {
          setParts([]);
          setError("No parts found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          setRateLimited(true);
          setError("Rate limit exceeded. Please wait and try again later.");
          setTimeout(() => setRateLimited(false), 5 * 60 * 1000);
        } else {
          setError("Error fetching parts.");
        }
        setLoading(false);
        console.error("Error fetching parts:", error);
      });
  }, [debouncedSearchTerm, rateLimited]);

  if (loading) {
    return <p>Loading parts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>PC Parts List</h1>

      <div>
        <label>Search for a part:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search CPU, GPU, etc..."
        />
      </div>

      <ul>
        {parts.length > 0 ? (
          parts.map((part, index) => (
            <li key={part.url || index}>
              <strong>{part.name}</strong> - {part.price || "N/A"}
            </li>
          ))
        ) : (
          <p>No parts found.</p>
        )}
      </ul>
    </div>
  );
}

export default PCParts;
