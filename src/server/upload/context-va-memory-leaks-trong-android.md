Một trong những thứ mà dev tìm hiểu đầu tiên khi bắt đầu lập trình Android nhưng cũng hay bỏ qua nhất đó chính là **Context**. `Toasts`, `Adapters`, `Intents`, `Inflaters`, `SharedPreferences`, `SystemServices` là những thuật ngữ thường được liên kết với Context. Hiển thị Toast, mở màn hình mới, tạo view mới  hoặc lưu dữ liệu trong preferences là tất cả các hành động yêu cầu sử dụng Context làm đối số. 

Đôi khi giải pháp rất đơn giản (như sử dụng `this` nếu chúng ta đang ở trong một `Activity` ), nhưng những lúc khác, chúng ta không chắc mình đang làm gì và chúng ta vẫn tự hỏi về điều đó…
# What is the Context?
An interface to the application environment.
![](https://miro.medium.com/max/448/1*0X2clklAFLmCDYuFW1Iong.jpeg)
Đậu xanh… OK… nhưng điều đó có nghĩa là gì…

Định nghĩa đó đang muốn nói với chúng ta rằng Context là một lớp có các phương thức để truy cập tài nguyên ứng dụng và dịch vụ hệ thống.

Để có được Context, chúng ta thường sử dụng `Activity` (**this**)  vì vậy, chúng ta có thể suy luận rằng `Activity` chính là một `Context`.

Và thực tế thì  Activity, Service hoặc Application là những triển khai cụ thể của lớp trừu tượng Context. Bên trong một ứng dụng có thể có một số Activities, một số Services và do đó, nhiều hơn một Context, nhưng chỉ có một Ứng dụng và do đó thì chỉ có một `Application Context`.
![](https://miro.medium.com/max/600/1*UfkM21pehBV_V9avkhywmw.png)

## Context dùng để làm gì?
Các tình huống phổ biến nhất khi chúng ta cần sử dụng Context là khi sử dụng các Views (`Toasts`, `Adapters`, `Inflaters`), khởi chạy Activities  (`Intents`) hoặc truy cập các dịch vụ hệ thống (`SharedPreferences`, `ContentProviders`). Nếu bạn đang tìm kiếm một cách phân loại chính thức hơn, thì có 4 loại sau:
* Thu thập tài nguyên ứng dụng: res, assets, internal storage
* Giao tiếp giữa các Activities : Intents
* Truy cập các dịch vụ hệ thống: SystemServices
* Get thông tin ứng dụng: ApplicationInfo

## Vậy lấy Context từ đâu?

Có ba phương thức trả về một Context, chúng nằm trong các views, các activities và lớp `ContextWrapper`, và mọi phương thức trong số chúng đều có chức năng riêng của nó.

### Trong một view

Lớp View có phương thức `getContext()` để lấy Context của Activity chứa nó. Là một Activity Context chứ không phải là một Application Context, nó có thể có thông tin về các chủ đề cụ thể làm thay đổi tính thẩm mỹ của activity cụ thể nào đó. Do đó, Activity Context là thứ cần thực hiện khi quản lý chế độ views, inflating layouts , khởi chạy activities, hiển thị dialog hoặc sử dụng các lớp ngắn hạn.

Hiểu thế nào cho đúng "lớp ngắn hạn" : *classLifespan <= activityLifespan*

### Trong một activity

Lớp Activity là một kết thừa Context.  Đây là Activity Context đã đề cập trước đó, chúng ta có thể truy cập nó bằng cách sử dụng từ khóa `this`. 

Phương thức bạn có thể sử dụng để lấy một Context khác là `getApplicationContext()`, như tên của nó, trả về context của ứng dụng, không phải của activity. Đây là Context của quá trình mà các activities chạy và nó được sử dụng trong các lớp vượt quá tuổi thọ của Activities, chẳng hạn như các tác vụ nền ( background tasks)  hoặc quyền truy cập dữ liệu (data access).

### Trong ContextWrapper

Đây là một lớp trung gian trong cây kế thừa và cung cấp phương thức `getBaseContext()`. Khuyến khích là **KHÔNG** nên sử dụng nó cho dù là mục đích gì đi nữa.

## Túm cái váy lại thì 
![](https://miro.medium.com/max/700/1*wLlzFk7hU5RBfbCZu7FZNw.png)
Trong bảng này, chúng ta có sự kết hợp giữa các hành động với các loại Context. 

Học cách quản lý đúng Context là một kỹ năng sẽ cứu chúng ta khỏi những vấn đề không mong muốn và điều đó có liên quan chặt chẽ với việc memory leak. Đó là lý do tại sao 2 thứ tưởng chừng không liên quan đến nhau lại ở trong 1 bài viết.

# Memory Leaks
Memory Leaks là gì?

Memory Leaks xảy ra khi bộ thu gom rác phân bổ bộ nhớ cho một đối tượng nhưng không bao giờ thu hồi nó. Bộ thu gom rác nghĩ rằng đối tượng vẫn cần thiết vì nó được tham chiếu bởi các đối tượng khác, nhưng những tham chiếu đó lẽ ra đã được xóa.
![](https://miro.medium.com/max/700/1*zlqVCfmLHcU4Fnu5dfDOIA.png)

![](https://miro.medium.com/max/666/1*0VA5XtFTYMPQ1RlAB1-0Gw.png)

Nếu điều này tiếp tục diễn ra, hệ thống có thể hết bộ nhớ heap và ứng dụng bị treo

## Làm thế nào để tránh memory leaks trong Android?
Nguyên nhân phổ biến của memory leaks là các biến `static` , mẫu `Singleton`, tác vụ nền và các `anonymous inner classes`. Hãy xem một số ví dụ về cách phát hiện và khắc phục chúng

### Static variable
* Tránh giữ các static reference đến `Activities`, `Fragments`, `views`, và `context`. Các static object tồn tại miễn là ứng dụng đang chạy và do đó mọi tham chiếu tĩnh đến view (hoặc context ) sẽ không bị xóa đúng lúc.

Trong ví dụ này, biến tĩnh `vista` có tham chiếu đến `context` của `activity`:
```kotlin
static View vista;

@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	
	// Static variable with reference to the activity context
	vista = new View(this);
}
```
Nếu ứng dụng tiếp tục chạy sau khi Acitivity bị destroy, bộ nhớ nó đang sử dụng sẽ không được giải phóng vì biến `vista` có tham chiếu đến context của activity.

Một giải pháp là bỏ tham chiếu đến biến bên trong phương thức `onDestroy()`.
```kotlin
@Override
protected void onDestroy() {
    super.onDestroy();
    vista = null;
}
```
Vấn đề tương tự có thể xảy ra nếu, khi sử dụng `Singleton`, nó đang lưu Activity Context. Thông thường, giải pháp tốt nhất, trong trường hợp đó, là sử dụng application context vì chúng ta được cho là ưa dùng kiến trúc như MVP, MVVM, do đó không cần truy cập trực tiếp vào các views và không cần activity context.

* Tránh sử dụng context của Activity nếu có thể. Thay vào đó, hãy thử sử dụng context của ứng dụng (ví dụ: để tạo Room database instances, v.v.).
* Tránh giữ các tham chiếu tĩnh đến các đối tượng sử dụng context để tự khởi tạo. Chúng ta không nên làm như thế này:

```kotlin
companion object {
    val database =  
        AppDB.getDB(MyApp.getInstance().applicationContext)
}
```

### Inner class
`Inner class ` là những lớp được tạo bên trong một lớp hoặc phương thức khác. Nếu chúng ta tạo inner class trong một Activity, thì inner class đó sẽ giữ một tham chiếu đến context của activity đó
```java
static Object innerClass;

@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	
	class InnerClass {
		// Automatic reference to Activity
	}
	
	innerClass = new InnerClass();
}
```
Biến innerClass là tĩnh. Nếu nó là động, sự cố sẽ biến mất (say good bye):
```kotlin
Object innerClass;
```
### Background task
Một tác vụ không đồng bộ có thể truy cập một activity và vẫn tiếp tục chạy nền sau khi activity đã chết. Trong đoạn code này, một AsyncTask được tạo bên trong một activity:
```koltin
new AsyncTask<Void, Void, Void>() {
	@Override
	protected Void doInBackground(Void... voids) {
		try {
			// Inner class with the context of the activity
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return null;
	}
}.execute();
```
Một lần nữa, vấn đề là chúng ta đang tạo một `anonymous class`. Nếu chúng ta đặt chung code bên trong một lớp kế thừa `AsyncTask`, vấn đề sẽ không còn nữa. Để chạy MyAsyncTask
```kotlin
new MyAsyncTask.execute();
```
Một Thread có thể dẫn đến cùng một sai lầm tương tự như trên , chúng ta có thể `interrupt` luồng khi activity bị hủy để an toàn hơn:
```kotlin
Thread thread;

@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	
	thread = new Thread() {
	@Override
	public void run() {
			if (!isInterrupted()) {
				// Reference to the context of the activity
			}
		}
	};
	thread.start();
}

@Override
protected void onDestroy() {
	super.onDestroy();
	thread.interrupt();
}
```
Nhiều bạn có thể nghĩ là giờ người ta dùng coroutines , rx hết rời ai còn đi dùng mấy cái bị deprecated này làm gì. Nhưng thực tế rất nhiều dự án từ lâu đời vẫn dùng chúng để thực hiện các tác vụ đồng bộ và việc bảo trì  luôn cần sự hiểu biết đúng đắn về những thứ base nhất như vậy.

### Xác định lifecycle owner 
* Tránh binding leak bằng cách đặt `binding = null` trong ở `onDestroyView()`. Tài liệu chính thức của [Android](https://developer.android.com/topic/libraries/view-binding#fragments) đã đề cập đến một cách tốt hơn để xử lý view binding.
* Truyền `viewLifecycleOwner` thay vì `this` trong khi observing LiveData object trong Fragment. Điều này là do `viewLifecycleOwner` được gắn với fragment miễn là nó có UI (`onCreateView()`, `onDestroyView()`). Mặt khác, `this` sẽ được gắn với vòng đời tổng thể của fragment  (`onCreate()`, `onDestroy()`).
![](https://miro.medium.com/max/700/1*VZl18Utddzkuu9PSeCJ2PQ.png))
```kotlin
viewModel.getImagesLiveData().observe(this, Observer{
    // update views
})
```
Ở trên sẽ gây ra memory leak vì chúng ta đã truyền `this` với tư cách là lifecycle owner. Nếu view bị hủy (`onDestroyView()` được gọi) nhưng fragment thì không, (`onDestroy()` không được gọi), thì mọi thay đổi đối với đối tượng LiveData vẫn được quan sát và có thể gây ra sự cố bất ngờ 
![](https://i.ytimg.com/vi/wHd2w80c8bo/maxresdefault.jpg)

* Truyền `viewLifecycleOwner.lifecycle` thay vì lifecycle của object trong constructor của `FragmentStateAdapter` , bởi vì chúng ta muốn phạm vi của adapter là là vòng đời view của fragment chứ không phải là fragment
```kotlin
viewPager.adapter =
    MyFragmnentStatePagerAdapter(
        lifecycle = viewLifecycleOwner.lifecycle,
        fragmentManager = childFragmentManager,
        .  .  .
    )
```

* Tránh rò rỉ liên quan đến ViewPager bằng cách thực hiện các thao tác sau trong onDestroyView (): set viewPager.adapter = null, xóa listeners được đặt trên các tab (nếu có) và detach TabLayoutMediator
```kotlin
override fun onDestroyView() {
    super.onDestroyView()
    binding.apply {
        viewPager.adapter = null
        tabLayout.removeOnTabSelectedListener(tabSelectedListener)
    }
    _binding = null
    tabLayoutMediator?.detach()
    tabLayoutMediator = null
}
```

* Set adpater RecyclerView = null trong onDestroyView () để ngăn adapter giữ một tham chiếu đến đối tượng RecyclerView.
```kotlin
override fun onDestroyView() {
    super.onDestroyView()
    binding.recyclerView.adapter = null
    .  .  .
}
```
### Khi sử register listener 
Đảm bảo unregister tất cả các `listeners`, `broadcast receivers`, etc. theo  vòng đời thích hợp để tránh memory leak. ví dụ. Nếu receiver được đăng ký trong `onViewCreate()`, thì nó phải được hủy đăng ký trong `onViewDestroyed()`.
Đây là ví dụ với Bound service, quá quen thuộc rồi phải không:
```kotlin
override fun onStart() {
        super.onStart()
        // Bind to LocalService
        Intent(this, LocalService::class.java).also { intent ->
            bindService(intent, connection, Context.BIND_AUTO_CREATE)
        }
    }

    override fun onStop() {
        super.onStop()
        unbindService(connection)
        mBound = false
    }
```
## Vậy làm thế nào để  xác định memory leaks khi code ?
* Memory Profiler: Công cụ này là một phần của Android Studio và nó là cách nhanh nhất để tạo các `garbage collection` và file hiển thị thông tin về mức tiêu thụ bộ nhớ.
![](https://developer.android.com/studio/images/profile/memory-profiler-allocations-record_2x.png)

* Leak Canary: Quá nổi tiếng rồi. Cài đặt thư viện này bên trong ứng dụng của chúng ta là có thể thấy dấu vết của tất cả các reference dẫn đến rò rỉ bộ nhớ trong thiết bị.

Thêm thằng này vào file build.gradle :
```
debugImplementation 'com.squareup.leakcanary:leakcanary-android:2.7'
```
Bây giờ hãy chạy ứng dụng. Mở qua mở lại các fragment và activitity. Cố gắng tạo thật nhiều object. Bạn sẽ thấy thông báo khi có bất kỳ rò rỉ nào đáng ngờ như bên dưới:

![](https://miro.medium.com/max/292/1*f0mjGqqvFFv-_FyqNapXCQ.png)

Click vào notification đó để n dump heap

![](https://miro.medium.com/max/284/1*69YBdezvuAwSOe9HAK74lQ.png)

Và chờ đợi vào giây sau 

![](https://miro.medium.com/max/284/1*ACLF9W0b0Jc67sk-72PkAQ.png)

Click tiếp vào notification và bạn sẽ thấy

![](https://miro.medium.com/max/284/1*HMKjdyM-LN_Qft6Pa2PRxw.png) 

và giờ là thời gian bạn check xem nguyên nhân đến từ đâu


Bài viết lần này mình mix từ các bài viết trên Medium ở [đây](https://write.agrevolution.in/memory-leaks-in-android-apps-45a27c6ac35d) và cả [đây nữa](https://medium.com/swlh/context-and-memory-leaks-in-android-82a39ed33002)
Xin cảm ơn sự quan tâm của mọi người