Trong ES5 không tồn tại dữ liệu dạng cấu trúc tập hợp(Collection), vì vậy chúng ta sẽ sử dụng mảng hoặc json để lưu trữ dữ tập hợp các phần tử.
Chúng ta xem ví dụ dưới đây

* Bạn muốn lưu trữ thông tin cá nhân dưới dạng key => value như sau
```
  'name' => 'Ngô Trung thắng'

  'gender' => 'Male'
```

* Vì có key nên không thể dùng array được.

* Dùng json thì có vẻ ok, nhưng khi muốn biết xem đối tượng có bao nhiêu phần tử, sẽ không có function json.length như array đâu, và ta phải dùng vòng lặp để tự tính.

Đó là 1 ví dụ cơ bản cho sự thiếu sót của array và json, collection trong es6 ra đời để giải quyết những thiếu sót mà các kiểu dữ liệu khác gặp phải, kèm theo tốc độ xử lý nhanh chóng.

**ES6 collection gồm `Map, Set, WeakMap, WeakSet`.**

# Set
Set là tập hợp các phần tử khác nhau và không có key, vì vậy nếu bạn thêm 2 giá trị giống nhau vào set thì nó chỉ lưu 1 lần thôi. Dễ hiểu hơn thì phần tử trong set là **unique** nhé
## Thao tác cơ bản
* Khởi tạo: let set = new Set();
* Thêm phần tử: set.add(value);
* Xóa phần tử: set.delete(value);
* Kiểm tra tồn tại giá trị: set.has(value);
* Đếm tổng số phần tử: set.size;
* Xóa toàn bộ phần tử: set.clear();

### Khởi tạo
```
let blankSet = new Set();
let set = new Set(['a', 'b', 'c', 'd', 1, 2, 3]);
```
Khi khởi tạo bạn có thể khai báo một set rỗng, hoặc khai báo luôn giá trị

**Lưu ý**: **giá trị truyền vào phải mà một mảng**
### Thêm phần tử
```
let char = new Set(['a', 'b']);
char.add('c'); //char = Set(3) {"a", "b", "c"}
```
### Xóa phần tử
```
let char = new Set(['a', 'b', 'c']);
char.delete('c'); //char = Set(2) {"a", "b"}
```
### Kiểm tra phần tử tồn tại
```
let char = new Set(['a', 'b', 'c']);
char.has('c'); // true
char.has('d'); // false
```
### Tính số phần tử
```
let char = new Set(['a', 'b', 'c']);
char.size; // 3
```
### Vòng lặp với Set
Để lặp qua các phần tử ta dùng cú pháp  **for...of**
```
let chars = new Set(['a', 'b', 'c']);
for (let char of chars){
    console.log(char);
}
 
// Output:
// a
// b
// c
```
### Chuyển sang Array
```
let char = new Set(['a', 'b', 'c']);
let arr_char = [...char]; // arr_char = ['a', 'b', 'c']
```
Rất nhanh mà không sợ nóng, để chuyển sang array ta dùng toán tử 3 chấm `[...set]`(Spread Operator), do vậy có thể dùng map và fillter của array bằng cú pháp
```
let set = new Set([1, 2, 3]);
 
let arr = [...set].filter(function(x){
    return (x % 2) == 0;
});
//arr = [2]
```
Chuyển set sang array được, vậy mình tự hỏi chuyển ngược lại từ array sang set thì làm sao?
Hỏi xong thấy mình ngu luôn, câu trả lời ở phần khởi tạo nhé :)

**Lưu ý: nếu array có nhiều phần tử giống nhau, thì chỉ lấy 1 phần tử thôi nhé.**
### Xóa toàn bộ phần tử

```
let set = new Set([1, 2, 3]);
set.clear();
//Set(0) {}
```
# Map
Map là một kiểu dữ liệu tương tự như Set, tuy nhiên với Map thì có cấu trúc dạng `key => value` còn với Set thì chỉ có `value`. Và đây cũng chính là giải pháp cho vấn để ở đầu bài viết

**Key có thể là bất cứ thứ gì `string`, `number`, `NaN` thậm trí là `Object`  như (`class`, `function`, `json object`)**
## Thao tác cơ bản
* Khởi tạo: let map = new Map()
* Thêm phần tử: map.set('Name', 'Nguyen Van Cuong');
* Xóa phần tử: map.delete("Name");
* Kiểm tra phần tử tồn tại: map.has('Name')
* Đếm tổng số phần tử: map.size
* Xóa toàn bộ phần tử: map.clear();

### Khởi tạo
```
let blankMap = new Map(); // Map(0) {}
let thiToiec = new Map([
     ["lan_1", "failed"],
     ["lan_2", "failed"],
     ["lan_3", "failed"]
]); // Map(3) {"lan_1" => "failed", "lan_2" => "failed", "lan_3" => "failed"}
```
Có thể khởi tạo Map rỗng hoặc Map kèm dữ liệu.

