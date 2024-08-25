import { Library, PackageOpen, QrCode as QrCodeIcon, Utensils } from "lucide-react";
import Dummy from "./Dummy";
import QrCode from "./QrCode/QrCode";
import Food from "./Food/Food";
import Storage from "./Food/Storage";

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
        id: "food",
        name: "Food Collection",
        url: "/food-collection",
        component: Food,
        icon: Utensils,
    },
    {
        id: "food-storage",
        name: "Food Storage",
        url: "/food-storage",
        component: Storage,
        icon: PackageOpen,
    },
    {
        id: "list",
        name: "Members",
        url: "/members",
        component: Dummy,
        icon: Library,
    },
];
