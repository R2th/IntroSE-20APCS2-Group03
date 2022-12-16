## Introduction
A quick note about AWS Key Management Service. This post is a quick note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a course by Stephane Maarek.

![image.png](https://images.viblo.asia/c4a984af-8c74-44fa-93a4-eff543ccee90.png)
*<div align="center">Image by [Jerry Hargrove](https://www.awsgeek.com/AWS-KMS/)</div>*

## Key Management Service
Anytime you heard about "encryption" for AWS service, think about AWS Key Management Service. AWS KMS is a managed service that makes it easy for you to create and control the cryptographic keys that are used to protect your data.

Many AWS services use AWS KMS to support encryption of your data:
+ Amazon EBS
+ Amazon RDS
+ Amazon DynamoDB
+ Amazon S3
+ AWS Secrets Manager
+ etc…

## KMS Key Types
In AWS, you have two types of keys: Symmetric and Asymmetric.

### Symmetric (AES-256 keys)
By default, when you create an AWS KMS key, you get a KMS key for symmetric encryption.

Symmetric encryption keys use the same key for encryption and decryption. All AWS services that are integrated with KMS use Symmetric KMS keys.

### Asymmetric (Public key and Private key pair)
An asymmetric KMS key uses a public key to encrypt and a private key to decrypt.

The public key is downloadable to use outside of AWS KMS, but you can't access the private key unencrypted, to use the private key you must call AWS KMS API.

## Types of KMS Keys
AWS has four kinds of KMS Keys

**Customer Managed Keys**
+ This is a key you create directly in AWS. You can create, manage, enable or disable them.
+ Possibility of rotation policy (new key generated every year, old key preserved).

**AWS Managed Keys**
+ Used by AWS service (RDS, EBS, S3, etc…).
+ Managed by AWS (automatically rotated every 3 years).

**AWS Owned Keys**
+ Created and managed by AWS, used by some AWS services to protect your resources.
+ Used in multiple AWS accounts, but they are not in your AWS account.
+ You can't view, use, track, or audit.

![image.png](https://images.viblo.asia/f7d7e476-45d2-4198-886e-376dc62d0b90.png)
*<div align="center">Image by Stephane Maarek</div>*

## Multi-Region keys
AWS KMS supports multi-region keys that can be used interchangeably. Each set of related multi-Region keys has the same key material and key ID, so you can encrypt data in one AWS Region and decrypt it in a different AWS Region.

Multi-Region keys are not global. You create a multi-region primary key and then replicate it into Regions that you select within an AWS partition. Only one primary key at a time, but you can promote replicas into their own primary.

Multi-Region keys are a powerful solution for data security scenarios: disaster recovery, global data management, distributed signing applications, active-active applications that span multiple Regions, etc…

## End
End quick note about AWS CloudTrail Solution Architect use cases.