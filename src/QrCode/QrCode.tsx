import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QrCodeGenerator from "@/QrCode/QrCodeGenerator";
import { useState } from "react";
import { getSingleCamperDetails } from "./_helpers";
import BulkCreate from "./BulkCreate";
import QrCodeScanner from "./QrCodeScanner";
import ProfilePage from "@/components/custom/ProfilePage";
import { toast } from "@/components/ui/use-toast";
import { Loader } from "@/Loader";

const QrCode = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const getUserData = async (data: { qr_hash: string; id: string }) => {
        setLoading(true);
        let resp: any = await getSingleCamperDetails(data.id);
        if (resp.error) {
            toast({ description: "Couldn't fetch details" });
        } else {
            setData(resp);
            setDrawerOpen(true);
        }
        setLoading(false);
    };

    return (
        <div className="p-6 sm:py-0">
            <Drawer onOpenChange={setDrawerOpen} open={drawerOpen}>
                <DrawerContent>
                    <ProfilePage data={data} />
                </DrawerContent>
            </Drawer>
            <Tabs defaultValue="create" className="w-full">
                <TabsList>
                    <TabsTrigger value="scan">Scan</TabsTrigger>
                    <TabsTrigger value="create">Create</TabsTrigger>
                    <TabsTrigger value="bulk">Add bulk</TabsTrigger>
                </TabsList>
                <TabsContent value="scan">
                    {loading ? (
                        <div className="h-[500px] grid place-items-center">
                            <Loader />
                        </div>
                    ) : (
                        <QrCodeScanner onGetResults={getUserData} />
                    )}
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
