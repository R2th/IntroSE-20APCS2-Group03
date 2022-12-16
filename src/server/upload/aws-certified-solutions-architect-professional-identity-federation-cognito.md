## Introduction
A quick note about AWS Identity Federation & Cognito. This post is a quick note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a Stephane Maarek's course.

![image.png](https://images.viblo.asia/b278091f-4308-4b68-a643-ac43b5f06381.png)

## Identity Federation
Give users outside of AWS permission to access AWS resources in your account. We don't need to create an IAM user because we want to manage users outside AWS.

![image.png](https://images.viblo.asia/0ed81f25-5a8a-4d87-9bb5-864bfca2ac02.png)

Identity Federation work like that:
+ First, we set the trust relationship between Identity Provider and AWS. We tell AWS that it's fine to get an identity from this Provider.
+ Then the user performs a login to Identity Provider and receives back temporary credentials for AWS.
+ The user will access AWS using these temporary credentials.

![image.png](https://images.viblo.asia/0077b6b8-1169-4e4d-9e07-b14164aa638d.png)

### Use cases
1. We build the application (web/app) that needs access to AWS resources. For example, we need to build a web app that allows only login users can upload files to the AWS S3 bucket.

![image.png](https://images.viblo.asia/ae982511-1a57-4e38-8041-b3df05d505f8.png)

2. A corporate has its own identity system and they want to use its system. For example, a corporate use a window server and have an Active Directory identity system.

![image.png](https://images.viblo.asia/845f5784-879d-41b9-951d-0a6ddccd4e6c.png)

### Identity Federation implement
Identity Federation have some way to implement:
+ SAML 2.0 Federation.
+ Custom Identity Broker.
+ Web Identity Federation.
+ Single Sign-On (SSO).

## SAML 2.0 Federation
SAML stand for Security Assertion Markup Language 2.0 (SAML 2.0). Its primary role in online security is that enable you to access multiple web applications using one set of login credentials.

Support integration with Microsoft Active Directory Federation Service (ADFS) or any SAML 2.0 that is compatible with the identity provider (IdP) with AWS.

To receive temporary credentials, the identity provider uses the STS API AssumeRoleWithSAML.

**Note, SAML is the old way, and AWS SSO Federation is the new and simpler way.** We will talk about this later.

### Use SAML 2.0 Federation to receive credentials for AWS API Access
For example, The user login to Identity Provider uses SAML 2.0 and receives back temporary credentials to access the S3 bucket.

![image.png](https://images.viblo.asia/37c7acd6-41b0-4753-bbe1-59aa93144a55.png)

1. The user performs authentication to the IdP.
2. IdP will verify the user through an Identity Store.
3. Return SAML Assertion if login is successful.
4. The user can call the STS API AssumeRoleWithSAML, and STS will verify the assertion and return back temporary credentials if the assertion is trusted.
5. The user can access the S3 bucket with temporary credentials.

### Use SAML 2.0 Federation to receive credentials for AWS Console Access
The left side is similar to the above example, but the right side has a little different. We use SAML 2.0 Federation to access AWS Console.

![image.png](https://images.viblo.asia/b190492e-0bcb-407f-9e6d-37f45ca0a8a3.png)

1. The user performs authentication to the IdP.
2. IdP will verify the user through an Identity Store.
3. Return SAML Assertion if login is successful.
4. The user post to the AWS sign-in URL that ends with `/saml`.
5. Request temporary credentials.
6. Return back to the user a sign-in URL.
7. User redirects to AWS Console.

### Use SAML 2.0 Federation with Active Directory
The right side is similar to the above example, but the left side has a little different. We use SAML 2.0 Federation with Active Directory to access AWS Console.

![image.png](https://images.viblo.asia/c0907a01-deef-4517-8143-bfc4652d2c7d.png)

## Custom Identity Broker
Use only if Identity Provider is not compatible with SAML 2.0, the broker application authenticates users, requests temporary credentials for users from AWS, and then provides them to the user to access AWS resources.

![image.png](https://images.viblo.asia/e00a4944-63a1-48ae-8dca-673d9e080808.png)

1. The user browses to a URL and accesses a custom identity broker.
2. Identity Broker authenticates users.
3. If the user is able to log in, Identity Broker will request temporary credentials.
4. Identity Broker return token or URL back to the user.
5. Users use tokens or URLs to access AWS resources.

This scenario is similar to the previous one (a mobile app that uses a custom authentication system), except that the applications that need access to AWS resources all run within the corporate network, and the company has an existing authentication system.

**Note, Custom Identity Broker is the old way, and AWS SSO Federation is the new and simpler way.**

## Web Identity Federation
With web identity federation, you don't need to create custom sign-in code or manage your own user identities. Instead, users of your app can sign in using a well-known external identity provider (IdP), such as Login with Amazon, Facebook, Google, or any other OpenID Connect Compatible IdP.

### Without Cognito (Not recommended by AWS)

![image.png](https://images.viblo.asia/beecb47c-c9f7-413e-9711-cf320edabf09.png)

1. Client login into the Third-Party Identity Provider.
2. The Web Identity Token returns back to the clients.
3. The client will call an STS AssumeRoleWithWebIdentity API with Web Identity Token to receive temporary credentials.
4. The STS returns to the client temporary credentials.
5. Client access AWS resources.

### With Cognito (Recommended by AWS)
With Cognito, it's a little bit more secure and more simple.

![image.png](https://images.viblo.asia/6b907045-131a-434e-811f-42f3822bdc10.png)

1. Client login into the Third-Party Identity Provider.
2. The ID Token returns to the clients.
3. The app uses Amazon Cognito API operations to exchange the Login with ID Token.
4. Amazon Cognito returns Cognito Token to the client.
5. The app requests temporary security credentials from AWS STS, passing the Amazon Cognito token.
6. STS returns temporary credentials to the client.
7. The temporary security credentials can be used by the app to access any AWS resources.

## End
End quick note about AWS Identity Federation & Cognito.