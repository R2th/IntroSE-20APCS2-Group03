![](https://images.viblo.asia/67be09a2-077a-415a-a48b-16f624a6c651.png)

Giả sử nếu bạn được đưa cho một giao diện người dùng như sau và bạn được yêu cầu để thiết kế nó, suy nghĩ đầu tiên sẽ xuất hiện trong đầu bạn là gì?

![](https://images.viblo.asia/9402dde4-1d47-47f8-abf1-c36b04eff399.png)

Bạn có thể đưa ra một loạt các ý tưởng khác nhau để thực hiện nó. Nhưng ý tưởng phổ biến nhất sẽ là sử dụng **RecyclerView** với nhiều kiểu view type trong một `RecyclerView`.

Nhưng với giải pháp được đưa ra ở trên, vấn đề nảy sinh chính là việc quản lý nhiều view type khá là phức tạp. Trong ví dụ trên, chúng ta chỉ có ba loại view type. Nhưng trong thực tế, bạn có thể sẽ phải quản lý rất nhiều view type mà không chỉ là ba.

Vậy làm thế nào chúng ta có thể thiết kế một view một cách dễ dàng mà không phải quản lý các view type khác nhau?

**MergeAdapter** chính là là giải pháp cho vấn đề này.

Trong bài viết này, chúng ta sẽ sử dụng `MergeAdapter` để xây dựng màn hình trên.

### Bước 01

Trước tiên, chúng ta hãy thêm `dependency` của merge adapter (nó là một phần của recyclerView) vào trong `build.gradle` của ứng dụng:

```java
implementation "androidx.recyclerview:recyclerview:1.2.0-alpha02"
```

### Bước 02

Đối với màn hình ở trên, chúng ta có ba loại View khác nhau. Vì vậy, chúng ta cần tạo ra ba `data class` khác nhau - User, MyDetail, Banner. 

```java
data class User(
     val id: Int = 0,
     val name: String = "",
     val avatar: String = ""
)
```

```java
data class MyDetail(
     val id: Int = 0,
     val name: String = "",
     val aboutMe: String = ""
)
```

```java
data class Banner(
     val bannerImage: Int = 0
)
```

### Bước 03

Trong phần này, chúng ta sẽ tạo nguồn dữ liệu cho danh sách người dùng để hiển thị danh sách. Vì thế, chúng ta sẽ tạo một đối tượng của DataSource và trong đó:

```java
object DataSource {

    fun getUser() = ArrayList<User>().apply {
        add(User(1, "Himanshu", "https://s3.amazonaws.com/uifaces/faces/twitter/sunlandictwin/128.jpg"))
        add(User(2, "Alford Hoeger", "https://s3.amazonaws.com/uifaces/faces/twitter/mufaddal_mw/128.jpg"))
        add(User(3, "Terrance Halvorson", "https://s3.amazonaws.com/uifaces/faces/twitter/mufaddal_mw/128.jpg"))
        add(User(3, "Morgan McGlynn", "https://s3.amazonaws.com/uifaces/faces/twitter/allfordesign/128.jpg"))
        add(User(4, "Ms. Ramiro DuBuque", "https://s3.amazonaws.com/uifaces/faces/twitter/shaneIxD/128.jpg"))
        add(User(5, "Kolby Orn", "https://s3.amazonaws.com/uifaces/faces/twitter/johnsmithagency/128.jpg"))
        add(User(6, "Elijah Schoen MD", "https://s3.amazonaws.com/uifaces/faces/twitter/alxndrustinov/128.jpg"))

    }

    fun getBanner() = Banner(R.drawable.publication_site_cover)
}
```

Trong đó `getUser()` sẽ được sử dụng để lấy danh sách người dùng và `getBanner()` được sử dụng để lấy hình ảnh banner từ thư mục `drawable`.

### Bước 04

Ở bước này, ta sẽ tạo ra 3 adapter cho 3 kiểu View cần thiết.

Để hiển thị MyDetails, ta sẽ tạo `MyDetailAdapter`:

```java
class MyDetailAdapter(
        private val myDetail: MyDetail
) : RecyclerView.Adapter<MyDetailAdapter.DataViewHolder>() {

    class DataViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(user: MyDetail) {

            itemView.textViewUser.text = user.name
            itemView.textViewAboutMe.text = user.aboutMe
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
            DataViewHolder(
                    LayoutInflater.from(parent.context).inflate(
                            R.layout.item_layout_my_detail, parent,
                            false
                    )
            )

    override fun getItemCount(): Int = 1

    override fun onBindViewHolder(holder: DataViewHolder, position: Int) =
            holder.bind(myDetail)

}
```

Adapter này sẽ được sử dụng để hiển thị MyUserDetails, về cơ bản là phần đầu tiên của danh sách. Ở đây, `R.layout.item_layout_my_detail` sẽ như sau:

```java
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@android:color/black"
    android:orientation="vertical"
    android:paddingStart="16dp"
    android:paddingTop="16dp"
    android:paddingEnd="16dp"
    android:paddingBottom="16dp">


    <androidx.appcompat.widget.AppCompatTextView
        android:id="@+id/textViewUser"
        style="@style/TextAppearance.AppCompat.Large"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textColor="@android:color/white"
        tools:text="MindOrks" />

    <androidx.appcompat.widget.AppCompatTextView
        android:id="@+id/textViewAboutMe"
        style="@style/TextAppearance.AppCompat.Small"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textColor="@android:color/darker_gray" />
</LinearLayout>
```

Sau đó, để hiển thị danh sách người dùng, chúng ta sẽ tạo ra một adapter khác ods là UsersAdapter:

```java
class UsersAdapter(
        private val users: ArrayList<User>
) : RecyclerView.Adapter<UsersAdapter.DataViewHolder>() {

    class DataViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(user: User) {
            itemView.textViewUserName.text = user.name
            Glide.with(itemView.imageViewAvatar.context)
                    .load(user.avatar)
                    .into(itemView.imageViewAvatar)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
            DataViewHolder(
                    LayoutInflater.from(parent.context).inflate(
                            R.layout.item_layout, parent,
                            false
                    )
            )

    override fun getItemCount(): Int = users.size

    override fun onBindViewHolder(holder: DataViewHolder, position: Int) =
            holder.bind(users[position])

}
```

Adapter này sẽ được sử dụng để hiển thị danh sách người dùng, trong đó` R.layout.item_layout` sẽ như sau:

```java
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="60dp">

    <de.hdodenhof.circleimageview.CircleImageView
        android:id="@+id/imageViewAvatar"
        android:layout_width="60dp"
        android:layout_height="0dp"
        android:padding="4dp"
        app:civ_border_color="@android:color/black"
        app:civ_border_width="2dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <androidx.appcompat.widget.AppCompatTextView
        android:id="@+id/textViewUserName"
        style="@style/TextAppearance.AppCompat.Large"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginTop="4dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/imageViewAvatar"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        tools:text="MindOrks" />


</androidx.constraintlayout.widget.ConstraintLayout>
```

và cuối cùng, ta sẽ tạo một adapter để hiển thị banner đó là BannerAdapter:

```java
class BannerAdapter(
        private val banner: Banner
) : RecyclerView.Adapter<BannerAdapter.DataViewHolder>() {

    class DataViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(banner: Banner) {
            Glide.with(itemView.imageViewBanner.context)
                    .load(user.bannerImage)
                    .into(itemView.imageViewBanner)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
            DataViewHolder(
                    LayoutInflater.from(parent.context).inflate(
                            R.layout.item_layout_banner, parent,
                            false
                    )
            )

    override fun getItemCount(): Int = 1

    override fun onBindViewHolder(holder: DataViewHolder, position: Int) =
            holder.bind(banner)

}
```

File `R.layout.item_layout_banner`:

```java
<?xml version="1.0" encoding="utf-8"?>
<ImageView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/imageViewBanner"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

Bây giờ, chúng ta đã hoàn thành việc thiết kế ba adapter để hiển thị 3 loại view khác nhau trên reycler view.

### Bước 05

Bây giờ, để có thể sử dụng các adapter mà chúng ta tạo trong `MergeAdapter`, trước tiên, ta sẽ tạo MainActivity làm launcher activity:

```java
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

File R.layout.activity_main:

```java
<androidx.constraintlayout.widget.ConstraintLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

Bây giờ, ta cần thêm 4 biến ở trong MainActivity:

```java
lateinit var adapter: MergeAdapter
lateinit var myDetailAdapter: MyDetailAdapter
lateinit var userVerticalAdapter: UsersAdapter
lateinit var bannerAdapter: BannerAdapter
```

chúng ta cũng sẽ tạo một biến khác sẽ được cấu trúc theo lớp dữ liệu `MyDetail` và chứa thông tin chi tiết của người dùng,

```java
val myDetail = MyDetail(1, "Himanshu Singh", "I am an writer and Open Source contributor in MindOrks.")
```

Tiếp theo, chúng ta cần tạo ra một phương thức để khởi tạo những thứ liên quan tới recycler view:

```java
private fun setupDataInRecyclerView() {
    recyclerView.layoutManager = LinearLayoutManager(this)
    userVerticalAdapter = UsersAdapter(DataSource.getUser())
    bannerAdapter = BannerAdapter(DataSource.getBanner())
    myDetailAdapter = MyDetailAdapter(myDetail)
    adapter = MergeAdapter(myDetailAdapter, userVerticalAdapter, bannerAdapter)
    recyclerView.adapter = adapter
}
```

Tại đây, chúng ta sẽ khởi tạo các adapter và truyền dữ liệu cần thiết cho mỗi adapter.

**Lưu ý**: Thứ tự mà chúng ta truyền vào các adapter sẽ quy định thứ tự hiển thị trên danh sách của view tương ứng trên recycler view.

Khi bạn chạy ứng dụng, bạn sẽ có giao diện mà mình mong muốn:

![](https://images.viblo.asia/ee6406cb-d252-4194-906c-497fcef20799.png)

Đây là cách bạn có thể thiết kế recyclerView với nhiều view type theo cách tuần tự bằng cách sử dụng dữ liệu từ các bộ adapter riêng lẻ.

### Điểm cần nhớ:

* Giả sử nếu chúng ta cần sử dụng một loại adapter nhiều lần trong recycler view thì ta có thể tạo ra nhiều `instance` cho adapter đó và truyền vào hàm khởi tạo của `MergeAdapter`.
* Chúng ta nên thực hiện logic trong từng adapter riêng.
* Khi chúng ta cập nhật dữ liệu trong bất kì adapter nào sử dụng `notifyDataSetChanged()` thì merge adapter cũng sẽ gọi phương thức `notifyDataSetChanged()` của nó.
* Thay vì truyền vào các adapter một cách riêng rẽ, ta có thể truyền vào một danh sách các adapter, ví dụ:

```java
val listOfAdapters = listOf<RecyclerView.Adapter<out RecyclerView.ViewHolder>>(myDetailAdapter, userVerticalAdapter, bannerAdapter)
```

và ở trong hàm khởi tạo, ta có thể truyền như sau:

```java
adapter = MergeAdapter(listOfAdapters)
```

### Hãy nói thêm về một use case khác
1. Nhìn chung, ta sử dụng một view holder cho một adapter. Nhưng trong một số trường hợp khi ta cần phải tái sử dụng view holder cho nhiều adapter thì ta cần phải truyền vào một `config` trong hàm khởi tạo, ở đó ta phải set `isolateViewTypes` thành `false`.

Để tạo một config:

```java
val configBuilder = MergeAdapter.Config.Builder()
configBuilder.setIsolateViewTypes(false)
```

và ở trong MergeAdapter, ta truyền như sau:

```java
val adapter = MergeAdapter(configBuilder.build(), myDetailAdapter, userVerticalAdapter, bannerAdapter)
```

Tương tự ở đây, ta có thể truyền một danh sách các adapter:

```java
val adapter = MergeAdapter(configBuilder.build(), listOfAdapters)
```

2. Giả sử, chúng ta không muốn truyền adapter vào trong hàm khởi tạo mà muốn thêm nó vào một lúc bất kì nào đó vào trong `MergeAdapter`, ta có thể làm như sau:

```java
val adapter = MergeAdapter(listOfAdapters)
adapter.addAdapter(bannerAdapter)
```

Việc này sẽ thêm adapter vào vị trí cuối cùng danh sách. Nếu bạn muốn thêm adapter này vào một vị trí cụ thể, hãy làm như sau:

```java
adapter.addAdapter(0, bannerAdapter)
```

Ở đây, chúng ta đã thêm một adapter ở vị trí thứ 0, tức là bắt đầu danh sách. Bây giờ, recyclerView sẽ như sau:

![](https://images.viblo.asia/9c006ce3-3f6b-46b2-9e39-86981dc4b15e.png)

3. Tương tự, để xóa một adapter:

```java
adapter.removeAdapter(//adapter)
```

4. Để lấy ra số lượng item trong recyclerView từ tất cả các adapter ta sử dụng:

```java
adapter.itemCount
```

5. Để lấy ra danh sách các adapter được thêm vào, sử dụng:

```java
adapter.adapters
```

Đây là cách bạn có thể sử dụng MergeAdapter thay cho việc quản lý nhiều view type trong recycler view.

Nguồn: https://blog.mindorks.com/implementing-merge-adapter-in-android-tutorial