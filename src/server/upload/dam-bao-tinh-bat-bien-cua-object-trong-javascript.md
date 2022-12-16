### Mở đầu
Thông thường, object trong JavaScript là mutable - nghĩa là trạng thái của object có thể thay đổi được. Tuy nhiên, có nhiều trường hợp bạn mong muốn object đó là immutable - trạng thái không thể thay đổi được. Bài viết này sẽ giới thiệu với bạn 2 cách tạo immutable object trong JavaScript.

### Tạo immutable object sử dụng Object.defineProperty
Phương thức Object.defineProperty() định nghĩa một thuộc tính mới trên object hoặc sửa đổi thuộc tính có sẵn trên object.

Để tạo immutable object sử dụng Object.defineProperty, bạn chỉ cần định nghĩa property với writable là false.

```js
let obj = {};
Object.defineProperty(obj, 'a', { value: 1, writable: false });
obj.a = 2;
console.log(obj.a); // => 1
```
Bạn có thể thấy giá trị của obj.a vẫn không thay đổi so với giá trị ban đầu, là 1.

Thực tế, giá trị mặc định của writable là false, nên bạn có thể bỏ qua thuộc tính này:

```js
let obj = {};
Object.defineProperty(obj, 'a', { value: 1 });
obj.a = 2;
console.log(obj.a); // => 1
```
Bây giờ, mình muốn thay đổi writable thành true có được không?

Câu trả lời là KHÔNG.

Vì theo mặc định, giá trị của configurable là false, nên bạn sẽ nhận được lỗi: TypeError: Cannot redefine property: a

```js
let obj = {};
Object.defineProperty(obj, 'a', { value: 1, writable: false });
Object.defineProperty(obj, 'a', {writable: true });
// => TypeError: Cannot redefine property: a
```
Để làm được điều này, bạn cần phải sửa configurable thành true:

```js
let obj = {};
Object.defineProperty(obj, 'a', { value: 1, writable: false, configurable: true});
Object.defineProperty(obj, 'a', {writable: true });
obj.a = 2;
console.log(obj.a); // => 2
```
Như vậy nghĩa là bạn có thể biến immutable object thành mutable object được bằng cách sử dụng phương thức này.

### Tạo immutable object sử dụng Object.freeze
Phương thức Object.freeze() làm cho object không thể thay đổi, bao gồm: không thể thêm thuộc tính mới vào object, thuộc tính đã có thì không thể bị xoá bỏ,...

Chính vì vậy, phương thức này rất phù hợp để tạo immutable object:

```js
let obj = {
  a: 1
};

Object.freeze(obj);
obj.a = 2;
obj.b = 3;
console.log(obj); // => {a: 1}
```
Bạn cũng có thể thấy rằng obj vẫn không hề thay đổi.

Tuy nhiên, nếu mình muốn unfreeze object trên, để biến nó thành mutable object thì có được không?

Câu trả lời là KHÔNG. Bạn không thể unfreeze object một khi nó đã freeze.

### Kết luận
Trên đây là 2 cách tạo immutable object trong JavaScript. Mỗi cách đều có những ưu, nhược điểm riêng. Tuỳ vào từng yêu cầu cụ thể mà bạn có thể lựa chọn cách làm hợp lý. Liên quan đến chủ đề immutable object, có một bài viết khá hay mà bạn có thể tham khảo thêm: Tuyệt chiêu đảm bảo tính bất biến trong JavaScript.