# Giới thiệu
**Filter** - chức năng không quá xa lạ đối bất kì một ứng dụng hay website nào. Chúng ta không thể chỉ việc show ra cho người dùng một list danh sách các records mà không cho họ tìm kiếm một vài records theo một số điều kiện nào đó. Vì vậy, mình xin giới thiệu với các bạn về việc phát triển tính năng này trên ứng dụng Android.

# Coding
Ở bài viết này, mình sẽ sử dụng 2 thư viện sau: [RxJava](https://github.com/ReactiveX/RxJava) và [RxBinding](https://github.com/JakeWharton/RxBinding) kết hợp với ViewModel.
The dependencies go as follows:
```
implementation 'io.reactivex.rxjava2:rxandroid:2.0.1'
implementation "io.reactivex.rxjava2:rxjava:2.1.9"
implementation "io.reactivex.rxjava2:rxkotlin:2.2.0"
implementation 'com.jakewharton.rxbinding2:rxbinding-kotlin:2.1.1'
implementation "android.arch.lifecycle:extensions:1.1.1"
```
Chú ý các thư viện thay đổi phiên bản liên tọi.
Thử một đối tượng Post để điền vào RecyclerView nhé
```
data class Post(
        val id: Int,
        val title: String,
        val content: String
)
```
And a simple RecyclerView adapter.
```
class SimpleRecyclerAdapter(private val context: Context, private val posts: List<Post>) : RecyclerView.Adapter<SimpleRecyclerAdapter.PostHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostHolder {
        return PostHolder(LayoutInflater.from(context).inflate(R.layout.rcl_item_post, parent, false))
    }

    override fun getItemCount() = posts.size

    override fun onBindViewHolder(holder: PostHolder, position: Int) {
        holder.bind(posts[position])
    }

    class PostHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(post: Post) {
            itemView.titleView.text = post.title
            itemView.contentView.text = post.content
        }
    }
}
```
Giờ ta cần 1 ViewModel cho MainActivity. 
```
class MainViewModel : ViewModel() {

    private val originalPosts = listOf(
            Post(1, "Ubi est castus animalis?", "Albus solems ducunt ad plasmator. Amors trabem in brigantium! Nutrix experimentums, tanquam camerarius ventus."),
            Post(2, "Always spiritually gain the crystal power.", "When one traps conclusion and attitude, one is able to fear surrender.Yes, there is order, it empowers with bliss."),
            Post(3, "Place the truffels in a casserole, and rub ultimately with whole teriyaki.", "Place the tuna in a pan, and mix carefully muddy with melted carrots lassi. Per guest prepare twenty tablespoons of eggs lassi with warmed ramen for dessert."),
            Post(4, "Why does the scabbard fall?", "Jolly halitosis lead to the amnesty. The pants whines beauty like a rainy moon. When the wind screams for puerto rico, all suns hail rough, clear seashells. Scallywags sing from malarias like salty ships."),
            Post(5, "Impressively translate a ferengi.", "The tragedy is an interstellar nanomachine. Wobble wihtout starlight travel, and we won’t promise a space. Meet wihtout nuclear flux, and we won’t transform a sonic shower. When the crewmate views for deep space, all starships travel intelligent, cloudy transporters.")
    )

    val filteredPosts: MutableList<Post> = mutableListOf()
    val oldFilteredPosts: MutableList<Post> = mutableListOf()

    init {
        oldFilteredPosts.addAll(originalPosts)
    }

}
```
Chúng ta sẽ cần 3 danh sách để giữ data  ở các trạng thái khác nhau.
* ```originalPosts :``` Đây là lists các Post không thay đổi trong suốt quá trình lọc kết quả. Chúng ta sẽ tìm theo list này để có được tất cả data. Nó giống như 1 CSDL hoặc API
* ```oldFilteredPosts :``` Đây là lists chứa kết quả cuối cùng của quá trình lọc cho đến sự kiện tìm kiếm tiếp theo.
* ```filteredPosts :``` Và đây là một lists tạm thời chứa dữ liệu đã lọc trước khi áp dụng nó trên oldFiteredPosts.

Ta sẽ sử dụng DiffUtil để tạo hiệu ứng tìm kiếm trong Recycleview
DiffUtil có trách nhiệm tính toán sự khác biệt của mỗi lần lặp tìm kiếm với lần lặp trước và đưa ra một loạt hành động để chuyển đổi danh sách cũ sang danh sách mới. Nó làm như vậy bằng cách sử dụng triển khai giao diện DiffUtil.Callback để phát hiện các khác biệt của từng mục mà ta sẽ cung cấp cho nó.
```
class PostsDiffUtilCallback(private val oldList: List<Post>, private val newList: List<Post>) : DiffUtil.Callback() {
    override fun getOldListSize() = oldList.size

    override fun getNewListSize() = newList.size

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int) = oldList[oldItemPosition].id == newList[newItemPosition].id
    
    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int) = true // for the sake of simplicity we return true here but it can be changed to reflect a fine-grained control over which part of our views are updated
}
```

Bây giờ ta sẽ đi sâu hơn vào các thành phần để nhìn thấy chúng hoạt động. Phần này đi vào Activity của mình:
```
viewModel = ViewModelProviders.of(this).get(MainViewModel::class.java)

recyclerView.layoutManager = LinearLayoutManager(this)
recyclerView.adapter = SimpleRecyclerAdapter(this, viewModel.oldFilteredPosts)
```
Ta cần thêm chức năng tìm kiếm vào ViewModel để có thể tìm kiếm trong lists:
```
fun search(query: String): Completable = Completable.create {
    val wanted = originalPosts.filter {
        it.title.contains(query) || it.content.contains(query)
    }.toList()

    filteredPosts.clear()
    filteredPosts.addAll(wanted)
    it.onComplete()
}
```
```Explanation:```Ở đây mình custom một đối tượng Completable tùy chỉnh để thông báo cho RecyclerView  về bất kỳ thay đổi nào trong lists. 
Bây giờ đến phần chính của MainActivity , điều hướng các input text even đến ViewModel:
```
searchInput
        .textChanges()
        .debounce(500, TimeUnit.MILLISECONDS)
        .subscribe {
            viewModel
                    .search(it.toString())
                    .subscribeOn(Schedulers.computation())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe {
                        val diffResult = DiffUtil.calculateDiff(PostsDiffUtilCallback(viewModel.oldFilteredPosts, viewModel.filteredPosts))
                        viewModel.oldFilteredPosts.clear()
                       viewModel.oldFilteredPosts.addAll(viewModel.filteredPosts)
                        diffResult.dispatchUpdatesTo(recyclerView.adapter)
                    }
        }
```
```Explanation:```Mình sử dụng phương thức .textChanges (), nhờ vào thư viện RxBindings, để lấy một luồng các bản cập nhật EditText của mình và sau đó sử dụng .debounce () trên đó để chỉ tìm kiếm nếu người dùng thực sự đã dừng gõ để xem kết quả.Để không overflow back-end với mỗi lần nhấn phím. Bạn có thể điều chỉnh time window. Các bản cập nhật càng thấp càng nhanh.
Cuối cùng, mình gửi sự kiện tìm kiếm tới ViewModel và yêu cầu nó chạy tìm kiếm trên một luồng khác ngoài UI Thread  để không đóng băng UI nếu quá trình tìm kiếm nặng hoặc lỗi mạng. 
Sau khi tính toán diffResult, chúng tôi sẽ cập nhật danh sách thực tế tại đây, xóa tất cả các bài đăng trước đó và thêm những bài mới được lọc:
```
viewModel.oldFilteredPosts.clear()
viewModel.oldFilteredPosts.addAll(viewModel.filteredPosts)
```
Sau đó, nó chỉ là vấn đề cập nhật RecyclerView.
```
diffResult.dispatchUpdatesTo(recyclerView.adapter)
```
Sử dụng kỹ thuật này, bạn sẽ có một khả năng lọc RecyclerView hoạt hình đẹp. Bạn có thể dễ dàng trao đổi chức năng tìm kiếm để đọc dữ liệu từ cơ sở dữ liệu hoặc máy chủ từ xa.
That’s it.
Tham khảo : AndroidPub