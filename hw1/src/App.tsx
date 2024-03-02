import { useState } from "react";
import initReviewList from './assets/data.json';
import Header from "./components/Header";
import ReviewList from "./components/ReviewList";
import WriteReviewButton from "./components/WriteReviewButton";
import WriteReviewModal from "./components/WriteReviewModal";
import DeleteReviewModal from './components/DeleteReviewModal';
import { ReviewForm } from "./components/WriteReviewModal";
import { ReviewValue } from "./components/ReviewList";
import './App.css';

export type ValidationErrorMessage = {
    image: string,
    snack_name: string,
    rating: string,
    content: string,
}

function App() {
    const [nextId, setNextId] = useState(1000);
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

    function handleSaveEdit(reviewId: number, content: string) {
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
        const newReviews = reviews.filter(value => value.id !== deleteReviewId)
        setReviews(newReviews);
        handleCloseDeleteReviewModal();
    }

    function handleCloseDeleteReviewModal() {
        setShowDeleteReviewModal(false);
    }

    /**
     * 전달받은 reviewForm을 'ReviewValue' type으로 전환하여 'reviews' state에 저장
     * @param validatedReviewForm WriteReviewModal Component에서 validation을 수행한 reviewForm
     */
    function handleSubmit(validatedReviewForm: ReviewForm) {
        const newReview: ReviewValue = {
            id: nextId,
            image: validatedReviewForm.image,
            snack_name: validatedReviewForm.snack_name,
            rating: Number(validatedReviewForm.rating),
            content: validatedReviewForm.content,
        };
        const newReviews = [...reviews, newReview];
        setReviews(newReviews);
        setNextId(nextId + 1);
        handleCloseWriteReviewModal();
    }

    return (
        <>
            <Header />
            <ReviewList
                reviews={reviews}
                editReviewId={editReviewId}
                onEdit={handleEdit}
                onCancelEdit={handleCancelEdit}
                onSaveEdit={handleSaveEdit}
                onOpenDeleteReviewModal={handleOpenDeleteReviewModal}
            />
            <WriteReviewButton onClick={handleOpenWriteReviewModal} />
            <WriteReviewModal
                showModal={showWriteReviewModal}
                onClose={handleCloseWriteReviewModal}
                onSubmit={handleSubmit}
            />
            <DeleteReviewModal
                showModal={showDeleteReviewModal}
                snackName={
                    reviews.find(review => review.id === deleteReviewId)?.snack_name
                }
                onClose={handleCloseDeleteReviewModal}
                onDelete={handleDelete}
            />
        </>
    );
}

export default App;
