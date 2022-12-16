## 1. Tổng quan về Broadcast Receiver  
Là một trong 4 component trong android với mục đích lắng nghe các sự kiện, trạng thái mà hệ thống phát ra thông qua internet từ đó giúp lập trình viên có thể kiểm soát được sự kiện ngay trong ứng dụng của mình
## 2. Thay đổi hệ thống phát sóng theo các phiên bản Android
**Android 9**
*  Từ phiên bản android 9 ( API level 28) phát song sư kiện  NETWORK_STATE_CHANGE_ACTION sẽ không nhận được thông tin về vị trí người dùng hoặc dữ liệu nhận dạng cá nhân
-	Hơn thế nữa, nếu app của bạn được install trong thiết bị android 9 hoặc cao hơn, thì các chương trình phát song từ wifi sẽ không chứa SSIDs, BSSIDs, thông tin connect ..., hoặc quet kết quả, và để lấy được những thông tin này gọi hàm getConnectionInfo()    

**Android 8** 
-	Bắt đầu từ android 8 (api level 26), thì hệ thống sẽ hạn chế đăng kí receiver trong manifest
-	Bạn không thể sử dụng manifest để khai báo một receiver cho hầu hết các implicit broadcast( implicit broadcast không có một mục tiêu cụ thể tới ứng dụng của bạn). Tuy nhiên bạn vẫn có thể sử dụng đăng kí receiver trong file java khi người dùng đang sử dụng app của bạn  

**Android 7**
-	Từ android 7 (api level 24) và cao hơn không gửi phát songs hai sự kiện dưới đây  
ACTION_NEW_PICTURE  
ACTION_NEW_VIDEO  
Vì vậy, ứng dụng được cài đặt trong thiết bị android 7 và cao hơn phải đăng kí CONNECTIVITY_ACTION broadcast sử dụng registerreceiver(BroadcastReceiver, IntentFilter), khai  báo receiver trong manifest là không hoạt động
## 3.	Receiving Broadcast
Ứng dụng có thể nhận broad cast theo hai cách
-	Cách 1: Khai báo trong manifest
-	Cách 2: Đăng kí trong file java (context register receiver)  
    ### 	Đăng kí trong manifest
-	Nếu như bạn đăng kí một broadcast receiver trong manifest, hệ thống khởi chạy app của bạn khi broadcast được gửi đi  
Chú ý : Nếu target API trong app của bạn là 26 hoặc cao hơn, bạn không thể sủ dụng manifest để đăng kí một receiver cho implicit broadcast. Ngoại trừ một vài chương trình tiềm ẩn được miễn trừ hạn chế đó. Còn trong hầu hết các trường hợp có thể sử dụng schedule job để thay thế 
-	Để khai báo một broadcast receiver trong manifest thực hiện theo các bước sau đây
```javascript
<receiver android:name=".MyBroadcastReceiver"  android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED"/>
        <action android:name="android.intent.action.INPUT_METHOD_CHANGED" />
    </intent-filter>
</receiver>
```
* Bước 1: Khởi tạo Intent Filter (Intent filter chỉ định hành động mà hệ thống phát ra do người nhận đăng kí). Trong trường hợp này tương ứng là sự kiện lắng nghe bật tắt dữ liệu mạng , chuyển chế độ máy bay  
* Khi bạn lắng nghe một sự thay đổi nào đó bằng broadcast thì đương nhiên nó phải trả kết quả về một nơi nào đó, ở đây chính là class mà bạn đã khai báo trong manifest và "MyBroadcastReceiver" chính là class  bạn sẽ khởi tạo để nhận thông báo cho những action đã đăng kí lắng nghe ở trên  
* Bước 2 : khởi tạo một class kế thừa Broadcast Receiver và khi đó nó se implement onReceive(Context, Intent)
```javascript
public class MyBroadcastReceiver extends BroadcastReceiver {
        private static final String TAG = "MyBroadcastReceiver";
        @Override
        public void onReceive(Context context, Intent intent) {
            StringBuilder sb = new StringBuilder();
            sb.append("Action: " + intent.getAction() + "\n");
            sb.append("URI: " + intent.toUri(Intent.URI_INTENT_SCHEME).toString() + "\n");
            String log = sb.toString();
            Log.d(TAG, log);
            Toast.makeText(context, log, Toast.LENGTH_LONG).show();
        }
    }
```
###  Đăng kí trong file Java
-	Bước 1 : khởi tạo instance of BroadcastReceiver
```javascript
    BroadcastReceiver br = new MyBroadcastReceiver();
```
-	Bước 2 : khởi tạo IntentFilter and đăng kí receiver bởi lời gọi registerReceiver(BroadcastReceiver, Intent)
```javascript
IntentFilter filter = new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION);
    filter.addAction(Intent.ACTION_AIRPLANE_MODE_CHANGED);
    this.registerReceiver(br, filter);
```
Chú í : Để đăng kí một LocalBroadcast, gọi hàm LocalBroadcastManager.registerReceiver(BroadcastReceiver, IntentFilter)  
Cùng tìm hiểu về localBroadcastManager: 
LocalBroadcastManager như một người trợ giúp cho việc đăng kí và gửi các chương trình phát sóng tới các đối tượng local trong tiến trình của bạn. Điều này sẽ có lợi thế hơn khi bạn sử dụng sendBroadcast(Intent)  
Ưu điểm :   
    -	Bạn sẽ không phải lo lắng về về việc dò rỉ dữ liệu vì dữ liệu chỉ đc gói gọn trong project của bạn   
    -	Bạn không phải lo lắng về các lỗ hổng bảo mật vì nó không send broadcast tới ứng dụng khác  
    - Các receiver đăng kí theo Context( tức là đăng kí trong file java) sẽ nhận đc broadcast miễn là ngữ cảnh đăng kí của nó hợp lệ  
