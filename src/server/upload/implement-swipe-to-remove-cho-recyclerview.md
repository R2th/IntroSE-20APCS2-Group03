# Giới thiệu
Swipe-To-Remove là một hành vi phổ biến mà người dùng thực hiện khi sử dụng các ứng dụng di động. Tính năng này phù hợp với các phương án thiết kế giao diện ứng dụng hiện đại. Trong lập trình Android, có rất nhiều thư viện hỗ trợ Swipe-To-Remove, tuy vậy hôm nay mình sẽ giới thiệu đến các bạn cách đưa tính năng này vào ứng dụng mà không cần phải thêm bất kì thư viện thứ 3 nào khác.

# Thực hiện implement code
## Tạo giao diện itemView
Ta tạo giao diện item đơn giản với `ImageView` và `TextView` như sau:
```php
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/layout_habit"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="@dimen/_10sdp"
    android:gravity="center_vertical"
    android:orientation="horizontal"
    android:paddingRight="@dimen/_16sdp"
    android:paddingLeft="@dimen/_16sdp"
    android:paddingTop="@dimen/_8sdp"
    android:paddingBottom="@dimen/_8sdp">

    <ImageView
        android:id="@+id/im_icon"
        android:layout_width="@dimen/_16sdp"
        android:layout_height="@dimen/_16sdp" />

    <TextView
        android:id="@+id/tv_habit_name"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="@dimen/_16sdp"
        android:textColor="@android:color/white"
        android:textSize="@dimen/_12sdp"
        app:isItalic="true"
        app:type="light" />
</LinearLayout>
```


## Enable action swipe

Ta sẽ dựa vào class `ItemTouchHelper.SimpleCallback` để tích hợp tính năng vuốt vào các item của `RecyclerView`.

Khai báo biến `simpleItemTouchCallback` như sau:
```php
        val simpleItemTouchCallback = object : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT or ItemTouchHelper.RIGHT) {

            override fun onMove(recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder, target: RecyclerView.ViewHolder): Boolean {
                return false
            }

            override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                val position = viewHolder.adapterPosition
                if (direction == ItemTouchHelper.LEFT) {
                    mAdapter.notifyItemChanged(position)
                    Toast.makeText(requireContext(), "Swipe left", Toast.LENGTH_SHORT).show()
                } else if (direction == ItemTouchHelper.RIGHT) {
                    mAdapter.notifyItemChanged(position)
                    Toast.makeText(requireContext(), "Swipe right", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onChildDraw(c: Canvas, recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder, dX: Float, dY: Float, actionState: Int, isCurrentlyActive: Boolean) {
                if (actionState == ItemTouchHelper.ACTION_STATE_SWIPE) {
                    val itemView = viewHolder.itemView
                    val height = itemView.bottom.toFloat() - itemView.top.toFloat()
                    val width = height / 3

                    if (dX < 0) {
                        p.color = Color.RED
                        val background = RectF(itemView.right.toFloat() + dX, itemView.top.toFloat(), itemView.right.toFloat(), itemView.bottom.toFloat())
                        c.drawRect(background, p)
                        val icon = BitmapFactory.decodeResource(mContext.resources, R.drawable.ic_remove_white)
                        val margin = (dX / 5 - width) / 2
                        val iconDest = RectF(itemView.right.toFloat() + margin, itemView.top.toFloat() + width, itemView.right.toFloat() + (margin + width), itemView.bottom.toFloat() - width)
                        c.drawBitmap(icon, null, iconDest, p)
                    }
                    if (dX > 0) {
                        p.color = Color.BLUE
                        val background = RectF(itemView.left.toFloat(), itemView.top.toFloat(), itemView.left.toFloat() + dX, itemView.bottom.toFloat())
                        c.drawRect(background, p)
                        val icon = BitmapFactory.decodeResource(mContext.resources, R.drawable.ic_ticked)
                        val margin = (dX / 5 - width) / 2
                        val iconDest = RectF(margin, itemView.top.toFloat() + width, margin + width, itemView.bottom.toFloat() - width)
                        c.drawBitmap(icon, null, iconDest, p)
                    }
                } else {
                    c.drawColor(Color.TRANSPARENT, PorterDuff.Mode.CLEAR)
                }
                super.onChildDraw(c, recyclerView, viewHolder, dX / 5, dY, actionState, isCurrentlyActive)
            }
        }
```


* `ItemTouchHelper.LEFT or ItemTouchHelper.RIGHT` là hướng mà người dùng có thể vuốt item, ở trường hợp này người dùng có thể vuốt theo cả 2 chiều là **trái** và **phải**
* Hàm `onMove(...)` trả về `false` vì ta không cần kích hoạt tính năng kéo thả các item
*  Hàm `onSwiped(...)` để xử lý các sự kiện riêng biệt khi vuốt item theo các hướng khác nhau. Nếu không muốn cho item tự động quay về vị trí hiện tại sau khi thực hiện hành vi swipe, ta có thể comment dòng code `mAdapter.notifyItemChanged(position)` lại - khi đó item sẽ giữ nguyên trạng thái hiển thị sau khi vuốt để ta có thể tùy biến nhiều hơn các chức năng khác nhau với 1 cử chỉ vuốt.
*  `onChildDraw(...)` ở đây ta sử dụng `Canvas` để vẽ và hiển thị các `icon` chức năng ở các cạnh của item với background là đối tượng `Paint p` được khởi tạo với các thông số về màu sắc và kích thước. Khi người dùng thực hiện action swipe với các hướng khác nhau, các icon chức năng với hình ảnh và background khác nhau sẽ được hiển thị - điều này giúp người dùng hình dung được mình đang thực hiện thao tác cụ thể nào với item trong ứng dụng. 
*  Ngoài ra ta còn có thể thực hiện việc giới hạn khoảng cách swipe trong hàm này bằng cách chỉnh sửa lại tham số `dX` ở lần gọi đến hàm `super()` như sau:
```php
// Giới hạn khoảng cách vuốt để nhận sự kiện nhỏ nhất là 1/5 chiều dài của item
super.onChildDraw(c, recyclerView, viewHolder, dX / 5, dY, actionState, isCurrentlyActive)
```

## Attach ItemTouchHelper vào adapter của RecyclerView
Sau khi đã hoàn tất phần code cho action swipe, ta chỉ việc attach vào RecyclerView mục tiêu:
```php
val itemTouchHelper = ItemTouchHelper(simpleItemTouchCallback)
itemTouchHelper.attachToRecyclerView(myRecyclerView)
```

## Kết quả
![](https://images.viblo.asia/879a9852-9587-484f-9929-a4d67e573b54.jpg)

Một số ứng dụng khác có sử dụng tính năng swipe item:

![](https://images.viblo.asia/e01bf6c9-cbca-42ba-b7d5-80550635383e.jpg)

![](https://images.viblo.asia/b1d60c00-dc1c-4b93-8c48-08f1a2913f09.jpg)

![](https://images.viblo.asia/4dc27d17-e082-40a8-bd55-a3864b0a68e4.jpg)