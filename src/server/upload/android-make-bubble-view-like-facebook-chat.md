Facebook đang là ứng dụng phổ biến gần như không thể thiếu với giới trẻ. Mọi trải nghiệm đều được nghiên cứu kĩ càng để mang lại ux tốt cho người dùng. Mình đặc biệt thích tính năng bubble view khi hiển thị tin nhắn của Facebook Messenger (hay là floating window). Cách làm này giúp ta có thể trả lời tin nhắn thuận tiện mà không làm gián đoạn việc sử dụng các app khác. Bài viết này mình sẽ hướng dẫn làm 1 demo nho nhỏ để tạo ra 1 bubble view như vậy trong android (đương nhiên là sẽ mô phỏng lại view chat nhé :D)
# Chuẩn bị
Trước tiên chúng ta sẽ cần biết 1 số lưu ý sau để bắt đầu làm demo:
1. Để vẽ floatting view chúng ta cần được user cấp quyền drawOverlay trong setting của app
2. Dùng WindowManager để vẽ view. Manager này sẽ thực hiện vẽ view mà ta mong muốn lên trên cùng cấu trúc view của màn hình hiện tại. Tức là khi bạn có mở nhiều app khác thì view này vẫn được visible trên cùng và cho phép tương tác.
3. Một số cấu hình trong param của windowmanager đã bị deprecated (trong code mình sẽ chỉ cụ thể hơn)
4. Dùng service chạy background có nhiệm vụ kich hoạt windowManager 

# Thực hiện
## Bước 1: Tạo view 
Trong demo này mình muốn show view giống chat view facebook. Do đó chỉ cần 1 imageview ảnh đại diện, kèm theo 1 button close để đóng view lại (tạm thời chúng ta chưa apply behavior vuốt view xuống góc dưới màn hình để đóng view)

Tạo 1 layout có tên : **layout_chat**

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="65dp"
        android:id="@+id/chat_head_root"
        android:layout_height="wrap_content"
        android:orientation="vertical">

    <ImageView
            android:id="@+id/image_chat"
            android:layout_width="60dp"
            android:layout_height="60dp"
            android:layout_marginTop="8dp"
            android:src="@mipmap/ic_launcher_round"
            tools:ignore="ContentDescription"/>
    
    <ImageView
            android:id="@+id/button_close"
            android:layout_width="26dp"
            android:layout_height="26dp"
            android:layout_marginLeft="40dp"
            android:src="@drawable/ic_close_black_24dp"
            tools:ignore="ContentDescription"/>
</RelativeLayout>

```

## Bước 2: Tạo ChatService
Như đã nói ở trên, chúng ta cần 1 service để tương tác với WindowManager 

```
class ChatService : Service() {
    override fun onBind(p0: Intent?): IBinder? = null
}
```

Và chắc chắn đừng quên khai báo service này trong Manifest
```
  <service android:name=".ChatService"/>
```

Tiếp theo chúng ta tạo 2 biến sau trong service:
```
private val windowManager: WindowManager by lazy {
        getSystemService(WINDOW_SERVICE) as WindowManager
    }
    
private val chatHeadView: View by lazy {
        LayoutInflater.from(this).inflate(R.layout.layout_chat, null)
    }
```

**windowManager** có nhiệm vụ vẽ view được truyền vào
**chatHeadView** chính là view chat ta cần vẽ, được inflate từ layout tạo ở bước 1 

Tiếp theo sẽ cấu hình cho windowManager và thực hiện vẽ view trong onCreate():
```
override fun onCreate() {
        super.onCreate()

        // add chat view to window
        var params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
             WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
             WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE ,
            PixelFormat.TRANSLUCENT
        ).apply {
            // default pos of chat view
            gravity = Gravity.TOP or Gravity.LEFT
            x = 0
            y = 100
        }
        windowManager.addView(chatHeadView, params)
    }
```

Chúng ta thấy fun **addView()**: nó có nhiệm vụ nhận vào view cần vẽ và thông số param đã  được cấu hình. Như ở phần trước mình có nói lưu ý về phàn cấu hình này.

Chúng ta thấy tham số thứ 3 của param là flag **WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY**. Chính flag này sẽ cho phép vẽ view lên trên cùng của activity window.

Trước kia ta có thể dùng flag **WindowManager.LayoutParams.TYPE_PHONE** tuy nhiên bây giờ đã deprecated , và sẽ gây lỗi cho các bản android mới ( >Android O )

Cuối cùng ta sẽ hủy view khi mà service được hủy:
```
override fun onDestroy() {
        super.onDestroy()
        windowManager.removeViewImmediate(chatHeadView)
    }
