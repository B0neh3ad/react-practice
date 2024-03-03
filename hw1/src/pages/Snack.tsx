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
        { isMain ? <SnackList /> : <Outlet />}
        </>
    );
}

export default Snack;
