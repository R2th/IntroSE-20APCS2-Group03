# Introduction
A design pattern is a common solution to a software problem. In software engineering, a design pattern is a general repeatable solution to a commonly occurring problem in software design. A design pattern isn't a finished design that can be transformed directly into code. It is a description or template for how to solve a problem that can be used in many different situations. Design patterns can speed up the development process by providing tested, proven development paradigms. Effective software design requires considering issues that may not become visible until later in the implementation. Reusing design patterns helps to prevent subtle issues that can cause major problems and improves code readability for coders and architects familiar with the patterns.

Often, people only understand how to apply certain software design techniques to certain problems. These techniques are difficult to apply to a broader range of problems. Design patterns provide general solutions, documented in a format that doesn't require specifics tied to a particular problem.

In addition, patterns allow developers to communicate using well-known, well understood names for software interactions. Common design patterns can be improved over time, making them more robust than ad-hoc designs. So in short we can say 

A design pattern is a common solution to a software problem 
* 	They are helpful for speeding up problem solving, ensuring that a developer doesn’t have to re-invent the wheel for every situation 
*  They also give developers a common vocabulary with which to get across high-level ideas with minimal explanation and full understanding.

Design patterns can be classified into 3 types 

1.  Creational Design Patterns
2.  Structural Design Patterns
3.  Behavioral Design Patterns

Here we will descss about Creational Design Patterns.

# Creational patterns
### Abstract factory
The abstract factory pattern provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes. Provide an interface for creating families of related or dependent objects without specifying their concrete classes. Abstract Factory patterns work around a super-factory which creates other factories. This factory is also called as factory of factories. This type of design pattern comes under creational pattern as this pattern provides one of the best ways to create an object.

In Abstract Factory pattern an interface is responsible for creating a factory of related objects without explicitly specifying their classes. Each generated factory can give the objects as per the Factory pattern.

### Builder 
Builder pattern builds a complex object using simple objects and using a step by step approach. This type of design pattern comes under creational pattern as this pattern provides one of the best ways to create an object. A Builder class builds the final object step by step. Separate the construction of a complex object from its representation, allowing the same construction process to create various representations. 

### Dependency Injection
In software engineering, dependency injection is a technique whereby one object (or static method) supplies the dependencies of another object. A dependency is an object that can be used (a service). An injection is the passing of a dependency to a dependent object (a client) that would use it. A class accepts the objects it requires from an injector instead of creating the objects directly.
### Factory method
In class-based programming, the factory method pattern is a creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created. Creates an instance of several derived classes
### Object Pool
The object pool pattern is a software creational design pattern that uses a set of initialized objects kept ready to use – a "pool" – rather than allocating and destroying them on demand. A client of the pool will request an object from the pool and perform operations on the returned . Avoid expensive acquisition and release of resources by recycling objects that are no longer in useobject.
### Prototype
The prototype pattern is a creational design pattern in software development. It is used when the type of objects to create is determined by a prototypical instance, which is cloned to produce new objects. A fully initialized instance to be copied or cloned. 

Prototype pattern refers to creating duplicate object while keeping performance in mind. This type of design pattern comes under creational pattern as this pattern provides one of the best ways to create an object.

This pattern involves implementing a prototype interface which tells to create a clone of the current object. This pattern is used when creation of object directly is costly. For example, an object is to be created after a costly database operation. We can cache the object, returns its clone on next request and update the database as and when needed thus reducing database calls.
### Singleton
In software engineering, the singleton pattern is a software design pattern that restricts the instantiation of a class to one object. This is useful when exactly one object is needed to coordinate actions across the system. Singleton pattern is one of the simplest design patterns . This type of design pattern comes under creational pattern as this pattern provides one of the best ways to create an object.

This pattern involves a single class which is responsible to create an object while making sure that only single object gets created. This class provides a way to access its only object which can be accessed directly without need to instantiate the object of the class.

# Conclusion
The need for patterns results from using computer languages or techniques with insufficient abstraction ability. The idea of a design pattern is an attempt to standardize what are already accepted best practices. We all should use design patterns in development to build better system.