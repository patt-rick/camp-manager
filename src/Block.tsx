import { Navigate, Outlet, useLocation } from "react-router-dom";
const Block = () => {
    const location = useLocation();
    const token = sessionStorage.getItem("USER_TOKEN");
    return <>{token ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />}</>;
};

export default Block;
