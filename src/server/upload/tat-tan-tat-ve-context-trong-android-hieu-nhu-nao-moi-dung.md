Các bạn đã bao giờ tự hỏi hay là thắc mắc rằng Chúng ta có thể khởi tạo 1 activity hay không???
```
 Activity mActivity = new Activity()
```
Câu trả lời sẽ KHÔNG? Nhưng tại sao??

Ứng dụng Android đang sử dụng java, nhưng không giống như java mà bạn có thể tạo một lớp và hàm main(), sau đó có thể chạy. 
```
public static void main(String[] args) {

        Random rd = new Random();
        // DO Something
}
```

Android hoạt động dựa trên các thành phần chính bao gồm Activity, Service, ContentProvider và Broadcast receiver. Bạn không thể tạo một component mới chỉ đơn giản bằng cách sử dụng từ khóa 'new' vì tất cả các component này đều có ngữ cảnh riêng (context). Activity được extend từ Context, Service và Application cũng extend từ Context.

Đối với Interface. Đây là một lớp trừu tượng mà việc implementation được cung cấp bởi hệ thống Android. Nó cho phép truy cập vào các *resources and classes* dành riêng cho ứng dụng, cũng như các lệnh gọi lên cho các hoạt động ở cấp application, như là start Activity, broadcasting and receiving intents...v.v.