```
## Bước 3: Gán các action cho view 
Ở bước này chúng ta sẽ thêm các action drag cho view, và click close view
Thêm đoạn code dưới vào onCreate() của service
```
chatHeadView.apply {
            button_close?.setOnClickListener {
                stopSelf()
            }


            image_chat.setOnTouchListener(object : View.OnTouchListener{
                override fun onTouch(p0: View?, motionEvent: MotionEvent): Boolean {
                    var lastAction: Int? = null
                    var initialX = 0
                    var initialY = 0
                    var initialTouchX = 0f
                    var initialTouchY = 0f

                    when(motionEvent.action) {
                        MotionEvent.ACTION_DOWN -> {
                            //remember the initial position.
                            initialX = params.x
                            initialY = params.y

                            //get the touch location
                            initialTouchX = motionEvent.rawX
                            initialTouchY = motionEvent.rawY

                            lastAction = motionEvent.action
                            return true
                        }
                        MotionEvent.ACTION_UP -> {
                            if (lastAction == MotionEvent.ACTION_DOWN) {
                                val intent = Intent(this@ChatService, MainActivity::class.java)
                                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                                startActivity(intent)

                                //close the service and remove the chat heads
                                stopSelf()
                            }
                            lastAction = motionEvent.action
                            return true
                        }
                        MotionEvent.ACTION_MOVE -> {
                            //Calculate the X and Y coordinates of the view.
                            params.x = (initialX + motionEvent.rawX - initialTouchX).toInt()
                            params.y = (initialY + motionEvent.rawY - initialTouchY).toInt()

                            //Update the layout with new X & Y coordinate
                            windowManager.updateViewLayout(chatHeadView, params)
                            lastAction = motionEvent.action
                            return true
                        }
                    }
                    return false
                }

            })
        }
```

Action close khá đơn giản, ta chỉ việc gọi stop service lại.

Với action drag ta sẽ cần implement onTouch:

- ACTION_DOWN: sẽ lưu lại tọa độ và gán action cho lastAction. Biến này sẽ được dùng để phân biệt click và move ở ACTION_UP
- ACTION_UP: check nếu là click ta sẽ mở màn hình chat (ở demo này mình đang để tạm là mở MainActivity)
- ACTION_MOVE: tính lại tọa độ x,y và update view bằng fun **updateViewLayout()**

Sau bước 2 và 3 ta có class ChatService cuối cùng như sau:
```
class ChatService : Service() {

    private val windowManager: WindowManager by lazy {
        getSystemService(WINDOW_SERVICE) as WindowManager
    }

    private val chatHeadView: View by lazy {
        LayoutInflater.from(this).inflate(R.layout.layout_chat, null)
    }

    override fun onBind(p0: Intent?): IBinder? = null

    override fun onCreate() {
        super.onCreate()

        // add chat view to window
        var params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
             WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE ,
            PixelFormat.TRANSLUCENT
        ).apply {
            // default pos of chat view
            gravity = Gravity.TOP or Gravity.LEFT
            x = 0
            y = 100
        }
        windowManager.addView(chatHeadView, params)
        chatHeadView.apply {
            button_close?.setOnClickListener {
                stopSelf()
            }


            image_chat.setOnTouchListener(object : View.OnTouchListener{
                override fun onTouch(p0: View?, motionEvent: MotionEvent): Boolean {
                    var lastAction: Int? = null
                    var initialX = 0
                    var initialY = 0
                    var initialTouchX = 0f
                    var initialTouchY = 0f

                    when(motionEvent.action) {
                        MotionEvent.ACTION_DOWN -> {
                            //remember the initial position.
                            initialX = params.x
                            initialY = params.y

                            //get the touch location
                            initialTouchX = motionEvent.rawX
                            initialTouchY = motionEvent.rawY

                            lastAction = motionEvent.action
                            return true
                        }
                        MotionEvent.ACTION_UP -> {
                            if (lastAction == MotionEvent.ACTION_DOWN) {
                                val intent = Intent(this@ChatService, MainActivity::class.java)
                                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                                startActivity(intent)

                                //close the service and remove the chat heads
                                stopSelf()
                            }
                            lastAction = motionEvent.action
                            return true
                        }
                        MotionEvent.ACTION_MOVE -> {
                            //Calculate the X and Y coordinates of the view.
                            params.x = (initialX + motionEvent.rawX - initialTouchX).toInt()
                            params.y = (initialY + motionEvent.rawY - initialTouchY).toInt()

                            //Update the layout with new X & Y coordinate
                            windowManager.updateViewLayout(chatHeadView, params)
                            lastAction = motionEvent.action
                            return true
                        }
                    }
                    return false
                }

            })
        }

    }

    override fun onDestroy() {
        super.onDestroy()
        windowManager.removeViewImmediate(chatHeadView)
    }
}
```

## Bước 4: Cấp quyền + startService
Bên class MainActivity chúng ta thực hiện code như sau:
```
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //Check if the application has draw over other apps permission or not?
        //This permission is by default available for API<23. But for API > 23
        //you have to ask for the permission in runtime.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {

            //If the draw over permission is not available open the settings screen
            //to grant the permission.
            val intent = Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:$packageName")
            )
            startActivityForResult(intent, CODE_DRAW_OVER_OTHER_APP_PERMISSION)
        } else {
            showChatView()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == CODE_DRAW_OVER_OTHER_APP_PERMISSION) {

            if (resultCode == Activity.RESULT_OK) {
                showChatView()
            } else {
                // do something to notify
            }
        } else {
            super.onActivityResult(requestCode, resultCode, data)
        }
    }

    private fun showChatView() {
        startService(Intent(this@MainActivity, ChatService::class.java))
        finish()
    }

    companion object {
        const val CODE_DRAW_OVER_OTHER_APP_PERMISSION = 1
    }
}
```

Khi app chạy, ta sẽ check quyền với fun **Settings.canDrawOverlays()**.
Nếu đã được user cấp quyền thì startSevice(). Ngược lại ta sẽ mở đến màn setting tương ứng để yêu cầu quyền.

Sau khi service start ta chỉ cần finish() activity.

Qua 4 bước này chúng ta sẽ có thành quả như sau:
![](https://images.viblo.asia/9d5a2688-965c-4137-a0f1-027f223f5ed9.gif)

Cảm ơn các bạn đã xem bài viết của mình. Happy coding !:D