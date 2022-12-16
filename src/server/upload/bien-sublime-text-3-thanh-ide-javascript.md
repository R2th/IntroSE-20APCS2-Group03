Sublime Text là một trong những trình soạn thảo phổ biến nhất cho phát triển web và phát triển phần mềm nói chung. Nó rất trơn tru và nhanh chóng so với các trình soạn thảo khác. Sublime cũng có rất nhiều plugin bạn có thể tìm thấy thông qua Package Control .
**Nhưng nó chỉ là một trình soạn thảo văn bản chứ không phải là một IDE** . Một IDE là một ứng dụng phần mềm cung cấp các cơ sở toàn diện cho các lập trình viên máy tính để phát triển phần mềm. Trong thực tế, Sublime không cung cấp các tính năng như công cụ gỡ rối, các công cụ tích hợp để biên dịch và chạy các ứng dụng, các suggestions thông minh, hoặc refactor code. Thay vào đó, nó cung cấp một bộ API mà bạn có thể sử dụng để mở rộng nó. Dưới đây là phần giới thiệu về plugin [JavaScript Enhancement](https://github.com/pichillilorenzo/JavaScriptEnhancements/)  làm cho Sublime trở nên giống IDE hơn một chút để phát triển JavaScript.
### Plugin JavaScript Enhancement là gì?

Nó là một plugin cho Sublime Text 3 cung cấp rất nhiều tính năng hữu ích cho việc tạo, phát triển và quản lý các dự án JavaScript. Điều quan trọng nhất là:

1. Smart autocomplete
2. Error detection and linting
3. Code refactoring

Một số tính năng khác có thể được tìm thấy trên [trang Wiki](https://github.com/pichillilorenzo/JavaScriptEnhancements/wiki) .

Hầu hết các tính năng được thực hiện bằng cách sử dụng [Flow](https://github.com/facebook/flow), đó là static typechecker cho JavaScript được tạo bởi Facebook (nếu bạn biết [TypeScript](http://www.typescriptlang.org/) , nó khá giống nhau). Mục tiêu chính của plugin này là biến Sublime Text 3 thành một IDE JavaScript . Nó đang được phát triển tích cực và nó sẽ bao gồm các tính năng khác theo thời gian.

### Cài đặt

Có hai cách để cài đặt nó. Cách đơn giản nhất là thông qua [Package Control](https://packagecontrol.io/packages/JavaScript%20Enhancements) , phần còn lại là cài đặt nó theo cách thủ công theo các [bước đơn giản](https://github.com/pichillilorenzo/JavaScriptEnhancements/wiki/Installation).

### Yêu cầu

* Sublime Text 3 build 3124 or newer
* Node.js (6 or newer) and npm
* TerminalView Sublime Text plugin (Linux and Mac OS X only)

### Các OS được support
Bời vì Flow chỉ hoạt động trên nền tảng 64-bit, nên plugin hỗ trợ:

* Mac OS X
* Linux (64-bit)
* Windows (64-bit)

### Smart Autocomplete

Sublime Text có tính năng autocomplete của riêng nó, nhưng nó thiếu sức mạnh, làm cho nó gần như không hữu ích như nó có thể được. Với plugin này, bạn sẽ nhận được autocomplete dựa trên ngữ cảnh hiện tại , giống như bất kỳ IDE nào khác . Ví dụ, bạn sẽ nhận được autocomplete từ các lớp đã nhập của bạn được định nghĩa trong các tệp khác, chẳng hạn như các thuộc tính và phương thức.

Hơn nữa, danh sách hoàn thành cũng sẽ chứa thông tin về các loại biến và chức năng chữ ký để có được một cái nhìn tổng quan nhanh chóng của chúng.

Dưới đây là cách hoạt động với plugin: [video](https://cdn.css-tricks.com/wp-content/uploads/2018/05/plugin_completions.mp4)

### Error Detection and Linting

Sublime Text không phát hiện lỗi và/hoặc hệ thống linting. Nhờ Flow, điều này có thể được thực hiện bằng cách sử dụng các lệnh CLI của riêng nó .

Trước hết, bạn cần phải tạo một project JavaScript (xem trang [wiki Tạo dự án JavaScript](https://github.com/pichillilorenzo/JavaScriptEnhancements/wiki/Creating-a-JavaScript-Project) ). Để cho máy chủ luồng kiểm tra tập tin của bạn, bạn cần phải thêm một lời nhận xét đặc biệt trong đó: // @flow.

Bạn cũng có thể đặt nhiều tùy chọn hơn trong tệp .flowconfig (xem [trang chủ](https://flow.org/en/docs/config/) để tùy chỉnh cấu hình Luồng của mình. Ví dụ: nếu bạn muốn cho máy chủ Flow kiểm tra tất cả các tệp và không chỉ những tệp đó với @flow, bạn cần đặt tùy chọn all = true:

.flowconfig
```
[options]
# all=off by default
all=true
```

Để cho phép máy chủ Flow kiểm tra các tệp đơn lẻ không thuộc một dự án, bạn có thể kích hoạt tùy chọn trong Tools > JavaScript Enhancements > Use Flow checker on current view (Not used in project) mỗi Chế độ xem tối ưu. Trong trường hợp này, máy chủ Flow sẽ chỉ xem chế độ xem hiện tại.

Thay vào đó, như được nói trên trang chủ , các cài đặt lint có thể được chỉ định trong phần .flowconfig[lints] như một danh sách các cặp rule=severity. Các cài đặt này áp dụng chung cho toàn bộ dự án. Một ví dụ là:

.flowconfig
```
[lints]
# all=off by default
all=warn
untyped-type-import=error
sketchy-null-bool=off
```


Cài đặt Lint cũng có thể được chỉ định trực tiếp trong tệp bằng cách sử dụng [flowlint comments] . Ví dụ:
```
/* flowlint
*   sketchy-null:error,
*   untyped-type-import:error
*/
```
[Video](https://cdn.css-tricks.com/wp-content/uploads/2018/05/errors_and_linting.mp4)

### Code Refactoring
 Sublime Text không cung cấp một hệ thống tái cấu trúc mã nguyên bản. Điều này được thực hiện với sự trợ giúp của các lệnh Flow CLI để có được các thông tin cần thiết. Hiện tại, plugin này cung cấp các tính năng tái cấu trúc mã khác nhau, bao gồm:
- Convert to arrow function
- Export: 
- Function
- Class
- Variable
- Safe Copy
- Safe Move
- Safe Delete
- Extract:
- Variable
- Field (current method, field declaration, class constructor)
- Parameter
- Method (global scope, current scope, class method)

Một số người trong số chúng cũng có thể có bản xem trước có sẵn . Hơn nữa, các tính năng, chẳng hạn như  Safe Move , sẽ chỉ hoạt động trên các dự án JavaScript.

[Video](https://cdn.css-tricks.com/wp-content/uploads/2018/05/code_refactoring.mp4)

Via: [css-tricks.com](css-tricks.com)