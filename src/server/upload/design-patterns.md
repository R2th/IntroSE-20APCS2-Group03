## Introduction

Software design pattern can be defines as a writing document that provides some sort of solution to a software problem. It is not a complete and refined design that can be transformed directly into source code but instead it is a description or prototype for how to solve a problem that can later be reused in different scenarios. This helps to break down a huge and perhaps problematic complex problems into smaller chunks to be tackled easier and faster.


## Why Use Design Patterns?

When it comes to Design Patterns, people seems to be divided on whether it is worth it or not.This is because its believed that they are often over used and can lead to code bring harder to understand or manage. Thing is, Design Pattern were never meant to be impatiently hacked together and applied quickly in haphazard manner to your project. That being said, Design patterns can be genuinely useful when applied in the right situations. When used correctly, they can make a developer significantly more effecient allowing them to avoid reinventing the proverbal wheel, rather using methods that has already been refined by others. The also provide a common general language to conceptualize repeated problems and solutions when analysing problems with other team in project. 
Before applying design pattern, it is important for a developer to understand the how and why behind a specific chosen pattern. Now lets take a look at 2 very important design patterns each and ever developer should be familiar with (There are many more Design Patterns available but we will only cover this two).

### Singleton Patterns

The singleton pattern is a software design pattern that restricts the instantiation of a class to one "single" instance. This is useful when exactly one object is needed to coordinate actions across the system. The term comes from the mathematical concept of a singleton. There exists several examples where only a single instance of a class should exist, including caches, thread pools, registries. and so on. It is essential to initiate an object of a class we all know this but how do one ensure that only one object of this specific class gets created? Well simply by making the constructor of the class **private**. This was only the member of the class can access  the private constructor and none else.


**Diagram**

![](https://images.viblo.asia/211daacf-004d-449b-be63-fc0e9ef0eb0a.png)


```
public class SingleMessage {

   private static SingleMessage instance = new SingleMessage();

   private SingleMessage(){}

   //Get the only object available
   public static SingleMessage getInstance(){
      return instance;
   }

   public void showMessage(){
      System.out.println("Hello World!");
   }
}
```

Now to use this singleton class we can demo in our main class as below.

```
public class MySingletonDemo {
   public static void main(String[] args) {

      SingleMessage singleMessage = SingleMessage.getInstance();

      singleMessage.showMessage();
   }
}
```


### Observer Pattern

The observer pattern is a software design pattern in which an object, called the subject, is depended upon by one or more other objects called observers, the observers are notified whenever an event is triggered due to a change. If you work with Observables in Java/Kotlin you should be farmilair with this concepts Where one creates an Obervable like lets say ObservableField of bool and bind maybe a view to this value. Whenever the value is updated it fires an event and any view or object that is binded or subscribed to this is notified and updated accordingly.
A subject can have many observers and is a one to many relationship. However, an observer is free to subscribe to updates from other subjects too. You can subscribe to news feed from a Facebook page, which would be the subject and whenever the page has a new post, the subscriber would see the new post.

**UML Diagram**

![](https://images.viblo.asia/fd713e03-ed59-43b7-a85e-099ecbab7103.png)

Remember however to always unsubscribe from an Subject as it will keep the reference to the sunscribers alive and may result in memory leaks.



Example of a typical Observable Patern in Java:

```
class EventSource {
    public interface Observer {
        void updatePost(String post);
    }
  
    private final List<Observer> listObservers = new ArrayList<>();
  
    private void notifyObservers(String post) {
        observers.forEach(observer -> observer.updatePost(post)); 
        observers.forEach(Observer::updatePost);
    }
  
    public void addNewObserver(Observer observer) {
        observers.add(observer);
    }
  
    public void scanSystemIn() {
        Scanner inputScanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            notifyObservers(input);
        }
    }
}
```

Once again you can run this program in your main class:

```
public class ObserverPatternDemo {
    public static void main(String[] args) {
        System.out.println("\nEnter Text: ");
        EventSource eventSource = new EventSource();
        
        eventSource.addObserver(post -> {
            System.out.println("\nReceived response: " + post);
        });

        eventSource.scanSystemIn();
    }
}
```


**Some Observable Pattern Associated Risks**
- Can cause Memory leaks 
- Speed and Scalability issues

Other design paterns include Prototype, Factory Method, Builder, Adapter and so on.