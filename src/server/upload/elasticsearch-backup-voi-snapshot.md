Để giúp bảo vệ việc mất dữ liệu, Elasticsearch cung cấp các tính năng khác nhau cho phép chúng ta thực hiện backup dữ liệu ngay cả trong trường hợp dữ liệu bị lỗi.
Trong bài hướng dẫn này

## ElasticSearch snapshot là gì
ElasticSearch snapshot là một bản sao dự phòng của một cluster Elasticsearch đang chạy. Snapshot này có thể là toàn bộ cluster hoặc các index và luồng dữ liệu cụ thể trong một cluster cụ thể.
Trước khi đi sâu vào việc tạo snapshot, chúng ta sẽ cần tạo một Repository với mục đích lưu trữ snapshot vì nhiều dịch vụ của Elasticsearch sử dụng API snapshot để thực hiện các tác vụ này.
Một số tác vụ đó bao gồm:
* Put snapshot repository
* Verify snapshot repository
* Get snapshot repository
* Delete snapshot repository
* Clean up snapshot repository
* Create snapshot
* Clone snapshot
* Get snapshot
* Get snapshot status
* Restore snapshot
* Delete snapshot

Để tạo một snapshot repository, chúng ta sử dụng endpoint API là `_snapshot` +  tên mà chúng ta muốn đặt. Ví dụ dưới đây mình sẽ tạo 1 snapshot repository có tên là `backup_repo`
```
PUT /_snapshot/backup_repo
{
  "type": "fs",
  "settings": {
    "location": "/home/root/backups",
    "compress": true
  }
}
```

Và để xem là snapshot repository đã tạo thành công hay chưa chúng ta có thể làm như thế này:
```
GET /_snapshot/backup_repo
```

Hoặc để xem tất cả các snapshot repository đang có chúng ta có thể sử dụng endpoind là  `_snapshot` :
```
GET /_snapshot
```

## Tạo Elasticsearch Snapshot
Để tạo một  snapshot cho một snapshot repository cụ thể được xử lý bởi API snapshot chúng ta sẽ phải chỉ định tên của snapshot repository `backup_repo` và tên của snapshot `snapshot_1`.
```
PUT /_snapshot/backup_repo/snapshot_1
```

Nếu tạo thành công Elasticsearch sẽ trả về 1 response thế này
```
{
  "accept": true
}
```
Với cách trên vì nó không chỉ định luồng dữ liệu mà chúng ta muốn sao lưu, nên nó sẽ sao lưu tất cả dữ liệu và trạng thái cluster. Để chỉ định luồng dữ liệu và chỉ số nào cần sao lưu, chúng ta sẽ  thêm vào như sau:
Giả sử chúng ta thực hiện sao lưu chỉ mục `.kibana`
```
PUT /_snapshot/backup_repo/snapshot_2?wait_for_completion=true
{
  "indices": ".kibana",
  "ignore_unavailable": true,
  "include_global_state": false,
  "metadata": {
    "taken_by": "elasticadmin",
    “taken_because”: “Backup 1”
  }
}
```

Tham số  `include_global_state` lưu trạng thái hiện tại của  cluster nếu thiết lập là `true`. Một số thông tin cluster được lưu bao gồm(chúng ta có thể chỉ định nhiều hơn 5 thông tin dưới đây):
* Persistent cluster settings
* Index templates
* Legacy index templates
* Ingest pipelines
* ILM lifecycle policies

## Cách xem snapshot.
Để xem chi tiết về `snapshot_2` được tạo ở trên chúng ta làm như sau:
```
GET /_snapshot/backup_repo/snapshot_2
```
Thông tin chi tiết về `snapshot_2` sẽ được trả về như sau:
```
{
  "snapshots" : [
    {
      "snapshot" : "snapshot_2",
      "uuid" : "tQUHyofIRnGMMtw0AGBACQ",
      "version_id" : 7100299,
      "version" : "7.10.2",
      "indices" : [
        ".kibana_1"
      ],
      "data_streams" : [ ],
      "include_global_state" : false,
      "metadata" : {
        "taken_by" : "elasticadmin",
        “taken_because”: “Backup 1”
      },
      "state" : "SUCCESS",
      "start_time" : "2021-01-19T13:36:59.615Z",
      "start_time_in_millis" : 1611063419615,
      "end_time" : "2021-01-19T13:37:00.433Z",
      "end_time_in_millis" : 1611063420433,
      "duration_in_millis" : 818,
      "failures" : [ ],
      "shards" : {
        "total" : 1,
        "failed" : 0,
        "successful" : 1
      }
    }
  ]
}
```

Trường hợp chúng ta muốn xem tất cả các snapshot trong 1 repository cụ thể chúng ta sẽ thêm dấu `*` như thế này:
```
GET /_snapshot/backup_repo/*
```
Kết quả chúng ta nhận được sẽ kiểu như thế này:
```
{
  "snapshots" : [
    {
      "snapshot" : "snapshot_1",
      "uuid" : "7CFigHzvRtyZW07c60d2iw",
      "version_id" : 7100299,
      "version" : "7.10.2",
      "indices" : [
        "my_index",
        "single_index_with_body",
        "my_index_2",
        "single_index",
        ".kibana_1",
        “test”
      ],
      "data_streams" : [ ],
      "include_global_state" : true,
      "state" : "SUCCESS",
      "start_time" : "2021-01-19T13:28:48.172Z",
      "start_time_in_millis" : 1611062928172,
      "end_time" : "2021-01-19T13:28:50.831Z",
      "end_time_in_millis" : 1611062930831,
      "duration_in_millis" : 2659,
      "failures" : [ ],
      "shards" : {
        "total" : 7,
        "failed" : 0,
        "successful" : 7
      }
    },
    {
      "snapshot" : "snapshot_2",
      "uuid" : "tQUHyofIRnGMMtw0AGBACQ",
      "version_id" : 7100299,
      "version" : "7.10.2",
      "indices" : [
        ".kibana_1"
      ],
      "data_streams" : [ ],
      "include_global_state" : false,
      "metadata" : {
        "taken_by" : "elasticadmin",
        “taken_because”: “Backup 1”
      },
      "state" : "SUCCESS",
      "start_time" : "2021-01-19T13:36:59.615Z",
      "start_time_in_millis" : 1611063419615,
      "end_time" : "2021-01-19T13:37:00.433Z",
      "end_time_in_millis" : 1611063420433,
      "duration_in_millis" : 818,
      "failures" : [ ],
      "shards" : {
        "total" : 1,
        "failed" : 0,
        "successful" : 1
      }
    }
  ]
}
```

## Cách xoá snapshot
Xóa snapshot rất đơn giản chúng ta chỉ cần sử dụng phương thức `DELETE` là được:
```
DELETE /_snapshot/backup_repo/snapshot_1
```

Và response chúng ta nhận được sẽ như sau:
```
{
  “acknowledged”: true
}
```

## Kết luận
Trong hướng dẫn này, mình đã nói về cách tạo snapshot elasticsearch bằng API snapshot. Những gì chúng ta đã làm là tạo một snapshot repository, xem các snapshot repository, tạo, xem và xóa snapshot. Mặc dù có những tùy chỉnh bạn có thể thực hiện với API, nhưng kiến thức trong hướng dẫn này sẽ đủ để bạn bắt đầu.

## Than khảo
https://linuxhint.com/restore-elasticsearch-clusters-snapshots/