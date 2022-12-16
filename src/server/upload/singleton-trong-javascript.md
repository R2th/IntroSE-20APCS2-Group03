# Singleton là gì?
Dành cho các bạn chưa biết: Singleton là Design Pattern được thiết kế để hạn chế khởi tạo instance của Class về một object duy nhất. Tức là nó chỉ khởi tạo một lần và dùng lại cho toàn bộ hệ thống.

Nói một cách đơn giản hơn thì instance của Singleton giống như một “global object” vậy.

# Code mẫu trong JavaScript
Singleton - Trong code mẫu: Singleton
* định nghĩa getInstance () trả về thể hiện duy nhất.
* chịu trách nhiệm tạo và quản lý đối tượng thể hiện.

Đối tượng Singleton được triển khai như một chức năng ẩn danh ngay lập tức. Hàm thực thi ngay lập tức bằng cách gói nó trong ngoặc theo sau hai dấu ngoặc bổ sung. Nó được gọi là ẩn danh vì nó không có tên.

Phương thức getInstance  trả về một và chỉ một thể hiện của đối tượng trong khi duy trì một tham chiếu riêng đến nó mà mọi thứ bên ngoài không thể truy cập được.
```
var Singleton = (function () {
    var instance;
 
    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
 
function run() {
 
    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();
 
    alert("Same instance? " + (instance1 === instance2));  
}
```
# Giải thích
Ban đầu khi chưa gọi getInstance lần nào thì biến instance sẽ là undefined. Lúc này, instance sẽ được khởi tạo bằng cách sử dụng hàm createInstance. Cuối cùng, hàm trả về biến instance. Đối với các lần gọi getInstance tiếp theo, vì instance đã khác undefined nên nó sẽ không được tạo mới mà sẽ return ngay lập tức.
# Một ví dụ khác
```
function Singleton() {
    if (typeof Singleton.instance === 'object') {
        return Singleton.instance;
    }
    this.sum = 0;
    Singleton.instance = this;
    return this;
}

Singleton.prototype.add = function(number) {
   return this.sum += number;
}

var a = new Singleton();
console.log(a.add(1)); //1
var b = new Singleton();
console.log(b.add(2)); //3
```
# Tổng kết
Qua bài viết mình đã giới thiệu về Singleton trong JavaScript và 2 ví dụ cơ bản để ứng dụng Singleton. Ở đây mình không khuyến khích các bạn dùng hay không nên dùng Singleton, bài viết chỉ muốn cho các bạn hiểu về Singleton và cách để sử dụng nó. Bởi vì Singleton được xem là **anti-pattern**, nhưng nói vậy không có nghĩa là hoàn toàn không nên dùng Singleton, tùy bạn quyết định xem bạn có thích hay không, phù hợp với ứng dụng của bạn hay giải quyết vấn đề của bạn.