import { ReactiveProperty } from "../../shared/ReactiveProperty";

import { TaskModel } from "./TaskModel";

export class TaskListViewModel {
  taskInput = new ReactiveProperty<string>("");

  constructor(private model: TaskModel) {
    this.model.getTasks();
  }

  async handleAdd(title: string) {
    try {
      await this.model.addTask(title);
    } catch {
      throw Error;
    }
  }

  async handleRemove(id: number) {
    try {
      await this.model.removeTask(id);
    } catch {
      throw Error;
    }
  }

  async handleToggle(id: number) {
    try {
      await this.model.toggleTask(id);
    } catch {
      throw Error;
    }
  }
}
