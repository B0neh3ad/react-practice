import Header from "../components/Header";
import '../styles/pages/Main.css';
import { Outlet } from "react-router-dom";

function Main() {
    return (
        <>
            <Header />
            <Outlet />
    </>
    );
}

export default Main;
