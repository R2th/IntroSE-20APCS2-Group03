Để kết thúc chuỗi bài về ES6, mình xin giới thiệu tới các bạn 2 khái niệm sử dụng khá nhiều khi lập trình Js mà chúng ta ít khi để ý tới

Nội dung

1. IIFE
2.  Closures
-----

### 1. IIFE
IIFE là viết tắt của Immediately Invoked Function Expression. IIFE là một function của Javascript, function này chạy ngay khi nó được định nghĩa

IIFE khác với những hàm bình thường đó là chúng ta có thể gọi nó nhiều hơn 1 lần nhưng IIFE thì không. IIFE chỉ được sử dụng 1 lần. Nghĩa là những biến trong đó không thể được truy cập vì vậy nó là immutable

Một ích lợi khác của IIFE là để tạo local scope, Nếu bạn có nhiều file js mà có thể có nhiều tên biến giống nhau. IIFE tránh ghi đề và bảo vệ scope của những biến đó.
```javascript
function printName(){
  let myName = "Mohamed"
  console.log(myName)
}

//Invoke
printName()
```
Sử dụng IIFE. Chúng ta bọc function trong `()` thì sau đó chúng ta thêm  `()` vào cuối hàm

(Our function)(Invoke)

(Our function)()
```javascript
(function printName(){
  let myName = "Mohamed"
  console.log(myName)
})()
```
Trong thực tế, chúng ta không cần đặt tên cho function vì chúng chỉ chạy được 1 lần. Vì vậy IIFE sẽ thường sử dụng **anonymous function**
```javascript
(function(){
  let myName = "Mohamed"
  console.log(myName)
})()
```
### 2. Closures
Closures là khi một hàm ghi nhớ lexical scope ngay cả khi 1 hàm được thực hiện bên ngoài lexical scope. Vì vậy closure là khi 1 function sử dụng 1 biến được định nghĩa trong 1 function khác hoặc 1 scope khác. Nó tạo ra một liên kết tới biến này để cập nhật biến của nó

Ví dụ, Chúng ta có 1 function printName có 1 biến. Sau đó chúng ta có 1 function closure gọi function print. Cuối cùng, chúng ta gọi function này trong 1 scope khác

Nói cách khác, Chúng ta thực hiện function print sử dụng 1 biến **name**. Biến này không được khai báo ở trong scope function **closure**, Nhưng biến này vẫn nằm trong scope function printName

Mặc định thì logic này là sai. Nhưng thực tế thì đây là 1 closure. Vì vậy nếu chúng ta thay đổi, cập nhật giá trị tên biến của chúng ta, Closure sẽ cập nhật nó
```javascript
function printName(){
   var name="Mohamed";
   //name="Mohamed Khaled";
   function print() {
      console.log(name);
   }

   closure(print);
}

function closure(func)
{    
    func();
}

printName();
```
Ví dụ khác, chúng ta có thể lấy hoặc cập nhật biến x trong inner function
```javascript
function outer(){
  let x = 4
  function inner (){
    let y = x
    y = 16
    console.log(x)
    console.log(x*2)
    console.log(y)
  }

  closure(inner);  
}

function closure(inn)
{    
    inn();
}

outer()
```
Đây là một cách khác để nạp function closure ở trước. Ở đậy chúng ta đã thay thế một inner function là 1 anonymous function là hàm này trả về nhiều giá trị trong 1 mảng. Sau đó chúng ta đã thực hiện outer function

### Tổng kết:
Hy vọng những thứ mình chia sẻ trên sẽ giúp ích nhiều cho các bạn mới bắt đầu học Javascript và ES6<br>

Tài liệu tham khảo:
- http://es6-features.org/#ParameterContextMatching
- https://dev.to/mkhy19/do-you-know-es6-part-2-596e