## Introduction
A quick note about AWS CloudTrail. This post is a quick note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a course by Stephane Maarek.

![image.png](https://images.viblo.asia/ff70c775-50d7-4359-8ebd-bd3a83fe84eb.png)

## AWS CloudTrail
Track user activity and API usage in your AWS account. AWS CloudTrail is enabled by default.

AWS CloudTrail monitors and records an history of events or API calls made within your AWS account by:
+ Console
+ SDK
+ CLI
+ AWS Service

Can put logs from CloudTrail into CloudWatch Logs or S3. A Trail can be applied to All Regions (default) or a single Region.

![image.png](https://images.viblo.asia/09a1ac88-b823-4711-b3b2-bfa8dfe28e9e.png)

CloudTrail is very useful, for example, if a resource is deleted in AWS, investigate CloudTrail first.

## CloudTrail Events
CloudTrail has three kinds of events.

### Management Events

Management events provide visibility into management operations that are performed on resources in your AWS account. For example:
+ Configuring security (for example, IAM `AttachRolePolicy` API operations).
+ Registering devices (for example, Amazon EC2 `CreateDefaultVpc` API operations).
+ Configuring rules for routing data (for example, Amazon EC2 `CreateSubnet` API operations).
+ Setting up logging (for example, AWS CloudTrail `CreateTrail` API operations).

By default, trails are configured to log management events.

You can separate Read Events (that don’t modify resources) from Write Events (that may modify resources).

### Data Events

By default, trails do not log data events (because of high-volume operations). Additional charges apply for data events.

Data events provide visibility into the resource operations performed on or within a resource.

Data event resource types:
+ Amazon S3 object-level API activity (for example, `GetObject`, `DeleteObject`, and `PutObject` API operations) on buckets and objects in buckets.
+ AWS Lambda function execution activity (the `Invoke` API).
+ Amazon DynamoDB object-level API activity on tables (for example, `PutItem`, `DeleteItem`, and `UpdateItem` API operations).

### Insights Events

CloudTrail Insights helps your detect unusual activity in your AWS account by continuously monitoring and analyzing CloudTrail management events.

![image.png](https://images.viblo.asia/d5c66f38-d7b7-4340-8a86-621f9cdea54b.png)

An unusual activity could be one of the following:
+ Inaccurate resource provisioning.
+ Hitting service limits.
+ Bursts of AWS IAM actions.

If you have CloudTrail Insights enabled and CloudTrail detects unusual activity, Insights events are delivered to the destination S3 bucket, CloudTrail Console, or EventBridge event for your trail.

## CloudTrail Events Retention
Events are stored for 90 days in CloudTrail.

To keep events more persistent, log them to S3 or CloudWatch.

![image.png](https://images.viblo.asia/5d364034-68bc-4204-9144-af6ee868cdf1.png)

## End
End a quick note about AWS CloudTrail.