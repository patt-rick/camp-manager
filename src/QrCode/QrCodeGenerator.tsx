import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import IdCard from "@/IdCard";
import { TDropdown } from "@/TDropdown";
import { Churches, Classification, Gender } from "@/_helpers/staticData";
import { uploadSingleCamper } from "./_helpers";
import { Loader } from "@/Loader";
import { toast } from "@/components/ui/use-toast";
import { downloadPdf } from "@/_helpers/utilites";
import { PDFFile } from "@/PDFFile";

function QrCodeGenerator() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [church, setChurch] = useState("");
    const [gender, setGender] = useState("");
    const [classification, setClassification] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [qrIsVisible, setQrIsVisible] = useState<string | null>(null);
    const [data, setData] = useState<any>({});
    const handleQrCodeGenerator = async () => {
        const campId = sessionStorage.getItem("CAMP_ID") || "1";
        setIsLoading(true);
        let resp: any = await uploadSingleCamper({
            camp_id: parseInt(campId),
            first_name: firstName,
            last_name: lastName,
            gender,
            classification,
            church_id: parseInt(church),
            other_names: "",
        });
        if (resp.error) {
            toast({ title: "Error", description: resp.error, variant: "destructive" });
        } else {
            toast({ description: "Success" });
            setData(resp.data);
            setQrIsVisible(resp.data?.qr_hash);
        }
        setIsLoading(false);
    };

    const printCard = () => {
        let newData = {
            first_name: data.first_name,
            last_name: data.last_name,
            gender: data.gender,
            classification: data.classification,
            church: data.church,
            code: (document as any).getElementById(data.id).toDataURL(),
        };
        downloadPdf(<PDFFile data={[newData]} year={new Date()} />, "Single Card", false, () => {});
    };

    if (isLoading)
        return (
            <div className="h-[500px] grid place-items-center">
                <Loader />
            </div>
        );
    return (
        <div className="">
            <h1 className="font-bold my-2">Card Generator</h1>
            <div className="">
                <div className="">
                    <Card className="max-w-lg">
                        <CardHeader>
                            <CardTitle className="text-xl">Add Member</CardTitle>
                            <CardDescription>
                                Enter your information to create a card
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <Input
                                            id="first-name"
                                            placeholder="Max"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <Input
                                            id="last-name"
                                            placeholder="Robinson"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Church</Label>
                                    <TDropdown
                                        options={Churches}
                                        value={church}
                                        onChange={(data) => setChurch(data)}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first-name">Gender</Label>
                                        <TDropdown
                                            options={Gender}
                                            value={gender}
                                            onChange={(data) => setGender(data)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="last-name">Classification</Label>
                                        <TDropdown
                                            options={Classification}
                                            value={classification}
                                            onChange={(data) => setClassification(data)}
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleQrCodeGenerator} className="w-full">
                                    Generate Card
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {!!qrIsVisible && (
                    <div className="">
                        <IdCard data={data} />
                        <Button className="max-w-lg" onClick={printCard}>
                            Print Card
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default QrCodeGenerator;
