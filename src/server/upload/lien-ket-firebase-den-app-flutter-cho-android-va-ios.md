Chào anh em đây là bài viết đầu tiên của mình hy vọng có thể giúp ích được cho anh em dễ dàng cấu hình Firebase vào các dự án Flutter của mình. Mình sẽ đi thẳng vào vấn đề chính luôn cho nhanh gọn lẹ.
# 1. Tạo project Firebase:
   Điều này là dĩ nhiên rồi không có nó làm sao mà liên kết được =)). Click vào **New project**.
    
   ![](https://images.viblo.asia/5d01a3d3-f7d0-4b14-b8c2-972ee08babdf.png)
   ![](https://images.viblo.asia/5d01a3d3-f7d0-4b14-b8c2-972ee08babdf.png)

    
   Nhập tên project mới và chọn **continue**.
    
   ![](https://images.viblo.asia/0751489d-1ec0-444b-81d3-458eb4b6a259.png)
    
   Ở phần này anh em có thể enable hoặc không chế độ Analys project của Google và sau đó nhấn chọn **Create project**. 
   Đơn giản phải không anh em, tiếp theo mình sẽ tiến hành thêm Android và iOS vào trong project.
# 2. Thêm Android vào project Firebase:
   Anh em chọn vào icon Android để thêm Android vào project Firebase mới tại nhé.
    
   ![](https://images.viblo.asia/8f8335ff-c44f-4379-a42f-aece5a439136.png)
    
   Sau đó điền các thông tin lấy ra từ project Flutter và điền vào thôi.
    
   ![](https://images.viblo.asia/c936f8df-52b9-4708-95f0-ea51b153f3fa.png)
    
   Bao gồm các thông tin về package, SHA1 và nick name của Project sau khi hoàn thành thì click vào Register app. Bước  tiếp theo thì anh em sẽ phải tải file google-services.json và import vào trong project Flutter như ảnh bên dưới.
    
   ![](https://images.viblo.asia/7a3a3837-ba2f-44c1-a9cf-077f14f14777.png)
    
   Tiếp đến là cấu hình build.gradle theo hướng dẫn.
    
   ![](https://images.viblo.asia/06cf54b7-8252-482d-986b-49714bf5d74b.png)
    
   Chọn **Next** và **Continue** ở màn hình sau đó, thế là xong phần cấu hình cho Android.
# 3. Thêm iOS vào project Firebase:
   Ở bước đầu cũng giống như Android anh em cũng click vào icon iOS thay vì icon Android. 
    
   ![](https://images.viblo.asia/69b56806-7229-4336-ba4e-ec9f4f9459ef.png)
    
   Để lấy Bundle id app anh em làm như sau: vào Android studio (nếu đang dùng để code Flutter) chuột phải vào folder iOS và chọn **Flutter** -> **Open moduleinXcode**
    
   ![](https://images.viblo.asia/64684ce7-c125-4b99-9e3f-813e1ffb53f9.png)
    
   Ở Xcode, chọn thư mục Runner ở Root -> trong General, các bạn sẽ tìm thấy bundle identifier, nó chính là bundle id.
   Sau đó quay lại Firebase console, nhập bundle Id và tìm được -> click **Register app**
   Tiếp theo tải file GoogleService-Info.plist ở bước kế tiếp.
     
   ![](https://images.viblo.asia/b696881c-74cd-42b6-8824-c9dd1c34c2a9.png)
     
   File tải về phải được bỏ vào thư mục Runner/Runner.
    
   ![](https://images.viblo.asia/2c2a86fa-3820-4aa2-ac54-9cfc26e21a3d.png)
    
   Anh em tiến hành cấu hình như hình trên.
    
   Ở bước add SDK anh em nên build App lên điện thoại để quá trình kết nối giữa iOS và Firebase diễn ra, nếu thành công thì sẽ hiển thị theo bên dưới.
    
   ![](https://images.viblo.asia/b6038e91-1619-4e0f-85c8-61ee209676aa.png)
   ##     Cuối cùng
   Vậy là mình đã cấu hình xong Firebase cho project Flutter trên android lẫn iOS, cảm ơn anh em đã xem hy vọng ít nhiều sẽ giúp được anh em, nếu có thiếu xót gì thì anh em comment bên dưới để mình cải thiện nhé <3.
###    Bạn có thể tham khảo :
   >    https://firebase.google.com/docs/android/setup
   >    https://firebase.google.com/docs/ios/setup