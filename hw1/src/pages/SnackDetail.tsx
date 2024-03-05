/**
 * 'snacks/:id': 과자 상세 페이지
 */

import { useParams } from "react-router-dom";
import { useSnackContext } from "../contexts/SnackContext";
import SnackItem from "../components/SnackItem";

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
        <SnackItem snack={snack}></SnackItem>
        </>
    );
}

export default SnackDetail;
