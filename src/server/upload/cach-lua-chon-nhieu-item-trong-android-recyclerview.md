Tiện ích RecyclerView là một phần không thể thiếu của hầu hết các ứng dụng Android hiện nay.
Kể từ khi được thêm vào thư viện hỗ trợ Android vào cuối năm 2014, nó đã làm lu mờ tiện ích ListView vốn được xem là tiện ích ưa thích nhất để hiển thị danh sách lớn, phức tạp.

Tuy nhiên, có một tính năng quan trọng bị thiếu trong đó: hỗ trợ chọn và theo dõi các mục danh sách. **RecyclerView Selection**, một thư viện addon được Google phát hành vào tháng 3/2018, cố gắng khắc phục điều này.

Trong hướng dẫn này, tôi sẽ chỉ cho bạn cách sử dụng thư viện mới để tạo một ứng dụng cung cấp giao diện trực quan để chọn nhiều mục trong danh sách. 
Thực hiện theo cùng với ví dụ đa lựa chọn Android RecyclerView này, bạn sẽ học một số kỹ năng bạn có thể áp dụng trong các ứng dụng của riêng mình.

## Chuẩn bị

Để thực hiện, bạn sẽ cần:

* Phiên bản mới nhất của Android Studio.
* Thiết bị hoặc trình giả lập chạy API Android cấp 23 trở lên.

## 1. Thêm RecyclerView Android Dependencies

Để thêm thư viện  RecyclerView Selection vào project Android Studio của bạn, hãy khai báo các dependencies sau trong app/build.gradle :

```
implementation 'com.android.support:recyclerview-v7:28.0.0'
implementation 'com.android.support:recyclerview-selection:28.0.0'
```

## 2. Tạo một List


Trong suốt hướng dẫn này, chúng ta sẽ làm việc với một danh sách nhỏ các mục, mỗi mục chứa tên và số điện thoại của một người.

Để lưu trữ dữ liệu của từng mục danh sách, hãy tạo một lớp dữ liệu Kotlin có tên Person và thêm hai thuộc tính vào nó: name và phone.

```
data class Person(val name:String,
                  val phone: String)
```

Tiếp theo, tạo một list các đối tượng Person trong main Activity :

```
val myList = listOf(
    Person("Alice", "555-0111"),
    Person("Bob", "555-0119"),
    Person("Carol", "555-0141"),
    Person("Dan", "555-0155"),
    Person("Eric", "555-0180"),
    Person("Craig", "555-0145")
)
```

## 3. Thêm RecyclerView vào Layout

Chúng ta sẽ sử dụng RecyclerView để hiển thị list. Vì vậy, hãy thêm vào layout của main activity :

```
<android.support.v7.widget.RecyclerView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/my_rv">
 
</android.support.v7.widget.RecyclerView>
```

Để định nghĩa layout cho các item, tạo một layout XML mới và đặt tên là **list_item.xml**
Bên trong nó, chúng ta sẽ thêm 2 TextView : một để hiển thị tên, một để hienr thị số điện thoại :

```
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="16dp">
 
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/list_item_name"
        style="@style/TextAppearance.AppCompat.Large"/>
 
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/list_item_phone"
        style="@style/TextAppearance.AppCompat.Small"/>
         
</LinearLayout>
```

## 4. Tạo View Holder

View Holder giống như một object mà tham chiếu đến các view hiển thị trong layout của list item. Nếu không có nó, RecyclerView sẽ không thể hiển thị các item một cách hiệu quả.


Hiện tại, bạn cần một View Holder để chứa 2 TextView mà bạn đã tạo ở bước trước đó.
Vì vậy tạo một lớp kế thừa từ RecyclerView.ViewHolder và khởi tạo các đối tượng bên trong nó :

```
class MyViewHolder(view: View)
    : RecyclerView.ViewHolder(view) {
 
    val name: TextView = view.list_item_name
    val phone: TextView = view.list_item_phone
 
    // More code here
     
}
```

Ngoài ra, addon RecyclerView Selection cần một phương thức mà nó có thể gọi để xác định duy nhất các mục danh sách được chọn. 
Hơn nữa, nó phải trả về một thể hiện của lớp ItemDetailsLookup.ItemDetails. 

