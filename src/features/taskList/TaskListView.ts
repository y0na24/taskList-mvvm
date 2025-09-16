import type { TaskListViewModel } from "./TaskListViewModel";
import type { Task } from "./types";

export class TaskListView {
  private input: HTMLInputElement;
  private list: HTMLUListElement;
  private form: HTMLFormElement;

  constructor(private viewModel: TaskListViewModel) {
    this.form = document.getElementById("task-form") as HTMLFormElement;
    this.input = document.getElementById("task-input") as HTMLInputElement;
    this.list = document.getElementById("task-list") as HTMLUListElement;

    this.bindListeners();

    this.bindTaskInputWithVM();
  }

  render(tasks: Task[]) {
    this.list.innerHTML = "";

    tasks.forEach((task) => this.createTask(task));
  }

  bindAddTask() {
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const inputValue = this.viewModel.taskInput.value;

      if (inputValue) {
        try {
          await this.viewModel.handleAdd(inputValue);

          this.input.value = "";
        } catch {
          // errorToast на уровне view, т.к это логика UI
          alert("Не удалось добавить задачу");
        }
      }
    });
  }

  bindRemoveTask() {
    this.list.addEventListener("click", async (e) => {
      const target = e.target as HTMLElement;

      const btn = target.closest("button.remove-btn") as HTMLElement;

      if (btn) {
        try {
          await this.viewModel.handleRemove(Number(btn.dataset.id));
        } catch {
          // errorToast на уровне view, т.к это логика UI
          alert("Не удалось удалить задачу");
        }
      }
    });
  }

  bindToggleTask() {
    this.list.addEventListener("click", async (e) => {
      const span = (e.target as HTMLElement).closest("span.task-title");
      if (span) {
        try {
          await this.viewModel.handleToggle(
            Number(span.parentElement?.dataset.id),
          );
        } catch {
          // errorToast на уровне view, т.к это логика UI
          alert("Не удалось удалить задачу");
        }
      }
    });
  }

  private bindTaskInputWithVM() {
    this.viewModel.taskInput.onChange = (newValue) => {
      this.input.value = newValue;
    };

    this.input.addEventListener("input", (e) => {
      const { value } = e.target as HTMLInputElement;

      this.viewModel.taskInput.value = value;
    });
  }

  private bindListeners() {
    this.bindAddTask();
    this.bindRemoveTask();
    this.bindToggleTask();
  }

  private createTask(task: Task) {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.dataset.id = String(task.id);

    const title = document.createElement("span");
    title.textContent = task.title;
    title.classList.add("task-title");

    if (task.completed) {
      title.classList.add("completed");
    }

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.classList.add("remove-btn");
    removeBtn.dataset.id = String(task.id);

    li.append(title, removeBtn);
    this.list.appendChild(li);
  }
}
