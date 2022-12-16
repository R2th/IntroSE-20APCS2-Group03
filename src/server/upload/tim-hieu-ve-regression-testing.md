Chắc chắn các bạn đã nghe nhiều đến từ Regression Testing nhưng để hiểu đúng nghĩa của nó thì tôi đảm bảo rất nhiều người đang hiểu chưa đúng. Vậy Regression Testing là gì? Nó là loại kiểm thử như thế nào chúng ta hãy cùng tìm hiểu nhé.

# Regression Testing (Kiểm thử hồi quy) là gì?
Regression Testing được định nghĩa là một loại kiểm thử phần mềm để xác nhận rằng một chương trình hoặc thay đổi code gần nhất không ảnh hưởng xấu đến các tính năng hiện có.

Regression Testing không có gì nhưng việc lựa chọn đầy đủ hoặc một phần của các trường hợp thử nghiệm đã thực hiện được tái thực hiện để đảm bảo các chức năng hiện có hoạt động tốt.

Kiểm thử này được thực hiện để đảm bảo rằng các thay đổi code mới sẽ không ảnh hưởng đối với các chức năng hiện có. Nó đảm bảo rằng code cũ vẫn hoạt động sau khi thay đổi code mới được thực hiện.

# Kiểm thử hồi quy cần khi nào?

Kiểm thử hồi quy là cần thiết khi có một

* Thay đổi yêu cầu và code được sửa đổi theo yêu cầu
* Tính năng mới được thêm vào phần mềm
* Sửa lỗi
* Khắc phục sự cố hiệu suất

# Cách thực hiện kiểm thử hồi quy
Bảo trì phần mềm là một hoạt động bao gồm cải tiến, sửa lỗi, tối ưu hóa và xóa các tính năng hiện có. Những sửa đổi này có thể khiến hệ thống hoạt động không chính xác. Do đó, Kiểm thử hồi quy trở nên cần thiết. Kiểm thử hồi quy có thể được thực hiện bằng các kỹ thuật sau:

![](https://images.viblo.asia/c4532d1d-5314-4134-b1d5-3d94afb5a23e.PNG)

### Kiểm thử lại tất cả
* Đây là một trong những phương pháp để Kiểm thử hồi quy trong đó tất cả các kiểm thử trong nhóm kiểm thử hoặc bộ kiểm thư hiện có sẽ được thực hiện lại. Điều này rất tốn kém vì nó đòi hỏi thời gian và nguồn lực rất lớn.

### Lựa chọn kiểm thử hồi quy
* Thay vì thực hiện lại toàn bộ bộ kiểm thử, tốt hơn là chọn một phần của bộ kiểm thử sẽ được chạy
* Các trường hợp thử nghiệm được chọn có thể được phân loại thành:
           1) Các trường hợp thử nghiệm tái sử dụng 
           2) Các trường hợp thử nghiệm lỗi thời.
* Các trường hợp kiểm thử có thể sử dụng lại có thể được sử dụng trong các chu kỳ hồi quy thành công.
* Các trường hợp kiểm thử lỗi thời không thể được sử dụng trong các chu kỳ tiếp theo.

### Độ ưu tiên của các trường hợp kiểm thử
* Các trường hợp kiểm thử được sắp xếp độ ưu tiên tùy thuộc vào tác động kinh doanh, các chức năng quan trọng và được sử dụng thường xuyên. Lựa chọn các trường hợp kiểm thử dựa trên mức độ ưu tiên sẽ giảm đáng kể bộ kiểm tra hồi quy.

### Chọn các trường hợp kiểm thử để kiểm thử hồi quy
Nó được tìm thấy từ dữ liệu đã có hoặc một số lượng lớn các lỗi được khách hàng báo cáo là do sửa lỗi vào phút cuối gây ra các ảnh hưởng chính vì vậy mà chọn Test Case để kiểm thử hồi quy là một nghệ thuật và không dễ dàng. Kiểm thử hồi quy hiệu quả có thể được thực hiện bằng cách chọn các trường hợp kiểm tra sau:

* Các trường hợp kiểm thử thường xuyên xẩy ra lỗi
* Các chức năng dễ thấy hơn đối với người dùng
* Các trường hợp kiểm thử xác minh các tính năng cốt lõi của sản phẩm
* Các trường hợp kiểm thử của Chức năng đã trải qua nhiều thay đổi gần đây
* Tất cả các trường hợp kiểm thử tích hợp
* Tất cả các trường hợp kiểm thử phức tạp
* Trường hợp kiểm thử giá trị biên
* Một vài các trường hợp kiểm thử mẫu đã thành công
* Một vài các trường hợp kiểm thử mẫu đã Thất bại

# Một số Công cụ dùng trong kiểm thử hồi quy
Nếu một phần mềm trải qua những thay đổi thường xuyên, chi phí kiểm thử hồi quy sẽ leo thang.

Trong các trường hợp như vậy, việc thực hiện thủ công các trường hợp kiểm thử làm tăng thời gian thực hiện kiểm thử cũng như chi phí.

Tự động hóa các trường hợp kiểm thử hồi quy là sự lựa chọn thông minh trong các trường hợp như vậy.

Phạm vi tự động hóa phụ thuộc vào số lượng các trường hợp kiểm thử vẫn có thể sử dụng lại cho các chu kỳ hồi quy kế tiếp.

Sau đây là các công cụ quan trọng nhất được sử dụng cho cả kiểm thử chức năng và hồi quy trong công nghệ phần mềm:

* Ranorex Studio
* Testim
* Selenium
* Quick Test Professional (QTP)
* Rational Functional Tester (RFT)
# Kiểm tra hồi quy và quản lý cấu hình
Quản lý cấu hình trong quá trình kiểm thử hồi quy trở nên quan trọng trong môi trường Agile bởi vì mô hình này code được sửa đổi liên tục. Để đảm bảo kiểm thử hồi quy hiệu quả, hãy tuân thủ các điều sau:

* Code được kiểm tra hồi quy phải theo một công cụ quản lý cấu hình
* Không được phép thay đổi code trong giai đoạn kiểm thử hồi quy. Code kiểm thử hồi quy phải được giữ nguyên không liên quan đến với những thay đổi mới của nhà phát triển.
* Cơ sở dữ liệu được sử dụng để kiểm tra hồi quy phải được cách ly. Không được phép thay đổi cơ sở dữ liệu.

# Sự khác biệt giữa Kiểm thử lại và Kiểm thử hồi quy:
Kiểm thử lại có nghĩa là kiểm tra lại chức năng hoặc lỗi để đảm bảo code được sửa. Nếu nó không được sửa, lỗi cần phải được mở lại. Nếu lỗi đã được sửa thì lỗi được đóng lại.

Kiểm thử hồi quy có nghĩa là kiểm tra ứng dụng phần mềm của bạn khi nó trải qua thay đổi code để đảm bảo rằng code mới không ảnh hưởng đến các phần khác của phần mềm.

Nguồn tham khảo: https://www.guru99.com/regression-testing.html