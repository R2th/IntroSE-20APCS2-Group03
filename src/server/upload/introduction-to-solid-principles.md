![](https://images.viblo.asia/756bf756-47fa-4b97-b078-4e4b780f1a9e.png)



### Introduction

Robert C. Martin (Uncle Bob) who you may know was responsibe for creating the Clean Architecture also introduced the SOLID principles back in his 2000 paper Design Principles and Design Patterns. The actual SOLID acronym was later identified by Michael Feathers. 
The purpose of the SOLID principles is to make software designs easier to understand, maintain and extendable. It is essential as a software engineer to get familiar and embrace these principles. To make you understand each and every principle I will provide some example to demonstrate how one can be sure of compliant or violations of these principles. Examples will be in Kotlin Android for thses cases.

### 1. S (Single Responsibility Principle)

The single-responsibility principle (SRP) in programming states that every class/module should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class, module or function. All its services should be narrowly aligned with that responsibility. Robert C. Martin expresses the principle as, "A class should have only one reason to change. In short a class should do one thing and one thing only but also do it effeciently. I will demostrate a violation of this principle in the below exmaple.

**WRONG**

```
class ContactLink {
    fun createLink(db: AppDatabase, link: String) {
        try {
            db.AddLink(link)
        } catch (e: Exception) {
            db.LogError("Failed to add Link: ", e.toString())
            File("/error.txt").writeText(e.toString())
        }

    }
}
```

So what is wrong with the class above? Well as you can tell it has more than one responsibilty because not only does it create a new link, it also can log an error in the database and log an error in a local file writen by File.writeText(). This is definetley a violation of the Single responsibility priinciple. To fix this violation we can simply rewrite the class as demostrated below.

**RIGHT**

```
class ContactLink {
    val errorLog = ErrorLog()
    fun createLink(db: AppDatabase, link: String) {
        try {
            db.AddLink(link)
        } catch (e: Exception) {
            errorLog.logError(e.toString())
        }

    }
}
```

```
class ErrorLog {
    val db = AppDatabase()
    fun logError(error: String) {
        db.LogError("Failed to add Link: ", error)
        File("/error.txt").writeText(error)
    }
}
```

By abstraction and separating the 2 functions we no longer violate the SRP because each class only has one responsibility. ContactLink create a link and ErrorLog logs an error. This may have solved the violation of this specific principle but as you will see later on it still violates another principle (Dependency Inversion to be precise) but more on that later.

### 2. O (Open–Closed Principle)

The open-closed principle states that Software entities such as classes, modules, functions and so on should be open for extension, but closed for modification. In [Object Oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming) (OOP), this principle is archiveable by the implementation of Interfaces or Inheritance enabling classes to substitute for each other by the use of [Polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)).
I will demostrate a violation of this principle in the below example.

**WRONG**

```
class UserType {
    fun createUserType(db: AppDatabase, type: String) {
        if (type == "Android") {
            db.SaveAsAndroid(type)
        } else {
         db.Save(type)
        }
    }
}
```

In the example above we are trying to save UserTypes. That is users on different platforms but this implementation violates the Open/Closed principle. If in near future we later decides to add a window user or linux user we would need to modify the class with more if else to accommodate the new changes in the createUser() function. We can easily fix this problem by the help of inheritance and making our class open so we can access/override the createUser() method.

**RIGHT**

```
 open class UserType {
    open fun createUserType(db: Appdatabase, type: String) {
         db.Save(type)
    }
 }
```

```
class AddWindowsUser : UserType() {
    override fun createUserType(db: Appdatabase, type: String) {
        db.SaveAsWindows(type)
    }
}
```

### 3. L (Liskov Substitution Principle)

