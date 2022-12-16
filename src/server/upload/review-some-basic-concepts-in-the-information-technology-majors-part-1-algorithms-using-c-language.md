# Introduction
All concepts and definitions in the article are drawn from personal understanding, if there are any mistakes, please comment and feedback on the article so that the writer can correct it.

This is the author's first post. At a young age in the industry, the author will begin to overview all the knowledge needed in this major, in the author's opinion.
# A. Algorithm

## I. What is Algorithm?

### 1. Definition of algorithms

Algorithm is a kind of crucial vehicle what you use to understand and perform solutions or it is solutions. More specifically, an algorithm is a set of instructions or methods to complete some problems from an initial state, when these methods or methods are used optimally, then the result is as expected.  Thank for having algorithm, you can finish work earlier and more accurate. 

### 2. Characteristics of algorithm

There are some characteristics of the algorithm: 
* *Be limited*: The algorithm has to be limited and finished after some steps because it is created to help people achieve something earlier. 
* *Input:* Have zero or some problems to come up with solutions.
* *Output:* At least one. The number of outputs corresponds to the number of inputs.
* *Exact:* The algorithm has to exact step by step because you can’t find the best solution if you are wrong in any particle.
* *Effective:* Any problem has a solution or an algorithm to handle.

![image.png](https://images.viblo.asia/74245223-68fd-409a-bc32-32ff4a6be376.png)

### 3. What is a good algorithm?

Normally, to measure an algorithm, people always rely on two criteria:  
* Speed
* Memory

But everyone prefers the criteria “Speed”. 
A problem can have more than one solution, but only one is the fastest. 

For example, in a case, your problem is to print out the sequence "*1,2,3,…n*".
Solutions:
* You can enter numbers on your keyboard, and then they can be printed on the screen. It’s a manual method because you must enter each number from 1 to n. If n = too large, u must enter the number many times
* Another solution, you can use an for loop algorithm. You can spend time. The time you can save depends on the value of the n.

In another sides, "memory" is equally important, also with the problem of printing 1,2,3, ..., n to the screen. If you manually type in numbers, then you can solve the problem, but that is a way to do a lot of lines of code. Instead, you can use the iteration function of the algorithm to solve this problem. With just a few lines of code, you can replace many lines of code and haven't to type hands many times.
 Here is an example of combining both the "memory" and "speed" criteria to solve the problem of printing numbers from 1 to n.
```
             int k, n;
             Console.Write("Enter number n: ");
             n = Int32.Parse(Console.ReadLine());
             for (k = 1; k <= n; k++) Console.WriteLine("{0}", k);
```
### 4. How to build an basic application?
![image.png](https://images.viblo.asia/03fea59f-faf2-457e-a590-6cb239d9220e.png)

There are 7 basic steps to build an application in C#:

* Create a class: The word “Class” in C# doesn’t have any specific concept. When you create a new project in C#, you always start with an available “Class”, and all commands, algorithms, ...etc. are this “Class”.  In the above picture, I created 3 new classes Circle, Eclipse, Shape”
* Declare attributes: Attribute is a type of declaration that prepares the input function in that Class
* Declare methods: The methods are declared in a Class. A Method is a data type that contains many statements in it, and those statements only fulfill the requirements of the method containing it
* Declare constructor: A constructor is created at the same time as you create a class or struct. Constructor has the same name as class or struct. And they create the new user data of the new object  
* Declare destructor: You can use object actions, such as you can command the object what to do.
* Create objects
* Use objects to call their methods to have the expect output

## II. The steps must have when writing a program

To write code to execute in general and in C #, you can follow these steps:
### 1. Analysing Program 
* Identify target item of program. 
* Determine required output.
* Identify required input.
* Define processing requirements

### 2. Program design
Up plan with using Flowchart in Astah Professional application: Starting up plan by normal language, setting flowchart table to create the relationship between the tables, displaying the steps, problems to be completed step by step. 
### 3. Coding
Implement The program based on the design and needed requirements
### 4. Tesing program
Not only do you write the code but just check each segment, but when you finish the program, you still have to check the program in general, not only that, during the program publishing, you still have to check the chapter program a regular way to find and fix bugs in time.
# B. Programming paradigm
## I. What is Object-oriented model?
Object-oriented model is a kind of programming based on the concept of "object technology" of computer technology. Objects often contain attributes and are organized into algorithms. Languages in object-oriented programming are also very diverse, most of them are programmed in different classes. Object-oriented programming is considered the easiest programming paradigm for newcomers to the programming industry. Because in object-oriented programming, objects are divided and programmed in different classes, new people will easily get the concept and data of each object. Therefore, they can easily find errors in each "class" and fix them.
![image.png](https://images.viblo.asia/2ddd429d-e83d-41c8-b1eb-0bc21d997f7c.png)![image.png](https://images.viblo.asia/84cba13d-9d4c-40b2-b08b-339be8016950.png)

In those images, Class Staff has inherited the "Name", "Age", "Tel" of Class Person, and  Class Staff only adds its own "department".
## II. What is procedural model?
Procedural model is a kind of programming, with this program you can not inherit the available properties or algorithms of the "parent class" and "children class", but you can pass parameters of this algorithm to other algorithms because procedural programming can be "re-used" and it is also very safe, in addition, it is a kind of programming that minimizes the amount of information exchanged. Instead of having to create the same statement with the same value at different points of view, thanks to procedural programming, you only have to create a common command in a class and the rest of the classes just create the command and get equivalent value. 
![image.png](https://images.viblo.asia/dcb7fc76-5e05-4b78-9047-a6c3ca26c6a1.png)

## III. What is event-driven models?
An event-driven model is programming in which a programmer can create one or more different algorithms for each event, and they only implement those algorithms to serve the event in which they were created. Event-driven programming can save memory, instead of using loops or other algorithms with a lot of potentials to run a program, thanks to object-oriented programming, we create for each A small part of the event, or even a single action event for that event saves a lot of memory.

![image.png](https://images.viblo.asia/58a249ad-6462-41b8-895f-12d822980831.png)
![image.png](https://images.viblo.asia/cd30904b-c183-4fab-bfc1-368715ba7677.png)

The two above popups indicate event-driven programming. In particular, here is the "click inside in the box" event, assigned to the event as "1 click change color in the box" and the result is the same as above.
# C. Integrated Development Environment
Integrated Development Environment (IDE in general), the developer can be able to use, reusable, create new programs, create code to server for programming. Developers can be easily using IDE for the testing programs. Simulating program. Summary, with full enough compiler, debug, ...etc., IDE, in general, is very needed, useful, and accordant for the developer.

References:
[Algorithms ](https://www.amazon.com/Algorithms-4th-Robert-Sedgewick/dp/032157351X) 
[Event-driven programming](https://www.amazon.com/Event-Based-Programming-Taking-Events-Limit/dp/1590596439)