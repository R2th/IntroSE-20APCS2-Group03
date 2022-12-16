Bài viết này mình xin hướng dẫn cho người mới bắt đầu về cách sử dụng AWS CloudFormation và Lambda để triển khai một API RESTful đơn giản (và có Serverless).
![](https://images.viblo.asia/019e0c29-262f-4208-8f01-2ce3aef731df.png)

### Serverless là gì?
Thuật ngữ Serverless (a.k.a. Chức năng-as-a-Service) mô tả loại kiến trúc cho phép mã code được triển khai và chạy trên các vùng chứa tạm thời và không có trạng thái từ các nhà cung cấp bên thứ ba (ví dụ: Azure hoặc AWS).

#### Lợi ích của Serverless 
Giảm quản lý hoạt động. Kiến trúc Serverless cho phép các nhà phát triển tập trung vào việc viết mã và không phải lo lắng về cấu hình và quản lý cơ sở hạ tầng mà mã của họ chạy.
Dễ dàng mở rộng quy mô. Vì các chức năng "Không có Serverless" (a.k.a. các ứng dụng không có Serverless) là trạng thái không xác định và luôn được viện dẫn bởi một sự kiện (ví dụ: yêu cầu HTTP), bạn có thể chạy nhiều, hoặc ít, các chức năng theo nhu cầu của bạn. Tùy thuộc vào quy mô và hình dạng của lưu lượng truy cập của bạn, điều này rất hiệu quả về chi phí vì các chức năng của Serverless thường được tính cho mỗi lần gọi.

#### Nhược điểm của Serverless 
Độ trễ cho các yêu cầu khi khởi tạo. Nếu chức năng Serverless không hoạt động (ví dụ như đã không được chạy trong một khoảng thời gian), thì việc xử lý lời gọi đầu tiên có thể cần thêm thời gian để hoàn thành vì phải khởi tạo (tức là phân bổ máy chủ lưu trữ, mã tải, v.v.).
Thiếu kiểm soát hệ thống. Vì mã của bạn đang chạy trong môi trường được quản lý bởi nhà cung cấp, bạn sẽ không thể kiểm soát việc nâng cấp hệ thống hoặc phụ thuộc bên ngoài cơ sở mã của bạn.

### CloudFormation là gì?
CloudFormation là một dịch vụ từ Amazon cho phép bạn xây dựng tài nguyên AWS sử dụng các mẫu (template). Mẫu là tệp cấu hình (YML hoặc JSON) để cung cấp tất cả các tài nguyên AWS của bạn như các trường hợp EC2, các bảng DynamoDB, vai trò và quyền IAM, hoặc bất cứ điều gì khác.

Trong hướng dẫn này, chúng ta sẽ tạo một API RESTful đơn giản với hai điểm cuối sau:

1) POST /users/$ {userId}/hello
2) GET /users/$ {userId}/hello

