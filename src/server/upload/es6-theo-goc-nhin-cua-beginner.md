Dạo gần đây mình có mày mò để học Reactjs. Đang định ăn xổi bắt đầu đọc tài liệu React luôn thì nhận ra không được vì thực sự cú pháp quá mới so với Javascript thân thuộc :( <br>

Vậy nên mình quyết định phải học từ những thứ cơ bản nhất là ES6.<br>

Sau đây là những gì mình đang và cố gắng tìm hiểu nếu có phần nào sai, hoặc hiểu chưa đúng mọng mọi người góp ý với ạ :blush:

## Let and Const
Let về cơ bản thì giống var nhưng nó có scope, các bạn cũng xem ví dụ sau đây:
```javascript
let a = 50;
let b = 100;
var c = 20;
if (true) {
 let a = 60;
 var c = 10;
 console.log(a/c); // 6
 console.log(b/c); // 10
}
console.log(c); // 10
console.log(a); // 50
```
Qua ví dụ trên thì ta chú ý thấy những điểm sau:
- giá trị của `a` được khai báo trong if hoàn toàn không ghi đè được giá trị ngoài if
- `b` vẫn có thể sử dụng được trong if
- giá trị của `c` đã bị thay đổi sau khi đi qua if

Const thì cũng không thay đổi mấy nó vẫn để khai báo hằng số thôi. Nhưng hãy vẫn lấy 1 vài ví dụ nhé:
```javascript
const a = 50;
a = 60; => sẽ thông báo lỗi thì hằng không được thay đổi giá trị

const a = 20;
var a = 20;
let a = 20;
Cả 3 câu lệnh trên đều xảy ra lỗi vì hằng số a đã được định nghĩa
```

Nhưng const là array hay object thì sao 
```javascript
const MY_OBJECT = {"key_obj": "value_obj"};

Việc gán MY_OBJECT bằng 1 giá trị khác như sau:
MY_OBJECT = {"abc", "def"} => Thông báo lỗi

Nhưng chúng ta hoàn toàn có thể cập nhật giá trị cho MY_OBJECT
MY_OBJECT.key_obj = "value_changed"
=> {"key_obj": "value_changed"}
MY_OBJECT["new_key"] = "new value"
=> {"key_obj": "value_changed", "new_key": "new value"}

Tương tự với array
const MY_ARRAY = [1,2,3]
MY_ARRAY = [4,5,6] => Thông báo lỗi
My_ARRAY.push(6) => [1,2,3,6]
```

## Arrow Function
Qua ví dụ sau chúng ta sẽ thấy nó thay đổi như thế nào:
```javascript
// Old Syntax
function oldOne() {
 console.log("Hello World..!");
}

// New Syntax
var newOne = () => {
 console.log("Hello World..!");
}
```
Cú pháp mới cơ bản là có 2 phần: <br>
1. `var newOne = ()`
    Phần `var newOne` như là giấy khai sinh ấy, kiểu nói cho mọi người biết "tao đã được đẻ ra rồi nhé, tên tao là newOne đấy nhé". Còn nó làm nghề gì thì đây, phần ` = ()` này nói nó là 1 function chứ không phải bác sỹ hay kỹ sư.
2. `=> {}`
    Còn phần này thì kiểu kể về cuộc đời làm function của nó, làm những cái gì, làm như nào kết cục trả về ra sao thì viết vào trong đây.

## Default Parameters
Cái này mình nghĩ thực sự nó quá quen thuộc rồi nhất là với các bạn học Ruby như mình.<br>
Hiểu cơ bản là những params nếu không truyền vào thì không sao, nó sẽ lấy giá trị mặc định, ví dụ:
```javascript
let Func = (a, b = 10) => {
 return a + b; 
}
Func(20); // 20 + 10 = 30
Func(20, 20); // 20 + 20 = 40
```
À nhưng mà mọi người chú ý các default parameter nên để ở cuối nhé vì nếu để như này thì sẽ không hoạt động đâu:
```javascript
let Func = (b = 10, a) => {
 return a + b; 
}
Func(20); => NaN
```

## For of loop
```javascript
let string = "Javascript";
for (let char of string) {
 console.log(char);
}
Output:
J
a
v
a
s
c
r
i
p
t
```
Nhìn nhanh qua ví dụ trên chúng ta thấy ngay `string[index]` sẽ là là output của mỗi vòng lặp chứ không phải `index`. Cũng giống bên Ruby thôi.

## Spread attributes
Theo như mình hiểu thì nó sẽ biến 1 danh sách các phần tử thành 1 mảng các phần tử. <br>
Cùng xem ví dụ sau để hiểu hơn nhé:
Thông thường chúng ta sẽ viết
```javascript
let SumElements = (arr) => {
 console.log(arr); // [10, 20, 40, 60, 90]
 let sum = 0;
 for (let element of arr) {
  sum += element;
 }
 console.log(sum); // 220. 
}
SumElements([10, 20, 40, 60, 90]); 
```
Cái chúng ta truyền vào khi gọi SumElements phải là 1 mảng, thì chúng ta có thể viết cách khác như sau:
```javascript
let SumElements = (...arr) => {
 console.log(arr); // [10, 20, 40, 60, 90]
 let sum = 0;
 for (let element of arr) {
  sum += element;
 }
 console.log(sum); // 220. 
}
SumElements(10, 20, 40, 60, 90); 
```
Khi đó chúng ta không cần truyền vào 1 mảng nữa mà là 1 danh sách các phần tử.

## Maps
Khá giống hash của Ruby nhưng chúng ta phải dùng phương thức `set` và `get` để thêm phần tử và lấy phần tử và mỗi 1 phần tử trong Maps gắn liền với 1 cặp `[key, value]` chứ không phải `{key: value}`, và các key trong 1 Maps là unique, đồng nghĩa với việc nếu bạn set 2 giá trị có cùng key thì giá trị được set sau sẽ ghi đè lên giá trị trước đó. Cùng xem ví dụ:
```javascript
var map = new Map();
map.set('name', 'John');
map.set('name', 'Andy');
map.set(1, 'number one');
map.set(NaN, 'No value');
map.get('name'); // Andy. Note John is replaced by Andy.
map.get(1); // number one
map.get(NaN); // No value
```

Một số methods có sẵn sẽ thường xuyên sử dụng của Maps như:
```javascript
map.size; // Trả về số phần tử
map.keys(); // Lấy ra danh sách keys 
map.values(); // Lấy ra danh sách values.
```

Vì phía trên mình có bảo mỗi phần tử của Maps sẽ được lưu trữ dưới dạng  `[key, value]` nên khi lặp chúng ta hoàn toàn có thể thử như sau:
```javascript
var map = new Map();
for (let [key, value] of map) {
 console.log(key+" - "+value);
}
Output:
name - John
id - 10
```

## Sets
Lưu lại 1 mảng các giá trị unique
```javascript
var sets = new Set();
sets.add('a');
sets.add('b');
sets.add('a');

sets => ["a", "b"]
```
Dù thêm 2 lần `"a"` nhưng trong sets chỉ có 1 giá trị `"a"`.<br>
Một số methods hữu dụng của Sets:
```javascript
var sets = New Set([1,5,6,8,9]);
sets.size; // returns 5. Size of the size.
sets.has(1); // returns true. 
sets.has(10); // returns false.
```

## Static methods
Không biết mình hiểu có đúng không nhưng mình nghĩ nó giống 1 dạng class methods tương tự như của Ruby: Định nghĩa bên trong class và chỉ được gọi trực tiếp thông qua class.
```javascript
class Example {
     static Callme() {
         console.log("Static method");
     }
}
Example.Callme();
Output:
Static method
```

## Getters and Setters
Quá quen với anh em lập trình rồi, nếu bạn đã học qua về lập trình Java, Asp.NET trên trường thì cũng không lạ gì cú pháp như này rồi:
```javascript
class People {
    constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
    setName(name) {
      this.name = name;
    }
}
let person = new People("Jon Snow");
console.log(person.getName());
person.setName("Dany");
console.log(person.getName());
Output:
Jon Snow
Dany
```
Nếu mọi người quên hoặc chưa biết thì mình xin giải thích ngắn gọn như sau: <br>
Contructor là hàm khởi tạo khi bạn `let person = new People("Jon Snow");` thì hiểu nôm na là thực ra bạn đang gọi đến hàm constructor này và `this` trong hàm này chính là đối tượng `person` vừa được khởi tạo. Và nó sẽ gán thuộc tính name của đối tượng `person` = giá trị chúng ta truyền vào ở `new People("Jon Snow");`. Khi bạn gọi `person.setName("Dany");` thì `this` trong hàm này cũng chính là đối tượng gọi hàm (là `person`), nói đến đây chắc mọi người cũng hiểu rồi ạ :sweat_smile:

## Tài liệu tham khảo
https://codeburst.io/es6-tutorial-for-beginners-5f3c4e7960be
https://github.com/lukehoban/es6features#let--const