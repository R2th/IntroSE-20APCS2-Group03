Trong bài [Room Database kết hợp với Live Data trong Android](https://viblo.asia/p/room-database-ket-hop-voi-live-data-trong-android-4P856POaZY3) mình đã giới thiệu với các bạn cách kết hợp giữa cơ sở dữ liệu Room và [Architecture Components LiveData](https://viblo.asia/p/lifecycle-aware-data-loading-with-architecture-components-jvElaBV65kw) để làm 1 Demo đơn giản về thay đổi View ngay khi dữ liệu có sự thay đổi.

# Vấn đề
Nhưng trong VD đó có 1 vấn đề là khi các bạn thay đổi (thêm, sửa, xóa 1 bản ghi trong room) về dữ liệu thì mình sẽ lấy toàn bộ dữ liệu và thay đổi toàn bộ dữ liệu trên View
```Kotlin
    // Add an observer on the LiveData returned by getAlphabetizedWords.
    // The onChanged() method fires when the observed data changes and the activity is
    // in the foreground.
    wordViewModel.allWords.observe(this, Observer { words ->
        // Update the cached copy of the words in the adapter.
        words?.let { adapter.setWords(it) }
    })
```

`WordListAdapter.kt`
```Kotlin
    fun setWords(words: List<Word>) {
        this.words = words
        notifyDataSetChanged()
    }
```

Vì khi mình lấy dữ liệu từ Database lên thì mình không biết là dữ liệu thay đổi kiểu như thế nào (thêm, sửa, xóa) nên cách ăn chắc là cứ `notifyDataSetChanged()` cho an toàn :D. Nhưng mà thực chất mỗi lần như vậy thì hiệu năng của ứng dụng sẽ rất thấp, và `View` sẽ bị nháy mỗi khi mình gọi `notifyDataSetChanged()` để cập nhật lại dữ liệu. 

Vậy có cách nào xử lý hay là mình phải tự viết hàm so sánh giữa dữ liệu có trong Adapter và dữ liệu mới lấy về từ Database. Thật may mắn là Android có cung cấp cho chúng ta cơ chế như vậy và mình không phải tự viết code để check

# DiffUtil và ListAdapter

[DiffUtil](https://developer.android.com/reference/android/support/v7/util/DiffUtil) là 1 `Class` cung cấp các hàm tính toán sự khác biệt giữu 2 danh sách và đưa ra 1 danh sách sự thay đổi (thêm phần tử, xóa và chỉnh sửa phần tử) giữa 2 danh sách đó. Dựa vào đó thì `DiffUtil` được sử dụng để tính toán sự khác biệt về dữ liệu của `RecyclerView`  trong 2 lần cập nhật. Hơn nữa `DiffUtil` còn cung cấp thêm lựa chọn có thể chạy ở `background thread`


[ListAdapter](https://developer.android.com/reference/android/widget/ListAdapter) thực chất là 1 Wraper của `RecyclerView.Adapter`  và cung cấp thêm cho chúng ta các sự kiện, các hàm để hỗ trợ  `DiffUtil`

Đầu tiên mình sẽ tạo ra 1 file để tính toán sự khác biệt giữa 2 lần `query database` khác nhau. 

```Kotlin
    class NoteDiffCallBack : DiffUtil.ItemCallback<Word>() {
        override fun areItemsTheSame(oldItem: Word, newItem: Word): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: Word, newItem: Word): Boolean {
            return oldItem == newItem
        }
    }
```

ở đây `DiffUtil.ItemCallback` yêu cấu chúng ta `override` 2 hàm để thực hiện việc so sánh.
- Hàm **areItemsTheSame** để kiểm tra em 2 Object có khác nhau hay không, thường ở đây mọi người lên so sánh 2 khóa chính (những gì mà chỉ Object đấy có hoặc điểm khác nhau đặc trưng giữa 2 đối tượng)  của 2 object
- Hàm **areContentsTheSame**  là để kiểm tra sự khác biệt về giữa liệu giữa 2 Object có cùng khóa chính. Các bạn lưu ý ở đây mình viết  `return oldItem == newItem` là do `object Word` mình sử dụng kiểu `data class` của Kotlin nên khi so sánh `oldItem == newItem` thực chất là so sánh các trường nằm trong class. Còn nếu bạn dùng class thường thì ở đây là nơi bạn định nghĩa những trường nào thay đổi trong Object

Bây giờ chúng ta sẽ quay lại  Adapter của RecyclerView
- WordListAdapter.kt
```Kotlin
class WordListAdapter constructor(
    context: Context
) : ListAdapter<Word, WordListAdapter.ViewHolder>(
    AsyncDifferConfig.Builder<Word>(NoteDiffCallBack())
        .setBackgroundThreadExecutor(Executors.newSingleThreadExecutor())
        .build()
) {

    private val inflater: LayoutInflater = LayoutInflater.from(context)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView = inflater.inflate(R.layout.recyclerview_item, parent, false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.onBind(getItem(position))
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val wordItemView: TextView = itemView.findViewById(R.id.textView)
        val id: TextView = itemView.findViewById(R.id.id)

       fun onBind(word: Word) {
          wordItemView.text = word.word
          id.text = word.id.toString()
       }
    }

    override fun submitList(list: List<Word>?) {
        super.submitList(ArrayList<Word>(list ?: listOf()))
    }
}
```

Adapter không thay đổi nhiều chỉ khác là ở đây `WordListAdapter` được extent từ `ListAdapter` mà thôi. Nhưng các bạn lưu ý dòng
```Kotlin
(
    AsyncDifferConfig.Builder<Word>(NoteDiffCallBack())
        .setBackgroundThreadExecutor(Executors.newSingleThreadExecutor())
        .build()
)
```

Với dòng khai báo này mình đã chỉ định là `NoteDiffCallBack` được chạy dưới `BackgroundThread` để tránh gây giật lag View

Trong `ListAdapter` đã được khai báo 1 List<T> để chứa dữ liệu các bạn chỉ cần thap thác get và set thông qua 2 hàm `getItem() - submitList() `

Như vậy thì cách set dữ liệu vào Adapter có chút thay đổi, nên mình sẽ quay lên Activtiy để sửa đổi 1 chút


`MainActivity.kt`
```Kotlin
//wordViewModel.allWords.observe(this, Observer { words ->
//        // Update the cached copy of the words in the adapter.
//      adapter.setWords(it)
//    })

    
wordViewModel.allWords.observe(this, Observer { words ->
            // Update the cached copy of the words in the adapter.
                adapter.submitList(words)
        })
```

Oke vậy là đã cơ bản là xong rồi đó. Chạy thử thôi nào. Khi chạy kiểm thử tình mình khuyên các bạn đặt 1 dòng Log vào trong phần Binding dữ liệu để kiểm tra xem là dữ liệu cũ có bị notify lại không

```Kotlin
    fun onBind(word: Word) {
            Log.i("--------------> ", "ViewHolder onBind - ${word.id}")
            wordItemView.text = word.word
            id.text = word.id.toString()
        }
```

![](https://images.viblo.asia/b020872d-f552-45e1-8b7f-f1c9ad654f8d.jpg)

Ở đây mình chỉ đơn giản thực hiện phương thức thêm mới, trong trường hợp chỉnh sửa và xóa  thì DiffUtil cũng sẽ cho biết chính xác vị trí của Item nào thay đổi và Notify đúng sự thay đổi đó tren view.

Qua bài viết này mình hi vọng các bạn hiểu thêm về DiffUtil và ListAdapter, cũng như là cách kết hợp các thư viện lại với nhau nhằm làm cho việc thiết kế ứng dụng được nhanh và an toàn hơn.

Link source: https://github.com/huyquyet/Room-LiveData-DiffUtil