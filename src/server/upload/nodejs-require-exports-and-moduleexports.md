**Node là framework hỗ trợ run JS code ở bên server.**

Để hỗ trợ nhiều hơn trong việc object hóa, Nodejs sử dụng 3 keywork đó là:

* require("path/to/file/js")
* module.exports
* exports

 3 từ khóa tên được sử dụng rất nhiều trong nodejs, mục đích của 3 từ khóa trên là để việc object hóa một file trong javascript
* Chú ý: Khi Nodejs execute bất kỳ một file js nào thì trình biên dịch sẽ dịch một file như sau:

```javascript
  var module = { exports: {} };
    var exports = module.exports;

    // your code

    return module.exports;
```
* Bất kì một file code nào khi được dịch thì toàn bộ đoạn code của file đó sẽ được đặt ở phần // your code như ví dụ trên. Nghĩa là nodejs tự động chèn thêm 2 dòng
    * var module = { exports: {} };
    * var exports = module.exports; ở phía đầu file.
    
    và dòng

    * return module.exports; ở cuối file
![](https://images.viblo.asia/e3009df7-a999-4bc6-836b-597ffc0f39d5.png)


# 1. Module.exports
Đầu tiên chung ta phải biết module là gì đã !
Node.js sử dụng Module để đơn giản hóa việc tạo ra các ứng dụng phức tạp. Module là giống như các thư viện trong PHP, C, C#,… Mỗi module chứa một tập các hàm chức năng có liên quan đến một đối tượng của Module qua đó giúp việc viết và quản lý mã lệnh của chương trình được dễ dàng hơn. Một module có thể đơn giản là một hàm hay một đối tượng. Mỗi module thường được khai bảo ở một tập tin riêng rẽ.

Ví dụ, http là Module chứa các hàm cụ thể liên quan đến thiết lập HTTP. Node.js cung cấp một vài các Module core kèm theo để hỗ trợ chúng ta truy cập file trên hệ thống, tạo các máy chủ HTTP, TCP/UDP, và các hàm tiện ích nhỏ hữu dụng khác.

Ví dụ chúng ta tạo ra một file là greetings.js và nó chứa hai chức năng sau:

```javascript
// greetings.js
sayHelloInEnglish = function() {
  return "Hello";
};

sayHelloInSpanish = function() {
  return "Hola";
};
```

### Exporting a module

Module là các đoạn code được đóng gói lại với nhau,... Code trong một Module thường là private – nghĩa là các hàm, biến được định nghĩa và truy cập bởi bên trong của Module. Để "chìa ra" các hàm hoặc biến để sử dụng bên ngoài Module bạn cần sử dụng exports.

```javascript
module.exports = {
  sayHelloInEnglish: function() {
    return "HELLO";
  },

  sayHelloInSpanish: function() {
    return "Hola";
  }
};
```


# 2. Exports

Câu hỏi: *Đã có module.exports rồi và khi require một file ta cũng chỉ nhận lại được object module.exports vậy thế exports sinh ra với mục đích gì?*

=> Trả lời em cũng không hiểu tại sao nó lại đẻ ra 2 object(cùng trỏ vào 1 vùng nhớ) trong khi đó chỉ cần return về duy nhất object là module.exports.

Chú ý khi sử dụng 2 biến module.exports và exports

* 2 biến exports và module.exports đều cùng trỏ vào một vị trí nhớ, vì vậy khi ta add thêm trường hoặc function bằng một trong hai biến đó thì vùng nhớ A sẽ được có thêm các thành phần được add

* exports .name = "hello" => Vùng nhớ A sẽ có thêm một biến name = "hello"

    ![alt](https://images.viblo.asia/05bf3334-0ac4-42fc-b448-b1b6eb363604.png)


* Nhưng khi ta không add thêm thành phần vào mà gán exports bằng một biến khác thì lúc này exports sẽ trỏ đến vùng nhớ hoàn toàn khác (Không phải vùng nhớ A), vì thế kết quả trả về mà ta nhận được không hề có thành phần của exports

ví dụ:

```javascript
var name = "Tuan LM";

    var getName = function(){
      return name
    }


    exports = name;
    module.exports.getName = getName;
```

=> Kết quả nhận về chỉ hàm getName được add bởi module.exports.getName = getName;
lúc này exports đã trỏ đến một nới hoàn toàn mới k còn liên quan gì đến module.exports

![](https://images.viblo.asia/85f7bd14-cd18-4e78-93d8-66d3b621df08.png)

Và kết quả ta nhận về khi require cũng chỉ là những thành phần mà object module.exports trỏ tới
# 3. Require

Để sử dụng Module, bạn đơn giản chỉ cần khai báo với hàm require(), như sau:

ví dụ:

```javascript
var http = require("http");
```

require() là hàm trả về tham chiếu tới một Module cụ thể. Trong trường hợp của đoạn mã trên, chúng ta đang khai báo một tham chiếu tới http Module và lưu nó vào biến http.

Trong đoạn mã trên, chúng truyền một tham số là tên của Module. Điều này báo cho Node sẽ tìm một Module tên là http trong thư mục node_modules của ứng dụng. Nếu nó không thấy, Node sẽ tiếp tục tìm Module đó ở thư mục global cài đặt node.

Bạn cũng có thể chỉ rõ file bằng việc truyền vào tham số là đường dẫn tương đối ./path/to/my/module.js hoặc tuyệt đối /path/to/my/module.js.

```javascript
var myModule = require('./myModule.js');
```
Vậy để làm việc với ví dụ "sayHello" ở trên, ta tạo 1 file main.js mà thêm vào dòng code như dưới:

```javascript
// main.js
var greetings = require("./greetings.js");

// "Hello"
greetings.sayHelloInEnglish();

// "Hola"
greetings.sayHelloInSpanish();
```

Như vậy là ta có thể gọi 2 hàm sayHello ở file main.js bằng cách inport module greetings.js.

Hy vọng bài viết này sẽ giúp các bạn hiểu về require, exports, module.exports để sử dụng modules trong Nodejs. Hẹn gặp lại các bạn ở các bài viết tiếp theo.

Tham khảo:

* http://stackoverflow.com/questions/16383795/difference-between-module-exports-and-exports-in-the-commonjs-module-system

* https://viblo.asia/p/nodejs-tutorial-phan-2-module-trong-nodejs-MgNvWDdKGYx

* https://www.tutorialspoint.com/nodejs/

* https://www.sitepoint.com/understanding-module-exports-exports-node-js/