![](https://i.imgur.com/dngnrEV.gif)
# [StickyItem](https://github.com/oTranThanhNghia/StickyItem/tree/kotlin_version)
## Một số bạn sẽ thắc mắc ngay hoặc nghĩ 1 câu hỏi. Cái customview này để làm trong trường hợp nào ?

Tôi sẽ nêu 1 số trường hợp sau để các bạn có thể dễ hình dung và cũng như dễ áp dụng vào trong dự án của các bạn đang làm
1. Xếp thứ hạng rank. User mình sẽ được bám để so sánh với các User khác
2. So sánh item này với item khác
3. Hoặc bạn có thể sử dụng cho mp3 player. Dùng khi play 1 bài nhạc trong danh sách các bài
4. Và còn nhiều cách khác nữa

## Bắt đầu từ đâu ?
Thường thì giờ ít ai dùng ListView để tạo danh sách nên tôi sẽ chọn dùng RecyclerView để hiển thị. Và để tạo được `StickyItem` bạn hãy dùng [RecyclerView.ItemDecoration](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.ItemDecoration)
Để xem chi tiết hơn về `StickyItem` được tạo như thế nào bạn có thể click vào link dưới đây để xem:
1. [Kotlin Version](https://github.com/oTranThanhNghia/StickyItem/tree/kotlin_version)
2. [Java Version](https://github.com/oTranThanhNghia/StickyItem/tree/master)
## Cách sử dụng StickyItem như thế nào ?
Sau đây tôi xin demo cách sử dụng StickyItem một cách đơn giản nhất
1. Tạo Project
2. Thêm RecylerView vào Main Activity
3. Tạo ContentItem và StickyItem
4. Tạo User class
5. Tạo Adapter kế thừa từ `StickyAdapter` để bind dữ liệu lên RecyclerView
6. Kết nối RecyclerView với Adapter và `StickyDecoration`

### 1. Tạo Project
![](https://i.imgur.com/kvwkRwm.png)

![](https://i.imgur.com/2tjcZB5.png)

Và cứ thế Next thôi.
Sau đó, bạn vào link này
[StickyItem](https://github.com/oTranThanhNghia/StickyItem/tree/kotlin_version)
để tải package `vn.ngh.stickyitem` và copy vào trong project của bạn như hình dưới đây
![](https://i.imgur.com/XE0DyyN.png)
### 2. Thêm RecylerView vào Main Activity
Vào trong file activity_main.xml sau đó viết như sau
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    
    <android.support.v7.widget.RecyclerView
        android:id="@+id/listRecyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
        
</LinearLayout>
```
### 3. Tạo ContentItem và StickyItem
**Lần lượt tạo 2 file mới như sau**

![](https://i.imgur.com/VBD6sv1.png)

File thứ nhất `item_sticky.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_weight="6"
    android:background="@drawable/bg_bottom_line"
    android:orientation="horizontal"
    android:paddingBottom="@dimen/tiny_space"
    android:paddingTop="@dimen/tiny_space">

    <ImageView
        android:id="@+id/imageAvatar"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:adjustViewBounds="true"
        android:scaleType="fitCenter" />

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical"
        android:layout_marginLeft="@dimen/normal_space"
        android:layout_marginRight="@dimen/normal_space"
        android:layout_weight="5"
        android:orientation="vertical">

        <TextView
            android:id="@+id/textNameSticky"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textColor="@android:color/background_dark"
            android:textSize="@dimen/text_size_large" />

        <TextView
            android:id="@+id/textEmailSticky"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textColor="@android:color/holo_red_light"
            android:textSize="@dimen/text_size_normal"
            android:textStyle="bold|italic" />
    </LinearLayout>
</LinearLayout>
```

File thứ 2 `item_user.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_weight="6"
    android:background="@drawable/bg_bottom_line"
    android:orientation="horizontal"
    android:paddingBottom="@dimen/tiny_space"
    android:paddingTop="@dimen/tiny_space">

    <TextView
        android:id="@+id/textAvatar"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:background="@android:color/darker_gray"
        android:gravity="center"
        android:textColor="@android:color/white"
        android:textSize="20sp" />

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical"
        android:layout_marginLeft="@dimen/normal_space"
        android:layout_marginRight="@dimen/normal_space"
        android:layout_weight="5"
        android:orientation="vertical">

        <TextView
            android:id="@+id/textName"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textColor="@android:color/background_dark"
            android:textSize="@dimen/text_size_large" />

        <TextView
            android:id="@+id/textEmail"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textColor="@android:color/holo_red_light"
            android:textSize="@dimen/text_size_normal"
            android:textStyle="bold|italic" />
    </LinearLayout>
</LinearLayout>
```

Đây sẽ là template hoặc Prototype của Item RecylcerView

### 4. Tạo User class
![](https://i.imgur.com/PwaTNxX.png)

```kotlin
data class User(var name: String?, var email: String? = "", var idAvatar: Int = 0)
```
### 5. Tạo Adapter kế thừa từ `StickyAdapter` để bind dữ liệu lên RecyclerView
```
import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import kotlinx.android.synthetic.main.item_sticky.view.*
import kotlinx.android.synthetic.main.item_user.view.*

class ListUserAdapter(mContext: Context, private val mUserList: List<User>?, currentUserIndex: Int = RecyclerView.NO_POSITION) : RecyclerView.Adapter<ListUserAdapter.ContentViewHolder>(), StickyAdapter<ListUserAdapter.StickyViewHolder> {

    private var currentUserIndex = RecyclerView.NO_POSITION
    private val mInflater: LayoutInflater = LayoutInflater.from(mContext)
    private var isUpdate = true

    class ContentViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView)

    class StickyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView)

    init {
        this.currentUserIndex = currentUserIndex
        if (this.currentUserIndex == 0 && mUserList?.size == 1)
            this.currentUserIndex = RecyclerView.NO_POSITION
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ContentViewHolder {
        val view = mInflater.inflate(R.layout.item_user, parent, false)
        return ContentViewHolder(view)
    }

    override fun onBindViewHolder(holder: ContentViewHolder?, position: Int) {
        if (holder != null) {
            val stickyIndex = getStickyIndex()
            val pos = if (position >= stickyIndex && stickyIndex != RecyclerView.NO_POSITION)
                position + 1
            else
                position
            mUserList?.let {
                val user = it[pos]
                holder.itemView.textName.text = user.name
                holder.itemView.textEmail.text = user.email
                holder.itemView.textAvatar.text = position.toString()
            }
        }
    }

    override fun onCreateStickyViewHolder(parent: ViewGroup): StickyViewHolder {
        val view = mInflater.inflate(R.layout.item_sticky, parent, false)
        return StickyViewHolder(view)
    }

    override fun onBindStickyViewHolder(viewHolder: StickyViewHolder, position: Int) {
        if (currentUserIndex >= 0) {
            mUserList?.let {
                val user = it[currentUserIndex]
                viewHolder.itemView.textNameSticky.text = user.name
                viewHolder.itemView.textEmailSticky.text = user.email
                viewHolder.itemView.imageAvatar.setImageResource(user.idAvatar)
            }
        }
    }

    override fun getItemCount(): Int {
        return if (mUserList != null) {
            if (currentUserIndex >= 0 && mUserList.size > 1)
                mUserList.size - 1
            else
                mUserList.size
        } else
            0
    }

    override fun getStickyIndex(): Int {
        return currentUserIndex
    }

    override fun getDataCount(): Int {
        return itemCount
    }

    override fun getEnableUpdate(): Boolean {
        return isUpdate
    }

    override fun setEnableUpdate(enableUpdate: Boolean) {
        isUpdate = enableUpdate
    }
}
```

### 6. Kết nối RecyclerView với Adapter và `StickyDecoration`
```
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.util.Log
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    private var mAdapter: ListUserAdapter? = null
    private val mListUser = mutableListOf<User>()

    private var mStickyDecoration: StickyDecoration<ListUserAdapter.StickyViewHolder>? = null
    private var userStickyIndex = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        init()
    }

    fun init() {

        for (i in 0..100) {
            mListUser.add(User("user " + i))
        }
        val stickyUser = User("Tran Thanh Nghia", "thanhnghiaglhn92@gmail.com", R.drawable.image_nghia)
        userStickyIndex = 30
        mListUser[userStickyIndex] = stickyUser
        mAdapter = ListUserAdapter(this, mListUser, userStickyIndex)
        mAdapter?.let {
            mStickyDecoration = StickyDecoration(it)
            mStickyDecoration?.setOnPostitionListener(object : StickyDecoration.OnPositionListener {
                override fun onSticky(pos: StickyDecoration.Position) {
                    Log.i("StickyItem", "pos: " + pos.toString())
                }
            })
            val linearLayoutManager = LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
            listRecyclerView.layoutManager = linearLayoutManager
            listRecyclerView.setHasFixedSize(true)
            listRecyclerView.adapter = mAdapter
            listRecyclerView.addItemDecoration(mStickyDecoration)
        }

    }

}
```

![](https://i.imgur.com/dngnrEV.gif)

Vậy là đã xong :)

Chi tiết ví dụ và mã nguồn của StickyItem bạn hãy vào đây
https://github.com/oTranThanhNghia/StickyItem

Nếu bạn có bất kỳ thắc mắc gì xin hãy comment dưới đây hoặc gửi vào email: thanhnghiaglhn92@gmail.com nhé