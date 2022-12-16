Một Tester - nếu với một người ít kinh nghiệm thì chắc bạn chỉ trải nghiệm qua một vài lĩnh vực Test, nhưng đối với một người đã nhiều kinh nghiệm rồi thì tôi nghĩ bạn sẽ trải nghiệm Test đa dạng và phong phú hơn đúng không? Với tôi, việc Test không chỉ dừng lại ở một lĩnh vực nào đó, yên vị mà ngồi test nó qua ngày này năm khác. Với một đứa ưa thách thức, thích sự trải nghiệm như tôi, tôi luôn muốn tìm sự mới mẻ trong ngành Tester của mình. Muốn cảm giác được trải nghiệm qua nhiều lĩnh vực, để học hỏi cho bản thân. Và test website là thách thức đầu tiên khi tôi bước vào nghề.
Khi nói test website, chắc người ta thường nghĩ thật đơn giản, vì nhìn một trang website thấy nó cũng khá đơn giản. Đúng vậy, đơn giản nhưng lại khá phức tạp nha :D Các website cũng được phân chia ra nhiều loại website: tin tức, giáo dục, thương mại điện tử, mạng xã hội, web-app,..
Riêng test website thôi cũng vô vàn kiến thức rồi nha. Mỗi loại website sẽ có những cách test khác nhau, có cái đặt sự tỉ mỉ lên hàng đầu, nhưng có cái lại đặt hiệu năng lên hàng đầu...
Cùng điểm lại những điều cần lưu ý chung khi test website nha.

### 1. UI/UX (User Interface/ User Experiences)

**A. Nội dung cần test**
* Hình thức: menu, kích thước, vị trí, màu sắc,chính tả, font chữ....
* Các điều khiển: textbox, radio button, checkbox, dialog, icon, các phím Tab/ShiftTab/Enter...
* Giá trị mặc định
* Việc xử lí các thao tác(action): Add, Update, Delete, Select, Search, Import/Export, Share..
* Valid data: nhập các bộ dữ liệu hợp lệ
* Flow: mối liên hệ giữa các chức năng theo luồng nghiệp vụ

**B. Phương pháp test**
* Dựa trên Spec thiết kế giao diện, kiểm tra lần lượt theo trật tự hình chữ Z (trên - dưới, trái - phải)
* Để test function, ta sẽ áp dụng kĩ thuật test(phân tích giá trị biên, phân vùng tương đương) để phân tích các trường hợp hợp lệ/không hợp lệ, các luồng nghiệp vụ đúng...
* Khi test action cần chú ý: với mỗi thao tác của người dùng đều làm cho hệ thống thay đổi theo một cách nào đó, cần so sánh kĩ kết quả trả về với luồng yêu cầu 
* Khi test flow: hiểu và nắm được về luồng nghiệp vụ của mỗi phần mềm

### 2.  Link Testing

**A. Nội dung cần test**
* Kiểm tra các link liên kết ngoài trang web
* Kiểm tra tất cả các links nội bộ
* Kiểm tra các links tới các vị trí trong cùng trang
* Kiểm tra các links sử dụng để gửi mail tới admin hoặc người dùng khác từ trang web
* Kiểm tra xem có trang trống nào không
* Kiểm tra các links bể trong tất cả các links nói trên

**B. Phương pháp test**
Click vào xem các link có hoạt động không, có hiển thị ra như mong muốn hay không?

### 3. Compatibility testing

**A. Nội dung cần test**
* Kiểm thử sự tương thích với trình duyệt
* Kiểm thử sự tương thích với hệ điều hành
* Kiểm thử sự tương tích với thiết bị di động
* Kiểm thử sự tương thích với tùy chọn các thiết bị ngoại vi ( máy in …)

**B. Phương pháp test**
Khi test một web thì cần phải có các yêu cầu:
* Chạy trên hệ điều hành: window… back 2 trở lên
* Chạy các trình duyệt : firefox, chrome, IE,
* Chạy trên các trình duyệt của các thiết bị di động có hệ điều hành là android hoặc ios.
* Có thể kết nối với máy in để in 
=> Khi kiểm thử phải thực hiện kiểm thử tính tương thích của phần mềm với tất cả các yêu cầu trên.

### 4. Usability testing

**A. Nội dung kiểm thử:**
* Kiểm thử cho chuyển hướng
* Kiểm thử tính khả dụng
* Kiểm thử nội dung
* Các thông tin hỗ trợ người dùng

**B. Phương pháp thực hiện:**
Đối với tính khả dụng này, có thể làm theo yêu cầu cụ thể của khách hàng với từng tiêu chí ứng với nghiệp vụ.

### 5. Security testing

