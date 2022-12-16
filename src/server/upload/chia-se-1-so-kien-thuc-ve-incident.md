### Giới thiệu
Trong mỗi dự án mà chúng ta đã làm đã làm chắc hẳn ai cũng đã từng gặp từng thấy những Incident xẩy ra ,vậy nguyên nhân lý do và cách khắc phục như thế nào mời các bạn tìm hiểu qua bài viết này nhé.
![](https://images.viblo.asia/131e9a24-8cf1-4f77-87f2-41c56baf4068.jpg)
### Mục lục

**1.Định nghĩa và mục đích xử lý Incident<br>
  &nbsp;&nbsp;1.1 Định nghĩa<br>
  &nbsp;&nbsp;1.2 Mục đích xử lý<br>
2.Báo cáo về Incident<br>
3.Nguyên nhân xảy ra Incident<br>
4.Cách khắc phục, xử lý Incident<br>**

### 1. Định nghĩa và mục đích xử lý Incident
##### 1.1. Định nghĩa
Incident là những nguy cơ tiềm ẩn, hoặc lỗi, sự cố đã xảy ra ở nội bộ, trong dự án, hoặc trên sản phẩm gây ra sự gián đoạn hoạt động dịch vụ, thiệt hại, tình trạng khẩn cấp, khủng hoảng và làm mất uy tín cho công ty, khách hàng hoặc end-user.
<br><br>
Incident có thể là những vấn đề:
- Lộ thông tin cần bảo mật: source code, account, key, personal information
- Có khả năng gây ảnh hưởng hoặc đã xảy ra ảnh hưởng tới end users: service dừng hoạt động một phần hoặc toàn bộ.
- Có khả năng gây ảnh hưởng hoặc đã xảy ra ảnh hưởng tới clients: thiệt hại về uy tín, tiền, delay hoặc không thể release, giảm số lượng users, vv...
- Có khả năng gây ảnh hưởng tới hoạt động của công ty: gián đoạn việc thực hiện công việc của nhân viên, khủng hoảng trong tâm lý nhân viên,vv...

##### 1.2. Mục đích xử lý
- Quá trình quản trị và xử lý Incident là để đảm bảo các Incident được phát hiện, quản trị, phân tích, và kiểm soát các giải pháp xử lý nhằm ngăn ngừa xuất hiện/xuất hiện lại trong tương lai.
- Ngoài ra còn có 1 số khái niệm liên quan như mức độ khẩn cấp, mức độ ảnh hưởng, độ ưu tiên giải quyết Incident.

### 2. Báo cáo về Incident
Khi phát hiện ra Incident bạn sẽ làm gì? <br><br>
Khi phát hiện ra Incident cần nhanh chóng báo cáo với cấp trên về sự cố.
  + Incident xảy ra khi nào ? Chức năng nào? Dự án nào?
  + Phạm vi ảnh hưởng
  + Tình trạng xử lý
  + Cách khắc phục
<br><br>

Tại sao cần phải báo cáo về Incident?
- Để khách hàng và nội bộ team phát triển sản phẩm nắm bắt được vấn đề và tình hình nhằm giảm thiểu tối đa thiệt hại.
- Để team phát triển tiến hành kiểm tra phân tích khắc phục sự cố.
- Để mọi người trong công ty biết được mức độ nghiêm trọng của sự cố, rút kinh nghiệm trong dự án mình đang làm hoặc những dự án tương lai.
- Để khách hàng nắm bắt và thấy được rằng phía bên phát triển đã nhận thức được vấn đề và đưa ra được phương án, cách khắc phục triệt để tránh xảy ra lỗi tương tự tiếp theo.


### 3. Nguyên nhân xảy ra Incident
- Estimate chưa hợp lý.
- Code logic lỗi, chất lượng code không đảm bảo, không cover được hết các case và không self test kỹ.
- Không tuân thủ các quy trình làm việc trong dự án cũng như trong công ty.
- Member tự ý test, sửa , xóa, ... trên Product của khách hàng mà không thông báo hay được sự đồng ý của khách hàng. (Nghiêm trọng)
- Ngoài ra, mindset làm việc của member chưa tốt.
(Tự ý up code, spec, design của dự án public lên Git cá nhân, share thông tin public lên SNS).

### 4. Cách khắc phục, xử lý Incident
Làm sao để không xảy ra những Incident tương tự
- Cấp trên và các thành viên cần thống nhất đưa ra Workflow làm việc chuẩn đúng quy trình tuân thủ theo quy định được đề ra. Cần phải được xác nhận của cấp trên và các bộ phận liên quan thống nhất, đồng ý về phương pháp đã đưa ra để không xảy ra Incident tương tự và làm việc này trước khi báo cáo với khách hàng.
- Cần list ra 1 số Incident hay gặp phải, 1 số Incident có thể xảy ra trong buổi họp kickoff dự án để toàn bộ member trong dự án nắm được.
- Cần có các buổi Seminar chia sẻ kiến thức về Incident để mọi người trong công ty nắm được, tránh các trường hợp tương tự xảy ra.
- Cần có Tool để quản lý Incident.
(Công ty đang sử dụng Tool GKC, cài bảo mật 2 lớp cho Git, cài bảo mật Gmail, chỉ share các thông tin về dự án cho member trong dự án và Account server của KH cho những Team leader).
- Training Mindset làm việc cho member ngay từ đầu dự án.
[Q] Tại sao cần training về Mindset làm việc ngay từ đầu dự án?
(Workflow làm việc hiệu quả).

### 5 Lời kết
Trên đây là những trang những điều khi xảy ra Incident ,nguyên nhân và cách khắc phục,qua bài này chúng ta có thể :
- Hiểu và nắm được Incident là gì.
- Vì sao phải xử lý khẩn cấp ưu tiên lên hàng đầu trong độ ưu tiên làm việc.
- Khi phát hiện ra Incident thì kỹ năng việc cần làm là gì.
- Nắm được nguyên nhân phát sinh ra Incident là từ đâu.
(Member tự ý test, sửa, xóa, vv... trên product của khách hàng mà không thông báo).
- Cách khắc phục để làm sao tránh không còn xảy ra Incident tương tự làm khách hàng yên tâm tin tưởng về giải pháp mình đã đưa ra.
- Một số ví dụ về những Incident nghiêm trọng điển hình trong công ty.

<br>
Cảm ơn các bạn đã đọc !