### head
Returns the head of a list.
```php
function head($items)
{
    return reset($items);
}
```
```rust
head([1, 2, 3]); // 1
```
-----
### tail
Returns all elements in an array except for the first one.
```php
function tail($items)
{
    return count($items) > 1 ? array_slice($items, 1) : $items;
}
```
```rust
tail([1, 2, 3]); // [2, 3]
```
-----
### countVowels
Returns number of vowels in provided string.

Use a regular expression to count the number of vowels (A, E, I, O, U) in a string.
```perl
function countVowels($string)
{
    preg_match_all('/[aeiou]/i', $string, $matches);

    return count($matches[0]);
}
```
```sql
countVowels('sampleInput'); // 4
```
-----
### isEven
Returns true if the given number is even, false otherwise.
```c
function isEven($number)
{
    return ($number % 2) === 0;
}
```
```rust
isEven(4); // true
```
-----
### decapitalize
Decapitalizes the first letter of a string.

Decapitalizes the first letter of the string and then adds it with rest of the string. Omit the upperRest parameter to keep the rest of the string intact, or set it to true to convert to uppercase.
```php
function decapitalize($string, $upperRest = false)
{
    return lcfirst($upperRest ? strtoupper($string) : $string);
}
```
```javascript
decapitalize('FooBar'); // 'fooBar'
```
-----
### lcm
Returns the least common multiple of two or more numbers.
```shell
function lcm(...$numbers)
{
    $ans = $numbers[0];
    for ($i = 1, $max = count($numbers); $i < $max; $i++) {
        $ans = (($numbers[$i] * $ans) / gcd($numbers[$i], $ans));
    }

    return $ans;
}
```
```rust
lcm(12, 7); // 84
lcm(1, 3, 4, 5); // 60
```
-----
### flatten
Flattens an array up to the one level depth.
```html:html
function flatten($items)
{
    $result = [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            $result[] = $item;
        } else {
            $result = array_merge($result, array_values($item));
        }
    }

    return $result;
}
```
```rust
flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
```
-----
### variadicFunction
A variadic function is a function of indefinite arity, i.e., one which accepts a variable number of arguments. The example shows variadicSum function, that takes an indefinite number of integers and returns their sum.
```php
function variadicSum(...$nums)
{
    $sum = 0;
    foreach($nums as $num) {
        $sum += $num;
    }
    return $sum;
}
```
```rust
variadicSum(1, 2); // 3
variadicSum(1, 2, 3, 4); // 10
```
-----
### compose
Return a new function that composes multiple functions into a single callable.
```javascript
function compose(...$functions)
{
    return array_reduce(
        $functions,
        function ($carry, $function) {
            return function ($x) use ($carry, $function) {
                return $function($carry($x));
            };
        },
        function ($x) {
            return $x;
        }
    );
}
```
```javascript
$compose = compose(
    // add 2
    function ($x) {
        return $x + 2;
    },
    // multiply 4
    function ($x) {
        return $x * 4;
    }
);
$compose(3); // 20
```