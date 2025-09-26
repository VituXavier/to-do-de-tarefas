import useTask from "@/ hooks/use-task";
import useTasks from "@/ hooks/use-tasks";
import { TaskState } from "@/models/task";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import TaskCard from "./TaskCards";

export default function TaskList() {
  const { tasks } = useTasks();
  const { prepareTask } = useTask();

  function handleNewTask() {
    prepareTask();
  }

  return (
    <CardContent>
      <Button
        disabled={tasks.some((task) => task.state === TaskState.Creating)}
        className="w-full mb-6 hover:bg-accent hover:text-accent-foreground cursor-pointer"
        onClick={handleNewTask}
      >
        Adicionar tarefa
      </Button>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </CardContent>
  );
}
