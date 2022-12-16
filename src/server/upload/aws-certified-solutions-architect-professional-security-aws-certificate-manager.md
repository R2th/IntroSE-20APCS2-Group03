## Introduction
A quick note about AWS Certificate Manager. This post is a short note from the course Ultimate AWS Certified Solutions Architect Professional by Stephane Maarek. The only purpose of this post is a summary, if you want detailed learning, please buy a course by Stephane Maarek.

![image.png](https://images.viblo.asia/b45c417a-fe2d-4191-ab1a-14ed72f5e052.png)

## AWS Certificate Manager
AWS Certificate Manager (ACM) handles the complexity of creating, storing, and renewing public and private SSL/TLS certificates and keys that protect your AWS websites and applications.

ACM certificates can secure singular domain names, multiple specific domain names, wildcard domains, or combinations of these. ACM wildcard certificates can protect an unlimited number of subdomains.

## Certificate Manager Options
AWS offers two options to customers deploying managed certificates:
+ AWS Certificate Manager (ACM) — This service is for enterprise customers who need a secure web presence using TLS.
+ ACM Private CA — This service is for enterprise customers building a Public Key Infrastructure (PKI) inside the AWS cloud and is intended for private use within an organization.

## Services integrated with ACM
AWS Certificate Manager loads SSL certificates on the following integrations:
+ **Elastic Load Balancing**: ACM is integrated with Elastic Load Balancing to deploy ACM certificates on the load balancer. For more information about load balancing, see the [Elastic Load Balancing User Guide](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/).

![image.png](https://images.viblo.asia/b7f20aef-9ba4-4fdc-a3e7-efbb31c77b7e.png)

+ **Amazon CloudFront**: ACM is integrated with CloudFront to deploy ACM certificates on the CloudFront distribution. For more information about CloudFront, see the Amazon [CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/).
+ Amazon API Gateway: To set up a custom domain name for AWS API Gateway, you must provide an SSL/TLS certificate. You can use ACM to generate or import the certificate. For more information about Amazon API Gateway, see the [Amazon API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/).

Other [integrated AWS services](https://docs.aws.amazon.com/acm/latest/userguide/acm-services.html).

## ACM - Good to know
Possibility of creating public certificates:
+ Must verify public DNS.
+ Must be issued by a trusted public certificate authority (CA).

Possibility of creating private certificates:
+ For your internal applications.
+ You create your own private CA.
+ Your applications must trust your private CA.

Certificate renewal:
+ Automatically done if generated provisioned by ACM.
+ Any manually uploaded certificates must be renewed manually and re-uploaded.

ACM is a **regional** service:
+ To use with a global application (multiple ALB for example), you need to issue an SSL certificate in each region where your application is deployed.
+ You cannot copy certs across regions.

## End
End short note about AWS Certificate Manager.