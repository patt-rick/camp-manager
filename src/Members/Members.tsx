import { Loader } from "@/Loader";
import { useEffect, useState } from "react";
import { getLisOfCampers } from "./_helpers";
import { List } from "./List";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ProfilePage from "@/components/custom/ProfilePage";
import { PDFFile } from "@/PDFFile";
import { downloadPdf } from "@/_helpers/utilites";
import QrCode from "qrcode.react";

const Members = () => {
    const campId = sessionStorage.getItem("CAMP_ID");
    const [isLoading, setIsLoading] = useState(false);
    const [allList, setAllList] = useState<any[]>([]);
    const [campList, setCampList] = useState<any[]>([]);
    const [camper, setCamper] = useState<any>({});
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getLisOfCampers(Number(campId))
            .then((data) => {
                setCampList(data);
                setAllList(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const viewCamper = (data: any) => {
        setDrawerOpen(true);
        setCamper(data);
    };

    const printCard = () => {
        let newData = {
            first_name: camper.first_name,
            last_name: camper.last_name,
            gender: camper.gender,
            classification: camper.classification,
            church: camper.church,
            code: (document as any).getElementById(camper.id).toDataURL(),
        };
        downloadPdf(
            <PDFFile data={[newData]} year={new Date()} />,
            camper.last_name + " " + camper.first_name,
            false,
            () => {}
        );
    };
    const search = (searchString: string) => {
        if (searchString === "") {
            setCampList(allList);
        } else {
            const searchResults = allList.filter(
                (camper) =>
                    camper.first_name.toLowerCase().includes(searchString.toLowerCase()) ||
                    camper.last_name.toLowerCase().includes(searchString.toLowerCase())
            );
            setCampList(searchResults);
        }
    };

    if (isLoading)
        return (
            <div className="h-[500px] grid place-items-center">
                <Loader />
                <p>Getting campers list</p>
            </div>
        );
    return (
        <div>
            <div className="font hidden">
                <QrCode
                    id={camper.id}
                    value={JSON.stringify({ qr_hash: camper.qr_hash, id: camper.id })}
                    size={200}
                />
            </div>
            <Drawer onOpenChange={setDrawerOpen} open={drawerOpen}>
                <DrawerContent>
                    <ProfilePage data={camper} onPrintCard={printCard} />
                </DrawerContent>
            </Drawer>
            <List onSearch={search} onViewCamper={viewCamper} list={campList} />
        </div>
    );
};

export default Members;
