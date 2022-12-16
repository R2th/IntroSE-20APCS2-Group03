Hi mọi người :hugs:,

Là lập trình viên chắc hẳn chúng ta đã quá quen với debug và xử lý lỗi. Nhắc đến xử lý lỗi, không thể không nhắc tới `try-catch-finally` , tập lệnh giúp xử lý các lỗi runtime. Ở bài viết này, chúng ta cùng tìm hiểu xem liệu bạn đã hiểu hết về tập lệnh này chưa, thông qua 5 điều có thể bạn chưa biết dưới đây nhé :sunglasses:
# 1. Return trong try hoặc catch block
Nếu chúng ta sử dụng `return` trong `finally` block, câu lệnh `return` trong `try `và` catch` block sẽ không được thực thi. Nó sẽ giúp chúng ta chuyển đến `finally` block.

Ví dụ 1:
```js
function test() {
    try {
        return 10;
    } finally {
        console.log("finally");
        return 1;
       }
}
console.log( test() ); // finally 1
```

Ví dụ 2:
```js
function test() {
    try {     
        return 10;
        throw "error"; // this is not executed, control goes to finally
      } catch {
        console.log("catch"); 
        return 1;
      } finally { 
        console.log("finally");
        return 1000;
      }
}
console.log( test() ); // finally 1000
```
# 2. Biến được khai báo trong `try` block sẽ không được hiểu trong `catch` hoặc `finally` block

Nếu chúng ta sử dụng `let` hoặc `const` để khai báo biến trong `try` block, nó sẽ không được hiểu trong `catch` hoặc `finally`. Điều này cũng khá dễ hiểu, vì `let`, `const`  tạo ra một biến chỉ có thể truy cập được trong block bao quanh nó

```js
try {
    let a = 10;
    throw "a is block scoped ";
} catch(e) {
    console.log("Reached catch");
    console.log(a); // Reference a is no defined
}
```
Vậy nếu ở `catch` bạn vẫn muốn sử dụng biến trong block ở `try` thì sao nhỉ? Hãy nhớ JS vẫn còn có `var` mà.  `var` tạo ra biến có phạm vi function, và  theo cơ chế hoisting của JS, việc khai báo sẽ được chuyển lên đầu hàm, lúc này `catch` và `finally` sẽ truy cập được nó.
```js
try {
    var a = 10;
    throw "a is function scoped ";
} catch(e) {
    console.log("Reached catch");
    console.log(a); // 10
}
```

# 3. `catch` mà không cần biến exception
Nếu ngày trước bạn bắt buộc phải dùng `try {  } catch(e) {  }` thì với ES2019, tham số `e `là không bắt buộc. Trong trường hợp không cần xử lý với chi tiết lỗi, bạn không cần truyền vào như trước nữa.
```js
try {
   // code with bug;
} catch {
   // catch without exception argument
}
```

# 4. try…catch sẽ không hoạt động với `setTimeOut`
Nếu có lỗi xảy ra trong code "scheduled" (như` setTimeout`), try..catch sẽ không bắt được lỗi trong trường hợp này. Ví dụ: 

```js
function callback() {
    // error code
}
function test() {
   try {
      setTimeout( callback , 1000);
   } catch (e) {
      console.log( "not executed" );
   }
}
```
Để xử lý trường hợp này, chúng ta cần thêm try...catch vào trong `setTimeout` callback
```js
function callback() {
   try {
     // error code 
   }catch
     console.log("Error caught") ;
   }
}
function test() {
      setTimeout(callback, 1000);
}
```
# 5. Thêm xử lý lỗi global 
Giả sử có lỗi xảy ra và bạn chưa `catch` được nó (ví dụ như lỗi syntax, try...catch sẽ không bắt lỗi này vì nó chỉ bắt lỗi runtime) lúc này, bạn có thể dùng `window.onerror` . Nó sẽ giúp bạn phát hiện ra lỗi và debug dễ dàng hơn.

Khi một lỗi được đưa ra, các đối số sau đây được truyền cho hàm:

* msg - Thông điệp liên quan đến lỗi này
* url - URL của tập lệnh hoặc tài liệu được liên kết với lỗi, ví dụ: / 10 /
* lineNo - Số dòng (nếu có).
* columnNo - Số cột (nếu có).
* error - Đối tượng Lỗi liên quan đến lỗi này (nếu có).

`window.onerror`  đã có sẵn trong các trình duyệt , nhưng lưu ý rằng mỗi trình duyệt sẽ thực hiện` window.onerror`  khác nhau, đặc biệt là có bao nhiêu đối số được gửi đến và cấu trúc của các đối số đó. Bạn có thể tham khảo thêm ở [đây](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror) 

Ví dụ về `window.onerror`
```js
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.log({ msg, url, lineNo, columnNo, error })
// { msg: 'Uncaught ReferenceError: a is not defined',
//   url: 'https://example.com/script.js',
//   lineNo: 6,
//   columnNo: 5,
//   error: 
//    ReferenceError: a is not defined

}
function funcWithError() {
    a; // a is not defined
}
function test() {
    funcWithError();
    console.log("hi"); // this will not be executed
}
test(); 
```

Bài viết đến đây là hết, cảm ơn các bạn đã theo dõi:kissing_heart:.

Hi vọng có thể giúp các bạn có thêm những kiến thức bổ ích.

Nguồn:
- https://levelup.gitconnected.com/5-things-you-dont-know-about-try-catch-finally-in-javascript-5d661996d77c
- https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror