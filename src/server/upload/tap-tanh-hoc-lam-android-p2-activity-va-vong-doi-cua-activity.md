Trong bài viết ở [Phần 1](https://viblo.asia/p/tap-tanh-hoc-lam-android-p1-co-ban-QpmlepgDZrd) thì mình đã giới thiệu với các bạn một số kiến thức cơ bản của hệ điều hành android. Trong bài viết phần 2 này mình giới thiệu với các bạn về `Activity` và vòng đời của Activity
## Acitivity
- Activity là một thành phần của ứng dụng android nó sẽ biểu diễn giao diện của một màn hình nào đó trong ứng dụng. Một ứng dụng có thể sẽ có nhiều màn hình và mỗi màn hình có thể là một Activity.
- Mỗi Activity sẽ hoạt động độc lập với nhau nhưng có thể tương tác và truyển dữ liệu qua nhau.Vì hoạt động độc lập nên có sẽ có vòng đời riêng từ lúc được khởi tạo cho đến lúc được huỷ đi.
- Một class được gọi là Activity khi nó extend (kế thừa) từ những class cha như : AppCompatActivity,  Activity, FragmentActivity… và được khai báo trong tập tin AndroidMenifest
## Cấu hình Manifest
- Để ứng dụng của bạn có thể sử dụng các Activity thì bạn phải khai báo các Activity và một số thuộc tính trong `Manifest`
- Để khai báo Activity, bạn mở file Manifest và thêm thẻ `<activity>` bên trong `<application>` 
<br>
Ví dụ:
<br>
```
<application ... >
    <activity android:name=".ExampleActivity">
    ...
    </activity>
</application>
```
Thuộc tính bắt buộc duy nhất cho thành phần này là `android: name`, chỉ định tên lớp của `Activity`. Bạn cũng có thể thêm các thuộc tính xác định các đặc điểm `Activity`, chẳng hạn như label, icon, or UI theme
## Vòng đời của Activity
Khi người dùng điều hướng qua, thoát ra và quay lại ứng dụng của bạn, các phiên bản Activity trong ứng dụng của bạn chuyển qua các trạng thái khác nhau trong vòng đời của chúng. Activity cung cấp một số callback cho phép Activity biết rằng trạng thái đã thay đổi: hệ thống đang tạo, dừng, tiếp tục, hoặc phá hủy.

![](https://images.viblo.asia/192f4e5c-c3ed-4629-8359-7f0e35ffd0ec.png)

- onCreate là hàm bắt buộc phải có trong Activity bởi vì nó có nhiệm vụ là khởi tạo Activity đó lên và nó chỉ được khởi tạo một lần duy nhất trong 1 vòng đời của Activity, lưu ý là không có cũng chẳng bị lỗi gì nhé. Vì là chỉ khởi tạo một lần duy nhất nên nó thường là nơi vẽ ra giao diện của Activity.
- Khi một activity được khởi tạo thì nó sẽ chạy lần lượt qua 3 hàm là onCreate(), onStart(), onResume().
    - onCreate(): hàm này khởi tạo giao diện của màn hình đó, lúc này thì giao diện vẫn chưa được hiển thị ra.
    - onStart(): trong hàm này thì giao diện đã được vẽ ra và bạn có thể nhìn thấy giao diện, tuy nhiên vẫn chưa thao tác được với các widget trên màn hình đó. VD không bấm được button, hay ko nhập liệu được vào EditText…
    - onResume(): ở đây giao diện đã được vẽ và người dùng có thể thực hiện, thao tác với màn hình, giao diện đó, và lúc này nếu bạn thao tác làm ẩn Activity đi thì nó sẽ dừng ở đây, activity đang hoạt động.Lúc này sẽ có 2 trường hợp xảy ra tiếp theo:
        - TH1 Ẩn 1 phần: nếu như 1 activity khác đè lên trên Activity này và chỉ che khuất 1 phần nào đó thôi chứ không che khuất hoàn toàn, nghĩa là Activity đầu tiên bây giờ chúng ta không click hay làm gì được nhưng vẫn thấy 1 phần có nó trên màn hình. Lúc này đây hàm `onPause()` sẽ được gọi. Và khi Activity vừa đè lên bị hủy bỏ hay xóa đi thì hàm `onResume()` sẽ được gọi và bây giờ chúng ta có thể thao tác, click… được trên Activity này.
        - TH2: che khuất toàn phần: Giả sử có cuộc gọi đến, hay ta chuyển sang một màn hình có tính năng khác thì lúc này hàm `onPause()` và gọi luôn hàm `onStop()` ngay sau đó, nghĩa là Activity hiện tại đã bị che khuất hoàn toàn. Sau khi cuộc gọi kết thúc thì hàm `onRestart()` sẽ được gọi, tiếp đến hàm `onStart()` và `onResume()` cũng được gọi ngay sau đó luôn và bây giờ Activity lai quay về trạng thái hoạt động bình thường.
    - Hàm cuối cùng đó là hàm `onDestroy()`, hàm này sẽ được gọi khi bạn bấm nút back trên điện thoại, hoặc gọi các hàm để hủy activity nào đó. Sau khi hàm này được gọi thì Activity đó sẽ bị hủy luôn và sẽ được xóa khỏi stack activity.

## Kết luận
Qua bài viết này chúng ta có thể nắm được quy tắc về vòng đời của Activity mà từ đó, ta có thể xử lý một số tác vụ như lưu dữ liệu ở hàm nào, khởi tạo các widget ở đâu, đọc dữ liệu ở hàm nào,... Trong bài viết theo chúng ta cùng tìm hiểu về Layouts và Widget. Cảm ơn các bạn đã theo dõi bài viết <3