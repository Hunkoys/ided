import { Ided } from '../../src';
import { none } from '../tools';

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

    [beni, clara, valentino].forEach((inserted, i) => {
      if (inserted != null) expect(ided.indexOf(inserted)).toBe(i);
    });
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

describe('find', () => {
  test('with id', () => {
    const ided = new Ided();

    const beni = ided.insert('Beni');
    const clara = ided.insert('Clara');
    const valentino = ided.insert('Valentino');

    if (beni == null || clara == null || valentino == null)
      fail('insert(s) failed');

    expect(ided.find({ id: beni.id })).toEqual(beni);
    expect(ided.find({ id: clara.id })).toEqual(clara);
    expect(ided.find({ id: valentino.id })).toEqual(valentino);
  });

  test('with value', () => {
    const ided = new Ided();

    const beni = ided.insert('Beni');
    const clara = ided.insert('Clara');
    const valentino = ided.insert('Valentino');

    if (beni == null || clara == null || valentino == null)
      fail('insert(s) failed');

    expect(ided.find({ value: beni.value })).toEqual(beni);
    expect(ided.find({ value: clara.value })).toEqual(clara);
    expect(ided.find({ value: valentino.value })).toEqual(valentino);
  });

  test('no argument', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    expect(ided.find(none)).toBe(null);
  });

  test('non-existent', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    expect(ided.find({ id: 'Some ID' })).toBe(null);
    expect(ided.find({ value: 'Some Value' })).toBe(null);
  });
});
