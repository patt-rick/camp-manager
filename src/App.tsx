import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./NotFoundPage";
import Authenticate from "./Authenticated";
import { AppRoutes } from "./_Routes";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Authenticate />}>
                    {AppRoutes.map((route) => {
                        return (
                            <Route key={route.id} path={route.url} element={<route.component />} />
                        );
                    })}
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
