# Definition
Cung cấp một interface thống nhất cho một tập các interface trong một subsystem. Facade định nghĩa một interface cấp cao hơn làm cho subsystem dễ sử dụng hơn.

Tần suất sử dụng trong JavaScript: 5/5 (**high**)
# Diagram
![](https://images.viblo.asia/87c598bb-5136-4684-819f-0e3ea6c104f0.jpg)
# Participants
Các thành phần tham gia pattern này gồm có:
* Facade -- Trong ví dụ: Mortgage
    * biết subsystem nào chịu trách nhiệm về 1 request
    * ủy quyền các request của client cho các đối tượng subsystem thích hợp
* Sub Systems -- Trong ví dụ: Bank, Credit, Background
    * triển khai và thực hiện chức năng subsystem chuyên biệt
    * không có cách biết được hoặc tham chiếu đến facade
# Sample code in JavaScript
```
var Mortgage = function(name) {
    this.name = name;
}
 
Mortgage.prototype = {
 
    applyFor: function(amount) {
        // access multiple subsystems...
        var result = "approved";
        if (!new Bank().verify(this.name, amount)) {
            result = "denied";
        } else if (!new Credit().get(this.name)) {
            result = "denied";
        } else if (!new Background().check(this.name)) {
            result = "denied";
        }
        return this.name + " has been " + result +
               " for a " + amount + " mortgage";
    }
}
 
var Bank = function() {
    this.verify = function(name, amount) {
        // complex logic ...
        return true;
    }
}
 
var Credit = function() {
    this.get = function(name) {
        // complex logic ...
        return true;
    }
}
 
var Background = function() {
    this.check = function(name) {
        // complex logic ...
        return true;
    }
}
 
function run() {
    var mortgage = new Mortgage("Joan Templeton");
    var result = mortgage.applyFor("$100,000");
 
    alert(result);
}
```
> http://www.dofactory.com/javascript/facade-design-pattern