Việc triển khai Unit Test vào project Android đang dần phổ biến hơn và anh em chúng ta đang muốn kiểm tra lại chất lượng phần logic trước khi muốn phát hành production. Vậy thì có cách nào TỐT cho công việc hiệu quả hơn không? Chúng ta sẽ cùng tìm hiểu nhé!

![](https://images.viblo.asia/0e9f0426-f385-4f21-9182-5e2ab2ebfd51.png)

(Hình ảnh Kim tự tháp trong kiểm thử) bạn thấy Unit Test là công việc trước tiên nằm ở phần đáy và sau cùng là UI test. Theo thống kê mức độ quan trọng của 3 hình thức test này, người ta chỉ ra rằng :

1. UI Tests: 10%
2. Integration Tests: 20%
3. Unit Tests: 70%

![](https://images.viblo.asia/16359d25-8f88-4b3f-ba82-6369a39bb734.jpg)

Mình chuẩn bị một ứng dụng nhỏ (hình ảnh trên) có chức năng tìm kiếm đồ ăn với 1 vài tính năng chính:

1. Tìm kiếm
2. Đồ ăn ưa thích
3. Xem chi tiết

Khi chúng ta có cái gì đó để xem trước thì việc hình dung mình nghĩ sẽ đơn giản hơn nhiều, vì vậy đây là demo giúp tiếp cận việc triển khai Unit Test dễ dàng hơn.
Các bạn xem tiếp cấu trúc project này như nào nhé. (hình ảnh dưới)

![](https://images.viblo.asia/81258883-5733-4528-bf67-bcf1425756f2.png)

Ok, bây giờ chúng ta sẽ tìm cách triển khai Unit Test cho project này làm sao để TỐT hơn. 

### Bước 1 Kiểm Tra Mô Hình Project Bạn Đang Dùng

Hiện tại mình đang không theo mô hình nào cả, viết là cứ ném vào activity để xử lý logic thôi. :D 

`SearchResultsActivity.kt`

```
fun Context.searchResultsIntent(query: String): Intent {
  return Intent(this, SearchResultsActivity::class.java).apply {
    putExtra(EXTRA_QUERY, query)
  }
}

private const val EXTRA_QUERY = "EXTRA_QUERY"

class SearchResultsActivity : ChildActivity() {

  private val repository: RecipeRepository by lazy {RecipeRepository.getRepository(this)}

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_list)

    val query = intent.getStringExtra(EXTRA_QUERY)
    supportActionBar?.subtitle = query

    search(query)

    retry.setOnClickListener { search(query) }
  }

private fun search(query: String) {
    showLoadingView()
    repository.getRecipes(query, object : RecipeRepository.RepositoryCallback<List<Recipe>> {
      override fun onSuccess(recipes: List<Recipe>?) {
        if (recipes != null && recipes.isNotEmpty()) {
          showRecipes(recipes)
        } else {
          showEmptyRecipes()
        }
      }

      override fun onError() {
        showErrorView()
      }
    })
  }

  private fun showEmptyRecipes() {
    loadingContainer.visibility = View.GONE
    errorContainer.visibility = View.GONE
    list.visibility = View.VISIBLE
    noresultsContainer.visibility = View.VISIBLE
  }

  private fun showRecipes(recipes: List<Recipe>) {
    loadingContainer.visibility = View.GONE
    errorContainer.visibility = View.GONE
    list.visibility = View.VISIBLE
    noresultsContainer.visibility = View.GONE

    list.layoutManager = LinearLayoutManager(this)
    list.adapter = RecipeAdapter(recipes, object : RecipeAdapter.Listener {
      override fun onClickItem(item: Recipe) {
        startActivity(recipeIntent(item.sourceUrl))
      }

      override fun onAddFavorite(item: Recipe) {
        item.isFavorited = true
        repository.addFavorite(item)
        list.adapter.notifyItemChanged(recipes.indexOf(item))
      }

      override fun onRemoveFavorite(item: Recipe) {
        repository.removeFavorite(item)
        item.isFavorited = false
        list.adapter.notifyItemChanged(recipes.indexOf(item))
      }

    })
  }

  private fun showErrorView() {
    loadingContainer.visibility = View.GONE
    errorContainer.visibility = View.VISIBLE
    list.visibility = View.GONE
    noresultsContainer.visibility = View.GONE
  }

  private fun showLoadingView() {
    loadingContainer.visibility = View.VISIBLE
    errorContainer.visibility = View.GONE
    list.visibility = View.GONE
    noresultsContainer.visibility = View.GONE
  }
}
```

Các bạn nhìn vào function search, đảm nhận luôn cả phần logic và hiển thị thay đổi view.

```
private fun search(query: String) {
    showLoadingView()
    repository.getRecipes(query, object : RecipeRepository.RepositoryCallback<List<Recipe>> {
      override fun onSuccess(recipes: List<Recipe>?) {
        if (recipes != null && recipes.isNotEmpty()) {
          showRecipes(recipes)
        } else {
          showEmptyRecipes()
        }
      }

      override fun onError() {
        showErrorView()
      }
    })
  }
```

Đây là Khó khăn chung mà nhiều anh em sẽ gặp phải nếu như không có sự lựa chọn mô hình tối ưu ngay từ đầu. Dẫn đến việc bây giờ muốn triển khai Unit Test NHANH và TỐT tốn nhiều mồ hôi công sức.

*Giải pháp:* Bạn thử thay đổi sang **MVP** hoặc **MVVM** xem sao. (Nếu bạn chưa biết có thể tự tìm hiểu nha)

### Bước 2 Refactor Code Theo MVP

![](https://images.viblo.asia/7210f2d8-a268-4d10-8ef3-ba79a647e7f9.png)

Mình sẽ áp dụng cấu trúc MVP để cho việc implement Unit Test trở lên dễ dàng hơn.

Giờ mình sẽ chuyển toàn bộ logic phần search vào 1 presenter có tên **SearchPresenter** và khi viết unit test thì chỉ kiểm tra function login của presenter này mà thôi. Let's go!

`SearchPresenter.kt`

```
class SearchPresenter {
  // 1
  private var view: View? = null

  // 2
  fun attachView(view: View) {
    this.view = view
  }
  
  // 3
  fun detachView() {
    this.view = null
  }

  // 4
  fun search(query: String) {
    // 5
    if (query.trim().isBlank()) {
      view?.showQueryRequiredMessage()
    } else {
      view?.showSearchResults(query)
    }
  }

  // 6
  interface View {
    fun showQueryRequiredMessage()
    fun showSearchResults(query: String)
  }
}
```

Tiếp theo integrate presenter này vào view (chính là activity search)

`SearchActivity.kt`
```
class SearchActivity : ChildActivity(), SearchPresenter.View {

  private val presenter: SearchPresenter = SearchPresenter()

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_search)

    // 2
    presenter.attachView(this)

    searchButton.setOnClickListener {
      val query = ingredients.text.toString()
      // 3
      presenter.search(query)
    }
  }

  override fun onDestroy() {
    // 4
    presenter.detachView()
    super.onDestroy()
  }

  // 5
  override fun showQueryRequiredMessage() {
    // Hide keyboard
    val view = this.currentFocus
    if (view != null) {
      val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
      imm.hideSoftInputFromWindow(view.windowToken, 0)
    }

    Snackbar.make(searchButton, getString(R.string.search_query_required), Snackbar
        .LENGTH_LONG).show()
  }

  // 6
  override fun showSearchResults(query: String) {
    startActivity(searchResultsIntent(query))
  }
}
```

Lần lượt các bạn tạo thêm các presenter khác : 

**SearchResultsPresenter** gắn cho **SearchResultsActivity**

Nếu bạn lần đầu dùng mô hình này thì đừng quá lo dần dần sẽ quen thôi. Giờ mình chuyển sang phần viết Unit Test cho những presenter mà anh em vừa mới refactor xong nhé.

### Bước 3 Triển khai Unit Test dùng Mockito

**Implement cho Kotlin:**

```
dependencies {
  ...
  testImplementation 'com.nhaarman:mockito-kotlin-kt1.1:1.5.0'
  ...
}
```

**Nếu dùng Java:**

```
    testImplementation 'junit:junit:4.13'
    testImplementation 'org.mockito:mockito-core:2.27.0'
    testImplementation "org.powermock:powermock-module-junit4:2.0.4"
    testImplementation "org.powermock:powermock-api-mockito2:2.0.4"
```

- Viết SearchPresenterTest

`SearchPresenterTest`

```
class SearchPresenterTest {

  private lateinit var presenter : SearchPresenter
  private lateinit var view : SearchPresenter.View

  @Before
  fun setup() {
    presenter = SearchPresenter()
    view = mock()
    presenter.attachView(view)
  }
```

Thêm method test khi query nội dung trống

```
@Test
  fun search_withEmptyQuery_callsShowQueryRequiredMessage() {
    presenter.search("")

    verify(view).showQueryRequiredMessage()
  }
```

Trường hợp khi đã có sẵn kết quả trong lần search trước đó, chúng ta sẽ gọi hàm **showRecipes** để hiển thị kết quả.

```
@Test
  fun search_withRepositoryHavingRecipes_callsShowRecipes() {
    // 1
    val recipe = Recipe("id", "title", "imageUrl", "sourceUrl", false)
    val recipes = listOf<Recipe>(recipe)

    // 2
    doAnswer {
      val callback: RepositoryCallback<List<Recipe>> = it.getArgument(1)
      callback.onSuccess(recipes)
    }.whenever(repository).getRecipes(eq("eggs"), any())

    // 3
    presenter.search("eggs")

    // 4
    verify(view).showRecipes(eq(recipes))
  }
```

Tiếp đến xem method addFavorite có chạy đúng không?

```
 @Test
  fun addFavorite_shouldUpdateRecipeStatus() {
    // 1
    val recipe = Recipe("id", "title", "imageUrl", "sourceUrl", false)

    // 2
    presenter.addFavorite(recipe)

    // 3
    Assert.assertTrue(recipe.isFavorited)
  }
```

Không thể thiếu trường hợp chúng ta gọi api search thành công 

```
 @Test
  fun search_callsGetRecipes() {
    presenter.search("eggs")

    verify(repository).getRecipes(eq("eggs"), any())
  }
```

### Tổng kết

Với những chia sẻ trên đây hi vọng rằng các bạn đã có cách triển khai Unit Test cho project của mình, mong rằng bài viết mang lại hữu ích. Việc triển khai Unit Test đạt hiệu quả cao bạn cần chú ý đến việc sử dụng mô hình cho thích hợp và lường trước được nhiều case càng tốt. Nếu có thắc mắc các bạn hãy để lại comment ngay phía dưới bài viết này nhé.