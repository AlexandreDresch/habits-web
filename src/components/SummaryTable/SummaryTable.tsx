import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { generateDateRange } from "../../utils/generate-date-range";
import { weekDays } from "../../utils/weekdays";

import { Habit } from "../Habit/Habit";
import { HabitPlaceholder } from "./HabitPlaceholder";
import { WeekIndex } from "./WeekIndex";

import { api } from "../../services/api";

const summaryDates = generateDateRange();
const minimumDays = 18 * 7;
const amountOfDaysToFill = minimumDays - summaryDates.length;

type Summary = Array<{
  id: string;
  date: string;
  completed: number;
  amount: number;
}>;

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  async function getSummary() {
    try {
      const { data } = await api.get("/summary");

      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => {
          return <WeekIndex key={index} day={day.charAt(0)} />;
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });
          return (
            <Habit
              key={date.toString()}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
              date={date}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return <HabitPlaceholder key={index} />;
          })}
      </div>
    </div>
  );
}
