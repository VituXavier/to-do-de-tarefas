import { TASKS_KEY, TaskState, type Task } from "@/models/task";
import useLocalStorage from "use-local-storage";

export default function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

  function prepareTask() {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(36).substring(2, 9),
        title: "",
        description: "",
        state: TaskState.Creating,
      },
    ]);
  }

  function updateTask(id: string, payload: {title: Task["title"], description?: Task["description"]}) {
    setTasks(
      tasks.map((task) => task.id === id ? {...task, state: TaskState.Created, ...payload}: task)
    )
  }

  function updateTaskStatus(id: string, concluded: Task["concluded"]) {
    setTasks(
      tasks.map((task) => task.id === id ? {...task, concluded} : task)
    )
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task?.id !== id))
  }

  return {
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };
}
