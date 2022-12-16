# 1. Lời mở đầu
Ứng dụng mobile ngày càng phát triển và phức tạp. Những ứng dụng phát triển bằng framework JavaScript thường hay gặp phải vấn đề về hiệu năng khi phát triển thêm các tính năng mới hoặc các tính năng phức tạp. Điều đó khiến cho các lập trình viên ngày càng đau đầu để giải quyết các vấn đề liên quan trong ứng dụng.
# 2. Giới thiệu Hermes
Hiểu được điều đó, tại hội nghị [Chain React 2019](https://infinite.red/ChainReactConf) mới đây, Facebook đã giới thiệu Hermes - JavaScript engine (hay còn gọi là "Hơ Mẹt", nghe quen quen giống như cái túi xách hàng hiệu gì ấy :)). Nhưng thực ra Hermes là 1 open-source JavaScript engine được tích hợp vào React Native version 0.60.2 tối ưu việc chạy ứng dụng React Native trên Android. 

Việc sử dụng Hermes được giới thiệu là có các lợi ích sau đây:

* Giảm thời gian tương tác, cải thiện thời gian start-up
* Giảm kích thước ứng dụng
* Giảm bộ nhớ sử dụng 

Dưới đây là hình ảnh mà các nhà phát triển đưa ra để cho thấy sức mạnh của Hermes.
![](https://images.viblo.asia/af2a514f-0be1-45db-84f2-324387690645.jpg)

Mình cũng đã thử đo kích thước của ứng dụng mới khởi tạo khi không và có tích hợp Hermes như 2 hình dưới đây.

Đây là kích thước file apk khi không có Hermes.
![](https://images.viblo.asia/9099507d-1d41-4447-b1d8-c8581949efb7.png)

Đây là kích thước file đã tích hợp Hermes.
![](https://images.viblo.asia/bca515b6-d77a-4fb7-8db5-a9f03ef5e1b5.png)
# 3. Kiến trúc Hermes
Những hạn chế của thiết bị di động, chẳng hạn như bộ nhớ RAM và bản flash chậm dần đã khiến các nhà phát triển hướng đến ra mắt 1 kiến trúc nhất định để tối ưu hóa môi trường phát triển và Hermes được xây dựng dựa trên:

* Tiền biên dịch Bytecode

    Thông thường, JavaScript engine sẽ phân tích source JavaScript sau khi nó được load rồi generating bytecode. Bước này delay lúc JavaScript bắt đầu thực thi. Để skip bước này, Hermes sử dụng 1 compiler, chạy như 1 phần trong quá trình build ứng dụng di động. Và từ đó sẽ có nhiều thời gian hơn để tối ưu hóa mã byte, do đó mã byte sẽ nhỏ hơn và hiệu quả hơn. Bytecode được thiết kế trong runtime, nó có thể được ánh xạ vào bộ nhớ mà không cần đọc toàn bộ file. Bộ nhớ flash I/O làm tăng đáng kể độ trễ trên nhiều thiết bị tầm thấp và trung cấp, do đó chỉ tải bytecode từ flash khi cần và tối ưu hóa bytecode dẫn đến cải thiện thời gian start-up của ứng dụng. 
![](https://images.viblo.asia/ecb7da92-f5e2-4bf3-b9ae-22c3dedce7a1.gif)
* Chiến lược thu dọn rác

Trên các thiết bị di động, việc sử dụng bộ nhớ là quan trọng. Với những thiết bị có bộ nhớ hạn chế, việc các hệ điều hành kill các ứng dụng sử dụng quá nhiều bộ nhớ thường xuyên xảy ra. Khi ứng dụng bị tắt, cần khởi động lại chậm và chức năng chạy ở background bị ảnh hưởng. Để giảm thiểu bộ nhớ và không gian địa chỉ ảo được sử dụng bởi engine, trình thu dọn rác có các tính năng:

   -   Phân bổ theo yêu cầu: Chỉ phân bổ không gian địa chỉ ảo theo khối khi cần thiết
   -   Không gian địa chỉ ảo không cần nằm trong 1 phạm vi bộ nhớ duy nhất, để tránh các giới hạn tài nguyên trên cac thiết bị 32-bit
    - Có thể di chuyển các đối tượng có nghĩa là bộ nhớ có thể bị phân mảnh và các khối không còn cần thiết được trả lại cho hệ điều hành. 
    - Không quét toàn bộ bộ nhớ heap của JavaScript mỗi lượt thu dọn rác để giảm thời gian thu dọn rác.

# 4. Tích hợp Hermes vào project React Native
* Sửa file *android/app/build.gradle* và thay đổi như sau:
```js
 project.ext.react = [
      entryFile: "index.js",
-     enableHermes: false  // clean and rebuild if changing
+     enableHermes: true  // clean and rebuild if changing
  ]
```

* Tiếp theo, nếu bạn đã build app ít nhất 1 lần, clean build nhé:
```js
$ cd android && ./gradlew clean
```

* Ok rồi đó. Bây giờ bạn có thể chạy thử ứng dụng lên 
```js
$ react-native run-android
```

Xác nhận Hermes trong project

Bạn sẽ nhìn thấy Hermes được bật như sau, hãy để ý phần góc trên phía bên phải có đoạn **Engine: Hermes**
![](https://images.viblo.asia/6c7da283-493f-46a8-bf6a-02e8895227f4.png)
Biến global **HermesInternal** sẽ available trong JavaScript để xác minh rằng Hermes được sử dụng:
```js
const isHermes = () => global.HermesInternal != null;
```
Nếu để ý file **App.js** khi mới tạo project mới bắt đầu từ phiên bản 0.60, bạn sẽ thấy để biết rằng Hermes đã được bật hay chưa như hình phía trên bằng cách sau:

![](https://images.viblo.asia/f56b4241-89a7-4f65-af9d-e8ee15cd9bf1.png)
Để xem những lợi ích của Hermes, hãy thử tạo bản build release/deployment để so sánh:
```js
$ react-native run-android --variant release
```
Biên dịch JavaScript thành mã byte trong thời gian build nhằm cải thiện tốc độ khởi động ứng dụng trên thiết bị 

# 5. Debug Hermes sử dụng Google Chrome DevTools 
Hermes hỗ trợ Chrome debug bằng cách sử dụng giao thức Chrome inspector. Điều đó dồng nghĩa với việc các Chrome tools có thể được sử dụng để debug trực tiếp JavaScript đang chạy trên Hermes, trên emulator hoặc trên thiết bị 

Chrome kết nối với Hermes chạy trên thiết bị thông qua Metro, thông thường tại localhost:8081. Hoặc bạn có thể config theo hướng dẫn [này](https://facebook.github.io/metro/docs/en/configuration)

Connect Hermes với Chrome theo các bước:

1: Gõ *chrome://inspect* trên browser trình duyệt 

2: Click button **Configure...** để thêm địa chỉ server Metro(thường là *localhost:8081*)
![](https://images.viblo.asia/c4dc7c80-f95f-4aaf-a7ce-0bc539dd5c31.png)

3: Bạn sẽ nhìn thấy "*Hermes React Native*" target với link "*inspect*" để chuyển đến phần debug. Nếu không thấy link "inspect" hãy đảm bảo rằng Metro server đang chạy.

![](https://images.viblo.asia/38a2c532-6ce3-43ab-bd37-dd4d5455d257.png)

4: Bây giờ bạn có thể sử dụng Chrome debug tools để debug ứng dụng của mình

# 6. Lời kết
Do mới ra mắt thời gian gần đây nên việc sử dụng Hermes vào trong dự án có vẻ là khá mới mẻ nên chắc chắn sẽ cần thêm một khoảng thời gian nữa để nó được áp dụng rộng rãi vào các dự án lớn và có thể kiểm nghiệm được những giá trị mà nó mang lại. 

:point_right:Bài viết đến đây là hết rồi, nếu cảm thấy bài viết hữu ích :ok_hand:, có thể đăng nhập và like cho mình nhé :+1:. Nhớ folow để xem các các bài viết sắp tới của mình nhé. Thanks! :handshake:

Tham khảo

https://facebook.github.io/react-native/docs/hermes

https://code.fb.com/android/hermes/

https://infinite.red/ChainReactConf