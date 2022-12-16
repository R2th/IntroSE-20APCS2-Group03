**ECMAScript** is a specification of JavaScript, which is maintained by Ecma International in ECMA-262 and ISO/IEC 16262. The 8th edition, officially known as ECMAScript 2017, was finalized in June 2017. The 6th edition, officially known as ECMAScript 2015, was finalized in June 2015 and most of the major changes made here. This edition of ECMAScript changed its name from ES6 to ES2015 because in 2015 Ecma International decided to switch to annual releases of ECMAScript. In short, ES6 and ES2015 are two different names for the same thing. 

**Transpiler:**  ES6 is not completely implemented by the browser engine yet. You can see the ES6 compativility list [from here](http://kangax.github.io/compat-table/es6/)  for the different browser engine like as V8 for Chrome.  As the current browsers engine haven't impleted ES6 completely yet, we can use a tool called transpiler to transpile ES6 code to ES5. So, in order to utilize ES6 features now and make sure we won't run into cross-browser compatibility issues, we need to transpile our code. Babel is one of the JavaScript compilers to use next generation JavaScript, today.

Before running ES6 code in local you have install node js and npm from [here](https://nodejs.org/en/download/) 
Alternatively you can use some of the popular online tool [JS Bin](https://jsbin.com/?js,console,output), [ES6console](https://es6console.com) etc. 

In this post I will discuss about some of the es6 features like as **let, const,  template string, arrow function, class, enhanced object literals, destructuring, default parameter, rest & spread and finally some iterators and usefull helper methods.** 

# Variable Declarations: let, const, and Block Scoping:
In the past, all variables in JavaScript were declared using the keyword var. These variables **were function scoped**, meaning their scope was within the function enclosing them, and this could sometimes be confusing to developers coming from other languages. So, if you needed** to create a new block with its own scope,** you would have to wrap your desired code **inside a regular function** or an immediately invoked function expression.

```
var price = 100; // Global Declaration
function showPrice() {
  var price = 111; // Local Declaration using var
  console.log(price); // 111
}
showPrice();
console.log(price); // 100
```
If we replace the function scope with a block scope ( ‘if’ block), it looks like this:
```
var price1 = 100;
var price2 = 101;
if(price1) {
  var price1 = 111;
  console.log(price1); // 111
  console.log(price2); // 101
}
console.log(price1); // 111
console.log(price2); // 101
```
The above code makes it clear that, 
* the changes inside the ‘if’ block are leaked to the parent scope, 
* the var declarations are bound to the function scope and 
*  var declarations don't not create block scopes.

Prior to ES6, JavaScript used functional scoping, but block scoping is more common than functional scoping across most programming languages. With ES6, we now have **two additional ways for declaring variables, let and const, both of which declare variables that are block scoped.**

Quite simply, block scoping means that a new scope is created between a pair of { }. The variables declared using the keywords let and const only exist within the innermost block that surrounds them. In the following example, what do you think will be printed to the console when you execute the following code snippet? 
```
let price = 100;
if(price) {
  let price = 111;
}
console.log(price); 
```

The value 100 is printed to the console, because the second price variable is scoped to the block within which it is declared and does not affect the price variable outside of the block, where it remains 100. 

On the other hand, **unlike let, const creates immutable variables.** The values of the variables created using const 
* need to be assigned during declaration and 
* cannot be changed later in the program.
```
const value = 100;
console.log(value);  // 100
value = 111; // TypeError
const value1; // SyntaxError: Missing initializer in const declaration
```

# Template Literals and Delimiters: 

ES6 introduces Template Literals, which provide you a way to define strings with additional functionalities like as
* String interpolation
* Embedded expressions
* Multiline strings without hacks
* String formatting

> Template Literals **use backticks (``) rather than the single or double quotes.** Template literals, in the end, always produce strings. A template literal can be written as follows:
> ```
> let viewer = `John Von Don`;
> ```


> Template literals **allow string substitutions** that provide us a way to substitute any valid JavaScript expression inside a string. Template Literals can contain placeholders for string substitution using the ${ } syntax. Consider the following example:
> ```
> console.log(`Hi ${viewer}!`);  // Hi John Von Don!
> ```
In the above example, the template literal is delimited by backticks () and the interpolated expressions inside the literal are delimited by `${ ` and  `}.` 

> We can also substitute a lot more than variable names. Template Literals allow us to use expression interpolation to embed readable inline math, for example:
> ```
> let x = 100;
> let y = 200;
> console.log(`Sum of ${x} and ${y} is ${x+y}`);
> ```
> 

> Template literals also allow you to add multiline strings easily (without the use of \n):
> 
> ```
> console.log(`I am from the first line
> I am in the second line`);
> // I am from the first line
> // I am in the second line
> ```

# Arrow function
Arrow Functions are another major syntax update in ES6. Arrow functions are functions defined using a new syntax, the “fat” arrow =>. They help in making code more readable by opting out of the function and return syntax and read the same way the function executes. The simplest function one can write in ES6 is as follows 
```
() => "Simple Function"
```
Yeah, that’s it. We have function! Take a some time to think the above function. Let’s analyse it:
*  () represents function arguments
* => starts the function body/definition
* content after => are the function body/definition.

**In ES6 we can skip the function keyword to define functions.** You can see we have used => operator to define the function body. Functions created this way in ES6 are called Arrow Functions. Let’s assign a name for the above function. 
```
let simpleFn = () => "Arrow Function"
```
Since we now have access to the function simpleFn we can use this reference to execute the function:
```
simpleFn()
//returns "Arrow Function" in the console
```
Equivalent same function can be looked like in es5 like the following: 
```
var simpleFn = function simpleFn() {
  return "Arrow Function";
};
```
Where as in our real ES6 code, we didn’t specify any return statement. **Thus in ES6, if you have a function with only a single statement then it implicitly means that it returns the value.** What about **multiple statement functions?** How we are
going to create them in ES6?
```
let simpleFn = () => {
  let value = "Arrow Function"
  return value;
} //for multiple statement wrap with { } and use return keyword 
```
**Function Arguments:** If a function has more than one argument you have to wrap the arguments inside parenthesis(). 
```
let simpleFn = (arg1, arg2) => {
  let value = "Arrow Function"
  return value;
} 
```
But if a function has only one argument, parenthesis is optional. 
```
let simpleFn = (oneArg) => oneArg
or 
let simpleFn = oneArg => oneArg
```


# Rest and Spread Operators
The **rest parameter** syntax allows us to represent an indefinite number of arguments as an array. Thing to remember: 

* Rest parameters are indicated by three dots … preceding a parameter. 
* Named parameter becomes an array which contain the rest of the parameters.
* Rest parameter must be the last argument in a function.
```
let  sum = (...theArgs) =>  {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}
console.log(sum(1, 2, 3));
// expected output: 6
console.log(sum(1, 2, 3, 4));
// expected output: 10

// Syntax error as the rest parameter is not the last argument
let  sum = (...theArgs, lastArg) =>  {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}

```

The **spread operator**, which is also denoted by **... before an array**, does essentially the reverse operation of a rest operator. **It spreads out an array and passes the values into the specified function**. Consider the following example:
```
let values = [10, 20, 30, 40];
let newSet = [100, ...values, 500]
console.log(newSet);  // [100, 10, 20, 30, 40, 500]
```
**Rest vs Spread:**
* The spread operator is very closely related to the rest parameters. In this particular format as a spread operator, ... is used like a concatenation or insertion mechanism where the values array is inserted in between existing values to assign the newly formed
array to newSet.
* In case of the rest parameters, you can combine multiple arguments into a single array, while in case of the spread operator you can specify a single array that can be split into separate arguments that can be passed into a function or method. Let us look at
another example using the Math.max() method and the spread operator:
```
let numbers = [-40, 10, 42, -10];
console.log(Math.max(...numbers, 500)); // 500
```
# Object Literal Extensions
### Object property initializer shorthand

Before es6, object literals were a collection of name-value pairs. For example:
```
function details(name, age) {
  return {
    name: name,
    age: age
  };
}
```
 The syntax looks redundant because **name and status mentioned twice** in both name and value of properties. ES6 allows you to eliminate the redundancy when a property of an object is same as the local variable name by including the name without a colon and value. For example, you can rewrite the details() function in ES6 as follows:

```
function details(name, age) {
  return {
    name,
    age
  };
}
```

### Concise method syntax
Before ES6, when defining a method for an object literal, you must specify the name and full function definition as shown in the following example.
```
var calculate = {
  discount:  10,
  price : function() {
    return 1000 - this.discount;
  }
};

console.log(calculate.price());
```
ES6 make the syntax for making a method of the object literal more clear by removing the colon ( : ) and the function keyword.

```
let calculate = {
  discount: 10,
  price() {
    return 1000 - this.discount;
  }
};

console.log(calculate.price()); // 990
```
**Another example comparing old and new object syntax**
```
// OLD
let  skier = {
  name: name,
  sound: sound,
  powderYell: function() {
  let yell = this.sound.toUpperCase()
    console.log(`${yell} ${yell} ${yell}!!!`)
},
speed: function(mph) {
  this.speed = mph
  console.log('speed:', mph)
  }
}
```

```
// NEW
const skier = {
  name,
  sound,
  powderYell() {
  let yell = this.sound.toUpperCase()
    console.log(`${yell} ${yell} ${yell}!!!`)
},
speed(mph) {
  this.speed = mph
  console.log('speed:', mph)
  }
}
```
# Destructuring
### Destructuring of Objects and Arrays

Destructuring is basically a convenient way of breaking the data structure into smaller pieces to access its data more easily and extract multiple values from Objects or Arrays. To understand destructuring better, simply think of it as a structured assignment from an object or array. Consider the following example,

```
let chars = ['a', 'b', 'c'],
x = chars[0],
y = chars[1],
z = chars[2];
console.log( x, y, z );   // a b c
```
In the above example, we assigned values to an array called chars and then the x, y, and z variables using indices on the chars variable. Let us look at another such example using objects:

```
let numbers = {a: 1, b: 2, c: 3},
a = numbers.a,
b = numbers.b,
c = numbers.c;
console.log( a, b, c );   // 1 2 3
```
In this example, we use the numbers.a value to assign the value of the variable a and similarly numbers.b & numbers.c for b and c variables. ES6 makes this pattern of structured assignment simpler through a new and dedicated syntax called destructuring. This syntax **eliminates the need for the temporary, intermediate variables, letters and numbers.** Consider the following examples:

```
var [ x, y, z ] = ['a', 'b', 'c'];
var { a: a, b: b, c: c } = {a: 1, b: 2, c: 3};
console.log( x, y, z ); // a b c
console.log( a, b, c ); // 1 2 3
```
As seen in the previous two examples, **prior to ES6, fetching information from objects and arrays and putting them into local variables needed a lot more code.** Imagine you needed to extract values from a very large object or array and store them in variables of the same name. You would have to write a lot of code assigning values to them one by one, **but using destructuring, this process gets reduced to a single assignment statement.**

Let us take a look at the object destructuring syntax a little more closely. The Object Destructuring syntax as we have seen is,
```
let { a: a, b: b, c: c } = {a: 1, b: 2, c: 3};
```
In this example, you can notice that **we used the same name for the variables being assigned and the properties of the returned object.** They do not have to be the same, though, you can use any name for the local variables being assigned. **But in case they
are the same, the syntax can be further shortened by leaving out the "a: " part of the notation.** This declaration statement can simply be written as,
```
let { a, b, c } = {a: 1, b: 2, c: 3};
console.log( a, b, c );   // 1 2 3
```
### Default Values
When using destructuring to assign a value to a variable using an object that does not have the corresponding property name, its value is set to undefined. For example:
```
let item = {
  name: "Apples",
  quantity: 5
};

let { name, quantity, value } = item;
console.log(name); // "Apples"
console.log(quantity); // 5
console.log(value); // undefined
```
In this example, an extra variable value that does not have a corresponding property inside item is declared in the destructuring statement. It gets set to undefined while name and quantity get their respective values from item. Additionally, **instead of giving the extra variables a value of undefined, you can also choose to define a default value in case of the absence of the specified property.** To do so, just use an equals sign (=) after the property name and specify a default value, like this:
```
let item = {
  name: "Apples",
  quantity: 5
};
let { name = "Oranges", quantity = 3, value = 25 } = item;
console.log(name); // "Apples"
console.log(quantity); // 5
console.log(value); // 25
```
### Destructuring Using the rest Syntax
Using the rest operators along with the destructuring pattern can be a very powerful concise syntax to variable assignments in ES6.
```
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest);
// expected output: [30,40,50]
```
### Parameters Destructuring
Apart from giving us a simpler declaration and assignment syntax, the destructuring syntax also can be used while passing function parameters. All the previously discussed variations of destructuring are available to us with parameter destructuring as well.
```
sum = ( [ num1, num2 = 0 ] )  =>  {
  console.log( num1 + num2 );
}
sum( [ 1, 2 ] );  // 3
sum( [ 1 ] );  // 1
sum( [ ] );  // NaN
```

Let's  look at another example of parameter destructuring. We can also destructure incoming function arguments. Consider this function that
would log a person’s name as a lord. 
```
let lordify = regularPerson => {
  console.log(`${regularPerson.firstname} of Canterbury`)
}
let regularPerson = {
  firstname: "Bill",
  lastname: "Wilson"
}
lordify(regularPerson) // Bill of Canterbury
```
Instead of using dot notation syntax to dig into objects, we can destructure the values that we need out of regularPerson:
```
let lordify = ({firstname}) => {
  console.log(`${firstname} of Canterbury`)
}
lordify(regularPerson) // Bill of Canterbury
```

# Classes in ES6
Although a lot of conventional JS developers did not think there was a need for Classes in its traditional sense, just the sheer number of libraries influenced TC39 to introduce “classes” in ES6. The goal was to make them look similar to real classes, which was done by introducing the class keyword and a related mechanism for declaring them.
### Class Declarations
The class syntax has two components: **class expressions and class declarations.** One way to define a class is using a class declaration. To declare a class, you use the class keyword followed by a class-name.
```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

let obj = new Rectangle(10, 20)
console.log(obj.height);  // 10
```

### Class expressions
A class expression is another way to define a class. 
*  Class expressions can be named or unnamed. 
*  The name given to a named class expression is local to the class's body. 
*  it can be retrieved through the class's (not an instance's) .name property, though

```
// unnamed
var Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"
console.log((new Rectangle(1, 2).height));  // 1

// named
var Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle2"
console.log((new Rectangle(1, 2).width));  // 2
```
> An important difference between function declarations/expressions and class declarations/expressions is that function declarations/expressions are hoisted and class declarations/expressions are not. You first need to declare your class and then access it, otherwise code like the following will throw an error.
> ```
> var p = new Rectangle(); // ReferenceError
> class Rectangle {}
> ```
> 

### Class body and method definitions
The body of a class is the part that is in curly brackets {}. This is where you define class members, such as methods or constructor. **The constructor method is a special method for creating and initializing an object created with a class.** There can only be one special method with the name "constructor" in a class. 
* A SyntaxError will be thrown if the class contains more than one occurrence of a constructor method.
* A constructor can use the super keyword to call the constructor of the super class.
* The syntax for defining methods of a class in ES6 is similar to the object literal method shorthand (i.e., functions without the function keyword)

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);
console.log(square.calcArea());  // 100
```

### Static methods
The static keyword defines a static method for a class. Static methods are called without instantiating their class and cannot be called through a class instance. Static methods are often used to create utility functions for an application.

```
class Rectangle {
  // Static method
  static className() {
    return Rectangle.name
  }
}

console.log(Rectangle.className());  // Rectangle
```

### Extending a class
The extends keyword is used in class declarations or class expressions to create a class as a child of another class.
* If there is a constructor present in subclass, it needs to first call super() before using "this". Otherwise it will through error
*  You can call a parent class method using the super keyword precedeed by a dot(.). 
```
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}

