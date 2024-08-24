import { downloadPdf } from "@/_helpers/utilites";
import IdCard from "@/IdCard";
import { Loader } from "@/Loader";
import { PDFFile } from "@/PDFFile";
import UploadCSV from "@/QrCode/UploadFile";
import { Upload } from "lucide-react";
import { useState } from "react";

const BulkCreate = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const generatePDF = () => {
        let newData = data.map((item: any) => {
            return {
                first_name: item.first_name,
                last_name: item.last_name,
                gender: item.gender,
                classification: item.classification,
                church: item.church,
                code: (document as any).getElementById(item.id).toDataURL(),
            };
        });
        downloadPdf(<PDFFile data={newData} year={new Date()} />, "Camp List", false, () => {});
    };
    if (isLoading)
        return (
            <div className="h-[500px] grid place-items-center">
                <Loader />
            </div>
        );
    return (
        <div>
            <UploadCSV onGenerate={generatePDF} setData={setData} setLoading={setIsLoading} />

            <div className="mt-5">
                <h4 className="font-bold">List</h4>
                {data.length > 0 ? (
                    <div id="ids" className="grid grid-cols-1 lg:grid-cols-2">
                        {data.map((item: any, index: number) => (
                            <IdCard key={index} data={item} />
                        ))}
                    </div>
                ) : (
                    <div className="h-[400px] grid place-items-center border border-dashed">
                        <div className="flex flex-col items-center p-12">
                            <Upload className="w-48 h-48 stroke-gray-300 " />
                            <p>Click the button above to upload a CSV file</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkCreate;
