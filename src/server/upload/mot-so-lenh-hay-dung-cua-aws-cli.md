## Giới Thiệu
 AWS Command Line Interface (AWS CLI)  Giao diện dòng lệnh (CLI) của AWS là công cụ thống nhất để quản lý các dịch vụ AWS của bạn. Chỉ với một công cụ để tải xuống và cấu hình, bạn có thể kiểm soát nhiều dịch vụ AWS từ một dòng lệnh và tự động hóa chúng thông qua các tập lệnh.
 
 ## Setup AWS CLI
 1. Intall Python
 ```
 sudo apt-get install python2.7
 ```
 2. Install pip
 ```
 curl -O https://bootstrap.pypa.io/get-pip.py
 sudo python2.7 get-pip.py
 ```
 3. Install the AWS CLI Using pip
 
```
sudo pip install awscli
```
 
 4. Test the AWS CLI Installation
 ```
 aws help
 ```
 
 5. Configura AWS CLI
 ```
 aws configure
 ```
 
 sau đó các bạn điền key vào là được.
 
 
 > chú ý nếu không có aws để test bạn có thể dùng [localstack](https://github.com/localstack/localstack), nó cho phép thiếp lập những dịch vụ tương tự như aws thật.
 
 ## Một số lệnh hay dùng.
 
 ### S3 service
 
 1. Create a bucket
 ```
bash-3.2$ aws s3 mb s3://mytestbucket # create bucket
make_bucket: mytestbucket

bash-3.2$ aws s3 ls # xem list bucket
2006-02-03 08:45:09 mytestbucket
 ```

2. Copy file to bucket

```
bash-3.2$ aws s3 cp /tmp/mongo.log s3://mytestbucket # copy file mông.log to mytestbucket
upload: ../../../../tmp/mongo.log to s3://mytestbucket/mongo.log

bash-3.2$ aws s3 ls s3://mytestbucket # check xem file dc copy chua
2017-04-05 01:18:39       4789 mongo.log
```

3. Delete file in bucket
```
bash-3.2$ aws s3 rm s3://mytestbucket/mongo.log
delete: s3://mytestbucket/mongo.log

bash-3.2$ aws s3 ls s3://mytestbucket

bash-3.2$
```
## SNS Server

1. Create a topic

```
bash-3.2$ aws sns list-topics
{
    "Topics": []
}

bash-3.2$ aws sns create-topic --name test-topic
{
    "TopicArn": "arn:aws:sns:us-east-1:123456789012:test-topic"
}
bash-3.2$ aws sns list-topics
{
    "Topics": [
        {
            "TopicArn": "arn:aws:sns:us-east-1:123456789012:test-topic"
        }
    ]
}
```


2. Subscribe to the topic

```
bash-3.2$ aws sns subscribe --topic-arn arn:aws:sns:us-east-1:123456789012:test-topic --protocol email --notification-endpoint test@viblo.asia
{
    "SubscriptionArn": "arn:aws:sns:us-east-1:123456789012:test-topic:5aacffbe-ccf7-40d5-be97-c55af7392935"
}

bash-3.2$ aws sns list-subscriptions
{
    "Subscriptions": [
        {
            "Owner": "",
            "Endpoint": "test@viblo.asia",
            "Protocol": "email",
            "TopicArn": "arn:aws:sns:us-east-1:123456789012:test-topic",
            "SubscriptionArn": "arn:aws:sns:us-east-1:123456789012:test-topic:5aacffbe-ccf7-40d5-be97-c55af7392935"
        }
    ]
}
```

3. Publish to this topic

```
bash-3.2$ aws sns publish  --topic-arn arn:aws:sns:us-east-1:123456789012:test-topic --message 'Test Message!'
{
    "MessageId": "n/a"
}
```


## SQS

1. Tạo queue

```
bash-3.2$ aws sqs create-queue --queue-name test_queue
{
    "QueueUrl": "http://localhost:4576/123456789012/test_queue"
}

bash-3.2$ aws sqs list-queues
{
    "QueueUrls": [
        "http://localhost:4576/123456789012/test_queue"
    ]
}
```

2. Gửi messege lên queue

```
bash-3.2$  aws sqs send-message --queue-url http://localhost:4576/123456789012/test_queue --message-body 'Test Message!'
{
    "MD5OfMessageBody": "df69267381a60e476252c989db9ac8ad",
    "MessageId": "a6ed436b-076a-0d8d-73e1-cc3291a19c28"
}
```


3. Nhận message từ queue

```
bash-3.2$  aws sqs receive-message --queue-url http://localhost:4576/123456789012/test_queue
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

4. Xóa message

```
aws sqs delete-message --queue-url http://localhost:4576/123456789012/test_queue --receipt-handle 'yugzzebhnnksfuvbjlibfnlejyqbulxqfegsnrgafjeabxaatxbmeiyfkfliedslohseosgjwkxhdzllpudhccjhorpkwbgjgyzeyzjwkfvqflathnvsmugeyevbqmfyqanuxetvdhcetseuwzrqpexogzggznndxmbqowtlalvqtffntdahhihel'
```

## DynamoDB

1. Tạo table

```
bash-3.2$ aws dynamodb create-table --table-name test_table  --attribute-definitions AttributeName=first,AttributeType=S AttributeName=second,AttributeType=N --key-schema AttributeName=first,KeyType=HASH AttributeName=second,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
{
   "TableDescription": {
       "TableArn": "arn:aws:dynamodb:us-east-1:000000000000:table/test_table",
       "AttributeDefinitions": [
           {
               "AttributeName": "first",
               "AttributeType": "S"
           },
           {
               "AttributeName": "second",
               "AttributeType": "N"
           }
       ],
       "ProvisionedThroughput": {
           "NumberOfDecreasesToday": 0,
           "WriteCapacityUnits": 5,
           "ReadCapacityUnits": 5
       },
       "TableSizeBytes": 0,
       "TableName": "test_table",
       "TableStatus": "CREATING",
       "KeySchema": [
           {
               "KeyType": "HASH",
               "AttributeName": "first"
           },
           {
               "KeyType": "RANGE",
               "AttributeName": "second"
           }
       ],
       "ItemCount": 0,
       "CreationDateTime": 1491818083.66
   }
}
```

Kiểm tra xem được tạo chưa:
```
 aws dynamodb list-tables
```

2. Lưu Item

```
aws  dynamodb put-item --table-name test_table  --item '{"first":{"S":"Jack"},"second":{"N":"42"}}'
 aws dynamodb put-item --table-name test_table  --item '{"first":{"S":"Manish"},"second":{"N":"40"}}'
```

3. Scan Table

```
bash-3.2$ aws dynamodb scan --table-name test_table

 {
    "Count": 2,
    "Items": [
        {
            "second": {
                "N": "40"
            },
            "first": {
                "S": "Manish"
            }
        },
        {
            "second": {
                "N": "42"
            },
            "first": {
                "S": "Jack"
            }
        }
    ],
    "ScannedCount": 2,
    "ConsumedCapacity": null
}
```

4. Get item

```
bash-3.2$ aws dynamodb get-item --table-name test_table  --key '{"first":{"S":"Manish"},"second":{"N":"40"}}'

{
    "Item": {
        "second": {
            "N": "40"
        },
        "first": {
            "S": "Manish"
        }
    }
}
```

5. Query

```
bash-3.2$ aws dynamodb query --table-name test_table --projection-expression "#first, #second" --key-condition-expression "#first = :value" --expression-attribute-values '{":value" : {"S":"Manish"}}' --expression-attribute-names '{"#first":"first", "#second":"second"}'
{
    "Count": 1,
    "Items": [
        {
            "second": {
                "N": "40"
            },
            "first": {
                "S": "Manish"
            }
        }
    ],
    "ScannedCount": 1,
    "ConsumedCapacity": null
}
```

> nếu dùng với localtack thì cần thêm `--endpoint-url=` vào dòng lệnh.

## Tham khảo:
- https://aws.amazon.com/vi/cli/
- https://medium.com/@pablo_ezequiel/install-aws-cli-on-ubuntu-fcaea15e832f
- https://github.com/localstack/awscli-local