# Beginner With ES6
This articles, I want to show you guy about that basic of ES6, that you can understand and a few example on this it. As we know ES6 have been release at 2015. But on that time it just a few browser is supported it, But right now 2018, So many browser are supported, it also the most useful javascript code that the famous developer like [React](https://reactjs.org/),  [Angular](https://angular.io/) (however with angular they also typescript).
![](https://images.viblo.asia/9d75298e-cafd-419f-979c-1e55a90d79e3.jpeg)
## What’s is ES6 ?
ECMAScript 6 (ES6, often referred to as “Harmony”) is the upcoming sixth major release of the ECMAScript language specification. ECMAScript is the “proper” name for the language commonly referred to as JavaScript. I won’t go into the history of these names, but if you’re interested there’s plenty of information around the web.
The draft ES6 specification is updated regularly and is a great way to really get to grips with the details of the language. If you’re interested in the direction the spec is taking, the es-discuss mailing list and its associated summary Twitter feed are the places to go, along with the [ES Wiki](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015).

##  ES6 Features
This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation. If you’re a busy JavaScript software engineer (and who is not?), then proceed reading to learn the best 10 features of the new generation of the most popular programming language—JavaScript.

Here’s the list of the top 10 best ES6 features for a busy software engineer (in no particular order):

1. Parameters
2. Template Literals
3. Multi-line Strings
4. Destructuring Assignment
5. Enhanced Object Literals
6. Arrow Functions
7. Promises
8. Block-Scoped Constructs Let and Const
9. Classes
10. Modules
By the way I will show you guy some of top 10 best ES6 feature as below
- Parameters

Remember we had to do these statements to define default parameters.
They were okay until the value was 0 and because 0 is falsy in JavaScript it would default to the hard-coded value instead of becoming the value itself. Of course, who needs 0 as a value (#sarcasmfont), so we just ignored this flaw and used the logic OR anyway… No more! In ES6, we can put the default values right in the signature of the functions:

```
var link = function (height, color, url) {
    var height = height || 50
    var color = color || 'red'
    var url = url || 'http://azat.co'
    ...
}
```

- Arrows

Arrows are a function shorthand using the ```=> ``` syntax. They are syntactically similar to the related feature in C#, Java 8 and CoffeeScript. They support both statement block bodies as well as expression bodies which return the value of the expression. Unlike functions, arrows share the same lexical this as their surrounding code.
```
// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
var pairs = evens.map(v => ({even: v, odd: v + 1}));

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}
```
- Classes

ES6 classes are a simple sugar over the prototype-based OO pattern. Having a single convenient declarative form makes class patterns easier to use, and encourages interoperability. Classes support prototype-based inheritance, super calls, instance and static methods and constructors.
```
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  get boneCount() {
    return this.bones.length;
  }
  set matrixType(matrixType) {
    this.idMatrix = SkinnedMesh[matrixType]();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```
- Let + Const

Block-scoped binding constructs.``` let``` is the new`` var. const ```is single-assignment. Static restrictions prevent use before assignment.
```
function f() {
  {
    let x;
    {
      // okay, block scoped name
      const x = "sneaky";
      // error, const
      x = "foo";
    }
    // error, already declared in block
    let x = "inner";
  }
}

```
- Modules

Language-level support for modules for component definition. Codifies patterns from popular JavaScript module loaders (AMD, CommonJS). Runtime behaviour defined by a host-defined default loader. Implicitly async model – no code executes until requested modules are available and processed.
```
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
```
```
// app.js
// app.js
import * as math from "lib/math";
alert("2π = " + math.sum(math.pi, math.pi));
```
Some additional features include export default and export *:
```
// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.log(x);
}
```
- Functions

Callee-evaluated default parameter values. Turn an array into consecutive arguments in a function call. Bind trailing parameters to an array. Rest replaces the need for arguments and addresses common cases more directly.

```
function f(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) == 15
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, "hello", true) == 6
function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
f(...[1,2,3]) == 6
```
### Document
- [ES6 Wiki](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015)
- [Class in ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Arrows in ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Functions in ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [Modules in ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)