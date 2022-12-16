# Design pattern
**Design pattern** là các mẫu thiết kế (`pattern`) có sẵn dùng để giải quyết các vấn đề trong `thiết kế phần mềm`. `Design pattern` không hẳn là giải pháp cho những vấn đề ta gặp phải, nó chỉ đơn thuần là những mẫu `template` được xây dựng và cung cấp cho chúng ta để giải quyết vấn đề đó.

Những lợi ích của `design pattern`:
* `Design pattern` cung cấp những hướng giải quyết các vấn đề đã được xây dựng và đóng góp bằng kinh nghiệm của nhiều lập trình viên
* `Design pattern` dễ dàng để điều chỉnh và tái sử dụng sao cho phù hợp với từng solution
# Categories of design pattern
`Design pattern` có thể được chia ra thành 3 loại:
* **Creational Design Pattern** tập trung vào việc khởi tạo object. Những `patterns` nằm trong loại này bao gồm : `Constructor`, `Factory`, `Abstract`, `Prototype`, `Singleton`,  `Builder`.
* **Structural Design Patterns** liên quan đến việc cấu trúc, liên hệ giữa các object. Những `patterns` nằm trong loại này bao gồm: `Decorator`, `Facade`, `Flyweight`, `Adapter`,  `Proxy`.
* **Behavioral Design Patterns** tập trung vào các hành vi, tương tác giữa các object trong hệ thống. Những `patterns` thuộc loại này bao gồm: `Iterator`, `Mediator`, `Observer`, `Visitor`.
# Creational Design Pattern 
## Constructor pattern
Trong `javascript`, object có thể được [khởi tạo qua hàm contructor](https://viblo.asia/p/javascript-things-Eb85oGom52G#_3-invoke-as-a-constructor-6):
```javascript
function Student(firstName, lastName) {
     this.firstName = firstName;
     this.lastName = lastName;
     
     this.display = function() {
         console.log("Student name is: " + this.firstName + " " + this.lastName);
     }
}

var std1 = new Student("Nguyen", "Huy");
std1.display(); // => Student name is Nguyen Huy
```
Cách khởi tạo object như này làm cho function `display()` bị định nghĩa lại mỗi khi tạo mới 1 instance.
### Constructors With Prototypes
Ta có thể sử dụng **prototype** của function. Khi một object được tạo bằng contructor, tất cả những properties của function làm contructor đó sẽ được truy cập bởi object mới này :
```javascript
function Student(firstName, lastName) {
     this.firstName = firstName;
     this.lastName = lastName;
}

Student.prototype.display = function() {
     console.log("Student name is: " + this.firstName + " " + this.lastName);
}

var std1 = new Student("Nguyen", "Huy");
std1.display(); // => Student name is Nguyen Huy
```
## Singleton Pattern
`Singleton pattern` cho phép khởi tạo object một lần và sử dụng instance được tạo này cho các lần khởi tạo sau đó.

`Single instance` được khởi tạo lần đầu được gọi **Singleton**:
```javascript
var Singleton = (function(){
    var instance; // single instane
    
    function createInstance() {
        var obj = new Object('Singleton object');
        
        return obj;
    }
    
    return {
        getInstance: function() {
            if(!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

var obj1 = Singleton.getInstance(); // Lần đầu gọi, một instance được khởi tạo
var obj2 = Singleton.getInstance(); // Những lần gọi sau đó chỉ trả về instance đã tạo ở lần đầu tiên

console.log(obj1 === obj2); // True
```
`obj1 === obj2` trả về `True` bởi vì cả hai object đều trỏ tới `singleton instance` được khởi tạo lần đầu đó.

`Singleton pattern` thường được dùng khi object được sử dụng chung trong tòan bộ hệ thống. 
## Module pattern
`module` có thể được coi là `javascript class`, như là `class` trong OOP. Giống với tính `encapsulation`(đóng gói) của `class`,  `module pattern` cho phép ẩn dấu những thuộc tính và phương thức private, chỉ định những thuộc tính và phương thức được đưa ra ngoài, giúp tránh xung đột với các tên biến, function bên ngoài.

Cấu trúc cơ bản của `module pattern` sẽ có dạng :
```javascript
var testModule = (function() {

    // declare private variables and/or functions
    
    var private_var= "This is private var";
    function private_function() {
        console.log('Private');
    }
    
    return {
        // declare public variables and/or functions
          public_var: "This is public var",
          public_func: function() {
              // Do some
              console.log(private_var);
              private_function();
          }
    }

})();

testModule.public_var // => This is public var
testModule.public_func();
// => This is private var
//    Private
```
Một version khác của `Module pattern` là **Revealing Module Pattern**: định nghĩa tất cả biến, function trong private scope và return những object trỏ tới những biến, function được đưa ra ngoài scope :
```javascript
var myRevealingModule = (function(){
    var name = 'John Smith';

    function updatePerson(){
        name = 'John Smith Updated';
    }
    function setPerson () {
        name = 'John Smith Set';
    }
    function getPerson () {
        return name;
    }
    return {
        set: setPerson,
        get: getPerson
    };
 }());
   
  myRevealingModule.get();
```
## Factory Pattern
**Factory Pattern** định nghĩa một interface cho việc khởi tạo object, interface này cho phép các subclass có thể quyết định class nào sẽ được khởi tạo:
```javascript
function VehicleFactory() {}
VehicleFactory.prototype.vehicleClass = Car; 
VehicleFactory.prototype.getVehicle = function (options) {
    return new this.vehicleClass(options);
};

var carFactory = new VehicleFactory();
var car = carFactory.getVehicle({ color: "yellow", turbo: true });
console.log(car instanceof Car); // => true
```
Tạo thêm các subclass từ `VehicleFactory`:
```javascript
function BikeFactory () {}
BikeFactory.prototype = new VehicleFactory();
BikeFactory.prototype.vehicleClass = Bike;

var bikeFactory = new BikeFactory();
var bigfoot = bikeFactory.getVehicle({ monster: true, cylinders: 12 });
console.log(bigfoot instanceof Bike); // => true
```

Trên đây là một số tìm hiểu của mình về `design pattern`, cảm ơn mọi người đã đọc bài viết :fire: