# What is Higher-order Function?
A callback function, also known as a higher-order function, is a function that is passed to another function (let’s call this other function “otherFunction”) as a parameter, and the callback function is called (or executed) inside the otherFunction. A callback function is essentially a pattern (an established solution to a common problem), and therefore, the use of a callback function is also known as a callback pattern. Consider this common use of a callback function in jQuery. 

```
//Note that the item in the click method's parameter is a function, not a variable.
//The item is a callback function
$("#box").click(function() {
  alert("Box is clicked");
});
```

As you see in the preceding example, we pass a function as a parameter to the click method. And the click method will call (or execute) the callback function we passed to it. This example illustrates a typical use of callback functions in JavaScript, and one widely used in jQuery.

Ruminate on this other classic example of callback functions in basic JavaScript:

```
var names = ["Tooki", "Stdrg", "Langht", "Pitty"];

names.forEach(function (eachName, index){
console.log(index + 1 + ". " + eachName); // 1. Tooki, 2. Stdrg, 3. Langht, 4. Pitty
});
```
Again, note the way we pass an anonymous function (a function without a name) to the forEach method as a parameter.

So far we have passed anonymous functions as a parameter to other functions or methods. Lets now understand how callbacks work before we look at more concrete examples and start making our own callback functions.

# How it works?

We can pass functions around like variables and return them in functions and use them in other functions. When we pass a callback function as an argument to another function, we are only passing the function definition. We are not executing the function in the parameter. In other words, we aren’t passing the function with the trailing pair of executing parenthesis () like we do when we are executing a function.

And since the containing function has the callback function in its parameter as a function definition, it can execute the callback anytime.

Note that the callback function is not executed immediately. It is “called back” (hence the name) at some specified point inside the containing function’s body. So, even though the first jQuery example looked like this:

```
//The anonymous function is not being executed there in the parameter. 
//The item is a callback function
$("#box").click(function() {
  alert("box Clicked");
});
```

the anonymous function will be called later inside the function body. Even without a name, it can still be accessed later via the arguments object by the containing function.

##### Callback Functions Are Closures
When we pass a callback function as an argument to another function, the callback is executed at some point inside the containing function’s body just as if the callback were defined in the containing function. This means the callback is a closure. As we know, closures have access to the containing function’s scope, so the callback function can access the containing functions’ variables, and even the variables from the global scope.

# Popular Higher Order Functions

* .map()
  1.  Returns a new array with a change made to every item from the original array
  2. Whatever you return from the inner function is inserted into the same index as the original array

* .filter()
  1. Returns a new array that only includes some of the items from the original array 
  2. If inner function returns true (or something "truthy"), that item is included in the new array. If it returns false (or something "falsey"), it doesn't include it in the new array.

* .reduce()
  1. Returns any kind of value you want (number, string, boolean, array, etc.)
  2. Inner function used to combine the values from the original array into a single value of some kind. E.g.: adding all the values together    from an array of numbers.
* .sort()
  1. Modifies/mutates the original array by re-ordering the items therein.
  2. Inner function compares 2 items and determines how they should be reordered.
* .forEach()
  1. Returns undefined (don't expect to receive anything in return)
  2. Runs the inner function once for every item in the original array
* .find()
  1. Returns one of the items from the array
  2. If inner function returns true, the .find() finishes and returns that current value in the original array. If it returns false, it continues to search through the array until it returns true. If it never returns true (no items match the condition), it returns undefined
* .findIndex()
  1. Same as .find() but instead of returning the item in the array, it returns the index where it found the matching item
* .some()
  1. Returns either true or false
  2. If inner function returns true, the .some() immediately returns true (because at least one of the items matches your condition). If the inner function returns false for every item in the array, the .some() returns false (no items matches your condition)
* .every()
  1. Returns true or false
  2. Opposite of .some(), in that if the inner function ever returns false for any item, .every() immediately returns false (because NOT every item matched the condition). If the inner function returns true for every item in the array, the .every() returns true

# Examples
Let's begin with one of the more popular Methods. 

.map() - Runs a for loop on an array and returns a new array with the changes indicated.

```
var arr = [1,2,3,4];

arr.map(function(item){
    return item + 1;
})

// => [2,3,4,5]
```
Let's compare this to a normal for loop
```
var arr = [1,2,3,4];

for ( var i = 0; i < arr.length; i++){
   arr[i] += 1;
}

// => [2,3,4,5]
```

They do virtually the exact same thing. One important thing to take note of is that rather than writing arr[i] to access each item in the array, we use item. The word item is not a saved word. Best practice is to name item the singular version of whatever your array holds, for example:

```
var dogs = ['lab', 'poodle', 'shih-tzu'];

dogs.map(function(dog){
    return dog + 's are quite fancy';
})

// => ['labs are quite fancy', 'poodles are quite fancy', 'shit-tzus are quite fancy']
```

**.some()** - Checks if ANY items in an array meet a given condition and return True or False.
```
var numbers = [12,30,5,62,18,53]

numbers.some(function(number){
    return number > 50
})

// => true
```
**.filter()** - Runs a loop on an array and returns a new array with only the items that meet the given condition.
```
var numbers = [12,4,56,27];

numbers.filter(function(number){
    return number >= 25;
})

// => [56, 27]
```
So basically whatever you return inside the callback function is the condition that it will check for each item in the array. In the example above it went through each number in the numbers array and checked if it was greater than 25. If it was greater then it pushed it into the new array, if it was not, it did not include it in the new array.

Let's look at an example of this in the old way of writing for loops.
```
var numbers = [12,4,56,27];
var newArr = [];

for (var i = 0; i < numbers.length; i++){
    if (numbers[i] >= 25){
        newArr.push(numbers[i]);
    }
}

// newArr => [56,27]
```
Comparing the two we see how much simpler and more concise the .filter is compared to the old way. Hopefully this demonstrates how useful Higher Order Functions can be!

#### References: 
[MDN Web Docs](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)

[ES6 for everyone](https://es6.io/)