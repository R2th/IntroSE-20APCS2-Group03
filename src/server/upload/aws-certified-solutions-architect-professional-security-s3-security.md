## Introduction
A quick note about AWS S3 Security. This post is a short note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a course by Stephane Maarek.

![image.png](https://images.viblo.asia/4807c3df-081e-4161-9385-4c92561af538.png)

## Data protection
Data protection refers to protecting data while in transit (as it travels to and from Amazon S3) and at rest (while it is stored on disks in Amazon S3 data centers).

### Protecting data in transit
You can protect data in transit using Secure Socket Layer/Transport Layer Security (SSL/TLS).

AWS S3 exposes:
+ HTTP endpoint: non encrypted.
+ HTTPS endpoint: encryption in flight.

You’re free to use the endpoint you want, but HTTPS is recommended.

### Protecting data at rest
There are 2 ways of protecting data at rest in Amazon S3.

**Server-Side Encryption**

Request Amazon S3 to encrypt your object before saving it on disks in its data centers and then decrypt it when you download the things. There are 3 methods of Server-Side Encryption:
+ SSE-S3: encrypts S3 objects using keys handled & managed by AWS.
+ SSE-KMS: leverage AWS Key Management Service to manage encryption keys.
+ SSE-C: when you want to manage your own encryption keys.

**Client Side Encryption**

Encrypt data client-side and upload the encrypted data to Amazon S3. In this case, you manage the encryption process, the encryption keys, and related tools.

## S3 Access Logs
You can enable server access logging for S3, it provides detailed records for the requests that are made to a bucket.

Access log information can be useful in security and access audits. It can also help you learn about your customer base and understand your Amazon S3 bill.

Good to know:
+ Logs might take hours to deliver.
+ Logs might be incomplete (best effort).

## S3 Security
By default, all Amazon S3 resources are private. Amazon S3 offers access policy options broadly categorized as resource-based policies and user policies.

With *user policies*, you can attach access policies to users in your account using IAM policies.

With *resource-based policies (S3 Bucket Policies)*, you attach access policies to your resources (buckets and objects).

You can also use access control lists (ACLs) to grant basic read and write permissions to other AWS accounts.

### S3 Bucket Policies
Use the S3 bucket for policy to:
+ Grant public access to the bucket.
+ Force objects to be encrypted at upload.
+ Grant access to another account (Cross Account).

Optional Conditions on:
+ Public IP or Elastic IP (not on Private IP).
+ Source VPC or Source VPC Endpoint — only works with VPC Endpoints.
+ CloudFront Origin Identity.
+ MFA.

## S3 pre-signed URLs
Can generate pre-signed URLs using SDK or CLI:
+ For downloads (easy, can use the CLI).
+ For uploads (harder, must use the SDK).

Valid for default of 3600 seconds, can change timeout with `--expires-in [TIME_BY_SECONDS]` argument.

Users given a pre-signed URL inherit the permissions of the person who generated the URL for GET/PUT.

Use cases:
+ Allow only logged-in users to download a premium video on your S3 bucket.
+ Allow an ever-changing list of users to download files by generating URLs dynamically.
+ Allow temporarily a user to upload a file to a precise location in our bucket.

## End
End short note about AWS S3 Security.