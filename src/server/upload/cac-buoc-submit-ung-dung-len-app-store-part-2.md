# Tóm tắt
Trong bài trước mình đã giới thiệu cách để tạo Certificate, provisioning để chuẩn bị cho việc build App. https://viblo.asia/p/cac-buoc-submit-app-len-app-store-XL6lAn6D5ek
Trong bài này chúng ta sẽ tiếp tục các công việc để upload ứng dụng lên TestFlight.

# Tổng quan
Để upload ứng dụng lên App Store trước tiên bạn cần cung cấp đầy đủ thông tin về ứng dụng và submit lên TestFlight. Các tester của Apple sẽ test ứng dụng để đánh giá có phù hợp với rule để được upload lên App Store. Nếu được Approve, ứng dụng của bạn sẽ sẵn sàng có mặt trên AS. Ngược lại bạn phải thay đổi để phù hợp và tiếp tục chờ đợi các vòng tiếp theo.
Thông tin cần chuẩn bị:
- Tên ứng dụng
- Nội dung giới thiệu ứng dụng
- App Icon (1024 x 1024)
- Ảnh chụp màn hình ứng với tấc cả thiết bị hỗ trợ (thông tin về kích thước màn hình https://help.apple.com/app-store-connect/#/devd274dd925)

# Tạo App trên Itunes Connect
   iTunes Connect là công cụ trên web để quản lý nội dung được bán trên iTunes Store, App Store, Mac App Store và iBook Store. Là các nhà phát triển ứng dụng, bạn sẽ sử dụng công cụ này để quản lý ứng dụng, hợp đồng, thuế, thông tin thanh toán, báo cáo bán hàng…
Khi bạn đăng ký là nhà phát triển ứng dụng, bạn sẽ được truy cập vào iTunes Connect, sử dụng Apple ID, Password, quản lý sản phẩm…
Nói cách khác Itunes connect là nơi giúp bạn quản lí ứng dụng của bạn trên App Store. Vậy trước tiên, bạn phải tạo ứng dụng của mình trên Itunes connect.

- 1: Đăng nhập tài khoản Apple Id bạn đã dùng để tạo Certificate và provisioning ở phần trước  (https://itunesconnect.apple.com/)

2: click vào icon +
 ![](https://images.viblo.asia/56e86153-d755-428d-bc24-5e188f05878b.png)
 
 - 3: Click icon My App

 ![](https://images.viblo.asia/e52d441d-6485-479f-b475-4e330538ad44.png)
 
  - 4: Chọn option new App

 ![](https://images.viblo.asia/999d72c4-468b-48f3-bf13-ae428dfeac64.png)
 
  - 5: Chọn Flatform cho App (ios / tvOS)  và điền tên App, ngôn ngữ, Bundle Id và chọn Create

 ![](https://images.viblo.asia/3f7c7b0e-6fc1-48f1-a47f-757e232a8272.png)
 
  - 6: Chọn Category
 ![](https://images.viblo.asia/e172420c-bde1-442d-8367-5ba590280fda.png)
 
 7: Upload ảnh chụp màn hình
 ![](https://images.viblo.asia/aacd8396-3bd5-47ef-972c-c9adc272df0c.png)
 
 8: Nhập thông tin giới thiệu về App
 ![](https://images.viblo.asia/cd6098d6-8f6e-4c5d-b7f2-1ef7b3156fd1.png)
 
 ![](https://images.viblo.asia/e71580ad-8bdc-4c5a-a8a4-85b2e59a1c0e.png)
 
 
##   Archive App trên Xcode
 Sau khi tạo App trên Itunes connect, việc tiếp theo cần làm là build ứng dụng và upload lên TestFlight để tester của Apple kiểm tra.
Thực hiện: 
1: Mở Xcode chọn Generic iOS Device trên mục Scheme.
![](https://images.viblo.asia/a28e8765-d141-44eb-9a6c-0746c6c86808.png)

2: Product > Archive
![](https://images.viblo.asia/610aeaaa-f932-4f61-82c9-17a7c186086c.png)


3: Next >
![](https://images.viblo.asia/1b22b3f3-658d-480e-a1fd-8e008b2cf086.png)

4: Trong màn hình tiếp theo chọn vào nút "Upload to App Store"
![](https://images.viblo.asia/2170a843-3fc9-4ac9-9053-8704b3185ba2.png)

5:Chờ quá trình upload hoàn tất
![](https://images.viblo.asia/e544251b-2ad7-4fbc-a14e-80654842cfb6.png)

6: Sau khi upload thành công thông báo sẽ xuất hiện App của bạn đã được upload thành công lên iTunes Connect
![](https://images.viblo.asia/92403701-98fe-48db-b0a0-87d7b74b0a38.png)

7: Mở iTunes Connect > Ứng dụng bạn đã sẵn sàng để Summit để Review (Submit for review)
![](https://images.viblo.asia/a019dc93-4d1d-40c8-aa03-d3b49cdc9a35.png)

# Tổng kết
  Mình vừa hướng dẫn các bạn cách để tạo App trên Itunes connect và upload ứng dụng để thực hiện Beta Test. Sẽ mất khoảng 3 ngày để các tester của Apple kiểm tra, sau khi được Approve bạn sẽ được phép đăng ứng dụng lên App Store. Ngược lại, bạn phải sữa lại để phù hợp với các Rule mà Apple qui định. Chúc bạn upload ứng dụng thành công !

Xem part 1: https://viblo.asia/p/cac-buoc-submit-app-len-app-store-XL6lAn6D5ek