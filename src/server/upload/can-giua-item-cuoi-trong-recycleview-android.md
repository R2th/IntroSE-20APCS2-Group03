Xin chào các bạn hôm nay mình sẽ hướng dẫn các bạn làm sao để đạt được căn giữa item ở dòng cuối trong recyclevView như hình bên dưới, mình đã từng khá chật vật để đưa ra phương án và cũng đã nhờ support nên bây giờ mình sẽ chia sẻ lại cho các bạn cùng biết, các bạn cùng xem nha 😊

![image.png](https://images.viblo.asia/3d284dd2-e10a-416f-b03a-5d2dcdb6567f.png)

Cách đạt được item như vậy theo mình tìm hiểu sẽ có nhiều cách trong đó có 3 cách mình tổng hợp được:

+ Cách 1: Sử dụng thư viện support FlexBoxLayoutManager: mình không đánh giá cao cách này bởi vì 3 yếu tố: Thứ nhất là khi mình sử dụng FlexBoxLayoutManager thì oncreateViewHolder luôn được gọi all time, nghĩa là chúng ta sử dụng RecycleView mà giống như ListView. Mình không rõ code core chính của flexboxlayoutmanager viết như thế nào mà không sử dụng lại được ViewHolder. Thứ 2 là khi sử dụng FlexBoxLayoutManager thì bản thân mình apply vào project có một số issue như các funtion findFirstVisibleItemPosition, findLastVisibleItemPosition trả kết quả không chính xác, bạn có thể tái hiện issue bằng cách gọi recycleView.addOnScrollListener() -> và in ra để kiểm tra. Thứ 3 mặc dù là lib của google nhưng có khá nhiều issue chưa được giải quyêt và lib đã không được update khá lâu rồi.

+ Cách 2: Sử dụng GridlayoutManager,  ItemSpanSizeLookup và ItemDecoration: cách này có thể triển khai được nhưng khá phức tạp.

+ Cách 3: Sử dụng GridlayoutManager, ItemSpanSizeLookup và set gravity: cách này mình thấy đơn giản và hiệu quả nhất so với những cách ở trên vì nó sử dụng LayoutManger của android nên việc implement nó cực kì dễ hiểu. Nhảy luôn vào project thôi nào 😜

**Triển khai**

Mình sử dụng viewbinding thay thế cho findViewById để đơn giản hóa code,  để bật view binding, hãy định cấu hình viewBinding trong build.gradle ở cấp module của bạn.
```
android {
    buildFeatures {
        viewBinding true
    }
}
```

Mình tạo itemview.xml

```
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <FrameLayout
        android:id="@+id/main_item"
        android:layout_width="160dp"
        android:layout_height="180dp"
        android:layout_gravity="center"
        android:layout_margin="8dp"
        android:background="#ECECEC"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <TextView
            android:id="@+id/tv_item"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:textSize="20sp"
            tools:text="Item 1" />

    </FrameLayout>

</FrameLayout>

```
Mình tạo một FrameLayout bao main Item của mình. Ý tưởng của mình khi tạo item này là mình có thể **gravity left, right** cho **main_item** , xuống dưới mình giải thích tiếp nhé

**1>Tạo ViewHolder cho RecycleView**

```
import android.util.Size
import android.widget.FrameLayout
import androidx.recyclerview.widget.RecyclerView
import com.example.demogridlayoutmanager.databinding.ItemInRecyclerviewBinding

class ItemViewHolder(
    private val binding: ItemInRecyclerviewBinding,
    itemSize: Size
) : RecyclerView.ViewHolder(binding.root) {

    init {
        val layoutParams = binding.mainItem.layoutParams
        layoutParams.width = itemSize.width
        layoutParams.height = itemSize.height
        binding.mainItem.layoutParams = layoutParams
    }

    fun bind(text: ViewItem) {
        val layoutParams = binding.mainItem.layoutParams as FrameLayout.LayoutParams
        layoutParams.gravity = text.gravity
        binding.mainItem.layoutParams = layoutParams
        binding.tvItem.text = text.name
    }
}
```

**init{}** dùng để set layoutparams của itemView

**bind(text: ViewItem)** dùng để bind data vào itemView. Tại đây có một lệnh quan trọng là **layoutParams.gravity = text.gravity**. Lệnh này rất đơn giản nhưng nó sẽ là key chính để thực hiện layout center này

**2>Tạo Adapter cho RecycleView**

```
import android.util.Size
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import com.example.demogridlayoutmanager.databinding.ItemInRecyclerviewBinding

class ItemsAdapter(private val itemSize: Size) : ListAdapter<ViewItem, ItemViewHolder>(ITEM_DIFF) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return ItemViewHolder(
            ItemInRecyclerviewBinding.inflate(inflater, parent, false),
            itemSize = itemSize
        )
    }

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
}
```
Ở đây mình sử dụng ListAdapter để có thể notity, submitList dễ dàng, **ITEM_DIFF** là một object DiffUtils. Các bạn chưa biết về ListAdapter thì xem thêm [tại đây](https://developer.android.com/reference/androidx/recyclerview/widget/ListAdapter)

**3>Tạo Xml cho ActivityMain**

```
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rv_items"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:padding="8dp"
        app:layoutManager="androidx.recyclerview.widget.GridLayoutManager"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.498"
        app:spanCount="2"
        tools:itemCount="3"
        tools:listitem="@layout/item_in_recyclerview" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
Tại đây sẽ có một recycleView để hiển thị List Item 

**4>Viết MainActivity**

```
package com.example.demogridlayoutmanager

import android.os.Bundle
import android.util.Size
import android.view.Gravity
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import com.example.demogridlayoutmanager.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var viewBinding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(viewBinding.root)
        setupRecyclerView()
    }

    private fun setupRecyclerView() {
        val items = List(5) {
            "Item ${it + 1}"
        }
        val adapter = ItemsAdapter(getItemSize())
        val girdLayoutManager = GridLayoutManager(this, 6)
        girdLayoutManager.spanSizeLookup = ItemSpanSizeLookup(adapter)
        submitNewData(adapter, items)
        viewBinding.rvItems.setHasFixedSize(true)
        viewBinding.rvItems.layoutManager = girdLayoutManager
        viewBinding.rvItems.adapter = adapter
    }

    private fun submitNewData(
        adapter: ItemsAdapter,
        items: List<String>
    ) {
        adapter.submitList(items.mapIndexed { index, s ->
            ViewItem(
                id = index,
                name = s,
                gravity = getGravity(items.size, index)
            )
        })
    }

    private fun getGravity(size: Int, position: Int): Int {
        if (size % 3 == 0) return Gravity.CENTER
        if ((size % 3) == 2) {
            // Last item
            if (position == size - 1) return Gravity.START
            if (position == size - 2) return Gravity.END
        }
        return Gravity.CENTER
    }

    private fun getItemSize(): Size {
        val screenSize = resources.displayMetrics.widthPixels
        val itemPadding = resources.getDimensionPixelSize(R.dimen.item_padding)
        val width = (screenSize - (8 * itemPadding)) / 3
        val height = width * 1.2f // Ratio 1:1.2
        return Size(width, height.toInt())
    }
}

