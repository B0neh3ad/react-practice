import Header from "../components/Header";
import '../styles/pages/Main.module.css';
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
