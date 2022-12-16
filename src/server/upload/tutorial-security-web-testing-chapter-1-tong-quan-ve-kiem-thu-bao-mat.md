# Lý do viết bài




Đơn giản là website thì ngày càng nhiều mà hacker thì ngày càng manh động. Đặc biệt các thông tin được chia sẻ/lưu trữ trên web cũng ngày càng tăng giá trị như : thông tin khách hàng, thông tin giao dịch tài chính, thông tin tài khoản/thẻ ngân hàng…. Do đó mỗi một lỗ hổng bảo mật trên web đều là mồi ngon của hacker và thiệt hại thì cực kỳ to lớn. 

**Thế Giới :**

Tháng 2/2018, hơn 4.000 website, trong đó có cả của chính phủ Anh, Mỹ, Australia đồng loạt gặp sự cố bảo mật. Nguyên nhân đến từ một plugin của bên thứ ba có cài sẵn mã độc âm thầm đào tiền ảo nhưng người dùng máy tính bị nhiễm không hề hay biết.

Hồi tháng 6/2018, Dixons Carphone, công ty bán lẻ của Anh, cho biết khoảng 1,2 triệu thông tin cá nhân và thẻ thanh toán của khách hàng đã bị đánh cắp. Tuy nhiên, con số chính xác được công bố sau đó lên đến 10 triệu.

**Việt Nam :**

Ngày 1/11/2018, một thành viên của diễn đàn Raidsforum đã đăng tải các tập tin có chứa dữ liệu quan trọng về khách hàng được cho là của đại gia bán lẻ Thế giới Di động. Thông tin được hacker này đưa ra bao gồm thư điện tử, số thẻ tín dụng, lịch sử giao dịch ngân hàng, giao dịch thương mại điện tử thực hiện tại Thế giới di động

Tối 13/10/2018, một địa chỉ thuộc website của ngân hàng Hợp tác xã Việt Nam hiển thị thông tin bằng tiếng Anh với nội dung: "Đã bị hack bởi Sogo Nakamoto". Tin tặc tuyên bố nắm trong tay toàn bộ cơ sở dữ liệu người dùng ngân hàng trực tuyến cũng như trình quản lý máy chủ web (WHM - Web Host Manager). Tin tặc thông báo sẽ bán 275.000 dữ liệu khách hàng với giá 100.000 USD và người mua phải thanh toán bằng Bitcoin hoặc Bitcoin Cash

# Các khái niệm mà ai cũng có thể search ra
### Security Testing là cái gì

***Security Testing*** (kiểm thử bảo mật) là một loạt các kỹ thuật kiểm tra độ bảo mật nhằm tìm kiếm tất cà các lỗ hổng và điểm yếu của một hệ thống. Hiện nay, đây là một trong những phần quan trọng nhất trong vòng đời phát triển của phần mềm. Việc Kiểm thử bảo mật không đảm bảo một hệ thống sẽ an toàn 100% nhưng sẽ giảm thiểu tối đa các lỗi bảo mật, ít nhất là giúp hệ thống trở nên khó nhai hơn với các hacker (tất nhiên với hacker cao thủ thì nó vẫn nhai tất).

### Mục đích của Security Testing?

Mục đích của Kiểm thử bảo mật là xác định các mối đe dọa và các lỗ hổng trong hệ thống. Nó giúp xác định tất cả các rủi ro về an toàn bảo mật trong hệ thống và giúp các nhóm phát triển phần mềm trong việc khắc phục các vấn đề này. ***Security Testing***  tập trung xác minh 6 nguyên tắc cơ bản được liệt kê như sau:

1. Confidentiality (bảo mật)
1. Integrity (toàn vẹn)
1. Authentication (chứng thực)
1. Authorization (ủy quyền)
1. Availability (tiện lợi)
1. Non-repudiation 

