import { Link } from "react-router-dom";
import { Snack } from "../contexts/SnackContext";
import styles from "../styles/SnackItem.module.css";

function SnackItem({ snack }: { snack: Snack }) {
    return (
        <>
            <div className={styles.snackItem} data-testid="snack-card" style={{display: "inline-block"}}>
                <img className={styles.snackImage} data-testid="snack-image" src={snack.image} alt="과자 사진"></img>
                <div className={styles.snackName}>{snack.snack_name}</div>
                <div className={styles.rating}>★{snack.rating.toFixed(1)}</div>
            </div>
        </>
    );
}

export default SnackItem;
