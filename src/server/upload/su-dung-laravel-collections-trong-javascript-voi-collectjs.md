# Giới thiệu
Chào mọi người, một tháng lại đi qua, mình đã trở lại và ăn hại gấp đôi (hehe).

Trong quá trình phát triển các ứng dụng, chắc hẳn bạn đã từng phải xử lý các thao tác tính toán, tìm kiếm, sắp xếp, ...  phức tạp trên một tập dữ liệu. Việc này có lẽ đã khiến cho bạn tốn kha khá thời gian. Chính vì điều này, ` Laravel Collections` đã ra đời.

Nếu bạn đã từng làm việc với Laravel, chắn chắn bạn đã từng sử dụng qua `Laravel Collections`. Đây là một lớp hỗ trợ cho bạn xử lý các thao tác trên một tập dữ liệu vô cùng đơn giản, hiệu quả, nhanh chóng. Nay `Laravel Collections` còn có thể được sử dụng trong `JavaScript` thông qua thư viện `Collect.js`. Đây cũng là nội dung của bài viết của mình. Chúng ta cùng bắt đầu thôi !

# Sơ lược về Laravel Collections và Collect.js
Đầu tiên chúng ta cùng tìm hiểu sơ qua về `Laravel Collections`.  Thì `Collections` trong `Laravel`  thực chất là một lớp (class) đã được tính hợp các phương thức xử lý dữ liệu. Nó thay thế cho mảng (array) truyền thống. Giống như mảng, `Collections` có thể chứa nhiều phần tử bên trong nó. Tuy nhiên khác với mảng, các phần tử này không chỉ là các dữ liệu nguyên thủy (integer, String, boolean, ...) mà nó còn là các đối tượng (object), ... Một số ưu điểm của `Collections`:
* `Collections` sử dụng bộ nhớ động nên có thể thay đổi kích thước (số lượng) phần tử linh hoạt
* `Collections` hỗ trợ các phần tử không cùng kiểu dữ liệu
* `Collections` có các phương thức hỗ trợ việc tính toán, tìm kiếm, sắp xếp, ...
* ........

`Laravel Collections` thật sự rất hữu ích phải không nào. Nay bạn còn có thể mang `Laravel Collection` vào `JavaScript` với `Collect.js`. Đây là một thư viện được phát triển bằng `JavaScript` dựa trên `Collections` của `Laravel`. Nó hoạt động tương tự như `Laravel Collection` và hoạt động tốt với kiểu dữ liệu mảng (array) và đối tượng (object). 

Đã xong phần tìm hiểu, bây giờ chúng ta tiến hành cài đặt và sử dụng thôi.
# Cài đặt
### Npm
Chạy lệnh sau:
```
npm install collect.js --save
```
### Yarn
Chạy lệnh sau:
```
yarn add collect.js
```
### CDN
Vào đây để lấy link CDN nếu bạn muốn nhúng thẳng vào ứng dụng của mình: https://cdnjs.com/libraries/collect.js

