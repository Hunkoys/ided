import { Index, Value } from './types';
import { Element } from './Element';

export class Ided {
  private __array__: Element[] = [];

  get length() {
    return this.__array__.length;
  }

  constructor(values?: Value[]) {
    if (values) {
      this.__array__ = values.map(value => {
        return new Element(value);
      });
    }
  }

  insert(value: Value, position?: Index): Element | null {
    const element = new Element(value);

    const index = position;

    if (index == undefined) this.__array__.push(element);
    else this.__array__.splice(index, 0, element);

    return element;
  }

  toArray(
    callback: (element: Element, index: Index) => Value = element => element
  ) {
    return this.__array__.map(callback);
  }
}
