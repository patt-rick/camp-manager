import { Loader } from "@/Loader";
import { useEffect, useState } from "react";
import { getLisOfCampers } from "./_helpers";
import { List } from "./List";

const Members = () => {
    const campId = sessionStorage.getItem("CAMP_ID");
    const [isLoading, setIsLoading] = useState(false);
    const [campList, setCampList] = useState<any[]>([]);

    useEffect(() => {
        setIsLoading(true);
        getLisOfCampers(Number(campId))
            .then((data) => {
                setCampList(data);
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
        <div>
            <List list={campList} />
        </div>
    );
};

export default Members;
