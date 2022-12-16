`Ada` là một ngôn ngữ hỗ trợ triển khai logic của nhiều mô hình lập trình khác nhau, trong đó có cả Lập Trình Hướng Đối Đượng `OOP` và một số yếu tố của Lập Trình Hàm `FP`. Tuy nhiên thì thiết kế cốt lõi của `Ada` lại là một ngôn ngữ trọng tâm Lập Trình Tuần Tự `Imperative` giống với `C` và Lập Trình Thủ Tục `Procedural` giống với `Pascal`.

Có một điểm khác biệt quan trọng giữa `Ada` và phần lớn các ngôn ngữ lập trình khác, đó là `Ada` phân biệt rất rõ ràng các câu lệnh và các biểu thức. Nếu như chúng ta cố gắng sử dụng một biểu thức ở vị trí mà đáng lẽ cần xuất hiện một câu lệnh thì chắc chắn sẽ nhận được thông báo lỗi khi tiến hành biên dịch code.

Nguyên tắc này bổ trợ cho một trong số những tiêu chí thiết kế ngôn ngữ đã kể trước đó: Đó là các biểu thức thì được sử dụng để truyền tải các giá trị, chứ không tạo ra bất kỳ hiệu ứng biên nào khác. Điều này sẽ giúp sàng lọc được một số lỗi lập trình trong một số tình huống, ví dụ như khi chúng ta sử dụng nhầm phép so sánh tương đương ở vị trí mà đáng ra phải là một câu lệnh gán giá trị cho một biến.

```mistaken-in-javascript.js
const fromMySoul = true
var shouldDoIt = false

if (shoudDoIt = fromMySoul)
   console.log ("Ok. We'll do it.")
else
   console.log ("Nah. We're not gonna do it.")
```

Đó là một ví dụ logic rẽ nhánh trong `JavaScript`, khi mà chúng ta muốn biểu thị rằng: "Nếu dự tính `shoulDoIt` cũng đồng thuận với tiềm thức `fromMySoul`, thì sẽ thực hiện một dự định đang có." Trong trường hợp này, khi chúng ta biểu thị nhầm bằng phép gán giá trị như trên thì hiển nhiên kết quả sẽ luôn luôn là `"Ok. We'll do it."`. Và đó là điều mà `Ada` sẽ không để xảy ra.

## Hello, Ada !

Trước khi nói đến việc cài đặt và chuẩn bị môi trường cho `Ada` thì chúng ta sẽ nhìn lướt qua chương trình `Hello World` giống như khi bắt đầu học bất kỳ ngôn ngữ lập trình nào khác.

```greet.adb
with Ada.Text_IO;

procedure Greet is
   -- khu vực khai báo các biến
begin
   -- in "Hello, Ada !" ra cửa sổ dòng lệnh
   Ada.Text_IO.Put_Line ("Hello, Ada !");
end Greet;
```

Có một vài điểm đáng lưu ý trong chương trình này:

- Chúng ta đang có một ngôn ngữ sử dụng cú pháp dạng `indentation style` với các câu lệnh được xem là cùng khối nếu có cùng khoảng trống thụt vào ở đầu dòng, thay vì `block style` với các dấu ngoặc xoắn `{}` như `C` hay `JavaScript`.
- Một chương trình con `sub-program` trong `Ada` có thể là một Thủ Tục `procedure` hoặc một Hàm `function`. Và một Thủ Tục `procedure` như trong code ví dụ ở trên sẽ không bao giờ trả về một giá trị nào tại vị trí được gọi.
- Từ khóa `with` được sử dụng để tham chiếu tới các `module` bên ngoài. Yếu tố này tương đương với `import` trong nhiều ngôn ngữ khác, và `#include` trong `C` hay `C++`. Chúng ta sẽ tìm hiểu chi tiết về hoạt động của `with` ở phần sau.
- Khác với các ngôn ngữ như `C` hay `C++`, chương trình chính trong `Ada` có thể được đặt tên tùy ý, như trong ví dụ trên là `Greet`, thay vì `Main`.
- Các nội dung chú thích `comment` được mở đầu với ký hiệu `--` và kéo dài đến hết dòng đó. Chúng ta sẽ không có cú pháp chú thích nhiều dòng `multi-line comment` và nếu cần thiết thì sẽ phải tạo ra nhiều dòng chú thích đơn.

Về mặt ý nghĩa biểu thị thì các Thủ Tục `procedure` tương đương với các `sub-program` trong các ngôn ngữ khác nếu trả về các giá trị vô nghĩa. Ví dụ như `void` trong `C` và `C++`, hay `undefined` trong `JavaScript`, v.v... Chúng ta sẽ điểm qua thao tác định nghĩa Hàm `function` trong `Ada` ở phần sau. Còn bây giờ thì chúng ta sẽ chỉnh sửa lại chương trình `Hello World` một chút.

