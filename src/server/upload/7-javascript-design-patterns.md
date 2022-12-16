### Introduction
Các Design Patterns JavaScript là các giải pháp có thể tái sử dụng được 
áp dụng cho các vấn đề thường xảy ra trong quá trình viết code. Việc sử dụng các Design Patterns JavaScript để cung cấp giải pháp cho các vấn đề là khá thích hơp.

Design patterns là sự kết hợp của nhiều nhà phát triển có kinh nghiêm để cgi ra cấu trúc mã được tối ưu và dễ bảo trì một cách tối đa.
JavaScript design patterns hỗ trợ các nhà phát triển viết mã có tổ chức, đẹp và có cấu trúc tốt, dễ ràng tái sử dụng. Chúng giúp làm loại bỏ các mã tổng thể lặp lại không cần thiết.
Trong bài viết này chúng ta sẽ cùng tìm hiểu về 7 JavaScript design patterns  phổ biến nhất.

### Constructor Design Pattern.
Đây là một phương thức đặc biệt được sử dụng để khởi tạo các đối tượng mới được tạo sau khi bộ nhớ được cấp phát.
Vì JavaScript thường là hướng đối tượng, nó xử lý hầu hết các đối tượng.
 Có 3 cách để tạo đối tượng trong javascript.
 ```
 // This creates a new empty Object
 
 var newObject = {};
 
 // This creates a new empty Object
 
 var newObject = Object.create(Object.prototype);
 
 var newObject = newObject();
 ```

Để truy cập các thuộc tính của một function, bạn cần khởi tạo đối tượng.
```
const object = new ConstructorObject();

```
Theo đó, từ khóa `new` ở trên cho JavaScript biết rằng một constructorObject sẽ hoạt động như một phương thức khởi tạo. Tính kế thừa là một điều mà mẫu thiết kế này không hỗ trợ.

### Prototype Pattern

Mẫu Prototype Pattern dựa trên sự kế thừa nguyên mẫu, theo đó các đối tượng được tạo ra để hoạt động như nhau cho các đối tượng khác. Trong thực tế, các  Prototype Pattern hoạt động như một bản thiết kế cho mỗi phương thức khởi tạo đối tượng được tạo ra.
ví dụ:
```
var myCar = {
    name: "Ford Escort",
    brake: function () {
        console.log("Stop! I am applying brakes");
    }
    Panic: function () {
        console.log("wait. how do you stop thuis thing?")
    }
}
// use objec create to instansiate a new car
var yourCar = object.create(myCar);
//You can now see that one is a prototype of the other
console.log(yourCar.name);

```
### Module Design Pattern
Trong module design pattern có một sự cải tiến từ mẫu nguyên mẫu. Các loại bổ trợ khác nhau (cả riêng tư và công khai) được đặt trong module pattern.
Bạn có thể tạo các chức năng hoặc thuộc tính tương tự mà không có xung đột. Đây là sự linh hoạt trong việc đổi tên các funtion công khai. Phần khó khăn của phần này là không thể ghi đè các function đã có từ bên ngoài.
```
function AnimalContainter () {

    const container = [];

    function addAnimal (name) {
        container.push(name);
    }

    function getAllAnimals() {
        return container;
    }

    function removeAnimal(name) {
        const index = container.indexOf(name);
        if(index < 1) {
            throw new Error('Animal not found in container');
        }
        container.splice(index, 1)
    }

    return {
        add: addAnimal,
        get: getAllAnimals,
        remove: removeAnimal
    }
}

const container = AnimalContainter();
container.add('Hen');
container.add('Goat');
container.add('Sheep');

console.log(container.get()) //Array(3) ["Hen", "Goat", "Sheep"]
container.remove('Sheep')
console.log(container.get()); //Array(2) ["Hen", "Goat"]

```
### Singleton Pattern
Singleton Pattern là một điều cần thiết chỉ được khởi tạo một lần ví dụ như việc kết nối database. Nó chỉ có 
thể tạo một phiên bản khi kết nối bị đóng hoặc bạn đảm bảo đóng phiên bản đang mở trước khi mở một phiên bản mới được mở lại.
khó khăn trong mô hình này là các đối tượng phụ thuộc bị ẩn không dễ dàng để được chọn cho testing.
Example
```
function DatabaseConnection() {

    let databaseInstance = null;

// tracks the number of instances created at a certain time
    let count = 0;

    function init() {
        console.log(`Opening database #${count + 1}`);
