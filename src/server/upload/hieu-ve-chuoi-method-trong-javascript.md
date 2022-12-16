Bài viết được dịch từ bài [ES6 Arrow Functions in JavaScript](https://medium.com/backticks-tildes/understanding-method-chaining-in-javascript-647a9004bd4f) của tác giả [Segun Ola](https://medium.com/@zeusdynamic).

-----
![](https://images.viblo.asia/a40d4dda-c5cf-463e-8f7e-e60dd8491cb0.jpeg)

Khi lập trình, thông thường sẽ có các hành động cần chạy trong một chuỗi các bước xác định. Viết một hàm duy nhất xác định làm hết tất cả các hành động này thường là một ý tưởng tồi tệ, vì vậy chúng tôi viết một số hàm / phương thức xử lý các hành động riêng lẻ. Để phục vụ cho điều này, chúng ta chuyển các kết quả của phương thức trước làm đối số cho phương thức tiếp theo. Sau đó, chúng tôi kết thúc với một cái gì đó như thế này:
![](https://images.viblo.asia/5a85d45b-b83c-480c-ba22-6600e8fbd697.png)https://images.viblo.asia/5a85d45b-b83c-480c-ba22-6600e8fbd697.png

Code mẫu ở trên ban đầu trông thì không có vẻ xấu hoặc quá khó đọc được. Nó chỉ là một vài lời gọi hàm lồng nhau, phải không? Không, bạn không thể hiểu đúng sự thật. Hãy dành một chút thời gian để suy nghĩ về cách dữ liệu `chảy` qua các cuộc gọi hàm lồng nhau này. Code đọc từ trên xuống.
```js
myObject.someMethod
  -> myObject.someOtherMethod
       -> myObject.yetAnotherMethod
```
 Nhưng luồng dữ liệu thực sự theo hướng ngược lại (đi xuống).
```js
myObject.yetAnotherMethod
  <- myObject.someOtherMethod
       <- myObject.someMethod
```
Tệ nhất là, chúng ta thực sự phải cố tình tạo mã theo thứ tự ngược lại - viết hàm cuối cùng trước, sau đó chuyển cho hàm đó giá trị trả về mà nó phụ thuộc và cứ thế cho đến khi chúng ta có được hàm đầu tiên trong chuỗi. Bây giờ, điều gì sẽ xảy ra với khả năng đọc hiểu code khi đường dẫn function của chúng ta còn tiếp tục dài hơn nữa??? Ví dụ, khi chúng ta có 10 hàm, code của chúng ta sẽ có hình dạng tam giác giống như người bạn thân nhất của chúng ta quay lưng lại với ta, **callback hell**:
![](https://images.viblo.asia/87d20a5d-1982-4621-bfbe-65cca68ded60.png)https://images.viblo.asia/87d20a5d-1982-4621-bfbe-65cca68ded60.png
Tuy nhiên, nếu bạn đã từng sử dụng một thư viện như jQuery, bạn phải viết mã trông như thế này:
![](https://images.viblo.asia/3c09a7ac-8d2b-4363-9abf-2a8490941652.png)https://images.viblo.asia/3c09a7ac-8d2b-4363-9abf-2a8490941652.png
Đây có phải là dễ đọc? Nếu chúng ta kết hợp mười chức năng với nhau, nó sẽ vẫn đọc độc đáo, từ trên xuống. Không có dấu ngoặc đơn và dấu chấm phẩy - Chúa sẽ giúp bạn nếu bạn code bỏ quên hoặc nhầm 1 trong số chúng hoặc thêm một dấu ở sai vị trí. Tốt nhất, mã này đọc cùng hướng với luồng dữ liệu. Sẽ không hay nếu mã của chúng ta đọc giống nhau? Vì vậy, làm thế nào để chúng ta đi từ sự ghê tởm ban đầu của chúng ta(về những thứ không thể đọc được bởi 1 loạt các hàm lồng nhau), cho đến kiểu chuỗi sạch và đẹp của mã dễ đọc và dễ hiểu được hiển thị ở trên?
## Tất cả phải nhờ vào THIS
Trong Javascript, `this`đề cập đến instance(đối tượng hiện tại). Không giống như hầu hết các ngôn ngữ lập trình chính thống, Javascript, `this` phụ thuộc vào cách thức và nơi gọi phương thức / hàm. `this` là một nguyên nhân phổ biến của sự hiểu lầm trong Javascript.

Chúng ta đã trình bày được một số vấn đề phức tạp của Javascript `this` trong bài viết. Có rất nhiều tài nguyên tuyệt vời giải thích cách thức hoạt động chi tiết của `this`. Một nơi tốt để bắt đầu tìm đọc là Mozilla Developers Network (MDN). Tôi chỉ nghĩ sẽ giới thiệu nó vì nó chính là chìa khóa cho các **chaining methods**. Tuy nhiên, vì mục đích của bài viết này, khi chúng ta tạo một đối tượng bằng cách sử dụng một biểu thức, chẳng hạn như `object = new SomeClassWeCreated()` và gọi các phương thức được định nghĩa trên đối tượng đó, `this` đề cập đến đối tượng đó. Có nhiều thứ hơn `this`. Tất cả hãy cẩn thận với việc chơi chữ `this`.

Như đã đề cập trước đó, `this` là instacne đối tượng hiện tại, do đó, nó có quyền truy cập vào tất cả các phương thức được xác định trên instance cũng như truy cập vào [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype). Vì vậy, nếu chúng ta muốn truy cập một phương thức được xác định trên thể hiện đối tượng hiện tại (`this`), chúng ta có thể viết `this.someMethod()`. Thật tuyệt!

Bước tiếp theo là tìm cách đảm bảo rằng chúng ta có thể gọi một phương thức khác trên giá trị trả về của `this.someMethod()`, vì vậy chúng ta có thể có `this.someMethod().someOtherMethod()`. Để đạt được điều này, chúng tôi chỉ cần cho các phương thức của chúng ta return `this`. Theo cách đó, **mỗi phương thức trả về đối tượng có chứa các phương thức mà chúng ta muốn**.

----
```js
class ChainAble {
  firstMethod() {
    console.log('This is the First Method');
    return this;
  }
  
  secondMethod() {
    console.log('This is the Second Method');
    return this;
  }
  
  thirdMethod() {
    console.log('This is the Third Method');
    return this;
  }
}

const chainableInstance = new Chainable()
chainableInstance
  .firstMethod()
  .secondMethod()
  .thirdMethod();

// Console Output
// This is the First Method
// This is the Second Method
// This is the Third Method
```
Được rồi, tất cả tốt đẹp. Bây giờ chúng ta có thể **xâu chuỗi** các phương thức của mình và tạo ra một số tác dụng phụ - đăng nhập vào bảng điều khiển trong trường hợp này. Code của chúng ta dễ đọc hơn và rõ ràng hơn, nhưng làm thế nào để chúng ta có được các giá trị thực tế từ `Class ChainAble` ? -> đó là *gán giá trị prop cho instance*
## Instance Properties
```js
class Arithmetic {
  constructor() {
    this.value = 0;
  }
  sum(...args) {
    this.value = args.reduce((sum, current) => sum + current, 0);
    return this;
  }
  add(value) {
    this.value = this.value + value;
    return this;
  }
  subtract(value) {
    this.value = this.value - value;
    return this;
  }
  average(...args) {
    this.value = args.length
      ? (this.sum(...args).value) / args.length
      : undefined;
    return this;
  }
}

a = new Arithmetic()
a.sum(1, 3, 6)   // => { value: 10 } 
  .subtract(3)   // => { value: 7 }
  .add(4)        // => { value: 11 }
  .value         // => 11 

// Console Output
// 11
```
khởi tạo đối tượng `new SomeClassWeWrote()` sau đó gán giá trị cho prop của instance trong mỗi phương thức là OK: `this.property = ‘someValue'`
## Lấy các giá trị với Getters

Thay vì dùng method ta có thể dùng getter để *clean code* hơn:
```js
class Arithmetic {
  // add getter for value
  get val() {
    return this.value;
  }
  
  // rest of the code truncated for clarity
}


a = new Arithmetic()
a.sum(1, 3, 6)   // => { value: 10 } 
  .subtract(3)   // => { value: 7 }
  .add(4)        // => { value: 11 }
  .val           // <== read the result of the computation  
```
Dựa trên lưu ý đó, chúng ta đã tạo thành công một lớp với các phương thức có thể tạo chuỗi cũng như API công khai dành riêng để truy cập vào kết quả tính toán của chúng ta. Đây là mã cuối cùng cho lớp *Số học* của chúng ta:
```js
class Arithmetic {
  constructor() {
    this.value = 0;
  }
  get val() {
    return this.value;
  }
  sum(...args) {
    this.value = args.reduce((sum, current) => sum + current, 0);
    return this;
  }
  add(value) {
    this.value += value;
    return this;
  }
  subtract(value) {
    this.value -= value;
    return this;
  }
  average(...args) {
    this.value = args.length
      ? (this.sum(...args).value) / args.length
      : undefined;
    return this;
  }
}

a = new Arithmetic()
a.sum(1, 3, 6)   // => { value: 10 } 
  .subtract(3)   // => { value: 7 }
  .add(4)        // => { value: 11 }
  .val           // => 11 

// Console Output
// 11
```

----
**Bạn có thểm tham khảo thêm tại:**
- https://medium.com/backticks-tildes/understanding-method-chaining-in-javascript-647a9004bd4f
- http://javascriptissexy.com/beautiful-javascript-easily-create-chainable-cascading-methods-for-expressiveness/

Nếu bạn thích bài viết này hoặc học được điều gì đó từ nó, hãy dành một tràng pháo tay và giúp like, share và comment. Cảm ơn.