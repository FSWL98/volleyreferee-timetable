import { Outlet } from "react-router";
import Header from "../components/Header/Header.tsx";

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="page__content section">
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout;