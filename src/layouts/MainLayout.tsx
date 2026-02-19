import { Outlet } from "react-router";
import Header from "../components/Header/Header.tsx";
import { WithMatchesProvider } from "../context/matchesContext.tsx";

const MainLayout = () => {
    return (
        <WithMatchesProvider>
            <Header />
            <div className="page__content section">
                <Outlet />
            </div>
        </WithMatchesProvider>
    )
}

export default MainLayout;