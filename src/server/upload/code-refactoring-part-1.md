# What is Code Refactoring? 
Code Refactoring is the process of restricting existing code. Refactoring increase non-functional attributes of software application. It is a process of taking existing code and improves it while it makes code more readable, understandable, and clean.

"Refactoring is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure." – Martin Fowler 

Before refactoring we need to identify “Code Smells” in code. Refactoring will be based on “Code Smells”. Refactoring also removes “Code Smells” from your project, this is done to get certain benefits and these benefits may not be consumable immediately but over the long term.  Refactoring can be different types like 
1. 	Code Refactoring
2.	Database Refactoring
3.	User Interface Refactoring

Now I will discuss about code refactoring.
# Why Code Refactoring?
* 	To improve the design of Software application
* 	Easy to extend new requirements in the application.
* 	To Make Software easy to understand.
* 	To Make program run faster.
* 	To Make Re-Usable Components.
* 	To find Bug and Easy to Fix.
* 	To Make application component are loosely couple

# Output after Refactoring
* 	Makes code more readable.
* 	Cleanup code and makes it tidier.
* 	Removes redundant, unused code and comments.
* 	Improves performance.
* 	Makes some things more generic.
* 	Keeps code DRY ( Don’t Repeat Yourself)
* 	Combines and dispose “Like” or “Similar” code.
* 	Splitting out long functions into more manageable bite.
* 	Create re-usable code.
* 	Better class and function cohesion.

Agile practices come along with refactoring and code smells for identifying refactoring needs.
In computer programming, code smell is any symptom in the source code of a program that possibly indicates a deeper problem. Code smells are usually not bugs—they are not technically incorrect and do not currently prevent the program from functioning. Instead, they indicate weaknesses in design that may be slowing down development or increasing the risk of bugs or failures in the future. 

# Common Code Smells and their refactoring

1.	Long Method
2.	Lazy Class
3.	Dead Code
4.	Refused Bequest
5.	Inappropriate naming 
6.	Comments
7.	Duplicated code
8.	Primitive obsession 
9.	Large class 
10.	God class 
11.	Middle man
12.	Data clumps
13.	Data class 
14.	Long parameter list 
15.	Switch statements 
16.	Speculative generality 
17.	Oddball solution 
18.	Feature envy 
19.	Black sheep
20.	Contrived complexity
21.	Divergent change
22.	Shotgun Surgery 

## Long Method Treatments
* 	Reduce the method body, use extract method. 
* 	Replace temp with query
* 	Introduce parameter object
* 	Preserve Whole Object
* 	Replace Method with Method Object
* 	Decompose Conditional

### Extract Method Example

### Bad Code

```
void PrintOwning(double amount){
    PrintBanner();
    / / print details
    System.Console.Out.WriteLine(“name: “+ name);
    System.Console.Out.WriteLine(“amount: “+ amount);
}

```

### After Refactoring:

```
void PrintOwning(double amount){
    PrintBanner();
    PrintDetails(amount);
}
void PrintDetails(double amount){
   System.Console.Out.WriteLine(“name: “+ name);
   System.Console.Out.WriteLine(“amount: “+ amount);
}

```

### Replace Temp with Query Example

### Bad Code
```
double basePrice  = _quanity  *  _itemPrice;
if(basePrice  >  1000) {
    return basePrice * 0.95;
 }  else {
    return basePrice * 0.98;
}
```

### After Refactoring:

```
if(getBasePrice()  >  1000) {
    return getBasePrice()  * 0.95;
}  else {
    return getBasePrice() * 0.98;
}
double getBasePrice() {
    return _quanitiy * _itemPrice;
} 

```

### Introduce Parameter Object Example

![](https://images.viblo.asia/7595f723-2a4e-4c1b-a7fa-d9e5d15a1d8e.png)

### Replace Method with Method Object Example

### Bad Code
```
//class Order....
double price() {
    double primaryBasePrice;
    double secoundaryBasePrice;
    double tertiaryBasePrice
 // long computation;
 .....
}
```

### After Refactoring
![](https://images.viblo.asia/b57dbedf-e89d-4ede-8457-31e2f53a9cca.png)

### Decompose Conditional Example
![](https://images.viblo.asia/d8705b8c-50de-4cec-8ea3-dfc9cc7f3fcd.png)

### Lazy Class Example
A class that isn't doing enough to carry its weight. We let the class die with dignity. 

### Treatment
* 	Inline Class
* 	Collapse Hierarchy 

![](https://images.viblo.asia/ebdc926b-58a0-4684-bf79-9c9a3ecf3828.png)

### Collapse Hierarchy Example

![](https://images.viblo.asia/5b845eb8-09e7-4b87-9199-f5b700409c86.png)

### Dead Code Example

* Code that is no longer used in a system or related system is Dead Code.
* Increased Complexity.
* Accidental Changes.
* More Dead Code

### Treatment
* Delete

Here i just try to focus on some refectoring. There are lots more left to discuss. Those i will try  to cover in my next post.