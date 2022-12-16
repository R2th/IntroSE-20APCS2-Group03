# GIỚI THIỆU
Một video được truyền phát trực tiếp thời gian thực (RTSP) được phát từ một webiste sử dụng OpenCV vào một ứng dụng Kafka và được sử dụng như một ứng dụng xử lý tín hiệu. Dự án này thường được dùng để làm nổi bật và chứng minh các khái niệm dữ liệu quan trọng khác nhau. Luồng dữ liệu được xử lý theo quy trình:
* GoProducerRTSP module: Một RTSP video được stream từ một trang web thứ 3 bằng cách sử dụng các mã GoCV (Bộ Golang làm lại cho OpenCV). Video này được ghi lại trong một mục của Kafka. Việc xây dựng hình ảnh nhiều tầng được thực hiện để giảm thiểu kích thước hình ảnh thời gian chạy. RTSP là phương thức phổ biến trong các camera an ninh cũng như các hệ thống camera thương mại.
* Zookeeper và Kafka modules: Zookeeper và Kafka được tạo từ các bản Confluent docker. Bên cạnh việc truyền các message, Kafka được sử dụng để liên lạc giữa ngôn ngữ Golang và Python trong project.
*  PyConsumerRTSP module: Video được sử dụng từ chỉ mục Kafka bởi các mã Python chạy trên các máy chủ ( bên ngoài của Docker). Các khung hình của video sẽ được hiển thị sử dụng OpenCV. Một số tính toán đơn giản được thực hiện trên mỗi khung hình video và kết quả sẽ được in ra màn hình. Mã xử lý tín hiệu đơn giản này đóng vai trò giữ chỗ cho các tín hiệu thực tế sau này.
*  PyConsumerRTSP2 module: Đây là một bản sao của PyConsumerRTSP module. 2 Module này thuộc hai nhóm đối tượng khác nhau trong hệ thống Kafka, việc sử dụng xong xong sẽ tăng khả năng mở rộng luồng dữ liệu.

