## Introduction
A quick note about AWS IAM. This post is a quick note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a Stephane Maarek's course.

## IAM
User: long term cerdentials.

Groups: assign user to group.

Roles is short term cerdentials, use STS, some role we have been seeing:
+ EC2 instance role: uses the EC2 metadata service, get temporary certificate for ec2 instance. One role at a time per instance, EC2 use this temporary certificate to access other AWS service without need setting aws credentials on EC2.
+ Service role: assigned to service directly, allow this service perform acction to other AWS service. Example: Lambda do an action on an AutoScaling Group.
+ Cross Account Roles: allow perform actions in the other account.

Policies define what a role or a user can do, three kind:
+ AWS Managed: policies defined by AWS.
+ Customer Managed: policies that u creating., can share across users or roles.
+ Inline Policies: policies assigned to one specific user or role, can not share across users or roles.

Resource Based Policies (S3 bucket, SQS, etc ...)

### IAM Policies In Deep
Anatomy of a policies is JSON doc with:
+ Sid (option).
+ Effect.
+ Action.
+ Resource.
+ Condition.
+ Policy Variables.

Example.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ListAndDescribe",
            "Effect": "Allow",
            "Action": [
                "dynamodb:List*",
                "dynamodb:DescribeReservedCapacity*",
                "dynamodb:DescribeLimits",
                "dynamodb:DescribeTimeToLive"
            ],
            "Resource": "*"
        },
        {
            "Sid": "SpecificTable",
            "Effect": "Allow",
            "Action": [
                "dynamodb:BatchGet*",
                "dynamodb:DescribeStream",
                "dynamodb:DescribeTable",
                "dynamodb:Get*",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:BatchWrite*",
                "dynamodb:CreateTable",
                "dynamodb:Delete*",
                "dynamodb:Update*",
                "dynamodb:PutItem"
            ],
            "Resource": "arn:aws:dynamodb:*:*:table/MyTable"
        }
    ]
}
```

By default all service is DENY. Best practice is use least privilege for maximun security.

### IAM AWS Managed Policies
AdministratorAccess should be allowed on any resource.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}
```

PowerUserAccess provides full access to AWS services and resources, but does not allow management of Users and groups.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "NotAction": [
                "iam:*",
                "organizations:*",
                "account:*"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:CreateServiceLinkedRole",
                "iam:DeleteServiceLinkedRole",
                "iam:ListRoles",
                "organizations:DescribeOrganization",
                "account:ListRegions"
            ],
            "Resource": "*"
        }
    ]
}
```

### IAM Policies Conditions
The Condition block lets you specify conditions for when a policy is in effect.

```json
"Condition" : { "{condition-operator}" : { "{condition-key}" : "{condition-value}" }}
```

The condition key can be a `global condition` key or a `service-specific condition` key.
+ Global condition key have `aws:` prefix.
+ Service-specific condition keys have the service's prefix, for example `ec2:InstanceType`.

The condition-operator can be.

**1. String condition operators**

| Condition operator | Description |
| -------- | -------- | -------- |
| StringEquals | Exact matching, case sensitive |
| StringNotEquals | Negated matching |
| StringEqualsIgnoreCase | Exact matching, ignoring case |
| StringNotEqualsIgnoreCase | Negated matching, ignoring case |
| StringLike | Case-sensitive matching. The values can include multi-character match wildcards (*) and single-character match wildcards (?) anywhere in the string. |
| StringNotLike | Negated case-sensitive matching. The values can include multi-character match wildcards (*) or single-character match wildcards (?) anywhere in the string. |

<br />

For example, the following condition includes the StringEquals operator to ensure that only requests made by hoang-phuc match.

```
"Condition": { "StringEquals": { "aws:username": "hoang-phuc" } }
```

**2. Numeric condition operators**: NumericEquals, NumericNotEquals, NumericLessThan, NumericLessThanEquals, NumericGreaterThan, NumericGreaterThanEquals.

For example, allow access any bucket that  the requester can list up to 10 object.


```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "s3:ListBucket",
    "Resource": "arn:aws:s3:::*",
    "Condition": {"NumericLessThanEquals": {"s3:max-keys": "10"}}
  }
}
```

**3. Date condition operators**: DateEquals, DateNotEquals, DateLessThan, DateLessThanEquals, DateGreaterThan, DateGreaterThanEquals.

For example, this condition specifies that the temporary security credentials used to make the request were issued in 2020.

```
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "iam:*AccessKey*",
    "Resource": "arn:aws:iam::account-id:user/*",
    "Condition": {"DateGreaterThan": {"aws:TokenIssueTime": "2020-01-01T00:00:01Z"}}
  }
}
```

**4. Boolean condition operators**: Bool.

Example deny all s3 that contents request is not over SSL.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "BooleanExample",
      "Action": "s3:*",
      "Effect": "Deny",
      "Resource": [
        "arn:aws:s3:::DOC-EXAMPLE-BUCKET",
        "arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
```

**5. IP address condition operators**: restrict access based on comparing a key to an IPv4 or IPv6 address or range of IP addresses.

| Condition operator | Description |
| -------- | -------- | -------- |
| IpAddress | The specified IP address or range |
| NotIpAddress | All IP addresses except the specified IP address or range |

<br />

For example, allow only request come from the IP range 203.0.113.0 to 203.0.113.255.

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "iam:*AccessKey*",
    "Resource": "arn:aws:iam::account-id:user/*",
    "Condition": {"IpAddress": {"aws:SourceIp": "203.0.113.0/24"}}
  }
}
```

### IAM Policies Variable and Tags
Use policy variables as placeholders when you don't know the exact value of a resource or condition key when you write the policy.

For example, write policies allow each user to have access to his or her own objects in an Amazon S3 bucket, but you don't want to create a separate policy for each user.

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": ["s3:ListBucket"],
      "Effect": "Allow",
      "Resource": ["arn:aws:s3:::mybucket"],
      "Condition": {"StringLike": {"s3:prefix": ["${aws:username}/*"]}}
    },
    {
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": ["arn:aws:s3:::mybucket/${aws:username}/*"]
    }
  ]
}
```

Access username for each user with `${aws:username}`.

Use tags based when you want allow access your resource base on custom attributes. For example, if you use resource tag env=dev.


```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": ["s3:ListBucket"],
      "Effect": "Allow",
      "Resource": ["arn:aws:s3:::mybucket"],
      "Condition": {"StringLike": {"aws:ResourceTag/env": "dev"}}
    }
  ]
}
```

## IAM Roles vs Resource Based Policies
AWS allows granting cross-account access to AWS resources, which can be done using IAM Roles or Resource Based policies.

With IAM Roles allow you use a role as proxy to access resource.

And Resource Based Policies allow you attach a policy directly to the resource that you want to share, instead of using a role as a proxy.

Some resource support Resource Based Policies:
+ Amazon S3 buckets.
+ Amazon Simple Notification Service (Amazon SNS) topics.
+ Amazon Simple Queue Service (Amazon SQS) queues.

## IAM Permission Boundaries
Support for users and roles (not groups). This is advanced feature to set the maximun permission an IAM entity can get.

An entity's permissions boundary allows it to perform only the actions that are allowed by both its identity-based policies and its permissions boundaries. Identity-based policies grant permission to the entity, and permissions boundaries limit those permissions.

![image.png](https://images.viblo.asia/d9e40e1a-9b51-472c-81c4-d0ea041c4883.png)

## End
End note about IAM.