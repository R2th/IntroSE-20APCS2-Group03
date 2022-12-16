Với ứng dụng phát triển theo mô hình MVVM, Android Data Binding là cách tốt nhất để cập nhật dữ liệu đến giao diện người dùng. Nếu bạn chưa biết hoặc chưa từng sử dụng Android Data Binding, Bạn có thể tham khảo về nó ở link chính thức của Google developer về Android Data Binding ở đây: [Data Binding Library](https://developer.android.com/topic/libraries/data-binding/)

Có rất nhiều kiểu dữ liệu mà chúng ta có thể bind với các thuộc tính của các widget khác nhau, tuy nhiên khi nói đến việc bind một list data vào một RecyclerView thì không đơn giản như vậy. Bạn không thể chỉ làm một cái gì đó như thế này:
```xml
<android.support.v7.widget.RecyclerView
    android:id="@+id/recyclerView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:data="@{viewModel.userIds}"/>
```

Không có thuộc tính XML như trên để bind dữ liệu tới `RecyclerView`. Chúng ta cần một Adapter, và cái nhận được sẽ là một list data được lấy ra từ data source. Trong bài viết này, tôi chỉ cho bạn một phương thức đơn giản để binding dữ liệu với một RecyclerView trong XML, và trong các trường hợp phức tạp hơn các bạn có thể tìm cách để mở rộng việc binding data với tư tưởng ở bài viết này.

### Bây giờ hãy xem xét kịch bản dưới đây
Chúng ta có một list data nhận được từ một API nào đó, và nó có thể thay đổi liên tục. Lớp ViewModel của chúng ta yêu cầu dữ liệu và sẽ nhận được update dữ liệu. Khi chúng ta nhận được sự cập nhận của dữ liệu, chúng ta cần cập nhật UI với dữ liệu mới. Dưới đây là cài đặt cho lớp ViewModel của chúng ta.

```kotlin
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


Chúng ta đang sử dụng BaseObservable từ thư viện Data Binding dành cho các mục đích đơn gian, vả class ViewModel mới trong thư viện Architecture Components cũng thực hiện tương tự. Với mục đích demo chương trình, ở đây ta không thực hiện lấy dữ liệu từ một API thực, mà sẽ thực hiện cập nhật dữ liệu sau mỗi một giây.

Và Activity mà chúng ta implement ở đây cũng khá đơn giản

```kotlin
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

Bây giờ chúng ta chỉ cần cập nhật dữ liệu trong Adapter, khi nó thay đổi. Làm thế nào chúng ta có thể làm điều đó? Chúng ta có nhiều cách:

- Chúng ta có thể truyền Adapter cho ViewModel. Tôi không thực sự thích cách tiếp cận này, bởi vì một lớp ViewModel nên được tách biệt với Adapter
- Chúng ta có thể thêm `OnPropertyChangedCallback` vào `viewModel` bên trong Activity. Điều này là chấp nhận được, nhưng thêm một số mã boilerplate vào hoạt động của chúng tôi.
- Chúng ta có thể custom một Binding Adapter để sử dụng Data Binding.

### Custom một Binding Adapter
Với một custom Binding Adapter chúng ta có thể chỉ định cụ thể logic của binding thông qua một thuộc tính của XML. Chugns ta sẽ viết một custom binding logic, nó sẽ nhận adapter từ RecyclerView và cài đặt dữ liệu cho nó

Trước tiên, chúng ta cần thêm một phương thức `setData` vào Adapter của chúng ta.

```kotlin
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

Bây giờ chúng ta sẽ viết BindingAdapter

```kotlin
@BindingAdapter("data")
fun <T> setRecyclerViewProperties(recyclerView: RecyclerView, items: List<Long>) {
    if (recyclerView.adapter is UserAdapter) {
        (recyclerView.adapter as UserAdapter).setData(items)
    }
}
```

Như bạn có thể thấy việc đưa dữ liệu vào RecyclerView đã khá đơn giản, nhưng có một vấn đề nhỏ. Phương pháp này không tổng quát, và nếu chúng ta sẽ có nhiều adapter khác trong ứng dụng của chúng ta, chúng ta sẽ phải thêm nhiều if-else.

Để khắc phục việc này, chúng ta xử lý bằng cách xử lý bằng cách làm tổng quát hơn với việc sử dụng interface

```kotlin
interface BindableAdapter<T> {
    fun setData(data: T)
}
```

Bạn có thể thắc mắc tại sao chúng ta không sử dụng một List mà ở đây lại sử sụng kiểu generic. Nó cũng có thể hoạt động, nhưng điều này giúp chúng ta linh hoạt hơn. Đôi khi chúng ta cần một cấu trúc dữ liệu khác để bind vào một RecyclerView.

Và cuối cùng chúng ta thay đổi việc thực hiện BindingAdapter.

```kotlin
@BindingAdapter("data")
fun <T> setRecyclerViewProperties(recyclerView: RecyclerView, data: T) {
    if (recyclerView.adapter is BindableAdapter<*>) {
        (recyclerView.adapter as BindableAdapter<T>).setData(data)
    }
}
```

Sau khi thêm những thay đổi này vào codebase, chúng ta có thể dễ dàng binding bất kỳ dữ liệu nào với RecyclerView bằng cách sử dụng thuộc tính data trên XML từ app namespace và giữ cho ViewModel và Activity/Fragment của chúng ta đơn giản và rõ ràng hơn nhiều.

```xml
<android.support.v7.widget.RecyclerView
    android:id="@+id/recyclerView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layoutManager="android.support.v7.widget.LinearLayoutManager"
    app:data="@{viewModel.userIds}"/>
```

Đây là cách chúng tôi UserAdapter ở dưới đây:

```kotlin
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
Như bạn thấy, việc implement như trên đã trình bày đã giảm bớt được khá nhiều code khi ứng dụng của bạn có rất nhiều nơi cần sử dụng đến RecyclerView. Đồng thời bạn giữ được cho Activity/Fragment đồng thời ViewModel khá rõ ràng và sạch sẽ. và nếu bạn sử dụng cho các widget khác thì việc implement cũng khá nhất quán.

Nguồn tham khảo: [How to bind a list of items to a RecyclerView with Android Data Binding](https://android.jlelse.eu/how-to-bind-a-list-of-items-to-a-recyclerview-with-android-data-binding-1bd08b4796b4)