## Introduction
A quick note about AWS Single Sign-On. This post is a quick note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a course by Stephane Maarek.

![image.png](https://images.viblo.asia/8e383904-e558-41dd-9eda-fdc32b9ea140.png)

## AWS Single Sign-On
AWS Single Sign-On is a cloud-based single sign-on (SSO) service that makes it easy to centrally manage SSO access to all of your AWS accounts and cloud applications.

With AWS SSO, you can easy to get temporary credentials to access AWS resources compared to the older way using SAML 2.0 Federation. For example.

![image.png](https://images.viblo.asia/299cc922-eb2a-45fc-86eb-794335b4b789.png)

On the right-hand side, we use SAML 2.0 Federation, which is seen as more complex.
1. The user performs authentication to the IdP.
2. IdP will verify the user through an Identity Store.
3. Return SAML Assertion if login is successful.
4. The user can call the STS API AssumeRoleWithSAML, and STS will verify the assertion and return temporary credentials if the assertion is trusted.
5.The user can access the AWS resources with temporary credentials.

So on the left-hand side, which is seen as easier, we use AWS SSO to integrate with an identity store, and then our client will sign into SSO, then we’ll retrieve credentials directly back from SOO after verifying the login, and then the client can access AWS resource. AWS SSO hides a lot of complexity of what happens behind the scenes.

## AWS SSO features
### Integration with AWS Organizations
AWS SSO is integrated deeply with AWS Organizations and AWS API operations, it helps you manage SSO access and user permissions across all your AWS accounts in AWS Organizations.

### SSO access to your AWS accounts and cloud applications
AWS SSO makes it simple for you to manage SSO across all your AWS accounts, cloud applications, AWS SSO-integrated applications, and custom SAML 2.0–based applications, without custom scripts or third-party SSO solutions.

### Create and manage users and groups in AWS SSO
When you enable the service for the first time, we create a default store for you in AWS SSO. You can use this store to manage your users and groups directly in the console, and you can quickly create users and then easily organize them into new groups, all within the console.

If you prefer, you can connect to an existing AWS Managed Microsoft AD directory and manage your users with standard Active Directory management tools provided in Windows Server.

### Compatible with commonly used cloud applications
AWS SSO supports commonly used cloud applications such as Salesforce, Box, and Office 365. This cuts the time needed to set up these applications for SSO by providing application integration instructions.

## AWS SSO with AD
The example AWS SSO integrates with Active Directory.

![image.png](https://images.viblo.asia/e908ae5a-c9d6-4239-b279-44c6ab8fc076.png)

1. Set up two-way trust between AWS SSO and AD.
2. Users sign into the SSO portal and make sure that they are logged into your AD.
3. Users get SSO to access accounts within your organization or business applications.

## End
End a quick note about AWS Single Sign-On.