Đây là phần thứ hai trong loạt bài viết về Functional Programming của mình. Nếu bạn đã bỏ lỡ bài viết trước về [Immutability và Pure Functions](https://viblo.asia/p/functional-programming-part-1-immutability-va-pure-functions-Qbq5Q9VJ5D8), thì mình khuyên bạn nên đọc nó trước (trừ khi bạn đã biết về các khái niệm này).

-----

# Currying
Hôm nay, chúng ta sẽ tìm hiểu về Currying. Vậy nó là cái gì? Nói một cách ngắn gọn thì đó là một kỹ thuật giúp bạn có thể gọi **một phần** hàm của mình để tạo ra một hàm hoàn toàn mới, hàm mới này sẽ bớt đi một số tham số so với hàm trước đó (các tham số bị bớt đi này được apply sẵn vào hàm mới ngay khi hàm được gọi).
<br>

Để tạo ra một curried function, thay vì khai báo hàm như thế này:
```javascript
function add (a, b) {
    return a + b
}
```

Chúng ta sẽ khai báo như thế này:
```javascript
function add (a) {
    return function (b) {
        return a + b
    }
}
```

Chắc là các bạn sẽ thấy cách khai báo này hơi kì. Ở đây, hàm bên trong có quyền truy cập vào `a` do chúng ta áp dụng closure (một hàm có quyền truy cập vào tất cả các biến được khai báo bên ngoài nó).
<br>

Các bạn chắc hẳn sẽ thấy các hàm như thế này khó đọc hơn các hàm được viết theo cách “bình thường”. Nhưng may mắn cho chúng ta, hàm này có thể được cấu trúc lại bằng cú pháp ES6 như sau:
```javascript
const add = a => b => a + b;
```

Có thể bạn sẽ thấy lạ nếu bạn chưa từng thấy cú pháp này trước đây. Ở đây mình đã dùng cú pháp arrow function của ES6. Lưu ý rằng mình không sử dụng từ khóa `return` ở đây. Khi bạn ngay lập tức trả về một giá trị trong hàm của mình, bạn có thể loại bỏ từ khóa return và trình thông dịch vẫn sẽ hiểu được nó. Bạn có thể bỏ luôn cả ngoặc `{}` để có thể viết gọn thành 1 dòng. Cách return như thế này được gọi là implicity return.
<br>

Vậy, làm thế nào để gọi hàm trên?
```javascript
// Gọi hàm được viết theo cách "bình thường"
add(1, 2) // 3

// Gọi hàm viết theo kiểu curried (bất kể với syntax ES5 hay ES6)
add(1)(2) // 3
```

Một số người sẽ cho rằng cách gọi của curried function "xấu" hơn vì có nhiều dấu ngoặc đơn. Nhưng rồi bạn sẽ quen với nó. Hơn nữa, khi chúng ta tìm hiểu sâu thêm về Functional Programming, bạn sẽ bắt đầu thấy được những lợi ích to lớn của việc viết curried function.

# Partial application
Vậy thì, cách viết như thế này sẽ bổ sung cho chúng ta thêm điều gì? Giả sử bạn thường xuyên cần phải cộng một số với 2. Bạn có thể tạo một hàm mới chỉ để thực hiện điều đó. Mình biết ví dụ này khá vô dụng, nhưng do chỉ là ví dụ nên mình chỉ làm đơn giản như vậy (tuy nhiên mình nghĩ các bạn có thể hình dung ra, với một hàm bàn đầu có nhiều logic thì việc sử dụng currying để sử dụng chỉ một phần logic của nó là rất hữu ích).
```javascript
// Tạo một hàm mới
const add2 = add(2);

add2(1) // 3
add2(8) // 10
```

Kỹ thuật này được gọi là áp dụng một phần (Partial application) vì chúng ta không áp dụng hoàn toàn hàm ban đầu. Chúng ta gọi nó với đối số đầu tiên để trả về hàm bên trong (mà không có đối số của nó). Hàm bên trong sẽ có quyền truy cập vào đối số của hàm bên ngoài nhờ closure.
<br>

Để làm rõ hơn, hãy để mình thể hiện cho bạn dưới một cách khác khi chúng ta gọi ta `add(2)`.
```javascript
// một biến 'a' được gán giá trị 2,
// hàm bên trong có thể truy cập nó.
const a = 2;

//'add2' được gán giá trị là hàm bên trong
const add2 = function (b) {
    return a + b;
}
```

-----

Hy vọng rằng bây giờ các bạn đã hiểu một cách cơ bản currying nghĩa là gì. Trong bài viết tiếp theo, chúng ta sẽ áp dụng nhiều hơn kĩ thuật này khi chúng ta tìm hiểu về [compose](). Bài viết tiếp theo chắc hản sẽ rất thú vị, vì theo mình, đây là một trong những thủ thuật hay và hữu ích nhất trong Functional programming. Hẹn gặp lại các bạn!

-----

*Source: https://levelup.gitconnected.com/functional-programming-for-javascript-developers-currying-2d16766909e9*