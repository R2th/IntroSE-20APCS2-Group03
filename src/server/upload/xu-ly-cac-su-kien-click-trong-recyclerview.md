Khi hiển thị danh sách dữ liệu bằng `RecyclerView`, bạn có thể muốn có phản hồi khi một mục được click vào. Phản hồi này có thể mở ra một trang mới với nhiều dữ liệu hơn, hiển thị một toast, xóa một mục, v.v. Khả năng là vô tận nhưng tất cả đều được thực hiện bằng cách sử dụng `onClickListener()`.

### Định nghĩa hành động click

Trước khi tạo listener, hãy tạo một hàm trong lớp Activity thực hiện hành động sẽ được gọi khi click.

```
<!-- Copyright 2019 Google LLC. 
   SPDX-License-Identifier: Apache-2.0 -->

private fun adapterOnClick(flower: Flower) {
   val intent = Intent(this, FlowerDetailActivity()::class.java)
   intent.putExtra(FLOWER_ID, flower.id)
   this.startActivity(intent)
}
```

Tiếp theo, cập nhật hàm constructor của Adapter để sử dụng hàm onClick().

```
<!-- Copyright 2019 Google LLC. 
   SPDX-License-Identifier: Apache-2.0 -->

class FlowersAdapter(private val onClick: (Flower) -> Unit) :
  ListAdapter<Flower, RecyclerView.ViewHolder>(FlowerDiffCallback())
```

Trong lớp Activity, truyền vào hàm mới tạo khi bạn khởi tạo Adapter.

```
<!-- Copyright 2019 Google LLC. 
   SPDX-License-Identifier: Apache-2.0 -->

val flowersAdapter = FlowersAdapter { flower ->
  adapterOnClick(flower)
}
```

### Thêm onClickHandler()

Bây giờ hành động đã được xác định, đã đến lúc gắn nó vào ViewHolder trong Adapter.

Cập nhật ViewHolder để nhận onClick() làm tham số.

```
<!-- Copyright 2019 Google LLC. 
   SPDX-License-Identifier: Apache-2.0 -->

class FlowerViewHolder(itemView: View, val onClick: (Flower) -> Unit) :
  RecyclerView.ViewHolder(itemView)
```

Trong trình khởi tạo, hãy đặt `onClickListener{} `cho itemView.

```
<!-- Copyright 2019 Google LLC. 
   SPDX-License-Identifier: Apache-2.0 -->

init {
  itemView.setOnClickListener {
    onClick(it)
  }
}
```

Như vậy, RecyclerView của bạn hiện đã phản hồi nên bây giờ bạn có thể click vào!

Nếu bạn muốn tìm hiểu thêm về onClick (), hãy xem [tài liệu](https://developer.android.com/reference/android/view/View.OnClickListener).

Ref: https://medium.com/androiddevelopers/for-my-next-trick-i-will-write-about-onclick-45e0a6881c8a