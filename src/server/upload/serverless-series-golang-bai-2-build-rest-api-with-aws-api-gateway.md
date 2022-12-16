# Giới thiệu
Chào các bạn tới với series về Serverless, ở bài trước chúng ta đã nói về kiến trúc Serverless là gì, AWS Lambda là gì và nó đóng vai trò như thế nào trong mô hình Serverless. Ở bài này chúng ta sẽ tìm hiểu về thành phần thứ hai để ta xây dựng mô hình Serverless trên môi trường AWS Cloud, là API Gateway. Ta sẽ sử dụng API Gateway kết hợp với Lambda để xây dựng một REST API theo mô hình Serverless.

Hình minh họa REST API mà ta sẽ xây dựng.

![](https://images.viblo.asia/5a48474d-e1ab-43b9-ae0f-d3c69f62bdef.jpg)

# API Gateway
Như đã nói ở bài trước, AWS Lambda function của ta sẽ không thể tự động chạy, mà nó sẽ được thực thi bởi một event nào đó. Thì API Gateway là một trong những serivce mà sẽ phát ra event để thực thi Lambda function, cụ thể hơn là API Gateway sẽ phát ra một event tới Lambda function khi có một http request từ phía người dùng gọi tới nó, do đó nó rất thích hợp cho việc xây dựng REST API.

Trong mô hình Serverless thì API Gateway sẽ đóng vai trò như là một entry point cho toàn bộ Lambda functions của ta, nó sẽ proxy và điều hướng một http request tới đúng Lambda function mà ta muốn.

Bên cạnh việc đóng vai trò như một entry point cho Lambda function, API Gateway còn có những đặc tính nổi bật sau đây:
+ Caching: Ta có thể cache lại kết quả mà Lambda trả về => giảm số lần mà API Gateway gọi tới Lambda function bên dưới, giúp ta giảm tiền và giảm thời gian response của một request.
+ Cấu hình CORS.
+ Deployment stages: API Gateway hỗ trợ tạo và quản lý các version khác nhau của API, do đó ta có thể chia ra được nhiều môi trường (dev, staging, production).
+ Hỗ trợ monitor và debug ở tầng http request
+ Hỗ trợ ra tạo ra document một cách dễ dàng, như là export API ra theo dạng docs mà Swagger có thể đọc được

Ta chỉ nói lý thuyết nhiêu đây thôi, tiếp theo ta sẽ bắt tay vào xây dựng REST API.

# Xây dựng REST API
Ta sẽ làm một REST API mà thực hiện CRUD đơn giản, gồm list books, get one books, create book, update book và delete book. Ở chương này ta chỉ tương tác với dữ liệu giả được gán cứng vào biến, ta chưa có tương tác với database nha.

## Khởi tạo Lambda function
Bước đầu tiên ta sẽ tạo một lambda fuction mà trả về list books.

![image.png](https://images.viblo.asia/6d6dd6db-49c1-4762-8c01-0c19f43f0a0e.png)

Mình sẽ dùng terraform để tạo lambda function, nếu các bạn chưa quen với terraform thì xem [bài trước](https://viblo.asia/p/serverless-series-golang-bai-1-serverless-va-aws-lambda-gAm5y71XZdb) để biết cách tạo bằng AWS Web Console nhé, còn các bạn muốn tìm hiểu về Terraform thì mình cũng có viết series về [Terraform](https://viblo.asia/s/terraform-series-3m5WB8JvlO7), các bạn có thể đọc để biết thêm. Các bạn tải code ở repo github này https://github.com/hoalongnatsu/serverless-series.git, nhảy vào folder bai-2/terraform-start. Chạy những câu lệnh sau `terraform init` -> `terraform apply -auto-approve`. Sau khi chạy xong bạn sẽ thấy trên một lambda function tên là books_list được tạo ra trên AWS.

![image.png](https://images.viblo.asia/1cfb9edf-4e16-49c4-ba1f-130751106bd8.png)

Bây giờ ta sẽ viết code cho function list, tạo một folder tên list, mở nó ra và tạo một file tên là main.go với code sau đây.

```main.go
package main

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/lambda"
)

type Books struct {
	Id     int    `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
}

func list() (string, error) {
	books := []Books{
		{Id: 1, Name: "NodeJS", Author: "NodeJS"},
		{Id: 2, Name: "Golang", Author: "Golang"},
	}

	res, _ := json.Marshal(&books)
	return string(res), nil
}

func main() {
	lambda.Start(list)
}
```

Sau khi viết code xong, ta chạy câu lệnh sau để build golang code ra file binary và upload nó lên lambda function. Tải package `go mod init list && go get` và build code:

```
go build -o main main.go
zip list.zip main
rm -rf main
```

Để tiện cho sau này build thì bạn tao một file tên là `build.sh`, copy đoạn code trên vào. Folder của ta sau lúc này sẽ như sau:

```
.
├── build.sh
├── go.mod
├── go.sum
├── list.zip
└── main.go
```

Sau khi build ra được file `list.zip`, ta sẽ update lại books_list lambda function.

```
$ aws lambda update-function-code --function-name books_list --zip-file fileb://list.zip --region us-west-2
```

Khi upload code xong ta kiểm tra lại xem lambda function của ta có chạy đúng không.

```
$ aws lambda invoke --function-name books_list response.json --region us-west-2
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}

$ cat response.json ; echo
"[{\"id\":1,\"name\":\"NodeJS\",\"author\":\"NodeJS\"},{\"id\":2,\"name\":\"Golang\",\"author\":\"Golang\"}]"
```

Nếu bạn thấy kết quả trên thì lambda function của ta đã chạy đúng. Tiếp theo, thay vì thực thi function bằng CLI, ta sẽ dùng API Gateway để thực thi nó.

## Khởi tạo API Gateway
Mở Web Console và kiếm API Gateway.

![image.png](https://images.viblo.asia/06b4f0c9-8e15-40fc-9aaa-ff22b76c1428.png)

Chọn REST API không có private.

![image.png](https://images.viblo.asia/d9d70e8a-c80f-4888-9845-7fb187fc439d.png)

Chỗ protocol ta chọn REST, chọn New API, chỗ API name bạn nhập gì cũng được, của mình thì mình nhập là BOOKS. Endpoint Type ta chọn Regional.

![image.png](https://images.viblo.asia/1c2d0dd8-741c-4c69-abdc-d175b11ad9ec.png)

Nhập xong hết thì ta bấm Create API và ta sẽ qua trang có UI như sau.

![image.png](https://images.viblo.asia/7631c67f-ae51-4406-a33e-f301cc10ca98.png)

Giờ ta sẽ định nghĩa API của ta. Bấm vào chỗ Actions, chọn Create Resource.

![image.png](https://images.viblo.asia/66861242-71d2-4f07-a281-efe8ab5c9ed2.png)

Chỗ Resource Name và Resource Path, ta nhập vào là books. Nhấn Create Resource.

![image.png](https://images.viblo.asia/446a5840-4d80-4c1d-9eb0-81800c47ab54.png)

Sau khi tạo xong, bạn sẽ thấy chỗ Resource có thêm path là `/books`.

![image.png](https://images.viblo.asia/a1981969-7f76-493e-b4e7-dd22dc85d709.png)

### API List

Giờ ta sẽ tạo method chỗ Resource này, nhấn vào Actions, chọn Create Method.

![image.png](https://images.viblo.asia/c56c2389-bf64-46bd-9fd6-7b8d324338c7.png)

Sau đó nó sẽ hiện một ô dropdown cho bạn, ta chọn GET và nhấn nút check.

![image.png](https://images.viblo.asia/b19d975d-5932-4791-8e73-e8f28cddf877.png)

![image.png](https://images.viblo.asia/78bb0302-6511-43f9-9c72-f0529fe7b89b.png)

Nó sẽ hiện UI như sau, bạn chọn như hình phía dưới và ở ô nhập vào Lambda Function, bạn nhập vào books_list.

![image.png](https://images.viblo.asia/0174cc46-80b9-4c61-bad9-16dfab08e46b.png)

Và nhấn Save. Sẽ có một modal mở lên nói là nó sẽ tạo permission để API Gateway có thể thực thi được Lambda function, ta chọn OK.
 
![image.png](https://images.viblo.asia/9cc96f98-1055-41f6-98e2-74682a32efd1.png)
 
Tiếp theo ta sẽ deploy REST API của ta, chỗ Actions, chọn Deploy API.
 
![image.png](https://images.viblo.asia/4303bd16-a5a2-4be3-a646-bca2fd2f7044.png)
 
Ta chọn New Stage, chỗ Stage name nhập vào staging  (này bạn nhập gì cũng được).
 
![image.png](https://images.viblo.asia/1e1d37fc-827c-4417-8863-890bda0b2cbe.png)
 
Và bấm Deploy. Và ta sẽ có UI như sau.
 
![image.png](https://images.viblo.asia/4a76bd87-8612-4506-a9c0-d5dd5ccb439c.png)
 
Mở staging ra, chọn vào GET method, ta sẽ thấy được URL của API mà thực hiện get list books cho ta.
 
![image.png](https://images.viblo.asia/49008cdc-272c-4c49-b6ab-26eacdd9cb8f.png)
 
Oke, vậy là ta đã deploy được REST API đầu tiên của ta 😁. Bạn copy URL và thực hiện gửi request tới nó.

```
$ curl https://ferwqd3ttf.execute-api.us-west-2.amazonaws.com/staging/books ; echo
{"message": "Internal server error"}
```
 
Và ta sẽ thấy có lỗi xảy ra 😂. Lý do là vì để Lambda kết hợp được với API Gateway, thì Lambda function phải trả về đúng format mà API Gateway quy định. Ở đoạn code trên ta trả về kết quả chưa đúng format.

```main.go
...
func list() (string, error) {
    books := []Books{
        {Id: 1, Name: "NodeJS", Author: "NodeJS"},
        {Id: 2, Name: "Golang", Author: "Golang"},
    }

    res, _ := json.Marshal(&books)
    return string(res), nil // response not valid format of API Gateway
}
...
```

Format đúng của response mà Lambda function trả về cho API Gateway sẽ như sau:

```
type Response struct {
    StatusCode int `json:"statusCode"`
    Body string `json:"body"`
}
```

Nó sẽ gồm một trường statusCode định dạng số và một trường body định dạng là string. Ta cập nhật lại file main.go

```main.go
package main

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/lambda"
)

type Response struct {
	StatusCode int    `json:"statusCode"`
	Body       string `json:"body"`
}

type Books struct {
	Id     int    `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
}

func list() (Response, error) {
	books := []Books{
		{Id: 1, Name: "NodeJS", Author: "NodeJS"},
		{Id: 2, Name: "Golang", Author: "Golang"},
	}

	res, _ := json.Marshal(&books)
	return Response{
		StatusCode: 200,
		Body:       string(res),
	}, nil
}

func main() {
	lambda.Start(list)
}
```

Build code và upload lại lên AWS.

```
$ sh build.sh
updating: main (deflated 46%

$ aws lambda update-function-code --function-name books_list --zip-file fileb://list.zip --region us-west-2
```

Giờ ta gọi lại API list books, ta sẽ thấy được kết quả trả về mà không có lỗi xảy ra.

```
$ curl https://ferwqd3ttf.execute-api.us-west-2.amazonaws.com/staging/books ; echo
[{"id":1,"name":"NodeJS","author":"NodeJS"},{"id":2,"name":"Golang","author":"Golang"}]
```

Oke, bây giờ thì REST API đầu tiên của ta mới thực sự được deploy thành công. Để làm đúng thì AWS có cũng cấp cho ta bộ Golang SDK để ta tránh được mấy lỗi trên và viết code nhanh hơn. Thay vì phải tự tạo struct Response , thì ta xài SDK như sau, tải package `go get github.com/aws/aws-lambda-go/events`, update lại main.go, ta sử dụng struct có sẵn là **APIGatewayProxyResponse**.

```main.go
package main

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Books struct {
	Id     int    `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
}

func list() (events.APIGatewayProxyResponse, error) {
	books := []Books{
		{Id: 1, Name: "NodeJS", Author: "NodeJS"},
		{Id: 2, Name: "Golang", Author: "Golang"},
	}

	res, _ := json.Marshal(&books)
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
        Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body:       string(res),
	}, nil
}

