Xin chào các bạn,
Với một developer chắc hẳn bạn đã từng sử dụng qua các thư viện mở được chia sẽ trên internet. Bạn có một ứng dụng và cũng muốn chia sẽ như một thư viện cho mọi người dùng. Bài viết này sẽ hướng dẫn tạo một thư viện Android  một cách dễ nhất

Một thư viện cũng giống như một ứng dụng bình thường, chỉ khác là nó được đóng gói lại. Nó bao gồm các thứ của một project như file resource, file manifet hoặc thậm chí một thư viện khác. Thay vì biên dịch tạo thành một file APK, nó biên dịch thành Android Archie (AAR) file, vì thế bạn có thể dùng nó cho một dự án khác.

Để tạp library module bạn làm theo cách sau: 
Vào File > New > New Module.
In the Create New Module window that appears, click Android Library, then click Next.
Ở màn hình tạo Module mới xuất hiện, bạn chọn Android Library, sau đó nhấn Next.
![](https://images.viblo.asia/3f707738-72d6-4431-aedf-f1c63d02f6ae.PNG)

Sau khi hoàn tất bạn sẽ thấy thư viện mình đã tạo <br/>
Ở đây mình đã tạo thư viện tên **AwesomeToast**

![](https://images.viblo.asia/8aecd929-fa7f-4aa7-a597-acb5d65073ca.PNG)

Bát tay code thư viện thôi.
Thư viện này mình sẽ demo tạo 1 hàm với chức năng show Toast
Bạn lưu ý, tạo file mới trong module thư viện nhé
![](https://images.viblo.asia/8bd4621d-5481-4013-95bb-a288bd08ae7d.PNG)

Để sử dụng được thư viện thì bạn phải thêm nó vào trong build.gradle của app. 
Bạn thay thế **AwesomeToast** với tên thư viện bạn đặt nhé
```
    implementation project(":AwesomeToast")
```
![](https://images.viblo.asia/5cdd848e-e81c-4bf9-8e37-095c3a27c97c.PNG)

Cùng test thử thư viện thôi
![](https://images.viblo.asia/266fbec3-66a1-4966-bd79-88499bdf2f49.PNG)

Build và chạy nào.!
![](https://images.viblo.asia/5494815e-0ef7-4832-9411-bed4a774e34e.PNG)

Vậy bạn đã tạo thành công thư viện của riêng mình.

Tiếp theo mình sẽ hướng dẫn cách publish thư viện đó cho cộng đồng sử dụng.

Có nhiều cách để publish thư viện của bạn, nhưng mình sẽ hướng dẫn bạn cách đơn giản nhất, dùng **Jitpack**

Đầu tiên bạn phải share project bạn lên Github

Bạn vào VCS > Import into Version Control > Share Project on GitHub.
![](https://images.viblo.asia/74bfe808-f4f4-4097-abe7-478bbf0162df.PNG)

Sau khi push thành công lên Github thì bạn vào trang project trong Github và chọn mục release:
![](https://images.viblo.asia/ad9f0fe7-8d3b-4350-b3c8-be5f10cc1dc7.PNG)

Sau đó điền thông tin phiên bản release, sau đó chọn Pusblish release để hoàn thành.
![](https://images.viblo.asia/20a72aa2-b36a-4701-a50b-b96ddb751db5.PNG)

Kết quả sẽ được như sau
![](https://images.viblo.asia/77b2301d-d031-4345-8678-8c6dfd0e5e1b.PNG)

Sau đó bạn vào trang [jitpack.io](https://jitpack.io/) điền link Github thư viện Android của bạn vào và chọn **Look up**

![](https://images.viblo.asia/ff344f7c-9f6e-4050-8129-5f4931e3c991.PNG)

Bên dưới, Jitpack sẽ hướng dẫn bạn add thư viện vào project để sử dụng.

![](https://images.viblo.asia/3c2d0a35-2b3c-49f0-9350-5598ec55dd05.PNG)

Tóm lại, để tạp một thư viện và chia sẽ cho mọi người rất đơn giản. Mong bạn sẽ cùng tạo ra nhưng công cụ hữu ích cho cộng đồng để cùng nhau phát triển nhé!