import { Library, QrCode as QrCodeIcon, Utensils } from "lucide-react";
import Dummy from "./Dummy";
import QrCode from "./QrCode/QrCode";
import Food from "./Food/Food";

export const AppRoutes: {
    id: string;
    name: string;
    url: string;
    hideInMenu?: boolean;
    component: any;
    icon: any;
}[] = [
    {
        id: "generate-scan",
        name: "Scan/Generate",
        url: "/",
        component: QrCode,
        icon: QrCodeIcon,
    },
    {
        id: "list",
        name: "Members",
        url: "/members",
        component: Dummy,
        icon: Library,
    },
    {
        id: "food",
        name: "Food",
        url: "/food",
        component: Food,
        icon: Utensils,
    },
];
