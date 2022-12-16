Bài viết tiếp tục giới thiệu các tiện ích của Chrome hỗ trợ cho việc test giao diện, clear cookies, và lấy test evidence mà bạn không thể bỏ qua trong quá trình testing.

**Các tiện ích hỗ trợ kiểm tra cookies của website**

Để đảm bảo hoạt động của một ứng dụng Web đáp ứng được mong đợi và lấy được các dữ liệu và code đúng từ server thì việc quản lý được cookie và cache của trình duyệt là vô vùng quan trọng. Bạn có thể sử dụng các tiện ích sau đây cho việc testing cookie của website vì nó cho phép ta thêm, xóa, sửa cookie và xóa bộ nhớ cache của trình duyệt.

11. Cookie Manager

Cookie Manager là một tiện ích khác của Chrome cho phép bạn sửa cookies ngay trong quá trình test như thêm, xóa, thay đổi, bảo vệ, block và tìm kiếm cookies.

![](https://images.viblo.asia/93532c1d-7ca9-4ba3-b053-8027bf55cb26.jpg)

12. Clear Cache

Nếu bạn gặp rắc rối với việc xóa cache của trình duyệt khi bạn đang thực hiện việc testing thì tiện ích này sẽ cho phép bạn xóa cache ngay từ thanh công cụ mà không cần phải mất thời gian vào phần Settings của Chrome. Bạn có thể tùy chỉnh nó để kiểm soát dữ liệu bạn muốn xóa- app cache, download, file hệ thống, form dữ liệu lịch sử trình duyệt, bộ nhớ cục bộ, mật khẩu,... thông qua việc sử dụng options

![](https://images.viblo.asia/fcb9eaa1-2f69-475a-86b5-04a6bae671f1.jpg)

13. Edit This Cookie

Nếu bạn thực hiện AB testing cho một ứng dụng web hoặc muốn kiểm tra xem một tính năng đặc biệt có thể truy cập vào một phân khúc được xác định của người sử dụng thì đây là một tiện ích có thể giúp bạn tiết kiệm được rất nhiều thời gian.

![](https://images.viblo.asia/5d3c87e3-b750-49db-adc4-6b1d9b4cd883.jpg)

14. Cache Killer

Đây là một plugin hữu dụng dành cho tester, nó cho phép bạn vô hiệu hóa cache trong Chrome một cách dễ dàng chỉ bằng 1 thao tác ON/OFF trên thanh công cụ của trình duyệt. Không giống như Clear Cache, khi được kích hoạt Cache Killer sẽ xóa bộ nhớ cache của trình duyệt trước khi tải một trang để bạn luôn có được phiên bản mới nhất của code từ server. Nếu bạn đang thử nghiệm tính năng bộ nhớ đệm cho ứng dụng của bạn, bạn có thể vô hiệu hóa add-on này với một nhấp chuột duy nhất.

![](https://images.viblo.asia/1fab343f-d1ed-4718-9271-41a27147d7f9.jpg)

**Các tiện ích mô phỏng các kích cỡ màn hình khác nhau**

15. Resolution Test

Resolution Test giúp bạn dễ dàng kiểm tra ứng dụng web của mình trên các màn hình có độ phân giải và kích thước khác nhau. Bạn có thể chọn độ phân giải và kích thước màn hình từ danh sách các màn hình có độ phân giải phổ biến nhất mà các website hay dùng, hoặc bạn có thể tự định nghĩa ra các kích thước màn hình và độ phân giải khác để sử dụng. Nó tạo ra các màn hình có kích cỡ bạn đã chọn, mở cửa sổ trình duyệt và mô phỏng ứng dụng web trong kích thước màn hình mà bạn muốn.

![](https://images.viblo.asia/dd7d414e-5a54-42aa-9357-49bcdc59b883.jpg)

16. Window Resizer

Đây là tiện ích cực hữu ích trong kiểm thử ứng dụng web. Nó tương tự như tiện ích Firesizer dành cho Firefox- Nó giúp thay đổi kích thước cửa sổ trình duyệt để mô phỏng các độ phân giải màn hình khác nhau, cho phép bạn kiểm tra layout của website sẽ thay đổi như thế nào trên các màn hình có kích thước khác nhau. Bạn có thể chọn từ danh sách các độ phân giải màn hình được đề xuất hoặc cũng có thể thêm các độ phân giải màn hình mà bạn mong muốn. Một ưu điểm nổi bật của Window Resizer so với Resolution Test là nó cho phép bạn thiết lập các phím tắt quan trọng và bạn cũng có thể export các thiết lập đó và import vào một máy tính khác để sử dụng.

![](https://images.viblo.asia/19379be4-7141-40d4-9356-f070551e0b33.jpg)


**Tiện ích của Chrome cho kiểm thử – Test khám phá**

17. Bug Magnet 

Bug Magnet là một sự lựa chọn tiết kiệm thời gian khổng lồ khi test khám phá. Click chuột phải vào bất cứ trường nào trên ứng dụng web để đưa ra một menu với các giá trị được xác định trước cho email, tên, số điện thoại, postcode,… Chọn giá trị mà bạn muốn và điền vào trường trên trang web. Vì vậy, nếu sắp tới bạn có kế hoạch thực hiện test khám phá, bạn không cần phải làm giả giá trị để test thử các trường vì Bug Magnet sẽ làm việc đó cho bạn. Hãy thử một lần, và bạn sẽ sử dụng nó mỗi ngày.

![](https://images.viblo.asia/7f7fa44d-fddf-498e-b456-9b99355cd3a1.png)

18. Form Fuzzer 

Form Fuzzer là một tiện ích khác của chrome để kiểm tra các trường điền dữ liệu với các giá trị khác nhau và cực kỳ có ích cho việc test khám phá. Giống như Bug Magnet, bạn không cần phải tạo dữ liệu để kiểm tra định dạng khác nhau của địa chỉ email, số điện thoại… một cách thủ công khi kiểm thử các form. Chỉ cần click chuột phải vào form mà bạn muốn điền và chọn giá trị mong muốn đã được thiết lập trước.

![](https://images.viblo.asia/48647760-52c8-4ce1-89bb-5e192a2e9b19.png)

19. Web Developer Form Filler

Tiện ích này giúp việc điền các trường của form và chứng minh tính hữu dụng trong khi test khám phá. Bạn có thể cài đặt các phím nóng để điền vào form sử dụng duy nhất một key.

![](https://images.viblo.asia/4bbbb2bd-d52f-4369-9523-3a4083ccfe37.jpg)

via: https://www.softwaretestingmaterial.com/chrome-extensions-for-software-testers/