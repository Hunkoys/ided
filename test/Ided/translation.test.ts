import { Ided } from '../../src';
import { Id, Value } from '../../src/types';
import { any, none, values } from '../tools';

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
  test('preverve ids and values', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    const original = ided.toArray();

    const clone = ided.map(value => value).toArray();

    expect(original).toEqual(clone);
  });

  test('empty', () => {
    expect(new Ided().map(value => value).toArray(values)).toEqual([]);
  });

  test('provide index', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    expect(ided.map((_, i) => i).toArray(values)).toEqual([0, 1, 2]);
  });

  test('no argument', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    expect(() => {
      ided.map(none as () => Value);
    }).toThrow();
  });
});
