# ided

Assign unique ids to your array elements.

/aye/aye-deed/ - you know, id in its past tense, with the suffix *-ed*. hah, Get it? Hmm, nevermind...

## Terms

* `element: {}` - A single item in an ided list. It has an `id` and `value` property.
  * `id: string`
  * `value: any` 
* `index: number` - The position of an element in the list. Like an array's index.
* `list: {}` - Instance of `Ided` class.
* `*` - Optional
* `|` - Or
* `key: {id: string} | {value: any} | element` - Used for matching or finding elements.

## API

* `new Ided(*any[]) => list`
  * Create a new ided list.
  * Optional array argument to fill the initial list.
* `Ided.restore(element[]) => list`
  * Convert an `element[]` into an ided list.
* `Ided.stringify()`
  * Create string representation of the list.
* `Ided.parse()`
  * Parse string representation of the list.
* `list.length`
  * A property (`number`) representing the number of elements in the list.
* `list.insert(value, *index|key) => element|null`
  * Insert an element at position index, or before the matched key, or at the end of the list if the second argument is omitted.
  * Negative `index` defines the position from the end of the list.
  * Index `insert('value', list.length)` is valid and has the same effect as `insert('value')`.
  * Returns `null` if index is out of bounds or no key match, otherwise returns the inserted `element`.
* `list.indexOf(key) => index` 
  * Get the `index` of an element by its `id` or `value`.
  * Returns `-1` otherwise.
* `list.at(index) => element|null`
  * Get the `element` by its `index`.
* `list.find(key) => element|null`
  * It's like `indexOf` but returns an element instead of an index. If you need a more verbose finder, use `list.search()`.
* `list.delete(*index|key) => element|null`
  * Delete element from the list.
  * Deletes the last element if no argument is supplied.
  * Returns null if index is out of bounds or no key match, otherwise returns the deleted element.
* `list.move()`
  * 
* `list.search((element, index) => truthy|falsy) => element|null`
  * Returns the `element` of when the callback returns `truthy`.
  * Loop ends when it matches.
* `list.some((element, index) => truthy|falsy) => boolean`
  * Checks if at least **one** of the elements passes the callback.
  * Loop ends when it matches.
* `list.every((element, index) => truthy|falsy) => boolean`
  * Checks if **all** of the elements pass the callback.
* `list.map((element, index) => value) => new Ided()`
  * Returns a new ided list from callback's results.
  * Ids are preserved.
* `list.filter((element, index) => truthy|falsy) => new Ided`
  * Returns a new ided list, a subset filtered by the callback.
  * Ids are preserevd.
* `list.toArray(*(element, index) => any) => any[]`
  * Returns an array from callback's results.
  * Default callback: `element => element`.
  * Only returns a **copy** of the list's internal array to avoid unexpected side effects. **NOT a deep copy**.

