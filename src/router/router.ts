import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import CityPage from "../pages/City/CityPage.tsx";
import UniversitiesPage from "../pages/Universities/UniversitiesPage.tsx";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
    {
        Component: MainLayout,
        children: [
            { index: true, Component: App },
            { path: 'city', Component: CityPage },
            { path: 'universities', Component: UniversitiesPage }
        ]
    }
])

export default router;