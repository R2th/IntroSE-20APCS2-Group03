# Database Model: Trung tâm ngoại ngữ

Biết một ngoại ngữ là một kỹ năng quan trọng, đặc biệt là trong một nền kinh tế toàn cầu. Trong bài viết này, tôi xem xét một mô hình dữ liệu ` Language School `

Học một ngôn ngữ có thể là một việc kho khăn, nhưng việc đăng ký vào một trung tâm dạy thì rất đơn giản. Bạn có thể đăng ký tại trường, hoặc bạn có thể sử dụng trực tuyến. Trong bài viết này,  tôi sẽ xem xét một mô hình dữ liệu cho phép đăng ký trực tuyến cũng như các chức năng khác phổ biến cho các `Language School`.


**Trung tâm ngoại ngữ yêu cầu gì??**

Trước hết, ứng dụng phải cho phép người dùng đăng ký và đăng nhập vào hệ thống. Người dùng có thể là sinh viên, giáo viên hoặc nhân viên nhà trường.

Mọi người có thể đăng ký khóa học trực tuyến hoặc trực tiếp tại trường. Nhân viên nhà trường sẽ có thể nhập thông tin của học sinh, xác nhận đặt chỗ khóa học của họ và phân công học sinh cho một lớp học cụ thể. Học sinh có thể trả tiền cho các khóa học trực tuyến hoặc tại trường.

Ngoài ra, người quản lý sẽ có thể tạo các lớp mới và giao học sinh cho họ. Mô hình sẽ có thể lưu trữ thông tin chi tiết về sinh viên, giáo viên, ngôn ngữ, trình độ và khóa học. Cũng cần có cách để kiểm tra xem các khoản thanh toán đã được thực hiện chưa.

## Cấu trúc CSDL

Mô hình dữ liệu tôi thiết kế cho một Trung tâm ngoại ngữ bao gồm sáu lĩnh vực:

1. Courses
2. Students
3. Teachers
4. Staff
5. Classes
6. Payments

Tôi sẽ giới thiệu về từng lĩnh vực:

### Courses

Lĩnh vực này lưu trữ thông tin về ngôn ngữ, trình độ, loại tuổi (để đảm bảo khóa học phù hợp với lứa tuổi) và chi tiết khóa học. Có bốn bảng: `languages`, `levels`, `categories`, and `courses`