//now perform operation
    }

    function createIntance() {
        if (databaseInstance == null) {
            databaseInstance = init();
        }
        return databaseInstance;
    }

    function closeIntance() {
        console.log('closing database');
        databaseInstance = null;
    }

    return {
        open: createIntance,
        close: closeIntance
    }
}

const database = DatabseConnection();
database.open(); //Open database #1
database.open(); //Open database #1
database.open(); //Open database #1
database.close(); //close database

```
### Factory Pattern.
Nó là một sáng tạo liên quan đến việc tạo ra các đối tượng mà không cần một hàm tạo. Nó cung cấp một giao diện chung để tạo các đối tượng, nơi chúng ta có thể chỉ định loại đối tượng gốc sẽ được tạo
Do đó, chúng nó chỉ xác định đối tượng và factory instantiates và trả về nó để chúng ta sử dụng. Chúng ta nên sử dụng factory pattern khi thành phần đối tượng được thiết lập có mức độ phức tạp cao và khi chúng ta muốn tạo các phiên bản khác nhau của đối tượng một cách dễ dàng tùy thuộc vào môi trường.
```
// Dealer A

DealerA = {};

DealerA.title = function title() {
    return "Dealer A";
};

DealerA.pay = function pay(amount) {
    console.log(
        `set up configuration using username: ${this.username} and password: ${
            this.password
            }`
    );
    return `Payment for service ${amount} is successful using ${this.title()}`;
};

//Dealer B

DealerB = {};
DealerB.title = function title() {
    return "Dealer B";
};

DealerB.pay = function pay(amount) {
    console.log(
        `set up configuration using username: ${this.username}
and password: ${this.password}`
    );
    return `Payment for service ${amount} is successful using ${this.title()}`;
};

//@param {*} DealerOption
//@param {*} config

function DealerFactory(DealerOption, config = {}) {
    const dealer = Object.create(dealerOption);
    Object.assign(dealer, config);
    return dealer;
}

const dealerFactory = DealerFactory(DealerA, {
    username: "user",
    password: "pass"
});
console.log(dealerFactory.title());
console.log(dealerFactory.pay(12));

const dealerFactory2 = DealerFactory(DealerB, {
    username: "user2",
    password: "pass2"
});
console.log(dealerFactory2.title());
console.log(dealerFactory2.pay(50));
``` 
### Observer Pattern

Observer pattern rất tiện dụng ở một nơi mà các đối tượng giao tiếp với các nhóm đối tượng khác đồng thời.
Trong observer pattern không có sự push and pull không cần thiết của các sự kiện giữa các trạng thái, thay vào đó các modules liên quan chỉ sửa đổi trạng thái hiện tại của dữ liệu.
```
function Observer() {
    this.observerContainer = [];
}

Observer.prototype.subscribe = function (element) {
    this.observerContainer.push(element);
}

// the following removes an element from the container

Observer.prototype.unsubscribe = function (element) {

    const elementIndex = this.observerContainer.indexOf(element);
    if (elementIndex &gt; -1) {
        this.observerContainer.splice(elementIndex, 1);
    }
}

/**
 * we notify elements added to the container by calling
 * each subscribed components added to our container
 */
Observer.prototype.notifyAll = function (element) {
    this.observerContainer.forEach(function (observerElement) {
        observerElement(element);
    });
}
```

### Command Pattern
Command Pattern hoạt động hoặc yêu cầu phương thức vào một đối tượng duy nhất để chúng ta có thể chuyển các lệnh gọi phương thức theo ý mình, cho chúng ta cơ hội để ra lệnh từ bất kỳ thứ gì đang thực thi lệnh và thay vào đó, ủy quyền trách nhiệm cho các đối tượng khác nhau.
Các hàm được khai báo dưới dạng `run()` and `execute()`
```
(function(){

    var carManager = {

//information requested
        requestInfo: function( model, id ){
            return "The information for " + model + " with ID " + id + " is foo bar";
        },

// now purchase the car
        buyVehicle: function( model, id ){
            return "You have successfully purchased Item " + id + ", a " + model;
        },

// now arrange a viewing
        arrangeViewing: function( model, id ){
            return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
        }
    };
})();

```

Bài viết của mình đến đây là hết hẹn gặp lại các bạn tại các bài viết tiếp theo. :)

### Tài liệu tham khảo.
https://addyosmani.com/resources/essentialjsdesignpatterns/book/

https://codesource.io/javascript-design-patterns/

https://www.javascript.com/learn/objects