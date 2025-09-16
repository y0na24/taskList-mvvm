import { TaskModel } from "./TaskModel";
import { TaskListView } from "./TaskListView";
import { LocalStorageTaskRepository } from "./repositories/LocalStorageTaskRepository";
import { TaskListViewModel } from "./TaskListViewModel";

export function setupTaskList() {
  const model = new TaskModel(new LocalStorageTaskRepository());

  const viewModel = new TaskListViewModel(model);

  const taskListView = new TaskListView(viewModel);

  model.subscribe((tasks) => taskListView.render(tasks));
}