func main() {
	lambda.Start(list)
}
```

Minh họa Serverless hiện tại của ta.

![image.png](https://images.viblo.asia/db86608c-13c0-432c-9347-750fae0a3729.png)

### API get one
Tiếp theo ta sẽ làm API get one book theo id. Handle function của lambda khi kết hợp với API sẽ có params đầu tiên được truyền vào là **APIGatewayProxyRequest**, nó sẽ chứa giá trị request của user, ta sẽ định nghĩa đường dẫn của API get one là /books/{id}, trong đó id là param, và nó sẽ nằm trong trường **PathParameters** của **APIGatewayProxyRequest**. Ta tạo một folder tên là getOne, mở nó ra và tạo một file main.go với code như sau:

```getOne/main.go
package main

import (
	"encoding/json"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Books struct {
	Id     int    `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
}

func getOne(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	books := []Books{
		{Id: 1, Name: "NodeJS", Author: "NodeJS"},
		{Id: 2, Name: "Golang", Author: "Golang"},
	}

	id, err := strconv.Atoi(req.PathParameters["id"])
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       err.Error(),
		}, nil
	}

	res, err := json.Marshal(books[id-1])
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       err.Error(),
		}, nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(getOne)
}
```

Tải package và build source.

```
go mod init getone
go get
```

```getOne/build.sh
#!/bin/bash

GOOS=linux go build -o main main.go
zip getOne.zip main
rm -rf main
```

```
sh build.sh
```

Tạo Lambda function cho API get one.

```
$ aws lambda create-function --function-name books_get_one --zip-file fileb://getOne.zip --runtime go1.x --handler main --role arn:aws:iam::ACCOUNT_ID:role/lambda_role --region us-west-2
```

Với `arn:aws:iam::ACCOUNT_ID:role/lambda_role`, giá trị ACCOUNT_ID là account id của bạn.

![image.png](https://images.viblo.asia/c0168ba3-7c16-4ea9-8b37-934c18a89b35.png)

Giờ ta sẽ tạo API cho get one. Quay lại API Gateway, bấm vào /books, chọn Actions -> Create Resource.

![image.png](https://images.viblo.asia/01a16245-240d-4f17-8044-07aef901cd7c.png)

Nhập vào {id} và bấm tạo.

![image.png](https://images.viblo.asia/17195824-cf69-4042-93a9-4db84445897d.png)

Và tạo method cho {id}, chọn GET.

![image.png](https://images.viblo.asia/2bc04c6e-b8bc-4920-8dae-736082e5aad3.png)

Ở chỗ tên function ta nhập vào books_get_one.

![image.png](https://images.viblo.asia/be9353dc-5c56-4cc3-947e-084372013ae9.png)

Bấm tạo và nó sẽ hỏi tạo permission, ta OK. Ta bấm deploy lại.

![image.png](https://images.viblo.asia/0c655b1e-3b9a-49fd-b201-45971eae9556.png)

Lần này ta ở Deployment stage chọn lại staging trước đó và nhấn Deploy.
Và ta sẽ thấy URL API get one của ta.

![image.png](https://images.viblo.asia/d41eb023-168b-4790-a671-625b4a7837e3.png)

Thực hiện request tới nó.

```
$ curl https://ferwqd3ttf.execute-api.us-west-2.amazonaws.com/staging/books/1 ; echo
{"id":1,"name":"NodeJS","author":"NodeJS"}
```

Oke, ta đã deploy get one API thành công. Bây giờ Serverless của ta sẽ như sau.

![image.png](https://images.viblo.asia/1d8eed05-8757-4f73-b015-e5a495f7e9fb.png)

### API create
Tiếp theo là API tạo book mới, do ta không có dùng API nên ta chỉ đơn giản là lấy body từ request của client rồi append vào mảng hiện tại. Tạo một folder tên là create, mở nó ra và tạo một file tên là main.go với code như sau:

```create/main.go
package main

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Books struct {
	Id     int    `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
}

var books = []Books{
	{Id: 1, Name: "NodeJS", Author: "NodeJS"},
	{Id: 2, Name: "Golang", Author: "Golang"},
}

func create(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var book Books
	err := json.Unmarshal([]byte(req.Body), &book)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       err.Error(),
		}, nil
	}

	books = append(books, book)

	res, err := json.Marshal(&books)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       err.Error(),
		}, nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(create)
}
```

Tải package và build source.

```
go mod init create
go get
```

```create/build.sh
#!/bin/bash

GOOS=linux go build -o main main.go
zip create.zip main
rm -rf main
```

```
sh build.sh
```

Tạo Lambda function cho API create.

```
$ aws lambda create-function --function-name books_create --zip-file fileb://create.zip --runtime go1.x --handler main --role arn:aws:iam::ACCOUNT_ID:role/lambda_role --region us-west-2
```

![image.png](https://images.viblo.asia/1347a8a8-d209-481b-af59-334e32aa53e4.png)

Ở API Gateway, chọn lại mục Resource, bấm vào /books, chọn Actions -> Create Resource, xong đó ở chỗ dropdown ta chọn POST method.

![image.png](https://images.viblo.asia/d6891d7f-417a-4fe6-8a70-2f30a180a67e.png)

Ở ô nhập function, ta nhập vào books_create.

![image.png](https://images.viblo.asia/e7c23117-bebd-4c7b-a16f-f7db4c99e07a.png)

Bấm save và chọn OK khi nó hỏi tạo permission. Sau đó ta deploy lại.

![image.png](https://images.viblo.asia/ee206858-6b12-4557-aa30-760d42d0bb01.png)

Chọn staging như trước đó và nhấn Deploy, và ta sẽ có URL cho API create.

![image.png](https://images.viblo.asia/12e0e391-017a-4b47-907a-c9050e77b822.png)

Gửi request tới nó.

```
$ curl -sX POST -d '{"Id":3, "name": "Java", "author": "Java"}'  https://ferwqd3ttf.execute-api.us-west-2.amazonaws.com/staging/books ; echo
[{"id":1,"name":"NodeJS","author":"NodeJS"},{"id":2,"name":"Golang","author":"Golang"},{"id":3,"name":"Java","author":"Java"}]
```

Oke, API create của ta cũng đã được deploy thành công. Minh họa Serverless hiện tại.

![image.png](https://images.viblo.asia/3d8453ec-ee5a-48ad-a4fa-0481c0603116.png)

# Warm start - Cold start
Ta gọi thêm một lần nữa, bạn sẽ thấy là giá trị được append vào mảng hiện tại và có chứa cả giá trị ta gửi lên lần trước.

```
$ curl -sX POST -d '{"Id":4, "name": ".NET", "author": ".NET"}'  https://ferwqd3ttf.execute-api.us-west-2.amazonaws.com/staging/books ; echo
[{"id":1,"name":"NodeJS","author":"NodeJS"},{"id":2,"name":"Golang","author":"Golang"},{"id":3,"name":"Java","author":"Java"},{"id":4,"name":".NET","author":".NET"}]
```

Nhưng khi ta đợi thời gian khoảng chừng một 5 phút sau, bạn gọi lại là sẽ thấy là hai giá trị trước đó ta gửi lên bị mất đi.

```
$ curl -sX POST -d '{"Id":5, "name": "PHP", "author": "PHP"}'  https://ferwqd3ttf.execute-api.us-west-2.amazonaws.com/staging/books ; echo
[{"id":1,"name":"NodeJS","author":"NodeJS"},{"id":2,"name":"Golang","author":"Golang"},{"id":5,"name":"PHP","author":"PHP"}]
```

Tại sao lại như vậy? Thì vấn đề này được gọi là Warm start và Cold start trong AWS Lambda. Khi một AWS Lambda thực thi một lambda function, thì nó sẽ làm các bước sau đây:
+ Khi function được thực thi lần đầu tiên, AWS Lambda sẽ kiếm chỗ nào đó trên hệ thống máy ảo bên dưới của nó mà có đủ resource để chạy function này, sau khi kiếm được, nó sẽ tạo một container với môi trường phù hợp cho function của ta, sau khi container được tạo xong thì function sẽ được thực thi trong container đó và trả về kết quả cho client, quá trình này gọi là Cold start.
+ Và lần sau khi function được thực thi, AWS Lambda sẽ kiểm tra trước đó có container cho function này chưa, nếu có rồi thì nó sẽ sử dụng container cũ để thực thi function, quá trình này gọi là Warm start.

Nhưng nếu một khoảng thời gian mà function không được trigger nữa, container đó sẽ bị xóa đi, và quá trình Cold start sẽ được lặp lại. Đây là lý do vì sao Lambda function là một stateless application, nó không có dùng để lưu dữ liệu được, mà ta phải dùng một service khác để lưu dữ liệu cho ta, như là AWS RDS hoặc DynamoDB.

![image.png](https://images.viblo.asia/de605d40-b4cf-4652-a663-67cabf9a199d.png)

Các API khác như update và delete thì các bạn làm tương tự nhé. Toàn bộ code của chương này nằm ở repo github ở trên nha.

# Kết luận
Vậy là ta đã tìm hiểu xong về các xây dựng REST API theo mô hình Serverless với API Gateway và AWS Lambda. Nếu các bạn thấy chỉ làm một vài API đơn giản mà gì đâu phải tạo nhiều thứ quá thì là do ở đây mình làm bằng tay thôi với do mình giải thích từng cái nên nó sẽ chậm, còn làm thực tế thì ta sẽ có tool để tự động deploy như terraform, viết luồng CI/CD để tự động deploy code, dev local với AWS Serverless Application Model (SAM), những thứ này mình sẽ nói ở các bài sau. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Bài tiếp theo ta sẽ nói về cách sử dụng Lambda với DynamoDB.

# Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221
+ Manual QC. https://tuyendung.hoang-phuc.com/job/seniorjunior-manual-qc-1039

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.