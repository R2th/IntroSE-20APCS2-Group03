Khi làm việc với Javascript, chắc hẳn bạn đã làm việc với nhiều hơn 1 design pattern, vậy thì điểm khác biệt giữa chúng là gì và chúng ta nên sử dụng chúng trong những trường hợp nào, hãy cùng mình đi tìm câu trả lời qua bài viết này nhé!

# 1. Constructor pattern

## a) Basic Constructors
Khi chúng ta gọi tới một constructor function với từ khoá "new", JavaScript sẽ khởi tạo 1 object mới với các thuộc tính được định nghĩa bởi function đó.
Bên trong constructor, từ khoá "this" tham chiếu tới object mới đã được tạo. Ví dụ về 1 constructor function và cách khởi tạo 1 object:

```js
function Car( model, year, miles ) {
 
  this.model = model;
  this.year = year;
  this.miles = miles;
 
  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}
 
// Usage:
 
// We can create new instances of the car
var civic = new Car( "Honda Civic", 2018, 20000 );
console.log( civic.toString() );
```

Trên đây là phiên bản đơn giản của constructor pattern nhưng có một số vấn đề trong pattern này. Đầu tiên là nó gây khó khăn trong việc kế thừa, thứ hai là những functions như toString() sẽ bị định nghĩa lại cho mỗi object mới được tạo bởi Car constructor. Cách làm này không tối ưu và chúng ta có cách làm lý tưởng hơn là share những functions như thế này cho mỗi instances của Car. Lý do đó dẫn tới việc cần thiết của pattern Constructor with prototype

## b) Constructor with prototype
Functions có chứa 1 object "prototype". Khi chúng ta gọi tới 1 Javascript constructor để tạo một object, tất cả các thuộc tính của constructors' prototype có thể được sử dụng bởi object mới. Trong trường hợp trên, nhiều objects Car có thể được tạo ra với chung một prototype. Do đó chúng ta có thể viết lại ví dụ ban đầu như sau: 

```js
function Car( model, year, miles ) {
 
  this.model = model;
  this.year = year;
  this.miles = miles;
 
}
 
// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};
 
// Usage:
 
var civic = new Car( "Honda Civic", 2018, 20000 );
console.log( civic.toString() );
```

Và như vậy, một single instance của toString() sẽ được chia sẻ giữa tất cả các Car objects.

Mình có viết một đoạn script nhỏ tại [đây](https://jsperf.com/compare-performance-between-2-constructor-patterns) để so sánh hiệu năng của 2 cách trên, sau khi chạy test chúng ta có thể thấy rõ rằng pattern thứ 2 có performance cao hơn hẳn so với pattern 1 (Nhanh hơn xấp xỉ 70%)

# 2. Revealing Module Pattern
<updating ...>
    
# 3. Prototype Pattern
<updating ...>

### Tài liệu tham khảo
- Learning JavaScript Design Patterns - Addy Osmani
- You don't know JS - Simpson Kyle