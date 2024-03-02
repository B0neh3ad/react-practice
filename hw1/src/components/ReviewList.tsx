import ReviewItem from "./ReviewItem";
import styles from "../styles/ReviewList.module.css";
import { useSnackContext } from "../contexts/SnackContext";


function ReviewList() {
    const { reviews } = useSnackContext();

    return (
        <>
            <section className={styles.reviewList}>
                <ul data-testid="review-list">
                    {reviews.map(review => (
                        <li key={review.id}>
                            <ReviewItem review={review} />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default ReviewList;
