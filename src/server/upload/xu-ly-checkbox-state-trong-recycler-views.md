![](https://images.viblo.asia/bf3dfe9b-a5ad-4135-a9c4-daf9a3013629.gif)

Ở bài viết này, chúng ta sẽ xử lý trạng thái của checkbox trong RecyclerView. Như hình ảnh gif ở trên, khi chúng ta scroll recyclerview thì các checkbox của các Viewholder sẽ bị `reset state` và unchecked. Chúng ta sẽ tìm hiểu hướng giải quyết qua ví dụ sau.

## Code...
Đầu tiên chúng ta cần tạo một layout chứa RecyclerView với các item có chứa checkbox như sau:
![](https://images.viblo.asia/96395cbe-6d12-405d-8d37-d7777b57de56.png)

* **activity_main.xml**
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.cardview.widget.CardView
        android:id="@+id/cardView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        app:cardElevation="2dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <androidx.appcompat.widget.AppCompatCheckBox
            android:id="@+id/checkboxSelectAll"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:paddingBottom="16dp"
            android:paddingTop="16dp"
            android:text="Select all users"
            android:textColor="@color/colorPrimary" />
    </androidx.cardview.widget.CardView>

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerViewUser"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        android:overScrollMode="never"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/cardView" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
Ở đây chúng ta có thêm một checkbox để check tất cả các item trong RecyclerView

* **User.kt**
```
data class User(
    val name: String = "",
    val email: String = ""
)
```

* **UserAdapter.kt**
```
class UserAdapter : Adapter<ItemHolder>() {
    private val users = mutableListOf<User>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemHolder {
        return ItemHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_user, parent, false), checkedList
        )
    }

    override fun getItemCount() = users.size

    override fun onBindViewHolder(holder: ItemHolder, position: Int) {
        holder.bindData(users[position])
    }

    fun setData(users: MutableList<User>) {
        updateData(users, DiffUtil.calculateDiff(UserDiffCallback(this.users, users)))
    }

    private fun updateData(data: MutableList<User>, diffResult: DiffResult) {
        Handler().post {
            users.clear()
            users.addAll(data)
            diffResult.dispatchUpdatesTo(this)
        }
    }

    companion object {
        class ItemHolder(
            itemView: View,
            private val checkedList: SparseBooleanArray
        ) : ViewHolder(itemView) {

            fun bindData(user: User) {
                itemView.textViewName.text = user.name
                itemView.textViewEmail.text = user.email
            }
        }
    }
}
```

* **UserDiffCallback.kt**
```
class UserDiffCallback(
    private val oldList: MutableList<User>,
    private val newList: MutableList<User>
) : DiffUtil.Callback() {

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return oldList[oldItemPosition].name == newList[newItemPosition].name
                && oldList[oldItemPosition].email == newList[newItemPosition].name
    }

    override fun getOldListSize() = oldList.size

    override fun getNewListSize() = newList.size

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return oldList[oldItemPosition].name == newList[newItemPosition].name
                && oldList[oldItemPosition].email == newList[newItemPosition].name
    }
}
```

Sau khi chạy ứng dụng, chúng ta sẽ thấy được vấn đề đã nêu ở trên đó là các checkbox sẽ bị unchecked khi chúng ta scroll. Vậy giải quyết như thế nào?

## Handling checkbox state...
Để giải quyết vấn đề trên, chúng ta cần phải lưu lại trạng thái của từng checkbox trong Viewholder. Để thực hiện điều đó, chúng ta có thể tạo thêm một thuộc tính vào model `User` như sau:
```
data class User(
    val name: String = "",
    val email: String = "",
    var isChecked: Boolean = false
)
```
hoặc chúng ta sẽ lưu trạng thái vào một mảng `SparseBooleanArray` như sau:
```
class UserAdapter : Adapter<ItemHolder>() {
    private val checkedList = SparseBooleanArray()
   
   ...

    companion object {
        class ItemHolder(
            itemView: View,
            private val checkedList: SparseBooleanArray
        ) : ViewHolder(itemView) {

            init {
                itemView.checkBoxUser.setOnCheckedChangeListener { _, isChecked ->
                    checkedList.put(adapterPosition, isChecked)
                }
            }

            fun bindData(user: User) {
                itemView.textViewName.text = user.name
                itemView.textViewEmail.text = user.email
                itemView.checkBoxUser.isChecked = checkedList.get(adapterPosition)
            }
        }
    }
}
```
Và đây là kết quả:
![](https://images.viblo.asia/3992eb6a-faa9-46a4-881a-69151d5f50c9.gif)

## Select all users
Tiếp tục, chúng ta sẽ xử lý làm thế nào để check hoặc uncheck tất cả các checkbox trong RecyclerView. Để làm được như vậy, chúng ta cần Adapter phải update lại danh sách dữ liệu cùng với dánh sách checkedList.

* **UserAdapter.kt**
```
class UserAdapter : Adapter<ItemHolder>() {
    private val checkedList = SparseBooleanArray()

    ...

    fun handleSelectAll(isChecked: Boolean) {
        val data = users.toMutableList()
        val oldCheckedList = checkedList.clone()
        val newCheckedList = SparseBooleanArray()
        (0 until users.size).forEach { newCheckedList.put(it, isChecked) }
        checkedList.clear()
        checkedList.putAll(newCheckedList)
        updateData(data, DiffUtil.calculateDiff(UserDiffCallback(users, data, oldCheckedList, newCheckedList)))
    }

    ...
}
```

* **UserDiffCallback.kt**
```
class UserDiffCallback(
    private val oldList: MutableList<User>,
    private val newList: MutableList<User>,
    private val oldCheckedList: SparseBooleanArray? = null,
    private val newCheckedList: SparseBooleanArray? = null
) : DiffUtil.Callback() {

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return oldList[oldItemPosition].name == newList[newItemPosition].name
                && oldList[oldItemPosition].email == newList[newItemPosition].name
                && oldCheckedList?.get(oldItemPosition) == newCheckedList?.get(newItemPosition)
    }

    override fun getOldListSize() = oldList.size

    override fun getNewListSize() = newList.size

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return oldList[oldItemPosition].name == newList[newItemPosition].name
                && oldList[oldItemPosition].email == newList[newItemPosition].name
    }
}
```

* **MainActivity.kt**
```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    userAdapter = UserAdapter()
    userAdapter.setData(getUserData())
    recyclerViewUser.adapter = userAdapter
    recyclerViewUser.itemAnimator = null
    checkboxSelectAll.setOnCheckedChangeListener { _, isChecked ->
        state = recyclerViewUser.layoutManager?.onSaveInstanceState()
        userAdapter.handleSelectAll(isChecked)
    }

    userAdapter.registerAdapterDataObserver(object : RecyclerView.AdapterDataObserver() {
        override fun onItemRangeInserted(positionStart: Int, itemCount: Int) {
            super.onItemRangeInserted(positionStart, itemCount)
            recyclerViewUser.layoutManager?.onRestoreInstanceState(state)
        }
    })
}
```
Ở đây chúng ta cần lưu state của RecyclerView khi `Adapter` update dữ liệu. Lý do cho điều này là vì khi adapter update thì recyclerview sẽ bị scroll lến top.

**Kết quả ứng dụng:**
![](https://images.viblo.asia/e7f015c4-3af9-46d9-b66a-912db6906d7a.gif)