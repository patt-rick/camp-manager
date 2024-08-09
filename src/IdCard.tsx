import QRCode from "react-qr-code";
import { Card } from "./components/ui/card";
const IdCard = ({ codeValue, firstName, lastName, church }: any) => {
    return (
        <Card className="flex flex-wrap gap-6 my-3 p-6 pr-0 max-w-lg ">
            <div className="">
                <QRCode value={codeValue} size={200} />
            </div>
            <div className="flex flex-col gap-6 justify-between flex-1">
                <div className=" bg-primary  p-3 text-white text-center font-bold">CAMP</div>
                <div className="">
                    <div className="flex  w-full">
                        <p className="font-bold w-full text-3xl">{firstName + " " + lastName}</p>
                    </div>
                    <p className=" text-xl ">{church}</p>
                </div>
                <div className="text-sm text-gray-400">scan QR CODE for your meals</div>
            </div>
        </Card>
    );
};

export default IdCard;
