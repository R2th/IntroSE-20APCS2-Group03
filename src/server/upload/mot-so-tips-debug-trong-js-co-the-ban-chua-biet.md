**Debug**, một việc không còn xa lạ gì đối với tất cả các lập trình viên, chúng ta dành hàng giờ mỗi ngày để sửa lỗi, **debug**, đôi khi nó còn chiếm nhiều thời gian hơn cả việc phát triển các tính năng mới.  Thế nhưng, liệu các bạn đã tận dụng hết các công cụ, Apis giúp cho việc **debug** trở nên nhanh và dễ dàng hơn chưa, là một lập trình viên `Frontend` phải làm việc với rất nhiều Framework và Library Js khác nhau, hôm nay mình xin chia sẻ với mọi người một số mẹo **debug** với Js mình hay sử dụng trong các dự án mà mình đã và đang tham gia phát triển nhé.

## 1. debugger;
Mình học được mẹo này khi tham gia vào một dự án based trên `React`, khi mọi người muốn kiểm tra thứ tự chạy của các đoạn code trong Js thì mọi người thường sử dụng `console.log` hoặc tự tay mình đặt các `breakpoint` trong `debugger` của trình duyệt. Thế nhưng, nếu như mọi người muốn đặt `breakpoint` trong các ứng dụng `react` hay `angular` thì sao ?. Nếu các bạn mới tìm hiểu về các thư viện, Framework có sử dụng các `code bundler` (như `webpack` chẳng hạn) mà các bạn không biết phải làm thế nào để truy ra file cần đặt `breakpoint`. Hoặc, nếu như các bạn phải **debug** ở một trình duyệt mới và không muốn mất thời gian để tìm cách đặt `breakpoint` trong `debugger` của trình duyệt đó thì các bạn có thể sử dụng **debugger;** để đặt `breakpoint` ngay trong chính file Js của các bạn nhé !.

Ví dụ:

`Js thuần`
```js
if(true) {
    debugger; // *** debugger của trình duyệt sẽ tự động dừng ở đây
}

debugger;

console.log('hello worl');
```

`React` (`angular` cũng tương tự nhé, trình duyệt sẽ dừng ở bất cứ dòng code nào có **debugger;**).
```js
import React from "react";

export default function App() {
    const handleOnClick = () => {
        debugger;  // *** debugger của trình duyệt sẽ tự động dừng ở đây
        console.log('hello world');
    }

    return (
        <button className="App" onClick={handleOnClick}>
            Try Clicking me now
        </button>
    );
}
```

## 2. Hiển thị các property của một object/array dưới dạng bảng
Các bạn có thể hiển thị các property của một object/array dưới dạng bảng bằng method `console.table` để kiểm tra các property một cách dễ dàng hơn.

Các bạn cần lưu ý rằng, `console.table` chỉ in ra các property chứ không in ra các `method` đâu nhé.

Ví dụ:

```js
obj = {
    a: 1,
    b: 2,
    c: function() {} // *** method sẽ không được in
}

console.table(obj);
```

![](https://images.viblo.asia/2e704eeb-b22d-4176-97d7-8dd0306ffccd.png)

```js
arr = [
    1,
    2,
    3,
    4,
    function() {} // *** method sẽ không được in
]
```

![](https://images.viblo.asia/25143d45-2257-4f65-8b7c-9736230a4d0d.png)

## 3. Log giá trị ngay khi đang debug bằng debugger
Khi đang **debug** bằng `debugger`, các bạn có thể mở một cửa sổ `Console` nhỏ ngay dưới `debugger` để lấy ra các giá trị nằm trong **scope** mà `breakpoint` có thể truy cập nhé.

VÍ dụ:

```js
const name = 'admin';
const password = '123456';

if(name === 'admin' && password === '123456') {
    debugger;
}

console.log('hello world');
```

![](https://images.viblo.asia/b84574ce-4f7c-4ab7-a15b-872354842bf7.png)

Nếu như bạn không thấy cửa sổ `Console` khi `debug` thì hãy click vào nút 3 chấm phía trên cùng bên phải của `Inspector` và chọn `Show console drawer` là bạn sẽ có ngay một cửa sổ `Console` để **debug**.

![](https://images.viblo.asia/4566c72f-b555-416f-aa90-c33264aa0549.png)

## 4. Format các file bị minify
Các bạn có thể format các file bị minify bằng cách chọn một file và click vào nút `Pretty print` như trong hình nhé.

![](https://images.viblo.asia/566a1b2a-760d-4c01-b5cb-72afb136f246.png)

## 5. Mô phỏng trường hợp user không có internet
Bạn có thể vào tab `Network` và chọn nút `Online` như trong hình, `browser` sẽ giúp chúng ta mô phỏng các tình trạng internet khác nhau của người dùng.

![](https://images.viblo.asia/98486843-c8f0-46af-b99d-48a0a041c49d.png)

## 6. Sửa giá trị của biến và tìm scope của một function ngày trong debugger
Bạn có thể sửa giá trị một biến bằng cách đặt một `breakpoint` đằng sau biến đó và sửa giá trị của nó bằng cách click 2 lần vào tên của biến đó trong mục `script`, `local` và `global` (tùy vào `scope` của biến mà nó sẽ ở trong mục `script`, `local` hay `global`).

Các bạn còn có thể tìm ra giá trị của `this` của một function là gì khi check mục `script` nữa nhé.

![](https://images.viblo.asia/2e1c6b47-d1bf-492d-92a8-0b674293e2e6.png)

## Lời kết
Trên đây là một số mẹo **debug** Js mà mình biết và đã áp dụng trong rất nhiều dự án khác nhau, mong rằng những phương pháp trên sẽ giúp cho quá trình **debug** của các bạn trở nên nhanh chóng và dễ dàng hơn.