import React, { useEffect, useState, useCallback } from "react";

import JokeList from "./components/JokeList";
import "./App.css";
import Loader from "./components/Loader";
import AddJoke from "./components/AddJoke";

function App() {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // function fetchJokesHandler() {
  //   fetch("https://official-joke-api.appspot.com/random_ten")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setJokes(data);
  //     });
  // }
  const fetchJokesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-jokes-b425b-default-rtdb.firebaseio.com/jokes.json"
      );
      if (!response.ok) {
        throw new Error("Smth went wrong...");
      }
      const data = await response.json();
      const loadedJokes = [];

      for (const key in data) {
        loadedJokes.push({
          id: key,
          type: data[key].type,
          setup: data[key].setup,
          punchline: data[key].punchline,
        });
      }
      setJokes(loadedJokes);
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchJokesHandler();
  }, [fetchJokesHandler]);

  async function addJokeHandler(joke) {
    const response = await fetch(
      "https://react-jokes-b425b-default-rtdb.firebaseio.com/jokes.json",
      {
        method: "POST",
        body: JSON.stringify(joke),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <React.Fragment>
      <section>
        <AddJoke onAddJoke={addJokeHandler} />
      </section>
      <section>
        <button onClick={fetchJokesHandler}>Fetch Jokes</button>
      </section>
      <section>
        {isLoading && <Loader />}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && jokes.length > 0 && <JokeList jokes={jokes} />}
      </section>
    </React.Fragment>
  );
}

export default App;
