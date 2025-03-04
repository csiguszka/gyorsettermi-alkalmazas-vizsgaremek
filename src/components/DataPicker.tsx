"use client";

import { format } from "date-fns";
import { hu } from "date-fns/locale"; // Importáljuk a magyar nyelvi csomagot
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction } from "react";

interface DataPickerProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

function DatePicker({ date, setDate }: DataPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2" />
          {date ? (
            format(date, "PPP", { locale: hu })
          ) : (
            <span>Válassz egy dátumot</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => setDate(selectedDate || new Date())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
