## Introduction
![](https://images.viblo.asia/d913f423-4125-40da-98fe-336bb877dffd.PNG)

**Aws Lambda** là một trong những dịch vụ điện toán của Amazon, cho phép chúng ta tạo và upload các function code lên aws server,  sau đó **Aws Lambda** sẽ thực thi các function đó chỉ khi được `trigger` bằng cách sử dụng các tài nguyên sẵn có của AWS mà không cần đến sự can thiệp của server.

**AWS Lambda** chỉ thực hiện các function code của chúng ta khi cần thiết, và được mở rộng một cách tự động, từ một vài request đến hàng ngàn request/ giây. Với khả năng đó, ta có thể sử dụng Lambda dễ dàng để build dữ liệu cho các dịch vụ `AWS S3` và `Amazon DynamoDB`, luồng xử lý dữ liệu trong `Amazon Kinesis` hoặc tạo back end riêng mà AWS thực hiện có quy mô, năng suất và bảo mật.

Khi sử dụng **AWS Lambda**, ta chỉ cần đảm bảo chắc chắn về function code của mình, các phần việc còn lại (bao gồm quản lý cân bằng bộ nhớ, CPU, mạng và các tài nguyên khác) sẽ do **AWS Lambda** đảm nhiệm. Nó khá linh hoạt, có thể thực hiện và hoạt động các công việc với quyền cao nhất của mình, bao gồm lập dự phòng và hiệu năng, theo dõi các tài nguyên, bảo mật, deploy code. Tuy nhiên, điều đó đồng nghĩa với việc, ta không thể can thiệp vào các tiến trình và tài nguyên khi **AWS Lambda** đang chạy.

Vào cuối năm 2018, AWS thông báo rằng Ruby đã góp mặt vào một trong những ngôn ngữ được **AWS Lambda** support, trong bài viết này chúng ta sẽ thử xem cách build một Ruby Lambda fuction. 

## Implement
![](https://images.viblo.asia/82cec99d-069e-4b67-97ec-6cee9e460b9b.png)

Khi user thực hiện một request (vd: GET /movies), **API Gateway** sẽ `invoke` trực tiếp đến **Lambda Function**, sau đó thực hiện quá trình `scan` thông qua việc gọi đến `DynamoDB` chứa `Movies` table, kết quả scan được sẽ trả về dưới dạng JSON.

Việc đầu tiên chúng ta cần làm là tạo một `Lambda Execution Role` với quyền `scan` trên `DynamoDB` table:
```json
{
    "Version": "2019-06-22",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Action": "dynamodb:Scan",
            "Resource": [
                "arn:aws:dynamodb:eu-west-3:*:table/movies",
                "arn:aws:dynamodb:eu-west-3:*:table/movies/index/*"
            ]
        }
    ]
}
```
Sau đó là khởi tạo một  **Lambda handler function** để xử lý request và trả về list các data records, bao gồm việc initialize `DynamoDB Client` (thông qua việc sử dụng gem `AWS SDK`) với region phù hợp và sau đó gọi đến function `scan` (trong đó value của region và table name tương ứng được khai báo trong các biến ENV), response trả về sẽ là dưới dạng JSON:
```ruby
require 'aws-sdk'
require 'json'

def lambda_handler(event:, context:)
    dynamodb = Aws::DynamoDB::Client.new(region: ENV['AWS_REGION'])

    resp = dynamodb.scan({
        table_name: ENV['TABLE_NAME'], 
    })
    { statusCode: 200, body: JSON.generate(resp.items) }
end
```
Sau khi **Lambda Handler Function** đã được defined, việc tiếp theo của chúng ta sẽ là mở `Lambda form creation` và lựa chọn `IAM role` phù hợp:
![](https://images.viblo.asia/14d989f3-0351-4888-b0ba-5086fd8e436f.png)

Đặt tên cho table name tương ứng với một biến môi trường ENV:
![](https://images.viblo.asia/cceba8c7-0128-4245-9c34-28f6465929bd.png)

Bảng `Movies` sẽ chứa list movies:
![](https://images.viblo.asia/ea274b6a-3744-404c-9af6-dd0f42e07495.png)

Tạo một `Deployment package` và deploy function code của chúng ta bằng việc sử dụng lệnh `AWS CLI`:
```
zip -r deployment.zip handler.rb
aws lambda update-function-code --function-name ScanMovies --zip-file fileb://./deployment.zip
```
Sau khi function đã được deploy, chúng ta có thể thử invoke đến nó thông qua console page bằng cách click "test":
![](https://images.viblo.asia/af6badbf-70d6-4f87-9a7d-f582c179978f.png)

## Summary
Bài viết nhằm giới thiệu về **AWS Lambda** và cách build một ruby lambda function. Bài viết còn nhiều hạn chế, cảm ơn bạn đã dành thời gian theo dõi.

Nguồn và tài liệu tham khảo:
* https://aws.amazon.com/blogs/compute/announcing-ruby-support-for-aws-lambda/
* https://docs.aws.amazon.com/lambda/index.html
* https://hackernoon.com/build-a-ruby-based-lambda-function-44f3d006fef6