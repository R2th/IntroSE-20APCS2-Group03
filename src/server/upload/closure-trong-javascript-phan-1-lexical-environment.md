Xin chào các bạn, dạo này mình vẫn đang tìm tòi Javascript các thứ, có đọc qua đến phần closure.  Để hiểu được closure thì trước tiên cần biết Lexical Environment là gì, vậy hãy cùng đi tìm hiểu. 

### 1. Định nghĩa
Tất cà các hàm hay code block trong Javascipt và cả Global Object đều có một object được giấu tên, được gọi là `Lexical Environment`.
Một `Lexical Environment` có 2 phần:
1. `Environment Record`: một object chứa tất cả các biến `local` thành thuộc tính của nó và một vài thông tin khác (như giá trị của `this`)
2. Một reference (hãy coi nó như một mỗi liên kết) tới `Lexical Environment` bên ngoài. 

### 2. Biến số (Variables)
Có thể nói, một biến số trong Javascript (variable) chính là một thuộc tính của `Environment Record` của môi trường đó. Khi bạn đang truy cập hay thay đổi một biến cũng có nghĩa là đang truy cập hay thay đổi thuộc tính đó của `Environment Record`. 

Ví dụ:
```js
let phrase = "Hello World";
phrase = "Goodbye World";
phrase = "Hello again";
```

Ở trong ví dụ này, biến `phrase` sẽ là một thuộc tính của object `Environment Record` được đính với Global Object. 

* *Lưu ý: Lexical Environment chỉ tồn tại dưới dạng specs, tức là chỉ tồn tại dưới mặt lý thuyết. Không có cách nào để `get` object này và thay đổi nó.*

### 3. Khai báo hàm (Function Declarations)
Khi bạn khai báo một hàm trong Javascript, hàm đó cũng sẽ trở thành một method của `Environment Record` trong scope đó. Tuy nhiên, khi bạn khai báo (declare) một hàm, hàm đó có thể sử dụng được ngay lập tức, thậm chí trước khi bạn declare hàm đó.

```js
say("Alice")

function say(name) {
  console.log(`Hello ${name}`)
}
-> Hello Alice
```

### 4. Lexical Environment trong và ngoài (Inner and Outer Lexical Environment)
Khi một hàm được chạy thì ở đoạn đầu của quá trình đó, một `Lexical Environment` mới sẽ được tạo ra để chứa các biến và tham số. 

Ví dụ:
```js
let phrase = 'Hello';

function say(name) {
  console.log(`${phrase} ${name}`)
}
say('Alice')
```
* `Lexical Environment` bên trong (của hàm say) có thuộc tính là `name`, là tham số được truyền vào. Khi gọi hàm này với `say('Alice')`, giá trị của `name` là `Alice`
* `Lexical Environment` bên ngoài hàm `say` (của Global Object) có chứa thuộc tính `phrase` và chứa luôn cả hàm `say`. 

* *Lưu ý: khi chương trình muốn tìm một biến số, nó sẽ tìm từ Lexical Environment bên trong ra bên ngoài cho tới khi tìm đến Lexical Environment của Global Object.* Ở ví dụ trên, chương trình đã không tìm thấy biến `phrase` ở `Lexical Environment` bên trong hàm `say` nên nó đã tìm ở bên ngoài.

Đó là những điều cơ bản về Lexical Environment, chúng ta sẽ quay lại với Closure ở phần tiếp theo. Bạn có thể đọc thêm ở [đây](https://javascript.info/closure).