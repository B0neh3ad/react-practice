import styles from "../styles/Review.module.css";
import editReview from "../assets/editReview.svg";
import deleteReview from "../assets/deleteReview.svg";

type ReviewValue = {
    id: number,
    image: string,
    snack_name: string,
    rating: number,
    content: string,
};

type ReviewProps = {
    value: ReviewValue
};

function Review({value}: ReviewProps) {
    return (
    <div className={styles.review} data-testid="review">
        <img className={styles.snackImage} data-testid="snack-image" src={value.image} alt="과자 사진"></img>
        <div className={styles.reviewMain}>
            <div className={styles.reviewHeader}>
                <span className={styles.snackName}>{value.snack_name}</span>
                /
                <span className={styles.rating}>★{value.rating.toFixed(1)}</span>
                <div className={styles.reviewButtonWrapper}>
                    <img className={styles.reviewButton} src={editReview} width="20" height="20"></img>
                    <img className={styles.reviewButton} src={deleteReview} width="20" height="20"></img>
                </div>
            </div>
            <p className={styles.content}>{value.content}</p>
        </div>
    </div>
    );
}

export default Review;
