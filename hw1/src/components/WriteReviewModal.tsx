import { ChangeEventHandler, useState } from 'react';
import styles from '../styles/WriteReviewModal.module.css';
import modalStyles from '../styles/common/Modal.module.css';
import FormStyles from '../styles/common/Form.module.css';
import { ReviewInput, useSnackContext } from '../contexts/SnackContext';

export const getLength = (s: string) => [...s].length;

export type ValidationErrorMessage = {
    image: string,
    snack_name: string,
    rating: string,
    content: string,
}

export const initErrorObj: ValidationErrorMessage = {
    image: "",
    snack_name: "",
    rating: "",
    content: "",
};

function WriteReviewModal() {
    const {
        getSnackByName,
        showWriteReviewModal: showModal,
        closeWriteReviewModal: onClose,
        addReview
    } = useSnackContext();

    const initReviewInput: ReviewInput = { 
        snack_name: "",
        rating: "",
        content: "",
    };

    const [reviewInput, setReviewInput] = useState<ReviewInput>(initReviewInput);
    const [errorObj, setErrorObj] = useState(initErrorObj); // review 추가 시 발생한 validation error message 저장

    const handleChangeInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target;
        setReviewInput({ ...reviewInput, [name]: value})
    }

    const validateReviewInput = (reviewInput: ReviewInput): ValidationErrorMessage => {
        const errorObj: ValidationErrorMessage = { ...initErrorObj };

        const snack = getSnackByName(reviewInput.snack_name);
        if (snack === null) {
            errorObj.snack_name = "과자를 찾을 수 없습니다.";
        }

        const rating = Number(reviewInput.rating);
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            errorObj.rating = "평점은 1~5 사이의 자연수여야 합니다.";
        }

        const contentLength = getLength(reviewInput.content);
        if (contentLength < 5) {
            errorObj.content = "리뷰 내용이 너무 짧습니다. (5자 미만)";
        } else if (contentLength > 1000) {
            errorObj.content = "리뷰 내용이 너무 깁니다. (1000자 초과)";
        }

        return errorObj;
    };

    /**
     * validation 수행 후 App Component로 validated reviewInput 전송
     */
    const handleSubmit = () => {
        const newErrorObj = validateReviewInput(reviewInput);
        
        if(JSON.stringify(newErrorObj) !== JSON.stringify(initErrorObj)) {
            // validation error 존재하는 경우 출력
            setErrorObj(newErrorObj);
        } else {
            addReview(reviewInput);
            handleClose();
        }
    };

    const handleClose = () => {
        onClose();
        setReviewInput(initReviewInput);
        setErrorObj(initErrorObj);
    };

    return (
        <div className={`${modalStyles.background} ${showModal ? modalStyles.active : ""}`} onClick={handleClose}>
            <div className={modalStyles.content} data-testid="write-review-modal" onClick={e => e.stopPropagation()}>
                <div className={modalStyles.header}>
                    <h2 className={modalStyles.title}>리뷰 쓰기</h2>
                </div>
                <div className={styles.body}>
                    <label htmlFor="name-input" className={FormStyles.label}>과자 이름</label>
                    <input
                        type="text"
                        id="name-input"
                        data-testid="name-input"
                        name="snack_name"
                        className={FormStyles.input}
                        placeholder="예시: 새우깡"
                        value={reviewInput.snack_name}
                        onChange={handleChangeInput}
                    />
                    <p
                        data-testid="name-input-message"
                        className={FormStyles.inputMessage}>
                        {errorObj.snack_name}
                    </p>

                    <label htmlFor="rating-input" className={FormStyles.label}>평점</label>
                    <input
                        type="text"
                        id="rating-input"
                        data-testid="rating-input"
                        name="rating"
                        className={FormStyles.input}
                        placeholder="예시: 4"
                        value={reviewInput.rating}
                        onChange={handleChangeInput}
                    />
                    <p
                        data-testid="rating-input-message"
                        className={FormStyles.inputMessage}>
                        {errorObj.rating}
                    </p>

                    <label htmlFor="content-input" className={FormStyles.label}>내용</label>
                    <textarea
                        id="content-input"
                        data-testid="content-input"
                        name="content"
                        className={FormStyles.textarea}
                        placeholder="예시: 손이 가요 손이 가 자꾸만 손이 가"
                        value={reviewInput.content}
                        onChange={handleChangeInput}
                    ></textarea>
                    <p
                        data-testid="content-input-message"
                        className={FormStyles.inputMessage}>
                        {errorObj.content}
                    </p>
                </div>
                <div className={modalStyles.footer}>
                    <button
                        data-testid="submit-review"
                        className={`${modalStyles.button} ${FormStyles.submitButton}`}
                        onClick={handleSubmit}>
                        작성
                    </button>
                    <button
                        data-testid="cancel-review"
                        className={`${modalStyles.button} ${FormStyles.cancelButton}`}
                        onClick={handleClose}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WriteReviewModal;
