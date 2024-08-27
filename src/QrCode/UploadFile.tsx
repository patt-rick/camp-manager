// @ts-ignore
import Papa from "papaparse";

import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { uploadCampersListFromCSV } from "./_helpers";
import { toast } from "@/components/ui/use-toast";

const UploadCSV = ({ setData, onGenerate, setLoading, disabled }: any) => {
    const handleFileUpload = (event: { target: { files: any[] } }) => {
        const file = event.target.files[0];
        if (file && file.type !== "text/csv") {
            alert("Please upload a CSV file");
            return;
        }
        Papa.parse(file, {
            header: true,
            complete: async function (results: { data: any }) {
                results.data.pop();
                setLoading(true);
                let resp: any = await uploadCampersListFromCSV(results.data);
                if (resp.error) {
                    toast({ title: "Error", description: resp.error, variant: "destructive" });
                } else {
                    setData(resp.data);
                    toast({ description: "Success" });
                }
                setLoading(false);
            },
        });
    };

    return (
        <div className="fileWrapper flex flex-col gap-5">
            <input
                type="file"
                accept=".csv"
                // @ts-ignore
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="csv-upload"
            />
            <div className="my-3 flex gap-3">
                <Label
                    htmlFor="csv-upload"
                    className="p-3 bg-secondary text-black w-fit rounded px-5  cursor-pointer"
                >
                    Upload CSV File
                </Label>
                <Button disabled={disabled} onClick={onGenerate}>
                    Print ID Cards
                </Button>
            </div>
        </div>
    );
};

export default UploadCSV;
