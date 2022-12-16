### Nội dung

- Giới thiệu
- Cài đặt InAppPurchase
- Kết Luận

### Giới thiệu

![](https://images.viblo.asia/9c8428e6-04fb-41e2-b8ce-c6dea1332a89.jpg)

Có thể nói mobile đang và sẽ là xu thế. Việc thanh toán qua mobile là điều tất yếu và đã có rất nhiều phương thức thanh toán như: qua cổng thanh toán (ví dụ: VNPay), qua ví điện tử (ví dụ Momo), qua tổng đài dịch vụ... và đặc biệt trên iOS có một phương thức thanh toán gần như bắt buộc trong một số trường hợp đó là InAppPurchase. 

**Nào chúng ta cùng tìm hiểu nhé!**

### Giới thiệu về InAppPurchase

InAppPurchase là phương thức thanh toán được cung cấp bởi Apple mà hỗ trợ bên cung cấp dịch vụ (nhà phát triển) sử dụng để nhận thanh toán từ người sử dụng trong một số trường hợp: mua bản tính năng đầy đủ của App, mua các item vật ảo trong app, mua thêm nội dung hiển thị trên app,...

### Cài đặt InAppPurchase

#### Creating an App ID
Chúng ta cùng tạo App ID cho ứng dụng của mình qua các bước như sau:

![](https://images.viblo.asia/b57ee92b-7e67-47a2-9332-0e4d01a695f2.png)

![](https://images.viblo.asia/0b17e6c8-df70-4144-9251-b9deb6ac33de.png)


#####  Checking Your Agreements

Sau đó bạn cần kiểm tra và đồng ý với các điều khoản của Apple về 

-  Apple Development Program License Agreement on developer.apple.com.
-  Paid Applications agreement in the Agreements, Tax, and Billing section trên App Store Connect.

Nếu bạn không hoàn thành thì sẽ thường xuyên nhận được thông báo của Apple như hình dưới đây:

![](https://images.viblo.asia/680f7fc0-9161-4910-b116-ebc975862534.png)

#### Creating an App in iTunes Connect

Tiếp theo chúng ta cần tạo App trên iTunes Connect qua lần lượt các bước sau:
Click vào **My Apps** sau đó chọn **+**

![](https://images.viblo.asia/508949d1-c04e-435a-ab54-9fd50669adb9.jpeg)

Lưu ý khi điền tên App thì chúng ta không được điền tên đã xuất hiện trên Appstore(bị trùng tên)

![](https://images.viblo.asia/19f831df-7e2d-4bb0-a7b9-bf99e3ba5ddb.png)

Sau đó bạn bấm vào nút **Create** để hoàn thành.

#### Creating In-App Purchase Products

Apple quy định các loại Products để thanh toán theo các mục đích khác nhau. Dưới đây  là 4 loại products mà bạn có thể thêm vào tính năng thanh toán IAP:
- Consumable: Với Product này thì bạn có thể mua nhiều lần, và có thể sử dụng hết. Ví dụ: mua thêm các vật phẩm trong game, thêm tính năng tạm thời hoặc like.
- Non-Consumable: Với Product này bạn chỉ có thể mua một lần và tồn tại mãi mãi. Ví dụ: thanh toán phí gia nhập thành viên mới trong ứng dụng, mua bản Pro cho game hoặc App...
- Non-Renewing Subscription: Nội dung này bị giới hạn về thời gian, việc mua dựa trên việc gia hạn thời gian (khoảng thời gian được chỉ định trong iTunes conect).
- Auto-Renewing Subscription: Ngược lại với bên trên, với Product này thì đăng ký không thể gia hẹn và chỉ tồn tại một lần và hết hạn. 

Chúng ta cùng thực hiện các bước sau để tạo Products cho In-App Purchase: 

![](https://images.viblo.asia/53625a4b-76b1-4697-9f6b-0e25173a3922.png)

![](https://images.viblo.asia/fc4e3172-21f2-495a-9ac7-5e60f8518df8.png)

Sau đó bạn sẽ điền tiếp các thông tin yêu cầu như:

**Reference Name**:  Tên của IAP trong iTunes Connect. 
**Product ID**: Đây là định danh duy nhất của IAP, khi bạn đã tạo thì cho dù xoá đi bạn cũng không thể tạo lại nó. Bạn có thể đặt theo quy tắc: Bundle ID và sau đó là tên của Product. Ví dụ: com.theNameYouPickedEarlier.razefaces.swiftshopping.
**Cleared for Sale**:  Bạn có thể Enables hoặc disables sale cho IAP.
**Price Tier**: Giá của IAP

Vậy là bạn đã tạo xong In-App Purchase Products, tiếp đến chúng ta sẽ tạo tài khoản user test.

#### Creating a Sandbox User

Lưu ý email bạn đã tạo cho tk Apple thì bạn sẽ không sử dụng để tạo tài khoản user test.

![](https://images.viblo.asia/43a782c8-d3ca-4d68-b59e-9623120a8826.png)


### Kết Luận

In-App Purchase là một trong những tính năng rất tuyệt vời giúp cho chúng ta dễ dàng tích hợp tính năng thanh toán vào trong ứng dụng . Trong phần 1 chúng ta chủ yếu tìm hiểu về các khái niệm và cài đặt chung. Chúng ta sẽ tiếp tục đi sâu hơn vào phần 2 các bạn nhé!

**Cám ơn bạn đã dành thời gian cho bài viết!**

##### _Nguồn:_

[https://www.raywenderlich.com/5456-in-app-purchase-tutorial-getting-started](https://www.raywenderlich.com/5456-in-app-purchase-tutorial-getting-started)