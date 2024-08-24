import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DropdownProps = {
    value?: string | number;
    options: { value: string | number; label: string }[];
    onChange: (x: any) => void;
};

export function TDropdown(props: DropdownProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {props.value
                        ? props.options.find((option) => option.value === props.value)?.label
                        : "Select ..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>Nothing found.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            {props.options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    //@ts-ignore
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        props.onChange(
                                            currentValue === props.value ? "" : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            props.value === option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
