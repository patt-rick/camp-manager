import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

type ScannerProps = {
    onGetResults: (result: { qr_hash: string; id: string }) => void;
};
const QrCodeScanner = (props: ScannerProps) => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", { fps: 1, qrbox: 250 }, true);

        scanner.render(onSuccess, onError);

        function onSuccess(result: string) {
            scanner.clear();
            props.onGetResults(JSON.parse(result));
        }
        function onError(err: any) {
            console.warn(err);
        }

        return () => {
            try {
                scanner.clear();
                scanner.pause();
            } catch (error) {
                console.warn(error);
            }
        };
    }, []);
    return (
        <div className="mx-auto w-fit">
            <h1>QrCodeScanner</h1>
            <div id="reader" className=" sm:w-[400px]"></div>
        </div>
    );
};

export default QrCodeScanner;
