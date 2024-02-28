import { useState } from "react";
import Header from "./components/Header";
import ReviewList from "./components/ReviewList";
import WriteReviewButton from "./components/WriteReviewButton";
import './App.css';

function App() {
  return (
    <>
    <Header />
    <ReviewList />
    <WriteReviewButton />
    </>
  );
}

export default App;
