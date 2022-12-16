## Giới thiệu
Chào các bạn tới với series về Serverless, ở bài trước chúng ta đã nói về cách sử AWS Lambda với DynamoDB để lưu dữ liệu, nhưng nếu ta muốn lưu trữ file thì ta không thể dùng DynamoDB được. Ở bài này chúng ta sẽ tìm hiểu về thành phần thứ 4 để xây dựng mô hình Serverless trên môi trường AWS Cloud, là S3.

Ở bài này chúng ta sẽ xây dựng hệ thống như minh họa sau đây.

![](https://images.viblo.asia/e2ed269f-7823-4872-9fee-d824acb5504a.jpg)

Kết thúc bài trước, chúng ta đã xây được phần API Gateway + Lambda + DynamoDB.

![](https://images.viblo.asia/8ea7c4ba-8ea9-4308-9714-213bc0bde97a.jpg)

Trong bài này thì mình sẽ dùng Terraform để tạo ra hệ thống ở trên, nên ta không cần phải tạo từ đầu, nếu các bạn muốn biết cách tạo bằng tay theo từng bước thì các bạn đọc ở [bài trước](https://viblo.asia/p/serverless-series-golang-bai-3-aws-lambda-dynamodb-for-data-persistence-vyDZOB6xKwj). Bước tiếp theo là ta sẽ gắn thêm hai S3 bucket vào nữa, một bucket để ta lưu trữ hình ảnh, ta sẽ viết code cho Lambda function để nó có thể save file được upload từ website vào S3. Và một bucket để ta hosting một trang web dạng single page application, trang web này nó sẽ gọi API tới API Gateway của ta và lấy dữ liệu từ DynamoDB ra để hiển thị.

![](https://images.viblo.asia/4d507ac4-5937-4698-94c8-6d44339815c6.jpg)

## S3
Amazon S3 (Amazon Simple Storage Service) là một dịch vụ của AWS cho ta phép ta lưu trữ file theo dạng object storage. Thay vì phải lưu dữ liệu ở dưới máy chủ của ta, rồi ta phải làm hệ thống backup cho nó, nếu số lượng lưu trữ lớn thì ta phải tìm phương pháp backup phù hợp nữa, thì ta xài S3 cho tiện. Tỉ lệ mất dữ liệu khi ta lưu trên S3 khá nhỏ, data durability của nó là 99.999999999% / year, nghĩa là nếu bạn lưu trữ 1 tỷ file thì 1 năm bạn có thể chỉ phải mất 1 file.

Ngoài ra S3 còn cung cấp performance cao, và dữ liệu lưu trữ lớn, v...v...

![image.png](https://images.viblo.asia/fe009e76-2849-4d87-94ad-ffc235ada702.png)

Ta chỉ nói sơ qua về S3 là gì thôi, tiếp theo ta sẽ bắt tay vào xây dựng hệ thống của ta và code Lambda function. Đầu tiên là ta sẽ dùng Terraform để dựng lên hệ thống ở bài trước.

## Provisioning previous system
Các bạn tải source code ở git repo này https://github.com/hoalongnatsu/serverless-series.git, di chuyển tới folder `bai-4/terraform-start`, mở file policies/lambda_policy.json ra. Cập nhật lại chỗ resource `arn:aws:dynamodb:us-west-2:<ACCOUNT_ID>:table/books` với ACCOUNT_ID là AWS account id của bạn.

Xong sau đó, bạn chạy câu lệnh:

```
terraform init
terraform apply -auto-approve
```

Xong khi tạo xong, bấm vào AWS Lambda và API Gateway, bạn sẽ thấy các function như sau.

![image.png](https://images.viblo.asia/74920978-a422-4c4e-959d-9fbd9151b91b.png)

API Gateway.

![](https://images.viblo.asia/554088e0-ccbb-43ec-a4a3-dc27f90fd9b6.png)

Bấm vào books-api và bấm qua mục Stages, ta sẽ thấy URL của API ngay chỗ Invoke URL.

![](https://images.viblo.asia/6653ecfa-33bd-4716-b214-71eef5df42b0.png)

DynamoDB và item trong nó.

![image.png](https://images.viblo.asia/8eb63655-3c6f-4b03-826d-167a99287875.png)

![image.png](https://images.viblo.asia/3c885fac-9899-4532-96f4-d213422fcaef.png)

Giờ ta sẽ gửi request tới API get list books để xem hệ thống ta có chạy không.

```
$ curl https://e7jgw0lk1g.execute-api.us-west-2.amazonaws.com/staging/books ; echo
[{"id":"1","name":"Go in Action","author":"William Kennedy with Brian Ketelsen and Erik St. Martin Foreword by Steve Francia"}]
```

Oke, vậy là phần API Gateway + Lambda + DynamoDB của ta đã được triển khai thành công, các bạn đọc [bài trước](https://viblo.asia/p/serverless-series-golang-bai-3-aws-lambda-dynamodb-for-data-persistence-vyDZOB6xKwj) để xem về những thành phần này nhé. Tiếp theo, ta sẽ tạo S3 bucket và dùng nó để hosting một trang web **Single Page Application (SPA)**, và trang  web này sẽ gọi API lên hệ thống của chúng ta để lấy dữ liệu về hiển thị.

## S3 hosting static website
Trang SPA của ta sẽ như sau.

![image.png](https://images.viblo.asia/182536d0-7cc9-45cf-81cf-22110bff69c8.png)

Đầu tiên ta sẽ tạo S3 bucket, truy cập vào AWS Web Console, kiếm S3 ở ô tìm kiếm, sau đó bấm vào nút **Create bucke**t, bạn sẽ thấy UI như sau.

![image.png](https://images.viblo.asia/3a8a9ced-9a24-4230-b02e-c72785a70ebb.png)

Ở chỗ bucket name thì bạn điền gì cũng được, sau đó kéo xuống phần **Block Public Access settings for this bucket**, uncheck mục **Block all public access**, các mục còn lại ta để mặc định, sau đó bạn bấm tạo bucket.

![image.png](https://images.viblo.asia/752a3468-007c-4f6a-9753-7bea4e228da8.png)

Sau khi tạo xong, ta sẽ thấy bucket của ta, ta bấm vào nó để vào cấu hình bên trong, ta sẽ cấu hình để nó có thể hosting một static web.

![image.png](https://images.viblo.asia/7af07d62-5610-48ba-8b7b-82aa1cbef868.png)

Bấm qua mục properties, kéo xuống cuối cùng ta sẽ thấy mục **Static website hosting**

![image.png](https://images.viblo.asia/3f46dbe1-1dc7-491a-8bda-337093c9b80d.png)

![image.png](https://images.viblo.asia/d3ebd339-2f51-44ce-84db-5772911ee217.png)

Bấm vào nút edit, ta sẽ thấy trang như bên dưới, chuyển **Static website hosting** sang chế độ **Enable**.

![image.png](https://images.viblo.asia/f28db9b5-fe44-495a-b613-21b2277d505f.png)

Mục **Hosting type** ta chọn **Host a static website**, bạn điền vào ô index document là `index.html`, và ô ở dưới điền vào error.html, sau đó ta bấm lưu. Di chuyển tới mục ban nãy, bạn sẽ thấy URL static web của ta, URL sẽ có định dạng như sau `http://<bucket-name>.s3-website-<region>.amazonaws.com`.

![image.png](https://images.viblo.asia/a4441edd-deea-4756-b6a1-0fc22f31ff12.png)

Bucket của ta sẽ có url như sau `http://serverless-series-spa.s3-website-us-west-2.amazonaws.com`.

Oke, ta đã chuẩn bị xong chỗ để hosting SPA web, giờ ta sẽ upload SPA web của ta lên bucket ở trên là được. Trang SPA thì được code bằng React, code của trang SPA nằm ở repo github ở trên, bên trong folder bai-4/front-end. Nếu các bạn có hứng thú với FE thì code này được code từ react-starter-kit sau đây https://github.com/hoalongnatsu/react-starter-kit.git. Ở thư mục front-end, ta mở file `.env-cmdrc` lên, update nó lại như sau.

```.env-cmdrc
{
  "dev": {
    "PORT": "3000",
    "REACT_APP_STAGE": "dev",
    "REACT_APP_API_URL": "http://localhost:3001"
  },
  "staging": {
    "PORT": "3000",
    "REACT_APP_STAGE": "staging",
    "REACT_APP_API_URL": "https://e7jgw0lk1g.execute-api.us-west-2.amazonaws.com/staging"
  }
}
```

Ta sửa ở chỗ `staging.REACT_APP_API_URL` bằng đường dẫn mà ta lấy ở phần Invoke URL của API Gateway ở trên. Sau đó chạy:

```
yarn build:staging
```

Sau khi build xong, bạn sẽ thấy có thư mục `build` được tạo ra, ta sẽ upload folder này lên S3 serverless-series-spa bucket.

```
aws s3 cp build s3://serverless-series-spa --recursive
```

Giờ ta truy cập vào trang web của ta với url bucket ở trên.

![image.png](https://images.viblo.asia/41c14908-406b-411c-9f97-05803ccdefcd.png)

Ta sẽ thấy nó báo lỗi là 403, vì ta chưa cập nhật bucket policy để cho phép bất kì ai cũng có thể truy cập được bucket này hết. Ta cập nhật bucket policy cho serverless-series-spa bucket. Mở mục permissions, ở phần bucket policy, bấm edit.

![image.png](https://images.viblo.asia/7761fa86-bdd8-454f-8e8f-98fe3a27b4e8.png)

Ta dán đoạn json sau đây vào và bấm lưu.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::serverless-series-spa/*"
        }
    ]
}
```

![image.png](https://images.viblo.asia/11a440bb-2d8c-4dab-bc31-d425c17e974a.png)

Ok, giờ ta truy cập vào trang web thì sẽ thấy trang web của ta có thể truy cập được rồi.

![image.png](https://images.viblo.asia/a9676904-25ff-48aa-a34f-50c0a98503d8.png)

Nhưng ta đợi một lúc vẫn không thấy trang web hiển thị gì cả, theo như lúc ta gọi API ở trên, thì sẽ có một kết quả được trả về chứ.

```
$ curl https://e7jgw0lk1g.execute-api.us-west-2.amazonaws.com/staging/books ; echo
[{"id":"1","name":"Go in Action","author":"William Kennedy with Brian Ketelsen and Erik St. Martin Foreword by Steve Francia"}]
```

Vậy UI sẽ hiển thị một book item chứ sao lại không thấy gì hết? Để biết bị gì thì bạn mở phần web develop lên bằng cách bấm chuột phải => Inspect. Mở qua mục console. Ta sẽ thấy lỗi CORS .

![image.png](https://images.viblo.asia/bbfc78b3-ec62-4983-8966-050c5538e15c.png)

Mặc định thì web sẽ block tất cả request khi ta gọi từ domain này tới domain khác. Nên vì bucket url và API Gateway url của ta khác nhau, nên nó sẽ bị block, để fix lỗi này, ta sẽ cập nhật lại lambda function list như sau, di chuyển vào folder bai-4/code, mở file list/main.go lên (code của từng function mình đã giải thích ở bài trước nên mình sẽ không nói lại nữa), ở phần return response ở cuối function list, ta thêm vào `"Access-Control-Allow-Origin": "*"`.

```list/main.go
...

type Book struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
}

func list(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	...

	res, _ := json.Marshal(books)
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*", // add here
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(list)
}
```

Oke, giờ ta sẽ init package và upload function lên AWS Lambda lại.

```
go get
sh build.sh
aws lambda update-function-code --function-name books_list --zip-file fileb://list.zip --region us-west-2
```

Sau khi upload xong, ta tải lại trang và sẽ thấy trang SPA của ta đã gọi API thành công.

![image.png](https://images.viblo.asia/57f6195e-1071-4ad6-93b9-18561fb7bd9f.png)

Nhưng ta sẽ không thấy nó có hình ảnh, vì ở bài trước Book struct của ta không có trường image, ở file list/main.go ta thêm trường image vào Book struct.

```list/main.go
...
type Book struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
	Image  string `json:"image"`
}
...
```

Build code và upload lại function.

```
sh build.sh
aws lambda update-function-code --function-name books_list --zip-file fileb://list.zip --region us-west-2
```

Tải lại trang và ta sẽ thấy image đã được hiển thị.

![](https://images.viblo.asia/a406e168-e5a2-4bca-80ae-bf4ece31b3af.png)

Oke, vậy là ta đã xong phần SPA, tiếp theo ta sẽ sang phần upload image lên S3.

## S3 store file
Ta tạo một bucket khác để lưu trữ hình ảnh của book, tạo một S3 bucket mới tên là serverless-series-upload, nhớ uncheck chỗ **Block all public access** ở mục **Block Public Access settings for this bucket** khi tạo nhé, xong các bạn cập nhật lại phần bucket policy của nó giống với bucket ở trên nha.

![image.png](https://images.viblo.asia/7ec6ff13-d700-46b1-b8d1-524dca86f771.png)

Vì bucket mà ta dùng để lưu hình ảnh sẽ có url khác với bucket ta hosting SPA, nên khi trang SPA của ta request hình tới serverless-series-upload bucket thì nó sẽ bị lỗi CORS. Nên ta cần enable CORS cho serverless-series-upload bucket. Ở phần permissions, các bạn kéo xuống dưới mục **Cross-origin resource sharing (CORS)**, bấm Edit và thêm đoạn json này vô và bấm lưu.

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

![image.png](https://images.viblo.asia/3b290063-e586-4baf-89ea-e269dabbb898.png)

## Lambda upload file to S3
Sau khi chuẩn bị xong bucket để lưu file, bây giờ ta sẽ viết code lại chỗ lambda book create, thêm vào cho nó phần upload image lên trên S3 nữa. Ở trang SPA của ta, bạn nhấn nút **Create new book** để nó qua trang create.

![image.png](https://images.viblo.asia/62c98dac-7fb0-4692-abe1-a3455fce0ec8.png)

![image.png](https://images.viblo.asia/13279258-5d6b-47f9-be77-4cfe6f39719f.png)

Ở folder bai-4/code, cập nhật lại file create/main.go như sau:

```create/main.go
package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/grokify/go-awslambda"
)

type Book struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
	Image  string `json:"iamge"`
}

func Upload(request events.APIGatewayProxyRequest, cfg aws.Config) (image string, err error) {
	client := s3.NewFromConfig(cfg)
	r, err := awslambda.NewReaderMultipart(request)
	if err != nil {
		return
	}

	part, err := r.NextPart()
	if err != nil {
		return
	}

	content, err := ioutil.ReadAll(part)
	if err != nil {
		return
	}

	bucket := "test-bucket-kala"
	filename := part.FileName()

	data := &s3.PutObjectInput{
		Bucket: &bucket,
		Key:    &filename,
		Body:   bytes.NewReader(content),
	}

	_, err = client.PutObject(context.TODO(), data)
	if err != nil {
		return
	}

	image = fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", bucket, "us-west-2", filename)

	return
}

func create(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Headers: map[string]string{
				"Content-Type":                "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			Body: "Error while retrieving AWS credentials",
		}, nil
	}

	image, err := Upload(req, cfg)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Headers: map[string]string{
				"Content-Type":                "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			Body: err.Error(),
		}, nil
	}

	r, _ := awslambda.NewReaderMultipart(req)
	form, _ := r.ReadForm(1024)
	svc := dynamodb.NewFromConfig(cfg)
	data, err := svc.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String("books"),
		Item: map[string]types.AttributeValue{
			"id":     &types.AttributeValueMemberS{Value: form.Value["id"][0]},
			"name":   &types.AttributeValueMemberS{Value: form.Value["name"][0]},
			"author": &types.AttributeValueMemberS{Value: form.Value["author"][0]},
			"image":  &types.AttributeValueMemberS{Value: image},
		},
		ReturnValues: types.ReturnValueAllOld,
	})
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Headers: map[string]string{
				"Content-Type":                "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			Body: err.Error(),
		}, nil
	}

	res, _ := json.Marshal(data)
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
	lambda.Start(create)
}
```

Ta thêm vào hàm Upload, đây là function để Lambda thực hiện upload file lên trên S3.

```go
func Upload(request events.APIGatewayProxyRequest, cfg aws.Config) (image string, err error) {
	client := s3.NewFromConfig(cfg)
	r, err := awslambda.NewReaderMultipart(request)
	if err != nil {
		return
	}

	part, err := r.NextPart()
	if err != nil {
		return
	}

	content, err := ioutil.ReadAll(part)
	if err != nil {
		return
	}

	bucket := "serverless-series-upload"
	filename := part.FileName()

	data := &s3.PutObjectInput{
		Bucket: &bucket,
		Key:    &filename,
		Body:   bytes.NewReader(content),
	}

	_, err = client.PutObject(context.TODO(), data)
	if err != nil {
		return
	}

	image = fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", bucket, "us-west-2", filename)

	return
}
```

Vì ta cần upload hình từ trang web, nên Content-Type của request sẽ là multipart/form-data, nên ta sẽ dùng hàm NewReaderMultipart để lấy thông tin form-data từ request ra, bằng hàm.

```
r, err := awslambda.NewReaderMultipart(request)
```

Sau đó, để đọc nội dung file, ta dùng hàm r.NextPart() và ioutil.ReadAll(part).

```go
part, err := r.NextPart()
if err != nil {
    return
}

content, err := ioutil.ReadAll(part)
if err != nil {
    return
}
```

Đoạn code tiếp theo ta dùng để upload file lên S3.

```go
bucket := "serverless-series-upload"
filename := part.FileName()

data := &s3.PutObjectInput{
    Bucket: &bucket,
    Key:    &filename,
    Body:   bytes.NewReader(content),
}

_, err = client.PutObject(context.TODO(), data)
if err != nil {
    return
}

image = fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", bucket, "us-west-2", filename)
```

Vì chỗ Body của PutObjectInput struct nó đòi là phải là io.Reader, nên ta dùng hàm bytes.NewReader() để chuyển biến content thành dạng io.Reader, sau đó ta return url của file ta vừa upload về.

Chỗ thay đổi thứ hai so với bài trước là phần ta lấy dữ liệu book.

```go
r, _ := awslambda.NewReaderMultipart(req)
form, _ := r.ReadForm(1024)
svc := dynamodb.NewFromConfig(cfg)
data, err := svc.PutItem(context.TODO(), &dynamodb.PutItemInput{
    TableName: aws.String("books"),
    Item: map[string]types.AttributeValue{
        "id":     &types.AttributeValueMemberS{Value: form.Value["id"][0]},
        "name":   &types.AttributeValueMemberS{Value: form.Value["name"][0]},
        "author": &types.AttributeValueMemberS{Value: form.Value["author"][0]},
        "image":  &types.AttributeValueMemberS{Value: image},
    },
    ReturnValues: types.ReturnValueAllOld,
})
```

Trước đó vì ta gọi request với Content-Type là application/json, nên ta mới có thể lấy dữ liệu từ body ra, như sau.

```go
var book Book
err := json.Unmarshal([]byte(req.Body), &book)
```

Vì vậy, khi ta chuyển Content-Type sang multipart/form-data thì ta sẽ xử lý kiểu khác, như sau.

```go
r, _ := awslambda.NewReaderMultipart(req)
form, _ := r.ReadForm(1024)
```

Biến form sẽ chứa dữ liệu của form-data, để truy cập giá trị thì ta dùng như sau.

```go
form.Value["id"][0]
```

Sau khi viết code xong, ta init package và upload lại lambda function.

```
go get
sh build.sh
aws lambda update-function-code --function-name books_create --zip-file fileb://create.zip --region us-west-2
```

Oke, giờ thì ta nhập thông tin lên trang SPA của ta, và bấm tạo.

![image.png](https://images.viblo.asia/29856fcf-02b8-40e8-8378-a1239e05ee7d.png)

Khi thành công thì nó sẽ dẫn ta về trang home, ta sẽ thấy book ta vừa mới tạo ra.

![image.png](https://images.viblo.asia/e0f2e60e-8d26-44f5-bb5b-c64d795534f2.png)

Nhưng ta đợi một thời gian thì cũng chả thấy image của ta mới upload nó hiển thị được. Bạn mở web develop lên kiểm tra responese của API get list, ta thấy nó vẫn trả về có trường image đàng hoàng mà sao hình nó không hiển thị?

![image.png](https://images.viblo.asia/9f63e9de-8948-4e8f-9f71-36e2a33cade9.png)

Bạn thử truy cập link hình, thì bạn sẽ thấy hình nó được tải về chứ nó không hiển thị lên web. Vì sao vậy? Ở chỗ S3 bucket, bạn bấm vào nó, chọn image vừa upload lên, bấm nút Action ở trên, chọn Edit metadata.

![image.png](https://images.viblo.asia/674e9cd2-e23d-498c-b93b-a859f1ed862a.png)

Nó sẽ dẫn ta qua trang khác, và bạn sẽ thấy ở mục Metadata, phần Content-Type của hình không phải là **image/png** (do mình up hình png), mà là một dạng khác.

![image.png](https://images.viblo.asia/d9a7701f-f484-472b-bc77-35a1d5850ec7.png)

Lý do là vì mặc định API Gateway chỉ support ta media type dạng text, các dạng media type khác nó sẽ không hỗ trợ. Ta sẽ config lại API Gateway để nó support các dạng khác.

## API Gateway support multi media type
Bấm qua API Gateway, bấm vào books-api của ta, sau đó ta chọn mục Setting.

![image.png](https://images.viblo.asia/9af19161-31d7-41af-aede-a4ad54d18055.png)

Kéo xuống cuối cùng, ở mục **Binary Media Types**, ta thêm vào hai thuộc tính là `*/*` và `multipart/form-data`.

![image.png](https://images.viblo.asia/26a50cbf-11ba-4f43-aae3-f03812a1f3b6.png)

Bấm save, tiếp theo chọn mục Resources, chọn method POST, bấm vào Method Request.

![image.png](https://images.viblo.asia/c53f63a1-61af-4be4-859d-549abbaebab9.png)

Mở mục **HTTP Request Headers**, thêm vào 2 thuộc tính là `Accept` với `Content-Type` vào và bấm lưu. Sau đó ta deploy lại API Gateway.

![image.png](https://images.viblo.asia/53e931b7-fa02-48ec-b5d3-3f92cfeba8cd.png)

Oke, giờ bạn quay lại trang tạo book trên web của ta, upload image lại và bấm tạo. Ta sẽ thấy lúc này hình của ta đã hiển thị ra được 😁.

![image.png](https://images.viblo.asia/897d5bd4-5177-43a5-bc9e-9bbf88d738fe.png)

Tạo thêm thằng nữa.

![image.png](https://images.viblo.asia/3547b668-92b0-4cce-bc01-4d2134787617.png)

![image.png](https://images.viblo.asia/781dee86-5ead-441b-a8b2-d7aa6d1e04e1.png)

Yep, ta đã làm thành công.

## Kết luận
Vậy là ta đã tìm hiểu xong cách dùng S3 để hosting một trang SPA, cách dùng S3 để lưu trữ ảnh, và cách integrate nó với lambda như thế nào. S3 để hosting các trang SPA thì khá tiện, thay vì ta phải có server rồi deploy code của trang SPA lên đó rồi cấu hình nginx lằng nhằng này nọ. Ta có thể kết hợp S3 với CloudFront (CDN service) để trang web ta chạy tải nhanh hơn và hình cũng được tải nhanh hơn, và dùng Router53 để mapping domain, mình sẽ hướng dẫn ở các bài tới. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo.

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