import useTasks from "@/ hooks/use-tasks";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function Header() {
  const {concludedTasksCount, tasksCont} = useTasks()

  return (
    <>
      <CardHeader className="flex-col items-center relative">
        <CardTitle className="text-3xl text-center">Afazeres do Dia</CardTitle>
        <CardDescription className=" border-black rounded-full w-12 text-white font-bold text-center bg-black">
          {concludedTasksCount} de {tasksCont}
        </CardDescription>
      </CardHeader>
    </>
  );
}
