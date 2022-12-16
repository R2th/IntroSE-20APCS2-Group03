### Introduce
**J**ava**S**cript **O**bject **N**otation:
```
{
  "title": "Javascript JSON"
  "category": "javascript"
  "type": "viblo post"
}
```
* `JSON` trong Javascript là 1 kiểu format để lưu trữ và truyền tải dữ liệu.
* `JSON` tuân theo một quy luật nhất định mà hầu hết các ngôn ngữ lập trình hiện nay đều có thể đọc được, cấu trúc từ các cặp `{key: value}` khá mạch lạc và dễ hiểu.
* `JSON` thường được dùng trong csdl NoSQL và là 1 chuẩn giao tiếp trên web.
* Việc sử dụng `JSON` nhằm giảm thời gian truy xuất dữ liệu và dung lượng gói tin. Khi 1 request từ client gửi lên server, server trả về dưới dạng `JSON`, phía client sẽ từ các keys lấy ra các values cần thiết.
### Implement
Cú pháp của `JSON` cũng thừa hưởng từ cú pháp của Javascript `Object`, cho nên nó cũng gần giống nhau. Tuy nhiên giữa chúng vẫn có những điểm khác biệt:
* Key: phải được đóng trong dấu ngoặc kép
* Value: chỉ được phép là những kiểu dữ liệu cơ bản (Number, String, Boolean, Array, Object, null), không được phép là function, date, undefined hoặc biểu thức tính toán

JSON có thể biểu diễn dưới nhiều dạng khác nhau, có thể là object, array, hoặc là string:
```
var jsonObject = {
  "name": "cat",
  "age": 2
};

var jsonArray = {
  "employees": [
    {"firstName":"John", "lastName":"Doe"}, 
    {"firstName":"Anna", "lastName":"Smith"}, 
    {"firstName":"Peter", "lastName":"Jones"}
  ]
};

var jsonString = "{"employees":[{"firstName":"John","lastName":"Doe"},{"firstName":"Anna","lastName":"Smith"},{"firstName":"Peter","lastName":"Jones"}]}";
```

Ta có thể gọi đến data bên trong nó thông qua việc sử dụng dấu `[]` hoặc `. ` như đối với javaScript `Object` thông thường:
```
jsonObject.name;   // "cat"
jsonObject["age"];  // 2
```
Trong trường hợp `JSON array`, để gọi đến data cụ thể, chúng ta chỉ đơn giản gọi chúng theo chuỗi và kèm theo `index` của phần tử muốn chọn, vd như với `jsonArray` :
```
jsonArray.employees[0].firstName;   // "John"
```
Một cách khác để lưu trữ nhiều data khác nhau trong 1 biến, chúng ta có thể sử dụng `Nesting JSON Data`, vd:
```
var family = {
    "jason" : {
        "name" : "Jason Lengstorf",
        "age" : "24",
        "gender" : "male"
    },
    "kyle" : {
        "name" : "Kyle Lengstorf",
        "age" : "21",
        "gender" : "male"
    }
}
```
Để gọi data trong `nested JSON`, ta cần gọi chúng lần lượt theo thứ tự quan hệ:
```
family.jason.name;   // Output: Jason Lengstorf
family.kyle.age;   // Output: 21
family.jason.gender;   // Output: male
```
Nếu so sánh JSON với 1 javaScript `Object`:
```
var user = {
    first_name: "Sammy",
    last_name : "Shark",
    online    : true,
    full_name : function() {
       return this.first_name + " " + this.last_name;
    }
};
```
Có thể thấy ở đây, các key của `javaScript Object` hoàn toàn không dùng cặp ngoặc kép: (first_name, last_name, online..) và đặc biệt hơn là value của key cuối `full_name` là 1 function. Riêng với key cuối, để gọi đến values của nó ta phải dùng `user.full_name()` vì nó là 1 function.

Như đã đề cập ở đầu bài viết, vì `JSON` có kiểu format khá giống với javascript `Object`, nên cũng khá dễ dàng convert `JSON` data thành javaScript `Object`.

JSON hay dùng để đọc data từ web server và hiển thị data ở web page. Để format lại `JSON` text nhận được thành javascript `Object`, ta có thể dùng function mà javascript cung cấp sẵn là `JSON.parse()`, ví dụ:
```
var text = '{ "employees" : [' +
  '{ "firstName":"John" , "lastName":"Doe" },' +
  '{ "firstName":"Anna" , "lastName":"Smith" },' +
  '{ "firstName":"Peter" , "lastName":"Jones" } ]}';
  
var obj = JSON.parse(text);
console.log(obj); // Object {employees: Array(3)}
obj.employees[0].firstName;   // John
obj.employees[0].lastName;   // Doe
```
Ngược lại, nếu muốn convert 1 javascript `Object` thành `JSON` text, ta có thể dùng `JSON.stringify`
```
var string = JSON.stringify(obj);
console.log(obj);   // "{"employees":[{"firstName":"John","lastName":"Doe"},{"firstName":"Anna","lastName":"Smith"},{"firstName":"Peter","lastName":"Jones"}]}"
```
### Conclusion
`JSON` là 1 kiểu format của javaScript, là một thành phần quan trọng dùng để lưu trữ dữ liệu và là chuẩn giao tiếp giữa client và server và được sử dụng phổ biến ở rất nhiều các ngôn ngữ lập trình hiện nay.

Để cụ thể hơn về việc implement ở các ngôn ngữ khác nhau, các bạn có thể tham khảo thêm tại  http://www.json.org/

Cảm ơn bạn đã dành thời gian đọc bài viết.