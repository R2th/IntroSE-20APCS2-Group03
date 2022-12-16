### **1.BUG là gì?**
Bug là những lỗi phần mềm trong chương trình hoặc hệ thống máy tính khiến cho kết quả trả về không được chính xác hoặc không đạt hiệu quả như mong muốn. Hiểu một cách đơn giản hơn, bug là lỗi xuất hiện trong quá trình viết code mà bất cứ người lập trình viên nào cũng khó tránh khỏi.

### **2. Phân loại BUG trong testing**
### 2.1 Dựa theo mức độ nghiêm trọng

**Block (Lỗi nghiêm trọng)**
Lỗi này thuộc loại lỗi chức năng. Khi người dùng gặp phải Block họ sẽ không thể truy cập vào bất kì link nào và làm những gì họ muốn. 
Các biểu hiện cụ thể ví dụ như: link hỏng và không tải được trang, ứng dụng bị crash hay website bị đơ khi làm gì đó, mật khẩu mới không được nhận,...

 **Critical (Khá nghiêm trọng)**
Những lỗi nghiêm trọng khiến người dùng không thể sử dụng được ứng dụng như hệ thống sập, dữ liệu bị mất, ứng dụng không cài đặt được...

 **Major/High (Mức độ cao)**
Chức năng chính của sản phẩm không hoạt động.

 **Medium (Mức độ trung bình)**
Sản phẩm hoặc ứng dụng hoạt động không đáp ứng tiêu chí nhất định hoặc vẫn còn bộc lộ một số hành vi không mong muốn, tuy nhiên các chức năng khác của hệ thống không bị ảnh hưởng.

 **Low (Mức độ thấp)**
Lỗi xảy ra hầu như không ảnh hưởng gì đến chức năng, nhưng vẫn là lỗi và vẫn cần được sửa. Ví dụ như các lỗi về sai text, sai vị trí button.

 **Enhancement ( Cải tiến)**
Yêu cầu một tính năng mới hoặc một số cải tiến trong hiện có.

### 2.2 Dựa theo chức năng
**Functional Bug (Lỗi chức năng)**
Lỗi chức năng liên quan đến các thao tác bạn thực hiện và chỉ phát hiện được khi làm gì đó trên website và không nhận được phản hồi như mong muốn.
ví dụ như: 
+ Email không gửi tới
+ Không thể đăng nhập
+ Nút chuyển hướng tới trang 404
+ Người dùng quay về trang chủ trong khi muốn truy cập trang khác
+ Mất âm thanh video
+ Không thể tắt popup
+ Trang bị đơ

**Lỗi đồ họa (Graphical Bug)**
Đây là lỗi tĩnh, liên quan tới giao diện, dàn trang
ví dụ như: 
+ Hình ảnh mờ và không cân xứng
+ Hình ảnh, văn bản, link… bị chèn lên nhau
+ Giữa các yếu tố trên trang không đồng nhất, trường thì nằm ngoài vùng hiển thị của màn hình
+ Hình ảnh, video méo mó

**Lỗi từ ngữ (Wording Bug)**
Lỗi này thuộc phần nội dung văn bản ví dụ như:
+ Dịch sai khiến người dùng hiểu sai nghĩa
+ Văn bản hiển thị khác so với bản mockup
+ Kí tự đặc biệt không được mã hóa
+ Lỗi chính tả, ngữ pháp
+ Văn bản gây hiểu nhầm nghĩa
+ Từ viết thường và viết hoa không đồng nhất

**Ergonomics (Yếu tố con người)**
Các vấn đề này liên quan tới trải nghiệm người dùng, có thể là lỗi nhưng phần lớn chỉ là gợi ý. 
Các trường hợp thường xảy ra như: 
+ Click quá nhiều lần mới xem được sản phẩm cũng như logo đặt ở vị trí không thích hợp
+ Thanh điều hướng quá lớn, chữ quá nhỏ cùng với màu nền không đủ đối lập gây cảm giác khó nhìn cho người xem
+ Pop-in và pop-up nên có thêm biểu tượng "x" để tắt, nếu trang web không thể phản hồi lại nên có thông báo “bạn có chắc chắn muốn thực hiện?”

