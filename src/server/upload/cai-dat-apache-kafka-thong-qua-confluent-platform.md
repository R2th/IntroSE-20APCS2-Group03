# Confluent Platform là gì?  
Confluent được tạo ra bởi những người sáng lập ra Apache Kafka. Confluent Platform giúp chúng ta xây dựng các ứng dụng streaming một cách đơn giản bằng cách tích hợp dữ liệu từ rất nhiều nguồn tới một nơi tập trung đó là Kafka.  

Confluent Platform giúp cho việc xây dựng các data pipeline thời gian thực và các ứng dụng streaming trở nên dễ dàng hơn bằng cách tổng hợp dữ liệu từ nhiều nguồn, tại nhiều vị trí vào một platform streamming dữ liệu duy nhất.  Confluent Platform cho phép bạn tập trung vào các logic nghiệp vụ hơn, thay vì lo lắng về các cơ chế cơ bản như cách dữ liệu được vận chuyển hoặc sự tương tác giữa các hệ thống khác nhau. Cụ thể, Confluent Platform đơn giản hóa việc kết nối các nguồn dữ liệu với Kafka, xây dựng các ứng dụng với Kafka, cũng như bảo mật, giám sát và quản lý cơ sở hạ tầng Kafka của bạn.  

![](https://docs.confluent.io/current/_images/confluentPlatform.png)  

# Cài đặt Confluent Platform
> Hiện tại Confluent Platform chỉ hỗ trợ java 8 và java 11 (Không hỗ trợ Java 9 và Java 10)  
> Confluent Platform vẫn chưa hỗ trợ windows

## Trên Ubuntu/Debian
### Cài đặt thông qua APT Repository
1. Cài đặt Confluent public key. Key này được sử dụng trong APT repository  
    ```
    wget -qO - https://packages.confluent.io/deb/5.5/archive.key | sudo apt-key add -
    ```
3. Thêm Repository
    ```
    sudo add-apt-repository "deb [arch=amd64] https://packages.confluent.io/deb/5.5 stable main"
    ```
5. Cập nhật apt-get và cài đặt Confluent Platform platform.
    * Confluent Platform:
        ```
        sudo apt-get update && sudo apt-get install confluent-platform-2.12
        ```
    * Confluent Platform with RBAC:
        ```
        sudo apt-get update && sudo apt-get install confluent-platform-2.12 && \
        sudo apt-get install confluent-server
        ```
    * Confluent Platform using only Confluent Community components:
        ```
        sudo apt-get update && sudo apt-get install confluent-community-2.12
        ```  
        
### Cài đặt thông qua zip file
1. Tải về từ  [đây](https://www.confluent.io/download/) hoặc sử dụng curl
    * Confluent Platform  
        ```
        curl -O http://packages.confluent.io/archive/5.5/confluent-5.5.0-2.12.zip
        ```
    * Confluent Platform using only Confluent Community components  
        ```
        curl -O http://packages.confluent.io/archive/5.5/confluent-community-5.5.0-2.12.zip
        ```
3. Giải nén  
    ```
    unzip confluent-5.5.0-2.12.zip
    ```


Tên gói cài đặt kết thúc bằng phiên bản Scala mà Kafka được xây dựng. Ví dụ: gói confluent-platform-2.12 dành cho Confluent Platform 5.5.0 và dựa trên Scala 2.12.  
        
### Khởi chạy Confluent Platform 
1. ZooKeeper  
    ```
    sudo systemctl start confluent-zookeeper
    ```
3. Kafka  
    * Confluent Platform:
        ```
        sudo systemctl start confluent-server
        ```
    *   Confluent Platform using only Confluent Community components:
        ```
        sudo systemctl start confluent-kafka
        ```  
     
6. Schema Registry  
    ```
    sudo systemctl start confluent-schema-registry
    ```  
    
7. Start các Confluent Platform components khác
    * Control Center  
        ```
        sudo systemctl start confluent-control-center
        ```
    * Kafka Connect  
        ```
        sudo systemctl start confluent-kafka-connect
        ```
    * Confluent REST Proxy  
        ```
        sudo systemctl start confluent-kafka-rest
        ```
    * ksqlDB  
        ```
        sudo systemctl start confluent-ksqldb
        ```  
        
### Khởi chạy ở chế độ local 
Để làm quen với Confluent Platform chúng ta sẽ chạy ở chế độ local với single node, sau khi di chuyển vào /{confluent home}/bin ta dùng lệnh:  
```
confluent local start
```  

Truy cập vào giao diện quản lý của Control Center tại: http://localhost:9021

![](https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/100063722_1791892667619608_6584179882605936640_n.jpg?_nc_cat=106&_nc_sid=32a93c&_nc_ohc=UiMbP1F7wrsAX9VHMDe&_nc_ht=scontent.fhan2-2.fna&oh=bcf3a47f874d457959616dd7c33b33a7&oe=5EF28E73)  



        


        




# Nguồn tham khảo
* https://viblo.asia/p/hang-doi-thong-diep-apache-kafka-jvEla6145kw
* https://www.tutorialspoint.com/apache_kafka/apache_kafka_cluster_architecture.htm
* https://blog.vu-review.com/kafka-la-gi.html
* https://viblo.asia/p/kafka-apache-WAyK8pa6KxX
* https://data-flair.training/blogs/kafka-architecture/
* https://www.cloudkarafka.com/blog/2016-11-30-part1-kafka-for-beginners-what-is-apache-kafka.html
* https://www.facebook.com/notes/c%E1%BB%99ng-%C4%91%E1%BB%93ng-big-data-vi%E1%BB%87t-nam/ti%E1%BA%BFp-c%E1%BA%ADn-kafka-th%C3%B4ng-qua-confluent-platform/884414712076055/
* https://docs.confluent.io/current/platform.html#sr-long