import styles from '../styles/WriteReviewModal.module.css';
import modalStyles from '../styles/common/Modal.module.css';

type WriteReviewModalProps = {
    showModal: boolean,
    onClose: () => void,
};

function WriteReviewModal({ showModal, onClose }: WriteReviewModalProps) {
    if (!showModal) {
        return null;
    }
    return (
        <div className={modalStyles.background}>
            <div className={modalStyles.content} data-testid="write-review-modal">
                <div className={styles.header}>
                    <h2 className={modalStyles.title}>리뷰 쓰기</h2>
                </div>
                <div className={styles.body}>
                    <img src="/favicon.ico" alt="과자 사진 미리보기" className={styles.imagePreview}/>

                    <label htmlFor="image-input" className={styles.label}>이미지</label>
                    <input type="text" id="image-input" data-testid="image-input" className={styles.input} placeholder="예시: http://example.com/example.jpg"/>
                    
                    <label htmlFor="name-input" className={styles.label}>과자 이름</label>
                    <input type="text" id="name-input" data-testid="name-input" className={styles.input} placeholder="예시: 새우깡"/>
                    <p data-testid="name-input-message" className={styles.inputMessage}></p>

                    <label htmlFor="rating-input" className={styles.label}>평점</label>
                    <input type="text" id="rating-input" data-testid="rating-input" className={styles.input} placeholder="예시: 4"/>
                    <p data-testid="rating-input-message" className={styles.inputMessage}></p>

                    <label htmlFor="content-input" className={styles.label}>내용</label>
                    <textarea id="content-input" data-testid="content-input" className={styles.textarea} placeholder="예시: 손이 가요 손이 가 자꾸만 손이 가"></textarea>
                    <p data-testid="content-input-message" className={styles.inputMessage}></p>
                </div>
                <div className={modalStyles.footer}>
                    <button data-testid="submit-review" className={`${modalStyles.button} ${styles.submitReviewButton}`}>작성</button>
                    <button data-testid="cancel-review" className={`${modalStyles.button} ${styles.cancelReviewButton}`} onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default WriteReviewModal;
