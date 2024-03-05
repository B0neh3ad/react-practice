/**
 * 'snacks/:id': 과자 상세 페이지
 */

import { useParams } from "react-router-dom";
import { useSnackContext } from "../contexts/SnackContext";
import SnackItem from "../components/SnackItem";
import styles from "../styles/pages/SnackDetail.module.css";
import ReviewList from "../components/ReviewList";

function SnackDetail({}) {
    const { id } = useParams();
    const { getSnackById } = useSnackContext();

    const snackId = Number(id);
    const snack = getSnackById(snackId)!;

    if(snack === null){
        throw new Error("님아;;");
    }
    
    return (
        <>
            <section className={styles.detailWrapper}>
                <SnackItem snack={snack}></SnackItem>
                <ReviewList snackId={snack.id}></ReviewList>
            </section>
        </>
    );
}

export default SnackDetail;
