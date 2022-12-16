Create an Amplify frontend that calls Amazon API Gateway using Cognito

This pattern explains how to deploy an AWS SAM application that includes an AWS Amplify frontend, Cognito, API Gateway and Lambda Function. It also sets environmental variables to be used by Amplify and Lambda Function.

![](https://images.viblo.asia/b1adbc6c-26d1-4f7b-9e4e-0f987a3c830f.png)

```
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  Serverless Solution
  Cognito / Api Gateway / Lambda Function / Amplify
  Environmental Variables on Amplify
  Environmental Variables on Lambda Function

#################### PARAMETERS #############################

Parameters:

  AmplifyFrontendRepository:
    Type: String
    Description: 'Amplify Frontend Repository in the format: https://<GitProviderDomain>/<user>/<repository>'
    Default: ''

  OauthToken:
    Type: String
    Description: 'Access token for git provider repository'
    NoEcho: true
    Default: ''

########################### RESOURCES ################################
Resources: 

      ##################### API #######################

  myAPI:
    Type: AWS::Serverless::Api
    Description: Main API
    Properties:
      StageName: dev
      Cors:
        AllowMethods: "'GET, OPTIONS'"
        AllowHeaders: "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
        AllowOrigin: "'*'"
        MaxAge: "'500'"
      Auth:
        AddDefaultAuthorizerToCorsPreflight: false
        DefaultAuthorizer: MyCognitoAuthorizer
        Authorizers:
          MyCognitoAuthorizer:
              UserPoolArn: !GetAtt rUserPool.Arn

##################### FUNCTIONS ################################

  ################### LAMBDA ELASTICSEARCH ######################

  myFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: lambdaExample/
      Handler: app.lambda_handler
      Runtime: python3.7
      Events:
        EmyFunction:
          Type: Api
          Properties:
            Path: /lambdaExample
            Method: get
            RestApiId:
              Ref: myAPI
      Environment: 
        Variables: 
          cognito_region: !Ref AWS::Region
          user_pools_id: !Ref rUserPool
          user_pools_web_client_id: !Ref rAmplifyCognitoClient

# INTEGRATION WITH FRONTEND ################################################################

  ## COGNITO - USER POOL / USER POOL CLIENT

  rUserPool:
    Type: AWS::Cognito::UserPool
    Properties:
      AdminCreateUserConfig:
        AllowAdminCreateUserOnly: true
      AutoVerifiedAttributes:
        - email
      Schema:
        - AttributeDataType: String
          Mutable: true
          Name: given_name
          Required: true
        - AttributeDataType: String
          Mutable: true
          Name: family_name
          Required: true
        - AttributeDataType: String
          Mutable: false
          Name: email
          Required: true
      UsernameAttributes:
        - email
      UsernameConfiguration:
        CaseSensitive: false

  rAmplifyCognitoClient:
    Type: AWS::Cognito::UserPoolClient
    Properties:
      AccessTokenValidity: 1
      AllowedOAuthFlows:
        - implicit
      AllowedOAuthFlowsUserPoolClient: true
      AllowedOAuthScopes:
        - email
        - openid
        - profile
        - aws.cognito.signin.user.admin
      CallbackURLs:
        - "http://localhost"
      EnableTokenRevocation: true
      ExplicitAuthFlows:
        - ALLOW_ADMIN_USER_PASSWORD_AUTH
        - ALLOW_CUSTOM_AUTH
        - ALLOW_USER_PASSWORD_AUTH
        - ALLOW_USER_SRP_AUTH
        - ALLOW_REFRESH_TOKEN_AUTH
      IdTokenValidity: 1
      LogoutURLs:
        - "http://localhost"
      PreventUserExistenceErrors: ENABLED
      ReadAttributes:
        - given_name
        - family_name
        - email
        - email_verified
      RefreshTokenValidity: 1
      SupportedIdentityProviders:
        - COGNITO
      TokenValidityUnits:
        AccessToken: hours
        IdToken: hours
        RefreshToken: days
      UserPoolId: !Ref rUserPool


#################################################################

#################################################################
# AMPLIFY

  rAmplifyRole:
    Type: AWS::IAM::Role
    Properties:
      # RoleName: !Sub '${AWS::StackName}'
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              Service:
                - amplify.amazonaws.com
            Action:
              - sts:AssumeRole
      Policies:
        - PolicyName: Amplify
          PolicyDocument:
            Version: 2012-10-17
            Statement:
              - Effect: Allow
                Action:
                  - "amplify:*"
                Resource: "*"

  rAmplifyApp:
    Type: AWS::Amplify::App
    Properties:
      Name: 
        !Sub '${AWS::StackName}'
      Description: Matching Tool
      CustomRules:
        - Source: '</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$)([^.]+$)/>'
          Target: '/index.html'
          Status: '200'
      EnvironmentVariables:
      #   - Name: PROJECT_NAME
      #     Value: !Ref pProjectName
        - Name: cognito_region
          Value: !Ref AWS::Region
        - Name: user_pools_id
          Value: !Ref rUserPool
        - Name: user_pools_web_client_id
          Value: !Ref rAmplifyCognitoClient
        - Name: APIURL
          Value: !Sub "https://${myAPI}.execute-api.${AWS::Region}.amazonaws.com/dev"
      Repository: !Ref AmplifyFrontendRepository
      OauthToken: !Ref OauthToken
     
      IAMServiceRole: !GetAtt rAmplifyRole.Arn

  rAmplifyBranch:
    Type: AWS::Amplify::Branch
    Properties:
      BranchName: 'main'
      AppId: !GetAtt rAmplifyApp.AppId
      Description: Branch
      EnableAutoBuild: true

# OUTPUTS #################################################################

Outputs:
  CognitoRegion:
    Description: Cognito Region
    Value: !Ref AWS::Region
    Export:
      Name: CognitoRegion

  CognitoUserPool:
    Description: Cognito User Pool
    Value: !Ref rUserPool
    Export:
      Name: CognitoUserPool

  CognitoUserPoolClient:
    Description: Cognito User Pool Client
    Value: !Ref rAmplifyCognitoClient
    Export:
      Name: CognitoUserPoolClient

  APIurl:
    Description: API url
    Value: !Sub "https://${myAPI}.execute-api.${AWS::Region}.amazonaws.com/dev"
    Export:
      Name: APIurl
```

# Integration of Amplify Frontend, Cognito, API Gateway, Lambda

This pattern explains how to deploy a SAM application that includes an AWS Amplify Frontend, Cognito, API Gateway and Lambda Function and set environmental variables to be used by Amplify and the Lambda function.

Learn more about this pattern at Serverless Land Patterns: https://serverlessland.com/patterns/amplify-apigw-lambda.

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
1. Change directory to the pattern directory:
    ```
    cd _patterns-model
    ```
1. From the command line, use AWS SAM to deploy the AWS resources for the pattern as specified in the template.yml file:
    ```
    sam deploy --guided
    ```
1. During the prompts:
    * Enter a stack name
    * Enter the desired AWS Region
    * Enter the Frontend Repository URL that will be hosted by AWS Amplify Frontend
    * Enter the OauthToken for you git provider
    * Allow SAM CLI to create IAM roles with the required permissions.

    Once you have run `sam deploy --guided` mode once and saved arguments to a configuration file (samconfig.toml), you can use `sam deploy` in future to use these defaults.

1. Note the outputs from the SAM deployment process. These contain the resource names and/or ARNs which are used for testing.

## How it works

This template deploys a full-stack application where Amplify frontend application and Lambda Function will have as environmental variables Cognito Region, Cognito User Pool ID and Cognito User Pool Client ID allowing developer to quickly develop an application with Authentication on front and backend. Template set cognito as authorizer for API Gateway, requiring the frontend app to pass json web token (JWT) to call API

## Testing

On AWS amplify Service, click on the app name (same of SAM stack name), click environment varaibles. You should be able to see 4 environmental variables created by the template.

On AWS Lambda Service, click Applications, click the application name (same of SAM stack name), click on Resource called myFunction, click configuration, click Environment variables. You should be able to see 4 environmental variables created by the template.
Execute the lambda function and check the logs. You will see a result like:
Cognito Region:  us-east-1
Cognito User Pool Id:  us-east-1_aYtONfZZZ
Cognito User Pool Client ID:  1h2rrpldfqg8lhbgej2o5s2ZZZ

## Cleanup
 
1. Delete the stack
    ```bash
    aws cloudformation delete-stack --stack-name STACK_NAME
    ```
2. Confirm the stack has been deleted
    ```bash
    aws cloudformation list-stacks --query "StackSummaries[?contains(StackName,'STACK_NAME')].StackStatus"