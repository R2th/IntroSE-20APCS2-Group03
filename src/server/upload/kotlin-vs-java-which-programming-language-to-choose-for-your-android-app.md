The question is which is better Kotlin or Java. With the appearance of Kotlin this struggle started in 2011, when at the same time, Java was completely beating any new competitors off. With the help of Google and JetBrains, Kotlin was developed to eliminate any of Java’s faults. Beginning with the Google I/O 2017 Developer Conference, Kotlin started to move into a high level.

Is it possible for Kotlin to replace Java completely? Is it difficult to find good Kotlin developers? Here you will find out about this and about the benefits and drawbacks of each language.

**Kotlin vs. Java: Intro to Official Android Programming Languages**
 
Android and Java have always been connected. Android SDK is even written in Java. The situation has started to change after the invention of Kotlin. Below you will read about the differences between Kotlin vs. Java in order to understand if adopting Kotlin is worthwhile.

**Java Android Development**

![Java](https://images.viblo.asia/924198ab-bd4b-4206-9117-9d8301e8c54f.png)

Java is an object-oriented, class-based programming language. It was released in May 1995 and today there is hardly a developer who hasn't heard of it. 

As an object-oriented programing language, basic Java syntax is similar to the C and C++ languages. The whole code belongs to classes in which all values are objects. This allows for the creation of modular programs and reusable code.

Apart from using Java for Android applications, developers are also able to create desktop apps and app back ends.

If we look at Java and Kotlin, we will see that both languages have positive characteristics worth considering when choosing between them. The advantages of Java are:

* Easy to learn
* Strong community
* Platform-independent

Just like any other programming language, Java has its disadvantages like:

* Verbosity
* Performance
* Nullability Problems

It may seem that making Android apps with Java is a dead-end job if we take into account all of this. If you want to know more about it, below you will find it out.

Recommendation: Why Use Java in 2019?

After everything mentioned above Kotlin looks like the perfect language to develop with. Why is Java still used today? Read on to find out:

* There are Java gurus in a team who don't want to switch to Kotlin.
* A team tried Kotlin and was unsatisfied with it.
* If a successful project was developed in Java (although, it is not a problem to develop new features in Kotlin, in this case). Don't forget that Java code needs to be supported by Java if you don’t want the transition of the whole project to Kotlin.

**Kotlin: New Android Language**

![Kotlin Android ](https://images.viblo.asia/710235e5-cc11-4dd8-9adb-913884733baa.png)

Kotlin is a brand new Android programming language that was first introduced by JetBrains in 2011. Kotlin is both an object-oriented (OOP) and a functional language. It has a great support for higher-order functions, function types, and lambdas, so it can easily be used in both object-oriented and functional programming styles.

In 2018, a lot of huge companies switched to Kotlin as it is 100% interoperable with Java. Among such companies are Google, Uber, Trello, Pinterest, Kickstarter, and many more.

Kotlin offers new capabilities for Android development. It compiles with JVM bytecode and can easily be used without dropping off or having to rewrite the whole project.

In spite of the fact that Kotlin is a new language, it has already shown a lot of benefits in comparison with Java. Below you will read the advantages of Kotlin:

* Conciseness
* Interoperability
* Functional programming support
* Fail-fast system
* Supportive community

Every language has its advantages and disadvantages just like Kotlin, which also has some weak points.

* Slow compilation
* Lack of resources

**New Kotlin Features in Android Development**

Kotlin has new features that make Android programming even easier and more sufficient.

* Null-safety through nullable and non-nullable types, safe calls and safe casts

Kotlin has a special way to prevent null checking with special non-nullable types.

if (someOjbect != null) ...

These types don't allow setting null in a variable. If you try, your project won't be compiled. This feature guarantees that you won't get NullPointerException when you use a non-nullable variable.

Another case is nullable types, which let you set null. However, to prevent NPE, Kotlin has special operator ?. For example. someObject?.someMethod(). This code will be executed only if someObject is not null.

* Extension functions

It lets one add own methods to existing classes. It is very useful when you need to have extended functionality of existing classes. For instance, by default, ImageView class in Android doesn't have methods to load images from the Internet, but it can simply be extended to provide this functionality. If we create an extension function loadImage(url: String), you can just call loadImage(url) on any ImageView instance and it will work.

* Higher-order functions

With the help of this feature developers create methods that can receive other methods as arguments or return methods. For example, if we have a list of items and when a user clicks on the item, we need to redirect him to a new screen with detailed info about this item. Below you will learn the analysis of the Kotlin vs. Java way of implementing this feature.

In Java, we need to create an interface with a method, implement this interface on some object that will listen to user's tap events, and call an interface's method every time the user taps on an item.

In Kotlin, we only write a function that has all the logic that must be invoked when the user taps. So, we directly call an existing function, instead of invoking interface's method (that calls a method with logic).

* Data classes

There are many use cases where we just need to keep data in classes (in MVP architecture it is M - Model). The comparison of Kotlin vs. Java will show you that Kotlin has a simple way to create these classes. Kotlin automatically generates useful functions for read/write values, for copying data, etc. when we create a data class.

* Immutability

This feature lets objects be immutable. It means that as soon as created, an object can’t be changed in the future. If you want to change an object, you ought to create a mutable copy of the immutable object, change it, and continue working with it. Immutable objects are thread safe; because they can’t be changed, there is no need to sync them and there are no concurrency problems.

* Type aliases (added on Kotlin 1.1)

With this feature you can have shorter names of existing types. For instance, instead of using MutableMap<K, MutableList<File>> in Java, here are Kotlin code examples you can use.

typealias FileTable<K> = MutableMap<K, MutableList<File>>

and use FileTable<SomeType> as a new type, that in fact will be expanded in MutableMap<SomeType,MutableList<File>>

The comparison of Kotlin vs. Java proved that Kotlin is more secure, more flexible, it provides more possibilities that help to reduce the number of lines written and, thus, fewer bugs and errors occur.
    
 Here https://mlsdev.com/blog/kotlin-vs-java you will find out more about the differences between Kotlin and Java, and learn which language is better for Android development.