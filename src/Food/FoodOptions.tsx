import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const FoodOptions = ({
    foodChoice,
    setFoodChoice,
    onContinue,
    foodOptions,
}: {
    onContinue: () => void;
    foodChoice: string;
    setFoodChoice: any;
    foodOptions: any[];
}) => {
    return (
        <div className="  grid place-items-center">
            <div className="my-5">
                <ToggleGroup
                    className="flex gap-3 flex-wrap"
                    variant={"outline"}
                    type="single"
                    value={foodChoice}
                    onValueChange={setFoodChoice}
                >
                    {foodOptions.map((food) => (
                        <ToggleGroupItem
                            key={food.id}
                            className="h-14 px-8"
                            value={food}
                            aria-label="Breakfast"
                        >
                            <div>{`${food.food} (${food.quantity})`}</div>
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
                <div className="flex justify-center mt-5">
                    <Button
                        disabled={!foodChoice}
                        onClick={onContinue}
                        className="text-center px-8"
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FoodOptions;
