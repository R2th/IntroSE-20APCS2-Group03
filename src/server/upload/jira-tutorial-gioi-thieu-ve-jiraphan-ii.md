### 2.Các vẫn đề được xử lý thế nào trong JIRA?

![](https://images.viblo.asia/9fb1cbdc-05e4-4e84-8d1b-167249af68e5.jpg)

Tiếp nối loạt bài giới thiệu về JIRA, trong phần này chúng tôi sẽ giới thiệu về Issues, các vấn đề liên quan đến Issues.
Trước tiên để hiểu được nội dung bài này, các bạn cần tìm hiểu 1 Issue là gì??

 1 Issue là bất kể điều gì được bạn theo dõi và hoàn thành nó.Có thể là Task/công việc, có thể là Feature/tính năng, có   thể là Bug/lỗi, Requirement, Spec, CR ..vv.Đặc biệt với QA thì issue thường thấy nhất là Bug/lỗi.
 Bây giờ chúng ta sẽ bắt tay vào việc tạo 1 issue đầu tiên trên công cụ JIRA.

**Creating a JIRA Issue/Tạo mới một issue**

Giả sử hãy tạo 1 dự án có tên là 'Test for STH', với các thành phần là Module1, Module2, 2 versions là version 1 và version2

Trên menu bar của JIRA , chọn 'Create issue', giao diện tạo mới issue hiển thị:

![](https://images.viblo.asia/148937f9-d667-48b3-a02f-ae5d7351d081.jpg)

Phía trên là form tạo mới 1 issue, chúng ta cần quan tâm đến những field quan trọng sau:

**Project**: Mọi vấn đề đều thuộc về một dự án. Bạn có thể chọn tương tự bằng cách nhấp vào menu thả xuống và chọn dự án mà bạn muốn vấn đề này thuộc về.

![](https://images.viblo.asia/92afbb7c-ce3b-451e-8425-d85ea7098e61.jpg)

**Issue Type**: Trường này hiển thị tất cả các loại issues mà đã được tạo và tracking bởi JIRA, List issues trong trường này sẽ được tạo bởi admin

![](https://images.viblo.asia/08bc98b3-e446-4bb7-9878-bf590235c1d6.jpg)

Item 'New Feauture' là tính năng mới , Task là công việc phải làm,Bug là lỗi ,Improvement là cải tiến, Epic là 1 nhóm story, Story là yêu cầu bắt buộc của 1 dự án Agile kể từ khi bắt đầu đến khi kết thúc.Ở đây tôi sẽ chọn loại issue là 'Bug' và tiếp tục

**Summary:**
Tóm tắt nội dung/khía cạnh quan trọng của bug.Trường này khi bạn mô tả đúng thì sẽ phản ánh được nhiều khía cạnh của bug, user đọc sẽ hiểu rất nhanh vấn đề.Ví dụ: Button 'Sign up' not Working !

**An example** 
Ví dụ về tiêu đề / tóm tắt xấu là “Button 'Sign up' hoạt động sai”. Khi tôi đọc điều này, phản ứng ban đầu của tôi sẽ là - “Được rồi, nó hoạt động sai - nhưng vấn đề ở đây là gì? có phải nó không đăng ký được ở tất cả mọi trường hợp? Nó hoạt động sai như thế nào? Khi nào?

Mặc dù,  khi tôi mở lỗi này và nhìn vào chi tiết, tôi chắc chắn tôi sẽ tìm thấy câu trả lời cho câu hỏi này.

Tuy nhiên, sự nhấn mạnh ở đây là sử dụng trường “Tóm tắt” này theo cách hiệu quả nhất. Do đó, tóm tắt / tiêu đề rất thích hợp sẽ là “Giá trị trường Password và Email bị reset khi click vào button Sign up”.Hãy nhớ tiêu đề nên tuân theo quy tắc: Cái gì lỗi? lỗi khi nào??

Trong không gian hạn chế mà trường này cung cấp cố gắng viết tiêu đề của bạn theo cách truyền đạt vấn đề chính xác mà không có bất kỳ sự mơ hồ nào.

**Priority**/Mức độ của vấn đề

Trường này có thể có một trong các giá trị sau.

![](https://images.viblo.asia/26c65fb1-f085-4e5b-b52f-ea2b64c0610d.jpg)

*  Blocker: Ngay lập tức
*  Critical: Nguy hiểm
*  Major: Cao
*  Minor: Bingh thường
*  Trival: Thấp

**Component:** Đây là mục hiển thị danh sách các thành phần của dự án.Như tôi đã đề cập phía trên thì list này sẽ hiển thị 2 thành phần: Module1 và Module2

**Affected Version and Fix version**:

Hai trường này sẽ hiển thị các phiên bản có sẵn cho dự án. Nó không phải là cần thiết mà một vấn đề nhất định mà bạn gặp phải trong một phiên bản nhất định được cố định . Trong các trường hợp như vậy, bạn có thể chọn phiên bản bị ảnh hưởng như phiên bản hiện tại và phiên bản đã sửa chữa làm phiên bản tiếp theo.

Ngoài ra, các trường này có thể lấy nhiều giá trị. Bạn có thể chọn đặt một vấn đề nhất định ảnh hưởng đến cả phiên bản 1 và phiên bản 2 như sau:

![](https://images.viblo.asia/9992625d-08c8-478f-aa30-4e5f2bcfe960.jpg)

**Assignee**: Bạn có thể bàn giao vấn đề này cho 1 người để hoàn thành haowcj có thể cho chính bạn.

![](https://images.viblo.asia/8d27983b-4e70-4827-b908-d87a7dc8d253.jpg)

**Description**: Đây là trường văn bản tùy chọn hỗ trợ bạn nhập nhiều thông tin tùy theo vấn đề của bạn. Trong trường hợp có lỗi, việc sử dụng trường này là điển hình để cung cấp thông tin chi tiết về các bước để tạo lại lỗi.
Nó là vô cùng quan trọng để cung cấp cho tất cả các thông tin.

"Váo trang console và edit content cho hết hạn nhưng Product vẫn còn hạn , sau đó đọc viewer và check hiển thị". Đây là ví dụ về mô tả lỗi nhưng nó là bad.Một số mô tả không đầy đủ 

Ví dụ về mô tả không đủ là:

1) Vado console
2) Edit Product sang Free 
3) Vào viewer
4) Check hiển thị

Các mô tả ở trên mặc dù chính xác, nó không phải là hoàn chỉnh. Khi nói đến trường này, là về phía cung cấp quá nhiều thông tin nhưng không quá ít.

Nếu các bước sau được thêm vào mô tả, thì điều này sẽ có ý nghĩa hơn.

5) Đến trang quảng cáo
6) Check menu hiển thị

Vì vậy, để lặp lại, hãy cung cấp các bước chính xác, dữ liệu chính xác và bất kỳ thông tin nào khác mà bạn cho rằng cần thiết để hoàn thành trường này.

**Attachment:**

Bất kỳ tài liệu hỗ trợ nào có thể được tải lên với một vấn đề.

Tài liệu này có thể là ảnh/video bằng chứng bug hoặc có thể là tài liệu spec dự án, ..vv

Khi tất cả đã sẵn sàng để tạo vấn đề , bạn có thể click vào Button 'Create a issue' :

![](https://images.viblo.asia/98cf5cf1-5078-4653-bef8-d8925c52058b.jpg)

Sau khi issue đươc tạo , ID issue sẽ bao gồm khóa của dự án 'TFS-3', nếu bạn muốn xem lại issue đó, thì click vào link liên kết phía trên.

**Additional Details About the Create Issue Page**

1) Sẽ có tùy chọn cấu hình trường được tìm thấy ở góc trên cùng bên phải của trang "Tạo issue".

![](https://images.viblo.asia/9910ac13-d8ab-4a22-ad89-1c408d121581.jpg)

Tùy chọn này có thể được sử dụng để chọn / thay đổi các trường mà bạn muốn xem trong hộp thoại tạo vấn đề của bạn. Sau khi lựa chọn được thực hiện, JIRA cũng sẽ nhớ những thay đổi cho các vấn đề tiếp theo của bạn.

2) Ở cuối trang "Tạo vấn đề", có một "tạo một vấn đề khác"

![](https://images.viblo.asia/b778957a-c936-4e42-9789-9d3941593dc2.jpg)

Khi bạn chọn tùy chọn này và nhấp vào "Tạo" - một lần, vấn đề hiện tại được tạo ra; JIRA giữ
Hộp thoại “Tạo vấn đề” mở với Dự án, Loại sự cố và các trường khác ngoại trừ tự động tóm tắt được chọn theo các vấn đề đã tạo trước đó.

Hẹn gặp các bạn ở bài viết tiếp theo!