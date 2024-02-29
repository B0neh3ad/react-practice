import { useState } from "react";
import initReviewList from './assets/data.json';
import Header from "./components/Header";
import ReviewList from "./components/ReviewList";
import WriteReviewButton from "./components/WriteReviewButton";
import WriteReviewModal from "./components/WriteReviewModal";
import DeleteReviewModal from './components/DeleteReviewModal';
import './App.css';

function App() {
    const [reviews, setReviews] = useState(initReviewList);
    const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);

    const [editReviewId, setEditReviewId] = useState<number | null>(null);
    const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);

    function handleEdit(reviewId: number) {
        setEditReviewId(reviewId);
    }

    function handleCancelEdit() {
        setEditReviewId(null);
    }

    function handleSave(reviewId: number, content: string) {
        const newReviews = reviews.map((value) => {
            if (value.id === reviewId) {
                const newValue = { ...value, content: content };
                console.log(newValue);
                return newValue;
            }
            return value;
        })
        setReviews(newReviews);
        setEditReviewId(null);
    }

    /* write review modal */
    function handleOpenWriteReviewModal() {
        setShowWriteReviewModal(true);
    }

    function handleCloseWriteReviewModal() {
        setShowWriteReviewModal(false);
    }

    /* delete review modal*/
    function handleOpenDeleteReviewModal(reviewId: number) {
        setDeleteReviewId(reviewId);
        setShowDeleteReviewModal(true);
    }

    function handleDelete() {
        console.log(`delete review #${deleteReviewId}`);
        const newReviews = reviews.filter((value) => {
            return value.id !== deleteReviewId;
        })
        setReviews(newReviews);
        handleCloseDeleteReviewModal();
    }

    function handleCloseDeleteReviewModal() {
        setDeleteReviewId(null);
        setShowDeleteReviewModal(false);
    }

    return (
        <>
            <Header />
            <ReviewList
                reviews={reviews}
                editReviewId={editReviewId}
                onEdit={handleEdit}
                onCancelEdit={handleCancelEdit}
                onSave={handleSave}
                onOpenDeleteReviewModal={handleOpenDeleteReviewModal}
            />
            <WriteReviewButton onClick={handleOpenWriteReviewModal} />
            <WriteReviewModal
                showModal={showWriteReviewModal}
                onClose={handleCloseWriteReviewModal}
            />
            <DeleteReviewModal
                showModal={showDeleteReviewModal}
                snackName={deleteReviewId ? reviews.find(review => review.id === deleteReviewId)!.snack_name : ""}
                onClose={handleCloseDeleteReviewModal}
                onDelete={handleDelete}
            />
        </>
    );
}

export default App;
