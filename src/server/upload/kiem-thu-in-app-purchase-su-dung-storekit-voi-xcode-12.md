Như chúng ta đã biết, từ trước đến nay việc kiểm thử mua hàng trong ứng dụng từ trước thì một developer phải tạo các tài khoản tester để đưa vào Sanbox để có thể thử nghiệm. Sau khi thực hiện rất nhiều các bước, developer mới có thể tiếp tục coding đến việc mua hàng trong ứng dụng. Nó không thể tránh khỏi việc làm chậm quá trình phát triển.<br>
Rất may, tình trạng chậm đó có thể đã thuộc về quá khứ bắt đầu từ Xcode 12, bạn không cần thiết phải dừng việc coding để truy cập App Store Connect mà việc triển khai và gỡ lỗi IAP giờ đây có thể được thực hiện với tốc độ nhanh, chỉ cần sử dụng Xcode và Simulator. Một lợi ích bổ sung của StoreKit Configuration là nó hoạt động ngoại tuyến, do đó, mua hàng trong ứng dụng có thể được triển khai và thử nghiệm ngay cả khi không có truy cập Internet.<br>
Bài viết này mình sẽ hướng dẫn các bạn tạo và kiểm thử in app purchase trên Xcode 12.. Go!!!
# App demo
Mình chỉ demo qua app mình chỉ có 2 nút là Load product và Purchase như bên dưới.<br>
![](https://images.viblo.asia/f3007d44-5cfe-4a8c-b963-1f44c92fe133.png)<br>
Link git mình sẽ để tại đây: https://github.com/DuyIoT/DemoInAppPurchase <br>
# Tạo Storekit configuration file
Để kiểm tra tính năng mua hàng bằng Xcode, ta phải tạo một *configuration file* .<br>
Để tạo configuration file, chọn File> New trong Xcode hoặc chỉ cần nhấn Cmd + N trên bàn phím của bạn. Trong cửa sổ xuất hiện với tất cả các mẫu tệp có sẵn, chọn Storekit Configuration file. hoặc tại ô tìm kiếm, bạn cũng có thể nhập “storekit” vào thanh tìm kiếm. Sau đấy bạn đặt tên và kết thúc.<br>![](https://images.viblo.asia/cb52ab57-0dae-4248-849f-390a83ebfc2b.png)<br>
Tiếp theo, để thêm các gói hàng trong ứng dụng, bạn click mở file .storekit vừa tạo, hiện tại nó đang rỗng vì bạn chưa thêm gói mua hàng nào cả. Để thêm chọn nút "+" ở phía dưới bên trái của cửa sổ: <br>
![](https://images.viblo.asia/46505d01-0d99-49a3-8b71-4e8a92ff969e.png)<br>
Lúc đấy sẽ hiển thị các tuỳ chọn
1. A consumable in-app purchase.
2. A non-consumable in-app purchase.
3. An auto-renewable subscription.<br>

Ở bài viết này mình sẽ sử dụng mua hàng tự động trả phí theo từng tháng (An auto-renewable subscription.) Để tạo An auto-renewable subscription, đầu tiên bạn phải tạo một group, cái này nó giống như việc bạn tạo ở trên App Store Connect. Nên cái này mình cũng sẽ không nói sâu vào trong.<br>
![](https://images.viblo.asia/7fa17903-7a22-4fcd-90dd-6c7bc0799094.png)
Sau đó mình thêm các gói mua hàng trong ứng dụng(nếu cần)<br>
![](https://images.viblo.asia/cc0e0bfa-dc51-474b-99fa-692b106e1eaa.png)<br>
Bạn cũng có thể cài đặt thêm Introductory Offer: <br>
![](https://images.viblo.asia/6e744472-785d-4ab8-b0c6-0ad7363fe328.png)<br>

Cuối cùng, khi bạn hoàn tất việc config mua hàng trong ứng dụng, hãy nhấn Cmd + S để lưu các thay đổi của bạn.
# Sử dụng StoreKit Configuration File
Để sử dụng StoreKit Configuration File, đầu tiên trước lúc build ứng dụng, bạn cần Edit Schema để cho biết sẽ sử dụng StoreKit Configuration File thay vì sử dụng App Store.<br>
![](https://images.viblo.asia/28e25453-be12-4638-a826-cd49c008add6.png)<br>
Tại tab Option, bạn sẽ thấy StoreKit Configuration, lúc đó bạn nãy chọn File StoreKit bạn vừa tạo ở trên rồi kết thúc và build ứng dụng bình thường.<br>
![](https://images.viblo.asia/f67f4414-912c-49d8-8f21-c43ca55d7b58.png)

# The Transactions Manager
Tất cả các giao dịch sẽ được hiển thị trong một cửa sổ gọi là Transactions Manager, bạn có thể mở bằng cách chọn Debug > StoreKit > Manage Transactions. Hoặc bằng cách chọn vào nút Manage StoreKit Transactions trên thanh Xcode status khi app đang được chạy.<br>
![](https://images.viblo.asia/b97fc164-2307-43be-9298-1a886c30df9c.png)<br>
Khi hiển thị Transactions Manager, nó sẽ hiển thị các giao dịch mà bạn đã mua trước đó.<br>
![](https://images.viblo.asia/c6e23b13-8f71-4e28-814e-1badcb407f3d.png)<br>
# Kiểm thử In app purchase
## Tính năng tự động gia hạn sau một khoảng thời gian.
Ví dụ bạn có tự động gia hạn sau một tháng, nghiễm nhiên không phải bạn phải chờ 1 tháng sau mới test được, hoặc như sanbox là khoảng 5 phút sẽ auto renewal đối với gói 1 tháng. Đối với StoreKit configuration file thì bạn hoàn toàn có thể tuỳ chọn thời gian.<br>
Bạn có thể thực hiện, click Configuration file, Editor -> Time Rate -> Chọn thời gian ứng với một ngày tuỳ ý.<br>
![](https://images.viblo.asia/ca0dd622-3d18-48b7-add7-c829818afcf2.png)<br>
Và lúc này, khi mua lần đầu xong, mình hoàn toàn có thể dự vào thời gian mình cấu hình để xem việc tự động mua hàng có tiếp tục diễn ra hay không bằng cách mở Transactions Manager.

## Kiểm tra việc mua bị gián đoạn
Để thực hiện, bạn click Configuration file, Editor -> Enable Interrupted Purchases -> Run app. Lúc đó khi mua hàng, bạn mở Transactions Manager lên thì sẽ thấy quá trình mua thất bại.<br>
![](https://images.viblo.asia/f03947bf-0496-45d6-b53c-9dc01ec969a0.png)<br>
# Bật Ask To Buy
Storekit Configuration file cho phép bạn có thể bật Ask to buy. Để bật chức năng này, tại StoreKit Configuration file chọn Editor > Enable Ask to Buy.<br>
![](https://images.viblo.asia/5fa81fbb-6abb-4748-b05e-9557d34e63eb.png)<br>
Tại The Transactions Manager, bạn có thể Approve Transaction hoặc Decline transaction.<br>
![](https://images.viblo.asia/4c104985-4f9d-4d08-871d-5a02a6cd6afc.png)<br>
# Thay đổi Default Localization
Trong phần Localizations của Storekit Configuration file, bạn có thể thêm các locatlization bằng cách bấm vào nút "+". Ở đây mình ví dụ mình thêm Localizations là Japanese với Display name là "車" và Description là "これは車です".<br>
![](https://images.viblo.asia/55b5b345-78c9-494e-a3f2-42128d25adb1.png)<br>
Để thay đổi default localization. Chọn Editor > Default Localization > Japanese. Khi đó lúc mua hàng thì sẽ bản địa hoá được ngôn ngữ như sau:<br>
![](https://images.viblo.asia/c06a42fe-e30b-45dc-8bf9-851846e927eb.png)<br>
# Kết luận
Ở bài viết này, mình đã hướng dẫn các bạn tạo Storekit configuration file để kiểm tra việc mua hàng trong ứng dụng, giúp tốc độ phát triển dự án của bạn có thể đẩy nhanh hơn. Hy vọng bài viết này có thể cho các bạn cái nhìn tổng quan và hiểu được cách làm việc với Store configuration file trên Xcode 12.