"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { cn } from "../lib/cn"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

function useControllableState<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (value: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue)
  const isControlled = controlled !== undefined
  const value = isControlled ? controlled : uncontrolled

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  return [value, setValue]
}

type DatePickerProps = {
  /** Controlled selected date. */
  value?: Date
  /** Uncontrolled initial selected date. */
  defaultValue?: Date
  /** Called when the selected date changes. */
  onValueChange?: (date: Date | undefined) => void
  /** Trigger text shown when no date is selected. */
  placeholder?: string
  /** `date-fns` format string for the trigger label. */
  formatStr?: string
  disabled?: boolean
  className?: string
  /** Accessible label for the trigger button. */
  "aria-label"?: string
  /** Forwarded to the underlying `Calendar`. */
  captionLayout?: React.ComponentProps<typeof Calendar>["captionLayout"]
}

function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  formatStr = "PPP",
  disabled,
  className,
  captionLayout,
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = useControllableState<Date | undefined>(
    value,
    defaultValue,
    onValueChange
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-slot="date-picker-trigger"
          data-empty={!date}
          aria-label={ariaLabel ?? placeholder}
          className={cn(
            "w-56 justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {date ? format(date, formatStr) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(next) => {
            setDate(next)
            setOpen(false)
          }}
          defaultMonth={date}
          captionLayout={captionLayout}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

type DateRangePickerProps = {
  /** Controlled selected range. */
  value?: DateRange
  /** Uncontrolled initial selected range. */
  defaultValue?: DateRange
  /** Called when the selected range changes. */
  onValueChange?: (range: DateRange | undefined) => void
  /** Trigger text shown when no range is selected. */
  placeholder?: string
  /** `date-fns` format string for each end of the range. */
  formatStr?: string
  /** Number of months rendered side by side. */
  numberOfMonths?: number
  disabled?: boolean
  className?: string
  /** Accessible label for the trigger button. */
  "aria-label"?: string
  /** Forwarded to the underlying `Calendar`. */
  captionLayout?: React.ComponentProps<typeof Calendar>["captionLayout"]
}

function formatRange(range: DateRange | undefined, formatStr: string) {
  if (!range?.from) return null
  if (!range.to) return format(range.from, formatStr)
  return `${format(range.from, formatStr)} – ${format(range.to, formatStr)}`
}

function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  formatStr = "LLL dd, y",
  numberOfMonths = 2,
  disabled,
  className,
  captionLayout,
  "aria-label": ariaLabel,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [range, setRange] = useControllableState<DateRange | undefined>(
    value,
    defaultValue,
    onValueChange
  )

  const label = formatRange(range, formatStr)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-slot="date-range-picker-trigger"
          data-empty={!label}
          aria-label={ariaLabel ?? placeholder}
          className={cn(
            "w-72 justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {label ?? <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          defaultMonth={range?.from}
          numberOfMonths={numberOfMonths}
          captionLayout={captionLayout}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
export type { DatePickerProps, DateRangePickerProps }
