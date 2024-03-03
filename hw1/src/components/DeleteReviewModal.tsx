import { useSnackContext } from '../contexts/SnackContext';
import modalStyles from '../styles/common/Modal.module.css';
import styles from '../styles/DeleteReviewModal.module.css';

function DeleteReviewModal() {
    const {
        reviews,
        getSnackById,
        deleteReviewId,
        showDeleteReviewModal: showModal,
        closeDeleteReviewModal: onClose,
        deleteReview: onDelete
    } = useSnackContext();

    const deleteReview = reviews.find(review => review.id === deleteReviewId);
    const snackName = deleteReview && getSnackById(deleteReview.snack_id)?.snack_name;

    return (
        <div className={`${modalStyles.background} ${showModal ? modalStyles.active : ""}` } onClick={onClose}>
            <div className={modalStyles.content} data-testid="write-review-modal" onClick={e => e.stopPropagation()}>
                <div className={modalStyles.header}>
                    <h2 className={modalStyles.title}>리뷰 삭제</h2>
                </div>
                <div className={styles.body}>
                    {snackName !== undefined ? `"${snackName}"에 대한 리뷰를 삭제하시겠습니까?` : "삭제 중..."}
                </div>
                <div className={modalStyles.footer}>
                    <button data-testid="delete-review-delete" className={`${modalStyles.button} ${styles.deleteReviewDeleteButton}`} onClick={onDelete}>삭제</button>
                    <button data-testid="delete-review-cancel" className={`${modalStyles.button} ${styles.deleteReviewCancelButton}`} onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteReviewModal;