# Debug nodejs app với Visual Studio Code
Trong bài viết này mình sẽ hướng dẫn debug nodejs app với framework ExpressJS. Đối với các framework, ngôn ngữ khác các bạn có thể tìm hiểu và config tương tự
## 1. Chuẩn bị môi trường
### a. Express app
* Cấu trúc thư mục của mình như sau: 

![](https://images.viblo.asia/ee747b52-2d35-4ae0-8852-26226eda4f33.png)
* Thư viện cần cài đăt: ***express***. Để cài đặt thư viện các bạn vào terminal của thư mục hiện tại và thực hiện lệnh
    ```
    npm i express
    ```
* Mã nguồn file index.js
    ```
    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
      const message = 'Hello World'
      res.send(message)
    })

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
    ```

* Mình lấy ví dụ ***getting started*** trên trang chủ của ***Express***. Các bạn có thể tham khảo thêm [tại đây.](https://expressjs.com/en/starter/hello-world.html)
### b. Thêm cấu hình debug
* Để thực hiện debug, chúng ta vào phần Run and Debug trên VSCode -> chọn **create a launch.json file** -> Chọn Nodejs

![](https://images.viblo.asia/c7751205-122a-41ec-be35-e6510a069883.png )

* VSCode sẽ tự sinh cho chúng ta một file là `launch.json` bao gồm các khai báo cho việc debug. Nội dung file như sau
    ```
    {
      // Use IntelliSense to learn about possible attributes.
      // Hover to view descriptions of existing attributes.
      // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
      "version": "0.2.0",
      "configurations": [
        {
          "type": "pwa-node",
          "request": "launch",
          "name": "Launch Program",
          "skipFiles": [
            "<node_internals>/**"
          ],
          "program": "${workspaceFolder}\\index.js"
        }
      ]
    }
    ```
* Một số thông tin quan trọng:
    * "type": "pwa-node" -> sử dụng Javascript Debugger
    * "name": "Launch program" -> Tên của luồng chạy debug. Có thể đổi tên thành **debug nodejs** cho dễ hiểu 😀
    *  "program": "${workspaceFolder}\\index.js". -> khai báo đầu vào của luồng debug. Ở đây chương trình của mình chạy đầu vào ở file index.js nên sẽ khai báo như trên. `workspaceFolder` trỏ đến thư mục làm việc hiện tại của chương trình.
## 2. Thực hiện debug
### a. Chọn breakpoint
![](https://images.viblo.asia/ef681aed-7dd4-4abc-b44b-51650e047355.png)

* Như hình trên, mình chọn breakpoint ở dòng số 6 để kiểm tra giá trị của biến message khi thực hiện debug
### b. Thực hiện debug
![](https://images.viblo.asia/b60b88f4-6e6e-46c8-90ca-138805d4ba29.png)
* Chọn biểu tượng phần debug
* Chọn tác vụ debug có tên trùng với phần name đã khai báo trong file launch.json
* Nhấn vào biểu tượng debug(hình tam giác màu xanh) để thực hiện debug
* Bây giờ chúng ta có thể vào trình duyệt, gõ địa chỉ `localhost:3000`
* Chương trình sẽ được gọi và dừng lại tại điểm breakpoint đã đặt trước
* Giờ chúng ta có thể nhấn F10 để chạy qua dòng khai báo giá trị của biến `message` và xem giá trị của biến 
là **Hello World!** khi trỏ vào cũng như bảng giá trị local ở bên cạnh

![](https://images.viblo.asia/5c309f53-9d6d-480d-b4a2-6e575e161a7c.png)

Các thao tác debug khác như  `continue, step out, step over, step into, stop, start`, hay như các config khác các bạn có thể tham khảo thêm trên document của visual code [tại đây!](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)