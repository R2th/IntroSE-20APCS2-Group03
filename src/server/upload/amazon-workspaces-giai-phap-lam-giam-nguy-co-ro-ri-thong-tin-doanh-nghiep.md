![](https://images.viblo.asia/d46b6ea7-f6bd-4481-a63d-5a073aa00142.jpg)

Việc cung cấp máy tính cho nhân viên công ty thường đảm bảo về an toàn an ninh hơn là việc cho nhân việc sử dụng máy tính cá nhân. Tuy nhiên, nếu có một hệ thống an toàn và rẻ hơn phương pháp đó thì các bạn nghĩ sao?

Chìa khóa cho vấn đề này chính là dịch vụ có tên gọi là **"máy tính ảo (VDI)".** Các cái tên tiêu biểu cho dịch vụ này chính là Amazon WorkSpaces do Amazon cung cấp, hay TechTarget Japan,...

Bài viết này sẽ giới thiệu về dịch vụ "máy tính ảo" của  ** Amazone WorkSpaces **  khá dễ cài đặt trong các công ty. Các rủi ro về việc rò rỉ thông tin thiết bị ra bên ngoài công ty sẽ được giảm đáng kể do WorkSpaces thực hiện remote work từ xa một cách an toàn, và có thể thay đổi được các hoạt động của nhân viên.

# Amazon WorkSpaces là gì?
![](https://images.viblo.asia/5bef6966-3a51-4e24-a6c3-b06f7925410c.png)

**Amazon WorkSpaces** là dịch vụ máy tính để bàn ảo theo phương thức quản lý do Amazon Web Services(AWS) cung cấp. Nói một cách dễ hiểu, đây chính là dịch vụ cho phép bạn thao tác máy tính trên bất kì thiết bị đầu cuối nào trên cloud.

[](https://youtu.be/BwTws6B8NKY)

Khi nói như vậy có thể bạn sẽ nghĩ ngay đến vấn đề **"cloud ư, đó chẳng phải là nơi lưu giữ file" **  hay sao?

Trên thực tế, "cloud" đúng là có  ý nghĩa như vậy nhưng trong trường hợp này thì nó còn có ý nghĩa là "**cloud storage**" - kho lưu trữ trên cloud. Amazon WorkSpaces sẽ đưa các máy tính để bàn lên trên cloud và **kết nối với các máy tính ảo khác từ các loại thiết bị đầu cuối như iPad, Mac, Kindle Fire,…**
# Lợi ích khi sử dụng Amazon WorkSpaces

![](https://images.viblo.asia/ad77f72b-6964-41ae-8308-49bd9087518d.jpeg)

Có nhiều người thắc mắc rằng "Tại sao lại phải cần kết nối máy tính ảo từ máy tính chứ?". Amazon WorkSpaces thường được sử dụng nhiều cho các máy tính công ty hơn là các máy tính các nhân, nên bạn hãy thử xem xét điều này dựa trên quan điểm các công ty.

## 1. Không cần bộ phận IT phải cài đặt trước.

Thông thường, các công ty khi cấp phát máy tính cho nhân viên thường sẽ không cấp máy tính ở trạng thái khởi tạo cho nhân viên mà sẽ thực hiện các thao tác gọi là "**kitting**" rồi mới cấp phát.

Mục đích của việc kitting chính là để tối ưu hóa cho các phần mềm Office như là Word, Excel hay các phần mềm bảo mật,…

Nếu sử dụng Amazon WorkSpaces thì bạn **chỉ cần phải thực hiện 1 lần kitting** mà không cần phải mở máy tính. Hơn nữa, bạn cũng có thể thay đổi nội dung kitting nên bộ phận IT sẽ quản lý dễ dàng hơn.
Các ứng dụng cung cấp cho user như Microsoft Office cũng có thể được chọn từ cài đặt sẵn có. Ngoài ra, bạn cũng có thể triển khai các ứng dụng của bên thứ ba hoặc các ứng dụng nội bộ mà bạn đang sử dụng.

## 2. Không cần cấp phát máy tính mới

Do bạn có thể kết nối với các máy tính của công ty từ nhiều loại thiết bị đầu cuối của cá nhân nên sẽ ** không còn khái niệm mang máy tính ra ngoài công ty.**

Và đương nhiên, **việc cấp phát máy tính mới cũng là không cần thiết**. Bởi bạn sẽ không cần phải trao đổi để nâng cấp máy tính.

*Người dùng có thể kết nối với môi trường Windows đã cài đặt Office từ các thiết bị đầu cuối sau:*

- iPad

- Mac

- Windows

- Android Tablet

- Chromebook

- Kindle Fire HDX

- Trình duyệt Chrome hoặc Firefox Web

Bên cạnh đó, người dùng có thể sử dụng thông tin chứng thực sẵn có trong mạng công ty để login và truy cập liền mạch mà không cần phải đợi cấp ID mới để sử dụng cho WorkSpace.

## 3. Tính bảo mật được tăng cao

Khi sử dụng Amazon WorkSpaces thì đồng nghĩa với việc bạn đã **nâng cao được tính bảo mật.**

Có  lẽ bạn sẽ cảm thấy lo lắng về vấn đề bảo mật khi kết nối "máy tính ảo cho công ty" bằng thiết bị của cá nhân, tuy nhiên trên thực tế thì điều này lại ngược lại. Bạn có thể an tâm rằng **không có bất cứ dữ liệu nào của công ty được lưu lại trên thiết bị của bạn.**

Ngoài ra, bạn cũng có thể giám sát hệ thống, theo dõi log, cài đặt báo thức bằng việc sử dụng AWS CloudWatch được cung cấp trên Amazon Web Services(AWS).

Bên cạnh đó, nó cũng có thể giám sát theo thời gian thực một cách chi tiết cụ thể mà việc cấp phát máy tính vật lý không thực hiện được.

## 4. Có thể thao tác in

Có lẽ nhiều người sẽ có suy nghĩ rằng "việc sử dụng máy tính ảo cũng sẽ đi kèm với việc hạn chế một số tính năng" nhưng ở Amazon WorkSpace bạn sẽ **có thể thực hiện in** từ thiết bị đầu cuối mà bạn đang sử dụng.

### Cách sử dụng Amazon WorkSpace

Để sử dụng Amazon WorkSpaces, bạn cần có tài khoản AWS. Nếu bạn chưa tạo tài khoản, vui lòng tạo tài khoản ở link sau.
[](https://ferret-plus.com/8299)

### 1. Tạo mới WorkSpace

Nhập "WorkSpaces" vào cửa sổ tìm kiếm của dịch vụ AWS của bảng điều khiển quản lý, và chuyển màn hình đến Amazon WorkSpaces.

![](https://images.viblo.asia/b07be7fc-b19f-4e13-a40a-094e13cd4a49.png)

Khi đó nó sẽ chuyển đến màn hình chọn region. Chọn nơi đặt mát tính ảo trên server.

![](https://images.viblo.asia/0fe10b23-d639-40fd-a9ee-0ef549929e71.png)

Ở màn hình này, bạn hãy thử chọn phía Tây của Mỹ (Oregon) - nơi có mức giá rẻ nhất. Ngoài ra, lưu ý rằng bạn sẽ không thể chọ phía Đông của Mỹ (Ohio), nếu bạn chọn Châu Á Thái Bình Dương (Tokyo) thì bạn sẽ bị tính thêm 8% thuế tiêu dùng.

![](https://images.viblo.asia/bd9d3866-0233-4e25-87d7-8fbc10e2a46f.png)

Khi chọn region xong bạn sẽ chuyển sang màn hình hướng dẫn. Ở đây, bạn hãy click vào "start now/今すぐ始める

![](https://images.viblo.asia/cdca3d0b-9c0a-4e62-9317-988cfe3f151c.png)

Tiếp theo, chọn "cài đặt nhanh/高速セットアップ" hoặc "cài đặt nâng cao/詳細設定". "Cài đặt nhanh/高速セットアップ" thường dùng cho những người mới bắt đầu.

![](https://images.viblo.asia/275c5dc3-4c78-4504-9207-7e8761012ecf.png)

Chỉ định cách khởi động của Amazon WorkSpaces. Cột "Bundle/バンドル" là tổng hợp của Windows 7・10 với Office 2010・2013・2016, và chỉ định số lượng CPU và dung lượng lưu trữ.

Với những người lần đầu tiên sử dụng mà muốn dùng thử thì chọn Standard with Windows 10 ở cột Bundle và ngôn ngữ là Japanese. Ngoài ra, nhập thông tin user vào bên dưới, rồi click button "Start WorkSpaces/ WorkSpacesの起動"

Trong tất cả các Bundle đều bao gồm Internet Explorer 11, Firefox, 7-Zip, tuy nhiên bạn cũng có thể cài đặt ứng dụng riêng của mình lên WorkSpaces sau khi khởi động.

### 2. Khởi động WorkSpace

Click button "Start WorkSpaces Console/ WorkSpacesコンソールの起動" sẽ thấy xuất hiện hiển thị "WorkSpaces starting/ WorkSpacesの起動中". Tùy thuộc vào việc cài đặt mà lượng thời gian khác nhau, thông thường mất khoảng 20 phút. Trong thời gian chờ đợi bạn có thể kiểm tra quy trình kết nối với WorkSpace. 


![](https://images.viblo.asia/ee78e6a6-be45-44e3-88e9-4a7532c38bc8.png)

Sau khi được tạo thì trạng thái của WorkSpace sẽ chuyển từ PENDING sang AVAILABLE

Khi đó, hệ thống sẽ gửi mail cho bạn và bạn chỉ cần download WorkSpace client và login theo hướng dẫn. Bên cạnh đó, bạn có thể login bằng trình duyệt mà không cần cài đặt client

![](https://images.viblo.asia/6d46be41-c5dd-401b-803a-3575ead1db89.png)

Khi login thành công, bạn có thể vận hành máy tính Windows ảo trên màn hình của thiết bị tương thích như được mô tả ở trên.

Tất nhiên, nếu thiết bị tương thích được kết nối với Internet, bạn cũng có thể kết nối với Internet hoặc cài đặt phần mềm được tải xuống từ bên ngoài.

## Tổng kết

Nếu bạn sắp xếp hệ thống để sử dụng máy tính ảo trong công ty thì bạn có thể cắt giảm chi phí lớn so với hệ thống "On-premise". Việc sử dụng này khá dễ dàng, bạn nên thử sử dụng chúng xem sao

Với Amazon WorkSpaces, bạn có thể áp dụng cho nhiều hình thức làm việc mà không cần lo lắng về chi phí và bảo mật. Do nó có thể tương thích với nhiều quy mô khác nhau, nên bạn hãy thử nó trước ở bộ phận IT, nếu thấy không vấn đề gì thì có thể triển khai cho toàn công ty.

*Nguồn: https://ferret-plus.com/9625*