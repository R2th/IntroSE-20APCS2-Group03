## Đặc điểm của một ứng dụng ngân hàng
Trước khi bắt đầu thử nghiệm, điều quan trọng là phải lưu ý các tính năng tiêu chuẩn được mong đợi của bất kỳ ứng dụng ngân hàng nào. Vì vậy, bạn có thể nỗ lực thử nghiệm của mình để đạt được những đặc điểm này.

Một ứng dụng ngân hàng tiêu chuẩn phải đáp ứng tất cả các đặc điểm này như được đề cập bên dưới.
* Nó sẽ hỗ trợ hàng nghìn phiên người dùng đồng thời
* Ứng dụng ngân hàng có thể tích hợp với nhiều ứng dụng khác như tài khoản giao dịch, tiện ích thanh toán hóa đơn, thẻ tín dụng, v.v.
* Thực hiện sẽ xử lý các giao dịch nhanh chóng và an toàn
* Nó nên bao gồm hệ thống lưu trữ lớn.
* Để khắc phục sự cố của khách hàng, nó phải có khả năng audit cao
* Xử lý các quy trình công việc phức tạp
* Cần hỗ trợ người dùng trên nhiều nền tảng (Mac, Linux, Unix, Windows)
* Hỗ trợ người dùng từ nhiều địa điểm
* Hỗ trợ người dùng đa ngôn ngữ
* Hỗ trợ người dùng trên các hệ thống thanh toán khác nhau (VISA, AMEX, MasterCard)
* Hỗ trợ nhiều lĩnh vực dịch vụ (Cho vay, Ngân hàng bán lẻ, v.v.)
* Có cơ chế quản lý thảm họa chống lừa đảo

## Các giai đoạn trong thử nghiệm các ứng dụng ngân hàng
Để thử nghiệm các ứng dụng ngân hàng, các giai đoạn thử nghiệm khác nhau bao gồm

* Phân tích yêu cầu: Được thực hiện bởi người phân tích, các yêu cầu đối với một ứng dụng ngân hàng cụ thể được thu thập và lập thành văn bản
* Review yêu cầu: Các nhà phân tích chất lượng, nhà phân tích kinh doanh và các trưởng nhóm phát triển tham gia vào nhiệm vụ này. Tài liệu thu thập yêu cầu được xem xét ở giai đoạn này và được kiểm tra chéo để đảm bảo rằng nó không ảnh hưởng đến quy trình làm việc
* Tài liệu yêu cầu kinh doanh: Tài liệu yêu cầu kinh doanh được chuẩn bị bởi các nhà phân tích chất lượng, trong đó tất cả các yêu cầu kinh doanh đã được xem xét đều được đề cập đến
* Kiểm tra cơ sở dữ liệu: Đây là phần quan trọng nhất của kiểm thử ứng dụng ngân hàng. Kiểm tra này được thực hiện để đảm bảo tính toàn vẹn của dữ liệu, tải dữ liệu, di chuyển dữ liệu, thủ tục được lưu trữ và xác thực chức năng, kiểm tra quy tắc, v.v.
* Kiểm tra tích hợp: Trong Kiểm tra tích hợp, tất cả các thành phần được phát triển đều được tích hợp và xác nhận
* Kiểm thử chức năng: Các hoạt động kiểm thử phần mềm thông thường như chuẩn bị Test Case, đánh giá và thực hiện test được thực hiện trong giai đoạn này
* Kiểm tra bảo mật: Nó đảm bảo rằng phần mềm không có bất kỳ lỗi bảo mật nào. Trong quá trình chuẩn bị kiểm tra, nhóm QA cần bao gồm cả kịch bản kiểm tra tiêu cực và tích cực để có thể đột nhập vào hệ thống. Đối với Kiểm tra bảo mật, có thể sử dụng công cụ tự động hóa như IBM AppScan và HPWebInspect và các công cụ Kiểm tra thủ công như Proxy Sniffer, Paros proxy, HTTP watch, v.v. được sử dụng
* Kiểm tra khả năng sử dụng: Đảm bảo rằng những người có khả năng khác nhau sẽ có thể sử dụng hệ thống như người dùng bình thường. Ví dụ: ATM có thiết bị hỗ trợ thính giác và chữ nổi Braille cho người khuyết tật
* Kiểm tra sự chấp nhận của người dùng: Đây là giai đoạn kiểm tra cuối cùng được thực hiện bởi người dùng cuối để đảm bảo sự tuân thủ của ứng dụng với kịch bản thế giới thực.

## Các trường hợp thử nghiệm mẫu
### Dành cho quản trị viên
* Xác minh thông tin đăng nhập của Quản trị viên với dữ liệu hợp lệ và không hợp lệ
* Xác minh tất cả các liên kết trang chủ của quản trị viên
* Xác minh quản trị viên thay đổi mật khẩu với dữ liệu hợp lệ và không hợp lệ
* Xác minh quản trị viên thay đổi mật khẩu với dữ liệu hiện có
* Xác minh đăng xuất của quản trị viên

