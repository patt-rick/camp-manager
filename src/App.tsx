import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./NotFoundPage";
import Authenticate from "./Authenticated";
import { AppRoutes } from "./_Routes";
import { Login } from "./Login";
import { Toaster } from "./components/ui/toaster";
import Block from "./Block";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Block />}>
                    <Route path={"/login"} element={<Login />} />
                </Route>
                <Route element={<Authenticate />}>
                    {AppRoutes.map((route) => {
                        return (
                            <Route key={route.id} path={route.url} element={<route.component />} />
                        );
                    })}
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster />
        </Router>
    );
}

export default App;
