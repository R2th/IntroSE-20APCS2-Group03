### Event và EventEmitter
Node.js dựa trên kiến trúc hướng sự kiện không đồng bộ trong đó một số đối tượng nhất định được gọi là emitters định kỳ phát ra (emit) các sự kiện (Events) khiến các Listener Object được gọi.

Khi đối tượng EventEmitter phát ra một sự kiện, tất cả các hàm được gắn vào sự kiện cụ thể đó được gọi một cách đồng bộ. 

Mỗi hành động trên máy tính đều được coi là 1 sự kiện, ví dụ như : ghi file, đọc file, kết nối đến cơ sở dữ liệu, đọc cơ sở dữ liệu, lấy dữ liệu ra từ cơ sở dữ liệu, ...

Để sử dụng event trong nodejs, trước tiên chúng ta cần phải sử dụng một module có sẵn trong nodejs đó là events. Tất cả các phương thức hay thuộc tính của event đều là 1 biểu hiện của EventEmitter, do đó để sử dụng các phương thức hay thuộc tính này, chúng ta cần tạo 1 đối tượng EventEmitter.

```javascript
var events = require('events');
var eventEmitter = new events.EventEmitter();
```

Trong NodeJS, Listener là một hàm, nó sẽ được gọi để thực thi khi sự kiện xẩy ra. Có thể có 0, 1 hoặc nhiều Listener đang được gắn (bind) với sự kiện đó.

```javascript
eventEmitter.on('clicked', function() {
    console.log('Something is clicked!');
})

eventEmitter.addListener('clicked', function() {
    console.log('Something is clicked!');
})

```
**Lưu ý:** Phương thức on và addListener là hoàn toàn tương tự nhau

**Các phương thức của lớp EventEmitter**

| No | Phương thức	 | Mô tả |
| -------- | -------- | -------- |
|   1  | addListener(event, listener)      | Thêm một listener vào phía cuối của mảng listeners cho sự kiện được chỉ định. Phương thức này không kiểm tra rằng listener này đã từng được thêm vào hay chưa.     |
| Text     | on(event, listener)     | 	Phương thức này chính xác là giống 100% với phương thức addListener     |
| Text     | once(event, listener)     | Thêm một listener vào mảng listeners của sự kiện được chỉ định. Nhưng listener này chỉ được gọi 1 lần khi sự kiện xẩy ra. Sau đó nó bị loại bỏ ra khỏi mảng.     |
| Text     | removeListener(event, listener)     | Loại bỏ một listener ra khỏi mảng listeners của sự kiện được chỉ định. Nếu một listener đã được thêm vào mảng này nhiều lần, để loại bỏ hết listener này bạn cần phải gọi phương thức này nhiều lần.     |
| Text     | removeAllListeners([event])     | Loại bỏ tất cả các listener, hoặc loại bỏ tất cả các listener của một sự kiện được chỉ định.     |
| Text     | setMaxListeners(n)     | Theo mặc định, EventEmitter sẽ in ra cảnh báo nếu có nhiều hơn 10 listener được thêm vào cho một sự kiện cụ thể.  Đây là một mặc định hữu ích giúp tìm ra các rò rỉ bộ nhớ (memory leaks). Bạn có thể thiết lập một con số khác, hoặc thiết lập là 0 nếu bạn muốn nó không giới hạn (unlimited).     |
| Text     | listeners(event)     | Trả về một mảng các listener cho sự kiện được chỉ định.     |
| Text     | emit(event,[arg1], [arg2], [...])     | Thực thi lần lượt từng listener trong mảng, với các tham số. Trả về true nếu mảng có ít nhất một listener, ngược lại trả về false.     |

### **Ví dụ về Event và EventEmitter**
### 
```javascript
eventEmitter.on('clicked', function() {
    console.log('Something is clicked!');
})

eventEmitter.emit('clicked');
```

Phương thức `emit` sẽ kích hoạt event `clicked` và nó sẽ gọi đến event `clicked` đang được lắng nghe bằng phương thức `on`

```javascript
eventEmitter.on('clicked', function(button) {
    console.log(button + ' is clicked!');
})

eventEmitter.emit('clicked', 'button 1');
```

Chúng ta cũng có thể truyền cái đối số vào callback khi event được kích hoạt, như ví dụ trên thì chương trình sẽ in ra dòng chữ `button 1 is clicked`. 

Chúng ta cũng có thể truyền nhiều đối số vào event tương ứng với số lượng mà chúng ta truyền vào phương thức `emit`
```javascript
eventEmitter.on('clicked', function(button, a, b, c) {
    console.log(button + ' is clicked!');
})

eventEmitter.emit('clicked', 'button 1', '1', '2', '3');
```
Các biến a, b, c sẽ tương ứng là  '1', '2', '3'.

### Giới thiệu về phương thức inherits 

Có một cách để các Object khác cũng có thể sử dụng các phương thức của event đó là sử dụng `inherits` trong module `util` (cũng là 1 module có sẵn của nodejs)

```
var events = require('events');
var util = require('util');

var Students = function(name) {
    this.name = name;
}

util.inherits(Students, events.EventEmitter);

var max = new Students('max');

max.on('scored', function(marks) {
   console.log(max.name + ' scores '+ marks+ ' marks');
})

max.emit('scored', 95);

var tom = new Students('tom');

tom.on('scored', function(marks) {
   console.log(tom.name + ' scores '+ marks+ ' marks');
})

tom.emit('scored', 60);
```

Và kết quả:
![](https://images.viblo.asia/d932b85c-e77d-48f9-9870-19ac469f16d2.png)

Nhờ sử dụng inherits mà Class Students có thể kế thừa các phương thức của Class EventEmitter (on, emit, ...), do đó các đối tượng trong class này cũng có thể gọi đến và sử dụng các phương thức trên.

Nguồn tham khảo:

https://www.udemy.com/course/learn-node-js-complete-from-very-basics-to-advance

https://o7planning.org/vi/11953/huong-dan-nodejs-eventemitter

https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm