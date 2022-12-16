Data Binding là một thư viện mạnh mẽ mà tôi đã bỏ qua phần lớn thời gian của tôi với tư cách là một Android dev (rất có thể bởi vì nó từng có chút mâu thuẫn). Tôi đã đọc nhiều về chúng, và tình cờ tôi gặp George Mount;s blogposts. Bài viết đó đã thực sự thu hút tôi một điều về Data Binding trên RecyclerView.

Đó là thời điểm tôi nhận ra Data Binding tuyệt với như thế nào, và tôi bắt đầu trờ thành một người dùng ListAdapter. Tôi nghĩ rằng mọi thứ có thể tốt hơn nếu tôi kết hợp chúng. Đây sẽ là một tóm tắt về cách chúng ta có thể tận dụng tối đa Data Binding và ListAdapter để giảm bới boilerplate và chỉ làm cho mã của chúng ta đơn giản và đẹp hơn
# Hãy bắt đầu
...nhưng đầu tiên, chỉ trong trường hợp bạn không biết một ListAdapter là gì:
> RecyclerView.Adapter base class để trình bày List data trong một RecyclerView bao gồm tính toán khác biệt giữa các List trong một background thread.
Nó là một base adapter mà tự cập nhật bản thân nó (với free animations!) khi list thay đổi. Gọi notifyDataSetChange và bạn bè của nó bây giờ là việc của quá khứ- tất cả những gì bây giờ bạn cần làm là gọi submitList() và truyền list đã update. Nếu điều này mới mẻ với bạn, nó có thể là một ý tưởng tốt để lấy đi thời gian của bạn và học về nó nhiều hơn- the document là tốt và có thể thực sự là nguồn duy nhất bạn sẽ cần

Bây giờ hãy quay trở lại với những thứ quan trọng 

Ý tưởng chính của blogpost, mà tôi đề cập đến ở trên là làm thế nào để chúng ta có thể đưa ra một ViewHolder chung mà chúng ta có thể tái sử dụng ở bất kỳ Adapter nào trong ứng dụng của chúng ta. Tôi giả sử rằng ViewHolder sẽ chỉ cần một đối tượng dữ liệu duy nhất để binding (đó chắc chắn là một goog practice). Object này là parameter của phương thức bind(), và tất cả chúng ta làm với nó là set nó như một biến với một ViewDataBinding chúng ta nhận như một tham số của hàm khởi tạo. Thông qua một thủ thuật quy ước đặt tên thông minh, chúng ta có sẽ có thể làm cho ViewHolder này hoạt động ở bất cứ nơi nào nó muốn
```kotlin
class DataBindingViewHolder<T>(private val binding: ViewDataBinding) :
    RecyclerView.ViewHolder(binding.root) {

    fun bind(item: T) {
        binding.setVariable(BR.item, item)
        binding.executePendingBindings()
    }
}
```
Đúng vậy, class nhỏ bé này có tiềm năng thây thế hầu hết VirewHolder bạn đã viết cho đến nay. Mã ban đầu đáp ứng mục đích của chúng tôi, vì vậy chúng tôi sẽ không thay đổi một thứ gì

Tiếp theo, chúng ta có thể tạp một base Adapter mà sẽ có hầu hết các bản mẫu chúng ta sẽ cần cho bất kỳ Adapter nào chúng ta sẽ viết. DataBindingAdapter của chúng ta sẽ khác một chút so với ở đây bởi gì nó sẽ extend ListAdapter:

```kotlin
abstract class DataBindingAdapter<T>(diffCallback: DiffUtil.ItemCallback<T>) :
    ListAdapter<T, DataBindingViewHolder<T>>(diffCallback) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DataBindingViewHolder<T> {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = DataBindingUtil.inflate<ViewDataBinding>(layoutInflater, viewType, parent, false)
        return DataBindingViewHolder(binding)
    }

    override fun onBindViewHolder(holder: DataBindingViewHolder<T>, position: Int) = holder.bind(getItem(position))
}
```

