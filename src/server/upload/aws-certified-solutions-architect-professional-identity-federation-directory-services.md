## Introduction
A quick note about AWS Directory Services. This post is a quick note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a Stephane Maarek's course.

![image.png](https://images.viblo.asia/f644bd1b-7845-427a-89c2-791e550ed111.png)

## Microsoft Active Directory
You can find Microsoft Active Directory on any Windows Server with AD Domain Services.

It’s a database of objects: users, accounts, computers, printers, and security groups.

Centralized security management, create an account, and assign permissions. Security is integrated with Active Directory through logon authentication and access control to objects in the directory.

In Active Directory, objects are organized in trees. A group of trees is a forest.

For example.

![image.png](https://images.viblo.asia/6d720e35-3339-4d5f-bdee-f136cb7d154b.png)

We have a domain controller that accepts John's authentication and another machine connected to this domain controller. Now, we can use John's login authentication to access the resources of another machine.

## AWS Directory Services
AWS provides three services that support Directory Services.

### AWS Managed Microsoft AD
With AWS Managed Microsoft AD you can create your AD in AWS, manage users locally, and support MFA.

AWS Directory Service makes it easy to set up and run directories in the AWS Cloud or connect your AWS resources with an existing on-premises Microsoft Active Directory.

![image.png](https://images.viblo.asia/72853404-eedb-4484-a965-89bbbe285fdb.png)

The users can authenticate on the right-hand side in on-premise AD or on the left-hand side in the AWS Cloud.

### AWS AD Connector
AD Connector is a directory gateway with which you can redirect directory requests to your on-premises Microsoft Active Directory without caching any information in the cloud.

Users are managed on the on-premise AD.

AD Connector offers the following benefits:
+ End-users can use their existing corporate credentials to log on to AWS applications.
+ You can consistently enforce existing security policies whether users are accessing resources in your on-premises infrastructure or in the AWS Cloud.
+ Support MFA.

![image.png](https://images.viblo.asia/d64b5cc5-5078-4a51-a80a-1700e1cea41f.png)

### AWS Simple Active Directory
Which is not Microsoft AD, it’s an AD-compatible API called Samba.

It cannot be joined with on-premise AD.

Simple AD provides a subset of the features offered by AWS Managed Microsoft AD, including the ability to manage user accounts and group memberships, create and apply group policies, and securely connect to Amazon EC2 instances, **but it does not support MFA**.

![image.png](https://images.viblo.asia/63e23779-788a-4309-b7e0-76e00bbfcbaa.png)

## AWS Managed Microsoft AD
### Connect between AWS Managed AD and on-premise AD
Ability to connect your on-premise AD to AWS Managed Microsoft AD. For this, you need to set up a Direct Connect or VPN connection between the two.

![image.png](https://images.viblo.asia/7955d198-a7ad-42a2-913c-469c52882afc.png)

On the left side, you have our on-premise AD which manages its users on-premise, and on the right side you have AWS Manage AD, this going to also be managing its users on AWS. And so you can set up three kinds of forest trust:
1. One-way trust: AWS => on-premises.
2. One-way trust: on-premises => AWS.
3. Two-way forest trust: AWS <=>on-premises.

### Active Directory Replication
You may want to create a replica of your on-premise AD on AWS to minimize the latency in case Direct Connect or VPN goes down.

![image.png](https://images.viblo.asia/9d3e1068-2476-4842-a9c8-e2914b1adff9.png)

To set up a replica, you need to deploy AD on an EC2 Windows instance, and you will have to set up a replication between on-premise AD and an EC2 Windows instance.

And finally, we can set up a two-way forest trust between our EC2 instance and AWS Manage AD.

## AD Connector
AD Connector is a directory gateway to redirect directory requests to your on-premises Microsoft Active Directory.

No caching capability.

Manage users solely on-premises, with no possibility of setting up a trust.

Establish a connection use VPN or Direct Connect.

![image.png](https://images.viblo.asia/3b668e3a-3aa5-49b1-b256-8e1a2ac54220.png)

## AWS Simple AD
Simple AD is an inexpensive Active Directory–compatible service with the common directory features.

Supports joining EC2 instances, and managing users and groups.

Does not support MFA, RDS SQL Server, or AWS SSO.

Small: 500 users, large: 5000 users.

Powered by Samba 4, compatible with Microsoft AD.

Lower cost, low scale, basic AD compatible, or LDAP compatibility.

No trust relationship.

## End
End note about AWS Directory Services.