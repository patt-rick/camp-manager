import { DocumentProps, pdf } from "@react-pdf/renderer";
import { ReactElement, JSXElementConstructor } from "react";

export const downloadPdf = async (
    doc: ReactElement<DocumentProps, string | JSXElementConstructor<any>> | undefined,
    fileName: string,
    print = false,
    successCallback: () => any
) => {
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    if (print) {
        const iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        iframe.style.display = "none";
        iframe.src = url;
        iframe.onload = function () {
            setTimeout(function () {
                iframe.focus();
                iframe.contentWindow?.print();
            }, 1);
        };
    } else {
        link.href = url;
        link.download = fileName;
        link.click();
    }
    successCallback && successCallback();
};
