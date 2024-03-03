import { useContext } from 'react';
import { SnackContext, useSnackContext } from '../contexts/SnackContext';
import styles from '../styles/WriteReviewButton.module.css';

function OpenMenuButton() {
    const { openWriteReviewModal } = useSnackContext();
    return (
        <div data-testid="open-menu" className={styles.writeReviewButton} onClick={openWriteReviewModal} />
    );
}

export default OpenMenuButton;
