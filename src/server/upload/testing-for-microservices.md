Nowadays product companies around the world depend on cloud technologies to sell products quickly and efficiently. With fewer people sitting in front of a computer to buy online these days, push notifications are used to urge users to sign into a mobile app and check out the newly launched products. This push strategy has worked magically. These days people buy products on the fly, which in turn has led to a huge increase in application server loads. Companies like Amazon, Netflix and eBay are responding by abandoning traditional software architectures and moving to microservices. Testing Microservices are becoming more and more important as many of the new applications are being built using Microservices architecture.
Before we are able to see how to test microservices, we first need to understand what they are.

## What Are Microservices?
Microservice is an architectural style, an approach to the creation of a single application as a service suite. Each service is defined by its characteristics, some of which are:
* Running in its process.
* Communicating with a lightweight mechanism often with an HTTP resource API.
* Independently deployable by a fully automated machinery.
* Using different programming languages/technologies/DB.
* Is using different data storage technologies.

**Microservices characteristics:**
1. Organized around business capability,
1.  Automated deployment,
1.  Intelligence in the endpoints rather than in service bus,
1.  Decentralized control of languages and data.

## Microservices Vs Service-oriented Architecture (SOA)

**Service-oriented Architecture (SOA):**  
An architectural pattern in computer software design in which application components deliver services through a communication protocol to other components, typically over a network.

**Microservices:**  
A software architecture style in which complex applications are made up of small, independent processes that communicate with each other using language-agnostic APIs.

***Example:***
*Let's talk about ride hailing app* “***Grab***”.  
*If Grab were built with an **SOA**, their services might be:*

-----


> GetPaymentsAndDriverInformationAndMappingDataAPI

> AuthenticateUsersAndDriversAPI

*If Grab were built with **Microservices**, their APIs might be more like:*

> SubmitPaymentsService 

> GetDriverInfoService

> GetMappingDataService

> AuthenticateUserService

> AuthenticateDriverService

More APIs, smaller sets of responsibilities.

-----

## Test Microservices

### What to Test in Microservices?
Since each microservice contains a small module or feature, it’s mighty important that they be tested independently. It’s also important that you consider various factors while testing a microservice.
* Does It Function Properly?
* Is It Scalable?
* Does Asynchronous Communication Work Properly? 

### How to test Microservices
#### Unit Tests: 

Unit tests exercise the small pieces of software such as a function in the application to determine whether they produce the desired output given a set of known inputs. 

#### Component Test: 
Once we have performed unit testing of all functions within a microservice, then we need to test the microservice in isolation. Typically, the application would be made up of a number of microservices, so in order to be tested in isolation, we need to mock the other microservices.  
Component tests will also test the interaction of the microservice with its dependencies, such as the database, as a single unit.

#### Integration Test:
After checking the functionality of each microservice, we need to test the inter-service communication. Integration test checks communication paths and interactions between components to detect interface defects. Service calls must be made with the integration of external services, including error and success cases.  
Hence, integration testing validates that the system is working together seamlessly and that the dependencies between the services are present as expected.

#### Contract Tests:
Contract tests verify the interactions at the external service's boundary, claiming that it meets the contract expected by the consumer service. This type of testing should treat each service as a black box, and all services must be called independently and their responses verified.

#### End-To-End Tests:
End-to-end tests play a role in ensuring that everything ties together and there are no high-level differences between microservices. End-to-end tests verify that a system meets external requirements and achieves its goals from end to end, testing the whole system.  
The tests also verify that the entire process and user flows work correctly, including all service and DB integration. Thorough testing of operations that affect multiple services ensures that the system works together as a whole and satisfies all requirements.

***Testing Microservices Example:***
Let’s take a microservice ***A*** that depends on two other services ***B*** & ***C***. You need to establish an isolated environment where the state of ***A***, ***B*** and ***C*** is well defined and can be repeatedly set-up. For example, state/storage of ***B*** and ***C*** should be pre-initialised. After that, you just run a set of tests testing APIs of microservice ***A*** using usual REST/WebService set of test tools, *e.g.* *SOAPUI* or *Chakram* or simple *xUnit* alternative for your programming language.

```
References:  
https://www.simform.com/microservice-testing-strategies/
https://www.blazemeter.com/shiftleft/open-source-testing-microservices/
```