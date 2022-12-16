## Introduction
A quick note about AWS STS This post is a quick note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a Stephane Maarek's course.

## STS
AWS Security Token Service (AWS STS) is the service that is so important in AWS, it allows IAM user or federated users access your AWS resources by request temporary credentials.

AWS STS is a web service that you can call via API to get temporary credentials, and then use them explicitly to make calls to AWS services.

![image.png](https://images.viblo.asia/4c46ae3e-0aae-42ec-9ddd-a2715093effb.png)

### Benefit for using temporary credentials
You do not have to distribute or embed long-term AWS security credentials with an application.

You can provide access to your AWS resources to users without having to define an AWS identity for them.

The temporary security credentials have a limited lifetime, after temporary security credentials expire, they cannot be reused, the user can request new credentials.

### AWS STS and AWS regions
AWS STS is a global service that has a default endpoint at `https://sts.amazonaws.com`, but you can use Regional AWS STS endpoints instead of the global endpoint to reduce latency, for example `https://sts.us-west-2.amazonaws.com`.

### Use STS to get temporary credentials
First, we define IAM role within your account or cross-accounts that we want to assume role.

![image.png](https://images.viblo.asia/c6044401-bb5d-4a10-850a-d4a817c5502b.png)

Then we define which principles can access this IAM role. For example, this rule only allow lambda and edgelambda to assume role.

```json
{
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : {
          "Service" : [
            "edgelambda.amazonaws.com",
            "lambda.amazonaws.com",
          ]
        },
        "Action" : "sts:AssumeRole",
      }
    ]
}
```

Then use AWS STS API to retrieve credential via AssumeRole API. For examples session policy passed with AssumeRole API call.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "*"
    }
  ]
}
```

And then lamda will retrieve temporary credentials that can list all S3 bucket in your AWS resources. Temporary cerdentials can be valid between 15 minutes to 12 hour.

![image.png](https://images.viblo.asia/0691e432-aa33-44e7-b214-b46906043d24.png)

## Situation use STS
Provide access for an IAM user in one AWS account to access resource in another account that you own both.

Provide access for an IAM user in AWS account owned by 3rd parties.

Provide access for AWS service to other AWS resources.

Provide access for externally authenticated users (identity federation).

### Provide access for an IAM user in one AWS account to access resource in another account that you own both
Example we want account A can have permission to terminate EC2 instance in account B.

![image.png](https://images.viblo.asia/02dc71dd-e16d-4831-ac03-e96598762821.png)

First we define role in account B, then we define which principles can access this IAM role is account A, then account A call STS API to retrieve temporary credential for terminate EC2 instance in account B.

### Provide access for an IAM user in AWS account owned by 3rd parties.
When third parties require access to your organization's AWS resources, you can use roles to delegate access to them, you can grant these third parties access to your AWS resources without sharing your AWS security credentials.

![](https://images.viblo.asia/56d115bc-9223-417f-a138-c71880462949.png)

Third parties must provide the following information for you:
+ The third party's AWS account ID, we specify their AWS account ID as the principal when you define the trust policy for the role.
+ An external ID to uniquely associate with the role. The external ID can be any secret identifier that is known by you and the third party.
+ The permissions that the third party requires to work with your AWS resources.

For example.

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Principal": {
      "AWS": "Example Corp's AWS Account ID"
    },
    "Action": "sts:AssumeRole",
    "Condition": {
      "StringEquals": {
        "sts:ExternalId": "12345"
      }
    }
  }
}
```

**Please read about [The confused deputy problem](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html).**

## STS important APIs
1. AssumeRole API: access a role within your account or cross-account.
2. AssumeRoleWithSAML: return temporary credentials for users logged with SAML.
3. AssumeRoleWithWebIdentity: return temporary credentials for users logged in a mobile or web application with a web identity provider.
4. GetSessionToken: for MFA from a user or AWS account root user.
5. GetFederationToken: returns temporary credentials for a federated user, usually a proxy application that gets temporary security credentials on behalf of distributed applications inside a corporate network.

## End
End note about STS.