Definetly the hardest to understand when new to SOLID principles.  LSP states that if S is a subtype of T, then objects of type T may be replaced (or substituted) with objects of type S. In clearer definition, objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program. The most common example that demonstrates the LSP is the [Rectangle/Square](https://www.infragistics.com/community/blogs/b/dhananjay_kumar/posts/simplifying-the-liskov-substitution-principle-of-solid-in-c) illustration. It shows how sometimes things that sounds right in natural language doesn’t necessarily translate well in code. In math a square is a rectangle or in other words, it inherits the Rectangle class. So as the Liskov Substitution principle states, we should able to replace object of Rectangle by the object of Square without bringing any undesirable change or error in the system. However, in implementation if you make a square derive a rectangle class this will create behavioral issues. How? Because a rectangle unlike a square doesn’t abide by the same rule of a square (All sides are equal) or even calculating the area so if I can set my height and width normally for a rectangle and calculate the area, it won’t apply to the square which I only need to set one side (H or W) and the rest will be automatically set to same size as a square should. This sounds complex but it quite easy to understand once you wrap your head around it. Example can be found [here>>](https://www.infragistics.com/community/blogs/b/dhananjay_kumar/posts/simplifying-the-liskov-substitution-principle-of-solid-in-c)

I will provide a simpler example so you can understand better. Below we can see an exampe that violates the LSP.

```
open class Individual {
    open fun eat() {}
    open fun teach() {}
}

class Teacher : Individual() {
    override fun eat(){
        // Teacher can eat because every Individual can eat
    }

    override fun teach() {
        // Teacher can teach because.... well He/She is a teacher
    }
}

class Student : Individual() {
    override fun eat(){
        // Students also can eat
    }

    override fun teach() {
        // Student however can not be teachers. They can learn but not teach
    }
}
```

I have commented each part of the code to make it clear what we are trying to archeive. Say there exist a class Individual (Or person. You get the idea), a student/teacher is an idividual and so they share characteristics of an individual. They eat, the talk and so on. In the example above we see the Teacher Class and Student Class extends the Individual class however a Student can learn but not teach like a teacher so now we are violating the LSP. A better implementation is shown below.

**RIGHT**

```
open class Individual {
    open fun eat() {}
}

class Teacher : Individual() {
    override fun eat(){
        // Teacher can eat because every Individual can eat
    }

    private fun teach() {
        // Teacher can teach because.... well He/She is a teacher
    }
}

class Student : Individual() {
    override fun eat(){
        // Students also can eat
    }

    private fun learn () {
        // Students can learn but not teach
    }
}
```

### 4. I (Interface Segregation Principle)

Possibly the easiest to comprehend. In Robert C Martin words “Clients should not be forced to depend upon interfaces that they do not use”. That is Interface Segregation Principle in a nutshell. Meaning one should not add additional functionality to an existing interface but rather one should create a new one. Interface Segregation Principle is similar to the Single Responsibility Principle. The goal of the ISP is to reduce the side effects and frequency of required changes by splitting the software into multiple, independent parts.
Example below demostrates how one can violate this principle.

**WRONG**

Say we have an Interface "File" which has a function createFile. 

```
interface File {
    fun createFile() {}
}
```

Now later on i decide i need another function to readFile so i decide to add the readFile() to the interface as below.

```
class File {
    fun createFile() {}
    fun readFile() {}
}
```

This violates the interface segregation principle. Instead, we can simply create a new interface as shown below.

**RIGHT**

```
interface createFile {
    fun createFile() {}
}

interface readFile {
    fun readFile() {}
}
```

What have we archeived by segregating the interfaces? Now when a class needs to createFile only, it simply implements the createFile interface only and not the readFile. If however both interfaces are required then we can simply implement both interfaces.

### 5. D (Dependency Inversion Principle)

Abstraction Abstraction Abstraction! Dependency Inversion Principle (DIP) is simple to comprehend yet it is also important. High level modules that hold complex logic should support easy reusability and not affected by the changes that may occur in lower level modules. How can one archive this? Well by embracing abstraction that decouples the high from low level modules. According to Robert C. Martin, DIP consists of 2 parts that is:

1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
2. Abstractions should not depend on details. Details should depend on abstractions.

By depending of the same abstraction you end up with two dependencies that is:
* The high level module depends on the abstraction 
* The low level also depends on the same abstraction 

So in simplier terms DIP is a way to decouple the software modules. This principle can be complied by using a design pattern known as Dependency Inversion Pattern (using Dependency Injection) and Dependency Injection is simply passing the dependency of a class through another class constructor as a parameter.

A violation of this principle is demonstrated below:

```
class Share {
    val logger: CustomLogger = CustomLogger()

    fun share(shareUtil: ShareUtils, value: String) {
        try
        {
            shareUtil.share(value);
        }
        catch (ex: Exception)
        {
            logger.log(ex.toString())
        }
    }
}
```

So what is wrong with this you ask? Well to abide by the Dependency Inversion principle we must not create the instance of the CustomLogger from within this class because in the future when we decide to use some other type of Logger we will have to modify this class hereby violating this principle. A better implementation will be to use dependency injection by passing the Instance of the CustomLogger as a parameter in the Share class constructor as demostrated below:

```
class Share(loggerInjector: CustomLogger) {
    private var logger = loggerInjector


    fun share(shareUtil: ShareUtils, value: String) {
        try
        {
            shareUtil.share(value);
        }
        catch (ex: Exception)
        {
            logger.log(ex.toString())
        }
    }
}
```

With the help of injection our Share class is no longer bind to a specific type of logger.

That's it! I know there are many more details and examples out there and its good to learn and dive deeper for better understand of the SOLID principles but this article is to introduce you to the basics and try to demostrate with the easiest simplest examples so as to make thing a bit easier to graps for a beginer. If you are interested in further reading you can get the official book by Uncle Bob [here >>](https://www.amazon.com/gp/product/0134494164/ref=x_gr_w_bb_sout?ie=UTF8&tag=x_gr_w_bb_sout-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0134494164&SubscriptionId=1MGPYB6YW3HWK55XCGG2)