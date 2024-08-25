import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FoodStorage from "./FoodStorage";
import { ListTable } from "./ListTable";
import { useEffect, useState } from "react";
import { getFoodSupplies } from "./_helpers";
import { Loader } from "@/Loader";

const Storage = () => {
    const todayDate = new Date().toISOString().substring(0, 10);
    const campId = sessionStorage.getItem("CAMP_ID");
    const [isLoading, setIsLoading] = useState(false);
    const [foodList, setFoodList] = useState<any[]>([]);

    useEffect(() => {
        setIsLoading(true);
        getFoodSupplies(todayDate, Number(campId))
            .then((data) => {
                setFoodList(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading)
        return (
            <div className="h-[500px] grid place-items-center">
                <Loader />
                <p>Getting food list</p>
            </div>
        );
    return (
        <div className="p-6 sm:py-0">
            <Tabs defaultValue="today" className="w-full">
                <TabsList>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="add-food">Add Food</TabsTrigger>
                </TabsList>
                <TabsContent value="today">
                    <ListTable list={foodList} />
                </TabsContent>
                <TabsContent value="add-food">
                    <FoodStorage />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Storage;
