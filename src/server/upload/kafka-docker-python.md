# 0. Prescribed

Với mục tiêu là thực hành chu chuyển dữ liệu publish-subscribe qua kafka không chú trọng quá nhiều về khái niêm Kafka, Docker… mà trên Mac mà mò mẫn cài VM hơi mệt nên thôi đành xài docker.

Gear I use:

- Mac-Pro M1: 16-256
- Python3.9 (anaconda)
- docker-compose version 1.29.2

Project tree:

- docker-kafka-setup
    - kafka-python
        - producers.py
        - consumers.py
        - data_generator.py
    - docker-compose.yml
    - README.md

Git repo: [https://github.com/TrinhAnBinh/Kafka-Docker-Python](https://github.com/TrinhAnBinh/Kafka-Docker-Python)

Style viết theo dạng document nhanh gọn, anh việt lẫn lộn, các bác cân nhắc trước việc đọc để đỡ khó chịu.

# 1. Set up docker compose

Để cấu hình được kafka mình cần có một số components chính bao gồm:

Kafka: Nơi thực thi các tác vụ chính

Zookeeper: Nơi quản lý các tác vụ chính, quản lý task cho kafka.

Vậy docker compose cũng cần pull 2 cái images này về và cho nó thông cổng với nhau.

Tạo file docker-compose.yml như sau:

```yaml
version: '3'

services:
  zookeeper:
    image: wurstmeister/zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
  kafka:
    image: wurstmeister/kafka
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: localhost
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
```

Start nó lên

```yaml
docker-compose -f docker-compose.yml up -d
```

# 2. Docker CLI

Some CLI to interactive with kafka

docker exec to kafka container:  

`docker exec -it kafka /bin/sh`

Access vào kafka folder:

```bash
 /opt/kafka_2.13-2.8.1/bin
```

****Creating a topic****

```bash
kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic message
```

****Listing Kafka topics****

`kafka-topics.sh --list --zookeeper zookeeper:2181`

****Getting details on a Kafka topic****

`kafka-topics.sh --describe --zookeeper zookeeper:2181 --topic messages`

****Deleting a Kafka topic****

`kafka-topics.sh --delete --zookeeper zookeeper:2181 --topic messages`

****Kafka console Producers:****

`kafka-console-producer.sh --broker-list kafka:9092 --topic messages`

**Kafka console Consumers:**

`kafka-console-consumer.sh --bootstrap-server kafka:9092 --topic messages`

# 3. Kafka-Python

Việc tương tác với kafka khi đã start được lên rồi thì cũng đơn giản.

Tham khảo thêm bài viết về kafka trên viblo rất nhiều để hiểu về concept, các loại arks rồi architectures.

Các process bao gồm:

**Install kafka-python:**

```bash
pip3 install kafka-python
```

**Tạo dummy data:**

**create file data_generator**

```python
import random 
import string 

user_ids = list(range(1, 101))
recipient_ids = list(range(1, 101))

def generate_message() -> dict:
    random_user_id = random.choice(user_ids)

    # Copy the recipients array
    recipient_ids_copy = recipient_ids.copy()

    # User can't send message to himself
    recipient_ids_copy.remove(random_user_id)
    random_recipient_id = random.choice(recipient_ids_copy)

    # Generate a random message
    message = ''.join(random.choice(string.ascii_letters) for i in range(32))

    return {
        'user_id': random_user_id,
        'recipient_id': random_recipient_id,
        'message': message
    }
```

**Produce message:**

**Tạo file producers**

```python
import time 
import json 
import random 
from datetime import datetime
from data_generator import generate_message
from kafka import KafkaProducer

# Messages will be serialized as JSON 
def serializer(message):
    return json.dumps(message).encode('utf-8')

# Kafka Producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=serializer
)

if __name__ == '__main__':
    # Infinite loop - runs until you kill the program
    while True:
        # Generate a message
        dummy_message = generate_message()
        
        # Send it to our 'messages' topic
        print(f'Producing message @ {datetime.now()} | Message = {str(dummy_message)}')
        producer.send('messages', dummy_message)
        
        # Sleep for a random number of seconds
        time_to_sleep = random.randint(1, 11)
        time.sleep(time_to_sleep)
```

**Consume message:**

**Tạo file: consumers**

```python
import json 
from kafka import KafkaConsumer

if __name__ == '__main__':
    # Kafka Consumer 
    consumer = KafkaConsumer(
        'messages',
        bootstrap_servers='localhost:9092',
        auto_offset_reset='earliest'
    )
    for message in consumer:
        my_bytes_value = message.value
        my_json = my_bytes_value.decode('utf8').replace("'", '"')
        print(json.loads(my_json))
```

Make sure đã start topic “messages" lên rồi.

```bash
python3 producers.py
python3 consumers.py
```

# 4. Reference

Bài viết được document và chắt lọc nội dung chính. Để tham khảo bài viết gốc các bạn xem tại [đây](https://github.com/better-data-science/Apache-Kafka-in-Python) . Đây cũng là một resource rất ổn cho các bạn làm data

# 5. What next?

Hiện tại mình đã xong phần chu chuyển dữ liệu qua kafka. Sắp tới mình sẽ thử cho nó qua flink để có end to end realtime analysis process.