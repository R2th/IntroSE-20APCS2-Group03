**This article was formed thanks to my habit of studying. The content of the article is from many other articles on the Internet. I gives the reference to the link of those articles but it seems to be not enough since I can not remember them :(**

***Since the content of this article follows my flow of finding solutions to questions regarding the mechanism of transferring data among PCs, if you don't want to read that much, you can scroll to the conclusion part for the answer :D***
## 1. Internet (Inter-Connected Network):

To begin with, we are gonna cover the LAN concept:

LAN stands for Local Area Network which is a network comprising many computers allowed to interact with each other. Computers can connect to each other thanks to physical devices which are categorized into wireless and wired types. 

The LAN’s scope of effect is very narrow about 100m. Therefore, it’s suitable for home networks, office networks, and school networks.  

![Untitled](https://images.viblo.asia/a3affee8-a6f5-4ae6-8fde-f5ec141e5241.png)

Due to this limitation, WAN is used. 

WAN stands for Wide Area Network. WAN is a network consisting of many LAN networks via many physical devices like BTS towers, satellites,… 

When devices, computers, laptops, and sensors,… are connected together via the Internet that is mentioned above, it needs a way that helps them to communicate with each other. 

In the analogy to reality, when we want to strike up a conversation with a stranger on the street, we have to go through some social protocols that can make the situation become socially accepted. 

Therefore, for the ease of managing, organizing, and ordering,… each WAN should have its own protocol.

But the thing is that we want the whole world to become interconnected, the solution here is that if each WAN just has the same protocols as each other, then they can communicate with each other easily. 

In general, both LAN and WAN are commonly using TCP/IP protocols at the current time.

The protocol can be built on OSIS models (7 layers of data transmitting), or merely TCP/IP models.

Just like the reality when we use different protocols for different situations, Networks use disparate protocols for different purposes such as *(note that: protocols here are referred to as protocols in the application layer which are built on top of protocols of deeper layers such as TCP protocol which are in the transport layer forming up the protocol stacks that help to connect users to the Internet)*

- HTTP protocols: used for transmitting hypertext
- POP3 protocols: used for downloading email from the mail server
- FTP protocols: used for transferring files from side to side.

![Untitled](https://images.viblo.asia/64c4b950-5271-47e7-a5e5-d2c6afc7e807.png)

For extra information regarding protocols, click this website:  [Extra_Information_Protocols](https://vietnix.vn/protocol-la-gi/)

## 2. Client - Server model:

The client-server model is the most popular model currently. Besides this model, there are many other models to be used. 

This client-server model is defined:

![Untitled](https://images.viblo.asia/9f5e29e2-2b9e-40bc-827d-757dc30bc897.png)

The client is a PC that requests the command to the server and the server retrieves that request and responds the corresponding result to the client. 

client and server are both connected to the Internet. Under the hood, they connect to each other. 

But how they can communicate with each other such that they can request and respond…. → thanks to TCP/IP protocol, it can give the connection between client and server. 

The client can be a website, a frontend, a PC, or a software component that has the ability to request a server.

**We can take an example of this:**

 *We are gonna see how the webs work:*
 
The client in this case is the PC connecting to the Internet and the web browser software available on that device.

The server in this case is the computer storing source code(HTML, CSS, JavaScript), and asset files( images, audios,…) 

When we type the name of the website (this’s called “Domain”) on the browser to find, this will give a request to the DNS server for looking up the IP corresponding to that domain (IP is unique and is provided by ISP - IP of the server is static and not often changed). 

When having the IP address of the server, the browser will request the server from this IP address. Since we are performing the task to pop up the website on the browser, we are dealing with the task of getting hypertext → HTTP protocol is used. The browser will send the HTTP message defined by the HTTP protocol to the server via the connection given by the TCP/IP protocol. The server when getting the message will perform a task to get the corresponding resources and then respond back to the client. This response comprising resources will be encapsulated in the HTTP messages defined by HTTP protocol and commutes back to the client via AGAIN the connection given by TCP/IP protocol. 

![Untitled](https://images.viblo.asia/2fa97baf-8220-47d8-8ab5-4fe2d2dda148.png)

 **⇒** You can see clearly that TCP/IP protocol plays a role as a common language or the connection such that 2 PCs can communicate with each other.

Disparate application-layer protocols are used to get different types of data. In this case, to get the Hypertext (website), HTTP protocol is used. 

## 3. URL:

URL is the address indicating exactly a resource on the Internet. 

Ex:  http://mr-simple.com:80/public/home/id=12#abc

- http: is the scheme indicating the protocol that we want (here is HTTP protocol). Supposed that we want to get a file via FTP protocol, we can define ftp://…….
- hostname:  There are 2 types of hostnames which are IP and domain. Under the hood, IP is the only way to show the address of the server. Using a domain is just the way for users to easily remember the address ( this unique domain matches with the corresponding IP in the DNS server).
- port: 20-21: FTP, 143 IMAP, 80, 8080: HTTP, 3036: MySQL, 3000: NodeJS → how can 10 website simultaneously run on a sole IP address? → Change port.
- Path: path leading to the source code.
- Query string

## 4. API:

![Untitled](https://images.viblo.asia/2fa97baf-8220-47d8-8ab5-4fe2d2dda148.png)
### 1. Concept

The HTTP request from the client is hmm… an API .
When we access an URL, it’s the time we access an API.

There are 2 types of APIs: Web API and API in a form of a framework or library.

We can take Pandas - a very famous Python framework for data analytics as an example of API in a form of a framework or library. Under the hood, they have a web service for processing data and then converting those data into a frame object, I guess. 

In fact, API is an URL that can be accessed by the client to request a response from the server. 

An API can be written in Java, PHP, NodeJs,…, which is independent of the technology.

If companies do not want to leak the URL of the API, they can provide users with the encapsulated framework or library. 

API can have the Rest architecture (RESTful API) and Soap architecture. 

Example: we can take an example regarding how the web works above. The request to get the source code, asset files,… or generally hypertext is called HTTP API.

### 2.The relationship between API and HTTP protocol:

*[(For readers wanting elaborate knowledge regarding API and HTTP protocol)](https://medium.com/api-world/api-architecture-the-http-protocol-and-its-importance-aeba0fe46f91)*

![Untitled](https://images.viblo.asia/ea27ca50-9fb1-422a-b410-93a052d4bde0.png)

Each API will be built on top of a protocol depending on the purpose of use. 

HTTP is the most common protocol for APIs (other than HTTP, we can have FTP,… protocols for specific purposes but it’s kind of rare).

RESTful API architecture is the most common architecture of the API (other than REST, we have SOAP)

Since API is the request, it’s obvious that this is run thanks to the connection between 2 PCs given by TCP/IP protocol.

The set of methods of REST architecture comprises:

- Get
- Post
- Put
- Delete

In HTTP APIs, we have much more methods:  *[HERE](https://www.tutorialspoint.com/http/http_methods.htm)*

A RESTful API can be written in NodeJS, Java, Python,….

![Untitled](https://images.viblo.asia/48536bff-c563-4a28-bd42-dedf639557b3.png)

Since HTTP protocol is the standardized protocol for REST API. We can encounter many cases where REST API and HTTP API are used interchangeably.

But they do hold many differences:

![Untitled](https://images.viblo.asia/ea27fbf0-0dff-4d5d-8d93-3da8b73f1463.png)

**HTTP API:**

HTTP API is the API using the HTTP protocol to communicate two systems. The HTTP protocol is analogously a technological translation handbook that helps to translate some resources in a form of HTML or JavaScript elements, information, or images. 

The HTTP APIs is a broad concept. The architectural design concepts leveraged to construct HTTP APIs are used to further categorize them. 

**REST API** **(*Representational State Transfer Application Programming Interface*)**:

REST API, first described in 2000 by the computer scientist Dr. Roy Fielding, gives developers a lot of flexibility and independence.

REST API has become a popular approach to linking components and applications in microservices architecture because of its versatility. 

A REST API is a set of **HTTP**-based standards that control how different applications communicate with others. There are 4 basic methods, which are also referred to as CRUD operations:

- Get:  Retrieve data from the server
- Post: Submit data to the server
- Put: Update data already on the server
- Delete: Delete data from the server

**In terms of conceptual difference:** 

REST APIs add no new capability to HTTP APIs. REST APIs most typically employ HTTP as their application layer protocol. However, REST is not always linked to HTTP.  You can use other transfer protocols, such as FTP, SMTP, etc. and your API is still RESTful. 

Any API that uses HTTP as its transfer protocol is referred to as an HTTP API. This means that even SOAP (another type of API architectural design) can be regarded as an HTTP API if it uses HTTP for transport. If an HTTP API does not follow REST architectural design, it’s not necessarily a REST API.

**In terms of design:** 

Another differentiator for HTTP APIs and REST APIs is the design structure of an API. In spite of the fact that the majority of HTTP APIs are on the verge of becoming completely RESTful, to be termed a RESTful API, the API must meet the following architecture requirements:

- Client - Server
- Stateless
- Cacheable
- Uniform Interface
- Layered System

*( For the detailed information regarding the above requirements, you can read in the article that I put in the reference).* 

**In terms of use case:** 

To download or upload data and access over the backend services, most front-end applications communicate with a server via the HTTP protocol. Because compared to REST APIs, HTTP APIs are much less expensive. Therefore, using purely functional or another HTTP API is often more beneficial than RESTful API in backend development.

Some scenarios that using REST API are a good fit:

- Scalable: REST API is intrinsically separated from the client-side tech, which means your applications can run smoothly on IOS, Android, web, or future platforms. As a result, you can construct your API without worrying about the client-side tech stacks. As a result, RESTful becomes scalable and durable.
- Error Reporting and Monitoring
- Resource Attacks
- Caching

*(For other scenarios you can navigate to the article for more detailed information).*

**Benefits of using HTTP APIs and REST APIs:**

REST APIs offer a lot of flexibility, which is one of its biggest benefit. As data does not link to resources or requests, this helps REST API can return any kind of data formats and even change structurally with the right hypermedia implementation. Furthermore, REST APIs allow for excellent caching and lightweight communication via **HTTP** and lighter payloads, such as JSON

**Limitations of using HTTP APIs and REST APIs:**

Using HTTP for constructing REST API can make the application in the client side become heavy and hard to maintain.

Furthermore, unlike other APIs, like SOAP, REST API does not impose security. 

That is why REST APIs are suitable for public URLs but not for the transmission of sensitive data between client and server.

In practice, this is the reason why people normally maintain a framework or library to encapsulate the API such that URLs are not publicized out since REST API does not impose security.

**This is the link to the article:** *[HTTP APIs and REST APIs](https://hevodata.com/learn/http-api-vs-rest-api/)*

## 5. Conclusion:

***To sum up, suppose we are in the scenario in which there are 2 PCs needed to communicate with one another. One PC is used for processing information and another is to show the processed information according to the command of users.***

***Since 2 PCs are different systems, for the conversation, they need to be connected to each other ⇒  any network from the LAN to WAN to the Internet.*** 

***Under the hood, those networks can be realized via physical facilities. But again, they are different in terms of system → they need to understand each other for the information transferring ⇒ Protocol (TCP/IP).*** 

***This protocol is in the network layer of the protocol model (OSIS or TCP) used for giving the connection among PCs in the network.*** 

***When transferring the resource or here the processed information, the client will push a request to the server. The process of pushing a request and getting the data back is deemed as an API.*** 

***There are many kinds of API depending on the architectural style and the transfer protocol in the application layer of the protocol model (OSIS or TCP) in that style.*** 

***Architectural style can be REST or SOAP or anything else. Currently, the most common architectural style for building API is REST and the most common transfer protocol for REST API is HTTP protocol (other than HTTP protocol, we also have FPT, POP3,… but they are rare).*** 

***Since HTTP API and REST API are often used interchangeably, you may get confused with HTTP and REST in terms of concept which is elaborately explained above.*** 

***From this, the PC client can get the processed information from the request given to the server. This is the mechanism of the data - transferring process among PCs.***