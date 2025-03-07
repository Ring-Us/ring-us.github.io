import * as React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { ko } from "date-fns/locale"

import { cn } from "@/global/lib/utils"
import { buttonVariants } from "@/global/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const koreanWeekdays = ["일", "월", "화", "수", "목", "금", "토"]

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={ko}
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      className={cn("w-full", className)}
      disabled={(date) => date.getMonth() !== currentMonth.getMonth()}
      classNames={{
        months: "w-full flex flex-col space-y-4",
        month: "space-y-4",
        caption: "flex justify-between py-0 relative items-center",
        caption_label: "text-[16px] font-medium",
        nav: "ml-auto space-x-2 flex items-center",
        nav_button: cn(
          "h-6 w-6 bg-transparent text-[#94939B]"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between pb-2 px-2",
        head_cell: "w-10 text-[12px] text-[#878787] font-medium",
        row: "flex justify-between mt-0 px-2",
        cell: cn(
          "relative text-center focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 rounded-[50px] p-0 text-[16px] font-normal"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-[#512DF1] text-white focus:bg-[#512DF1] focus:text-white",
        day_today: "",
        day_outside:
          "day-outside opacity-40",
        day_disabled: "opacity-40 text-[#878787]",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft 
            className={cn("h-6 w-6", className)} {...props}
            strokeWidth={1}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn("h-6 w-6", className)} {...props}
            strokeWidth={1}
          />
        ),
      }}
      formatters={{
        formatCaption: (date) => {
          const year = date.getFullYear()
          const month = date.getMonth() + 1
          return `${year}년 ${month.toString().padStart(2, "0")}월`
        },
        formatWeekdayName: (weekday) => koreanWeekdays[weekday.getDay()]
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
