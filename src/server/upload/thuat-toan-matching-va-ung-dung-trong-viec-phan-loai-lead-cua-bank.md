> Những ngày tháng 11 sài gòn bỗng đẹp lạ thường, nóng vừa đủ, mát vừa đủ, mọi sóng gió bỗng nhiên dừng lại 1 cách lạ thường. Nếu không có bạn covid thì có lẽ giờ này đang lang thang trên phố sách để được đọc Free tiếp cuốn sách về cuộc đời của cố nhạc sĩ Trịnh Công Sơn, mình thích cái cảm giác lãng mạn đầy triết học của các ca khúc nhạc Trịnh và những người tình âm nhạc của vị nhạc sĩ tài ba
Người mộng mơ như nhà thơ nên làm khoa học cũng theo cảm xúc, tại nay ngồi quán cafe nhiều hotgirl quá, nhạc hay, View đẹp nên tính viết vài thứ chẳng liên quan gì đến Nghệ thuật cả 😂, tóm lại là câu chuyện liên quan đến "Làm thế nào cho vay mà không bị xù nợ"

Bài toán thế này:

**BOSS**: Vừa họp với tổng tài, tập đoàn ép KPI phải tăng mảng vay tín chấp lên 200% vào năm tới và giảm 50% tỷ lệ nợ xấu. Mấy chú CTO tính sao tìm cách cải tiến CRM để việc lọc Lead có nhu cầu vay 4.0 hơn thay vì làm bằng cảm xúc, check nợ xấu, check trùng, check blacklist nó ngon lành cành đào hơn, chứ làm ăn quá ko hiệu quả.

**CTO**: Lòng buồn như mùa thu Hà Nội (kỷ niệm bị bỏ rơi ở hồ gươm bởi con bồ đẹp ham vật chất ồ về). Data thì nhiều vãi ra, đối tác ngày bắn qua cả trăm ngàn Lead mà phần nhiều là rác. Nói chung phải kiếm ra 1 cái gì đó để Matching được Lead với gói vay và lọc cái đám rác ra khỏi hệ thống, tuy nhiên rác cũng có thể tái chế lại để sử dụng cho việc check blacklist, nợ xấu...

Bắt đầu động não chút, công ty có đâu đó khoảng 20 khoản vay

A1, A2, A3,...: Vay theo lương
B1, B2, B3,...: Vay theo bảo hiểm xã hội
C1, C2, C3: Vay theo cơ sở kinh doanh buôn bán
Từng khoản vay sẽ có các thuộc tính sau:

* Khu vực, tỉnh thành áp dụng
* Thu nhập, mức lương yêu cầu
* Hình thức thu nhập: Chuyển khoản, tiền mặt vv...
* Ngành nghề áp dụng
* Cơ sở kinh doanh: Có đăng ký kinh doanh, kinh doanh ko có đăng ký
* Tình trạng hôn nhân của khách hàng
* Giới tính của khách hàng
* Địa chỉ: hiện tại, địa chỉ hộ khẩu
* Loại địa chỉ, tình trạng sở hữu , số tháng ở
* Người liên hệ
* Routine của Lead
* Thông tin công ty: Tên, mã số thuê, phone, địa chỉ vv..
* Thông tin đã vay mượn: Đã vay những tổ chức nào, số tiền, thời hạn vay, lịch sử trả nợ vv..
* Check blacklist
* CIC S37
* Check duplicate
* Check watchlist
Tạm vậy đã chứ nhiều quá trời ah, làm bài toán cụ thể thì các bồ nghiên cứu kỹ nha, mình lấy vài ví dụ thui à 😭

Tuỳ vào sản phẩm vay mà yêu cầu trọng số của từng thuộc tính sẽ khác nhau, quý dị coder nên define 1 cái màn hình để định nghĩa động các trọng số cho từng thuộc tính này nhé cho các bạn kinh doanh dễ thay đổi khi cần thiết. Thay đổi sao thì tuỳ Bank của anh chị, phù hợp là đc.

Nhìn sơ chúng ta sẽ cần mấy thứ bắt buộc của khoản vay như sau: Khu vực, Loại sản phẩm, Lead có nhu cầu vay, Check blacklist, CIB S37, duplicate,watchlist cho vay tức là:

if (Lead thuộc khu vực [Hà nội, Hồ Chí Minh, Bình Dương, vvv] && Lead làm việc công ty && Lead có nhu cầu vay từ autocall && Check blacklist, CIB S37, duplicate,watchlist là okay)

* Kiểm tra từng thuộc tính khách hàng và tính điểm matching
* Nếu tỷ lệ matching là 60%(Tuỳ chiến lược và sản phẩm) thì đổ lead tự động vào rổ cho TSA(Telesale Agent) gọi.

Nói chung là việc chỉ có vậy nhưng mô hình ra code sẽ chẳng đơn giản tý nào 😩. Các Rule kiểm tra sẽ như sau nhé:

* Income Rule: SalaryRule, IncomeRule, IncomeMethodRule
* SpecializationRule
* GenderRule
* MaritalStatusRule
* Address Rule: CityRule, DurationResidenceRule, PropertyTypeRule
* ContactRule
* DebtRule
* TelcoRule
Với từng sản phẩm vay quý vị nên có 1 form cấu hình Rule kiểm tra như sau nhé:

![](https://images.viblo.asia/8dc813f6-0000-4a6c-8b05-b534648a4a2e.png)


Đến đây việc kiểm tra rule để tính điểm chỉ đơn giản chuyển đổi về bài toán kiểm tra rule, tôi có phát triển một kỹ thuật trong bài viết này:

https://viblo.asia/p/ky-thuat-giai-quyet-bai-toan-ve-policy-va-cong-thuc-tinh-toan-dong-cho-san-pham-phan-mem-1Je5E71wZnL

Việc tổ chức code chấm điểm sao cho ngon lành và mang mầu của DesignPattern anh chị có thể tham khảo cái class diargam sau nhé:
![](https://images.viblo.asia/615960b5-1461-4ff6-bb45-d2eb4e3fa7ee.png)