Trong thời đại công nghệ 4.0 hiện nay, internet đã trở thành một phần tất yếu trong cuộc sống của chúng ta. 

Hầu hết chúng ta đưa ra quyết định của mình bằng cách tìm kiếm thông tin trên website. Do đó, việc sở hữu một trang web không còn là tùy chọn mà đã là bắt buộc đối với hầu hết mọi loại hình doanh nghiệp. Đây là bước đầu để đưa sản phẩm của mình tiếp cận tới thị trường. Một trang web đơn thuần là chưa đủ, một trang web có nhiều thông tin, dễ truy cập và thân thiện với người dùng là tất cả những gì một doanh nghiệp cần. Để duy trì những điều đó, trang web cần được kiểm tra một cách tốt nhất. Hôm nay chúng ta cùng tìm hiểu về nó.


## Kiểm thử website là gì?

Kiểm thử website nhằm kiểm tra và phát hiện ra những lỗi tiềm ẩn từ trang web hoặc ứng dụng website. Một hệ thống dựa trên website cần phải được kiểm tra hoàn chỉnh từ đầu đến cuối trước khi hệ thống này tới tay người dùng cuối (End-user). 

Bằng cách kiểm thử website, một tổ chức / doanh nghiệp có thể đảm bảo rằng hệ thống website của mình đang hoạt động đúng và có thể được chấp nhận bởi người dùng thực của website.

Giao diện (UI) và chức năng (functionality) là những điều quan trọng nhất khi kiểm thử website.

Checklist của một website bao gồm: 
1) Functionality Testing - Kiểm thử chức năng
2) Usability testing - Kiểm thử khả năng sử dụng
3) Interface testing - Kiểm thử giao diện
4) Compatibility testing - Kiểm thử khả năng tương thích
5) Performance testing - Kiểm thử hiệu năng
6) Security testing - Kiểm thử bảo mật

