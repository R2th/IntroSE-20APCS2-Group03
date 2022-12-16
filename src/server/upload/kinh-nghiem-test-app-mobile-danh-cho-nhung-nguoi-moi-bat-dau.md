**Như các bạn đã biết, thế giới của con người chúng ta đang ngày càng phát triển mạnh mẽ và gắn liền với các công nghệ cực kì hiện đại. Và SMART PHONE là một thứ không thể thiếu trong cuộc sống hiện đại ngày nay.**

**Là 1 QA ( Tester), chúng ta cùng thử đặt mình là USER để xem với một dự án phần mềm phát triển về APP (Mobile) thì cần thực hiện TEST những gì nhé!**
![](https://images.viblo.asia/8450efa1-96c4-4623-930b-e537349e04e5.JPG)


## I, XÁC ĐỊNH ĐỐI TƯỢNG TEST CỤ THỂ:

Khi dự án bắt đầu phát triển, chúng ta cần phải xác định rõ với khách hàng hoặc với PM ( người quản lý dự án) là với APP này, QA sẽ cần thực hiện test: 
- Trên những device Android và device IOS nào: Samsung Galaxy, Pixel, HTC, IP6s+, IP11, IP8, Ipad...
-  Hệ điều hành bao nhiêu: OS 8.0 , 9.0, 10.0, 11.0....
-  Kích thước màn hình thế nào: 4.0 inch, 4.5 inch....
<br> => Bởi trên thị trường hiện nay đang có rất nhiều dòng máy, version khác nhau. Là QA chúng ta ko thể test hết được tất cả các lọai Device, hơn nữa do nguồn tài chính của công ty có hạn, chỉ cung cấp được những Device chính và chủ yếu để thực hiện test. Vì vậy, viêc xác định rõ thiết bị test là điều RẤT QUAN TRỌNG để tránh giai đoạn UAT khách hàng có thể log bug cho những Device ngoài phạm vi yêu cầu bên mình test, đem lại những **đánh giá không tốt về mối quan hệ giữa 2 bên.**
## 
## II, NHỮNG ĐIỂM CẦN LƯU Ý KHI TEST APP: 
### 1, Test về Giao Diện (UI) 
![](https://images.viblo.asia/8cb85b7e-1bca-4e09-aec1-7509770ee773.jpg)
- UI là yếu tố đóng góp **LỚN NHẤT** để đạt được thành công cho dù đó là Native or Hybrid app. Bản thân chúng ta ai cũng thích cái ĐẸP, vì vậy một ứng dụng thân thiện với giao diện người dùng chắc chắn sẽ bán được nhiều hơn khi so sánh với một ứng dụng được phát triển tốt nhưng có giao diện người dùng khó chịu.
- Giao diện đồ họa chính là điều tạo ra sự khác biệt giúp người dùng cảm thấy thích thú và được tương tác khi sử dụng ứng dụng. Không phải nói đâu xa, chúng ta có thể kể đến: Now, Grab, Shopee, Lazada, Tiki, Sendo, Ví MOMO, Zalo Pay, Airpay .... Đây đều là những ứng dụng nổi tiếng nhất trên thị trường ngày nay. Nó mang lại cho con người một **cuộc sống vô cùng tiện ích và dễ dàng hơn.** 
- Test App thì nên được thực hiện trên ít nhất 3 phiên bản hệ điều hành khác nhau. Vì vậy chúng ta cần confirm với khách và chốt xem test trên những device nào nhé. Một điều quan trọng nữa là khi Test nếu cảm thấy UI **chưa thân thiện** với User, chúng ta nên suggest khách hàng những phương án hợp lý hơn . **Đừng ngại ngần gì nhé!**
### => Test giao diện cần chú trọng các điểm sau: 
- Màu nền, màu chữ, font chữ, font size của text box, button, border, background có đúng với Design hay không?
 <br> +   Không nên quá lớn hoặc quá nhỏ. 
<br> +  Các button cho các chức năng giống nhau nên có cùng màu sắc.
-  Các text, tooltip của message có thân thiện với User không, ví dụ như:  Màu đỏ được sử dụng cho thông báo Lỗi, Màu xanh lá cây biểu thị thành công, Màu vàng cho cảnh báo và Màu xanh lam cho hyperlinks....
- Kiểm tra vị trí focus khi user touch vào các field.
- Các hiệu ứng cảm ứng như touch, swipe left/ right, scroll up/down, zoom in/out , xoay ngang, dọc có smooth không? 
- Bàn phím có ẩn khi tap ra ngoài vùng khác hay không? 
- Vị trí các button phải đảm bảo không bị chồng chéo hay bị stuck ( bị đơ), không có vùng text/control nào không thể nhìn thấy hoặc không truy cập được khi version hay kích thước màn hình khác nhau.
- Check các trường (các field) khi input với data = maxlength, > maxlength thì có bị vỡ layout không? Với các device màn hình nhỏ hơn thì thế nào? 
### 2, Test về Chức Năng (Functional testing)

![](https://images.viblo.asia/1031c6c6-3e9b-43f7-a288-5ad47512d050.jpg)

- Check khi bản build mới được install có bị crash app lần đâu không ? 
- Check khi app khởi động và dừng lại có đúng với yêu cầu không?
- Check các trường bắt buộc có thực hiện đúng yêu cầu hay không?
- Check các button, các icon điều hướng và hoạt động bình thường không ? 
- Check các chức năng được mô tả trong spec có hoạt động tốt không? 
- Đảm bảo các button/icon [<] /back quay lại các màn trước đó. 
- Xác nhận app cho phép dịch chuyển (scroll) màn hình 
- Check sự đồng bộ dữ liệu khi LOGIN ở nhiều thiết bị khác nhau ( Andoid, IOS, Tablet...) 
- Check xem khi thay đổi cài đặt về ngôn ngữ, về ngày tháng, App có hoạt động tốt hay không? 
- Check xem App sẽ thế nào khi có cuộc gọi đến: có notification đẩy về không? đang dùng app thì có nhận được sms hay không? 
- Test các chức năng khi mất kết nối wifi, 3G, 4G, chế độ máy bay....thì sẽ như thế nào, có báo lỗi không? 
- Check phần hướng dẫn cài đặt App phải dễ hiểu và thân thiện vs user, không nên mang nhiều từ ngữ thuật ngữ chuyên ngành IT. Sao cho với đối tượng User không biết gì cũng có thể cài đặt được.
- Các button, check khi bấm nhanh và bấm giữ nút 1 lúc xem có hoạt động bình thường không? 
- Check ảnh hưởng của việc sạc trong khi đang dùng ứng dụng xem có hoạt động bình thường không? 
- Các lần cập nhật thường xuyên của phiên bản như android 4.2, 4.3, 4.4, iOS 5.x, 6.x... với mỗi lần cập nhật đều cần đảm bảo sao cho không có chức năng nào bị ảnh hưởng.
- Check app xem khi Update version mới thì có sử dụng được bình thường hay không? Nếu không update version mới nhất thì sẽ thế nào. 
 
### 3. Test về Bảo Mật và Hiệu Năng ( Performance + Security testing)
![](https://images.viblo.asia/9335fb50-af94-46aa-a4d7-6ef6a9819174.png)
- Những chức năng liên quan đến Password thì luôn phải hiện thị ở dạng mã hóa. 
- App nên giới hạn thời gian quản lý session để ngăn người dùng chưa được xác thực truy cập vào thông tin: Với những app liên quan đến việc thanh toán, đến ví tiền thì càng cần phải chặt chẽ hơn nếu không dùng app hoặc kill app thì sẽ phải logout ra để bảo mật, user không bị mất tiền hay bụ lấy cắp thông tin cá nhân. 
-  Ngăn chặn những cuộc tấn công bằng hình thức chèn mã SQL.
-  Check xem thời gian phản hồi của app có đúng theo yêu cầu không.
- Check hoạt động của app khi network thay đổi từ wifi sang 2G/3G và ngược lại.
- Check hệ thống khi truy cập từ rất nhiều người dùng cùng lúc xem có hoạt động bình thường không.
- Check hiệu suất của network như thế nào khi cầm thiết bị và di chuyển.

<br>

**Trên đây là những kiến thức cũng như kinh nghiệm mà mình đã trải qua. Hy vọng rằng nó sẽ giúp ích cho các bạn nhé! Chúc các bạn luôn thành công trong cuộc sống!**

<br> Nguồn tham khảo: 
 <br> https://www.guru99.com/testing-mobile-apps.html
<br> https://www.softwaretestinghelp.com/ios-android-ui-testing/