import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { TooltipProvider } from "./components/ui/tooltip";
const Authenticate = () => {
    const location = useLocation();
    const token = sessionStorage.getItem("USER_TOKEN");
    return (
        <TooltipProvider>
            {token ? (
                <Dashboard>
                    <Outlet />
                </Dashboard>
            ) : (
                <Navigate to="/login" state={{ from: location }} replace />
            )}
        </TooltipProvider>
    );
};

export default Authenticate;
