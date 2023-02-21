import "./styles/global.css";

import { Habit } from "./components/Habit/Habit";
import { Header } from "./components/Header/Header";
import { SummaryTable } from "./components/SumaryTable/SummaryTable";

export default function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  );
}
