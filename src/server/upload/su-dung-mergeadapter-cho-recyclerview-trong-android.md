# I. Dẫn nhập
* Giả sử chúng ta nhận được yêu cầu hiện thực một màn hình đơn giản như sau:

![](https://images.viblo.asia/5f3bf7b3-704c-4f83-9d2e-27c61e3e8dbd.png)

* Sẽ có nhiều ý tưởng nảy sinh trong suy nghĩ của chúng ta khi nhìn vào hình trên. Ý tưởng sử dụng một RecyclerView chứa nhiều kiểu view (view type) trong adapter đương nhiên sẽ là ưu tiên hàng đầu! Tuy nhiên, với ý tưởng này, chúng ta sẽ phải quản lý nhiều kiểu view trong một adapter. Trong màn hình đơn giản ở trên, chúng ra sẽ có 3 kiểu view: 

    a. Thứ nhất là kiểu chứa tên và mô tả của người dùng.
    
    b. Thứ hai là kiểu chứa thông tin của người dùng (avatar, tên).
    
    c. Thứ ba là một biểu ngữ (banner) thông tin.

* Với màn hình trên chúng ta đã phải định nghĩa 3 kiểu view, vậy còn đối với những màn hình phức tạp thì sao? Có khi chúng ta cần phải định nghĩa hàng chục kiểu view ^^ Vậy câu hỏi đặt ra là chúng ta có thể đơn giản hóa việc tập trung tất cả các kiểu view vào một chỗ để xử lý không?

>MergeAdapter[https://developer.android.com/reference/androidx/recyclerview/widget/MergeAdapter] là một giải pháp để giải quyết câu hỏi trên!
# II. Sử dụng MergeAdapter
* Chúng ta sẽ dùng MergeAdapter để hiện thực màn hình được yêu cầu như sau:
## Bước 1
* Đầu tiên chúng ta sẽ sử dụng phiên bản RecyclerView thích hợp (MergeAdapter chỉ hỗ trợ phiên bản RecyclerView mới nhất)
```
implementation "androidx.recyclerview:recyclerview:1.2.0-alpha02"
```
* Sau đó chúng ta sẽ tạo ra 3 model tương ứng với màn hình trên: MyDetail, Banner, User.
```
data class User(
     val id: Int = 0,
     val name: String = "",
     val avatar: String = ""
)
```
```
data class MyDetail(
     val id: Int = 0,
     val name: String = "",
     val aboutMe: String = ""
)
```
```
data class Banner(
     val bannerImage: Int = 0
)
```
## Bước 2
* Chúng ta sẽ tạo data giả như sau:
```
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
## Bước 3
* MergeAdapter sẽ gom nhóm và sắp xếp các adapter của RecyclerView theo trình tự do đó chúng ta sẽ tạo ra 3 adapter và UI item khác nhau:
```
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
```
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
```
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
```
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
```
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
```
<?xml version="1.0" encoding="utf-8"?>
<ImageView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/imageViewBanner"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```
## Bước 4
* Chúng ta sẽ khai báo các adapter lần lượt như sau:
```
lateinit var adapter: MergeAdapter
lateinit var myDetailAdapter: MyDetailAdapter
lateinit var userVerticalAdapter: UsersAdapter
lateinit var bannerAdapter: BannerAdapter
```
* Tạo một biến chứa thông tin:
```
val myDetail = MyDetail(1, "Himanshu Singh", "I am an writer and Open Source contributor in MindOrks.")
```
* Tạo 1 hàm để khởi tạo và set vào adapter:
```
private fun setupDataInRecyclerView() {
    recyclerView.layoutManager = LinearLayoutManager(this)
    userVerticalAdapter = UsersAdapter(DataSource.getUser())
    bannerAdapter = BannerAdapter(DataSource.getBanner())
    myDetailAdapter = MyDetailAdapter(myDetail)
    adapter = MergeAdapter(myDetailAdapter,  userVerticalAdapter,bannerAdapter)
    recyclerView.adapter = adapter
}
```
> MergeAdapter sẽ hiển thị danh sách dữ liệu theo thứ tự mà chúng ta thêm vào.
# III.Các ghi nhớ và lưu ý khi sử dụng MergeAdapter
### 1. Các điểm cần ghi nhớ
1. Nếu chúng ta muốn sử dụng nhiều lần cùng một adapter trong RecyclerView thì có thể tạo ra nhiều instance của adapter đó và thêm vào constructor của MergeAdapter.
2. Chúng ta nên xử lý logic riêng biệt trong từng adapter.
3. Khi chúng ta cập nhật data trong bất kỳ adapter con nào bằng cách gọi notifyDataSetChanged() thì MergeAdapter cũng sẽ gọi notifyDataSetChanged().
4. Thay vì thêm từng adapter riêng lẻ thì chúng ta có thể thêm một danh sách các adapter trong constructor của MergeAdapter.
```
val listOfAdapters = listOf<RecyclerView.Adapter<out RecyclerView.ViewHolder>>(myDetailAdapter, userVerticalAdapter, bannerAdapter)
adapter = MergeAdapter(listOfAdapters)
```
###  2. Các điểm cần lưu ý
1. Trong trường hợp chúng ta muốn tái sử dụng ViewHolder cho nhiều adapter thì cần phải set giá trị của isolateViewTypes là false
```
val configBuilder = MergeAdapter.Config.Builder()
configBuilder.setIsolateViewTypes(false)
val adapter = MergeAdapter(configBuilder.build(),myDetailAdapter, userVerticalAdapter, bannerAdapter)
```
2. Trong trường hợp chúng ta không muốn thêm adapter trực tiếp trong constructor của MergeAdapter làm như sau:
```
val adapter = MergeAdapter(listOfAdapters)
adapter.addAdapter(bannerAdapter)
```
* Adapter mới sẽ nằm cuối cùng của list adapter. Nếu như muốn add tại một vị trí bất kỳ thì chúng ta sẽ làm như sau:
```
adapter.addAdapter(position,bannerAdapter) – position: vị trí trong list adapter
```
3. Để xóa adapter chúng ta gọi:
```
adapter.removeAdapter(//adapter)
```
4. Để biết tổng số item của tất cả adapter trong RecyclerView chúng ta dùng
```
adapter.itemCount
```
5. Để lấy danh sách adapter đang tồn tại trong MergeAdapter, chúng ta dùng
```
adapter.adapters
```
# IV. Kết
* Hy vọng với bài viết này các bạn sẽ có thêm sự lựa chọn khi là việc với RecyclerView.
* Nội của bài viết được tham khảo tại [đây]( https://blog.mindorks.com/implementing-merge-adapter-in-android-tutorial) và tại [đây]( https://developer.android.com/reference/androidx/recyclerview/widget/MergeAdapter)