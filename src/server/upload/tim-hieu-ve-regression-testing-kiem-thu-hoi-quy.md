## 1.Kiểm thử hồi quy là gì?
Kiểm thử hồi quy được định nghĩa là một loại kiểm thử để xác nhận rằng việc nâng cấp phiên bản mới, hoặc thêm chức năng mới cho ứng dụng không làm cho các chức năng có sẵn của ứng dụng hoạt động sai yêu cầu.
Kiểm tra hồi quy là việc thực hiện test lại các chức năng đã test để đảm bảo các chức năng hiện có hoạt động tốt theo đúng yêu cầu.

## 2. Khi nào cần thực hiện kiểm thử hồi quy
Kiểm tra hồi quy là cần thiết khi

* Thay đổi requirements và code được sửa đổi theo yêu cầu mới
* Thêm tính năng mới vào phần mềm
* Sửa lỗi
* Nâng cao hiệu suất
* Thay đổi môi trường 

## 3.Cách thực hiện kiểm thử hồi quy
Bảo trì phần mềm là một hoạt động bao gồm cải tiến, sửa lỗi, tối ưu hóa và xóa các tính năng hiện có. Những sửa đổi này có thể khiến hệ thống hoạt động không chính xác. Do đó, Kiểm tra hồi quy trở nên cần thiết. Kiểm tra hồi quy có thể được thực hiện bằng các kỹ thuật sau:
![](https://images.viblo.asia/f94ff5fc-1953-451c-bae2-b2fea9e89594.png)
                              

### 1.Test lại tất cả
Đây là một trong những phương pháp để Kiểm tra hồi quy thực hiện chạy lại toàn bộ test case. Điều này đòi hỏi thời gian và nguồn lực rất lớn.

### 2.Lựa chọn các trường hợp kiểm thử
Thay vì thực hiện chạy lại toàn bộ test case các này sẽ chọn một phần test case được đánh giá là ảnh hưởng sau khi nâng cấp phiên bản ứng dụng. Các test case được chọn có thể được phân thành 2 loại, một là các test case bị ảnh hưởng bởi việc thay đổi code và một loại khác là các test case không còn đúng với requirements ở thời điểm hiện tại. Các test case có thể sử dụng lại có thể được sử dụng trong các chu kỳ hồi quy trong tương lai trong khi các test case đã không còn đúng với yêu cầu mới của ứng dụng không được sử dụng trong các chu kỳ hồi quy sắp tới.

### 3.Ưu tiên trường hợp thử nghiệm
Ưu tiên các test case chức năng thương mại, các chức năng quan trọng và được sử dụng thường xuyên. Lựa chọn các trường hợp kiểm thử dựa trên mức độ ưu tiên sẽ giảm đáng kể số lượng test case cho kiểm thử hồi quy.

## 4.Chọn test case để kiểm thử hồi quy
Kiểm thử hồi quy hiệu quả có thể được thực hiện bằng cách :

* Chọn các test case thường xuyên có lỗi
* Các chức năng người dùng dễ nhìn thấy và sử dụng
* Chọn các test case đảm nhiệm các chức năng chính của sản phẩm
* Chọn các chức năng được thay đổi code gần đây
* Chọn tất cả các case test tích hợp
* Chọn các case kiểm tra logic phức tạp
* Các case giá trị biên
* Thực hiện một số case thành công
* Thực hiện một số case thất bại

## 5.Công cụ dùng trong kiểm thử hồi quy
Nếu phần mềm được xác định thay đổi thường xuyên, thì chi phí cho việc kiểm thử hồi quy sẽ cao. Trong các trường hợp như vậy, việc thực hiện thủ công các trường hợp kiểm thử tiêu tốn nhiều thời gian và chi phí. Việc lựa chọn công cụ tự động là lựa chọn thông minh trong các trường hợp như vậy. Tool tự động có thể sử dụng lại cho các chu kỳ hồi quy kế tiếp. 
Sau đây là các công cụ quan trọng sử dụng trong kiểm thử hồi quy.

Selenium : Đây là một công cụ nguồn mở được sử dụng để tự động hóa các ứng dụng web. Selenium có thể được sử dụng để kiểm tra hồi quy dựa trên trình duyệt.

Quick Test Professional (QTP) : HP Quick Test Professional là phần mềm tự động được thiết kế để tự động hóa các trường hợp kiểm tra chức năng và hồi quy. Nó sử dụng ngôn ngữ VBScript

RFT: Là công cụ được phát triển bơi IBM là một công cụ Java được sử dụng để tự động hóa các trường hợp kiểm thử của các ứng dụng phần mềm. Điều này chủ yếu được sử dụng để tự động hóa các trường hợp kiểm tra hồi quy và nó cũng tích hợp với Rational Test Manager. 

## 6.Kiểm thử hồi quy và quản lý cấu hình
Quản lý cấu hình trong quá trình kiểm tra hồi quy trở nên cấp thiết trong môi trường Agile mô hình luôn có requirements thay đổi liên tục. Để đảm bảo kiểm thử hồi quy hiệu quả, hãy tuân thủ các điều sau:

Trong giai đoạn kiểm thử hồi quy dev không được thay đổi, chỉnh sửa mã code.
Cơ sở dữ liệu được sử dụng để kiểm tra hồi quy Không được phép thay đổi cơ sở dữ liệu

## 7.Những thách thức trong kiểm thử hồi quy:
![](https://images.viblo.asia/6acfc507-6637-40b1-bd30-4f60aa718134.png)

Kiểm thử hồi quy liên tục dẫn đến các khối lượng test case cần test trở nên khá lớn. Do hạn chế về thời gian và ngân sách, thực hiện chạy toàn bộ test case là không thể.
Tối thiểu hóa số lượng test case liên quan đến các thay đổi chức năng của ứng dụng vẫn là một việc tiêu tốn nhiều thời gian và có nhiều khó khăn.

Nguồn tài liệu: https://www.guru99.com/regression-testing.html