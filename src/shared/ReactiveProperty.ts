type Action<Value> = (value: Value) => void;

export class ReactiveProperty<Value> {
  private _value: Value;
  onChange: Action<Value> = () => {};

  constructor(value: Value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if (newValue === this._value) return;

    this._value = newValue;
    this.onChange(newValue);
  }
}
