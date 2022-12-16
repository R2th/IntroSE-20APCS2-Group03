# Overview
If you use OpenID Connect federation IAM Role in GitHub Actions, you can use GitHub Actions just by issuing IAM User and AccessKey / SecretKey for Github Actions and creating IAM Role without embedding `secrets`.

The mechanism was easy to understand in this picture.
https://github.com/glassechidna/ghaoidc

This article shares how to write an IAM Role in CDK / Terraform and what i have learned by practicing at this point.

# Explanation

Until now, when accessing AWS from workflow, I think that the AccessKey / SecretKey embedded in the secrets of the github repository was set as credential to run the workflow as shown below.

```
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-west-2
```
This is the story that you can get the credit tail to access AWS from workflow using OpenID Connect token as shown below.
```
permissions:
  id-token: write
  contents: read
steps:
  - name: Configure AWS
    run: |
      export AWS_ROLE_ARN=arn:aws:iam::0123456789012:role/ExampleGithubRole
      export AWS_WEB_IDENTITY_TOKEN_FILE=/tmp/awscreds
      export AWS_DEFAULT_REGION=us-east-1

      echo AWS_WEB_IDENTITY_TOKEN_FILE=$AWS_WEB_IDENTITY_TOKEN_FILE >> $GITHUB_ENV
      echo AWS_ROLE_ARN=$AWS_ROLE_ARN >> $GITHUB_ENV
      echo AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION >> $GITHUB_ENV

      curl -H "Authorization: bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" "$ACTIONS_ID_TOKEN_REQUEST_URL" | jq -r '.value' > $AWS_WEB_IDENTITY_TOKEN_FILE
```
You no longer need to create an IAM User for Github Actions, issue an AccessKey / SecretKey, or embed creditentail secrets on github.

Details are as described in the AWS federation comes to GitHub Actions article.

# What i have learned trying using it:
* Some workflows provided by Github Market currently work and some do not (not supported).
    1. OK: aws-actions/amazon-ecr-login @ v1, aws-actions/amazon-ecs-deploy-task-definition @ v1
    2. Doesn't work: aws-actions/aws-codebuild-run-build @ v1 (No credentials. Try adding @ aws-actions / configure-aws-credentials earlier in your job to set up AWS credentials.)


        * [I reported  an issue → and was told a way to workaround](https://github.com/aws-actions/aws-codebuild-run-build/issues/74)

* Workflows that exceed 10 minutes will result in an error due to the expiration of the token (after 10 minutes, if you retake the Token again, it will work)
* Works with self hosted runner

## Workaround for workflow provided on Github Market using @aws-actions/configure-aws-credentials

I was taught a way to workaround in the above issue.
```
- name: Get AWS Credentials Using OIDC
  id: aws_sts_creds
  run: |
    export AWS_ROLE_ARN=arn:aws:iam::0123456789012:role/ExampleGithubRole
    export AWS_WEB_IDENTITY_TOKEN_FILE=/tmp/awscreds
    export AWS_DEFAULT_REGION=us-east-1

    curl -H "Authorization: bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" "$ACTIONS_ID_TOKEN_REQUEST_URL&audience=sigstore" | jq -r '.value' > $AWS_WEB_IDENTITY_TOKEN_FILE

    aws sts assume-role-with-web-identity \
      --role-arn $AWS_ROLE_ARN \
      --role-session-name github-actions \
      --web-identity-token file://$AWS_WEB_IDENTITY_TOKEN_FILE \
      --duration-seconds 1000 > /tmp/aws-creds

    export AWS_ACCESS_KEY_ID="$(cat /tmp/aws-creds | jq -r ".Credentials.AccessKeyId")"
    export AWS_SECRET_ACCESS_KEY="$(cat /tmp/aws-creds | jq -r ".Credentials.SecretAccessKey")"
    export AWS_SESSION_TOKEN="$(cat /tmp/aws-creds | jq -r ".Credentials.SessionToken")"

    echo ::add-mask::$AWS_ACCESS_KEY_ID
    echo ::add-mask::$AWS_SECRET_ACCESS_KEY
    echo ::add-mask::$AWS_SESSION_TOKEN

    echo ::set-output name=aws_access_key_id::$AWS_ACCESS_KEY_ID
    echo ::set-output name=aws_secret_access_key::$AWS_SECRET_ACCESS_KEY
    echo ::set-output name=aws_session_token::$AWS_SESSION_TOKEN
    echo ::set-output name=aws_default_region::$AWS_DEFAULT_REGION

- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ steps.aws_sts_creds.outputs.aws_access_key_id }}
    aws-secret-access-key: ${{ steps.aws_sts_creds.outputs.aws_secret_access_key }}
    aws-session-token: ${{ steps.aws_sts_creds.outputs.aws_session_token }}
    aws-region: ${{ steps.aws_sts_creds.outputs.aws_default_region }}
```

# IAM Role for IaC
The description method of CloudFormation of IAM Role where github actions is the asset role is described in the following Blog.

https://awsteele.com/blog/2021/09/15/aws-federation-comes-to-github-actions.html

I rewrote it with CDK / Terraform.

## CDK
```
from aws_cdk import aws_iam

...

    system = "your_subsystem"
    github_owner = "your_github_owner"
    github_repo = "your_github_repo"

    # github actions IAM Role
    aws_iam_openid_connect_provider = aws_iam.OpenIdConnectProvider(
        self,
        id=f"{system}-github-actions-oidc-provider",
        url="https://vstoken.actions.githubusercontent.com",
        client_ids=["sigstore"],
        thumbprints=["a031c46782e6e6c662c2c87c76da9aa62ccabd8e"],
    )

    github_actions_role = aws_iam.Role(
        self,
        id=f"{system}-github-actions-role",
        role_name=f"{system}-github-actions-role",
        assumed_by=aws_iam.FederatedPrincipal(
            federated=aws_iam_openid_connect_provider.open_id_connect_provider_arn,
            conditions={
                "StringLike": {
                    "vstoken.actions.githubusercontent.com:sub": f'repo:{github_owner}/{github_repo}:*'
                }
            },
            assume_role_action="sts:AssumeRoleWithWebIdentity"
        )
    )
```
## Terraform
```
resource "aws_iam_openid_connect_provider" "github_actions" {
  url = "https://vstoken.actions.githubusercontent.com"
  client_id_list = ["sigstore"]
  thumbprint_list = ["a031c46782e6e6c662c2c87c76da9aa62ccabd8e"]
}

resource "aws_iam_role" "github_actions" {
  name = "${local.system}-github-actions"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "${aws_iam_openid_connect_provider.github_actions.id}"
      },
      "Condition": {
        "StringLike": {
          "vstoken.actions.githubusercontent.com:sub": "repo:${local.github_owner}/${local.github_repo}:*"
        }
      },
      "Action": "sts:AssumeRoleWithWebIdentity"
    }
  ]
}
EOF
}
```