import { useSnackContext } from "../contexts/SnackContext";
import styles from '../styles/SnackList.module.css';
import SnackItem from "./SnackItem";

function SnackList() {
    const { snacks } = useSnackContext();

    return (
        <>
            <section className={styles.snackList}>
                <ul className={styles.snackWrapper} data-testid="snack-list">
                    {snacks.map(snack => (
                        <li key={snack.id}>
                            <SnackItem snack={snack} />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default SnackList;