var d = new Dog('Mitzie');
d.speak(); 
// Mitzie makes a noise.
// Mitzie roars.
```
# Commonly used array helper methods in ES6
### forEach
The forEach() method **executes a provided function once for each array element.**
```
let array1 = ['a', 'b', 'c'];

array1.forEach((element) => {
  console.log(element);
});

// expected output: "a"
// expected output: "b"
// expected output: "c"
```

*  It always returns the value undefined and is not chainable.
*  forEach() does not mutate the array on which it is called (although callback, if invoked, may do so).
*  There is no way to stop or break a forEach() loop other than by throwing an exception. If you need such behavior, the forEach() method is the wrong tool.

### map
The map() method **creates a new array with the results of calling a provided function on every element** in the calling array.
```
var array1 = [1, 4, 9, 16];
// pass a function to map
const map1 = array1.map(x => x * 2);
console.log(map1);
// expected output: Array [2, 8, 18, 32]
```
* If you use multi-line statement for the callback, you have to return the result from the expression, else it will return undefined for all of the item whom it is executed. 
```
// not returning 
const map1 = array1.map(x => {
  x*2
});

console.log(map1);
// expected output: Array [undefined, undefined, undefined, undefined]
```

### filter 
The filter() method creates a new array with all elements that **pass the test implemented by the provided function**.
```
var numbers = [20, 30, 5, 2, 1, 15, 10];
const result = numbers.filter(number => number > 5);
console.log(result);
// expected output: Array [20, 30, 15, 10]
```
* If you use multi-line statement for the callback, you have to return the result from the expression, else it will return an empty array. So don't forget to use return. 

```
var numbers = [20, 30, 5, 2, 1, 15, 10];
const result = numbers.filter(number => {
  number > 5
});

