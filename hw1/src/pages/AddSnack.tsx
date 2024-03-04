/**
 * '/snacks/new': 과자 추가 페이지
 */

import styles from '../styles/pages/AddSnack.module.css';
import modalStyles from '../styles/common/Modal.module.css';
import formStyles from '../styles/common/Form.module.css';
import { SnackInput, useSnackContext } from '../contexts/SnackContext';
import { ChangeEventHandler, useState } from 'react';
import { ValidationErrorMessage, initErrorObj } from '../components/WriteReviewModal';
import { useNavigate } from 'react-router-dom';

function AddSnack() {
    /* TODO: WriteReviewModal이랑 business logic 거의 동일... 이거 context든 뭐든 뺄 수 없나? */

    /* TODO: image preview 관련 구현 */
    const {  } = useSnackContext();
    const navigate = useNavigate();

    const initSnackInput: SnackInput = {
        image: "",
        snack_name: "",
    };

    const [snackInput, setSnackInput] = useState<SnackInput>(initSnackInput);
    const [errorObj, setErrorObj] = useState(initErrorObj);

    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target;
        setSnackInput({...snackInput, [name]: value});
    };

    const validateSnackInput = (snackInput: SnackInput): ValidationErrorMessage => {
        const errorObj: ValidationErrorMessage = { ...initErrorObj };
        
        /* TODO: validation 구현 */

        return errorObj;
    }

    const handleSubmit = () => {
        const newErrorObj = validateSnackInput(snackInput);

        if (JSON.stringify(newErrorObj) !== JSON.stringify(initErrorObj)) {
            setErrorObj(newErrorObj);
        } else {
            // addSnack(snackInput);
            setSnackInput(initSnackInput);
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
                        src={""}
                        alt="과자 사진 미리보기"
                        className={formStyles.imagePreview}
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
                        onChange={handleChangeInput}
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
                        onClick={handleSubmit}>
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
