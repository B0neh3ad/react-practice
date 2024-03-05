import ReviewItem from "./ReviewItem";
import styles from "../styles/ReviewList.module.css";
import { useSnackContext } from "../contexts/SnackContext";


function ReviewList({ snackId = null }: { snackId: number | null }) {
    var { reviews } = useSnackContext();
    if (snackId !== null) {
        const newReviews = reviews.filter(review => review.snack_id === snackId);
        reviews = newReviews;
    }

    return (
        <>
            <section className={styles.reviewList} style={{ marginTop: snackId === null ? "60px" : "10px" }}>
                <ul data-testid="review-list">
                    {reviews.map(review => (
                        <li key={review.id}>
                            <ReviewItem review={review} includeSnackInfo={snackId === null} />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default ReviewList;
