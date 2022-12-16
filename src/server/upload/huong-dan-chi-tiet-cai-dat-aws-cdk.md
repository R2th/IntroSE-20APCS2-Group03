![AWS Cloud Development Kit](https://vntechies.dev/_next/image?url=%2Fstatic%2Fimages%2Fogps%2Fawssdk.png&w=1200&q=75)

AWS Cloud Development Kit (AWS CDK) là một khung phát triển phần mềm mã nguồn mở để xác định tài nguyên ứng dụng đám mây bằng các ngôn ngữ lập trình quen thuộc.
Đây là công cụ tổng hợp (synthesize) ứng dụng AWS CDK và tạo ra các AWS CloudFormation stacks để triển khai trên AWS Cloud.

Để cài đặt AWS CDK, bạn chỉ cần chạy câu lệnh sau trên terminal của bạn `npm install -g aws-cdk`.

Thao tác này sẽ cài đặt AWS CDK trên máy của bạn, từ đó bạn có thể tạo dự án đầu tiên của mình, bắt đầu xây dựng và triển khai trên AWS Cloud.

Trong hướng dẫn này, bạn sẽ tìm hiểu cách cài đặt AWS CDK và thiết lập cấu hình để bắt đầu xây dựng và triển khai ứng dụng CDK đầu tiên của mình.

## Cách cài đặt AWS Cloud Development Kit (CDK)

Chúng ta sử dụng NPM package manager để cài đặt AWS CDK. Đây là phương pháp cài đặt chung cho tất cả các hệ điều hành (MacOS, Windows, Linux,...).
Chạy câu lệnh sau trên terminal của bạn để cài đặt AWS CDK toolkit

```shell:shell
npm install -g aws-cdk
# Kiểm tra version của AWS CDK sau khi cài đặt
cdk version
# List các các câu lệnh của cdk
cdk --help
```

AWS CDK v1 sẽ vào chế độ bảo trì (chỉ nhận được fix cho critical bug và các bản vá bảo mật) từ **1/7/2022** [^1].
Chính vì thế các bạn nên sử dụng AWS SDK v2 để sử dụng các tính năng, cập nhật mới.

## Tạo một AWS CDK project

Để khởi tạo một project AWS CDK mới, bạn có thể chạy lệnh `cdk init`, bạn có thể tuỳ chọn mẫu và ngôn ngữ lập trình mong muốn của mình.
Dưới đây là các lựa chọn cho bạn

```shell:shell
cdk init --list
# output
Available templates:
* app: Template for a CDK Application
   └─ cdk init app --language=[csharp|fsharp|go|java|javascript|python|typescript]
* lib: Template for a CDK Construct Library
   └─ cdk init lib --language=typescript
* sample-app: Example CDK Application with some constructs
   └─ cdk init sample-app --language=[csharp|fsharp|go|java|javascript|python|typescript]
```

Đây có thể là lần đầu tiên bạn sử dụng AWS CDK, chính vì vậy hãy bắt đầu với `sample-app`. Project này sẽ giúp bạn hiểu được một stack được tạo ra như thế nào trên AWS Cloud thông qua AWS CDK.

Chúng ta sẽ sử dụng python cho project này

```shell:shell
mkdir aws-cdk-sample-app
cd aws-cdk-sample-app
cdk init sample-app --language=python
```

Câu lệnh sẽ tự động sinh ra code cho project với cấu trúc như dưới Đây

```shell:shell
./
├── README.md
├── app.py
├── aws_cdk_sample_app
│   ├── __init__.py
│   └── aws_cdk_sample_app_stack.py
├── cdk.json
├── requirements-dev.txt
├── requirements.txt
├── source.bat
└── tests
    ├── __init__.py
    └── unit
        ├── __init__.py
        └── test_aws_cdk_sample_app_stack.py
```

```shell:shell
# Cài đặt môi trường ảo cho python
python3 -m venv .venv
# Cài đặt các dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

Bạn có thể thấy trong thư mục `aws_cdk_sample_app` chứa một stack, trong đó chứa code cho việc tạo một SQS queue và SNS topic + subscription.
Vì chúng ta sử dụng AWS CDK với sample-app nên các tài nguyên này đã được định nghĩa trước.

## Build ứng dụng AWS CDK

Sau khi chúng ta tạo mới một AWS CDK project với một stack (`aws_cdk_sample_app_stack.py`) bao gồm các tài nguyên được config trong sample-app.
Để build ứng dụng, chúng ta dùng câu lệnh `cdk synth`. Câu lệnh này sẽ tổng hợp (các) stacks được định nghĩa trong ứng dụng AWS CDK thành một CloudFormation template.

```shell:shell
cdk synth
```

```yaml:output
Resources:
  AwsCdkSampleAppQueueDC253127:
    Type: AWS::SQS::Queue
    Properties:
      VisibilityTimeout: 300
    UpdateReplacePolicy: Delete
    DeletionPolicy: Delete
    Metadata:
      aws:cdk:path: aws-cdk-sample-app/AwsCdkSampleAppQueue/Resource
  AwsCdkSampleAppQueuePolicy59F8BB88:
    Type: AWS::SQS::QueuePolicy
    Properties:
      PolicyDocument:
        Statement:
          - Action: sqs:SendMessage
            Condition:
              ArnEquals:
                aws:SourceArn:
                  Ref: AwsCdkSampleAppTopic7344763E
            Effect: Allow
            Principal:
              Service: sns.amazonaws.com
            Resource:
              Fn::GetAtt:
                - AwsCdkSampleAppQueueDC253127
                - Arn
        Version: "2012-10-17"
      Queues:
        - Ref: AwsCdkSampleAppQueueDC253127
    Metadata:
      aws:cdk:path: aws-cdk-sample-app/AwsCdkSampleAppQueue/Policy/Resource
  AwsCdkSampleAppQueueawscdksampleappAwsCdkSampleAppTopic84AF6D45EC13CEA3:
    Type: AWS::SNS::Subscription
    Properties:
      Protocol: sqs
      TopicArn:
        Ref: AwsCdkSampleAppTopic7344763E
      Endpoint:
        Fn::GetAtt:
          - AwsCdkSampleAppQueueDC253127
          - Arn
    Metadata:
      aws:cdk:path: aws-cdk-sample-app/AwsCdkSampleAppQueue/awscdksampleappAwsCdkSampleAppTopic84AF6D45/Resource
  AwsCdkSampleAppTopic7344763E:
    Type: AWS::SNS::Topic
    Metadata:
      aws:cdk:path: aws-cdk-sample-app/AwsCdkSampleAppTopic/Resource
  CDKMetadata:
    Type: AWS::CDK::Metadata
    Properties:
      Analytics: v2:deflate64:H4sIAAAAAAAA/1WNQQrCMBBFz9J9MloL4r4XqK17adOIY2vSZhKkhNzdJgHBzfz/Hw/mBNUFyqL/EBfjxGccwHe2FxPb0d3TSuCvTjrJ6ofKJd1Gzyi2H8wzMFK737mBhMHFolbR+Ns3vaCINJUQYm0laWdE+lFrNWI0A2s2+9TqUEF5hHPxIkRunLL4ltDm/AKawROWvgAAAA==
    Metadata:
      aws:cdk:path: aws-cdk-sample-app/CDKMetadata/Default
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

Như bạn có thể thấy, câu lệnh `cdk synth` hiển thị một CloudFormation template trên terminal của bạn.
Template này cũng được lưu lại dưới dạng JSON trong folder `cdk.out` để có thể sử dụng khi deploy lên AWS.

## Deploy ứng dụng AWS CDK

Để deploy ứng dụng sau khi được tổng hợp bởi câu lệnh `cdk synth`, bạn cần [cài đặt AWS CLI và AWS profile](https://vntechies.dev/courses/aws/cdk/tao-s3-bucket-voi-aws-cdk#2-c%C3%A0i-%C4%91%E1%BA%B7t-aws-cli-v%C3%A0-c%C3%A0i-%C4%91%E1%BA%B7t-aws-profile) trên máy của bạn.

Sau khi bạn cài đặt xong, bạn có thể tiếp tục với việc deploy ứng dụng AWS CDK.

Bạn cần phải bootstrap ứng dụng AWS CDK trước khi có thể deploy lên AWS,
việc này giúp tạo các tài nguyên cần thiết để CDK toolkit có thể deploy ứng dụng của bạn, chúng bao gồm: S3 bucket, IAM roles, SSM Parameter,...

```shell:shell
cdk bootstrap  --profile vntechies # thay bằng profile của bạn
cdk deploy --profile vntechies
```

![Kết quả deploy bằng AWS CDK](https://vntechies.dev/_next/image?url=%2Fstatic%2Fimages%2Fassets%2Ffinal-aws-cdk.png&w=3840&q=75)

## Tổng kết

Qua bài hướng dẫn này, bạn đã học cách cài đặt AWS CDK, thiết lập và khởi tạo một AWS CDK project, tổng hợp lại thành một CloudFormation template và deploy lên AWS Cloud.
Nếu bạn muốn xóa stack vừa được tạo khỏi tài khoản AWS của mình, hãy chạy lệnh sau

```shell:shell
cdk destroy --profile vntechies # thay bằng profile của bạn
```

## Bài viết gốc

- [Hướng dẫn chi tiết cài đặt AWS CDK | VNTechies Dev Blog - Kho tài nguyên dành cho người Việt yêu công nghệ 👨‍💻👩‍💻](https://vntechies.dev/courses/aws/cdk/huong-dan-chi-tiet-cai-dat-aws-cdk)

## Reference

- [AWS Cloud Development Kit](https://aws.amazon.com/cdk/)
- [Getting started with the AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)
- [How to install AWS CDK (step-by-step guide)](https://towardsthecloud.com/install-aws-cdk)
- [What is the AWS CDK?](https://docs.aws.amazon.com/cdk/v1/guide/home.html)
- [Bootstrapping](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html)

## VNTechies Dev Blog 🇻🇳 - Kho tài nguyên về Cloud ☁️ / DevOps 🚀
![](https://images.viblo.asia/1712f084-ee0f-47e8-b2a3-9af6cddf56f6.png)

- Website: https://vntechies.dev/
- Github repository: https://github.com/vntechies/blog
- Facebook: https://facebook.com/vntechies

Anh chị em hãy follow/ủng hộ VNTechies  để cập nhật những thông tin mới nhất về Cloud và DevOps nhé!