**Performance Bug (Lỗi hoạt động)**
Lỗi này thường do môi trường kỹ thuật gây ra.
ví dụ như: 
+ Thời gian tải trang lâu, việc tải trang hay bị gián đoạn khi tải xong thì không hiển thị được nội dung, còn chất lượng video stream kém và không thể tải hình ảnh.

### 2.3 Dựa theo tần suất

**Lỗi luôn luôn:**
 Các lỗi sẽ lặp lại nhiều lần đến khi được khắc phục. Người phát triển sẽ biết nguồn gốc lỗi và phải kiểm tra từ đầu.

**Lỗi ngẫu nhiên:**
 Những lỗi này khá khó nhằn và cũng khiến bạn phát điên (hoặc thích thú). Đôi khi, nó xảy ra và không biết được là xảy ra trong điều kiện nào. Cần kiên nhẫn kiểm tra từng bước để khắc phục được lỗi này.

**Lỗi một lần:**
 Các lỗi này chỉ xuất hiện duy nhất một lần, có thể là lỗi thật nhưng điều kiện xảy ra lỗi cũng khá bí ẩn. Quản lý sản phẩm thường không chú ý tới lỗi này.

### **3. Một số lỗi thường gặp khi test WEB**
### 3.1 Lỗi về chức năng ( Function bug)
* Lỗi chưa verify Button đã được hiển thị khi chưa nhập đủ các trường bắt buộc 
* Link từ trang này đến trang khác không hoạt động 
* Link từ trang này đến trang khác bị sai 
* Lỗi khi nhập các thẻ HTML, kí tự đặc biệt, kí tự mở rộng…vào các ô Textbox
* Không hiển thị hoặc hiển thị sai các thông báo lỗi khi xảy ra lỗi nhập liệu trên màn hình 
* Dữ liệu cũ được thực hiện nhiều lần: browser back, F5... 
* Có thông báo thực hiện xong chức năng nhưng dữ liệu không được ghi vào DB
* Đưa vào một lượng lớn dữ liệu làm chương trình không chạy được 
* Nhập sai kiểu dữ liệu làm hệ thống xảy ra lỗi không lưu vào database được
* Lỗi Notify thông báo chưa sắp xếp theo thứ tự mới nhất 
### 3.2 Lỗi về bảo mật (Security Bug)
* Từ một trang hiện tại, thay đổi một số thuộc tính trên link thì có thể đến một trang khác mà người dùng không có quyền truy cập
* User đã out khỏi hệ thống, browser back nhưng vẫn có thể thực hiện các chức năng
* Hệ thống share link cho người dùng hiển thị sai chức năng so với permision được cấp 
### 3.3 Lỗi giao diện (Interface Bug)
* Cách trình bày website không đồng nhất: font chữ, màu sắc,..
* Các button hoặc label khác loại mà giống nhau tất cả về màu sắc 
* Kích thước các ô textbox bị hạn chế (fix cứng) các giá trị trong các ô đó không được hiển thị đầy đủ
* Layout bị hỏng khi mở lên các môi trường (browser) khác nhau 
* Sai chính tả
* Button không chuyển sang màu xám khi bị disable
* Popup nhiều lớp, khi chưa đóng cái sau cùng mà vẫn click hoặc đóng được lớp trước nó 
* Lỗi Notify thông báo, khi click xem rồi chưa chuyển màu (từ đậm sang bình thường) 
### 3.4 Lỗi khác (Others Bug)
* Khi có nhiều user cùng truy cập thì hệ thống không đáp ứng được yêu cầu (performance).
* Thiếu kí tự (*) bên cạnh các trường bắt buộc.
* Lỗi nhấn Login nhiều lần mới vào được hệ thống.