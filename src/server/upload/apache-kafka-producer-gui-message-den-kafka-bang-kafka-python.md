# Overview

Understand how to produce message and send to the Kafka topic 

# Architecture
![image.png](https://images.viblo.asia/f72b4941-6c19-47e3-a7c1-183ab924f909.png)

Producer has many types and sources: message from Credit Card transactions, message from Facebook, Email or any systems

When the producer send the message to kafka, kafka sau khi nhận message và randomly phân bố message đó về từng partition. Vậy nên Producer chỉ cần quan tâm việc:

- Boostrap Server
- Topic
- Value_serializer : cách, định dạng mà message được gửi đến
- client_id : là id mà client được cấp và producer có id này mới send được message to kafka topic
- acks :  có 3 dạng (0, 1, 'all'), khi gửi message đến kafka, procedure yêu cầu kafka xác nhận cho mình để tiến hành process tiếp tục các message khác. defaults to acks=1
1. acks = 0: Producer sẽ không chờ việc Kafka xác nhận đã hoàn thành việc nhận dữ liệu. Mà mỗi lần có message, Producer sẽ tự động add message vào menmory. Do vậy, trong một số trường hợp dữ liệu sẽ bị mất và Kafka không guarantee cho việc này.
2. acks = 1: Producer sẽ chỉ chờ cho việc message được write xuống leader xong mà không quan tâm việc message được replicate sang những follower khác. Ngay sau đó, Producer sẽ tiếp tục gửi một message khác đến. Với cơ chế này thì trong 1 vài trường hợp message sẽ bị lost ở consumer, do có lỗi tại leader
3. acks = all. Producer sẽ chờ cho toàn bộ quá trình leader và follower được write xuống thì mới process một message khác. Do vậy Kafka sẽ đảm bảo việc message sẽ được ko lost dữ liệu. Nhưng sẽ xảy ra trường hợp dữ liệu bị ngẽn tại Producer

# Code example

## Requirement

- Python 3.6 , 3.7, 3.8
- pip install kafka-python - required
- pip install Faker - optional :  this Lib to ramdomly create dummy data

## Code example

1. Please visit the previous document to know how to set up kafka, kafka CLI, Kafka UI.
2. Produce the dummy data

```python
from time import time
from kafka import KafkaProducer
from faker import Faker
import json, time

faker = Faker()

def get_register():
    return {
        'name': faker.name(),
        'year' : faker.year()
    }
```

1. Send data to Kafka

As above we know that 3 points must have to send the message to kafka is: 

- boostrap server or broker: the ip/host of broker
- topic name
- value_serializer : message and message type

Code for sending message:

```python
from time import time
from kafka import KafkaProducer
from faker import Faker
import json, time

faker = Faker()

def get_register():
    return {
        'name': faker.name(),
        'year' : faker.year()
    }

def json_serializer(data):
    return json.dumps(data).encode('utf-8')

producer = KafkaProducer(
    bootstrap_servers = ['localhost:9092'], # server name
    value_serializer = json_serializer # function callable
    )

while 1==1:
    user = get_register()
    print(user)
    producer.send(
        'second_topic',user
    )
    time.sleep(3)
```

## Focus on only one partition

Set up việc gửi message chỉ đến 1 given partition in list partition of kafka

```python
from time import time
from kafka import KafkaProducer
from faker import Faker
import json, time

faker = Faker()

def get_register():
    return {
        'name': faker.name(),
        'add' : faker.year()
    }

def get_partitioner(key_bytes, all_partitions, available_partitions):
    return 0

def json_serializer(data):
    return json.dumps(data).encode('utf-8')

producer = KafkaProducer(
    bootstrap_servers = ['localhost:9092'], # server name
    value_serializer = json_serializer, # function callable
    # partitioner = get_partitioner, # function return 0 >>> only partition_0 can received messages
    )

while 1==1:
    user = get_register()
    print(user)
    producer.send(
        'second_topic',user
    )
    time.sleep(3)
```