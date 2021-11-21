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

  find(key: Key): Element | null {
    if (key == null) return null;
    const keyPos = this.indexOf(key);
    return this.at(keyPos);
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

  move(from: Position, to: Position) {
    if (to == null || from == null) {
      return;
    }

    if (isAKey(from)) {
      const keyPos = this.indexOf(from);
      if (keyPos < 0) return;
      from = keyPos;
    }

    if (isAKey(to)) {
      const keyPos = this.indexOf(to);
      if (keyPos < 0) return;
      to = keyPos;
    }

    const subject = this.delete(from);
    if (subject) this.__array__.splice(to, 0, subject);
  }

  private __traverse__(callback: (element: Element, index: Index) => unknown) {
    this.__array__.find(callback);
  }

  toArray(
    callback: (element: Element, index: Index) => Value = element => element
  ) {
    return this.__array__.map(callback);
  }

  map(callback: (value: Value, index: Index) => Value): Ided {
    if (typeof callback !== 'function')
      throw new TypeError(`Passed callback is not a function: ${callback}`);

    const ided = new Ided();

    this.__traverse__((element, index) => {
      const newElement = new Element(callback(element.value, index));
      newElement.id = element.id;

      ided.__array__.push(newElement);
    });

    return ided;
  }

  filter(callback: (value: Value, index: Index) => unknown): Ided {
    if (typeof callback !== 'function')
      throw new TypeError(`Passed callback is not a function: ${callback}`);

    const ided = new Ided();

    this.__traverse__((element, index) => {
      if (callback(element.value, index)) ided.__array__.push(element);
    });

    return ided;
  }
}
