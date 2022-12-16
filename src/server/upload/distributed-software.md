This report will discuss the characteristics and principles of the distributed software applications. It also given the reviews and assessments based on the distributed software applications the distributed platforms.
### The principles and characteristics of distributed software.
#### Definition of distributed software applications.
Distributed applications are software or applications that is executed on multiple computers within a network at the same time. Distributed applications run on multiple systems simultaneously while traditional applications that run on a single system to do the same tasks. Distributed applications allow multiple computers to access the apps at once from any geographical location. (Distributed applications ). 
#### Compare distributed systems vs. local systems.
According to Tanenbaum, Van Steen – “A distributed system is a collection of independent computers that appears to its users as a single coherent system”.
The local system is the system is designed to connect computers and other data processing devices operate with each other in a small geographic area, such as in a company, a department ...
Compare distributed systems vs local systems:

|  | Distributed systems | Local systems |
| -------- | -------- | -------- |
| Performance    | Usable by multiple users.     | Usable by multiple users in local network.     |
| Scalability    | Processing capabilities and memory to store data that can easily be upgraded.    | Difficult to update the components as memory, disk space. |
| Reliability     | Higher reliability and reduce error because all data process is run on server.  |All data process run on user’s computer, so more effective but users can face some errors during use.    |
| System stability |The systems are difficult to fell into a state of deactivated because data processing systems are installed in many places. | If the server is damaged, the entire system will be paralyzed. |

#### Challenges in Distributed Systems.
##### Heterogeneity: This term means that the variety of dispersed systems software, platforms, hardware, etc. The distributed system will likely span different:
•	Hardware devices: computers, mobile phones, tablets, etc.
•	Operating System: Windows, Linux, Mac, etc.
•	Network: Local network, wireless network, etc.
•	Programming languages: Java, Python, PHP, etc.
•	Different roles of software developers, designers, system managers.
##### Openness: The developers will easy to add new features or replace sub-systems in the future if the interfaces are published and well-defined. For example, Facebook is the most popular social network, Facebook have API that allows developers to develop theirs own software based on Facebook's API.
##### Security: Distributed systems must be scrutinized for security issues. For distributed systems, the sensitive data most likely to be stolen so should establish strong security mechanisms.
##### Scalability: Distributed systems must be scalable as the number of user increases. “A system is said to be scalable if it can handle the addition of users and resources without suffering a noticeable loss of performance or increase in administrative complexity”- (B. Clifford Neuman). There are 3 dimensions:
•	Size: The number of users and the resources need to be processed. The problem that we need to care about here is the overload.
•	Geography: Separation between users and resources. The problem that we need to care about here is the communication reliability.
•	Administration: When the size of the distributed system increases, then the system needs to be controlled. The problem that we need to care about here is administrative mess.
##### Failure Handling: Distributed Systems involves a lot of collaborating components (hardware, software, communication). So there is a huge possibility of partial or total failure. The following techniques for dealing with failures: 
•	Detecting failures: Some failures can be detected. For example, we can detect corrupted data in a file when checksums.
•	Masking failures: Some failures that have been detected can be hidden or made more serious. There are 2 examples of hiding failures:
o	Messages can be sent back when they fail arrive.
o	The data files can be stored in two different places, so that if one is corrupted, the other may still be correct.
•	Tolerating failures: Most Internet service do fails exhibition and it is not practical to detect or hide all kinds of possible failure. In this case, the customer can be designed to withstand failure. For example, a web browser cannot contact a web server, it does not make users wait forever. It gives a message indicating that the server is not accessible and the user can try again later.
•	Recovery from failures: This relates to the design of the software for the states of permanent data can be restored or "rolled back" after a server has crashed. For example, the database server has a transaction processing capabilities that allow them to roll back a transaction that was not completed.
•	Redundancy: Service can be made available by the use of redundant components. Consider the following examples: 
o	Should have at least two different paths between any two routers on the Internet. 
o	In DNS, the name of each table is replicated in at least two different servers. 
o	A database can be replicated in a number of servers to ensure that the data is still accessible after the failure of a single server; servers can be designed to detect faults in their colleagues; when a fault is detected in a server, the client is redirected to the remaining servers.
Distribution system is a high degree of readiness to face major hardware failure which is a measure of the proportion of time available to the user. For example, if a server goes down, client requests can  be directed to other servers and services continue to be available.
Concurrency: Distributed systems is a multi-users environment. It allows clients can access a shared resource at the same time. To maximize the concurrency access between the user and the system, resource handling components should be anticipated as they will be accessed by competing users. For example, the site of a university will increase traffic unusual in the start date for course registration.
##### Transparency: Distributed system designed to hide the complexity of the system and the users only see what is needed. For example, when users use Facebook, they use only the features as: add friends or comment based on interface, they did not know that the query will be made as to how to they can see the result. Some terms of transparency in distributed systems are: 
•	Access transparency enables local and remote resources to be accessed using identical operations (e.g. RMI/RPC, NFS).
•	Location transparency enables resources to be accessed without knowledge of their location (e.g. pages in the web, file system operations in NFS).
•	Concurrency transparency enables several processes to operate concurrently using shared resources without interference between them (e.g. NFS, database management system).
•	Reliability transparency enables multiple instances of resources to be used to increase reliability and performance without knowledge of the replicas by users or application programmers (e.g. distributed DBMS).
•	Failure transparency enables the concealment of faults, allowing users and application programs to complete their tasks despite the failure of hardware or software components (e.g. database management system).
•	Mobility transparency allows the movement of resources and clients within a system without affecting the operation of users or programs (e.g. mobile phone, web pages).
•	Performance transparency allows the system to be reconfigured to improve performance as loads vary.
•	Scaling transparency allows the system and applications to expand in scale without change to the structure or the application algorithms (e.g. World-Wide-Web, Distributed database).
(EJB Tutorial, 2013)
### References
Distributed applications . (n.d.). Retrieved from TechTarget: http://searchitoperations.techtarget.com/definition/distributed-applications-distributed-apps
EJB Tutorial. (2013). Retrieved from Challenges for a Distributed System: http://www.ejbtutorial.com/distributed-systems/challenges-for-a-distributed-system
Pros and cons of distributed systems. (n.d.). Retrieved from Lycog: http://lycog.com/distributed-systems/pros-cons-distributed-systems/