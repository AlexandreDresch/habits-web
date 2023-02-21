import { generateDateRange } from "../../utils/generate-date-range";

import { Habit } from "../Habit/Habit";
import { HabitPlaceholder } from "./HabitPlaceholder";
import { WeekIndex } from "./WeekIndex";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const summaryDates = generateDateRange();
const minimumDays = 18 * 7;
const amountOfDaysToFill = minimumDays - summaryDates.length;

export function SummaryTable() {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => {
          return <WeekIndex key={index} day={day} />;
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((day) => {
          return <Habit key={day.toString()} />;
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return <HabitPlaceholder key={index}/>;
          })}
      </div>
    </div>
  );
}
