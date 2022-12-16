Xin chào các bạn! Trong bài viết này, mình sẽ hướng dẫn các bạn cách để tự tạo nột Expanded RecyclerView trong Android theo hai dạng khác nhau, sử dụng ngôn ngữ Kotlin kết hợp với ViewBinding.
![Untitled-1.png](https://images.viblo.asia/d24dc533-b189-4b59-8bb2-b9f9341da33b.png)
Trước tiên, để sử dụng được ViewBinding thì chúng ta vào build.gradle, enable ViewBinding trong thẻ android:
```
android {
    viewBinding {
        enabled = true
    }
    ...
}
```
Giờ chúng ta bắt tay vào code thôi.

##  Tạo Expandable RecyclerView
Đầu tiên ta tạo model cho các item, thêm vào phần thuộc tính một biến isExpandale, ta sẽ sử dụng để xử lý phần expand của item.
```scala
data class News(val title: String, val content: String, var isExpanded: Boolean = false)
```
Tiếp theo ta tạo layout để chứa Expandable RecyclerView, ở đây mình sử dụng luôn activity_main.xml:
```scala
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerViewNews"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:listitem="@layout/layout_tree"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```
Rồi sau đó ta tạo layout item cho Expandable RecyclerView:
```scala
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="5dp"
    app:cardCornerRadius="5dp"
    >

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="10dp">

        <TextView
            android:id="@+id/textTitle"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:textColor="@android:color/black"
            android:textSize="20sp"
            android:textStyle="bold"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:text="@tools:sample/lorem" />

        <TextView
            android:id="@+id/textContent"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:textSize="16sp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/textTitle"
            tools:text="@tools:sample/lorem/random" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</androidx.cardview.widget.CardView>
```
- Ở đây ta tạo một view hiển thị cố định(textTitle), và một view để xử lý phần expand(textContent).

Kế tiếp ta tạo adapter cho Expandable RecyclerView - đây là phần mấu chốt giúp cho RecyclerView của chúng ta có thể expand được.
```swift
class NewsAdapter(
    private val onItemClick: (News, Int) -> Unit
) : RecyclerView.Adapter<NewsAdapter.ViewHolder>() {
    private val news = mutableListOf<News>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = ViewHolder(
        ItemNewsBinding.inflate(LayoutInflater.from(parent.context), parent, false),
        onItemClick
    )

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bindData(news[position])
    }

    override fun getItemCount() = news.size

    fun setData(data: List<News>) {
        news.clear()
        news.addAll(data)
        notifyDataSetChanged()
    }

    class ViewHolder(
        private val binding: ItemNewsBinding,
        private val onTitleClick: (News, Int) -> Unit
        ) : RecyclerView.ViewHolder(binding.root) {
        fun bindData(item: News) {
            binding.apply {
                textTitle.text = item.title
                textContent.text = item.content

                textContent.visibility = if (item.isExpanded) View.VISIBLE else View.GONE
                textTitle.setOnClickListener { onTitleClick(item, adapterPosition) }
            }
        }
    }
}
```
- Trong phần bindData() ta sẽ kiểm tra biến isExpanded của Item để ẩn và hiện phần mở rộng(textContent).

Cuối cùng ta triển khai Expandable RecyclerView, ở đây mình sử dụng function getNews() để mô phỏng việc lấy dữ liệu từ server:
```swift
class MainActivity : AppCompatActivity() {
    private val binding: ActivityMainBinding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    private val adapter = NewsAdapter(this::onTitleClick)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setupData()
    }

    private fun setupData() {
        binding.recyclerViewNews.adapter = adapter
        adapter.setData(getNews())
    }

    private fun getNews(): List<News> {
        val news = mutableListOf<News>()
        for (i in 0..10) {
            news.add(News("Title $i", "This is content of news $i"))
        }
        return news
    }

    private fun onTitleClick(news: News, position: Int) {
        news.isExpanded = !news.isExpanded
        adapter.notifyItemChanged(position)
    }
}
```
Và đây là thành quả mà ta nhận được:
![Untitled-2.png](https://images.viblo.asia/78a27e09-f23e-4d94-b018-77a1c139b1b7.png)

##  Tạo Expandable RecyclerView theo dạng cây
Ta sẽ tạo một RecyclerView phân cấp với 2 - 3 hoặc nhiều hơn, nhưng bài này mình sẽ làm 1 cây 3 cấp, và nó cũng là một cây chính hiệu.

Các bước sẽ tương tự ở trên, ta sẽ tạo 3 model tương ứng với cây, cành, lá:
```scala
data class Tree(val name: String, val branches: List<Branch>, var isExpanded: Boolean = false)
```
```scala
data class Branch(val name: String, val leafs: List<Leaf>, var isExpanded: Boolean = false)
```
```scala
class Leaf(val name: String)
```
Tạo layout chứa Expandable RecyclerView:
```scala
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerViewTree"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:listitem="@layout/layout_tree"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```
Tạo 3 layout tương ứng với phần có thể mở rộng là một RecyclerView:
```scala
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="5dp"
    app:cardCornerRadius="10dp">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <TextView
            android:id="@+id/textTree"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:textColor="@android:color/black"
            android:textSize="24dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:text="@tools:sample/lorem" />

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/recyclerViewBranch"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/textTree"
            tools:listitem="@layout/layout_branch" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</androidx.cardview.widget.CardView>
```
```scala
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginVertical="5dp"
    android:layout_marginStart="20dp"
    android:layout_marginEnd="5dp"
    app:cardCornerRadius="10dp">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <TextView
            android:id="@+id/textBranch"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:textColor="@android:color/holo_orange_dark"
            android:textSize="20dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:text="@tools:sample/lorem" />

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/recyclerViewLeaf"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/textBranch"
            tools:listitem="@layout/layout_leaf" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</androidx.cardview.widget.CardView>
```
```html
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginVertical="5dp"
    android:layout_marginStart="20dp"
    android:layout_marginEnd="5dp"
    app:cardCornerRadius="10dp">

    <TextView
        android:id="@+id/textLeaf"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="10dp"
        android:textColor="@android:color/holo_green_dark"
        android:textSize="16dp"
        tools:text="@tools:sample/lorem" />
</androidx.cardview.widget.CardView>
```
Tạo 3 adapter tương ứng :
```swift
class TreeAdapter(
    private val onItemClick: (Tree, Int) -> Unit
) : RecyclerView.Adapter<TreeAdapter.ViewHolder>() {
    private val trees = mutableListOf<Tree>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = ViewHolder(
        LayoutTreeBinding.inflate(LayoutInflater.from(parent.context), parent, false),
        onItemClick
    )

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bindData(trees[position])
    }

    override fun getItemCount() = trees.size

    fun setData(data: List<Tree>) {
        trees.clear()
        trees.addAll(data)
        notifyDataSetChanged()
    }

    class ViewHolder(
        private val binding: LayoutTreeBinding,
        private val onTreeClick: (Tree, Int) -> Unit
    ) : RecyclerView.ViewHolder(binding.root) {

        private val adapter = BranchAdapter(this::onBranchClick)

        fun bindData(item: Tree) {
            binding.apply {
                textTree.text = item.name
                textTree.setOnClickListener { onTreeClick(item, adapterPosition) }
                recyclerViewBranch.visibility = if (item.isExpanded) View.VISIBLE else View.GONE
                recyclerViewBranch.adapter = adapter
                adapter.setData(item.branches)
            }
        }

        private fun onBranchClick(branch: Branch, position: Int) {
            branch.isExpanded = !branch.isExpanded
            adapter.notifyItemChanged(position)
        }
    }
}
```
```swift
class BranchAdapter(
    private val onItemClick: (Branch, Int) -> Unit
) : RecyclerView.Adapter<BranchAdapter.ViewHolder>() {
    private val trees = mutableListOf<Branch>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = ViewHolder(
        LayoutBranchBinding.inflate(LayoutInflater.from(parent.context), parent, false),
        onItemClick
    )

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bindData(trees[position])
    }

    override fun getItemCount() = trees.size

    fun setData(data: List<Branch>) {
        trees.clear()
        trees.addAll(data)
        notifyDataSetChanged()
    }

    class ViewHolder(
        private val binding: LayoutBranchBinding,
        private val onBranchClick: (Branch, Int) -> Unit
    ) : RecyclerView.ViewHolder(binding.root) {

        private val adapter = LeafAdapter()

        fun bindData(item: Branch) {
            binding.apply {
                textBranch.let {
                    it.text = item.name
                    it.setOnClickListener { onBranchClick(item, adapterPosition) }
                }
                recyclerViewLeaf.visibility = if (item.isExpanded) View.VISIBLE else View.GONE
                recyclerViewLeaf.adapter = adapter
                adapter.setData(item.leafs)
            }
        }
    }
}
```
```swift
class LeafAdapter() : RecyclerView.Adapter<LeafAdapter.ViewHolder>() {
    private val trees = mutableListOf<Leaf>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = ViewHolder(
        LayoutLeafBinding.inflate(LayoutInflater.from(parent.context), parent, false),
    )

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bindData(trees[position])
    }

    override fun getItemCount() = trees.size

    fun setData(data: List<Leaf>) {
        trees.clear()
        trees.addAll(data)
        notifyDataSetChanged()
    }

    class ViewHolder(
        private val binding: LayoutLeafBinding
    ) : RecyclerView.ViewHolder(binding.root) {

        fun bindData(item: Leaf) {
            binding.textLeaf.text = item.name
        }
    }
}
```
Phần triển khai cũng tương tự:
```swift
class MainActivity : AppCompatActivity() {
    private val binding: ActivityMainBinding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    private val adapter = TreeAdapter(this::onItemClick)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setupData()
    }

    private fun setupData() {
        binding.recyclerViewTree.adapter = adapter
        adapter.setData(getTrees())
    }

    private fun getTrees(): List<Tree> {
        val trees = mutableListOf<Tree>()
        for (i in 0..10) {
            val branches = mutableListOf<Branch>()
            for (j in 0..5) {
                val leafs = mutableListOf<Leaf>()
                for (k in 0..5){
                    leafs.add(Leaf("Leaf $k"))
                }
                branches.add(Branch("Branch $j", leafs))
            }

            trees.add(Tree("Tree $i", branches))
        }
        return trees
    }

    private fun onItemClick(tree: Tree, position: Int) {
        tree.isExpanded = !tree.isExpanded
        adapter.notifyItemChanged(position)
    }
}
```
Kết quả:
![Untitled-3.png](https://images.viblo.asia/2a2bb009-ee9a-47ac-b608-dacd1000e08d.png)
##   Kết
Cảm ơn các bạn đã theo dõi bài viết của mình! Mong bài viết này sẽ giúp các bạn hiểu cách để tạo ra một Expandable RecyclerView cơ bản. Từ đó, dựa vào sự sáng tạo của các bạn sẽ tùy biến, tạo ra các Expandable RecyclerView độc đáo, mới lạ hơn.