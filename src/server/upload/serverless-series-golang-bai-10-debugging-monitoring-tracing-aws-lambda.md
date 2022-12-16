## Giới thiệu
Chào các bạn tới với series về Serverless, ở [bài trước](https://viblo.asia/p/serverless-series-golang-bai-9-codepipeline-notification-with-aws-chatbot-and-aws-sns-4P856GB9KY3) chúng ta đã nói về cách gửi notification tới user khi CI/CD chạy xong. Ở bài này, chúng ta sẽ tìm hiểu về cách làm sao để debug AWS Lambda thông qua AWS CloudWatch, monitoring Lambda dùng metrics có sẵn của CloudWatch + custom metrics mà ta tự định nghĩa, và cách để tracing API dùng AWS X-RAY.

Hệ thống mà ta sẽ xây dựng như sau.

![](https://images.viblo.asia/18dc293b-5916-4761-a0d6-23203908e3fb.jpg)

## Provisioning previous system
Mình sẽ dùng terraform để tạo lại hệ thống, nếu các bạn muốn biết cách tạo bằng tay từng bước thì các bạn xem từ [bài 2](https://viblo.asia/p/serverless-series-golang-bai-2-build-rest-api-with-aws-api-gateway-6J3Zga3L5mB) nhé. Các bạn tải source code ở git repo này https://github.com/hoalongnatsu/serverless-series.git.

Di chuyển tới folder bai-10/terraform-start. Ở file policies/lambda_policy.json, dòng "Resource": "arn:aws:dynamodb:us-west-2:<ACCOUNT_ID>:table/books", cập nhật lại <ACCOUNT_ID> với account id của bạn.

Nếu các các muốn enable CI/CD thì ở file `vars.tf` các bạn sẽ thấy có một biến là codestar_connection, ta cần cập nhật lại giá trị cho biến này. Vì resource này cần phải có thêm bước authentication bằng tay nữa, nên ta không sử dụng Terraform để tự động provisioning nó được, các bạn đọc hướng dẫn ở [bài 8](https://viblo.asia/p/serverless-series-golang-bai-8-cicd-with-codepipeline-automatic-update-lambda-and-s3-spa-RQqKLBWNl7z#_connect-to-git-repository-7) để tạo connection, sau đó copy ARN của nó và dán vào giá trị default của biến codestar_connection.

![](https://images.viblo.asia/1d9be21b-88e6-43a3-9945-9b0e4e4a1600.png)

```
variable "enable_cicd" {
  type    = bool
  default = true
}

variable "codestar_connection" {
  type    = string
  default = "arn:aws:codestar-connections:<region>:<ACCOUNT_ID>:connection/<id>"
}
```

**Nếu các bạn muốn bật notification tới slack**, các bạn sẽ cần cập nhật biến enable_notification và chatbot_arn. Vì chatbot arn chỉ đang ở phiên bản beta nên terraform chưa có hỗ trợ, để tạo chatbot arn các bạn xem ở [bài 9](https://viblo.asia/p/serverless-series-golang-bai-9-codepipeline-notification-with-aws-chatbot-and-aws-sns-4P856GB9KY3#_implement-notification-with-aws-chatbot-6), sau đó copy giá trị vào.

![image.png](https://images.viblo.asia/52d5f2f5-b028-42f0-985b-5070ad1db2fc.png)

```
variable "enable_notification" {
  type    = bool
  default = true
}

variable "chatbot_arn" {
  type    = string
  default = "arn:aws:chatbot::<ACCOUNT_ID>:chat-configuration/slack-channel/codepipeline_alert"
}
```

Xong sau đó chạy câu lệnh.

```
terraform init
terraform apply -auto-approve
```

Sau khi Terraform chạy xong, nó sẽ tạo ra Lambda list function.

![image.png](https://images.viblo.asia/b30de285-3d7b-4717-9a36-83d3e943d3f1.png)

Và in ra terminal URL của API Gateway.

```
base_url = {
  "api_production" = "https://x618g5ucq7.execute-api.us-west-2.amazonaws.com/production"
  "api_staging" = "https://x618g5ucq7.execute-api.us-west-2.amazonaws.com/staging"
}
```

## CloudWatch
AWS CloudWatch là một dịch vụ cung cấp khả năng monitoring + observability + logging cho các dịch vụ khác ở trên AWS. Các dịch vụ mà ta xài trên AWS sẽ cung cấp metrics cho CloudWatch, và ta có thể truy cập CloudWatch Dashboard để xem các thông số tài nguyên của các dịch vụ mà ta đang xài.

Ngoài ra CloudWatch còn có một chức năng nữa là lưu trữ log, thông thường thiết kế một hệ thống logging thì cũng khá phức tạp, thay vì phải tự xây dựng thì ta có thể sử dụng CloudWatch Logs như một giải pháp.

![image.png](https://images.viblo.asia/a768f354-ea7b-4bde-98c2-e6bf773ea0aa.png)

## Debugging  with CloudWatch Logs
### Lamda logging
Khi làm việc với AWS Lambda, một số lỗi mà ta có thể gặp ra là:
+ Application error.
+ Permissions denied.
+ Timeout exceeded.
+ Memory exceeded.

Ngoài trừ lỗi thứ nhất, thì với các lỗi còn lại ta có thể dễ dàng fix bằng cách thêm permissions, tăng thời gian timeout hoặc memory của function lên. Còn đối với lỗi đầu tiên, ta muốn debug được thì ta cần phải có một chỗ nào đó để ta xem lại log lỗi của thằng Lambda khi nó chạy fail. Thì chỗ lưu log đó là CloudWatch Logs, khi một Lamda được thực thi thì tất cả những log mà nó ghi ra sẽ được lưu ở CloudWatch Logs.

Ta gọi vào api staging ở trên.

```
curl https://x618g5ucq7.execute-api.us-west-2.amazonaws.com/staging/books
```

Và để xem log của Lambda list function, ta làm như sau:
1. Truy cập vào CloudWtach Console https://console.aws.amazon.com/cloudwatch/home
2. Truy cập menu **Logs -> Log group**.
3. Ta sẽ thấy có một log group là **/aws/lambda/books_list**. Log group của từng function sẽ được lưu dưới dạng `/aws/lambda/<LAMBDA_FUNCTION_NAME>`

![image.png](https://images.viblo.asia/2f352252-2aed-43fa-9903-415e308f3cd2.png)

4. Bấm vào nó, ở tab **Log streams** ta bấm vào log stream mới nhất, ta sẽ thấy được log của lambda function book list.

Oke, để kiểm tra là khi function này có lỗi hoặc khi ta ghi log ra thì nó có được lưu vào CloudWatch Logs hay không, ta sửa lại code của hàm book list như sau. Sửa lại file main.go ở trong github repo của bạn khi mà bạn enable CI/CD khi chạy Terraform ở trên.

```main.go
package main

import (
	"context"
	"encoding/json"
	"log"
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
	Image  string `json:"image"`
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
		TableName: aws.String("book"),
	})
	if err != nil {
		log.Fatal(err.Error());

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
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(list)
}
```

Chỗ mà ta sửa lại là.

```main.go
...
svc := dynamodb.NewFromConfig(cfg)
out, err := svc.Scan(context.TODO(), &dynamodb.ScanInput{
    TableName: aws.String("book"),
})
if err != nil {
    log.Fatal(err.Error())

    return events.APIGatewayProxyResponse{
        StatusCode: http.StatusInternalServerError,
        Body:       err.Error(),
    }, nil
}
...
```

DynamoDB mà ta kết nối tới tên là books, vì để nó quăng ra lỗi nên ta sẽ sửa thành book, giờ ta sẽ update lại Lambda để xem nó có ghi lại lỗi ở trên tới CloudWath không. Commit code và push nó lên trên github repo của bạn, Lambda của ta sẽ tự động cập nhật.

```
git checkout staging
git commit -am "update list function"
git push
```

![image.png](https://images.viblo.asia/8b15950a-b35e-4dad-a5df-d12c5cff89b0.png)

Còn nếu các bạn không có enable CI/CD, thì clone code ở github repo này xuống https://github.com/hoalongnatsu/codepipeline-list-function, cập nhật file main.go, sau đó ta chạy câu lệnh CLI để cập nhật Lambda như sau.

```
go get
sh build.sh
aws lambda update-function-code --function-name books_list --zip-file fileb://list.zip --region us-west-2
```

Oke, giờ ta gọi lại api staging thì ta sẽ thấy lỗi.

```
$ curl https://x618g5ucq7.execute-api.us-west-2.amazonaws.com/staging/books
{"message": "Internal server error"}
```

Kiểm tra log ở trên CloudWatch. Lúc này bạn sẽ thấy có 1 log stream nữa.

![image.png](https://images.viblo.asia/dc054105-cd80-4dc3-84b3-6edc72e61101.png)

Mỗi lần ta cập nhật lại Lambda thì CloudWatch sẽ tạo ra một log stream mới cho nó, ta kiểm tra log stream mới nhất thì ta sẽ thấy lỗi của Lambda function mà ta vừa cập nhật.

![image.png](https://images.viblo.asia/56a5641f-c326-4866-9bba-bde3a37bbd6d.png)

Oke, nó đã in ra lỗi đúng với mục đích của ta. Nhưng các bạn có để ý một điểm là ở chỗ lỗi, ta có trả về lỗi cho client giống như khi ta ghi vào CloudWatch, nhưng kết quả lỗi trả về lại là `{"message": "Internal server error"}` không?

```main.go
...
if err != nil {
    log.Fatal(err.Error())

    return events.APIGatewayProxyResponse{
        StatusCode: http.StatusInternalServerError,
        Body:       err.Error(),
    }, nil
}
...
```

Khi ta kết hợp API Gateway với Lambda thì ta sẽ có điểm lưu ý là khi API Gateway nó trigger Lambda thì ngoài trừ Lambda ghi log của riêng nó, API Gateway cũng có ghi log lại là trong quá trình trigger đó thì nó có xảy ra vấn đề gì hay không, ví dụ như là lambda function trả về response không đúng định dạng mà API Gateway chấp nhận.

### API Gateway logging
Để enable log cho API Gateway, ta làm như sau:
1. Truy cập API Gateway Console https://console.aws.amazon.com/apigateway/home
2. Chọn books-api.
3. Nhấn vào menu **Stages** -> chọn staging.
4. Bật qua tab **Logs, Tracing**, bấm **Enable CloudWatch Logs**.

![image.png](https://images.viblo.asia/b9735e3c-983a-4b6a-98f6-decf69b013bd.png)

Và để API Gateway có quyền tạo log group, thì ta cần thêm quyền cho nó, cái này mình đã thêm ở trong terraform file, các bạn bấm qua mục Settings nằm ở cuối cùng sẽ thấy.

![image.png](https://images.viblo.asia/daee33e7-154d-43f4-bd45-045ab9e65133.png)

Oke, giờ ta gọi lại api staging, sau đó vào log group ta sẽ thấy một log group mới được tạo ra cho API Gateway.

![image.png](https://images.viblo.asia/c0b41231-1844-4582-aa7f-212c9135a0f3.png)

Nhấn vào nó và bấm vào log stream mới nhất. Ta sẽ thấy lỗi.

![image.png](https://images.viblo.asia/b04207bd-dab8-457a-833c-0c5e82eea071.png)

Lý do là vì ta gọi hàm `log.Fatal(err.Error())`, nó sẽ trả về os.Exit(1) làm API Gateway của ta tưởng là trong quá trình trigger Lambda thì Lambda bị lỗi, nên API Gateway sẽ trả về message là Internal server error. Ta sửa lại như sau.

```main.go
...
if err != nil {
    log.Println("err: " + err.Error())

    return events.APIGatewayProxyResponse{
        StatusCode: http.StatusInternalServerError,
        Body:       err.Error(),
    }, nil
}
...
```

Commit và push code hoặc dùng câu lệnh CLI để cập nhật Lambda, sau đó ta gọi lại api staging, ta thấy lỗi sẽ được trả về đúng.

```
$ curl https://x618g5ucq7.execute-api.us-west-2.amazonaws.com/staging/books ; echo

operation error DynamoDB: Scan, https response error StatusCode: 400, RequestID: D3FOENAN7GKTPENMB2V0EDJ6ENVV4KQNSO5AEMVJF66Q9ASUAAJG, api error AccessDeniedException: User: arn:aws:sts::<ACCOUNT_ID>:assumed-role/lambda_role/books_list is not authorized to perform: dynamodb:Scan on resource: arn:aws:dynamodb:us-west-2:<ACCOUNT_ID>:table/book
```

Oke, giờ ta đã biết cách kiểm tra log và debug cho Lambda và API Gateway 😁.

## Monitoring with CloudWatch Metrics
Bên cạnh việc ghi log, nếu ta muốn xem các thông số về performance của AWS Lambda thì ta sẽ cần CloudWatch Metrics. Mặc định khi một Lambda function được thực thi, nó sẽ export cho CloudWatch một số metrics như là resource usage, execution duration, và thời gian tính tiền của Lambda.

![image.png](https://images.viblo.asia/6f362250-58cb-4136-90f3-7a01e961c40a.png)

Để xem các thông số được monitor của Lambda, ta truy cập Lambda Console, bấm vào books_list function và bấm qua Tab **Monitor**. Bạn sẽ thấy một số metrics hữu ích như:
+ Số lần function được thực thi.
+ Thời gian thực thi của mỗi lần.
+ Error rates, và throttle count.

![image.png](https://images.viblo.asia/2e90ba49-569b-47e3-ba5c-21fa1497f58b.png)

Bên cạnh các metrics có sẵn này, ta cũng có thể tạo custom metrics để phục vụ cho một mục đích nào đó của ta. Để tạo custom metrics, ta sẽ dùng CloudWatch Golang SDK. Ví dụ ta muốn tạo một metrics đại diện cho số lần Lambda kết nối tới DynamoDB mà bị lỗi, đoạn code mẫu sau sẽ được dùng để tạo CloudWatch custom metrics.

```go
cfg, err := config.LoadDefaultConfig(context.TODO())
cw := cloudwatch.NewFromConfig(cfg)
input := &cloudwatch.PutMetricDataInput{
    Namespace: aws.String("Lambda"),
    MetricData: []types.MetricDatum{
        {
            MetricName: aws.String("FailedConnectToDynamoDB"),
            Unit:       types.StandardUnitCount,
            Value:      aws.Float64(1.0),
            Dimensions: []types.Dimension{
                {
                    Name:  aws.String("env"),
                    Value: aws.String("staging"),
                },
            },
        },
    },
}
cw.PutMetricData(context.TODO(), input)
```

Ở đoạn code trên ta tạo một metrics với Namespace là Lambda, tên metrics là FailedConnectToDynamoDB, loại metrics là StandardUnitCount nghĩa là metrics này có thể dùng để đếm được, value ta để là 1.0 nghĩa là mỗi lần metrics này được put vào trong CloudWatch thì được xem như là 1 lần (có nghĩa là 1 lần kết nối thất bại).

Oke, với đoạn code trên, ta gắn nó vào trong function list như sau. Cập nhật file main.go.

```main.go
package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatch"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatch/types"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type Book struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
	Image  string `json:"image"`
}

func list(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error while retrieving AWS credentials",
		}, nil
	}

	cw := cloudwatch.NewFromConfig(cfg)

	svc := dynamodb.NewFromConfig(cfg)
	out, err := svc.Scan(context.TODO(), &dynamodb.ScanInput{
		TableName: aws.String("book"),
	})
	if err != nil {
		log.Println("err: " + err.Error())

		input := &cloudwatch.PutMetricDataInput{
			Namespace: aws.String("Lambda"),
			MetricData: []types.MetricDatum{
				{
					MetricName: aws.String("FailedConnectToDynamoDB"),
					Unit:       types.StandardUnitSeconds,
					Value:      aws.Float64(1.0),
					Dimensions: []types.Dimension{
						{
							Name:  aws.String("env"),
							Value: aws.String("staging"),
						},
					},
				},
			},
		}
		cw.PutMetricData(context.TODO(), input)

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
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(list)
}
```

Oke, để kiểm tra custom metric của ta, truy cập CloudWatch bấm vào menu **Metrics**, chọn **All metrics**, bạn sẽ thấy có một mục **Custom namespaces** và sẽ có Namespace Lambda của ta.

![image.png](https://images.viblo.asia/67c3f185-d27e-4b6e-871c-fa3b686b0014.png)

**Lưu ý là để Lambda có thể tạo được custom metric thì ta cần cấp quyền cho nó, tất cả quyền của Lambda đều được cấp trong Terraform, nằm ở file `terraform-start/policies/lambda_policy.json`.**

### CloudWatch Alarm
CloudWatch cho phép ta tạo một alarm để gửi thông báo theo cấu hình metrics của resource mà ta mong muốn, ví dụ trong bài này ta muốn gửi thông báo tới cho dev là khi function list của ta kết nối tới DynamoDB bị thất bại vượt quá năm lần trong 5 phút, để dev biết là đang có lỗi để lên kiểm tra code. Để tạo alarm, ta thực hiện các bước sau:
1. Truy cập CloudWatch Console, mục menu chọn **All alarms**.
2. Bấm Create alarm, qua UI tạo alarm, chọn **Select metric**, chọn custom metrics của ta.
3. Ở mục **Statistic** ta chọn sum, **Period** ta chọn 5 minutes.

![image.png](https://images.viblo.asia/80e02aad-12cd-4dd8-b4f9-b8056003862d.png)

4. Kéo xuống mục **Conditions**, ta chọn như sau.

![image.png](https://images.viblo.asia/0b323713-bda2-4cf9-a7a7-87e0a57f0884.png)

5. Bấm Next, mục **Notification** ta chọn In alarm, chọn **Create new topic** và nhập vào email của bạn (chỗ này bạn có thể tạo sns khác như bài 9 để custom chức năng gửi thông báo tới bất kì đâu cũng được). **Bấm Create topic ở dưới chỗ nhập email. Sau đó đăng nhập vào email của bạn để Confirm subscription**.

![image.png](https://images.viblo.asia/17081162-b521-4092-8ca0-e70c039c4ddc.png)

6. Bấm Next, nhập tên của alarm.

![image.png](https://images.viblo.asia/685ee415-4d83-49a4-8257-6444b80b3e1b.png)

7. Bấm Next và bấm Create alarm.

Giờ bạn gọi api staging, khi nó bị lỗi quá 5 lần thì alarm của ta sẽ được trigger.

![image.png](https://images.viblo.asia/0d3fda9b-01fc-4792-ac0b-d3d32af1a31d.png)

Kiểm tra email.

![image.png](https://images.viblo.asia/f61dd8c1-d16b-4185-bd5c-0bdc56334635.png)

Oke, vậy là ta đã tìm hiểu xong cách để monitoring tài nguyên của AWS Lambda và gửi alarm khi có sự cố 😁.

## Tracing with AWS X-Ray
AWS có cung cấp cho ta một dịch vụ là X-Ray dùng để track incoming và outgoing requests tới Lambda functions. Nó tổng hợp cho ta các thông tin cần thiết để giúp ta debug, analyze, và optimize function của ta.

![image.png](https://images.viblo.asia/7a132b8a-c3d5-4d1b-bc3d-b342c7de99c4.png)

Thông thường khi ta xây dựng REST API thì việc tracing này rất quan trọng, vì nó sẽ cho ta biết một request tới API sẽ mất bao lâu sẽ có kết quả trả về, request đi qua những gì, từng đoạn đó sẽ tốn bao nhiêu thời gian, khi ta xem những thông tin này ta có thể biết API của ta chậm ở chỗ nào và từ đó ta có thể dễ dàng optimize nó. Ví dụ minh họa của một tracing.

![image.png](https://images.viblo.asia/39389a45-310f-4582-bf84-ebdb2fb1ff1a.png)
*[<div align="center">Image form Cloud Custodian</div>](https://cloudcustodian.io/docs/aws/topics/xray.html)*

Để enable tracing, ta truy cập vào Lambda books_list, chọn qua tab **Configuration**, chọn mục **Monitoring and operations tools**, bấm Eidt.

![image.png](https://images.viblo.asia/aadcd9f6-45b0-4a01-9da4-96d3644f3ac8.png)

Ta enable AWS X-Ray lên và bấm Save.

![image.png](https://images.viblo.asia/3da1509c-78d1-4bd7-94cf-3122119cc751.png)

Sau khi active X-Ray, ta gọi lại API.

```
curl https://x618g5ucq7.execute-api.us-west-2.amazonaws.com/staging/books ; echo
```

Sau đó, để coi tracing API của ta, ta truy cập CloudWatch Console, ở mục **X-Ray traces** chọn menu **Traces**. Ta thấy trace của API ta vừa mới gọi.

![image.png](https://images.viblo.asia/6e3a5db2-b5d6-4f06-896f-5dc1d52c188d.png)

Bấm vào nó và ta sẽ qua trang detail trace của API đó, nó sẽ có một **Trace Map** hiển thị đường đi của một request tới API.

![image.png](https://images.viblo.asia/ecf1bdd8-99ba-417e-87d5-82967ab466b9.png)

Và **Segments Timeline** hiển thị thời gian thực thi của từng segment.

![image.png](https://images.viblo.asia/d6940a06-fc73-4e34-9e87-96ff3225e144.png)

Ví dụ ở trên, thời gian thực thi của một API function books_list là 736ms, trong đó, thời gian function được khởi tạo là 97ms, thời gian function thực thi là 413ms.

Ta có thể tạo thêm custom segment chi tiết hơn bằng cách dùng Golang SDK. Ví dụ, ta sẽ thêm một segment nữa ở khúc Lambda function kết nối tới DynamoDB, cập nhật code main.go như sau.

```main.go
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
	"github.com/aws/aws-xray-sdk-go/instrumentation/awsv2"
	"github.com/aws/aws-xray-sdk-go/xray"
)

type Book struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
	Image  string `json:"image"`
}

func list(context context.Context) (events.APIGatewayProxyResponse, error) {
	ctx, root := xray.BeginSubsegment(context, "books_list")
	defer root.Close(nil)

	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error while retrieving AWS credentials",
		}, nil
	}

	awsv2.AWSV2Instrumentor(&cfg.APIOptions)
	svc := dynamodb.NewFromConfig(cfg)
	out, err := svc.Scan(ctx, &dynamodb.ScanInput{
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
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(list)
}
```

Bạn gọi lại api, reload lại trang CloudWatch X-Ray Trace, ta sẽ thấy có một trace mới, khi kiểm tra thì ta sẽ thấy có thêm segment chỗ kết nối với DynamoDB.

![image.png](https://images.viblo.asia/0d7b6330-baa6-4459-b8d6-008c26d81d4f.png)

Segments Timeline.

![image.png](https://images.viblo.asia/fac4ba3f-8a5d-4d56-8229-36732b1ac080.png)

## Kết luận
Vậy là ta đã tìm hiểu xong về debugging , monitoring và tracing Lambda sử dụng CloudWatch và X-Ray, đây là những công cụ rất hữu ích khi ta tương tác với Lambda trên AWS, thay vì phải tự xây logging và tracing solution. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo.

## Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.