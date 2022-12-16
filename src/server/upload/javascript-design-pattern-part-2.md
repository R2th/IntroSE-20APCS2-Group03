Chào mọi người, ở [bài viết trước](https://viblo.asia/p/javascript-design-pattern-gDVK2JJAKLj), mình đã nói về khái niệm của `design pattern` và một số `pattern` thuộc `Creational Design Pattern`.

Hôm nay sẽ là phần tiếp, với một số `pattern` thuộc `Structural Design Patterns`.

:four_leaf_clover:

-----



# Structural Design Patterns
## Decorator pattern
### Subclassing
Trước tiên ta sẽ nói qua về khái niệm `subclassing`:

`subclassing`, giống như `inheritance` trong `OOP`, là khái niệm vể việc các `object` mới có thể kế thừa các thuộc tính (`inheriting properties`) từ những `base object` hay `superclass object`.

Giả sử ta có class `Person` có nhiệm vụ tạo ra những `base object`(`superclass object`):
```javascript
    function Person(name, gender) {
        this.name = name;
        this.gender = gender;
    }
    
    var person = new Person('Huy', 'male');
    // => Person {name: "Huy", gender: "male"}
```
Một class `Employee` kế thừa những thuộc tính của `Person`:
```javascript
function Employee(name, gender, code) {
    // kế thừa các thuộc tính của Person
    Person.call(this, name, gender);
    
    this.code = code;
}

var employee = new Employee('Huy', 'male', 'B000000');
// => Employee {name: "Huy", gender: "male", code: "B000000"}
```
### Decorator
Khi mà việc sử dụng `subclass` là không cần thiết, `decorator pattern` được sử dụng khi muốn thêm hoặc sửa đổi các thuộc tính, phương thức (`behavior`) của `object`, bằng việc tạo ra các `decorators` có nhiệm vụ thực hiện những thay đổi lên `object` mong muốn. 

Quay lại ví dụ trước, giả sử hệ thống yêu cầu cần thêm các lớp như: `EmployeeCanSing`, `EmployeeCanPlayChess`, `EmployeeCanWriteCode` ..., ta có thể định nghĩa thêm các class tương ứng (it's ok). 

Nhưng nếu yêu cầu lại cần thêm các lớp như: `EmployeeCanSingAndPlayChess`, `EmployeeCanSingAndWrireCode`, `EmployeeCanPlayChessAndWriteCode`, ..., thì ứng với mỗi class được định nghĩa sẽ tăng số lượng các lớp được đinh nghĩa lên rất nhiều, dẫn tới khó trong việc quản lý tất cả các lớp này :roll_eyes:.

Chính vì thế mà **decorator pattern come in to play** . `decorator pattern` không bị ràng buộc bởi việc `object` được khởi tạo như thế nào mà tập trung vào việc mở rộng, sửa đổi các thuộc tính, phương thức của `object` đó. 

`decorator` nghĩa là `trang trí` :thinking:, vậy nên có thể hiểu tác dụng của nó là `trang trí lại` cho `object` :frowning: .

Ví dụ sau sẽ áp dụng `decorator pattern` để giải quyết vấn đề trên:
```javascript
function Employee(name, code) {
    this.name = name;
    this.code = code;
}

// Decorator canSing() thêm những thuộc tính, phương thức mô tả Employee có thể hát được
function canSing(employee) {
    employee.sing = function() { console.log(employee.name + ' is singing song "Let it be"...') }
}

// Decorator canPlayChess() thêm những thuộc tính, phương thức mô tả Employee có thể chơi cờ
function canPlayChess(employee, awards) {    
    employee.awards = awards;
}

// Decorator canWriteCode() thêm những thuộc tính, phương thức mô tả Employee có thể coding
function canWriteCode(employee, skills) {    
    employee.skills = skills;
}

var e1 = new Employee('Huy', 'B000000');
var e2 = new Employee('Hân', 'B000001');
// => Employee {name: "Huy", code: "B000000"}
//    Employee {name: "Hân", code: "B000001"}

// Decorating ...
canSing(e1);
canSing(e2);
canWriteCode(e1, 'Clean code');
canWriteCode(e2, 'Naming convention');
canPlayChess(e1, 'Sun summer winner');

// => Employee {name: "Huy", code: "B000000", skills: "Clean code", awards: "Sun summer winner", sing: ƒ}
//    Employee {name: "Hân", code: "B000001", skills: "Naming convention", sing: ƒ}

e1.sing(); // => Huy is singing song "Let it be"...
```
-----
## Facade pattern
`façade pattern` thường được sử dụng trong những hệ thống được tạo xây dựng nên bởi nhiều lớp kiến trúc khác nhau (`multi-layer architecture`), cung cấp một `interface` khi đã ẩn dấu những login phức tạp liên quan tới các `subsystem` có liên quan.

Mục đích của `facade pattern` là đưa ra một `high-lerver interface` ngắn gọn và dễ dàng sử dụng, không cần quan tâm tới các login xử lý tới các `subsystem` phía sau .

Ví dụ sau giả lập một hệ thống thanh toán online, `user` cung cấp `bankAccount` để tiến hành thanh toán các loại sách mua trong hệ thống:
```javascript
function BookStoreFacade(bankCredential) {
    this.bankCredential = bankCredential;
}

// Định nghĩa các method cần sử dụng
BookStoreFacade.prototype = {
    // Kiểm tra tài khoản ngân hàng của user
    verifyBankAccount: function() {
        // Các xử lý phức tạp, gọi tới các API của ngân hàng
        
        return true;
    },
    
    // Phương thức thanh toán
    buy: function(bookName, amount) {
        // Kiểm tra verifyBankAccount
        if(!this.verifyBankAccount()) return 'Your bank account invalid!';
        
        // Tính tổng tiền cần trả
        var total = ...;

        // Gọi BankAPI để tiến hành thanh toán
        if(BankAPI.perform(bankCredential, total)) return 'Order pay successed!';
        
        return 'Order pay failed!';
    }
}
```

-----
## Proxy pattern
`proxy pattern` cung cấp một `proxy object` thay thế cho một `object` chính nhằm thay thế `object` chính xử lý các `request` gọi tới nó. 

Trong nhiều trường hợp khi `request` tới một `object` thì có thể sẽ không gọi thằng tới `object` đó bởi một số lý do (ví dụ như `request` yêu cầu `object` phải xử lý tốn nhiều thời gian để trả về dữ liệu mong muốn), khi đó `request` sẽ được truyền tới `proxy object` đại diện cho `object` đó.
 
![](https://images.viblo.asia/e9d05a88-a94f-4c19-a2a6-9c3fe2a6e0fb.png)

Trong ví dụ sau, `Proxy` là `GeoProxy`, cung cấp các `proxy object`, xử lý các `request` tới `RealSuject`, ở đây là `GeoCoder`. Mỗi khi có `request` tới, `GeoProxy` sẽ kiếm tra tham số `address` truyền vào đã tồn tại trong `geocache` hay chưa, nếu có thì trả về cho `client` data trong `geocache`, nếu chưa thì sẽ gọi tới `GeoCoder` để lấy data.

```javascript
function GeoCoder() {
    this.getLatLng = function(address) {
        if (address === "Amsterdam") {
            return "52.3700° N, 4.8900° E";
        } else if (address === "London") {
            return "51.5171° N, 0.1062° W";
        } else if (address === "Paris") {
            return "48.8742° N, 2.3470° E";
        } else if (address === "Berlin") {
            return "52.5233° N, 13.4127° E";
        } else {
            return "";
        }
    };
}
 
function GeoProxy() {
    var geocoder = new GeoCoder();
    var geocache = {};
 
    return {
        getLatLng: function(address) {
            if (!geocache[address]) {
                geocache[address] = geocoder.getLatLng(address);
            }
            return geocache[address];
        },
        getCount: function() {
            var count = 0;
            for (var code in geocache) { count++; }
            return count;
        }
    };
};
 
function run() {
    var geo = new GeoProxy();
 
    // geolocation requests
 
    geo.getLatLng("Paris");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("London");
    geo.getLatLng("London");
}
```
-----
## Adapter pattern
`adapter pattern` cung cấp cơ chế chuyển đổi từ `interface` này sang `interface` khác, hữu ích cho việc một `interface` mới có thể tương tác với một `interface` đã có trong hệ thống.

Trong ví dụ sau, ta có class `Person` với thuộc tính `name` và có thể `sayHello`. Ta cũng có một class mới là `Robot` với thuộc tính `name`, vì là `Robot` nên không thể `sayHello` được :rofl: . Giả sử hệ thống của ta mong muốn các `robots` có thể `sayHello` tương tự như `Person` mà không muốn thay đổi bản chất của `Robot`,  `adapter pattern` sẽ giúp ta vấn đề này:  ta thiết kế một `adapter`: `RobotToPersonAdapter` với mục đích giúp `Robot` có thể có các hành vi y hệt với `Person`: 

```javascript
function Person(name) {
    this.name = name;

    this.sayHello = function() { console.log(name + ' say hi...'); }
}

function Robot(name) {
    this.name = name;
}

// Lớp chuyển đổi adapter
function RobotToPersonAdapter(robot) {
    return {
        sayHello: function() {
            console.log(robot.name + ' say hi...');
        }
    }
}

var huy = new Person("Huy");
var sophia = new Robot("Sophia");

huy.sayHello(); // => Huy say hi...
robot.sayHello(); // => Uncaught TypeError: sophia.sayHello is not a function

humanRobot = new RobotToPersonAdapter(sophia);
humanRobot.sayHello(); // => Sophia say hi...
```

-----


Trên đây là tìm hiểu của mình về một số `Structural Design Patterns`, cảm ơn mọi người đã theo dõi. 
:four_leaf_clover: