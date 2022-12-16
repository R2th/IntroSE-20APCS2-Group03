# ViewModel là gì?
ViewModel là một lớp được sử dụng để lưu trữ và quản lý dữ liệu liên quan đến UI. Nó là một phần của Android Jetpack. Vì vậy, bằng cách sử dụng ViewModel, ứng dụng của bạn sẽ có một dữ liệu nhất quán ngay cả khi có thay đổi về giao diện người dùng.

Khi sử dụng ViewModel, các đối tượng của ViewModel sẽ lưu trữ dữ liệu và dữ liệu này được sử dụng để đặt giá trị của các trường UI trong Activity hoặc Fragment. Do đó nếu có sự thay đổi về cấu hình như bạn xoay điện thoại chẳng hạn các đối tượng ViewModel sẽ được tự động giữ lại. Điều này không làm mất dữ liệu của bạn.

Vì vậy, bất cứ khi nào bạn muốn hiển thị một vài dữ liệu, bạn có thể sử dụng ViewModel để lưu trữ dữ liệu đó trước và sau đó mới sử dụng dữ liệu đó trong UI.  Ví dụ: để lưu trữ danh sách người dùng từ cơ sở dữ liệu, bạn có thể tạo lớp ViewModel và lưu trữ dữ liệu như sau:

```kotlin
class MyViewModel : ViewModel() {
    private val users: MutableLiveData<List<User>> by lazy {
        MutableLiveData().also {
            loadUsers()
        }
    }

    fun getUsers(): LiveData<List<User>> {
        return users
    }

    private fun loadUsers() {
        // Do an asynchronous operation to fetch users.
    }
}
```

Sau đó, nếu bạn muốn truy cập dữ liệu ViewModel trong Activity thì bạn có thể sử dụng code bên dưới và cập nhật UI :
```kotlin
class MyActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        // Create a ViewModel the first time the system calls an activity's onCreate() method.
        // Re-created activities receive the same MyViewModel instance created by the first activity.

        val model = ViewModelProviders.of(this).get(MyViewModel::class.java)
        model.getUsers().observe(this, Observer<List<User>>{ users ->
            // update UI
        })
    }
}
```

Sau đây là một minh họa về vòng đời của ViewModel trong Android:

![](https://images.viblo.asia/32ea9da0-1c9b-4982-8edb-13e1908cdc0e.png)
Từ hình minh họa trên, chúng ta có thể nói rằng ViewModel tồn tại trong suốt vòng đời của một Activity hoặc một Fragment.  Vì vậy, hệ thống Android có thể gọi phương thức onCreate () nhiều lần, nhưng ViewModel sẽ không bị tạo lại trong những lần đó.

# Chia sẻ data giữ các Fragment
Chia sẻ dữ liệu giữa Activities và Fragment là điều rất phổ biến.  Ví duj:  một Fragment lấy thông tin cho người dùng và hiển thị ở Fragment khác.  Vì vậy, cần phải có một giao tiếp gữi hai Fragment này.  Chúng ta có thể sử dụng Lớp ViewModel làm công cụ giao tiếp giữa các Fragment này.  Fragment 1, tức là Fragment lấy thông tin từ người dùng sẽ lưu trữ dữ liệu vào ViewModel và Fragment 2, tức là Fragment hiển thị thông tin của người dùng sẽ lấy dữ liệu từ ViewModel.  Dưới đây là một ví dụ về việc giao tiếp gữi 2 fragment bằng ViewModel
```kotlin
class SharedViewModel : ViewModel() {
    val selected = MutableLiveData<Item>()

    fun select(item: Item) {
        selected.value = item
    }
}

class MasterFragment : Fragment() {

    private lateinit var itemSelector: Selector

    private lateinit var model: SharedViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        model = activity?.run {
            ViewModelProviders.of(this).get(SharedViewModel::class.java)
        } : throw Exception("Invalid Activity")
        itemSelector.setOnClickListener { item ->
            model.select(item)
        }
    }
}

class DetailFragment : Fragment() {

    private lateinit var model: SharedViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        model = activity?.run {
            ViewModelProviders.of(this).get(SharedViewModel::class.java)
        } ?: throw Exception("Invalid Activity")
        model.selected.observe(this, Observer<Item> { item ->
            // Update the UI
        })
    }
}
```
Trong ví dụ trên, MasterFragment là Fragment có chứa một danh sách itemSelector và DetailFragment là Fragment hiển thị chi tiết item đã chọn trong MasterFragment.
# Ví dụ
Hãy làm một ví dụ để hiểu hơn về việc chia sẻ ViewModel giữa các Fragment nào.  

Chúng ta sẽ có hai Fragment trong một Activity và chúng ta sẽ cố gắng gửi dữ liệu từ một Fragment này đến các Fragment khác qua ViewModel. Bắt đầu nào:

* Đầu tiên hãy tạo mội Project bằng Android Studio với một Empty Activity có tên là *MainActivity*
* Tiếp theo, thêm 2 Fragment bằng cách chọn **New > Fragment > Blank Fragment**.
Hai fragment có tên lần lượt là *MessageReceiver* và *MessageSender*
* Tạo một class có tên*MyViewModel* cùng pagekage với fragment và activity trên.

Trước khi vào phần code logic thì hãy viết code cho phần UI nào:

*MainActivity* có chứa 2 fragment nên code ui sẽ như sau 
```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    <fragment
            android:id="@+id/receiver_fragment"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_marginBottom="8dp"
            android:layout_marginEnd="8dp"
            android:layout_marginStart="8dp"
            android:layout_marginTop="8dp"
            app:layout_constraintBottom_toTopOf="@+id/sender_fragment"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent">

    </fragment>

    <fragment
            android:id="@+id/sender_fragment"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_marginBottom="8dp"
            android:layout_marginEnd="8dp"
            android:layout_marginStart="8dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/receiver_fragment">

    </fragment>

</android.support.constraint.ConstraintLayout>
```
Trong file layout của fragment MessageReceiver sẽ có một TextView để hiển thị tin nhắn nhận được từ fragment MessageSender
```xml
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="#11209F">

    <TextView
            android:id="@+id/receiver_tv"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:gravity="center"
            android:text="I am a Messenger"
            android:textColor="@color/White"
            android:textSize="18sp"/>

</RelativeLayout>
```
File layout của fragment MessageReceive sẽ có một Button được sử dụng để gửi dữ liệu đến fragment MessageReceiver.
```xml
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="#F5A623">

    <Button
            android:id="@+id/msg_btn"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:layout_gravity="center"
            android:gravity="center"
            android:text="Send Your Message"/>
</RelativeLayout>
```

Chúng ta đã hoàn thành phần UI.  Hãy chuyển sang phần code của ViewModel.  Ở đây, chúng ta đang chia sẻ một tin nhắn từ MessageSender đến MessageReceiver.  Vì vậy, chúng ta cần tạo một biến message, biến này  sẽ được sử dụng để lưu trữ tin nhắn từ người gửi và sẽ được chia sẻ cho người nhận.

Code lớp MyViewModel như sau:
```kotlin
class MyViewModel : ViewModel() {
    val message = MutableLiveData<String>()

    fun myMessage(msg: String) {
        message.value = msg
    }
}
```
Fragment MessageSender sẽ phải truyền một String vào hàm myMessage
```kotlin
class MessageSender : Fragment() {
    lateinit var model: MyViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_sender, container, false)
        model = activity?.let { ViewModelProviders.of(it).get(MyViewModel::class.java) }

        val button = view.findViewById<View>(R.id.msg_btn) as Button
        // on click button
        button.setOnClickListener { model?.myMessage("Hello! I am your message") }
        return view
    }
}
```
Nhiệm vụ cuối cùng của chúng ta bây giờ là lấy message từ ViewModel và hiển thị nó trên TextView có trong Fragmetn MessageReceiver  :D
```kotlin
class MessageReceiver : Fragment() {

    internal lateinit var tv_msg: TextView

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_receiver, container, false)

        val model = activity?.let { ViewModelProviders.of(it).get(MyViewModel::class.java) }
        tv_msg = view.findViewById<View>(R.id.receiver_tv) as TextView

        model?.message?.observe(this, object : Observer<Any> {
            override fun onChanged(o: Any?) {
                tv_msg.text = o?.toString()
            }
        })
        return view
    }
}
```
Xong rồi, giờ bạn cần chạy ứng và xem thành quả thôi.

Mong rằng bài viết trên đã giúp các bạn biết thêm một cách khác để chia sẽ dữ liệu giữa các Fragment.

[Tham khảo](https://blog.mindorks.com/shared-viewmodel-in-android-shared-between-fragments)