# 1. Web thương mại điện tử là gì?
Thương mại điện tử hoặc trang web thương mại điện tử đề cập đến một mô hình kinh doanh liên quan đến các giao dịch bán hàng được thực hiện trên web. Hầu như mọi trang web mua sắm trực tuyến - dù lớn hay nhỏ - đều tuân theo cấu trúc này. Bất kỳ trang web nào có các mặt hàng để bán qua internet đều được coi là một trang web thương mại điện tử.
Hầu hết  các website thương mại điện tử đều có cấu trúc chung
ví dụ:
* Homepage - Trang chủ
* Search Result Page -  Trang kết quả tìm kiếm
* Product Details Page - Trang chi tiết sản phẩm
* Oder Form Page - Trang đặt hàng
* Oder Comfirmation Page - Trang xác nhận đặt hàng
* Login Form Page and Account Page - Trang đăng nhập tài khoản 

# 2. Tại sao phải kiểm thử website thương mại điện tử?
Mục đích của việc kiểm thử trang web thương mại điện tử nhằm ngăn ngừa các lỗi và tăng giá trị cho sản phẩm bằng cách đảm bảo sự phù hợp với yêu cầu khách hàng.
Đảm bảo độ tin cậy, chất lượng phần mềm và hiệu suất tối ưu và khả năng sử dụng
Xây dựng hệ thống thương mại điện tử là một quá trình phức tạp, để duy trì được tính toàn vẹn của hệ thống thương mại điện tử. Đôi khi một trang web thương mại điện tử gặp sựu cố , nó có thể gây ra nhiều thiệt hại về kinh tế, danh tiếng cho tổ chức, hoặc làm mất hứng thú trải nghiệm của khách hàng vì thế Kiểm thử trở thành bắt buộc

# 3. Các điểm cần kiểm tra cho hệ thống thương mại điện tử

###  1. Tính tương thích của browser      
* Kiểm tra trang web có chạy mượt trên các trình duyệt. 
* Kiểm tra với các version của trình duyệt. 
* Kiểm tra trình duyệt chạy trên các nền tảng khác nhau (Linux, Windows, Mac,...)
###  2. Hiển thị trang 
* Kiểm tra thông tin trang trong trường hợp bình thường và bất bình thường.  
* Kiểm tra trang trong và sau thời gian phản hồi một yêu cầu. 
* Kiểm tra các liên kết trang, plugin, Kích thước, phông chữ....  
### 3. Session làm việc 
* Kiểm tra trường hợp hết hạn session(người dùng có thực sự bị đăng xuất sau khi hết hạn session). 
* Lưu trữ session (việc restore session sau khi đóng ứng dụng còn chính xác không )
### 4. Khả năng sử dụng 
* Kiểm tra thiết kế có dễ dàng cho người dùng
* người dùng có dễ dàng trong việc điều hướng trang
### 5. Phân tích nội dung
* Kiểm tra xem nội dung có bị sai lệch, gây khó chịu, xúc phạm hay tranh chấp
* Các hình ảnh có bị vi phạm bản quyền, gây hại đến hình ảnh thương hiệu của công ty
* Nội dung có bị hiểu nhầm 
### 6. Khả dụng
* Cần kiểm soát được các mối đe dọa có thể tấn công qua cơ sở dữ liệu
* Việc lộ các thông tin bảo mật khi thực hiện các giao dịch cần phải được kiểm tra kỹ lưỡng
### 7. Sao lưu và khôi phục
* Kiểm tra khả năng chịu lỗi của hệ thống
* Kiểm tra xem có cơ chế nào phục hồi hệ thống đang bị lỗi không
### 8. Giao dịch
* Kiểm tra số tiền thanh toán cuối cùng, VAT, phí giao hàng và bất kỳ khoản phí nào khác tùy theo từng loại đơn hàng
* Kiểm tra việc thanh toán với từng loại phương thức: Paypai, Visa, Visa debit, Mastercard...
* Kiểm tra email xác nhận đã được gửi đúng chưa, kiểm tra khi hủy đơn hàng có được hoàn trả lại thanh toán, email hoàn lại tiền có đến người nhận thành công 
### 9. Xử lý đơn hàng và đặt mua hàng
* Kiểm tra giỏ hàng khi được cập nhập sản phẩm với tên sản phẩm, hình ảnh, giá tương ứng có chính xác không
* Kiểm tra xử lý đơn hàng trong trường hợp thêm sản phẩm, thêm 1 sản phẩm nhiều lần, thêm nhiều sản phẩm, loại bỏ nhiều loại sản phẩm khác nhau, loại bỏ tất cả...
* Kiểm tra xử lý thanh toán đơn hàng khi có sản phẩm giảm giá

