## Giới thiệu
Chào các bạn tới với series về Serverless. Bài đầu tiên chúng ta sẽ tìm hiểu về Serverless là gì, AWS Lambda là gì. Song song với series này mình cũng có viết một series về Terraform, mục đích của mình khi viết hai series này chung là hướng tới việc mọi người khi đọc xong có thể thiết kế và triển khai được mô hình Serverless bằng AWS Lambda + quản lý các Infrastructure liên quan tới  AWS Lambda bằng Terraform như API Gateway, Cognito, ...

Serverless là một trong những mô hình phát triển ứng dụng trên cloud. Trước khi ta tìm hiểu về Serverless là gì, ta sẽ nói qua khi ta phát triển ứng dụng trên cloud, cloud sẽ cung cấp cho ta những mô hình phát triển như thế nào.

## Cloud models
Trên Cloud ta sẽ có 4 mô hình phát triển như sau:
+ IaaS (Infrastructure as a Service)
+ PaaS (Platform as a Service)
+ CaaS (Container as a Service)
+ FaaS (Function as a Service)

![image.png](https://images.viblo.asia/c579662f-5722-446a-9d8b-a565c739484a.png)

### Infrastructure as a Service
Đây là mô hình phổ biến nhất khi ta sử dụng cloud, các bạn có thể đã sử dụng nó hàng ngày mà ta không để ý. Ở mô hình này nhà phát triển Cloud sẽ exposes những API mà tương tác với virtualized platform bên dưới, như là API tương tác với máy ảo, API tương tác với storage, ... Để ta có thể tự tạo và quản lý hạ tầng của ta trên cloud. Ví dụ như là AWS Cloud exposes những API liên quan tới EC2, cho phép ta tự tạo và quản lý EC2 của ta một cách dễ dàng bằng Web Console hoặc AWS CLI. Ở mô hình này thì ta sẽ tự tạo, và tự quản lý hạ tầng của ta cũng như việc scale của nó.

### Platform as a Service
Đây là một mô hình phát triển mà cloud sẽ cung cấp cho ta một Platform Framework để ta phát triển ứng dụng danh hơn. Ví dụ để triển khai một ứng dụng web trên cloud, đầu tiên ta phải tạo EC2 (máy ảo), xong rồi ta cấu hình security group để traffic có thể đi vào EC2 của ta, xong sau đó ta deploy ứng dụng trên EC2, và làm lằng nhằng nhiều thứ nữa, thì các nhà phát triển cloud sẽ cung cấp cho ta các Platform để làm việc đó nhanh hơn. Ví dụ như AWS thì có AWS Elastic Beanstalk, là một Platform cho phép ta dễ dàng triển khai một ứng dụng web, ta chỉ cần xài ba cú click chuột đơn giản trên Web Console là ta sẽ có được một ứng dụng web, thay vì phải đi tạo và cấu hình lằng nhằng nhiều thứ khác.

### Container as a Service
Mô hình này thì đơn giản là ta sẽ phát triển ứng dụng dựa trên container và có một tool để quản lý những container của chúng ta, ví dụ như là [Kubernetes](https://viblo.asia/s/bq5QL8QGlD8) (các bạn có thể đọc series về Kubernetes của mình để hiểu hơn về mô hình CaaS). AWS có cung cấp cho ta AWS EKS để phát triển ứng dụng trên mô hình CaaS.

### Function as a Service
Cuối cùng và là cấp nhỏ nhất, cloud cho phép ta phát triển ứng dụng chỉ dựa trên các Function, ta không cần phải tạo và quản lý hạ tầng phúc tạp gì hết, ta chỉ cần quản lý những function của chúng ta, và những function này có thể tự động auto scale mà ta không cần phải cấu hình gì cả, đây chính là thành phần chính trong mô hình Serverless của chúng ta.

## Serverless
Từ trên ta có thể hiểu đơn giản Serverless là mô hình phát triển ứng dụng trên cloud mà cho phép ta xây dựng  và chạy applications của chúng ta một cách dễ dàng, mà không cần quản lý server gì hết.

![image.png](https://images.viblo.asia/a3e43515-c9c9-4865-b35f-ddec7b3171b3.png)

### Lợi ích của mô hình Serverless
Đây là 4 lợi ích mình thấy của  mô hình Serverless:
+ Giảm chi phí của việc quản lý và vận hành server, đây là công việc thường xuyên của DevOps, ta có thể giảm số lượng công việc mà DevOps cần phải làm. Như tạo, quản lý và monitor EC2.
+ Tự động  scale và high-availability: FaaS của chúng ta sẽ tự động scale theo traffic, ta không cần cấu hình gì nhiều, trừ khi ta muốn nó scale theo một cách cụ thế nào đó.
+ Tối ưu tiền sử dụng cloud: đối với cloud vần đề quan trọng nhất là tiền hàng tháng, khi ta xài FaaS thì ta sẽ chỉ cần trả tiền cho từng function được trigger.
+ Hỗ trợ nhiều ngôn ngữ khác nhau: ta có thể dùng nhiều ngôn ngữ khác nhau để viết FaaS

### Điểm yếu của mô hình Serverless
Thì cái nào có điểm mạnh thì cũng có điểm yếu 😂, đây là những điểm yếu mà mình thấy ở mô hình  Serverless:
+ Khó debug.
+ Cold starts: mất một khoảng thời gian nếu function được trigger lần đầu tiên, hoặc function đó ít khi được request tới thì khi nó chạy lại khá tốn thời gian.
+ Khó tổ chức source code: vì mỗi function sẽ được deploy riêng nên cách tổ chức source code sẽ khó hay dễ tùy thuộc vào ngôn ngữ khác nhau.
+ Khó thiết kế môi trường dev local.

### Serverless cloud providers
Thì 3 thằng cloud hiện tại mà phổ biến nhất là AWS, GCP, Azure. Từng thằng nó sẽ cung cấp cho ta dịch vụ FaaS khác nhau:
+ AWS thì cung cấp cho ta AWS Lambda
+ Google Cloud thì có Google Cloud Functions
+ Azure thì là Microsoft Azure Functions

Trong series này mình sẽ dùng AWS và AWS Lambda.

## AWS Lambda
AWS Lambda là một service của AWS cho phép ta chạy và quản lý function. Đây là thành phần chính của mô hình Serverless. Ta sẽ viết code dưới máy local và deploy nó lên AWS Lambda để chạy. Ngoài AWS Lambda thì AWS còn cung cấp cho ta một số dịch vụ như sau để xây dựng mô hình Serverless:

![image.png](https://images.viblo.asia/800d6f45-6db3-4ce3-a27e-073236bcaceb.png)

+ S3 ta dùng để lưu hình ảnh
+ API gateway để ta xây dựng REST API
+ DynamoDB cho database
+ Cognito dùng để Authentication
+ SQS dùng cho queue
+ SNS dùng cho notification (pub-sub)

AWS Lambda được thiết kế cho event-driven architecture, code của chúng ta sẽ được trigger dựa theo một event nào đó, ví dụ là request của client tới API, tất cả các process trigger là độc lập vói nhau và ta chỉ trả tiền cho từng lần function được trigger và chạy. So sánh với EC2 thì ta phải trả tiền theo giờ, ngay cả khi code trên EC2 của chúng ta không xử lý request nào cho user cả thì ta vẫn tốn tiền trả, còn Lambda thì không như vậy.

### Source events

Trên AWS thì Lambda sẽ được trigger từ một số event của các service khác như sau:

![image.png](https://images.viblo.asia/249d1ced-9089-4373-89da-37e444f458d8.png)

### Thiết kế REST API theo mô hình Serverless
Thì có nhiều ứng dụng ta có thể thiết kế theo mô hình Serverless được, mà phổ biến nhất theo mình nghĩ có thể là dùng để xây dựng REST API và Single Page Application, mô hình như sau:

![image.png](https://images.viblo.asia/ca75640f-11f6-4a24-8d1d-056b54ea27a0.png)

Ta sẽ config Route 53 (service dùng để route DNS) chỉa tới CloudFront (Content Delivery Network serivce, dùng dể cache static content), CloudFront của ta sẽ cache nội dung từ S3 (nơi ta lưu Single Page Application, có thể là React - Angular - Vue). Khi client tải nội dung từ Web Single Page Application thì trong ứng dụng này ta sẽ gọi HTTP API tới API gateway (service dùng để xây dựng REST API và dẫn request tới Lambda). Lambda sẽ được trigger từ API gateway, Lambda chạy và kết mối tới DynamoDB, xử lý request và trả kết quả về cho client.

### Các ngôn ngữ AWS Lambda hỗ trợ
Tại thời điểm mình viết bài này thì Lambda hỗ trợ các ngôn ngữ sau đây: Java, Go, PowerShell, Node. js, C#, Python, Ruby. Nếu bạn muốn xài ngôn ngữ khác thì nó có cung cấp Runtime API để bạn integrate với ngôn ngữ đó. Ở trong series này mình sẽ viết bằng Golang, nếu các bạn muốn viết bằng NodeJS thì cứ comment nói mình sẽ viết cả hai phần Golang và NodeJS.

Thì nói nhiều rồi, bây giờ ta sẽ viết AWS Lambda đầu tiên.

## Hello Lambda
Để làm được series này, yêu cầu bạn cần có AWS account nhé. Và cần cài AWS CLI trên máy của bạn. Các bạn làm theo hướng dẫn này nha https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html.

Sau khi cài xong thì bạn test bằng câu lệnh sau:

```
$ aws lambda list-functions
```

Tiếp theo là bạn cần cài Golang trên máy của mình. Các bạn làm theo hướng dẫn ở đây nha https://go.dev/doc/install.

Oke, sau khi làm sau hết thì ta bắt đầu vào việc viết Lambda function đầu tiền. Tạo một folder tên là **hello-lambda** và mở folder đó ra. Bạn mở terminal ngay folder đó và gõ:

```
$ go mod init hello-lambda
go: creating new go.mod: module hello-lambda
go: to add module requirements and sums:
        go mod tidy
```

```
$ go get github.com/aws/aws-lambda-go/lambda
go get: added github.com/aws/aws-lambda-go v1.27.0
```

Tạo một file tên là main.go với đoạn code sau đây:

```go
package main

import "github.com/aws/aws-lambda-go/lambda"

func handler() (string, error) {
	return "Welcome to Serverless world", nil
}

func main() {
	lambda.Start(handler)
}
```

Ta sẽ viết một function tên là handler (ở đây bạn đặt tên gì cũng được) và dùng hàm **lambda.Start(handler)** để Lambda có thể chạy function trên. Tiếp theo ta sẽ build file main.go này thành binary file và zip nó lại thành một file zip để có thể upload được lên AWS Lambda. Maximun của file zip là 50MB nhé.

```
$ GOOS=linux go build -o hello main.go
$ zip main.zip hello
```

Oke, ta đã chuẩn bị xong phần code. Bây giờ ta sẽ lên AWS tạo một Lambda và upload code của ta lên. Truy cập lên AWS Console và gõ Lambda vào khung tìm kiếm.

![image.png](https://images.viblo.asia/9363331f-478e-4098-b58d-709206020df8.png)

Này là UI của AWS Console khi mình viết bài này, trong tương lai có thể sẽ khác. Sau khi vào Lambda thì bạn chuyển sang tab function và bấm create function. Chọn Author from scratch

![image.png](https://images.viblo.asia/774ba9ac-b0ce-44e6-9c14-d50d8cc9cba7.png)

Chỗ basic infomation ta nhập vào function name là hello-lambda và chọn runtime là Go 1.x

![image.png](https://images.viblo.asia/6eee94ae-60ba-4cb5-a589-7a9147ec061c.png)

Sau đó ta bấm create function. Sau khi tạo xong thì ta sẽ thấy UI như sau:

![image.png](https://images.viblo.asia/2679b2db-df80-42ae-96f5-2e09c0d89f3b.png)

Sau khi tạo xong thì ta mở terminal ở folder nãy ta build file zip code, chạy câu lệnh sau:

```
$ aws lambda update-function-code --function-name hello-lambda --zip-file fileb://./main.zip
```

Oke, vậy là ta đã tạo được lambda function đầu tiền, để test được nó thì bạn chạy câu lệnh sau:

```
$ aws lambda invoke --function-name hello-lambda --region us-west-2 response.json
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
```

Bạn mở file response.json lên là sẽ thấy kết quả được lưu là "Welcome to Serverless world", vậy là ta đã chạy được AWS Lambda function đầu tiên 😁. Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để cập nhật tin tức về DevOps nhé.

## Kết luận
Vậy là ta đã tìm hiểu xong về mô hình Serverless và AWS lambda. Thiết kế ứng dụng với mô hình Serverless sẽ giúp ta đỡ việc hơn trong việc quản lý server, và dùng AWS lambda sẽ tiết kiệm chi phí hơn so với việc sử dụng EC2. Nếu các bạn muốn mình tạo resource trên AWS bằng terraform thay vì web console thì comment ở dưới nhé. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Mong các bạn theo dõi series của mình nhé 😆😁. Ở bài tiếp theo mình sẽ nói về cách dùng API Gateway để làm REST API với Lambda.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).

Đồng đội [Junior Backend Engineer](https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067).

Đồng đội [Junior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/junior-frontend-engineer-1068).

Đồng đội [Onsite Merchandising (Web Admin)](https://tuyendung.hoang-phuc.com/careers/job/945)