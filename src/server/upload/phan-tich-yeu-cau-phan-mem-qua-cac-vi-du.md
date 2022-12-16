## Các khái niệm chung

 Một yêu cầu là một đặc trưng của hệ thống, mô tả những việc mà hệ thống có khả năng thực hiện để hoàn thành mục tiêu nhất định
 
 Yêu cầu cho 1 phần mềm cụ thể là tổng hợp những yêu cầu về tổ chức, mức độ chuyên môn và mức độ tham gia, tương tác với phần mềm trong môi trường hoạt động của nó.
 
Có thể kiểm chứng một cách riêng rẽ ở mức chức năng(yêu cầu chức năng) hoặc mức hệ thống (yêu cầu phi chức năng)
+ ở mức độ chức năng nó cung cấp dịch vụ cụ thể cho người dùng.
+ ở mức độ phi chức năng, nó định nghĩa các tính chất và ràng buộc của hệ thống: phương pháp thiết kế,  ngôn ngữ lập trình, công cụ sử dụng, thời gian trả lời,  độ tin cậy, yêu cầu về lưu trữ dữ liệu...
 
Vì vậy, về cơ bản yêu cầu phần mềm bao gồm các yêu cầu chức năng và yêu cầu phi chức năng cần phải được thực hiện trong hệ thống.

*Trong bài viết này chúng ta sẽ tìm hiểu các đầu mục sau :*

1, Phân loại yêu cầu

2,  Các nguồn yêu cầu khác

3, Cách phân tích yêu cầu phần mềm thông qua các đầu mục dưới đây bằng ví dụ cụ thể khi xây dựng hệ thống phần mềm giáo dục cho một trường học: 

+ Tính nguyên tử

+ Tính duy nhất

+ Tính hoàn thành

+ Nhất quán và rõ ràng

+ Tính nguồn gốc

+ Độ ưu tiên

+ Kiểm chứng

3, Phần kết luận

### 1. Phân loại yêu cầu

1.1: **Yêu cầu nghiệp vụ**: 
- Đây là loại yêu cầu cao được lấy từ các môi trường kinh doanh cụ thể áp dụng vào dự án phần mềm

Ví dụ:
Một hệ thống dịch vụ ngân hàng trực tuyến cung cấp dịch vụ ngân hàng cho các tài khoản.
Yêu cầu nghiệp vụ kinh doanh được quyết định cho người dùng A là tóm lược tài khoản và chuyển tiền. Trong khi đối với  người dùng B  yêu cầu kinh doanh là tóm lược tài khoản và thanh toán hóa đơn.