![](https://images.viblo.asia/e943b428-4dc1-41c1-b143-f8054480e0dc.png)

Từ sơ đồ trên. **ContextImpl** đang *implementing* tất cả các phương thức trừu tượng (abstract functions) của Context và ContextWrapper bao bọc(wraps) tất cả các phương thức từ Context và sử dụng implementation từ lớp ContextImpl. Phương thức *attachBaseContext*  của lớp ContextWrapper sẽ đảm bảo rằng context chỉ được *attached* một lần. ContextThemeWrapper, như tên gọi của nó, áp dụng chủ đề(theme) từ **application** hoặc **Acitivty** được định nghĩa qua thẻ *'android: theme'* trong tệp AndroidManifest.xml. Vì cả *application* và *Service* đều không cần chủ đề(theme), vì vậy chúng kế thừa trực tiếp từ ContextWrapper. Trong quá trình hoạt động, *application* và *Service* được khởi chạy, một đối tượng ContextImpl mới sẽ được tạo ra mỗi lần thực thi các phương thức trong Context.

```java
public class ContextWrapper extends Context {
    Context mBase;

    public ContextWrapper(Context base) {
        mBase = base;
    }
    
    /**
     * Set the base context for this ContextWrapper.  All calls will then be
     * delegated to the base context.  Throws
     * IllegalStateException if a base context has already been set.
     * 
     * @param base The new base context for this wrapper.
     */
    protected void attachBaseContext(Context base) {
        if (mBase != null) {
            throw new IllegalStateException("Base context already set");
        }
        mBase = base;
    }
    ......
}
```

## How many Context in an Application?
Có bao nhiêu context trong một ứng dụng?

Từ trên, chúng ta có thể kết luận rằng số ngữ cảnh Number(Context)=Activity+Service+1(Application). Đối với các thành phần khác như  Context Provider, Broadcast Receiver không phải là lớp con của Context. Vì vậy, chúng không được tính, nhưng chúng ta cần truyền context object cho chúng khi tạo một đối tượng mới.

## What Context can do?

**Context** vô cùng mạnh mẽ, nhưng nó vẫn có một số hạn chế. Vì Context được thực thi bởi ContextImpl, nên trong hầu hết các tình huống, chúng ta có thể sử dụng chung Context của activity, service and application. Tuy nhiên, trong một số tình huống như start một Activity or show pop up dialog, nó phải sử dụng ngữ cảnh của Activity vì Activity mới dựa trên Activity khác để tạo thành một stack, hộp thoại bật lên cũng cần hiển thị trên đầu Activity ngoại trừ một số hộp thoại cảnh báo từ hệ thống .

![](https://images.viblo.asia/330e1b3c-15c2-4a6e-8467-907a42e93328.png)

- Nếu chúng ta sử dụng ApplicationContext để bắt đầu một Activity với standard lauch mode, nó sẽ ném expcetion "ndroid.util.AndroidRuntimeException: Calling startActivity from outside of an Activity context requires the FLAG_ACTIVITY_NEW_TASK flag. Is this really what you want?" Ngoại lệ này là do không có Activity context có trong stack activity(ngăn xếp Activity). Vì vậy, từ Service và Application chỉ có thể sử dụng FLAG_ACTIVITY_NEW_TASK (Activity này sẽ trở thành phần bắt đầu của một task mới trên history stack.) để bắt đầu một Activity, tuy nhiên cách này không được khuyến cáo sử dung?
- Context Nó có thể inflate the layout, nhưng sẽ chỉ áp dụng chủ đề mặc định của hệ thống android, những chủ đề tùy chỉnh đó sẽ không thể áp dụng vì chỉ Activity mở rộng lớp ContextThemeWrapper.

## Ways to get Context?
Có những cách nào để getContext:

1. **view.getContext()** đó là Activity context mà view được lưu trữ.
2. **Activity.getApplicationContext()** lấy bối cảnh ứng dụng hiện tại, khi chúng ta cần ngữ cảnh, bối cảnh toàn cục này trước tiên cần được xem xét.
3. **Activity.this** khi một số UI controler cần context hoặc start một Activity. Toast có thể sử dụng ApplicationContext.

## Difference between getApplication() and getApplicationContext()
Sự khác nhau giữa getApplication() and getApplicationContext()

```java
Override
    public Context getApplicationContext() {
        return (mPackageInfo != null) ?
                mPackageInfo.getApplication() : mMainThread.getApplication();
    }
```

Trên thực tế, cả hai hàm đều trả về đối tượng Application vì bản thân Application là một context. Vậy tại sao android cung cấp hai phương thức trên? Lý do là vì *getApplication()* chỉ có thể được sử dụng trong Activity và Service. Trong các thành phần khác như BroadcastReceiver chỉ có thể sử dụng getApplicationContext() để lấy đối tượng Application.

## Improper use of context can easily cause memory leak
Nếu sử dụng không đúng context có thể dễ dàng gây rò rỉ bộ nhớ.

*Ví dụ 1:*
```java
public class Singleton{
    private static Singleton instance;
    private Context mContext;
    
    private Singleton(){};
    
    public static Singleton getInstance(Context context){
        if(instance==null){
            synchronized(Singleton.class){
                if(instance==null){
                    instance = new Singleton();
                    mContext = context;
                }
            }
        }
        return instance;
    }
}
```

Vì Singleton sẽ tồn tại một thời gian dài trong ứng dụng, điều này khiến ngữ cảnh được giữ bởi nó và GC sẽ không thể clean được.

*Ví dụ 2:*
```
public class MainActivity extends Activity {
    private static ImageView mImageView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ...
        mImageView = (ImageView)findViewById(R.id.imageId);
}
```

Vì ImageView là static và ngữ cảnh hiện tại là Activity. Điều này được tham chiếu bởi imageview, nên toàn bộ Activity bị leaked.

## Some tips to use context:
Một số mẹo để sử dụng context, Kể từ khi ứng dụng tồn tại cho đến khi kết thúc, vì vậy chúng ta có thể lưu í một số vấn đề như sau:
- Khi application context có thể xử lý, hãy sử dụngapplication context làm ưu tiên đầu tiên.
- Không sử dụng/tham chiếu của Activity có vòng đời dài hơn Activity.
- Không sử dụng *non static inner class* bên trong *activity since inner class* vì lớp bên trong có tham chiếu ngầm đến lớp bên ngoài. Nếu sử dụng các *static inner classes*, hãy sử dụng tham chiếu yếu của các đối tượng từ lớp bên ngoài.

TÀI LIỆU THAM KHẢO:
- https://ericyang505.github.io/android/Context.html
- https://developer.android.com/reference/android/content/Context