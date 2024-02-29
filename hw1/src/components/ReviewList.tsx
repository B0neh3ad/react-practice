import { useState } from "react";
import Review from "./Review";
import styles from "../styles/ReviewList.module.css";

type ReviewListProps = {
    reviews: ReviewValue[],
    editReviewId: number | null,
    onEdit(reviewId: number): void,
    onCancelEdit(): void,
    onSave(reviewId: number, content: string): void,
    onOpenDeleteReviewModal(reviewId: number): void,
};

export type ReviewValue = {
    id: number,
    image: string,
    snack_name: string,
    rating: number,
    content: string,
};

function ReviewList({ reviews, editReviewId, onEdit, onCancelEdit, onSave, onOpenDeleteReviewModal }: ReviewListProps) {
    function handleEdit(reviewId: number) {
        onEdit(reviewId);
    }

    function handleCancelEdit() {
        onCancelEdit();
    }

    function handleSave(reviewId: number, content: string) {
        onSave(reviewId, content);
    }

    function handleOpenDeleteReviewModal(reviewId: number) {
        onOpenDeleteReviewModal(reviewId);
    }

    return (
        <>
            <section className={styles.reviewList}>
                <ul data-testid="review-list">
                    {reviews.map(review => (
                        <li key={review.id}>
                            <Review
                                reviewValue={review}
                                editReviewId={editReviewId}
                                onEdit={() => { handleEdit(review.id) }}
                                onCancelEdit={() => { handleCancelEdit() }}
                                onSave={(content) => { handleSave(review.id, content) }}
                                onDelete={() => { handleOpenDeleteReviewModal(review.id) }}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default ReviewList;
