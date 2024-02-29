import { useState } from "react";
import Header from "./components/Header";
import ReviewList from "./components/ReviewList";
import WriteReviewButton from "./components/WriteReviewButton";
import WriteReviewModal from "./components/WriteReviewModal";
import './App.css';

function App() {
  const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);

  return (
    <>
    <Header />
    <ReviewList />
    <WriteReviewButton onClick={() => {setShowWriteReviewModal(true)}}/>
    <WriteReviewModal showModal={showWriteReviewModal} onClose={() => {setShowWriteReviewModal(false)}} />
    </>
  );
}

export default App;
