Ngày nay chúng ta dễ dàng bắt gặp những ứng dụng free kiếm tiền bằng cách bán các gói nâng cấp tài khoản để gỡ bỏ hiển thị quảng cáo trong app, hoặc để unblock một số tính năng giới hạn, mua bán các Diamond, Gem (trong Game),... Vì vậy, để tạo sự tiện lợi, nhanh chóng, tin cậy, bảo mật cho người dùng, Apple và Google Store đã tạo ra hệ thống trung gian mua bán các sản phẩm trên các ứng dụng mà mình quản lý và kiểm soát. Mặt khác, việc làm bên thứ 3 trung gian khiến cho dòng tiền từ người dùng đến người bán luôn bị chiết khấu theo % nhất định, rõ ràng là số tiền không hề nhỏ và Apple, Google không muốn bỏ qua dòng tiền này rồi :v.

### 1. Các dạng Product trên Store:

Apple cung cấp cho Developer 1 API gọi là In-App Purchase, còn bên Google Store gọi là In-App Billing để đa dạng hoá hệ thống mua bán sản phẩm và dịch vụ. Có 4 dạng sản phẩm:

- **Consumable**: Người dùng có thể mua 1 hoặc nhiều lần, không giới hạn thời gian. Ví dụ: mua Diamond, Gem, lượt chơi hay mua thêm lượt để tiếp tục chơi game, v.v
- **Non-Consumable**:  Người dùng mua 1 lần và sử dụng mãi mãi. Ví dụ: các sticker trong ứng dụng chat, các vòng chơi bí mật trong Game, v.v 
- **Subscription**: Người dùng có thể mua và sử dụng trong khoảng thời gian cố định, đặc biệt tự động gia hạn khi hết hạn nếu người dùng không huỷ gói đã mua. Ví dụ: gói phim của Netflix, Elsa, v.v
- **Non-Renewing Subscription**:  Giống y hệt Subscription nhưng không tự động gia hạn khi hết hạn.

Với 4 loại trên có lẽ chúng ta có đầy đủ các phương thức để thiết lập thanh toán cho ứng dụng của mình, giờ bắt đầu vào thiết lập cho từng hệ điều hành thôi.

### 2. Setup Ios: 

Đầu tiên truy cập trang [Apple Connect User](https://appstoreconnect.apple.com/login).

**1. Set up Bank Account**:

Bạn cần phải cung cấp đầy đủ thông tin từ tài khoản ngân hàng, thuế, thanh toán và đồng ý các điều khoản với Apple. Xem chi tiết tại [đây](https://help.apple.com/app-store-connect/#/devb6df5ee51)

Sau khi truy cập trang Apple Connect User, bạn chọn tiếp **Agreements, tax, and banking** (biểu tượng ở dưới)

![](https://images.viblo.asia/580ac5e9-a1a6-4918-9240-474e7e729999.png)

**Lưu ý**: Sau khi bạn điền đầy đủ thông tin và được Apple review xong mới có thể fetch danh sách sản phẩm trên Store xuống ứng dụng được.

**2. Enable IAP Capability in XCode**:

![](https://images.viblo.asia/2903f754-d692-444f-bee6-2ce737c7b314.png)

### 3. Setup Android:
Play Store [Billing](https://developer.android.com/google/play/billing/billing_overview) sẽ không hoạt động cho đến khi bạn update 1 bản release Alpha track.

![](https://images.viblo.asia/e6a6bcdf-db01-4921-b71c-d3e3fd04c8f3.png)

Xin quyền trong file **AndroidManifest.xml**
```
<uses-permission android:name="com.android.vending.BILLING" />
```

### 4. Setup Flutter:
Thêm plugin vào dependencies trong file **pubspec.yaml** của bạn:

![](https://images.viblo.asia/3602c326-ca1e-4c88-a0a7-a934d0f7a315.png)

Vậy là xong phần thiết lập rồi, các bạn hãy đón chờ phần tiếp theo mình sẽ đi sâu vào phần code nhé!