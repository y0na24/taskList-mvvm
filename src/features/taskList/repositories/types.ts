import type { Task } from "../types";

export interface TaskRepository {
  getTasks(): Promise<Task[]>;
  addTask(payload: Task): Promise<Task>;
  toggleTask(id: number, completed: boolean): Promise<void>;
  removeTask(id: number): Promise<void>;
}