Đó là nó một class siêu đơn giản- thậm chí đơn giản hơn ban đầu, cảm ơn ListAdapter. Có một điều quan trọng maf chungs ta thực hiện ở đó: layout id được sử dụng bởi Adapter để inflate layout như là viewType, do đó bất kỳ một Adapter con nào sẽ cần ghi đè getItemViewType() để thể hiện item nên inflated. Giả định này là một good practice khác, thậm chí còn được củng cố trong tài liệu

Bây giờ hãy nói chúng ta muốn show một list các quyển sách. Với 2 class chúng ta vừa viết hãy xem BooksAdapter sẽ trông như thế nào
```kotlin
class BooksAdapter : DataBindingAdapter<Book>(DiffCallback()) {

    class DiffCallback : DiffUtil.ItemCallback<Book>() {
        // your DiffCallback implementation
    }

    override fun getItemViewType(position: Int) = R.layout.item_book
}
```
Cảm ơn base class của chúng ta, điều duy nhất chúng ta sẽ cần làm là quan tâm về khi nào tạo một adapter và viết DiffUtil.ItemCallback yêu cầu bởi ListAdapter và chỉ ra layout id chúng ta muốn inflate thông qua gẻItemViewType. Tất nhiên chúng ta cũng cần đặc biệt chú ý trong layout file của chúng ta:

```

<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">

    <data>
        <variable name="item" type="com.example.model.Book" />
    </data>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{item.title}" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{item.authors}" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{item.publishedDate}" />

    </LinearLayout>

</layout>
```
Điều quan trọng ở đây là variable name phải phù hợp với name mà chúng ta sử dụng trong DatabindingViewHolder- trong trwowngfhowpj này là item. Phần còn lại đơn và là những đoạn mã cơ bản của Data Binding
## Điều gì về Adapter vơi ViewHolder khác nhau
Hay lắm, tối rất vui vì bạn đã hỏi. Thông thường, điều duy nhất chúng ta phải thay đổi là cách chúng a thực thi getItemViewType trong Adapter, nhưng thông thường DiffUtils.ItemCallback cũng phải thay đổi cùng

Hãy nói list book cùa chúng ta có 2 section, sẽ tự nhiên được thể hiện bằng một số layout hoàn toàn khác nhau. Chúng ta chắc chăn rằng Book model của chúng ta và Section mới model của chúng ta chia sẻ interface, hãy nói Listable, chỉ vì chúng ta có thể có chúng trong cùng một list. 

BookAdapter sẽ trông như thế này

```kotlin
class BooksAdapter : DataBindingAdapter<Listable>(DiffCallback()) {

    class DiffCallback : DiffUtil.ItemCallback<Listable>() {
        // your DiffCallback implementation
    }

    override fun getItemViewType(position: Int) = if (getItem(position) is Book) {
        R.layout.item_book
    } else {
        R.layout.item_section
    }
}
```

Và không có gì đặc biệt khi bạn sử dụng adapter này trong một Activity như ví dụ
```kotlin
recyclerView.adapter = BooksAdapter()
viewModel.books().observe(this, Observer {
    it?.let(adapter::submitList)
})
```

Điều tôi thích nhất là tất cả mọi thứ đều được thiết lập, việc tạo một Adapter khác dễ dàng như viết cách phân biệt các item trong list (vì vậy ListAdapter có thể thực hiện các công việc của nó) và layout chúng ta muốn inflate. Đó là bằng chứng boilerplate và nó cẩm thấy như chúng ta chỉ viết mã thực sự quan trọng.

# Kết
Qua bài viết này chúng ta đã cùng nhau xây dựng một adapter rất dễ đọc và ngắn gọn cho RecyclerView. Cảm ơn các bạn đã theo dõi.

# Tham khảo
Bài viết có tham khảo từ nguồn:
https://proandroiddev.com/android-data-binding-listadapter-9e72ce50e8c7