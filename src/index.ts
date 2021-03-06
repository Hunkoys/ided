import { Index, Key, Position, Value } from './types';
import { Element } from './Element';

function isAKey(position?: Position): position is Key {
  return typeof position !== Index && position != null;
}

function realIndex(value: number) {
  return value > -1 ? value : null;
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

  insert(value: Value, position?: Position): Element | null {
    const element = new Element(value);

    if (position == null) {
      this.__array__.push(element);
    } else {
      if (isAKey(position)) {
        const keyPos = realIndex(this.indexOf(position));
        if (keyPos == null) return null;
        else position = keyPos;
      }

      const index = position;

      const indexWithinBounds = Math.abs(index) <= this.length;
      if (indexWithinBounds) this.__array__.splice(index, 0, element);
      else return null;
    }

    return element;
  }

  delete(position?: Position): Element | null {
    if (position == null) {
      position = -1;
    } else if (isAKey(position)) {
      const keyPos = realIndex(this.indexOf(position));

      if (keyPos == null) return null;
      else position = keyPos;
    }

    const abs = Math.abs(position);
    if (abs > this.length) position = abs;

    return this.__array__.splice(position, 1)[0] || null;
  }

  toArray(
    callback: (element: Element, index: Index) => Value = element => element
  ) {
    return this.__array__.map(callback);
  }
}
