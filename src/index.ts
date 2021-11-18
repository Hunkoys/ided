import { v4 as uuidv4 } from 'uuid';

export type Index = number;

export type Id = string;

export type Value = any;

export interface Element {
  id: Id;
  value: Value;
}

export class Ided {
  private __array__: Element[] = [];

  get length() {
    return this.__array__.length;
  }

  constructor(values?: Value[]) {
    if (values) {
      this.__array__ = values.map(value => {
        return { id: uuidv4(), value };
      });
    }
  }

  insert(value: Value, position?: Index): Element | null {
    const element = { id: uuidv4(), value };

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
