# Lập trình với JavaScript hàng ngày nhưng bạn có biết, đằng sau các đoạn code thì JS đang hoạt động như thế nào? Bài viết này sẽ đề cập đến các khái niệm bạn cần nắm khi lập trình với JavaScript.
## 1. Scope
- Là nơi bạn truy cập tới các khai báo của bạn thì gọi là **scope**
- Có 2 loại Scope đó là: **Global Scope** và **Local Scope**. Điểm khác nhau giữ chúng là đối với Global Scope, bạn có thể truy cập các khai báo từ bất cứ đâu trong code của bạn còn Local Scope, bạn chỉ có thể truy cập tới chúng bên trong khối code đó mà thôi(***khối code bạn có thể hiểu là trong cặp ngoặc {}*** ). Một ví dụ minh họa cho việc này.
 ![](https://images.viblo.asia/f35074ae-2087-4065-8c5a-defb4956dcd9.png)
- Qua ví dụ trên bạn có thể hiểu thêm về code block và các điểm khác nhau giữa Global Scope và Local Scope.
- Note: Bạn cần chú ý sự khác biệt giữa 2 kiểu khai báo biến **var và let** về **scope** (sẽ đề cập ở phần sau).
## 2. Hoisting
- Đây là cơ chế của JavaScript cho phép thực hiện sử dụng các thành phần trước khi dc khai báo. Ví dụ bạn có thể call Fuction trước khi định nghĩa nó.
```
foo();
function foo() {
   // Your function code
}
```
Như trong cấu trúc bên trên, JS sẽ xử lý đoạn code như sau:
1.  Đưa khai báo lên trên đầu(hoisting)
2. Thực thi đoạn code bên trong hàm
Trong khi running code sẽ dc tổ chức lại như thế này:
```
//Khai báo đưa lên trên đầu
function foo() {
   // Your function code
}
foo();

```
## 3. IIFE
IIFE viết tắt của **Immediately Invoked Function Expression** Nghĩa là khi bạn khai báo hàm, hàm sẽ dc gọi ngay lập tức. Việc này cho phép tạo ra các biến và fuction **private**.
```
(function () {
  // …
})();
```
- Bạn thấy rằng toán tử gọi hàm () được viết ngay phía sau khai báo
 ![](https://images.viblo.asia/f80d1c46-2bcf-4242-8d8c-d6ed6528a5ae.png)
 ## 4. Currying
 Coi hàm như là 1 biến truyền vào trong argument
 
```
function curry(f) { 
    // curry(f) does the currying transform   
    return function(a) 
    {     
        return function(b) 
        {       
            return f(a, b);     
        };   
     }; 
}  
// usage 
function sum(a, b) {
   return a + b; 
}  
let curriedSum = curry(sum);  
alert( curriedSum(1)(2) ); 
// 3
```
- Rõ hơn thì function được coi như là 1 biến.
 ![image.png](https://images.viblo.asia/709a6801-0e97-4aeb-9ab1-baddac728ea7.png)
## 5. Sự khác nhau giữa let và var
- Bạn phải tìm hiểu khái niệm scope ở bên trên để hiểu rõ điều này
![image.png](https://images.viblo.asia/9c61db81-9593-44a5-b14b-11e9b857fe1e.png)
- Khi khai báo với let, thì a là null khi sử dụng block scope
- Khi khai báo với var thì là 1 vì sử dụng function scope
![image.png](https://images.viblo.asia/2b095792-0227-4004-ab77-2dfb6e2c6cd7.png)
## 6. Kết luận.
Một vài khái niệm nữa sẽ đề cập ở phần sau nhé mn🍷.