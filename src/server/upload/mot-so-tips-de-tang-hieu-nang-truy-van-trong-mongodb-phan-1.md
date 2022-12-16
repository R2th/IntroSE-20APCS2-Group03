## Giới thiệu
MongoDB là một trong những cơ sở dữ liệu mã nguồn mở NoSQL phổ biến nhất được biết bằng C++. MongoDB cung cấp giải pháp truy vấn với hàng triệu dữ liệu cho kết quả nhanh và hiệu quả hơn so với MySQL nhưng trong quá trình làm việc, chúng ta không thể tránh khỏi vấn đề với hiệu suất của câu query, nó có thể khiến việc truy vấn trở nên khó khăn hơn. Hy vọng bài viết này sẽ cung cấp cho bạn những tips hiệu quả khi sử dụng MongoDB.
### 1. Kiểm tra Log MongoDB 

Mặc định, MongoDB ghi lại tất cả các truy vấn mất hơn 100 mili giây. Với Ubuntu file log sẽ được lưu ở path: 
`/var/log/mongodb/mongod.log`

File log có thể rất lớn, vì vậy bạn có thể muốn xóa nó trước khi kiểm tra. Đầu tiên, đừng quên khởi động MongoDB:

```go
$ sudo service mongod start
```

Truy cập vào mongo command-line:

```shell
$ sudo mongo
```

Khi bạn đã truy cập đc vào màn hình mongo command-line hãy sử dụng lệnh:

```javascript
use admin;
db.runCommand({ logRotate : 1 });
```

FIle log mới sẽ được bắt đầu và dữ liệu cũ sẽ có sẵn trong một tệp có tên ngày và thời gian sao lưu. Bạn có thể xóa bản sao lưu hoặc di chuyển nó đi nơi khác để phân tích thêm.

Chúng ta có thể theo dõi log trong khi người dùng truy cập hệ thống

```shell
$ sudo tail -f /var/log/mongodb/mongod.log
```

Chúng ta có thể tùy chỉnh cấu hình [mức độ chi tiết](https://docs.mongodb.com/manual/reference/method/db.setLogLevel/) của file log hoặc sửa đổi  [các tham số định hình](https://docs.mongodb.com/manual/reference/method/db.setProfilingLevel/) và thay đổi thời gian bắt đầu ghi log ngoài 100 mili giây. Ban đầu, bạn có thể đặt nó thành một giây để bắt các truy vấn vượt quá quy định này, sau đó giảm một nửa sau mỗi lần sửa thành công.

Xem các dòng có chứa 'COMMAND' với thời gian thực hiện tính bằng mili giây ở cuối. Ví dụ:
```go
2016-02-12T11:05:08.161+0000 I COMMAND  
    [conn563] command project.$cmd 
    command: count { 
        count: "test", 
        query: { published: { $ne: false }, 
        country: "uk" } 
    } 
    planSummary: IXSCAN { country: 1 } 
    keyUpdates:0 
    writeConflicts:0 
    numYields:31 
    reslen:44 
    locks: { 
        Global: { 
            acquireCount: { r: 64 } 
        }, 
        MMAPV1Journal: { 
            acquireCount: { r: 32 } 
        }, 
        Database: { 
            acquireCount: { r: 32 } 
        }, 
        Collection: { 
            acquireCount: { R: 32 } 
        } 
    } 403ms
```
Điều này sẽ giúp bạn xác định điểm có khả năng gây tắc nghẽn.

### 2. Phân tích câu query
Giống như nhiều cơ sở dữ liệu, MongoDB cung cấp một [explain facility](https://docs.mongodb.com/manual/tutorial/analyze-query-plan/) cho thấy cách thức hoạt động của cơ sở dữ liệu. Bạn có thể thêm **explain('executionStats')** vào một truy vấn. Ví dụ:

```javascript
db.user.find(
  { country: 'AU', city: 'Melbourne' }
).explain('executionStats');
```

hoặc:

```javascript
db.user.explain('executionStats').find(
  { country: 'AU', city: 'Melbourne' }
);
```

Điều này cung cấp cho chúng ta 1 kết quả dưới dạng JSON, có hai giá trị chính cần kiểm tra:

* **executionStats.nReturned** — số lượng documents được trả về
* **executionStats.totalDocsExamined** — số lượng documents được quét để tìm kết quả.

Nếu số lượng documents được kiểm tra vượt quá số lượng được trả về, truy vấn có thể không hiệu quả. Trong trường hợp xấu nhất, MongoDB có thể phải quét mọi tài liệu trong collections. Do đó, truy vấn sẽ được hưởng lợi từ việc sử dụng một chỉ mục index.

### 3. Đánh index phù hợp
NoSQL database cung cấp việc đánh index giống như SQL thông dụng. Một chỉ mục index được xây dựng từ một tập hợp một hoặc nhiều fields để truy vấn nhanh hơn. Ví dụ: bạn có thể lập chỉ mục cho trường **country** trong collection **user**. Khi truy vấn để tìm kiếm 'AU', MongoDB có thể tìm thấy nó trong chỉ mục và tham chiếu tất cả các tài liệu phù hợp mà không phải quét toàn bộ collection **user**.

Các chỉ mục được tạo với **createIndex**. 

```javascript
db.user.createIndex({ country: 1 });
```

Hầu hết các chỉ mục index của chúng ta có thể là các trường đơn lẻ, nhưng bạn cũng có thể tạo các chỉ mục ghép trên hai hoặc nhiều trường. Ví dụ:

```javascript
db.user.createIndex({ country: 1, city: 1 });
```

Có nhiều options cho việc đánh index, vì vậy bạn hãy tham khảo thêm[ tại đây ](https://docs.mongodb.com/manual/indexes/)

**Còn tiếp...**