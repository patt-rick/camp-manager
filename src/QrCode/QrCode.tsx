import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QrCodeGenerator from "@/QrCode/QrCodeGenerator";
import QrCodeScanner from "@/QrCode/QrCodeScanner";
import BulkCreate from "./BulkCreate";

const QrCode = () => {
    return (
        <div className="p-6 sm:py-0">
            <Tabs defaultValue="scan" className="w-full">
                <TabsList>
                    <TabsTrigger value="scan">Scan</TabsTrigger>
                    <TabsTrigger value="create">Create</TabsTrigger>
                    <TabsTrigger value="bulk">Add bulk</TabsTrigger>
                </TabsList>
                <TabsContent value="scan">
                    <QrCodeScanner />
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
