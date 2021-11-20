import { Ided } from '../../src';
import { Position } from '../../src/types';
import { Element } from '../../src/Element';
import { values, valueOf } from '../tools';

describe('insert', () => {
  function toReturnElementWith(pos?: Position, ided = new Ided()) {
    const inserted = ided.insert('Valentino', pos);

    if (inserted instanceof Element && inserted.value === 'Valentino')
      return true;
    return false;
  }

  test('no position argument', () => {
    const ided = new Ided();

    ided.insert('Beni');
    ided.insert('Clara');
    ided.insert('Valentino');

    expect(ided.toArray(values)).toEqual(['Beni', 'Clara', 'Valentino']);
    expect(toReturnElementWith()).toBe(true);
  });

  test('position 0', () => {
    const ided = new Ided();

    ided.insert('Beni', 0);
    ided.insert('Clara', 0);
    ided.insert('Valentino', 0);

    expect(ided.toArray(values)).toEqual(['Valentino', 'Clara', 'Beni']);
    expect(toReturnElementWith(0)).toBe(true);
  });

  test('negative positions', () => {
    const ided = new Ided(['Beni']);

    ided.insert('Clara', -1);
    ided.insert('Valentino', -1);

    expect(ided.toArray(values)).toEqual(['Clara', 'Valentino', 'Beni']);
    expect(toReturnElementWith(-1)).toBe(false);
    expect(toReturnElementWith(-1, new Ided(['Clara']))).toBe(true);
  });

  test('position > length', () => {
    const ided = new Ided();

    ided.insert('Beni', 10);
    ided.insert('Clara', 10);

    expect(ided.toArray(values)).toEqual([]);
    expect(toReturnElementWith(10)).toBe(false);
  });

  test('-position < -length', () => {
    const ided = new Ided();

    ided.insert('Beni', -10);
    ided.insert('Clara', -10);

    expect(ided.toArray(values)).toEqual([]);
    expect(toReturnElementWith(-10)).toBe(false);
  });

  test('using element as position', () => {
    const ided = new Ided();

    const beni = ided.insert('Beni');
    const clara = beni && ided.insert('Clara', { id: beni.id });

    if (clara != null) ided.insert('Valentino', clara);

    expect(ided.toArray(values)).toEqual(['Valentino', 'Clara', 'Beni']);

    const key = {
      value: 'Clara',
    };
    expect(toReturnElementWith(key, new Ided(['Clara']))).toBe(true);
  });

  test('non-existing elements as position', () => {
    const input = ['Beni', 'Clara'];

    const ided = new Ided(input);
    ided.insert('Valentino', {
      value: 'Some Arbitrary Value',
    });
    ided.insert('Clarita', { id: 'Some Arbitrary ID' });

    expect(ided.toArray(values)).toEqual(input);
    expect(toReturnElementWith({ value: '' })).toBe(false);
  });
});

describe('delete', () => {
  test('no position argument', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    const deleted = ided.delete();

    expect(valueOf(deleted)).toBe('Valentino');
    expect(ided.toArray(values)).toEqual(['Beni', 'Clara']);
  });

  test('position 0', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    const deleted = ided.delete(0);

    expect(valueOf(deleted)).toBe('Beni');
    expect(ided.toArray(values)).toEqual(['Clara', 'Valentino']);
  });

  test('negative position', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    const deleted = ided.delete(-1);

    expect(valueOf(deleted)).toBe('Valentino');
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

    if (beni === null || clara == null) {
      fail('insert(s) have failed');
    }

    const deletedBeni = ided.delete(beni);
    expect(ided.toArray(values)).toEqual(['Clara', 'Valentino']);

    const deletedClara = ided.delete({ id: clara.id });
    expect(ided.toArray(values)).toEqual(['Valentino']);

    const deletedVal = ided.delete({ value: 'Valentino' });
    expect(ided.toArray(values)).toEqual([]);

    const sequence: [Element | null, string][] = [
      [deletedBeni, 'Beni'],
      [deletedClara, 'Clara'],
      [deletedVal, 'Valentino'],
    ];

    sequence.forEach(([deleted, value]) =>
      expect(valueOf(deleted)).toBe(value)
    );
  });

  test('non-existing elements as position', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    expect(ided.delete({ id: 'Some Arbitrary ID' })).toBe(null);
    expect(ided.delete({ value: 'Some Arbitrary Value' })).toBe(null);
    expect(ided.toArray(values)).toEqual(input);
  });
});

