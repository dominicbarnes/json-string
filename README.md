# json-string

> A JSON formatter with support for sorting keys and more.

## Install

```sh
$ npm install --save json-string
```

## Example

```js
var json = require('json-string');

var string = json({
  hello: 'world',
  foo: 'bar',
  number: 5
});

console.log(string);
// {
//   "foo": "bar",
//   "hello": "world",
//   "number": 5
// }
```

## API

### json(input, [options])

Formats the `input` value as a string. (any value can be passed for input, not
just objects)

**Available `options`:**

 * `replacer` (function) - Used to format object properties. (see [docs][1])
 * `sortKeys` (boolean) - If set to `false`, object keys will not be sorted.
 * `spaces` (number) - Used to set indentation levels. (see [docs][1])

### json.defaults

Exposed to allow for overriding the default options.

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