| Tên quốc gia | Dịch vụ ngân hàng cung cấp| 
| -------- | -------- | -------- |
| người dùng A    | Tóm tắt tài khoản và chuyển tiền     | 
| người dùng B     | Tóm tắt tài khoản và thanh toán hóa đơn tiền điện     | 
![](https://images.viblo.asia/77968a1e-fbb6-4d07-bfdf-1593e46560be.jpg)

2.2 **Yêu cầu về kiến trúc và thiết kế**: 
- Những yêu cầu này chi tiết hơn các yêu cầu kinh doanh. Nó định nghĩa việc thiết kế tổng thể các yêu cầu cần thực hiện từ các yêu cầu kinh doanh.

Ví dụ: Với một trang web dịch vụ ngân hàng, các trường hợp sử dụng thiết kế và kiến trúc sẽ bao gồm:
đăng nhập, chi tiết các hóa đơn, thanh toán hóa đơn vv. Yêu cầu cụ thể sẽ được trình bày dưới đây:

![](https://images.viblo.asia/68c08aa1-971b-4a15-877d-f23f3de62cc4.jpg)
| Trường hợp sử dụng  | Yêu cầu | 
| -------- | -------- | -------- |
| Thanh toán hóa đơn   | Mô tả cách khách hàng có thể đăng nhập vào tài khoản ngân hàng trực tuyến và sử dụng chức năng thanh toán hóa đơn.|
| Thanh toán hóa đơn   | Khách hàng sẽ có thể thấy bảng điều khiển các hóa đơn chưa thanh toán của các hóa đơn đã được đăng ký thanh toán trực tuyến.
| Thanh toán hóa đơn   | Khách hàng có thể thêm, sửa đổi và xóa chi tiết hóa đơn. |
| Thanh toán hóa đơn   | Khách hàng có thể cài đặt SMS, cảnh báo qua email cho các hành động thanh toán khác nhau.|
| Thanh toán hóa đơn   | Khách hàng có thể thấy lịch sử của các hóa đơn đã thanh toán trong quá khứ.|
| Thanh toán hóa đơn   | Đối tượng sử dụng của trường hợp này là khách hàng của ngân hàng hoặc nhân viên hỗ trợ. |

2.3 **Yêu cầu hệ thống và tích hợp**: 

Ở mức thấp nhất, chúng tôi có yêu cầu về hệ thống và tích hợp . Nó là mô tả chi tiết của tất cả các yêu cầu. Nó có thể được mô tả bằng ngôn ngữ kinh doanh hàng ngày của người sử dụng. Tuy nhiên cần có càng nhiều chi tiết càng tốt để các nhà phát triển có thể bắt đầu viết chương trình.

Dưới đây là ví dụ về mô-đun thanh toán hóa đơn, yêu cầu được đề cập là: thêm một người dùng thiết lập hóa đơn



| Trường hợp sử dụng  | Yêu cầu | 
| -------- | -------- | -------- |
| Thêm mới người tạo hóa đơn   |Tên người tạo hóa đơn|
|    |mối quan hệ:  khách hàng|
|   |Thanh toán tự động - Có / Không|
|  |Thanh toán toàn bộ hóa đơn - Có / Không|
|    |Giới hạn thanh toán tự động - Không thanh toán nếu hóa đơn vượt quá số tiền được chỉ định |
![](https://images.viblo.asia/f5fbeded-3656-490b-8179-aa84683e50db.jpg)

### 2. Các nguồn yêu cầu khác
Đôi khi  một số dự án bạn có thể không nhận được bất kỳ yêu cầu nào từ khách hàng cũng không có tài liệu để làm việc. Tuy nhiên sẽ luôn có các nguồn khách mà bạn có thể dựa vào để tìm kiếm thông tin và xem xét áp dụng cho việc thiết kế phầm mềm của bạn. Cụ thể:

- Chuyển giao kiến thức từ các đồng nghiệp hoặc nhân viên đã làm việc trong dự án đó
- Nói chuyện về dự án để phân tích thông tin kinh doanh, quản lý sản phẩm,quản lý dự án và các nhà phát triển
- Phân tích phiên bản phần mềm trước đó đã được triển khai vào hệ thống
- Phân tích các yêu cầu tài liệu cũ của dự án
- Nhìn vào các báo cáo lỗi trong quá khứ, một số báo cáo lỗi được chuyển thành yêu cầu bổ sung có thể được triển khai vào phiên bản hiện tại mà bạn sẽ làm
- Xem hướng dẫn cài đặt nếu có để xem yêu cầu cài đặt là gì
- Phân tích kiến thức nghiệp vụ hoặc kiến thức chuyên ngành mà nhóm đang cố gắng triển khai

Bất cứ nguồn yêu cầu nào bạn nhận được bằng bất cứ hình thức nào để xây dựng thành tài liệu hãy nhờ các thành viên có kinh nghiệm và kiến thức trong đôị dự án kiểm tra lại cho bạn để đảm bảo thông tin bạn nhận được là đúng đắn.

### 3,  Cách phân tích yêu cầu

Để nghiên cứu làm thế nào để phân tích các yêu cầu đảm bảo chất lượng theo mong muốn của khách hàng. Chúng ta có thể căn cứ vào các tính chất cơ bản sau của yêu cầu: 
+ Tính nguyên tử
+ Tính xác định duy nhất
+ Tính hoàn thành
+ Tính nhất quán và rõ ràng  
+ Có thể theo dõi được
+ Ưu tiên
+ Có thể kiểm tra được

Ví dụ về một hệ thống phần mềm giáo dục, nơi một học sinh có thể đăng ký các khóa học khác nhau.
Bảng dưới đây có 3 cột tương ứng với các nội dung sau:
Cột đầu tiên chỉ ra "Các yếu tố đánh giá chất lượng của việc phân tích yêu cầu"
Cột thứ hai chỉ ra "Xác định yêu cầu chưa tốt"
Cột thứ ba chỉ ra: "Xác định yêu cầu tốt".


| Các yếu tố đánh giá chất lượng của việc phân tích yêu cầu | Xác định yêu cầu chưa tốt | Xác định yêu cầu tốt |
| -------- | -------- | -------- |
| Tính nguyên tử   |Sinh viên sẽ có thể ghi danh vào các khóa học đại học và sau đại học  | 1, Sinh viên sẽ có thể ghi danh vào các khóa học đại học  | 
| Tính nguyên tử    | |  2, Sinh viên sẽ có thể ghi danh vào các khóa sau đại học     | 
| Tính xác định duy nhất   |1- Học sinh sẽ có thể ghi danh vào các khóa học đại học 1- Học sinh sẽ có thể ghi danh vào các khóa sau đại học | 1-Đăng ký khóa học
| Tính xác định duy nhất | | 1.1-Sinh viên sẽ có thể ghi danh vào các khóa học đại học
| Tính xác định duy nhất  | | 1.2-Sinh viên sẽ có thể ghi danh vào các khóa sau đại học | 
| Tính hoàn thành | Người dùng với role giáo sư sẽ đăng nhập vào hệ thống bằng cách cung cấp tên người dùng, mật khẩu và thông tin liên quan khác của mình|  Người dùng với role giáo sư sẽ đăng nhập vào hệ thống bằng cách cung cấp tên người dùng, mật khẩu và mã bộ phận của mình    | 
| Tính nhất quán và rõ ràng    | Một sinh viên sẽ được chọn các khóa học đại học hoặc các khóa học sau đại học nhưng không được chọn cả hai. Một số khóa học sẽ được mở cho cả sinh viên chưa tốt nghiệp và sau đại học    |  Một sinh viên sẽ được chọn các khóa học đại học hoặc các khóa học sau đại học nhưng không được chọn cả hai.   |
| lưu trữ thông tin | Duy trì thông tin sinh viên được ánh xạ tới BRQ req.ID?   |  Duy trì thông tin sinh viên-Ánh xạ tới BRQ req ID 4.1   |
| Độ ưu tiên |  sinh viên đã đăng ký : độ ưu tiên 1,  Duy trì thông tin người dùng-độ ưu tiên 1, Đăng ký khóa học - độ ưu tiên 1,  Xem thẻ báo cáo : độ ưu tiên 1,  |  đăng ký sinh viên : độ ưu tiên 1,  Duy trì thông tin người dùng-độ ưu tiên 2, Đăng ký khóa học - độ ưu tiên 1,  Xem thẻ báo cáo : độ ưu tiên 3   |
| khả năng kiểm thử | Mỗi trang của hệ thống sẽ tải trong khung thời gian có thể chấp nhận được  |  Các trang đăng ký sinh viên và đăng ký khóa học sẽ tải trong vòng 5 giây  |

Tiếp theo chúng ta sẽ tiến hành phân tích từng tính chất trên để hiểu rõ hơn về cách phân tích yêu cầu! 

**3.1 Tính nguyên tử**
- Mỗi một yêu cầu phải là nguyên tử, có nghĩa là nó phải ở mức độ thấp nhất, chi tiết nhất và duy nhất. Sau nó không thể tách thành các thành phần khác được nữa. 

Với ví dụ xây dựng phần mềm cho lĩnh vực giáo dục trong bảng dưới đây: 
| Các yếu tố đánh giá chất lượng của việc phân tích yêu cầu | Xác định yêu cầu chưa tốt | Xác định yêu cầu tốt |
| -------- | -------- | -------- |
| Tính nguyên tử   |Sinh viên sẽ có thể ghi danh vào các khóa học đại học và sau đại học  | 1, Sinh viên sẽ có thể ghi danh vào các khóa học đại học  | 
| Tính nguyên tử    | |  2, Sinh viên sẽ có thể ghi danh vào các khóa sau đại học     | 

Chúng ta có thể phân tích một chút như sau:

Yêu cầu chưa tốt là:
> Sinh viên sẽ có thể ghi danh vào các khóa học đại học và sau đại học. 
Vì nó chưa phải là mức độ thấp nhất. Nó hoàn toàn có thể tách ra thành:
+ Sinh viên sẽ có thể ghi danh vào các khóa học đại học
+ Sinh viên sẽ có thể ghi danh vào các khóa học sau đại học

Yêu cầu tốt là:
>1, Sinh viên sẽ có thể ghi danh vào các khóa học đại học
>
>2, Sinh viên sẽ có thể ghi danh vào các khóa học sau đại học

Với yêu cầu được xác định thành 2 trường như trên đã thỏa mãn tính chi tiết nhất và tính duy nhất của yêu cầu. Do đó, hoàn toàn có thể căn cứ vào chúng để thực hiện xây dựng hệ thống.

**3.2 Tính duy nhất**


- Chất lượng yêu cầu tiếp theo được đề cập đến là tính duy nhất của yêu cầu.

Trong ví dụ dưới đây:
+ Phần xác định yêu cầu chưa tốt: chúng ta có hai yêu cầu riêng biệt nhưng cả hai đều có cùng một ID # 1.
Việc này sẽ gây nhầm lẫn khi thực hiện khi không rõ yêu cầu chính xác của hệ thống. 
+ Phần xác định yêu cầu tốt: đã thực hiện chia xử lý Đăng ký khóa học thành ra thành 2 yêu cầu cụ thể và duy nhất giúp đội dự án khi viết chương trình và kiểm thử chương trình không bị lack xử lý.

| Các yếu tố đánh giá chất lượng của việc phân tích yêu cầu | Xác định yêu cầu chưa tốt | Xác định yêu cầu tốt |
| -------- | -------- | -------- |
| Tính xác định duy nhất   |1- Học sinh sẽ có thể ghi danh vào các khóa học đại học 1- Học sinh sẽ có thể ghi danh vào các khóa sau đại học | 1-Đăng ký khóa học
| Tính xác định duy nhất | | 1.1-Sinh viên sẽ có thể ghi danh vào các khóa học đại học
| Tính xác định duy nhất  | | 1.2-Sinh viên sẽ có thể ghi danh vào các khóa sau đại học | 


**3.3 Tính hoàn thành**
- Mỗi yêu cầu cần phải được hoàn thành. Tính hoàn thành giúp lập trình viên có thông tin đầy đủ để thực hiện viết hệ thống. Việc đưa ra đích hoàn thành cho các yêu cầu nhất định là tiêu chuẩn đầu vào đảm bảo chương trình chạy đúng với mong muốn của khách hàng. 

  Trong ví dụ dưới , khi xác định yêu cầu không tốt thì các thông tin nhận được  không rõ ràng ở chỗ:
>    và thông tin liên quan khác của mình

  Điều này gây khó khăn khi tiến hành thực hiện hệ thống.
  Do đó, với việc xác định rõ yêu cầu một cách rõ ràng các điều kiện cụ thể cần dùng:
  > cung cấp tên người dùng, mật khẩu và mã bộ phận 
  > 
  sẽ giúp hoàn thành được phần xử lý cho yêu cầu đưa ra.

| Các yếu tố đánh giá chất lượng của việc phân tích yêu cầu | Xác định yêu cầu chưa tốt | Xác định yêu cầu tốt |
| -------- | -------- | -------- |
| Tính hoàn thành | Người dùng với role giáo sư sẽ đăng nhập vào hệ thống bằng cách cung cấp tên người dùng, mật khẩu và thông tin liên quan khác của mình|  Người dùng với role giáo sư sẽ đăng nhập vào hệ thống bằng cách cung cấp tên người dùng, mật khẩu và mã bộ phận của mình    | 
**3.4 Tính nhất quán và rõ ràng**
- Tiếp theo mỗi yêu cầu phải nhất quán và rõ ràng. việc này giúp tránh được xung đột khi tiến hành xây dựng sản phẩm.
- Trong ví dụ dưới, việc xác đinh yêu cầu chưa tốt lấy ra 2 yêu cầu "Một sinh viên sẽ được chọn các khóa học đại học hoặc các khóa học sau đại học nhưng không được chọn cả hai. " và yêu cầu khác là "Một số khóa học sẽ được mở cho cả sinh viên chưa tốt nghiệp và sau đại học  "

 Với vế đầu tiên đại ý sẽ phân loại các khóa học thành 2 loại: Đại học và sau đại học. và sinh viên chỉ có thể chọn 1 trong 2.
 Tuy nhiên vế thứ 2 lại bị xung đột với vế đầu khi đưa ra yêu cầu sẽ tạo các khóa học chung cho cả 2 hệ đại học và sau đại học.


Vì vậy,  yêu cầu này cần được chuyển thành yêu cầu tốt là "Một sinh viên sẽ có các khóa học sau đại học hoặc sau đại học nhưng không phải cả hai". Điều đó có nghĩa là mỗi khóa học sẽ được phân loại cụ thể thành khóa học dành cho hệ đại học hoặc khóa học dành cho hệ sau đại học mà thôi.

| Các yếu tố đánh giá chất lượng của việc phân tích yêu cầu | Xác định yêu cầu chưa tốt | Xác định yêu cầu tốt |
| -------- | -------- | -------- |
| Tính nhất quán và rõ ràng    | Một sinh viên sẽ được chọn các khóa học đại học hoặc các khóa học sau đại học nhưng không được chọn cả hai. Một số khóa học sẽ được mở cho cả sinh viên chưa tốt nghiệp và sau đại học    |  Một sinh viên sẽ được chọn các khóa học đại học hoặc các khóa học sau đại học nhưng không được chọn cả hai.   |

**3.5 Tính nguồn gốc**

| Các yếu tố đánh giá chất lượng của việc phân tích yêu cầu | Xác định yêu cầu chưa tốt | Xác định yêu cầu tốt |
| -------- | -------- | -------- |
| tính nguồn gốc | Bảo trì thông tin sinh viên được liên hệ tới ID?   |  Bảo trì thông tin sinh viên liên hệ tới  ID 4.1   |

Mỗi và mọi yêu cầu phải có nguồn gốc rõ ràng vì đã có các mức yêu cầu khác nhau, ở trên cùng chúng ta có các yêu cầu nghiệp vụ,  các yêu cầu về kiến trúc hệ thống và thiết kế theo yêu cầu tích hợp hệ thống.

Khi tiến hành chuyển đổi yêu cầu nghiệp vụ thành các yêu cầu kiến trúc và thiết kế hoặc chuyển đổi các yêu cầu kiến trúc và thiết kế thành các yêu cầu tích hợp hệ thống thì phải có truy xuất nguồn gốc thông tin.

Điều này có nghĩa là chúng ta có thể thực hiện từng yêu cầu nghiệp vụ và lập bản đồ quan hệ cho một hoặc nhiều yêu cầu về thiết kế và kiến trúc phần mềm tương ứng.
Trong ví dụ ,  yêu cầu chưa tốt có nội dung "Bảo trì thông tin sinh viên được liên hệ tới ID? " id của yêu cầu không được cung cấp ở đây.

Vì vậy, chuyển đổi nó thành một yêu cầu tốt là chỉ rõ ID được ánh xạ là ID 4.1. Giúp cho việc thực hiện bảo trì thông tin rõ ràng và đúng đắn hơn.
Vì vậy, việc đưa ra bản đồ quan hệ truy xuất nguồn gốc thông tin giữa các yêu cầu nên được thiết lập trên toàn bộ dự án.

**3.6 Độ ưu tiên**

- Việc thực hiện các yêu cầu trong hệ thống cần phải được xét độ ưu tiên để biết cần làm cái gì trước cái gì sau. Cần có cái gì rồi mới xây dựng được cái còn lại. Xét độ ư tiên hợp lý giúp việc xây dựng hệ thống tiết kiêm được thời gian và hiệu quả hơn. Việc này cũng tùy thuộc vào từng dự án mà thứ tự các yêu cầu cũng được sắp xếp khác nhau.

Trong ví dụ dưới: yêu cầu chưa tốt đang để tất cả các yêu cầu có chung độ ưu tiên cao nhất. Tuy nhiên việc này là không thể được.
Chúng ta cần phải đăng ký được thông tin sinh viên và đăng ký khóa học với độ ưu tiên thực hiện cao nhất rồi mới có thể duy trì thông tin ở mức độ ưu tiên thứ 2 và xem thẻ báo cáo của các dữ liệu đã đăng ký là mức độ ưu tiên thấp nhất.

| Các yếu tố đánh giá chất lượng của việc phân tích yêu cầu | Xác định yêu cầu chưa tốt | Xác định yêu cầu tốt |
| -------- | -------- | -------- |
| Độ ưu tiên |  sinh viên đăng ký : độ ưu tiên 1,  Duy trì thông tin người dùng-độ ưu tiên 1, Đăng ký khóa học - độ ưu tiên 1,  Xem thẻ báo cáo : độ ưu tiên 1,  |  đăng ký sinh viên : độ ưu tiên 1,  Duy trì thông tin người dùng-độ ưu tiên 2, Đăng ký khóa học - độ ưu tiên 1,  Xem thẻ báo cáo : độ ưu tiên 3   |

**3.7 Tính kiểm thử **

| Các yếu tố đánh giá chất lượng của việc phân tích yêu cầu | Xác định yêu cầu chưa tốt | Xác định yêu cầu tốt |
| -------- | -------- | -------- |
| khả năng kiểm thử | Mỗi trang của hệ thống sẽ tải trong khung thời gian có thể chấp nhận được  |  Các trang đăng ký sinh viên và đăng ký khóa học sẽ tải trong vòng 5 giây  |

- Mọi yêu cầu phải được kiểm tra.
- với ví dụ trên: 
>Mỗi trang của hệ thống sẽ tải trong khung thời gian có thể chấp nhận được

Phân tích một chút với yêu cầu này:

+ mỗi trang có nghĩa là có thể có nhiều trang => việc này không xác định được số lượng trang cần kiểm thử => khó khăn cho người kiểm thử xác định thời gian kiểm thử
+ Thời gian tải trang trong khung thời gian chấp nhận được => khung thời gian có thể chấp nhận là gì? Ai sẽ chấp nhận?
=> thông tin không xác thực => không thể kiểm thử theo mong muốn chung chung này được.

Vì vậy,  việc chuyển đổi đối số không thể kiểm tra thành đối số có thể kiểm tra, cụ thể là chỉ ra 2 trang "đăng ký học sinh và đăng ký khóa học" với thời gian tải của mỗi trang 5 giây giúp người kiểm thử có thể tiến hành kiểm thử một cách dễ dàng hơn hết.

### Kết luận
Trên đây là cách chúng ta phải xem xét từng yêu cầu ở cấp độ thích hợp. Ví dụ, nếu xây dựng một phần mềm liên quan đến hệ thống và có các yêu cầu riêng của hệ thống đó, chúng ta phải xem xét các yêu cầu này và tích hợp trong yêu cầu phần mềm.  Hoặc với các yêu cầu được xây dựng từ câu chuyện của người dùng cần áp dụng sao cho đảm bảo được cả yêu cầu về chất lượng. Thông qua việc kiểm tra xem mỗi yêu cầu có phải đã đảm bảo tính nguyên tử, xác định duy nhất, và tính hoàn thành ,vv hay chưa. 

Cuối cùng mục đích của việc phân tích yêu cầu là tạo ra bản đặc tả các yêu cầu phần mềm. Đặc tả cần được xét duyệt để đảm bảo rằng người phát triển và khách hàng có cùng nhận biết về hệ thống cần phát triển. Từ đó sẽ bảo bảo hệ thống được xây dựng lên là sản phẩm đảm bảo được chất lượng và thỏa mãn được khách hàng. 

Tài liệu tham khảo:
https://www.guru99.com/learn-software-requirements-analysis-with-case-study.html