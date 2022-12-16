## Giới thiệu
Chào các bạn tới với series về Serverless, ở bài trước chúng ta đã nói về cách sử dụng AWS API Gateway kết hợp với AWS Lambda để xây dựng REST API theo mô hình Serverless. Tuy nhiên, Lambda functions là stateless application nên nó không thể lưu trữ dữ liệu được, nên ở bài này ta sẽ tìm hiểu về thành phần thứ ba để xây dựng mô hình Serverless trên môi trường AWS Cloud, là DynamoDB.

Kết thúc bài trước thì ta đã xây được REST API với API Gateway + Lambda theo minh họa sau đây.

![image.png](https://images.viblo.asia/b5c4f52d-72a4-404a-a124-bb2fe28da1c5.png)

Ở bài này thì mình sẽ dùng Terraform để tạo ra hệ thống ở trên, nên ta không cần phải tạo từ đầu, nếu các bạn muốn biết cách tạo bằng tay theo từng bước thì các bạn đọc ở [bài trước](https://viblo.asia/p/serverless-series-golang-bai-2-build-rest-api-with-aws-api-gateway-6J3Zga3L5mB) nhé. Bước tiếp theo ta cần làm cho hệ thống trên là gắn thêm DynamoDB vào để lưu trữ data, minh họa như sau.

![image.png](https://images.viblo.asia/d071fcca-df08-46a7-9b84-ea28c644ac50.png)

## DynamoDB
DynamoDB là database dạng NoSQL, được thiết kế và phát triển bởi AWS. Đây là một trong những service thuộc dạng Serverless của AWS, nó có thể tự động scale tùy thuộc vào dữ liệu ta ghi và đọc vào DB, dữ liệu có thể được lưu trữ dưới dạng encryption để tăng độ bảo mật, có thể tự động backup và restore dữ liệu.

![image.png](https://images.viblo.asia/523728b1-67ab-46da-8da6-c77018d2e6b8.png)

Ta sẽ xem qua một vài khái niệm chính của DynamoDB mà ta cần hiểu trước khi sử dụng nó với Lambda. 

### Kiến trúc của DynamoDB
Gồm có **Table** là tập họp của nhiều items (rows), với mỗi item là tập họp của nhiều attributes (columns) và values.

![image.png](https://images.viblo.asia/98f29e0a-abc5-460a-ae0f-6640c52703f3.png)

Trong table thì sẽ có **primary keys**, và primary keys thì có hai loại là:
+ Partition key: là một hash key, giá trị của nó sẽ là unique ID trong một bảng.
+ Partition key + sort key: là một cặp primary key, với partition key dùng để định nghĩa item đó trong một bảng và sort key dùng để sort item theo partition key.

![image.png](https://images.viblo.asia/84870f55-332d-4e8b-be9a-48ca3d419bc2.png)

Ngoài ra trong table còn có **Index**, thì giống với các loại database khác nó dùng để tăng tốc độ query của một table, có hai loại index là Global Secondary Index (GSI) với Local Secondary Index (LSI).

### Tương tác với DynamoDB
Ta sẽ có các **operations** sau để tương tác với DynamoDB:
+ Scan: operation này sẽ duyệt qua toàn bộ table để tìm kiếm item theo điều kiện nào đó.
+ Query: operation này sẽ kiếm item theo primary key và trả về một list.
+ PutItem: operation này dùng sẽ tạo mới hoặc cập nhật lại một item.
+ GetItem: operation này sẽ kiếm item theo primary key và chỉ trả về kết quả đầu tiên.
+ DeleteItem: operation này sẽ xóa item trong table dựa vào primary key.

Đây là những hàm cơ bản để ta tương tác với DynamoDB, để hiểu rõ hơn về DynamoDB thì còn rất nhiều thứ để học 😂, ở bài này ta chỉ xem qua một số cái cơ bản để ta có thể làm việc với nó, mình cũng không có biết nhiều lắm về DynamoDB 😂. Giờ ta sẽ tiến hành tạo bảng và sẽ viết code để Lambda có thể lưu dữ liệu vào trong DynamoDB.

### Tạo bảng
Truy cập lên AWS Web Console, kiếm DynamoDB và bấm vào create table, bạn sẽ thấy giao diện sau đây, ở chỗ Table name điền vào là books, ở chỗ Partition key điền vào id.

![image.png](https://images.viblo.asia/1989ef40-7fcb-4838-a005-76a0d3099486.png)

Các giá trị còn lại bạn để mặc định.

![image.png](https://images.viblo.asia/342fbc86-1d5f-478c-a719-2047026a9fb9.png)

Bấm tạo và chờ một lát và bạn sẽ thấy table của ta.

![image.png](https://images.viblo.asia/b0ef8bee-7b10-4748-8826-443064084d52.png)

Ta cũng có thể tạo bằng câu CLI sau đây cho nhanh nếu bạn không muốn dùng UI.

```
$ aws dynamodb create-table --table-name books --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
```

Sau khi tạo bảng xong thì ta sẽ ghi vào một vài dữ liệu mẫu.

### Ghi dữ liệu vào DynamoDB
Bấm vào books table, ở mục action, chọn create item.

![image.png](https://images.viblo.asia/d2f407d9-c722-40d9-9e51-4421e5692f1f.png)

Xong điền vào giá trị như sau và bấm tạo.

![image.png](https://images.viblo.asia/d48ba66d-f89a-4eaf-9a4b-46aa7db4aa0c.png)

Sau khi tạo xong, kéo xuống mục Item summary, bấm vào View items.

![image.png](https://images.viblo.asia/a8ae3099-21bb-47c5-8e98-8b7abb708178.png)

Ta sẽ thấy item ta vừa tạo.

![image.png](https://images.viblo.asia/255c3ca0-804e-4fa2-b1a9-1cd45948f7e1.png)

Ta có thể dùng CLI để ghi dữ liệu vào bảng, như sau:

```
$ aws dynamodb put-item --table-name books --item file://item.json
```

```item.json
{
  "id": {
    "S": "2"
  },
  "name": {
    "S": "Golang"
  },
  "author": {
    "S": "Golang"
  }
}
```

Kết quả.

![image.png](https://images.viblo.asia/7c911642-4431-4c6c-9faa-9c1fecaea974.png)

Sau khi ghi dữ liệu mẫu vào trong DB xong, bây giờ ta sẽ chuyển sang integrate Lambda với DynamoDB, đầu tiên ta sẽ viết function list dữ liệu trong DynamoDB ra.

## Integrate Lambda với DynamoDB
Đầu tiên ta sẽ tạo API Gateway + Lambda function trước, như đã nói ở trên thì ta sẽ dùng terraform, các bạn xem [bài 2](https://viblo.asia/p/serverless-series-golang-bai-2-build-rest-api-with-aws-api-gateway-6J3Zga3L5mB) để biết cách tạo bằng tay. Các bạn tải source code ở git repo này https://github.com/hoalongnatsu/serverless-series.git, di chuyển tới folder bai-3/terraform-start, mở file policies/lambda_policy.json ra.

```lambda_policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "1",
      "Action": "logs:*",
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Sid": "2",
      "Effect": "Allow",
      "Action": "dynamodb:*",
      "Resource": "arn:aws:dynamodb:us-west-2:<ACCOUNT_ID>:table/books"
    }
  ]
}
```

Ở chỗ resource `arn:aws:dynamodb:us-west-2:<ACCOUNT_ID>:table/books`, thay ACCOUNT_ID bằng account AWS của bạn. Xong sau đó, bạn chạy câu lệnh:

```
terraform init
terraform apply -auto-approve
```

Xong khi tạo xong, bấm vào AWS Lambda và API Gateway, bạn sẽ thấy các function như sau.

![image.png](https://images.viblo.asia/7755e6ff-692a-48fa-8dac-aac5634d1dd1.png)

API Gateway

![image.png](https://images.viblo.asia/554088e0-ccbb-43ec-a4a3-dc27f90fd9b6.png)

Bấm vào books-api và bấm qua mục Stages, ta sẽ thấy URL của API ngay chỗ Invoke URL.

![image.png](https://images.viblo.asia/6653ecfa-33bd-4716-b214-71eef5df42b0.png)

Oke, vậy là ta đã chuẩn bị xong, tiếp theo ta sẽ tiến hành viết code nào. Tạo thư mục như sau.

```
.
├── create
│   ├── build.sh
│   └── main.go
├── delete
│   ├── build.sh
│   └── main.go
├── get
│   ├── build.sh
│   └── main.go
└── list
    ├── build.sh
    └── main.go
```

```list/build.sh
#!/bin/bash

GOOS=linux go build -o main main.go
zip list.zip main
rm -rf main
```

Các file `build.sh` còn lại các bạn thay tên file zip tương ứng với tên thư mục, ví dụ ở thư mục list thì file zip build ra sẽ là `list.zip`. Đầu tiên là sẽ viết code cho API list trước.

### List with scan operation
Cập nhật code của file list/main.go như sau:

```list/main.go
package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

func list(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error while retrieving AWS credentials",
		}, nil
	}

	svc := dynamodb.NewFromConfig(cfg)
	out, err := svc.Scan(context.TODO(), &dynamodb.ScanInput{
		TableName: aws.String("books"),
	})
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}

	res, _ := json.Marshal(out.Items)
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(list)
}
```

Init code và upload code lên AWS Lambda.

```
go mod init list
go get
sh build.sh
aws lambda update-function-code --function-name books_list --zip-file fileb://list.zip --region us-west-2
```

Để tương tác được với DynamoDB, ta sẽ sử dụng hai package là `github.com/aws/aws-sdk-go-v2/config` và `github.com/aws/aws-sdk-go-v2/service/dynamodb`.

Đầu tiên, ta sẽ load config mặc định khi Lambda function được thực thi bằng câu lệnh `config.LoadDefaultConfig(context.TODO())`.

Sau đó ta sẽ khởi tạo DynamoDB bằng config trên với câu lệnh `dynamodb.NewFromConfig(cfg)`. Để lấy toàn bộ item trong bảng books, ta dùng lệnh scan ở đoạn code sau.

```go
out, err := svc.Scan(context.TODO(), &dynamodb.ScanInput{
    TableName: aws.String("books"),
})
```

Gọi thử API của ta, copy Invoke URL ở API Gateway.

```
$ curl https://utp0mbdckb.execute-api.us-west-2.amazonaws.com/staging/books
[{"author":{"Value":"Golang"},"id":{"Value":"2"},"name":{"Value":"Golang"}},{"author":{"Value":"NodeJS"},"id":{"Value":"1"},"name":{"Value":"NodeJS"}}]
```

![image.png](https://images.viblo.asia/1a6adcab-9211-4aa7-9c30-29349145e279.png)

Ta sẽ thấy dữ liệu ở trong bảng books của ta đã được API trả về chính xác, vậy là ta đã kết nối được Lambda function với DynamoDB 😁. Nhưng mà kết quả ở trên nó trả về không được đẹp cho lắm, ta sẽ sửa lại để API của ta trả về kết quả với định dạng dễ xài hơn. Ta sẽ dùng package `github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue` để format dữ liệu, tải package.

```
go get github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue
```

Cập nhật lại file main.go với đoạn code sau

```list/main.go
package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type Book struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
}

func list(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error while retrieving AWS credentials",
		}, nil
	}

	svc := dynamodb.NewFromConfig(cfg)
	out, err := svc.Scan(context.TODO(), &dynamodb.ScanInput{
		TableName: aws.String("books"),
	})
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}

	books := []Book{}
	err = attributevalue.UnmarshalListOfMaps(out.Items, &books)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error while Unmarshal books",
		}, nil
	}

	res, _ := json.Marshal(books)
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(list)
}
```

Ta sẽ format lại dữ liệu trả về với struct Book ở đoạn code.

```go
books := []Book{}
err = attributevalue.UnmarshalListOfMaps(out.Items, &books)
```

Giờ khi gọi lại API, ta sẽ thấy kết quả trả về với định dạng dễ xài hơn.

```
$ curl https://utp0mbdckb.execute-api.us-west-2.amazonaws.com/staging/books
[{"id":"2","name":"Golang","author":"Golang"},{"id":"1","name":"NodeJS","author":"NodeJS"}]
```

![image.png](https://images.viblo.asia/2ac6ee08-965b-4550-ba33-e1d6697f24b9.png)

### Get one with GetItem operation
Tiếp theo ta sẽ implement API get one. Cập nhật lại file get/main.go như sau.

```get/main.go
package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type Book struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
}

func get(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error while retrieving AWS credentials",
		}, nil
	}

	svc := dynamodb.NewFromConfig(cfg)
	out, err := svc.GetItem(context.TODO(), &dynamodb.GetItemInput{
		TableName: aws.String("books"),
		Key: map[string]types.AttributeValue{
			"id": &types.AttributeValueMemberS{Value: req.PathParameters["id"]},
		},
	})
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}

	movie := Book{}
	err = attributevalue.UnmarshalMap(out.Item, &movie)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body: "Error while marshal movies",
		}, nil
	}

	res, _ := json.Marshal(movie)
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(get)
}
```

Init code và upload lên AWS Lambda.

```
go mod init get
go get
sh build.sh
aws lambda update-function-code --function-name books_get --zip-file fileb://get.zip --region us-west-2
```

Để kiếm item theo primary key, ta dùng hàm GetItem với đoạn code:

```go
out, err := svc.GetItem(context.TODO(), &dynamodb.GetItemInput{
    TableName: aws.String("books"),
    Key: map[string]types.AttributeValue{
        "id": &types.AttributeValueMemberS{Value: req.PathParameters["id"]},
    },
})
```

Kiểm tra thử API.

```
$ curl https://utp0mbdckb.execute-api.us-west-2.amazonaws.com/staging/books/1
{"id":"1","name":"NodeJS","author":"NodeJS"}
```

![image.png](https://images.viblo.asia/93c5b0d5-e1bd-4077-8201-c8c18d284078.png)

Nếu các bạn in ra được kết quả như trên thì API get one của ta đã chạy đúng. Nếu bạn gọi đến API get one mà với id của item mà không có trong bảng, thì nó sẽ không trả về 404 mà sẽ là một object với giá trị của từng property là trỗng.

```
$ curl https://utp0mbdckb.execute-api.us-west-2.amazonaws.com/staging/books/3
{"id":"","name":"","author":""}
```

Nếu bạn muốn trả về lỗi 404 thì ta có thể làm bằng tay.

### Create with with PutItem operation
Tiếp theo ta sẽ làm API create, cập nhật code ở file create/main.go như sau:

```create/main.go
package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type Book struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
}

func create(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var book Book
	err := json.Unmarshal([]byte(req.Body), &book)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       err.Error(),
		}, nil
	}

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error while retrieving AWS credentials",
		}, nil
	}

	svc := dynamodb.NewFromConfig(cfg)
	newBook, err := svc.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String("books"),
		Item: map[string]types.AttributeValue{
			"id":     &types.AttributeValueMemberS{Value: book.Id},
			"name":   &types.AttributeValueMemberS{Value: book.Name},
			"author": &types.AttributeValueMemberS{Value: book.Author},
		},
        ReturnValues: types.ReturnValueAllOld,
	})
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}

	res, _ := json.Marshal(newBook)
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

Init code và upload lên AWS Lambda.

```
go mod init create
go get
sh build.sh
aws lambda update-function-code --function-name books_create --zip-file fileb://create.zip --region us-west-2
```

Để insert dữ liệu được vào DynamoDB, ta dùng hàm PutItem với đoạn code:

```go
newBook, err := svc.PutItem(context.TODO(), &dynamodb.PutItemInput{
    TableName: aws.String("books"),
    Item: map[string]types.AttributeValue{
        "id":     &types.AttributeValueMemberS{Value: book.Id},
        "name":   &types.AttributeValueMemberS{Value: book.Name},
        "author": &types.AttributeValueMemberS{Value: book.Author},
    },
    ReturnValues: types.ReturnValueAllOld,
})
```

Kiểm tra thử API create của ta.

```
$ curl -sX POST -d '{"id":"3", "name": "Java", "author": "Java"}' https://utp0mbdckb.execute-api.us-west-2.amazonaws.com/staging/books
{"Attributes":null,"ConsumedCapacity":null,"ItemCollectionMetrics":null,"ResultMetadata":{}}
```

Oke, sau đó ta gọi lại API list.

```
$ curl https://utp0mbdckb.execute-api.us-west-2.amazonaws.com/staging/books
[{"id":"3","name":"Java","author":"Java"},{"id":"2","name":"Golang","author":"Golang"},{"id":"1","name":"NodeJS","author":"NodeJS"}]
```

![image.png](https://images.viblo.asia/b92c44e3-5d43-4237-b3e3-10d287e481ee.png)

Bạn sẽ thấy dữ liệu ta mới insert vào database bằng API create ở trên đã xuất hiện, vậy là API create của ta dã hoạt động đúng.

### Delete with DeleteItem operation
Tiếp theo ta sẽ làm API delete, cập nhật code ở file delete/main.go như sau:

```delete/main.go
package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type Book struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
}

func get(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error while retrieving AWS credentials",
		}, nil
	}

	svc := dynamodb.NewFromConfig(cfg)
	out, err := svc.DeleteItem(context.TODO(), &dynamodb.DeleteItemInput{
		TableName: aws.String("books"),
		Key: map[string]types.AttributeValue{
			"id": &types.AttributeValueMemberS{Value: req.PathParameters["id"]},
		},
	})
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}

	res, _ := json.Marshal(out)
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(get)
}
```

Init code và upload lên AWS Lambda.

```
go mod init delete
go get
sh build.sh
aws lambda update-function-code --function-name books_delete --zip-file fileb://delete.zip --region us-west-2
```

Để delete dữ liệu trong DynamoDB, ta dùng hàm DeleteItem với đoạn code:

```go
out, err := svc.DeleteItem(context.TODO(), &dynamodb.DeleteItemInput{
    TableName: aws.String("books"),
    Key: map[string]types.AttributeValue{
        "id": &types.AttributeValueMemberS{Value: req.PathParameters["id"]},
    },
})
```

Kiểm tra API delete của ta.

```
$ curl -sX DELETE -d '{"id":"3"}' https://utp0mbdckb.execute-api.us-west-2.amazonaws.com/staging/books
$ $ curl https://utp0mbdckb.execute-api.us-west-2.amazonaws.com/staging/books
[{"id":"2","name":"Golang","author":"Golang"},{"id":"1","name":"NodeJS","author":"NodeJS"}]
```

Oke, API delete của ta đã hoạt động đúng 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong cách integrate Lambda với DynamoDB. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo.

## Mục tìm kiếm đồng đội

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