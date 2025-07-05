"use client";

import { useState } from "react";
import {
  useController,
  Control,
  FieldValues,
  Path,
} from "react-hook-form";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
  label: string;
  value: string | number;
};

type ComboboxFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
};

export function ComboboxField<T extends FieldValues>({
  name,
  control,
  options,
  placeholder = "Select option...",
}: ComboboxFieldProps<T>) {
  const [open, setOpen] = useState(false);

  const {
    field: { value, onChange },
  } = useController({ name, control });

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="max-w-full justify-between"
        >
          {selectedLabel || placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value.toString()}
                  value={option.value.toString()}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
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
