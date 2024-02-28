import styles from "../styles/Review.module.css";

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
            <div className={styles.reviewTitle}>
                <span className={styles.snackName}>{value.snack_name}</span>
                /
                <span className={styles.rating}>★{value.rating.toFixed(1)}</span>
            </div>
            <p className={styles.content}>{value.content}</p>
        </div>
    </div>
    );
}

export default Review;