## KAFKA là gì? 
Kafka là một hệ thống message pub/sub phân tán và có khả năng mở rộng rất tốt. Các message của kafka được lưu trên các đĩa cứng, đồng thời có các cơ chế giúp phòng tránh mất dữ liệu. Kafka bản chất giống một hệ thống **logging** nhằm lưu lại các **trạng thái** của hệ thống tránh mất thông tin. 
![](https://images.viblo.asia/4b727fef-4474-4f4d-8436-9d043bb6ce5c.jpg)
Topic trong Kafka được hiểu là một ngôn ngữ chung giữa các producer (người nói) và consumer ( người nghe, sử dụng). Vỡi mỗi topic, kafka sẽ duy trình thông qua quá trình partitioned log. Mỗi Partition là một chuỗi log có thứ tự và không thể thay đổi. 
Mỗi Message trong partition sẽ có id tăng dần. Kafka cluster sẽ lưu lại mọi message đã được published cho dù message đó đã được/chưa sử dụng. Thời gian lưu chữ message có thể được tùy chỉnh thông qua cơ chế log retention.
Kafka đảm bảo việc:
* Message được gửi bởi producer đến một topic partition nào đó sẽ được đảm bảo thứ tự, thông qua offset.
* Consumer instance sẽ *nhìn thấy* message đúng theo thứ tự trong log.

- Có thể sử dụng kafka như một hệ thống message queue thay thế cho ActiveMQ hoặc RabbitMQ.
- Tracking các hành động người dùng: Các thông số như page view, search action của người dùng sẽ được publish vào một topic và xử lý sau.
- Log Aggregration: Log sẽ được gửi từ nhiều server về cùng một nơi thống nhất, sau đó sẽ được làm mịn và xử lý theo một logic nào đó.
- Event-sourcing: Lưu lại trạng thái của hệ thống đó để có thể tái hiện trong trường hợp system bị down.
# CẤU TRÚC DỰ ÁN
```
DataPipeline                # Main folder
├── goproducerrtsp          # To grab frames from RTSP video website and to enqueue in Kafka
│   ├── vendor              # Dependency vendor files generated using 'dep ensure'
│   │   └── ...             #
│   ├── .env                # Environment variables
│   ├── Docker-compose.yml  # To instantiate Docker container
│   ├── Dockerfile          # To build Docker image
│   ├── Gopkg.lock          # Dependency version file generated using 'dep ensure'
│   ├── Gopkg.toml          # Dependency version file generated using 'dep ensure'
│   └── main.go             # Go code producing to Kafka
├── pythonconsumerrtsp      # To consume from Kafka in Python, outside Docker environment
│   ├── dataprocessing      # Template folder for signal processing
│   │   ├── __init__.py     # Package file
│   │   └── alg.py          # Dummy signal processing object: Computes average pixel value
│   ├── kafkapc_python      # Kafka producer and consumer using kafka-python library
│   │   └── __init__.py     #
│   ├── message             # Kafka message handling function
│   │   └── __init__.py     #
│   ├── .env                # Environment variables
│   ├── Docker-compose.yml  # To instantiate Docker container
│   ├── Dockerfile          # To build Docker image
│   ├── main.py             # Python code consuming from Kafka
│   └── requirements.txt    # Imported libraries in the python code
├── pythonconsumerrtsp2     # Duplicate of `pythonconsumerrtsp` to illustrate code scalability
│   ├── ...                 #
│       .                   #
│       .                   #
│       .                   #
│   └── ...                 #
└── zookeeper               # Zookeeper and Kafka
    └── Docker-compose.yml  # To instantiate Docker container for Zookeeper and Kafka
```
# THIẾT KẾ HỆ THỐNG
![](https://images.viblo.asia/fc68cac9-caaa-404d-bcd1-5ebc182572ee.jpg)
Các thành phần của hệ thống sẽ được tìm hiểu cụ thể bên dưới.
## Zookeeper and Kafka
Trước tiên, Zookeeper và Kafka sẽ được bật từ Confluent docker. Cấu trúc của file *Docker-compose.yml*
```
version: '3'
services:

  #Zookeeper
  zookeeper:
    image: confluentinc/cp-zookeeper
    container_name: zookeeper
    restart: always #Ensures that intermittent failures in the Docker environment do not result in unnecessary failures of the service.
    networks:
      - dockerNet
    ports:
      - 2181:2181 #Zookeeper port - access port for external communication
    environment:
      - ZOOKEEPER_SERVER_ID=1
      - ZOOKEEPER_CLIENT_PORT=2181
      - ZOOKEEPER_TICK_TIME=2000

  #Kafka
  kafka:
    image: confluentinc/cp-kafka
    container_name: kafka
    restart: always #Ensures that intermittent failures in the Docker environment do not result in unnecessary failures of the service.
    depends_on:
      - zookeeper
    networks:
      - dockerNet
    ports:
      - 9092:9092 #Kafka broker - access port for external communication
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      # - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT_HOST://localhost:9092, PLAINTEXT://kafka:29092 #For native Docker (e.g., in Windows 10)
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT_HOST://192.168.99.100:9092, PLAINTEXT://kafka:29092 #For Docker Tool (e.g., in Windows 7)
      - KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT, PLAINTEXT_HOST:PLAINTEXT
      - KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT
      - KAFKA_JMX_PORT=1099
      - KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1

networks:
  dockerNet:
    driver: bridge
```
Chạy các tiến trình: 
```
docker-compose up
```
Một số câu lệnh để tear down các containers và lưu trữ các bản ghi
```
docker-compose down -v
docker system prune
docker volume prune
docker network prune
```
## GoProducerRTSP
Các mã Kafka producer trong GOLANG, để stream RTSP video tới các Kafka topic sẽ được cấu trúc như sau:
```
package main

import (
	"encoding/json"
	"fmt"
	"image"
	"io"
	"log"
	"os"
	"time"

	"github.com/Shopify/sarama"
	"github.com/adaickalavan/kafkapc"
	"gocv.io/x/gocv"
)

//Hooks that may be overridden for testing
var inputReader io.Reader = os.Stdin
var outputWriter io.Writer = os.Stdout

// Instantiate a producer
var producer sarama.AsyncProducer

func main() {
	//Sarama logger
	sarama.Logger = log.New(outputWriter, "[saramaLog]", log.Ltime)

	//Create a Kafka producer
	var brokers = []string{os.Getenv("KAFKAPORT")}
	var err error
	producer, err = kafkapc.CreateKafkaProducer(brokers)
	if err != nil {
		panic("Failed to connect to Kafka. Error: " + err.Error())
	}
	//Close producer to flush(i.e., push) all batched messages into Kafka queue
	defer func() { producer.Close() }()

	// Capture video
	webcam, err := gocv.OpenVideoCapture(os.Getenv("RTSPLINK"))
	if err != nil {
		panic("Error in opening webcam: " + err.Error())
	}

	// Stream images from RTSP to Kafka message queue
	frame := gocv.NewMat()
	for {
		if !webcam.Read(&frame) {
			continue
		}

		// Type assert frame into RGBA image
		imgInterface, err := frame.ToImage()
		if err != nil {
			panic(err.Error())
		}
		img, ok := imgInterface.(*image.RGBA)
		if !ok {
			panic("Type assertion of pic (type image.Image interface) to type image.RGBA failed")
		}

		//Form the struct to be sent to Kafka message queue
		doc := Result{
			Pix:      img.Pix,
			Channels: frame.Channels(),
			Rows:     frame.Rows(),
			Cols:     frame.Cols(),
		}

		//Prepare message to be sent to Kafka
		docBytes, err := json.Marshal(doc)
		if err != nil {
			log.Fatal("Json marshalling error. Error:", err.Error())
		}
		msg := &sarama.ProducerMessage{
			Topic:     os.Getenv("TOPICNAME"),
			Value:     sarama.ByteEncoder(docBytes),
			Timestamp: time.Now(),
		}
		//Send message into Kafka queue
		producer.Input() <- msg

		//Print time of receiving each image to show the code is running
		fmt.Fprintf(outputWriter, "---->>>> %v\n", time.Now())
	}
}

//Result represents the Kafka queue message format
type Result struct {
	Pix      []byte `json:"pix"`
	Channels int    `json:"channels"`
	Rows     int    `json:"rows"`
	Cols     int    `json:"cols"`
}
```
Các khung hình được ghi bằng GoCV theo cấu trúc gocv.Mat. Sau đó, nó được chuyển sang các kiểu image.Image và được chuyển thành các type trong RGBA. Các giá trị pixel và các thông tin hình ảnh khác được ghi vào một cấu trúc và gửi đến Kafka topic.
DEP được sử dụng cho việc quản lý phụ thuộc trong Golang. Khi khởi tạo, sử dụng lệnh `dep init` trong thư mục chính của dự án. Sử dụng `dep ensure` để đồng bộ hóa dự án và `dep ensure -update` để update tất các các dependencies
Khi các thư mục `vendor, Gopkg.log, Gopkg.toml` được khởi tạo bởi các lệnh DEP. Việc build docker sẽ chạy bởi lệnh `docker build -t goproducerrtsp .` Cấu trúc Dockerfile:
```
FROM denismakogon/gocv-alpine:3.4.2-buildstage as build-stage

#Copy the local package files (from development computer) to the container's workspace (docker image)
COPY . /go/src/app
# Build the app command inside the container
RUN go install app

FROM denismakogon/gocv-alpine:3.4.2-runtime

#Author label
LABEL Author Adaickalavan Meiyappan

#Copy executable binary file
COPY --from=build-stage /go/bin/app /go/bin/app

#Run executable when container starts
ENTRYPOINT ["/go/bin/app"]
```
## PyConsumerRTSP
Các khung hình video sẽ được lấy bởi người dùng Kafka trong Python bằng các thư viện của Kafka-python. Một thư viện được xây dựng sẵn:
```
from dotenv import load_dotenv
import kafkapc_python as pc
import os
import cv2
import message
import dataprocessing.alg as alg

def main():
    # Create consumer 
    consumer = pc.Consumer(
        os.getenv('TOPICNAME'),
        os.getenv('KAFKAPORT'),
        os.getenv('CONSUMERGROUP')
        )

    # Prepare openCV window
    print(cv2.__version__)
    windowName = "RTSPvideo1"
    cv2.namedWindow(windowName)
    cv2.resizeWindow(windowName, 240, 160)

    #Instantiate a signal processing model
    model = alg.Model()

    # Start consuming video
    for m in consumer:
        #Read message contents
        val = m.value
        print("Time:",m.timestamp,", Topic:",m.topic)

        #Message handler
        img = message.handler(val)

        #Show image
        cv2.imshow(windowName, img)
        cv2.waitKey(1)

        #Process the message
        model.run(img)

    consumer.close()

    return

if __name__ == "__main__":
    # Load environment variable
    load_dotenv(override=True)
    # Call main function
    main()
```
Cấu trúc của giá trị trong .env:
```
TOPICNAME=timeseries_1
#For native Docker (e.g., in Windows 10)
# KAFKAPORT=localhost:9092 
#For Docker Tool (e.g., in Windows 7)
KAFKAPORT=192.168.99.100:9092 
CONSUMERGROUP=consumerGroup_1
```
Các dependencies của project Python có thể được quản lý đơn giản bằng quy trình 2 bước sau:
- Thứ nhất: khởi chạy `pipreqs` và tạo ra file `requirements.txt`
```
pipreqs [options] <path/to/Python/project/folder>

[options]
--force : to overwrite existing file
```
Sau đó install các dependencies thông qua lệnh: `pip install -r requirements.txt`
## PyConsumerRTSP2
Đây là một bản sao của PyConsumerRTSP, việc sử dụng đồng thời cả 2 module Python minh họa cho khả năng mở rộng hệ thống cũng như khả năng phục hồi hệ thống dựa trên Kafka. 
Module PyConsumerRTSP2 tương tự chạy trên máy chủ và bên ngoài các môi trường Docker.