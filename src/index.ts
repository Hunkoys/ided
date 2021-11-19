import { Index, Key, Value } from './types';
import { Element } from './Element';

type Position = Index | Key;

function isAKey(position?: Position): position is Key {
  return typeof position !== Index && position != undefined;
}

function undefineNegative(value: number) {
  return value > -1 ? value : undefined;
}

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

  insert(value: Value, position?: Position): Element {
    const element = new Element(value);

    if (isAKey(position))
      position = undefineNegative(this.indexOf(position as Key));

    if (position == undefined) this.__array__.push(element);
    else {
      const index = position;

      this.__array__.splice(index as Index, 0, element);
    }

    return element;
  }

  // delete(position?: Index | Key): Element | Key {
  //   const positionIsAKey = typeof position !== Index && position != undefined;
  //   if (positionIsAKey) {
  //     const indexOfKey = this.indexOf(position as Key);
  //     position = indexOfKey > -1 ? indexOfKey : undefined;
  //   }
  // }

  toArray(
    callback: (element: Element, index: Index) => Value = element => element
  ) {
    return this.__array__.map(callback);
  }
}
