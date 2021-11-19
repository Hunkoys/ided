import { Ided } from '../../src';
import { Id, Index, Key } from '../../src/types';
import { Element } from '../../src/Element';
import { any, values } from '../tools';

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

describe('delete', () => {
  test('no position argument', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    const deleted = ided.delete();

    if (!(deleted instanceof Element)) fail('Deleted element is null');

    expect(deleted.value).toBe('Valentino');
    expect(ided.toArray(values)).toEqual(['Beni', 'Clara']);
  });

  test('position 0', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    const deleted = ided.delete(0);

    if (!(deleted instanceof Element)) fail('Deleted element is null');

    expect(deleted.value).toBe('Beni');
    expect(ided.toArray(values)).toEqual(['Clara', 'Valentino']);
  });

  test('negative position', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    const deleted = ided.delete(-1);

    if (!(deleted instanceof Element)) fail('Deleted element is null');

    expect(deleted.value).toBe('Valentino');
    expect(ided.toArray(values)).toEqual(['Beni', 'Clara']);
  });

  test('position out of bounds', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    const under = ided.delete(-10);
    const over = ided.delete(10);

    expect(under).toBe(null);
    expect(over).toBe(null);
    expect(ided.toArray(values)).toEqual(input);
  });

  test('using element as position', () => {
    const ided = new Ided();

    const beni = ided.insert('Beni');
    const clara = ided.insert('Clara');
    ided.insert('Valentino');

    const deletedClara = ided.delete({ id: clara.id });
    expect(ided.toArray(values)).toEqual(['Beni', 'Valentino']);

    const deletedBeni = ided.delete(beni);
    expect(ided.toArray(values)).toEqual(['Valentino']);

    const deletedVal = ided.delete({ value: 'Valentino' });
    expect(ided.toArray(values)).toEqual([]);

    [
      ['Beni', deletedBeni],
      ['Clara', deletedClara],
      ['Valentino', deletedVal],
    ].forEach(([value, deleted]) => {
      if (!(deleted instanceof Element)) fail('Deleted element is null');

      expect(deleted.value).toBe(value);
    });
  });

  test('non-existing elements as position', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    expect(ided.delete({ id: 'Some Arbitrary ID' })).toBe(null);
    expect(ided.delete({ value: 'Some Arbitrary Value' })).toBe(null);
    expect(ided.toArray(values)).toEqual(input);
  });
});

describe('length', () => {
  test('constructor', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided3 = new Ided(input);
    expect(ided3.length).toBe(3);

    const ided0 = new Ided();
    expect(ided0.length).toBe(0);
  });

  test('insert', () => {
    const ided3 = new Ided(['Beni', 'Clara', 'Valentino']);
    ided3.insert('Clarita');

    expect(ided3.length).toBe(4);

    const ided0 = new Ided();
    ided0.insert(undefined);

    expect(ided0.length).toBe(1);
  });

  test('delete', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    ided.delete(1);
    expect(ided.length).toBe(2);

    ided.delete({ value: 'Beni' });
    expect(ided.length).toBe(1);
  });

  'move';
});

describe('length', () => {
  test('constructor', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided3 = new Ided(input);
    expect(ided3.length).toBe(3);

    const ided0 = new Ided();
    expect(ided0.length).toBe(0);
  });

  test('insert', () => {
    const ided3 = new Ided(['Beni', 'Clara', 'Valentino']);
    ided3.insert('Clarita');

    expect(ided3.length).toBe(4);

    const ided0 = new Ided();
    ided0.insert(undefined);

    expect(ided0.length).toBe(1);
  });

  test('delete', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    ided.delete(1);
    expect(ided.length).toBe(2);

    ided.delete({ value: 'Beni' });
    expect(ided.length).toBe(1);
  });

  'move';
});
