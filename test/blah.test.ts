import { Ided } from '../src';
import { Id } from '../src/types';
import { Element } from '../src/Element';

// ['Beni', 'Clara', 'Valentino']

const constructors = {
  string: String,
  number: Number,
  boolean: Boolean,
  object: Object,
};

function any(type: string) {
  return expect.any(constructors[type as keyof object]);
}

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

    expect(ided.toArray(values)).toEqual(input);
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
        id: any(Id),
        value: 'Beni',
      },
      {
        id: any(Id),
        value: 'Clara',
      },
      {
        id: any(Id),
        value: 'Valentino',
      },
    ];

    const ided = new Ided(input);

    expect(ided.toArray()).toEqual(expectation);
  });

  test('with callback', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    expect(ided.toArray(values)).toEqual(input);
  });
});

describe('insert', () => {
  function testReturnWith(index?: number) {
    const ided = new Ided();

    const input = 'Valentino';

    const expectation = {
      id: any(Id),
      value: input,
    };

    expect(ided.insert(input, index)).toEqual(expectation);
  }

  test('no position argument', () => {
    const ided = new Ided();

    ided.insert('Beni');
    ided.insert('Clara');
    ided.insert('Valentino');

    expect(ided.toArray(values)).toEqual(['Beni', 'Clara', 'Valentino']);
    testReturnWith();
  });

  test('position 0', () => {
    const ided = new Ided();

    ided.insert('Beni', 0);
    ided.insert('Clara', 0);
    ided.insert('Valentino', 0);

    expect(ided.toArray(values)).toEqual(['Valentino', 'Clara', 'Beni']);
    testReturnWith(0);
  });

  test('negative positions', () => {
    const ided = new Ided();

    ided.insert('Beni'); // push
    ided.insert('Clara', -1);
    ided.insert('Valentino', -1);

    expect(ided.toArray(values)).toEqual(['Clara', 'Valentino', 'Beni']);
    testReturnWith(-1);
  });

  test('position > length', () => {
    const ided = new Ided();

    ided.insert('Beni', 10);
    ided.insert('Clara', 10);

    expect(ided.toArray(values)).toEqual(['Beni', 'Clara']);
    testReturnWith(10);
  });

  test('-position < -length', () => {
    const ided = new Ided();

    ided.insert('Beni', -10);
    ided.insert('Clara', -10);

    expect(ided.toArray(values)).toEqual(['Clara', 'Beni']);
    testReturnWith(-10);
  });
});
