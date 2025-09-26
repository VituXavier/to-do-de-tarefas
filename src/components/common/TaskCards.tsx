import useTask from "@/ hooks/use-task";
import { TaskState, type Task } from "@/models/task";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckIcon,
  PencilSimpleLineIcon,
  ProhibitIcon,
  TrashSimpleIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface TaskItemProps {
  task: Task;
}

const taskSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string(),
});

type TaskForm = z.infer<typeof taskSchema>;

export default function TaskCard({ task }: TaskItemProps) {
  const form = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const [isEditing, setIsEditing] = useState(
    task?.state === TaskState.Creating
  );

  const { updateTask, updateTaskStatus, deleteTask } = useTask();

  function handleEditTask() {
    setIsEditing(true);
  }

  function handleExitTask() {
      if(task.state === TaskState.Creating){
        deleteTask(task.id)
      }

    setIsEditing(false);
  }

  function handleDeleteTask() {
    deleteTask(task.id);
  }

  function onSubmitSaveTask(values: TaskForm): void {
    updateTask(task.id, values);
    setIsEditing(false);
  }

  return (
    <>
      <Card
        className={`
              relative transition-opacity mb-4
              ${task?.concluded ? "opacity-50" : ""} 
            `}
      >
        {!isEditing ? (
          <>
            <div id="mamba" className="px-6 flex items-center justify-between">
              <div className="flex gap-2">
                <Checkbox
                  value={task?.concluded?.toString()}
                  checked={task?.concluded}
                  onCheckedChange={(checked) => {
                    if (task?.id && typeof checked === "boolean") {
                      updateTaskStatus(task.id, checked);
                    }
                  }}
                />
                <CardTitle
                  className={`${task?.concluded ? "line-through" : ""}`}
                >
                  {task?.title}
                </CardTitle>
              </div>
              <CardAction className="flex gap-2">
                <Button
                  className="gap-2 cursor-pointer"
                  variant="destructive"
                  onClick={handleDeleteTask}
                >
                  <TrashSimpleIcon />
                </Button>
                <Button
                  className={` gap-2 cursor-pointer ${
                    task?.concluded ? "pointer-events-none" : ""
                  }`}
                  variant="ghost"
                  onClick={handleEditTask}
                >
                  <PencilSimpleLineIcon />
                </Button>
              </CardAction>
            </div>
            <CardContent>
              <p>{task?.description}</p>
            </CardContent>
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitSaveTask)}>
              <CardContent className="flex items-center justify-between">
                <div className="flex-1 mr-2 space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            required
                            autoFocus
                            placeholder="Título para a tarefa."
                            className="border-none shadow-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Descrição da tarefa..."
                            className="border-none shadow-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <CardAction className="">
                  <Button
                    type="button"
                    className="gap-2 cursor-pointer"
                    variant="destructive"
                    onClick={handleExitTask}
                  >
                    <ProhibitIcon />
                  </Button>
                  <Button
                    type="submit"
                    className={`gap-2 cursor-pointer hover:bg-[#0AFA00]`}
                    variant="ghost"
                  >
                    <CheckIcon />
                  </Button>
                </CardAction>
              </CardContent>
            </form>
          </Form>
        )}
      </Card>
    </>
  );
}
