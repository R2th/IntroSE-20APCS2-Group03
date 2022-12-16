## Introduction
AWS Certified Solutions Architect Professional - Security - SSM Parameter Store
A quick note about AWS Systems Manager Parameter Store. This post is a quick note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a course by Stephane Maarek.

![image.png](https://images.viblo.asia/5a72d9c7-8a2d-48bc-bad4-563d980a4eff.png)
*I<div align="center">mage by [sunilkumarmedium](https://dev.to/sunilkumarmedium)*</div>

## AWS Systems Manager Parameter Store
The AWS service provides secure storage for configuration and secrets. You can store data such as passwords, database strings, and license codes as parameter values.
The data stored in Parameter Store can be encrypted with AWS KMS.

Parameter Store offers these benefits:
+ Improve your security.
+ Serverless.
+ Version tracking of configuration and secrets.
+ Store parameters reliably.
+ Control and audit access at granular levels.

For example how to use SSM Parameter Store in the application.

![image.png](https://images.viblo.asia/b8c1da70-be0d-4903-be42-0bf876a833a5.png)
*<div align="center">Image by Stephane Maarek</div>*

1. You store data in SSM as plaintext or encrypted strings.
2. Your application retrieves parameters by using the SDK.
3. The Parameter Store will check with IAM permissions to make sure that we can get them.
4. The Parameter Store returns data to you.

## Types of parameters
Parameter Store provides support for three types of parameters: String, StringList, and SecureString.

### String
Data stored as String, By default, String parameters consist of any block of text you enter, for example:
+ xyzabc
+ Hoàng Phúc International
+ <img src="images/hoang-phuc-logo.png"/>

### StringList
StringList parameters contain a comma-separated list of values, as shown in the following examples.
+ June,July,August
+ ElasticSearch, Logtash, Kibana

### SecureString
SecureString parameters are any sensitive data that needs to be stored in encryption format. SecureString data is encrypted and decrypted using an AWS KMS key.

## Standard and advanced parameters tiers
The Parameter Store has two tiers of parameters, including *standard parameters* and *advanced parameters*.

![image.png](https://images.viblo.asia/c216738a-4ef1-4d18-a08e-1555c4fa8053.png)
*<div align="center">Image by Stephane Maarek</div>*

The standard parameters have a total number of parameters is 10,000. As for the advanced parameters is 100,000.

And the maximum size of a value of the standard parameters is 4KB, as for the advanced parameters is double.

No storage pricing for the standard parameters.

**You can change a standard parameter to an advanced parameter at any time, but you can't revert an advanced parameter to a standard parameter**. This is because reverting an advanced parameter to a standard parameter would cause the system to truncate the size of the parameter from 8 KB to 4 KB, resulting in data loss.

The advanced parameters have integrated with Parameters Policies.

## Parameters Policies (for advanced parameters)
Allow assigning a TTL to a parameter (expiration date) to force updating or deleting sensitive data such as passwords.

Can assign multiple policies at a time.

Parameter Store has three types of policies: Expiration, ExpirationNotification, and NoChangeNotification.

### Expiration
This policy deletes the parameter. You can specify a specific date and time by using either the `ISO_INSTANT` format or the `ISO_OFFSET_DATE_TIME` format, for example.

```json
{
    "Type": "Expiration",
    "Version": "1.0",
    "Attributes": {
        "Timestamp": "2018-12-02T21:34:33.000Z"
    }
}
```

### NoChangeNotification
This policy notifies you about the expiration. By using this policy, you can receive notifications before the expiration time is reached, in units of days or hours, for example.

```json
{
    "Type": "ExpirationNotification",
    "Version": "1.0",
    "Attributes": {
        "Before": "15",
        "Unit": "Days"
    }
}
```

### NoChangeNotification
This policy notifies if a parameter has not been modified for a specified period of time. This policy type is useful when a password needs to be changed within a period of time, for example.

```json
{
    "Type": "NoChangeNotification",
    "Version": "1.0",
    "Attributes": {
        "After": "20",
        "Unit": "Days"
    }
}
```

## End
End quick note about AWS Systems Manager Parameter Store