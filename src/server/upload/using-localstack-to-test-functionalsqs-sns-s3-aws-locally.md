# **Localstack là gì ?**
[AWS](https://aws.amazon.com) đã quá nổi tiếng. Những dịch vụ của AWS đều rất tốt, đó đều là những lựa chọn hàng đầu cho việc phát triển phần mềm. Nhưng có một vấn đề là aws không có một bản cài đặt chính thức nào ở local để cho chúng ta có thể dễ dàng test và kiểm tra một kiến  trúc nào đó. Nhưng rất may, có một số chọn lựa mà chúng ta có thể dùng để thực hiện được điều này. Trong đó có localstack.

Chúng ta có thể hiểu localstack là AWS cloud stack cục bộ với đầy đủ chức năng. Nó bao gồm các dịch vụ của aws sau: 
* API Gateway at http://localhost:4567
* Kinesis at http://localhost:4568
* DynamoDB at http://localhost:4569
* DynamoDB Streams at http://localhost:4570
* Elasticsearch at http://localhost:4571
* S3 at http://localhost:4572
* Firehose at http://localhost:4573
* Lambda at http://localhost:4574
* SNS at http://localhost:4575
* SQS at http://localhost:4576
* Redshift at http://localhost:4577
* ES (Elasticsearch Service) at http://localhost:4578
* SES at http://localhost:4579
* Route53 at http://localhost:4580
* CloudFormation at http://localhost:4581
* CloudWatch at http://localhost:4582
* SSM at http://localhost:4583
* SecretsManager at http://localhost:4584



# **Cài đặt localstack**
yêu cầu trước khi cài đặt:
```
- make
- python (both Python 2.x and 3.x supported)
- pip (python package manager)
- npm node.js package manager)
- java/javac (Java 8 runtime environment and compiler)
- mvn (Maven, the build system for Java)
```


chúng ta có thể dễ dàng cài đặt localstack bằng cách thông qua pip:
```
pip install localstack
```
hoặc  chúng ta có thể cài đặt nó thông qua docker nếu như đã có cài đặt sẵn môi trường docker:
```
localstack start --docker
```
# **Start localstack**
trước khi start nó thì hãy chắc chắn là chúng ta đã fake thông tin đăng nhập aws:

~/.aws/credentials
```
AWS_ACCESS_KEY_ID=foo
AWS_SECRET_ACCESS_KEY=bar
```
Để chạy localstack chỉ cần:
```
localstack start
```
hoặc chúng ta có thể chạy thông qua docker:
```
localstack start --docker
```

#  **Sử dụng localstack với aws-cli**
### **SQS**
**Create Queue:**
```
$ aws --endpoint-url=http://localhost:4576 sqs create-queue --queue-name test_queue
{
    "QueueUrl": "http://localhost:4576/123456789012/test_queue"
}
````
**List Queue:**
```
$ aws --endpoint-url=http://localhost:4576 sqs list-queues
{
    "QueueUrls": [
        "http://localhost:4576/123456789012/test_queue"
    ]
}
```
**Send a message to this queue**:
```
$  aws --endpoint-url=http://localhost:4576 sqs send-message --queue-url http://localhost:4576/123456789012/test_queue --message-body 'Test Message!'
{
    "MD5OfMessageBody": "df69267381a60e476252c989db9ac8ad",
    "MessageId": "a6ed436b-076a-0d8d-73e1-cc3291a19c28"
}
```

**Receive the message from this queue**:
```
$  aws --endpoint-url=http://localhost:4576 sqs receive-message --queue-url http://localhost:4576/123456789012/test_queue
{
    "Messages": [
        {
            "Body": "Test Message!",
            "Attributes": {
                "ApproximateFirstReceiveTimestamp": "1.49138149959e+12",
                "SenderId": "AIDAIT2UOQQY3AUEKVGXU",
                "ApproximateReceiveCount": "1",
                "SentTimestamp": "1.49138142195e+12"
            },
            "ReceiptHandle": "xuazrzyjcgpgzpzlxlyxmujbgzfkswixjkywshturlylrfwzyccutlumitgduyzddwkaoypcmswlkxrrjghdyztfewrpmkxdufptyketrfumwzicmggogdbaucwztvorplibccpfhirmalnixvfbklzrgncpisdsiuiajqwefxueqhuygfibmgqwx",
            "MD5OfBody": "df69267381a60e476252c989db9ac8ad",
            "MessageId": "a6ed436b-076a-0d8d-73e1-cc3291a19c28"
        }
    ]
}
```
### **S3**
**Create a bucket:**
```
$ aws --endpoint-url=http://localhost:4572 s3 mb s3://mytestbucket
make_bucket: mytestbucket

$ aws --endpoint-url=http://localhost:4572 s3 ls
2006-02-03 08:45:09 mytestbucket
```

**Copy a file over:**
```
$ aws --endpoint-url=http://localhost:4572 s3 cp /tmp/mongo.log s3://mytestbucket
upload: ../../../../tmp/mongo.log to s3://mytestbucket/mongo.log

$ aws --endpoint-url=http://localhost:4572 s3 ls s3://mytestbucket
2017-04-05 01:18:39       4789 mongo.log
```

**Delete this file**
```
$ aws --endpoint-url=http://localhost:4572 s3 rm s3://mytestbucket/mongo.log
delete: s3://mytestbucket/mongo.log

$ aws --endpoint-url=http://localhost:4572 s3 ls s3://mytestbucket
$
```

### **Kết luận**
Ở trên là giới thiệu về local stack và hai ví dụ về 2 dịch vụ của aws. Các bạn có thể xem thêm [ở đây](https://github.com/localstack/localstack). Hi vọng bài viết giúp ích được cho các bạn. Cảm ơn đã đọc bài (bow).
Tham khảo:
https://github.com/localstack/localstack

https://gugsrs.com/localstack-sqs-sns/

https://lobster1234.github.io/2017/04/05/working-with-localstack-command-line/