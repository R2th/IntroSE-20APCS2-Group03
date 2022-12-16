Hiện nay, hầu hết chúng ta đã tiếp cận và sử dụng **ConstraintLayout**. Bộ layout đặc biệt này đã được Google giới thiệu tại Google I/O 2016 cho phép xây dựng cấu trúc giao diện đơn giản, tiện lợi, tránh các view lồng nhau. Cũng tại thời điểm này bên cạnh **Constraint**, **FlexboxLayout** cũng đã được ra mắt nhằm mang đến tính năng tương tự **CSS Flexible Layout module** trong phát triển web đến với Android.

![](https://images.viblo.asia/86518676-f461-4f41-a46e-f4bd7a965537.png)

Về bản chất, ta có thể coi Flexbox như là 1 dạng layout cải tiến của LinearLayout. Bởi những gì chúng ta nghiên cứu sau đây sẽ thấy có nhiều điểm chung giữa hai loại layout này. Tuy nhiên chắc chắn vẫn phải có sự khác biệt, khiến Flexbox trở nên mạnh mẽ và ưu việt hơn ở trong các trường hợp cụ thể.

# Giới thiệu
![](https://images.viblo.asia/a7574b61-2931-4d5f-a450-45637927e572.png)
Như mình đã đề cập ở trên, Flexbox cũng tương tự như 1 LinearLayout cải tiến. Thứ nhất, về nguyên tắc sắp xếp view, nó cũng giống Linear khi sắp xếp theo tuần tự.

```scala
app:flexDirection="row"
```

Thuộc tính direction cho phép chỉ ra hướng sắp xếp của view. Ta có sắp xếp theo hàng, côt,.. tương tự như theo chiều dọc và ngang của Linear.
```python
row
row_reverse
column
column_reverse
```

# Ưu điểm
Nếu chỉ có như vậy thì Flexbox chẳng khác gì Linear. Tuy nhiên, nó sẽ có 1 tính năng đặc biệt như sau: 
![](https://images.viblo.asia/5ba4a251-42e1-4ae4-895a-2b59c4736dc0.png)

HÌnh vẽ trên thể hiện cho sắp xếp view theo row trong Flexbox. Điều đặc biệt, khi số lượng item vượt quá khả năng hiển thị của device, nó có thể tự động xuống dòng. Chúng ta sẽ dùng thuộc tính sau: 
```scala
app:flexWrap="wrap"
```

Điều này mang lại ý nghĩa như thế nào ?

-> **Chỉ cần 1 layout duy nhất cho nhiều size màn hình khác nhau**.
Flexbox sẽ tự động nhận biết được kích thước màn hình của device và sẽ điều chỉnh các view con trong nó tương ứng. Chúng ta không cần phải design nhiều Ui cho các size màn hình khác nhau ( sw600dp, sw1024, ...) cũng như là ui cho portrait hay landscape.

![](https://images.viblo.asia/2f3bea6c-154e-4476-89a4-1b1196f99e97.png)
Layout portrait

![](https://images.viblo.asia/119d91a6-a03f-4cbd-a3f2-e1e6bd1da6a4.png)

Layout landscape

# Một số thuộc tính cơ bản
* **flexDirection**: định hướng sắp xếp cho view (đã giới thiệu ở trên)
*  **flexWrap**: 

    "wrap": cho phép view tự động xuống dòng khi không còn đủ khoảng trống để hiển thị

    "nowrap" hoặc mặc định: view sẽ bị xếp chồng theo row hoặc column (có thể bị ẩn mất view)

*  **justifyContent**: căn chỉnh toàn bộ view so với layout - tương tự layout_gravity của Linear 

    Có các value như "center", "flex_start", "flex_end", ...
*  **layout_alignSelf**:  Mặc định trên cùng 1 dòng , size của các item luôn được lấy bằng size lớn nhất của item có trong đó. Tức là các item khác nhỏ hơn cũng sẽ bị kéo dãn ra để cho 1 line luôn đồng nhất về size, tránh viễ hiển thị các khoảng trắng. 

      Thuộc tính này có các giá trị cho phép các view có size nhỏ hơn, sẽ sắp xếp tương đối theo view có size lớn nhất. Ví dụ như căn giữa, start hay end.

      ![](https://images.viblo.asia/3c329234-b6ba-4572-96da-f1961d8c3035.png)
*  **layout_flexGrow**: tương tự layout_weight của LinearLayout
*  **layout_order**: Về bản chất các view được sắp xếp lần lượt trong layout. Do đó dù có xuống dòng hay không thì chúng vẫn tuân thủ thứ tự đó. Nếu như không định nghĩa gì, thì thứ tự của view chính là thứ tự khai báo trong xml. Và con số này bắt đầu từ vị trí pos = 0. 

    Tuy nhiên nếu dùng thuộc tính này và gán tường minh pos cho nó thì view sẽ được xuất hiện theo thứ tự mới mà không theo mặc định.

# Flexbox && RecyclerView
Chúng ta hoàn toàn có thể đặt Flexbox trong ScrollView để hoàn thành tác vụ scroll nếu lượng item lớn. Tuy nhiên điểm trừ của cách này chính là ở hiệu suất và bộ nhớ. 

Do đó, Google cũng đã hỗ trợ kết hợp Flexbox với RecyclerView nhằm đạt được mục đích tái sử dụng item.

Chúng ta sẽ có 1 layoutmanager mới là **FlexBoxLayoutmanager**

```scala
recyclerView = findViewById<androidx.recyclerview.widget.RecyclerView>(R.id.my_recycler_view).apply {

   // use a flex layout manager
   layoutManager = FlexboxLayoutManager(this@BottomNaviActivity).apply {
       flexWrap = FlexWrap.WRAP
       flexDirection = FlexDirection.ROW
   }

   // specify an viewAdapter 
   adapter = viewAdapter
}
```

Tại function bind của adapter, sẽ gán các thuộc tính cần thiết cho item view
```scala
override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
   holder.textView.text = myDataset[position]
   val lp = holder.textView.layoutParams
   if (lp is FlexboxLayoutManager.LayoutParams) {
       lp.flexGrow = 1.0f
       lp.alignSelf = AlignItems.CENTER
       }
   }
}
```

# Tổng kết
Mình đã trình bày 1 số điểm nổi bật về FlexBox layout. Có thể nói nó có nhiều ưu điểm. Tất nhiên mỗi loại layout sẽ có tác dụng riêng, và sẽ có tác dụng trong từng trường hợp khác nhau. Flexbox sẽ không thể thay thế cho các layout khác của Android, nhưng với các trường hợp cụ thể, ví dụ như layout album ảnh chẳng hạn, nó sẽ thể hiện ưu điểm vượt trội hơn. Cảm ơn các bạn đã đón đọc bài viết của mình :)