![](https://images.viblo.asia/d9a08443-752e-4096-8e60-dd35937b4c07.png)
Hôm nay, mình sẽ làm bài viết nho nhỏ, chia sẻ về kinh nghiệm để giúp bạn có thể tự làm một thư viện nho nhỏ của riêng mình. Mục đích thì ae lập trình viên đã quá rõ rồi.  Khi ta đã có một thư viện thì ta có thể reuse, chia sẻ cho người khác. Mời mọi người vào cùng contribute để có thể phát triển lên. Nào chúng ta cùng bắt đầu nào.
# Tạo library
Chúng ta sẽ tạo một ứng dụng nhỏ demo và đóng gói thành thư viện.  Bạn mở ứng dụng Android Studio lên và tạo một project với tên là 
ToastLibrary. 
![](https://images.viblo.asia/66d5a2ce-599e-4c5e-9a96-867ac5c462d5.png)


![](https://images.viblo.asia/4f802d70-fe18-40d5-9f99-68a2439c1b70.png)

Click vào Finish là chúng ta đã tạo xong project.

Bây giờ chúng ta sẽ tạo một Module mới trong project vừa tạo.
![](https://images.viblo.asia/66cdfc5d-d7e8-41d6-9d1c-425398c0b19b.png)
Chọn Android Library, sau đó click Next

![](https://images.viblo.asia/758427f5-a6a0-42e6-86a8-739924357cc9.png)

Tiếp theo bạn hãy đặt tên cho thư viện của bạn. Ở đây mình đặt là MyToastLibrary. Sau đó click Finish
![](https://images.viblo.asia/7e06a4f5-50d3-43be-b410-52bba962cebf.png)
Bây giờ Module mytoastlibrary đã được thêm. Chúng ta cùng viết class ToasterMessage trong module vừa được tạo:
![](https://images.viblo.asia/b8269926-efdc-4d11-81bc-7cf10a5ef344.png)

Class của chúng ta rất đơn giản. Chỉ có một hàm static showMessage để show message người dùng cho vào.
```

public class ToasterMessage {
    public static void showMessage(Context c, String message) {
        Toast.makeText(c, message, Toast.LENGTH_SHORT).show();
    }
}
```
Quá đơn giản phải không nào! Đến đây thì thư viện đầu tiên mà chúng ta làm đã xong.  Tiếp theo chúng ta sẽ public thư viện chúng ta tạo lên JitPack. Kế tiếp là chúng ta cần tạo một repository trên github.
# Publish library vừa tạo
Việc tạo repository trên github và upload code lên nếu bạn nào chưa biết thì có thể tìm hiểu thêm. Còn đây là sau khi mình đã tạo repository và push code lên.
![](https://images.viblo.asia/d0375122-7005-4108-b0d8-b31dfaabb752.png)
Bây giờ bạn hãy tạo release với source code của bạn:

![](https://images.viblo.asia/7c6b380d-2de0-431e-abae-87a5d768b138.png)
Điền đầy đủ thông tin cho bản release của bạn và click vào Publish release

![](https://images.viblo.asia/01abe307-fa93-4dd5-a477-df16d9225b1d.png)
Bây giờ các bạn truy cập vào [JitPack](https://jitpack.io/)

Nhập vào địa chỉ của repository mà bạn vừa tạo.  Như trong trường hợp của mình thì là *morejump/MyToastLibrary* Rồi ấn vào Look up. Ấn tiếp vào  Get it bên cạnh version.

![](https://images.viblo.asia/09a38294-dba5-4489-b726-5edf8d04a7a8.png)

Bây giờ chỉ cần làm theo hướng dẫn của JitPack là bạn đã có  thể sử dụng thư viện mà mình vừa publish lên rồi. Thật đơn giản phải không?

![](https://images.viblo.asia/96392533-4786-4bb2-b4fd-2fa25c3efbfc.png)
Sau khi làm theo hướng dẫn thì mình đã có thể sử dụng thư viện mà mình vừa tạo:
![](https://images.viblo.asia/c3035d73-3de7-46ad-b553-40d2e64d27c3.png)

Đây là kết quả mình chạy:
![](https://images.viblo.asia/ea8209d6-7c5b-4aee-a90e-ba5a1a4b0d35.jpg)
Vừa rồi là bài chia sẻ của mình về làm thế nào để tạo một thư viện library trong Android và publish nó lên JitPack.

Chúc các bạn thành công!

Bài viết có tham khảo tại:

https://medium.com/@anujguptawork/how-to-create-your-own-android-library-and-publish-it-750e0f7481bf