Do đó, thêm code sau vào View Holder :

```
fun getItemDetails(): ItemDetailsLookup.ItemDetails<Long> =
        object: ItemDetailsLookup.ItemDetails<Long>() {
 
            // More code here
 
        }
```

Lúc này, bạn phải override hai phương thức trong lớp ItemDetails.
Đầu tiên, override phương thức getPosition() và trả về thuộc tính adapterPosition, chính là vị trí của item :

```
override fun getPosition(): Int = adapterPosition
```

Tiếp theo, overide phương thức getSelectionKey(). Phương thức này trả về một key được sử dụng để xác định id duy nhất của item :

```
override fun getSelectionKey(): Long? = itemId
```

## 5. Xử lý thao tác của người dùng

Để hỗ trợ RecyclerView Selection hoạt động chính xác, bất cứ khi nào người dùng chạm vào RecyclerView, bạn phải chuyển đổi tọa độ của cảm ứng thành một đối tượng ItemDetails.

Tạo một lớp mới kế thừa từ lớp ItemDetailsLookup và thêm một hàm khởi tạo vào nó để nhận RecyclerView làm đối số :

```
class MyLookup(private val rv: RecyclerView)
    : ItemDetailsLookup<String>() {
    override fun getItemDetails(event: MotionEvent)
                                : ItemDetails<String>? {
 
        // More code here
         
    }
}
```

Như bạn có thể thấy trong đoạn code trên, phương thức getItemDetails() nhận một đối tượng MotionEvent.
Bằng cách truyền vào tọa độ X và Y của sự kiện vào phương thức findChildViewUnder(), bạn có thể xác định View được liên kết với mục danh sách mà người dùng chạm vào.

```
val view = rv.findChildViewUnder(event.x, event.y)
if(view != null) {
    return (rv.getChildViewHolder(view) as MyViewHolder)
            .getItemDetails()
}
return null
```

## 6. Tạo một Adapter

Bây giờ bạn sẽ cần một Adapter để kết nối list với RecyclerView. 
Hãy tạo một lớp mới kế thừa từ lớp RecyclerView.Adapter. 
Vì Adapter cần truy cập vào danh sách và context của activity, lớp mới phải có một hàm khởi tạo có thể chấp nhận cả hai làm tham số :

```
class MyAdapter(private val listItems:List<Person>,
                private val context: Context)
    : RecyclerView.Adapter<MyViewHolder>() {
 
}
```

Điều quan trọng là bạn phải chỉ rõ rằng mỗi item của adapter này sẽ có một id duy nhất, kiểu dữ liệu Long. 
Nơi tốt nhất để làm như vậy là khai báo trong một khối init :

```
init {
    setHasStableIds(true)
}
```

Ngoài ra, để có thể sử dụng vị trí của một item làm định danh duy nhất, bạn sẽ phải override phương thức getItemId() :

```
override fun getItemId(position: Int): Long {
    return position.toLong()
}
```

Bạn phải override 3 hàm khác của RecyclerView.Adapter :

Đầu tiên, override hàm getItemCount() trả về số lượng của list :

```
override fun getItemCount(): Int = listItems.size
```

Tiếp theo, override hàm onCreateViewHolder() :

```
override fun onCreateViewHolder(parent: ViewGroup,
                                viewType: Int): MyViewHolder = 
        MyViewHolder(
            LayoutInflater.from(context)
                .inflate(R.layout.list_item, parent, false)
        )
```

Cuối cùng, override hàm onBindViewHolder()

```
override fun onBindViewHolder(vh: MyViewHolder, position: Int) {
    vh.name.text = listItems[position].name
    vh.phone.text = listItems[position].phone
}
```

## 7. Hiển thị List

Thêm code sau vào MainActivity :

```
my_rv.layoutManager = LinearLayoutManager(this)
my_rv.setHasFixedSize(true)
```

```
val adapter = MyAdapter(myList, this)
my_rv.adapter = adapter
```

## 8. Tạo một Selection Tracker


RecyclerView vẫn chưa cho phép bạn chọn bất kỳ item nào. Để bật lựa chọn nhiều item, bạn sẽ cần một đối tượng SelectionTracker trong Activity của mình.

```
private var tracker: SelectionTracker<Long>? = null
```

