### Giá trị phân vùng tương đương

Phân vùng tương đương được gọi là phân vùng phải kiểm tra chỉ một điều kiện từ mỗi phân vùng.
Trong điều này, chúng tôi giả định rằng nếu một điều kiện trong một phân vùng hoạt động, thì tất cả điều kiện sẽ hoạt động.
Cách khác, nếu một điều kiện trong phân vùng đó không hoạt động thì chúng tôi giả định rằng không có điều kiện nào khác sẽ hoạt động.

(Tuổi> 5 và <= 10)

Vì các giá trị từ 6 đến 10 là giá trị hợp lệ, một trong các giá trị trong số 6, 7, 8, 9 và 10 phải được chọn.
  Do đó, độ tuổi được chọn là "8" là độ tuổi đầu vào hợp lệ cho nhóm tuổi ở giữa (Tuổi> 5 và <= 10).
Phân vùng này được gọi là phân vùng tương đương.

![](https://images.viblo.asia/7f490d79-7955-4724-a89f-46ac0c7cf6f9.png)https://images.viblo.asia/7f490d79-7955-4724-a89f-46ac0c7cf6f9.png

Làm cách nào để chúng tôi xác định xem chương trình đã Pass hay thất bại?

Việc chuyển chức năng không chỉ phụ thuộc vào kết quả của các tình huống trên.
Đầu vào được đưa ra và đầu ra dự kiến sẽ cho chúng ta kết quả và điều này đòi hỏi bạn p hiểu kiến thức về miền.

Xác định kết quả của ví dụ:

![](https://images.viblo.asia/2c1a77f6-0422-4d4e-8895-6e46534cf8b1.png)

Do đó, nếu tất cả các trường hợp kiểm tra ở trên, miền của các trường hợp đều phải được pass. Nếu không, miền bị lỗi.

### Cấu trúc kiểm tra miền
Ở đây, người thử nghiệm thực hiện theo các bước dưới đây trong một thử nghiệm tên miền, chúng có thể được tùy chỉnh / bỏ qua theo nhu cầu thử nghiệm của chúng tôi.

* Xác định các biến tiềm năng thú vị.

* Xác định (các) biến mà bạn có thể phân tích ngay bây giờ và sắp xếp chúng (nhỏ nhất đến lớn nhất và ngược lại).

* Tạo và xác định các giá trị biên và các giá trị lớp tương đương như trên.

* Xác định thứ nguyên phụ và phân tích từng thứ nguyên theo cách cổ điển (Trong ví dụ trên, Giới tính là thứ nguyên phụ).

* Xác định và kiểm tra các biến chứa kết quả (biến đầu ra).

* Đánh giá cách chương trình sử dụng giá trị của biến này.

* Xác định các biến có liên quan bổ sung tiềm năng để thử nghiệm kết hợp.

* Hãy tưởng tượng những rủi ro không nhất thiết phải ánh xạ tới một chiều hướng rõ ràng.

* Xác định và liệt kê các biến không được kiểm soát. Thu thập thông tin để phân tích sau.

* Tóm tắt phân tích của bạn với một bảng rủi ro / tương đương.

Tổng kết

Thông qua các ví dụ trên Kiểm thử miền Là loại kiểm thử kiểm tra những thông tin mà người dùng sử dụng để nhập vào, kiểm tra các kết quả nhận được và xem xét chúng có đúng không. Thường được thực hiện bởi đội phát triển phần mềm và team test automation.