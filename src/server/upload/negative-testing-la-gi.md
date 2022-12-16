Test tiêu cực - Dịch ra thì chuối quá - nên mình quyết định dùng từ gốc là: Negative testing.

### **Định nghĩa negative testing!**

Để đảm bảo hệ thống chạy trơn tru và ổn định, chúng ta chỉ test những trường hợp bình thường và hợp lệ là chưa đủ. Vì vậy, để đảm bảo hệ thống chạy có thể xử lý được những trường hợp ngoại lệ ta cần test thêm những ngữ cảnh không hợp lệ! (negative testing). Làm được việc này thì hệ thống sẽ có kinh nghiệm xử lý khi các ngữ cảnh này xảy ra bất thường.

### **ví dụ:**

Thực tế đời sống: Xe buýt chở được 20 người. Ta cho 20 người cho xe chở bình thường. Nhưng chuyện gì sẽ xảy ra nếu nó chở 21 hoặc 30 người? Xe bị đổ, nghiêng, lún, lái khó ...
=> Đây là negative case.

Phần mềm: Email field có thể chứa đến 50 ký tự 
=> Điều gì sẽ xảy ra nếu email của người dùng có đến 60 ký tự ? 
=> Lỗi quăng ra không lưu được người dùng, dừng hệ thống ... 
=> Đây là negative case.

Hãy lấy một số ví dụ thực tế sau khi xem ví dụ phía trên, tất cả các bạn sẽ có thể viết các trường hợp thử nghiệm tiêu cực.

### **Ví dụ 1**: Trường Nhập Số Di động.

![](https://images.viblo.asia/f4de95e6-e3e7-42e6-8f7e-76584a65cde0.png)

*Yêu cầu:*

* Số điện thoại di động được nộp chỉ nên chấp nhận 10 chữ số.
* Trường Nhập Số di động là bắt buộc.
* Các trường hợp thử nghiệm Negative và Positive sẽ như sau.

***Các trường hợp Positive Test case:***
* `Kiểm tra phản hồi của hệ thống khi người dùng nhập 10 chữ số.`

***Các trường hợp Negative test case:***
* `Kiểm tra phản hồi khi chúng ta nhập 9 chữ số.`
* `Kiểm tra phản hồi khi chúng ta nhập 11 chữ số.`
* `Kiểm tra phản hồi khi chúng ta nhập ký tự vào đó.`
* `Kiểm tra phản hồi khi chúng ta nhập ký hiệu đặc biệt.`
* `Kiểm tra phản hồi khi chúng ta để trống trường số điện thoại di động và nhấp vào nút lưu.`
* `Kiểm tra phản hồi khi chúng ta nhập mười số không.`

Bạn có thể viết những loại Trường hợp Negative testing này. Các yêu cầu đóng một vai trò quan trọng để viết các trường hợp kiểm thử positive cũng như là negative test cases. Vì vậy, hãy cố gắng hiểu yêu cầu một cách sâu sắc trước.

### **Ví dụ 1**: Trường Id Email.

![](https://images.viblo.asia/bc5b106c-b420-4d33-934b-266a796d3a21.jpg)

*Yêu cầu:*
* Trường id email phải là trường bắt buộc.
* Trường id email phải chấp nhận định dạng hợp lệ (ví dụ: xxx@domain.com).
* Trường id email phải chấp nhận id email với miền phụ (xxx@subdomain.domain.com).
* Trường id email phải cho phép id email có dấu chấm và dấu gạch ngang (ví dụ: xxx_xxx@Domain.com).
* Id email có ký tự và chữ số phải được cho phép.
* Id email với bất kỳ phần mở rộng nào phải được cho phép. (Ví dụ: xxx@domain.extension), v.v.

**Các trường hợp Positive Test case:**

* `Kiểm tra phản hồi khi chúng tôi nhập “xxx@domain.com”.`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx.xxx@domain.com”`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx@subdomain.domain.com”`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx@domain.org”`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx@domain.co.in”`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx@domain.party”`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx@domain.science”`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx@domain.party”`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx-vvv@domain.com”`
* `Kiểm tra phản hồi khi chúng tôi nhập “123456789@domain.com”`

Bạn có thể viết nhiều trường hợp thử nghiệm khác.

**Các trường hợp Negative test case:**
* `Kiểm tra phản hồi khi chúng tôi nhập “.xxx @ domain.com”.`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx@4444.55555”.`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx @ domain… com”.`
* `Kiểm tra phản hồi khi chúng tôi nhập “xx @ # $$ %% ^^:” {} /?> <X@domain.com ”.`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx@--domain.com”.`
* `Kiểm tra phản hồi khi chúng tôi nhập “..xxx @ domain.com”.`
* `Kiểm tra phản hồi khi chúng tôi nhập “う え @ domain.com”.`
* `Kiểm tra phản hồi khi chúng tôi nhập “@ domain.com”.`
* `Kiểm tra phản hồi khi chúng tôi nhập “xxx @ domain”`
* `Kiểm tra phản hồi khi chúng tôi nhập “ddd @ xxx @ domain”`
* `Có những loại trường hợp kiểm tra tiêu cực bạn có thể viết Để đánh giá trường địa chỉ email.`

### Negative testing có quan trọng không?

Câu trả lời ngắn gọn là **Có**. Nhưng việc dùng nó ở đâu và như thế nào thì phụ thuộc vào tùy tình huống, rủi ro của dự án.
Đối với những dự án quan trọng như: thương mại điện tử, hóa đơn, ... thì việc test thể hiện hiệu quả cao để tránh rủi ro về sản phẩm, hacker, những người phá hoại... Ngược lại, đối với những dự án nhỏ và ít liên quan tới doanh thu như: quản lý thông tin nhân viên, tìm nhà ở... thì phần ưu tiên lại testing negative lại giảm xuống.

***Làm như thế nào?***

* Quy trình bình thường:
* Tìm hiểu tài liệu.
* Chọn lọc những case hợp lệ.
* Suy ra được những case ngoại lệ.

 ***Ưu và nhược điểm:***
 
***Ưu:***

* Nâng cao chất lượng sản phẩm.
* Giúp sản phẩm có khả năng phản ứng tốt với ngoại lệ. 
* => Tăng độ tự tin cho khách hàng.

***Nhược điểm:***

* Tốn thời gian và chi phí.
* Cần nguồn nhân lực có kinh nghiệm để suy nghĩ những trường hợp ngoại lệ.
* Khó quản lý hoặc nhận ra hết những trường hợp ngoại lệ.

**Kết:** Tester cần có kỹ năng để nhìn nhận được những case Negative để cho bộ testcase hoàn hảo hơn.

Bài viết được dịch thuật từ: 
* http://www.software-testing-tutorials-automation.com/2016/12/negative-testing.html
* https://www.guru99.com/negative-testing.html?utm_campaign=click&utm_medium=referral&utm_source=relatedarticles