Bạn có thể khởi tạo tracker bằng lớp SelectionTracker.Builder. 
Trong hàm khởi tạo của nó, bạn truyền vào một selection ID, RecyclerView, một key provider, một lớp item và một  storage strategy.

Thư viện RecyclerView Selection cung cấp nhiều cách lưu trữ khác nhau, tất cả đều đảm bảo rằng các item đã chọn không bị bỏ chọn khi thiết bị của người dùng được xoay hoặc khi hệ thống Android đóng ứng dụng của bạn trong quá trình xử lý tài nguyên. 
Hiện tại, vì loại khóa lựa chọn của bạn là Long, bạn phải sử dụng đối tượng StorageStrargety loại Long.


Khi Builder đã sẵn sàng, bạn có thể gọi phương thức withSelectionPredicate() của nó để chỉ định số lượng item bạn muốn cho phép người dùng chọn. 
Để hỗ trợ lựa chọn nhiều item, như một tham số cho phương thức, bạn phải truyền đối tượng SelectionPredicate được trả về bởi phương thức createSelectAnything().

Theo đó, thêm code sau vào bên trong phương thức onCreate() của activity :

```
tracker = SelectionTracker.Builder<Long>(
                "selection-1",
                my_rv,
                StableIdKeyProvider(my_rv),
                MyLookup(my_rv),
                StorageStrategy.createLongStorage()
          ).withSelectionPredicate(
                SelectionPredicates.createSelectAnything()
          ).build()
```

Để tận dụng tối đa hệ thống lưu trữ, bạn phải luôn cố gắng khôi phục trạng thái của tracker bên trong phương thức onCreate() :

```
if(savedInstanceState != null)
        tracker?.onRestoreInstanceState(savedInstanceState)
```

Tương tự, bạn phải đảm bảo rằng bạn lưu trạng thái của tracker bên trong phương thức onSaveInstanceState() của activity :

```
override fun onSaveInstanceState(outState: Bundle?) {
    super.onSaveInstanceState(outState)
 
    if(outState != null)
        tracker?.onSaveInstanceState(outState)
}
```


Selection tracker sẽ không hoạt động trừ khi nó được liên kết với adapter. Do đó, truyền nó vào adapter bằng cách gọi phương thức setTracker() :

```
adapter.setTracker(tracker)
```

Phương thức setTracker () chưa được định nghĩa, vì vậy hãy thêm đoạn code sau adapter :

```
private var tracker: SelectionTracker<Long>? = null
 
fun setTracker(tracker: SelectionTracker<Long>?) {
    this.tracker = tracker
}
```


Nếu bạn thử chạy ứng dụng của mình tại thời điểm này, bạn sẽ có thể chọn các item trong danh sách. 
Khi bạn vào chế độ chọn nhiều item bằng cách nhấn lâu vào một item, bạn sẽ có thể cảm thấy rung động ngắn trên hầu hết các thiết bị. 
Tuy nhiên, vì các item được chọn hiện không thể phân biệt được với các item không được chọn, bạn sẽ không có phản hồi trực quan. 

Để khắc phục điều này, bạn cần thực hiện một vài thay đổi bên trong phương thức onBindViewHolder () của adapter .


Cách thông thường để làm nổi bật các mục được chọn là thay đổi màu nền của chúng. 


Thêm code sau ngay trước khi kết thúc phương thức onBindViewHolder() :

```
val parent = vh.name.parent as LinearLayout
 
// More code here
```

Tiếp theo, bạn có thể gọi phương thức isSelected() của đối tượng SelectionTracker để xác định xem một item có được chọn hay không.

Đoạn code sau cho bạn biết cách thay đổi màu nền của các item đã chọn thành màu lục lam:

```
if(tracker!!.isSelected(position.toLong())) {
    parent.background = ColorDrawable(
            Color.parseColor("#80deea")
    )
} else {
    // Reset color to white if not selected
    parent.background = ColorDrawable(Color.WHITE)
}
```


Nếu bạn chạy ứng dụng bây giờ, bạn sẽ có thể thấy các item bạn đã chọn :

![](https://images.viblo.asia/7ea87ad6-47e9-4d5c-9ccb-3c7b21a50f87.png)