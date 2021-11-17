import { v4 as uuidv4 } from 'uuid';

type Index = number;

interface Element {
  id: string;
  value: any;
}

export class Ided {
  private __array__: Element[] = [];

  constructor(values?: any[]) {
    if (values) {
      this.__array__ = values.map(value => {
        return { id: uuidv4(), value };
      });
    }
  }

  toArray(
    callback: (element: Element, index: Index) => any = element => element
  ) {
    return this.__array__.map(callback);
  }
}
