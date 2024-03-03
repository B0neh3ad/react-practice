import { ChangeEventHandler, useState } from "react";
import { Review } from "../contexts/SnackContext";
import styles from "../styles/ReviewItem.module.css";
import editReviewIcon from "../assets/editReview.svg";
import editReviewCancelIcon from "../assets/cancelEditReview.svg";
import deleteReviewIcon from "../assets/deleteReview.svg";
import editReviewSaveIcon from "../assets/saveReview.svg";
import { useSnackContext } from "../contexts/SnackContext";

function ReviewItem({ review }: { review: Review }) {
    const { getSnackById, editReviewId, editReview, cancelEditReview, saveEditReview, openDeleteReviewModal } = useSnackContext();
    const snack = getSnackById(review.snack_id);

    // content 편집을 위한 state
    const [content, setContent] = useState(review.content)
    const handleChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setContent(e.target.value);
    }

    return (
        <div className={styles.review} data-testid="review">
            <img className={styles.snackImage} data-testid="snack-image" src={snack?.image} alt="과자 사진"></img>
            <div className={styles.reviewMain}>
                <div className={styles.reviewHeader}>
                    <span className={styles.snackName}>{snack ? snack.snack_name : "(알 수 없음)"}</span>
                    /
                    <span className={styles.rating}>★{review.rating.toFixed(1)}</span>
                    <div className={styles.reviewButtonWrapper}>
                        {
                            editReviewId === review.id
                                ? <>
                                    <img data-testid="edit-review-save" className={styles.editReviewSaveButton} src={editReviewSaveIcon} onClick={() => { saveEditReview(review.id, content) }}></img>
                                    <img data-testid="edit-review-cancel" className={styles.editReviewCancelButton} src={editReviewCancelIcon} onClick={cancelEditReview}></img>
                                </>
                                : editReviewId === null
                                && <>
                                    <img data-testid="edit-review" className={styles.editReviewButton} src={editReviewIcon} onClick={() => { editReview(review.id) }}></img>
                                    <img data-testid="delete-review" className={styles.deleteReviewButton} src={deleteReviewIcon} onClick={() => { openDeleteReviewModal(review.id) }}></img>
                                </>
                        }
                    </div>
                </div>
                {
                    editReviewId === review.id
                        ? <textarea data-testid="edit-review-content-input" id="edit-review-content-input" className={styles.editReviewContentInput} value={content} onChange={handleChangeContent} />
                        : <p className={styles.content}>{review.content}</p>
                }
            </div>
        </div>
    );
}

export default ReviewItem;
