# Điện toán Đám mây là gì?
Điện toán đám mây là một nền tảng dựa trên Internet để thực hiện nhiều loại dịch vụ điện toán khác nhau như phần cứng, phần mềm và các dịch vụ khác liên quan đến máy tính từ xa. Có ba mô hình Điện toán đám mây:
* **SaaS**- Dịch vụ phần mềm
* **PaaS**- Dịch vụ cung cấp nền tảng 
* **IaaS**- Dịch vụ cung cấp cơ sở hạ tầng

# Các loại Kiểm thử trong Đám mây
Toàn bộ các kiểm thử đám mây được chia làm bốn loại chủ yếu: 
* **Kiểm thử toàn bộ đám mây**: Đám mây được xem xét dưới dạng một thực thể hoàn chính và dựa trên các tính năng của nó để tiến hành kiểm thử. Nhà cung cấp Đám mây và SaaS cũng như người dùng cuối đều quan tâm tới việc thực hiện loại kiểm thử này.   
* **Kiểm thử trong phạm vi một đám mây**: Tiến hành kiểm thử từng tính năng bên trong của nó. Chỉ các nhà cung cấp đám mây mới có thể thực hiện loại kiểm thử này 
* **Kiểm thử giữa các đám mây**: Kiểm thử được thực hiện trên nhiều loại đám mây khác nhau như đám mây không công khai, đám mây công khai và đám mây lai giữa công khai và không công khai.
* **Kiểm thử SaaS trong đám mây**: Kiểm thử chức năng và kiểm thử phi chức năng được thực hiện dựa trên các yêu cầu ứng dụng    

Kiểm thử đám mây tập trung vào các thành phần cốt lõi như: 
1. **Ứng dụng**: Bao gồm kiểm thử chức năng, quy trình nghiệp vụ từ đầu đến cuối, bảo mật dữ liệu, khả năng tương thích của trình duyệt, v.v
2. .**Network**: Bao gồm kiểm thử băng thông và giao thức nhiều mạng lưới khác nhau và truyền dữ liệu thành công thông qua các mạng. 
3. **Hạ tầng**: Bao gồm kiểm thử khắc phục sự cố, sao lưu, kết nối an toàn và chính sách lưu trữ. Hạ tầng cần phải xác thực việc tuân thủ nghiêm ngặt các quy định. 

Các loại Kiểm thử khác trong Đám mây bao gồm
* Hiệu suất
* Tính khả dụng
* Tính tuân thủ
* Tính bảo mật
* Khả năng mở rộng4
* Đa người thuê
* Kiểm thử nâng cấp trực tiếp

# Task cần thực hiện khi Kiểm thử Đám mây:
![](https://images.viblo.asia/c02a53d6-1ca3-4a58-8072-f356ba306c9f.png)

# Các Tình huống Kiểm thử trong Kiểm thử Đám mây
![](https://images.viblo.asia/ebfbb1de-846a-49de-b89b-5e2d61f2bbff.png)

![](https://images.viblo.asia/86f8cbfd-153e-431d-b919-7fbfaaf1a394.png)

# Thách thức trong Kiểm thử Đám mây
## Thách thức #1: Dữ liệu, Bảo mật và Quyền riêng tư
Ứng dụng đám mây bản chất là đa người sử dụng nên luôn tồn tại nguy cơ bị đánh cắp dữ liệu. Người sử dụng điện toán đám mây cần được nhà cung cấp đảm bảo an toàn dữ liệu của họ.

## Thách thức#2: Thời gian thông báo ngắn
Nhà cung cấp dịch vụ đám mây yêu cầu khách hàng phải nâng cấp dịch vụ trong một khoảng thời gian thông báo ngắn (1-2 tuần). Đây là một vấn đề lớn khi xác thực những thay đổi trong ứng dụng SaaS của bạn một cách thủ công.

## Thách thức#3: Xác thực tính tương thích của giao diện
Với việc nâng cấp đối với nhà cung cấp dịch vụ đám mây, đôi khi giao diện bên ngoài cũng cần phải nâng cấp, đây chính là thách thức khi một số người đăng ký đã quen với giao diện cũ. Người đăng ký Đám mây (SaaS) cần đảm bảo rằng người dùng có thể chọn phiên bản giao diện mà họ muốn.

## Thách thức#4: Truyền dữ liệu
Việc truyền dữ liệu từ một nhà cung cấp Đám mây sang một nhà cung cấp khác là một thách thức lớn vì cả hai nhà cung cấp có thể có lược đồ cơ sở dữ liệu khác nhau và cần phải nỗ lực để hiểu hết các trường dữ liệu, các mối liên hệ và cách chúng thiết lập trên ứng dụng SaaS.

## Thách thức #5: Tích hợp ứng dụng doanh nghiệp
Tích hợp ứng dụng doanh nghiệp yêu cầu phải xác thực sự tích hợp dữ liệu của cả dữ liệu đầu ra và đầu vào, từ mạng lưới khách đến ứng dụng SaaS và ngược lại. Cần xác thực kỹ lưỡng tính cá nhân trong trường dữ liệu để đảm bảo người đăng ký SaaS được bảo mật và có quyền riêng tư.

## Thách thức #6: Mô phỏng kiểm thử nâng cấp trực tiếp
Thách thức lớn nhất của kiểm thử đám mây là đảm bảo các bản nâng cấp trực tiếp không ảnh hưởng tới kết nối của người dùng SaaS hiện hữu.

# Kiểm thử Đám mây với Kiểm thử Thông thường
![](https://images.viblo.asia/d21016b8-b736-4487-ac5b-479ba946c2ae.png)

Link reference: https://www.guru99.com/cloud-testing-tutorial-with-saas-testing-primer.html