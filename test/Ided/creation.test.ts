import { Ided } from '../../src';
import { values } from '../tools';

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
