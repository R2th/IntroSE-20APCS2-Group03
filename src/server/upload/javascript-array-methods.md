### Iterative Methods
#### filter()
runs the given function on every item in the array and returns an array of all items for which the function returns ***true***
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers.filter((item, index, array) => item > 2);
alert(filterResult); // [3, 4, 5, 4, 3]
```


#### forEach()
runs the given function on every item in the array. This method has no return value.
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.forEach((item, index, array) => {
    // do something here
});
```


#### map()
runs the given function on every item in the array and returns the result of each function call in an array
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let mapResult = numbers.map((item, index, array) => item * 2);
alert(filterResult); // [2, 4, 6, 8, 10, 8, 6, 4, 2]
```


#### every()
runs the given function on every item in the array and returns ***true*** if the function returns ***true*** for every item
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers.every((item, index, array) => item > 2);
alert(everyResult); // false
```


#### some()
runs the given function on every item in the array and returns ***true*** if the function returns ***true*** for any one item
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let someResult = numbers.some((item, index, array) => item > 2);
alert(someResult); // true
```


### Reordering Methods
Two methods deal directly with the reordering of items already in the array: ***reverse()*** and ***sort()***
#### reverse()
The ***reverse()*** method simply reverses the order of items in an array
```js
let values = [1, 2, 3, 4, 5];
values.reverse(); // [5, 4, 3, 2, 1]
```
#### sort()
By default, the ***sort()*** method puts the items in ascending order - with the smallest value first and the largest value last, Noted that the ***sort()*** method does the ***string comparison*** even all items in an array is number.
```js
let values = [0, 1, 5, 10, 15];
values.sort(); // [0, 1, 10, 15, 5]
```
To sort other data type like number, we can use a ***comparison function***
```js
let values = [15, 10, 0, 1, 5];
let compare = (value1, value2) => value1 - value2;
values.sort(compare); // [0, 1, 5, 10, 15];
```

### Stack Methods
An array object can act just like a stack, meaning the most recently added item is the first one removed. ECMAScript arrays provide ***push()*** and ***pop()*** specifically to allow stack-like behavior.
```js
let colors = [];
colors.push("red", "green", "blue"); // push 3 items => ["red", "green", "blue"]
colors.pop(); // get the last items => ["red", "green"]
```


### Queue Methods
A queue adds items to the end of a list and retrieves items from the front of the list. We can use ***push()*** method to add item to the end of an array and use ***shift()*** method to remove the first item in the array.
```js
let colors = [];
colors.push("red", "green", "blue"); // push 3 items => ["red", "green", "blue"]
colors.shift(); // remove the first item => ["green", "blue"]
```
ECMAScript also provides an ***unshift()*** method to add any number of items to the front of an array
```js
colors.unshift("black", "white"); // add 2 items to the front of the array => ["black", "white", "green", "blue"]
```


### Some useful ways
#### Remove duplicate values from JS array
```js
let names = ["Mike","Matt","Nancy","Adam","Jenny","Nancy","Carl"];
let uniqueNames = names.filter(function(item, pos, self) {
    return self.indexOf(item) === pos;
})
```
Although concise, this algorithm is not particularly efficient for large arrays (quadratic time). We have a better way:
```js
function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}
```


source: 
- Professional Javascript for Web Developers - Nicholas C. Zakas
- [Remove duplicate values from JS array](https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array)