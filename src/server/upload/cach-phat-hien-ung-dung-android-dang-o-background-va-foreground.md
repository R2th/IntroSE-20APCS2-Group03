Xin chào mọi người, bài viết này mình sẽ hướng dẫn các bạn cách để bắt được sự kiện khi ứng dụng chuyển về Background và Foreground.
Tuần trước team mình có 1 task là khi app chuyển từ Background tới Foreground thì clear hết Notification của app và mình đã áp dụng cách mà mình chuẩn bị hướng dẫn sau đây, hy vọng nó sẽ giúp ích được cho mọi người trong những trường hợp khác nữa.

## Detecting App Lifecycler Events

### Backgrounding
***ComponentCallbacks2*** - Đọc tài liệu thì không rõ ràng về cách sử dụng callback này. Tuy nhiên, khi đọc kỹ thì có 1 phương thức **onTrimMemory(int)** với đối số truyền vào là 1 cờ, những cờ này thường được sử dụng cho việc kiểm tra bộ nhớ còn trống nhưng cái mà chúng ta quan tâm là TRIM_MEMORY_UI_HIDDEN. Bằng việc kiểm tra xem UI có đang bị ẩn hay không, chúng ta có thể giả định rằng ứng dụng hiện đang ở chế độ Background

### Foreground
***ActivityLifecycleCallbacks***- Chúng ta có thể sử dụng event này để detect Foreground bằng cách overriding **onActivityResumed(Activity)** và theo dõi trạng thái ứng dụng hiện tại (Foreground/Background)

### Implementing một Foreground và Background Handler
Đầu tiên, chúng ta cùng tạo 1 interface để giúp các class khác lắng nghe các sự kiện Background và Foreground
```
interface LifecycleDelegate {
    void onAppBackgrounded()
    void onAppForegrounded()
}
```
Tiếp theo, chúng ta cần 1 class sẽ implement 2 interface **ActivityLifecycleCallbacks** và **ComponentCallbacks2** mà chúng ta đã thảo luận ở bên trên. Tôi sẽ đặt tên class đó là **AppLifecyclerHandler** và implement 2 interface trên. Trong các hàm mà chúng ta phải override thì chúng ta chỉ quan tâm đến 2 hàm: 
```
class AppLifecyclerHandler implements ActivityLifecycleCallbacks, ComponentCallbacks2 {

        private LifecycleDelegate mLifecycleDelegate;
        private boolean mIsAppInForeground = false;

       // Truyền 1 thể hiện của LifecycleDelegate vào hàm khởi tạo
        public AppLifecyclerHandler(LifecycleDelegate lifecycleDelegate) {
            mLifecycleDelegate = lifecycleDelegate;
        }
        
        @Override
        public void onActivityResumed(Activity activity) {
            if (!mIsAppInForeground) {
                mIsAppInForeground = true;
                mLifecycleDelegate.onAppForegrounded();
            }
        }
        
        @Override
        public void onTrimMemory(int flag) {
            if (flag == ComponentCallbacks2.TRIM_MEMORY_UI_HIDDEN) {
                mIsAppInForeground = false;
                mLifecycleDelegate.onAppBackgrounded();
            }
        }
      ...
}
```

Như các bạn thấy thì mình có sử dụng thêm 1 biến `mIsAppInForeground`, bởi vì hàm **onActivityResumed(Activity)**  sẽ được gọi mỗi khi có 1 **Activity** của ứng dụng bị **Resumed**, nên sẽ dẫn tới hàm **onAppForegrounded()** của chúng ta sẽ được gọi mỗi khi có bất kỳ **Activity** nào **Resumed**. 
Những gì chúng ta cần phải làm đó là sử dụng 1 **flag** để quyết định xem liệu hàm **onAppForegrounded()** có được gọi tiếp hay không và chúng ta sẽ reset nó khi ứng dụng trở về trạng thái Background.

### AppLifecycleHandler
Bây giờ tất cả những gì chúng ta cần phải làm là class custom **Application** implement interface **LifecycleDelegate** và đăng ký nó:

```
public class CustomApplication extends Application implements LifeCycleDelegate {
    @Override
    public void onCreate() {
        super.onCreate();
        AppLifecycleHandler appLifecycleHandler = new AppLifecycleHandler(this);
        registerActivityLifecycleCallbacks(appLifecycleHandler)
        registerComponentCallbacks(appLifecycleHandler)
    }
   
}
```

Oke. Và giờ bạn đã có 1 cách để lắng nghe khi ứng dụng chuyển vào chế độ Background và Foreground. 
Cách này chỉ sử dụng như là 1 ý tưởng thôi vì khái niệm cốt lõi của việc sử dụng các hàm **onTrimMemory(int)** và **onActivityResumed(Activity)** đều không sử dụng cho việc này. Nếu có bất kỳ ai biết 1 cách hay ý tưởng khác thì hãy comment để mọi người cùng thảo luận nhé :D Cảm ơn mọi người đã đọc ^^

Nguồn: https://android.jlelse.eu/how-to-detect-android-application-open-and-close-background-and-foreground-events-1b4713784b57