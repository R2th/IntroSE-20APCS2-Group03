Nhiều người khi mới chuyển từ các cơ sở dữ liệu như mysql hay postgresql nói chung là các cơ sở dữ liệu quan hệ qua sử dụng mongoDB sẽ có đôi chút bỡ ngỡ. Như mình hồi đầu sẽ hầu như truy vấn theo dạng findAll rồi thao tác vs object bằng javascript với kết quả trả về. Kết quả là hiệu xuất truy vấn của project đó khá tệ .Vì thế mình viết bài này để tổng hợp lại một số câu lệnh truy vấn chủ yếu là find giúp mọi người thao tác với data một cách chuẩn nhất.

![](https://images.viblo.asia/6c42f204-ee51-4ef8-a9ae-b7a559eefc48.png)

## Find
### find()
Ví dụ tìm tất cả tên học sinh trong lớp có điểm = 8 chẳng hạn
```js
let student = await Class.find({ grade : 8 })
```

### AND Query
Ví dụ chúng ta cần tìm tất cả học sinh học lớp Math I và được 8 điểm trở lên
```js
let student = await Class.find({ className: "Math I", grade : { $gte: 8 } })
```

### OR Query
Ví dụ chúng ta cần tìm tất cả học sinh hạnh kiểm tốt hoặc 9.5 điểm trở lên
```js
let student = await Class.find({ $or :[ conduct : "good", grade : { $gte : 9.5 }] } })
```
### Điều kiện so sánh 
Các điều kiện sẽ bao gồm như < , <=, >, >= và != . và chúng ta có các từ khóa như là **$lt, $lte, $gt, $gte** và cuối cùng là **$ne** tương ứng với các toán tử phía trước . Ví dụ hãy tìm tất cả học sinh trong khoảng từ 5 đến 8 điểm :
```js
let student = await Class.find({ grade : {$gte: 5, $lte: 8} })
```
### Like queries
GIờ hãy thử query tên và điểm của tất cả học sinh họ Đỗ trong lớp 
```js
let student = await Class.find({ student : /^Đỗ/ }, "name grade") 
```
### Query với các kiều kiện đặc biệt
Có rất nhiều điều kiện đặc biệt có thể sẽ ít dùng đến nhưng mà biết đâu một lúc nào đấy mọi người sẽ dùng.
* **$in** sẽ lọc theo giá trị mảng mà mình định nghĩa ví dụ `find({grade : {$in : [5,6,7]}})`
* ngược lại **$in** sẽ có not in **$nin**
* để check xem có tồn tại không sử dụng **exists** `Class.exists({grade : 10})`
* **mod** Ví dụ để tìm các học sinh có mã số sinh viên lẻ `Class.find().where('studentCode').mod([2, 1])`
*  **size** ví dụ để tìm tất cả sinh viên tên có độ dài là 5  `Class.find({student : {$size:5}})`

### Queries dựa theo các phần từ trong array
Chúng ta đều biết rằng việc lưu data của mongodb là theo dạng object vì thế sẽ có những trường hợp như sau :
```js
// document 
{
    "_id": 2k3ho23h23ij4k234232l94od,
    "name":{
        "firstname":"Do"
        "lastname":"Huy Bach"
     },
     "address":{
     [
         "city":"Ha noi"
         "street":"Truc Bach"
     ]
}
```
Bây giờ chúng ta có thể queries tìm tất cả nhưng người có firstname là Do hay tìm tất cả học sinh ở Ha Noi
```js
// tim tat ca những học sinh firstname la Do
let student = await Class.find({name.firstname : "Do"})

// tim tat ca những học sinh ở Hà Nội 
let student = await Class.find({address.city : "Ha Noi"})
```

### Queries theo opsions
Có những queries lặp đi lặp lại nhiều lần nhưng lại cố điều kiện như là query 20 cái một hoặc sắp xếp thứ tự .

```js
let query_options={
    "limit":20
    "sort": "name"
}

let student = await Class.find({....}, query_options);
```

Về sort sẽ có từ bé đến lớn và từ lớn đến bé ví dụ sort từ bé đến lớn `"sort" : {name : asc}` và ngược lại từ lớn đến bé  `"sort" : {name : desc}`
## Update
### Vấn đề
Khi sử dụng Mongoose thao tác dữ liệu vs mongoDB nhiều khi chúng ta hay lạm dụng hàm **save()** để update
Ví dụ :
kịch bản là chúng ta muốn update lại tên giáo viên chủ nghiệm của một lớp 
```js
// classroom
/* Data ban dau
    {
        "_id" : ObjectId("5b5279d1e303d394db6ea0f8"), 
        "teacher" : "Nguyễn Thị Long Lanh",
        ....
    }
*/

let class = Class.findById({_id: 5b5279d1e303d394db6ea0f8});
class.teacher = "Kiều Thị Nguyệt Ánh";
class.save();
```

### Giải pháp
Với cách làm trên sẽ vẫn sẽ có thể update được nhưng chúng ta tốn đến 2 lần gọi vào database vì vậy hiệu năng của trang web sẽ đi xuống . Thay vào đó hãy dùng **findOneAndUpdate** 
```js
Class.findOneAndUpdate({_id: 5b5279d1e303d394db6ea0f8}, { teacher: "Nguyễn Thị Long Lanh" })
```
**Chú thích**
Mongoose có 2 hàm là **findOneAndUpdate** và **findOneAndReplace** đọc qua có vẻ dễ lú nhưng chúng lại khác nhau. Ví dụ chúng ta có một document `{"name":"James", "age":"21"}` giờ chúng ta muốn update tuổi
* **findOneAndUpdate** : chúng ta update age lên 22 tuổi thì kết quả của document sẽ là `{"name":"James", "age":"22"}`. Vì vậy sử dụng findOneAndUpdate sẽ update phần tử chúng ta truyền vào mà ko ảnh hưởng đến document
* **findOneAndReplace**: chúng ta cũng update age lên 22 tuổi thì kết quả của document sẽ là `{"age":"22"}`. Vì thế nếu sử dụng findOneAndReplace thì sẽ update lại cả document vớ phần tử chúng ta truyền vào .

## Kết luận
Hầu như mọi người khi bắt đầu sử dụng mongodb cũng sẽ cần các thao tác như tạo mới hay xóa nên mình cũng không giới thiệu thêm về hai hàm này nữa. Hơn nữa Các lệnh xóa hay update các document đều có thể kết hợp với các điều kiện bên trên nên mình cũng không viết thêm nữa. Hi vọng sau bài viết này mọi người sẽ có thể làm việc với mongodb một cách tốt hơn .