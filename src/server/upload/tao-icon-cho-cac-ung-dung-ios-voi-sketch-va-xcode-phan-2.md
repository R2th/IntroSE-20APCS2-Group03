Đây là bài dịch từ của một chia sẻ trên trang [medium.com](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/sketch-app-sources/painless-icon-generation-for-ios-apps-with-sketch-and-xcode-part-2-1c33527bcd73

### Tổng quan
Việc tạo ra các icon cho một ứng dụng iOS có thể mất khá nhiều thời gian. Đây là phần 2, trong loạt 3 bài viết giải thích cách tôi đã thực hiện quá trình export các icon từ *Sketch* vào *Xcode* dưới một phút, thậm chí với cập nhật một icon hoàn toàn mới.
Trong phần 1, tôi đã giới thiệu cách export một bộ icon đầy đủ từ một *arboard* trong *Sketch*.
https://viblo.asia/p/tao-icon-cho-cac-ung-dung-ios-voi-sketch-va-xcode-phan-1-RnB5p0Vb5PG
### Tạo bộ icon cho ứng dụng của bạn
#### Thiết lập bộ icon của bạn trong Xcode
Trong project của bạn sẽ có một bộ icon mặc định có tên là **AppIcon**. Trong các ví dụ, tôi sẽ sử dụng bộ icon mặc định này. Bạn cũng có thể tạo các bộ icon khác nếu bạn muốn. 
Để xem bộ icon trong *XCode*
1. Chọn file *Assets.xcassets* trong project
2. Chọn *AppIcon* từ danh sách 
Bạn có thể thấy các placeholder cho bộ icon của ban.
![](https://images.viblo.asia/34ce4926-ecd7-4820-b3ae-1724d6a5956f.png)
Nếu bạn nhấp chuột phải vào *AppIcon* và chọn *Show in Finder* bạn sẽ thấy rằng *XCode* đã tạo ra một thư mục tên là *AppIcon.appiconset* để chứa các file icon cho một bộ icon. Bạn nên ghi nhớ thư mục này để cho các bước tiếp theo nhé.
![](https://images.viblo.asia/46eba2df-22ba-41d7-8f47-ec745dedaeda.png)
#### Đưa các icon vào XCode
Giờ chúng ta sẽ đưa các file icon đã export bằng *Sketch* vào *XCode* 
1. Tìm bộ icon, bạn đã export được từ *Sketch* (như trong hướng dẫn của phần 1)
2. Copy các file icon này vào thư mục *AppIcon.appiconset* 
![](https://images.viblo.asia/421abf66-500d-4224-8d08-117ecdd477a3.png)
Quay trở lại *XCode* bạn sẽ thấy các icon đã được thêm vào phần *Unassigned*
![](https://images.viblo.asia/c333e3f0-e649-4c47-87b9-32444f2ea717.png)
#### Kết nối các file icon vào placeholder
Để kết nối các file icon vào các placeholder, bạn có thể kéo và thả chúng từng cái một. Việc này không quá khó vì các icon đã được đặt tên cho việc kéo thả này dễ dàng hơn, nhưng nó sẽ làm bạn tốn công và mất thời gian, và đây là cách nhanh hơn nhiều.
Quay trở lại thư mục *AppIcon.appiconset*, bạn sẽ tìm thấy một file tên là *Contents.json* 
![](https://images.viblo.asia/b70bd7c3-6130-49e8-82b0-562649d4bc29.png)
*Contents.json* là file sẽ kết nối các icon của bạn vào placeholder trong XCode. Bạn có thể kết nối mọi thứ trong nháy mắt bằng cách copy file *Contents.json* đã điền các tên icon, bạn có thể tải file này về từ link sau:
https://github.com/gllittler/Painless-icon-generation-for-iOS-apps
1. Copy file *Contents.json* tải về từ link trên
2. Paste vào thư mục *AppIcon.appiconset* (nếu được hỏi, bạn chọn *replace* để ghi đè file đã tồn tại)
Quay trở lại *XCode* bạn sẽ thấy các icon giờ đã ở đúng vị trí các placeholder tương ứng.
![](https://images.viblo.asia/1a6c618c-e656-47fc-aa9f-9492f9218d2a.png)

Chúc mừng! Bộ icon cho ứng dụng của bạn đã hoàn thành. Khi bạn built project bạn sẽ nhìn thấy icon mới của ứng dụng.
#### Cách thức hoạt động
Kỹ thuật copy file *Contents.json* từ một bộ icon này sang một bộ icon khác để ngay lập tức kết nối các file icon và placeholder dựa trên việc các icon cụ thể trong bộ icon phải có cùng tên. Hãy tái sử dụng *slice* hoặc *slice preset* của *Sketch* mà bạn đã sử dụng trong phần 1 để chắc chắn điều trên.
### Bảo trì các icon
#### Thay đổi thiết kế icon
Nếu thiết kế icon của bạn bị thay đổi:
1. Tiến hình export lại bộ icon mới từ *Sketch*
2. Copy các file icon mới vào thư mục *AppIcon.appiconset*
Trong *XCode* bạn sẽ thấy các icon đã được cập nhật.
#### Thêm một icon với kích thước mới
Nếu yêu cầu về kích thước icon thay đổi:
1. Tiến hình export lại bộ icon mới từ *Sketch*
2. Copy các file icon mới vào thư mục *AppIcon.appiconset*
3. Kiểm tra bộ icon mới trong *XCode*
4. Hoặc: kéo thả icon có kích thước mới vào placeholder tương ứng của nó.
5. Hoặc: copy file *Contents.json* đã có file icon với kích thước mới.
![](https://images.viblo.asia/49c221fb-aa8c-4b4f-96bd-f94b13e79bf2.png)
### Tổng kết
Trong phần 2 này, tôi đã giải thích cách lấy một bộ icon mà bạn đã tạo trong *Sketch* và đưa nó vào dự án Xcode của bạn trong nháy mắt. Phần 3 tôi sẽ giới thiệu một số thủ thuật để thiết lập các *Artboard* của bạn để quản lý nhiều icon cùng một lúc.