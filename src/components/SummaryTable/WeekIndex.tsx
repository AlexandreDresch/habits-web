interface Weekdays {
  day: string;
}

export function WeekIndex({ day }: Weekdays) {
  return (
    <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
      {day}
    </div>
  );
}
