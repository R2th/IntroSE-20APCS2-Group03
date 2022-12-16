CAP theorem is a concept that is maintained in distributed  systems. CAP is made by taking the initials from Consistency, Availability and Partition tolerance. It is said in the theorem that It is not possible for achieve all 3 above characteristics at the same time, and we MUST choose at most two out of three guarantees in our system. Lets talk about 3 of these elements below

### C = Consistency
A consistent service works fully or not at all, dont have any partially accepted state. Consistency is ‘C’ in ACID properties in non-distributed systems, which means that data will never be persisted (rolled back) in DB that breaks certain pre-set constraints.
Consistency, in distributed system environment, means all client programs must see the same data at any given point of time while reading the data from the cluster . There should not be any difference in data at any time and at any data source node.

### A = Availability
An available service make sure that every request must respond on success or failure. The system should remain operational 100% of the time in case of achieving availability. Every request from all the client must get a response, regardless of the state of any individual node in the system. This charecteristics is very trivial to measure: either one can submit read/write commands, or cannot. Morever, the databases must be time independent as the data nodes need to be available online at all times.

### P = Partition Tolerance
The risk of partition forming occurs when we start to spread data and logic around different nodes. A partition can happens for an example, a network cable gets chopped, and Node A can no longer communicate with Node B. With the kind of distribution capabilities the web provides, temporary partitions are a relatively common occurrence and, as I said earlier, they’re also not that rare inside global corporations with multiple data centres.

![](https://images.viblo.asia/91a7acfd-77c7-42a4-8df9-79c74c621dc5.png)

### CP (Consistency + Partition Tolerance) Systems
In distributed system, at the time of fetching data, consistency is measured by a democracy kind of mechanism, where all data nodes who have replication of data mutually agree that they have “same copy” of requested data. Now let’s say, our requested data is present in two nodes N1 and N2. Client maskes a request to read the data; and our CP system is partition tolerant as well, but out of nowhere an unexpected network failure occurred and N2 is detached from communication. Now system cannot get the confirmation that N1’s data copy is latest or not. So system decides to send an ERROR event to client because it cannot be sure about data. Here system preffered data consistency over data availability.

### AP (Availability + Partition Tolerance) Systems
Again for the above scenario, system instead of sending ERROR, it can send the data recieved from N1. Well client got the data, but there was uncertainity if data is latest or not. So here availability wins over consistency. These are AP systems.

### CA (Consistency + Availability) Systems
In a distributed environment, we cannot avoid “P” of CAP. So we have to choose between CP or AP systems. If we desire to have a consistent and available system, then we must forget about partition tolerance and it’s possible only in non-distributed systems such as oracle and SQL server.


Reference: http://www.julianbrowne.com/article/brewers-cap-theorem