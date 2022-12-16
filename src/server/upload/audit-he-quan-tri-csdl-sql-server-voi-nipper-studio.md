**Tổng quan**: Audit hệ quản trị CSDL nhằm mục đích đánh giá một cách chính xác về cấu hình hệ quản trị CSDL và xem xét sự hiệu quả mà hệ thống đem lại cho người dùng.

**Nipper Studio** là công cụ kiểm tra cấu hình tiên tiến và chi tiết dành cho việc audit CSDL. Đây là công cụ kiểm tra cấu hình được lựa chọn cho các khách hàng doanh nghiệp ở 80 quốc gia. Nó giúp bạn kiểm tra và bảo vệ các thiết bị mạng quan trọng, chẳng hạn như Firewalls, Switches và Routers

## Cài đặt

1. Truy cập trang chủ ứng dụng

![](https://images.viblo.asia/0dff8826-150e-4bfe-9530-b97b6ba92b98.png)

2. Tiến hành download Nipper-studio từ trang chủ

3. Sử dụng dpkg để tiến hành cài đặt `dpkg -i nipper.deb`

![](https://images.viblo.asia/a0cd6268-b7c2-4eec-922b-5facd195f462.png)

4. Sử dụng `sudo apt-get -f install `để cài đặt bổ sung các module còn thiếu 

![](https://images.viblo.asia/203793e2-906a-4a83-aae3-ed10ff19a808.png)

5, Cài đặt thành công, giao diện chính của Nipper

![](https://images.viblo.asia/f73b9199-4269-45c9-bb88-86997710c5d4.png)

6. Lựa chọn phương thức auditing và kiểm tra kết quả

![](https://images.viblo.asia/0c42e51e-11b3-4bc6-960d-d237b3ec39be.png)

## Đọc kết quả audit 

### 1.  Kiểm tra thông tin DB 

Tệp kết quả sẽ cho biết rõ về phiên bản hiện tại của hệ CSDL bao gồm tên, phiên bản hiện tại, thời gian cài đặt. Chắc chắn rằng phiên bản hiện tại là mới nhất dựa theo tham chiếu tại địa chỉ catalog.update.microsoft.com

![](https://images.viblo.asia/c40a523a-479f-415a-bd6e-01e6334b89b3.png)

### 2.Kiểm tra chính sách  truy cập
**2.1 Kiểm tra chính sách truy cập OS với DB**

Chính sách truy cập bao gồm **truy cập trực tiếp** và **truy cập từ xa** có thể bị lợi dụng để bắt đầu một cuộc tấn công.

Hướng audit:

**Remote Access và Remote Admin Connections**: Chức năng truy cập từ xa được khuyến cáo là  thiếu an toàn - có thể bị lợi dụng để tấn công.

**Remote Admin Connections**:

Từ tệp kết quả tìm kiếm từ khoá “Remote Access” và “Remote Admin Connections”. Đảm bảo rằng giá trị trả về từ 2 từ khoá trên đều bằng **0(disable)** theo tiêu chuẩn đánh giá bảo mật CIS. Trong trường hợp bằng 1(enable) thì nên cân nhắc xem có thực sự cần thiết hay không.

### 3. Kiểm tra xác thực 
**3.1 Kiểm tra xác thực User trên DB**
	 	 	
Hệ quản trị CSDL có nhiều cách xác thực khác nhau nhưng có cách xác thực đã trở kém an toàn như **SQL Login**. Chắc chắn rằng không có bất kì tài khoản nào còn sử dụng phương thức xác thực này.

Hướng audit:

Từ tệp kết quả, tìm kiếm từ khoá “SQL Login” thường có trong mục “logintype”. Đảm bảo rằng giá trị trả về xác thực các tài khoản không còn sử dụng SQL Login nữa mà sử dụng phương thức an toàn như “Windows login”.

![](https://images.viblo.asia/78862904-155c-45c6-bf1b-928d5e8a9c3d.png)

### 4. Kiểm tra phân quyền 
	 	 	
Quản lý và phân quyền user/ group rõ ràng tránh việc nhầm lẫn dẫn đến những người dùng cấp thấp có thể tiếp xúc với nhiều dữ liệu hơn quyền hạn đang có. Xoá bỏ các tài khoản mặc định không cần thiết cũng giúp cho hệ CSDL trở nên an toàn hơn.

Hướng audit: Từ tệp kết quả, tiến hành kiểm tra, rà soát quyền của các user/ group có chính xác như mục tiêu ban đầu hay không. Đồng thời chắc chắn rằng những tài khoản mặc định như “guest” hay “sa” đã được xoá bỏ hoặc không có database nào đính kèm theo như tiêu chuẩn bảo mật CIS hiện hành.

### 5. Cấu hình an toàn 
**5.1 Kiểm tra cấu hình hệ thống MYSQL**
	 	 	
Việc cấu hình hệ thống theo đúng tiêu chuẩn bảo mật CIS sẽ nâng cao tính an toàn của hệ thống lên rất nhiều, giảm thiểu nguy cơ bị phá hoại hay tác động với dụng ý xấu.
Hướng audit:
Từ tệp kết quả kiểm tra các mục sau:

**Ad Hoc Distributed Queries**: Tính năng này khai thác các lỗ hổng trong trường hợp SQL Server cho phép và chạy các Visual Basic không an toàn. Theo tiêu chuẩn bảo mật CIS, tính này này phải có giá trị 0 (disable).

![](https://images.viblo.asia/c4d59a4a-7c42-4ebc-838c-928131a56113.png)


**CLR enabled**: CLR Enabled là 1 kỹ thuật cho phép nhúng mã lập trình như C# vào stored Procedures có quyền rất lớn (tác động ở mức hệ điều hành). Theo tiêu chuẩn bảo mật CIS, tính này này phải có giá trị 0 (disable).
![](https://images.viblo.asia/44755206-0eaf-45e4-9f43-8acf888b4960.png)

	 	 	
**Cross DB Ownership Chaining**: Cho phép xâu chuỗi các quyền sở hữu CSDL. Điều này có thể vô tình thay đổi quyền CSDL một cách đồng loạt. Theo tiêu chuẩn bảo mật CIS, tính này này phải có giá trị 0 (disable).
![](https://images.viblo.asia/42442f70-f785-4b50-9ad7-b5445d7ecb05.png)

	 	 	
**Database Mail XPs**: Loại bỏ tùy chọn này sẽ giảm thiểu khả năng tấn công từ chối dịch vụ (DoS). Theo tiêu chuẩn bảo mật CIS, tính này này phải có giá trị 0 (disable).
	 		![](https://images.viblo.asia/348a5893-d574-478d-8862-168503bd981a.png)

**Ole Automation Procedures**:  Kích hoạt tính năng này làm mở rộng thêm các vector tấn công nhắm vào SQL Server. Theo tiêu chuẩn bảo mật CIS, tính này này phải có giá trị 0 (disable).

![](https://images.viblo.asia/e36c09a9-dc41-422f-a6c6-7e2c1202e073.png)

            
**Xp_cmdshell**: Lệnh này được đánh giá là rất nguy hiểm nếu được bật bởi tính đa năng của nó (hỗ trợ khả năng có thể chạy ngay các câu lệnh Shell Command )nếu bị kẻ tấn công lợi dụng. Theo tiêu chuẩn bảo mật CIS, tính này này phải có giá trị 0 (disable).
![](https://images.viblo.asia/8e66c3ac-ce49-43e5-9a05-acf9a71a599f.png)


**5.2 Kiểm tra cấu hình và lưu trữ audit log**

Cấu hình audit log giúp quản lý được các sự kiện login/ logout hay sự bất kỳ sự thay đổi natrên hệ CSDL.
Hướng audit:
Từ tệp kết quả, kiểm tra từ khoá “c2_audit mode”. Theo tiêu chuẩn bảo mật CIS, tính này này phải có giá trị 1 (anable).
![](https://images.viblo.asia/51ad3ad4-e905-4d73-ae58-975730953c87.png)


### 6. Chính sách quản lý cài đặt 
**6.1 Kiểm tra tài khoản / mật khẩu mặc định trên hệ thống**
	 	 	
Sau khi cài đặt hệ quản trị CSDL SQL Server luôn tồn tại 2 tài khoản mặc định là “sa” với quyền sysadmin và “guest”. Theo tiêu chuẩn bảo mật CIS, 2 tài khoản này nên bị disable, không được kết nối với database nào và phải được đổi tên.

Hướng audit:

Từ tệp kết quả, kiểm tra từ khoá “sa”, “guest” xem tài khoản này còn được disable chưa hay vẫn còn tồn tại hoặc đã được đổi tên chưa. Kiểm tra xem có data base nào được gắn với nó hay không.

![](https://images.viblo.asia/dadd524e-9413-4222-a258-bef5e03b0305.png)



**6.2 Kiểm tra chính sách quản lý tài khoản**
	 	 	
Hướng audit:
Từ tệp kết quả, kết hợp với kiểm tra trực tiếp mật khẩu trên hệ thống xác định xem có tồn tại tài khoản sự dụng mật khẩu yếu như mật khẩu giống hệt tên tài khoản hay cấu hình hết hạn mật khẩu có được sử dụng hay không trong mục “PasswordExpirationEnforced”…


### 7. Khả năng xâm nhập và bị dò quét
	 	 	
Hướng audit:
Thực hiện thử nghiệm các cuộc tấn công trực tiếp vào hệ CSDL đồng thời thử nghiệm tấn công vào các lỗ hổng CVE còn tồn tại khi dò quét bằng nessus do chưa cập nhật các phiên bản vá lỗi để xác định các nguy cơ đối với hệ CSDL.