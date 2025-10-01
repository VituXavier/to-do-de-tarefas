import useTask from "@/ hooks/use-task";
import useTasks from "@/ hooks/use-tasks";
import { TaskState } from "@/models/task";
import { PencilSimpleLineIcon, TrashSimpleIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardTitle } from "../ui/card";
import TaskCard from "./TaskCards";
import { Checkbox } from "../ui/checkbox";

export default function TaskList() {
  const { tasks } = useTasks();
  const { prepareTask } = useTask();

  const creatingTask = tasks.some(
    (task) => task.state === TaskState.Creating
  );

  function handleNewTask() {
    prepareTask();
  }

  return (
    <CardContent>
      <Button
        disabled={creatingTask}
        className="w-full mb-6 hover:bg-accent hover:text-accent-foreground cursor-pointer"
        onClick={handleNewTask}
      >
        Adicionar tarefa
      </Button>

      {!creatingTask && tasks.length === 0 ? (
        <Card
          className={`
              relative transition-opacity mb-4
              ${!creatingTask ? "opacity-50" : ""} 
            `}
        >
          <div className="px-6 flex items-center justify-between">
            <div className="flex gap-2">
              <Checkbox defaultChecked={true} disabled/>
              <CardTitle
                className={`${!creatingTask ? "line-through" : ""}`}
              >
                Crie sua tarefa no botão acima
              </CardTitle>
            </div>
            <CardAction className="flex gap-2">
              <Button
                className="gap-2 cursor-pointer"
                variant="destructive"
                disabled
              >
                <TrashSimpleIcon />
              </Button>
              <Button
                className={` gap-2 cursor-pointer ${
                  !creatingTask ? "pointer-events-none" : ""
                }`}
                variant="ghost"
                disabled
              >
                <PencilSimpleLineIcon />
              </Button>
            </CardAction>
          </div>
          <CardContent>
            <p>Como quiser.</p>
          </CardContent>
        </Card>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </CardContent>
  );
}
