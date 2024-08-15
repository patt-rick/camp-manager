import QrCode from "qrcode.react";
import { Card } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
const IdCard = ({ codeValue, firstName, lastName, church, gender, classification, id }: any) => {
    return (
        <Card className="card-font flex flex-wrap gap-6 my-3 p-4 pr-0 max-w-lg ">
            <div className="">
                {/* <QRCode value={codeValue} size={200} /> */}
                <QrCode id={id} value={codeValue} size={200} />
            </div>
            <div className="flex flex-col justify-between flex-1">
                <div className=" bg-primary  p-3 text-white text-center font-bold">CAMP</div>
                <div className="">
                    <div className="w-full my-2">
                        <p className="font-bold w-full text-2xl">{firstName + " " + lastName}</p>
                    </div>
                    <div className="text-sm font-bold">{church}</div>
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <div>{classification}</div>
                        <Separator orientation="vertical" />
                        <div>{gender}</div>
                    </div>
                </div>
                <div className="text-sm text-gray-400">scan QR CODE for your meals</div>
            </div>
        </Card>
    );
};

export default IdCard;
