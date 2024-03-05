import { Link } from "react-router-dom";
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
                            <Link to={`./${snack.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <SnackItem snack={snack} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default SnackList;