**A - Nội dung kiểm thử**
* Kiểm tra lỗi SQL Injection:
* Kiểm tra lỗi XSS
* Kiểm tra lỗ hổng CSRF
* Kiểm tra lỗi Path Traversal
* Kiểm tra lỗi mã hóa dữ liệu
* Kiểm tra lỗi xác thực/phân quyền
* Kiểm tra lỗi User enumeration
* Kiểm tra lỗi Session fixation
* Kiểm tra lỗ hổng cho phép dò đoán mật khẩu, thu thập danh sách, thông tin người dùng: Các ứng dụng không có cơ chế bảo vệ sử dụng captcha, lock account khi đăng nhập sai quá số lần quy định đều có khả năng bị mắc lỗi này.

**B - Cách thức thực hiện**

* Ví dụ 1: Kiểm tra lỗi sql injection Nhập vào form đăng nhập chuỗi ký tự đặc biệt: test' or '1'='1. Hệ thống đăng nhập thành công => bị lỗi sql injection

* Ví dụ 2: Kiểm tra lỗi xss:
Nhập vào chuỗi kí tự <script>alert(“ XSS”)</script> vào những nơi có thể nhập được dữ liệu
Sau đó, kích nút Lưu
=> Nếu ứng dụng lưu lại và cho phép thực thi script thì trên trình duyệt sẽ xổ ra cửa sổ có dòng chữ “ XSS”, khi đó ứng dụng bị mắc lỗi XSS.

Tìm hiểu thêm lỗi và cách tấn công website bằng XSS
* Ví dụ 3: Kiểm tra lỗi xác thực/phân quyền: Sử dụng 2 user, 1 user có quyền thấp và 1 user có quyền cao hơn. Khi sử dụng user có quyền cao truy cập vào các chức năng dành riêng ta ghi lại các đường dẫn trên URL, sau đó đăng nhập vào bằng user quyền thấp và thử truy cập vào link đó. Nếu ứng dụng cho phép user truy cập thì cơ chế xác thực phân quyền của ứng dụng không có tác dụng.

* Ví dụ 4: kiểm tra lỗi User enumeration : Đăng nhập vào ứng dụng (cố tình nhập sai user hoặc password sai). Nếu ứng dụng trả về câu thông báo cụ thể là “sai mật khẩu” hoặc “sai user” thì ứng dụng mắc lỗi. Còn nếu trả về câu thông báo chung ví dụ “Username hoặc password không đúng.” thì không bắt lỗi.

* Ví dụ 5: Kiểm tra lỗi lỗ hổng cho phép dò đoán mật khẩu, thu thập danh sách, thông tin người dùng: Các ứng dụng không có cơ chế bảo vệ sử dụng captcha, lock account khi đăng nhập sai quá số lần quy định đều có khả năng bị mắc lỗi này

### 6. Performance testing/Load test/ Stress test

**Performance Testing:**
Công cụ kiểm thử: jmeter tool
* Kiểm tra hiệu quả thực thi của ứng dụng như Thời gian phản hồi và Tốc độ thực hiện của nó
Mục đích: giúp phát hiện ra những vẫn đề thiếu xót về tài nguyên của server – side như:
* Ảnh hưởng của băng thông
* Khả năng của database
* Yêu cầu phần cứng/phần mềm

**Load testing**
Kiểm tra hệ thống thực thi trong điều kiện có nhiều người dùng cùng truy xuất đồng thời dưới nhiều điều kiện khác nhau:
Mục đích:
* Nhiều người cùng truy cập
* Nhiều giao dịch thực hiện cùng lúc
* Xử lý file dung lượng lớn
* Xử lý cùng lúc nhiều file …

**Stress Test**
* Kiểm tra dựa trên việc tăng liên tục mức độ chịu tải cho đến khi hệ thống ngưng hoạt động
Mục đích: xác định mức tới hạn của hệ thống có thể đáp ứng
* Đối với các loại kiểm thử này, người dùng thông thường sử dụng một số loại tool test tự động để thực hiện nó như jmeter, quick test pro, …

### 7. Regression test
Kiểm thử hồi quy tập trung vào việc tìm kiếm lỗi sau khi xảy ra việc thay đổi code. Đặc biệt, nó tìm kiếm theo cách hồi qui (đệ qui) hoặc kiểm tra các bug cũ có bị lại hay không. Hồi qui như vậy xảy bất cứ khi nào mà chức năng phần mềm trước đây làm việc đúng đã ngưng làm việc theo mong đợi.
Hướng dẫn thực hiện:
* Với các dự án nhỏ, kiểm thử hồi quy được thực hiện thủ công.
* Với các dự án vừa và lớn, có khoảng thời gian xây dựng, phát triển và duy trì lâu dài thì người ta hướng tới việc viết các kịch bản tự động test. Kiểm thử viên có thể sử dụng các tool như selenium để viết các script tự động này.