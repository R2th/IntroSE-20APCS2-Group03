### 1. Embedded Documents là gì?
Embedded documents (Tài liệu nhúng) là documents có lược đồ riêng và là 1 phần của documents khác. Hiểu đơn giản thì embedded documents là 1 field nằm trong 1 collection thay vì lưu dữ liệu kiểu References ta phải thiết kế 2 collection để thể hiện mối quan hệ One-to-Many.  

Embedded documents có mọi đặc điểm như 1 model, ta có thể sử dụng validators, middleware,... để xử lý lỗi khi làm việc với kiểu dữ liệu này.

Trong Mongoose, Embedded documents được khai báo dưới dạng array trong collection chứa nó và như nói phía trên, nó sẽ có 1 lược đồ riêng nhưng nằm trong cùng 1 file với collection chính.

**Ví dụ:** Ta cần quản lý các **Students** và mỗi students sẽ có nhiều **Projects** khác nhau. Khi này ta sẽ có 1 file chứa lược đồ như sau:

```
var Projects = new Schema({
  title: String,
  unit: String
})


var Student = new Schema({
  name: String,
  age: Number,
  projects: [Projects]
})

mongoose.model('Student', Student);
```

Ta có thể thấy cặp key-value **projects: [Projects]** trong lược đồ Student, value là 1 array đặc biệt có các phương thức cụ thể để làm việc với Embedded Documents và array này là một thể hiện của DocumentArray. Ở các cặp key-value khác thì value là 1 kiểu dữ liệu được định nghĩa sẵn. Ta cần định nghĩa cho DocumentArray này bằng 1 lược đồ riêng. 

**Lưu ý**: Lược đồ con luôn phải được xác định trước lược đồ chính.

### 2. So sánh Embedded Documents vs References

Trước khi so sánh giữa 2 kiểu mô hình dữ liệu thì ta xem qua với ví dụ phía trên khi sử dụng kiểu **References** thì xây dựng lược đồ như thế nào đã nhé.

Ta có 2 file: Project.js và Student.js
```
//Project.js
var Project = new Schema({
  title: String,
  unit: String,
  student: { type:Schema.ObjectId, ref: "Student" }
});

mongoose.model('Project', Project);
```

```
//Student.js
var Student = new Schema({
  name: String,
  age: Number
});

mongoose.model('Student', Student);
```

References lưu trữ các mối quan hệ giữa dữ liệu bằng cách link từ collection này sang collection khác (tạo tham chiếu đến thằng cha) thông qua ObjectIds. Ở đây, nếu ta có một bản dữ liệu trong từng Student thì ta lưu ObjectID của Student trên từng Project. Thuộc tính ref phải khớp chính xác với tên model trong định nghĩa model của chúng ta.

Cơ bản thì cách sử dụng 2 mô hình dữ liệu này trong Mongoose là như vậy. Mỗi kiểu có ưu, nhược điểm khác nhau:



|  | Embedded Documents | References |
| -------- | -------- | -------- |
| **Ưu điểm** | - Truy vấn và cập nhật dữ liệu dễ dàng.<br>- Đạt hiệu suất cao trong việc đọc dữ liệu|- Có thể cung cấp linh hoạt hơn với truy vấn. <br>- Đạt hiệu suất cao trong việc ghi dữ liệu|
| **Nhược điểm**    | - Kích thước document lớn ảnh hưởng đến việc ghi dữ liệu vì mỗi document không thể vượt quá 16MB| - Với các hệ thống có nhiều collections thì truy vấn sẽ khó khăn hơn, yêu cầu nhiều công việc hơn     |


Bài viết này nói về **Embedded Document** nên chúng ta sẽ tiếp tục với các thao tác cơ bản của mô hình dữ liệu này.

### 3. Thêm 1 Embedded Document vào 1 mảng

```
// retrieve my model
var Student = mongoose.model('Student');

// create a student
var student = new Student({ name: 'Cao Thanh Sang', age: 23 });

// create a project
student.projects.push({ title: 'Project 1', unit: 'NodeJs' });

student.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Success!');
    }
});
```

### 4. Xóa 1 Embedded Document

```
Student.findById(myId, function (err, student) {
    if (err) {
        console.log(err)
    } else {
        student.projects[0].remove();
        student.save(function (err) {
            // do something
        });
    };
});
```

### 5. Tìm Embedded Document theo id
DocumentArrays có method đặc biệt là **id()** để lọc các Embedded Document theo thuộc tính **_id** của chúng
``` 
student.projects.id(my_id).remove();
student.save(function (err) {
    // embedded project with id `my_id` removed!
});
```

Bài viết đến đây kết thúc rồi!!! Mình xin cảm ơn các bạn đã đọc bài. Nếu có sai sót hoặc cách diễn đạt của mình sai thì hãy comment phía dưới nhé.

Tài liệu tham khảo:

1. https://mongoosejs.com/docs/2.7.x/docs/embedded-documents.html
2. https://docs.mongodb.com/manual/core/data-modeling-introduction/