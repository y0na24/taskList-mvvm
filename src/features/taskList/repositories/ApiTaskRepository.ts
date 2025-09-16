import { httpClient } from "../../../shared/HttpClient";
import type { TaskRepository } from "./types";
import type { Task } from "../types";

export class ApiTaskRepository implements TaskRepository {
  private endpoint = "tasks";

  async getTasks(): Promise<Task[]> {
    const { success, data } = await httpClient.get<Task[]>(this.endpoint);

    if (!success) {
      throw new Error(`Не удалось получить задачи`);
    }

    return data;
  }

  async addTask(payload: Task): Promise<Task> {
    const { success, data } = await httpClient.post<Task>(
      this.endpoint,
      payload,
    );

    if (!success) {
      throw new Error(`Не удалось добавить задачу`);
    }

    return data;
  }

  async removeTask(id: number): Promise<void> {
    const { success } = await httpClient.delete(`${this.endpoint}/${id}`);

    if (!success) {
      throw new Error(`Не удалось удалить задачу`);
    }
  }

  async toggleTask(id: number, completed: boolean): Promise<void> {}
}