![](https://images.viblo.asia/8b6d5284-ea60-474b-b414-c78385ab483f.png)

**Bảng `languages`** lưu trữ tên của các ngôn ngữ chúng tôi dạy, chẳng hạn như tiếng Anh, tiếng Đức, tiếng Pháp, tiếng Tây Ban Nha, v.v. Nó chứa các trường sau:

* id:  Khóa chính của bảng.
* name: Tên ngôn ngữ, ví dụ: “Tiếng Anh”, “tiếng Đức”, v.v.

cả 2 là bắt buộc.

**Bảng `levels`**  lưu trữ thông tin về mức độ thành thạo liên kết với một khóa học. Điều này có thể được thể hiện bằng tên ("new_member") hoặc một ký hiệu (“A1”, “C2”, v.v.) Mã này khác nhau ở các vị trí khác nhau, nhưng chúng tôi sẽ giới hạn nó thành hai ký tự. Bảng này chứa:

* id - Khóa chính của bảng.
* name - Tên đại diện cho mức độ thành thạo, ví dụ: Novice, High, Expert, Conversational, v.v.
* code - Biểu tượng hai ký tự cho cấp độ ngôn ngữ của khóa học, như A1, C2, NL, D, 2+, v.v. Lưu ý rằng đây là kiểu dữ liệu CHAR (2).

Tất cả các trường bắt buộc

**Bảng categories**

Sinh viên  thường ở các độ tuổi khác nhau, có nghĩa là nội dung bài học sẽ khác nhau. Bảng `categories` rất quan trọng vì nó cho phép chúng tôi phân loại các khóa học theo nhóm tuổi. Nó chứa các trường sau:

* id - Khóa chính của bảng.
* name - Tên danh mục như “trẻ em”, “thanh niên”, “người lớn”, v.v. Các khóa học trong mỗi danh mục sẽ có tài liệu được chuẩn bị đặc biệt cho nhóm tuổi đó.

Tất cả các trường bắt buộc

**Courses**

Cuối cùng trong lĩnh vực này là bảng `Courses` rất quan trọng. Nó chứa tất cả các chi tiết khóa học và có các cột sau:

* id - Khóa chính của bảng.
* language_id
* level_id 
* category_id
* lessons - Biểu thị số lượng bài học trong khóa học.
* description - Mô tả ngắn về khóa học.
* term - Khóa học kéo dài bao lâu.

Tất cả các cột trong bảng này là bắt buộc.

###  Students

lĩnh vực này  lưu trữ các chi tiết của sinh viên như địa chỉ, ngày sinh, tên, email và số điện thoại. Nó cũng lưu trữ thông tin tài khoản ứng dụng của họ. Tất cả dữ liệu được giữ trong hai bảng, học sinh và student_account.

![](https://images.viblo.asia/e4fc17d8-309d-4c7a-be46-d4a66962f234.png)

Bảng `Students` lưu trữ tên, thông tin liên lạc, ngày sinh, email và số điện thoại của mỗi học sinh. Ngày sinh là quan trọng bởi vì các khóa học được cá nhân hóa theo nhóm tuổi.

Các trường trong bảng này là:

* id - Khóa chính của bảng.
* date_birth - Ngày sinh của học sinh.
* state - nơi sinh viên sống.
* thành phố - Thành phố nơi sinh viên sống.
* zip_code - Mã ZIP của địa chỉ gửi thư của học sinh.
* street - Đường phố và số địa chỉ gửi thư của học sinh.
* first_name - Tự giải thích.
* last_name - Tự giải thích.
* email
* phone_number

Tất cả các cột trong bảng này là bắt buộc.

Bảng thứ hai và cuối cùng trong lĩnh vực chủ đề này là `student_account`. Các cột của nó là:

* id - Khóa chính của bảng.
* student_id - Tham khảo bảng học sinh.
* đăng nhập - Đăng nhập người dùng của học sinh.
* mật khẩu - Mật khẩu của học sinh.
* is_active - Biểu thị nếu tài khoản đang hoạt động bằng cách sử dụng giá trị bit: “0” cho không hoạt động, “1” cho hoạt động. Điều này cho phép quản trị viên chặn hoặc bỏ chặn tài khoản.

Tất cả các cột trong bảng này là bắt buộc.

Tại sao phải tách dữ liệu trong student_account khỏi dữ liệu của học sinh? Một số người sẽ đăng ký vào văn phòng, mà không cần sử dụng ứng dụng web. Họ sẽ không có tài khoản ứng dụng web, do đó, có ý nghĩa để giữ hai bộ thông tin này riêng biệt.

### Teachers

Lĩnh vực này lưu trữ tên giáo viên, dữ liệu liên hệ tùy chọn, bằng cấp hoặc thông tin đăng nhập của họ và các ảnh giáo viên tùy chọn. Nó chứa hai bảng: `teacher` và `teacher_account`. Lưu ý rằng giáo viên có thể có tài khoản trực tuyến với ứng dụng web nhưng không bắt buộc.

![](https://images.viblo.asia/1bbbd93c-5365-414e-a97f-f3b7b17536a4.png)
Bảng `teacher` có các cột sau:

* id - Khóa chính của bảng.
* description - Mô tả trình độ của giáo viên.
*photo - Một bức ảnh tùy chọn của giáo viên.
* first_name 
* last_name
* email
* phone

Tất cả các cột trong bảng này ngoại trừ ảnh là bắt buộc.

Bảng thứ hai là bảng teacher_account. Đây là các cột của nó:

* id - Khóa chính của bảng.
* teacher_id - Tham khảo bảng giáo viên.
* login - Lưu trữ thông tin đăng nhập của người dùng cho giáo viên.
* password - Lưu trữ mật khẩu cho tài khoản của giáo viên.
* is_active - Biểu thị nếu tài khoản đang hoạt động bằng cách sử dụng giá trị bit: “0” cho không hoạt động, “1” cho hoạt động. Điều này cho phép quản trị viên chặn hoặc bỏ chặn tài khoản.

Tất cả các cột trong bảng này là bắt buộc.

Lý do để có các bảng  `teachers` và `teachers_account` riêng biệt giống như đối với sinh viên: một số người sẽ không có tài khoản ứng dụng.

### Staff

Lĩnh vực chứa thông tin về nhân viên trường ngôn ngữ, chẳng hạn như người quản lý và thư ký. Có hai bảng, nhân viên và staff_account.

![](https://images.viblo.asia/dcb69fb6-5f8b-4d2e-a2b5-7dbe07653116.png)

Bảng `staff` có các cột sau:

* id - Khóa chính của bảng.
* position - Chức danh công việc.
* first_name 
* last_name 
* email
* phone

Tất cả các cột trong bảng này là bắt buộc.

Bảng thứ hai và cuối cùng trong lĩnh vực này là bảng `staff_account`. Đây là các cột của nó:

* id - Khóa chính của bảng.
* staff_id - Tham khảo bảng nhân viên.
* login - Lưu trữ thông tin đăng nhập của người dùng.
* password - Lưu trữ mật khẩu của nhân viên.
* is_active - Biểu thị nếu tài khoản đang hoạt động bằng cách sử dụng giá trị bit: “0” cho không hoạt động, “1” cho hoạt động. Điều này cho phép quản trị viên chặn hoặc bỏ chặn tài khoản.

Tất cả các trường là bắt buộc.

### Classes

lĩnh vực  chứa dữ liệu về các lớp học. Một khóa học có thể được tạo thành từ một hoặc nhiều lớp. Mỗi lớp được tạo thành từ một số bài học (hoặc phiên) diễn ra vào những ngày nhất định. Chúng ta cũng cần một bảng tham chiếu giữa các ngày trong tuần và các bảng lớp được gọi là class_weekday. Chúng tôi cũng sẽ có một bảng có tên là class_student cho phép chúng tôi kết hợp các lớp học và các sinh viên đăng ký vào các lớp đó.

![](https://images.viblo.asia/f7b2d936-01bd-4db7-ac5b-2e45dbe53ac1.png) 


Bảng `weekday` trong tuần lưu trữ các ngày trong tuần mà trường của chúng tôi mở cửa. Các cột trong bảng này là:

* id - Khóa chính của bảng.
* name - Tên của một ngày trong tuần (“Thứ Hai”, “Thứ Ba”, vv).

Tất cả các cột trong bảng này là bắt buộc.

Bảng `class_weekday` chứa các cột sau. Lưu ý rằng hai cái đầu tiên là khóa ngoài, liên quan đến bảng này với các bảng khác trong chủ đề:

* class_id - Tham khảo bảng lớp.
* weekday_id - Tham khảo bảng ngày trong tuần.
* hours - Cho biết thời gian mỗi lớp được tổ chức, ví dụ: '9.30 - 10.30'.

Tất cả các cột trong bảng này là bắt buộc.

Bảng này liên quan đến dữ liệu trong bảng lớp và các ngày trong tuần. Nó là cần thiết bởi vì chúng tôi sẽ có nhiều hơn một lớp học trong mỗi ngày trong tuần, và mỗi lớp có thể được tổ chức vào hơn một ngày trong tuần.

Bảng `class` là điều cần thiết cho lĩnh vực chủ đề này. Nó lưu trữ các cột sau:

* id - Khóa chính của bảng.
* name - Tên của một lớp học. Lưu ý rằng đây là một ví dụ của khóa học, chẳng hạn như "Intermediate German Spring 2018".
* start_date - Ngày của bài học đầu tiên của lớp này.
* end_date - Ngày của bài học cuối cùng của lớp này.
* price - Giá cho lớp này.
* teacher_id - Tham khảo bảng giáo viên và liên kết một giáo viên với lớp học cụ thể này.
* course_id - Tham khảo bảng khóa học. Hãy nhớ rằng một khóa học có thể được thực hiện như một số lớp khác nhau.

Tất cả các cột trong bảng này là bắt buộc.

Cuối cùng, chúng ta đến bảng `class_student`. Chúng ta có thể mong đợi rằng cùng một học sinh sẽ ghi danh vào nhiều hơn một lớp. Và một lớp học có nhiều khả năng sẽ có nhiều học sinh. Bảng này là cần thiết cho các mối quan hệ này. Đây là các cột của nó:

* id - Khóa chính của bảng.
* student_id - Tham khảo bảng học sinh.
* class_id - Tham khảo bảng lớp.
* 
Tất cả các cột trong bảng này là bắt buộc.

### Payment

Lĩnh vực cuối cùng của chúng tôi ghi lại thông tin thanh toán liên quan đến học sinh và các lớp học. Nó lưu trữ thông tin chi tiết về tổng số tiền cho mỗi khóa học, phương thức thanh toán được sử dụng và trạng thái thanh toán. Chúng tôi sử dụng hai bảng để làm điều này, `payment_method` và `payment`

![](https://images.viblo.asia/46188fa0-544b-466f-b2a6-c960f1bc048e.png)

Bảng payment_method chỉ có hai cột:

* id - Khóa chính của bảng.
* name - Tên phương thức thanh toán (ví dụ: "tiền mặt", "thẻ tín dụng", "thẻ ghi nợ", v.v.). Nếu sinh viên không có tài khoản trực tuyến, họ có thể thanh toán bằng tiền mặt.

Cả hai cột đều được yêu cầu.

Bảng `payments` có các cột sau:

* id - Khóa chính của bảng.
* payment_date - Đã nhận được thanh toán ngày.
* amount - Số tiền được trả cho lớp học.
* payment_method_id - Phương thức thanh toán được sử dụng.
* status - Trạng thái thanh toán (như "đang chờ xử lý", v.v.).
* student_id - Tham khảo bảng học sinh và liên hệ với sinh viên với một khoản thanh toán.
* class_id - Tham khảo bảng lớp và liên quan đến một khoản thanh toán với một lớp cụ thể.


Tất cả các cột đều được yêu cầu.

### Kết

Mô hình dữ liệu này được thiết kế để cho phép các trường ngôn ngữ chạy một ứng dụng web. Ứng dụng này sẽ cho phép sinh viên, giáo viên và nhân viên nhập dữ liệu vào cơ sở dữ liệu của trường. Thêm vào đó, nó sẽ cho phép sinh viên đăng ký vào các lớp và các khóa học trực tuyến khác nhau.

Tất nhiên, có những khu vực mà mô hình này có thể được mở rộng.


![](https://images.viblo.asia/7fe9989b-b1fc-4754-b6fe-53bf96cbd373.png)

Nguồn: [Vertabelo](http://www.vertabelo.com/blog/technical-articles/a-language-school-database-model).