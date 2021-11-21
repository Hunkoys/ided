import { Element } from '../src/Element';
import { Index } from '../src/types';

export const constructors = {
  string: String,
  number: Number,
  boolean: Boolean,
  object: Object,
};

export function any(type: string) {
  return expect.any(constructors[type as keyof object]);
}

export function values(element: Element | null) {
  if (element == null) fail(`value element is invalid: ${element}`);
  return element.value;
}

export function ids(element: Element | null) {
  if (element == null) fail(`value element is invalid: ${element}`);
  return element.id;
}

export function indices(_: Element | null, i: Index) {
  return i;
}

export function valueOf(element: Element | null): any {
  if (!(element instanceof Element)) {
    console.log(element);
    return null;
  }

  return element.value;
}

export const none = (undefined as unknown) as any;

export const callbacks = {
  falsy: [
    () => false,
    () => '',
    () => 0,
    () => -0,
    () => NaN,
    () => null,
    () => undefined,
    // () => 0n,
  ],
  truthy: [
    () => true,
    () => 42,
    () => -42,
    () => 'foo',
    () => '0',
    () => 'false',
    () => {
      return {};
    },
    () => [Infinity],
    () => 1.1,
    // () => 1n,
  ],
};