### Cho branch mới :
* Tạo một nhánh mới với dữ liệu kiểm tra hợp lệ và không hợp lệ.
* Tạo một nhánh mới không có dữ liệu.
* Tạo một chi nhánh mới với dữ liệu chi nhánh hiện có.
* Xác minh các tùy chọn đặt lại và hủy bỏ.
* Cập nhật chi tiết chi nhánh với dữ liệu kiểm tra hợp lệ và không hợp lệ.
* Cập nhật chi tiết chi nhánh với dữ liệu kiểm tra chi nhánh hiện có.
* Xác minh xem chi nhánh mới có thể được lưu hay không.
* Xác minh tùy chọn hủy.
* Xác minh việc xóa nhánh có và không có phụ thuộc.
* Xác minh xem tùy chọn tìm kiếm chi nhánh có hoạt động hay không.

### Cho Rule mới :
* Tạo một rule mới với dữ liệu hợp lệ và không hợp lệ
* Tạo một rule mới mà không có dữ liệu
* Xác nhận rule mới với dữ liệu hiện có
* Xác minh mô tả rule và loại rule
* Xác minh tùy chọn hủy và đặt lại
* Xác minh xóa rule có và không có phụ thuộc
* Xác minh các liên kết trong trang chi tiết rule

### Dành cho khách hàng và khách truy cập
* Xác minh xem tất cả các liên kết của khách truy cập và khách hàng có hoạt động bình thường hay không.
* Xác minh thông tin đăng nhập của khách hàng với dữ liệu kiểm tra hợp lệ và không hợp lệ.
* Xác minh thông tin đăng nhập của khách hàng mà không có bất kỳ dữ liệu nào.
* Xác minh thông tin đăng nhập của chủ ngân hàng mà không có bất kỳ dữ liệu nào.
* Xác minh thông tin đăng nhập của chủ ngân hàng với dữ liệu kiểm tra hợp lệ hoặc không hợp lệ.
* Xác minh khách hàng hoặc nhân viên ngân hàng có thể đăng xuất thành công.

### Dành cho người dùng mới
* Tạo người dùng mới với dữ liệu hợp lệ và không hợp lệ
* Tạo người dùng mới với dữ liệu branch hiện có
* Xác minh tùy chọn hủy và đặt lại
* Cập nhật người dùng với dữ liệu hợp lệ và không hợp lệ
* Cập nhật người dùng với dữ liệu hiện có
* Xác minh tùy chọn hủy
* Xác minh xóa người dùng

### Các trường hợp kiểm tra cho ứng dụng ngân hàng trực tuyến
* Kiểm tra xem người dùng có thể mở trang web ngân hàng hay không.
* Kiểm tra xem tất cả các liên kết trên trang web có hoạt động không.
* Xác minh xem người dùng có thể tạo tài khoản mới hay không.
* Kiểm tra xem người dùng có thể đăng nhập bằng tên người dùng và mật khẩu hợp lệ hay không hợp lệ.
* Xác minh nếu một trong hai tên người dùng hoặc mật khẩu bị trống khi đăng nhập, người dùng sẽ không được phép đăng nhập và thông báo cảnh báo sẽ hiển thị.
* Kiểm tra xem người dùng có được phép thay đổi mật khẩu hay không.
* Nếu một người dùng hoặc mật khẩu không hợp lệ được nhập, thông báo lỗi thích hợp sẽ được hiển thị.
* Người dùng có mật khẩu không hợp lệ sẽ không được phép đăng nhập.
* Xác minh rằng sau nhiều lần cố gắng đăng nhập bằng mật khẩu không chính xác, người dùng sẽ được hiển thị thông báo lỗi và bị chặn.
* Kiểm tra xem người dùng có thể thực hiện một số giao dịch cơ bản hay không.
* Xác minh rằng người dùng có thể thêm người thụ hưởng với các chi tiết hợp lệ và không hợp lệ.
* Xác minh xem người dùng có thể xóa người thụ hưởng hay không.
* Xác minh rằng người dùng có thể thực hiện các giao dịch với người thụ hưởng mới được thêm vào.
* Sau khi giao dịch, xác minh xem tài khoản của cả người dùng và người thụ hưởng có được cập nhật hay không.
* Kiểm tra xem người dùng có thể nhập số tiền dưới dạng số thập phân hay không.
* Xác minh xem người dùng không thể nhập số âm vào trường số tiền hay không.
* Xác minh xem người dùng có được phép thực hiện các giao dịch có hoặc không có số dư tối thiểu.
* Xác minh rằng thông báo phù hợp được hiển thị trong trường hợp giao dịch được thực hiện với số dư không đủ.
* Kiểm tra xem người dùng có được yêu cầu xác nhận trước khi bất kỳ giao dịch nào được thực hiện hay không.
* Xác minh xem biên nhận xác nhận có được cung cấp trên mỗi giao dịch thành công hay không.
* Xác minh xem người dùng có thể chuyển tiền vào nhiều tài khoản hay không.
* xác minh xem người dùng có thể hủy giao dịch hay không.
* Xác minh rằng chi tiết tài khoản cũng phản ánh các giao dịch tài chính được thực hiện.
* Xác minh rằng tính năng hết thời gian được triển khai.
* xác minh rằng trong trường hợp hết thời gian phiên, người dùng nên đăng nhập lại.
* xác minh rằng thời gian chờ của phiên thích hợp được thực hiện trong trường hợp bất kỳ hoạt động nào.
* xác minh rằng trong khi thực hiện giao dịch, người dùng được đưa đến chế độ bảo mật.
* Xác minh xem người dùng có thể đăng xuất thành công hay không.


Nguồn tài liệu : https://www.guru99.com/banking-application-testing.html
https://www.softwaretestinghelp.com/testing-banking-applications/