Hôm kia tình cờ lân la lên thư viện [PaperCSS](https://github.com/papercss/papercss) trên GitHub, mình phát hiện ra project của họ có sử dụng file `.editorconfig`. Tò mò vì chả biết đó là gì, mình bắt đầu tìm hiểu thử và thực sự bất ngờ về công dụng của nó.

Mình thường dùng IntelliJ IDEA để code Java, và mỗi lần rollback lại là y như rằng các file bị đổi encoding thành CRLF (mặc định mình muốn là LF). Từ khi mình sử dụng `.editorconfig` thì hiện tượng đó không còn nữa.

Và tìm hiểu `.editorconfig` thực sự rất đơn giản, chỉ có vài rules cơ bản nhưng hiệu quả đem lại lớn, rất đáng để thử một lần cho biết.

## 1. Giới thiệu về `.editorconfig`

### 1. Từ Linter tới `.editorconfig`

Chắc hẳn mọi JavaScript developer đều đã nghe nói về Linter. Đó là một tool siêu hữu ích để check và format lại code cho đúng các quy tắc (rules) đã định nghĩa. Ví dụ:

* Dùng tab hay space :D
* Indent vào bao nhiêu cột (nếu dùng space)
* Độ rộng một tab (nếu dùng tab)
* File encoding là gì (nên là UTF-8)
* ...

Linter mang tới rất nhiều lợi ích tuyệt vời, giúp tăng tính nhất quán cho source code (rất quan trọng). Tuy nhiên, Linter vẫn khá phức tạp và chưa hỗ trợ nhiều ngôn ngữ.

Do đó, đối với các project nhỏ, đơn giản thì có thể dùng `.editorconfig` như giải pháp thay thế cho Linter (dùng kèm cả hai cũng không sao).

### 1.2. File `.editorconfig` là gì?

![](https://images.viblo.asia/8dfb2908-c202-4aad-994d-0a0b2bf63af2.jpg)

Tương tự Linter, mục đích của `.editorconfig` là tăng tính nhất quán (consistency) cho code. Nói cách khác, source code phải thống nhất theo một số quy tắc nhất định, khi clone về các máy tính khác nhau, dùng các IDE, text editor khác nhau thì sẽ luôn giống nhau.

Cách hoạt động của nó là áp dụng các quy tắc trong file `.editorconfig` (nằm trong source code) lên IDE, text editor khi code trên project. Ví dụ bạn dùng VSCode, có thiết lập indent là 2. Tuy nhiên khi mở project có `.editorconfig` khai báo indent là 4, thì giá trị 4 sẽ được sử dụng (ghi đè lên giá trị 2 đã có).

Thường các IDE, text editor sẽ ưu tiên sử dụng các thiết lập trong `.editorconfig` hơn là thiết lập trước đó. Do đó khi làm việc chung với nhóm thì sẽ đảm bảo được tính nhất quán giữa các thành viên.

### 1.3. Plugins

Để dùng được `.editorconfig` file bạn cần cài thêm một số plugin cho IDE, text editor của mình.

Với IntelliJ IDEA thì nó có sẵn plugin EditorConfig luôn rồi, bạn chỉ cần enable lên là được. Còn với VSCode thì bạn cài thêm ở đây https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig.

Ngoài ra trên trang chủ của [EditorConfig](https://editorconfig.org/) có danh sách các plugin cho từng IDE, editor được hỗ trợ. Xem tại đây https://editorconfig.org/#download.

## 2. Có gì trong file `.editorconfig`

### 2.1. Xem qua cấu trúc file

![](https://images.viblo.asia/d5273534-1153-4aa8-a6bc-132bc0f4287a.png)

Trên đây là file `.editorconfig` của mình, gồm hầu hết các thuộc tính cơ bản. Hãy cùng đi qua phân tích từng dòng nhé, cũng không khó lắm đâu:

* Dòng 1 khai báo `root = true` chỉ định đây là file `.editorconfig` gốc (thường nằm ở thư mục ngoài cùng project).
* Dòng 3 là khai báo phạm vi áp dụng. Ở đây mình dùng `[*]` là áp dụng các thuộc tính bên dưới cho mọi file. Các bạn cũng có thể tùy chỉnh lại theo dạng sau.

```shell
root = true

[*]
# Các thuộc tính cho mọi file
indent_size = 4

[*.{js,ts}]
# Các thuộc tính cho file .js và .ts
indent_size = 2
```

Các dòng còn lại là đặt các rules cho những thuộc tính cơ bản.

### 2.2. Các thuộc tính cơ bản

Bảng bên dưới mô tả các thuộc tính và ý nghĩa của từng thuộc tính nhé. Thực ra file `.editorconfig` cũng chỉ có bấy nhiêu đây thuộc tính thôi nên không cần phải lo.

| Tên thuộc tính | Ý nghĩa | Value nên đặt |
| - | - | - |
| charset | Các file code lưu định dạng (encoding) nào | Nên đặt là `utf-8` |
| end_of_line | Kí tự xuống dòng là gì | Nên chọn là `lf` (Unix), hoặc là `crlf` (Windows) |
|  indent_style | Kiểu thụt lề (indent) là dùng tab hay spaces | Đặt value là `space` (nên chọn) hay `tab` tùy bạn |
| indent_size | Thụt lề vào bao nhiêu spaces | Nên là 4 để code dễ đọc hơn, hoặc với HTML thì nên là 2 |
| tab_width | Độ rộng một tab (chỉ áp dụng khi `indent_style = tab` | Tương tự như bên `indent_size` |
| max_line_length | Số kí tự tối đa trên mỗi dòng | Nên là 80, nếu code dài, indent rộng như Java thì đặt là 100 |
| insert_final_newline | Luôn có duy nhất một dòng trống ở cuối file | true |
| trim_trailing_whitespace | Loại bỏ các space dư thừa ở cuối dòng | true |

Chi tiết các thuộc tính có tại trang chủ GitHub của EditorConfig nhé https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties.

### 2.3. Các thuộc tính riêng

Một số IDE như Visual Studio, IntelliJ IDEA,... có thể khai báo thêm các thuộc tính riêng. Thường các thuộc tính này sẽ có tiền tố, ví dụ như hình là các thuộc tính có tiền tố `ij_` là của IntelliJ.

![](https://images.viblo.asia/9aa9cc56-1e22-4c52-944d-40c11db800bc.png)

Các thuộc tính riêng này chỉ được áp dụng khi dùng IDE đó để code.

Ngoài ra, các IDE, text editor cũng có các tool để generate ra file `.editorconfig` dựa trên IDE settings có sẵn. Các bạn có thể tìm hiểu thêm.

### 2.4. Ghi đè file `.editorconfig`

![](https://images.viblo.asia/82bbc7f5-686f-4d4a-8ba4-7c781c2fb455.png)

Bạn có thể áp dụng các rules riêng cho thư mục cụ thể, chỉ cần tạo thêm file `.editorconfig` mới trong thư mục đó. Nội dung file mới này sẽ ghi đè lên file `.editorconfig` gốc và chỉ áp dụng cho thư mục chứa nó (như trong hình).

---

Okay bài viết tới đây là hết rồi. Trên đây tớ đã giới thiệu đến các bạn về `.editorconfig`, file tuy nhỏ nhưng mà có võ.

Hi vọng các bạn sẽ cảm thấy hữu ích, và đừng quên **upvote** và **clip** bài viết của tớ nhé. Cảm ơn và have a good day <3