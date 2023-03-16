import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";

import { api } from "../../services/api";

interface HabitListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface HabitsDataProps {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: Array<string>;
}

export function HabitList({ date, onCompletedChanged }: HabitListProps) {
  const [habitsData, setHabitsData] = useState<HabitsDataProps>();

  const isPastDay = dayjs(date).endOf("day").isBefore(new Date());

  async function getDayHabits() {
    try {
      const response = await api.get("day", {
        params: {
          date: date.toISOString(),
        },
      });

      setHabitsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted = habitsData?.completedHabits.includes(habitId);
    let completedHabits: string[] = [];

    try {
      api.patch(`/habits/${habitId}/toggle`);

      if (isHabitAlreadyCompleted) {
        completedHabits = habitsData!.completedHabits.filter(id => id !== habitId);
      } else {
        completedHabits = [...habitsData!.completedHabits, habitId];
      }

      setHabitsData({
        possibleHabits: habitsData!.possibleHabits,
        completedHabits,
      });

      onCompletedChanged(completedHabits.length);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDayHabits();
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsData?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
            key={habit.id}
            disabled={isPastDay}
            checked={habitsData.completedHabits.includes(habit.id)}
            onCheckedChange={() => handleToggleHabit(habit.id)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 hover:border-zinc-700 group-data-[state=checked]:bg-green-500 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={18} color="white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
