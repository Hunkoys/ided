import { Ided } from '../../src';
import { Id } from '../../src/types';
import { any, values } from '../tools';

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
