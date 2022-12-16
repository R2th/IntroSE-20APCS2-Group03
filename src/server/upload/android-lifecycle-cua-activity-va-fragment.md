# Activity Lifecycle
 `Activity` là lớp cơ bản để xây dựng ứng dụng Android. Khi người dùng tương tác với ứng dụng, có thể có nhiều trường hợp xảy ra như: chuyển, đóng, ẩn, thay thế `Activity`. Điều này sẽ tạo ra nhiều thay đổi về mặt trạng thái đối với `Activity` mà người dùng vừa tương tác. Do đó ta được cung cấp một số callback nhằm phục vụ việc quản lí `Activity` dễ dàng hơn hay còn được gọi là Activity Lifecycle.
 
 Các trạng thái của Activity:
* Created
* Started
* Resumed
* Paused
* Stopped
* Destroyed
![activitylifecycle.png](https://images.viblo.asia/64c5c3e6-9fc0-495f-9b7f-1feb380eff03.png)
## onCreate
Được gọi khi khởi tạo activity, lúc này người dùng vẫn chưa nhìn thấy và tương tác được với activity (trạng thái `INITIALIZED`). Ta bắt buộc phải hiện thực phương thức này khi tạo activity:
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Some thing
}
```

`onCreate` là nơi ta thực hiện các thao tác:
* Bind data tới một list
* Init một vài biến thuộc class scope
* Lấy giá trị bundle được gửi tới thông qua intent
* Liên kết activty với ViewModel
* ...

Ngoài ra `onCreate` có param là một bundle `onCreate(savedInstanceState: Bundle?)`  chứa giá trị liên quan đến trạng thái đã được lưu lần trước của activity (sẽ được nói đến ở các phần tiếp theo).

Khi thực hiện xong function `onCreate` activity của chuyển sang trạng thái `CREATED`.
## onStart
Khi activity đi vào trạng thái `STARTED`, `onStart` sẽ được gọi nhằm mục đích chuẩn bị đưa activity lên foreground, hiển thị cho người dùng. Phương thức này được thược hiện rất nhanh và trong body của phương thức này, activity sẽ không giữ trạng thái `STARTED` mà sẽ là `CREATED`. Khi thực hiện xong, activity sẽ chuyển sang `RESUMED`.

Một trong những chức năng thường được đặt ở onStart là preview, xem trước Camera.
## onResume
Activity ở `RESUMED` sẽ gọi callback `onResume`. Ở trạng thái này người dùng có thể tương tác trực tiếp activity và `RESUMED` sẽ được giữ cho đến khi có những thay đổi về mặt "focus" chẳng hạn như: người dùng chuyển đến activity khác, nhận được cuộc gọi, tắt màn hình.

`onResume` có thể được gọi nhiều lần trong suốt chương trình:
* onCreate > onStart > onResume
* onPause > onResume
* onStop > onRestart > onStart > onResume

Thường được dùng để thực hiện các thao tác:
* Start camera preview
* 
## onPause
Khi `onPause` được gọi là dấu hiệu cho biết người dùng đã "rời khỏi" activity (không có nghĩa là bị huỷ) hay nói cách khác là activity hiện tại đã bị **event interrupts app execution** bởi activity khác. Lúc này activity chuyển sang trạng thái `PAUSED`.

Một số trường hợp khiến activity chuyển đến trạng thái này
* Một vào thao tác gây lỗi, treo ứng dụng
* Activity bị che khuất một phần bởi activity khác

Ở trạng thái `PAUSED` này, ta thường sẽ xử lí các hoạt động để hoàn lại tại nguyên không sử dụng như GPS, NFC... 
## onStop
Được gọi khi activity không còn được nhìn thấy bởi user nữa có nghĩa là nó đã **bị che lấp hoàn toàn**. Xảy ra khi người dùng chuyển màn hình (activity), chuyển ứng dụng, bấm home.
`onStop` thường được dùng để:
* Lữu trữ dữ liệu
* Cancel các job như gọi API, truy xuất dữ liệu local
* Giải phóng các tài nguyên sử dụng
## onDestroy
Là lời gọi kết thúc cho một activity, thường dùng để giải phóng các tài nguyên (các phần mà onStop chưa xử lí).
`onDestroy` sẽ được gọi khi:
* Người dùng kết thúc, dừng activty
* Gọi `finish()` trong activity
* System gọi vì có thay đổi liên quan đến config như: xoay thiết bị hoặc bật multi wind
## Kịch bản thực tế
* Khi mở ứng dụng khác từ thanh thông báo hoặc mở trong cài đặt: *onPaused() –> onStop()*
* Khi nhấn nút back từ ứng dụng khác hoặc cài đặt từ người dùng có thể nhìn thấy ứng dụng bạn: *onRestart() –> onStart() –> onResume()*
* Khi có một thông báo mở trong màn hình: *onPause()*
* Sau khi tắt thông báo hoặc nhấn nút back từ thông báo: *onResume()*
* Khi điện thoại đổ chuông và người dùng đang sử dụng ứng dụng:* onPause() –> onResume()*
* Khi người dùng nhấn nút trả lời trên điện thoại: *onPause()*
* Sau khi cuộc gọi kết thúc: *onResume()*
* Khi điện thoại tắt màn hình: *onPaused() –> onStop()*
* Khi màn hình được bật lại: *onRestart() –> onStart() –> onResume()*
* Khi bắt đầu mở ứng dụng: *onCreate() –> onStart() –> onResume()*
* Khi nhấn nút quay lại và thoát ứng dụng: *onPaused() — > onStop() –> onDestory()*
* Khi nhấn nút home: * onPaused() –> onStop()*
* Sau khi nhấn nút home và quay lại mở ứng dụng từ danh sách hoặc nhấp vào biểu tượng ứng dụng: *onRestart() –> onStart() –> onResume()*
# Fragment Lifecycle
Tương tự như Activity, ở `Fragment` cũng có các callback và trạng thái:

![image.png](https://images.viblo.asia/6f3895a7-ba78-4f18-9308-e4260f13b6a7.png)

* onAttach: fragment được attach vào host activity.
* onCreate: luôn gọi sau khi fragment được attach, khởi đầu cho fragment
* onCreateView: khời tạo thành phần view và add nó vào activity
* onActivityCreated: activty thực thi xong onCreate
* onStart: fragment được hiển thị
* onResume: fragment hiển thị và tương tác được
* onPause: fragment không còn tương tác được, Xảy ra khi fragment sắp bị thay thế, xoá hoặc activty ở pause
* onStop: fragment không còn được hiển thị. Vì nó bị xoá, thay thế hoặc activty ở stop
* onDestroyView: view và tài nguyên tạo ra ở onCreateView bị xoá khỏi activty
* onDestroy: huỷ hoàn toàn fragment
* onDetach: detach fragment khỏi activity
# Mối liên hệ
![image.png](https://images.viblo.asia/bda27333-bf1f-4761-8283-04cf7941bb95.png)
# Lời kết
Trên là những khái niệm cũng như các cách sử dụng của activity life cycle và fragment life cycle. Bạn có thể tìm hiểu thêm: về [activty](https://developer.android.com/guide/components/activities/intro-activities) và [fragment](https://developer.android.com/guide/fragments/lifecycle).

Cảm ơn các bạn đã đọc bài viết.

# Reference 
1. https://tutorial.eyehunts.com/android/android-activity-lifecycle-example-kotlin/
2. https://viblo.asia/p/android-activity-lifecycle-trong-kotlin-naQZRYJ0Kvx