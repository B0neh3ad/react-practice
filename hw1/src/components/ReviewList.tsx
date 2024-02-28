import { useState } from "react";
import Review from "./Review";
import styles from "../styles/ReviewList.module.css";
import initReviewList from '../assets/data.json';

function ReviewList() {
    const [reviews, setReviews] = useState(initReviewList);

    return (
        <section className={styles.reviewList}>
            <ul data-testid="review-list">
                {reviews.map(review => (
                    <li key={review.id}>
                        <Review value={review} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ReviewList;
