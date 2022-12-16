Hôm nay mình muốn chia sẻ với các bạn một ví dụ về Expandable List sử dụng [`ListAdapter`](https://developer.android.com/reference/androidx/recyclerview/widget/ListAdapter) + [Data Binding](https://developer.android.com/topic/libraries/data-binding) và multi-type trong [`RecyclerView`](https://developer.android.com/guide/topics/ui/layout/recyclerview).

Các bạn có thể tham khảo source code của mình [tại đây](https://github.com/huuphuoc1396/expandable-list-adapter-example)!

Mình đang sử dụng [Gradle 6.5](https://docs.gradle.org/6.5/release-notes.html) và [Android Studio 4.1 ](https://android-developers.googleblog.com/2020/10/android-studio-41.html) nhé. 

![](https://images.viblo.asia/06e195cf-8310-4dcc-b5c5-abb651243e7b.gif)

Ví dụ này sẽ hiển thị một danh sách các Section, khi chúng ta tap vào một Section nó sẽ mở rộng ra và hiển các Item của nó.

## Dependencies

Đầu tiên chúng ta sẽ cần một vài dependencies trong `build.gradle` của module như sau: 

```kotlin

dependencies {

    implementation 'org.jetbrains.kotlin:kotlin-stdlib:1.4.10'
    implementation 'androidx.core:core-ktx:1.3.2'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'com.google.android.material:material:1.2.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.2'
    implementation 'androidx.activity:activity-ktx:1.1.0'
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0'
    implementation 'androidx.recyclerview:recyclerview:1.1.0'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'
}
```

## Section Model

Chúng ta sẽ có một `Section` model chứa các thông tin:

```kotlin
data class Section(
    val id: Int,
    val name: String,
    val isExpandable: Boolean,
    val items: List<Item>
) {
    data class Item(
        val id: Int,
        val name: String
    )
}
```

Các bạn chú ý 2 thuộc tính sau nhé: 
- `isExpandable`: Xác định trạng thái có thể mở rộng. `true` nếu đang thu gọn, `false` nếu đang mở rộng.
- `items`: Danh sách các item sẽ hiển thị khi list mở rộng.

Ở đây mình khuyến khích sử dụng [`data class`](https://kotlinlang.org/docs/reference/data-classes.html) để tiện cho việc compare trong [`DiffUtil`](https://developer.android.com/reference/androidx/recyclerview/widget/DiffUtil) sau này. 

## ViewHolder
Tiếp theo, chúng ta sẽ có 2 `ViewHolder` để hiển thị cho `Section` và các `Item` của nó: 

### `SectionViewHolder`

Mình sẽ tạo một layout là `item_section.xml` chứa một `TextView` để hiển thị name của Section và một `AppCompatImageView` để hiển thị expand icon, cái này thay đổi theo `isExpandable` trong `Section` model.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <variable
            name="section"
            type="com.example.expandable_list_adapter_example.Section" />
    </data>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="?selectableItemBackground"
        android:gravity="center"
        android:orientation="horizontal"
        android:padding="16dp">

        <TextView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="@{section.name}"
            android:textAppearance="@style/TextAppearance.AppCompat.Medium"
            android:textStyle="bold"
            tools:text="Section 0" />

        <androidx.appcompat.widget.AppCompatImageView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:sectionExpandable="@{section.expandable}"
            tools:srcCompat="@drawable/ic_baseline_expand_more_24" />
    </LinearLayout>

</layout>
```

Mình có thêm một [`BindingAdapter`](https://developer.android.com/topic/libraries/data-binding/binding-adapters) là `sectionExpandable` để cập nhật expand icon khi `isExpandable` thay đổi.

```kotlin
class SectionViewHolder(
    private val binding: ItemSectionBinding,
    private val onSectionClickListener: (Section) -> Unit
) : RecyclerView.ViewHolder(binding.root) {

    init {
        binding.root.setOnSingleClickListener {
            binding.section?.let {
                onSectionClickListener(it)
            }
        }
    }

    fun bind(section: Section) {
        binding.section = section
    }

    object Binding {

        @JvmStatic
        @BindingAdapter("sectionExpandable")
        fun setSectionExpandable(imageView: AppCompatImageView, isExpandable: Boolean) {
            if (isExpandable) {
                imageView.setImageResource(R.drawable.ic_baseline_expand_more_24)
            } else {
                imageView.setImageResource(R.drawable.ic_baseline_expand_less_24)
            }
        }
    }
}
```

Để hiển thị các `Item` của `Section`, mình sẽ xây dựng thêm một `ViewHodder` khác là: 

### `SectionItemViewHolder`

Đối với Section Item mình chỉ cần một `TextView` để hiển thị name của Item đó.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <variable
            name="sectionItem"
            type="com.example.expandable_list_adapter_example.Section.Item" />
    </data>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingStart="32dp"
        android:paddingTop="16dp"
        android:paddingEnd="16dp"
        android:paddingBottom="16dp"
        android:text="@{sectionItem.name}"
        android:textAppearance="@style/TextAppearance.AppCompat.Small"
        tools:text="Item 0" />
</layout>
```

```kotlin
class SectionItemViewHolder(
    private val binding: ItemSectionItemBinding
) : RecyclerView.ViewHolder(binding.root) {

    fun bind(sectionItem: Section.Item) {
        binding.sectionItem = sectionItem
    }
}
```

### `ListAdapter` 
Bây giờ, chúng ta sẽ xử lý `ListAdapter` để tích hợp với các `ViewHolder` trên.

Lý do để mình sử dụng `ListAdapter` đó là nó tích hợp DiffUtil để compare sự khác nhau của list được submit. Các bạn có thể [tham khảo thêm ở đây](https://developer.android.com/reference/androidx/recyclerview/widget/ListAdapter).

Đầu tiên, chúng ta sẽ cần cung cấp cho nó một `DiffUtil.ItemCallback` như sau:

```kotlin 
class MainListAdapter(
    private val onSectionClickListener: (Section) -> Unit
) : ListAdapter<Any, RecyclerView.ViewHolder>(DIFF_CALLBACK) {
    
    companion object {
        private val DIFF_CALLBACK = object : DiffUtil.ItemCallback<Any>() {

            override fun areItemsTheSame(oldItem: Any, newItem: Any): Boolean {
                return when {
                    oldItem is Section && newItem is Section -> {
                        oldItem.id == newItem.id
                    }
                    oldItem is Section.Item && newItem is Section.Item -> {
                        oldItem.id == newItem.id
                    }
                    else -> false
                }
            }

            @SuppressLint("DiffUtilEquals")
            override fun areContentsTheSame(oldItem: Any, newItem: Any): Boolean {
                return when {
                    oldItem is Section && newItem is Section -> {
                        oldItem == newItem
                    }
                    oldItem is Section.Item && newItem is Section.Item -> {
                        oldItem == newItem
                    }
                    else -> false
                }
            }

        }
    }
}
```

Trong Adapter sẽ có 2 types, một cho Section và một cho Section Item.

Để có thể display 2 types này trong `RecyclerView` thì Adapter cần xác định chúng thông qua việc override `getItemViewType(_: Int) : Int` method. 

```kotlin 
class MainListAdapter(
    private val onSectionClickListener: (Section) -> Unit
) : ListAdapter<Any, RecyclerView.ViewHolder>(DIFF_CALLBACK) {

    override fun getItemViewType(position: Int): Int {
        return when (getItem(position)) {
            is Section -> {
                ViewType.SECTION
            }
            is Section.Item -> {
                ViewType.SECTION_ITEM
            }
            else -> super.getItemViewType(position)
        }
    }

    object ViewType {
        const val SECTION = 101
        const val SECTION_ITEM = 102
    }
}
```

Tiếp theo, chúng ta sẽ tạo `ViewHolder` tướng ứng với các ViewType đã định nghĩa và bind data cho chúng.

```kotlin 
class MainListAdapter(
    private val onSectionClickListener: (Section) -> Unit
) : ListAdapter<Any, RecyclerView.ViewHolder>(DIFF_CALLBACK) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return when (viewType) {
            ViewType.SECTION -> {
                val itemSectionBinding = ItemSectionBinding.inflate(inflater, parent, false)
                SectionViewHolder(itemSectionBinding, onSectionClickListener)
            }
            ViewType.SECTION_ITEM -> {
                val itemSectionItemBinding = ItemSectionItemBinding.inflate(inflater, parent, false)
                SectionItemViewHolder(itemSectionItemBinding)
            }

            else -> throw(Throwable("View type not matching"))
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (val item = getItem(position)) {
            is Section -> (holder as? SectionViewHolder)?.bind(item)
            is Section.Item -> (holder as? SectionItemViewHolder)?.bind(item)
        }
    }
}
```

## `MainViewModel`

Bây giờ, mình sẽ sử dụng ViewModel để xử lý dữ liệu cho Section cũng như cập nhật lại Section list khi có action expanding. 

`class` `MainViewModel` sẽ như sau:

```kotlin 
class MainViewModel : ViewModel() {

    private var sectionList: List<Section> = listOf()

    val sectionListLiveData = MutableLiveData<List<Section>>(sectionList)

    val isRefreshing = MutableLiveData<Boolean>(false)

    fun refresh() {
        isRefreshing.value = true
        getSectionList()
    }

    fun getSectionList() {
        sectionList = fakeSectionList()
        sectionListLiveData.value = sectionList
        isRefreshing.value = false
    }

    fun expand(sectionId: Int) {
        sectionList = sectionList.map { section ->
            if (section.id == sectionId) {
                section.copy(
                    isExpandable = !section.isExpandable
                )
            } else {
                section.copy(
                    isExpandable = true
                )
            }
        }
        sectionListLiveData.value = sectionList
    }

    private fun fakeSectionList(): List<Section> {
        val sectionList: MutableList<Section> = mutableListOf()
        repeat(Random.nextInt(0, 100)) { index ->
            val section = Section(
                id = index,
                name = "Section $index",
                items = fakeSectionItemList(),
                isExpandable = true
            )
            sectionList.add(section)
        }
        return sectionList
    }

    private fun fakeSectionItemList(): List<Section.Item> {
        val sectionItemList: MutableList<Section.Item> = mutableListOf()
        repeat(Random.nextInt(0, 10)) { index ->
            val sectionItem = Section.Item(
                id = index,
                name = "Item $index"
            )
            sectionItemList.add(sectionItem)
        }
        return sectionItemList
    }
}
```

- `getSectionList()`: Random một Section list
- `expand(_: Int)`: Cập nhật trạng thái khi một section expading.
- `refresh()`: Refresh lại Section list.

Cuối cùng chúng ta sẽ apply tất cả chúng vào `RecyclerView` trong `MainActivity`. 

## `MainActivity`

### `activity_main.xml`

Trong `activity_main.xml` layout, mình chỉ có một `RecyclerView` và `SwipeRefreshLayout` phục vụ cho việc refresh lại Section list.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <variable
            name="viewModel"
            type="com.example.expandable_list_adapter_example.MainViewModel" />
    </data>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

        <androidx.swiperefreshlayout.widget.SwipeRefreshLayout
            android:id="@+id/swipeRefreshLayout"
            android:layout_width="0dp"
            android:layout_height="0dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:onRefreshListener="@{() -> viewModel.refresh()}"
            app:refreshing="@{viewModel.isRefreshing()}">

            <androidx.recyclerview.widget.RecyclerView
                android:id="@+id/recyclerView"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                app:layoutManager="LinearLayoutManager"
                app:sectionList="@{viewModel.sectionListLiveData}" />
        </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

-  `app:onRefreshListener="@{() -> viewModel.refresh()}"` nhận action refresh từ user và gọi `refresh()` method.
-  `app:refreshing="@{viewModel.isRefreshing()}"` hiển thị icon loading theo `isRefreshing()`.
-  `app:sectionList="@{viewModel.sectionListLiveData}"` là một `BindingAdapter` mình định nghĩa trong `MainActivity.Binding`, để submit một list mới khi `sectionListLiveData` changed.

### `MainActivity`
```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        binding.viewModel = viewModel
        binding.lifecycleOwner = this
        binding.executePendingBindings()

        binding.recyclerView.adapter = MainListAdapter(
            onSectionClickListener = { section ->
                viewModel.expand(section.id)
            }
        )

        viewModel.getSectionList()
    }

    object Binding {

        @JvmStatic
        @BindingAdapter("sectionList")
        fun setSectionList(recyclerView: RecyclerView, sectionList: List<Section>) {
            val list = mutableListOf<Any>()
            val mainListAdapter = recyclerView.adapter as? MainListAdapter

            sectionList.forEach { section ->
                list.add(section)
                if (!section.isExpandable) {
                    list.addAll(section.items)
                }
            }

            mainListAdapter?.submitList(list)
        }
    }
}
```

Trong  `BindingAdapter` `sectionList`, mình sẽ check `isExpandable` để add hoặc không add section item. 

Khi `isExpandable` là `false`, nghĩa là đang mở rộng thì chúng ta sẽ add các Section Item vào. Và ngược lại, chúng ta chỉ add Section thôi.

## Túm lại
Mình đã giới thiệu xong một example về Expandable List. Có thể đây không phải cách tối ưu nhất khi xử lý vấn đề này. Nhưng hi vọng nó sẽ giúp một chút gì cho các bạn. 

Nếu có bất kì vấn đề nào hoặc góp ý cho bài viết, hãy comment dưới nhé... 

Cám ơn các bạn đã đọc đến đây.

**Thank you and Happy coding!!!**

#### [Source Code](https://github.com/huuphuoc1396/expandable-list-adapter-example)