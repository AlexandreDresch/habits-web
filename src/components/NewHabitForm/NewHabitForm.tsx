import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { TailSpin } from "react-loader-spinner";

import { weekDays } from "../../utils/weekdays";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../services/api";

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [wDays, setWDays] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isWeekEmpty, setIsWeekEmpty] = useState(false);

  async function createNewHabit(e: FormEvent) {
    e.preventDefault();

    if (!title) {
      setIsTitleEmpty(true);
      return;
    } else if (wDays.length === 0) {
      setIsWeekEmpty(true);
      return;
    }

    setIsLoading(true);

    try {
      await api.post("habits", {
        title,
        weekDays: wDays,
      });

      setTitle("");
      setWDays([]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error while creating new Habit, please try again");
      setIsLoading(false);
    }
  }

  function handleDayToggle(weekDay: number) {
    if (wDays.includes(weekDay)) {
      const weekDaysUpdated = wDays.filter((day) => day !== weekDay);

      setWDays(weekDaysUpdated);
    } else {
      const weekDaysUpdated = [...wDays, weekDay];

      setWDays(weekDaysUpdated);
    }
  }

  useEffect(() => {
    if (isTitleEmpty) {
      setIsTitleEmpty(false);
    }
    if (wDays.length > 0) {
      setIsWeekEmpty(false);
    }
  }, [title, wDays]);

  return (
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label htmlFor="title" className="font-semibold leading-tight">
        What's your new habit?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Read a book, drink water, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      {isTitleEmpty && (
        <p className="mt-1 text-red-800">
          You must provide a title to create a new Habit.
        </p>
      )}

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        What is the weekly frequency?
      </label>
      <div className="mt-3 flex flex-col gap-2">
        {weekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              className="flex items-center gap-3 group focus:outline-none"
              key={weekDay}
              checked={wDays.includes(index)}
              onCheckedChange={() => handleDayToggle(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 hover:border-zinc-700 group-data-[state=checked]:bg-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={18} color="white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{weekDay}</span>
            </Checkbox.Root>
          );
        })}

        {isWeekEmpty && (
          <p className="mt-1 text-red-800">
            You must select at least one week day.
          </p>
        )}
      </div>
      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        {isLoading ? (
          <>
          <TailSpin
          height="20"
          width="20"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="3"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        Creating
        </>
        ) : (
          <>
            <Check size={20} weight="bold" />
            Confirm
          </>
        )}
      </button>
    </form>
  );
}
