> Mọi thứ trong JavaScript diễn ra bên trong một **“Execution Context”**(ngữ cảnh thực thi)

Có hai giai đoạn trong **“Execution Context”** gồm:

– Giai đoạn **“Memory Creation”** (cấp phát bộ nhớ): là lúc tất cả các biến và hàm được cấp phát bộ nhớ dưới dạng **key: value**. 

   Một tên khác cho phần này là **“Variable Environment”**

– Giai đoạn **“Code Execution”** (thực thi code): là lúc code được thực thi theo thứ tự từ trên xuống dưới, từng dòng một.

   Một tên khác cho phần này là **“Thread of Execution"**

Vì thế:

> JavaScript is a **synchronous** **single-threaded** language

---

Giả sử có chương trình tính bình phương như sau:

```js
1. let n = 2;
2. function square(num) {
3. 	let ans = num. * num;
4. 	return ans;
5. }
6. const square2 = square(n);
7. const square4 = square(4);
```

Khi chương trình JS khởi chạy, một **execution context** ở global sẽ được tạo. 

Ở giai đoạn **“Memory Creation Phase”**, bộ nhớ được cấp cho tất cả các biến và các hàm. 

Chương trình bắt đầu đọc từ trên xuống dưới và cấp bộ nhớ:

– Dòng 1 cấp biến `n` với `undefined`

– Dòng 2 cấp cho hàm `square` bộ nhớ cho toàn bộ nội dung của nó,

– Dòng 6 cấp biến `square2` với `undefined`

– Dòng 7 cấp biến `square4` với `undefined`

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/08/js-execute1.png)

Tiếp tục qua giai đoạn **“Code Execution”**, code sẽ được thực thi theo thứ tự:

– Dòng 1, gán 2 cho biến `n`

– Dòng 2 đến 5 bỏ qua vì không có gì để thực thi

– Dòng 6, hàm `square(2)` được gọi, một **execution context** giành riêng cho hàm này được tạo, mình tạm gọi là **“square execution context”**

  – Giai đoạn **Memory Creation Phase** của **“square execution context”**, cấp bộ nhớ cho `num` và `ans`
  
  ![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/08/js-execute2.png)
  
  – Giai đoạn **Code Execution** của **“square execution context”**, thực thi:

  – Dòng 2, `num` được gán giá trị là `2` từ đầu vào khi gọi hàm `square(n)`

   – Dòng 3, `ans` được gán giá trị 2 * 2, là `4`.

   – Dòng 4, trả về giá trị của ans cho **global execution context** ở dòng số 6, là nơi gọi hàm `square(n)`. Sau khi trả về giá trị, toàn bộ **square execution context** bị xóa đi.
  
  ![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/08/js-execute3.png)
  
  – Dòng 7, hàm `square(4)` được gọi, một execution context giành riêng cho hàm này được tạo, mình tạm gọi là “square 4 execution context”

  – Hai giai đoạn tương tự như khi gọi `square(2)` ở trên

  – Dòng 4, trả về giá trị của `ans` cho **global execution context** ở dòng số 7, là nơi gọi hàm `square(4)`

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/08/js-execute-4.png)

Quá trình ở trên thường được gọi là **call stack**

Mỗi **execution context** được tạo sẽ được bỏ vào(**push**) vào ngăn xếp(**stack**)

Mỗi **execution context** bị xóa sẽ được lấy ra khỏi(**pop**) ngăn xếp(**stack**)

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/08/js-execute5.png)

> Call Stack maintain the “order of execution” of execution context

Bạn có thể trực tiếp xem được callstack của chương trình với devtools của Chrome. Hình minh họa sau được mình lấy bằng cách chạy chương trình trên với breakpoint ở dòng số 4 trong hàm square khi gọi với square(n)

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/08/call-stack.png)

Call Stack còn có nhiều tên tương tự khác như là: “Execution Context Stack”, “Program Stack”, “Control Stack”, “Runtime Stack”, “Machine Stack”

Đây chính là cách JS Engine thực thi code.

(Ref: https://www.youtube.com/watch?v=iLWTnMzWtj4)

[Bài viết gốc](https://beautyoncode.com/dieu-gi-xay-ra-khi-chay-mot-chuong-trinh-javascript/) nằm ở blog cá nhân của mình, mời bạn ghé chơi.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!