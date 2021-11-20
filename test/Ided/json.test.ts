import { Ided } from '../../src';
import { none } from '../tools';

describe('stringify', () => {
  test('with Ided object', () => {
    const ided = new Ided();

    const beni = ided.insert('Beni');
    const clara = ided.insert('Clara');
    const valentino = ided.insert('Valentino');

    if (beni === null || clara == null || valentino == null) {
      fail('insert(s) have failed');
    }

    expect(Ided.stringify(ided)).toBe(
      `[{"id":"${beni.id}","value":"Beni"},{"id":"${clara.id}","value":"Clara"},{"id":"${valentino.id}","value":"Valentino"}]`
    );
  });

  test('empty', () => {
    const ided = new Ided();

    expect(Ided.stringify(ided)).toBe('[]');
  });

  test('no argument', () => {
    expect(Ided.stringify(none)).toBe(undefined);
  });

  test('match JSON.stringify', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    expect(Ided.stringify(ided)).toBe(JSON.stringify(ided.toArray()));
    expect(Ided.stringify(none)).toBe(JSON.stringify(none));
  });
});
