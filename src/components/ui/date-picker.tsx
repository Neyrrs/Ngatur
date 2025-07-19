"use client";

import * as React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";
import clsx from "clsx";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
}

const DatePickerField = <T extends FieldValues>({
  name,
  control,
  placeholder = "Select date",
  id,
  className,
}: DatePickerFieldProps<T>) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={id}
                className="w-full justify-between font-normal bg-transparent border-2 border-input"
              >
                {field.value
                  ? new Date(field.value).toLocaleDateString()
                  : placeholder}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                captionLayout="dropdown"
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    const formatted = selectedDate.toISOString().slice(0, 10);
                    field.onChange(formatted);
                  }
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};

export default DatePickerField;
