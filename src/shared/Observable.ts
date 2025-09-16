/*
Если плохо понимаешь Observable, то смотри моё видео на YouTube - https://youtu.be/Bi7JuPhZRtQ?si=ZGqOkuF9Y930CSNl

И почитай данную статью https://refactoring.guru/ru/design-patterns/observer

Данный паттерн позволяет избегать прямых импортов программных компонентов и лишнего кода.

Мы можем просто подписаться на изменения каких-то данных в одном и выполнить нужную нам работу.

В setupTaskList.ts мы подписались нашим View на Model, тем самым предотвратив прямые зависимости
и лишний код.

Мы можем прокинуть метод render в Model и вызывать его напрямую в модели.
НО таким образом наша модель (данные) узнают о том, что есть какой-то интерфейс.

Либо мы можем в презенторе вызывать метод render напрямую в каждом handle. 
Так будет много лишнего кода. 
Придется каждый раз вызывать руками render.
Нам это не надо.

Мы крутые типы.
*/

export class Observable<T = void> {
  private listeners: ((data: T) => void)[] = [];

  subscribe(listener: (data: T) => void) {
    this.listeners.push(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener: (data: T) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  protected notify(data: T) {
    this.listeners.forEach((l) => l(data));
  }
}
