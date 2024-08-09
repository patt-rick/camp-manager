import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QrCodeScanner = () => {
    const [scanResult, setScanResult] = useState<string | null>(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", { fps: 1, qrbox: 250 }, true);

        scanner.render(onSuccess, onError);

        function onSuccess(result: string) {
            scanner.clear();
            setScanResult(result);
        }
        function onError(err: any) {
            console.warn(err);
        }
        console.log("in");

        return () => {
            console.log("out", scanner);
            try {
                scanner.clear();
                scanner.pause();
            } catch (error) {
                console.warn(error);
            }
        };
    }, []);
    return (
        <div>
            <h1>QrCodeScanner</h1>
            <div id="reader"></div>
            <p>{scanResult}</p>
        </div>
    );
};

export default QrCodeScanner;
