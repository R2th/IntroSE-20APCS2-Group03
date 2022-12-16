## Điều kiện tiên quyết 

### Cài đặt JRE/JDK

Đầu tiên, cập nhật lại packages

```
sudo apt-get update
```

Tiếp đến, ta sẽ đi cài đặt Java - **Runtime Environment (JRE)**

```
sudo apt-get install default-jre
```

Bạn có thể cài đặt JDK theo command sau:

```
sudo apt-get install default-jdk
```

### Setting biến môi trường JAVA_HOME


Nhiều chương trình máy chủ Java sử dụng biến môi trường JAVA_HOME để xác định vị trí cài đặt Java. Để cài đặt biến môi trường này, trước tiên ta sẽ cần tìm hiểu nơi Java được cài đặt. 

Bạn có thể kiểm tra bằng cách thực hiện lệnh sau:


```
sudo update-alternatives --config java
```

Và kết quả trả về: (lưu ý path được in đậm)

*There is only one alternative in link group java (providing /usr/bin/java):* **/usr/lib/jvm/java-8-openjdk-amd64**/*jre/bin/java*

Khi đã có java path bây giờ sẽ copy path này vào file sau:

```
sudo vi /etc/environment
```

Và thêm vào cuối file `/etc/environment` nội sau:

```
JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"
```

Lưu và reload lại:

```
source /etc/environment
```

Bây giờ bạn có thể kiểm tra biến môi trường vừa thêm bằng lệnh sau:

```
echo $JAVA_HOME
```

## Download và cài đặt Elasticsearch
Đăng nhập với quyền root

```
$ sudo -i
$ apt-get update
```

Bước này sẽ thực hiện download Elasticsearch. Ở đây mình cài đặt với phiên bản 6.5.4

```
$ wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.5.4.deb
$ dpkg -i elasticsearch-6.5.4.deb
$ systemctl enable elasticsearch.service
$ systemctl restart elasticsearch
```

Để config thông số của Elasticseach bạn có thể tìm và edit file `/etc/elasticsearch/elasticsearch.yml`

```
vi /etc/elasticsearch/elasticsearch.yml
```


Sau khi restart bạn có thể dùng curl để test xem elasticsearch có hoạt động hay không

```
curl -X GET 'http://localhost:9200'
```

## Tăng RAM cho Elasticsearch

Sau khi bạn đã có được 1 lượng dữ liệu lớn cho index của bạn. Và chạy test với lượng request ( search hoặc index) lớn mỗi ngày có thể bạn sẽ đối mặt với những Error sau đây khiến ES bị ngưng chạy, thậm chí gây cho các service khác trong cùng server cũng bị ngưng trệ, không chạy được.

**Biểu hiện:**

Khi xem log của elasticsearch. Bạn sẽ gặp 1 trong những (hoặc tất cả) error message sau:

– rejected execution (queue capacity 1000)

– failed to reduce search

– java.lang.OutOfMemoryError: Java heap space


**Nguyên nhân:**

ES cần nhiều RAM hơn cái lượng mà bạn đang dành cho nó. Bạn cần tăng RAM thêm cho ES (tăng ES_HEAP_SIZE)


Đầu tiên bạn tìm đến file `/etc/elasticsearch/jvm.options` và thực hiện edit:

```
vi /etc/elasticsearch/jvm.options
```

Tìm 2 thuộc tính sau. *Mặc định ES để ESHEAPSIZE=1G*

```
-Xms1g
-Xmx1g
```
Và thay thế thành
```
-Xms6g
-Xmx6g
```
*Ở đây mình chỉ lấy ví dụ là 6GB, tùy vào dữ liệu cũng như số lượng request đê tăng hoặc giảm sao cho hợp lý.*

Và cuối cùng restart lại service
```
service elasticsearch stop
service elasticsearch start
```