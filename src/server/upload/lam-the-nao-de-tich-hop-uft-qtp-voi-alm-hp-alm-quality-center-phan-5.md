Tiếp bài: Làm thế nào để tích hợp UFT (QTP) với ALM (HP ALM Quality Center) (Phần 4)

https://viblo.asia/p/lam-the-nao-de-tich-hop-uft-qtp-voi-alm-hp-alm-quality-center-phan-4-1VgZv83R5Aw

**Làm thế nào để upload defect sử dụng Excel**

Mô-đun này giúp người dùng tải lên các khiếm khuyết từ Excel vào ALM. Điều này thực sự hữu ích khi người dùng muốn chuyển từ một hệ thống quản lý lỗi sang ALM.

Quá trình này vẫn giống như quá trình tải lên các tập test và yêu cầu.

Người ta phải đảm bảo rằng tệp Excel được chuẩn bị theo định dạng sao cho ALM cho phép nhập dữ liệu.

Bước 1) Tạo tệp Excel với các cột bắt buộc mà người dùng muốn tải lên như hiển thị bên dưới.

Trường 'attachments' lấy đường dẫn cục bộ nơi giữ ảnh chụp màn hình / bất kỳ tệp đính kèm nào khác. Người dùng chỉ cần đề cập đến đường dẫn của tệp đính kèm để nó sẽ được chọn để tải lên ALM cùng với các chi tiết khác về lỗi.
![](https://images.viblo.asia/1457488b-d17e-48cc-b213-f62f51331eec.PNG)

Bước 2) Thực hiện các steps khác
* Điều hướng đến tab 'Bổ trợ'
* Chọn 'Xuất ra HP ALM'

![](https://images.viblo.asia/07463b30-9c7c-4cc2-badd-c162bdc054c9.PNG)

Bước 3) Export ALM. Nhập URL Máy chủ ALM của HP và nhấp vào 'Tiếp theo'.
![](https://images.viblo.asia/819bad58-a33f-4729-bb6d-f069e3f3db9f.PNG)

Bước 4) Nhập tên người dùng và mật khẩu để xác thực và nhấp vào 'Tiếp theo'.
![](https://images.viblo.asia/8ece40f1-1b34-46f5-b235-0dfa1da4a307.PNG)

Bước 5) Chọn Tên miền, Tên dự án mà chúng tôi muốn tải lên các bài kiểm tra và nhấp vào 'Tiếp theo'.
![](https://images.viblo.asia/a223bc86-582c-4a63-976c-0dd2083ee9b2.PNG)

Bước 6) Chọn loại dữ liệu mà chúng tôi muốn tải lên. Trong trường hợp này, đó là khuyết tật.
![](https://images.viblo.asia/0b0b356a-1eb3-4885-8d67-2b94a159115c.PNG)


Bước 7) Nhập tên Bản đồ mới. Tùy chọn đầu tiên, 'Chọn bản đồ' bị vô hiệu hóa do chúng tôi chưa tạo bản đồ cho đến nay để tải lên các khiếm khuyết. Do đó, chúng ta nên tạo tên bản đồ mới và nhấp vào 'Tiếp theo'. Chúng tôi chưa chọn 'Tạo bản đồ tạm thời' vì chúng tôi muốn sử dụng lại mỗi lần để tải lên các khiếm khuyết.
![](https://images.viblo.asia/f89930c2-66bc-41f5-986d-baba75d25d75.PNG)

Bước 8) Khi nhấp vào 'Tiếp theo', hộp thoại ánh xạ sẽ mở ra như hiển thị bên dưới.

Các mục lưới khung bên trái được liệt kê tương ứng với các trường có sẵn để tải lên trong HP ALM. Xin lưu ý rằng các trường được đánh dấu trong 'ĐỎ' phải được ánh xạ vì chúng là các trường bắt buộc.

Các mục lưới khung bên phải tham chiếu đến các trường được ánh xạ để các giá trị trong Excel sẽ chảy vào các trường ALM tương ứng đó.
![](https://images.viblo.asia/ab5bfac4-e00b-4631-82fa-66f364032af6.PNG)

Bước 9) Bây giờ hãy cho chúng tôi hiểu cách ánh xạ các trường trong Excel theo các trường trong ALM.

1. Chọn Trường mà người dùng muốn ánh xạ và nhấp vào nút mũi tên như hình bên dưới.

![](https://images.viblo.asia/663c5bce-8599-494c-a0a7-ea86196ee4e4.PNG)

2. Nhập tên cột trong Excel tương ứng với tên cột thích hợp trong HP ALM
![](https://images.viblo.asia/cf0f8c2a-367a-4a23-ad0d-5a293d88fde4.PNG)

Bước 10) Khi tải lên thành công, ALM sẽ hiển thị thông báo như hình bên dưới.
![](https://images.viblo.asia/e193f2c5-f068-4d7f-8281-44ebea14779e.PNG)

**Làm thế nào để tìm kiếm một Defect**

Mô-đun khuyết tật chứa tất cả các lỗi được ghi lại ngay từ lỗi đầu tiên mà nó đã được ghi lại.

Do đó, người dùng sẽ ở trong một vị trí để tìm kiếm các khiếm khuyết dựa trên các tiêu chí nhất định.

Bước 1) Điều hướng đến 'Chỉnh sửa' Menu và chọn 'Tìm'.
![](https://images.viblo.asia/e2edb875-16e7-4905-981a-8566d75cac1b.PNG)

Bước 2) Hộp thoại Tìm kiếm sẽ được hiển thị.

* Nhập tên trường dựa trên đó tìm kiếm phải được thực hiện (Trong trường hợp này chúng tôi sử dụng Defect ID để tìm kiếm)
* Nhập giá trị
* Nhấp vào 'Tìm tiếp theo'
![](https://images.viblo.asia/92b7dcbb-bb72-4523-a306-d96e23b5bbe8.PNG)

Bước 3) ALM hiển thị mục trong nền như hình bên dưới.
![](https://images.viblo.asia/4e702361-3a3e-48d8-9f4a-dd064237de79.PNG)

Tài liệu tham khảo: https://www.guru99.com/hp-alm-defect-management.html