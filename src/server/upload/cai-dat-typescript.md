Trong bài viết này bạn sẽ học cách cài đặt môi trường để sử dụng TypeScript nhé.<br>
Các công cụ bạn cần chuẩn bị để cài đặt để sử dụng TypeScript như sau:<br>
- Node.js : Node.js là môi trường cái bạn sẽ chạy biên dịch code TypeScript. Lưu ý rằng bạn không cần có kiến thức về node.js.
- TypeScript compiler: Là một module Node.js cái sẽ biên dịch code TypeScript thành code JavaScript.
- Visual Studio Code(VS code): Là một editor cái hỗ trợ code TypeScript. Bạn cũng có thể sử dụng các editor khác nhé.

Nếu bạn sử dụng VS code, bạn có thể cài đặt phần mở rộng sau để tăng tốc quá trình phát triển:<br>
- Live Server : cho phép bạn khởi chạy một server local cho việc phát triển.

### Cài đặt Node.js
Để cài đặt node.js, bạn hãy làm theo các bước sau:<br>
- Di chuyển đến [node.js download page](https://nodejs.org/en/download/)
- Download node.js phù hợp với hệ điều hành của bạn (Windows, macOS hoặc Linux)
- Tiến hành cài đặt package đã downloaded về
- Xác nhận cài đặt bằng cách mở terminal trên macOS và Linux hoặc command line trên Windows và gõ command **node -v** . Nếu bạn thấy hiển thị version của node.js thì bạn đã cài đặt thành công node.js trên máy tính của bạn.

### Cài đặt TypeScript compiler
Để cài đặt TypeScript compiler, bạn hãy mở erminal trên macOS và Linux hoặc command line trên Windows và gõ command:
```
npm install -g typescript
```
Sau khi cài đặt, bạn có thể gõ command bên dưới để kiểm tra version hiện tại của TypeScript compiler:<br>
```
tsc --v
```
Nó sẽ hiển thị version như thế này:<br>
```
Version 4.6.4
```
Nếu bạn đang trên windows và gặp lỗi:<br>
```
'tsc' is not recognized as an internal or external command,
operable program or batch file.
```

Để fix lỗi này bạn hãy thêm đường dẫn  'C:\Users\<user>\AppData\Roaming\npm' vào biến môi trường PATH nhé. Chú ý bạn hãy thay đổi < use > đến user trên windows của bạn.<br>
    
### Cài đặt VS Code
 Để cài đặt VS Code, bạn hãy làm theo các bước sau:<br>
    - Di chuyển đến [VS Code download page](https://code.visualstudio.com/download)<br>
    - Tải xuống phiên bản VS Code mới nhất phù hợp với hệ điều hành của bạn (Windows, macOS hoặc Linux)<br>
    - Tiến hành cài đặt package đã downloaded về<br>
    - Mở VS Code.<br>
    Sau khi mở VS Code, bạn sẽ thấy VS Code như hình sau:<br>
    
![](https://images.viblo.asia/2781d1cd-5833-4194-8927-a6871c0aeaef.png)

Để cài đặt **Live Server** extension, bạn hãy làm theo các bước sau:<br>

![](https://images.viblo.asia/758ab9b0-5b79-43aa-acf9-750811921100.png)

- Click vào tab **Extensions** để tìm extensions cho VS Code.
- Gõ text **live server** để tìm kiếm.
- Click button **install** để cài đặt extension.

Vậy là quá trình cài đặt TypeScrip của chúng ta đã hoàn thành rồi nhé!