Ví dụ : Nếu bạn đăng kí trong một activity context thì bạn sẽ nhận đc broadcast chỉ khi activity không bị destroyed. Nếu bạn đăng kí trong application context, bạn sẽ nhận broadcast chỉ khi app của bạn đang running

*  Bước 3 : để dừng việc nhận Broadcast, call unRegisterReceiver(BroadcastReceiver). Chắc chắn rằng hủy đăng kí receiver khi bạn không còn cần đến nó hoặc context không còn khả dụng  
**Chú í** : tuy nhiên hãy cẩn thận với những nơi bạn đăng kí và những nơi bạn hủy đăng kí. 
Nếu bạn đăng kí trong onCreate(Bundle) thì bạn nên hủy nó trong onDestroy()  để ngăn chặn dò rỉ người nhận ra ngoài context  
Nếu bạn đăng kí trong onResume() thì bạn nên hủy đăng kí trong onPause() để ngăn chặn đăng kí nó nhiều lần 
Không nên hủy đăng kí trong onSaveInstanceState(Bundle), bởi vì nó sẽ không được gọi nếu người dùng back về
## 4.	Hiệu ứng trên trạng thái xử lí
* Trạng thái Broadcast receiver( liệu nó có đang chạy hay không) phụ thuộc vào trạng thái của tiến trình đang chứa nó, cái mà có thể lần lượt ảnh hưởng đến khả năng bị kill của hệ thống (các bạn có thể tham khảo bài viết về Process ở đây nhé [Process and Thread](https://viblo.asia/p/process-thread-in-android-gDVK2Qpr5Lj))  
* Ví dụ khi tiến trình thực thi một receiver nó được cân nhắc để trở thành một foreground process. Hệ thống sẽ giữ tiến trình đang chạy này  trừ khi  bộ nhớ bị thiếu cực kì cao
* Tuy nhiên khi code của bạn trả về tự hàm onReceive() , thì Broadcast Receiver sẽ không còn sống nữa. Nếu receiver được khai báo trong manifest thì khi mà code của bạn trả về từ hàm onReceive() hệ thống sẽ xem xét mức độ ưu tiên của tiến trình nếu mức độ ưu tiên này là thấp thì hệ thống có thể kill nó để tài nguyên đc khả dụng cho một tiến trình quan trọng khác  
Cũng bởi vì lí do này, bạn không nên start long running trong background thread từ một BroadcastReceiver. 
Như đã nói ở trên hệ thống sẽ kill tiến trình bất cứ khi nào bộ nhớ thấp và nó sẽ dừng các thread đang chạy trong tiến trình đó. Và để tránh điều này bạn có thể sử dụng goAsync() hoặc lên lịch JobService từ receiver sử dụng JsobScheduler  
## 5.	SendingBroadcast 
có 3 cách để gửi một Broadcast  
**SendOrderBroadcast(Intent, string)**  
* sendOrderBroadcast(Intent, String) : method này sẽ gửi broadcast tới một receiver tại một thời điểm và lần lượt mỗi receiver sẽ gửi broadcast tới các receiver tiếp theo hoặc hoàn toàn có thể bủy bỏ broadcast để nó không chuyển sang broadcast khác 
* thứ tự run của receiver có thể được điều khiển bởi thuộc tính android: priority trong IntentFilter, nếu receiver với một mức độ ưu tiên như nhu thì thứ tự run cũng tùy í

![](https://images.viblo.asia/89414e52-7dc5-47bf-b801-0887dbee19dc.png)

- Intent : Intent để phát sóng,  tất cả receiver matching với intent này sẽ nhận đc broadcst
- receiverPermission : tên của permission mà một receiver phải giữ để nhận đc broadcast ( nó là như là một điều kiện để receiver có thể nhận đc Broadcast đó). Nếu receiverPermission bằng null thì không có yêu cầu gì đối với Receiver  

**sendBroadcast(Intent)**
-	method này sẽ gửi tới tất cả receiver theo một thứ tự không xác định . Receiver không thể nhận kết quả từ một receiver khác, mà nó nhận trực tiếp từ Broadcast và nó cũng không thể hủy bỏ đc broadcast 

![](https://images.viblo.asia/7c7db93e-3a3d-49e3-91d7-436ea20a618f.png)

**LocalBroadcastManager.sendBroadcast**  
- method này sẽ gửi broadcast tới receiver trong cùng một ứng dụng. Nếu bạn không cần gửi broadcast tới những app xung quanh thì sử dụng local broadcast này sẽ thích hợp hơn vì không cần liên lạc giữa các tiến trình vàbạn cũng không cần lo lắng về các chính sách bảo mật của app khác vì dữ liệu bạn gửi chỉ trong ứng dụng của mình thôi

**Chú í** : intent sử dụng cho việc gửi các Broadcast và intent dùng start activity nó hoàn toàn không liên quan đến nhau. Receiver nhận đc broadcast không thể xem hoặc nắm bắt intent start một activity
Và ngược lại
## 6.	Hạn chế broadcast với permission 
Permission cho phép bạn hạn chế phát song tới tập hợp các ứng dụng chứa các quyền nhất định, bạn có thể hạn chế người gửi hoặc người nhận broadcast  
    **sending with permission**   
Khi bạn gọi sendBroadcast(Intent, String) hoặc sendOrderedBroadcast(Intent, String, BroadcastReceiver, Handler, int, String, Bundle) bạn có thể chỉ định một tham số là permission. Chỉ có receivers người yêu cầu permission đó với thẻ trong manifest có thể nhận broadcast.  
**Receiving a permission**   
Nếu như bạn chỉ định một tham số permission khi đăng kí một broadcast receiver thì chỉ có broadcast người mà yêu cầu permission với thẻ <uses-permission> trong manifest có thể gửi một Intent tới receicer  
## 7.	Các lưu í về bảo mật và cách xử lí 
-	Nếu bạn không cần gửi broadcast tới các thành phần bên ngoài app khi đó gửi và nhận local broadcast sử dụng LocalBroadcastManager sẽ phù hợp hơn rất nhiều vì bạn vì nó cho phép bạn tránh được các vấn đề bảo mật nào liên quan tới ứng dụng khác và chúng có thể gửi hoặc nhận broadcast của bạn 

-	Nếu nhiều ứng dụng đã đăng kí nhận cùng một broadcast trong tập tin manifest điều này sẽ khiến hệ thống khởi chạy ứng dụng nhiều lần làm giảm trải nghiệm người dùng  và để tránh điều này bạn nên đăng kí receiver trong file java hơn là trong manifest. Ví dụ nếu phát sóng CONNECTTIVITY_ACTION thì chỉ những receiver nào đăng kí theo ngữ cảnh mới có thể nhận đc broadcast này

-	Không nên phát những thông tin nhạy cảm sử dụng một implicit intent. Bởi vì thông tin này có thể dudocj đọc bởi bất kì app nào đăng kí nhận broadcast này. Có 3 cách để điều khiển người có thể nhận broadcast của của bạn
o	Bạn có thể chỉ dudnhj một permission khi gửi một broadcast 
o	ở android 4.0 hoặc cao hơn, bạn có thể chỉ định package với method setPackage(String) khi đang gửi một broadcast . hệ thống sẽ hạn chế phát sóng tới tập hợp các ứng dụng phù hợp với package đó
o	bạn có thể gửi local broadcast với LocalBroadcastManager.  

-	Khi bạn đăng kí người nhận, bất kì ứng dụng nào cũng có thể gửi các broad cast độc hại tới receiver trong ứng dụng của bạn. có ba cách để giới hạn các chương trình phát sóng mà ứng dụng của bạn nhận được   
    * Bạn có thể chỉ định một permission khi nhận một broadcast receiver  
    * Đối với đăng kí receiver trong manifest, bạn có thể set một thuộc tính là android:exported = “false” trong manifest để không nhận broadcast từ ứng dụng bên ngoài app  
    * Bạn cugnx có thể tự giới hạn nhận broadcast với các LocalBroadcast bằng việc sử dụng LocalBroadcastManager

-	Bởi vì không gian tên cho broadcast là global nên bạn hãy chắc chắn rằng tên action của bạn và các tên khác được viết trong ứng dụng của bạn không bị trùng nhau

-	Bởi vì method trog onReceive(Context, Intent) thường chạy trong main thread. Nó nên thực thi các task ngắn trong thời gian ngắn. Hãy cẩn thận với các luồng được sinh ra và start một background service vì hệ thống có thể kill toàn bộ tiến trình sau khi trả về từ hàm onReceive().để thực hiện các công việc chạy dài chúng tôi khuyên bạn nên sử dụng goAsync() hoặc JobScheduler
## 8. goAsync() và JobScheduler
**goAsync()**  
* *pulic final BroadcastReceiver.PendingResult goAsync()*   hàm này có thể được gọi bởi ứng dụng trong onReceive(Context, Intent) cho phép bạn giữ Broadcast active sau khi được trả về từ hàm onReceve()
Nó không làm thay đổi những mong đợi tương đối nhạy cảm với BroadcastReceiver nhưng nó cho phép thực hiện di chuyển công việc liên quan đến nó qua một luồng khác tránh làm hỏng main UI thread    
Theo một quy tắc chung thì broadcast receiver được phép chạy tối đa 10 s trước khi hệ thống sẽ xem xét là không phản hồi và bắn ra một lỗi ARN trong app của bạn. vì chúng  thường chạy trong main thread, mà ở main thread thì sẽ có một giới hạn thời gian là 5s cho các hoạt động khác có thể xảy ra ở đó.
Tuy nhiên khi bạn sử dụng goAsync() mặc dù có thể tắt main thread. Nhưng giới hạn thực thi Broadcast vẫn sẽ được áp dụng, nó sẽ bao gồm thời gian giữa việc gọi phương thức này tới pendingResult.finish() 
* **Chú í** : BroadcastReceiver.PendingResult : nó được trả về từ goSync() trong khi onReceive() vấn đang hoạt động. Nó cho phép bạn quay trở lại mà không làm ngừng việc phát sóng. Và khi đó bạn phải gọi finish để kết thúc quá trình phát sóng. Nó cũng cho phép bạn xử lí các broadcast trong mainthread    
Nó cũng có thể chuyển các công việc sang một luồng khác để xử lí  

**Lập lịch công việc với JobScheduler**   
* Đây là một API để lập lịch các loại công việc khác nhau dựa vào framework sẽ được thực thi trong quá trình thực thi ứng dụng của bạn   
* JobInfo : chứa dữ liệu được truyền tới JobScheduler. Nó sẽ đóng gói các tham số cần thiết để lên lịch làm việc với ứng dụng. chuungs được xây dựng bằng cách sử dụng JobInfo.Builder. Bạn phải chỉ định it nhất một loại ràng buộc trên đối tượng JobInfo mà bạn đang tạo 
* Bạn sẽ phải khởi tạo một đối tượng là JobInfo Object và chuyển nó tới JobScheduler bằng schedule(JobInfo). Hệ thống sẽ thực hiện công việc này trên JobService của ứng dụng của bạn. Bạn cũng có thể xác định thành phần dịch vụ thực hiện logic cho công việc của bạn khi bạn xây dựng jobInfo bằngJobInfo.Builder.JobInfo.Builder (int, android.content.ComponentName).
Framework sẽ là một lựa chọn thông minh khi thực thi công việc, nó sẽ cố gắng xếp hàng và trì hoãn chúng càng nhiều càng tốt. thông thường nếu bạn không chỉ định thời hạn cho một công việc nó có thể chạy bất cứ lúc nào tùy thuộc vào trạng thái hiện tại của hàng đợi nội bộ của JobScheduler.  
- Trong khi công việc đang chạy hệ thống giữ một wakelook thay cho ứng dụng của bạn. vì lí do này bạn không cần thực hiện bất kì hành động nào mà vẫn đảm bảo rằng thiết bị vẫn đang thức trong suốt thời gian của công việc.  
- Bạn không khởi tạo trực tiếp lớp này; thay vào đó, hãy truy xuất nó thông qua Context.getSystemService (Context.JOB_SCHEDULER_SERVICE).
Các cá thể của lớp này phải được lấy bằng cách sử dụng Context.getSystemService (Lớp) với đối số JobScheduler.class hoặc Context.getSystemService (String) với đối số Context.JOB_SCHEDULER_SERVICE.
-	Không nên start activity từ broadcast vì lúc trải nghiệm người dùng đang chập chờn nhất là khi có nhiều hơn một người nhận. thay vào đó hãy xem xét cách hiển thị các thông báo  
## Tài liệu tham khảo 
https://developer.android.com/guide/components/broadcasts