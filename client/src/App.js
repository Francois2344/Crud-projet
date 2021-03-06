import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [Review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");


  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: Review,
    });

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: Review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put(`http://localhost:3001/api/update/`, {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="title">
      <h1>Crud App</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label>Movie Review:</label>
        <input
          type="text"
          name="Review"
          onChange={(e) => setReview(e.target.value)}
        />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((value) => {
          return (
            <div className="card">
              <h2> {value.movieName} </h2>
              <p> {value.movieReview} </p>

              <button onClick={() => deleteReview(value.movieName)}>
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => setNewReview(e.target.value)}
              ></input>
              <button onClick={() => updateReview(value.movieName)}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
