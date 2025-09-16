import type { Task } from "../types";
import type { TaskRepository } from "./types";

export class LocalStorageTaskRepository implements TaskRepository {
  private key = "tasks";

  private read(): Task[] {
    return JSON.parse(localStorage.getItem(this.key) ?? "[]");
  }

  private write(tasks: Task[]): void {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  async getTasks(): Promise<Task[]> {
    return this.read();
  }

  async addTask(payload: Task): Promise<Task> {
    const tasks = this.read();
    tasks.push(payload);
    this.write(tasks);
    return payload;
  }

  async toggleTask(id: number, completed: boolean): Promise<void> {
    const tasks = this.read().map((t) =>
      t.id === id ? { ...t, completed } : t,
    );
    this.write(tasks);
  }

  async removeTask(id: number): Promise<void> {
    const tasks = this.read().filter((t) => t.id !== id);
    this.write(tasks);
  }
}
