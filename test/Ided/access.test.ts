import { Ided } from '../../src';
import { Element } from '../../src/Element';
import { callbacks, none, values } from '../tools';

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

describe('search', () => {
  test('should return element with truthy', () => {
    const ided = new Ided(['Beni']);

    const beni = ided.at(0);

    if (beni == null) fail('at failed');

    for (const callback of callbacks.truthy) {
      expect(ided.search(callback)).toEqual(beni);
    }

    for (const callback of callbacks.falsy) {
      expect(ided.search(callback)).toBe(null);
    }
  });

  test('should NOT modify ided', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    const result = ided.search(({ value }) => value === 'Clara');

    if (result == null) fail('search failed');

    expect(ided.toArray(values)).toEqual(input);
  });

  test('should return instance of element', () => {
    const ided = new Ided(['Beni']);

    const result = ided.search(() => true);

    if (result == null) fail('search failed');

    expect(result).toBeInstanceOf(Element);
  });

  test('should return the first result', () => {
    const ided = new Ided([
      [0, 'Beni'],
      [1, 'Clara'],
      [2, 'Clara'],
    ]);

    const result = ided.search(element => element.value[1] === 'Clara');

    if (result == null) fail('search failed');

    expect(result.value[0]).toBe(1);
  });

  test('should throw when no argument', () => {
    const ided = new Ided(['Beni']);

    expect(() => {
      ided.search(none);
    }).toThrow();
  });
});
