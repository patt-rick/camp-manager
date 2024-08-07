import { Library, QrCode } from "lucide-react";
import Dummy from "./Dummy";
import QrCodeGenerator from "./QrCodeGenerator";

export const AppRoutes: {
    id: string;
    name: string;
    url: string;
    hideInMenu?: boolean;
    component: any;
    icon: any;
}[] = [
    {
        id: "generate",
        name: "Generate QR Code",
        url: "/",
        component: QrCodeGenerator,
        icon: QrCode,
    },
    {
        id: "list",
        name: "Members",
        url: "/members",
        component: Dummy,
        icon: Library,
    },
];
