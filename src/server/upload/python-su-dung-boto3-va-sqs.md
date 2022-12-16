Boto 3 là SDK AWS cho Python. Boto3 được viết bằng Python - vì vậy boto3 có thể thực hiện công cụ thao tác hưu hiệu với AWS. Boto3 đặc biệt dễ dàng sử dụng, khi làm việc với boto3 chúng ta có cảm giác giống như làm việc trên AWS CLI.
Trong bài viết này, Tôi sẽ sử dụng SQS và boto 3 để thực hiện các thao tác cơ bản như gửi và nhận message.

Amazon Simple Queue Service (SQS) là một dịch vụ hàng đợi ( queue ) lưu trữ thông điệp ( message ) nhanh chóng, đáng tin cậy, có khả năng mở rộng và quản lý một cách đầy đủ. Amazon SQS giúp bạn có thể di chuyển dữ liệu giữa các thành phần phân tán của ứng dụng của bạn để thực hiện các nhiệm vụ khác nhau.

## Setup

Giả sử các bạn đã cài sẵn python trên máy của các bạn.
để cài boto3 chỉ cần chạy lệnh sau:

```
pip3 install boto3
```

xác nhận boto đã cài thành công hay chưa:

```
pip3 show boto3

Name: boto3
Version: 1.4.4
Summary: The AWS SDK for Python
Home-page: https://github.com/boto/boto3
Author: Amazon Web Services
Author-email: UNKNOWN
License: Apache License 2.0
Location: /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages
Requires: s3transfer, jmespath, botocore
```

## Sử dụng

giả sử các bạn đã config đúng hết các kết nối với aws sqs rồi nhé.
SQS hoạt động theo mô hình FIFO (First-In-First-Out), vào trước ra trước, chúng ta không thể order hay query vào SQS dc, mỗi lần gọi vào nó sẽ trả ra một message tương ứng với thời gian message này vào:


Sử dụng:

```python
import boto3
# khởi tạo boto3 client
client = boto3.client('sqs')
```

1.  Tạo một sqs queue url

```
client.create_queue(QueueName='test_queue')

Response: 
{
    'QueueUrl': 'string'
}
```
2.  Lấy danh sách queue_url

```
queues = client.list_queues(QueueNamePrefix='test_queue')

Response: 
{
    'QueueUrls': [
        'string',
    ]
}
```

3. Gửi message vào queue url

```
client.send_message(QueueUrl=test_queue_url, MessageBody='This is test message')

Response: 
{
    'MD5OfMessageBody': 'string',
    'MD5OfMessageAttributes': 'string',
    'MessageId': 'string',
    'SequenceNumber': 'string'
}
```

gửi 100 message vào queue:

```
for i in range(0,100):
    enqueue_response = client.send_message(QueueUrl=test_queue_url, MessageBody='This is test message #'+str(i))
    print('Message ID : ',enqueue_response['MessageId'])
```

5. Nhận message từ queue

```
 messages = client.receive_message(QueueUrl=test_queue_url,MaxNumberOfMessages=10)
 
 Response: 
 
 {
    'Messages': [
        {
            'MessageId': 'string',
            'ReceiptHandle': 'string',
            'MD5OfBody': 'string',
            'Body': 'string',
            'Attributes': {
                'string': 'string'
            },
            'MD5OfMessageAttributes': 'string',
            'MessageAttributes': {
                'string': {
                    'StringValue': 'string',
                    'BinaryValue': b'bytes',
                    'StringListValues': [
                        'string',
                    ],
                    'BinaryListValues': [
                        b'bytes',
                    ],
                    'DataType': 'string'
                }
            }
        },
    ]
}
```

## Tài liệu

- https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sqs.html#SQS.Client.receive_message