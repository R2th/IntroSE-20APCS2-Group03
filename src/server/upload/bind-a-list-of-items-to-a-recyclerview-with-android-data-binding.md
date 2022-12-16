# Mở đầu
Với kiến trúc MVVM, có thể nói **Android Data Binding** chính là phương án tốt nhất để thể hiện sự thay đổi UI. Vì thế, nếu bạn là một *newbie* về *[Data Binding](https://developer.android.com/topic/libraries/data-binding/)*, bạn nên bắt đầu từ basic trước khi đọc bài viết này nhé.

Có rất nhiều kiểu dữ liệu mà chúng ta có thể *binding* với các thuộc tính của các *widget* khác nhau, tuy nhiên khi nói đến việc *binding* một danh sách các item vào **RecyclerView** thì lại không hề đơn giản như chúng ta nghĩ. Bạn không thể chỉ làm như vậy:
```
<android.support.v7.widget.RecyclerView
  android:id="@+id/recyclerView"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:data="@{viewModel.userIds}"/>
```

Hoàn toàn không có thuộc tính *XML* như trên, để *binding* dữ liệu vào **RecyclerView**, chúng ta cần một **Adapter**, thứ mà sẽ nhận danh sách các item từ một nguồn dữ liệu nào đó. Bài viết này, mình sẽ giới thiệu đến các bạn một cách đơn giản để *binding* dữ liệu vào **RecyclerView** trong *XML*.
# Coding
Chúng ta sẽ có một danh sách item gọi là dữ liệu, ở đây mình không đề cập đến service để lấy dữ liệu từ backend nhé. Và tất nhiên, dữ liệu của chúng ta sẽ thay đổi liên tục.

Chúng ta sẽ có flow cơ bản như sau: *ViewModel* request data và chúng ta cần update UI với data lấy được.

```
// ViewModel
class UserViewModel : BaseObservable() {

    @get:Bindable
    var userIds: List<Long> = emptyList()
        private set(value) {
            field = value
            notifyPropertyChanged(BR.userIds)
        }

    private val updateInterval = 1000L
    private val updateHandler = Handler()
    private val random = Random()

    private var updateRunnable: Runnable = object : Runnable {
        override fun run() {
            updateList()
            updateHandler.postDelayed(this, updateInterval)
        }
    }

    private fun updateList() {
        userIds = List(30) {
            random.nextLong()
        }
    }

    fun startUpdates() {
        updateHandler.postDelayed(updateRunnable, updateInterval)
    }

    fun stopUpdates() {
        updateHandler.removeCallbacks(updateRunnable)
    }
}
```

Vì ở đây, mình chỉ tạo một ví dụ đơn giản là một danh sách các số được random mỗi giây nên sử dụng **BaseObservable** của thư viện **Data Binding**.

```
Activity
class MainActivity : AppCompatActivity() {

    private val viewModel = UserViewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val adapter = UserAdapter()

        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = adapter

        viewModel.startUpdates()
    }

    override fun onDestroy() {
        viewModel.stopUpdates()
        super.onDestroy()
    }
}
```

Bây giờ chúng ta chỉ cần update dữ liệu trong Adapter. Nhưng chúng ta sẽ làm như thế nào?

Đề xuất được đưa ra đó là chúng ta sẽ tạo một *custom Binding Adapter* và sử dụng **Data Binding**. Với *custom Binding Adapter*, chúng ta có thể tự chỉ định logic cho các thuộc tính XML. Chính vì thế chúng ta có thể viết riêng cho mình một logic ràng buộc phù hợp để get adapter từ **RecyclerView** vetget dữ liệu cho nó.

Trước tiên, chúng ta cần thêm method *setData* cho adapter.

```
class UserAdapter : RecyclerView.Adapter<UserAdapter.UserHolder>() {

    fun setData(items: List<Long>) {
        userIds = items
        notifyDataSetChanged()
    }

    var userIds = emptyList<Long>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserHolder {
        val inflater = LayoutInflater.from(parent.context)
        return UserHolder(inflater.inflate(R.layout.list_item, parent, false))
    }

    override fun getItemCount() = userIds.size

    override fun onBindViewHolder(holder: UserHolder, position: Int) {
        holder.bind(userIds[position])
    }

    class UserHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bind(userId: Long) {
            itemView.userText.text = "User id: $userId"
        }
    }
}
```

Tiếp theo, chúng ta có thể tạo *custom Binding Adapter* với đoạn code đơn giản sau:

```
@BindingAdapter("data")
fun <T> setRecyclerViewProperties(recyclerView: RecyclerView, items: List<Long>) {
    if (recyclerView.adapter is UserAdapter) {
        (recyclerView.adapter as UserAdapter).setData(items)
    }
}
```

Tuy nhiên, sẽ rất là bất tiện nếu như chúng ta có nhiều adapter và chúng ta sẽ phải tạo ra rất nhiều nhánh `if else`. Vì thế chúng ta cần refactor cho đoạn này bằng cách tạo ra một **BindableAdapter** chung và tất cả các adapter sử dụng **Data Binding** sẽ được kế thừa từ nó.

```
interface BindableAdapter<T> {
    fun setData(data: T)
}
```

Và sẽ có một chút thay đổi đối với *custom Binding Adapter*:

```
@BindingAdapter("data")
fun <T> setRecyclerViewProperties(recyclerView: RecyclerView, data: T) {
    if (recyclerView.adapter is BindableAdapter<*>) {
        (recyclerView.adapter as BindableAdapter<T>).setData(data)
    }
}
```

Với phần code trên, chúng ta có thể dễ dàng để *binding* bất kì dữ liệu nào đó vào một **RecyclerView** bằng cách sử dụng XML từ **app namespace** và tất nhiên vẫn giữ cho code ở *ViewModel* và *Activity/Fragment* gọn gàng.

```
<android.support.v7.widget.RecyclerView
            android:id="@+id/recyclerView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layoutManager="android.support.v7.widget.LinearLayoutManager"
            app:data="@{viewModel.userIds}"/>
```

Cuối cùng, chúng ta sẽ update lại *UserAdapter* một chút:

```
class UserAdapter : RecyclerView.Adapter<UserAdapter.UserHolder>(), BindableAdapter<List<Long>> {

    override fun setData(items: List<Long>) {
        userIds = items
        notifyDataSetChanged()
    }

    var userIds = emptyList<Long>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserHolder {
        val inflater = LayoutInflater.from(parent.context)
        return UserHolder(inflater.inflate(R.layout.list_item, parent, false))
    }

    override fun getItemCount() = userIds.size

    override fun onBindViewHolder(holder: UserHolder, position: Int) {
        holder.bind(userIds[position])
    }

    class UserHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bind(userId: Long) {
            itemView.userText.text = "User id: $userId"
        }
    }
}
```

Ngoài cách tạo một *custom Binding Adapter*, chúng ta cũng còn một vài sự lựa chọn khác nhưng có thể sẽ không tối ưu hơn:
* Chúng ta có thể pass adapter vào *ViewModel*.
* Sử dụng **OnPropertyChangedCallback**.
Tuy nhiên, với một trong hai option trên thì code của chúng ta ở *ViewModel* và *Activity/Fragment* sẽ không được gọn gàng cho lắm.

# Kết luận
Như các bạn đã thấy, chúng ta có thể dễ dàng *binding* dữ liệu vào **RecyclerView** bằng việc sử dụng *custom Binding Adapter*. Và tất nhiên, code ở *ViewModel* và *Activity/Fragment* vẫn gọn gàng hơn so với các option mà mình đưa ra ở trên.

Cảm ơn các bạn đã đọc bài.
## Tham khảo
AndroidPub