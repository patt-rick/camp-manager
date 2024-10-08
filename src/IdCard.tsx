import QrCode from "qrcode.react";
import { Card } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { ClassificationColors } from "./_helpers/staticData";
const IdCard = (props: any) => {
    const { qr_hash, first_name, last_name, church, gender, classification, id } = props.data;
    return (
        <Card className="card-font flex flex-col flex-wrap my-3 max-w-[235px] ">
            <div className="p-4">
                <QrCode id={id} value={JSON.stringify({ qr_hash, id })} size={200} />
            </div>
            <div className="flex flex-col justify-between flex-1">
                <div
                    style={{
                        backgroundColor:
                            ClassificationColors[
                                classification as keyof typeof ClassificationColors
                            ],
                    }}
                    className="p-3 text-white text-center font-bold"
                >
                    OYC '24
                </div>
                <div className="p-4 pt-0 text-center">
                    <div className="w-full my-2">
                        <p className="font-bold w-full text-xl">{first_name + " " + last_name}</p>
                    </div>
                    <div className="text-sm font-bold">{church}</div>
                    <div className="flex h-5 items-center justify-center space-x-4 text-sm">
                        <div>{classification}</div>
                        <Separator orientation="vertical" />
                        <div>{gender}</div>
                    </div>
                </div>
                <div className="text-sm text-gray-400 text-center">scan QR CODE for your meals</div>
            </div>
        </Card>
    );
};

export default IdCard;