![](https://images.viblo.asia/253fc228-40b3-411b-82da-5b0f178fdb2e.png)

##### Bước 1. Tạo 1 project nhỏ:
Có 2 tệp mà bạn cần cho hướng dẫn này: index.js (mã NodeJS cho hàm Lambda) và stack.yml (mẫu ngăn xếp CloudFormation)
```javascript 
// index.js
"use strict";

var AWS = require('aws-sdk');

// Get "Hello" Dynamo table name.  Replace DEFAULT_VALUE 
// with the actual table name from your stack.
const helloDBArn = process.env['HELLO_DB'] || 'DEFAULT_VALUE';  //'Mark-HelloTable-1234567';
const helloDBArnArr = helloDBArn.split('/');
const helloTableName = helloDBArnArr[helloDBArnArr.length - 1];

// handleHttpRequest is the entry point for Lambda requests
exports.handleHttpRequest = function(request, context, done) {
  try {
    const userId = request.pathParameters.userId;
    let response = {
      headers: {},
      body: '',
      statusCode: 200
    };

    switch (request.httpMethod) {
      case 'GET': {
        console.log('GET');
        let dynamo = new AWS.DynamoDB();
        var params = {
          TableName: helloTableName,
          Key: { 'user_id' : { S: userId } },
          ProjectionExpression: 'email'
        };
        // Call DynamoDB to read the item from the table
        dynamo.getItem(params, function(err, data) {
          if (err) {
            console.log("Error", err);
            throw `Dynamo Get Error (${err})`
          } else {
            console.log("Success", data.Item.email);
            response.body = JSON.stringify(data.Item.email);
            done(null, response);
          }
        });
        break;
      }
      case 'POST': {
        console.log('POST');
        let bodyJSON = JSON.parse(request.body || '{}');
        let dynamo = new AWS.DynamoDB();
        let params = {
          TableName: helloTableName,
          Item: {
            'user_id': { S: userId },
            'email': { S: bodyJSON['email'] }
          }
        };
        dynamo.putItem(params, function(error, data) {
          if (error) throw `Dynamo Error (${error})`;
          else done(null, response);
        })
        break;
      }
    }
  } catch (e) {
    done(e, null);
  }
}
```

```yaml
// stack.yaml
---
AWSTemplateFormatVersion: 2010-09-09

Description: API Gateway, Lambda, and Dynamo.

Resources:
  # Policy required for all lambda function roles.
  BaseLambdaExecutionPolicy:
    Type: AWS::IAM::ManagedPolicy
    Properties:
      Description: Base permissions needed by all lambda functions.
      PolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Action:
              - logs:CreateLogGroup
              - logs:CreateLogStream
              - logs:PutLogEvents
              - ec2:CreateNetworkInterface
              - ec2:DescribeNetworkInterfaces
              - ec2:DeleteNetworkInterface
            Resource: "*"

  HelloTable:
    Type: AWS::DynamoDB::Table
    Properties:
      ProvisionedThroughput:
        ReadCapacityUnits: 5
        WriteCapacityUnits: 5
      AttributeDefinitions:
        - AttributeName: user_id
          AttributeType: S
      KeySchema:
        - AttributeName: user_id
          KeyType: HASH

  # FIXME How to hook up custom domain?
  MyApiGateway:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: !Sub "${AWS::StackName}-MyApiGateway"
      Description: A description
      FailOnWarnings: true
      Body:
        swagger: 2.0
        info:
          description: |
            The account API.
          version: 1.0
        basePath: /
        schemes:
          - https
        consumes:
          - application/json
        produces:
          - application/json
        paths:
          /users/{userId}/hello:
            get:
              description: TBD
              x-amazon-apigateway-integration:
                uri: !Sub "arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${HelloLambda.Arn}/invocations"
                credentials: !GetAtt MyApiGatewayRole.Arn
                passthroughBehavior: when_no_match
                httpMethod: POST
                type: aws_proxy
              operationId: getHello
              parameters:
                - name: userId
                  in: path
                  description: TBD
                  required: true
                  type: string
                  format: uuid
            post:
              description: TBD
              x-amazon-apigateway-integration:
                uri: !Sub "arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${HelloLambda.Arn}/invocations"
                credentials: !GetAtt MyApiGatewayRole.Arn
                passthroughBehavior: when_no_match
                httpMethod: POST
                type: aws_proxy
              operationId: postHello
              parameters:
                - name: userId
                  in: path
                  description: TBD
                  required: true
                  type: string
                  format: uuid
                - name: body
                  in: body
                  description: TBD
                  required: true
                  schema:
                    type: object
                    required:
                    - email
                    properties:
                      email:
                        type: string

  MyApiGatewayDeployment:
    Type: AWS::ApiGateway::Deployment
    Properties:
      RestApiId: !Ref MyApiGateway
      StageName: prod

  MyApiGatewayRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: apigateway.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: InvokeLambda
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - lambda:InvokeFunction
                Resource:
                  - !GetAtt HelloLambda.Arn

  HelloLambda:
    Type: AWS::Lambda::Function
    Properties:
      Role: !GetAtt HelloLambdaRole.Arn  # TODO
      Handler: index.handleHttpRequest
      Runtime: nodejs6.10
      Environment:
        Variables:
          HELLO_DB: !Sub "arn:aws:dynamodb:${AWS::Region}:*:table/${HelloTable}"
      Code:
        ZipFile: |
          exports.handlers = function(event, context) {}
  HelloLambdaRole:  # -> AppAPIRole
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - !Ref BaseLambdaExecutionPolicy
      Policies:
        - PolicyName: getHello
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:GetItem
                Resource: !Sub "arn:aws:dynamodb:${AWS::Region}:*:table/${HelloTable}"
        - PolicyName: putHello
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:PutItem
                Resource: !Sub "arn:aws:dynamodb:${AWS::Region}:*:table/${HelloTable}"
```

##### Bước 2. Trong tập tin cấu hình CloudFormation
Chú ý đến stack.yml, nó là tập tin cấu hình sẽ được sử dụng bởi CloudFormation để tạo ra tất cả mọi thứ ứng dụng của chúng ta sẽ yêu cầu.

Dưới đây là sơ đồ chi tiết về tất cả các tài nguyên AWS của chúng ta trong stack.yml sẽ cần phải tạo. Tên được sử dụng trong YML nằm trong các ô màu đỏ.

![](https://images.viblo.asia/3f0d8809-8095-4336-9db0-4be2cd38a854.png)

##### Bước 3. Tạo Cloudformation Stack
Sau khi kiểm tra YML, hãy tới https://console.aws.amazon.com/cloudformation và nhấp vào nút Create Stack. Chọn Tải lên mẫu lên Amazon S3 và tải tệp stack.yml lên.
![](https://images.viblo.asia/06d48bfa-2305-4f0a-b1e6-0892a923c18d.png)

Trên màn hình tiếp theo, bạn sẽ được yêu cầu chọn một tên Stack (có thể là bất cứ thứ gì). Sau đó, nhấp vào Tiếp theo và chọn Tôi thừa nhận rằng AWS CloudFormation có thể tạo tài nguyên IAM và nhấp vào Tiếp theo một lần nữa.

Tại thời điểm này, stack của bạn đang được tạo ra. Đợi một phút trên trang Stacks cho đến khi trạng thái ngăn xếp của bạn trở thành CREATE_COMPLETE.

##### Bước 4. Sao chép và dán mã vào Lambda
Một khi ngăn xếp của bạn đã hoàn tất, hãy đi tìm Lambda mới của stack ở đây: https://console.aws.amazon.com/lambda. Tên hàm Lambda của bạn phải giống với $ {StackName} -HelloLambda-XXXX

![](https://images.viblo.asia/727425f1-6e97-471b-9fa1-d3bcb9ef9b99.png)

##### Bước 5. Tìm API Gateway của bạn và kiểm tra nếu nó hoạt động
Tìm API Gateway được tạo bởi mẫu CloudFormation của bạn tại đây: https://console.aws.amazon.com/apigateway. Tên Gateway API của bạn phải giống với $ {StackName} -MyApiGateway.

![](https://images.viblo.asia/a1816ec9-2317-47d9-b340-3cf5047d3d92.png)

Sau khi bạn tìm thấy Cổng API của mình, chúng ta có thể kiểm tra xem mọi thứ đã được nối bằng cách chọn tùy chọn POST bên dưới / người dùng và sau đó nhấp vào TEST.

![](https://images.viblo.asia/f1b08a9e-27f0-4fc1-b111-7b67084d61bc.png)

Trên trang Test page, thiết lập UserId là 123, và thiết lập Request Body theo sau và nhấp vào Test. Nếu mọi thứ đã hoạt động, Trạng thái phải là 200 mà không có dữ liệu
![](https://images.viblo.asia/1239cb73-d3d4-404a-a30d-bb9babcf28da.png)

Sau khi kiểm tra điểm cuối POST, bạn có thể kiểm tra xem liệu dữ liệu của bạn đã được lưu bằng cách vào /hello GET Test page và thử một yêu cầu (nhớ thiết lập userId là 123). Kết quả => xem phần trên.

##### Bước 6. Deploy API Gateway 
Bây giờ bạn đã xác minh rằng  API Gateway của bạn, Lambda và DynamoDB được kết nối, bạn có thể deploy API Gateway của mình để có thể truy cập nó từ internet.

Để triển khai API của bạn, hãy chọn  Actions menu và chọn Deploy. Khi cửa sổ bật lên xác nhận xuất hiện, hãy thiết lập giai đoạn triển khai và sau đó nhấp vào Deploy.

![](https://images.viblo.asia/0f4d9a14-c77a-4755-ba2e-f1b35943b692.png)

##### Bước 7. Gửi yêu cầu tới API của bạn
Khi bạn đã triển khai API của mình, bạn sẽ được chuyển tiếp tới trang Stages. Ở đây bạn sẽ tìm thấy tên miền cho API Gateway của mình trong khu vực đánh dấu màu xanh lam bên cạnh Invoke URL.

![](https://images.viblo.asia/31085e88-0ac0-4a69-b3a6-3298d8da7d24.png)

Sử dụng URL từ ảnh chụp màn hình ở trên, bạn có thể gửi yêu cầu GET /users/123/hello trong trình duyệt web của bạn như dưới đây.

![](https://images.viblo.asia/1368d770-2a2b-48df-8e53-6c6e1cc4c82f.png)

Và đó là nó. Bây giờ bạn đã có một API RESTful Serverless có khả năng mở rộng, reliabe....