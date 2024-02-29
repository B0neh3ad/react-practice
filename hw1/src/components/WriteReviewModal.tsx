import styles from '../styles/WriteReviewModal.module.css';

type WriteReviewModalProps = {
    showModal: boolean,
    onClose: () => void,
};

function WriteReviewModal({ showModal, onClose }: WriteReviewModalProps) {
    if (!showModal) {
        return null;
    }
    return (
        <div className={styles.writeReviewModal}>
            <div className={styles.modalContent} data-testid="write-review-modal">
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>리뷰 쓰기</h2>
                </div>
                <div className={styles.modalBody}>
                    <img src="/favicon.ico" alt="과자 사진 미리보기" className={styles.modalImagePreview}/>

                    <label htmlFor="image-input" className={styles.modalLabel}>이미지</label>
                    <input type="text" id="image-input" data-testid="image-input" className={styles.modalInput} />
                    
                    <label htmlFor="name-input" className={styles.modalLabel}>과자 이름</label>
                    <input type="text" id="name-input" data-testid="name-input" className={styles.modalInput} />
                    <p data-testid="name-input-message" className={styles.modalInputMessage}></p>

                    <label htmlFor="rating-input" className={styles.modalLabel}>평점</label>
                    <input type="text" id="rating-input" data-testid="rating-input" className={styles.modalInput} />
                    <p data-testid="rating-input-message" className={styles.modalInputMessage}></p>

                    <label htmlFor="content-input" className={styles.modalLabel}>내용</label>
                    <textarea id="content-input" data-testid="content-input" className={styles.modalTextarea}></textarea>
                    <p data-testid="content-input-message" className={styles.modalInputMessage}></p>
                </div>
                <div className={styles.modalFooter}>
                    <button data-testid="submit-review" className={styles.submitReviewButton}>작성</button>
                    <button data-testid="cancel-review" className={styles.cancelReviewButton} onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default WriteReviewModal;
