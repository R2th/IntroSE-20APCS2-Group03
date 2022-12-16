![](https://images.viblo.asia/5fee8655-3611-436f-aa0c-d001724870f4.jpeg)

Dưới đây là một bộ sưu tập nhỏ các mẹo, thủ thuật và tiện ích mở rộng và lọc chúng để chỉ giữ những thứ hữu dụng nhất cho web developer. 

# Làm cho nó đẹp và thân thiện
##  1. Material Theme & Icons
```
Nếu nó thực sự tốt và thân thiện, bạn sẽ yêu thời gian dành cho nó. 
```

Hãy tưởng tượng một epic theme kết hợp với các epic icons. [Material Theme Icons ](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) là một sự thay thế tuyệt vời để thay thế các biểu tượng VS Code mặc định. Danh mục lớn các biểu tượng được thiết kế tích hợp trơn tru với chủ đề làm cho nó đẹp hơn. Điều này sẽ giúp bạn tìm thấy các tập tin của bạn một cách dễ dàng hơn.

![https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme](https://images.viblo.asia/9d7c9184-ddec-449a-9dc4-e1d3c42eab3e.jpg)

## 2. Zen Mode with Centered Layout
Bạn có thể đã biết Zen Mode View, còn gọi là chế độ Distraction Free View (đối với những người đến từ Sublime Text) trong đó mọi thứ (trừ code) được xóa để cung cấp cho bạn sự gần gũi thực sự với trình code editor. Bạn có biết bạn có thể căng giữa bố cục để giúp bạn đọc code của mình như thể bạn đang ở trong trình xem PDF hay không? Điều này thực sự sẽ giúp bạn tập trung vào một chức năng hoặc nghiên cứu code người khác. 

**Zen Mode:** *[View > Appearance > Toggle Zen Mode]*

**Center Layout:** *[View > Appearance > Toggle Centered Layout]*

![](https://images.viblo.asia/eefae93c-44de-4573-b750-dae5ea8ef12a.gif)

## 3. Fonts With Ligatures
Phong cách viết giúp bạn đọc dễ dàng và thuận tiện. Bạn có thể làm cho editor của bạn trông đẹp hơn với phông chữ tuyệt vời hơn cùng với  [ligatures](https://en.wikipedia.org/wiki/Typographic_ligature). Dưới đây là 6 trong số các phông chữ tốt nhất hỗ trợ chữ [ligatures](https://www.slant.co/topics/5611/~monospace-programming-fonts-with-ligatures) (chữ ghép).

![](https://images.viblo.asia/3e1459cb-cafb-431f-b1d1-26f5c844e367.gif)

Bạn có thể dùng thử [Fira Code](https://github.com/tonsky/FiraCode), là nguồn mở và tuyệt vời. Đây là cách bạn thay đổi phông chữ trong VSCode sau khi cài đặt nó.
```
"editor.fontFamily": "Fira Code",
"editor.fontLigatures": true
```
![](https://images.viblo.asia/ec1a9a99-2f05-4af1-b925-2cb863e204c1.png)
## 4. Rainbow Indent
Extension này tô màu phần indent ở phía trước văn bản của bạn xen kẽ bốn màu khác nhau.
![](https://images.viblo.asia/8f71c49c-d467-4487-a12e-8a5d1b2f07dd.png)
## 5. Title Bar Customization
Đây là một tinh chỉnh hình ảnh tuyệt vời. Tôi đã sao chép nó từ [Wes Bos](https://medium.com/@wesbos) trong một trong những bài học React & GraphQL của anh ấy. Về cơ bản, anh ấy đã chuyển đổi màu sắc thanh tiêu đề trên các dự án khác nhau để dễ dàng nhận ra chúng và giúp khán giả phân biệt giữa chúng. Điều này thực sự hữu ích nếu bạn làm việc trên các ứng dụng có thể cùng code hoặc tên tệp, ví dụ: ứng dụng di động
# Faster Coding
## 1. Tag Wrapping
Nếu bạn không biết [Emmet](https://emmet.io/), thì có lẽ bạn là người thích gõ tất cả. Emmet cho phép bạn nhập mã viết tắt và nhận các thẻ tương ứng được trả về. Điều này được thực hiện bằng cách chọn một loạt mã và gõ lệnh 

![](https://images.viblo.asia/6cfbfd62-b934-42a4-b8b5-36c004f51b9a.gif)

## 2. Balance Inwards and Outwards
Bạn có thể chọn toàn bộ thẻ trong VS Code bằng cách sử dụng *balance inward* và *balance outward*  của Emmet commands. Thật hữu ích khi liên kết các lệnh này với các phím tắt, giống như *Ctrl + Shift + Up Arrow*  cho Balance Outward và *Ctrl + Shift + Down Arrow* cho Balance Inward.

![](https://images.viblo.asia/ee7861e6-a4b6-4622-86b9-53a53e4070c7.gif)

## 3. Turbo Console.log()
Không phải ai cũng thích gõ các câu lệnh rất dài như console.log (). Nó có thể thực sự gây khó chịu, chủ yếu là khi bạn chỉ muốn lấy ra thứ gì đó thực sự nhanh, xem giá trị của nó, sau đó tiếp tục coding. 
Điều này được thực hiện với một phần mở rộng được gọi là [Turbo Console Log](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log). ** Nó cho phép ghi nhật ký của bất kỳ biến nào trên dòng bên dưới với tiền tố tự động theo cấu trúc mã. Bạn cũng có thể bỏ uncomment/comment *alt+shift+u/ alt+shift+c* tất cả console.log () được thêm bởi phần mở rộng này.
Hơn nữa, bạn cũng có thể xóa tất cả chúng bằng *alt+shift+d*:

![](https://images.viblo.asia/70ef1705-73d5-4dce-a619-fdf693c861ab.gif)
## 4. Live server
Đây là một tiện ích mở rộng tuyệt vời giúp bạn khởi chạy một local development server  với tính năng tải lại trực tiếp cho các trang tĩnh và động. Nó có một hỗ trợ tuyệt vời cho các tính năng chính như: HTTPS, CORS,  custom localhost addresses và port. 

[Tải về tại đây](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

![](https://images.viblo.asia/208c89a4-33ce-4d92-bfbe-51b28560c2da.gif)

Nó thậm chí có thể cho phép bạn chia sẻ localhost của mình, nếu được sử dụng với [VSCode LiveShare](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare).
## 5. Copy/Paste with Multiple Cursors
Một trong những lần làm tôi ngạc nhiên khi sử dụng VS Code xảy ra khi tôi chỉnh sửa nhiều dòng bằng cách thêm các con trỏ trên các dòng khác nhau. Rất lâu sau, tôi thấy một ứng dụng rất tốt cho tính năng này. Bạn có thể sao chép và dán nội dung được chọn bởi những con trỏ đó và chúng sẽ được dán chính xác theo thứ tự chúng được sao chép. 

Kiểm tra bên dưới:

![](https://images.viblo.asia/c92c6b18-249c-448b-9948-a074c07e69b0.gif)

## 6. Breadcrumbs and Outlines
Breadcrumb hiển thị vị trí hiện tại và cho phép bạn nhanh chóng điều hướng giữa các biểu tượng và tệp. Để bắt đầu sử dụng Breadcrumbs, hãy bật nó bằng lệnh *View > Toggle Breadcrumbs* hoặc thông qua *breadcrumbs.enabled* được bật.

Outline View là một phần riêng biệt ở phía dưới của File Explorer Tree. Khi được mở rộng, nó sẽ hiển thị symbol tree của trình soạn thảo hiện đang hoạt động.

![](https://images.viblo.asia/59d3052f-d50b-441e-9c14-2c41051c1876.gif)

# Miscellaneous
```
Những điều chỉnh nhỏ thay đổi mọi thứ
```
## 1. Code CLI
VS Code có giao diện dòng lệnh mạnh mẽ cho phép bạn kiểm soát cách bạn khởi chạy trình chỉnh sửa. Bạn có thể mở tệp, cài đặt tiện ích mở rộng, thay đổi ngôn ngữ hiển thị và output diagnostics (chẩn đoán đầu ra) thông qua các tùy chọn dòng lệnh

![](https://images.viblo.asia/e1b6c456-7395-4334-b6c1-c855991f13ef.png)

Hãy tưởng tượng bạn chỉ cần *git clone <repo-url>* một repository và bạn muốn thay thế phiên bản hiện tại của Mã VS bạn đang sử dụng. *code . -r* sẽ thực hiện thủ thuật mà không cần bạn phải rời khỏi giao diện CLI [Learn more](https://code.visualstudio.com/docs/editor/command-line)
## 2. Polacode
Bạn thường bắt gặp các ảnh chụp màn hình code hấp dẫn với các phông chữ và chủ đề tùy chỉnh như bên dưới. Điều này đã được thực hiện trong VS Code với phần mở rộng [Polacode Extension](https://github.com/octref/polacode)

![](https://images.viblo.asia/ba988fc3-2b86-48e8-b3b1-c9777e4b5eb8.png)

## 3. Quokka (JS/TS ScratchPad)
Quokka là một rapid prototyping playground  cho JavaScript và TypeScript. Nó chạy mã của bạn ngay lập tức khi bạn nhập và hiển thị các kết quả thực hiện khác nhau và console logs trong code editor của bạn.

![](https://images.viblo.asia/5c71291a-7dd2-4284-8a86-ae4ff9c6650e.gif)

## 4. WakaTime
Bạn bè của bạn nghĩ rằng bạn dành quá nhiều thời gian để viết code? Ghi lại và cho họ thấy rằng 10 giờ / ngày không phải là "quá nhiều". [WakaTime](https://wakatime.com/) là một tiện ích mở rộng giúp ghi lại và lưu trữ các số liệu và phân tích liên quan đến việc code của bạn.

Bạn có thể đặt mục tiêu, xem các ngôn ngữ coding bạn thường sử dụng, thậm chí bạn có thể so sánh mình với người khác trên thế giới. 

![](https://images.viblo.asia/2c9feeb3-817f-4dbd-8d29-c3b06db26ee9.png)

## 5. Exclude folders
Tôi đã học được mẹo này ở một bài đăng trên StackOverFlow. Đây là một tinh chỉnh nhanh để loại trừ các thư mục như node_modules hoặc bất kỳ thư mục nào khác từ explorer tree để giúp bạn chỉ tập trung vào những gì quan trọng. Đối với tôi, tôi thực sự ghét mở thư mục node_module tẻ nhạt trong trình soạn thảo của mình, vì vậy tôi quyết định ẩn nó.

Ví dụ: để ẩn node_modules, bạn có thể làm như sau:
1. Go to **File** > **Preferences** > **Settings** (or on Mac **Code** > **Preferences** > **Settings**)
2. Search files.exclude trong settings
3. Select add pattern and type *.../node_modules*
4. node_modules biến mất khỏi explorer tree

# Tham khảo
https://medium.freecodecamp.org/here-are-some-super-secret-vs-code-hacks-to-boost-your-productivity-20d30197ac76