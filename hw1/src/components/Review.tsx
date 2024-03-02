import { ChangeEventHandler, useState } from "react";
import { ReviewValue } from "./ReviewList";
import styles from "../styles/Review.module.css";
import editReview from "../assets/editReview.svg";
import editReviewCancel from "../assets/cancelEditReview.svg";
import deleteReview from "../assets/deleteReview.svg";
import editReviewSave from "../assets/saveReview.svg";

type ReviewProps = {
    reviewValue: ReviewValue,
    editReviewId: number | null,
    onEdit(): void,
    onCancelEdit(): void,
    onSaveEdit(content: string): void,
    onDelete(): void,
};

function Review({reviewValue, editReviewId, onEdit, onCancelEdit, onSaveEdit, onDelete}: ReviewProps) {
    const [content, setContent] = useState(reviewValue.content) // content 편집을 위한 state
    const handleChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setContent(e.target.value);
    }

    return (
    <div className={styles.review} data-testid="review">
        <img className={styles.snackImage} data-testid="snack-image" src={reviewValue.image} alt="과자 사진"></img>
        <div className={styles.reviewMain}>
            <div className={styles.reviewHeader}>
                <span className={styles.snackName}>{reviewValue.snack_name}</span>
                /
                <span className={styles.rating}>★{reviewValue.rating.toFixed(1)}</span>
                <div className={styles.reviewButtonWrapper}>
                    {
                        editReviewId === reviewValue.id
                        ? <>
                            <img data-testid="edit-review-save" className={styles.editReviewSaveButton} src={editReviewSave} onClick={()=>{onSaveEdit(content)}}></img>
                            <img data-testid="edit-review-cancel" className={styles.editReviewCancelButton} src={editReviewCancel} onClick={onCancelEdit}></img>
                        </>
                        : editReviewId === null
                        && <>
                            <img data-testid="edit-review" className={styles.editReviewButton} src={editReview} onClick={onEdit}></img>
                            <img data-testid="delete-review" className={styles.deleteReviewButton} src={deleteReview} onClick={onDelete}></img>
                        </>
                    }
                </div>
            </div>
            {
                editReviewId === reviewValue.id
                ? <textarea data-testid="edit-review-content-input" id="edit-review-content-input" className={styles.editReviewContentInput} value={content} onChange={handleChangeContent}/>
                : <p className={styles.content}>{reviewValue.content}</p>
            }
        </div>
    </div>
    );
}

export default Review;