Khi khởi tạo sẽ có một tham số truyền vào, và giá trị của tham số này là một mảng của một mảng con, trong đó mảng con chứa hai phần tử đại diện cho `key` và `value`. Nghe có vẻ hack não nhưng nhìn ví dụ bạn sẽ thấy dễ hiểu hơn.

**Lưu ý: `key` trong map là unique nên bạn truyền 2 mảng con có key giống nhau thì giá trị mảng con trước sẽ bị ghi đè bằng giá trị mảng con sau.**
### Thêm phần tử
```
let thiToiec = new Map([
     ["lan_1", "failed"],
     ["lan_2", "failed"],
     ["lan_3", "failed"]
]);
thiToiec.set('lan_4', 'failed');
// Map(4) {"lan_1" => "failed", "lan_2" => "failed", "lan_3" => "failed", "lan_4" => "failed"}
thiToiec.set('lan_4', 'passed');
// Map(4) {"lan_1" => "failed", "lan_2" => "failed", "lan_3" => "failed", "lan_4" => "passed"}
```
Nếu thêm phần tử đã có `key` thì `value` sẽ được ghi đè.
### Xóa phần tử
```
let thiToiec = new Map([
     ["lan_1", "failed"],
     ["lan_2", "failed"],
     ["lan_3", "failed"]
]);
thiToiec.delete('lan_3'); //true
thiToiec.delete('lan_4'); //false
// 
```
### Kiểm tra phần tử tồn tại
```
let thiToiec = new Map([
     ["lan_1", "failed"],
     ["lan_2", "failed"],
     ["lan_3", "failed"]
]);
thiToiec.has('lan_3'); //true
thiToiec.has('lan_4'); //false
// 
```
### Đếm số phần tử
```
let thiToiec = new Map([
     ["lan_1", "failed"],
     ["lan_2", "failed"],
     ["lan_3", "failed"]
]);
thiToiec.size; // 3
```
### Xóa toàn bộ phần tử
```
let thiToiec = new Map([
     ["lan_1", "failed"],
     ["lan_2", "failed"],
     ["lan_3", "failed"]
]);
thiToiec.clear(); 
// Map(0) {}
```
# WeakMap
WeakMap là một loại kiểu dữ liệu giống như Map . Chỉ khác là với WeakMap thì key truyền vào phải là một biến và biến này phải là một `Object (class, function, json object)`, còn với Map thì bạn có thể thiết lập key là `string, number, NAN` được.

```
// Khởi tạo
let weak = new WeakMap();
 

let key1 = {};
let key2 = {};
 
weak.set(key1, "Giá trị 01");
weak.set(key2, "Giá trị 02");

// key1 và key2 đều là object rỗng nhưng vẫn được coi là 2 key khác nhau, có vẻ WeakMap không so sánh giá trị mà so sánh địa chỉ ô nhớ
```

Vì nó giống như Map rồi nên mình không trình bày cách sử dụng nữa. Vì sự đặc biệt của `key` thì có vẻ nó sẽ không được dùng cho việc xử lý dữ liệu thông thường. Có lẽ sẽ sử dụng khi cần lưu dữ liệu cho `class` hay `object` 

# WeakSet
WeakSet thì lại giống như Set, tuy nhiên với WeakSet thì dữ liệu truyền vào luôn phải là một đối tượng `(object, class, function)` và bạn phải tạo một biến trước khi lưu vào, điều này khác hoàn toàn với Set là Set có thể lưu trữ mọi dữ liệu kể cả `number` và `string`.
```
// Khởi tạo
let weak = new WeakSet();
 
// Danh sách key 
let key1 = {
    name : "thắng"
};
let key2 = {
    gender: "male"
};
 
weak.add(key1);
weak.add(key2);
//WeakSet {{…}, {…}}
```
 Giống như WeakMap, WearSet không dành cho xử lý dữ liệu thông thường. Và cả 2 đều tất ít sử dụng
 # Kết
Dữ liệu có cấu trúc trong javascript trước đây đã được khá hạn chế, nhưng điều này đã được khắc phục với ES6. Những Collection ES6 mới này sẽ thêm sức mạnh và tính linh hoạt javascript, cũng như đơn giản hóa việc xử lý dữ liệu cho lập trình viên.
Mọi thứ mới mẻ được tạo ra trong phiên bản Es6 đều có mục đích của nó, khi hiểu được các bạn sẽ biết nên dùng kiểu dữ liệu nào trong trường hợp cụ thể nào đó. Từ đó giúp cho  việc xử lý dữ liệu đơn giản và chương trình sẽ tối ưu hơn.
 
 **Tham khảo**
 
 https://hacks.mozilla.org/2015/06/es6-in-depth-collections/
 
 https://www.sitepoint.com/es6-collections-map-set-weakmap-weakset/