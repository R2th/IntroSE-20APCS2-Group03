# 1 Giới thiệu về DiffUtil
**RecyclerView** là một ViewGroup được giới thiệu trong *Android L (Android API 21)* được hỗ trợ trong *support-v7 version*. Với rất nhiều tính năng mới mạnh mẽ hơn người tiền nhiệm **ListView**. Một tính năng nổi bật trong đó là Notify data không chỉ có duy nhất **notifyDataSetChanged()** mà còn có thêm như **notifyItemChange()**, **notifyItemMoved()**, **notifyItemInserted()** rất tiện lợi cho ta việc xử lý khi có thay đổi ở đâu đó trên list. 

Nhưng trong một số trường hợp bạn có danh sách lớn, mà thực hiện nhiều thao tác phức tạp trên đó không dễ gì để biết phần tử nào cần thông báo cho **RecyclerView** biết mà cập nhật hiển thị cho đúng , lúc đó nếu gọi **notifyDataSetChanged()** để cho biết toàn bộ dữ liệu đã đổi thì hiệu suất hoạt động của ứng dụng thấp làm giảm trải nghiệm người dùng. Nhưng đừng lo có một lớp tiện ích tên là **DiffUtil** sẽ giúp chúng ta làm việc đó.

Đến bản 24.2.0, RecyclerView support library, v7 package cung cấp class được gọi là **DiffUtil**. Về cơ bản nó tìm điểm khác nhau giữa 2 list và cung cấp output là list cập nhật, nó được sử dụng để thông báo cập nhật cho một adapter của *RecyclerView*. 
Về cơ bản **DiffUtil** vẫn sử dụng các method của *RecyclerView.Adapter* để thông báo cho adapter cập nhật dư liệu như
- **notifyItemChange()**
- **notifyItemMoved()**
- **notifyItemInserted()**

Và sử dụng thuật toán của Eugene W. Myers để tính số cập nhật tối thiểu

## Triển khai DiffUtil

Các hàm cần lưu ý

* **getOldListSize() :** Nó trả về kích thước của danh sách cũ.

* **getNewListSize() :** Trả về kích thước của danh sách mới.

* **areItemsTheSame(int oldItemPosition, int newItemPosition) :** Kiểm tra xem các mục riêng lẻ của danh sách có giống nhau không. Điều này có thể được thực hiện thông qua việc kiểm tra id chúng 
* **areContentsTheSame(int oldItemPosition, int newItemPosition) :** Kiểm tra xem nội dung của dữ liệu danh sách có giống nhau không. Phương thức này được gọi bởi DiffUtil chỉ khi areItemsTheSametrả về true.

* **getChangePayload(int oldItemPosition, int newItemPosition) :**   Nếu areItemTheSame trả về true và areContentsTheSame trả về false, DiffUtil gọi phương thức này để trả về sự thay đổi

> UserDiffUtil.class

```
class UserDiffUtil(
    private val mOldUsers: List<User>, 
    private val mNewUsers: List<User>
) : DiffUtil.Callback() {

    override fun getOldListSize(): Int {
        return mOldUsers.size
    }

    override fun getNewListSize(): Int {
        return mNewUsers.size
    }

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return mOldUsers[oldItemPosition].id === mNewUsers[newItemPosition].id
    }

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        val oldUserName = mOldUsers[oldItemPosition].name
        val newUserName = mNewUsers[newItemPosition].name
        return oldUserName == newUserName
    }

    @Nullable
    override fun getChangePayload(oldItemPosition: Int, newItemPosition: Int): Any? {
        return super.getChangePayload(oldItemPosition, newItemPosition)
    }
}
}
```

Và triển khai trong Adapter
> UserAdapter.class

```
fun submitList(users: List<User>) {
    val diffResult = DiffUtil.calculateDiff(UserDiffUtil(mUsers, users))
    mUsers.clear()
    mUsers.addAll(users)
    diffResult.dispatchUpdatesTo(this)
}
```
# 2 Giới thiệu về ListAdapter

Từ những hiệu quả mà DiffUtil mang lại thì trong *support library 27.1.0* **ListAdapter** ra đời nó là 1 Wraper của RecyclerView.Adapter giúp cho đơn giản hóa code cần thiết để làm việc với **RecyclerView** và có thể tự động lưu trữ list Item cũ và  sử dụng **DiffUtil** để chỉ update  những items có sự thay đổi.

Nào cũng xem thử cách code bình thường chúng ta thường hay làm

Cách sử dụng Adapter cũ

-----



```
class UserAdapter(
    private val users: List<User>
): RecyclerView.Adapter<ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int)
    : ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return ViewHolder(inflater.inflate(R.layout.item_user, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(users.get(i))
    }

    override fun getItemCount(): Int = users?.let { users.size } ?: 0

    fun addUser(user: User) {
        user?.let {
            users = user
            notifyDataSetChanged()
        }
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bind(user: User) {
            itemView.textName.text = user.name
        }
    }
}
```

Còn đây là cách sử dụng Adapter mới

-----



```
class UserAdapter constructor(
        context: Context
        ) : ListAdapter<User, UserAdapter.ViewHolder>(
        AsyncDifferConfig.Builder< User >(UserDiffCallBack())
        .setBackgroundThreadExecutor(Executors.newSingleThreadExecutor())
        .build()
        ) {

private val inflater: LayoutInflater = LayoutInflater.from(context)

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView = inflater.inflate(R.layout.item_user, parent, false)
        return ViewHolder(itemView)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.onBind(getItem(position))
        }

class ViewHolder(itemView: View) :RecyclerView.ViewHolder(itemView)
{

        fun bind(user: User) {
            itemView.textName.text = user.name
            }
 
        override fun submitList(list: List<Word>?) {
        	super.submitList(ArrayList<User>(list ?: listOf()))
        	}
}

class UserDiffCallBack : DiffUtil.ItemCallback<User>() {
    override fun areItemsTheSame(oldItem: User, newItem: User): Boolean {
        return oldItem.id == newItem.id
    }

    override fun areContentsTheSame(oldItem: User, newItem: User): Boolean {
        return oldItem == newItem
    }
}
```
Bất cứ khi nào bạn cần update adapter, bạn có thể cung cấp một list item mới để nó sử dụng submitList(List) method. 
```
viewmodel.getAll().observe(this, Observer<List<User>> {
    userListAdapter.submitList(it)
})
```
# 3. Tổng kết 
Trên đây là hướng dẫn cơ bản của mình về DiffUtil và ListAdapter về cơ bản thì nó khá giống cách triển khai RecyclerView.Adapter cũ ListAdapter như là cầu nối giữa chúng tạo nên sự linh hoạt cũng như hiệu năng khi các bạn xử lý những bài toán lớn khi có sự thay đổi.

Nguồn tham khảo:

https://www.journaldev.com/20873/android-recyclerview-diffutil?fbclid=IwAR3FzotH0rtTTSUkF386DmOhWI3Ds4VY7yVp6R6o8dCdAT1IVs7vC3eSiZw

https://medium.com/@trionkidnapper/recyclerview-more-animations-with-less-code-using-support-library-listadapter-62e65126acdb?fbclid=IwAR0-vTtj2naxa_sHrnEhRMFt1M-xDljVDSvTFo7xLl5KCFaqnXlEKU3_5PY