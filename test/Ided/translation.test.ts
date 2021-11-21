import { Ided } from '../../src';
import { Element } from '../../src/Element';
import { Id, Value } from '../../src/types';
import { any, ids, none, values } from '../tools';

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

describe('map', () => {
  test('should preverve ids and values', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    const original = ided.toArray();

    const clone = ided.map(value => value).toArray();

    expect(original).toEqual(clone);
  });

  test('should produce instances of Element', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    const clone = ided.map(() => 'Some value');

    const sample = clone.at(1);

    if (sample == null) fail('at faileed');

    expect(sample).toBeInstanceOf(Element);
  });

  test('should preserve original list', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    ided.map(value => value).toArray();

    expect(ided.toArray(values)).toEqual(input);
  });

  test('should return [] on empty', () => {
    expect(new Ided().map(value => value).toArray(values)).toEqual([]);
  });

  test('should provide index', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    expect(ided.map((_, i) => i).toArray(values)).toEqual([0, 1, 2]);
  });

  test('should throw when no argument', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    expect(() => {
      ided.map(none as () => Value);
    }).toThrow();
  });
});

describe('filter', () => {
  test('should filter with truthy values', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    const callbacks = {
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

    for (const callback of callbacks.truthy) {
      const clone = ided.filter(callback);
      expect(clone.toArray()).not.toEqual([]);
    }

    for (const callback of callbacks.falsy) {
      const clone = ided.filter(callback);
      expect(clone.toArray()).toEqual([]);
    }
  });

  test('preserve ids and values', () => {
    const input = [
      'Valentino',
      'Beni',
      'Clara',
      'Valentino',
      'Beni',
      'Clara',
      'Valentino',
    ];

    const ided = new Ided(input);

    const valentinos = [0, 3, 6].map(i => ided.at(i));

    for (const valentino of valentinos) {
      if (valentino == null) fail('at(s) failed');
      if (valentino.value !== 'Valentino') fail(`at()'d the wrong element`);
    }

    const valentinoIds = valentinos.map(ids);
    const valentinoValues = valentinos.map(values);

    expect(ided.filter(() => true).toArray(values)).toEqual(input);
    expect(ided.filter(value => value === 'Valentino').toArray(ids)).toEqual(
      valentinoIds
    );
    expect(ided.filter(value => value === 'Valentino').toArray(values)).toEqual(
      valentinoValues
    );
  });

  test('should preserve original list', () => {
    const ided = new Ided(['Beni']);

    const beni = { ...ided.at(0) };

    if (beni == null) fail('at failed');

    ided.filter(() => true);

    expect(ided.toArray()).toEqual([beni]);
  });

  test('should produce instances of Element', () => {
    const ided = new Ided(['Beni']);

    const clone = ided.filter(() => true);

    const sample = clone.at(0);

    if (sample == null) fail('at failed');

    expect(sample).toBeInstanceOf(Element);
  });

  test('should provide index', () => {
    const input = [
      'Valentino',
      'Beni',
      'Clara',
      'Valentino',
      'Beni',
      'Clara',
      'Valentino',
    ];

    const ided = new Ided(input);

    ided.filter((_, i) => {
      expect(i).toEqual(expect.any(Number));
      return true;
    });
  });

  test('should return [] on empty', () => {
    expect(new Ided().toArray(values)).toEqual([]);
  });

  test('should throw when no argument', () => {
    const ided = new Ided([
      'Valentino',
      'Beni',
      'Clara',
      'Valentino',
      'Beni',
      'Clara',
      'Valentino',
    ]);

    expect(() => {
      ided.filter(none as () => boolean);
    }).toThrow();
  });
});
