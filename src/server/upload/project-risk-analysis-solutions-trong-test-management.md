# 1. Phân tích rủi ro (Risk Analysis) là gì

Rủi ro (Risk) là xác suất xảy ra của một sự kiện không mong muốn. Phân tích rủi ro là quá trình phân tích rủi ro liên quan đến Dự án thử nghiệm của bạn. Để thành công cho dự án của bạn, Rủi ro cần được xác định và các giải pháp tương ứng nên được xác định trước khi bắt đầu dự án. Trong bài viết này sẽ đề cập đến bước đầu tiên trong quy trình Test Management : Phân tích rủi ro  (Risk Analysis ) và giải pháp

Case study trong bài viết này là ứng dụng guru99.com :
Hệ thống gồm có 2 role 
Manager
Customer
và có những  features/module dưới đây:

![](https://images.viblo.asia/ef1e3fc9-1074-4e61-82ea-23cc62af886c.png)

Hoạt động của website sẽ như sau:

![](https://images.viblo.asia/39074e89-0d81-4248-90ba-52581882e798.gif)


Giả sử sau khi đọc các tài liệu yêu cầu, bạn có thể nhận ra rằng trang web có quá nhiều kịch bản chức năng và phức tạp .

Đây là tình huống :

Trang web ngân hàng Guru99 đã kết thúc giai đoạn phát triển. Bây giờ nó bắt đầu giai đoạn kiểm thử. Đáng buồn thay, bạn đã không tham gia sớm trong requirements phase
Sếp của bạn cần bạn hoàn thành kiểm thử trong một tháng chỉ với ngân sách hạn chế, nhưng mong đợi chất lượng tuyệt vời .
Một thành viên trong nhóm là một kỹ sư giàu kinh nghiệm, nói với bạn

![](https://images.viblo.asia/4da6173a-ea49-4d81-9499-99556c2dfd11.jpg)

Trong trường hợp như vậy, bạn nên làm gì?

A) Nó dường như là một vấn đề lớn. Chúng ta cần phải đối phó với càng sớm càng tốt !!!

B) Tôi không quan tâm. Chúng ta cần bắt đầu làm việc ngay bây giờ.

Ví dụ trên minh họa tầm quan trọng của phân tích rủi ro trong Quản lý kiểm tra.

Quản lý rủi ro giúp bạn trong các tình huống sau:

![](https://images.viblo.asia/7ea8ff88-d70c-405c-bb55-2d313f65d1c3.png)

Rủi ro, được đề cập trong ví dụ trên, chỉ là một trong nhiều rủi ro tiềm ẩn có thể xảy ra trong dự án của bạn. Bạn nên xác định chúng và đưa ra quyết định đối phó với chúng càng sớm càng tốt !!! Vì vậy, hành động đúng trong ví dụ đó là hành động A) Nó dường như là một vấn đề lớn. Chúng ta cần phải đối phó với càng sớm càng tốt !!!

# 2. Phân tích rủi ro như thế nào?

Phân tích rủi ro gồm 3 bước: 

1. Xác định rủi ro
2. Phân tích tác động của từng rủi ro được xác định
3. Thực hiện các biện pháp đối phó với rủi ro được xác định và phân tích

![](https://images.viblo.asia/e51a1793-7a9c-4f73-98e4-21be8ed14ff7.png)

Bước 1) Xác định rủi ro
Rủi ro có thể được xác định và phân loại thành 2 loại

![](https://images.viblo.asia/275ad53c-7bcc-434e-bd19-182d10bea631.png)

**Project Risk**

Rủi ro dự án có thể được định nghĩa là một sự kiện hoặc hoạt động không chắc chắn có thể ảnh hưởng đến tiến độ của dự án. Tác động có tác động tích cực hoặc tiêu cực đến triển vọng đạt được các mục tiêu của dự án.

Có 3 loại rủi ro dự án

![](https://images.viblo.asia/34ab90a7-ed80-4a73-a428-7838281cd7f1.png)

**Organizational Risk**
Đó là một rủi ro liên quan đến nguồn nhân lực của bạn hoặc test team. Ví dụ, trong dự án của bạn, thiếu thành viên có kỹ thuật là một rủi ro. Không có đủ nhân lực để hoàn thành dự án đúng hạn là một rủi ro khác.

![](https://images.viblo.asia/691c227e-9c97-4136-bb3b-b750305cacc0.png)

Để xác định Organizational Risk, bạn nên lập danh sách một vài câu hỏi và trả lời chúng. Dưới đây là một số câu hỏi được đề nghị.

1. Đây có phải là một đội được tổ chức tốt?
A)
B) Không
2. Mỗi thành viên trong nhóm có kỹ năng để thực hiện công việc của mình không ??
A)
B) Không
3. So sánh với quy mô và tiến độ dự án, chúng ta có đủ nhân lực để hoàn thành dự án này vào thời hạn không?
 A)
 B) Không

