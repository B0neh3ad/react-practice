import styles from '../styles/WriteReviewButton.module.css';

type WriteReviewButtonProps = {
    onClick(): void
};

function WriteReviewButton({ onClick }: WriteReviewButtonProps) {
    return (
        <div data-testid="write-review" className={styles.writeReviewButton} onClick={onClick} />
    );
}

export default WriteReviewButton;
