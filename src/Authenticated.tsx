import { Outlet } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { TooltipProvider } from "./components/ui/tooltip";
const Authenticate = () => {
    return (
        <TooltipProvider>
            <Dashboard>
                <Outlet />
            </Dashboard>
        </TooltipProvider>
    );
};

export default Authenticate;
