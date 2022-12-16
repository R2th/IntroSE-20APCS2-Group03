![](https://images.viblo.asia/60d181da-08f3-4841-880c-a133279e9ec5.jpg)
Cho đến nay, bản beta Android Q đã chính thức được ra mắt. Về tổng quan, đây là bản nâng cấp tập trung khá nhiều về quyền riêng tư người dùng, cũng như đưa ra các tính năng, những APIs mới nhằm nâng cao trải nghiệm người dùng. Bài viết này chúng ta sẽ điểm qua những thay đổi nổi bật có ở Android Q.

# Cài đặt Android Q
Ở thời điểm hiện tại, do chỉ mới là bản beta nên chúng ta chỉ có thể trải nghiệm Android Q trên dòng máy Pixel của Google.

- Cách 1: Dùng thiết bị Pixel truy cập link https://www.google.com/android/beta để đăng kí trải nghiệm. Sau khi thành công, thiết bị sẽ nhận được những bản cập nhật OTA mới nhất. Quá trình đăng kí này cũng khá đơn giản và nhanh chóng.
- Cách 2: Có thể truy cập https://developer.android.com/preview/download.html để tải trực tiếp bản cài đặt. Tuy nhiên hiện tại mới hỗ trợ các dòng máy sau: Pixel 3, Pixel 3 XL, Pixel 2, Pixel 2 XL, Pixel, và Pixel XL.
- Cách 3: Cách này áp dụng với developer đó là dùng máy ảo. Chúng ta sẽ thực hiện các bước như sau

**Bước 1**: Từ Android Studio, chọn **Tools > SDK Manager**

**Bước 2**: Ở **SDK Platforms tab**, chọn **Show Package** Details

**Bước 3**: Dưới **Android Q Beta**, chọn system image  **Google APIs Intel x86 Atom System Image**.

**Bước 4**: Tại **SDK Tools** tab, chọn phiên bản mới nhất của  **Android Emulator**.

**Bước 5**: Click **OK** để bắt đầu cài đặt

**Bước 6**: Sau khi cài đặt thành công, chọn **Tools > AVD Manager** và tạo AVD mới

**Bước 7**: Cần chắc chắn chọn thiết bị không có Play Store, sau đó chọn Q cho system Image

**Bước 8**: Quay trở lại danh sách máy ảo đã tạo và mở thiết bị tương ứng.

# Một số thay đổi 
## Quyền riêng tư người dùng
### Truy cập vị trí thiết bị
Android Q thêm quyền mới cho việc truy cập vào vị trí thiết bị. Chúng được phân biệt rõ ràng ra các trường hợp là truy cập vị trí khi app foreground và khi app ở background.
    ![](https://images.viblo.asia/3d981087-3224-4074-8394-a1094b3a125c.png)
**ACCESS_BACKGROUND_LOCATION**

Không giống như các quyền cũ là **ACCESS_FINE_LOCATION** và **ACCESS_COARSE_LOCATION**, quyền mới này chỉ ảnh hưởng tới app mà muốn truy cập vị trí khi đang ở ackgroundg. Trong trường hợp này, app được coi là ở background khi mà không có 1 activity nào đang visible cũng như đang không chạy 1 foreground service nào.

Chúng ta cần khai báo trong Manifest như sau:
```
<manifest>
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
</manifest>

```


### Khởi chạy activity ở background
Android Q thêm các hạn chế mới, không cho phép chạy 1 activity khi app đang ở background. Điều này tránh được việc ngắt quãng trải nghiệm cho người dùng, cũng như cải thiện khả năng quản lý những gì có thẻ xảy ra cho họ.

Cụ thể, app chỉ có thể khởi chạy activity khi thỏa mãn 1 trong các điều kiện sau:

- App đang sở hữu 1 cửa sổ ở trạng thái visible, ví dụ như activity đang dược hiển thị
- Nếu app đang ở background nhưng có 1 app khác ở foreground thực hiện gửi 1 pendingIntent gắn với nó
- App ở background nhưng được hệ thống gửi 1 pendingIntent gắn với nó. Một ví dụ dễ hình dung  nhất là khi click notification. Hệ thống sẽ thực hiện gửi pendingItent với action tương ứng tới app.

**Lưu ý:** Về định nghĩa foreground của app ở mục này khác với phần location ở trên. Ở trường hợp này **foreground service** cũng **không** được coi là thỏa mãn để có thể start activity


Thực tế, ở bản beta 1 này, nhà phát hành vẫn cho phép start activity từ background, tuy nhiên nó sẽ hiện cảnh báo ở logcat cũng như toast lên cho người dùng biết
```
This background activity start from package-name will be blocked in future Q builds.
```

**Cách xử lý**: Với những app đang chạy activity từ background chắc chắn sẽ bị ảnh hưởng khi lên Android Q. VÌ vậy cách tốt nhất, thay vì trực tiếp start nó, hãy dùng 1 notification độ ưu tiên cao , và để cho người dùng tự thực hiện action đó. Như vậy sẽ không bị vi phạm mục này.

### Truy cập thông tin phần cứng & dữ liệu sao chép
Android Q thêm các hạn chế khi app cố gắng truy cập những thông tin định danh phần cứng.

- Như địa chỉ MAC của thiết bị, sẽ luôn được tạo ngẫu nhiên
- Các dữ liệu như IMEI, serial muốn truy cập phải có quyền **READ_PRIVILEGED_PHONE_STATE** nếu không sẽ có lỗi **SecurityException**

Ngoài ra, các dữ liệu lưu vào clipboard sẽ được bảo mật. Chỉ duy nhất app đang chiếm focus tới đoạn thông tin đó cũng như app mặc định của hệ thống có vai trò là **input method editor (IME)** mới có quyền đọc được dữ liệu này.

### Tạo ra các vùng lưu trữ data an toàn trên bộ nhớ ngoài
Android Q thực hiện các giới hạn mới về truy cập thông tin ở bộ nhớ ngoài.

Nhằm tăng tính riêng tư, mỗi app sẽ được cấp 1 vùng nhớ riêng biệt gọi là **isolated storage sandbox** để có thể lưu trữ dữ liệu riêng tư ngay trên bộ nhớ ngoài.

Chỉ duy nhất app sở hữu có quyền truy cập dữ liệu tại vùng nhớ của nó. Do đó, cũng không cần thêm quyền gì để có thể thao tác với dữ liệu ở đây. Điều này giúp đơn giản hóa việc đọc ghi cũng như giảm thiệu lương quyền cần cung cấp cho app.

```
Context.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
```

Sử dụng fun trên để lấy về địa chỉ sanbox. Fun này được khuyên dùng vì nó có thể tương thích qua nhiều version. Chỉ cần truyền vào data type cần thao tác. Như ví dụ trên, ta có thể truy cập hoặc lưu các dữ liệu dạng ảnh cho private-app.


**Lưu ý**: Dữ liệu lưu tại đây sẽ bị xóa khi app gỡ cài đặt.

## UI-UX
### Location confirm dialog
![](https://images.viblo.asia/c0e234d5-6109-41cc-9660-3e1960481d59.png)
Như đã nói ở phần trên, Android Q hỗ trợ thêm quyền truy cập vị trí. Để giúp người dùng tăng khả năng kiểm soát , sẽ có nhiều lựa chọn hơn là cho phép tại mọi thời điểm, cho phép chỉ khi app đang được sử dụng hay là từ chối.

### Màn hình gập
Google cũng đã cho thấy họ đã bước đầu hỗ trợ cho các device xu thể có thể gập được.
Sẽ có thêm các cập nhật chi tiết cho việc thay đổi các function **onResume()** và **onPause()** để hỗ trợ **multi-resume** và thông báo tới app khi nó có được focus người dùng.

### Settings Panels
Một trường hợp khá phổ biến trên app android ở những phiên bản trước. Khi ta đang dùng app, app muốn thực hiện một thay đổi gì đó ở setting, 1 là nó tự điều hướng , 2 là người dùng tự mở setting. Nhưng dù cách nào thì ta vẫn phải dừng app để mở màn setting mặc đinh. Điều này có vẻ gây gián đoạn trải nghiệm.

Android Q sẽ hỗ trợ một floating-window gọi là panel như sau:
![](https://images.viblo.asia/f788f238-f646-4965-8940-756c0875edfb.png)

Thay vì phải vào setting tắt bật wifi hay mạng di động, giao diện mới này sẽ cho phép ta thực hiện điều đó mà không cần phải dừng app. Ngoài setting cho network, nó còn hỗ trợ cho chế độ máy bay, NFC, audio volume,...

Trên đây là một số điểm mới trên Android Q mà mình đã tìm hiểu được. Do mới là bản beta nên sẽ còn nhiều thay đổi. Mình sẽ tiếp tục cập nhật trong các bài viết tiếp theo. Cảm ơn các bạn đã đón đọc !