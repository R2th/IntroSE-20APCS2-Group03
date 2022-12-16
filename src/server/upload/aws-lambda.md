## Serverless là gì
Serverless cho phép bạn dựng cũng như chạy ứng dụng và dịch vụ mà không phải bận tâm đến máy chủ. Hiểu đơn giản bạn chỉ cần quan tâm đến việc viết code để giải quyết bài toán của khách hàng và đẩy code lên một dịch vụ(AWS Lambda) để chạy mà không cần quan tâm đến xây dựng máy chủ. 

Serverless cho phép bạn dựng các ứng dụng hiện đại có độ linh hoạt cao hơn và tổng chi phí sở hữu thấp hơn. Dựng ứng dụng serverless đồng nghĩa với việc các nhà phát triển có thể tập trung vào sản phẩm cốt lõi thay vì phải lo lắng về việc quản lý và vận hành nhiều máy chủ hoặc thời gian chạy, dù trên nền tảng đám mây hay tại chỗ

## AWS Lambda

AWS Lambda cho phép bạn chạy code mà không cần cung cấp hay quản lý máy chủ.  Chỉ cần tải đoạn mã của bạn lên và Lambda sẽ lo hết những gì cần làm để chạy. Lambda hỗ trợ các ngôn ngữ: Node.js, Python, Java, Ruby, C#, Go và PowerShell. 

## AWS Serverless Application Model (AWS SAM) là gì
AWS Serverless Application Model (AWS SAM) là một open source framework cho phép xây dựng các ứng dụng serverless, được sử dụng để chạy trên AWS (https://github.com/awslabs/serverless-application-model)

## Cài đặt  AWS SAM CLI
Trước khi cài đặt bạn phải đặt được điều kiện sau:
1. Cài đặt docker trên hệ điều hành
2.  Tài khoản AWS (để deploy code)

Tiếp theo là cài đặt Homebrew là một package manager. Xem thông tin chi tiết tại [đây](https://docs.brew.sh/Homebrew-on-Linux). Chạy các command sau để cài đặt

```
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
```

 Thêm Homebrew vào PATH trên linux bằng câu lệnh sau:
 
 ```
$ test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
$ test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
$ test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
$ echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile
 ```
 
 Kiểm tra xem đã cài đặt thành công chưa
 
 ```
 $ brew --version
 ```
 
 Kết quả hiển thị
 
 ```
Homebrew 2.2.5
Homebrew/linuxbrew-core (git revision 9d1f; last commit 2020-02-10)
 ```
 
 Cuối cùng cài đặt SAM cli bằng câu lệnh sau:
 
 ```
$ brew tap aws/tap
$ brew install aws-sam-cli
 ```
 
 Kiểm tra xem đã cài
 
 ```
 $ sam --version
SAM CLI, version 0.41.0
 ```
 
 ## Hello World Application
 
Trong bài viết này mình sẽ sử dụng ngôn ngữ Nodejs để viết các service. Để khởi tạo dự án ta sẽ chạy lệnh sau:

```
sam init --runtime nodejs10.x --dependency-manager npm --name lambda_skeleton
```

Kết quả sau khi chạy lệnh

```
Which template source would you like to use?
	1 - AWS Quick Start Templates
	2 - Custom Template Location
Choice: 1

Cloning app templates from https://github.com/awslabs/aws-sam-cli-app-templates.git

AWS quick start application templates:
	1 - Hello World Example
	2 - Quick Start: From Scratch
	3 - Quick Start: Scheduled Events
	4 - Quick Start: S3
	5 - Quick Start: SNS
	6 - Quick Start: SQS
	7 - Quick Start: Web Backend
Template selection: 2 

-----------------------
Generating application:
-----------------------
Name: lambda_skeleton
Runtime: nodejs10.x
Dependency Manager: npm
Application Template: quick-start-from-scratch
Output Directory: .

Next steps can be found in the README file at ./lambda_skeleton/README.md
```

Hoặc để khởi tạo với các option khác các bạn có thể tham khảo tại [đây](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-init.html)

Sau khi đã khởi tạo project mình có sửa lại cấu trúc thư mục như sau:

```
|src
-|app.js
-|services
```

File app.js sẽ đảm nhận nhiệm vụ nhận request từ api và response về nội dung như sau

```
exports.handler = (event, context, callback) => {
  const message = 'Hello from Lambda!'

  console.log(`${message}`)

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: message
  })
}
```

Folder service sẽ chứa file dạng utils để xử lý tác vụ business của task. Tạm thời mình chưa có chức năng phức tạp nên mình sẽ để rỗng

Sửa file template.yml 

```
  helloFromLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: ./src
      Handler: app.handler
      Runtime: nodejs10.x
      MemorySize: 1024
      Timeout: 100
      Description: A Lambda function that returns a static string.
      Policies:
        - AWSLambdaBasicExecutionRole
      Events:
        Api:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

Mình sẽ giải thích một chút về conifg ở phía trên
* CodeUri: dùng để chỉ định folder chứa source code 
* Handler: function sẽ chứa code để bắt đầu khi bắt đầu chạy
* Runtime: môi trường chạy app
* MemorySize: dung lượng ram khi chạy docker
* Timeout: thời gian tối đa để chạy chương trình
* Events: khai báo api endpoints

Chạy lệnh sau để bắt đầu API Gateway Locally

```
sam local start-api
```

Kết quả sau khi start api:

```
You can now browse to the above endpoints to invoke your functions. You do not need to restart/reload SAM CLI while working on your functions, changes will be reflected instantly/automatically. You only need to restart SAM CLI if you update your AWS SAM template
2020-03-02 15:01:12  * Running on http://127.0.0.1:3000/ (Press CTRL+C to quit)
Invoking app.handler (nodejs10.x)
```

Kiểm tra xem api có response kết quả không:

![](https://images.viblo.asia/727aaea3-b572-4f44-acad-77e9e9d7de90.png)

 ## Kết luận
 
 Các bạn có thể tham khảo dự án của mình trên github:  https://github.com/duongpham910/lambda_skeleton