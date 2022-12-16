Create an Amazon API Gateway integration with AWS WAF

This pattern in CDK offers a example to generate an Amazon API Gateway with a greedy proxy ("{proxy+}") and "ANY" method from the specified path.
This means it will accept by default any method and any path. The Lambda function is configured for VPC access and returns only the path.

![](https://images.viblo.asia/8ba0f95d-6dcd-4b12-a619-cf2ed8100a29.png)

```
import { CfnWebACL, CfnWebACLAssociation } from '@aws-cdk/aws-wafv2';
import * as cdk from "@aws-cdk/core";
 
export class WafStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);
 
        // const CustomHeader = new cdk.CfnParameter(this, "CustomHeader", {
        //     type: "String",
        //     default: "x-key"
        // });
 
        //Web ACL
        const APIGatewayWebACL = new CfnWebACL(this, "APIGatewayWebACL", {
            name: "demo-api-gateway-webacl",
            description: "This is WebACL for Auth APi Gateway",
            scope: "REGIONAL",
            defaultAction: { block: {} },
            visibilityConfig: {
                metricName: "demo-APIWebACL",
                cloudWatchMetricsEnabled: true,
                sampledRequestsEnabled: true
            },
            rules: [

                {
                    name: "demo-rateLimitRule",
                    priority: 20,
                    action: { block: {} },
                    visibilityConfig: {
                        metricName: "demo-rateLimitRule",
                        cloudWatchMetricsEnabled: true,
                        sampledRequestsEnabled: false
                    },
                    statement: {
                        rateBasedStatement: {
                            aggregateKeyType: "IP",
                            limit: 100
                        }
                    }
                },
                {
                    name: `demo-api-auth-gateway-geolocation-rule`,
                    priority: 30,
                    action: { allow: {} },
                    visibilityConfig: {
                        metricName: `demo-AuthAPIGeoLocationUS`,
                        cloudWatchMetricsEnabled: true,
                        sampledRequestsEnabled: false
                    },
                    statement: {
                        geoMatchStatement: {
                            countryCodes: ['US']
                        }
                    }
                },
                {
                    name: `demo-api-auth-gateway-sqli-rule`,
                    priority: 40,
                    action: { block: {} },
                    visibilityConfig: {
                        metricName: `demo-APIAuthGatewaySqliRule`,
                        cloudWatchMetricsEnabled: true,
                        sampledRequestsEnabled: false
                    },
                    statement: {
                        orStatement: {
                            statements: [{
                                sqliMatchStatement: {
                                    fieldToMatch: {
                                        allQueryArguments: {}
                                    },
                                   textTransformations: [{
                                        priority: 1,
                                        type: "URL_DECODE"
                                    },
                                    {
                                        priority: 2,
                                        type: "HTML_ENTITY_DECODE"
                                    }]
                                }
                            },
                            {
                                sqliMatchStatement: {
                                    fieldToMatch: {
                                        body: {}
                                    },
                                    textTransformations: [{
                                        priority: 1,
                                        type: "URL_DECODE"
                                    },
                                    {
                                        priority: 2,
                                        type: "HTML_ENTITY_DECODE"
                                    }]
                                }
                            },
                            {
                                sqliMatchStatement: {
                                    fieldToMatch: {
                                        uriPath: {}
                                    },
                                    textTransformations: [{
                                        priority: 1,
                                        type: "URL_DECODE"
                                    }]
                                }
                            }]
                        }
                    }
                },
                {
                    name: `demo-detect-xss`,
                    priority: 60,
                    action: { block: {} },
                    visibilityConfig: {
                        metricName: `demo-detect-xss`,
                        cloudWatchMetricsEnabled: true,
                        sampledRequestsEnabled: false
                    },
                    statement: {
                        orStatement: {
                            statements: [
                                {
                                    xssMatchStatement: {
                                        fieldToMatch: {
                                            uriPath: {}
                                        },
                                        textTransformations: [{
                                            priority: 1,
                                            type: "URL_DECODE"
                                        },
                                        {
                                            priority: 2,
                                            type: "HTML_ENTITY_DECODE"
                                        }]
                                    }
                                },
                                {
                                    xssMatchStatement: {
                                        fieldToMatch: {
                                            allQueryArguments: {}
                                        },
                                        textTransformations: [{
                                            priority: 1,
                                            type: "URL_DECODE"
                                        },
                                        {
                                            priority: 2,
                                            type: "HTML_ENTITY_DECODE"
                                        }]
                                    }
                                },
                               
                            ]
                        }
                    }
                }
            ]
        });
 
        // Web ACL Association
        // const APIGatewayWebACLAssociation = 
        new CfnWebACLAssociation(this, "APIGatewayWebACLAssociation", {
            webAclArn: APIGatewayWebACL.attrArn,
            resourceArn: cdk.Fn.join("", ["arn:aws:apigateway:us-east-1::/restapis/", cdk.Fn.importValue("demorestapiid"), "/stages/prod", ])
        });
    }
}
```
# Amazon API Gateway integration with WAF

This pattern in CDK offers a example to generate an Amazon API Gateway with a greedy proxy ("{proxy+}") and "ANY" method from the specified path, meaning it will accept by default any method and any path. The VPC Lambda function provided in JavaScript only returns the path.

Learn more about this pattern at Serverless Land Patterns: https://serverlessland.com/patterns/apigw-waf-cdk

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS Pricing page](https://aws.amazon.com/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

## Requirements

* [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and log in. The IAM user that you use must have sufficient permissions to make necessary AWS service calls and manage AWS resources.
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed and configured
* [Git Installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node and NPM](https://nodejs.org/en/download/) installed
* [AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/latest/guide/cli.html) (AWS CDK) installed

## Deployment Instructions

1. Create a new directory, navigate to that directory in a terminal and clone the GitHub repository:
    ```bash
    git clone https://github.com/aws-samples/serverless-patterns
    ```
2. Change directory to the pattern directory its source code folder:
    ```bash
      cd apig-waf/src
    ```
3. From the command line, use npm to install the development dependencies:
    ```bash
      npm install
    ```
4. To deploy from the command line use the following:
    ```bash
      npx cdk bootstrap aws://accountnumber/region
      npx cdk deploy --app 'ts-node .' --all
    ```

## Testing


  *  Locate WAFAPIGatewayApi.ApiUrl from output printed by cdk, this is the api endpoint to be invoked
    In a browser

    ```https://<api_id>.execute-api.<region>.amazonaws.com/prod```

    You should see: ```Success path: "/"```



## Cleanup
 
1. From the command line, use the following in the source folder
    ```bash
    npx cdk destroy --app 'ts-node .' --all
    ```
2. Confirm the removal and wait for the resource deletion to complete.