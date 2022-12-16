Ở Phần 2 mình có trình bày về các phương pháp kiểm thử chính.
- Test to pass, test to fail
- Phương pháp kiểm thử hộp đen (Black-Box Testing) 
- Phương pháp kiểm thử hộp trắng (White-Box Testing) 
- Phương pháp kiểm thử hộp nâu (Grey-Box Testing) 

Link: https://viblo.asia/p/toi-da-hoc-de-tro-thanh-tester-nhu-the-nao-p2-maGK7pBOZj2

Ở phần này mình xin giới thiệu Kĩ thuật thiết kế testcase hiệu quả và đầy đủ.

# I. Thế nào là TestCase?

## I.1. Khái niệm: 
Thiết kế test – case trong kiểm thử phần mềm là quá trình xây dựng các  trường hợp kiểm thử  nhằm mục đích  phát hiện lỗi, sai sót, khuyết điểm của phần mềm để xây dựng phần mềm đạt tiêu chuẩn.

## I.2. Vai trò: 
Tạo ra các trường hợp kiểm thử tốt nhất có khả năng phát hiện ra lỗi, sai sót của phần mềm một cách nhiều nhất.

# II. Những lưu ý khi viết testcase
- Nội dung của test case không quá dài , ghi ngắn gọn và dễ hiểu.
- Các bước mô tả thực hiện test: gọn gàng, không dư thừa, chỉ mô tả chính xác những step cần phải thực hiện.
- Miêu tả tiêu đề: ngắn gọn, xúc tích. Nên định nghĩa các mục đích và phạm vi của các hoạt động test một cách rõ ràng.
- Có thể quản lý sự thay đổi: các lần thay đổi test case dựa vào spec (thêm sheet revision, không xóa dòng cũ mà gạch ngang).
- Ngôn ngữ: Viết bằng ngôn ngữ đơn giản, dễ hiêu, thông dụng nhất, ngôn từ viết theo kiểu câu mệnh lệnh.

## * Ngoài ra cần chú ý những điểm sau trước khi viết 1 Testcase:
- Khi Test thì Test những gì đã được thiết kế ra(tests what it’s designed to).
- Kiểm tra được các điều kiện về ràng buộc miền giá trị dữ liệu (boundary conditions).
- Tạo ra được lỗi của chương trình.
- Nên đọc kĩ đặc tả kĩ thuật (Spec) 1 cách cẩn thận.
- Người đọc test case có thể không phải là người thiết kế ra test case, vì vậy đảm bảo sao cho tester khác cũng có thể đọc, hiểu test case và thực hiện test được.
- Kiểm tra kỹ các trường hợp ngoại lệ, trường hợp bất thường, trường hợp hiếm hoi và giá trị biên.

## => Điều này có nghĩa là test case khi viết ra phải test được các loại sau của chương trình:
- Functionality (các chức năng của ứng dụng).
- Boundary : test các ràng buộc về miền giá trị. Ví dụ như test dữ liệu nhập vào textbox.
- UI : test giao diện của chương trinh cần kiểm tra xem có đúng với tài liệu đặc tả không,  bao gồm các giá trị default cho control khi hiển thị, trạng thái của button hay checkbox,etc.
- Positive and negative: (test trường hợp đúng và trường hợp sai) điều quan trọng tiếp theo là thứ tự của việc tạo test case.Test trường hợp đúng thì các trường hợp này là dùng để kiểm tra chức năng tồn tại và các hành động theo đúng với spec không.
Còn đối với Negative : test các thông báo lỗi của chương trình ví dụ như nhập invalid data vào required field và tab sang field thì ứng dụng có thông báo lỗi cho user không.