![](https://images.viblo.asia/3b45d774-2f8b-4510-aa82-05ea25804829.jpg)

Ảnh: Internet

### 1. Functionality Testing - Kiểm thử chức năng

Kiểm tra tất cả các địa chỉ liên kết trong trang web, cơ sở dữ liệu, các biểu mẫu được sử dụng để gửi hoặc nhận thông tin từ người dùng trong các trang web, Kiểm tra cookie, v.v.

#### Kiểm tra tất cả các liên kết

* Kiểm tra tất cả các địa chỉ được liên kết ra ngoài tới các địa chỉ cụ thể (theo tài liệu sản phẩm).
* Kiểm tra các liên kết nội bộ, tới những phần của trang, màn hình liên kết trong website.
* Kiểm tra các liên kết cùng một trang (các thanh menu, liên kết trong bảng, các tab dữ liệu...).
* Kiểm tra các địa chỉ dùng để gửi email cho ban quản trị hoặc người dùng khác thông qua trang web.
* Kiểm tra xem có bất kỳ trang mồ côi nào không (trang web không được sử dụng để liên kết bất kỳ ở đâu).
* Cuối cùng, trong khi kiểm tra các dữ liệu trên, bạn cần chắc chắn rằng không có trang nào bị hỏng.



#### Kiểm thử biểu mẫu ở tất cả các màn hình

Các biểu mẫu nhập liệu là một phần không thể thiếu của bất kỳ trang web nào. Những biểu mẫu này được dùng để nhận thông tin từ người dùng và để hệ thống tương tác với họ. Vậy, chúng ta cần kiểm tra gì cho nó:
* Kiểm tra validation cho từng trường cụ thể.
* Tiếp đến, chúng ta kiểm tra giá trị mặc định khi mở biểu mẫu của từng trường là gì.
* Nhập các giá trị sai vào từng trường trong mẫu.
* Các tùy chọn để tạo thêm biểu mẫu, xóa  biểu mẫu, sửa biểu mẫu.

Ví dụ: Khi bạn kiểm thử một trang web yêu cầu tài khoản để sử dụng. Điều đầu tiên và cần thiết đó là biểu mẫu đăng ký phải hoạt động ổn định. Trong form đăng ký sẽ có: Tên, Số điện thoại, Email, Địa chỉ, Mã bưu chính...etc. Thì tùy vào mỗi trường trong form sẽ có các validation khác nhau, và bạn phải chắc chắn rằng toàn bộ các trường đó được kiểm tra đầy đủ.

#### Kiểm thử Cookies 

Cookie là 1 thông tin nhỏ được lưu trữ dưới dạng 1 file text trên ổ của người sử dụng bởi web server. Thông tin này sau đó được sử dụng bởi trình duyệt web để khôi phục thông tin từ máy chủ đó. Nhìn chung cookie chứa đựng dữ liệu hoặc thông tin cá nhân của người dùng mà được sử dụng để truyền thông giữa các trang web.

Điều cần làm ở đây là kiểm tra xem cookie trên trang web của bạn có được mã hóa trước khi ghi vào ổ cứng của người dùng hay không. Chi tiết bạn nên tham khảo tại [đây](https://techblog.vn/kiem-thu-cookie-cua-website-va-test-case-cho-viec-kiem-thu-cookies-cua-ung-dung-webstie), vì bài viết về loại kiểm thử này khá phức tạp và dài.

#### Kiểm thử cơ sở dữ liệu

Tính nhất quán cho dữ liệu người dùng là điều quan trọng trong một trang web. Kiểm tra tính toàn vẹn của dữ liệu khi bạn thao tác chỉnh sửa, tạo, xóa biểu mẫu hoặc dữ liệu bất kỳ gì đó.

Kiểm tra các câu lệnh truy vấn cơ sở dữ liệu được thực hiện đúng ở tất cả các màn hình sử dụng dữ liệu.

#### Tóm gọn, khi kiểm thử chức năng của website bạn cần lưu ý:

**Địa chỉ liên kết**: Liên kết nội bộ, liên kết ra ngoài, liên kết gửi mail, liên kết bị hỏng.
**Biểu mẫu**: Validation, thông báo lỗi khi nhập sai dữ liệu, trường tùy chọn hay bắt buộc.
**Cơ sở dữ liệu:** Kiểm tra theo tiêu chí tính toàn vẹn của dữ liệu người dùng.

###  2. Usability testing - Kiểm thử khả năng sử dụng

Kiểm tra khả năng sử dụng là quá trình đo đạc những tương tác giữa người dùng và website nhằm tìm ra những điểm yếu cần khắc phục của hệ thống.

* Dễ dàng học cách sử dụng.
* Điều hướng.
* Sự hài lòng của người dùng.
* Cái nhìn tổng thể.

![](https://images.viblo.asia/0f4649de-5245-4bae-9398-b3ccfe005f58.jpg)
Ảnh:  DEVCLASS


#### Kiểm thử điều hướng

Điều hướng có nghĩa là cách người dùng lướt trang web, những điều khiển khác nhau như các nút (buttons) hoặc cách người dùng sử dụng các liên kết để lướt sang các trang khác nhau.

#### Kiểm thử khả năng sử dụng bao gồm:
* Trang web phải thật dễ dàng để sử dụng.
* Các hướng dẫn cụ thể phải được rõ ràng, dễ hiểu.
* Kiểm tra nếu các hướng dẫn có được hiển thị hay không và nó chắc chắn phải hoạt động ổn đúng với vai trò của nó.
* Thanh menu chính nên được hiển thị ở tất cả các màn hình chính.
* Phải phù hợp với người sử dụng.

#### Kiểm tra nội dung

Nội dung phải hợp lý và dễ hiểu. Không được tồn tại lỗi chính tả nào. Sử dụng màu sắc tối hoặc khó chịu cho trang web là điều cấm kị và không nên nếu bạn muốn xây dựng một trang web hoàn hảo.

Bạn có thể làm theo một số màu tiêu chuẩn được sử dụng cho các trang web tương đồng. Đây là những tiêu chuẩn thường được chấp nhận bởi người dùng qua nhiều nghiên cứu khác nhau về màu sắc, phông chữ, khung hình, v.v.

Nội dung nên có ý nghĩa (không dư thừa, dài dòng, lan man). Các liên kết đính kèm theo văn bản phải hoạt động đúng, các hình ảnh chèn vào trang, bài viết hiển thị đúng kích thước, vị trí.

Trên đây là một số trường hợp cơ bản mà bạn cần phải lưu ý khi kiểm tra ở nội dung của bất kỳ trang nào trên hệ thống của bạn.

### 3. Interface testing - Kiểm thử giao diện

Trong thử nghiệm web, giao diện phía máy chủ nên được kiểm tra. Điều này được thực hiện bằng cách xác minh rằng những giao tiếp được thực hiện đúng. Khả năng tương thích của máy chủ với phần mềm, phần cứng, mạng và cơ sở dữ liệu cần được kiểm tra.

Các giao diện chính là:
* Giao tiếp giữa Web server và ứng dụng.
* Giao tiếp giữa Ứng dụng và cơ sở dữ liệu.

![](https://images.viblo.asia/0b638140-9392-49c9-b395-2f1541271573.jpg)
Ảnh: Logical read

Kiểm tra xem tất cả các tương tác giữa các máy chủ này được thực thi và lỗi cần được tìm và xử lý đúng cách. Nếu giao tiếp giữa máy chủ, cơ sở dữ liệu và ứng dụng gặp bất kỳ trục trặc nào thì điều bắt buộc là hiển thị lỗi ra cho người dùng một cách dễ hiểu nhất (tốt nhất là đi kèm id của lỗi). 

### 4. Compatibility testing - Kiểm thử khả năng tương thích

Khi kiểm thử website, điều đau đầu nhất mà bạn gặp phải là khả năng tương thích của website so với một số trình duyệt, OS lại quá đau đầu để xử lý. Một số ứng dụng phụ thuộc nhiều vào trình duyệt, các trình duyệt khác nhau có cấu hình và cài đặt khác nhau mà trang web của bạn phải tương thích. 

Trang web của bạn phải được tích hợp nền tảng đa trình duyệt. Nếu bạn đang sử dụng các tập lệnh java hoặc các lệnh gọi AJAX cho chức năng UI, thực hiện kiểm tra bảo mật hoặc xác nhận thì sẽ gây căng thẳng hơn cho việc kiểm tra khả năng tương thích trình duyệt cho ứng dụng web của bạn.

Kiểm thử ứng dụng của bạn trên những trình duyệt khác nhau như: Internet Explorer, Firefox, Google Chrome, AOL, Safari, Opera với những phiên bản khác nhau. 

#### Khả năng tương thích với hệ điều hành

Một số chức năng trong ứng dụng web của bạn có thể không tương thích với tất cả các hệ điều hành. Tất cả các công nghệ mới được sử dụng trong phát triển web như thiết kế đồ họa, các lệnh gọi API khác nhau có thể không có sẵn trong tất cả các Hệ điều hành.

Do đó bạn cũng cần kiểm tra ứng dụng của bạn trên các hệ điều hành khác nhau như: MacOS, Windows, Unix, Linux... với những phiên bản khác nhau.

![](https://images.viblo.asia/2e98acd1-6c61-4a54-8b3b-600bb646b8ef.jpg)
Ảnh: Iexperto

#### Duyệt web trên di động

Chúng ta ở trong thời đại phát triển, việc trang web của bạn tương thích với các phiên bản di động là điều cần thiết. Các vấn đề tương thích ở trên di động có khả năng còn nhiều vấn đề hơn cả trên máy tính nên bạn cần chắc chắn rằng trang web của bạn vẫn sống tốt trên di động.

#### Khả năng in trang

Nếu bạn đang đưa ra các tùy chọn in trang thì hãy đảm bảo phông chữ, căn chỉnh trang, đồ họa trang, v.v., sẽ được in đúng cách. Các trang phải vừa với khổ giấy hoặc theo kích thước được đề cập trong tùy chọn in.

Nếu trang web của bạn chứa nội dung có thể được hỗ trợ in - thì bạn nên đảm bảo là: fonts chữ, căn trang, đồ họa có thể được in một cách chuẩn nhất. Các trang phải vừa với khổ giấy hoặc theo kích thước được đề cập trong tùy chọn in.


--- 

Phần 2: https://viblo.asia/p/kiem-thu-website-la-gi-p2-RQqKLL0rK7z

--- 


Nguồn: https://www.softwaretestinghelp.com/web-application-testing/

https://techblog.vn/kiem-thu-cookie-cua-website-va-test-case-cho-viec-kiem-thu-cookies-cua-ung-dung-webstie

https://viblo.asia/p/interface-testing-la-gi-vyDZOz4GKwj

https://viblo.asia/p/api-la-gi-nhung-dac-diem-noi-bat-cua-web-api-Qpmle9L9lrd