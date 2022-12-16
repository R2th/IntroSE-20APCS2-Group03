## 1.The consideration
Somedays, when your application suddenly becomes slow.

You try to make a simple request but it takes forever to respond.

Finally you get an 502 error. 

![image.png](https://images.viblo.asia/a5e4a259-0931-4ec5-82a4-584e3b9c46fd.png)

 In that case, you definitely want to consider a DDoS Attack.
 
 When you are sure about a DDoS Attack. You can think of blocking the client who attacks your service.
 
 So let's disscuss how to do it with AWS Cloud.
 
 
## 2. Different Approaches with different types of Architecture 

To correctly determine what to do, first we need to understand our application architecture.

Today we will discuss about internet-facing application so we will omit the case client and server uses private direct connect here.

Let's list up some common design and review the strategies for each of them.

### 2.0 Quick Response
First thing first, let's check if attacked endpoint is cacheable or not. If the endpoint is cacheable, consider cache it as the urgent response.

If the enpoint is a HTTP GET, Caching should be considered.

Even a micro-caching like 1 second is effective. 

### 2.1 Only one single EC2 instance or EC2s with NLB

#### 2.1.1 Review the application architecture
![Untitled Diagram.drawio.png](https://images.viblo.asia/ecfecec6-49ad-4978-b00a-9299aa420d91.png)

![Untitled Diagram-Copy of Page-1.drawio.png](https://images.viblo.asia/52dcbf69-77cc-4804-8653-6bf4aa15edb1.png)

In this design we have the following components:

1. Client Computer 
2. NACL ( managed by VPC )
3. Network Load Balancer ( Optional )
4. Security Group
5. EC2 Instance

 So connection flow will become something as such:
 
 ```
I. Client → II.Send request through the internet → 
III. Request meet the NACL → IV.Request meet the NLB (Optional)
IV.Request meet the security group → V. Request meet the EC2 Instance → 
VI. Request meet the Application 
```

#### 2.1.2 Things to check

With the Network Flow defined above, the network is transfering transparently to the EC2 machine. As a result, the EC2 will actually see client IP Addresses. And we can check the following to see which client is spamming our service:

1. VPC Flow logs
2. EC2 Access logs
3. Application Access logs 

#### 2.1.3 Possible Actions

1. Block the IP inside the EC2 with some kind of firewall softwares.

This is one of possible action you can do since you are capble of installing any software in your EC2.
But this may not affective when the DDoS attack make  you even not be able to SSH to your EC2.


Moreover, installing additional software to your EC2 potentially has bad impact on your application as well. From my point of view, i advise you against this one.

2. Only Whitelist allowed IP Address List in Security Group

The second possible action you can do is modifying the security group attached to your EC2. 
Security Group doesn't support an "Deny" rule, only "Allow" rule. So we only can blocking client's IP addresses by defining a whitelist addesses list and only "Allow" them to connect.

If your application is public & opened for everyone, you can not block specific IPs in this way.

3. Add a "Deny" rule in NACL

This is the easiest way, and be recommended for this architecture. All you need to do is just making a "Deny" rule & apply it to IP Addresses you want to block and AWS will do all the rest for you.

### 2.2 EC2 instances with Application Load Balancer

#### 2.2.1 Review the application architecture
![Untitled Diagram-Copy of Page-1.drawio.png](https://images.viblo.asia/dcf75089-5665-46e7-bd5f-5df8a346a9fd.png)

Components in this design:

1. Client Computer 
2. NACL ( managed by VPC )
3. ALB Security Group
4. ALB
5. EC2 Security Group
6. EC2 Instance

Application Load Balancer in AWS will do something called "Connection Termination" which means the client's connection will be breaked into  `Client => ALB` & `ALB => EC2` stages.

The connection flow is now become:

 ```
I. Client → II.Send request through the internet → 
III. Request meet the NACL → IV.Request meet the ALB security group → 
V.Request meet the ALB →
VI.ALB send request to the EC2 & meet its security group → 
VII. Request meet the EC2 Instance → 
VIII. Request meet the Application 
```

#### 2.2.2 Things to check
In this case, with  "Connection Termination" comes from the ALB. Our EC2 will not directly serve the requests come from the client. It will serve the ALB's request instead. We will need to modify the EC2's security group to allow connections from the ALB too.

As a result, Our EC2s will no longer see client's IP Addresses. It will only see IP Address from ALB. So blocking IP Addresses in the EC2 side seems to be more difficult.
So let's review possible actions in this case

#### 2.2.3 Possible Actions

1. Block the IP inside the EC2 with some kind of firewall softwares.

Since the IP address our EC2 sees is the ALB's IP Address, it make us difficult for apply some firewall rule to deny request from client.  If we really want to do this, ALB support the `X-Forwarded-For` in the header of the request, forwarding the client's IP address information. One more time, i do not recommend doing that way !

2. Only Whitelist allowed IP Address List in Security Group

It has the similar approaches as in  **2.1**. The difference is, Because our EC2 doesn't see the client's IP addresses anymore. So we will need to modify the ALB's security group instead.

3. Add a "Deny" rule in NACL

One more time. This solution is affective in this case too. Adding a "Deny" rule in NACL will make the specific IP address's request not be able to reach the ALB, which reduces traffics to both ALB & EC2s.

*But it will be tough for us if the attacker use many random IP addresses from all over the world to attack our service, right ? We will need to block them one by one with this approach. To have better solution, consider the 4 ~*

4. Attach Web Application Firewall rule
![Untitled Diagram-Copy of Page-1.drawio (1).png](https://images.viblo.asia/0721619d-9529-40fc-8d2d-e439238cd02a.png)

With ALB, We can attach something called Web Application Firewall which provied by AWS. It support not only block IP Addresses but also some rule to filter requests such as making a rate-based limit to a specific URI, etc..
For example, One IP address can only send a limit number of requestes in 5 minutes time period,..

So when being attacked by many addresses at the same time. It's good to consider using some rule to filter incoming requests.  But WAF is a additional service provided by AWS, you will have to pay more as you use too. 

### 2.3 When with Cloudfront as CDN

#### 2.3.1 Review the application architecture
![Untitled Diagram-Copy of Page-1.drawio.png](https://images.viblo.asia/15af87d1-0bad-4033-9b72-7f2757fee444.png)

Components in this design:

1. Client Computer 
2. CloudFront
3. NACL ( managed by VPC )
4. ALB Security Group
5. ALB
6. EC2 Security Group
7. EC2 Instance


The connection flow is now become:

 ```
I. Client → 
II.Send request through the internet → 
III. Request meet CloudFront
IV. CloudFront forward request to VPC & meet the NACL → 
V.Request meet the ALB security group → 
VI.Request meet the ALB →
VII.ALB send request to the EC2 & meet its security group → 
VIII. Request meet the EC2 Instance → 
IX. Request meet the Application 
```

#### 2.3.2 Things to check
In this case, we have additional CloudFront as the CDN and since CloudFront is a CDN, It sits outside the VPC and the source's ip of the request sent to VPC is now CloudFront's IPs. Then, we can say, NACL is now useless or WAF in ALB is also not effective too..

#### 2.3.3 Possible Actions

In this design, you can do something as following:

1. Add an Geo Restriction
If you see the attack is coming from specific country. You can use Geo Restriction in CloudFront to block all IP Address coming from that country if you want. Of course, it is not recommended since people who are not attacker but having that country's IP address are also blocked !

2. WAF again
![Untitled Diagram-Copy of Page-1.drawio (2).png](https://images.viblo.asia/af5cdd98-c70d-4efb-a5fb-3bbffb87911b.png)
Not only be able to attached to ALB, it is also attached to CloudFront as well. Similarly, You can do IP filtering, creating rate-based rule to restrict accesses as well.

## 3. In conclusion

Be careful when you block an IP Address. Attacker can use an specific common IP from an ISP and if you block the IP, others using the same ISP may be affected too.

 They are not all possible solutions that you can consider when facing an DDoS attack in our AWS - hosted Application.
 
 We have better solutions such as the following to prevent DDoS  too. Since the two's price are quite high, not suitable for everyone so i will not deep dive into it.

1. Using DDoS preventing premium feature in WAF
2. Using AWS Shield Advanced

Hope this makes sense & have a nice day !