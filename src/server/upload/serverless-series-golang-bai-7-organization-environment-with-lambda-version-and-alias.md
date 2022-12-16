## Giới thiệu
Chào các bạn tới với series về Serverless, ở bài trước chúng ta đã tìm hiểu về CloudFront để speed up tốc độ tải của một trang SPA, ở bài này chúng ta sẽ tìm hiểu cách để tổ chức và quản lý Lambda function với các môi trường khác nhau như staging, production.

Khi ta xây dựng một application, việc xây dựng một môi trường test để nó không ảnh hưởng tới môi trường production là việc nhất định phải làm. Do đó, ta phải có cách để chia Lambda function ra thành nhiều version khác nhau, để đáp ứng cho việc test trước khi nó được triển khai lên production.

![image.png](https://images.viblo.asia/886f2c2d-729f-45a9-84f7-100019335315.png)

## Provisioning previous system
Ở bài này ta sẽ không cần xài S3 hay CloudFront gì cả, nên ta sẽ dùng terraform của bài 4 để tạo lại các Lambda function của ta. Các bạn xem ở đây https://viblo.asia/p/serverless-series-golang-bai-4-integrate-aws-lambda-with-s3-for-file-storage-and-hosting-web-app-GrLZDBrn5k0#_provisioning-previous-system-2.

Hệ thống sau khi ta chạy Teraform sẽ như sau.

![image.png](https://images.viblo.asia/d071fcca-df08-46a7-9b84-ea28c644ac50.png)

## Lambda Versioning
Mặc định thì Lambda function sẽ có một $LATEST version tương ứng với function hiện tại. Ta sẽ dùng books_list Lamda function để làm ví dụ. Để kiểm tra versions của một function, ta bấm qua tab Versions của Lambda function đó, như hình minh họa bên dưới.

![image.png](https://images.viblo.asia/a1f9d1a7-6cf1-4e56-aa9c-b1fcca3db5f8.png)

Bạn sẽ thấy danh sách sẽ không có version nào cả, $LATEST version sẽ không hiển thị trên danh sách này. Để tạo một version cho Lambda function, ta bấm vào Publish new version. Nó sẽ hiển thị lên một modal như sau.

![image.png](https://images.viblo.asia/f61d0bb2-9a88-4ba4-8bf0-2908f76dc345.png)

Như bạn thấy thì khi ta tạo một version, thì nó sẽ publish version mới từ $LATEST hiện tại.
Nhập vào description là 1.0.0. Bấm publish, version mới được tạo ra sẽ có ID là 1.

![image.png](https://images.viblo.asia/4420d505-85a3-4721-950f-69dad40cc4b5.png)

Khi bạn tạo một version, thì nó sẽ lấy những config hiện tại của Lambda function ngay tại thời điểm đó để tạo version. Khi version được tạo ra thì ta không thể sửa đổi code hay config của version đó được, nếu ta có cập nhật code thay sửa config gì thì ta sẽ publish lại một version mới. **Lưu ý là chỉ khi nào có thay đổi gì trong Lambda function thì ta mới có thể publish lại version mới**.

Lamda function version 1 này sẽ là function cho production của ta. Môt trường statging sẽ tương ứng với Lamda function version $LATEST, khi ta có thay đổi code gì thì cứ việc cập nhật lên $LATEST, sau khi ta thấy mọi thứ đều oke hết thì ta sẽ lại tạo một version từ $LATEST.

Mặc định khi ta thực thi một function thì nó sẽ trigger ở $LATEST version, như sau.

```
aws lambda invoke --function-name books_list result.json
```

Nếu ta muốn chỉ định version ta muốn gọi, ta sẽ thêm option **qualifier** vào. Ví dụ khi ta gọi version 1.

```
aws lambda invoke --function-name books_list --qualifier 1 result.json
```

Kết quả trả về của function books_list hiện tại là một array. Ta sẽ cập nhật lại kết quả trả về của function books_list như sau:

```go
type Res struct {
	Rows  []Book `json:"rows"`
	Total int    `json:"total"`
}
```

Cập nhật lại file bai-7/code/list/main.go như sau:

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

type Res struct {
	Rows  []Book `json:"rows"`
	Total int    `json:"total"`
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

	total := len(books)
	res := Res{Rows: books, Total: total}
	r, _ := json.Marshal(res)
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: string(r),
	}, nil
}

func main() {
	lambda.Start(list)
}
```

Init code và cập nhật function.

```
go get
sh build.sh
aws lambda update-function-code --function-name books_list --zip-file fileb://list.zip --region us-west-2
```

Kiểm tra kết quả trả về của function.
```
aws lambda invoke --function-name books_list result.json
```

Ở bên API Gateway, thì hiện tại mặt định nó sẽ chỉa tới $LATEST. Khi ta gọi API thì sẽ thấy kết quả trả về y như kết quả của function ta vừa cập nhật.

```
curl https://tv5qwoic01.execute-api.us-west-2.amazonaws.com/staging/books
{"rows":[{"id":"1","name":"Go in Action","author":"Erik St. Martin Foreword"}],"total":1}
```

Bây giờ ta sẽ tạo thêm môi trường production, và cấu hình thêm một stage production cho API Gateway mà sẽ chỉa tới function version 1. Ta làm các bước như sau.
1. Truy cập API Gateway console https://console.aws.amazon.com/apigateway Bấm vào books-list.
2. Ở mục Resources, chọn /books GET, bấm vào **Integration Request**.

![image.png](https://images.viblo.asia/7cb7a23c-bbf1-4a71-a9b9-cbe885f55dd8.png)

3. Ở mục Lambda Function, bấm vào nút edit.

![image.png](https://images.viblo.asia/8adb7807-3712-46b9-8f91-07f90d4e12d8.png)

4. Thay vì nhập thẳng tên của function là books_list, ta sẽ nhập là ${stageVariables.lambda}.

![image.png](https://images.viblo.asia/08183ae4-7b1b-4efa-9453-6a24baddd118.png)


Ở đây ta sẽ dùng  để khai báo Lambda function mà sẽ được integarate với API Gateway thay vì nhập thẳng tên function. Nếu ta nhập thẳng tên function, thì ta không thể chia ta nhiều môi trường như staging hay production được. Còn khi ta dùng  stageVariables, thì ở mục Stage của API, từng stage nó sẽ có chỗ nhập vào biến cho ta, và ta truy cập nó bằng cách sử dụng **stageVariables**. Ví dụ ở Stage staging, ta sẽ nhập biến lambda là books_list, còn ở Stage production, ta sẽ nhập biến là books_list:1.

5. Bấm Ok khi modal **Add Permission to Lambda Function** hiện lên.
6. Bấm deploy để nó cập nhật cấu hình mới.

![image.png](https://images.viblo.asia/b76fcc79-f6b2-45e0-a4c2-2be7f1d11638.png)

7. Sau khi bấm deploy thì nó sẽ nhảy qua mục Stage. Bấm qua tab **Stage Variables**, bấm **Add Stage Variable**.
8. Nhập vào Name là lambda và Value là books_list.

![image.png](https://images.viblo.asia/a48fe29d-fd9d-4fed-b0ea-3e273be50ede.png)

Gọi lại API xem nó có hoạt động bình thường không.

```
$ curl https://tv5qwoic01.execute-api.us-west-2.amazonaws.com/staging/books
{"rows":[{"id":"1","name":"Go in Action","author":"Erik St. Martin Foreword"}],"total":1}
```

9. Quay lại mục Resources, bấm deploy API, lúc này ta sẽ chọn 
[New Stage] và nhập vào Stage name là production.

![image.png](https://images.viblo.asia/7e2f1a21-3a63-466c-85e1-76788fedfae6.png)

10. Bấm Deploy. Lúc này ở Stages ta sẽ thấy có hai Stage là staging và production.

![image.png](https://images.viblo.asia/2b90a085-3f74-43fd-b2c2-609232ce62f8.png)

11. Bấm vào **Stage Variables** của production, nhập vào Stage Variable với value là books_list:1

![image.png](https://images.viblo.asia/6c4e0c76-39a2-45a3-8d00-cfcbcf2deee6.png)

12. Cung cấp cho API Gateway permission để thực thi Lambda version.

```
aws lambda add-permission --function-name arn:aws:lambda:us-west-2:<ACCOUNT_ID>:function:books_list:1 --source-arn "arn:aws:execute-api:us-west-2:<ACCOUNT_ID>:tv5qwoic01/*/GET/books"  --principal apigateway.amazonaws.com --statement-id 4d89f8ab-35b4-49a6-aced-f2e318e8e10f --action lambda:InvokeFunction
```

Ok, giờ ta gọi thử API production, ta sẽ thấy nó trả về kết quả là array như trước khi ta được cập nhật function thành trả về rows và total.

```
$ curl https://tv5qwoic01.execute-api.us-west-2.amazonaws.com/production/books[
[{"id":"1","name":"Go in Action","author":"Erik St. Martin Foreword"}]
```

Vậy nếu giờ ta test thấy môi trường staging của ta ok rồi, ta muốn deploy lại verison mới cho books_list, lúc này version của ta sẽ nhảy lên ID là 2, books_list function version 2 sẽ là books_list:2. Chẳng lẻ ta lại đi vào cập nhật lại Stages Variable của production và chạy câu lệnh cấp permission cho books_list:2 sao?

Thì ta không cần làm như vậy, mà ta sẽ sử dụng alias cho Lambda function.

## Lambda Alias
Quay lại Lambda console của books_list, bấm qua tab **Aliases**, ta sẽ thấy danh sách lúc này là rỗng, ta sẽ tạo một alias production mà sẽ chỉa tới các Lambda version.

![image.png](https://images.viblo.asia/06113ea2-aad7-4f92-922f-bf854d649e8c.png)

Bấm vào Create alias. Nó sẽ dẫn ta qua trang tạo alias, ô Name nhập vào là production, version ta chọn là 1.

![image.png](https://images.viblo.asia/7a643fd8-a6f8-4ebe-b56b-8638ae942aa9.png)

Bấm save. Ta sẽ có alias như sau.

![image.png](https://images.viblo.asia/2f756cd1-cdc0-467c-a8d1-082b9a5b3421.png)

Quay lại API Gateway console, ta sửa lại **Stage Variables** của production là books_list:production.

![image.png](https://images.viblo.asia/a9f6de41-2a63-43bc-ab41-fd4dd88f6895.png)

Sau khi cập nhật xong thì ta chạy câu lệnh để cấp quyền cho API Gateway có thể thực hiện được books_list:production.

```
aws lambda add-permission --function-name arn:aws:lambda:us-west-2:<ACCOUNT_ID>:function:books_list:production --source-arn "arn:aws:execute-api:us-west-2:<ACCOUNT_ID>:tv5qwoic01/*/GET/books"  --principal apigateway.amazonaws.com --statement-id 4d89f8ab-35b4-49a6-aced-f2e318e8e10f --action lambda:InvokeFunction
```

Ok, giờ ta sẽ publish version mới và cập nhật lại version trong alias, mà không cần phải sửa lại Stage Variables và chạy câu lệnh cấp quyền lại cho lambda version mới. Publish version mới nó sẽ có ID là 2.

![image.png](https://images.viblo.asia/402c217b-89e5-4d6a-b4ec-28c925825a8f.png)

Cập nhật lại alias.

![image.png](https://images.viblo.asia/cb8c402f-b9bf-4bab-ab33-0cda20c2a898.png)

Bấm Svae và gọi lại API production, ta sẽ thấy kết quả mới trả về.

```
$ curl https://tv5qwoic01.execute-api.us-west-2.amazonaws.com/production/books
{"rows":[{"id":"1","name":"Go in Action","author":"Erik St. Martin Foreword"}],"total":1}
```

Oke, vậy là các môi trường của ta đã chạy đúng. Như các bạn thấy thì mỗi lần ta publish lại version thì ta lại phải vào sửa lại alias bằng tay. Thì khi làm thực tế ta sẽ không làm như vậy, mà ta sẽ setup CI/CD, để mỗi lần ta merge code từ nhánh staging vào production, thì nó sẽ tự publish một version mới cho ta, và chỉa alias hiện tại tới version mới. Này bài tiếp theo mình sẽ hướng dẫn.

## Kết luận
Vậy là ta đã tìm hiểu xong về Lambda version và alias. Trong việc xây dựng ứng dụng thì chia ứng dụng ra nhiều môi trường khác nhau là yêu cầu bắt buộc. Lambda version và alias sẽ giúp ta trong việc xây dựng nhiều môi trường khác nhau cho application của ta, như là test, staging, production. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo. Bài tiếp theo mình sẽ nói về cách xây dựng CI/CD với CodePipeline và CodeBuild trong AWS.

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