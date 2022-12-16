## Giới thiệu
MongoDB là một cơ sở dữ liệu NoSQL được sử dụng nhiều trong các web app hiện đại. Nó lưu trữ dữ liệu dưới dạng JSON với lược đồ(schema) động, nghĩa là, không giống như cơ sở dữ liệu có quan hệ, MongoDB không bắt buộc định nghĩa schema trước khi thêm dữ liệu vào database. Chúng ta có thể thay đổi schema bất cứ lúc nào cần mà không cần tạo database mới.
Bài này sẽ hướng dẫn cách sử dụng MongoDB shell tương tác với mongodb ở máy local.
## Yêu cầu
* MongoDB đã được cài đặt ở máy của bạn. Nếu bạn chưa cài và bạn dùng Linux có thể tham khảo [ở đây](https://viblo.asia/p/cai-dat-va-su-dung-mongodb-tren-ubuntu-naQZRBkvZvx) hoặc download trực tiếp [ở đây](https://www.mongodb.com/try/download/community).

Triệu chứng xuất hiện khi cài thành công:

**Linux**

```
whereis mongod
```

```
whereis mongo
```

![mongod và mongo trong Linux](https://images.viblo.asia/e858eab7-6006-4ca4-af9f-795a958e1240.jpg)

**Window**

![mongod và mongo trong Window](https://images.viblo.asia/a862ee16-a7a5-4a99-bd2e-450400c3aea6.png)

Bàn một chút về hai file này nhé.

* mongod là viết tắt của "Mongo Daemon". mongod là một tiến trình nền được MongoDB sử dụng. Mục đích chính của mongod là quản lý tất cả các tác vụ của máy chủ MongoDB. Ví dụ: chấp nhận yêu cầu, phản hồi ứng dụng khách và quản lý bộ nhớ.

* mongo là command line shell có thể tương tác với máy khách (ví dụ: quản trị viên hệ thống và nhà phát triển).

## Khởi động MongoDB server và connect MongoDB database server

**Linux**

```
 sudo systemctl start mongod.service
```

![khởi động thành công mongo](https://images.viblo.asia/9336491e-638a-4823-98db-2d797f523cdd.png)

```
mongo
```
![mở mongodb shell](https://images.viblo.asia/dcfe99f3-ccdb-4001-9c9f-28157aba43f3.jpg)

**Window**

Trước tiên bạn cần tạo một vài thư mục trong ổ C của mình. Mở command prompt bên trong ổ C của bạn và thực hiện như sau:

*C:\> *
```
mkdir data
```
```
cd data
```
```
mkdir db
```

MongoDB yêu cầu một thư mục để lưu trữ tất cả dữ liệu. Đường dẫn thư mục dữ liệu mặc định của MongoDB nằm ở **/data/db** trên ổ đĩa. Do đó, chúng ta cần phải cung cấp những thư mục như vậy.

Nếu bạn khởi động MongoDB serve mà không có các thư mục đó, bạn có thể gặp lỗi sau:
![khởi động mongodb khi k có thư mục lưu dữ liệu](https://images.viblo.asia/d3bdfc38-5a55-4db3-82d5-ac3aa8d6a1b3.jpeg)

Sau khi tạo hai tệp đó, hãy chạy file thực thi **mongod** trong thư mục bin ban nãy (mở shell trong thư mục chứa file này):
```
mongod
```

Và chạy file thực thi **mongo** để khởi động MongoDB shell:
```
mongo
```
![mở mongodb shell](https://images.viblo.asia/a92a4b97-ef8c-4203-92f8-fffb93516634.jpeg)

Sau khi chạy lệnh này, hãy qua command promt đã chạy lệnh mongod. Thấy thông báo 'connection accepted' ở cuối. Nghĩa là quá trình cài đặt và cấu hình của chúng ta đã thành công!
## Sử dụng 

### List các db đang hiện có:

```
show dbs
```
![show databases](https://images.viblo.asia/f54b01ee-c0d1-4dc8-a497-61d1140ad406.jpg)

### Vào một cơ sở dữ liệu:

```
use <tên db>
```

### Tạo cơ sở dữ liệu:

Với RDBMS (Hệ thống quản lý cơ sở dữ liệu quan hệ) chúng ta có Database(Cơ sở dữ liệu), Table(Bảng), Row(Hàng) và Column(Cột).

Nhưng trong cơ sở dữ liệu NoSQL, chẳng hạn như MongoDB, dữ liệu được lưu trữ ở định dạng BSON (một phiên bản nhị phân của JSON). Chúng được lưu trữ trong các cấu trúc được gọi là Collection (bộ sưu tập).

Trong cơ sở dữ liệu SQL, chúng tương tự như Table:

![](https://images.viblo.asia/154a47ea-ef92-404d-85fb-4a9a88c38cb4.jpeg)

Tương quan giữa cái khái niệm trong SQL và MongoDB:

![](https://images.viblo.asia/491f9872-3b41-4558-9cac-400040b584e4.png)

Bây giờ hãy tạo một DB mới nào:

```
use <tên db>
```
Câu lệnh tạo csdl mới y chang như vào một csdl đã có. Nếu csdl chưa có trong list thì MongoDB server sẽ tạo mới sau đó điều hướng vào csdl đó luôn.
Sau khi tạo thành công, hãy thử show list databases xem nào!

Tadaaa!!!!! Bất ngờ chưa, csdl mới tạo k có trong danh sách?!
Điều này là bởi vì hiện tại trong db mới này chưa có dữ liệu, ngoài những db mặc định, db mới tạo thì chừng nào có dữ liệu nó mới hiện ra nhé.

### Tạo Collection

Có hai cách tạo collection:

* Cách thứ nhất là chèn dữ liệu vào collection:

```
db.myCollection.insert({"name": "john", "age" : 22, "location": "colombo"})
```

Điều này sẽ tạo collection *myCollection* cả khi collection này không tồn tại. Sau đó, nó sẽ chèn một **document**(tài liệu) với **field**(trường) name và age. Đây là những **non-capped collections**(bộ sưu tập không giới hạn).

* Cách thứ hai:

- Tạo một **non-capped collection**

```
db.createCollection("myCollection")
```

- Tạo một **capped collection**

```
db.createCollection("mySecondCollection", {capped : true, size : 2, max : 2})
```

Bằng cách này, bạn sẽ tạo một collection mà không cần chèn dữ liệu.

“capped collection(bộ sưu tập có giới hạn)” giới hạn số lượng documents tối đa để ngăn documents bị tràn.

Size 2: kích thước collection tối đa 2 megabyte
Max 2: số lượng document tối đa 2.

Bây giờ nếu bạn cố gắng chèn nhiều hơn 2 documents, bạn sẽ chỉ thấy các documents được chèn gần đây nhất. Hãy nhớ rằng điều này không có nghĩa là tài liệu đầu tiên đã bị xóa - nó chỉ không hiển thị.

### Chèn dữ liệu

Chúng ta có thể chèn *document* vào *collection* mới hoặc vào *collection* đã có.

Có ba phương pháp chèn document:

* **insertOne()** chèn một document duy nhất.

* **insertMany()** chèn nhiều hơn một document.

* **insert()** chèn bao nhiêu tùy thích.

![insertOne](https://images.viblo.asia/18737751-64fc-497a-8171-5e34928d2562.jpg)

![insertMany](https://images.viblo.asia/e30208c9-3799-40c5-a9ad-88e85cac650e.png)

**insert()** giống insertOne() nết có một document, giống insertMany() nếu chèn hơn 1 documents.

Ngoài ra, thuộc tính mới *location* được thêm vào *document*  John Doe. Nếu dùng *find* thì thuộc tính *location* chỉ xuất hiện trong *document* chứa John Doe.

Đây có thể là một lợi thế khi nói đến cơ sở dữ liệu NoSQL như MongoDB. Nó cho phép khả năng mở rộng **scalability**.

### Truy vấn dữ liệu

```
db.myCollection.find()
```

![](https://images.viblo.asia/4a29af0a-7524-47a4-b428-5d597e28d143.jpeg)

Chỉ cần thêm **.pretty()** vào cuối dữ liệu để xem dữ liệu dưới dạng JSON.

```
db.myCollection.find().pretty()
```

![](https://images.viblo.asia/34b2a1fa-c18b-482e-9056-3a8b8121e65a.jpeg)

Hmm, kéo lên xem tí, nãy chúng ta đã không insert field **_id** cơ mà nhỉ? 
*Đúng vậy, bất cứ khi nào insert một document, nếu bạn không set giá trị cho field _id (duy nhất và xác định), MongoDB sẽ tự động thêm một field _id xác định duy nhất mỗi document*. 

Nếu bạn không muốn nó hiển thị, chỉ cần chạy lệnh sau:

```
db.myCollection.find({}, _id: 0).pretty()
```

Tiếp theo, chúng ta sẽ lọc dữ liệu.

Giả sử tôi muốn lọc lấy những thằng document có *name = "john"*

```
db.myCollection.find(
  {
    name: "john"
  }
)
```

![image.png](https://images.viblo.asia/ee83d195-32ff-4126-bd66-2521e91e1756.png)

Giả sử tôi muốn lọc ra người có tuổi nhỏ hơn 25. Tôi sẽ sử dụng filter **$lt**

```
db.myCollection.find(
  {
    age : {$lt : 25}
  }
)
```

Tương tự:

* **$gt** : lớn hơn (greater than)
* **$lte**: nhỏ hơn hoặc bằng (less than or equal)
* **$gte**: lớn hơn hoặc bằng
* **$ne**: không bằng/khác (not equal)

### Cập nhật tài liệu

Giả sử bạn muốn cập nhật địa chỉ hoặc tuổi của ai đó, bạn có thể làm như thế nào? Vâng, hãy xem ví dụ tiếp theo:

```
db.myCollection.update({age : 20}, {$set: {age: 23}})
```

Đối số đầu tiên là field bạn muốn cập nhật. Ở đây, tôi chỉ định age cho đơn giản. Đối số thứ hai là giá trị cập nhật.

Trong trường hợp này, tôi đã update tất cả các document có age = 20 thành age = 23.

Cách update như vậy có vẻ rất mất kiểm soát vì chúng ta không chắc có bao nhiêu document có age 20 và document có age 20 đó có phải là document mà chúng ta muốn update hay không.

Thông thường, đầu tiên chúng ta cần **find()** document với filter mà chúng ta muốn, lấy **_id** của document trả về, sau đó mới **update()** document có *_id* đó.

```
db.myCollection.find(
  {
    name: "john"
  }
)
```

![image.png](https://images.viblo.asia/ee83d195-32ff-4126-bd66-2521e91e1756.png)

Tùy vào ngôn ngữ lập trình bạn sử dụng, chúng ta sẽ parse kết quả vào object, ví dụ tôi lưu kết quả vào biến *result*
```
db.myCollection.update({_id: result._id}, {$set: {age: 23}}
```

Nếu bạn cần xóa một thuộc tính khỏi một tài liệu, bạn có thể làm như sau (giả sử bạn muốn age biến mất):

```
db.myCollection.update({name: "navindu"}, {$unset: age})
```


### Xóa tài liệu

Như tôi đã đề cập trước đó, khi bạn cập nhật hoặc xóa một tài liệu, tất nhiên bạn là lập trình viên, bạn có thể chỉ định bất cứ field nào bạn muốn như name, age, location. Nhưng ở đây chúng tôi không làm thế, tôi chỉ định giá trị cho field *_id*,

```
db.myCollection.remove({_id: "58fdbf5c0ef8a50b4cdd9a84"})
```

### Xóa một bộ sưu tập

```
db.myCollection.remove({});
```

⚠️⚠️⚠️ Khác với **drop()** được dùng để xóa tất cả các tài liệu bên trong một bộ sưu tập, **remove()** được sử dụng để xóa tất cả các tài liệu cùng với chính bộ sưu tập đó.


### Toán tử logic

Dưới đây tóm tắt các loại toán tử logic khác nhau.

| Toán tử | Ví dụ | Ý nghĩa |
| -------- | -------- | -------- |
| &&     | A && B     | Cả A và B đều đúng |
| \|\|      | A \|\| B | A và B có ít nhất một cái đúng|
| !  | !A | A sai |
| AND | A AND B | Cả A và B đều đúng|
| OR | A OR B | A và B có ít nhất một cái đúng |
| XOR | A XOR B | A đúng B sai hoặc A sai B đúng |

MongoDB cung cấp các toán tử logic. 

| Tên | Mô tả |
| -------- | -------- |
| **$and** | join hai query clauses bằng toán tử **AND**, kết quả trả về tất cả documents thỏa tất cả điều kiện trong hai query clauses |
| **$or** | join hai query clauses bằng toán tử **OR**, kết quả trả về tất cả documents thỏa điều kiện của ít nhất một trong hai query clauses |
| **$nor** | join hai query clauses bằng toán tử **XOR**, kết quả trả về tất cả documents thỏa một và chỉ một trong hai query clauses |
| **$not** | tương đương toán tử **NOT**, kết quả trả về tất cả documents không thỏa điều kiện của câu query |



Fiilter ra những người 25 tuổi và ở colombo:
```
db.myCollection.find({$and:[{age : {$lt : 25}}, {location: "colombo"}]});
```

### Aggregation (tổng hợp / tập hơp)

Nhắc nhở nhanh về những gì chúng ta đã học về các hàm tổng hợp thường gặp trong cơ sở dữ liệu SQL:

| Tên | Mô tả |
| -------- | -------- |
|SUM| Hàm SUM() dùng để tính tổng các giá trị của một cột nào đó. |
|AVG| Hàm AVG() dùng để tính tổng các giá trị của một cột nào đó. |
|COUNT| Hàm COUNT() dùng để đếm số bản ghi lấy được từ câu lệnh SELECT. |
|MAX | Hàm MAX() dùng để lấy giá trị lớn nhất của một cột nào đó. |
|MIN| Ngược với hàm MAX(), hàm MIN() dùng để lấy giá trị nhỏ nhất của một cột nào đó. |

Nói một cách đơn giản, **Aggregation** nhóm các giá trị từ nhiều tài liệu và tóm tắt chúng theo một cách nào đó.

Hãy tưởng tượng nếu chúng ta có học sinh nam và học sinh nữ trong một collection *recordBook* và chúng ta muốn có tổng số cho mỗi giới tính đó. Để có được tổng nam và nữ, chúng ta có thể sử dụng hàm aggregate **$group**.

```
db.recordBook.aggregate([
  {
    $group : {_id : "$gender", result: {$sum: 1}}
  }  
]);
```

![image.png](https://images.viblo.asia/9be5f4ac-afb8-45ce-908b-c28257614bf0.png)