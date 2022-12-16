(Lưu ý, trong cuốn sách này tác giả không sử dụng cú pháp của ES6)

Trong các ngôn ngữ lập trình hướng đối tượng cổ điển, một constructor là một phương thức đặc biệt sử dụng để khởi tạo một object dựa trên một class. Trong JS, khi mà mọi thứ gần như đều là object, thì chúng ta rất rất thường xuyên phải sử dụng đến object constructor.

Object constructor được sử dụng để khởi tạo nên một object riêng biệt. Nó có 2 chức năng chính đó là tạo nên object để sử dụng sau đó, cũng như nó cũng có thể nhận vào các đối số để thiết lập các giá trị thuộc tính cho object được khởi tạo.

# 1. Object Creation
Có 3 cách cơ bản để tạo nên một object trong JS:

```javascript
// Mỗi ví dụ dưới đây sẽ tạo nên một object rỗng:
 
var newObject = {};
 
// hoặc
var newObject = Object.create( Object.prototype );
 
// hoặc
var newObject = new Object();
```

Trong đó hàm khởi tạo "Object" trong ví dụ cuối cùng tạo nên một Object wrapper cho một giá trị cụ thể (nếu có đối số được truyền vào), hoặc nếu không có đối số thì nó sẽ tạo ra một object rỗng và trả lại.

Có 4 cách để gán một cặp key-value vào một object:

```javascript
// Có thể sử dùng từ ECMAScript 3
 
// 1. Dot syntax
 
// Gán thuộc tính
newObject.someKey = "Hello World";
 
// Lấy thuộc tính
var value = newObject.someKey;
 
 
 
// 2. Square bracket syntax
 
// Gán thuộc tính
newObject["someKey"] = "Hello World";
 
// Lấy thuộc tính
var value = newObject["someKey"];
 
 
 
// Có thể sử dụng từ ECMAScript 5
// Để biết thêm thông tin: http://kangax.github.com/es5-compat-table/
 
// 3. Object.defineProperty
 
// Gán thuộc tính
Object.defineProperty( newObject, "someKey", {
    value: "for more control of the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true
});
 
// Cách viết trên khá khó đọc nên có thể được
// viết lại như sau:
 
var defineProp = function ( obj, key, value ){
  var config = {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  };
  Object.defineProperty( obj, key, config );
};
 
// Để sử dụng, chúng ta tạo ra một object "person" rỗng
var person = Object.create( Object.prototype );
 
// Gán thêm các cặp key-value cho object
defineProp( person, "car", "Delorean" );
defineProp( person, "dateOfBirth", "1981" );
defineProp( person, "hasBeard", false );
 
console.log(person);
// Outputs: Object {car: "Delorean", dateOfBirth: "1981", hasBeard: false}
 
 
// 4. Object.defineProperties
 
// Gán giá trị
Object.defineProperties( newObject, {
 
  "someKey": {
    value: "Hello World",
    writable: true
  },
 
  "anotherKey": {
    value: "Foo bar",
    writable: false
  }
 
});
 
// Cách lấy giá trị cho ví dụ 3 và 4 cũng tương tự ví dụ 1 và 2
```

Chúng ta sẽ được thấy ở phần sau của cuốn sách rằng những phương thức kể trên có thể được sử dụng cho việc kế thừa.

```js
// Tạo ra một object driver kế thừa từ object person
var driver = Object.create( person );
 
// Gán một giá trị cho object driver
defineProp(driver, "topSpeed", "100mph");
 
// Lấy một giá trị được kế thừa từ person
console.log( driver.dateOfBirth );
 
// Lấy giá trị mà ta đã gán trước đó
console.log( driver.topSpeed );
```

# 2. Các constructor cơ bản
JS không hỗ trợ Class (trong ES6 có class syntax nhưng bản chất nó không như những ngôn ngữ khác, nó tương đương với việc chúng ta sử dụng function) mà hỗ trợ một hàm khởi tạo đặc biệt mà có thể sử dụng với object. Chúng ta sử dụng constructor này đơn giản bằng cách thêm tiền tố "new" trước lời gọi hàm, bằng cách đó chúng ta cho JS biết rằng biến chúng ta gán vào nên được coi là một instance, còn hàm được gọi nên được coi như là một constructor.

Ở trong một constructor, từ khóa "this" chỉ đến object sẽ được constructor này khởi tạo. Hãy cùng thử xem một constructor:
```js
function Car( model, year, miles ) {
 
  this.model = model;
  this.year = year;
  this.miles = miles;
 
  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}
 
// Sử dụng:
 
// Chúng ta có thể tạo một instance mới của Car
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
 
// hãy cùng xem output của hàm toString khi được gọi
console.log( civic.toString() );
console.log( mondeo.toString() );
```

Ví dụ trên là một ví dụ đơn giản của constructor pattern tuy nhiên nó cũng chịu ảnh hưởng của một số vấn đề. Một trong số đó là nó làm cho việc thừa kế trở nên rất khó khăn và hàm toString sẽ bị redefine cho mỗi instance của constructor Car. Điều này là không tối ưu khi mà phương thức đó nên được chia sẻ giữa tất cả các instance của Car.

Tuy nhiên cả ES3 và ES5 đều có các cách để xử lý những vấn đề này.

# 3. Khởi tạo với Prototype
Function, cũng như hầu hết các object trong JS, đều chứa một "prototype" object. Khi chúng ta yêu cầu một constructor tạo một object, tất cả thuộc tính nằm trong prototype của constructor đó đều có thể truy cập được từ object được tạo. Do đó, các object khác nhau được khởi tạo từ Car có thể truy cập cùng một prototype. Chúng ta có thể mở rộng ví dụ trên như sau:

```js
function Car( model, year, miles ) {
 
  this.model = model;
  this.year = year;
  this.miles = miles;
 
}
 
 
// Chú ý rằng ở đây chúng ta sử dụng Object.prototype.newMethod
// thay cho Object.prototype để tránh việc redefine prototype của object
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};
 
// Sử dụng:
 
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
 
console.log( civic.toString() );
console.log( mondeo.toString() );
```

Làm như trên thì sẽ chỉ có một instance duy nhất của toString được chia sẻ giữa các object được khởi tạo từ Car.

# 4. Nguồn bài viết:
https://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript