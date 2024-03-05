/**
 * '/snacks/new': 과자 추가 페이지
 */

import styles from '../styles/pages/AddSnack.module.css';
import modalStyles from '../styles/common/Modal.module.css';
import formStyles from '../styles/common/Form.module.css';
import { SnackInput, useSnackContext } from '../contexts/SnackContext';
import { ChangeEventHandler, useState } from 'react';
import { ValidationErrorMessage, getLength, initErrorObj } from '../components/WriteReviewModal';
import { useNavigate } from 'react-router-dom';
import loadingIcon from '../assets/loading.svg';

function AddSnack() {
    /* TODO: WriteReviewModal이랑 business logic 거의 동일... 이거 context든 뭐든 뺄 수 없나? */

    /* TODO: image preview 관련 구현 */
    const { nextSnackId, addSnack } = useSnackContext();
    const navigate = useNavigate();

    const initSnackInput: SnackInput = {
        image: "",
        snack_name: "",
    };

    const [snackInput, setSnackInput] = useState<SnackInput>(initSnackInput);
    const [errorObj, setErrorObj] = useState(initErrorObj);

    const [imagePreviewSrc, setImagePreviewSrc] = useState("");
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);
    const [isEditingImageInput, setIsEditingImageInput] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleChangeImage: ChangeEventHandler<HTMLInputElement> = (e) => {
        setIsEditingImageInput(true);
        setImagePreviewSrc(loadingIcon);
        clearTimeout(timeoutId);
        
        handleChangeInput(e);
        setTimeoutId(
            setTimeout(()=>{
                setIsEditingImageInput(false);
                setImagePreviewSrc(e.target.value);
            }, 1000)
        );
    };
    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target;
        setSnackInput({...snackInput, [name]: value});
    };

    const validateSnackInput = (snackInput: SnackInput): ValidationErrorMessage => {
        const errorObj: ValidationErrorMessage = { ...initErrorObj };
        
        /* TODO: validation 구현 */
        const image = snackInput.image.replace(/\s+/g, "");
        if (getLength(image) < 1) {
            errorObj.image = "이미지 링크가 너무 짧습니다. (1자 미만)";
        }

        if(!isImageLoaded) {
            errorObj.image = "이미지를 불러올 수 없습니다.";
        }

        const name = snackInput.snack_name;
        if (name !== name.trim()) {
            errorObj.snack_name = "이름의 양 끝에는 공백이 존재하지 않아야 합니다.";
        }

        const nameLength = getLength(name.replace(/\s+/g, ""));
        if (nameLength < 1) {
            errorObj.snack_name = "공백을 제외한 과자 이름이 1자 미만입니다.";
        } else if (nameLength > 20) {
            errorObj.snack_name = "과자 이름이 너무 깁니다. (20자 초과)";
        }

        return errorObj;
    }

    const handleSubmit = () => {
        const newErrorObj = validateSnackInput(snackInput);

        if (JSON.stringify(newErrorObj) !== JSON.stringify(initErrorObj)) {
            setErrorObj(newErrorObj);
        } else {
            const redirectUrl = `/snacks/${nextSnackId}`;
            addSnack(snackInput);
            setSnackInput(initSnackInput);
            navigate(redirectUrl);
        }
    }

    return (
        <>
            <section className={styles.content} onClick={e => e.stopPropagation()}>
                <div className={modalStyles.header}>
                    <h2 className={modalStyles.title}>과자 추가</h2>
                </div>
                <div className={styles.body}>
                    <img
                        id="image-preview"
                        src={imagePreviewSrc}
                        alt="과자 사진 미리보기"
                        className={formStyles.imagePreview}
                        onLoad={()=>setIsImageLoaded(true)}
                        onError={()=>setIsImageLoaded(false)}
                    />

                    <label htmlFor="image-input" className={formStyles.label}>이미지</label>
                    <input
                        type="text"
                        id="image-input"
                        data-testid="image-input"
                        name="image"
                        className={formStyles.input}
                        placeholder="예시: http://example.com/example.jpg"
                        value={snackInput.image}
                        onChange={handleChangeImage}
                    />
                    <p
                        data-testid="image-input-message"
                        className={formStyles.inputMessage}>
                        {errorObj.image}
                    </p>
                    <label htmlFor="name-input" className={formStyles.label}>과자 이름</label>
                    <input
                        type="text"
                        id="name-input"
                        data-testid="name-input"
                        name="snack_name"
                        className={formStyles.input}
                        placeholder="예시: 새우깡"
                        value={snackInput.snack_name}
                        onChange={handleChangeInput}
                    />
                    <p
                        data-testid="name-input-message"
                        className={formStyles.inputMessage}>
                        { errorObj.snack_name }
                    </p>
                </div>
                <div className={modalStyles.footer}>
                    <button
                        data-testid="submit-review"
                        className={`${modalStyles.button} ${formStyles.submitButton}`}
                        onClick={!isEditingImageInput ? handleSubmit : ()=>{}}>
                        작성
                    </button>
                    <button
                        data-testid="cancel-review"
                        className={`${modalStyles.button} ${formStyles.cancelButton}`}
                        onClick={()=>navigate(-1)}>
                        취소
                    </button>
                </div>
            </section>
        </>
    );
}

export default AddSnack;
