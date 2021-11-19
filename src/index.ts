import { Index, Key, Value } from './types';
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

  indexOf(key: Key): Index {
    if ('id' in key) return this.__array__.findIndex(({ id }) => id === key.id);
    else if ('value' in key)
      return this.__array__.findIndex(({ value }) => value === key.value);

    return -1;
  }

  at(index: Index): Element | null {
    return this.__array__[index] || null;
  }

  insert(value: Value, position?: Index | Key): Element {
    const element = new Element(value);

    const positionIsAKey = typeof position !== Index && position != undefined;
    if (positionIsAKey) {
      const indexOfKey = this.indexOf(position as Key);
      position = indexOfKey > -1 ? indexOfKey : undefined;
    }

    if (position == undefined) this.__array__.push(element);
    else {
      const index = position;

      this.__array__.splice(index as Index, 0, element);
      // as
    }

    return element;
  }

  toArray(
    callback: (element: Element, index: Index) => Value = element => element
  ) {
    return this.__array__.map(callback);
  }
}
