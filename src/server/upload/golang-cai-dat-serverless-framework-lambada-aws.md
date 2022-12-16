### Cách 1
*  Để chuẩn bị cài đặt serverless framework trên máy, bạn cần phải cài đặt nodejs trên máy, [install nodejs](https://nodejs.org/en/)
* Sau khi cài đặt xong thì kiểm tra *node -v* , nếu hiển thị ra được kết quả như này là ok:
![](https://images.viblo.asia/d0559e5d-edd8-49e5-8a0f-3f563186d209.png)
* Sau khi xong bạn run:
```
npm install -g serverless
```
* Bạn cũng có thể upgrade bằng:
```
npm install -g serverless
```
* Còn muốn install chỉ định version:
```
npm install -g serverless@2
```
* Cuối cùng run:
```
serverless
```
hoặc
```
sls
```
=> kết quả hiện ra thế này là ok:
![](https://images.viblo.asia/edcad6c4-71ad-4fbd-9bac-c1454867ae36.png)


-----

### Cách 2
**MacOS/Linux**
* Để cài đặt serverless thông qua bash, bạn run:
```
curl -o- -L https://slss.io/install | bash
```
* Chỉ định version 2 mà bạn muốn:
```
curl -o- -L https://slss.io/install | VERSION=2.72.2 bash
```
**Windows**
* Bạn cần run để cài đặt:
```
choco install serverless
```
* Và Upgrade:
```
choco upgrade serverless
```

## Demo Code Golang đơn giản:
1. Lambda là gì: 
* Để hiểu đơn giản thì lambda là bạn sài bao nhiêu trả tiền chừng đó.
* Trước anh/em mình sài ec2 thì sẽ được tính theo giờ, sài hay không cũng bị tính. Còn Lambda thì tính tiền trên số lượng request và thời gian xử lý của hàm đó.
![](https://images.viblo.asia/2a1c48bd-4c6e-4893-8800-b695a4224d20.png)

2. Điều kiện:
* Để làm việc với lambda thì bạn cần có thẻ tín dụng để đăng kí aws tài khoản, sau khi đăng kí ok thì sài thôi, hihi.
* Bạn vào trang web [này](https://aws.amazon.com/lambda/) sau đó thì tạo một function đơn giản.
* Bạn setup config credential của aws trên máy nữa nhé, tham khảo link: https://viblo.asia/p/cau-hinh-aws-credential-zOQJwYPxVMP

3. Run serverless để tạo project:
* step1:
```
sls create -t aws-go -p aws-go
```
-t là template; -p là folder của project
* step 2:
```
make build
```
* step3
```
serverless deploy
```

**NGuồn**:
https://aws.amazon.com/lambda/
https://www.serverless.com/framework/docs/getting-started

**Contact**
* facebook: https://www.facebook.com/phucducdev/
* gmail: ducnp09081998@gmail.com or phucducktpm@gmail.com
* linkedin: https://www.linkedin.com/in/phucducktpm/
* hashnode: https://hashnode.com/@OpenDev
* telegram: https://t.me/OpenDevGolang