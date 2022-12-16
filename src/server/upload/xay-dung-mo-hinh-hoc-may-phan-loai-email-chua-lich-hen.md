Hôm nay, mình sẽ giới thiệu về các bước xây dựng một mô hình học máy với mục đích phân loại email chứa lịch hẹn. Nội dung trong bài viết dựa trên những bước mình đã tiến hành thực tế khi xây dựng mô hình.

![](https://images.viblo.asia/6e3c45f1-78d5-4c75-bf87-ad16c4d32dcd.png)
Ở trên là sơ đồ mô tả các bước xây dựng mô hình huấn luyện phân loại email chứa lịch hẹn. Tiếp theo ta sẽ đi cụ thể vào từng bước.

## 1. Thu thập dữ liệu huấn luyện
Bước đầu tiên để xây dựng mô hình phân loại email lịch hẹn là phải thu thập được
bộ dữ liệu email huấn luyện phù hợp với yêu cầu bài toán. Bộ email này cần có số
lượng email đủ lớn, bao gồm 2 loại email: chứa lịch hẹn và không chứa lịch hẹn,
với số lượng tương đương nhau để đảm bảo độ tin cậy của tập dữ liệu.
Để đáp ứng những yêu cầu trên, ta có thể tiến hành thu thập thủ công các email
lịch hẹn của bản thân cũng như người thân và bạn bè xung quanh. Ngoài ra cũng có thể tham khảo,
thu thập các mẫu thư hẹn trên Internet để tăng độ đa dạng của tập dữ liệu.

Ở mô hình của bài viết này, mình đã thu thập được tổng cộng 800 email bao
gồm 400 email chứa lịch hẹn và 400 email không chứa lịch hẹn. Các email này
được chia theo tỉ lệ 7:3 vào tập huấn luyện (training set) và tập kiểm thử (test set)
tương ứng để tiến hành các bước tiếp theo.

## 2. Tiền xử lí nội dung email
**2.1. Xoá header, signature, forward,...**

Đối với các email chuyển tiếp hoặc email phản hồi một email khác, nội dung email
sẽ có một số thông tin đính kèm được tự động thêm vào. Các thông tin đính kèm
này không hữu ích cho việc phân loại email nên ta cần sử dụng biểu thức chính
quy để xoá bỏ các phần này đi. Các biểu thức chính quy đã sử dụng được liệt kê ở
bảng dưới đây.



| Loại thông tin đính kèm | Ví dụ định dạng |  Biểu thức chính quy |
| -------- | -------- | -------- |
| Thư phản hồi  | Vào Th 4, 10 thg 6, 2020 vào lúc 08:40, Huu Vu <trinh.huu.vu@sun-asterisk.com > đã viết:   | (Vào (Th\|[\d]+:[\d]+)((?!viết:)[\S\s])*viết:)  |
|  | On Fri, 12 June 2020 at 08:40, HuuVu <trinh.huu.vu@sun-asterisk.com> wrote:  |(On(Mon\|Tue\|Wed\|Thu\|Fri\|Sat\|Sun)((?!wrote:)[\S\s])*wrote:) |
|Thư chuyển tiếp|---------- Forwarded message ---------<br>From: AAA<aaa@ edu.vn><br>Date: Fri, 12 December 2020 at 08:40<br>Subject: Viết bài Viblo<br>To: <bbb@edu.vn><br>Cc: CCC<ccc@edu.vn>  |-+ Forwarded message -+(\n.*)*?\n\n<br><br>-+ Thư đã chuyển tiếp -+(\n.*)*?\n\n |
|Chữ kí|--<br>Trịnh Hữu Vũ<br>Sun* Inc<br>Email: trinh.huu.vu@sun-asterisk.com  |\s--\s*(\n.*)*\n\n? |<>

<br>

**2.2. Loại bỏ các thành phần không cần thiết trong nội dung email**

Để tăng độ chính xác cho việc phân loại, cần phải loại bỏ bớt các thành phần gây
nhiễu, không mang thông tin cuộc hẹn trong nội dung email. Do đó, ta sẽ thực hiện
các bước sau để làm sạch nội dung email:
* Loại bỏ các thẻ HTML, code javascript, css chứa trong email.
* Loại bỏ các đường link, số điện thoại, địa chỉ email xuất hiện trong nội dung
email.
* Loại bỏ các từ không mang ý nghĩa trong câu (stopwords) của cả tiếng anh
và tiếng việt.
* Loại bỏ các kí tự đứng riêng lẻ hoặc các kí tự đặc biệt.

**2.3. Thay thế các thực thể thời gian, địa điểm**

Trong các email lịch hẹn, đương nhiên sẽ phải có các thông tin về thời gian, địa
điểm của buổi hẹn. Cũng có thể coi việc xuất hiện các thông tin về thời gian, địa
điểm như là dấu hiệu nhận biết email chứa lịch hẹn. Tuy nhiên, nếu chỉ thực hiện
tách từ thông thường thì các thông tin thời gian, địa điểm sau khi được vector hoá
sẽ bị phân tán và không có giá trị cao. Do đó, ta cần thay thế các thông tin này
bằng một từ đại diện nhằm mục đích nâng cao giá trị của thông tin thời gian, địa
điểm trong nội dung email.
Các thực thể địa điểm sẽ được tìm kiếm trong từ điển địa điểm và thay thế bằng từ
đại diện _LOCATION_. Các thực thể thời gian sẽ được xử lí bằng biểu thức chính
quy và thay thế bằng từ đại diện _TIME_.
Việc thay thế các thực thể thời gian sẽ được thực hiện bằng biểu thức chính quy
như bảng dưới đây.



| Loại | Các định dạng | Biểu thức chính quy |
| -------- | -------- | -------- |
| Giờ |  8:30<br>8h, 8h30<br>8 giờ, 8 giờ 30 phút<br>8am, 8pm, 8:30pm |(\d{1,2}\s+giờ(\s+\d{1,2}\s+phút)?)\|(\d{1,2}[hg](\d{1,2}'?)?)\|(\d(:\d{1,2})?(\s?(am\|pm)))\|(\d{1,2}:\d{1,2})    |
| Thứ |  thứ hai,... thứ bảy<br>thứ 2-7, t2-7<br>chủ nhật |(thứ\s+(hai\|ba\|tư\|năm\|sáu\|bảy\|[2-7]))\|(chủ\snhật)\|t[2-7]\|cn |
| Ngày |  ngày 25<br>hôm nay, hôm sau, hôm tới,<br>hôm qua<br>ngày mai, ngày sau, ngày tới<br>ngày kia |ngày\s+(\d{1,2}\|mai\|kia\|kìa)<br><br>hôm\s+(nay\|tới\|sau\|qua\|kia) |
| Tuần | tuần này<br>tuần sau, tuần tới<br>tuần trước |tuần\s+(này\|tới\|sau\|trước) |
| Tháng |tháng 12<br>tháng này<br>tháng sau, tháng tới<br>tháng trước |tháng\s(\d{1,2}\|sau\|tới\|trước\|này) |
| Năm |năm 2020<br>năm nay<br>năm sau, năm tới<br>năm trước|năm\s+([12]\d{1,3}\|nay\|sau\|tới\|trước) |
| Date |dd-mm-yyyy<br>dd/mm/yyyy|([0-2][0-9]\|(3)[0-1])([\/-])(((0)[0-9])\|((1)[0-2]))([\/-])\d{4} |
| |yyyy-mm-dd|([0-2][0-9]\|\d{4}\-(0[1-9]\|1[012])\-(0[1-9]\|[12][0-9]\|3[01]) |
| |mm/yyyy |(0?[1-9]\|10\|11\|12)/20[0-9]{2} |

## 3. Trích xuất đặc trưng
Sau bước tiền xử lý, giờ ta đã có đầy đủ dữ liệu, việc quan trọng là cần trích xuất
đặc trưng của các email trong tập dữ liệu, biểu diễn ngôn ngữ về dạng mà máy tính
có thể học được.
Bước đầu tiên, ta cần xây dựng một từ điển chứa tất cả các từ xuất hiện trong tập
dữ liệu email và số lần mà chúng xuất hiện. Sau đó, ta sẽ chọn giữ lại trong từ điển
một số lượng nhất định những từ thường xuyên xuất hiện nhất. Ở đây, mình đã chọn
800 từ thường xuyên xuất hiện để dùng làm từ điển.
Bước thứ hai là vector hoá các email trong tập dữ liệu, mỗi vector có độ dài bằng
số từ trong từ điển, phần tử thứ i của vector chứa số lần từ thứ i của từ điển xuất
hiện trong email mà vector đó đại diện. Ở bước này, đồng thời ta cũng tạo ra mảng
các nhãn (labels) của các email trong tập dữ liệu tương ứng.

## 4. Huấn luyện mô hình với thuật toán SVM
Để tiến hành huấn luyện, mình đã sử dụng module SVC của thư viện sklearn.
Mô hình sẽ được xây dựng trên tập huấn luyện, sau đó áp dụng với tập kiểm thử
để dự đoán lớp phân loại và đánh giá các thông số về độ chính xác.

## 5. Kết quả phân loại

Kết quả độ chính xác sau khi xây dựng mô hình như sau

* Accuracy:  97.92%
* Precision:  98.32%
* Recall:  97.5%
* F1 Score:  97.91%