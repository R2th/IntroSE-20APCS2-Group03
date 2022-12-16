## Giới thiệu
Chào các bạn tới với series về Serverless, ở bài trước chúng ta đã tìm hiểu về cách dựng CI/CD với Codepipeline. Ở bài này chúng ta sẽ làm thêm phần notification cho Codepipeline khi nó chạy xong hoặc trong quá trình build bị lỗi gì đó, bằng cách sử dụng SNS + Lambda và AWS Chatbot + Slack.

Đây là một nhu cầu rất thực tế khi ta làm CI/CD, ta không thể suốt ngày lên trên AWS Console để xem pipeline của ta đã chạy xong hay chưa, với lại khi làm một team thì cả PM, dev và tester đều cần biết là CI/CD chạy xong chưa để họ nhảy lên sản phẩm của ta kiểm tra chức năng mới. Hệ thống mà ta sẽ xây dựng như sau.

![image.png](https://images.viblo.asia/bba7e38f-2c6b-4be2-be59-4ac4c84e8d83.png)

Ta sẽ dùng SNS + Lambda để gửi thông báo tới client qua email và dùng AWS Chatbot để gửi thông báo tới client qua Slack channel.

## Provisioning previous system
Mình sẽ dùng terraform để tạo lại hệ thống, nếu các bạn muốn biết cách tạo bằng tay từng bước thì các bạn xem từ [bài 2](https://viblo.asia/p/serverless-series-golang-bai-2-build-rest-api-with-aws-api-gateway-6J3Zga3L5mB) nhé. Các bạn tải source code ở git repo này https://github.com/hoalongnatsu/serverless-series.git.

Di chuyển tới folder bai-9/terraform-start. Ở file policies/lambda_policy.json, dòng "Resource": "arn:aws:dynamodb:us-west-2:<ACCOUNT_ID>:table/books", cập nhật lại <ACCOUNT_ID> với account id của bạn.

Tiếp theo ở file `vars.tf` các bạn sẽ thấy có một biến là codestar_connection, ta cần cập nhật lại giá trị cho biến này. Vì resource này cần phải có thêm bước authentication bằng tay nữa, nên ta không sử dụng Terraform để tự động provisioning nó được, các bạn đọc hướng dẫn ở [bài trước](https://viblo.asia/p/serverless-series-golang-bai-8-cicd-with-codepipeline-automatic-update-lambda-and-s3-spa-RQqKLBWNl7z#_connect-to-git-repository-7) để tạo connection, sau đó copy ARN của nó và dán vào giá trị default của biến codestar_connection.

![](https://images.viblo.asia/1d9be21b-88e6-43a3-9945-9b0e4e4a1600.png)

```
variable "codestar_connection" {
  type    = string
  default = "arn:aws:codestar-connections:<region>:<ACCOUNT_ID>:connection/<id>"
}
```

Xong sau đó chạy câu lệnh.

```
terraform init
terraform apply -auto-approve
```

Sau khi Terraform chạy xong, nó sẽ in ra terminal URL của API Gateway.

```
base_url = {
  "api_production" = "https://94x695g7da.execute-api.us-west-2.amazonaws.com/production"
  "api_staging" = "https://94x695g7da.execute-api.us-west-2.amazonaws.com/staging"
}
```

Và ta sẽ có hai pipeline cho build và deploy.

![image.png](https://images.viblo.asia/f7971b56-4e15-40a3-87f9-0ddf3e2b9cad.png)

## AWS SNS and AWS Chatbot
Amazon Simple Notification Service (SNS) là một hệ thống pub sub, quản lý message, thường được sử dụng để làm hệ thống notification hoặc làm hệ thống quản lý message trong một distributed systems, microservices.

![image.png](https://images.viblo.asia/a184bead-6c5d-4223-9041-d62316b1cf35.png)

AWS Chatbot thường được sử dụng để tương tác với các chat room, hiện tại khi mình viết bài này thì chatbot của AWS hỗ trợ hai kênh là **Slack và Amazon Chime**.

![image.png](https://images.viblo.asia/34be4b80-ef1c-4db1-b276-9f18b0ec2cce.png)

## Implement Notification with SNS
Bây giờ ta sẽ thực hiện việc gửi thông báo tới cho client khi codepipeline được thực thi xong bằng cách sử dụng AWS SNS. Ta thực hiện các bước sau.

1. Truy cập CodePipeline console https://console.aws.amazon.com/codepipeline, chọn 
list-function-staging, chọn **Notify => Create notification rule**.

![](https://images.viblo.asia/a4e6d298-0c4d-4b8b-8ce4-768fe9dc4dcf.png)

2. Nhập vào tên là list-function-staging-notification, chỗ **Detail type** chọn Full.

![](https://images.viblo.asia/2987cf8d-650e-43bc-b4a6-26cca0847944.png)

3. Mục **Events that trigger notifications** ta chọn Failed và Succeeded ở Pipeline execution.

![](https://images.viblo.asia/24ab5022-8dac-450e-b378-b928ae00cf46.png)

4. Ở mục **Targets**, ta chọn SNS topic.

![](https://images.viblo.asia/e8454c19-8bcb-4326-a36f-335e3578aa35.png)

5. Bấm **Create target**. Nhập vào tên là codepipeline_sns_alert.

![](https://images.viblo.asia/925285d0-a333-4c8e-a75a-0ba47b1e4cc5.png)

6. Bấm Create để tạo SNS topic và bấm Submit.

Sau khi xong bước này thì ta đã tạo được Notification Rule và SNS topic. Khi Codepipeline chạy thành công thì nó sẽ gửi một message tới SNS topic này.

Tiếp theo là ta sẽ tạo một subscribe cho SNS trên. Để subscribe đó thực hiện công việc gửi notification tới cho một client bất kì nào mà ta muốn. Ở bài này thì ta sẽ gửi mail tới cho client.

### Subscribe with email
Ta thực hiện các bước sau.

1. Truy cập Amazon SNS console.
2. Ở menu, chọn Topics, và chọn codepipeline_sns_alert.
3. Kéo xuống tab **Subscriptions**, bấm **Create subscription**.

![image.png](https://images.viblo.asia/05ba1684-12a6-42cf-bbe8-d0310de61586.png)

4. Nó sẽ dẫn ta qua trang tạo, ở mục Protocol, chọn Email, sau đó nhập email của bạn.

![image.png](https://images.viblo.asia/f836c265-5c32-41e1-9688-0bf11cb63dc9.png)

5. Bấm **Create subscription**. Lúc này Subscription của ta sẽ ở trạng thái Pending confirmation.

![image.png](https://images.viblo.asia/94a91a72-ae56-4a80-b1f2-21536eeb29ec.png)

6. Truy cập email của bạn và confirm subscription. Sau khi ta confirm thì trạng thái của subscription sẽ chuyển sang **Confirmed**.

![image.png](https://images.viblo.asia/7fc5f16f-be9f-42f8-8e6f-cbbb7ee3a189.png)

Giờ bạn quay lại CodePipeline console, chạy lại list-function-staging pipeline, khi nó chạy xong bạn kiểm tra email thì sẽ thấy email thông báo của SNS được gửi tới 😁.

![image.png](https://images.viblo.asia/cbf9a5ec-55e2-4651-90dc-d49c20c497be.png)

Đây là mẫu email mặc định, nếu ta muốn custom lại email template cho nó đẹp hơn thì ta cần sử dụng Subscribe với protocol là Lambda.

### Subscribe with Lambda
Vì SNS chỉ có hỗ trợ một vài loại Subscribe nhất định, nên để mở rộng khả năng gửi thông báo tới nhiều client khác nhau, ta cần sử dụng Subscribe với target là Lambda. Ở trong Lambda này khi ta nhận được message từ SNS, thì ta có thể viết code để nó gửi tới đâu cũng được.

Ví dụ ở bài này ta sẽ dùng Lambda để gửi email tới client với mẫu email template custom. Ở chỗ Subscriptions của codepipeline_sns_alert, ta nhấn vào tạo thêm một Subscription nữa.

![image.png](https://images.viblo.asia/cfed7629-632a-410f-a047-14c0dc98f05b.png)

Ta chọn protocol là AWS Lambda, để lấy ARN của Lambda notification function, ta bấm qua Lambda console.

![image.png](https://images.viblo.asia/366c2c6f-906c-41a7-843b-353a330737f2.png)

Và chọn notification để lấy ARN của nó (function này được tạo bằng Terraform ở trên). Sau đó ta bấm tạo Subscription.

![image.png](https://images.viblo.asia/70a35ffe-8ea5-4210-a258-5818cb125e77.png)

Oke, giờ ta sẽ tiến hành viết code cho Lambda function. Truy cập vào bai-9/code/notification, cập nhật lại file main.go như sau.

```main.go
package main

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	mail "github.com/xhit/go-simple-mail/v2"
)

type Detail struct {
	Pipeline string `json:"pipeline"`
	State    string `json:"state"`
}

type Message struct {
	Time   time.Time `json:"time"`
	Detail Detail    `json:"detail"`
}

const html = `
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
	<p>Codepipeline %s is %s at %s</p>
</body>
`

func handler(ctx context.Context, snsEvent events.SNSEvent) {
	server := mail.NewSMTPClient()
	server.Host = "smtp.yandex.com"
	server.Port = 465
	server.Username = os.Getenv("MAIL_USERNAME")
	server.Password = os.Getenv("MAIL_PASSWORD")
	server.Encryption = mail.EncryptionSTARTTLS
	server.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	smtpClient, err := server.Connect()
	if err != nil {
		log.Fatal(err)
	}

	// Create email
	email := mail.NewMSG()
	email.SetFrom(fmt.Sprintf("From Me <%s>", os.Getenv("MAIL_USERNAME")))
	email.AddTo(os.Getenv("MAIL_TO"))
	email.SetSubject("Codepipeline Notification")

	for _, record := range snsEvent.Records {
		snsRecord := record.SNS
		fmt.Printf("[%s %s] Message = %s \n", record.EventSource, snsRecord.Timestamp, snsRecord.Message)
		message := &Message{}
		json.Unmarshal([]byte(snsRecord.Message), message)

		email.SetBody(mail.TextHTML, fmt.Sprintf(html, message.Detail.Pipeline, message.Detail.State, message.Time))

		err = email.Send(smtpClient)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func main() {
	lambda.Start(handler)
}
```

Init code và update function.

```
go get
sh build.sh
aws lambda update-function-code --function-name notification --zip-file fileb://notification.zip --region us-west-2
```

Ta sẽ thấy có hai biến env là MAIL_USERNAME với MAIL_PASSWORD, truy cập tới Lambda console, chọn notification function, bấm qua tab **Configuration**, bấm **Edit** ở Environment variables, thêm vào hai giá trị sau, nhớ thêm chính xác mật khẩu email của bạn nhé.

![image.png](https://images.viblo.asia/44322a03-8541-449a-8cdc-51b5d3b502bf.png)

**Lưu ý là nếu bạn xài gmail của google thì nhớ bật Less secure app access lên.**

![image.png](https://images.viblo.asia/328737a5-59c4-44ce-a3a9-6429e3952a2e.png)

Quay lại CodePipeline console và chạy lại list-function-staging pipeline nhé. Sau đó ta kiểm tra email thì sẽ thấy thông báo với mẫu template custom của ta. Oke, tiếp theo ta sẽ làm usecase thực tế nhất và chắc là được sử dụng khá nhiều, là gửi thông báo tới Slack.

## Implement Notification with AWS Chatbot
Đầu tiên ta cần tạo connection giữa AWS Chatbot và Slack. Ta thực hiện các bước sau để integrate Chatbot với Slack.

1. Truy cập Chatbot console https://console.aws.amazon.com/chatbot/home
2. Chọn **Configure new client**. Chọn Slack.

![image.png](https://images.viblo.asia/d21e8ea0-b9e4-4d25-ac0c-2884a262228b.png)

3. Nó sẽ dẫn ta qua trang Authentication với Slack, ta bấm **Allow**. Sau đó nó sẽ dẫn ta quay về AWS console với UI như sau.

![image.png](https://images.viblo.asia/37fbae04-d198-483e-94a8-ce82ededb92f.png)

4. Bấm **Configure new channel**. Ở trang UI tạo, ta điền vào tên là codepipeline_alert.

![image.png](https://images.viblo.asia/10b61384-b3ca-46b4-9cd9-4aaf45027f02.png)

5. Ở mục **Slack Channel**, ta chọn Private và điền vào ID của channel (ID nằm trên URL nếu bạn mở Slack bằng website).

![image.png](https://images.viblo.asia/379ee6e4-7d18-4ef4-bafc-b08498abade4.png)

6. Ở mục **Permissions => Role settings** chọn Channel IAM role, Role name ta nhập vào là `AWSCodeStarNotifications-Chatbot-Slack-Role`, mục **Policy templates** chọn Notification permissions và **Channel guardrails** ta chọn AWSCodepipelineFullAccess.

![image.png](https://images.viblo.asia/43aed031-3ba1-47b8-b2ef-ca193906a5c9.png)

7. Bấm Configure.

![image.png](https://images.viblo.asia/570490ab-c02a-4546-81ad-77533f8a8abd.png)

Oke, Tiếp theo để AWS có thể gửi thông báo tới Slack được, ta cần install AWS App lên trên Slack channel như sau. 

![image.png](https://images.viblo.asia/99db8679-178d-4d1a-b08e-a8fbdaf7689b.png)

Kiếm AWS Chatbot và Bấm Add.

![image.png](https://images.viblo.asia/3f85e219-9224-4da5-930c-7d69c86bf324.png)

Vậy là ta đã xong bước integrate AWS Chatbot với Slack, tiếp theo ta sẽ integrate Codepipeline với Chatbot này để nó có gửi thông báo tới kênh của Slack. Ta làm như sau.

1. Truy cập tới Codepipeline console, chọn list-function-staging như ở trên và bấm vào Create notification rule. Ở mục name ta nhập vào list-function-staging-slack. **Events that trigger notifications** ta cũng chọn Failed và Succeeded giống như trên.
2. Ở mục Targets bây giờ ta sẽ chọn AWS Chatbot.

![image.png](https://images.viblo.asia/2b601f92-81c0-45ef-901a-618e57f55062.png)

3. Bấm Submit.

Ta chạy lại list-function-staging pipeline, và khi nó chạy xong nó sẽ gửi thông báo tới Slack channel cho ta.

![image.png](https://images.viblo.asia/2d5cff7b-6d7f-4d4a-91f9-3a4cab38dc70.png)

Oke, vậy là ta đã implement notification cho codepipeline xong 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong cách gửi thông báo bằng cách sử dụng SNS và AWS Chatbot. SNS ngoại trừ dùng để gửi thông báo thì nó vẫn còn nhiều chức năng khác rất hữu ích, ở trên chỉ là 1 trong những usecase của nó. Sử dụng AWS Chatbot giúp ta dễ dàng integrate với Slack hơn, tương lai nếu nó có hỗ trợ thêm nhiều chat platform nữa thì việc ta tương tác với các hệ thống chat sẽ dễ dàng hơn nhiều so với việc phải tự viết code. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo.

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