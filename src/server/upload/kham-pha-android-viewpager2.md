![](https://images.viblo.asia/9c515104-aee4-4923-b138-5c70954a3374.png)
# Giới thiệu
Xin chào các bạn, hôm nay mình sẽ viết một chút về ViewPager2. Đối với các bạn Android developer, chắc chắn không còn xa lạ với gì với kiến thức về ViewPager nữa nhỉ?

Lược lại một chút thì, ViewPager là một widget của Android giúp bạn có thể thay đổi màn hình màn hình mà không cần phải thay đổi Activity hay Fragment. Bạn có thể swipe left hoặc right để di chuyển giữa các màn hình của ViewPager, hoặc có thể dùng một sự kiện nào đó (VD onClickListener chẳng hạn) để thực hiện việc di chuyển này.

Nhưng còn ViewPager2 thì sao, có gì hot?

# ViewPager2
Được ra mắt bởi Google vào ngày 07 tháng 02 năm 2019, nó được biết đến là một bản nâng cấp của ViewPager. Nó cũng có các chức năng tương tự như ViewPager nhưng được đánh giá thông minh hơn và hoạt động hiệu quả hơn so với người tiền nhiệm.

Ngoài ra, ViewPager2 cũng mang đến những tính năng mới, và một trong những tính năng quan trọng nhất của ViewPager2 chính là sử dụng RecyclerView. Tại sao mình lại nói đây là một trong những tính năng quan trọng nhất, vì đối với ViewPager, việc add các Fragment vào một cách dynamically là rất khó khăn. Vì vậy với việc sử dụng RecyclerView trong ViewPager2 này sẽ giúp ích bạn rất nhiều, lượng công việc của bạn sẽ được giảm xuống đáng kể :D

# ViewPager vs ViewPager2
Bây giờ, hãy thử xem giữa 2 thứ này có những điểm khác biệt gì?

- Bạn có thể thêm các item một cách dynamically với sự trợ giúp của recycler view trong ViewPager2. Với ViewPager, không có sự hỗ trợ của Recycler View.
- Ở ViewPager, không hỗ trợ layout từ phải sang trái (màn hình), bạn chỉ đang quay trở lại bản thân page bạn vừa vuốt qua mà thôi. Với ViewPager2, sẽ hỗ trợ layout từ phải qua trái.
- Ở ViewPager, bạn chỉ có thể swipe theo chiều ngang, không hỗ trợ swipe dọc. Muốn điều đó, hãy sử dụng ViewPager 2, dọc ngang đều được

# Hiểu sâu hơn về ViewPager2
Nào giờ nếu bạn đã có hứng thú về ViewPager2, chúng ta hãy cùng tìm hiểu sâu hơn về nó. Điều này không chỉ giúp bạn tạo ra những sản phẩm tốt hơn mà nó còn giúp bạn tìm và khắc phục các bug một cách nhanh chóng và dễ dàng hơn

![](https://images.viblo.asia/b473de6e-228d-439c-959f-f723aae5c03e.jpg)

Giống như ViewPager, ViewPager2 extends từ ViewGroup. Còn đoạn sau nó hơi khác một chút

## LayoutManager
Cũng giống như ViewPager, nhiệm vụ của LayoutManager trong ViewPager2 là định nghĩa chiều cho các components trong màn hình.

Như đã nói ở trên, ViewPager2 hỗ trợ Vertical orientation. Các bạn có thể định nghĩa chiều Ngang hoặc Dọc thông qua function ***setOrientation()***.

## RecyclerView
ViewPager2 sử dụng RecyclerView để hiển thị các layout content. Có rất nhiều lợi ích khi sử dụng Recycler view. Scroll mượt mà hơn, việc thay đổi dữ liệu và update view trôi chảy linh hoạt hơn. 

## Page Change Callback
Sự kiện Page Change được xử lý bằng các callback sau:
- onPageScrolled() — được triggered, khi scroll đến trang hiện tại
- onPageSelected() — được triggered khi bạn lựa chọn một trang mới
- onPageScrollStateChanged() — được triggered khi trạng thái scroll được thay đổi.

# Implement
Bây giờ, mình sẽ đi vào việc làm sao để implement ViewPager2 vào project nhé :D

Thêm dependency vào ***build.gradle*** file:
```
implementation "androidx.viewpager2:viewpager2:1.0.0-alpha04"
```
 Tiếp theo, thêm widget ViewPager2 vào file .xml của bạn
 ```
 <?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

    <androidx.viewpager2.widget.ViewPager2
            android:id="@+id/view_pager2"
            android:layout_width="match_parent"
            android:layout_height="match_parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
 ```
 
 Từ đây mọi thứ sẽ tương tự như RecyclerView. Tạo một file item ***itempage.xml***
 ```
 <?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
                                                   xmlns:app="http://schemas.android.com/apk/res-auto" xmlns:tools="http://schemas.android.com/tools"
                android:id="@+id/container"
                android:layout_width="match_parent"
                android:layout_height="match_parent">

    <androidx.appcompat.widget.AppCompatTextView
            android:id="@+id/tvTitle"
            android:textColor="#FFFFFF"
            android:layout_width="wrap_content"
            tools:text="Topic"
            android:textSize="32sp"
            android:layout_height="wrap_content"
            app:layout_constraintBottom_toBottomOf="@id/ivImage"
            android:layout_margin="32dp"
            android:gravity="center_horizontal" android:layout_marginEnd="8dp"
            app:layout_constraintEnd_toEndOf="parent" android:layout_marginStart="8dp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/ivImage"/>

    <TextView
            android:id="@+id/tvAbout"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="24sp"
            android:text="About Topic"
            android:layout_margin="16dp"
            android:textColor="#FFFFFF"
            android:layout_marginTop="8dp"
            app:layout_constraintTop_toBottomOf="@+id/tvTitle" android:layout_marginEnd="8dp"
            app:layout_constraintEnd_toEndOf="parent" android:layout_marginStart="8dp"
            app:layout_constraintStart_toStartOf="parent"/>

    <ImageView
            android:id="@+id/ivImage"
            android:layout_width="200dp"
            android:layout_height="200dp" app:layout_constraintEnd_toEndOf="parent" android:layout_marginEnd="8dp"
            app:layout_constraintStart_toStartOf="parent" android:layout_marginStart="8dp"
            android:layout_marginTop="8dp" app:layout_constraintTop_toTopOf="parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
 ```
 
 Như vậy chúng ta đã xong phần layout. Tương tự như RecyclerView, ViewPager2 cũng cần Adapter. 
 
```
class ViewPagerAdapter : RecyclerView.Adapter<PagerVH>() {

    //array of colors to change the background color of screen
    private val colors = intArrayOf(
        android.R.color.black,
        android.R.color.holo_red_light,
        android.R.color.holo_blue_dark,
        android.R.color.holo_purple
    )

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PagerVH =
        PagerVH(LayoutInflater.from(parent.context).inflate(R.layout.item_page, parent, false))

    //get the size of color array
    override fun getItemCount(): Int = Int.MAX_VALUE

    //binding the screen with view
    override fun onBindViewHolder(holder: PagerVH, position: Int) = holder.itemView.run {
        if(position == 0){
            tvTitle.text = "ViewPager2"
            tvAbout.text = "In this application we will learn about ViewPager2"
            ivImage.setImageResource(R.drawable.face_image)
            container.setBackgroundResource(colors[position])
        }
        if(position == 1) {
            tvTitle.text = "ViewPager2"
            tvAbout.text = "In this application we will learn about ViewPager2"
            ivImage.setImageResource(R.drawable.face_image)
            container.setBackgroundResource(colors[position])
        }
        if(position == 2) {
            tvTitle.text = "ViewPager2"
            tvAbout.text = "In this application we will learn about ViewPager2"
            ivImage.setImageResource(R.drawable.face_image)
            container.setBackgroundResource(colors[position])
        }
        if(position == 3) {
            tvTitle.text = "ViewPager2"
            tvAbout.text = "In this application we will learn about ViewPager2"
            ivImage.setImageResource(R.drawable.face_image)
            container.setBackgroundResource(colors[position])
        }
    }
}

class PagerVH(itemView: View) : RecyclerView.ViewHolder(itemView)
```

Vậy là chúng ta đã xong phần layout và Adapter. Bây giờ ghép Adapter lại nhé :D

```
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        view_pager2.adapter = ViewPagerAdapter()

        //below line can be used to change the orientation to vertical i.e. vertical swipe
        //view_pager2.orientation = ViewPager2.ORIENTATION_VERTICAL
    }
}
```

Xong, hãy thử run code và thưởng thức về ViewPager2 nhé

# Tổng kết
Cảm ơn các bạn đã đọc đến tận đây, chúc các bạn có thể áp dụng ViewPager2 vào dự án của bản thân nhé :D 

Happy Coding

Nguồn tham khảo: https://blog.mindorks.com/exploring-android-view-pager2-in-android