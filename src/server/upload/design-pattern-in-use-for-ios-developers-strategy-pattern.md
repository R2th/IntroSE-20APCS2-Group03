Design patterns are the best practices designed by experienced object-oriented developers to solve general problems encountered during software development.

Typically, design patterns are categorized into 3 categories:

* **Creational Patterns**: Patterns concerning object creation.
* **Structural Patterns**: Patterns concerning object composition.
* **Behavioral Patterns**: Patterns concerning objects communication.

In today's article, we will be going through **Strategy** - a behavioral design pattern which complies with the "open-closed principle" of Object-Oriented Programing.

# Concept
The key idea behinds the **Strategy** pattern is to abstract the detailed implementation of concrete classes away from the client. A Strategy provides a set of interchangeable algorithms exposed only to the client through an interface. The interface, acting as an abstraction level, may switch between algorithms during run-time without the client knowing about that. Thus, it allows the code to be more flexible and reusable.

![](https://images.viblo.asia/9e86dd4a-c686-460a-9676-a8efcb4b0995.png)

For instance, a network service provider can be seen as an interface of various strategies. We, Internet addicts, sign contracts with the provider and gain different types of access based on the amount of money we pay. The figure above depicts the network service provider example.

# Structure
The structure of the **Strategy** pattern can be derived from the above example.

![](https://images.viblo.asia/0bf70adc-55cd-4bc3-be88-dba1e09921ea.png)

As can be seen from the figure, the Context object does not perform an algorithm directly but through a Strategy interface. Concrete classes, encapsulating different algorithms, implement this interface. In other words, the Strategy pattern decouples the application code from the logic behind.

# Implementation
In Swift, the implementation of the Strategy pattern is made easy by means of protocols. In fact, the Swift programming language is protocol-oriented. It is always a good practice to define class templates using protocols and make classes conform to them. If you are not familiar with protocols, you can read more about it [here](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html).

For the mentioned example, let's first make a protocol - an abstraction for the network provider:
```swift
protocol ServiceProvider {
    func connect()
}
```
Then, for each type of service, create a class conforming to the `ServiceProvider` protocol. Each class implements its own `connect()` behavior:
```swift
class WiFiService: ServiceProvider {
    func connect() {
        print("Connect through WiFi")
    }
}

class ADSLService: ServiceProvider {
    func connect() {
        print("Connect through ADSL")
    }
}

class FiberService: ServiceProvider {
    func connect() {
        print("Connect through fiber")
    }
}

class LTEService: ServiceProvider {
    func connect() {
        print("Connect through LTE")
    }
}
```
After having the interface and all underlying strategies in place, we define our `Client` class:
```swift
class Client {
    let provider: ServiceProvider
    
    init(provider: ServiceProvider) {
        self.provider = provider
    }
    
    func accessInternet() {
        provider.connect()
    }
}
```
To see the change in behavior when alternating strategies, we assign different services to different clients and call the `accessInternet()` method:
```swift
let clientA = Client(provider: ADSLService())
let clientB = Client(provider: WiFiService())
let clientC = Client(provider: FiberService())
let clientD = Client(provider: LTEService())

clientA.accessInternet()
clientB.accessInternet()
clientC.accessInternet()
clientD.accessInternet()
```
The following output will be logged to the console:
```
Connect through ADSL
Connect through WiFi
Connect through fiber
Connect through LTE
```
All four clients have got the right service as their subscriptions!
# iOS Case Study
Apple's developers are just developers, so they apply the Strategy pattern in their products as well. As we might not notice, there are tons of protocols resembling Strategy interfaces in the Swift Standard Library; the most common one is the `CustomStringConvertible` protocol. There is an endless list of structures and classes that conform to `CustomStringConvertible`: `Bool`, `Double`, `Date`, `URLRequest`, etc.
```swift
protocol CustomStringConvertible {
    var description: String { get }
}
```
Types conforming to the `CustomStringConvertible` protocol must implement the `description` property, which is used by the `String(describing:)` initializer and the `print(_:)` function to convert any types to `String`.
```swift
struct Point: CustomStringConvertible {
    let x: Int
    let y: Int
    
    var description: String {
        return "(\(x), \(y))"
    }
}

let p = Point(x: 21, y: 30)
print(p)
// Prints "(21, 30)"
```