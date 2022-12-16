ListAdapter là một class mới trong support library 27.1.0 và đơn giản hóa code cần thiết để làm việc với RecyclerView. Và kết quả màn bạn nhật được là bạn cần viết ít code hơn và recyclerview animation hoạt động tốt hơn. Quá dữ phải không nào?

Không chỉ thế nó tuyệt vời bởi vì nó tự động lưu trữ list item trước và sử dụng DiffUtil  để chỉ update những items trong recycler mà có sự thay đổi. Điều này cho hiệu năng tốt hơn vì bạn tránh refreshing toàn bộ list, và có những animation tốt  bởi vì chỉ những item thay đổi cần vẽ lại.

Giả sử rằng class dưới đây dược sử dụng làm model cho ví dụ của tôi. Ở đây class này sử dụng Room Database nhưng điều này là không bắt buộc..
```kotlin
@Entity
data class Task(@PrimaryKey(autoGenerate = true) var id: Int = 0,
                var title: String = "",
                var completed: Boolean = false)
```
# Cách sử dụng adapter cũ
Để hiển thị một list các task trên một recyclerview, trước đây bạn đã viết adapter kế thừa từ RecyclerView.Adapter<ViewHolde> và nó có thể trông thế này:
```kotlin
class TaskListAdapter : RecyclerView.Adapter<ViewHolder>() {

    private val tasks: MutableList<Task> = ArrayList()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return ViewHolder(inflater.inflate(R.layout.item_task_row, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(tasks[position])
    }

    override fun getItemCount(): Int = tasks.size

    fun addTask(task: Task) {
        if (!tasks.contains(task)) {
            tasks.add(task)
            notifyItemInserted(tasks.size)
        }
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bind(task: Task) {
            itemView.taskTitle.text = task.title
        }

    }
}
```

Vấn đề lớn nhất trong đoạn code này là nó chỉ xử lý việc thêm một Task mới và không xử lý việc xóa hoặc sử một Task. Nếu chúng ta muốn dễ dàng xử lý những trường hợp này, chúng ta có thể sử dụng notifyDataSetChanged() nhưng chúng ta sẽ đánh mất những animation đẹp. Để xử lý chúng đúng, chúng ta cần làm nhiều việc hơn một chút đó là sử dụng DIfUtil.

## DiffUtils

Khi sử dụng Adapter chúng ta không cần triển khai đầy đủ DiffUtil nhưng như thế là đủ để  giải quyết những vấn đề ở trên.

ListAdapter xây dựng dựa trên DiffUtil nghĩa là nó giúp bạn xử lý một vài diffing logic. Nếu bạn chưa từng biết về DiffUtils thì nó được tạo ra để khuyến khích developer cho phép RecyclerView chỉ update nội dung thay đổi, dẫn đến hiệu suất tốt hơn khi những item được inserted, updated hoặc deleted.

Nếu bạn vẫn sử dụng notifyDataSetChange() sau đó toàn bộ list sẽ bị vẽ lại và vì thế  nó không cho phép Android hiển thị một cái gì đó trực quan về sự thay đổi. Thay vì reloading toàn bộ list, bạn có thể sử dụng phương thức như notifyItemInserted notifyItemChanged và notifyItemRemoved. Sử dụng cách này sẽ giúp chúng ta giải quyết vấn đề của việc vẽ lại toàn bộ list nhưng thực sự mà nói, sử dụng chúng một cách thủ công thì không hề nhẹ nhàng.

DiffUtils giúp bạn tính toán những phương thức inserted/changed/remove cái nào được gọi

DiffUtil khá là hoàn hảo nhưng nó vẫn cần bạn thêm một vài đoạn code để sử dụng.

## Adapter- Cách mới

Để sử dụng ListAdapter mới chúng ta update adapter đã tồn tại để nó kế thường ListAdapter và truyên vào kiểu của Item sẽ show, trong trường hợp này là Task- cũng như  ViewHolder.

