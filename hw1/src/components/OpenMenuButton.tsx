import { useSnackContext } from '../contexts/SnackContext';
import styles from '../styles/OpenMenuButton.module.css';
import snackIcon from '../assets/snack.svg';
import writeReviewIcon from '../assets/pencil.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function OpenMenuButton() {
    const [isActive, setIsActive] = useState(false);
    const { openWriteReviewModal } = useSnackContext();
    const navigate = useNavigate();

    const handleToggleMenu = () => setIsActive(!isActive);

    const openAddSnackPage = () => {
        navigate(`/snacks/new`);
    };

    return (
        <div className={`${styles.background} ${isActive ? styles.active : ""}`} onClick={handleToggleMenu}>
            <div data-testid="open-menu" className={styles.openMenuButton}>
                <div className={styles.menuWrapper}>
                    <div data-testid="new-snack" className={styles.menu} onClick={openAddSnackPage}>
                        <span>새 과자</span>
                        <img src={snackIcon} />
                    </div>
                    <div data-testid="new-review" className={styles.menu} onClick={openWriteReviewModal}>
                        <span>새 리뷰</span>
                        <img src={writeReviewIcon} />
                </div>
                </div>
            </div>
        </div>
    );
}

export default OpenMenuButton;
