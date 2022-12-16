# General Purpose:
The purpose is to summarize the "hoisting-related" that has finally fallen into my mind in the last few days.

If the reader notices any mistakes, it would be greatly appreciated if you could point them out.

Now, let's move on to the main content.

# Can it be called before the declaration statement? (part 1)

First, consider an example in which console.log is placed before the declaration statement.

## case with `var` :
* JavaScript
```
console.log(num);

var num=1;
```

In this case, "**undefined**" is output to console.

"**Undefined**" here means "Empty box" that does not yet contain specific numbers

You can think of it as an image like this.

1.  A "num empty box" is created by the var declaration statement.
2. This "empty box" is filled after the declaration

Then, "`console.log (num);`" is before the declaration, so the num used there is still an "empty box".

Therefore, "**undefined**" was output to the console.
## case with `let` :
* JavaScript
```
console.log(num);

let num=1;
```
In this case, console prints an error.

Because, unlike var, let doesn't even make an empty box.

Therefore, before the declaration statement, it means that "num does not exist".

As a result, `console.log (num);` has no choice but to return an error.
## case with `const` :
* JavaScript
```
console.log(num);

const num=1;
```

Like `let`, console prints an error.

The reason is the same as the previous part.

## Conclusion up until now:
Whether it's **undefined** or an **error**, isn't it the same thing that doesn't work?

You don't have to bother to seal the `var`, right?

But the following example gives a clearer picture of why `var` is deprecated.

# Can it be called before the declaration statement? (part 2)
Next, consider the example where "`num = 500;`" is written before `console.log`.

## case with `var` :
* JavaScript
```
num=500;

console.log(num);

var num=1;
```
In this case, **500** is output to the console.

Because the `empty box of num` created by var can be used before and after the declaration statement.

Even at the position of `num = 500`;", the `empty box of num` still exists.

As a result, `num = 500;` puts 500 in the "empty box of num".

This 500 will be output as it is by "`console.log (num);`".

... what's wrong with this?

In the above example, "num = 500;" is very close to the declaration.

Therefore, it seems that there is not much problem.

But what if "num = 500;" was inadvertently left behind 10,000 lines away from the declaration?

Variables declared with var can affect the output from anywhere in the code.

With that in mind, you can realize that the use of var can be a breeding ground for bugs.

## case with `let` :
* JavaScript
```
num=500;

console.log(num);

let num=1;
```

In this case, an error is output to console.

This is because variable declarations using `let` do not create "empty boxes".

In the place before the declaration, "the box called num does not exist".

Therefore, even if "num = 500;" is written before the declaration statement,

"What is num ??"

It turns out that.

As a result, `console.log` has no choice but to return an error.

In this way, let will definitely return an error when it can be a hotbed of bugs.

We can have conclusion, `let` should be used rather than `var`.

## case with `const` :
* JavaScript
```
num=500;

console.log(num);

const num=1;
```

As with `let`, an error is printed in console.

In this scene, `const` behaves exactly like `let`.

Even in relation to `const`, `var` is still deprecated.

## Conclusion up until now:
Basically, "**Do not use var, use let / const**"

It realized out that.

This is because variables declared with `var` can be assigned from anywhere in the code.

It is safe to use `let / const` to prevent unexpected behavior of variables.

## By the way, when to use `let / const`
The difference between `let` and `const` is "whether or not reassignment is possible".

The difference is that `let` is reassignable and `const` is non-reassignable.

For example, suppose you want to perform loop processing that outputs "0", "1", and "2" continuously to the console.

In this case, use the following code.

```
for(let i=0; i<3; i=i+1){
  console.log(i);
}
```

In this for statement, there is a description of "reassignment to variable i" that "i = i + 1".

In other words, this is "code that needs to be reassigned".

To write such code, you have to use `let`.

This is because `const` cannot be reassigned.

In other words, using let in code that does not require reassignment can lead to "bug due to reassignment".

In conclusion, the following policy is recommended:

① Basically use `const`

② Use `let` only when reassignment is required