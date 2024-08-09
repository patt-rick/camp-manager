import React, { useState } from "react";
// @ts-ignore
import DatePicker from "react-datepicker";
// @ts-ignore
import Papa from "papaparse";
// @ts-ignore
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";

import "react-datepicker/dist/react-datepicker.css";
import { Label } from "./components/ui/label";

// Register the locale
registerLocale("en-GB", enGB);

const UploadCSV = () => {
    const [year, setYear] = useState(new Date());

    const handleFileUpload = (event: { target: { files: any[] } }) => {
        const file = event.target.files[0];
        if (file && file.type !== "text/csv") {
            alert("Please upload a CSV file");
            return;
        }
        Papa.parse(file, {
            header: true,
            complete: function (results: { data: any }) {
                console.log({ data: results.data, year: getYear(year) });
            },
        });
    };

    const getYear = (date: string | number | Date) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        return year;
    };

    return (
        <div className="fileWrapper flex flex-col gap-5">
            <DatePicker
                selected={year}
                onChange={(date: React.SetStateAction<Date>) => setYear(date)}
                dateFormat="MMMM - yyyy"
                showMonthYearPicker
                locale="en-GB"
                className="mui-style-datepicker"
            />
            <input
                type="file"
                accept=".csv"
                // @ts-ignore
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="csv-upload"
            />
            <Label htmlFor="csv-upload" className="p-3 bg-primary text-white w-fit rounded px-5">
                Upload CSV File
            </Label>
        </div>
    );
};

export default UploadCSV;
