Thời đại 4.0 hiện nay thì website đã trở nên vô cùng phổ biến, nó đã trở thành một phần của thế giới internet. Khi chúng ta truy cập vào một địa chỉ domain nào đó, nó sẽ lấy resource từ một server nào đó và hiển thị trên màn hình cho chúng ta. Quá trình đó sẽ được phân ra thành 3 giai đoạn chính:

* Fetch (lấy dữ liệu)
* Process (xử lý dữ liệu)
* Display (hiển thị dữ liệu)

Lúc đầu, trình duyệt sẽ gửi một request lên server và server sẽ trả về dữ liệu
![](https://images.viblo.asia/282e261f-b42d-4f00-a206-e70750b52fcd.png)

Sau đó, `Browser engine` sẽ xử  lý và chuyển đổi dữ liệu nhận về để hiển thị lại trên thiết bị của người dùng

![](https://images.viblo.asia/ed8da431-14d5-4072-99a8-ba0a3d816ddb.jpeg)

Vậy quá trình này xảy ra thế nào? Đó sẽ là điều mà chúng ta tìm hiểu

# Flow của JS Engine
Javascript engine là một phần mềm hoặc có thể coi là một trình biên dịch mà sẽ xử lý code javascript. Máy tính của chúng ta sẽ không thể nào những đoạn code JS được, nó cần một chương trình chuyển đổi code JS sang thứ mà nó có thể hiểu được, ở đây chính là những bytecode 01.
![](https://images.viblo.asia/ed67abf3-3dfc-4791-a591-204098597051.jpeg)

### Parser

Ban đầu, HTML parser sẽ lấy tất cả các code được load qua thẻ `<script>`. Những code này sẽ được tải dưới dạng UTF-16 byte stream, sau đó thông qua byte stream decoder xử lý. Những bytes này sẽ được decode sang token và chuyển cho parser.

![](https://images.viblo.asia/91cb66a1-6e0d-4314-9a4d-db9b4b95f154.png)

### AST
Parser sẽ tạo ra những nodes dựa theo token mà nó nhận được. Với những nodes này, nó sẽ tạo ra AST (Abstract Syntax Tree). AST đóng vai trò quan trọng trong việc phân tích ngữ nghĩa, là nơi mà trình biên dịch (Interpreter) xác nhận tính đúng đắn và cách sử dụng phù hợp của chương trình cũng như các phần tử của ngôn ngữ

### Interpreter
Tiếp theo sẽ là interpreter, nó sẽ phân tích thông qua AST và tạo ra các byte code. Từng dòng code sẽ được phân tích, và tới khi byte code được tạo ra thì AST sẽ bị xóa để giải phóng bộ nhớ
![](https://images.viblo.asia/8814b9da-d830-46d5-8600-44b3855cfe17.png)

### Profiler
Profiler sẽ giám sát và tối ưu code

### Compiler

Với sự hỗ trợ của `Profiler`, những đoạn code nào còn chưa được tối ưu sẽ được chuyển cho `Complier` cải tiến và tạo ra mã máy

## Optimized code
Sau khi chạy qua 5 bước trên, thứ mà máy nhận được sẽ là một đoạn code đã được tối ưu


# Một vài Javascript engine
* V8 - Thứ mà chúng ta muốn tìm hiểu đương nhiên sẽ phải nhắc tới rồi. Đây là một open source  được phát triển bởi google và được viết bằng C++
* Rhino - được viết bằng Java
* Spider Monkey - trước đây được phát triển bởi Netscape Navigator, ngày nay được chuyển sang cho Firefox
*  JavascriptCore - open source được phát triển bởi Apple và sử dụng cho Safari
*  Chakra (JScript9) - được sử dụng cho IE
*  Chakra Core(JavaScript) - được sử dụng cho Microsoft Edge (nhưng giờ chuyển sang V8 rùi)

# Sự khác biệt của V8
### Ignition
V8 và những engine mới như SpriderMonkey, Rhino đều có cách tiếp cận giống nhau. Nhưng tất cả đều thay đổi sau năm 2016, khi mà team phát triển Chrome V8 giới thiệu một interpreter mới là `Ignition`. Với `Ignition`, V8 biên dịch Javascript code thành những đoạn byte code ngắn hơn. Sau đó, những byte code này được xử lý bới một interpreter có hiệu suất cao, tạo ra tốc độ thực thi trên các trang web thực tế gần với tốc độ thực thi của mã được tạo bởi trình biên dịch cơ sở hiện có của V8. Ignition giải quyết việc sử dụng bộ nhớ quá mức bằng cách
 
 * Giảm bộ nhớ sử dụng
 * Giảm thời gian khởi động
 * Giảm độc phức tạp 

![](https://images.viblo.asia/f4c67fe6-919f-497a-b28d-56c6b4f888cf.png)

### TurboFan
TurboFan tuân theo một số bước để dịch bytecode thành mã máy. TurboFan được thiết kế như là một compiler cho phép tách biệt giữa tối ưu hóa compiler cấp cao và cấp thấp, khiến cho việc thêm các tính năng mới vào Javascript mà không cần phải sửa đổi mã kiến trúc. Việc tối ưu được thực hiện dựa trên phản hồi do Ignition thu thập.


Bài viết của mình tới đây thôi. Nếu còn thiếu sót gì thì các bạn bổ sung cho mình nhé :D

Tham khảo:

* https://dev.to/edisonpappi/how-javascript-engines-chrome-v8-works-50if
* https://www.lydiahallie.dev/blog/javascript-engine-part-1