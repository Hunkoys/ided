import { Ided } from '../src';

// TODO: Find a better name for sample.

const IdType = String;

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
