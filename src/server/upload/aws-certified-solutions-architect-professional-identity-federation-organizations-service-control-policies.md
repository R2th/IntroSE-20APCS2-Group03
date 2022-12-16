## Introduction
A quick note about AWS Organizations Service Control Policies. This post is a quick note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a course by Stephane Maarek.

![image.png](https://images.viblo.asia/e2e4b66e-9655-40c5-b077-38c9b0387820.png)

## Service Control Policies
Service control policies (SCPs) are a type of organization policy that you can use to manage permissions in your organization.

SCPs offer central control over the maximum available permissions for all accounts in your organization.

**SCP only applies to the OU or Account level, it does not apply to the Management Accounts.**

SCP is applied to all the Users and Roles in the account, including the Root user. The SCP does not affect Service-linked roles.

Use cases:
+ Restrict access to certain services.
+ Deny access to AWS based on the requested AWS Region.
+ Block service access for the root user.

## SCP Hierarchy Inheritance
You can attach policies to organization entities (Root OU, Organizational Unit (OU), or Account) in your organization:
+ When you attach a policy to the Root OU, all OUs and accounts in the organization inherit that policy.
+ You can’t attach a policy to the Management Account.
+ When you attach a policy to a specific OU, accounts that are directly under that OU or any child OU inherit the policy.
+ When you attach a policy to a specific account, it affects only that account.

For example, we have an AWS Organization below.

![image.png](https://images.viblo.asia/a274c068-f9c9-4ecc-bbc5-98ea7dcac34f.png)

Management Account:
+ Can do anything.
+ (no SCP apply).

Account A:
+ Can do anything.
+ EXCEPT for access Redshift (explicit Deny from Prod OU).

Account B:
+ Can do anything.
+ EXCEPT for access Redshift (explicit Deny from Prod OU).
+ EXCEPT for access Lambda (explicit Deny from HR OU).

Account C:
+ Can do anything.
+ EXCEPT for access Redshift (explicit Deny from Prod OU).

## Strategies for using SCPs
You can configure the service control policies (SCPs) in your organization to work as either of the following:
+ A deny list: actions are allowed by default, and you specify what services and actions are prohibited.
+ An allow list: actions are prohibited by default, and you specify what services and actions are allowed.

For example, deny list strategy.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowsAllActions",
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        },
        {
            "Sid": "DenyDynamoDB", 
            "Effect": "Deny",
            "Action": "dynamodb:*",
            "Resource": "*"
        }
    ]
}
```

This policy enables full permissions for the account except for DynamoDB.

Example allow list strategy.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:*",
                "cloudwatch:*"
            ],
            "Resource": "*"
        }
    ]
}
```

This policy enables permissions for the account to access EC2 and Cloudwatch.

## IAM Policy Evaluation Logic

![image.png](https://images.viblo.asia/71aab8ac-b859-49a1-9941-cb50535b2208.png)

**Deny evaluation:** By default, all requests are denied. This is called an implicit deny.

**Organizations SCPs:** Then the code evaluates AWS Organization service control policies (SCPs) that apply to the request. If the enforcement code does not find any applicable Allow statements in the SCPs, then the request is implicitly denied. The code returns a final decision of Deny. If there is no SCP, or if the SCP allows the requested action, the code continues.

**Resource-based policies:** Depending on the type of principal, an Allow in a resource-based policy can result in a final decision of Allow , even if an implicit deny in an identity-based policy, permissions boundary, or session policy is present.

**Identity-based policies:** The code then checks the identity-based policies for the principal. If there are no identity-based policies or no statements in identity-based policies that allow the requested action, then the request is implicitly denied and the code returns a final decision of Deny. If any statement in any applicable identity-based policies allows the requested action, the code continues.

**IAM permissions boundaries:** The code then checks whether the IAM entity that is used by the principal has a permissions boundary. If the policy that is used to set the permissions boundary does not allow the requested action, then the request is implicitly denied.

**Session policies:** The code then checks whether the principal is a session principal.

## Restricting Tags with IAM Policies
You can restrict specific Tags on AWS resources. Using the aws:TagKeys Condition Key.

For example, allow IAM users to create EBS Volumes only if it has the “Env” and “CostCenter” Tags. Use either ForAllValues (must have all keys) or ForAnyValue (must have any of these keys at a minimum).

ForAllValues.

```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": "ec2:CreateVolume",
        "Resource": "*",
        "Condition": {"ForAllValues:StringEquals": {"aws:TagKeys": ["Env", "CostCenter"]}}
    }]
}
```

ForAnyValue.

```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": "ec2:CreateVolume",
        "Resource": "*",
        "Condition": {"ForAnyValue:StringEquals": {"aws:TagKeys": ["Env", "CostCenter"]}}
    }]
}
```

## Using SCP to Restrict Creating Resources
You can prevent IAM Users/Roles in the affected Member accounts from creating resources if they don’t have specific Tags.

For example, restrict IAM users to create EBS Volumes if it doesn’t have the “CostCenter” Tags.

```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Deny",
        "Action": "ec2:CreateVolume",
        "Resource": "*",
        "Condition": {"Null": {"aws:RequestTag": "true"}}
    }]
}
```

## Tag Policies
Helps you standardize tags across resources in an AWS Organization. Ensure consistent tags, audit tagged resources, and maintain proper resource categorization.

You define Tag keys and their allowed values. Helps with AWS Cost Allocation Tags and Attribute-based Access Control.

## Backup Policies
AWS Backup enables you to create Backup Plans that define how to backup your AWS resources. Backup policies in AWS Organizations combine all of those pieces into JSON text documents.

You can attach a backup policy to any of the elements in your organization’s structure, such as the root, organizational units (OUs), and individual accounts.

Backup policies give you granular control over backing up your resources at whatever level your organization requires. For example, you can specify in a policy attached to the organization’s root that all Amazon DynamoDB tables must be backed up.

The effective backup plan for each AWS account in the organization appears in the AWS Backup console as an immutable plan for that account (view only).

## End
End a quick note about AWS Organizations Service Control Policies.