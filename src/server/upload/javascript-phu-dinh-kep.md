Hôm nay mình sẽ cho các bạn hiểu về toán tử (!!) và cách sử dụng nó trong javascript

```
!! không phải là một toán tử. Nó chỉ là! toán tử hai lần
```
Ví dụ:
```
success = !!what()&&that()
return !!value

var x = "somevalue"var isNotEmpty = !!x.length;
Let's break it to pieces:
x.length   // 9
!x.length  // false
!!x.length // true
```
Tất cả các giá trị tương ứng với kết quả false:
```
* false
	* null
	* undefined
	* The empty string "" ( '')
	* The number 0
	* The number NaN
```
Tất cả các giá trị tương ứng với kết quả true:
```
!!false === false
!!true === true

!!0 === false!!parseInt("foo") === false // NaN is falsy
!!1 === true
!!-1 === true  // -1 is truthy

!!"" === false // empty string is falsy
!!"foo" === true  // non-empty string is truthy
!!"false" === true  // ...even if it contains a falsy value

!!window.foo === false // undefined is falsy
!!null === false // null is falsy

!!{} === true  // an (empty) object is truthy
!![] === true  // an (empty) array is truthy; PHP programmers beware!
```

Bạn cũng có thể sử dụng các hàm xây dựng tương ứng với các kiểu nguyên thủy  để truyền các giá trị rõ ràng, tức là:
```
Boolean(foo) === !!foo
Number(foo)  === +foo
String(foo)  === ''+foo
```
Và nhiều ví dụ khác:
```
return !!window; //Returns true
return !!null; //Returns false
return !!undefined; //Returns false
return !!false; //Returns false
return !!true; //Returns true
return !!""; //Returns false
return !!"Hi"; //Returns true
return !!0; //Returns false
return !!1; //Returns true
```
Phủ định đầu tiên chuyển đổi dữ liệu (bất kể nó là kiểu dữ liệu nào) thành boolean. 
<br>
Phủ định thứ hai thay đổi boolean một lần nữa để cho kết quả mong muốn. <br>
Trường hợp phủ định nếu giá trị là null hoặc không xác định hoặc false hoặc  là 0, thì phủ định đầu tiên chuyển đổi nó thành true.
<br>
Phủ định thứ hai thay đổi nó thành false
<br>
**Trường hợp tích cực**
<br>
Nếu giá trị là đối tượng hoặc true hoặc có giá trị  thì phủ định đầu tiên chuyển đổi nó thành false. <br>
Phủ định thứ hai thay đổi nó thành true

**Là phủ định kép !! (expr) giống như typecasting Boolean (expr)**<br>
Khẳng định trên đúng.
```
Boolean(5) === !!5; Same casting, fewer characters.
```
Nhưng nói rằng nhìn vào cái này! Não vội?
```
!!new Boolean(false) // true
!!Boolean(false) // false
```
Voila, giải thích:
```
Boolean mới (false) là một đối tượng và một đối tượng là thật ngay cả khi nó chứa giá trị giả!
Boolean (false) trả về false đúng giá trị của nó
```
Qua đó mong các bạn có thể hiểu hơn về kí hiệu toán tử phủ định này và áp dụng nó vào dự án. <br>
Chúc các bạn thành công.
## Tài liệu tham khảo: https://www.sitepoint.com/javascript-double-negation-trick-trouble/