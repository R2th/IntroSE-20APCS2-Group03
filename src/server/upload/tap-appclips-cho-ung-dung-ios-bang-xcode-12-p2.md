# Chuẩn bị
Trước hết Appclip là phần demo của app cho phép người dùng tải về dùng thử trước khi tải bản full nên nó sẽ được "đính kèm" trong app thật. Có nghĩa trong project của bạn phải chứa cả target appclip.
Và cũng như thông thường, chúng ta cần 1 tài khoản develop của apple để có thể truy cập appstoreconnect. Chúng ta phải tạo appID, bundleID, ... để có thể đẩy app lên AppStoreConnect.
- Tài khoản Develop của Apple
- Xcode 12.0 or later
# Tạo project
- Mở xcode ra. Tạo 1 project Demo

![](https://images.viblo.asia/85eef1ad-f353-4744-849a-b0221f6120f8.png)
# Thêm target cho AppClip
Click chọn File -> New -> Target -> AppClip
![](https://images.viblo.asia/acd13260-8cfa-4a2f-bb89-9e4409e05f65.png)


# Đặt bundle ID cho Appclip
Tại target AppClip, Xcode sẽ tự động tạo 1 bundle ID cho AppClip (chọn auto), cái này sẽ match với bundle ID của App chính. Khi đẩy lên AppStoreConnect nó sẽ tự động nhận biết và đưa vào chung 1 App.

![](https://images.viblo.asia/2ab1f5b3-6d2b-4ac3-bbf4-1bb581f8feaa.png)
# Archive
![](https://images.viblo.asia/5f2a22dc-f028-4998-aa5c-e1282f0f717d.png)

![](https://images.viblo.asia/1e7e6827-2a3e-47f9-8e89-db53871bbd23.png)

![](https://images.viblo.asia/d0ff1b03-1913-4ce7-93dd-314f11329955.png)

![](https://images.viblo.asia/387761ec-9122-47f9-b581-08bbc8e1fffe.png)

![](https://images.viblo.asia/ff1ff980-bb87-48c5-a0eb-70ec4d8f5338.png)

# Kiểm tra AppStoreConnect
- Sau khi updoad thành công bằng Xcode, chúng ta sẽ kiểm tra lại trên Appstore Connect. Nếu thành công, app sẽ có 2 target thể hiện trên Testflight thay cho 1 như trước đây
![](https://images.viblo.asia/04f58407-db0a-460c-8686-158e02fd50c2.png)


# Kiểm tra, dùng thử trong TestFlight
Khi upload thành công, trong TestFlight cũng sẽ xuất hiện mục "AppClip". Đó chính là target AppClip mà chúng ta đã thêm lúc đầu
![](https://images.viblo.asia/6953d86d-37d8-4f99-9e35-4c1fb1dd7540.PNG)

## AppClip
![](https://images.viblo.asia/88aa0172-6aaf-4c40-962b-0f8aa3544e1c.png)
![](https://images.viblo.asia/e3147161-35b8-43fd-a420-92afa3001939.png)

## Full App
![](https://images.viblo.asia/27d34d03-9b6f-44a4-b0c3-6514997dd07e.png)

Trên đây là hướng dẫn tạo Appclip cho App iOS, cám ơn các bạn đã đọc bài viết của mình. Hi vọng các bạn thành công !
[Link tham khảo](https://www.raywenderlich.com/14455571-app-clips-for-ios-getting-started#toc-anchor-012)