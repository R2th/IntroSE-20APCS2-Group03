Trong bài viết trước chúng ta đã tìm hiểu về những kiến cơ bản về [Fragment](https://viblo.asia/p/tap-tanh-hoc-lam-android-p5-fragment-maGK7b8L5j2) và thực hiện 1 ví dụ đơn giản với Fragment sử dụng `Kotlin`. Trong bài viết này mình cùng các bạn tìm hiểu về thành phần rất quan trọng trong Android đó là `Intent`. Bắt đầu nào :D

![](https://images.viblo.asia/8ff91983-91fc-4089-b815-1407fd038d0f.png)


# Intent là gì?
- `Intent` là một đối tượng truyền tin mà bạn có thể sử dụng để request một action hay để kết nối giữa các thành phần Android như activity, content providers, broadcast receivers and services
# Sử dụng Intent khi nào?
Intent được sử dụng trong  3 trường hợp cơ bản sau:
## Bắt đầu một Activity
- Activity là gì bạn có thể tham khảo trong bài viết về [Activity](https://viblo.asia/p/tap-tanh-hoc-lam-android-p2-activity-va-vong-doi-cua-activity-bJzKmJaYZ9N) của mình
- Để bắt đầu một [Activity](https://viblo.asia/p/tap-tanh-hoc-lam-android-p2-activity-va-vong-doi-cua-activity-bJzKmJaYZ9N) chúng ta sử dụng startActivity() để chuyển từ activity này sang activity khác, có thể truyền dữ liệu cần thiết 
-  Nếu muốn nhận lại dữ liệu khi đã xử lý ở màn hình thứ 2 xong thì có thể dùng startActivityForResult(), dữ liệu được nhận lại trong hàm onActivityResult()
## Bắt đầu một service
- Service là một thành phần có chức năng thực hiện các thao tác nền mà không cần giao diện người dùng
- Chúng ta bắt đầu một service bằng cách chuyển `Intent` tới startService(). `Intent` mô tả service cần bắt đầu và mang theo những dữ liệu cần thiết
## Vận chuyển một broadcast
- `Broadcast`  là một tin nhắn mà bất kỳ ứng dụng nào cũng có thể nhận được. Hệ thống sẽ chuyển các `Broadcast` khác nhau tới các sự kiện hệ thống. Bạn có thể chuyển một `Broadcast` tới các ứng dụng khác bằng cách chuyển một `Intent` tới `sendBroadcast()`, `sendOrderedBroadcast()`, hoặc `sendStickyBroadcast()`
# Phân loại Intent
Intent có 2 loại:
## Explicit Intent (Intent tường minh)
- Đây là loại Intent mà được khai báo một cách tường minh các thành phần sẽ nhận và xử lý `Intent`. 
- Loại này thường được sử dụng để trao đổi dữ liệu cho các activity, service,.. trong cùng một ứng dụng.
## Implicit Intent (Intent không tường minh)
 - Đây là loại `intent` có các action được Android xây dựng sẵn.
 - Nó là loại intent không rõ đối tượng truyền đến, thường dùng để chuyển dữ liệu sang một ứng dụng khác
#  Cấu trúc Intent
## action
- Các action chung được thực hiện, như ACTION_VIEW, ACTION_EDIT, ACTION_MAIN,...
## data
- Dữ liệu để hoạt động như những dữ liệu nguyên thủy String, int, float,… tới những kiểu dữ liệu dạng object(có implement Serializable), và có thể truyền trực tiếp hay truyền qua bundle dưới dạng key-value
## category
- Cung cấp thêm thông tin về `Action` để thực thi
- Là một phần tùy ý của đối tượng Intent và nó là một chuỗi chứa thông tin bổ sung về loại thành phần mà nên xử lý Intent đó. Nó kết hợp với action để chạy các ứng dụng phù hợp như calendar, calculator,..
## type
- Chỉ định một type tường minh (một loại MIME) của dữ liệu `Intent`. Thông thường loại được suy ra từ chính dữ liệu đó. Bằng cách đặt thuộc tính này, bạn vô hiệu hóa evaluation đó và force một type rõ ràng.
## Flags
- Flags là phần tùy ý của đối tượng Intent và chỉ thị hệ điều hành Android cách chạy một Activity, và cách xử lý sau khi nó đã chạy,…
## extras 
- Là một bundle của các thông tin được thêm vào khi chúng ta truyền dữ liệu, cung cấp dữ liệu cho các component khác
# Làm việc với Intent
## Điều hướng màn hình
- Intent này sử dụng để mở một activity khác từ activity hiện tại
- Sử dụng putExtra() và get<type>Extra() để truyền dữ liệu qua lại giữa các activity.
- Các phương thức cần thiết:
    - Intent(context,class) : khởi tạo 1 intent tường minh để chuyển từ activity hiện tại sang class truyền vào.
    - PutExtra(name, value) : truyền data giá trị value với key là name
    - getStringExtra(name): lấy giá trị tương ứng với giá trị có key là name
    - getIntExtra(name,default): lấy giá trị tương ứng với key là name, nếu không có giá trị nào thì trả về giá trị mặc định là default.
    - Tương tự ta có getSerialiazbleExtra(), getBundleExtra(), getBooleanExtra(),…

## Xem Url trên trình duyệt web
- Sử dụng ACTION_VIEW để mở Url. Đây là 1 intent không tường minh. Intent này cần quyền internet.
## Gọi, chuyển màn hình quay số của điện thoại
- Thêm một loại về Implicit Intent. Cần cấp quyền CALL_PHONE
## Yêu cầu ảnh từ camera
## Yêu cầu ảnh từ bộ sưu tập
# Demo
- Mình có một file `MainActivity.kt` và sử dụng một fragment để tạo giao diện cho Activity này với giao diện  như sau:
    
![](https://images.viblo.asia/7249f8d7-7aa4-46b1-b17d-e60ffd0ce650.PNG)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".FirstFragment">

    <TextView
        android:id="@+id/textview_first"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/hello_first_fragment"
        app:layout_constraintBottom_toTopOf="@id/button_first"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button_first"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Explicit Intent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/textview_first" />

    <Button
        android:layout_marginTop="30dp"
        android:text="Implicit Intent"
        app:layout_constraintEnd_toEndOf="@id/button_first"
        app:layout_constraintStart_toStartOf="@id/button_first"
        app:layout_constraintTop_toBottomOf="@id/button_first"
        android:id="@+id/btn_second"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
</androidx.constraintlayout.widget.ConstraintLayout>
```
Ở trong giao diện này mình có 2 button để demo về 2 loại của `Intent` là tường minh và không tường minh
## Intent tường minh
- Ở demo `Intent` tường minh mình sẽ chuyển từ `Main Activity` sang một `Activity` khác. Như ở giao diện phía trên sẽ có một button là `Explicit Intent`. Sau khi bấm vào button này thì sẽ từ Activity hiện tại sẽ nhảy sang một Activity mới:

- Màn hình ban đầu:
    
![](https://images.viblo.asia/7249f8d7-7aa4-46b1-b17d-e60ffd0ce650.PNG)
    
Sau khi Click button `Explicit Intent`:
    
![](https://images.viblo.asia/f5087925-43cd-4bcd-a72e-3cf85cda7477.PNG)

```kotlin
button_first.setOnClickListener({
    val intent: Intent = Intent(context, Activity1::class.java)
    var content = "Demo Explicit Intent"
    val bundle = Bundle()
    bundle.putString("CONTENT",content)
    intent.putExtra("KEY_1",bundle)
    context?.startActivity(intent)
})
```
- Ở trong `fragment` để hiển thị ở trong `Activity` ban đầu mình sẽ bắt sự kiện cho button `Explicit Intent`. Ở đây mình khai báo một `Intent` và truyền vào `Activity` mới mà mình cẩn hiển thị. Sau đó truyền dữ liệu để hiển thị lên `Activity` mới. Và cuối cùng chúng ta startActivity() là xong
- Trong `Activity` mới mình chỉ cần lấy dữ liệu trong bundle và set vào TextView để hiển thị
- Note: Ở đây chúng ta có thể không sử dụng bundle rồi mới truyền dữ liệu sang activity mới. Tuy nhiên, khi số lượng value mình muốn truyền sang càng nhiều thì ở bên Activity khó kiểm soát và phải khai báo nhiều biến. Chúng ta nên sử dụng bundle rồi đưa dữ liệu vào bundle và truyền sang Activity mới
## Intent không tường minh
- Ở demo `Intent không tường minh` này mình sẽ dùng Intent để mở một website
- Màn hình ban đầu:
    
![](https://images.viblo.asia/7249f8d7-7aa4-46b1-b17d-e60ffd0ce650.PNG)

Sau khi click button `Implicit Intent`:
    
![](https://images.viblo.asia/30444266-a71d-4509-a199-a5481f86b7ab.PNG)

- Có nhiều bạn sẽ thắc mắc tại sao khi bấm vào button `Implicit Intent` lại sang website của google <br>
```
btn_second.setOnClickListener({
    val intent = Intent()
    intent.setAction(ACTION_VIEW)
    intent.setData(Uri.parse("https://www.google.com"))
    startActivity(intent)
})
```
Thì Ở trong `fragment` để hiển thị ở trong `Activity` ban đầu mình sẽ bắt sự kiện cho button `Implicit Intent`, mình set cho `Intent` một action là `ACTION_VIEW` và truyền vào một uri là trang chủ của google. Sau khi startActivity() sẽ nhảy sang trang chủ website của google
# Kết Luận
Trong bài viết này mình đã giới thiệu với các bạn một thành phần quan trọng trong Android là `Intent`. Trong bài viết tiếp theo cùng mình tìm hiểu về BroadcastReceiver. Cảm ơn các bạn đã theo dõi bài viết
<br><br>
Tài liệu tham khảo:
- https://developer.android.com/reference/android/content/Intent