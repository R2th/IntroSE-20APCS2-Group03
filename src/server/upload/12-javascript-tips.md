###  JavaScript Higher-Order Functions
Higher-order function is the basic principal of JavaScript. Every time you pass an anonymous function or a callback, you re actually taking the value that the passed function returns, and using that as an argument for another function.

The ability of functions to return other functions extends the convenience of JavaScript, allowing us to create custom named functions to perform specialized tasks with shared template code. Each of these little functions can inherit any improvements made in the original code down the road, which helps us avoid code duplication, and keeps our source clean and readable.

1 .Function as objects
>This means that the language supports constructing new functions during the execution of a program, storing them in data structures, passing them as arguments to other functions, and returning them as the values of other functions.

2 .Functions as Arguments
```
document.getElementById("popup").addEventListener("click", function() {
  alert("you triggered ");
});
```
or 

```
const popup= function() {
  alert("you triggered ");
};
document.getElementById("popup").addEventListener("click", popup);
```

3. Functions as Results

```
var showWelcomeMgs = function(text) {
  return text.replace(/template_mgs/ig, "Welcome");
};
console.log(showWelcomeMgs ("Scubism template_mgs."));
// result: Scubism Welcome

var showWinnerMgs = function(text) {
  return text.replace(/template_mgs/ig, "is winner");
};
console.log(showWelcomeMgs ("Scubism template_mgs."));
// result: Scubism is winner

var showMsg = function(original, replacement, source) {
  return function(source) {
    return source.replace(original, replacement);
  };
};

var welcome = showMsg(/template_mgs/ig, "Welcome");
var winner = showMsg(/baby template_mgs/ig, "is winner");
```
```
console.log(welcome ("Scubism template_mgs."));
console.log(hippify("Scubism template_mgs."));
```
# Javascript const

```
// NOTE: Constants can be declared with uppercase or lowercase, but a common
// convention is to use all-uppercase letters.

// define MY_FAV as a constant and give it the value 7
const MY_FAV = 7;

// this will throw an error
MY_FAV = 20;

// will print 7
console.log('my favorite number is: ' + MY_FAV);

// trying to redeclare a constant throws an error
const MY_FAV = 20;

// the name MY_FAV is reserved for constant above, so this will also fail
var MY_FAV = 20;

// this throws an error also
let MY_FAV = 20;

// it's important to note the nature of block scoping
if (MY_FAV === 7) { 
    // this is fine and creates a block scoped MY_FAV variable 
    // (works equally well with let to declare a block scoped non const variable)
    let MY_FAV = 20;

    // MY_FAV is now 20
    console.log('my favorite number is ' + MY_FAV);

    // this gets hoisted into the global context and throws an error
    var MY_FAV = 20;
}

// MY_FAV is still 7
console.log('my favorite number is ' + MY_FAV);

// throws an error, missing initializer in const declaration
const FOO; 

// const also works on objects
const MY_OBJECT = {'key': 'value'};

// Attempting to overwrite the object throws an error
MY_OBJECT = {'OTHER_KEY': 'value'};

// However, object keys are not protected,
// so the following statement is executed without problem
MY_OBJECT.key = 'otherValue'; // Use Object.freeze() to make object immutable

// The same applies to arrays
const MY_ARRAY = [];
// It's possible to push items into the array
MY_ARRAY.push('A'); // ["A"]
// However, assigning a new array to the variable throws an error
MY_ARRAY = ['B']
```

###  1. Convert data type to boolean using !! operator
```
function Account(cash) {  
    this.cash = cash;
    this.hasMoney = !!cash;
}
var account = new Account(100.50);  
console.log(account.cash); // 100.50  
console.log(account.hasMoney); // true
var emptyAccount = new Account(0);  
console.log(emptyAccount.cash); // 0  
console.log(emptyAccount.hasMoney); // false
```
### 2. Short-circuits conditionals
```
if (connected) {  
    login();
}
```
This can be shorten using  ''&&''(AND operator) like below 
```
connected && login();  
```
### 3. Using $('#selector').one()
The .one() method is equivalent to .on(), except that the event handler trigger only one time
```
$( "#selector" ).on("click focus", function(event) {
  alert(event.type);
  $(this).off(event);
});
```
After the code is excuted, a click or focus on #selector element waill display alert, subsequent click or update will do nothing, this  is equipvalent to below code
```
$( "#selector" ).one("click focus", function(event) {
  alert(event.type);
});
```
### 4. Detecting properties in an object
This trick is very useful when you need to check if some attribute exists and it avoids running undefined functions or attributes. If you are planning to write cross-browser code, probably you will use this technique too. For example, let s imagine that you need to write code that is compatible with the old Internet Explorer 6 and you want to use the  ''document.querySelector()'' , to get some elements by their ids. However, in this browser this function doesn t exist, so to check the existence of this function you can use the in operator, see this example
```
if ('querySelector' in document) {  
    document.querySelector("#id");
} else {
    document.getElementById("id");
}
```
In this case, if there is no querySelector function in the document object, we can use the ''document.getElementById() '' as fallback.
### 5. Getting the last item in the array
The'' Array.prototype.slice(begin, end) ''has the power to cut arrays when you set the begin and end arguments. But if you don t set the end argument, this function will automatically set the max value for the array. I think that few people know that this function can accept negative values, and if you set a negative number as begin argument you will get the last elements from the array
```
var array = [1, 2, 3, 4, 5, 6];  
console.log(array.slice(-1)); // [6]  
console.log(array.slice(-2)); // [5,6]  
console.log(array.slice(-3)); // [4,5,6]  
```
### 6. Replace All 
The String.replace() function allows using String and Regex to replace strings, natively this function only replaces the first occurrence. But you can simulate a replaceAll() function by using the /g at the end of a Regex:
```
var string = "abc abc abc";  
console.log(string.replace(/AB/, "ab")); // "ABc abc abc"  
console.log(string.replace(/AB/g, "AB")); // "ABc ABc ABc"  
```
### 7. Merging arrays
If you need to merge two arrays you can use the'' Array.concat() ''function:
```
var array1 = ['S', 'C', 'U'];  
var array2 = ['B', 'I', 'S', 'M'];  
console.log(array1.concat(array2)); //["S", "C", "U", "B", "I", "S", "M"];
```
### 8.  Converting NodeList to Arrays
If you run the '' document.querySelectorAll("p")'' function, it will probably return an array of DOM elements, the NodeList object. But this object doesn t have all array s functions, like:  ''sort(), reduce(), map(), filter()'' . In order to enable these and many other native array s functions you need to convert NodeList into Arrays. To run this technique just use this function:  ''[].slice.call(elements)'' :
```
var elements = document.querySelectorAll("p"); // NodeList  
var arrayElements = [].slice.call(elements); // Now the NodeList is an array  
var arrayElements = Array.from(elements); // This is another way of converting NodeList to Array  
```

###  Reference link
- https://mytutorials.xyz/post/view/12-Javascript-tips/1/47/47
- https://blog.jscrambler.com/12-extremely-useful-hacks-for-javascript/  
- https://api.jquery.com/  
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let  
- https://developers.google.com/web/fundamentals/getting-started/primers/promises  
- http://blog.itviec.com/tai-lieu-javascript/