### 10. Kiểm tra ngôn ngữ
* Kiểm tra trang web khi lựa chọn các ngôn ngữ khác nhau

### 11. Kiểm thử performance
* Kiểm tra thời gian tải khi có lượng user truy cập lớn 
* Kiểm tra thời gian phản hồi một yêu cầu

### 12. Search form
* Kiểm tra các sản phẩm có được hiện thị tương ứng với điều kiện tìm kiếm
* Có sắp xếp sản phẩm theo xếp hạng và ý kiến của khách hàng
* Số lượng sản phẩm hiển thị trên 1 trang
* Kiểm tra hiển thị sản phẩm trên các trang là khác nhau, không bị trùng lặp

# 4. Một số ví dụ
### Trang chủ
Trang chủ là trang đầu tiên xuất hiện khi người dùng mở trang web. Trên một trang web thương mại điện tử, trang chủ bao gồm một nguồn thông tin rất phong phú và hữu ích, nó cũng sẽ liên kết người dùng với các trang khác nhau có trên trang web để sử dụng thêm.

Cần kiểm tra khả năng tương tác và chức năng của trang chủ của trang web thương mại điện tử. Nên xác minh tất cả các chi tiết và các yếu tố trực quan trên trang. 

### Chi tiết sản phẩm
![](https://images.viblo.asia/9df39a07-7398-47fa-8b4c-c0d9821a695c.jpg)
Trang chứa các chi tiết của một sản. Đây là một yếu tố rất quan trọng. Cần chú ý kiểm tra các yếu tố :

- mã sản phẩm và tiêu đề, 

- hình ảnh sản phẩm, mô tả sản phẩm, 

- phóng to hình ảnh, 

- hiển thị các sản phẩm liên quan, 

- thêm một sản phẩm vào giỏ hàng, 

- Chế độ xem toàn bộ sản phẩm 

và nhiều thứ khác nữa. 

### Giỏ hàng
Nên kiểm tra số lượng các mặt hàng trong giỏ hàng theo các giao dịch. Chức năng thay đổi, loại bỏ các mặt hàng trong giỏ hàng cũng cần được kiểm tra 

### Thanh toán
![](https://images.viblo.asia/f3b690ad-a70e-4df4-a43b-2fad569926d0.jpg)
Yếu tố này rất quan trọng đối với cả doanh nghiệp và khách hàng vì nó liên quan đến tiền. Người kiểm thử cần đảm bảo rằng việc hoàn tất thanh toán phải suôn sẻ và an toàn. 

Cổng thanh toán và thanh toán cũng cần được kiểm tra với các tùy chọn thanh toán khác nhau như PayPal, tiền mặt, ngân hàng trực tuyến, v.v. 

Kiểm tra và đảm bảo rằng quy trình hoàn trả và gửi email cho người mua đang hoạt động đúng cũng cần được xem xét trong quy trình thử nghiệm của trang web thương mại điện tử. 

### Kiểm tra sau đặt hàng
Cần kiểm tra các trạng thái vận chuyển của đơn hàng, đôi khi khách muốn trả lại sản phẩm cần kiểm tra các tính năng này có hoạt động đúng và có dễ dáng sử dụng tính năng này, vì điều này ảnh hưởng đến khách hàng

Tài liệu tham khảo:
https://www.guru99.com/testing-e-commerce-applications.html
https://viblo.asia/p/checklist-test-trang-web-thuong-mai-dien-tu-RnB5peBdKPG
https://www.strikingly.com/content/blog/what-is-ecommerce-website-and-how-does-it-work/
https://apphawks.com/blog/ecommerce-testing-how-test-ecommerce/