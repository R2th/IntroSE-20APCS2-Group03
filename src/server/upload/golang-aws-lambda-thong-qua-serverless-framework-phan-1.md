**Yêu Cầu**
Để bắt đầu làm aws lambda bắt buộc phải setup những thư viện sau:
- Setup node version: 
```
node -v
```
- Setup npm version:
```
npm -v
```
- Setup serverless framework: đọc thêm bài viết này [link](https://viblo.asia/p/golang-cai-dat-serverless-framewor-lambada-aws-4dbZNQXkKYM)
- Aws Account: đăng kí một account aws, hiện tại thì đăng kí account hơi khó, cần call trực tiếp với call-center từ aws.

### Tạo project 
* serverless hỗ trợ rất nhiều ngôn ngữ làm việc với lambda: golang, java, nodejs, c#. Run
```
serverless create -h 
```
-> để xem những ngôn ngữ hiện tại lambda hỗ trợ:
![](https://images.viblo.asia/95dd4bc8-3a32-49e2-8d8a-efb321e36f73.png)
* Để tạo source code lambda với **csharp**, run:
```
serverless create -t aws-csharp -p lambda-csharp
```
* Để tạo source code lambda với **Golang**, run:
```
serverless create -t aws-go -p lambda-go
```
-> tạo ra 1 folder **lambda-go**, template **aws-go** của ngôn ngữ **golang**
structure:
![](https://images.viblo.asia/d78f5e7b-2892-404d-937c-588b08735812.png)

### Giải Thích Folder
1.  File serverless.yaml: dùng để cấu hình tất cả những thứ liên quan đến lambda:
* timeout: cấu hình thời gian thực thi của một function lambda
* memory: được cấp memory trong quá trình thực thi
* environment: biến môi trường được set
* role: các quyền của lambda này đối với những service khác như: dynamo, s3, rekognition,...
...

2. File Makefile: là một số lệnh để build golang.
```
.PHONY: build clean deploy

build:
	env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/hello hello/main.go
	env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/world world/main.go

clean:
	rm -rf ./bin

deploy: clean build
	sls deploy --verbose
```
* Run:
```
make build
```
-> tạo ra file binary *hello*, *world* trong folder *bin/*,
* Run:
```
make deploy
```
-> sẽ deploy 2 function *hello*, *world* lên *aws*

### Deploy Lên Aws Lambda
1. Deploy Function
* Serverless Framework hỗ trợ hầu như là tất cả những thứ có thể để làm với *aws-lambda*
* Cần setup aws credential trước nhé: tham khảo link: https://viblo.asia/p/cau-hinh-aws-credential-zOQJwYPxVMP
* Lệnh Deploy:
```
make deploy
```
- đợi khoản 30s, sẽ thấy kết quả:
![](https://images.viblo.asia/36b6d08b-6649-4f0d-9891-f5ab7409bcdf.png)

2. Kiểm Tra:
*  Lên aws console: https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions
*  Thấy có 2 function: *lambda-go-dev-world* và *lambda-go-dev-hello* là đã deploy thành công rồi, và nhớ kiểm tra deploy function lên *region* nào.
![](https://images.viblo.asia/c724d059-3af5-454b-8d47-8cf866558b32.png)



**Contact**
* facebook: https://www.facebook.com/phucducdev/
* gmail: ducnp09081998@gmail.com or phucducktpm@gmail.com
* linkedin: https://www.linkedin.com/in/phucducktpm/
* hashnode: https://hashnode.com/@OpenDev
* telegram: https://t.me/OpenDevGolang