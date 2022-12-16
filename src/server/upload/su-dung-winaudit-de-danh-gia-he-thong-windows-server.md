**Tổng quan**: Audit hệ thống nhằm mục đích đánh giá một cách chính xác về thiết kế, cấu hình hệ thống và xem xét sự hiệu quả mà hệ thống đem lại cho người dùng.

> WinAudit is an inventory utility for Windows computers. It creates a comprehensive report on a machine's configuration, hardware and software. WinAudit is free, open source and can be used or distributed by anyone. It is used by IT experts in academia, government, industry as well as security conscious professionals in the armed services, defence contractors, electricity generators and police forces.

Sử dụng ứng dụng đánh giá ([winaudit](http://www.parmavex.co.uk/winaudit.html)) trên hệ thống.

## Cài đặt



**Bước 1**: Đưa phần mềm winaudit lên Desktop hệ thống cần audit.

![](https://images.viblo.asia/a9302c23-83f7-4300-950a-7dad0ccacf7e.png)

**Bước 2**: Chạy với quyền Administrator `Run as administrator`.

**Bước 3**: Phần mềm sẽ tự động thu thập dữ liệu trên hệ thống. Quá trình này sẽ mất khoảng 10-20p tùy từng hệ thống.

Sau khi phần mềm chạy xong. Chọn Save để lưu lại dữ liệu phục vụ cho mục đích kiểm tra. Dữ liệu sẽ được lưu dưới file html. Ngoài ra phần mềm cũng hỗ trợ các dạng file csv, rtf trong trường hợp cần dạng tư liệu khác.

![](https://images.viblo.asia/bf09036d-826a-4b9a-9fab-ca6aad4f65a2.png)

*Lưu ý: Sử dụng winaudit với tài khoản administrator (tài khoản quản trị) và chạy với quyền administrator để có thể thu thập được đầy đủ các thông tin cần thiết.*


## Đọc kết quả audit

### **1. Kiểm tra cài đặt bản vá**: 	 	

Việc không cập nhật các service pack và các bản vá hotfixes sẽ dẫn tới nguy cơ tồn tại những lỗ hổng bảo mật cao, có thể bị lợi dụng để tấn công chiếm quyền điều khiển máy chủ hoặc làm hệ thống bị tê liệt, ngừng hoạt động.
Kiểm tra các thông tin về service pack và software update/ hotfix đồng thời so sánh các phiên bản này với các thông tin về số hiệu bản vá được công bố và cập nhật thường xuyên tại địa chỉ catalog.update.microsoft.com để chắc chắn rằng hệ thống luôn có những bản cập nhập mới nhất.
	
### **2. Đánh giá chính sách:**

Đây là hạng mục cấu hình quan trọng, việc cấu hình chính xác các mục trong chính sách này sẽ tạo ra sự hiệu quả tối đa trong việc giám sát, bảo vệ hệ thống.

**2.1 Chính sách auditing:**

Cấu hình chính xác chính sách auditing sẽ giúp cho hệ thống luôn lưu lại được các thông tin về sự thay đổi trong hệ thống.
Hướng dẫn:

Từ thư mục kết quả, trong mục “Categories”, tìm đến mục “Security Setting” tìm đến mục con “Audit Policy”. Đảm bảo rằng tất cả các thư mục này được bật phù hợp với tiêu chuẩn đánh giá CIS hoặc đã được chọn lựa chức năng kỹ càng theo nhu cầu sử dụng. Tránh tối đa các trường hợp ghi nhận “No auditing”

![](https://images.viblo.asia/7986f210-c08e-4baf-ae3d-f9987fc94596.png)

Chính sách audit thường bao gồm các hạng mục:

**Audit system event**: Ghi lại thời điểm người dùng khởi động lại hoặc tắt/mở hệ thống hoặc một hành động nào đó như cài đặt phần mềm mới…. có khả năng tác động lên sự an toàn của hệ thống hay chỉnh sửa các dữ liệu nhật ký (log). Cấu hình này sẽ ghi lại tất cả quá trình dù là thành công hay thất bại tùy theo nhu cầu của người dùng.

**Audit logon events**: Ghi lại quá trình/ thời điểm đăng nhập/ đăng xuất hoặc tạo kết nối tới máy chủ. Cấu hình này sẽ ghi lại tất cả quá trình dù là thành công hay thất bại tùy theo nhu cầu của người dùng.
	 	 	
**Audit object access**: Ghi lại quá trình truy cập vào những đối tượng (như là máy in, tệp, thư mục….) có quy định trong danh sách kiểm soát truy cập (SACL) của hệ thống. Cấu hình này sẽ ghi lại tất cả quá trình dù là thành công hay thất bại tùy theo nhu cầu của người dùng.
Audit privilege use: Ghi lại hành vi của người dùng lên hệ thống. Cấu hình này sẽ ghi lại tất cả quá trình dù là thành công hoặc thất bại hay không thể kiểm tra hành vi trong một vài trường hợp (như là các đối tượng được nằm trong chính sách đặc biệt) tùy theo nhu cầu của người dùng.

**Audit process tracking**: Ghi lại chi tiết các sự kiện tắt/ mở ứng dụng, xử lý nhân bản và truy cập đối tượng gián tiếp. Cấu hình này sẽ ghi lại tất cả quá trình dù là thành công hoặc thất bại hay không thể kiểm tra sự kiện tùy theo nhu cầu của người dùng.

**Audit policy change**: Ghi lại các thay đổi trong chính sách phân bổ quyền của người dùng, chính sách kiểm toán hay chính sách ủy thác. Cấu hình này sẽ ghi lại tất cả quá trình dù là thành công hoặc thất bại hay không thể kiểm tra sự kiện tùy theo nhu cầu của người dùng.

**Audit account management**: Ghi lại sự kiện trong việc quản lý tài khoản trên hệ thống ví dụ như việc tài khoản người dùng hay một nhóm được tạo mới, xóa bỏ hay thay đổi. Hoặc các sự kiện nhỏ hơn như mật khẩu người dùng đã được thay đổi hay tài khoản được thay đổi tên, vô hiệu hóa, được bật. Cấu hình này sẽ ghi lại tất cả quá trình dù là thành công hoặc thất bại hay không thể kiểm tra sự kiện tùy theo nhu cầu của người dùng.

**Audit directory service access**: Ghi lại việc người dùng truy cập vào đối đối tượng Active Directory nằm trong danh mục truy cập của người dùng đó. Cấu hình này sẽ ghi lại tất cả quá trình dù là thành công hoặc thất bại hay không thể kiểm tra sự kiện tùy theo nhu cầu của người dùng.
Audit account logon events: Ghi lại việc đăng nhập/ đăng xuất khỏi máy tính khác nhau mà máy tính này được dùng để xác thực tài khoản người dùng. Cấu hình này sẽ ghi lại tất cả quá trình dù là thành công hoặc thất bại hay không thể kiểm tra sự kiện tùy theo nhu cầu của người dùng


**2.2  Kiểm tra User Rights:**

Đây là một cấu hình riêng biệt cho người dùng giao tiếp với hệ thống như: quyền đăng nhập, quyền truy cập từ xa, quyển uỷ thác, quyền quản lý...

Hướng dẫn audit:

Từ thư mục kết quả, trong mục “Catagories”, tìm đến mục “User Right”. Tiến hành rà soát và kiểm tra các nhóm người dùng tại từng phân quyền đã phù hợp theo tiêu chuẩn đánh giá CIS hay chưa hoặc đã phù hợp theo đúng yêu cầu của tổ chức hay chưa. Tránh tối đa việc có nhóm “Everyone” trong các phân quyền, đặc biệt là các phân quyền có ảnh hưởng lớn tới hệ thống.

![](https://images.viblo.asia/8fe0c461-3e40-43d2-a189-e56b5ce35325.png)

**2.3 Kiểm tra Windows Firewall**
	 	 	
Kích hoạt và giữ firewall luôn chạy kết hợp với phần mềm anti-virus và việc cập nhật hệ thống thường xuyên sẽ làm cho hệ thống được gia cố mạnh mẽ hơn.

Từ thư mục kết quả, trong mục “Catagories”, tìm đến mục “Windows Firewall” đảm bảo rằng firewall vẫn đang hoạt động.

![](https://images.viblo.asia/40133ee4-6741-424c-ac08-03bddc36a687.png)

**2.4 Kiểm tra chính sách mật khẩu** 

Chính sách mật khẩu là một bộ quy tắc được thiết kế để tăng cường bảo mật hệ thống bằng cách khuyến khích người dùng sử dụng mật khẩu mạnh và sử dụng chúng đúng cách.

Hướng dẫn audit:

Từ thư mục kết quả, trong mục “Catagories”, tìm đến mục “Security Setting” tìm đến mục con “Password Policy”. Đảm bảo rằng tất cả các thư mục này được bật phù hợp với tiêu chuẩn đánh giá CIS hoặc đã được chọn lựa chức năng kỹ càng theo nhu cầu sử dụng. Tránh tối đa các trường hợp ghi nhận “0” hoặc “Forever

![](https://images.viblo.asia/051d1574-9007-4f8e-898d-6aea35fc64db.png)

Chính sách mật khẩu bao gồm các hạng mục:

* Enforce password history: Số lượng mật khẩu cần dùng trước khi được phép đặt lại mật khẩu cũ. Theo tiêu chuẩn bảo mật CIS thì con số này phải lớn hơn hoặc bằng 24 mật khẩu.

* Maximum password age: Tuổi thọ tối đa của mật khẩu được tồn tại. Theo tiêu chuẩn bảo mật CIS thì con số này phải nhỏ hơn hoặc bằng 60 ngày và không được bằng 0 ngày.

* Minimum password age: Tuổi thọ tối thiểu của mật khẩu trước khi được phép thay đổi. Theo tiêu chuẩn bảo mật CIS thì con số này phải lớn hơn hoặc bằng 1 ngày.

* Minimum password length: Độ dài tối thiểu của mật khẩu. Theo tiêu chuẩn bảo mật CIS thì con số này phải lớn hơn hoặc bằng 14 ký tự.

* Password must meet complexity requirements: Tính năng yêu cầu về độ phức tạp của mật khẩu. Theo tiêu chuẩn bảo mật CIS thì tính năng này phải được bật.

**2.5 Kiểm tra chính sách lock out tài khoản**
	 	 	
Chính sách lockout tài khoản kiểm soát cách thức và thời điểm các tài khoản bị khóa khỏi miền hoặc hệ thống cục bộ.
Hướng kiểm toán:

Từ thư mục kết quả, trong mục “Catagories”, tìm đến mục “Security Setting” tìm đến mục con “Account Lockout Policy”. Đảm bảo rằng tất cả các thư mục này được bật phù hợp với tiêu chuẩn đánh giá CIS hoặc đã được chọn lựa chức năng kỹ càng theo nhu cầu sử dụng. Tránh tối đa các trường hợp không áp dụng hay các trường “0”

![](https://images.viblo.asia/7180296b-b533-43bc-8fb2-9f0b5dec46bf.png)

Chính sách lockout tài khoản bao gồm các hạng mục:
* Account lockout duration: Thời gian khoá tài khoản khi nhập sai quá nhiều. Theo tiêu chuẩn bảo mật CIS thì con số này phải lớn hơn hoặc bằng 15 phút.
* Account lockout threshold: Số lần nhập sai cho phép trước khi bị khoá. Theo tiêu chuẩn bảo mật CIS thì con số này phải nhỏ hơn hoặc bằng 10 lần.
* Reset account lockout 
counter after: Thời gian trước khi đưa số lần nhập sai của 1 tài khoản về 0. Theo tiêu chuẩn bảo mật CIS thì con số này phải lớn hơn hoặc bằng 15 phút.

### **3. Cấu hình máy chủ**

**3.1 Kiểm tra Window Update**
	 	 	
Cấu hình tự động cập nhật thường xuyên giữ cho hệ thống luôn được áp dụng các bản vá mới nhất, tránh tồn đọng các lỗ hổng bảo mật đã được phát hiện và bị lợi dụng.
Hướng dẫn audit:

Từ thư mục kết quả, trong mục “Catagories”, tìm đến mục “Security Setting” tìm đến mục con “Automatic Update”. Đẩm bảo rằng chế độ cập nhật tự động được kích hoạt và thời gian kiểm tra các bản vá là 0 ngày. Tránh tình trạng không cấu hình hoặc ngắt chế độ tự động cập nhật theo tiêu chuẩn bảo mật CIS.

![](https://images.viblo.asia/df6f086b-011f-467c-bf76-3f241d8efec2.png)

### **4. Cấu hinh an ninh máy chủ**

**4.1 Cấu hình lỗ hổng bảo mật**  	

Sử dụng công cụ dò quét lỗ hổng  Nessus của hãng tenable để dò quét các lỗ hổng còn tồn đọng trên hệ thống với các xếp hạng từ mức độ thấp đến cao dựa trên đánh giá chung của các chuyên gia toàn cầu. 

Từ đó lấy làm căn cứ thử nghiệm mức độ thực tế của lỗ hổng đối với hệ thống.

![](https://images.viblo.asia/9e5865d4-a178-4ebd-ba37-616249f17ddf.png)

![](https://images.viblo.asia/3de75199-2f22-4bd4-80b3-26928c955dc7.png)

### **5. Hệ thống chống mã độc**

**5.1 Kiểm tra Anti Virus**	

Bên cạnh việc cập nhật bản vá lỗi hay phiên bản hệ điều hành, áp dụng một phần mềm anti-virus kết hợp với tường lửa là một cách gia cố hệ thống đơn giản mà mạnh mẽ.

Hướng audit:
Từ thư mục kết quả, trong mục “Categories”, tìm kiếm và chắc chắn rằng đang có một phần mềm anti-virus hoạt động trên hệ thống.

![](https://images.viblo.asia/1131af0b-227b-4cb1-b376-c6004041f5b8.png)

### **6. Chính sách triển khai**

**6.1 Kiểm tra phần mềm trên máy chủ có phù hợp với chính sách**
	 	 	
Từ thư mục kết quả, trong mục “Categories”, tìm đến mục “Installed Programs”. 

Chắc chắn rằng tất cả các danh mục phần mềm được cài đặt bị phát hiện đều nằm trong danh mục các phần mềm được cho phép hoặc được quản lý một cách rõ ràng từ tổ chức. Gỡ bỏ hoặc thông báo ngay lập tức cho người có thẩm quyền về các phần mềm lạ hay nghi ngờ là gây nguy hiểm cho hệ thống.

![](https://images.viblo.asia/bbce8644-3b8a-4671-8617-65ea00601999.png)