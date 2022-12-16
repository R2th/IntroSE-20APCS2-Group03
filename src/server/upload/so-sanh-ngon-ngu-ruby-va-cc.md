## I. Giới thiệu tổng quan.
### 1. Ngôn ngữ Ruby:
 Ruby được tạo ra bởi Yukihiro "Matz" Matsumoto từ 24 tháng 2 năm 1993 và đưa ra phiên bản chính thức 0.95 (Đây là phiên bản công khai đầu tiên của Ruby được công bố tại Nhật Bản) vào ngày 21 tháng 12 năm 1995. Ở phiên bản Ruby 0.95, nó đã có nhiều tính năng quen thuộc trong các phiên bản sau của Ruby, bao gồm thiết kế hướng đối tượng, các lớp với kế thừa, mixin, vòng lặp, xử lý ngoại lệ và thu gom rác.
Sau khi phát hành Ruby 0.95 vào năm 1995, một số phiên bản ổn định của Ruby đã được phát hành trong những năm tiếp theo:
* Ruby 1.0: ngày 25 tháng 12 năm 1996.
* Ruby 1.2: tháng 12 năm 1998.
* Ruby 1.4: tháng 8 năm 1999.
* Ruby 1.6: tháng 9 năm 2000.
### 2. Ngôn ngữ C/C++:
 Ngôn ngữ lập trình C là một ngôn ngữ mệnh lệnh được phát triển từ đầu thập niên 1970 bởi Dennis Ritchie để dùng trong hệ điều hành UNIX. Từ đó, ngôn ngữ này đã lan rộng ra nhiều hệ điều hành khác và trở thành một những ngôn ngữ phổ dụng nhất. C là ngôn ngữ rất có hiệu quả và được ưa chuộng nhất để viết các phần mềm hệ thống, mặc dù nó cũng được dùng cho việc viết các ứng dụng. Ngoài ra, C cũng thường được dùng làm phương tiện giảng dạy trong khoa học máy tính mặc dù ngôn ngữ này không được thiết kế dành cho người nhập môn.

 C là một ngôn ngữ lập trình tương đối nhỏ gọn vận hành gần với phần cứng và nó giống với ngôn ngữ Assembler hơn hầu hết các ngôn ngữ bậc cao. Hơn thế, C đôi khi được đánh giá như là "có khả năng di động", cho thấy sự khác nhau quan trọng giữa nó với ngôn ngữ bậc thấp như là Assembler, đó là việc mã C có thể được dịch và thi hành trong hầu hết các máy tính, hơn hẳn các ngôn ngữ hiện tại trong khi đó thì Assembler chỉ có thể chạy trong một số máy tính đặc biệt. Vì lý do này C được xem là ngôn ngữ bậc trung.
## II. So sánh sự khác tương đồng và khác biệt.
### 1. Sự tương đồng:
 Giống như C/C++, trong Ruby:
* Phần lớn các toán tử đều như nhau (bao gồm toán tử kết hợp và cả toán tử bit). Do đó trong Ruby không có ++ hay --.
* Bạn cũng có thể tạo hằng số, mà không cần từ khóa const. Các hằng số cũng phải theo qui ước đặt tên - tên bắt đầu với ký tự in hoa dùng cho hằng số.
* Chuỗi được đặt trong dấu nháy kép.
* Bạn cũng có phần dòng lệnh debug tương tự nhau.
* public, private, và protected cũng hoạt động giống nhau.
* Các exception cũng hoạt động như nhau, mặc dù các tên từ khóa đã được thay đổi.
* Cú pháp kế thừa cũng chỉ là 1 ký tự, nhưng sử dụng < thay vì :.
* Bạn nên đặt code vào các “mô-đun”, giống như namespace trong C++.
* Bạn có thể viết thủ tục nếu thích (nhưng nó vẩn phải đảm bảo tính hướng đối tượng).
### 2. Sự khác biệt:
 Không giống như C, trong Ruby:
*  Đối tượng là kiểu dữ liệu chủ đạo (và các tên biến không cần khai báo kiểu dữ liệu).
* Không có các macro hay preprocessor. Không ép kiểu, không con trỏ (hay con trỏ số học). Không có typedefs, sizeof hay enums.
* Không cần các tập tin header. Bạn chỉ cần định nghĩa chức năng mình muốn (thường là các phương thức) và các lớp trong mã nguồn chính của mình.
* Không cần #define. Thay vào đó chỉ cần dùng hằng số.
* Giống như Ruby 1.8, mã được biên dịch khi thực thi mà không cần biên dịch qua mã máy (machine-code) hay byte-code.
* Tất cả các biến đều tồn tại trên heap. Do đó, bạn không cần giải phóng nó - bộ thu gom sẽ làm việc đó.
* Tham số của phương thức (ví dụ như các chức năng) đều được truyền bằng tham chiếu (reference), không phải tham trị (value).
* Sử dụng require 'foo' thay vì #include <foo> hay #include "foo".
* Bạn không thể drop down để assembly.
* Không cần chấm phẩy khi hết dòng.
* Không cần đóng mở ngoặc khi dùng biểu thức điều kiện if và while.
* Ngoặc đơn khi gọi phương thức (chức năng) thường được tùy chọn.
* Bạn không cần sử dụng dấu ngoặc nhọn- chỉ cần dùng từ khóa end để kết thúc (giống như vòng lặp while).
* Từ khóa do được gọi là “block”. Không có “biểu thức do” như trong C.
* Thuật ngữ “block” có nghĩa là có sự khác biệt. Đó là một đoạn mã mà bạn liên kết với phương thức đó và phương thức đó sẽ thực hiện đoạn mã đó khi được gọi.
* Không cần phải khai báo biến. Chỉ cần đặt tên khi bạn cần sử dụng.
* Khi kiểm tra đúng sai, chỉ có false và nil là dành cho các giá trị sai. Tất cả những thứ còn lại đều là true (bao gồm 0, 0.0, và "0").
* Không có char - chỉ có một chuỗi ký tự.
* Chuỗi không kết thúc với một byte rỗng.
* Các phần tử của mảng nằm trong ngoặc vuông thay vì ngoặc nhọn.
* Kích thước của mảng sẽ tăng lên khi bạn thêm các phần tử vào đó.
* Nếu bạn thêm vào 2 mảng, bạn sẽ nhận được một mảng mới có kích thước lớn hơn (mảng chồng mảng) thay vì thực hiện con trỏ.
* Tất cả mọi thứ đều là một biểu thức (nghĩa là, những biểu thức như while biểu thị cho 1 rvalue).
## III. Kết luận:
  Ruby là ngôn ngữ khá tương đồng với C/C++ nên nếu bạn có muốn học ruby mà đã am hiểu về C/C++ thì sẽ không bị bỡ ngỡ nhiều trong quá trình tìm hiểu và học thêm ngôn ngữ này.
    
  Bạn có thể tham khảo thêm ở 1 số nguồn dưới đây: 
*  www.ruby-lang.org/
*  vi.wikipedia.org/wiki/C
*  www.viblo.asia
  
   Cám ơn các đã dành thời gian để xem bài viết của mình. :)