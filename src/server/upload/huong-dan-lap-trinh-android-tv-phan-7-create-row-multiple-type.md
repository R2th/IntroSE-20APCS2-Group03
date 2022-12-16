# Giới thiệu
.Trong thực tế chúng ta rất hay gặp những list danh sách chứa nhiều item với cấu trúc, kích thước của mỗi item hoàn toàn khác nhau.  Đối với các bạn lập trình android hẳn sẽ rất quen thuộc với RecyclerView Multiple Type. Thư viện Leanback cũng hỗ trợ các bạn trong việc tạo ra các Row chứa nhiều iteam khác nhau trong ứng dụng android TV. Hôm nay chúng ta sẽ cùng tìm hiểu cách custom Mutiple Type Item cho ứng dụng Android TV

# Tiến hành
**Đầu tiên các bạn sẽ tạo 2 file XML cho 2 Item chúng ta cần hiển thị trong Row: ở đây mình sẽ đặt tên Item là GameShow và Movie**
```
// Item GameShow
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="240dp"
    android:layout_height="230dp"
    android:background="#342ea3">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Đây là item Game show"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</android.support.constraint.ConstraintLayout>
```

```
//Item Movie
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="240dp"
    android:layout_height="230dp"
    android:background="#b8c227">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Đây là item Movie"
        android:textColor="#000"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</android.support.constraint.ConstraintLayout>

```

**Tương ứng với 2 Item sẽ là 2 custom view cho chúng**
```
class GameShowCardView @JvmOverloads constructor(context: Context,
                                                 attrs: AttributeSet? = null, defStyleAttr: Int = R.attr.imageCardViewStyle) : ConstraintLayout(
        context, attrs, defStyleAttr) {

    init {
        isFocusable = true
        isFocusableInTouchMode = true
        isClickable = true
        val inflater = LayoutInflater.from(context)
        inflater.inflate(R.layout.item_game_show, this)
    }

    override fun hasOverlappingRendering(): Boolean {
        return false
    }
}

```

```
class MovieCardView @JvmOverloads constructor(context: Context,
                                              attrs: AttributeSet? = null, defStyleAttr: Int = R.attr.imageCardViewStyle) : ConstraintLayout(
        context, attrs, defStyleAttr) {

    init {
        isFocusable = true
        isFocusableInTouchMode = true
        isClickable = true
        val inflater = LayoutInflater.from(context)
        inflater.inflate(R.layout.item_movie, this)
    }

    override fun hasOverlappingRendering(): Boolean {
        return false
    }
}

```

**Và Presenter cho mỗi item**
```
open class GameShowPresenter : Presenter() {

    override fun onCreateViewHolder(parent: ViewGroup): Presenter.ViewHolder {
        val cardView = GameShowCardView(parent.context)
        return Presenter.ViewHolder(cardView)
    }

    override fun onBindViewHolder(viewHolder: Presenter.ViewHolder, item: Any) {
        // not implement
    }

    override fun onUnbindViewHolder(viewHolder: Presenter.ViewHolder) {
    }

    companion object {
        private val TAG = "GameShowPresenter"
    }
}

```

```
open class MoviePresenter : Presenter() {

    override fun onCreateViewHolder(parent: ViewGroup): Presenter.ViewHolder {
        val cardView = MovieCardView(parent.context)
        return Presenter.ViewHolder(cardView)
    }

    override fun onBindViewHolder(viewHolder: Presenter.ViewHolder, item: Any) {
       // todo
    }

    override fun onUnbindViewHolder(viewHolder: Presenter.ViewHolder) {
    }

    companion object {
        private val TAG = "MoviePresenter"
    }
}

```
**Leanback hỗ trợ một component gọi là PresenterSelector hỗ trợ việc hiển thị multiple item trong row**

```
class CardPresenterSelector : PresenterSelector() {

    private val moviePresenter by lazy { MoviePresenter() }
    private val gameShowPresenter by lazy { GameShowPresenter() }

    override fun getPresenter(item: Any): Presenter {
        return when (item) {
            is Movie -> {
                moviePresenter
            }
            is GameShow -> {
                gameShowPresenter
            }
            else -> gameShowPresenter
        }
    }

    override fun getPresenters(): Array<Presenter> {
        return arrayOf(moviePresenter, gameShowPresenter)
    }
}

```

Tạo MultipleRowFragment extent từ RowsSupportFragment để hiển thị các item

```
class MultipleRowFragment : RowsSupportFragment() {
    private var rowsAdapter: ArrayObjectAdapter? = null
    private var cardSelector: CardPresenterSelector? = null

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        val localInflater = inflater.cloneInContext(
                ContextThemeWrapper(activity, R.style.RowSupportFragmentTheme))
        return super.onCreateView(localInflater, container, savedInstanceState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initView()
        addData()
    }

    private fun initView() {
        rowsAdapter = ArrayObjectAdapter(ListRowPresenter())
        cardSelector = CardPresenterSelector()
        adapter = rowsAdapter
    }


    private fun addData() {
        val listRowAdapter = ArrayObjectAdapter(cardSelector)
        val listData: List<BaseCardModel> = listOf(Movie(), Movie(), GameShow(), Movie(), GameShow())
        listRowAdapter.addAll(0, listData)
        rowsAdapter?.add(ListRow(HeaderItem("Demo Row Multiple type"), listRowAdapter))
    }
}
```

**Trong activity_main**

```
<?xml version="1.0" encoding="utf-8"?>
<fragment xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main_browse_fragment"
    android:name="com.example.duong.demoleanback.MultipleRowFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    tools:deviceIds="tv"
    tools:ignore="MergeRootFrame" />
```

**Chạy thử**

![](https://images.viblo.asia/d1211489-9123-4cdf-808f-a9cc710462f3.png)https://images.viblo.asia/d1211489-9123-4cdf-808f-a9cc710462f3.png

# Cảm ơn các bạn đã theo dõi