### Getting started
Do sắp tới dự án mình đang làm có mong muốn sử dụng elasticsearch để cải thiện các chức năng của ứng dụng. Elastic search cũng là một công nghệ được ưu chuộng của các trang web lớn. Ví dụ: facebook, quora, wiki, netflix...

Mình tìm kiếm trên mạng có rất nhiều bài viết về elastic search giới thiệu về các khái niệm cũng như code mẫu cho elastic search tuy nhiên elastic search có quá nhiều thứ cần nghiên cứu và mình không biết nên bắt đầu từ đâu. May sao mình thấy một bài chia sẽ kiến thức về elasticsearch cho những người có base làm việc với SQL/RDBMS. Do đó mình quyết định viết bài này cho những bạn cũng gặp vấn đề giống mình có hướng nghiên cứu đơn giản và dễ hiểu nhất.

Bài viết của mình sẽ bao gồm các phần chính sau:


### Introduction to the Elasticsearch

Elasticsearch là một search engine dạng phân tán được thiết kế cho ứng dụng cần có chức năng tìm kiếm với hiệu suất cao. Sau đây là 4 đặc điểm chính nổi bất của elastic search
1. Là một search engine mạnh mẽ sử dụng Lucene Index (là một phần mềm mã nguồn mở dùng để phân tích, đánh chỉ mục và tìm kiếm thông tin)
2. Khả năng phần tán ( dữ liệu có thể được lưu trữ nhiều nơi, nhưng việc tìm kiếm sẽ được thực hiện trên 1 hệ thống toàn vẹn)
3. Khả năng tìm kiếm gần như real time (các bạn có thể tham khảo tại [đây](https://www.elastic.co/guide/en/elasticsearch/guide/current/near-real-time.html))
4. Dễ dàng cân bằng tải (đảm bảo nếu có 1 node bị lỗi thì các node khác vẫn sẽ hoạt động bình thường và thay thế công việc của node hỏng)

Elasticsearch cung cấp một số tính năng tương tự của NoSQL do đó một số người sẽ nhầm tương elastic search tượng tự với các engine lưu trữ dữ liệu dạng NoSQL nhưng hai engine này khác nhau và ES chủ yếu vẫn là một công cụ tìm kiếm và phân tích dữ liệu.

Elasticsearch không sử dụng để lưu trữ dữ liệu, mình có search trên mạng một số bài viết chia sẻ việc sử dụng ES như một database là bad idea các bạn có thể xem tại [đây](https://www.quora.com/Why-shouldnt-I-use-ElasticSearch-as-my-primary-datastore)

Tuy nhiên theo mình hiểu, có thể tạo  `rivers` để kết nối elasticsearch vs các databases khác. River là plugin service  được sử dụng để synchronize Elasticsearch index dữ liệu được lưu trong SQL database

Tiếp theo là phần cài đặt elasticsearch. Do mình sử dụng ubuntu do đó mình sẽ tham khảo hướng dẫn cài đặt tại [đây](https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html). Sau khi đã cài đặt xong vào terminal để kiểm tra trạng thái elasticsearch như sau:

```
$ sudo service elasticsearch status
● elasticsearch.service - Elasticsearch
   Loaded: loaded (/usr/lib/systemd/system/elasticsearch.service; disabled; vendor preset: enabled)
   Active: active (running) since CN 2018-06-24 17:25:10 +07; 4s ago
     Docs: http://www.elastic.co
 Main PID: 9963 (java)
    Tasks: 18
   Memory: 1.1G
      CPU: 3.273s
   CGroup: /system.slice/elasticsearch.service
           └─9963 /usr/bin/java -Xms1g -Xmx1g -XX:+UseConcMarkSweepGC -XX:CMSInitiatingOccupancyFraction=75 -XX:+UseCMSInitiatingOccupancyOnly -XX:+AlwaysPreTouch -Xss1m -Djava.awt.headless=true -Dfile.en
```

Hoặc bạn có thể sử dụng CURL để load dữ liệu
```
$ curl http://localhost:9200
{
  "name" : "FOI0gmQ",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "8XU5cRYvQkKfn1Uy5VbTJw",
  "version" : {
    "number" : "6.2.4",
    "build_hash" : "ccec39f",
    "build_date" : "2018-04-12T20:37:28.497551Z",
    "build_snapshot" : false,
    "lucene_version" : "7.2.1",
    "minimum_wire_compatibility_version" : "5.6.0",
    "minimum_index_compatibility_version" : "5.0.0"
  },
  "tagline" : "You Know, for Search"
}
```
### Postman
POSTMAN là một công cụ cho phép chúng ta làm việc với API, nhất là REST. Với Postman, ta có thể gọi Rest API mà không cần viết dòng code nào. Do elasticsearch cung cấp các phương thức tương tác dưới dạng restful do đó mình sẽ sử dụng POSTMAN để thực hiện các request 

Để bắt đầu với POSTMAN, bạn truy cập vào trang chủ https://www.getpostman.com/ và download phiên bản phù hợp cho hệ điều hành đang sử dụng (có các phiên bản cho MAC OS, Windows 32bit, Window 64bit). Nếu bạn đang sử dụng hệ điều hành nhân Linux thì bạn phải tải POSTMAN từ Extensions của Chrome để cài đặt. 


### Working with JSON documents
Elastic search lưu trữ documents theo JSON format. Do đó mình sẽ nói ngắn gọn về JSON, dưới đây là cấu trúc của object kiểu json format.

```
{
    "name" : "Elastic"
}
```

Một document có thể có rất nhiều field với nhiều giá trị khác nhau:
```
{
    "name" : "Elastic",
    ...
    <field> : <value>
}
```
Mỗi giá trị sẽ chập nhận 6 giá trị hợp lệ đó là (string, number, object, an array, a boolean null)

### Basics
Sau đây là một số khái niệm cơ bản mà bạn cần phải biết trước khi bắt tay vào nghiên cứu elasticsearch
1. ElasticSearch có nhiều Indexes. Một Index tương tự như một bảng trong SQL.
2. Một index có nhiều properties. Properties là định nghĩa về cấu trúc trong bảng (Ví dụ: name: string; age: integer; actived: boolean).
3. Tương tác với dữ liệu của elasticsearch trong qua gọi REST API . Ví dụ để tạo mới object ta sẽ sử dụng POST, để cập nhật PUT, để xóa DELETE.

Khuyến cáo: phần mình so sánh ở trên đã là đơn giản hóa để mọi người có thể hiểu được. Vì vậy nếu bạn nào muốn hiểu rõ hơn thì các bạn có thể vào [đây](https://www.elastic.co/guide/en/elasticsearch/reference/current/_basic_concepts.html) để đọc thông tin chính xác hơn. Hoặc các bạn có thể tham khảo các bài viết trên để hiểu rõ hơn các khái niệm trong elastic search.

### CRUD - Create / Read / Update / Delete

* **Tạo một index bằng câu lệnh sau**

```
Sử dụng phương thức PUT và gọi http://localhost:9200/team
```

* **Kiểm tra index Team đã được tạo thành công chưa**

```
Sử dụng phương thức GET và gọi http://localhost:9200/team

{
    "team": {
        "aliases": {},
        "mappings": {},
        "settings": {
            "index": {
                "creation_date": "1529851754521",
                "number_of_shards": "5",
                "number_of_replicas": "1",
                "uuid": "Lk-2SsIBQnqFh_fQZRAxUA",
                "version": {
                    "created": "6020499"
                },
                "provided_name": "team"
            }
        }
    }
}
```

* **Đóng Index**

Bạn sẽ cần đóng Index lại để có thể chỉnh sửa properties của Team bằng câu lệnh sau:
```
Sử dụng phương thức POST và gọi localhost:9200/team/_close

{
    "acknowledged": true
}
```
* **Mapping Columns (định nghĩa cấu trúc của Index)**

```
Sử dụng phương thức PUT và gọi http://localhost:9200/team/_mapping/member

# đồng thời truyền json object sau 
{
 "properties": {
 "id": { "type": "text" },
 "name": { "type": "text" },
 "email": { "type": "text" },
 "age": { "type": "integer" },
 "phone": { "type": "text" },
 "image": { "type": "text" },
 "technologies": {"type" : "text" }
 }
}
```

Kết quả:
```
GET:  http://localhost:9200/team
 {
    "team": {
        "aliases": {},
        "mappings": {
            "member": {
                "properties": {
                    "age": {
                        "type": "integer"
                    },
                    "email": {
                        "type": "text"
                    },
                    "id": {
                        "type": "text"
                    },
                    "image": {
                        "type": "text"
                    },
                    "name": {
                        "type": "text"
                    },
                    "phone": {
                        "type": "text"
                    },
                    "technologies": {
                        "type": "text"
                    }
                }
            }
        },
        "settings": {
            "index": {
                "creation_date": "1529851754521",
                "number_of_shards": "5",
                "number_of_replicas": "1",
                "uuid": "Lk-2SsIBQnqFh_fQZRAxUA",
                "version": {
                    "created": "6020499"
                },
                "provided_name": "team"
            }
        }
    }
}
```
* **Import dữ liệu vào index sử dụng _bulk**

Trước tiên bạn cần mở index ra trước 
```
Sử dụng phương thức POST và gọi localhost:9200/team/_open
```
Sau đó bạn chuẩn bị 1 file json để lưu trữ dữ liệu sau:
```
{"create": { "_id": 1, "_type": "member"}
{"id": "5510ce4ee174054836ef3c5a","name": "Vargas Rosa","email": "vargasrosa@zizzle.com","age": 25,"phone": "+1 (807) 530–3567","image": "http://api.randomuser.me/portraits/men/78.jpg","description": "enim Lorem upidatat et nostrud ut irure qui qui nulla qui deserunt fugiat laborum elit","technologies": "ios javascript python"}
{"create": { "_id": 2, "_type": "member"}
{"id": "5510ce4e24ecdab88fe18d06","name": "Navarro Thornton","email": "navarrothornton@zizzle.com","age": 34,"phone": "+1 (896) 579–3364","image": "http://api.randomuser.me/portraits/men/59.jpg","description": "sit enim velit cillum magna commodo tempor","technologies": "swift erlang java"}
{"create": { "_id": 3, "_type": "member"}
{"id": "5510ce4e6e7bbdbc120c9a89","name": "Francine Aguirre","email": "francineaguirre@zizzle.com","age": 30,"phone": "+1 (963) 492–3402","image": "http://api.randomuser.me/portraits/men/82.jpg","description": "cu et sit ullamco tempor Lorem excepteur magna pariatur","technologies": "javascript ionic ruby"}
{"create": { "_id": 4, "_type": "member"}
{"id": "5510ce4ebd2a509edd8c6b50","name": "Krystal Simmons","email": "krystalsimmons@zizzle.com","age": 40,"phone": "+1 (857) 418–2040","image": "http://api.randomuser.me/portraits/women/10.jpg","description": "ea dolor ex proident eiusmod et ut irure esse","technologies": "ruby c c"}
```

Cuối cùng ta sẽ thực hiện import bằng câu lệnh sau:
```
Sử dụng phương thức PUT và gọi http://localhost:9200/team/member/_bulk
```

* **Lấy toàn bộ dữ liệu của index (or Select * from table)**

```
Sử dụng phương thức GET và gọi  localhost:9200/team/_search?size=500&pretty=true&q=*:*

#Kết quả trả về
{
    "took": 247,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": 4,
        "max_score": 1,
        "hits": [
            {
                "_index": "team",
                "_type": "member",
                "_id": "2",
                "_score": 1,
                "_source": {
                    "id": "5510ce4e24ecdab88fe18d06",
                    "name": "Navarro Thornton",
                    "email": "navarrothornton@zizzle.com",
                    "age": 34,
                    "phone": "+1 (896) 579–3364",
                    "image": "http://api.randomuser.me/portraits/men/59.jpg",
                    "description": "sit enim velit cillum magna commodo tempor",
                    "technologies": "swift erlang java"
                }
            },
            ...
```
* Tìm kiếm cụ thể 

```
Sử dụng phương thức POST và gọi  localhost:9200/team/_search?pretty=true

# đồng thời truyền json object sau 
{
  "query": {
    "match": {
        "technologies": "ruby"
    }
  }
}

#Kết quả trả về 
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": 2,
        "max_score": 0.6931472,
        "hits": [
            {
                "_index": "team",
                "_type": "member",
                "_id": "4",
                "_score": 0.6931472,
                "_source": {
                    "id": "5510ce4ebd2a509edd8c6b50",
                    "name": "Krystal Simmons",
                    "email": "krystalsimmons@zizzle.com",
                    "age": 40,
                    "phone": "+1 (857) 418–2040",
                    "image": "http://api.randomuser.me/portraits/women/10.jpg",
                    "description": "ea dolor ex proident eiusmod et ut irure esse",
                    "technologies": "ruby c c"
                }
            },
            {
                "_index": "team",
                "_type": "member",
                "_id": "3",
                "_score": 0.2876821,
                "_source": {
                    "id": "5510ce4e6e7bbdbc120c9a89",
                    "name": "Francine Aguirre",
                    "email": "francineaguirre@zizzle.com",
                    "age": 30,
                    "phone": "+1 (963) 492–3402",
                    "image": "http://api.randomuser.me/portraits/men/82.jpg",
                    "description": "cu et sit ullamco tempor Lorem excepteur magna pariatur",
                    "technologies": "javascript ionic ruby"
                }
            }
        ]
    }
}
```

* Xóa index

```
Sử dụng phương thức DELETE và gọi  http://localhost:9200/team
```

###  Conclusions 
Như vậy trong phần này chúng ta đã tìm hiểu về các phần sau
1. Cài đặt và setup elasticsearch
2. Sử dụng postman để tương tác với elasticsearch
3. Thực hiện một số câu lệnh cơ bản trong elasticsearch

Ở phần tiếp theo mình sẽ tìm hiểu sâu hơn các câu truy vấn trong elasticsearch và có những demo cho các chức năng đó. Cảm ơn các bạn đã theo dõi bài viết của mình.

**References**
* https://medium.com/@udayms/elasticsearch-reactjs-fd5059140760
* https://www.elastic.co/guide/en/elasticsearch/reference/current/docs.html
* https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html