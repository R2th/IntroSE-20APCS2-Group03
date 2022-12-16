Có khá nhiều bài viết trên mạng giải thích Redis là gì, tại sao lại sử dụng redis với sidekiq, hay so sánh redis với những NoSQL Database khác như MongoDB, bạn có thể tự tìm hiểu.
Nhưng nếu vẫn còn chưa rõ những điều trên bạn có thể tham khảo bài viết này của bạn Hoang Quynh Anh [tại đây](https://viblo.asia/p/gioi-thieu-ve-sidekiq-va-mot-so-co-che-hoat-dong-Qbq5QW2GZD8). Bạn sẽ hiểu rõ được cơ chế hoạt động của Sidekiq như thế nào và tương tự Redis thực hiện những công việc gì, cách redis và sidekiq tương tác với nhau ...

Hôm nay ta sẽ tìm hiểu về Redis, cách kiểm tra các hoạt động được chạy bên trong redis để hiểu hơn vể service này

##  Infor

Để lấy được thông tin cũng như các thông số được config của Redis, đơn giản ta chỉ cần dùng command:

```bash
redis-cli info
```
Tất tần tật thông tin bạn cần biết đều hiển thị ra

```bash
# Server
redis_version:5.0.3
redis_git_sha1:00000000
redis_git_dirty:0
...

# Clients
connected_clients:4
client_recent_max_input_buffer:2
client_recent_max_output_buffer:0
blocked_clients:0

# Memory
used_memory:3062760
used_memory_human:2.92M
used_memory_rss:8335360
...


# Persistence
loading:0
rdb_changes_since_last_save:0
rdb_bgsave_in_progress:0
rdb_last_save_time:1590379694
...

# Stats
total_connections_received:10
total_commands_processed:326
instantaneous_ops_per_sec:0
total_net_input_bytes:139041
total_net_output_bytes:764887
instantaneous_input_kbps:0.00
...

# Replication
role:master
connected_slaves:0
master_replid:79b4e8b1f5614eeb97a4fe9af43accbb7af03e09
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
...

# CPU
used_cpu_sys:4.323781
used_cpu_user:5.257128
used_cpu_sys_children:0.006584
used_cpu_user_children:0.029913

# Cluster
cluster_enabled:0

# Keyspace
db0:keys=269,expires=123,avg_ttl=139247745329
```

Rất nhiều thông tin nhưng bạn nên chú ý đến một vài thông số sau:
1. `config_file` chính là thư mục chứa file config của Redis
2. `connected_clients`  là những `network client connections` hiện tại mà Redis đang kết nối. Thông số này có thể nên tới hàng trăm thậm trí là hàng ngàn.
3. `used_memory_*` là thông số RAM của Redis

Memory là thông tin quan trọng nhất của redis bạn cần nắm rõ. Nếu DB của bạn vượt quá mức RAM của redis thì `performance` của bạn sẽ trở nên rất tệ đấy, và cả độ trễ giữa các lần request nữa - thật kinh khủng khi độ trễ lại tăng cao phải không nhỉ

Để kiểm tra được điều đó, bạn có thể run command sau
```bash
root@010db9a26d7e:/data# redis-cli --stat
------- data ------ --------------------- load -------------------- - child -
keys       mem      clients blocked requests            connections          
268        2.86M    1       0       2 (+0)              2           
268        2.86M    1       0       3 (+1)              2           
268        2.86M    1       0       4 (+1)              2           
268        2.86M    1       0       5 (+1)              2           
```
Show các thông số quan trọng trong thời gian thực (real-time)


Bạn có thấy `command` nào cũng có redis-cli không, nó là gì nhỉ?

#### Redis-cli
- Viết tắt của cụm Redis - command line interface. Nôm na là 1 cửa sổ dòng lệnh cho phép người dùng tương tác vs server redis bằng dòng lệnh
- Sức mạnh của các dòng lệnh là vô tận :v, và bạn chỉ cần `--help` là có rất nhiều `options` cho bạn chọn, thật đơn giản phải không :3 

## Look out for Latency
- Latency là độ trễ giữa các request và response
- Ảnh hưởng của thông số `latency` có thể dẫn đến các lỗi `timeout` trong ứng dụn của bạn.
1. Network: bị tắc nghẽn giữa client và Redis servcer
2. Internal: Bản thân Redis đã có những `commands` chạy ngầm khiến cho thông số `latency` tăng đáng kể

Để nắm được thông số `lantency` ta run
```bash
$ redis-cli --latency
min: 0, max: 1, avg: 0.18 (1667 samples)

$ redis-cli --latency-history
min: 0, max: 7, avg: 0.24 (1321 samples) -- 15.00 seconds range
min: 0, max: 256, avg: 0.55 (1280 samples) -- 15.01 seconds range
min: 0, max: 3062, avg: 3.86 (1051 samples) -- 15.98 seconds range
min: 0, max: 490, avg: 0.69 (1255 samples) -- 15.01 seconds range
```

Khi chỉ số `max` tăng đột biến như vậy đồng nghĩ với việc chỉ số `latency` đang tăng, ở đây ta có suggest là sư dụng command `redis-cli debug sleep 0.5` dừng server trong vòng 0.5s (not recommended in prod :) )

## Slow Commands

Bên trên ta chỉ show được `avg` giữa client vs Redis, vậy các `commands` chạy ẩn của redis thì sao ? How ?
```bash
$ redis-cli slowlog get 10
1) 1) (integer) 3
   2) (integer) 1492461257
   3) (integer) 11825
   4)  1) "LPUSH"
       2) "queue:default"
       3) "{\"queue\":\"default\",\"jid\":\"df55c4e27c48e63f0d5212b4\",\"class\":\"LoadWorker\",\"args\":[0],\"created_at\":1492461257.208411,\"enqueued_at\"... (33 more bytes)"
       4) "{\"queue\":\"default\",\"jid\":\"4989e31cea7ecf78e93b7f9f\",\"class\":\"LoadWorker\",\"args\":[1],\"created_at\":1492461257.2084169,\"enqueued_at... (34 more bytes)"
      [snip]
      32) "... (9971 more arguments)"
```

3 là id của job, còn 1492461257 là timestamp khi job được thực thi, `11825` là thời gian thực thi job đó :3, và cuối cũng đó là `arguments` của job

Hiểu được các cách sử dụng command và cách truy cập nhanh vào data(redis) là cách nhanh nhất để bạn `motoring redis`.

Hy vọng vài viết sẽ giúp ích được cho bạn.

Tham khảo #https://www.mikeperham.com/

Phần sau mình sẽ đi tìm hiểu cách quản lý các phần của sidekiq mà trên giao diện của nó không thể :). cùng đóng chờ nhé