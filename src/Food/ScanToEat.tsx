import { Button } from "@/components/ui/button";
import QrCodeScanner from "@/QrCode/QrCodeScanner";
import { useEffect, useState } from "react";
import FoodOptions from "./FoodOptions";
import { getFoodSuppliesForToday, sendFoodAllocationToServer } from "./_helpers";
import { Loader } from "@/Loader";
import { toast } from "@/components/ui/use-toast";

type ScanProps = {
    foodType: string;
    onScanExit: () => void;
};
const ScanToEat = (props: ScanProps) => {
    const [foodOptions, setFoodOptions] = useState<any[]>([]);
    const [foodChoice, setFoodChoice] = useState<any>();
    const [toScan, setToScan] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const campId = sessionStorage.getItem("CAMP_ID");
    const todayDate = new Date().toISOString().substring(0, 10);

    useEffect(() => {
        setIsLoading(true);
        getFoodSuppliesForToday(todayDate, props.foodType, Number(campId))
            .then((data) => {
                setFoodOptions(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const uploadFoodAllocationToServer = async (data: any) => {
        const serverData = {
            camp_id: Number(campId),
            camper_id: data.id,
            date_taken: todayDate,
            food_choice: foodChoice.food,
            food_type: props.foodType,
        };
        let resp: any = await sendFoodAllocationToServer(serverData);
        if (resp.error) {
            toast({ title: "Error", description: resp.error, variant: "destructive" });
            setToScan(false);
        } else {
            toast({ description: "Successful" });
            setToScan(false);

            const updatedFoodOptions = foodOptions.map((food: any) => {
                if (resp.data.food === food.food) {
                    return { ...food, quantity: resp.data.quantity };
                }
                return food;
            });
            setFoodOptions(updatedFoodOptions);
        }
    };

    if (isLoading)
        return (
            <div className="h-[500px] grid place-items-center">
                <Loader />
                <p>Getting food quantity</p>
            </div>
        );
    return (
        <div>
            <div className="flex flex-col justify-center">
                <h3 className="text-center font-bold text-xl">
                    {`${props.foodType.toUpperCase()}`}
                </h3>
                {toScan ? (
                    <QrCodeScanner onGetResults={(data) => uploadFoodAllocationToServer(data)} />
                ) : (
                    <FoodOptions
                        onContinue={() => setToScan(true)}
                        foodChoice={foodChoice}
                        setFoodChoice={setFoodChoice}
                        foodOptions={foodOptions}
                    />
                )}
                <div className="mt-6 flex justify-center">
                    <Button onClick={props.onScanExit} variant={"destructive"}>
                        Exit scan
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ScanToEat;
