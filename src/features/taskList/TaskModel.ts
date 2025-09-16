import type { Task } from "./types";
import type { TaskRepository } from "./repositories/types";
import { Observable } from "../../shared/Observable";

export class TaskModel extends Observable<Task[]> {
  private tasks: Task[] = [];
  private id = 0;

  constructor(private taskRepository: TaskRepository) {
    super();
  }

  async getTasks() {
    const tasks = await this.taskRepository.getTasks();

    this.tasks = tasks;

    this.notify(this.tasks);
  }

  async addTask(title: string) {
    const task: Task = {
      id: this.id++,
      title,
      completed: false,
    };

    await this.taskRepository.addTask(task);
    this.tasks.push(task);

    this.notify(this.tasks);
  }

  async removeTask(id: number) {
    await this.taskRepository.removeTask(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.notify(this.tasks);
  }

  async toggleTask(id: number) {
    const task = this.tasks.find((t) => t.id === id);

    if (task) {
      await this.taskRepository.toggleTask(id, !task.completed);
      task.completed = !task.completed;
    }

    this.notify(this.tasks);
  }
}
