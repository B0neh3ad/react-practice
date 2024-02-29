import modalStyles from '../styles/common/Modal.module.css';
import styles from '../styles/DeleteReviewModal.module.css';

type DeleteReviewModalProps = {
    showModal: boolean,
    snackName: string,
    onClose(): void,
    onDelete(): void,
};

function DeleteReviewModal({ showModal, snackName, onClose, onDelete }: DeleteReviewModalProps) {
    if (!showModal) {
        return null;
    }
    return (
        <div className={modalStyles.background}>
            <div className={modalStyles.content} data-testid="write-review-modal">
                <div className={styles.header}>
                    <h2 className={modalStyles.title}>리뷰 삭제</h2>
                </div>
                <div className={styles.body}>
                    {`"${snackName}"에 대한 리뷰를 삭제하시겠습니까?`}
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