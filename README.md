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

## API

* `new Ided(*any[]) => list` - Creates a new ided list. Optional array argument to fill the initial list.
* `Ided.parse(element[]) => list` - Converts an element array into an ided list. You can turn it back into an element array with `list.toArray()`.
* `list.insert(value, *index|element) => element` - Insert the `value` at position `index` or before the `element` or at the end if the second argument is omitted. Returns the inserted element. [<sup>1</sup>](#ref1)
* `list.length` - A property (`number`) representing the number of elements in the list.
* `list.indexOf(element) => index` - Gets the `index` of an element by its `id` or `value`. Returns `-1` otherwise. [<sup>1</sup>](#ref1)
* `list.at(index) => element|null` - Gets the `element` by its `index` or position in the list. [<sup>1</sup>](#ref1)
* `list.find(element) => element|null` - *Yes. This looks funny but check [1](#ref1)*. It's like `indexOf` but returns an element instead of an index. If you need a more verbose finder, use `list.search()`.
* `list.delete(*index|element) => element|null` - Deletes element from the list. Returns the deleted element. Deletes the last element if no argument is supplied. [<sup>1</sup>](#ref1)
* `list.search((element, index) => truthy|falsy) => element|null` - Returns the `element` of when the callback returns `truthy`. Loop ends when it does.
* `list.some((element, index) => truthy|falsy) => boolean` - Checks if at least **one** of the elements passes the callback. Loop ends when it does.
* `list.every((element, index) => truthy|falsy) => boolean` - Checks if **all** of the elements pass the callback.
* `list.map((element, index) => value) => new Ided()` - Returns a new ided list from callback's results. Id's stay the same.
* `list.filter((element, index) => truthy|falsy) => new Ided` - Returns a new ided list, a subset filtered by the callback. Id's stay the same.
* `list.toArray(*(element, index) => any) => any[]` - Returns an array from callback's results. Default callback: `element => element`. Only returns a **copy** of the list's internal array to avoid unexpected side effects. **NOT a deep copy**.


<ol>
<li>This <code>element</code> argument can be just an object with an id (<code>{id: 'a12'}</code>) or with a value (<code>{value: 'hi'}</code>). If element has both properties, the method will only use the <code>id</code>.
</li>
</ol>