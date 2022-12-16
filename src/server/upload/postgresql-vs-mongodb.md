Bài viết được dịch từ nguồn: https://hackernoon.com/https-medium-com-cn007b-postgresql-vs-mongodb-6d8bdb7c1697

Chủ đề này không phải là mới và bạn có thể tìm thấy nhiều `benchmarks` liên quan đến hiệu suất của các cơ sở dữ liệu này. Nhưng tôi không tìm thấy bất kỳ thông tin kỹ thuật nào về `benchmarks` (cái gì, ở đâu, như thế nào, bao nhiêu, cái gì đã được sử dụng, v.v.) cũng không có thông tin về các `version` cơ sở dữ liệu (không phải mọi bài viết mà tôi tìm thấy đều cung cấp thông tin này) có lẽ một cái gì đó đã thay đổi, có thể một số DB hoạt động tốt hơn, và có lẽ trường hợp của tôi hơi khác so với các trường hợp được xem xét trong các bài viết khác, vì vậy tôi chuẩn bị các cơ sở dữ liệu này!

Trong microservice của tôi, tôi cần lưu trữ 2 `entities` (lưu trữ và tập tin) với mối quan hệ 1 nhiều (trường hợp đơn giản).
Nó sẽ là 2 bảng trong postgres:

```
# table storage

 id |                   sha1                   | count
----+------------------------------------------+-------
 17 | dc9793d8f2379b73c4932d33a14c75eefa849fda |    64
 
# table file

 id  | storage_id |         name
-----+------------+-----------------------
 113 |         17 | OdioCondimentumId.avi
 114 |         17 | Venenatis.png
```


Và trong mongo sẽ là:

```
{
  "_id": 17,
  "sha1": "dc9793d8f2379b73c4932d33a14c75eefa849fda",
  "count": 64,
  "files": [
    {
      "id": 1,
      "name": "OdioCondimentumId.avi"
    },
    {
      "id": 2,
      "name": "Venenatis.png"
    }
  ]
}

```

Không có gì đặc biệt cho cả, nhưng điều thú vị - đó là cách lấy dữ liệu. Giả sử chúng ta cần lấy thông tin như thế này:

```
396, 4d509b2bc497b54455aac7e4863ce7dac3e1c898, NonMattis.avi
396, 4d509b2bc497b54455aac7e4863ce7dac3e1c898, VenenatisTurpis.xls
395, 65864917b1548aa1b4520a5a40511dc4e4e4af12, AmetErosSuspendisse.tiff
395, 65864917b1548aa1b4520a5a40511dc4e4e4af12, PlateaDictumst.gif
394, b738398a474808da2a9c9c0e00abecabba22acd4, AFeugiatEt.xls
394, b738398a474808da2a9c9c0e00abecabba22acd4, Amet.mp3
394, b738398a474808da2a9c9c0e00abecabba22acd4, At.avi
394, b738398a474808da2a9c9c0e00abecabba22acd4, AtVelit.png
394, b738398a474808da2a9c9c0e00abecabba22acd4, CondimentumId.xls
394, b738398a474808da2a9c9c0e00abecabba22acd4, ConsequatVariusInteger.xls
```

Và để nhận được thông tin chính xác này từ cả hai cơ sở dữ liệu, chúng ta phải chạy truy vấn SQL trong postgres:

```
SELECT s.id, s.sha1, f.name
FROM storage s
JOIN file f ON s.id = f.storage_id
WHERE s.count > 0
ORDER by id DESC, name ASC
OFFSET 1000 LIMIT 10
```

Và query trong `mongo`:

```
db.file_storage.aggregate([
    {$match: {"count": {$gt: 0}}},
    {$unwind: "$files"},
    {$project: {_id: 1, sha1: 1, "name": "$files.name"}},
    {$sort: {_id: -1, "name": 1}},
    {$skip : 1000},
    {$limit : 10},
])
```

Thật không công bằng khi so sánh các postgres join so với mongo đơn giản, bởi vì mongo đã có tất cả thông tin (như dữ liệu lồng nhau) nhưng postgres phải truy vấn thông qua bảng liên quan… Nhưng với truy vấn của chúng ta sẽ thú vị hơn !!!

Mỗi cơ sở dữ liệu phải thực hiện các hành động gần như giống nhau: để tìm dữ liệu theo non-indexed, để sắp xếp theo id và tên, thực hiện offset, limit và postgres phải thực hiện join trong khi mongo phải thực hiện đơn giản hơn nhiều.

## Benchmarking:

Tất cả các thông tin kỹ thuật về Docker, PostgreSQL, MongoDB, GOlang, data-dump, nhập dữ liệu và vv và bạn có thể tìm thấy trong repo github.
Hãy xem, và kiểm tra tất cả các bước hoặc thậm chí thực hiện `benchmark` này trên máy tính của bạn, hoặc chỉ xem xét triển khai GOlang cho postgres và mongo.

## Result:

Kết quả máy tính trông giống như:

```
+-------------+-------------------+--------------------+
| Benchmark # | PostgreSQL        | MongoDB            |
+-------------+-------------------+--------------------+
| query 1     | 8349 microseconds | 21721 microseconds |
+-------------+-------------------+--------------------+

```

## Changed

Nhập vào cơ sở dữ liệu 2500 entries dưới dạng dữ liệu lưu trữ và 24705 mục dưới dạng dữ liệu tệp (là 500 và 4924).

Đã thêm nhiều truy vấn hơn, trong `benchmark` này.

Vẫn dùng query tương ứng với postgreSQL và mongo như phần đầu và kết quả là:

```
+-------------+--------------------+--------------------+
| Benchmark # | PostgreSQL 10.5    | MongoDB 4.0.1      |
+-------------+--------------------+--------------------+
| v1.query1   | 34137 microseconds | 52020 microseconds |
| v1.query2   | 20691 microseconds | 14950 microseconds |
| v1.query3   | 15952 microseconds | 14410 microseconds |
| v1.query4   | 18025 microseconds | 15389 microseconds |
+-------------+--------------------+--------------------+
| v2.query1   | 33596 microseconds | 43352 microseconds |
| v2.query2   | 20072 microseconds |  1711 microseconds |
| v2.query3   | 14750 microseconds |   573 microseconds |
| v2.query4   | 17727 microseconds |  1678 microseconds |
+-------------+--------------------+--------------------+
```

Tôi đã bỏ qua nhiều `benchmark` từ bảng này bởi vì trong các truy vấn đơn giản, mongo nhanh hơn so với postgres.

Chỉ trong query1 postgres hoạt động nhanh hơn so với mongo (vì $unwind) còn tất cả các truy vấn khác mongo hoạt động nhanh hơn so với postgres.

## Conclusion:

Đó chỉ là trường hợp cụ thể của tôi, chỉ truy vấn của tôi, chỉ đọc hoạt động và kết quả của tôi trên máy tính của tôi ... Đối với trường hợp của bạn, bạn phải kiểm tra truy vấn của bạn, bộ dữ liệu của bạn, vv

Cảm ơn và hi vọng bài viết giúp ích cho công việc của bạn.