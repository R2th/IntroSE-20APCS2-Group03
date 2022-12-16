## Sơ lược

Lưu ý: Bài viết này được dịch từ : https://dev.to/gregfletcher/what-is-deno-js-and-why-should-you-care-b26. Một số thuật ngữ thông dụng mình sẽ giữ nguyên. Các bạn có thể vào link gốc để tham khảo.

* Deno.js ra mắt phiên bản 1.0.0 vào ngày 13 tháng 5, 2020.
* Deno được tạo ra bởi Ryan Dahl, cũng là người tạo ra Node.js.
* Deno được bảo mật mặc định. Nếu không được cấp quyền, nó không thể truy cập file, network hay environment.
* Deno built-in TypeScript mà không cần config gì thêm.
* Nhiều package ngoài được import bằng url (giống như Go).
* Deno là tên gọi được đảo chữ từ Node và đọc là Deeno (e dài).

## **Khởi đầu**

Vào năm 2018 Ryan Dahl đã có một bài phát biểu ở JSConf EU (hội thảo Javascript ở châu Âu) nói về 10 điều thất vọng đối với Node.js của chính mình.

Trong bài phát biểu, Ryan đã đề cập đến mối quan tâm đối với hệ thống node_module và các legacy API khác sẽ không bao giờ thay đổi. Anh ta để ý rằng JavaScript đã thay đổi nhiều từ khi Node.js ra đời và rằng anh ấy tìm ra cách để tạo một phiên bản Node.js tốt hơn. Anh ta muốn nó tương thích với trình duyệt VÀ môi trường server. Độ bảo mật cũng là điều mà Ryan chú trọng tới.

## Ngày 13 tháng 5 --> Ngày ra mắt

Nhiều thứ đã xảy ra kể từ bài nói chuyện của Ryan ở JSCONF 2018. Nhiều người đã tham gia vào dự án, và nó đã đạt 48k sao trên Github, và dự án đang dần gây được nhiều sự chú ý trong cộng đồng từ trước khi nó chính thức ra mắt.

Chỉ có thời gian mới trả lời được liệu Deno sẽ tiếp tục lớn mạnh hay không nhưng phản ứng ban đầu, theo như người viết bài, là rất lạc quan. 

## Top Syntax Features
### Top Level Await

Không còn bọc ngoài các async functions. Chỉ dùng await syntax cấp cao.
```
const data = await fetch('someapi/data');
```
### Import and URLs

Bạn có thể sử dụng import và bạn không cần NPM install tất cả các package. Trông giống như GoLang, bạn có thể import từ URL.
```
import stuff from 'https://package/url'
```

### TypeScript Built In

Không cần cài đặt TypeScript. Tất cả đã được built-in. Bạn chỉ cần viết code mà thôi!

### Bảo mật mặc định

Deno giới hạn truy cập file, network và environment. Đây là khác biệt lớn với Node.js, khi Node.js cho phép truy cập mọi thứ ngay lập tức.

### ES6 và hơn thế nữa

Không như Node, Deno có cơ hội để kết hợp với syntax JavaScript hiện đại vì có thể xóa bỏ callback hell như Node gây ra.

### Tương thích với Web

API của Deno dĩ nhiên tương thích với Web

### Web Assembly

Deno hỗ trợ cho wasm binaries. (Bạn có thể đọc về wasm binaries ở đây: https://blog.vietnamlab.vn/2018/08/08/gioi-thieu-webassembly-tuong-lai-cua-web/).

## Tóm tắt

Deno là một dự án thú vị mà bạn nên vọc thử!

Tôi muốn làm rõ rằng bài viết này không phải để hạ bệ Node.js. Node.js rất tuyệt, tôi rất thích và sẽ tiếp tục dùng Node.js. Chỉ là tuyệt hơn khi có một phiên bản mới và cải thiện hơn ngoài kia trong tương lai phải không?