```

**setupRecyclerView**, tại đây ta khởi tạo adpater, set layoutManager, spanSizeLookup cho recycleView, sau đó chúng ta submitList. Các bạn có thấy func **getGravity** func này nằm trong **submitListNewData** mục đích của nó là muốn get gravity của từng item trong recycleView, như ảnh ở đầu bài chúng ta có 5 item chia làm 2 hàng, hàng đầu tiên có 3 item, hàng thứ 2 có 2 item. Tại hàng thứ 2 chúng ta muốn thấy item đầu tiên nó hiển thị bên phải -> tại item này chúng ta phải set marginEnd cho nó, tiếp theo item thứ hai chúng ta muốn hiển thị bên trái -> tại item này chúng ta phải set marginStart cho nó. 

Các bạn có thể thấy chúng ta đã set **setspanSizeLookUp** và điều này dẫn tới hàng thứ 2 nó chiếm được bố cục như vậy đó, các bạn cùng xem file custom **SpanSizeLookUp** dưới đây

```
class ItemSpanSizeLookup(private val adapter: ItemsAdapter) : GridLayoutManager.SpanSizeLookup() {
    override fun getSpanSize(position: Int): Int {
        val realSpanCount = 3
        val fullRow = adapter.itemCount / realSpanCount + 1
        if (adapter.itemCount % 3 == 0) {
            return 2
        }
        if ((position.toDouble()) / realSpanCount.toDouble() >= (fullRow - 1)) {
            if (adapter.currentList.size % 3 == 1) {
                return 6
            }
            if ((position + 1) % 3 == 1 || (position + 1) % 3 == 2) {
                return 3
            }
        }
        return 2
    }
}
```

Ý tưởng của **SpanSizeLookup** là trong một hàng tùy vào trường hợp mà chia phần trăm chiếm cho **itemView**. Trong acitivity chúng ta set spanCount = 6 có nghĩa là 1 dòng nó chia ra làm 6 phần. Ở class **ItemSpanSizeLookup** chúng ta kế thừa **GridLayoutManager.SpanSizeLookup()**  và override  **getSpanSize(position: Int)** để chỉ định số phần mà item muốn chiếm hữu. Logic trên mô tả rằng nếu đó là hàng cuối cùng: Hàng đó chứa 1 item thì item đó sẽ chiếm 6 phần; Hàng đó có 2 item thì mỗi item sẽ chiếm 3 phần; Hàng đó chứa 3 iten thì mỗi item sẽ chiếm 2 phần. Chúng ta cần định nghĩa như thế này để có thể cân đối được bố cục layout. 

![image.png](https://images.viblo.asia/09848a6b-5f30-4242-9258-3f7c8bae1154.png)

Kết hợp với set gravity chúng ta đạt được hình sau đây

![image.png](https://images.viblo.asia/d997495c-e668-42af-afc9-de3b51a67081.png)

Tới đây nhìn chung đã giải quyết thành công việc center item dòng cuối trong recycleview. Mấu chốt của việc triển khai này cần xác đinh % mà item chiếm hữu trên một hàng  và dựa vào số lượng item mà tính toán và set gravity cho nó. Các bạn có thể chỉnh sửa theo mỗi nhu cầu dự án, có thể apply nhiều trường hợp hơn ví dụ 2 hàng cuối tất cả item center, 3 hàng cuối tất cả item center,... những yêu cầu liên quan đến item center. Đối với màn hình landscape nếu các bạn cần số lượng item trên một hàng khác vơi portraint, nhưng vẫn giữ được center thì mình góp ý các bạn nên tạo ra 2 file ItemSpanSizeLookup, 1 file apply khi portraint, 1 file apply khi landscape. Nó sẽ dễ hàng hơn nếu chúng ta tạo một file và phải check if else.

Đến đây bài chia sẻ của mình đã kết thúc, các bạn có thắc mắc gì, chưa hiểu chỗ nào và cần biết thêm những gì thì các bạn bình luận cho mình biết với nha, và bài viết của mình có động vào trái tim thì cho mình 1 vote để ủng hộ tinh thần hì hì. Cảm ơn các bạn 😊

Link code: https://github.com/nambmt97s/CenterItemLastRowRecycleView