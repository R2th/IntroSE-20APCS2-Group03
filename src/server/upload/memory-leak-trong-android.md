Tiêu để là tìm hiểu về Memory leak nhưng trước hết mn cùng đọc qua về GC để hiểu hơn về Memory leak nhé  
## I. Garbage collector (GC)
GC là tên viết tắt của Garbage collector tác dụng chính của nó là giải phóng bộ nhớ cho các đối tượng sau khi đối tượng đó ko còn cần thiết nữa.  
GC liên quan rất chặt chẽ đến 2 loại bộ nhỡ mà chúng ta vẫn hay gặp là Stack và Heap
Nên cùng tìm hiểu 2 loại bộ nhớ này trc nhé 
## II. Stack and Heap
![](https://images.viblo.asia/bb3c9d4e-7863-4fbb-84fb-19ec3719987d.png)

Hiểu đơn giản thì stack đc sử dụng để cấp phát bộ nhớ tĩnh còn heap để cấp phát bộ nhớ động. Cùng quan sát ví dụ sau nhé 
![](https://images.viblo.asia/24c561db-2bf8-4932-bd68-d0350c90c6a7.png)
![](https://images.viblo.asia/0a5f8335-5e8e-42e2-bae5-bb6ff89511b7.png)

Mình sẽ mô tả chi tiết hơn về các dòng code ở ví dụ trên nhé   
 Dòng 1: Java Runtime tạo bộ nhớ stack cho main method.  
Dòng 2: Tạo một biến nguyên thủy, được tạo và lưu trữ trong stack của main method.  
Dòng 3: Tạo mới 1 object, được tạo ở stack và lưu trữ ở heap. Stack là nơi chứa reference của object.  
Dòng 4: tương tự dòng 3.  
Dòng 5: 1 block mới được tạo ra trong stack cho foo method (tương tự dòng 1).  
Dòng 6: 1 object mới được tạo trong stack của foo, và reference được truyền vào heap.  
Dòng 7: Tạo 1 String object, tạo trong stack và reference đến String Pool ở heap.  
Dòng 8 và 9: các method chấm dứt, các objects được giải phóng trong stack.  

Và dĩ nhiên điều gì xảy ra khi hoàn thành method 
Khi method foo() hoàn thành   
![](https://images.viblo.asia/c2d15d08-5ff1-4895-b51e-de92a01d191d.png)
 Khi method main() hoàn thành 
 ![](https://images.viblo.asia/41210f30-a360-4d90-82dc-095f3417f496.png)
Vậy là stack đã đc giải phóng khi các method hoàn thành vậy còn heap thì sao? 
Heap khác với stack, nó sẽ không đc lấy tự động khi method hoàn thành. Chính vì vậy java đã tạo ra một con robot để giải phóng không gian bộ nhớ heap và đó chính là Garbage Collector (GC)  
Vậy tại sao có leak
KHi những object ko đc sử dụng trong heap vẫn còn reference từ stack dẫn tới GC không thể giải phóng memory 
 ![](https://images.viblo.asia/c430b3b7-3bb4-4471-b074-c0e260352e81.png)
* Vậy thì khi nào thì object đc trình thu gom rác dọn dẹp ?  
Một object xem là đủ điều kiện để trình thu gom rác dọn dẹp khi mà nó không còn một reference nào đến nó 
```javascript
Box box = new Box();
```
Như đoạn code trên, trình biên dịch sẽ khởi tạo một box object và lưu chúng vào heap, sau đó trả về một reference của nó cho biến box nắm giữ.  
=> Reference nghe có vẻ quen nhưng thật sự mn có đang hiểu đúng về nó không ?  
Khi bạn khởi tạo một object với từ khóa new thì một object mới đc tạo ra và lưu vào trong bộ nhớ heap và trả về 1 reference. Hay nói cách khác reference là địa chỉ của object đc lưu trong heap

## III.  Memory Leak là gì và những nguyễn nhân gây ra memory leak
### 1. Memory leak là gì ?
Bộ nhớ đc cấp phát nhưng không bao giờ đc giải phóng. Có nghĩa là garbage collector không thể đưa chúng vào thùng rác, và chúng ta chỉ có thể done khi nó được đưa vào thùng rác.   
Ban đầu nó sẽ không là vấn đề nhưng thử tưởng tượng bộ nhớ ko đc giải phóng trong vòng 2 tuần thì sao nhỉ 
Tương tự nếu như user tiếp tục sử dụng, thì bộ nhớ ko đc giải phóng tiếp tục tăng dần lên và bộ nhớ ko đc sử dụng không được giải phóng bằng cơ chế dọn rác của Garbage collection. Chính vì vậy bộ nhở của app tiếp tục tăng lên cho đến khi không còn bộ nhớ khả dụng cho app hoạt động  => OutOfMemmoryError và cuối cùng là crash app (chan)  
Vậy thì cách để chúng ta check đc memory leak trong app là gì ??
Có một thư viện rất tuyệt vời gọi là LeakyCanary - một thư viện tuyệt vời giúp tìm ra memory leak trong android   

### 2. Nguyên nhân và cách tránh memory leak 
Chắc hẳn khi code mn cũng sẽ gặp trường hợp param Context được đưa vào trong constructor rồi đúng không. Và mục đích chính của nó là dùng để load và truy cập vào resources.  
Trong những app thông thường, bạn sẽ thấy có 2 loại context chính cho activity và cho application. Và cũng là 2 param mà dev hay đưa sử dụng nhất  

```javascript
@Override
protected void onCreate(Bundle state) {
  super.onCreate(state);
  
  TextView label = new TextView(this);
  label.setText("Leaks are bad");
  
  setContentView(label);
}
```
như trong đoạn code trên acvtivity đang đc đưa làm context của Textview có nghĩa là view sẽ reference đến toàn bộ activity chính vì vậy mà activity của bạn sẽ đc giữ chặt không thể thu hồi bở GC   
=> dẫn tới memory leak (và việc leak toàn bộ các activity là rất dễ dàng nếu như bạn không cẩn thận)
 * Cùng xét trường hợp tiếp theo nhé
 Khi hướng màn hình thay đổi (xoay màn hình) thì hệ thống sẽ :
- Như định nghĩa sẽ destroy current activity và khởi tạo một activity mới trong khi trạng thái vẫn được bảo toàn. Làm như vậy có nghĩa là android đang load UI của ứng dụng từ resource. Bây giờ hãy thử tưởng tượng bạn viết một ứng dụng với một bitmap rất lơn và bạn không muốn load lại khi có thao tác xoay màn hình. Và cách đơn giản nhất là để giữ lại trạng thái của activity là sử dụng biến static 
Các bạn xem lại ví dụ sau nhé : 
```javascript
private static Drawable sBackground;

@Override
protected void onCreate(Bundle state) {
  super.onCreate(state);
  
  TextView label = new TextView(this);
  label.setText("Leaks are bad");
  
  if (sBackground == null) {
    sBackground = getDrawable(R.drawable.large_bitmap);
  }
  label.setBackgroundDrawable(sBackground);
  
  setContentView(label);
}
```
Đoạn code trên rất nhanh nhưng cũng rất sai (chan). Nó làm rò rỉ ngay từ activity đầu tiên khi vừa khởi tạo và sau đó thực hiện xoay màn hình. Khi drawable attach vào view, view sẽ đc set như là một call back trên drawable. Như trong đoạn code trên, điều này có nghĩa drawable có tham chiếu đến textview mà chính bản thân nó có tham chiếu đến activity (context). 
Đoạn code trên chính là một ví dụ đơn giản nhất về rò rỉ ở context.  
Có 2 cách dễ dàng để tránh memory leak do context
* Cách 1 : Tránh thoát khỏi context bên ngoài phạm vi của nó 
Ví dụ : Các bạn cùng xem lại ví dụ trên nhé 
Tham chiếu của một biến static nhưng các tham chiếu ngầm và các tham chiếu ngầm đến lớp bên ngoài có thể nguy hiểm như nhau
* Cách 2 : sử dụng application context. Application context sẽ tiếp tục sống khi ứng dụng của bạn vẫn còn sống và không phụ thuộc vào vòng đời của activity  
Tóm lại để tránh memory leak do context 
- đừng nên giữ tham chiếu tới context-activity sống quá lâu (một tham chiếu đến activity phải có cùng vòng đời với chính activity đó)
- Thay vì sử dụng activity-context nên sử dụng application context
=> Giải thích : nếu sử dụng activity-context chỉ gắn với một activity và khi activity đó hủy đi tham chiếu của context đến acrivity đó vẫn còn và ko đc GC thu dọn, nếu trường hợp nhiều activity thì lại càng nhiều activity-context ko đc thu dọn => càng dễ dẫn đến memory leak. thay vào đó sử dụng application context, nó gắn liền với quá trình sống của ứng dụng, khi ứng dụng ở backgound thì application context ko bị thu hồi bởi GC sẽ chỉ có 1 reference là application   

### 3. Những nguyên nhân chủ quan khác dẫn đến memmory leak
Nếu nói để xảy ra memory leak chỉ vì context thôi là chưa đủ. Và dưới đây là một số nguyên nhân khác mình tổng hợp đc các bạn tham khảo nhé   
**3.1  Broad cast receiver** 
Các bạn cùng xem kịch bản sau nhé :  
Đầu tiên bạn đăng kí một local broadcast receiver trong activity.   
Nếu như bạn không unregister broadcast receiver và khi đó nó vẫn giữ reference của activity do cho bạn đã close activity đó rồi => và dĩ nhiên bộ nhớ để lưu reference của activity đó tắng lên và ko đc giải phóng => Memory leak là đây chứ đâu   
```javascript
public class BroadcastReceiverLeakActivity extends AppCompatActivity {

    private BroadcastReceiver broadcastReceiver;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_first);
    }

    private void registerBroadCastReceiver() {
        broadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                //your receiver code goes here!
            }
        };
        registerReceiver(broadcastReceiver, new IntentFilter("SmsMessage.intent.MAIN"));
    }
    
    
    @Override
    protected void onStart() {
        super.onStart();
        registerBroadCastReceiver();
    }    


    @Override
    protected void onStop() {
        super.onStop();

        /*
         * Uncomment this line in order to avoid memory leak.
         * You need to unregister the broadcast receiver since the broadcast receiver keeps a reference of the activity.
         * Now when its time for your Activity to die, the Android framework will call onDestroy() on it
         * but the garbage collector will not be able to remove the instance from memory because the broadcastReceiver
         * is still holding a strong reference to it.
         * */

        if(broadcastReceiver != null) {
            unregisterReceiver(broadcastReceiver);
        }
    }
}
```
Cách gải quyết : Luôn luôn unregister receiver trong onStop() của activity   
Note : Nếu như broadcast receiver đc khai báo trong onCreate(), khi app đi vào background và sau đó lại quay vào resume thì receiver sẽ không đc register một lần nữa. Và điều luôn luôn tốt   
=>> chính vì vậy cách tốt nhất là nên register trong onStart() hoặc onResume() của activity và unregister trong onStop()

**3.2 Static activity or view reference**   
Cùng xem ví dụ dưới đây nhé   
```javascript
public class StaticReferenceLeakActivity extends AppCompatActivity {

    /*  
     * This is a bad idea! 
     */
    private static TextView textView;
    private static Activity activity;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_first);
        
        
        textView = findViewById(R.id.activity_text);
        textView.setText("Bad Idea!");
           
        activity = this;
    }
}
```

Bạn khai báo 1 TextView như là một static.  
Nếu reference cuả activity hoặc view, trực tiếp hoặc ko trực tiếp từ 1 static reference thì activity sẽ không đc thu hồi sau khi bị destroy   
Nếu activity hoặc view đc khai báo là static thì khi activity bị destroy sẽ không thu hồi đc bộ nhớ đã đc cấp phát cho view và activity đó  
Cách giải quyết : Không bao giờ sử dụng biến static cho activity, view, hoặc contexts.   
**3.3 Singleton class reference**
Chúng ta nhớ lại một chút Singleton pattern là gì nhé   
Singleton Pattern là một trong những design pattern đơn giản nhất trong Java.  Loại design pattern này thuộc mẫu creational pattern có nghĩa là singleton pattern cung cấp cách đơn giản nhất để tạo ra một object   
Như trong sơ đồ bên dưới Singleton Pattern sẽ liên quan đến một class mà class này chịu trách nhiệm khởi tạo một object và  đảm bảo rằng chỉ có một object duy nhất đc khởi tạo   
![](https://images.viblo.asia/e8535fb7-0368-4687-b6c4-12ec58cdd0e4.png)

Quay trở lại với Singleton Class  
Singleton class là class mà trong đó có method return instance của chính object đó và điều đặc biệt là method này bắt buộc phải khai báo static  
Cùng xem ví dụ dưới đây, bạn cần định nghĩa 1 singleton class như đoạn code bên dưới 
```javascript
public class SingletonSampleClass {
  
    private Context context;
    private static SingletonSampleClass instance;
  
    private SingletonSampleClass(Context context) {
        this.context = context;
    }

    public synchronized static SingletonSampleClass getInstance(Context context) {
        if (instance == null) instance = new SingletonSampleClass(context);
        return instance;
    }
  
    public void onDestroy() {
       if(context != null) {
          context = null; 
       }
    }
}
```
Thêm param context vào instance của SingletonSimpleclass   
=> tại sao lại gây ra vấn đề memory leak trong trường hợp này 
Cách giải quyết vấn đề :   
option 1 : Thay vì truyền param context chuyển sang truyền param application context   
option 2: nếu như bạn vẫn muốn sử dụng pass param context vào  thì khi activity bị destroy hãy chắc chắn rằng context mà bạn đưa vào trong param trc đó đã đc set là null  

**Link tham khảo**  
https://android-developers.googleblog.com/2009/01/avoiding-memory-leaks.html  
https://android.jlelse.eu/9-ways-to-avoid-memory-leaks-in-android-b6d81648e35e