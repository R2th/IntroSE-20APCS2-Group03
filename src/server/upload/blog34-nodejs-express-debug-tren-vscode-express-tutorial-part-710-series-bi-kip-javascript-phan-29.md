![image.png](https://images.viblo.asia/7c017b3b-d3d6-4fa4-b566-c0c6631dee28.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Việc **debug** một **ứng dụng NodeJS nhỏ** hoặc **một function nghi ngờ là có vấn đề** có thể dễ dàng **debug** bằng các phương pháp đơn giản. Tuy nhiên, trong một ứng dụng **Express**, khi sự cố không thể được định vị cho **một function** hoặc **khối đơn lẻ**, chúng ta có thể dễ dàng debug `end-to-end` bằng cách sử dụng trình **debug VSCode**.

Các điều kiện tiên quyết để thực hành được ví dụ trong bài viết này là:

1.  Có sẵn một `Express application`
2.  `Postman` để kích hoạt request
3.  Đã cài đặt `Nodemon` 
4.  Vì `typescript` được sử dụng trong ví dụ, nên `ts-node` cũng phải được cài đặt.

Code được sử dụng trong ví dụ dưới đây có thể được tìm thấy [ở đây](https://github.com/shrirammano/vscode-debugger/tree/express-app) .

Nói qua về Logic của ví dụ này
------

Đối với mỗi `user`, ngày xác nhận sẽ có trong dữ liệu. Nếu `status` của `user` đã được yêu cầu, ứng dụng sẽ trả về "`Active`" nếu ngày xác nhận của user là trong vòng 365 ngày qua, nếu không `status` sẽ được trả về là "`Inactive`".

**Request**: `GET/user-status/:userId`

Thiết lập VSCode Debugger
------

Tất cả các `configure` được thiết lập trên `VSCode Debugger` sẽ có trong `.vscode/launch.json`. Bạn có thể tự động tạo tệp khởi chạy này bằng cách sử dụng “`create a launch.json file`” được đánh dấu trong hình ảnh bên dưới và chọn `configure Node-Js` mà bạn có thể thay thế sau này hoặc tự tạo tệp khởi `launch.json` và thêm code bên dưới.

![image.png](https://images.viblo.asia/e8862369-7d03-43b4-b97e-03b11806bf67.png)

```json
// Hoặc bạn có thể tự tạo tệp với configure trống
{
  "configurations": []
}
```

`Configure` là một mảng các đối tượng. Bạn có thể thêm nhiều `configure` như `debug Unit Test`, `Debug Chrome` cho giao diện `user`, v.v. Đối với ví dụ của chúng ta, chúng ta sẽ sử dụng `Node.js: Nodemon Setup`.

![image.png](https://images.viblo.asia/3e732b92-5b59-4ff2-927d-6910b9306b7c.png)

Chọn Cài đặt `Nodemon` sẽ thêm `configure` bên dưới.

```json
{
  "configurations": [{
    "console": "integratedTerminal",
    "internalConsoleOptions": "neverOpen",
    "name": "Debug Express",
    "program": "${workspaceFolder}/app.ts",
    "request": "launch",
    "restart": true,
    "runtimeExecutable": "nodemon",
    "skipFiles": [
      "<node_internals>/**"
    ],
    "type": "pwa-node"
  }]
}
```

Đôi khi trong dự án file `app.ts` này cũng sẽ nằm vị trí khác lúc đó bạn cũng sẽ config lại cho phụ hợp nhé.

```json
{
....
    "program": "${workspaceFolder}/src/app.ts",
....
}
```

Hãy bắt đầu debug nào
------

Hiện mình đã thiết lập một **breakpoint** tại tệp `app.ts` như hình bên dưới và trình `debug` được khởi động bằng cách nhấn vào `nút màu xanh lục` ở `Debug panel`. Khi trình `debug` đã sẵn sàng, hãy kích hoạt request `GET` từ **Postman**. Trình **debug** bây giờ sẽ đến **breakpoint** của chúng ta.

![image.png](https://images.viblo.asia/199b61db-c855-4e81-bd67-65fc8d46ff18.png)

Như bạn có thể nhận thấy, di chuột qua `userId` sẽ hiển thị `value` của nó. Ngoài ra, thêm nó vào `WATCH` ở phía bên trái sẽ hiển thị `value` miễn là nó nằm trong phạm vi của ngữ cảnh hiện tại.

Nhấp vào mũi tên xuống (tùy chọn thứ 3) trong các `điều khiển Debug`, sẽ đưa chúng ta vào function `getUserStatus`. Sau khi vào, chúng ta nhận được thông tin `user` và giả sử chúng ta phải thay đổi ngày xác nhận thành một ngày khác để `tái hiện Bug` hoặc chỉ đơn giản là muốn test thử.v.v. Chúng ta có thể dễ dàng làm như vậy bằng cách chọn “`Set Value`” trong menu chuột phải của trường.

![image.png](https://images.viblo.asia/517f7278-a3aa-4461-8186-ac5c7da2934c.png)

Khi quá trình `debug` hoàn tất, nhấp vào `Play` trong `điều khiển debug` sẽ đưa bạn đến `breakpoint` tiếp theo nếu có, nếu không, bạn sẽ nhận được `response` trong `Postman`.

Roundup
-----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
------
* https://tuan200tokyo.blogspot.com/2022/11/blog34-nodejs-express-debug-tren-vscode.html