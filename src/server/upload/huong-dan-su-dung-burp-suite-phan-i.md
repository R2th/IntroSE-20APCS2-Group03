Burp Suite là một sự tích hợp các công cụ khác nhau kết hợp với nhau để thực hiện kiểm tra tính bảo mật các ứng dụng Web. Burp Suite giúp người kiểm thử thâm nhập trong toàn bộ quá trình kiểm thử từ việc map phase tới việc xác định các lỗ hổng và khai thác chúng. Loạt hướng dẫn này của Burp Suite sẽ giúp bạn hiểu được framework và sử dụng các tính năng trong các kịch bản khác nhau.


![](https://images.viblo.asia/b8e8c212-ef3c-42e3-836c-87f4ba3ba3aa.PNG)
Hình 1. Burp Suite và bộ công cụ hỗ trợ


Các tính năng khác nhau của Burp Suite được thể hiện trong hình 1. Chúng bao gồm proxy, spider, intruder, repeater, sequencer, decoder và comparer. Ở phần đầu trong hướng dẫn sử dụng Burp Suite này, chúng ta sẽ học cách sử dụng chúng một cách liền mạch.

Proxy Burp: Sử dụng proxy Burp , proxy có thể chặn lưu lượng truy cập giữa trình duyệt và ứng dụng đích. Tùy chọn này hoạt động tương tự với vector tấn công người trung gian. Để minh họa tính năng này, hãy xem ví dụ dưới đây về forrm đăng nhập Wikipedia (dummyuser: dummypassword) như trong Hình 2. Đầu tiên, chuyển chế độ chặn "on" trong suite. Các Forward tùy chọn cho phép bạn gửi các gói tin từ IP nguồn đến IP đích. Các Drop tùy chọn cho phép bạn thả các gói tin nếu bạn cảm thấy nó không cần phân tích.



![](https://images.viblo.asia/9f7b4fa8-129d-4123-ad82-9d8a450b3ba4.PNG)
Hình 2. Form đăng nhập Wikipedia

![](https://images.viblo.asia/cb4adbcb-72ab-4022-a7da-1f4f4d555995.PNG)
Hình 3. Chặn thông tin đăng nhập với proxy Burp



Hình 3 cho thấy các thông tin đăng nhập của en.wikipedia.org bị bắt. Lưu ý rằng Wikipedia sử dụng HTTP thay vì HTTPS, do đó thông tin đăng nhập được ghi lại trong văn bản rõ ràng. Đối với HTTPS, chúng tôi sẽ cần sử dụng các trình rút gọn như sslstrip, như được giải thích trong các bài viết trước.

Proxy Burp ghi lại các chi tiết cookie và các tiêu đề HTTP của trang. Hình 4 và Hình 5 cho thấy thiết lập cần thiết để sử dụng tính năng này.




![](https://images.viblo.asia/b1de95f1-868d-4531-81ae-d33a8aad8198.PNG)
Hình 4. Các tùy chọn để thiết lập trước khi chặn



Trình nghe proxy Burp được bật trên Cổng 8080 của local host. Có nhiều tùy chọn khác nhau để thiết lập chặn, bao gồm các phương thức yêu cầu, các extensions phù hợp và phạm vi URL cho các yêu cầu của khách hàng. Các tùy chọn khác như loại yêu cầu, loại nội dung và phạm vi URL trong các phản hồi của máy chủ có sẵn và có thể được chọn dựa trên kịch bản tấn công.

Bước tiếp theo trong hướng dẫn Burp Suite này là thiết lập trình duyệt trong đó quy trình yêu cầu phản hồi được định tuyến thông qua cổng 8080 trên máy chủ lưu trữ cục bộ.



![](https://images.viblo.asia/d0c04edc-34bf-4b89-bc66-4156d25dded7.PNG)
Hình 5. Thiết lập trình duyệt



Đi tiếp trong hướng dẫn sử dung Burp Suite, một loạt các bước khác nhau có thể được thực hiện từ thời điểm này. Việc ghi lại có thể bị loại bỏ, hoặc gửi đến spider hoặc sequencer hoặc comparer. Có một tùy chọn để thay đổi các phương thức yêu cầu từ GET thành POST, v.v. Công cụ này cũng cho phép sửa đổi các tiêu đề và thực hiện những thứ “thú vị” khác với các gói HTTP đang chuyển tiếp, điều này có thể khá nguy hiểm trong một số trường hợp nhất định.

Sơ đồ trang web Burp và phạm vi trang web
Phần hướng dẫn này của Burp Suite mô tả cách chọn phạm vi kiểm thử bảo mật. Hình 6 cho thấy sơ đồ trang web và phạm vi trang web, hiển thị các phần khác nhau của một domain cụ thể. Một số lượng lớn các tên miền phụ được hiển thị trong www.google.com. Cũng lưu ý rằng các trang được truy cập được hiển thị bằng màu tối.

![](https://images.viblo.asia/ebfbaaa8-1c79-4bbf-8caa-46f4da83a876.PNG)
Hình 6. Sơ đồ trang web, phạm vi trang web và tìm kiếm từ khóa



Ảnh chụp màn hình trong Hình 6 cho thấy tìm kiếm được thực hiện bởi người dùng bằng cách sử dụng công cụ tìm từ khóa. Trong trường hợp này cụm từ tìm kiếm “security” được tô sáng.

Hình 7 cho thấy sơ đồ trang web của Google. Bất kỳ tên miền phụ quan tâm nào cũng có thể được chọn để kiểm tra thêm, dựa trên kịch bản pen-testing. Trong khi  Google đã được sử dụng cho hướng dẫn Burp Suite này, ứng dụng Web đích có thể là bất kỳ ứng dụng nào khác theo yêu cầu để phân tích.

Burp spider: Công cụ spider được sử dụng để nhận danh sách đầy đủ các URL và thông số cho mỗi trang web. Công cụ này xem xét từng trang được truy cập theo cách thủ công và đi qua mọi liên kết mà nó tìm thấy trong phạm vi kiểm tra. Khi sử dụng Burp Spider, hãy đảm bảo rằng proxy và bộ chặn được tắt. Thêm các liên kết bằng tay truy cập tốt hơn, vì nó mang lại cho spider một vùng phủ sóng lớn hơn.

Đối với hướng dẫn Burp Suite của chúng tôi, chúng tôi sẽ thiết lập spider bằng menu Tùy chọn. Quan trọng là xác thực và đếm số thread. Trường xác thực có thể được thiết lập với sự kết hợp tên người dùng và mật khẩu để khi spider đi qua một trang đăng nhập, nó có thể tự động trải qua quá trình xác thực. Hình 8 cho thấy tab Tùy chọn của spider Burp.

![](https://images.viblo.asia/29e44605-d93d-4460-94e4-b7f6ee8709f4.PNG)

Hình 7. Sơ đồ trang web của Google





Số lượng thread là số lượng các thread đồng thời đang được sử dụng. Đối với kiểm thử tại local, số lượng này có thể cao. Số lượng thread cao hơn nghĩa là việc xử lý nhanh hơn, nhưng cũng có tải trọng lớn hơn.


![](https://images.viblo.asia/b0c9a6a5-43b4-4035-b562-1f16b1517809.PNG)
Hình 8. Tab Tùy chọn spider Burp



Sau khi chạy xong, bước tiếp theo trong hướng dẫn Burp Suite này là sử dụng máy quét để thử nghiệm. Các kiểm thử có thể active hoặc passive.Các kiểm thử active gửi dữ liệu và phân tích các khả năng. Kiểm thử passive kiểm tra tất cả lưu lượng truy cập và xác định các lỗ hổng hiện diện trong ứng dụng. Kết quả kiểm thử phải luôn được xác thực vì không có công cụ tự động nào là hoàn hảo. Burp Suite có thể được sử dụng để phát hiện các lỗ hổng SQL và XSS .

Refer: https://www.computerweekly.com/tutorial/Burp-Suite-Guide-Part-I-Basic-tools