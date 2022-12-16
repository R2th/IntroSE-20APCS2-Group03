### 1) Android Activity Lifecycle là gì? 
Nó quản lý trạng thái của activity, khi nó start, stop. Vì vậy, tất cả các trạng thái đang quản lý bằng cách gọi lại phương thức hoạt động. Bạn có thể ghi đè các phương thức đó và có thể thực hiện một thao tác cụ thể để thực hiện đầu ra tốt nhất cho ứng dụng của bạn.

Giống như ứng dụng của bạn đang ở chế độ nền và bạn muốn lưu một số dữ liệu, trong trường hợp này, bạn phải biết về Vòng đời hoạt động của Android.

![](https://images.viblo.asia/0838126a-1b16-4694-9f6a-c2ac98232711.png)
### 2) Tại sao nên sử dụng các phương thức Activity Lifecycle callback?
Nếu bạn sử dụng tốt các phương thức callback trong vòng đời ứng dụng android, nó sẽ tránh được nhiều vấn đề:
- Nếu người dùng gửi form và đột nhiên xoay màn hình tất cả dữ liệu sẽ bị mất, điều đó không tốt.
- Tài nguyên bị giới hạn của Android, có thể làm crash ứng dụng của bạn nếu bạn không giải phóng nó.
- Tiến trình của người dùng có thể bị đóng, nếu họ rời ứng dụng của bạn và quay lại ứng dụng sau đó.
Nhiều vấn đề khác bạn có thể ghi nhớ, sử dụng phù hợp với vòng đời hoạt động của một activity.

**Activity có 6 trạng thái**
- Created
- Started
- Resumed
- Paused
- Stopped
- Destroyed

**Actitivy lifecycle có 7 phương thức.**
- onCreate()
- onStart()
- onResume()
- onPause()
- onStop()
- onRestart()
- onDestroy()
### 3) Tình huống thực tế.
hãy xem điều gì xảy ra khi hoạt động đi qua bị trì hoãn.
- Khi bắt đầu mở ứng dụng
*onCreate() –> onStart() –>  onResume()*
- Khi nhấn nút quay lại và thoát ứng dụng
*onPaused() — > onStop() –> onDestory()*
- Khi nhấn nút home.
*onPaused() –> onStop()*
- Sau khi nhấn nút home và quay lại mở ứng dụng từ danh sách hoặc nhấp vào biểu tượng ứng dụng.
*onRestart() –> onStart() –> onResume()*
- Khi mở ứng dụng khác từ thanh thông báo hoặc mở trong cài đặt.
*onPaused() –> onStop()*
- Khi nhấn nút back từ ứng dụng khác hoặc cài đặt từ người dùng có thể nhìn thấy ứng dụng bạn.
*onRestart() –> onStart() –> onResume()*
- Khi có một thông báo mở trong màn hình.
*onPause()*
- Sau khi tắt thông báo hoặc nhấn nút back từ thông báo.
*onResume()*
- Khi điện thoại đổ chuông và người dùng đang sử dụng ứng dụng
*onPause() –> onResume()*
- Khi người dùng nhấn nút trả lời trên điện thoại.
*onPause()*
- Sau khi cuộc gọi kết thúc
*onResume()*
- Khi điện thoại tắt màn hình
*onPaused() –> onStop()*
- Khi màn hình được bật lại
*onRestart() –> onStart() –> onResume()*
### 4) Đi vào trọng tâm: Lifecycle callbacks

![](https://images.viblo.asia/06ca1d76-3d89-4564-b2ce-a5be00e2252f.png)

**onCreate()**
Khi hệ thống android bắt đầu tạo activity, nó sẽ gọi onCreate(). Nó dùng để khởi tạo activity.
**onStart()**
Khi activity đi vào trạng thái bắt đầu, hệ thống sẽ gọi callback. onStart() sẽ được gọi hoạt động hiển thị cho người dùng thấy, ứng dụng sẽ chuẩn bị cho hoạt động để vào tác vụ nền và tương tác.
**onResume()**
Khi activity đi vào trạng thái resume, nó sẽ đi đến tác vụ nền, và khi hệ thống callback, trạng thái của app sẽ tương tác người dùng.
**onPause()**
Hệ thống call phương thức đầu tiên được chỉ định rằng, người dùng đã rời khỏi activity của bạn(Không có nghĩa là lúc nào activity cũng bị destroyed). Nó chỉ ra rằng hoạt động không còn ở tác vụ nền( mặc dù nó vẫn hiển thị cho người dùng ở chế độ nhiều cửa sổ.)
**onStop()**
Khi hoạt động của bạn không hiển thị cho người dùng, nó sẽ ngừng trạng thái, và hệ thống sẽ gọi callback. Khi một hoạt động được đưa ra bao phủ toàn bộ màn hình
**onRestart()**
Từ trạng thái stop(), activity trở lại tương tác với người dùng, hoặc activyti kết thúc tiến trình chạy. Nếu activity quay lại, hệ thống gọi lại onRestart().
**onDestroy()**
Hệ thống andorid gọi phương thức onDestroy() trước khi activity destroyed. Actitivy destroyed là vì:
- Activity đã được hoàn thành.
- Hệ thống tạm thời destroying activity do cấu hình thay đổi.
- Bộ nhớ ứng dụng bị lỗi.
Một số phương thức gọi lại được thêm vào trong vòng đời hoạt động để lưu và truy xuất dữ liệu.

**onSaveInstanceState(Bundle outState)**
Khi hoạt động của bạn bắt đầu dừng, hệ thống gọi phương thức này, để hoạt động của bạn có thể lưu lại dữ liệu trạng thái vào bundle.

**onRestoreInstanceState(Bundle savedInstanceState)**
Khi hoạt động của bạn được tạo lại sau khi nó bị phá hủy trước đó, bạn có thể khôi phục lại trạng thái dữ liệu từ bundle của hệ thống, cho activity của bạn. Trong onCreate() và onRestoreInstanceState() nhận bundle là như nhau, chứa trạng thái thông tin.

Kiểm tra code:
Bước 1: tạo mới project (Tạo ứng dụng mới của bạn bằng kotlin)
Bước 2: Mở MainActivity.kt nó là class kotlin, và override phương thức callback
```
package `in`.eyehunt.androidactivitylifecyclekotlin

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        print("onCreate")
    }

    override fun onStart() {
        super.onStart()
        print("onStart")
    }

    override fun onResume() {
        super.onResume()
        print("onResume")
    }

    override fun onPause() {
        super.onPause()
        print("onPause")
    }

    override fun onStop() {
        super.onStop()
        print("onStop")
    }

    override fun onRestart() {
        super.onRestart()
        print("onRestart")
    }

    override fun onDestroy() {
        super.onDestroy()
        print("onDestroy")
    }

    fun print(msg: String){
        Log.d("Activity State ",msg)
    }
}
```

Bước 3: Chạy ứng dụng, mở máy ảo thiết bị của android. Kiểm tra logcat 
![](https://images.viblo.asia/0d23208c-4756-4272-afba-eac1112e3817.png)

Video hiển thị logcat
{@embed: https://www.youtube.com/watch?v=YxpQQX4nSOk}

Tài liệu vòng đời activity kotlin.
https://github.com/eyehunt/AndroidActivityLifecycleKotlin

Tham khảo tại nguồn: https://tutorial.eyehunts.com/android/android-activity-lifecycle-example-kotlin/