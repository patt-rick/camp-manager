import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coffee, CookingPot, UtensilsCrossed } from "lucide-react";
import React from "react";
import ScanToEat from "./ScanToEat";

const Food = () => {
    const [value, setValue] = React.useState<string>("");
    const [scanOpen, setScanOpen] = React.useState<boolean>(false);

    const handleChange = (event: string) => {
        setValue(event);
    };
    return (
        <div className="">
            <div className="mx-auto rounded-md bg-muted p-1 w-fit my-3 sm:mb-0 sm:mx-6">
                <h1 className="text-xl w-fit  bg-white rounded px-2">Food Collection</h1>
            </div>
            <h3 className="text-center font-bold text-xl my-3">
                {` ${String(new Date()).substring(0, 15)}`}
            </h3>

            {scanOpen ? (
                <ScanToEat onScanExit={() => setScanOpen(false)} foodType={value} />
            ) : (
                <div className="  grid place-items-center">
                    <div className="">
                        <ToggleGroup
                            className="flex flex-col space-y-2 sm:space-x-2"
                            variant={"outline"}
                            type="single"
                            value={value}
                            onValueChange={handleChange}
                        >
                            <ToggleGroupItem
                                className="h-24 px-8"
                                value="breakfast"
                                aria-label="Breakfast"
                            >
                                <FoodCard
                                    name="Breakfast"
                                    icon={<Coffee className="h-16 w-16 stroke-orange-600" />}
                                />
                            </ToggleGroupItem>
                            <ToggleGroupItem className="h-24 px-8" value="lunch" aria-label="Lunch">
                                <FoodCard
                                    name="Lunch"
                                    icon={<CookingPot className="h-16 w-16 stroke-green-600" />}
                                />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                className="h-24 px-8"
                                value="supper"
                                aria-label="Toggle Supper"
                            >
                                <FoodCard
                                    name="Supper"
                                    icon={<UtensilsCrossed className="h-16 w-16 stroke-blue-400" />}
                                />
                            </ToggleGroupItem>
                        </ToggleGroup>
                        <div className="flex justify-center mt-5">
                            <Button
                                disabled={!value}
                                onClick={() => setScanOpen(true)}
                                className="text-center w-64"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Food;

function FoodCard({ name, icon }: { name: string; icon: any }) {
    return (
        <div className="grid grid-cols-3 ">
            <div>{icon}</div>
            <div className="grid col-span-2 text-xl capitalize place-items-center">{name}</div>
        </div>
    );
}