describe('move', () => {
  test('missing arguments', () => {
    const input = ['Beni', 'Clara', 'Valentino'];
    const ided = new Ided(input);

    const none = (undefined as unknown) as Position;

    ided.move(none, none);
    expect(ided.toArray(values)).toEqual(input);
    ided.move(1, none);
    expect(ided.toArray(values)).toEqual(input);
    ided.move(none, 1);
    expect(ided.toArray(values)).toEqual(input);
  });

  test('with index', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    ided.move(1, 0);
    expect(ided.toArray(values)).toEqual(['Clara', 'Beni', 'Valentino']);
    ided.move(1, 2);
    expect(ided.toArray(values)).toEqual(['Clara', 'Valentino', 'Beni']);
  });

  test('with id', () => {
    const ided = new Ided();

    const beni = ided.insert('Beni');
    const clara = ided.insert('Clara');
    const valentino = ided.insert('Valentino');

    if (beni == null || clara == null || valentino == null)
      fail('insert failed');

    ided.move({ id: clara.id }, { id: beni.id });
    expect(ided.toArray(values)).toEqual(['Clara', 'Beni', 'Valentino']);
    ided.move({ id: beni.id }, { id: valentino.id });
    expect(ided.toArray(values)).toEqual(['Clara', 'Valentino', 'Beni']);
  });

  test('with value', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    ided.move({ value: 'Clara' }, { value: 'Beni' });
    expect(ided.toArray(values)).toEqual(['Clara', 'Beni', 'Valentino']);
    ided.move({ value: 'Beni' }, { value: 'Valentino' });
    expect(ided.toArray(values)).toEqual(['Clara', 'Valentino', 'Beni']);
  });

  test('with element', () => {
    const ided = new Ided();

    const beni = ided.insert('Beni');
    const clara = ided.insert('Clara');
    const valentino = ided.insert('Valentino');

    if (beni == null || clara == null || valentino == null)
      fail('insert failed');

    ided.move(clara, beni);
    expect(ided.toArray(values)).toEqual(['Clara', 'Beni', 'Valentino']);
    ided.move(beni, valentino);
    expect(ided.toArray(values)).toEqual(['Clara', 'Valentino', 'Beni']);
  });

  test('same positions', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    ided.move(1, 1);
    expect(ided.toArray(values)).toEqual(input);
    ided.move(2, 2);
    expect(ided.toArray(values)).toEqual(input);
  });

  test('out of bounds', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    ided.move(-1, 2);
    expect(ided.toArray(values)).toEqual(input);
    ided.move(2, 10);
    expect(ided.toArray(values)).toEqual(input);
  });

  test('non-existing elements as positions', () => {
    const input = ['Beni', 'Clara', 'Valentino'];

    const ided = new Ided(input);

    ided.move({ id: '' }, { value: 'Clara' });
    expect(ided.toArray(values)).toEqual(input);
    ided.move({ value: 'Clara' }, { id: '' });
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
    ided3.insert('Clarita');

    expect(ided3.length).toBe(5);

    const ided0 = new Ided();
    ided0.insert(undefined);

    expect(ided0.length).toBe(1);
  });

  test('delete', () => {
    const ided = new Ided(['Beni', 'Clara', 'Valentino']);

    ided.delete(1);
    ided.delete();
    expect(ided.length).toBe(1);
    ided.delete({ value: 'Beni' });
    expect(ided.length).toBe(0);
  });

  test('move', () => {
    const input = ['Beni', 'Clara', 'Valentino'];
    const l = input.length;

    const ided = new Ided(input);

    ided.move(2, 1);
    ided.move(0, 2);
    expect(ided.length).toBe(l);
    ided.move({ value: 'Beni' }, { value: 'Clara' });
    expect(ided.length).toBe(l);
    ided.move({ value: 'Clara' }, { value: 'Valentino' });
    expect(ided.length).toBe(l);
  });
});
