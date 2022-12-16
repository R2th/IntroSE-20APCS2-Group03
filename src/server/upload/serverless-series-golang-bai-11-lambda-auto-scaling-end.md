## Giới thiệu
Chào các bạn tới với series về Serverless, ở [bài trước](https://viblo.asia/p/serverless-series-golang-bai-10-debugging-monitoring-tracing-aws-lambda-Do754r74ZM6) chúng ta đã nói về cách debug và monitoring Lambda Function. Ở bài này chúng ta sẽ nói về vấn đề cũng quan trọng không kém là cách Lambda thực hiện Auto Scaling.

Chúng ta sẽ tìm hiểu sau hơn về:
+ Lambda thực hiện scaling up như thế nào.
+ Concurrency.
+ Reserved concurrency.

![](https://images.viblo.asia/9290b595-6fe2-44a3-89c7-34f4ce1d0a7c.jpg)

## Provisioning previous system
Mình sẽ dùng terraform để tạo lại hệ thống, nếu các bạn muốn biết cách tạo bằng tay từng bước thì các bạn xem từ [bài 2](https://viblo.asia/p/serverless-series-golang-bai-2-build-rest-api-with-aws-api-gateway-6J3Zga3L5mB) nhé. Các bạn tải source code ở git repo này https://github.com/hoalongnatsu/serverless-series.git.

Di chuyển tới folder bai-11/terraform-start. Ở file policies/lambda_policy.json, dòng "Resource": "arn:aws:dynamodb:us-west-2:<ACCOUNT_ID>:table/books", cập nhật lại <ACCOUNT_ID> với account id của bạn.

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
  "api_production" = "https://1ft8157h78.execute-api.us-west-2.amazonaws.com/production"
  "api_staging" = "https://1ft8157h78.execute-api.us-west-2.amazonaws.com/staging"
}
```

## Lambda Auto Scaling
### Benchmark testing
Benchmark testing là cách test để kiểm tra hiệu xuất của hệ thống, thì trước khi nói về cách Lambda thực hiện scaling up, ta sẽ thực hiện benchmark testing lên trên API Gateway mà thực thi Lambda ở phía sau nó để xem Lambda nó có thể xử lý được khi requests tăng đột ngột hay không.

Để thực hiện công việc test, ta sử dụng Go-based tool tên là **HEY**, nó cho phép chúng ta gửi rất nhiều request lên trên API Gateway trong cùng 1 lúc. Ta chạy câu lệnh sau để cài tool.

```
go get -u github.com/rakyll/hey
```

Oke, ta sẽ chạy câu lệnh sau để gửi 1000 request tới API Gateway trong khoảng thời gian ngắn, với khoảng 100 request per second.

```
hey -n 1000 -c 100 https://1ft8157h78.execute-api.us-west-2.amazonaws.com/staging/books
```

Sau khi ta chạy xong, **HEY** sẽ in ra terminal cho ta thông tin chi tiết của toàn bộ request.

```
Summary:
  Total:        8.2779 secs
  Slowest:      2.6379 secs
  Fastest:      0.2466 secs
  Average:      0.6361 secs
  Requests/sec: 120.8029
  
  Total data:   169000 bytes
  Size/request: 169 bytes

Response time histogram:
  0.247 [1]     |
  0.486 [427]   |■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.725 [261]   |■■■■■■■■■■■■■■■■■■■■■■■■
  0.964 [201]   |■■■■■■■■■■■■■■■■■■■
  1.203 [12]    |■
  1.442 [11]    |■
  1.681 [25]    |■■
  1.921 [16]    |■
  2.160 [30]    |■■■
  2.399 [2]     |
  2.638 [14]    |■


Latency distribution:
  10% in 0.2690 secs
  25% in 0.2872 secs
  50% in 0.5989 secs
  75% in 0.7595 secs
  90% in 1.1553 secs
  95% in 1.8986 secs
  99% in 2.4982 secs

Details (average, fastest, slowest):
  DNS+dialup:   0.0780 secs, 0.0000 secs, 1.3393 secs
  DNS-lookup:   0.0140 secs, 0.0000 secs, 0.1391 secs
  req write:    0.0000 secs, 0.0000 secs, 0.0042 secs
  resp wait:    0.5125 secs, 0.2464 secs, 1.2967 secs
  resp read:    0.0001 secs, 0.0000 secs, 0.0019 secs

Status code distribution:
  [200] 1000 responses
```

Ở trên là kết quả mà benchmark testing in ra cho ta, sẽ có một số request có thời gian lớn hơn 2s, lý do của những request chậm là do cold start và warm start ta đã nói ở [bài 2](https://viblo.asia/p/serverless-series-golang-bai-2-build-rest-api-with-aws-api-gateway-6J3Zga3L5mB#_warm-start---cold-start-8). Từ benchmark testing ở trên, ta có thể thấy được là Lambda có thể tự scale để xử lý được 100 request per second. Vậy Lambda thực hiện việc scale như thế nào?

### Concurrency
Khi request tới Lambda của ta lần đầu tiên, AWS Lambda sẽ tạo một instance của function đó để xử lý request, nếu instance đó chưa xử lý request xong mà có một request khác lại tới, Lambda sẽ tạo một instance khác để xử lý request đó, lúc này Lambda xử lý cả hai request cùng lúc. Nếu có nhiều request tới nữa, Lambda sẽ lại tiếp tục tạo ra instance nếu các request trước chưa được xử lý xong. Sau đó nếu request giảm đi thì nếu instance không được xài nữa thì Lambda sẽ xóa nó đi từ từ.

![image.png](https://images.viblo.asia/1f2601e3-249e-4bcc-bada-8b82c1720db0.png)

Số lượng instance mà Lambda tạo ra được gọi là concurrency, và số lượng này có thể dao động từ **500 - 3000** tùy thuộc vào region:
+ 3000 – US West (Oregon), US East (N. Virginia), Europe (Ireland)
+ 1000 – Asia Pacific (Tokyo), Europe (Frankfurt), US East (Ohio)
+ 500 – Other Regions

**Lưu ý là concurrency áp dụng cho toàn Lambda ở một region chứ không phải chỉ một function. Ví dụ ở region Lambda có concurrency capacity là 3000, thì có nghĩa là 3000 concurrency sẽ được chia sẽ cho toàn bộ các function, chứ không phải là mỗi function sẽ sở hữu 3000 concurrency.**

Từ đây ta có thể suy ra được là số lượng request mà Lambda có thể xử lý được cùng một lúc là 3000 (nếu lý tưởng). Vậy điều gì sẽ xảy ra nếu số lượng request vượt quá giới hạn concurrency của một Lambda?

### Lambda throttling
Lambda sẽ tiến hành throttling (điều tiết) function của ta khi số lượng concurrent execution vượt quá giới hạn concurrency capacity. Nó sẽ không tạo thêm một instance nào nữa để xử lý các requests sắp tới cho tới khi số lượng concurrent execution giảm xuống.

Vì toàn bộ function của ta đều chia sẽ chung một concurrency capacity, nên việc throttling của Lambda sẽ rất hữu ích khi ta không muốn một function nào đó xài hết concurrency capacity của toàn bộ Lambda, khiến các function còn lại không thể chạy được.

Để Lambda có thể tiến hành throttling cho một function, ta cần phải cấu hình **reserved concurrency** cho function đó. Ví dụ ta có thể cấu hình reserved concurrency cho từng function như sau:
+ list function: 50
+ get one function: 50
+ create function: 20

Ở trên, ta cấu hình concurrency của list function là 50, get one function là 50, create function là 20.

![image.png](https://images.viblo.asia/6f0c1e0d-bfcf-441b-b9d9-0c94b5da81c3.png)

### Reserved concurrency
Để cấu hình reserved concurrency cho list functon, ta làm như sau:
1. Truy cập Lambda Console https://console.aws.amazon.com/lambda/home, bấm vào books_list function.
2. Bấm qua tab **Configuration**, chọn menu **Concurrency**. Bấm vào Edit.

![image.png](https://images.viblo.asia/b3ebd25f-09e1-4b25-9bd4-20161a826450.png)

3. Ở trang UI cấu hình Concurrency, ta chọn **Reserve concurrency** và nhập vào 50, sau đó bấm Save.

![image.png](https://images.viblo.asia/a83386c1-a4c0-457b-a9fb-1b71a5e28177.png)

Oke, vậy là ta đã cấu hình concurrency cho Lambda list function thành công, nếu bạn chạy lại câu lệnh **HEY** ở trên, lúc này ta sẽ thấy kết quá rất khác.

```
hey -n 1000 -c 100 https://1ft8157h78.execute-api.us-west-2.amazonaws.com/staging/books
```

```
Summary:
  Total:        7.2460 secs
  Slowest:      1.8533 secs
  Fastest:      0.2105 secs
  Average:      0.5817 secs
  Requests/sec: 138.0077
  
  Total data:   163148 bytes
  Size/request: 163 bytes

Response time histogram:
  0.211 [1]     |
  0.375 [378]   |■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.539 [102]   |■■■■■■■■■■■
  0.703 [325]   |■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.868 [84]    |■■■■■■■■■
  1.032 [8]     |■
  1.196 [2]     |
  1.361 [4]     |
  1.525 [90]    |■■■■■■■■■■
  1.689 [3]     |
  1.853 [3]     |


Latency distribution:
  10% in 0.2557 secs
  25% in 0.2945 secs
  50% in 0.5474 secs
  75% in 0.6863 secs
  90% in 1.2496 secs
  95% in 1.4414 secs
  99% in 1.4925 secs

Details (average, fastest, slowest):
  DNS+dialup:   0.0896 secs, 0.0000 secs, 0.9308 secs
  DNS-lookup:   0.0142 secs, 0.0000 secs, 0.1440 secs
  req write:    0.0001 secs, 0.0000 secs, 0.0036 secs
  resp wait:    0.4919 secs, 0.2103 secs, 1.1648 secs
  resp read:    0.0001 secs, 0.0000 secs, 0.0009 secs

Status code distribution:
  [200] 956 responses
  [502] 44 responses
```

Ta sẽ thấy có khoảng **44 request sẽ bị 502**, do ta đã cấu hình lại 1 lúc list function chỉ có 50 concurrency, nên sẽ có 1 vài request bị 502 (gateway timeout) do không được xử lý.

## Kết luận
Vậy là ta đã tìm hiểu xong cơ chế autoscale của Lambda 😁. Đây là vấn đề quan trọng cuối cùng mà mình muốn nói ở trong series này, đây cũng là bài cuối cùng trong series này. Thông qua series này mình hi vọng sẽ đem tới cho các bạn một cái nhìn tổng quan về cách Serverless trên AWS hoạt động như thế nào, luồng xây dựng một ứng dụng kiểu Serverless trên AWS sẽ được tiến hành ra sao. Rất mong là nó có thể giúp ích cho mọi người. Cảm ơn mọi người đã theo dõi series này. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp các bạn ở một series khác.

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