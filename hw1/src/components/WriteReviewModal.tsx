import { ChangeEventHandler, useState } from 'react';
import styles from '../styles/WriteReviewModal.module.css';
import modalStyles from '../styles/common/Modal.module.css';
import loading from '../assets/loading.svg';
import { ValidationErrorMessage } from '../App';

function getLength(s: string) {
    return [...s].length;
}

export type ReviewForm = {
    image: string,
    snack_name: string,
    rating: string,
    content: string,
};

type WriteReviewModalProps = {
    showModal: boolean,
    onClose(): void,
    onSubmit(reviewForm: ReviewForm): void,
};

function WriteReviewModal({ showModal, onClose, onSubmit }: WriteReviewModalProps) {
    const initReviewForm: ReviewForm = {
        image: "",
        snack_name: "",
        rating: "",
        content: "",
    };

    const initErrorObj: ValidationErrorMessage = {
        image: "",
        snack_name: "",
        rating: "",
        content: "",
    };

    const [reviewForm, setReviewForm] = useState<ReviewForm>(initReviewForm);
    const [imagePreviewSrc, setImagePreviewSrc] = useState("");

    const [isEditingImageInput, setIsEditingImageInput] = useState(false);
    const [imageInputChangeTimeoutId, setImageInputChangeTimeoutId] = useState<number | undefined>(undefined);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // review 추가 시 발생한 validation error message 저장
    const [errorObj, setErrorObj] = useState(initErrorObj);

    const handleChangeImage: ChangeEventHandler<HTMLInputElement> = (e) => {
        setImagePreviewSrc(loading);
        setIsEditingImageInput(true);
        clearTimeout(imageInputChangeTimeoutId);

        setReviewForm({ ...reviewForm, image: e.target.value })
        setImageInputChangeTimeoutId(
            // 편집이 멈춘 지 1초 뒤 편집 state 전환하고 preview image 보여주기
            setTimeout(() => {
                setImagePreviewSrc(e.target.value);
                setIsEditingImageInput(false);
            }, 1000)
        );
    }
    const handleChangeSnackName: ChangeEventHandler<HTMLInputElement> = (e) => {
        setReviewForm({ ...reviewForm, snack_name: e.target.value })
    }
    const handleChangeRating: ChangeEventHandler<HTMLInputElement> = (e) => {
        setReviewForm({ ...reviewForm, rating: e.target.value })
    }
    const handleChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setReviewForm({ ...reviewForm, content: e.target.value })
    }

    function validateReviewForm(reviewForm: ReviewForm): ValidationErrorMessage {
        const errorObj: ValidationErrorMessage = { ...initErrorObj };

        if(isEditingImageInput || !isImageLoaded) {
            errorObj.image = "과자 이미지가 로딩되지 않았습니다.";
        }

        const name = reviewForm.snack_name.replace(/\s+/g, "");
        const nameLength = getLength(name);
        if (nameLength < 1) {
            errorObj.snack_name = "공백을 제외한 과자 이름이 1자 미만입니다.";
        } else if (nameLength > 20) {
            errorObj.snack_name = "과자 이름이 너무 깁니다. (20자 초과)";
        }

        const rating = Number(reviewForm.rating);
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            errorObj.rating = "평점은 1~5 사이의 자연수여야 합니다.";
        }

        const contentLength = getLength(reviewForm.content);
        if (contentLength < 5) {
            errorObj.content = "리뷰 내용이 너무 짧습니다. (5자 미만)";
        } else if (contentLength > 1000) {
            errorObj.content = "리뷰 내용이 너무 깁니다. (1000자 초과)";
        }

        return errorObj;
    }

    /**
     * validation 수행 후 App Component로 validated reviewForm 전송
     */
    function handleSubmit() {
        const newErrorObj = validateReviewForm(reviewForm);
        
        if(JSON.stringify(newErrorObj) !== JSON.stringify(initErrorObj)) {
            // validation error 존재하는 경우 출력
            console.log(newErrorObj);
            setErrorObj(newErrorObj);
        } else {
            onSubmit(reviewForm);
            setReviewForm(initReviewForm);
        }
    }

    function handleClose() {
        onClose();
        setReviewForm(initReviewForm);
        setErrorObj(initErrorObj);
    }

    return (
        <div className={`${modalStyles.background} ${!showModal ? modalStyles.out : ""}`} onClick={handleClose}>
            <div className={modalStyles.content} data-testid="write-review-modal" onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={modalStyles.title}>리뷰 쓰기</h2>
                </div>
                <div className={styles.body}>
                    <img
                        id="image-preview"
                        src={imagePreviewSrc}
                        alt="과자 사진 미리보기"
                        className={styles.imagePreview}
                        onLoad={()=>{
                            setIsImageLoaded(true);
                        }}
                        onError={() => {
                            setIsImageLoaded(false);
                        }}
                    />

                    <label htmlFor="image-input" className={styles.label}>이미지</label>
                    <input
                        type="text"
                        id="image-input"
                        data-testid="image-input"
                        className={styles.input}
                        placeholder="예시: http://example.com/example.jpg"
                        value={reviewForm.image}
                        onChange={handleChangeImage}
                    />
                    <p
                        data-testid="image-input-message"
                        className={styles.inputMessage}>
                        {errorObj.image}
                    </p>

                    <label htmlFor="name-input" className={styles.label}>과자 이름</label>
                    <input
                        type="text"
                        id="name-input"
                        data-testid="name-input"
                        className={styles.input}
                        placeholder="예시: 새우깡"
                        value={reviewForm.snack_name}
                        onChange={handleChangeSnackName}
                    />
                    <p
                        data-testid="name-input-message"
                        className={styles.inputMessage}>
                        {errorObj.snack_name}
                    </p>

                    <label htmlFor="rating-input" className={styles.label}>평점</label>
                    <input
                        type="text"
                        id="rating-input"
                        data-testid="rating-input"
                        className={styles.input}
                        placeholder="예시: 4"
                        value={reviewForm.rating}
                        onChange={handleChangeRating}
                    />
                    <p
                        data-testid="rating-input-message"
                        className={styles.inputMessage}>
                        {errorObj.rating}
                    </p>

                    <label htmlFor="content-input" className={styles.label}>내용</label>
                    <textarea
                        id="content-input"
                        data-testid="content-input"
                        className={styles.textarea}
                        placeholder="예시: 손이 가요 손이 가 자꾸만 손이 가"
                        value={reviewForm.content}
                        onChange={handleChangeContent}
                    ></textarea>
                    <p
                        data-testid="content-input-message"
                        className={styles.inputMessage}>
                        {errorObj.content}
                    </p>
                </div>
                <div className={modalStyles.footer}>
                    <button
                        data-testid="submit-review"
                        className={`${modalStyles.button} ${styles.submitReviewButton} ${isEditingImageInput ? modalStyles.disabledButton : ""}`}
                        onClick={isEditingImageInput ? () => { } : handleSubmit}>
                        작성
                    </button>
                    <button
                        data-testid="cancel-review"
                        className={`${modalStyles.button} ${styles.cancelReviewButton}`}
                        onClick={handleClose}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WriteReviewModal;