```greet.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Greet is
   -- khu vực khai báo các biến
begin
   -- in "Hello, Ada !" ra cửa sổ dòng lệnh
   Put_Line ("Hello, Ada !");
end Greet;
```

Lần này chúng ta sử dụng thêm tính năng `use` đi kèm với `with`. Cú pháp sử dụng là `use package-name`. Và ở vị trí gọi thủ tục `Put_Line`, chúng ta đã có thể lược giản tên tham chiếu tới `package` ở phía trước.

## Cài Đặt Môi Trường

Mặc dù được sử dụng chủ yếu trong các lĩnh vực khoa học công nghệ cao và các ứng dụng mang tính chất `enterprise`, bộ công cụ hỗ trợ phát triển ứng dụng của `Ada` có cung cấp phiên bản cộng đồng `community edition` hoàn toàn miễn  phí. Phiên bản này được đóng gói kèm với trình biên dịch có đầy đủ tính năng tương đương với phiên bản thương mại `pro edition` dành cho các doanh nghiệp.

Bạn có thể tải về [`GNAT Community`](https://www.adacore.com/download/more) cho Windows tại đây:

- [GNAT Community](https://community.download.adacore.com/v1/797dbae8bdb8a3f661dad78dd73d8e40218a68d8?filename=gnat-2021-20210519-x86_64-windows64-bin.exe&rand=1830) - bộ công cụ tích hợp kèm trình soạn thảo code IDE dành riêng cho `Ada` và `C`
- [GTK-Ada](https://community.download.adacore.com/v1/e014a610f25fef7a0093c9e9b76bd72c15421094?filename=gtkada-2021-x86_64-windows64-bin.exe&rand=1865) - plug-in hỗ trợ tạo `project` với thư viện GUI của [Gnome.org](https://www.gnome.org/) cho nhu cầu phát triển ứng dụng đa nền tảng. Viết code 1 lần duy nhất và biên dịch ra các `package` cho Windows, Linux, BSD, Mac, v.v...

Nếu bạn đang sử dụng một phiên bản Linux nào đó thì có thể tìm trong thư viện `repository` mặc định gói `gnat-12` (phiên bản mới nhất là Ada 2012) và công cụ quản lý dự án `gprbuild` (GNAT Project Build). Trong đó thì `gnat-12` là phần lõi của môi trường phát triển và chúng ta sẽ học cách sử dụng ngay `gprbuild` để thiết lập `project` và quản lý các thư mục code.

Hiện tại mình đang sử dụng Ubuntu 22.10 và vì vậy nên có thể đảm bảo lệnh cài đặt dưới đây sẽ hoạt động tốt. Các bản phân phối Linux tiêu biểu khác như Fedora và OpenSUSE cũng đều có liệt kê các `package` trên trong các trang tra cứu thư viện.

```Terminal.io
sudo apt update && sudo apt upgrade
sudo apt install gnat-12 gprbuild
```

Nói riêng về thao tác sử dụng thì trong loạt bài viết hướng dẫn ở đây, mình sẽ sử dụng `gprbuild` bằng cửa sổ dòng lệnh và chỉnh sửa tệp khai báo `project` thủ công. Bạn cũng có thể để dành cái trình soạn thảo tích hợp IDE cho đến khi muốn tạo ra một `project` ứng dụng thực tế. Và vì vậy nên ở đây mình cần lưu ý một chút về thao tác cài đặt trên Windows.

Tất cả các thao tác với bộ cài `GNAT Community` đều là `Next`, `Next`, và `Next`, với các tùy chọn đã được thiết lập mặc định. Tuy nhiên thì bộ cài của `GNAT Community` cho Windows sẽ không tự động khai báo biến môi trường cho các thao tác trên cửa sổ dòng lệnh `Command Prompt`. Do đó nên sau khi chạy bộ cài xong thì chúng ta sẽ cần phải mở thư mục cài đặt của `GNAT` và tìm tới thư mục `bin`. Sau đó `copy/paste` đường dẫn đầy đủ của thư mục này có dạng `C:\GNAT\2021\bin` vào biến môi trường `Path`.

`Environment Variables > System Variables > Path > Edit > New`
![](https://images.viblo.asia/ddd48133-c4fb-4958-8967-24a312142f5b.png)

Hoặc mở cửa sổ dòng lệnh `CMD` với quyền `Admin` và nhập vào câu lệnh sau:

```CMD.io
setx path "%PATH%;C:\GNAT\2021\bin"
```

Sau đó trong cửa sổ dòng lệnh, chúng ta có thể gõ lệnh kiểm tra phiên bản `GNAT` đã được cài đặt:

```CMD|Terminal.io
gnat --version
gprbuild --version
```

Ok.. mọi thứ đều đã sẵn sàng, chúng ta hãy bắt đầu tìm hiểu chi tiết về ngôn ngữ `Ada` và công cụ quản lý `gprbuild`.

[[Procedural Programming + Ada] Bài 3 - Các Cú Pháp Imperative](https://viblo.asia/p/MG24BrRe4z3)