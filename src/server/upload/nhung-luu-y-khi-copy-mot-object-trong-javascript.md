#### 1. Giới thiệu
Khi lập trình chúng ta thường lưu dữ liệu dạng biến.  Và sẽ có lúc chúng ta cần copy một dữ liệu của một biến sang biến khác. Tuy nhiên luôn có nguy hiểm trong việc copy, đó là deep copy và shallow copy:
1. Deep copy (sao chép sâu) tức là tạo mới một biến có cùng giá trị và không có liên quan gì đến biến gốc.
2. Shallow copy tức là tạo mới một biến cũng có cùng giá trị so với biến gốc nhưng sâu bên trong nó vẫn giữ mối quan hệ giữa nó với biến gốc. Có nghĩa là một khi giá trị của biến gốc thay đổi thì biến copy cũng thay đổi theo.

Nếu như không hiểu rõ được điều này nó sẽ gây ra rất nhiều phiền phức cho người lập trình. Vì vậy trong bài viết này mình sẽ giới thiệu với các bạn về các cách để copy một object.
Trước khi vào bài viết chúng ta hãy ôn lại một chút về các kiểu dữ liệu trong Javascript nhé:
      - Number . Ví dụ 1
      - String. Ví dụ 'Hello'
      - Boolean . Ví dụ true hoặc false
      - undefined
      - null
      - Object
      - Arrray
      
Với các kiểu dữ liệu như number, string, boolean, null, undefined khi được gán giá trị sẽ được gắn chặt với biến và không có liên quan gì đến biến được copy.
Còn các kiểu dữ liệu như object, array thì hãy cẩn thận khi copy vì nó nó thể sẽ có liên quan với nhau. Nên khi thay đổi giá trị có thể sẽ làm sai lệch giá trị ở object kia.
Nào chúng ta nãy cùng tìm hiểu nhé.

#### 2. Các cách để copy 
##### Gán object
```
// Khởi tạo object bar
var bar = {
   x : 'Xin chào'
}
console.log(bar.x);  // Xin chào

// Gán nó cho foo
var foo = bar;
console.log(foo.x);  // Xin chào

// Nhưng khi foo hoặc bar thay đổi giá trị x thì
foo.x = 'Xin chào!! Tôi là foo.';
console.log(foo.x);  // Xin chào!! Tôi là foo.
console.log(bar.x);  // Xin chào!! Tôi là foo.

bar.x = "Rất vui được gặp cậu foo!!";
console.log(foo.x);  // Rất vui được gặp cậu foo!!
console.log(bar.x);  // Rất vui được gặp cậu foo!!
```
Đấy như các bạn thấy ở ví dụ trên. Chúng ta đã tạo được 1 object có cùng giá trị với object mẫu nhưng khi thay đỗi giá trị của 1 trong 2 object đó thì sao? Cả 2 cùng thay đổi theo, điều rất nguy hiểm đấy. 
Vì sao lại như vậy? Thực ra khi gán `var foo = bar`  cả hai object `foo` và `bar` sẽ trỏ đến cùng một địa chỉ bộ nhớ. Bất kỳ thay đổi trong một trong hai object sẽ được phản ánh trong object kia. Vì vậy, khi gán một object cho một object khác thì nó sẽ không thực sự sao chép object đó!!!

##### Sử dụng [Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
```
var obj = { foo: 'foo', bar: 'bar', other: { x: 'Xin chào!' } };

var clonedObj = { ...obj };
console.log(clonedObj); // Object { foo: 'foo', bar: 'bar', other: { x: 'Xin chào!' } }
```
Ở đây chúng ta đã sử dụng cú pháp `...` để sao chép một object. Vậy là đã thành công. Nhưng hãy xem tiếp ví dụ nối tiếp ví dụ trên nhé.
```
obj.foo = 'Tôi là foo';
obj.other.x = 'Rất vui được gặp cậu!!';
console.log(obj); // Object { foo: 'Tôi là foo', bar: 'bar', other: { x: 'Rất vui được gặp cậu!!' } }

console.log(clonedObj); // Object { foo: 'foo', bar: 'bar', other: { x: 'Rất vui được gặp cậu!!' } }
```
Như vậy các bạn có thể thấy dữ liệu từ `obj` thay đổi vẫn có tác động lên `clonedObj` vì khi sử dụng `...` chỉ là shallow copy. Nó chỉ copy được giá trị number, string, boolean, ... nhưng lại ko sao chép được dữ liệu array, object. Nên bạn cũng hãy cẩn thận khi sử dụng cách này nếu object gốc có các kiểu dữ liệu như object, array trong đó.

##### Sử dụng [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
```
var obj = { foo: 'foo', bar: 'bar', other: { x: 'Xin chào!' } };

var clonedObj = Object.assign({}, obj);
console.log(clonedObj); // Object { foo: 'foo', bar: 'bar', other: { x: 'Xin chào!' } }
```
Sau khi thay đổi giá trị
```
obj.foo = 'Tôi là foo';
obj.other.x = 'Rất vui được gặp cậu!!';
console.log(obj); // Object { foo: 'Tôi là foo', bar: 'bar', other: { x: 'Rất vui được gặp cậu!!' } }

console.log(clonedObj); // Object { foo: 'foo', bar: 'bar', other: { x: 'Rất vui được gặp cậu!!' } }
```
Đây là một cách rất phổ biến trước khi Spread Syntax được phát minh ra, cũng cho ra kết quả tương tự. Ở đây hàm này lấy giá trị của `obj` cho vào một object rỗng `{}` rồi sau đó `cloneObj` lấy kết quả đó. Vậy đây cũng chỉ là shallow copy thôi. Nên các bạn cũng hãy cẩn thận.

##### Sử dụng  JSON.stringify và JSON.parse
```
var obj = { foo: 'foo', bar: 'bar', other: { x: 'Xin chào!' } };
var deepClone = JSON.parse(JSON.stringify(obj));
console.log(obj); // Object { foo: 'foo, bar: 'bar', other: { x: 'Xin chào!' } }
console.log(deepClone); // Object { foo: 'foo', bar: 'bar', other: { x: 'Xin chào!' } }
 
 // Thay đổi giá trị của obj
obj.foo = 'Tôi là foo';
obj.other.x = 'Rất vui được gặp cậu!!';
console.log(obj); // Object { foo: 'Tôi là foo', bar: 'bar', other: { x: 'Rất vui được gặp cậu!!' } }
console.log(deepClone); // Object { foo: 'foo', bar: 'bar', other: { x: 'Xin chào!' } }
```
Vậy chúng ta thấy ở cách copy này thì object `cloneObj` đã thực sự không còn liên quan gì đến `obj` nữa.  Đây chính là deep copy :)))))))

##### Các cách khác
Ở đây mình chỉ nói cách chức không nói chi tiết nhé. 
Ngoài ra chúng ta còn có thể sử dụng các vòng lặp để lấy các giá trị ở object gốc và gán lại cho object mới.
Hoặc là dùng thư viện [lodash](https://lodash.com) với hàm [cloneDeep](https://lodash.com/docs/4.17.11#cloneDeep)

#### 3. Lời kết
Các cách `Spread Syntax` và `Object.assign` là shallow copy. Cách dùng `JSON.stringify và JSON.parse` hoặc `deepClone` của lodash là deep copy.
Các bạn hãy chú ý cẩn thận khi copy một object trong javascript nhé. 
Cám ơn các bạn đã đọc bài viết của mình. Chúc các bạn làm việc và học tập tốt nhé :))))))