### Các quy trình Security Testing : có 7 quy trình
1.  Rà soát các lỗ hổng tiềm ẩn – Vulnerable Scanning: thực hiện thông qua các phần mềm để tự động scan một hệ thống nhằm phát hiện ra các lỗ hổng dựa trên các signatures đã biết.
1. Rà soát các điểm yếu của hệ thống – Security Scanning: bao gồm việc xác định các điểm yếu của mạng và hệ thống, sau đó cung cấp các giải pháp nhằm giảm thiểu các rủi ro này. Có thể thực hiện bằng thủ công hoặc tự động.
1. Đánh giá bảo mật bằng cách tấn công vào hệ thống – Penetration testing: Đây là loại kiểm thử mô phỏng cuộc tấn công từ phía một hacker thiếu thiện ý. Kiểm thử bao gồm việc phân tích một hệ thống cụ thể, tìm ra các lỗ hổng tiềm ẩn bằng cách tấn công từ bên ngoài.
1. Đánh giá rủi ro – Risk Assessment: Kiểm thử này liên quan đến phân tích các rủi ro bảo mật nhận thấy được. Các rủi ro được phân loại là Low, Medium, High. Loại kiểm thử này đưa ra các khuyến nghị nhằm giảm thiểu các rủi ro.
1. Kiểm toán an ninh – Security Auditing: Kiểm tra bảo mật nội bộ ứng dụng và OS.
2. Tấn công vào hệ thống tìm các điểm yếu bảo mật – Ethical hacking: Các hacker thiện ý thực hiện phương pháp tương tự như những kẻ tấn công “thiếu thiện ý”, với mục tiêu tìm kiếm các điểm yếu bảo mật và xác định cách thức để thâm nhập vào mục tiêu, nhằm đánh giá mức độ thiệt hại do các lổ hỗng này gây ra, từ đó đưa ra cảnh báo cùng những phương án gia cố, kiện toàn bảo mật thích hợp.
3. Posture assessment: Kết hợp Security Scanning, Ethical hacking và Risk Assessment đánh giá bảo mật tổng thể một tổ chức.

### Tích hợp các quy trình bảo mật với vòng đời phát triển của phần mềm (SDLC – Systems development life cycle)

![](https://images.viblo.asia/cdb08dc6-7d2a-46bf-a5d4-96a863d19037.png)

**Trong đó, Test Plan bao gồm:**

* Liên quan đến các trường hợp hoặc các kịch bản kiểm thử.
* Các dữ liệu liên quan đến kiểm thử an ninh.
* Các công cụ liên quan đến kiểm thử an ninh.
* Phân tích các kết quả kiểm tra khác nhau từ các công cụ bảo mật khác nhau.

**Kịch bản kiểm thử mẫu giúp cung cấp một cái nhìn sơ lược về các trường hợp kiểm thử bảo mật:**

* Mật khẩu cần phải ở dạng mã hóa.
* Ứng dụng hoặc hệ thống cần phải kiểm soát người dùng, không cho phép các người dùng không hợp lệ.
* Kiểm tra cookies và session time.
* Với các website tài chính, Browser back button không nên hoạt động.

**Phương pháp Kiểm thử bảo mật:**

* Tiger Box: được thực hiện trên một laptop, trong đó có một tập các các hệ điều hành và các công cụ hack. Phương pháp này giúp các nhân viên kiểm thử penetration testers và security testers tiến hành đánh giá các lỗ hổng và các cuộc tấn công.
* Black Box: Nhân viên kiểm thử được ủy quyền để kiểm tra tất cả mọi thứ về về topo và công nghệ mạng.
* Grey Box: Là sự kết hợp của mô hình black box và white box.

# Lộ trình tiếp theo 

* Nghiên cứu các kiểu hack thường xảy ra (threats), các kỹ thuật security test và các tool test hỗ trợ.
* Nghiên cứu chi tiết một số kỹ thuật security test.

# Tham khảo
https://www.3pillarglobal.com/insights/approaches-tools-techniques-for-security-testing

https://www.softwaretestinghelp.com/how-to-test-application-security-web-and-desktop-application-security-testing-techniques/

https://www.testbytes.net/blog/security-testing-threats-tools-techniques/

https://www.guru99.com/what-is-security-testing.html

https://searchsoftwarequality.techtarget.com/tutorial/Learning-Guide-Application-security-testing-techniques

https://blog.detectify.com/2018/02/21/website-security-check-guide/

https://www.tutorialspoint.com/security_testing/index.htm
https://whitehat.vn/threads/kien-thuc-co-ban-ve-an-ninh-mang.4373/?scroll=web