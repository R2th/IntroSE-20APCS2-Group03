Như đã biết, JavaScript có 5 kiểu dữ liệu cơ bản: `Number`, `String`, `Boolean`, `Undefined` và `Null` và còn 1 kiểu khác nữa là `Object` (hay còn gọi là kiểu phức hợp). Kiểu dữ liệu `Object` được sử dụng rất thường xuyên trong JS vì nó có tính linh hoạt mạnh mẽ trong việc xử lý dữ liệu. Chi tiết thế nào thì chúng ta cùng tìm hiểu nhé mọi người (bow)

![](https://images.viblo.asia/45add62f-628f-447d-aa57-85dfefd6cd62.png)
# 1. Khái niệm Object trong JavaScript?

Khi nghe Object chẳng ai còn xa lạ khái niệm của nó nữa :D. Một đối tượng (Object) là 1 **danh sách các item**, 1 item là 1 cặp name-value; Trong đó value có thể là các kiểu dữ liệu cơ bản, function(), hay cũng có thể là 1 object khác.

Ta gọi mỗi item như là:
* 1 `thuộc tính (property)` của Object <= Nếu value của item có kiểu dữ liệu là kiểu phức hợp hoặc kiểu dữ liệu cơ bản.
* 1 `phương thức (method)` của Object <= Nếu value của item nó là 1 hàm (function). 
```js
var myFirstObject = {
    firstName: 'QuanTien',
    favoriteAuthor: 'Music',
    greet: function() {
        console.log('Hello Bro!');
    }
};
```

## Truy cập tới các thuộc tính của Object

Để lấy được các giá trị của thuộc tính trong Object, ta có thể truy cập bằng cách sử dụng toán tử ngoặc vuông `[ ]` hoặc dấu chấm `.`
```js
myFirstObject.firstName;                //QuanTien
myFirstObject['favoriteAuthor'];        //Music

myFirstObject.lastName;                //undefined
```
Có 1 trường hợp nên chú ý, nếu name của value là số (number) thì ta chỉ có thể truy cập bằng cách sử dụng dấu ngoặc vuông `[ ]`
```js
var myObject = {10: 'hihi'}
myObject.10;                         //Uncaught SyntaxError: Unexpected number
myObject['10'];                      //hihi
```

# 2. Khởi tạo Object

## Sử dụng Object literals

Trong OOP, `object literals` được biểu diễn bằng dấu phẩy ngăn cách giữa các cặp name-value nằm trong ngoặc nhọn `{ }`
```js
var test = {1: 'Test'};
var myCar = {
   brand: 'Mazda 3',
   run: function() {
      console.log('running');
   }
};
```
## Sử dụng Object Contructor functions

`Constructor function` là 1 trong những cách thông dụng nhất để tạo 1 Javascript object phụ thuộc vào việc kế thừa prototype nhằm giúp các chức năng trở nên hữu dụng hơn. Mấu chốt của những function dạng này là chúng có thể `thực thể hóa (instantiation)` và được `kế thừa (inherited)`. Phương pháp khởi tạo này là ta sử dụng toán tử `new`.
```js
function Liveedu(student) {
    //properties
    this.student = student;
    
    //methods
    this.watch = function() {
      console.log(this.student + 'learns new tech skills');
    }
}

// instantiating the object
var liveedu = new Liveedu('Quan ');

// accessing methods and properties
liveedu.watch(); //output is Quan learns new tech skills
console.log(Object.getPrototypeOf(liveedu)); //output is object
```
## Sử dụng prototype

Thuộc tính [prototype](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes) là 1 thứ gì đó đặc biệt trong Javascript, ta sẽ sử dụng để tạo hàng loạt các đối tượng giống nhau
```js
function Fruit (_color, _name){
};

Fruit.prototype.color = 'general_color';
Fruit.prototype.name = 'general_name';
Fruit.prototype.showName = function(){
    console.log(this.name);
};

var mangoFruit = new Fruit('yellow', 'Mango');
var appleFruit = new Fruit('red', 'Apple');
```

# 3. Cái nhìn chi tiết hơn về Object

## Kiểu dữ liệu tham trị và tham chiếu
![](https://images.viblo.asia/e9cab8fc-4587-4cab-9b85-edfe060a70c9.gif)
Sự khác biệt cơ bản là giá trị của kiểu dữ liệu tham chiếu không được lưu trực trực tiếp tại biến, mà biến đó sẽ lưu một tham chiếu tới giá trị thực.
>  Các kiểu dữ liệu cơ bản trong JS là các kiểu dữ liệu tham trị, còn kiểu dữ liệu Object là kiểu dữ liệu tham chiếu.
 ```js
var num = 1;
var otherNum = num;

num = 2;
console.log(num);               // 2
console.log(otherNum);          // 1
 ```
 ```js
var person = {name: 'QuanTien'};
var otherPerson = person;

person.name = 'Tien Quan';
console.log(person.name);               //Tien Quan
console.log(otherPerson.name);          //Tien Quan
 ```
 Như đã thấy, mặc dù thay đổi giá trị của biến `person`, nhưng giá trị của biến `otherPerson` cũng bị thay đổi. Nguyên do của việc này là bởi các đối tượng Object lưu giá trị theo kiểu tham chiếu, tức là 2 biến này cùng tham chiếu tới 1 vùng giá trị.
 
 Các bạn có thể tìm hiểu thêm [tại đây](https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0)!
 
##  Thuộc tính riêng và thuộc tính kế thừa trong Object
 
*  `Thuộc tính riêng (own property)` là thuộc tính được định nghĩa tại bản thân của đối tượng (object).
*  `Thuộc tính kế thừa (inherited property)` là những thuộc tính được kế thừa từ đối tượng prototype của object đó.

Để kiểm tra 1 thuộc tính có thuộc object hay không (kể cả thuộc tính riêng và thuộc tính kế thừa) => Sử dụng toán tử `in`
```js
var school = {schoolName: 'PTIT'};

//kiểm tra thuộc tính
console.log('schoolName' in school);     //true
console.log('schoolType' in school);     //false
```
Kiểm tra 1 thuộc tính có phải thuộc tính riêng hay không, ta có thể dùng phương thức `hasOwnProperty` của Object
```js
//tạo mẫu khởi tạo
function Fruit(){};
Fruit.prototype.color = 'general_color';

//tạo đối tượng và thuộc tính riêng
var apple = new Fruit();
apple.name = 'ownName';

//kiểm tra thuộc tính
console.log(apple.hasOwnProperty('color'));     //false
console.log(apple.hasOwnProperty('name'));      //true
```

## Các đặc tính của thuộc tính (Property Attributes)

Trong Tiếng Anh, người ta gọi các thuộc tính là `property`; các đặc tính được gọi là `attribute`.  Và trong Javascript thì 1 thuộc tính (property) sẽ có 4 đặc tính (attribute) sau đây:
![](https://images.viblo.asia/6115f3f3-6cd2-4b1f-86b9-20973e244fb4.png)
* **Value**: Đây là đặc tính rõ thấy nhất, bởi vì mỗi thuộc tính đều mang 1 giá trị nào đó, có thể là giá trị cơ bản hay method.
* **Writable**: mang giá trí true/false, cho phép ta thay đổi giá trị của thuộc tính hay không?
* **Enumerable**: mang giá trị true/false, cho phép mỗi thuộc tính được duyệt qua trong vòng lặp for-in không?
* **Configurable**: mang giá trị true/false, nói lên khả năng config như delete thuộc tính, thay đổi các đặc tính khác của thuộc tính, ... hay không?

Về việc xóa 1 thuộc tính tính của object, ta có thể dùng toán tử `delete` để xóa 1 thuộc tính của đối tượng. Để lệnh `delete` được thực thi, ta cần xóa đúng vị trí thuộc tính được định nghĩa, tức là **thuộc tính riêng thì xóa tại đối tượng, thuộc tính kế thừa thì xóa tại đối tượng prototype**

```js
var person = {
  firstName: 'Quan',
  lastName: 'Tien',
  age: 24,
  eyeColor: 'black'
};

delete person.age;  // or delete person['age'];

// Before deletion: person.age = 24, after deletion, person.age = undefined
```

# Tổng kết
Qua bài này, mong rằng các bạn có cái nhìn rõ nét hơn về Object trong JavaScript. Cảm ơn các bạn đã đọc bài viết của mình!

Tham khảo:

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes

https://www.w3schools.com/js/js_object_definition.asp

https://blog.bitsrc.io/diving-deeper-in-javascripts-objects-318b1e13dc12