import { Library, SquareTerminal } from "lucide-react";
import Dummy from "./Dummy";

export const AppRoutes: {
    id: string;
    name: string;
    url: string;
    hideInMenu?: boolean;
    component: any;
    icon: any;
}[] = [
    {
        id: "dashboard",
        name: "Dashboard",
        url: "/",
        component: Dummy,
        icon: SquareTerminal,
    },
    {
        id: "list",
        name: "Members",
        url: "/members",
        component: Dummy,
        icon: Library,
    },
];
