## **hasFlags**
Check if the current process's arguments contain the specified flags.
Use Array.prototype.every() and Array.prototype.includes() to check if process.argv contains all the specified flags. Use a regular expression to test if the specified flags are prefixed with - or -- and prefix them accordingly.
```javascript
const hasFlags = (...flags) =>
  flags.every(flag => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag));
```
```javascript
// node myScript.js -s --test --cool=true
hasFlags('-s'); // true
hasFlags('--test', 'cool=true', '-s'); // true
hasFlags('special'); // false
```

-----
## **readFileLines**
Returns an array of lines from the specified file.
Use readFileSync function in fs node package to create a Buffer from a file. convert buffer to string using toString(encoding) function. creating an array from contents of file by spliting file content line by line (each \n).
```javascript
const fs = require('fs');
const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');
```
```css
/*
contents of test.txt :
  line1
  line2
  line3
  ___________________________
*/
let arr = readFileLines('test.txt');
console.log(arr); // ['line1', 'line2', 'line3']
```
-----
## **URLJoin**
Joins all given URL segments together, then normalizes the resulting URL.

Use String.prototype.join('/') to combine URL segments, then a series of String.prototype.replace() calls with various regexps to normalize the resulting URL (remove double slashes, add proper slashes for protocol, remove slashes before parameters, combine parameters with '&' and normalize first parameter delimiter).
```rust
const URLJoin = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');
```
```javascript
URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo'); // 'http://www.google.com/a/b/cd?foo=123&bar=foo'
```
-----
## uniqueSymmetricDifference
Returns the unique symmetric difference between two arrays, not containing duplicate values from either array.

Use Array.prototype.filter() and Array.prototype.includes() on each array to remove values contained in the other, then create a Set from the results, removing duplicate values.
```python
const uniqueSymmetricDifference = (a, b) => [
  ...new Set([...a.filter(v => !b.includes(v)), ...b.filter(v => !a.includes(v))])
];
```
```rust
uniqueSymmetricDifference([1, 2, 3], [1, 2, 4]); // [3, 4]
uniqueSymmetricDifference([1, 2, 2], [1, 3, 1]); // [2, 3]
```
-----
## tail
Returns all elements in an array except for the first one.

Return Array.prototype.slice(1) if the array's length is more than 1, otherwise, return the whole array.
```shell
const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);
```
```rust
tail([1, 2, 3]); // [2,3]
tail([1]); // [1]
```
-----
## get
Retrieve a set of properties indicated by the given selectors from an object.

Use Array.prototype.map() for each selector, String.prototype.replace() to replace square brackets with dots, String.prototype.split('.') to split each selector, Array.prototype.filter() to remove empty values and Array.prototype.reduce() to get the value indicated by it.
```javascript
const get = (from, ...selectors) =>
  [...selectors].map(s =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter(t => t !== '')
      .reduce((prev, cur) => prev && prev[cur], from)
  );
```
```rust
const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };
get(obj, 'selector.to.val', 'target[0]', 'target[2].a'); // ['val to select', 1, 'test']
```
-----
## radsToDegrees
Converts an angle from radians to degrees.

Use Math.PI and the radian to degree formula to convert the angle from radians to degrees.
```shell
const radsToDegrees = rad => (rad * 180.0) / Math.PI;
```
```rust
radsToDegrees(Math.PI / 2); // 90
```
-----
## dayOfYear
Gets the day of the year from a Date object.

Use new Date() and Date.prototype.getFullYear() to get the first day of the year as a Date object, subtract it from the provided date and divide with the milliseconds in each day to get the result. Use Math.floor() to appropriately round the resulting day count to an integer.
```rust
const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
```
```cpp
dayOfYear(new Date()); // 272
```