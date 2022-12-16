Whilst there are many companies who are cloud native, or fully migrated away from their data centers, there is a large contingent of AWS customers who still maintain an on-premises footprint, whether it is for compliance reasons, or because they simply haven’t migrated yet.

For these Hybrid Cloud customers, there is a range of tools and services that AWS has to offer, one of them being AWS Data Sync.

![](https://images.viblo.asia/ac1771e0-2e9e-483a-9c30-87ef04a43726.jpg)

# What is AWS DataSync?
With AWS DataSync, AWS allows you to migrate your data in a simple and secure way. AWS Data Sync allows you to transfer between on-premises and AWS, between AWS storage services and even between different cloud providers.

The AWS DataSync service is a secure, online data transfer service for moving large amounts of data, efficiently, and automatically, to and from many different locations. You can migrate and replicate any of your sets of data natively within DataSync. 

This can all be done whilst avoiding building custom solutions or wasting time on difficult and repetitive tasks.

AWS DataSync supports a number of different data formats, spanning file systems, object storage both within cloud environments and from an on-premises environment.

DataSync is available through the console or the AWS CLI (Command Line Interface) and can be used to move data between many different sources and destinations.

If you want to perform any kind of migration, or any kind of data relocation where the end point is within AWS – AWS DataSync will likely help you achieve your goals. 

![](https://images.viblo.asia/80a0a87f-ec85-47d9-99b1-1a05ff9e5cda.png)

# Features
AWS DataSync has a number of different features which make it a desirable tool to use for any kind of data migration. 

As with many AWS services, AWS employs their own custom features. In this case their own custom transfer protocol – which decides the specifics of how data is sent over a network and when. This is all designed to speed up data migration compared to traditional tools. 

It is possible to schedule tasks to run periodically, to detect and copy changes from your source storage system to the destination storage system.

In order to move files directly into your Amazon VPC, DataSync supports VPC endpoints (powered by AWS PrivateLink).

You can create tasks based on a schedule with AWS DataSync, to perform migrations on a time-oriented basis as and when you require. 

Files can be copied into EFS using AWS DataSync, and files that have not been accessed for a specified period can be migrated to Infrequent Access (IA) storage.

DataSync is a fully managed service, which means that there is no infrastructure that you must provision.

DataSync integrates seamlessly with Amazon EventBridge. You can set it to trigger an event when a transfer completes, thereby automating your workflows. 

During transit and in rest, DataSync performs integrity checks to ensure your data arrives intact. 

At rest, encryption is either done by SSE-S3 or by the Key Management Service. In transit, it uses TLS 1.2 and in transit it uses TLS 1.2 and SSE-S3. 

When you use DataSync with S3, it supports storing data directly into any S3 storage class. You do not need to use lifecycle policies or manually transfer data from S3. 

# Use Cases
Data migration to Amazon S3, Amazon EFS, or Amazon FSx for Windows File Server can all take place.

You can use AWS DataSync to transfer expensive archival storage into S3 Glacier Flexible Retrieval, Glacier Instant Retrieval, as well as the archival classes – Glacier and Glacier Deep archive.

Some organizations have AWS environments that use both an on-premises data center and a cloud-based solution.

Large volumes of data might be generated in the on-premises environment that need to be transferred to AWS for processing.

To ensure your data is protected, you can use AWS DataSync to back up your on-premises solutions to AWS.

DataSync can be used to replicate and store a copy of your data in Amazon Web Services. To ensure that your data is stored securely at rest, you can turn on the encryption settings on all of these services. 

DataSync Agent allows you to run DataSync on-premises as a virtual machine, supporting hybrid cloud deployments. 

The DataSync VM image is provided as an Amazon Machine Image (AMI) to be run on an EC2 instance.

To communicate with AWS, the agent VM needs access to certain endpoints. You must configure your firewall to allow this communication.

# Pricing
DataSync charges a flat fee per gigabyte for network acceleration technology, managed cloud infrastructure, data validation, and automation capabilities. 

AWS services, such as Amazon S3, Amazon EFS, Amazon FSx for Windows File Server, and AWS Key Management Service (KMS) charge standard request, storage, and data transfer rates.

You pay AWS Data Transfer at your standard rate when copying data from AWS to an on-premises storage system. In addition, Amazon CloudWatch Logs, Amazon CloudWatch Events, and Amazon CloudWatch Metrics are charged at standard rates.

The AWS PrivateLink service will charge you for interface VPC endpoints that you create to manage and control traffic between your agent(s) and the DataSync service.

# Limits
![](https://images.viblo.asia/daa82aef-bbcd-407a-ad26-f908c0416884.png)

### Documents: https://aws.amazon.com/vi/datasync/