import styles from '../styles/WriteReviewButton.module.css';

function WriteReviewButton() {
    function handleClick() {
        /* 리뷰 작성 모달 띄우기 */
    }
    return (
        <div className={styles.writeReviewButton} onClick={()=>{handleClick()}} />
    );
}

export default WriteReviewButton;
