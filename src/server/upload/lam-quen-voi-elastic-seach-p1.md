## Giới thiệu về Elastic Search
Elastic Search là một cơ sở dữ liệu tối ưu cho việc tìm kiếm. Elastic Search đi kèm với với Kibana, Logstash tạo thành ELK Stack được đánh giá rất cao trong lĩnh vực search engine, log. Vì vậy series bài viết này sẽ giúp các bạn làm quen với công nghệ này, bắt đầu từ việc cài đặt môi trường cho đến code.
## Cài đặt môi trường
Để đơn giản quá trình cài đặt, mình sẽ tiến hành cài đặt Elastic Search trên docker.
Tạo docker network
```bash
docker network create elasticnet
```

Tạo container elaticsearch.
```bash
docker run -d --name elasticsearch --net elasticnet -p 9200:9200 -e "discovery.type=single-node" elasticsearch:7.8.1
```

Tạo container kibana.
```bash
docker run -d --name kibana --net elasticnet -p 5601:5601 kibana:7.8.1
```

Nếu bạn đã quen thuộc với docker rồi thì 2 câu lệnh trên hoàn toàn quen thuộc. Giải thích đơn giản là sẽ kéo image elasticsearh về máy, gắn nó vào network có tên elasticnet và expose cổng 9200 trên máy host, kibana cũng tương tự.

Từ lần sau, để chạy môi trường, chỉ cần nhập trên console là có thể khởi động elasticsearch và kibana một cách dễ dàng.

```bash
docker start elasticsearch kibana
```

Kiểm tra xem container đã được chạy hay chưa

```bash
docker ps
```

Nếu thấy có hai container là elasticsearch và kibana là đã thành công. Truy cập http://localhost:9200 để đảm bảo Elastic Search server đã được chạy.

## Thao tác với Elasticsearch trên devtool của kibana.

Truy cập vào devtool trên kibana: http://localhost:5601/app/kibana#/dev_tools/console

![](https://images.viblo.asia/de528d87-56a1-4b4c-a023-7b7b08def791.png)

Tạo một index tên là person (có thể coi là tạo một bảng trong các csdl khác). Lưu ý tên index viết thường.
```
PUT /person
```

Tạo một bản ghi trên Elastic search với index person.
```
POST /todo/doc/4 
{
  "Name": "Minh Nguyễn Hữu",
  "Address": "Trần Phú hà nội",
  "Age": 25
}
```

Kết quả

```Json
{
  "_index" : "person",
  "_type" : "_doc",
  "_id" : "J4wlKnQB0I9nZsO-qYTB",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 1,
  "_primary_term" : 1
}
```
Bạn có thể thấy trường khóa của bản ghi là _id. Để update thông tin cho bản ghi, sử dụng PUT.

```
POST /todo/doc/{id của bản ghi}
{
  "Name": "Minh Nguyễn Hữu",
  "Address": "Trần Phú hà nội",
  "Age": 25
}
```

Câu lệnh để lấy tất cả bản ghi

```
GET /person/_search
{
    "query": {
        "match_all": {}
    }
}
```

Kết quả

```Json
{
  "took" : 656,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 3,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "person",
        "_type" : "doc",
        "_id" : "JIwlKnQB0I9nZsO-jYT1",
        "_score" : 1.0,
        "_source" : {
          "Name" : "Minh Nguyễn Hữu",
          "Address" : "Trần Phú hà nội",
          "Age" : 25
        }
      },
      {
        "_index" : "person",
        "_type" : "doc",
        "_id" : "J4wlKnQB0I9nZsO-qYTB",
        "_score" : 1.0,
        "_source" : {
          "Name" : "Minh Nguyễn Hữu",
          "Address" : "Trần Phú hà nội",
          "Age" : 25
        }
      },
      {
        "_index" : "person",
        "_type" : "doc",
        "_id" : "2YwsKnQB0I9nZsO--oRo",
        "_score" : 1.0,
        "_source" : {
          "Name" : "Minh Đặng Hữu",
          "Address" : "Trần Cung hà nội",
          "Age" : 22
        }
      }
    ]
  }
}
```
Có thể thấy mỗi bản ghi trả về sẽ có điểm số thể hiện ở trường _score, với trường này ta có thể thấy độ khớp của kết quả với điều kiện tìm kiếm. Ở trường hợp lấy tất cả, _score đề bằng 1.

Câu lệnh tìm kiếm 1 trường

```
GET /person/_search
{
    "query": {
        "match": {
          "Name": "minh đặng"
        }
    }
}
```

```Json
{
  "took" : 2,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 3,
      "relation" : "eq"
    },
    "max_score" : 1.1143606,
    "hits" : [
      {
        "_index" : "person",
        "_type" : "doc",
        "_id" : "2YwsKnQB0I9nZsO--oRo",
        "_score" : 1.1143606,
        "_source" : {
          "Name" : "Minh Đặng Hữu",
          "Address" : "Trần Cung hà nội",
          "Age" : 22
        }
      },
      {
        "_index" : "person",
        "_type" : "doc",
        "_id" : "JIwlKnQB0I9nZsO-jYT1",
        "_score" : 0.13353139,
        "_source" : {
          "Name" : "Minh Nguyễn Hữu",
          "Address" : "Trần Phú hà nội",
          "Age" : 25
        }
      },
      {
        "_index" : "person",
        "_type" : "doc",
        "_id" : "J4wlKnQB0I9nZsO-qYTB",
        "_score" : 0.13353139,
        "_source" : {
          "Name" : "Minh Nguyễn Hữu",
          "Address" : "Trần Phú hà nội",
          "Age" : 25
        }
      }
    ]
  }
}
```

Với trường hợp này, ta có thể thấy rõ, bản ghi đầu tiên có điểm số cao nhất (do trùng 2 từ với điều kiện tìm kiếm, so với 2 bản ghi bên dưới chỉ là 1). Tuy nhiên nguyên tắc chấm điểm còn dựa vào nhiều yếu tố khác nữa mà chúng ta sẽ tìm hiểu ở phần sau của bài viết này.

## Kết
Vậy là chúng ta đã học được cách cài đặt Elastic Search trên môi trường development và một vài câu lệnh truy vấn cơ bản thông qua Devtool. Kì sau, chúng ta sẽ tìm hiểu cách tích hợp thư viện NEST (Một thư viện giúp dễ dàng truy cập Elastic Search từ C#)  vào project ASP .NET Core.