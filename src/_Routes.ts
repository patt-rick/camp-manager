import { PackageOpen, QrCode as QrCodeIcon, Users, Utensils } from "lucide-react";
import QrCode from "./QrCode/QrCode";
import Food from "./Food/Food";
import Storage from "./Food/Storage";
import Members from "./Members/Members";

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
        component: Members,
        icon: Users,
    },
];
