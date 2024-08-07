import { useState } from "react";
import QRCode from "react-qr-code";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function QrCodeGenerator() {
    const [url, setUrl] = useState("");
    const [qrIsVisible, setQrIsVisible] = useState(false);
    const handleQrCodeGenerator = () => {
        if (!url) {
            return;
        }
        setQrIsVisible(true);
    };
    return (
        <div className="p-6">
            <h1 className="font-bold my-2">QR Code Generator</h1>
            <div className="">
                <div className="">
                    <Input
                        type="text"
                        placeholder="Enter a URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />

                    <Button onClick={handleQrCodeGenerator}>Generate QR Code</Button>
                </div>
                {qrIsVisible && (
                    <div className="">
                        <div className="">
                            <QRCode value={url} size={300} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default QrCodeGenerator;