# Import vào ứng dụng Laravel
Các bạn hãy copy đoạn code sau và dán vào cuối file `resources/assets/js/bootstrap.js`
```
window.collect = require('collect.js');
```
Sau đó chạy lệnh sau để render thư viện:
```
npm run dev
```
Cuối cùng import file `app.js`ở bất cứ nơi nào bạn muốn sử dụng `Collect.js`:
```
{{ Html::script(asset('js/app.js')) }}
```
# Sử dụng
Để tạo một collection:
```
var collection = collect([1, 2, 'Green', 'Red']);
```
**Một số phương thức:**
* **all()**:  Phương thức này trả về mộ mảng chứa tất cả các phần tử trong collection.
```
var collection = collect([1, 2, 'Green']);
collection.all();

// kết quả:  [1, 2, 'Green']
```
* **dd()**: Phương thức này sẽ `console.log()` collection và ngừng tiến trình hiện tại.
```
collect([1, 2, 'OK']).dd();
```
* **avg()**: Tính trung bình các phần tử là số trong collection.
```
collect([1, 3, 3, 3]).avg();

// kết quả: 2.5

var collection = collect([
    {
      name: 'Mr. Smith', posts: 25
    }, 
    {
      name: 'Ms. Susan', posts: 17
    }
]);

collection.avg('posts');

// kết quả: 21
```
*  **chunk()**: Phương thức này tách collection thành từng phần riêng biệt với kích thước nhất định.
```
var collection = collect([1, 2, 3, 4, 5, 'Red', 'Blue']);
 
var chunks = collection.chunk(5); 
chunks.all(); 

//kết quả: [[1, 2, 3, 4, 5], ['Red', 'Blue']]
```
* **collapse()**: Phương thức này gộp một collection của nhiều mảng thành collection của một mảng.
```
var collection = collect([[1, 2], [3], [4, 5, 6]]);
 
var collapsed = collection.collapse();
collapsed.all();

// kết quả [1, 2, 3, 4, 5, 6]
```
* **count()**: Phương thức này trả về tổng số phần tử trong collection.
```
var collection = collect([1, 2, 3, 4]);

collection.count();

//kết quả: 4
```
* **contains()**: Phương thức này kiểm tra trong collection có chưa 1 phần tử nào đó hay không.
```
var collection = collect({
  name: 'Tony Stark',
  age: 22
});

collection.contains('Peter');
// kết quả: false

collection.contains('age', 22);
// kết quả true
```
* **diff()**: Phương thức này so sánh 2 collection và trả về các phần tử khác nhau.
```
const collection = collect([1, 2, 3, 'Red']);

const diff = collection.diff([1, 3, 7]);
diff.all();

// kết quả: [2, 'Red']
```
* **each()**: Phương thức này duyệt qua từng phần tử của collection.
```
var sum = 0;
const collection = collect([1, 3, 4, 1]);

collection.each(function (item) {
  sum += item;
});

// kết quả sum = 9
```
* **filter()**: Phương thức này duyệt qua từng phần tử của collection và giữ lại các phần tử thỏa điều kiện lọc, và xóa các phần tử không thỏa điều kiện.
```
collection = collect([1, 4, 5, 2]);
var filtered = collection.filter(function (value, key) {
    return (value % 2);
});

filtered.all();

// kết quả: [1, 5]
```
* **forget()**: Phương thức này xóa phần tử ra khỏi collection theo key nào đó.
```
const collection = collect({
  name: 'Stark',
  age: 21,
});

collection.forget('age');
collection.all();

// kết quả: {name: 'Stark'}
```
* **isEmpty()**: Phương thức này kiểm tra collection có rỗng không.
* **keys()**: Phương thức này trả về tất cả các key của collection.
```
const collection = collect({
    name: 'Petter Paker',
    age: 18,
    club: 'Music',
    nickname: 'Spidey',
});

keys = collection.keys();
keys.all();

// kết quả: ['name', 'age', 'club', 'nickname']
```
* **pluck()**: Phương thức này trả về tất cả các giá trị của các phần tử theo key tùy chọn.
```
const collection = collect([
    {
        id: 23,
        name: 'Tony',
    }, 
    {
        id: 24,
        name: 'Petter',
    }
]);

const plucked = collection.pluck('name');
plucked.all();

// kết quả: ['Tony', 'Petter']
```
* **toJson()**: Phương thức này chuyển collection thành chuỗi `json` tương ứng.
```
const collection = collect({
    id: 3,
    name: 'Tony',
    gender: 'male',
});

const json = collection.toJson();

// kết quả: {"id": 3, "name": "Tony", "gender": "male"}
```
* **where()**: Phương thức này sẽ lọc collection theo điều kiện của cặp key, value.
```
const collection = collect([
    { name: 'Susan', comment: 50 },
    { name: 'Tony', comment: 100 },
    { name: 'Petter', comment: 70 },
    { name: 'Steven', comment: 100 },
]);

const filtered = collection.where('comment', 100);
filtered.all();

// kết quả:
// [
//     { product: 'Tony', comment: 100 },
//     { product: 'Steven', comment: 100 },
// ]
```
* **whereIn()**: Phương thức này sẽ lọc collection theo điều kiện của cặp key, value có chứa trong mảng đã cho không.
```
const collection = collect([
    { name: 'Susan', comment: 50 },
    { name: 'Tony', comment: 100 },
    { name: 'Petter', comment: 70 },
    { name: 'Steven', comment: 100 },
]);

const filtered = collection.whereIn('comment', [50, 70]);
filtered.all();

// kết quả:
// [
//     { product: 'Susan', comment: 50 },
//     { product: 'Petter', comment: 70 },
// ]
```

Ngoài ra, còn rất nhiều các phương thức khác, bạn có thể đọc thêm tại: https://github.com/ecrmnn/collect.js/
# Strict Comparisons
Tuy `Collect.js` được phát triển dựa trên `Laravel Collection` nhưng vẫn có một chút khác biệt. Đó là `Laravel Collection` sử dụng phép so sánh tương đối (loose) là mặc định và nó cũng cung cấp một số phương thức sử dụng phép so sánh tuyệt đối (strict). Còn tất cả các phương thức của `Collect.js` đều sử dụng phép so sánh tuyệt đối (strict), tức là sử dụng `===`, `!==`, ... thay vì `==`, `!=`, ....  Vì vậy các phương thức strict của `Laravel Collections` đã được loại bỏ khỏi `Collect.js`. Đây là danh sách các phương thức bị loại bỏ và các phương thức thay thế: 
* Dùng `contains()` thay cho  ~~`containsStrict()`~~
* Dùng `unique()` thay cho  ~~`uniqueStrict()`~~
* Dùng `where()` thay cho ~~`whereStrict()`~~
* Dùng `whereIn()` thay cho  ~~`whereInStrict()`~~
* Dùng `whereNotIn()` thay cho ~~`whereNotInStrict()`~~

# Kết luận
Qua bài viết này, mình đã hướng dẫn các bạn sử dụng `Laravel collections` trong `JavaScript` bằng thư viện `Collect.js` và đã giới thiệu qua một số phương thức của nó. Hy vọng mọi người sẽ thích bài viết của mình.
# Tham khảo
https://github.com/ecrmnn/collect.js/