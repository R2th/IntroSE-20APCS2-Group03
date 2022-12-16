Hôm nay mình sẽ giới thiệu về hoisting trong Javascript, một vấn đề không còn mới nhưng với những ai mới bắt đầu với JS thì sẽ gặp nhiều khó khăn khi không hiểu rõ được bản chất vấn đề.

## Hoisting là gì
Về cơ bản thì khi Javascript Engine compile code của chúng ta, tất cả các biến được định nghĩa bằng toán tử var sẽ được hoisted/lifted lên phía trên scope hiện tại mà nó được định nghĩa, cụ thể là function nếu nó được định nghĩa trong function,  và global scope nếu được định nghĩa bên ngoài function  mà không có quan tâm đến vị trí ta khai báo.

Ví đơn giản như sau 

```
someString = "myString"; 
console.log(someString);
var someString;   
```
Theo bạn thì console.log sẽ in ra gì ?
1.  Uncaught ReferenceError: myName is not defined
2. Sunil
3. undefined

Như được đề cập ở trên thì console sẽ in ra màn hình  "myString". 

Định nghĩa biến someString được đưa lên đầu, ta có thể access và assign giá trị cho nó.

someString sẽ có giá trị **undefined** khi mới chỉ được **hoisted**.

Và các bạn nên phân biệt giữa null và undefined. **Undefined** là variable đã được declare nhưng chưa được assign giá trị, còn null là nonexist value.


## Javascript chỉ hoisting variable declaration.

```
console.log(someString);
var someString = "myString";   
```

Console sẽ print ra undefined chứ không ra "myString" vì JS chỉ hoisting declaration của variable 

## Hoisting function
Một Ví dụ đơn giản khác của hoisted function là như sau

```
var doSomething;
doSomething();
function doSomething() {
  console.log('Money');
}
doSomething = function() {
  console.log('Diamond');
}
```
Kết quả in ra màn hình sẽ là Money bởi:
Chỉ phần declaration của doSomething được hoisted lên trên đầu, phần assign value cho doSomething( print ra diamond ) không được hoisted.

## Arrow function and funciton expression
Arrow function và function expression không được javascript hoisted
```
doSomething()
somefunc()
const doSomething = function somefunc() {
   console.log(123)
}
```

Nếu bạn chạy đoạn code trên thì sẽ có lỗi runtime somefunc, doSomething is not defined.  Lý do bởi vì function expression không được Javascript hoisted

## Multiple declartion in samescope
Chúng ta đã biết hoisting là gì, vậy hãy đoán xem kết quả của đoạn code sau là gì
```
function testHoisting() {
   var test = "someString";
   function test() {
       return "String in function";
   }
   return test();
}
console.log(testHoiting());

```
Thoạt nhìn có lẽ sẽ đoán là print ra "String in function". Nhưng thực tế khi run thì sẽ print ra Error test is not function.
Bởi vì với multiple declaration trong cùng 1 scope(cả varaible và function) thì **hoisting của variable bị ignore**   và đoạn code trên sẽ được JS engine thực hiện như sau

```
function testHoisting() {
   function test() {
       return "String in function";
   }
   test = "someString";
   return test();
}
console.log(testHoiting());

```

## Preventing scope problems
Để hạn chế các vấn đề problem về phạm vi sử dụng scope của các variable, chúng ta có một số cách sau:

- Khai báo tất cả các biến ở đầu của mỗi function
- Tránh sử dụng var để khai báo các biến
- Chỉ sử dụng một câu lệnh let hoặc const để khai báo biến trong 1 function.
 Ex: 
```
let one, two, three, four;
vs 
let one;
let ...
```

- Luôn khai báo các biến trước khi sử dụng chúng

## Conclusion
- Hoisting là việc JS engine đưa declaration của variable và function lên top của scope chúng được declare
- Arrow function và function expression không được hoisted
- Nếu có nhiều declaration trùng identifier thì hoisting của variable sẽ bị bỏ qua

Trên đây là một số hiểu biết của mình về hoisting, rất mong nhận được góp ý của các bạn !