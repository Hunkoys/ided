import { Ided } from '../src';
import { Element } from '../src/Element';

// ['Beni', 'Clara', 'Valentino']

const IdType = String;

function values(element: Element) {
  return element.value;
}

describe('constructor', () => {
  test('no parameter', () => {
    new Ided();
  });

  test('string array', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    expect(ided.toArray(({ value }) => value)).toEqual(input);
  });
});

describe('toArray', () => {
  test('empty list', () => {
    const ided = new Ided();

    expect(ided.toArray()).toEqual([]);
  });

  test('no callback', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const expectation = [
      {
        id: expect.any(IdType),
        value: 'Beni',
      },
      {
        id: expect.any(IdType),
        value: 'Clara',
      },
      {
        id: expect.any(IdType),
        value: 'Valentino',
      },
    ];

    const ided = new Ided(input);

    expect(ided.toArray()).toEqual(expectation);
  });

  test('with callback', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    expect(ided.toArray(({ value }) => value)).toEqual(input);
  });
});

describe('insert', () => {
  test('no position argument', () => {
    const ided = new Ided();

    ided.insert('Beni');
    ided.insert('Clara');
    ided.insert('Valentino');

    expect(ided.toArray(values)).toEqual(['Beni', 'Clara', 'Valentino']);
    expect(typeof ided.insert('Valentino')).not.toBe(undefined);
  });

  test('position 0', () => {
    const ided = new Ided();

    ided.insert('Beni', 0);
    ided.insert('Clara', 0);
    ided.insert('Valentino', 0);

    expect(ided.toArray(values)).toEqual(['Valentino', 'Clara', 'Beni']);
    expect(ided.insert('Valentino', 0)).not.toBeUndefined();
  });

  test('negative positions', () => {
    const ided = new Ided();

    ided.insert('Beni', -10);
    ided.insert('Clara', -10);
    ided.insert('Valentino', -10);

    expect(ided.toArray(values)).toEqual(['Valentino', 'Clara', 'Beni']);
    expect(ided.insert('Valentino', -10)).not.toBeUndefined();
  });

  test('position > length', () => {
    const ided = new Ided();

    ided.insert('Beni', 10);
    ided.insert('Clara', 10);

    expect(ided.toArray(values)).toEqual(['Beni', 'Clara']);
    expect(ided.insert('Valentino', 10)).not.toBeUndefined();
  });

  test('-position < -length', () => {
    const ided = new Ided();

    ided.insert('Beni', -10);
    ided.insert('Clara', -10);

    expect(ided.toArray(values)).toEqual(['Clara', 'Beni']);
    expect(ided.insert('Valentino', -10)).not.toBeUndefined();
  });
});
