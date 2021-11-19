import { Ided } from '../src';
import { Id, Index, Key } from '../src/types';
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

describe('indexOf', () => {
  test('using id', () => {
    const ided = new Ided();

    const input = ['Beni', 'Clara', 'Valentino'];

    const elements = input.map(value => ided.insert(value));

    elements.forEach((element, i) => {
      if (element == null) {
        fail('One of the returned elements is null');
        return;
      }

      expect(ided.indexOf({ id: element.id })).toBe(i);
    });
  });

  test('using value', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    input.forEach((value, i) => {
      expect(ided.indexOf({ value })).toBe(i);
    });
  });

  test('with id and value', () => {
    const ided = new Ided();

    const input = ['Beni', 'Clara', 'Valentino'];

    const elements = input.map(value => ided.insert(value));

    elements.forEach((element, i) => {
      if (element == null) {
        fail('One of the returned elements is null');
        return;
      }
      expect(ided.indexOf({ id: element.id, value: element.value })).toBe(i);
    });
  });

  test('using element', () => {
    const ided = new Ided();

    const beni = ided.insert('Beni');
    const clara = ided.insert('Clara');
    const valentino = ided.insert('Valentino');

    expect(ided.indexOf(beni)).toBe(0);
    expect(ided.indexOf(clara)).toBe(1);
    expect(ided.indexOf(valentino)).toBe(2);
  });

  test('same values', () => {
    const input = ['Beni', 'Clara', 'Clara'];

    const ided = new Ided(input);

    expect(ided.indexOf({ value: 'Clara' })).toBe(1);
  });

  test('id not in list', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    const id = 'This is Some Unique ID you wont even guess it!';
    expect(ided.indexOf({ id })).toBe(-1);
  });

  test('value not in list', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    expect(ided.indexOf({ value: 'Clarita' })).toBe(-1);
  });
});

describe('at', () => {
  test('in bounds', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    expect(ided.at(1)?.value).toBe('Clara');
  });

  test('out of bounds', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    expect(ided.at(-1)).toBe(null);
    expect(ided.at(20)).toBe(null);
  });
});

describe('insert', () => {
  function expectToReturnTheElementWith(pos?: Index | Key) {
    const ided = new Ided();

    const input = 'Valentino';

    const expectation = {
      id: any(Id),
      value: input,
    };

    expect(ided.insert(input, pos)).toEqual(expectation);
  }

  test('no position argument', () => {
    const ided = new Ided();

    ided.insert('Beni');
    ided.insert('Clara');
    ided.insert('Valentino');

    expect(ided.toArray(values)).toEqual(['Beni', 'Clara', 'Valentino']);
    expectToReturnTheElementWith();
  });

  test('position 0', () => {
    const ided = new Ided();

    ided.insert('Beni', 0);
    ided.insert('Clara', 0);
    ided.insert('Valentino', 0);

    expect(ided.toArray(values)).toEqual(['Valentino', 'Clara', 'Beni']);
    expectToReturnTheElementWith(0);
  });

  test('negative positions', () => {
    const ided = new Ided();

    ided.insert('Beni'); // push
    ided.insert('Clara', -1);
    ided.insert('Valentino', -1);

    expect(ided.toArray(values)).toEqual(['Clara', 'Valentino', 'Beni']);
    expectToReturnTheElementWith(-1);
  });

  test('position > length', () => {
    const ided = new Ided();

    ided.insert('Beni', 10);
    ided.insert('Clara', 10);

    expect(ided.toArray(values)).toEqual(['Beni', 'Clara']);
    expectToReturnTheElementWith(10);
  });

  test('-position < -length', () => {
    const ided = new Ided();

    ided.insert('Beni', -10);
    ided.insert('Clara', -10);

    expect(ided.toArray(values)).toEqual(['Clara', 'Beni']);
    expectToReturnTheElementWith(-10);
  });

  test('using element as position', () => {
    const ided = new Ided();

    const beni = ided.insert('Beni');
    const clara = ided.insert('Clara', { id: beni.id });
    ided.insert('Valentino', clara);

    expect(ided.toArray(values)).toEqual(['Valentino', 'Clara', 'Beni']);
    expect(ided.insert('Clarita', clara)).toEqual({
      id: any(Id),
      value: 'Clarita',
    });
  });

  test('non-existing elements as position', () => {
    const input = ['Beni', 'Clara'];

    const ided = new Ided(input);
    ided.insert('Valentino', { value: 'Dogo' });
    ided.insert('Clarita', { id: 'Some Unique ID' });

    expect(ided.toArray(values)).toEqual([
      'Beni',
      'Clara',
      'Valentino',
      'Clarita',
    ]);
  });
});
