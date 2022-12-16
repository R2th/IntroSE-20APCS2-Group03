# 1.Tổng quan về LevelDB
* LevelDB là một NoSQL và là một một thư viện lưu trữ dữ liệu theo dạng Key-Value được phát triển bởi Google.
* Không có một  mô hình dữ liệu quan hệ và nó không hỗ trợ các truy vấn SQL 
* Lưu trữ Keys - Value trong mảng byte tùy ý và dữ liệu được sắp xếp theo khóa. Nó hỗ trợ ghi hàng loạt, lặp lại và chuyển tiếp, và nén dữ liệu qua thư viện nén Snappy của Google. 
* Cung cấp một kho lưu trữ các giá trị Key-Value liên tục. 
* Các hàm cơ bản trong LevelDB như: Get(), Put(), Del(),  Batch()
* LevelDB hỗ trợ trên các nền tảng như C++, Python, Javascript

### 1.1.Kiến trúc của LevelDB

![](https://images.viblo.asia/78d1c929-388f-4222-ba25-4dd3989a79ec.png)
* Tất cả dữ liệu khi được đưa vào LevelDB sẽ được ghi thẳng vào Log và một “Memtable”. 
* Log này thường xuyên được ghi vào 1 file được gọi là sorted string table (SST) 
* Khi đọc thì dữ liệu được lấy ra từ Log và SST và được đưa vào phần Cache để giúp việc đọc dữ liệu nhanh hơn Cache được lưu trên Ram.
* Mỗi SST được giới hạn ~2MB do đó LevelDB có rất nhiều file SST.

### 1.2.Sorted String Table (Bảng chuỗi phân loại)
![](https://images.viblo.asia/4d184247-531d-4e30-87aa-ad2ddb394faf.png)
SSTables - Sorted String Table, tương tự như việc lưu Log ở trên, nối vào segment (phân đoạn), nhưng data trong mỗi segment được sắp xếp theo key (sorted by key).

*Cách lưu trữ này sẽ có các ưu điểm:*

* Quá trình hợp nhất diễn ra đơn giản và hiệu quả hơn. Do phân đoạn đã sắp xếp theo key, nên lúc hợp nhất chỉ cần đọc qua các segments theo thứ tự, copy key nhỏ nhất vào new segment. Nếu các key giống nhau thì chỉ lấy key mới nhất (segment mới nhất) và bỏ qua các key còn lạ.
* Index cho SStable sẽ không cần phải lưu toàn bộ key trong memory, thay vào đó chỉ cần lưu một vài key đánh dấu. 
* Có thể group các nhóm key-value lại thành một Khối và nén trước khi viết xuống disk, mỗi chỉ số index ở trên sẽ trỏ vào vị trí đầu tiên của mỗi khối nén này.



### 1.3.Dữ liệu trong LevelDB được lưu theo các level
![](https://images.viblo.asia/dc302a0d-877b-46c2-9fc0-7a3180a146f4.png)

![](https://images.viblo.asia/8e1f230b-c755-4018-960b-f86702b644f2.png)

* Log: tối đa là 4MB sau đó được ghi vào các file SST ở Level 0
* Level 0: tối data là 4 file SST sau đó 1 file SST được chuyuển vào Level 1
* Level 1: tổng kích thước là 10MB sau đó 1 file SST được chuyuển vào Level 2
* Level 2: tổng kích thước là 100MB sau đó 1 file SST được chuyuển vào Level 3
* Level 3+: cứ như vậy tổng kích thước của level này = level trước nó x 10 và sau đó 1 file được chuyển xuống level cao hơn. như vậy ta có

# 2.Đặc tính của LevelDB 

* Việc đọc tuần tự (hoặc traversal) của LevelDB là cực kỳ hiệu quả, và nó gần như gần với thứ tự đọc hệ thống tập tin. 
* Nó nhanh gấp nhiều lần so với cơ sở dữ liệu BTree (cây tìm kiếm tự cân bằng).
* Viết tuần tự, hiệu năng cao (không đồng bộ), bị giới hạn bởi tốc độ đĩa, ghi ngẫu nhiên, hiệu suất hơi kém, nhưng hiệu năng vẫn là một lợi thế lớn so với các DB khác. Cho dù viết tuần tự hay viết ngẫu nhiên, hiệu suất nhanh hơn nhiều so với BTree.
* Không hỗ trợ transaction, chỉ có thể truy vấn dữ liệu thông qua KEY, hỗ trợ hàng loạt đọc và ghi các hoạt động.
* Kích thước dữ liệu Key-Value trong LevelDB không thể quá lớn. Nếu lưu trữ một khóa hoặc giá trị lớn, nó sẽ có tác động lớn hơn đến hiệu suất đọc và ghi của LevelDB

# 3.Một số ứng dụng của LevelDB
* Bitcoin Core lưu trữ siêu dữ liệu blockchain bằng cách sử dụng cơ sở dữ liệu LevelDB 
* Là một thư viện của C++ được sử dụng trong nhiều ngữ cảnh. Ví dụ:  LevelDB có thể được trình duyệt web sử dụng để lưu trữ bộ nhớ Cache của các trang web đc truy cập gần đây
* LevelDB được sử dụng làm Back- end cho IndexedDB của Google Chrome và là một trong những phụ trợ được hỗ trợ cho Riak 
* LevelDB có liên quan đến CSDL nhúng
* Autodesk AutoCAD 2016 cũng sử dụng LevelDB 

# 4. Cài đặt LevelDB
* LevelDB bao gồm 2 phần : LevelUp và LevelDown
* LevelUp là những API ở phía trên do mình sử dụng
* LevelDown là memory ở bên dưới, LevelDown mặc định là lưu xuống ổ cứng sử dụng file
* Ngoài ra, LevelDown còn lưu toàn bộ database cho Ram
* LevelDB là một thư viện ko cần cài đặt, tốc độ nhanh được sử dụng thông qua C++, NodeJS, Python

   **Cài đặt trên Ubuntu** 
```
sudo apt-get install libsnappy-dev

wget https://leveldb.googlecode.com/files/leveldb-1.9.0.tar.gz
tar -xzf leveldb-1.9.0.tar.gz
cd leveldb-1.9.0
make
sudo mv libleveldb.* /usr/local/lib
cd include
sudo cp -R leveldb /usr/local/include
sudo ldconfig
```


# 5.Một số câu lệnh và hàm cơ bản
Put(key,value), Get(key), Delete(key)

* level()
* db.open()
* db.close()
* db.put()
* db.get()
* db.del()
* db.batch() (array form)
* db.batch() (chained form)
* db.isOpen()
* db.isClosed()
* db.createReadStream()
* db.createKeyStream()
* db.createValueStream()

Note: các bạn có thể xem chi tiết tại https://www.npmjs.com/package/level

# 6. So sánh hiệu năng của LevelDB và MySQL

**Bài toán đặt ra là insert 100 triệu bản ghi từ cùng bảng dữ liệu, lần lượt trên LevelDB và MySQL**

Giải quyết bài toán này trên LevelDB như sau:
```
var compressed = false // set to true on 2nd run
var level = require('level')
var db = level(compressed ? 'db.compressed' : 'db')

var max = 10*1000*1000
var ptr = 0
var batch = 5000

var name = compressed ? '1' : 'fdskfjdslkfhdsjlfhsdlkfsdlkfjwrsvjsbcxcv'
var val = '1'

var loop = function (err) {
  if (err) throw err
  if (ptr >= max) return console.log('Done. Run `du -sh db/`')

  console.log('Inserted %d rows into db', ptr)

  var ops = []
  for (var i = 0; i < batch; i++) {
    ops[i] = {type: 'put', key: name+'!'+(++ptr), value: val}
  }

  db.batch(ops, loop)
}

loop()
```

**Kết quả so sánh và kết luận**

![](https://images.viblo.asia/e57c707d-0a14-4167-8f57-dab20a54a55b.png)

![](https://images.viblo.asia/4dd85e61-5bf6-4f77-98be-1adc73a76396.png)

* Kết quả bài toán so sánh tốc độ thì LevelDB có tốc độ insert vượt trội MySQL
* Khi tạo một cơ sở dữ liệu hoàn toàn mới, các phương thức khác nhau cho thấy một loạt các tốc độ từ 0.4 MB / s đến 62.7 MB / s khi viết hiệu năng. Trong hiệu suất đọc của LevelDB dao động từ 152 MB/s đến 232 MB/s 
* Đối với hiệu suất chèn tuần tự, LevelDB có được thông lượng cao hơn / độ trễ thấp hơn tổng thể, mặc dù MySQL ổn định hơn. 
* Đối với cả độ trễ trung bình và hiệu suất cập nhật, MySQL và LevelDB thực hiện về cơ bản giống nhau. 

**Cảm ơn các bạn đã dành thời gian cho bài viết này. Xin hẹn gặp lại ^^!**

**Nguồn tham khảo:**

https://github.com/google/leveldb

https://gist.github.com/mafintosh/693319f4d357e49c5bb9

https://dzone.com/articles/performance-comparison-leveldb