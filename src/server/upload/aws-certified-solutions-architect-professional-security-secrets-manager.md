## Introduction
A quick note about AWS Secrets Manager. This post is a short note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a course by Stephane Maarek.

![image.png](https://images.viblo.asia/e7cb8a13-63e0-42a4-9c6f-97cb77e01c4e.png)

## AWS Secrets Manager
AWS Secrets Manager helps you store and protect your secrets needed to access other applications. The service enables you to easily rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle.

Instead of hardcoding credentials in your apps, you can make calls to Secrets Manager to retrieve your credentials whenever needed.

With Secrets Manager, you can manage access to secrets using IAM policies and resource-based policies. For example, you can create a policy that enables developers to retrieve certain secrets only when they are used for the development environment.

## Basic scenario
For example, the diagram displays you can store credentials for a database in Secrets Manager, and then the application retrieves those credentials to access the database.

![image.png](https://images.viblo.asia/08edb2ab-41a5-4d09-99ed-bbab2ab858e4.png)

1. You create a set of credentials for a database.
2. You store the credentials as a secret in Secrets Manager.
3. When your application accesses the database, the application queries Secrets Manager for the secret.
4. Secrets Manager returns the secret to the client app over a secured (HTTPS with TLS) channel.
5. The client application parses the credentials and then uses the information to access the database server.

## Secrets Manager Features
### Automatically rotate your secrets
You can configure Secrets Manager to automatically rotate with an AWS Lambda function. This function defines how Secrets Manager performs the following tasks:
+ Creates a new version of the secret.
+ Stores the secret in Secrets Manager.
+ Configures the protected service to use the new version.
+ Verifies the new version.
+ Marks the new version as production ready.

### Natively supports RDS
Secrets Manager natively supports the following Amazon RDS:
+ Amazon Aurora on Amazon RDS.
+ MySQL on Amazon RDS.
+ PostgreSQL on Amazon RDS.
+ Oracle on Amazon RDS.
+ MariaDB on Amazon RDS.
+ Microsoft SQL Server on Amazon RDS.

## Secrets Manager Quotas
You can store a maximum of 500,000 secrets per Region.

The maximum version of a secret is ~100.

The maximum length of a secret is 65,536 bytes.

The length of a resource-based policy (JSON text) is 20,480 characters.

## SSM Parameter Store vs Secrets Manager
Secrets Manager:
+ More cost.
+ Automatic rotation of secrets with AWS Lambda.
+ Lambda function is provided for RDS, Redshift, DocumentDB.
+ KMS encryption is mandatory.

SSM Parameter Store:
+ Less cost.
+ Simple API.
+ No secret rotation (can enable rotation using Lambda triggered by CW Events).
+ KMS encryption is optional.

## SSM Parameter Store vs Secrets Manager Rotation

![image.png](https://images.viblo.asia/0cfb4ae4-a41e-4a38-af30-09430ef2d2a6.png)

## End
End short note about AWS Secrets Manager.