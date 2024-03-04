/**
 * '/snacks': 과자 목록 페이지
 */

import { Outlet, useMatch, useResolvedPath } from "react-router-dom";
import SnackList from "../components/SnackList";

function Snack() {
    const { pathname } = useResolvedPath('');
    const isMain = useMatch(pathname);
    return (
        <>
        <div style={{marginTop: "90px"}}>
            { isMain ? <SnackList /> : <Outlet />}
        </div>
        </>
    );
}

export default Snack;
