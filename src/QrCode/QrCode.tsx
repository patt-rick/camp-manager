import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QrCodeGenerator from "@/QrCode/QrCodeGenerator";
import { useState } from "react";
import { getSingleCamperDetails } from "./_helpers";
import BulkCreate from "./BulkCreate";
import QrCodeScanner from "./QrCodeScanner";

const QrCode = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    // const [data, setData] = useState({});
    const getUserData = async (data: { qr_hash: string; id: string }) => {
        console.log(data);
        let resp: any = await getSingleCamperDetails(data.id);
        console.log(resp);
        setDrawerOpen(true);
    };
    return (
        <div className="p-6 sm:py-0">
            <Drawer onOpenChange={setDrawerOpen} open={drawerOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
            <Tabs defaultValue="create" className="w-full">
                <TabsList>
                    {/* <TabsTrigger value="scan">Scan</TabsTrigger> */}
                    <TabsTrigger value="create">Create</TabsTrigger>
                    <TabsTrigger value="bulk">Add bulk</TabsTrigger>
                </TabsList>
                <TabsContent value="scan">
                    <QrCodeScanner onGetResults={getUserData} />
                </TabsContent>
                <TabsContent value="create">
                    <QrCodeGenerator />
                </TabsContent>
                <TabsContent value="bulk">
                    <BulkCreate />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default QrCode;
