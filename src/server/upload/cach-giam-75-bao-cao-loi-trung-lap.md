Cả software Developers and Testers đều cần có thể xác định rõ ràng bất kỳ bug nào thông qua title của bug report. Tuy nhiên hiện vẫn còn các team test tự do tạo ra tiêu đề cho các bug mà không thông qua 1 template nhất định nào cả. Dẫn đến việc các tester trong cùng một team đang log bug theo từng cách riêng biệt và không biết khi nào bug đã được log. Một số team thậm chí còn không sử dụng một số công cụ theo dõi bug như JIRA, Bugzilla, Fogbugz ... Trong trường hợp này, tester đôi khi phải log bug thông qua bảng tính excel hoặc google doc. Dẫn đến việc gây khó khăn cho tester khi theo dõi bug. Không biết dev đã fix xong chưa? Bug đã được test confirm chưa?

Trong trường hợp này, việc đặt tên bug ngẫu nhiên có thể dẫn đến hiệu quả thấp hơn. Tuy nhiên, chúng ta có thể tăng hiệu quả và tổ chức thông qua cấu trúc tốt, đặt title bug độc đáo. Hãy cùng tôi kiểm tra tại sao việc đặt title bug lại quan trọng như vậy nhé.

![](https://images.viblo.asia/384afdaa-05a4-4b1d-b700-c4e5e1304390.png)

*Có bốn yếu tố riêng biệt để viết Bug title:*

1. Đặt tên theo một công thức
2. Ngôn ngữ báo cáo
3. Kết hợp tiêu đề bug
4. Từ vựng
Hai yếu tố đầu tiên thường được xem xét tốt và được quản lý hiệu quả cho hầu hết các dự án. Mục số 3 và 4 là nơi mọi thứ có thể được cải thiện đáng kể cho nhiều dự án. Vì vậy, hãy thực hiện theo thứ tự, để đạt được những kết quả khả quan hơn.

**Số 1: Đặt tên theo một công thức:**

Nên đặt ra 1 template cụ thể để áp dụng cho cả team. Ví dụ: nhiều công ty yêu cầu tester của họ báo cáo bằng cách sử dụng công thức như:

501 – iOS 9 – Menu Top – Function – Home button does not work.

502 – iOS 9 – Function – Menu Bottom – Contact button does not work.

503 – Function – Menu Bottom – Contact button does not work. – iOS 9

Những ví dụ trên có thể cho cả dev và test team những điều cần về các bugs đó. Và khi dev search với các từ khóa như:  'Menu’ and ‘Button’ thì sẽ tìm được tất cả các bug liên quan đến nó.

**Số 2: Ngôn ngữ báo cáo:**

Hiện nay đa phần khách hàng là người nước ngoài và để thuận lợi trong giao tiếp chung thì Tiếng Anh luôn là sự lựa chọn hàng đầu. Và với tester cũng vậy, cần sử dụng chung 1 ngôn ngữ khi report bug. Đa số đối với nhiều dự án, ngôn ngữ báo cáo được lựa chọn là Tiếng Anh.


**Số 3: Kết hợp tiêu đề bug:**

Thông thường, một bug có thể yêu cầu một tiêu đề kết hợp, như khi vấn đề liên quan đến nhiều hơn một nút hoặc công cụ đơn giản, ví dụ:

504 – Function – Hotel Booking Page – Calendar / Date Picker fails to hide after entry. – iOS 9

Trong trường hợp này, vấn đề xảy ra với ‘Calendar’ nhưng cụ thể hơn là với chức năng ‘Date Picker’ của 'Calendar'.

Vấn đề này có thể được báo cáo là:

a) Lịch không thể ẩn sau khi nhập; 
hoặc là
b) Bộ chọn ngày không thể ẩn sau khi nhập.
Cả hai dường như đều đúng, nhưng chỉ nên sử dụng tiêu đề kết hợp (nghĩa là Tiêu đề lỗi # 504 ở trên) để đảm bảo tìm thấy nó khi search với: ‘Calendar’ or ‘Date Picker’.

**Số 4: Từ vựng:**

Thông thường có nhiều tester từ nhiều quốc gia, với nhiều bài viết bằng tiếng Anh là ngôn ngữ thứ hai (tức là tiếng Anh), dẫn đến sự đa dạng từ vựng cực kỳ được sử dụng. Sự đa dạng này dẫn đến các cách tiếp cận hoàn toàn khác nhau để đặt tên Các tiêu đề lỗi, nhanh chóng tăng rủi ro về việc các bug title kém chất lượng. Hướng giải quyết là tạo một file quản lý các từ vựng chuyên dùng cho dự án nó sẽ được tạo từ khi start dự án và sẽ được chỉnh sửa, cập nhập thường xuyên bởi các thành viên trong team test. Chúng ta có thể tạo file này trong google sheet, docs....

Sau đây là 1 ví dụ thực tiễn của mình về 1 bug title được kết hợp cả 4 yếu tố trên:
Lấy ví dụ mình đang 1 dự án trên Mobile và có quy định về format bug title như sau:

**[Tên hệ điều hành] [ID màn hình] [Tên màn hình] nội dung của bug**

Trong đó:

[Tên hệ điều hành]: iOS; Android.

[ID màn hình]: Tên màn hình được quy định trong specs: SP001, SP002....

[Tên màn hình]: Login screen; Register screen;...

Nội dung của bug: tùy theo từng loại bug mà sẽ có nội dung tương ứng.

Lấy ví dụ trên thì ta có thể viết 1 bug title như:

- [iOS9] [SP002] [Booking webview screen] - Buttons Back/Next/Reload still active when current page is first/last/loading page

Về cả phía dev và tester khác khi đọc qua cũng xác định nhanh nội dung của bug đó là:

Ở màn hình webview Booking trên thiết bị iOS9 bị:

- Nút Back vẫn hoạt động mặc dù đang ở trang đầu tiên

- Nút Next vẫn hoạt động mặc dù đã ở trang cuối

- Nút Reload vẫn hoạt động mặc dù trang đang được loading.

**Kết luận:**

Lỗi trùng bug (duplicate bug) là một vấn đề khó khăn không chỉ đối với team QA. Các bug bị trùng xảy ra thường xuyên làm cho việc phát triển (code) của dự án/app bị chậm trễ và làm các báo cáo trở nên lộn xộn.

Việc report bugs là một việc có thể nói luôn đồng hành với tester, nhưng việc tránh rủi ro khi report bug bị duplicate là điều rất quan trọng. Để giảm thiểu điều đó thì việc thực hiện đặt tên bug theo 1 format nhất định, thống nhất với cả team vừa đơn giản nhanh chóng những cũng không kém phần quan trọng cho mỗi tester, giảm thiểu thời gian tìm kiếm. Bên cạnh đó cũng làm cho bạn chuyên nghiệp hơn, đồng nhất hơn với cả team và dự án.

Bài viết được dịch thuật từ: https://www.logigear.com/magazine/test-methods-and-metrics/how-to-reduce-duplicate-bug-reporting-by-75-percent/