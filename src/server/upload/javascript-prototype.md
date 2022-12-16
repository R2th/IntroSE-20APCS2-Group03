*OOP trong Javascript khá là khác biệt so với nhiều ngôn ngữ, khiến việc tiếp cận JS đối với những người đã quen với các ngôn ngữ hướng đối tượng khác như Java, C++, Ruby,...*

Prototype là một khái niệm cơ bản và cốt lõi của ngôn ngữ Javascript, bất kì ai muốn nắm vững ngôn ngữ này đều phải hiểu về khái niệm prototype trong Js. Javascript không kế thừa kiểu class-based mà kế thừa trong Javascript là dựa vào protype (từ ES5 trở về trước), điều này khiến prototype trở nên rất quan trọng. Vậy hôm nay chúng ta cùng đi tìm hiểu xem prototye trong JS là cái quái gì nhé !

À quên, trước khi tìm hiểu về prototype, bạn cần hiểu rõ khái niệm về object trong JS trước. Trên Viblo cũng có khá nhiều bài viết về object trong JS, bạn có thể tham khảo thêm trước khi đọc bài viết này.

## Prototype là gì ?
Trước hết, cần nói rõ rằng protoype trong Javascript là một object, nó được gọi là protoype object do khá đặc biệt so với các object khác.
Prototype đối với function và đối với object lại có đôi chút khác nhau:
  - Trong Js, bản thân 1 hàm (1 function) cũng được coi là 1 object, và function có một thuộc tính (property) gọi là thuộc tính prototype, bản thân thuộc tính prototype này mang giá trị là 1 object. Object này chứa các property, method mà ta định nghĩa cho prototye của function đó. 
  - Khi sử dụng function đó như là 1 constructor cho object, thì prototype của object đó sẽ là 1 property có tên là __proto__, __proto__ là 1 con trỏ, trỏ đến object prototye của function constructor.
Nói suông thì hơi khó hình dung, ta có thể xem qua ví dụ sau:
```
function Cat(name, color) {
  this.name = name;
  this.color = color;
}

var cat = new Cat('fluffy', 'white');

console.log(Cat.prototype === cat.__proto__);    //true
```

Có thể xem rõ hơn ở hình ảnh sau:

![](https://images.viblo.asia/9a1f8115-5994-4743-929e-fd83089359cf.png)

## Một vài điều cần lưu ý khi sử dụng prototype
### Cách Javascript tìm kiếm một property
Trong đoạn code trên, ví dụ ta khai báo:
```
var cat2 = new Cat('Cat2', 'black'); 
//sau đó thêm giá trị age vào trong Cat's prototye
Cat.prototype.age = 4;

//khi đó 
cat.age // == 4
cat2.age // == 4

//Tuy nhiên cat.age ở đây không phải là thuộc tính age của cat, mà đó là thuộc tính age của object prototye của Cat. Ta có thể kiểm tra bằng cách
cat.hasOwnProperty('age') // false
//Vậy nên khi thay đổi
cat.age = 5;
cat.hasOwnProperty('age') // true
cat2.age // vẫn == 4;
//Khi thay đổi cat.age = 5, ta chỉ đang thêm thuộc tính age vào trong cat, ta vẫn có thể sử dụng cat để access vào Cat's prototye bằng cách
cat.__proto__.age // == 4
```
Vậy, khi tìm 1 thuộc tính của 1 object, đầu tiên JS tìm ở trong object đó, nếu không có thuộc tính đó thì nó sẽ tìm đến prototye của function làm constructor cho object đó. Bạn cần rất lưu ý điều này khi viết code để tránh gây bug không đáng có !

### Khi 1 function thay đổi prototype của nó
Như đã nói ở trên, "***function có một thuộc tính (property) gọi là thuộc tính prototype, bản thân thuộc tính prototype này mang giá trị là 1 object***". Và nếu 1 prototype là 1 property của function, thì nó cũng hoàn toàn có thể thay đổi giá trị, vậy khi 1 function thay đổi object prototype của nó, chuyện gì sẽ xảy ra ?

![](https://images.viblo.asia/b43a7bfa-4498-430c-b1cc-4cd840060cc3.png)

Điều này sẽ rất dễ gây nên bug. Tại vì sao thì bạn hãy tiếp tục theo dõi phần dưới đây.

## Vậy prototype có ý nghĩa gì trong Javascript ?
Như các bạn đã biết, từ phiên bản ES5 trở về trước, JS không hề có khái niệm Class, vậy nên việc kế thừa giống các ngôn ngữ OOP khác trong JS cũng không thể thực hiện được. Tuy nhiên, prototype lại giúp chúng ta có thể thực hiện được việc kế thừa. Vậy nên với Javascript, người ta gọi việc kế thừa của nó là prototype-based, để phân biệt với class-based trong các ngôn ngữ OOP khác.

Nói ngắn gọn, để thực hiện kế thừa trong Js, bạn cần tạo 1 hàm khởi tạo, sau đó thêm các thuộc tính và phương thức vào thuộc tính prototype của hàm khởi tạo này. Các instance tạo ra bởi hàm khởi tạo này sẽ chứa các thuộc tính và phương thức được định nghĩa ở trên. Đoạn code sau minh hoạ cho điều này:
```
function Animal(age) {
   this.age = age;
}

Animal.prototype.showAge = function() {
   console.log( this.age );
};
 
//Tạo ra 1 hàm khởi tạo con (sẽ dùng để kế từ hàm cơ sở)
function Cat(color) {
   this.color = color;
}

//Do prototype của 1 function là 1 object, nên ta có thể dùng cách khởi tạo 1 object trong JS để gán giá trị cho nó
Cat.prototype = new Animal();
Cat.prototype.showColor = function(){
   console.log( this.color );
};
 
//Kiểm tra sự kế thừa
var kitty = new Cat('pink');
kitty.age = 5;
kitty.showAge();       // Mặc dù kitty không có hàm showAge(), nhưng giống như ví dụ ở trên, JS sẽ tìm kiếm showAge trong prototype của nó
kitty.showColor();     // Tương tự với hàm showAge
```

Đây chính là cơ chế kế thừa trong Javascript, đối tượng kitty đã kế thừa những gì có trong prototype của nó (là Cat.prototype), và nó cũng kế thừa luôn những gì có trong thuộc tính prototype của Cat (chính là Animal.prototype).

## Kết luận
Qua bài viết trên mình đã giới thiệu cho các bạn về prototype trong Javascript. Hy vọng các bạn hiểu rõ hơn về nó và tránh được những sai lầm không đáng có khi sử dụng !

## Bài viết có tham khảo từ:
- https://nhungdongcodevui.com/2017/05/24/javascript-prototype-trong-javascript-la-gi-va-tai-sao-no-lai-quan-trong/
- https://app.pluralsight.com/library/courses/javascript-objects-prototypes/