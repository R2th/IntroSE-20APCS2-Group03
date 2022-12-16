References: [https://stackjava.com/elasticsearch](https://stackjava.com/elasticsearch)

## Một số api hay dùng trong Elasticsearch
Elasticsearch cung cấp rất nhiều API, việc cập nhật hay tạo document cũng có nhiều cách, trong bài này mình sẽ hướng dẫn những api đơn giản nhất.

Chi tiết các tham số, ví dụ thì các bạn tham khảo các link dưới đây.
1. [API hiển thị thông tin node, cluster, version trong Elasticsearch](https://stackjava.com/elasticsearch/api-hien-thi-thong-tin-node-cluster-version-trong-elasticsearch.html)
2. [API liệt kê, hiển thị các Index trong Elasticsearch](https://stackjava.com/elasticsearch/api-liet-ke-hien-thi-cac-index-trong-elasticsearch.html)
3. [API tạo Index trong Elasticsearch.](https://stackjava.com/elasticsearch/api-tao-index-trong-elasticsearch-huong-dan-tao-index-elasticsearch.html)
4. [API xóa Index trong Elasticsearch](https://stackjava.com/elasticsearch/api-xoa-index-trong-elasticsearch-huong-dan-xoa-index-elasticsearch.html)
5. [API liệt kê, hiển thị các Type, Mapping trong Elasticsearch](https://stackjava.com/elasticsearch/api-liet-ke-hien-thi-cac-type-mapping-trong-elasticsearch.html)
6. [API tạo dữ liệu – Insert, thêm dữ liệu vào Elasticsearch](https://stackjava.com/elasticsearch/api-tao-du-lieu-insert-them-du-lieu-vao-elasticsearch.html)
7. [API Lấy document theo Id, Select document Elasticsearch](https://stackjava.com/elasticsearch/api-lay-document-theo-id-select-document-elasticsearch.html)
8. [API đọc dữ liệu – Tìm kiếm dữ liệu, document Elasticsearch](https://stackjava.com/elasticsearch/api-doc-du-lieu-tim-kiem-du-lieu-document-elasticsearch.html)
9. [API cập nhật dữ liệu – Update document Elasticsearch](https://stackjava.com/elasticsearch/api-cap-nhat-du-lieu-update-document-elasticsearch.html)
10. [API xóa dữ liệu – Delete document Elasticsearch](https://stackjava.com/elasticsearch/api-xoa-du-lieu-delete-document-trong-elasticsearch.html)
11. [Truy vấn document – dữ liệu Elasticsearch với công cụ Elasticsearch Head.](https://stackjava.com/elasticsearch/truy-van-document-du-lieu-elasticsearch-voi-elasticsearch-head.html)

## Insert, tạo document trong Elasticsearch

**Cách 1: dùng method POST**
```
POST /index_name/type_name/id
{
   "field" : "value"
}
```

Trong đó:
* index_name và type_name là tên của Index và tên của Type, nếu chưa tồn tại thì sẽ được tự động tạo
* id là id của document được tạo, nếu không truyền id thì nó sẽ tự động tạo ra 1 chuỗi để làm id.


**Cách 2: dùng method PUT với tham số** 
```
PUT /index_name/type_name/id?op_type=create
{ ... }
```

Với cách 1, nếu document tương ứng với index_name, type_name và id đã tồn tại thì nó sẽ thực hiện update, còn với cách 2 thì nó sẽ báo lỗi.

## Xóa document trong Elasticsearch

**Cách 1: Sử dụng DELETE API**
```
DELETE /index_name/type_name/id

```

**Cách 2: Xóa document bằng Query API**

```
POST /index_name/type_name/_delete_by_query
{
  "query": { 
    "match": {
      "message": "some message"
    }
  }
}
```

Ví dụ xóa tất cả document có name = "sena" ở trong type customer của index stackjava
```
POST /stackjava/customer/_delete_by_query
{
  "query": { 
    "term": {
      "name": "sena"
    }
  }
}
```

## Update document trong Elasticsearch

**Cách 1: Modifiy document bằng method PUT**

```
PUT /index_name/type_name/id
{
  "field": "data"
}
```

**Cách 2: Update document bằng method POST**

```
POST /index_name/type_name/id
{
  "field": "data"
}
```

Với cách 1 nó sẽ sửa lại dữ liệu trên document đã có, với cách 2 thì nó sẽ xóa document hiện tại và tạo lại document với các thông tin mới.

## Find, Search document trong Elasitcsearch

**Cách 1: Lấy document theo id**

```
GET /index_name/type_name/id
```

**Cách 2: Tìm kiếm document theo các tham số với /_search**

Tìm tất cả document trong tất cả các index

`GET /_search`

Hoặc

`GET /_all/_search`

Tìm tất cả document trong 1 index

`GET /index_name/_search`

Tìm tất cả document trong 1 type

`GET /index_name/type_name/_search`


**Để search dữ liệu theo tham số đầu vào ta dùng biến q=tham_so**

Ví dụ tìm tất cả các document có chứa từ man

`GET /_search?q=man`

Okay, Done!
References:
**[https://stackjava.com/elasticsearch](https://stackjava.com/elasticsearch)**