Nếu bạn trả lời tất cả các câu hỏi trên, bạn sẽ dễ dàng xác định các rủi ro tiềm ẩn, có thể ảnh hưởng đến dự án của bạn.

**Technical Risk**

Technical Risk là xác suất tổn thất phát sinh trong quá trình thực hiện quy trình kỹ thuật như kỹ thuật chưa được kiểm tra, quy trình thử nghiệm sai, vv. Dưới đây là một ví dụ về Technical Risk: 

Task của bạn trong dự án này là thử nghiệm một trang web ngân hàng. Bạn phải thiết lập môi trường thử nghiệm phù hợp phản ánh môi trường kinh doanh thực tế. Nếu Môi trường kiểm tra không được thiết lập đúng, sản phẩm sẽ không được kiểm tra chính xác và nhiều lỗi sẽ không được phát hiện.

**Business Risk**
Là rủi ro liên quan đến một thực thể bên ngoài . Đó là rủi ro có thể đến từ công ty của bạn, khách hàng của bạn chứ không phải từ dự án của bạn.

Hình ảnh sau đây cho bạn thấy một ví dụ về rủi ro kinh doanh.

![](https://images.viblo.asia/4bf11c78-88bc-4a40-9a69-0a1b52bc85b8.png)

Trong trường hợp đó, Trình quản lý kiểm tra phải tìm ra các giải pháp để đối phó với rủi ro như:

* Đặt mức độ ưu tiên cho các giai đoạn thử nghiệm, tập trung vào thử nghiệm các tính năng chính của trang web
* Sử dụng một công cụ kiểm tra để tăng năng suất kiểm tra
* Áp dụng cải tiến quy trình để giảm nỗ lực quản lý.

**Product Risk**

Product Risk là khả năng hệ thống hoặc phần mềm có thể không đáp ứng hoặc đáp ứng sự mong đợi của khách hàng, người dùng hoặc các bên liên quan. Rủi ro này liên quan đến chức năng của sản phẩm như Vấn đề về Hiệu suất, Vấn đề Bảo mật, Kịch bản Sự cố, v.v.

Sau đây là ví dụ về một vài rủi ro sản phẩm : 

* Phần mềm bỏ qua một số chức năng chính mà khách hàng đã chỉ định trong yêu cầu của người dùng
* Phần mềm này không đáng tin cậy và thường xuyên không hoạt động.
* Phần mềm thất bại theo cách gây thiệt hại tài chính hoặc thiệt hại khác cho người dùng hoặc công ty sử dụng phần mềm.
* Phần mềm có các vấn đề liên quan đến một đặc tính chất lượng cụ thể như bảo mật, độ tin cậy, khả năng sử dụng, khả năng bảo trì hoặc hiệu suất.

## Bước 2) Phân tích tác động của rủi ro xảy ra

Trong chủ đề trước, chúng tôi đã xác định các rủi ro có thể cản trở dự án của bạn. Dưới đây là danh sách các rủi ro được xác định:

* Bạn có thể không có đủ nguồn nhân lực để hoàn thành dự án đúng hạn
* Môi trường thử nghiệm có thể không được thiết lập đúng như môi trường kinh doanh thực tế.
* Ngân sách dự án của bạn có thể giảm một nửa vì tình hình kinh doanh
* Trang web này có thể thiếu chức năng bảo mật

Mỗi rủi ro phải được phân loại trên cơ sở hai thông số sau

* Các khả năng xảy ra
* Tác động đến dự án

## Bước 3) Thực hiện các biện pháp đối phó để giảm thiểu rủi ro

Hoạt động này được chia thành 3 phần
![](https://images.viblo.asia/bda042a9-d253-4597-a57a-38e34637378b.png)

**Risk response**

Người quản lý dự án cần chọn các chiến lược sẽ giảm thiểu rủi ro đến mức tối thiểu. Người quản lý dự án có thể chọn giữa bốn chiến lược ứng phó rủi ro sau đây

![](https://images.viblo.asia/1b0d48c8-dd67-42c1-b832-6f4b2f0b1546.png)

## Register Risk

Tất cả các rủi ro phải được ghi lại, ghi lại và ghi nhận bởi các nhà quản lý dự án, các bên liên quan và thành viên dự án. Sổ đăng ký rủi ro phải được truy cập tự do cho tất cả các thành viên của nhóm dự án.

Có một số hữu ích để đăng ký rủi ro như Redmine , MITER ... vv

Monitor và Control Risk
Rủi ro có thể được theo dõi liên tục để kiểm tra nếu có bất kỳ thay đổi nào được thực hiện. Rủi ro mới có thể được xác định thông qua các cơ chế giám sát và đánh giá liên tục.

Nguồn: https://www.guru99.com/how-precaution-becomes-cure-risk-analysis-and-solutions-in-test-management.html