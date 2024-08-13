import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import QrCodeScanner from "@/QrCode/QrCodeScanner";
import { Coffee, CookingPot, UtensilsCrossed } from "lucide-react";
import React from "react";

const Food = () => {
    const [value, setValue] = React.useState<string>("");
    const [scanOpen, setScanOpen] = React.useState<boolean>(false);

    const handleChange = (event: string) => {
        setValue(event);
    };
    return (
        <div className="">
            <div className="mx-auto rounded-md bg-muted p-1 w-fit my-3 sm:mb-0 sm:mx-6">
                <h1 className="text-xl w-fit font-mono bg-white rounded px-2">Food</h1>
            </div>

            {scanOpen ? (
                <div className="flex flex-col justify-center">
                    <QrCodeScanner />
                    <div className="mt-6 flex justify-center">
                        <Button onClick={() => setScanOpen(false)} variant={"destructive"}>
                            Exit scan
                        </Button>
                    </div>
                </div>
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
