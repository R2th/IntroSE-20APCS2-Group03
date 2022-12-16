# What is SOLID principles?
SOLID principles are the design principles allowing us to manage and control almost problems of the software design. They are a set of best practices that also helps developers to code and test much easier and more effective. Therefore, when the scale of the application grows bigger and bigger, SOLID can help you to easily maitain the app.
Let's have a look at each principle one by one. SOLID is the acronym of:
- The **S**ingle Responsibility Principle
- The **O**pen-Closed Principle
- The **L**iskov Substitution Principle
- The **I**nterface Segregation Principle
- The **D**ependency Inversion Principle

## 1. The Single Responsibility Principle
> A class should have one reason to change.


What does this mean? This means every class in your code should have only one job to do. Everything in that class should be related to a single purpose.

## 2. Open-Closed Principle
The Open-Closed Principle requires that classes should be open for extension and closed to modification.
That mean if you have a new logic, we have to easy to write as a new class, but it's very hard to modified old class.

## 3 Liskov Substitution Principle
The Liskov Substitution Principle states that subclasses should be substitutable for their base classes. That mean, if you have class B is a sub-class of class A, and some logic need class A to handle logic, we should be able to pass an object of B in this logic without any error.

## 4 Interface Segregation Principle
Segregation means keeping things separated, and the Interface Segregation Principle is about separating the interfaces. That mean all logic we have, should be separated, and the class not need to write logic that they do not handle

## 5 Dependency Inversion Principle
The Dependency Inversion principle states that our classes should depend upon interfaces or abstract classes instead of concrete classes and functions. This mean our class should not depend on what specific, it's should depend on what abstract