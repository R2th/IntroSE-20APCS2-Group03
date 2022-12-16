Create a REST API Gateway with an API Key associated with a Usage Plan.

An API Key is created and added to a Usage Plan (no throttling, no quota). This Usage Plan is then associated with the Prod stage of a REST API.
The GET method of this REST API is configured to require an API Key associated with the Usage Plan.
If the API key is provided, then API Gateway allows the request and sends it to the Lambda integration.
If the API is not provided, API returns a 403 Forbidden.

![](https://images.viblo.asia/d3162351-e357-4f87-bab6-029a7b017dfd.png)


```
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Serverless patterns - Amazon API Gateway REST API with API Key

Globals:
  Function:
    Runtime: nodejs14.x
    CodeUri: src/

Resources:
  
  # REST API
  AppApi:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: apigw-api-key
      Description: API key REST API demo

  # GET Method
  RootMethodGet:
    Type: AWS::ApiGateway::Method
    Properties:
      RestApiId: !Ref AppApi
      ResourceId: !GetAtt AppApi.RootResourceId
      HttpMethod: GET
      AuthorizationType: NONE
      ApiKeyRequired: True
      Integration:
        Type: AWS_PROXY
        IntegrationHttpMethod: POST
        Uri: !Join ['', ['arn:aws:apigateway:', !Ref AWS::Region, ':lambda:path/2015-03-31/functions/', !GetAtt AppFunction.Arn, '/invocations']]

  # Dummy function
  AppFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.handler

  # Permission to allow Lambda invocation from API Gateway
  AppFunctionPermission:
    Type: AWS::Lambda::Permission
    Properties:
      FunctionName: !Ref AppFunction
      Action: lambda:InvokeFunction
      Principal: apigateway.amazonaws.com
      SourceArn: !Sub arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${AppApi}/*/GET/

  UsagePlan:
    Type: AWS::ApiGateway::UsagePlan
    Properties: 
      ApiStages: 
        - ApiId: !Ref AppApi
          Stage: !Ref Stage
  
  ApiKey:
    Type: AWS::ApiGateway::ApiKey
    Properties: 
      Enabled: True

  UsagePlanKey:
    Type: AWS::ApiGateway::UsagePlanKey
    Properties:
      KeyId: !Ref ApiKey
      KeyType: API_KEY
      UsagePlanId: !Ref UsagePlan

  Deployment:
    Type: AWS::ApiGateway::Deployment
    DependsOn:
    - RootMethodGet
    Properties:
      RestApiId: !Ref AppApi
  
  Stage:  
    Type: AWS::ApiGateway::Stage
    Properties:
      StageName: Prod
      RestApiId: !Ref AppApi
      DeploymentId: !Ref Deployment

Outputs:

  # API Gateway endpoint to be used during tests
  AppApiEndpoint:
    Description: API Endpoint
    Value: !Sub "https://${AppApi}.execute-api.${AWS::Region}.amazonaws.com/Prod"
```

# Amazon API Gateway REST API with API Key

The SAM template deploys an Amazon API Gateway REST API endpoint that uses an API Key. 

An API Key is created and added to a Usage Plan (no throttling, no quota). This Usage Plan is then associated with the Prod stage of a REST API. The GET method of this REST API is configured to require an API Key associated with the Usage Plan. If the API key is provided, then API Gateway allows the request and sends it to the integration Lambda. If the API is not provided, API returns a 403 Forbidden.

Note: when deploying this pattern, *CAPABILITY_IAM* is required.

Learn more about this pattern at Serverless Land Patterns: https://serverlessland.com/patterns/apigw-api-key-sam

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS Pricing page](https://aws.amazon.com/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

## Requirements

* [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and log in. The IAM user that you use must have sufficient permissions to make necessary AWS service calls and manage AWS resources.
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed and configured
* [Git Installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [AWS Serverless Application Model](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) (AWS SAM) installed

## Deployment Instructions

1. Create a new directory, navigate to that directory in a terminal and clone the GitHub repository:
    ``` 
    git clone https://github.com/aws-samples/serverless-patterns
    ```
2. Change directory to the pattern directory:
    ```
    cd apigw-api-key
    ```
3. From the command line, use AWS SAM to deploy the AWS resources for the pattern as specified in the template.yml file:
    ```
    sam deploy -g
    ```
1. During the prompts:
    * Enter a stack name
    * Select the desired AWS Region
    * Allow SAM to create roles with the required permissions if needed.

    Once you have run guided mode once, you can use `sam deploy` in future to use these defaults.

1. Note the outputs from the SAM deployment process. These contain the resource names and/or ARNs which are used for testing.

## Testing

The stack will output the **api endpoint**. You can retrieve the API key contents from the API Gateway console. Make an HTTP request to the endpoint using *curl* including the API key in the headers to test the API Key REST API.
   
```
curl -H "x-api-key:{API_key}" https://{apiId}.execute-api.{region}.amazonaws.com/Prod
```

## Cleanup
 
1. Delete the stack
    ```bash
    sam delete
    ```
2. Confirm the stack has been deleted
    ```bash
    aws cloudformation list-stacks --query "StackSummaries[?contains(StackName,'STACK_NAME')].StackStatus"
    ```