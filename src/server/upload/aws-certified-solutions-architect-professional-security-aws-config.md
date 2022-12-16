## Introduction
A quick note about AWS Config. This post is a short note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a course by Stephane Maarek.

![image.png](https://images.viblo.asia/feaa2864-2768-47a7-bd69-11a57e1726a4.png)

## AWS Config
When you run your applications on AWS, you usually use AWS resources, which you must create and manage collectively. As the demand for your application keeps growing, so does your need to keep track configuration of your AWS resources.

AWS Config provides a detailed view of the configuration of AWS resources in your AWS account. With AWS Config, you can do the following:
+ Evaluate your AWS resource configurations for desired settings.
+ Retrieve configurations of one or more resources that exist in your account.
+ Retrieve historical configurations of one or more resources.
+ Receive a notification whenever a resource is created, modified, or deleted.
+ View relationships between resources. For example, you might want to find all resources that use a particular security group.

**AWS Config is a per-region service.**

## Ways to Use AWS Config
AWS Config is designed to help you oversee your application resources in the following scenarios.

### Resource Administration
You can use AWS Config rules to evaluate the configuration settings of your AWS resources. When AWS Config detects that a resource violates the conditions in one of your rules, AWS Config flags the resource as non-compliant and sends a notification.

### Auditing and Compliance
You might be working with data that requires frequent audits to ensure compliance with internal policies and best practices. To demonstrate compliance, you need access to the historical configurations of your resources. AWS Config provides this information.

### Managing and Troubleshooting Configuration Changes
When you use multiple AWS resources that depend on one another, a change in the configuration of one resource might have unintended consequences on related resources. With AWS Config, you can view how the resource you intend to modify is related to other resources and assess the impact of your change.

### Security Analysis
You can use AWS Config to view the IAM policy that was assigned to an IAM user, group, or role at any time in which AWS Config was recording. This information can help you determine the permissions that belonged to a user at a specific time.

## AWS Config Rules
You create AWS Config rules to evaluate the configuration settings of your AWS resources. AWS Config supports Config Managed Rules and Config Custom Rules. Managed rules are predefined, customizable rules created by AWS Config.

Rules can be evaluated/triggered:
+ For each config change.
+ And/or: at regular time intervals.
+ Can trigger CloudWatch Events if the rule is non-compliant (and chain with Lambda).

Rules can have auto remediations:
+ If a resource is not compliant, you can trigger an auto-remediation.
+ Define the remediation through SSM Automations.
+ Ex: remediate security group rules, stop instances with non-approved tags.

## How AWS Config Works
If you are using AWS Config rules, AWS Config continuously evaluates your AWS resource configurations for desired settings. Depending on the rule, AWS Config will evaluate your resources either in response to configuration changes or periodically. Each rule is associated with an AWS Lambda function, which contains the evaluation logic for the rule. When AWS Config evaluates your resources, it invokes the rule’s AWS Lambda function. The function returns the compliance status of the evaluated resources. If a resource violates the conditions of a rule, AWS Config flags the resource and the rule as non-compliant. When the compliance status of a resource change, AWS Config sends a notification to your Amazon SNS topic.

![image.png](https://images.viblo.asia/228f2cce-69ce-4fc0-bc93-83468e304925.png)

## End
End short note about AWS S3 Security.