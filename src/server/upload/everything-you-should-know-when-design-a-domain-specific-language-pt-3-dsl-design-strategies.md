## Previously on Everything you should know when design a domain-specific language :
* **Part 1 :** (Full article is provided on this url: https://viblo.asia/p/everything-you-should-know-when-design-a-domain-specific-language-pt-1-general-purpose-vs-domain-specific-jvElaOWdKkw)
* **Part 2 :** (Full article is provided on this url: https://viblo.asia/p/everything-you-should-know-when-design-a-domain-specific-language-pt-2-general-purpose-vs-domain-specific-naQZRwG0lvx)

-----
The practice of developing software has been around for a long time. There are many models and procedures when it comes to the process of designing, implementing, testing, and deploying applications. As unintuitive as it may seem, programming language development is also a part of software development, however computer language is a special type of software. In programming language development, not only there is a graphical application for editing source code, there are also language design, lexer, parser, compiler, interpreter, as the building blocks. Furthermore, there are many types of programming languages, many environments, runtimes, and operating systems. This introduces great complexity in designing a computer language. The act of designing the implementation for a language can be as difficult and time-
consuming as designing the language itself.

> ![](https://images.viblo.asia/8681b4e2-606c-40bf-a80b-bff45503b93d.png)

When designing a language, one often need to look at other programming languages for inspiration. Looking at programming languages is looking at a rich history of hundreds of languages developed throughout the technological revolution. Besides the classification of general-purpose versus domain-specific, there are other classifications, paradigms, models that uniquely identify a language. There is the level of abstraction, which specifies how close a language is to machine and to human. 

> ![](https://images.viblo.asia/aacdacf1-2925-4940-9606-f4f74ec6f45d.jpg)

Assembly languages – belong to the second generation – for example, are as close to machine as possible without making it impossible to understand. Fourth-generation languages such as SQL, ABAP, use highly-specialized English-like keywords, making them effectively natural logic programming languages. Then there are the classifications for typing. Type system has been the core part of any sufficiently powerful programming language. In those, a type system is a set of constraints enforced upon various constructs that can be assigned with a property called type. These constructs are usually variables, expressions, functions, advanced ones like properties, lambdas. A type is an indication of how such construct can be handled, evaluated, and stored in the memory. So a variable that represents a number should be stored different than a strings of character inside memory space. The ability to distinguish between a number and a string of characters, and compare and perform arithmetic operations on them is crucial. Many techniques to implementing type system has been used, including dynamic typing versus static typing, weak typing versus strong typing. With static typing, the process of type checking, whether or not a variable is used correctly according to its type, occurs at compile-time. To achieve this, programmers need to specify the type of each variable declared, which leads to explicit variable declaration. This adds many benefits to programming. Firstly, by having the type specified, a process can perform type checking as the programmer codes, which leads to type-related bugs being detected before any execution or deployment. Secondly, having a type explicitly defined serves as a kind of documentation, allowing programmers to have more understanding of the variable and its purpose. Opposed to its benefits, many argue that having a dynamic type system is better. A dynamic type system means that the programmer doesn‟t have to specify the type of a variable before it is being used, also known as implicit variable declaration. This leads to more concise code where the programmer only cares about the logic of the code, and wants to leave the details of type system for the computer to handle. By not having type specified beforehand, all the type checking must be handled at runtime, which also results in many features like dynamic dispatch, late biding, downcasting, cross assignment being easier to implement. Needless to say, dynamic typing can cause programs to fail at runtime, due to variables not initiated, or unsuitable operations being applied. These failures can occur frequently during development and testing, and even way after deployment, which can cause devastated results. To combat this, based on the implementation of the language, errors from type checking at runtime can be corrected or ignored, although this can lead to more issues than it solves.

```java
// C is statically typed
int x;
x = 2; // this is fine because 2 is an integer
x = "a"; // compile-time error because "a" is not int but int*
// Python is dynamically typed
x = 2;
// PHP is also dynamically typed
$a = "a";
$b = $a / 2; // this operation is faulty
var_dump($b); // int(0)
```
***Examples of dynamic / static typing***

Another classification to type system is weak typing versus strong typing. Weak and strong typing refers to the ability to error recover when type checking returns errors, similar to the previous example. Weak typing often goes with dynamic typing since in dynamic typing a type isn‟t necessarily defined. Languages like C, C#, C++, Java are statically bound strongly-typed, while languages like JavaScript, Python, PHP, Ruby are dynamic languages.

A programming language can also support programming paradigms, which is a way of categorizing languages based on their features. Programming paradigms speak a lot on how a language should be used. A list of paradigms includes declarative, imperative, functional, procedural, object-oriented, aspect-oriented, etc. Some of these paradigms don‟t have well-defined definitions, as they are merely generalizing the features a programming language should have. For example, object-oriented programming, which is a popular to the point of dominant programming style, only states that code should be grouped into stateful components. Many languages based on that idea to expand the concepts, including features such as classes, interfaces, mixins, traits. There is also a programming paradigm called module-oriented programming, which groups code into modules that expose contracts and depend on others. It has the same concept as object-oriented language, only enforce stricter rules. This paradigm has spawned project Jigsaw, a new modular system for Java 9, which already supports object-oriented programming.

> ![](https://images.viblo.asia/38315767-5b2e-4455-8cdf-4113b5ceb7e6.png)

***Project Jigsaw applied in Java 9***

Often, new programming languages are designed to fix the drawbacks of some existing languages, or to combine the good features of multiple languages. When designing a language, designers often take inspiration from other languages, merge them together in a way that suits the need. For example, Golo takes inspirations from Java and other JVM-compliant languages to be a weakly-typed dynamic language that is fast and much simpler to learn and program. Ultimately, the purpose of the new language will dictate a large percentage of the design decisions, not the other way around.

```java
module hello.World

function main = |args| {
  println("Hello world")
}
```

***Golo Code Example***