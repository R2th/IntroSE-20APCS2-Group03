**Chúng ta sẽ tìm hiểu về hai loại task phổ biến trong GCD là synchronous và asynchronous**
### Synchronous
**Synchronous**: sẽ trả về chỉ sau khi task được hoàn thành. Có nghĩa là khả năng block thread hiện tại nếu sử dụng để thực thi một task tốn nhiều thời gian (request APIs, download media content,…)
### Asynchronous
**Asynchronous**: sẽ trả về ngay lập tức mà không cần phải chờ. Dễ hiểu hơn là nó sẽ add task vào queue vào tiếp tục thực hiện các công việc khác mà không gây block.
### Ví dụ:
```
print("Exe 1") 
synchronous {
   wait(10)
   print("Exe 2")
}
print("Exe 3")
```
Với đoạn code trên thì output sẽ là:
```
Exe 1
Exe 2
Exe 3
```

Trường hợp asynchronous
```
print("Exe 1") 
asynchronous {
   wait(10)
   print("Exe 2")
}
print("Exe 3")
```
Output sẽ là:
```
Exe 1
Exe 3
Exe 2
```

Nói tóm lại nếu đang chạy một đoạn code nào đó nó sẽ bị đứng lại ở sync và chỉ tiếp tục chạy khi sync return , còn với async thì ngược lại, đoạn code đó sẽ tiếp tục chạy.
## Một số API thường dùng của GCD
* dispatch_after : delay task một khoảng thời gian trước khi thêm vào queue. Hoạt động như một delayed dispatch_async
* dispatch_once : thực thi block 1 lần duy nhất trong cả quá trình chạy của ứng dụng.
* dispatch barrier api : đảm bảo rằng task khi submit vào queue thì chỉ có chính nó là đang thực thi trong queue. Các tasks được submit trước đó đã được hoàn thành hết trước khi task của barrier được thực thi, và trong lúc task này thực thi thì các task khác sẽ phải chờ cho đến khi task của barrier hoàn thành và queue sẽ trở lại trạng thái ban đầu là sử lý concurrency.
* dispatch_sync : submit task và block sẽ return khi task đc hoàn thành. Block main thread.
* ispatch_queue_create : tạo ra một custom queue với 2 tham số đầu vào, arg1 là tên của queue thường được viết theo DNS style naming convention, arg2 là loại queue : 0 hoặc NULL nếu tạo serial queue và DISPATCH_QUEUE_CONCURRENT nếu tạo concurrent queue.
* dispatch group API : sẽ thông báo khi tất cả các task của group được hoàn thành. Các tasks có thể là async hoặc sync và có thể track từ các queues khác nhau.
* dispatch_apply : hoạt động như một loop, nhưng các lần lặp được thực thi đồng thời. dispatch_apply là sync func. Có 3 tham số , 1st arg số iterations, 2nd arg queue thực thi các task, 3rd là block code. Độ hiệu quả của dispatch_apply phụ thuộc vào độ phức tạp trong mỗi iteration.
* dispatch_set_target_queue: điều chỉnh độ ưu tiên của custom queue.
* dispatch_suspend/dispatch_resume : suspend/resume thực thi của một queue.