console.log(result);
// expected output: Array []
```

### find 
The find() method **returns the value of the first element in the array that satisfies the provided testing function.** Otherwise undefined is returned.

```
var numbers = [5, 12, 8, 130, 44];
var result = numbers.find((item) => {
  return item > 10;
});

console.log(result);
// expected output: 12
```
* Don't forget to use return, else it will return undefined

### every 
The every() method tests whether all elements in the array pass the test implemented by the provided function.
```
let numbers = [30, 39, 29, 10, 13];
console.log(numbers.every(number => {
  return number > -1
}));
// expected output: true
```
* If you don't return, it will return false. 

### some 
The some() method tests whether at least one element in the array passes the test implemented by the provided function.

```
let numbers = [1, 2, 3, 4, 5];
console.log(numbers.some((number) => {
  return number % 2 == 0;
}));
// expected output: true
```
* If you don't return, it will return false. 

### reduce 
The reduce() method applies a function against an accumulator and each element in the array (from left to right) **to reduce it to a single value.**

```
const numbers = [15, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}));
// expected output: 10
// 15 + 1 + 2 + 3 + 4
console.log(numbers.reduce(reducer, 5));
// expected output: 29
```

In the next part I will discuss some of advanced topics in es6. Stay tuned and happy coding with es6.

# Reference 
[ES6 for Humans](https://www.amazon.com/ES6-Humans-Latest-Standard-JavaScript-ebook/dp/B07436G7JQ)