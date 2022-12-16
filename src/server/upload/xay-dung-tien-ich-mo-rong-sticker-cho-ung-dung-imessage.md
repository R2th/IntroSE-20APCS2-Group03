Một trong các thông báo lớn nhất WWDC 2016 đó là việc giới thiệu framework cho iOS 10: nhà phát triển có thể tạo ra ứng dụng dưới dạng tiện ích mở rộng cho ứng dụng iMessage. Bằng cách này thì người dùng có thể tương tác với ứng dụng của bạn ngay trong ứng iMessage. 

Hiểu đơn giản hơn là khi bạn sử dụng ứng dụng iMessage ngoài những hình ảnh, icon nhàm chán mà suốt ngày dùng, thì bạn có thể sử dụng những hình ảnh, icon ngộ nghĩnh mà tự bản thân bạn tạo ra. 

Thật thú vị đúng không? Không những vậy, nếu bạn đã phát triển một ứng dụng chỉnh sửa ảnh chẳng hạn, bây giờ bạn có thể viết phần mở rộng để người dùng có thể chỉnh sửa ảnh mà không cần thoát khỏi ứng dụng tin nhắn.

Việc hỗ trợ của tiện ích ứng dụng đã mở ra nhiều cơ hội cho nhà phát triển ứng dụng. Apple thậm chí còn giới thiệu App Store cho ứng dụng iMessage, vì vậy mà bạn có thể bán tiện ứng mở rộng mà bạn viết ra trên store dành riêng cho iMessage.

Để có thể xây dựng tiện ích mở rộng thì bạn cần phải có
*  Sticker packs
*  iMessage app

Bài viết bao gồm các mục:
1. Bắt đầu xây dựng tiện ích mở rộng
2. Thêm các hình ảnh, icon bạn thích cho Sticker Pack
3. Thêm các icon cho app
4. Chạy ứng dụng

### 1. Bắt đầu xây dựng tiện ích mở rộng

- Đầu tiên mở Xcode và tạo một project mới, tại đây bạn hãy chọn **Sticker Pack Application** và sau đó đặt tên cho ứng dụng của bạn.

![](https://images.viblo.asia/a384a83b-3b03-4233-8442-655c521c8ded.png)

### 2. Thêm các hình ảnh, icon bạn thích cho Sticker Pack

- Khi project mới được tạo ra bạn sẽ thấy có 2 file. Bạn hãy click vào file  **Stickers.xcstickers** và sau đó chọn **Sticker Pack** đây chính là nơi bạn sẽ đặt các hình ảnh, icon bạn muốn. Các hình ảnh này sẽ support các kiểu như: PNG, APNG, GIF, JPG với size lớn nhất là 500KB.
- Các bạn có thể tải ảnh để sử dụng với mục đích demo ở đây: [Image Pack](https://github.com/appcoda/iMessageSticker/blob/master/Resources/StickerPack.zip?raw=true)
- Tiếp theo chọn các ảnh vào kéo vào thư mục **Sticker Pack**

![](https://images.viblo.asia/3b7bf315-a843-47ac-a9b0-c218b12f6541.png)

- Bạn có thể lựa chọn số lượng cột hiển thị như hình ảnh dưới, ở đây mình để mặc định là 3 column

![](https://images.viblo.asia/c7265f97-9a25-4a60-b7bc-dd5f2fffc325.png)

### 3. Thêm các icon cho app

- Các size bạn cần phải thêm vào:

    * 1024×768 points (@1x) for Messages App Store
    * 27×20 points (@1x, @2x, @3x) for Messages
    * 32×24 points (@1x, @2x, @3x) for Messages
    * 29×29 points (@1x, @2x, @3x) for iPhone/iPad Settings
    * 60×45 points (@2x, @3x) for Messages (iPhone)
    * 67×50 points (@1x, @2x) for Messages (iPad)
    * 74×55 points (@2x) for Message (iPad Pro)

- Các bạn có thể tại tại đây với mục đích demo [App Icon](https://github.com/appcoda/iMessageSticker/blob/master/Resources/cutesticker-appicon.zip?raw=true)
- Và sau đó thêm vào mục iMessage App Icon như hình sau:

![](https://images.viblo.asia/f428e599-0c83-453e-ad0d-26c3ad1f6490.png)

### 4. Chạy ứng dụng

- Bây giờ bạn đã có một ứng dụng dưới dạng extension. Bạn cũng chưa cần phải chạy trên thiết bị thật mà có thể chạy trên máy ảo
- Hãy chọn máy ảo và chạy ứng dụng lên, tận hưởng nó thôi.
- Khi máy ảo được chạy thì bạn sẽ được chuyển sang ứng dụng iMessage và focus vào ứng dụng của bạn. Ngay lúc này bạn có thể sử dụng các hình ảnh mà bạn đã làm ở ứng dụng của bạn.

| |  |  |
| -------- | -------- | -------- |
| ![](https://images.viblo.asia/509cbd0a-8120-4ab7-9689-d39629109715.png)     | ![](https://images.viblo.asia/509cbd0a-8120-4ab7-9689-d39629109715.png)     | ![](https://images.viblo.asia/17a063a9-3767-4590-8df2-fefcc13fdc75.png)     |
| ![](https://images.viblo.asia/575805b3-5459-45ce-bf23-ba6a29d2d6c5.png) | ![](https://images.viblo.asia/99dc6eb5-b886-4f34-a431-73e5526f372c.png) | ![](https://images.viblo.asia/dacb34c2-658c-4bf0-acbb-1df438ebd77a.png) |

### 5. Nâng cấp ứng dụng

- Nếu chỉ là các hình ảnh tĩnh này thì hơi nhàm chán quá, bạn có thể tạo hình ảnh động bằng một danh sách các ảnh tĩnh và tự ứng dụng sẽ thực hiện animation cho danh sách ảnh đó.
- Để thêm hình ảnh động có 2 cách:
    - Cách thứ nhất bạn có sẵn một ảnh động, khi đó bạn hãy thêm nó như các hình ảnh bên trên
    - Cách thứ hai là bạn tạo ra một **Sticker Sequence** và ứng dụng sẽ hiểu bạn muốn animation một danh sách ảnh tĩnh. (**New Sticker Sequence**)

- Các bạn sau khi thêm có thể thấy như sau

| |  |
| -------- | -------- |
| ![](https://images.viblo.asia/d6d5de62-0211-481a-9b7b-4ce5cb2785a1.png) |  ![](https://images.viblo.asia/f192cbbb-836b-4936-bad2-ab70bb5fcddc.png) |
    
**Tổng kết**: Trên đây mình đã hướng dẫn các bạn tạo ứng dụng tiện ích mở rộng cho ứng dụng iMessage. Bây giờ các bạn có thể tự xây dựng riêng cho mình và kiếm tiền trên Apple Store luôn thôi.

Một số hình ảnh icon sử dụng từ nguồn khác chỉ với mục đích demo