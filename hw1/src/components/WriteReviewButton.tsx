import { useContext } from 'react';
import { SnackContext, useSnackContext } from '../contexts/SnackContext';
import styles from '../styles/WriteReviewButton.module.css';

function WriteReviewButton() {
    const { openWriteReviewModal } = useSnackContext();
    return (
        <div data-testid="write-review" className={styles.writeReviewButton} onClick={openWriteReviewModal} />
    );
}

export default WriteReviewButton;
