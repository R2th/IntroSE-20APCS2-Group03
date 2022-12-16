Trong Javascript có hỗ trợ các loại dữ liệu cơ bản là giống với hầu hết những ngôn ngữ lập trình khác. Bài viết này mình sẽ giới thiệu về Object và một số phương thức thường dùng với nó. Nội dung có gì thiếu sót mong bạn đọc bỏ qua và góp ý.
# Giới thiệu
**Cú pháp**
```js
// Khởi tạo
{ [ nameValuePair1[, nameValuePair2[, ...nameValuePairN] ] ] }
// Gọi
new Object([value])
```
* nameValuePair1, nameValuePair2, ... nameValuePairN: Các cặp tên và giá trị được phân cách với nhau bằng dấu hai chấm.
* value: Gía trị truyền vào.

Object constructor tạo ra object wrapper với các giá trị đã cho. Nó trả về object rỗng nêu giá trị truyền vào là dạng `null` hoặc `undifined`. Còn với các giá trị khác truyền vào thì sẽ được một object với kiểu tương ứng truyền vào.

# Một số phương thức
## Object.assign()
> Sao chép các gía trị của tất cả các thuộc tính riêng từ một hoặc nhiều object vào một object khác.
> 
```js
const sourceObject = {
    firstName: 'Hieu',
    lastName: 'Bui'
};
const targetObject = Object.assign({}, sourceObject);

console.log(targetObject); // { firstName: 'Hieu', lastName: 'Bui' }
```
Các thuộc tính của đối tượng đích sẽ được viết đè với các thuộc tính của đối tượng đích nếu chúng có key giống nhau.
```js
const sourceObject = {
    firstName: 'Hieu',
    lastName: 'Bui'
};
const targetObject = Object.assign({ lastName: 'Tran' }, sourceObject);

console.log(targetObject); // { firstName: 'Hieu', lastName: 'Tran' }
```
Sao chép nhiều object vào một object:
```js
const obj1 = {
    firstName: 'Hieu',
    lastName: 'Bui'
};
const obj2 = { age: 23 };
const obj3 = { school: 'HUST' };

const obj = Object.assign({}, obj1, obj2, obj3);

console.log(obj); // { firstName: 'Hieu', lastName: 'Bui', age: 23, school: 'HUST' }
```
## Object.create()
> Tạo object mới sử dụng một object hiện có để cung cấp `__proto__` của object mới được tạo ra.
> 
**Cú pháp**
> Object.create(prototypeObject, propertiesObject)
> 
* prototypeObject: Object prototype mới được tạo. Nó có thể là object hoặc null.
* propertiesObject: Các thuộc tính của object mới (tùy chọn).

**Không có prototype**
```js
var person = Object.create(null);

typeof(person) // Object
console.log(person) // {}

// Set property to person object
person.name = 'Bui Hieu';

console.log(person) // { name: 'Bui Hieu' }
```
**Có prototype**
```js
prototypeObject = {
	fullName: function(){
		return this.firstName + ' ' + this.lastName		
	}
};
var person = Object.create(prototypeObject);

console.log(person); // {}

// Adding properties to the person object
person.firstName = 'Hieu';
person.lastName = 'Bui';

person.fullName();

console.log(person.fullName()); // Hieu Bui
```
Để thấy rõ hơn prototype được định nghĩa thì hãy mở đoạn code trên trình duyệt.
## Object.entries()
> Trả về mảng thuộc tính đếm được của các cặp `[key, value]` với object đã cho, tương tự như dùng vặp lặp `for...in`.
> 
**Cú pháp**
> Object.entries(obj)
> 
```js
const obj = {
    firstName: 'Hieu',
    lastName: 'Bui'
};
console.log(Object.entries(obj)); // [ [ 'firstName', 'Hieu' ], [ 'lastName', 'Bui' ] ]
```
## Object.keys()
> Trả về một mảng các tên thuộc tính đếm được của một object đã cho.
> 
**Cú pháp**
> Object.keys(obj)
> 
```js
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // ['0', '1', '2']

var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // ['0', '1', '2']
```
## Object.values()
> Trả về một mảng các giá trị của những thuộc tính đếm được trong object đã cho.
> 
**Cú pháp**
> Object.values(obj)
> 
```js
const obj = {
    firstName: 'Hieu',
    lastName: 'Bui'
};
console.log(Object.values(obj)); // [ 'Hieu', 'Bui' ]
```
## Object.prototype
Khi một hàm được tạo trong Javascript thì nó sẽ thêm thuộc tính `prototype` vào hàm đó. Thuộc tính `prototype` là một object với mặc định có `constructor`. 

Tất cả các object trong Javascript kế thừa các thuộc tính và phương thức từ prototype.

Xem ví dụ sau về protype object:
```js
function Human(firstName, lastName) {
	this.firstName = firstName,
	this.lastName = lastName
};

Human.prototype.showFullName = function() {
    console.log(this.firstName + ' ' + this.lastName);
}

const human1 = new Human('Hieu', 'Bui');
human1.showFullName();
```
## Object.prototype.constructor
> Trả về tham chiếu hàm constructor tạo nên object. Tất cả các object đều có thuộc tính `constructor`.
> 
```js
function Person(name) {
    this.name = name;
  }
  
  var person = new Person('Hieu Bui');
  console.log('person.constructor is ' + person.constructor);
```
=> Kết quả:
```json
person.constructor is function Person(name) {
   this.name = name;
}
```
## Object.prototype.hasOwnProperty()
> Trả về giá trị true/false cho biết object có thuộc tính được đưa ra không.
> 
**Cú pháp**
> obj.hasOwnProperty(prop)
> 
```js
obj = new Object();
obj.prop = 'exists';
console.log(obj.hasOwnProperty('prop')); // true
console.log(obj.hasOwnProperty('toString')); // false
console.log(obj.hasOwnProperty('hasOwnProperty')); // false
```
## Object.prototype.toString()
> Trả về chuỗi đại diện cho object.
> 
**Cú pháp**
> obj.toString()
> 
```js
obj = new Object();
console.log(obj.toString()); // [object Object]
```
Bạn có thể sử dụng prototype để ghi đè phương thức `toString()`.
```js
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
};

person = new Person();

Person.prototype.toString = function objToString() {
    return 'This is overriding string';
}
console.log(person.toString()); // This is overriding string
```

## Object.prototype.valueOf()
> Trả về giá trị nguyên thủy của một object xác định.
> 
**Cú pháp**
> object.valueOf()
> 
```js
function MyAge(age) {
    this.age = age;
};

MyAge.prototype.valueOf  = function () {
    return this.age;
};

const myAge = new MyAge(23);
console.log('My age is', myAge - 1); // My age is 22
```
# Kết luận
Trên đây là một số phương thức với object trong Javascript. Còn tương đối nhiều những phương thức khác nữa nhưng mình chỉ liệt kê một số thứ bản thân hay dùng hoặc có khả năng dùng. Cảm ơn bạn đã theo dõi bài viết.
# Tham khảo
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object