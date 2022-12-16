![](https://images.viblo.asia/f58ac3dd-bb34-47d7-bbc2-5a54a185ed7e.png)

 Chào xìn anh em!!!!
 Mình là **Nguyễn Đức Thảo**, sau cơ số ngày luyện công với thằng Elasticsearch thì cũng có năm được những khái niệm và cách làm việc với thằng Elasticsearch này!

 Bài viết này được viết ra với dựa trên những thứ mà mình biết, chỉ mang tính cá nhân thoy nhe :)

 Có rất nhiều kiến thức sâu về thằng Elastic, nhưng bài viết này chỉ xoay quanh việc làm như thế nào để truy vấn dữ liệu và CRUD với Elasticsearch!

## **Elasticsearch là gì?**

Trước khi tìm hiểu một vấn đề gì đó thì ta phải biết nó là gì đã!

Elasticsearch là một search engine (công cụ tìm kiếm) rất mạnh mẽ.

Elasticsearch cũng có thể coi là một **document oriented database** **(1)** , nó chứa dữ liệu giống như một database và thực hiện tìm kiếm trên những dữ liệu đó.

Đại khái là thay vì bạn tìm kiếm trên file, trên các database như MySQL, Oracle, MongoDB… thì bạn chuyển dữ liệu đó sang Elasticsearch và thực hiện tìm kiếm trên Elasticsearch sẽ mang lại hiệu quả rất lớn, đặc biệt là trong những trường hợp dữ liệu lớn.

Cái này mình coppy thôi chứ cũng lười viết lắm :v: 

  > (1) **document oriented database**  là gì? - Thường thì khi làm việc với các database như mysql, sql server, oracle..v..v... thì ta phải define cấu trúc cho từng table, với **document oriented database** thì dữ liệu hiển thị dạng dưới object JSON, chính vì thế cấu trúc của nó sẽ có thể thay đổi theo ý muốn và không có cố định nào cả. Nôm na là thế :)

## **Bắt đầu đi vào việc thêm,sửa,xóa với Elasticsearch**

NOTE: Trước khi đọc phần này thì hãy đọc bài viết [những khái niệm của elasticsearch](https://viblo.asia/p/elasticsearch-la-gi-1Je5E8RmlnL) để hiểu cơ bản những khái niệm của ElasticSearch nhé !

### **Cài đặt Elasticsearch:**
 - Có thể vào [đây](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html) và làm theo hướng dẫn để cài trên MacOS,Linux,Window..v..v.. từ nhà sản xuất!
 - Nếu bạn không muốn cài nó trực tiếp vào máy của mình thì có thể sử dụng **Docker** theo các bước dưới đây:
>  - + B1: Tạo 1 file docker-compose.yml cùng cấp với thư mục src
>  ![image.png](https://images.viblo.asia/2af6cd56-c1ec-41cb-ad18-139ea7919a8b.png)
>  - + B2: Coppy đoạn code này paste vào file này, nếu bạn không biết về Docker thì không cần quan tâm đến mấy dòng này :v: 
>  Nhưng bạn phải cài **Docker Desktop** trên máy của mình trước nhé, cài như thế nào thì trên gg rất nhiều
```python
version: "3"
services:
  elasticsearch:
    container_name: viet-cinema-elasticsearch
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.2
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - bootstrap.memory_lock=true
    ports:
      - 9200:9200
    volumes:
      - C:/data-es:/usr/share/elasticsearch/data

  kibana:
    container_name: viet-cinema-kibana
    image: docker.elastic.co/kibana/kibana:7.15.2
    environment:
      - ELASTICSEARCH_HOSTS=http://viet-cinema-elasticsearch:9200
    ports:
      - 5601:5601
#volumes:
#  data-es:
#    driver: ./data-es
```

>  - + B3 : Mở terminal ở trong IDE lên và chạy lệnh `docker-compose up -d` và nhấn enter và đợi khi nó chạy xong!
>  - + B4: Sau khi chạy xong bạn mở chrome lên vào truy cập vào url `http://localhost:9200/` và nó ra kết quả như thế này là thành công:
>  ![image.png](https://images.viblo.asia/84083fbd-2f08-4ffd-a7c5-dbb06bfd21e8.png)
>  Do trên đoạn code trên mình có 1 phần là Kibana nhưng mình sẽ không dùng đến thằng này mà mình sẽ thay thế nó bằng PostMan nên các bạn cứ kệ nó ở đó đừng quan tâm đến nó :)

## **BẮT ĐẦU NÀO** :

Ở trong elasticsearch sẽ public những API để ta làm việc với elasticsearch. Bắt đầu nào

### **API Hiển thị thông tin version, cluster** 

```perl
GET /
```
![image.png](https://images.viblo.asia/28856540-378e-41ff-8734-921293e3e94b.png)

### **API Hiển thị chi tiết thông tin node:**
```shell
GET /_cat/nodes?format=json
```
![image.png](https://images.viblo.asia/cafac521-7a90-4bba-a061-4277f9a4ff3b.png)

### **API liệt kê, hiển thị các Index trong Elasticsearch**
```shell
GET /_cat/_indices?v
```
![image.png](https://images.viblo.asia/2ee2216a-8353-4656-93ed-53f579262423.png)

### **API tạo Index trong Elasticsearch**
```scala
PUT /{index_name}
```
![image.png](https://images.viblo.asia/bf3c5aa7-3355-4d64-8474-19120d56dc40.png)

### **Cài đặt các field, số replica set, số shard khi tạo Index**
```swift
PUT /index_name
{
    "settings" : {
        "index" : {
            "number_of_shards" : 3, 
            "number_of_replicas" : 2 
        }
    }
}
```
![image.png](https://images.viblo.asia/c0310cbd-a93b-4684-9711-09010fca1086.png)
Mặc định `number_of_shard = 5 và number_of_replicas = 1`

Lưu ý về quy tắc đặt tên Index:

- Chỉ được đặt tên index bằng chữ in thường
- Không bao gồm các ký tự \, /, *, ?, ", <, >, |, ` ` (khoảng trắng / dấu cách), ,, #
- Từ Elasticsearch 7+ không được sử dụng ký tự :
- Không được bắt đầu bằng các ký tự  -, _, +
- Không thể là . hoặc .., tuy nhiên có thể dùng ký tự . và kết hợp với các ký tự khác
- Không được dài hơn 255 bytes

### **API xóa Index trong Elasticsearch**

```markdown
DELETE /index_name
```
![image.png](https://images.viblo.asia/71387be9-2b5d-48dc-9ee8-30455afbf0d5.png)

### **Xóa nhiều index trong cùng 1 request**
```markdown
DELETE /index_name_1,index_name_2
```
![image.png](https://images.viblo.asia/8e9e8c1b-2bde-4053-8816-302d34105dfc.png)

### **Xóa tất cả Index trong 1 request**
```markdown
DELETE /_all
```
![image.png](https://images.viblo.asia/22e93cc0-51da-4ddb-a30a-5f6156dd1163.png)

### **API Insert, thêm dữ liệu vào Elasticsearch**

**Cách 1: Dùng API POST**

```cpp
POST /index_name/type_name/id
{
   "field" : "value"
}
```
Trong đó:

- `index_name` và `type_name` là tên của Index và tên của Type, nếu chưa tồn tại thì sẽ được tự động tạo
- id là id của document được tạo, nếu không truyền id thì nó sẽ tự động tạo ra 1 chuỗi để làm id.

![image.png](https://images.viblo.asia/70fff10d-9e40-43d6-8ee9-1938ebe688d6.png)

> *Trường hợp mình không truyền id thì id của document mới sẽ được tự động tạo ra.*

Trường hợp index, type và id truyền vào đã tồn tại thì nó sẽ tương đương với câu lệnh update.
![image.png](https://images.viblo.asia/05052a9a-3f31-4fa2-aa3c-4b8f4b8e14cf.png)

**Cách 2: Dùng API PUT**

```cpp
PUT /index_name/type_name/id
{
   "field" : "value"
}
```
![image.png](https://images.viblo.asia/cf87b83d-4c5c-4971-b2b4-2ca4bd6f2b34.png)

### **API get document Elasticsearch.**

```ruby
GET /index_name/type_name/id
```

![image.png](https://images.viblo.asia/849c9885-ef38-4d3e-be6c-1938361de5bf.png)

> Tuy nhiên trong dữ liệu trả về có khá nhiều field không cần thiết như index name, version…
> Để lấy data của mỗi document ta dùng thêm thẻ _source vào sau url

```markdown
GET /index_name/type_name/id/_source
```
![image.png](https://images.viblo.asia/af374bb5-6933-42e0-9126-da71a12d442a.png)

Trường hợp chỉ muốn lấy 1 số field trong document ta dùng tham số` _source=field1,field2`
![image.png](https://images.viblo.asia/8f2a7a3e-bfdb-4dd6-bc77-578e21a1c2f4.png)

### **API Update document Elasticsearch.**

**Cách 1: Modifiy document bằng method **

```shell
PUT /index_name/type_name/id
{
  "field": "data"
}
```
![image.png](https://images.viblo.asia/cf04c9c0-f194-4511-adf3-e1c7afabad30.png)

**Cách 2: Update document bằng method**

```shell
POST /index_name/type_name/id
{
  "field": "data"
}
```

![image.png](https://images.viblo.asia/0d3cd93b-8005-406a-96a5-b7960cf08a2f.png)

> Hãy để ý dòng `Version`, cái này sẽ hiển thị số lần mà ta đã update cho document

> Update document bằng method `POST` có tác dụng tương đương với method `PUT`
> 
> Tuy nhiên bản chất của việc update document bằng method `POST` khác với method `PUT` ở chỗ là method `PUT` sẽ replace / sửa lại dữ liệu trên document đã có còn method `POST` là xóa document cũ đi (nếu có tồn tại) và tạo 1 document mới.

### **API đọc dữ liệu – Tìm kiếm dữ liệu, document Elasticsearch**

**Tìm tất cả document trong tất cả các index**

```markdown
GET /_search
```
Hoặc
```shell
GET /_all/_search
```

**Tìm tất cả document trong 1 type**
```markdown
GET /_search?q=word
```

![image.png](https://images.viblo.asia/68b02e9e-6feb-4391-87b5-9702bc3b2350.png)

> Ví dụ tìm tất cả các document có chứa từ Đức trong field name

```markdown
GET /_search?q=name:Đức
```

### **API Xóa dữ liệu trong Elasticsearch**

**Cách 1: Sử dụng DELETE API**

```ruby
DELETE /index_name/type_name/id
```

> Ví dụ xóa document có `id = 1` nằm trong type `info` của index `nguyen-duc-thao`

![image.png](https://images.viblo.asia/f83b0736-6e72-4544-8de6-57a9435c610b.png)

**Cách 2: Xóa document bằng Query API**

> Để xóa document bằng Query API ta dùng method POST với thẻ _delete_by_query

```rust
POST /index_name/type_name/_delete_by_query
{
  "query": { 
    "match": {
      "message": "some message"
    }
  }
}
```
![image.png](https://images.viblo.asia/0015e341-7aea-4ff2-8c92-aa1e842cde3d.png)

# **Kết**

Như vậy là ta đã đi qua những hướng dẫn cơ bản để làm việc với elasticsearch rồi. Ở bài viết sau mình sẽ hướng dẫn áp dụng elasticsearch vào dự án spring boot