# III. Một testcase cơ bản
![](https://images.viblo.asia/9e1b06e7-57b7-4fc5-9266-69c5edd7aafd.PNG)

Như trên chúng ta có thể thấy một số thành phần cơ bản của test case như sau:
- No. : Số thứ tự của testcase.
- Test case Description: Mô tả chính cho test case đó.
- Pre-condition: Những điều kiện tiền đề để chạy test case này.
- Test data: Data test gồm những cái gì.
- Steps to Perform: các bước thực hiện test case theo tuần tự.
- Expected Result: Kết quả mong muốn của test case là gi.

# IV. Vậy làm sao để VIẾT TESTCASE HIỆU QUẢ & ĐẦY ĐỦ?
## IV.1. Đầu tiên, phải viết TC test giao diện tổng thể.
- Kiểm tra giao diện màn hình là điều đầu tiên (Môi trường: Browser + Độ phân giải màn hình).
- Kiểm tra sự phân bố giữa các component.
- Kiểm tra hiển thị màn hình (Title,Grid,Button bố trí ntn.)
- Kiểm tra chính tả.
- Kiểm tra phân trang.
- Kiểm tra ngày giờ hệ thống.
- Nhập vượt data xem có bị bể giao diện không.
- UI: test giao diện của chương trinh cần kiểm tra xem có đúng với tài liệu đặc tả không.
- Kiểm tra độ rộng giữa các cột trong label và kích thước các control.
- Chỉ dữ liệu là text thì canh trái, dữ liệu là số thì canh phải...

## IV.2. Bước 2: viết các TC  để TEST về chức năng (kiểm tra về các button) trên màn hình:
- Kiểm tra các button hoặc các link trên form.
- Kiểm tra sự hoạt động các button.

Ví dụ: 
- Thêm mới, sửa, Xóa, Reset, Đóng,
- Button [Nhập lại] phải reset lại toàn bộ như lúc mới khởi tạo.

## IV.3. Bước 3: Viết các TC kiểm tra validates hoặc kiểu nhập liệu trên các textfield:
- Có cho phép null hay không?
- Có cho phép nhập Chữ hay không?
- Có cho phép nhập Số?
- Có cho phép nhập số âm hay không?
- Có cho phép nhập kí tự đặc biệt (!@#$%^&) hay không?
- Không cho phép nhập khoảng trắng 2 đầu hay không?
- Không cho phép nhập vượt data cho phép (maxlength),
- Kiểm tra min values và maxvalues cho các trường nhập số,
- Nhập trùng số xem hệ thống có đồng ý không?
- Validate ngày sinh, CMND or ngày hệ thống

## IV.4. Bước 4: Viết các TC tạo ra được các lỗi của chương trình.
- Kiểm tra các trường hợp đúng (Positive) và các trường hợp sai (Negative)của  chương trình.
- Kiểm tra nội dung các messages lỗi xem có đúng  chính tả ko, có đúng với nội dung xuất ra trên màn hình không?
- Tạo ra được lỗi của hệ thống, các trường hợp timeout,
- Kiểm tra kỹ các trường hợp ngoại lệ, trường hợp bất thường, trường hợp hiếm hoi và giá trị biên.
- Ngoài ra dựa theo yêu cầu nghiệp vụ của từng dự án mà có thể viết thêm một số TC để đảm bảo tính toàn vẹn.

## V. Ví dụ
Thực hiện viết testcase có form LOGIN bên dưới.

- Username: từ 3 - 50 kí tự (Số + chữ)

- Password: 6 - 30 kí tự

- Đăng nhập quá 3 lần sẽ bị khóa

![](https://images.viblo.asia/f4943f96-21eb-4789-b3c8-b3610cbac982.PNG)

Mọi người có thể check qua file testcase mà mình đã từng làm:
https://drive.google.com/file/d/1DcLA0K8lW7TuJolozbKKK73tSlpfF2Kx/view?usp=sharing

# Tổng kết:
Trong phần này mình đã chia sẻ về các kiến thức:
- Thế nào là TestCase?
- Những lưu ý khi viết testcase.
- Một testcase cơ bản.
- VIẾT TESTCASE HIỆU QUẢ & ĐẦY ĐỦ.

Ở phần tiếp theo mình sẽ chia sẻ về BUG.