Chúng ta không còn cần giữ tham chiếu của một list item vì ListAdapter làm điều này cho bạn. Bất cứ khi nào bạn cần item list, bạn có thể gọi getItem(int)

## DiffUtil.ItemCallback

Trong hàm khởi tạo, bạn cần cung cấp DiffUtil.ItemCallback đây là phiên bản rút gọi của  callback DiffUtil.

```kotlin
class TaskDiffCallback : DiffUtil.ItemCallback<Task>() {
    override fun areItemsTheSame(oldItem: Task?, newItem: Task?): Boolean {
        return oldItem?.id == newItem?.id
    }

    override fun areContentsTheSame(oldItem: Task?, newItem: Task?): Boolean {
        return oldItem == newItem
    }
}
```

DiffUtil.ItemCallBack yêu cầu bạn implment 2 function areItemsTheSame và areContentsTheSame

### areItemTheSame
areItemsTheSame đưa cho bạn 2 item và hỏi bạn xem chúng có đại diện cho cùng một đối tượng không. Trong trường hợp của tôi, tôi có ID duy nhất tôi sử dụng nó để so sánh. Nếu IDs phù hợp, sau đó tôi biết những items này giống nhau ngay cả khi có một số trường khác nhau.
### areContentsTheSame
areContenTheSame lại cho bạn 2 item. Lần này, nó hỏi bạn xem 2 item này có cùng nội dung không. Nếu bạn quyết định những item của bạn có nội dung giống nhau, sau đó nó không vẽ lại và không có animation xảy ra.
Tuy nhiên, nếu bạn quyết định nội dung không giống nha thì item sẽ được vẽ lại trên màn hình

## Shiny New Adapter

Thực sự thì chúng không quá khác biệt so với Adapter mới. Chúng ta có một lớp cha mới, Chúng ta đã xóa list các item mà chúng ta lưu trữ từ trường và chúng ta cũng bỏ qua việc thực hiểu phương thức addTask một cách thủ công mà chúng ta đã làm trước kia. Trong constructer, chúng ta truyền một thể hiệu của DiffUtils.ItemCallBack
```kotlin
class TaskListAdapter(private val clickListener: (Task) -> Unit) :
    ListAdapter<Task, ViewHolder>(TaskDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return ViewHolder(inflater.inflate(R.layout.item_task_row, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getItem(position), clickListener)
    }
        
    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bind(task: Task, clickListener: (Task) -> Unit) {
            itemView.taskTitle.text = task.title
            itemView.setOnClickListener { clickListener(task) }
        }
    }
}
```

## Updating apdater
Bất cứ khi nào bạn cần update adapter, bạn có thể cung cấp một list item mới để nó sử dụng submitList(List) method.
Chúng ta không bắt buộc phải sử dụng cùng với Room hoặc LiveData và miễn là bạn có thể update được list tức là bạn có thể sử dụng ListAdapter
``` kotlin
taskDao.getAll().observe(this, Observer<List<Task>> {
    taskListAdapter.submitList(it)
})
```

Nhưng nó chắc chắn sẽ tốt hơn khi bạn sử dụng Room và LiveData. Bất cứ khi nào thông báo thay đổi, chỉ cần submit thẳng adapter và nó sẽ lo phần còn lại.

# Tóm lược

RecyclerView tốt. Nhưng nó tốt hơn khi animation được hiển thị vì nội dung thay đổi. Bạn có thể ăn gian và cập nhật lại toàn bộ danh sách nếu như có gì đó thay đổi nhưng điều này là không cần thiết. Bạn có thể đạt được mục địch với một hiệu suất tốt hơn và  những animation của bạn tốt hơn với một ít code.

Hoặc bạn có thể sử dụng ListAdapter. Mục đích cuối cùng là ít code, nhiều animation và làm người dùng cảm thấy thích thú hơn :D