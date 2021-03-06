import { Element } from '../src/Element';

export const constructors = {
  string: String,
  number: Number,
  boolean: Boolean,
  object: Object,
};

export function any(type: string) {
  return expect.any(constructors[type as keyof object]);
}

export function values(element: Element) {
  return element.value;
}

export function valueOf(element: Element | null): any {
  if (!(element instanceof Element)) {
    console.log(element);
    return null;
  }

  return element.value;
}
