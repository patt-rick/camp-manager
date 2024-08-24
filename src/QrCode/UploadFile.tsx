// @ts-ignore
import DatePicker from "react-datepicker";
// @ts-ignore
import Papa from "papaparse";
// @ts-ignore
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";

import "react-datepicker/dist/react-datepicker.css";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { uploadCampersListFromCSV } from "./_helpers";
import { toast } from "@/components/ui/use-toast";

// Register the locale
registerLocale("en-GB", enGB);

const UploadCSV = ({ setData, onGenerate, setLoading }: any) => {
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

    // const getYear = (date: string | number | Date) => {
    //     const dateObject = new Date(date);
    //     const year = dateObject.getFullYear();
    //     return year;
    // };

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
                <Button onClick={onGenerate}>Print ID Cards</Button>
            </div>
        </div>
    );
};

export default UploadCSV;
