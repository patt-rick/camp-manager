import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { useState } from "react";
import { map, values } from "lodash";
import { Card } from "@/components/ui/card";
import { saveFoodStorageToServer } from "./_helpers";
import { toast } from "@/components/ui/use-toast";
import { Loader } from "@/Loader";
import { TDropdown } from "@/TDropdown";
import { FoodType } from "@/_helpers/staticData";

const FoodStorage = () => {
    let campId = sessionStorage.getItem("CAMP_ID");
    const [loading, setLoading] = useState(false);
    const [availableFoods, setAvailableFoods] = useState({
        [Date.now()]: {
            quantity: "",
            acquired_from: "",
            food: "",
            date_taken: new Date().toISOString().substring(0, 10),
            camp_id: Number(campId),
            food_type: "",
        },
    });

    const saveFoodStorage = async () => {
        setLoading(true);
        let resp: any = await saveFoodStorageToServer(values(availableFoods));
        if (resp.error) {
            toast({ title: "Error", description: resp.error, variant: "destructive" });
        } else {
            toast({ description: "Success" });
        }
        setLoading(false);
    };

    if (loading)
        return (
            <div className="h-[500px] grid place-items-center">
                <Loader />
            </div>
        );
    return (
        <div>
            {map(availableFoods, (data: any, key: number) => (
                <Card key={key} className="max-w-lg p-5 mx-3 mb-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <TDropdown
                                options={FoodType}
                                onChange={(e) => onChangeFieldDetails(key, data, "food_type", e)}
                                value={data.food_type}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="food-name">Food</Label>
                            <Input
                                id="food-name"
                                placeholder="Rice"
                                required
                                value={data.food}
                                onChange={(e) =>
                                    onChangeFieldDetails(key, data, "food", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-3">
                        <div className="grid gap-2 sm:col-span-2">
                            <Label htmlFor="email">Acquired From</Label>
                            <Input
                                value={data.acquired_from}
                                onChange={(e) =>
                                    onChangeFieldDetails(key, data, "acquired_from", e.target.value)
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="food-quantity">Quantity</Label>
                            <Input
                                id="food-quantity"
                                type="number"
                                placeholder="25"
                                required
                                value={data.quantity}
                                onChange={(e) =>
                                    onChangeFieldDetails(key, data, "quantity", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex justify-end items-end">
                            <Button
                                onClick={() => onDeleteSelectedField(key)}
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}

            <Button variant={"secondary"} className="ml-3" onClick={onAddAvailableFood}>
                Add
            </Button>

            <div>
                <Button onClick={saveFoodStorage} className="my-5 w-1/2 mx-3">
                    Save
                </Button>
            </div>
        </div>
    );
    function onChangeFieldDetails(key: number, data: any, field: string, value: string | number) {
        const newData = { ...data, [field]: value };

        setAvailableFoods((prevItems: any) => {
            return {
                ...prevItems,
                [key]: newData,
            };
        });
    }
    function onDeleteSelectedField(key: number) {
        setAvailableFoods((prevItems: any) => {
            const items = { ...prevItems };
            delete items[key];
            return items;
        });
    }

    function onAddAvailableFood() {
        setAvailableFoods((prevItems: any) => ({
            ...prevItems,
            [Date.now()]: {
                quantity: "",
                acquired_from: "",
                food: "",
                date_taken: new Date().toISOString().substring(0, 10),
                camp_id: Number(campId),
                food_type: "",
            },
        }));
    }
};

export default FoodStorage;
