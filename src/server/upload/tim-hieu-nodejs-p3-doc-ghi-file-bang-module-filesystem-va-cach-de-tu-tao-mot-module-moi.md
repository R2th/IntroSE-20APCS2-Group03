### 1. Modules trong nodejs
### 
### 
```
Hãy coi các modules trong nodejs giống như các thư viện JavaScript.

Nó là một tập hợp các function bạn muốn đưa vào ứng dụng của bạn.

Source : www.w3schools.com
```

```
Modules trong Nodejs là một chức năng đơn giản hoặc phức tạp được tổ chức trong một hoặc nhiều tệp JavaScript có thể được sử dụng lại trong suốt ứng dụng Nodejs.

Mỗi Modules trong Node.js có bối cảnh riêng, vì vậy nó không thể can thiệp vào các mô-đun khác hoặc gây ảnh hưởng trên phạm vi global.

Ngoài ra, mỗi mô-đun có thể được đặt trong một tệp .js riêng trong một thư mục riêng.
```

Như từ các ví dụ trước ta đã sử dụng câu lệnh:

`const http = require('http');`

**http** ở đây chính là 1 modules được xây dựng sẵn (built-in) của nodejs. 

Ta gọi **http** thông qua require và gán nó vào 1 biến, điều này cho phép chúng ta tạo ra 1 instance của modules này. Bằng cách này, chúng ta có thể sử dụng tất cả các function đã được xây dựng trong modules **http**.

### 2. Sử dụng Module FileSystem để đọc và viết file
### 
Để sử dụng module FileSystem ta sử dụng

```
var fs = require('fs');
```

**2.1 Xử lý đồng bộ**


Trước tiên ta sử dụng đọc và ghi file đồng bộ (synchronous) bằng **readFileSync** và **writeFileSync**.

```
var fs = require('fs');

var read_string = fs.readFileSync('test.txt', 'utf8');

console.log(read_string);

fs.writeFileSync('test2.txt', read_string);
```

**Lưu ý** : Tham số thứ 2 là kiểu encoding, khi truyền tham số này, dữ liệu trả về sẽ là **String**, nếu không, function readFileSync sẽ trả về dạng **buffer** như sau

```
<Buffer 53 6f 6d 65 74 68 69 6e 67 21 21 0d 0a 53 6f 6d 65 74 68 69 6e 67 21 21 0d 0a 53 6f 6d 65 74 68 69 6e 67 21 21 0d 0a 53 6f 6d 65 74 68 69 6e 67 21 21 ... >
```

**2.2 Xử lý không đồng bộ**

Một cách đọc file khác là đọc file không đồng bộ (asynchronous) bằng function **readFile**. Vậy 2 cách đọc file này khác nhau như thế nào?
```
var fs = require('fs');

var read_string = fs.readFile('test.txt', 'utf8', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log(data);
});

console.log('The File is read');
```

Ở đây chúng ta cần 1 callback function, đơn giản là báo lỗi nếu có lỗi và nếu không thì in ra dữ liệu được từ file.

Chạy thử đoạn code trên và đây là kết quả: 
![](https://images.viblo.asia/88542ef4-8648-4590-b2e6-af660692a0b2.png)

Ta có thể thấy rằng ở đây, khi mà dữ liệu file lớn và hàm readFile không thể xử lý được ngay, thì server sẽ tiếp tục chạy đoạn code phía dưới trong khi đó thì function **readFile** cứ tiếp tục thực hiện nhiệm vụ của nó. Điều này sẽ đem lại nhiều lợi ích về performance khi bài toán thực tế đòi hỏi việc xử lý nhiều request một lúc.

### 3. Tự tạo 1 custom modules
### 
Nodejs cho phép chúng ta tự tạo ra 1 modules.

Ví dụ như chúng ta muốn tự tạo ra 1 Modules có thể nói xin chào bằng nhiều thứ tiếng chẳng hạn.

Trước tiên hãy tạo ra file hello.js

```
exports.sayHelloInEnglish = function() {
    return 'Hello';
}

exports.sayHelloInSpanish = function() {
    return 'Hola';
}
```


Ta sử dụng từ khóa exports để có thể sử dụng các function này ở file main (app.js)

Tại file app.js ta có thể gọi đến module này giống như cách chúng ta sử dụng để gọi **http**.

```
var hello = require('./hello.js');

console.log(hello.sayHelloInEnglish());

console.log(hello.sayHelloInSpanish());
```

**Chú ý**:
Có 1 cách 'đẹp đẽ' hơn mà chúng ta có thể sử dụng để khai báo các function trong module.

```
module.exports = {
    sayHelloInEnglish : function() {
        return 'Hello';
    },    
    sayHelloInSpanish : function() {
        return 'Hola';
    }
};
```

Nguồn tham khảo:

https://www.udemy.com/course/learn-node-js-complete-from-very-basics-to-advance

https://stackoverflow.com/questions/43402627/are-there-any-performance-benefits-of-using-asynchronous-functions-over-synchron