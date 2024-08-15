import { downloadPdf } from "@/_helpers/utilites";
import IdCard from "@/IdCard";
import { PDFFile } from "@/PDFFile";
import UploadCSV from "@/UploadFile";
import { useState } from "react";

const BulkCreate = () => {
    const [data, setData] = useState<any[]>([]);

    const generatePDF = () => {
        let newData = data.map((item: any) => {
            return {
                first_name: item.first_name,
                last_name: item.last_name,
                gender: item.gender,
                classification: item.classification,
                church: "Tema church",
                code: (document as any)
                    .getElementById(item.last_name + item.first_name)
                    .toDataURL(),
            };
        });
        downloadPdf(<PDFFile data={newData} year={new Date()} />, "Camp List", false, () => {});
    };
    return (
        <div>
            <UploadCSV onGenerate={generatePDF} setData={setData} />

            <div className="mt-5">
                <h4 className="font-bold">List</h4>
                <div id="ids" className="grid grid-cols-1 md:grid-cols-2">
                    {data.map((item: any, index: number) => (
                        <IdCard
                            key={index}
                            id={item.last_name + item.first_name}
                            codeValue={JSON.stringify(item)}
                            firstName={item.first_name}
                            lastName={item.last_name}
                            church={"Tema church"}
                            gender={item.gender}
                            classification={item.classification}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BulkCreate;
