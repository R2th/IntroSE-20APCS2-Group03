Trong những ứng dụng android, chức năng tìm kiếm chọn lọc là rất cần thiết và cực kỳ quan trọng. Hôm nay mình sẽ giới thiệu cho các bạn cách để làm chức năng này với RecyclerView.

**Những kiến thức cần chuẩn bị :**

Generics, Interface, nền tảng về OOP, Kotlin (Lambdas/High Order Functions), AndroidX Artifacts và Recycler View.

**Let's get Started**

Trước tiên bạn cần tạo một class adapter cho recycler view để xử lý danh sách của bạn. Tuy nhiên adapter này sẽ kế thừa DynamicSearchAdapter thay vì kế thừa thư viện tiêu chuẩn RecyclerView.Adapter. 

**Dưới đây là 1 ví dụ:**
```Kotlin
class SearchAdapter1(private val mutableList: MutableList<SearchModel1>) :
    DynamicSearchAdapter<SearchModel1>(mutableList) {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val textView = TextView(parent.context)
        return ViewHolder(textView)
    }

    override fun getItemCount(): Int {
        return mutableList.count()
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val tv = holder.containerView as TextView
        tv.text = mutableList[position].data

    }


}
class SearchAdapter2(private val mutableList: MutableList<SearchModel2>) :
    DynamicSearchAdapter<SearchModel2>(mutableList) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val textView = TextView(parent.context)
        return ViewHolder(textView)
    }

    override fun getItemCount(): Int {
        return mutableList.count()
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val tv = holder.containerView as TextView
        tv.text = mutableList[position].data

    }


}
```

**Abstract class DynamicSearchAdapter:**

```Kotlin
abstract class DynamicSearchAdapter<T : DynamicSearchAdapter.Searchable>(private val searchableList: MutableList<T>) :
        RecyclerView.Adapter<ViewHolder>(), Filterable {

    // Single not-to-be-modified copy of original data in the list.
    private val originalList = ArrayList(searchableList)
    // a method-body to invoke when search returns nothing. It can be null.
    private var onNothingFound: (() -> Unit)? = null

    /**
     * Searches a specific item in the list and updates adapter.
     * if the search returns empty then onNothingFound callback is invoked if provided which can be used to update UI
     * @param s the search query or text. It can be null.
     * @param onNothingFound a method-body to invoke when search returns nothing. It can be null.
     */
    fun search(s: String?, onNothingFound: (() -> Unit)?) {
        this.onNothingFound = onNothingFound
        filter.filter(s)

    }

    override fun getFilter(): Filter {
        return object : Filter() {
            private val filterResults = FilterResults()
            override fun performFiltering(constraint: CharSequence?): FilterResults {
                searchableList.clear()
                if (constraint.isNullOrBlank()) {
                    searchableList.addAll(originalList)
                } else {
                    val searchResults = originalList.filter { it.getSearchCriteria().contains(constraint) }
                    searchableList.addAll(searchResults)
                }
                return filterResults.also {
                    it.values = searchableList
                }
            }

            override fun publishResults(constraint: CharSequence?, results: FilterResults?) {
                // no need to use "results" filtered list provided by this method.
                if (searchableList.isNullOrEmpty())
                    onNothingFound?.invoke()
                notifyDataSetChanged()

            }
        }
    }

    interface Searchable {
        /** This method will allow to specify a search string to compare against
        your search this can be anything depending on your use case.
         */
        fun getSearchCriteria(): String
    }
}
```

Tất cả các list đều phải implement interface Searchable được định nghĩa bên trong abstract class DynamicSearchAdapter ở trên.

```Kotlin
class SearchModel1(val data: String) : DynamicSearchAdapter.Searchable {


    override fun getSearchCriteria(): String {
        return data
    }
}
class SearchModel2(val data: String) : DynamicSearchAdapter.Searchable {


    override fun getSearchCriteria(): String {
        return data
    }
}

```

Danh sách của bạn sẽ trông giống như <SearchModel1> và <SearchModel2>, bạn cũng cần phải trả về một truy vấn tìm kiếm để so sánh với phương thức getSearchCriteria() trong mỗi class. Phương pháp này được sử dụng trong việc lọc ra dữ liệu cho từng danh sách riêng lẻ. Bạn có thể tạo bao nhiêu loại danh sách bạn muốn miễn là chúng đáp ứng các yêu cầu đã đề cập ở trên. Phương pháp tìm kiếm có thể được sử dụng để kích hoạt các tìm kiếm trong danh sách.
    
Phương thức tìm kiếm hoạt động không đồng bộ bởi Android’s Filterable Interface và sử dụng tìm kiếm tuyến tính với hai tham số. 
    
**String:** Search query.
    
**(()->Unit)?:** Lambda body để gọi khi không tìm thấy gì phù hợp với tìm kiếm. Nó có thể được sử dụng để cập nhật UI hoặc null.
    
Ví dụ về một Activity mẫu sẽ như dưới đây. Người dùng nhập dữ liệu trong chế độ tìm kiếm. Nó sẽ hiển thị toast nếu không có gì phù hợp với đầu vào được tìm thấy trong danh sách.
    
```Kotlin
class SampleActivity2 : AppCompatActivity(), SearchView.OnQueryTextListener {


    private lateinit var searchAdapter3: SearchAdapter3

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.fragment_main)
        rv.layoutManager = LinearLayoutManager(this)
        searchAdapter3 = SearchAdapter3(mutableListOf<SearchModel3>().populateWithUUIDSM3())
        rv.adapter = searchAdapter3
        searchV.setOnQueryTextListener(this)

    }

    override fun onQueryTextChange(newText: String?): Boolean {
        search(newText)
        return true
    }

    override fun onQueryTextSubmit(query: String?): Boolean {
        search(query)
        return true
    }

    private fun search(s: String?) {
        searchAdapter3.search(s) {
            // update UI on nothing found
            Toast.makeText(this, "Nothing Found", Toast.LENGTH_SHORT).show()
        }
    }
```

Bạn có thể tham khảo project mẫu tại đây : https://github.com/hieunn-0931/Android-Dynamic-Search-Adapter
    
**Tài liệu tham khảo:** https://android.jlelse.eu/search-on-recycler-view-android-e7661479481