Trong quá trình làm việc, hay gặp vấn đề nên notes ra đây luôn tránh quên

## Lambda function là gì
Lambda function là một service rất hay của AWS mới xuất hiện trong vài năm gần đây. Nó cho phép người dùng đưa chương trình của mình lên và chạy mà không cần phải cài đặt môi trường như EC2. 
Tuy nhiên Lambda function không thể tự chạy một mình, nó cần có sự kiện kích hoạt, có thể là gọi thông qua API, hoặc thông qua dạng Jobs từ AWS CloudWatch.
Và nó không phải tất cả cho một hệ thống mà chỉ là một phần của hệ thống. Nó thường được với vai trò là business logic, nhận thông tin, lấy thông tin từ module khác, trả lại kết quả hoặc ghi dữ liệu vào Database (DynamoDB hay S3)
Một ưu điểm của Lambda function là cách tính chi phí, thay vì một chi phí cho server như E2, thì nó chỉ tính phí dựa trên thời gian function được gọi. Rât tiết kiệm phải không.
[Tài liệu về Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)

## API Gateway là gì
Đúng như nghĩa đen, API Gateway cung cấp phương thức để bên ngoài có thể giao tiếp với tài nguyên hệ thống, như api, hay s3. Với nhiều options setting, có thể giới hạn theo quyền được tạo sẵn, key hay giới hạn IP address
[Tài liệu về API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## SAM là gì
SAM là một dịch vụ của AWS giúp triển khai, cài đặt và câú hình tự động các dịch vụ, module của hệ thống lên môi trường AWS, thông qua file config là template.yaml.
Rất tiện lợi trong quá trình phát triển, test và deploy với sự thiết lập thông số khác nhau cho mỗi môi trường.
[Tài liệu về AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)

## Cấu hình chung các dịch vụ này với nhau
Dưới đây là nội dung mẫu của file yaml điển hình.

```yaml:template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: 
...

# tham số dùng để truyền khi chạy từ aws cli
Parameters:
  Stage:
    Type: String
    AllowedValues:
      - staging
      - production

# Định nghĩa các tham số tuỳ thuộc vào môi trường(staging/production)
Mappings:
  Configs:
    staging:
      tham_số: Giá_trị
      SourceVpce:
       - vpce-abc  #VPC endpoint mà dùng để truy cập private api gateway
    production: #môi trường production
      tham_số: Giá_trị
      SourceVpce:
       - vpce-def
       
# Định nghĩa biến môi trường, sau này có thể truy cập trong chương trình lambda
# Ví dụ: process.env.XXXX
Globals:
  Function:
    Timeout: 3
    Environment:
      Variables:
        RELEASE_STAGE: !Ref Stage
        BIẾN_TOÀN_CỤC: !FindInMap [ Configs, !Ref Stage, tham_số ]

# Định nghĩa các service
Resources:

  FooBarApi:
    Type: AWS::Serverless::Api
    Properties:
      Name: FooBarApi
      StageName: Prod
      EndpointConfiguration: PRIVATE # option cho private API gateway
      Auth:
        ResourcePolicy: # giới hạn resource có thể truy cập api gateway
          CustomStatements:
            Effect: Allow
            Action: 'execute-api:Invoke'
            Resource:
              - 'execute-api:/*/*/*'
            Principal: '*'
            Condition:
              ForAnyValue:StringEquals:
                # Chỉ những vpce định nghĩa ở trên mới có thể truy cập đến private api gateway này
                aws:sourceVpce: !FindInMap [ Configs, !Ref Stage, SourceVpce ]

```

### Những điểm cần chú ý
Thiết lập API gateway là private

```yaml:template.yaml
EndpointConfiguration: PRIVATE
```

Giới hạn vpce

```yaml:template.yaml
ForAnyValue:StringEquals:
  aws:sourceVpce: !FindInMap [ Configs, !Ref Stage, SourceVpce ]
```

Trỏ tới API này khi định nghĩa Lambda function

```yaml:template.yaml
FooBarFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      CodeUri: foor-bar/
      Handler: lambda.handler
      Runtime: nodejs10.x
      Timeout: 10
      Events: # Định ngĩa sự kiện kích hoạt Lambda function
        PutLogistics:
          Type: Api
          Properties:
            RestApiId:
              Ref: FooBarApi
            Path: /foo/bar
            Method: put
```

Với định nghĩa như trên, chúng ta đã định nghĩa được cùng lúc
1. API gateway
2. Lambda function
3. ... có thể cấu hình cả S3, DynamoDB ...

### Cách triển khai SAM lên môi trường AWS thông qua cli

#### Chú ý: các bạn cần cài đặt sẵn
[Tham khảo cài đặt ở đây](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html)
1. aws cli
2. sam cli
3. cấu hình profile bên trong 2 file ./aws/config và ./aws/credentials

```bash:~/.aws/config
[default]
output = json
region = ap-northeast-1

[xyz-staging]
output = json
region = ap-northeast-1
```

```bash:~/.aws/credentials
[default]
aws_access_key_id = ...
aws_secret_access_key = ....

[xyz-staging]
aws_access_key_id = ...
aws_secret_access_key = ...
```

#### Build và triển khai (deploy)

```bash:console
sam build --profile xyz-staging

sam package  --profile xyz-staging --output-template packaged.yaml --s3-bucket xyz-sam-staging
# xyz-sam-staging là S3 bucket dùng để lưu trữ data của cấu hình SAM này

sam deploy --profile xyz-staging --template-file packaged.yaml --region ap-northeast-1 --capabilities CAPABILITY_IAM --stack-name xyz-staging --parameter-overrides Stage=staging
# --stack-name xyz-staging: tên của stack khi triển khai lên aws, có thể vào AWS > Cloudformation để xem các stack, trạng thái của việc thực thi, thành công hay lỗi
```

## Bàn về cách định nghĩa API trong template
Có hai cách để định nghĩa một api:
- Định nghĩa độc lập (như ví dụ trên)
- Định nghĩa bên trong thuộc tính events của Function
Trong trường hợp này, nếu muốn thiết lập API là private thì phải định nghĩa trong Global Section
(Vì khi này, thuộc tính `EndpointConfiguration` không được hỗ trợ)
Hãy tham khảo ví dụ dưới

```yaml:template.yaml
Globals:
  Api:
    EndpointConfiguration: PRIVATE
...
  FooBarFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      CodeUri: foo-bar/
      Handler: lambda2.handler
      Runtime: nodejs10.x
      Timeout: 10
      Events:
        Foobar:
          Type: Api
          Properties:
            Path: /foo/bar
            Method: put
            Auth:
              ResourcePolicy:
                CustomStatements:
                  Effect: Allow
                  Action: 'execute-api:Invoke'
                  Resource:
                    - 'execute-api:/*/*/*'
                  Principal: '*'
                  Condition:
                    ForAnyValue:StringEquals:
                      aws:sourceVpce: !FindInMap [ Configs, !Ref Stage, SourceVpce ]
      Policies:
        - AWSLambdaVPCAccessExecutionRole
        - SecretsManagerReadWrite
        - S3ReadPolicy:
            BucketName: !FindInMap [ Configs, !Ref Stage, ShopInfoBucket ]
```
Các bạn có thể thấy, thay vì dùng property: `RestApiId:` để trỏ tới API được định nghĩa sẵn, chúng ta mô tả API này ngay trong Function. Cũng khá tiện nhỉ :)

## Lời cuối
Vậy là bạn đã hoàn thành việc cấu hình và triển khai các dịch vụ có liên kết với nhau lên AWS rồi đấy.
Giờ là lúc xác nhận xem chúng có triển khai đúng không bằng các vào AWS Manage console, xem trong 
CloudFormation, Lambda function, API Gateway.

Ở các bài viết sau, mình sẽ hướng dẫn cách gọi API Gateway này từ command line, từ chương trình, cũng như các test riêng biệt Lambda function, API Gateway trên chính AWS Manage Console nhé.

Thân ái!