# 1. Giới thiệu
Cái tên `Node.js` chắc hẳn đã không còn xa lạ với dân lập trình web. `Node.js` được tạo bởi Ryan Dahl năm 2009 dựa trên nền tảng Google V8 JavaScript engine. Như chúng ta đã biết `Node.js` là single thread sử dụng single-thread event loop để xử lý đồng thời nhiều `request`.

Với các ngôn ngữ server-side phổ biến như PHP, .NET, JAVA...sử dụng cơ chế multi-threads, chúng ta có thể dễ dàng hình dung ra cách hoạt động. Với mỗi một `request` đến `server` sẽ tạo ra một thread riêng để xử lý. Nhưng `Node.js` thì chỉ có 1 thread để xử lý tất cả các `request`. Để có thể hiểu được tại sao `Node.js` chỉ có 1 thread nhưng có thể xử lý đồng thời nhiều `request`, chúng ta cùng lướt qua một số khái niệm cơ bản sau.

# 2. Call Stack

Cái đầu tiên chúng ta tìm hiểu sẽ là `call stack`. Hiểu đơn giản thì `call stack` là nơi chứa các hàm đang được thực thi. `call stack` hoạt động theo cơ chế FILO, dưới đây là một ví dụ nhỏ:
```
function foo() {
    console.log('foo');
}

function bar() {
    foo();
    console.log('bar');
}

bar();
```

- `bar()` được gọi và được đẩy vào `call stack`
- `foo()` được gọi và được đẩy vào `call stack`
- In ra `foo`
- `foo()` bị xóa khỏi `call stack`
- In ra `bar`
- `bar()` bị xóa khỏi `call stack`

# 3. Event Loop & Event Queue

Một ví dụ khác

```
function foo() {
    console.log(2)
}

function bar() {
    console.log(1);
    setTimeout(foo, 0);
    console.log(3);
}

bar();
```

Kết quả trả về sẽ là
```
1
3
2
```

Mặc dù đã đặt thời gian là 0 nhưng mà `2` vẫn bị in ra sau `3`. Nguyên nhân là `setTimeout` là 1 hành động `async` nên `foo()` đã không được thực thi ngay lập tức mà bị đẩy vào `event queue`. 

`event loop` là 1 vòng lặp liên tục kiểm tra xem nếu `call stack` rỗng thì sẽ nhặt một event từ `event queue` và đẩy vào `call stack`. Vì `call stack` phải rỗng thì event từ `event queue` mới được đẩy vào nên kết quả sẽ là:

- `bar()` được gọi và được đẩy vào `call stack`
- In ra `1`
- `setTimeout` được thực thi, `bar` được đẩy vào `event queue`
- In ra `3`
- `bar()` bị xoá khỏi `call stack`
- `foo()` được đẩy vào `call stack`
- In ra `2`
- `foo()` bị xoá khỏi `call stack`

# 4. Kết luận

Mỗi `request` đến Node server đều được coi là một `event` và được đẩy vào `event queue`. Với các ví dụ và giải thích ở trên, chắc hẳn các bạn cũng đã hiểu được vì sao `Node.js` chỉ có 1 thread nhưng lại có thể xử lý đồng thời nhiều `request`.

Tuy ở phần giới thiệu mình có viết `Node.js` chỉ có 1 thread nhưng thực tế không hoàn toàn như vậy. `Node.js` có các thread khác chạy song song để xử lý các tác vụ bất đồng bộ. Ở ví dụ về `event loop`, nếu thay `setTimeout` bằng 1 hàm khác để lấy dữ liệu từ `DB` thì tác vụ connect tới `DB` để lấy dữ liệu sẽ được thực thi trên một thread khác và sẽ đẩy `callback` vào `event queue` sau khi kết thúc.