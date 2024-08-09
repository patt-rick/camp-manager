import { Library, QrCode as QrCodeIcon } from "lucide-react";
import Dummy from "./Dummy";
import QrCode from "./QrCode/QrCode";

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
];
