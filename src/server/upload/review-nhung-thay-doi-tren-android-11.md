![](https://images.viblo.asia/5760bb4b-9b5c-49df-9449-48c82b95819c.jpg)


Mới gần đây Google đã cho phiên bản thử nghiệm Android 11 sử dụng trong môi trường Developer, cụ thể là vào 18-3 vừa rồi. Điều đó có nghĩa là các anh em developer có thể cập nhật SDK và chạy thử trên Emulator được. Chúng ta sẽ cùng xem có những thay đổi gì trong phiên bản đang rất được chờ đón này nhé.

Điều đầu tiên phải kể đến đó là APIs 5G.

### 1. API 5G

![](https://images.viblo.asia/f88c1a62-8842-4692-b54b-c0248edc5a66.png)

Developer sẽ được cung cấp 1 API để trả về trạng thái của thiết bị có đang được kết nối công nghệ 5G hay không. Từ đó bạn có thể gây ấn tượng mạnh với người dùng đang sử dụng thiết bị 5G để nâng cao chất lượng dịch vụ. Ngoài ra nó cũng tương thích với những API kết nối thông thường trước đó nhằm cải tiến chất lượng đường truyền 5G

### 2. Hỗ trợ cho thiết bị có thể gập lại

Nó hỗ trợ 1 cảm biến để nhận diện trực tiếp hoặc có thể thông qua AndroidX API biết được các góc gập một cách chính xác hơn. Như vậy chúng ta có thể mang lại trải nghiệm người dùng tốt hơn trên những thiết bị cao cấp. Giờ gập mới là ngon nha, thẳng không ăn thua nữa rồi :D

### 3. Cải thiện xác thực cuộc gọi

Có một API mới để app có thể kiểm tra và xác thực cuộc gọi chất lượng hơn, nhằm tránh tình trạng giả mạo ID của người gọi. Và hệ thống có thể cảnh báo lý do cụ thể vì sao cuộc gọi đó có thể là giả mạo, người dùng nhanh chóng thao tác từ chối cuộc gọi và đánh dấu đó là spam.

### 4. Cải tiến AI

Như trong giới thiệu thì kỹ sư của Google AI mới phát hiện ra cách thức kích "não" cho phần điều khiển thiết bị của họ cho phép đào tạo được nhanh hơn, chính xác hơn giúp mô hình AI học nhanh hơn. Việc xử lý các trường hợp thường xuyên sẽ được cải tiến độ trễ. Điều đó có nghĩa bạn sẽ được trải nghiệm một OS với phần hỗ trợ tốt hơn.

### 5. Truy cập camera và microphone 

Trong phiên bản Android 10, đã thêm `android:foregroundServiceType` để đảm bảo trách nhiệm hơn trong việc truy cập permission "location "ở chế độ **foreground** . Còn bây giờ mới được thêm việc chia quyền này cho 2 tính năng truy cập là camera và microphone. Bạn muốn dùng phải khai báo tương tự như Android 10.

### 6. Phạm vi lưu trữ updated

Họ muốn bảo vệ dữ liệu của người dùng hơn nữa trên các thiết bị lưu trữ ngoài. Việc hỗ trợ chuyển đổi lưu trữ các tệp từ mô hình lữu cũ sang 'scoped storage model' đã được cải tiến và quản lý tốt hơn trên bộ nhớ cache. Ví dụ như: `Scoped storage enforcement`, `One-time permissions`, v.v..

### 7. Đồng bộ hóa IME transitions

API mới WindowInsetsAnimationController sẽ làm nhiệm vụ đồng bộ hóa nội dung ứng dụng của bạn với IME (soft keyboard), thao tác ẩn hiện bàn phím mượt mà hơn, không bị giật như trước nữa mang lại trải nghiệm người dùng trực quan hơn.
Đây cũng là một cải tiến UX rất xịn đó. (Hình ảnh dưới)

![](https://images.viblo.asia/115124c2-1739-4d06-8ec2-4025c48d047f.gif)


### 8. Tần số hiển thị

Thông thường tần số hiển thị màn hình của các game và app hiện nay đang được OS hỗ trợ ở mức 60Hz, tuy rằng đây là một mức tốt rồi nhưng hiện tại đã có những thiết bị hỗ trợ hiển thị ở mức tốt hơn là 90Hz và 120Hz. Vì vậy muốn đáp ứng tối đa chất lượng của game thì Android 11 cho phép bạn thiết lập tần số hiển thị ở mức tối đa mà thiết bị đạt được qua API `Surface.setFrameRate()`

### 9. Resume on reboot

Khi có phiên bản update OS mới thường bạn có thể thiết lập việc cập nhật đặt lịch qua đêm. Sau khi update hoàn thành thì OS vẫn phải reboot lại để cập nhật OTA mới, nhưng với những bản trước đây thì ứng dụng không thể truy cập vào bộ nhớ Credential Encrypted sau khi OTA đã hoạt động mà phải chờ khi nào người dùng mở khóa thì thiết bị mới chính thức hoạt động bình thường được. Như thế bạn sẽ bị trễ mất việc nhận dữ liệu mới, cuộc gọi, tin nhắn v.v.. 

Nhưng trong phiên bản này việc cập nhật qua đêm vẫn diễn ra tự động và các ứng dụng khác hoạt động bình thường ngay sau khi được cập nhật mà không cần thao tác mở khóa từ người dùng. Bản có thể thử chức năng này bằng cách nhấp vào **Restart after 2AM** trên thiết bị.


### 10. Camera trên emulator

Với phiên bản này bạn có thể sử dụng camera ở cả cam trước và cam sau. Với cam sau được hỗ trợ Camera2 API HW Level 3 hỗ trợ YUV và chụp được ảnh RAW, nó được hỗ trợ hoàn toàn tính năng test nâng cao như ZSL và RAW/DNG. Cam trước thì hỗ trợ tính năng giả lập chụp ảnh góc hẹp, góc rộng. Như vậy cũng khá đầy đủ rồi phải không nào anh em? Với từng đó cũng đủ cho một trải nghiệm xứng đáng dành thời gian ra update SDK mới lên và thử phát thôi. :D

**Note:**

À còn 1 lưu ý này nữa là phiên bản Android 11 hỗ trợ trên 1 vài thiết bị sau: Pixel 2 / 2 XL, Pixel 3 / 3 XL, Pixel 3a / 3a XL, hoặc Pixel 4 / 4 XL

Ai mà build trên Pixel sẽ không được đâu nhé. Ai không build được hay có gì cứ để lại comment ở phía dưới bài viết này nha.

**Bonus :**

### 11. Ngày release khi nào

Hiện tại tháng 4 và 5 này đang là giai đoạn Beta. Đến đầu tháng 6 sẽ hoàn tất giai đoạn cuối trước khi tung ra bản update chính thức cho người dùng và muộn nhất là cuối tháng 9 chúng ta sẽ được trải nghiệm trên thiết bị thực.

(Ảnh cho anh em xem)

![](https://images.viblo.asia/fb65951b-94d0-4e65-919b-d6cc5349b7d6.png)