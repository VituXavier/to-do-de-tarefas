import { TASKS_KEY, TaskState, type Task } from "@/models/task";
import useLocalStorage from "use-local-storage";

export default function useTasks() {
  const [tasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

  return {
    tasks,
    tasksCont: tasks.filter((task) => task.state === TaskState.Created).length,
    concludedTasksCount: tasks.filter((task) => task.concluded).length,
  };
}
