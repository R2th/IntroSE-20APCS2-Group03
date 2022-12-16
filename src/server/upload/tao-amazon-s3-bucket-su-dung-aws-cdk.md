![s3-cdk](https://vntechies.dev/_next/image?url=%2Fstatic%2Fimages%2Fogps%2Fs3-cdk.png&w=3840&q=75)

Hướng dẫn này sẽ giải thích những gì cần thiết để tạo một Amazon S3 bucket sử dụng AWS CDK Python.
[Mã nguồn được cung cấp tại đây](https://github.com/vntechies/008-aws-cdk-python-s3) đi kèm với tất cả các bước cần thiết để chạy và triển khai mã AWS CDK trên AWS Cloud.

Đầu tiên, bạn cần [cài đặt AWS CDK] và IAM profile cho để có thể triển khai hệ thống bằng AWS CLI.
Sau khi học cách tổng hợp code từ AWS CDK để tạo ra Amazon S3 bucket construct, bạn có thể triển khai trên AWS Cloud và dọn dẹp tài nguyên sử dụng câu lệnh AWS CDK destroy.

Dưới đây là các bước cụ thể để cài đặt, triển khai một Amazon S3 bucket sử dụng AWS CDK:

Trước khi xây dựng Amazon S3 bucket construct, bạn cần hoàn thành các bước sau để có thể chạy AWS CDK với Python

1. Cài đặt AWS CDK và Python
2. Cài đặt AWS CLI và AWS profile
3. Tạo một project AWS CDK với Python

Nếu bạn đã hoàn thành các bước này, bạn có thể bắt đầu làm từ bước số 4

## 1. Cài đặt AWS CDK

Cài đặt AWS CDK bằng npm package manager bằng câu lệnh dưới đây

```shell:shell
npm install -g aws-cdk typescript
cdk version
```

Bạn cũng có thể tham khảo bài viết [hướng dẫn chi tiết cài đặt AWS CDK](https://vntechies.dev/courses/aws/cdk/huong-dan-chi-tiet-cai-dat-aws-cdk)

## 2. Cài đặt AWS CLI và cài đặt AWS profile

AWS CLI là một công cụ dòng lệnh (command line tool) cho phép bạn tương tác với các dịch vụ của AWS thông qua terminal của bạn.
Tuỳ thuộc vào hệ điều hành mà bạn đang sử dụng, cách cài đặt có thể sẽ khác

```shell:shell
# macOS
brew install awscli

# Windows
wget https://awscli.amazonaws.com/AWSCLIV2.msi
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Linux (Ubuntu)
sudo apt install awscli
```

Để có thể truy cập vào AWS account của bạn từ AWS CLI, bạn cần thiết lập AWS Profile. Có 2 cách để bạn có thể làm điều đó:

1. Access và secret key từ IAM User
2. AWS Single Sign-on (SSO) user

Trong bài viết này, để có thể nhanh chóng thiết lập AWS Profile, chúng ta sẽ chọn cách số 1.

- Đăng nhập AWS Console
- Đi tới [IAM > Users](https://us-east-1.console.aws.amazon.com/iamv2/home)

![Đi tới IAM Users](https://vntechies.dev/_next/image?url=%2Fstatic%2Fimages%2Fassets%2Faws-cdk-s3-1.png&w=3840&q=75)

- Chọn IAM user, click Security credentials và tạo một credential mới

![Chọn IAM user, click Security credentials và tạo một credential mới](https://vntechies.dev/_next/image?url=%2Fstatic%2Fimages%2Fassets%2Faws-cdk-s3-2.png&w=3840&q=75)

- Lưu lại access key và secret key (vì đây là lần duy nhất cũng là lần cuối bạn thấy nó)
- Cài đặt AWS profile cho AWS CLI

```shell:shell
aws configure
AWS Access Key ID [None]: <insert_access_key>
AWS Secret Access Key [None]: <insert_secret_key>
Default region name [None]: <insert_aws_region>
Default output format [json]: json
```

- Thông tin vể credential của bạn sẽ được lưu tại `~/.aws/credentials` dưới profile tên [default], bạn có thể xác nhận bằng câu lệnh sau

```shell:shell
aws sts get-caller-identity
{
    "UserId": "xxx",
    "Account": "012345678901",
    "Arn": "arn:aws:iam::012345678901:user/vntechies"
}
```

## 3. Tạo một AWS CDK Python project

Sau khi cài đặt profile và các packages, bạn bắt đầu tạo project AWS CDK python để xây dựng Amazon S3 bucket construct.

- Bạn có thể tạo một project AWS CDK python bằng cách chạy câu lệnh sau tại một directory trống

```shell:shell
cdk init --language python
```

- Chạy câu lệnh sau để tạo môi trường ảo và cài đặt các package cần thiết cho python

```shell:shell
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 4. Tạo một Amazon S3 Bucket construct với AWS CDK

Sau khi init project, các các file sẽ được tạo ra dưới dạng sau

```shell:shell
./
├── README.md
├── app.py
├── aws_cdk_python_s3
│   ├── __init__.py
│   └── aws_cdk_python_s3_stack.py
├── cdk.json
├── requirements-dev.txt
├── requirements.txt
├── source.bat
└── tests
    ├── __init__.py
    └── unit
        ├── __init__.py
        └── test_aws_cdk_python_s3_stack.py
```

```python:aws_cdk_python_s3_stack.py {16,17,18,20} showLineNumbers
from constructs import Construct
from aws_cdk import (
    Stack,
    aws_iam as iam,
    aws_s3 as s3,
    aws_kms as kms,
)


class AwsCdkPythonS3Stack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        bucket = s3.Bucket(self, "VNTechies-AWS-CDK-S3-demo-bucket",
                           object_ownership=s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
                           block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
                           encryption_key=kms.Key(self, 'VNTechies-AWS-CDK-S3-demo-bucket-key'),)

        bucket.grant_read(iam.AccountRootPrincipal())
```

- `kms_key` là AWS Key Management Service được tạo mới để mã hoá dữ liệu trên s3
- `object_ownership` giúp bạn vô hiệu các [access control list (ACLs)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html)
  và người sở hữu bucket sẽ có tất cả các quyền với mọi object trong bucket này. ACLs sẽ không ảnh hưởng tới việc quản lý quyền nữa mà bucket sẽ sử dụng các policies để quản lý quyền truy cập.
  Điều này giúp đơn giản hoá cách bản quản lý và truy cập vào các objects được lưu trữ trong bucket của bạn.
- `block_public_access` các object mới sẽ mặc định ở chế độ private và sẽ không cho phép truy cập công khai (public access)
- `encryption_key` cho phép sử dụng một [Customer managed keys](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) để mã hoá các objects được lưu trên s3 bucket.
- `bucket.grant_read()` cho phép người dùng có quền root của AWS account truy cập vào bucket được tạo

## 5. Tổng hợp lại Amazon S3 Bucket với AWS CDK

Amazon S3 bucket construct đã được tạo trong stack của AWS CDK app, bước tiếp theo sẽ là tổng hợp lại thành một CloudFormation template bằng cách chạy câu lệnh cho AWS CDK Synthesize

```shell:shell
cdk synth
```

```yaml:output
Resources:
  VNTechiesAWSCDKS3demobucketkey2DF32451:
    Type: AWS::KMS::Key
    Properties:
      KeyPolicy:
        Statement:
          - Action: kms:*
            Effect: Allow
            Principal:
              AWS:
                Fn::Join:
                  - ""
                  - - "arn:"
                    - Ref: AWS::Partition
                    - ":iam::"
                    - Ref: AWS::AccountId
                    - :root
            Resource: "*"
          - Action:
              - kms:Decrypt
              - kms:DescribeKey
            Effect: Allow
            Principal:
              AWS:
                Fn::Join:
                  - ""
                  - - "arn:"
                    - Ref: AWS::Partition
                    - ":iam::"
                    - Ref: AWS::AccountId
                    - :root
            Resource: "*"
        Version: "2012-10-17"
    UpdateReplacePolicy: Retain
    DeletionPolicy: Retain
    Metadata:
      aws:cdk:path: aws-cdk-python-s3/VNTechies-AWS-CDK-S3-demo-bucket-key/Resource
  VNTechiesAWSCDKS3demobucketB20DE88B:
    Type: AWS::S3::Bucket
    Properties:
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              KMSMasterKeyID:
                Fn::GetAtt:
                  - VNTechiesAWSCDKS3demobucketkey2DF32451
                  - Arn
              SSEAlgorithm: aws:kms
      OwnershipControls:
        Rules:
          - ObjectOwnership: BucketOwnerEnforced
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
    UpdateReplacePolicy: Retain
    DeletionPolicy: Retain
    Metadata:
      aws:cdk:path: aws-cdk-python-s3/VNTechies-AWS-CDK-S3-demo-bucket/Resource
  VNTechiesAWSCDKS3demobucketPolicy2584B1E9:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket:
        Ref: VNTechiesAWSCDKS3demobucketB20DE88B
      PolicyDocument:
        Statement:
          - Action:
              - s3:GetBucket*
              - s3:GetObject*
              - s3:List*
            Effect: Allow
            Principal:
              AWS:
                Fn::Join:
                  - ""
                  - - "arn:"
                    - Ref: AWS::Partition
                    - ":iam::"
                    - Ref: AWS::AccountId
                    - :root
            Resource:
              - Fn::GetAtt:
                  - VNTechiesAWSCDKS3demobucketB20DE88B
                  - Arn
              - Fn::Join:
                  - ""
                  - - Fn::GetAtt:
                        - VNTechiesAWSCDKS3demobucketB20DE88B
                        - Arn
                    - /*
        Version: "2012-10-17"
    Metadata:
      aws:cdk:path: aws-cdk-python-s3/VNTechies-AWS-CDK-S3-demo-bucket/Policy/Resource
  CDKMetadata:
    Type: AWS::CDK::Metadata
    Properties:
      Analytics: v2:deflate64:H4sIAAAAAAAA/0XIQQrCMBCF4bN0n4zWgLi2SzelPYDUacQxbQKdBAkhd7chgqv/ve8E6gJtM31Y4mzkQg9Io5/QiJ3uyawM6aaj6J52TxasIF0DGu0L/VZN7xbC+Of6cy4yaHZhQ1125+xMnpzNoo/+5exBQXuEc/NmIrkF62nVMNR+AXbnt16gAAAA
    Metadata:
      aws:cdk:path: aws-cdk-python-s3/CDKMetadata/Default
    Condition: CDKMetadataAvailable
Conditions:
  CDKMetadataAvailable:
    Fn::Or:
      - Fn::Or:
          - Fn::Equals:
              - Ref: AWS::Region
              - af-south-1
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-east-1
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-northeast-1
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-northeast-2
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-south-1
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-southeast-1
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-southeast-2
          - Fn::Equals:
              - Ref: AWS::Region
              - ca-central-1
          - Fn::Equals:
              - Ref: AWS::Region
              - cn-north-1
          - Fn::Equals:
              - Ref: AWS::Region
              - cn-northwest-1
      - Fn::Or:
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-central-1
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-north-1
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-south-1
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-west-1
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-west-2
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-west-3
          - Fn::Equals:
              - Ref: AWS::Region
              - me-south-1
          - Fn::Equals:
              - Ref: AWS::Region
              - sa-east-1
          - Fn::Equals:
              - Ref: AWS::Region
              - us-east-1
          - Fn::Equals:
              - Ref: AWS::Region
              - us-east-2
      - Fn::Or:
          - Fn::Equals:
              - Ref: AWS::Region
              - us-west-1
          - Fn::Equals:
              - Ref: AWS::Region
              - us-west-2
Parameters:
  BootstrapVersion:
    Type: AWS::SSM::Parameter::Value<String>
    Default: /cdk-bootstrap/hnb659fds/version
    Description: Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]
Rules:
  CheckBootstrapVersion:
    Assertions:
      - Assert:
          Fn::Not:
            - Fn::Contains:
                - - "1"
                  - "2"
                  - "3"
                  - "4"
                  - "5"
                - Ref: BootstrapVersion
        AssertDescription: CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI.
```

Sau khi chạy câu lệnh trên thì một CloudFormation dưới dạng YAML sẽ được in ra stdout. Ngoài ra, directory `cdk.out` cũng được tạo ra với các file templates dưới format JSON để có thể triển khai trên AWS Cloud thông qua CloudFormation.

```shell:shell {10,11,12,13,14,15} showLineNumbers
├── README.md
├── app.py
├── aws_cdk_python_s3
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-310.pyc
│   │   └── aws_cdk_python_s3_stack.cpython-310.pyc
│   └── aws_cdk_python_s3_stack.py
├── cdk.json
├── cdk.out
│   ├── aws-cdk-python-s3.assets.json
│   ├── aws-cdk-python-s3.template.json
│   ├── cdk.out
│   ├── manifest.json
│   └── tree.json
├── requirements-dev.txt
├── requirements.txt
├── source.bat
└── tests
    ├── __init__.py
    └── unit
        ├── __init__.py
        └── test_aws_cdk_python_s3_stack.py
```

## 6. Deploy Amazon S3 Bucket lên AWS Cloud sử dụng AWS CDK

Nếu đây là lần đầu tiên bạn chạy câu lệnh deploy, bạn cần phải bootstrap ứng dụng AWS CDK trước khi có thể deploy lên AWS[^1],
việc này giúp tạo các tài nguyên cần thiết để CDK toolkit có thể deploy ứng dụng của bạn, chúng bao gồm: S3 bucket, IAM roles, SSM Parameter,...

```shell:shell
cdk bootstrap
```

Để triển khai S3 bucket trên AWS, chúng ta chạy câu lệnh sau

```shell:shell
cdk deploy
```

Bạn có thể kiểm tra KMS key và S3 vừa được tạo trên AWS console

![Bạn có thể kiểm tra KMS key và S3 vừa được tạo trên AWS console](https://vntechies.dev/_next/image?url=%2Fstatic%2Fimages%2Fassets%2Fawscdks3.png&w=3840&q=75)

## 7. Dọn dẹp tài nguyên

Để dọn dẹp tài nguyên đã được tạo, sử dụng `destroy` command

```shell:shell
cdk destroy

# output
Are you sure you want to delete: aws-cdk-python-s3 (y/n)? y
aws-cdk-python-s3: destroying...

 ✅  aws-cdk-python-s3: destroyed
```

## Tổng kết

Chúng ta đã tạo thành công một Amazon S3 Bucket sử dụng AWS CDK cùng Python với một số thuộc tính giúp tăng tính bảo mật bucket đó.
Các bạn có thể tham khảo những bài viết, hướng dẫn về AWS CDK tại series [này](https://vntechies.dev/tags/aws-cdk-series)

## Bài viết gốc trên VNTechies Dev Blog
-[Tạo Amazon S3 bucket sử dụng AWS CDK | VNTechies Dev Blog - Kho tài nguyên dành cho người Việt yêu công nghệ 👨‍💻👩‍💻](https://vntechies.dev/courses/aws/cdk/tao-s3-bucket-voi-aws-cdk)

## References

- [Amazon S3 Construct Library](https://docs.aws.amazon.com/cdk/api/v1/python/aws_cdk.aws_s3/README.html)
- [How to set up an Amazon S3 Bucket using AWS CDK](https://towardsthecloud.com/aws-cdk-s3-bucket)
- [Bootstrapping](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html)