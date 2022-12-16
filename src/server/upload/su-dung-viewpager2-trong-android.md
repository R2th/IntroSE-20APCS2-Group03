![](https://images.viblo.asia/4bd2d99a-b666-418d-991a-bcf7e1da6861.jpg)

Hình trên là màn hình trên ứng dụng di động Google Docs. 
Ở đây, bằng cách vuốt sang phải / trái, bốn lần, bạn sẽ hiểu ý tưởng về ứng dụng Google Docs làm gì.

Kiểu View này rất phổ biến trong hầu hết mọi ứng dụng bạn tải xuống từ Google Play. 
Bạn chỉ cần vuốt sang trái hoặc phải và bạn sẽ nắm được khái quát ứng dụng đó làm gì, có những chức năng gì.

Vâng kiểu view trên là **ViewPager**, vốn rất quen thuộc.
Còn trong bài viết này, mình sẽ giới thiệu với các bạn **ViewPager2**.

Nghe có vẻ giống như bản nâng cấp, chẳng hạn như RecyclerView và ListView vậy.
Chúng ta cùng tìm hiểu xem.

## ViewPager2

[ViewPager2](https://developer.android.com/jetpack/androidx/releases/viewpager2) được Google phát hành vào ngày 7 tháng 2 năm 2019, một phiên bản cập nhật của ViewPager. 
Nó thực hiện tương tự như ViewPager nhưng theo cách thông minh và hiệu quả hơn.

ViewPager2 xuất hiện với một loạt các tính năng mới. Nhưng tính năng quan trọng nhất là việc sử dụng RecyclerView. 

Tại sao nói đây là tính năng quan trọng nhất bởi vì với ViewPager, mọi thứ trở nên khó khăn hơn khi chúng ta cần thêm một số Fragment động. 
Bây giờ, nếu chúng ta đang sử dụng RecyclerView trong ViewPager2, một nửa nhiệm vụ của bạn đã được giảm bớt.

## Tìm hiểu sâu về ViewPager2

![](https://images.viblo.asia/89bdc96c-5bf7-4c51-bf31-f250bdb146f7.jpg)

Giống như View Pager, ViewPager2 mở rộng từ lớp ViewGroup - từ đó, mọi thứ có chút khác biệt.

## LayoutManager

LayoutManager trong ViewPager2 cũng giống như trong ViewPager. Nhiệm vụ của LayoutManager là quy định hướng của các thành phần trên màn hình.

Trong Viewpager (phiên bản cũ) chúng ta chỉ có hướng ngang ( Horizontal ), nhưng với ViewPager2, chúng ta có thể đặt hướng của màn hình thành dọc cũng bằng cách gọi hàm setOrientation(). 
Bằng cách đó, chúng ta có thể thay đổi màn hình bằng cách vuốt lên và xuống.

## RecyclerView

ViewPager2 sử dụng RecyclerView để hiển thị nội dung trên màn hình. Có rất nhiều lợi ích của việc sử dụng RecyclerView. 

Bạn có khả năng cuộn mượt mà, dữ liệu có thể được thay đổi linh hoạt một cách trôi chảy, các view được thay đổi linh hoạt và trơn tru. 
Vì vậy, bạn có thể sử dụng tất cả các thành phần của RecyclerView và áp dụng nó trong ViewPager2. 

Ví dụ, để xử lý hướng dọc :

```
view_pager2.orientation = ViewPager2.ORIENTATION_VERTICAL
```

## Page Change Callback

Các callback khi page thay đổi như sau :

**- onPageScrolled()** - sẽ được kích hoạt, bất cứ khi nào có sự kiện cuộn cho trang hiện tại

**- onPageSelected()** - sẽ được kích hoạt khi bạn chọn một trang mới

**- onPageScrollStateChanged()** - sẽ được kích hoạt khi trạng thái cuộn sẽ được thay đổi.

## Coding

- Chúng ta sẽ code một app đơn giản sử dụng ViewPager2.

Các bạn mở Android Studio. Chọn **File > New project**

- Thêm dependency sau vào **app/build.gradle** :

```
 implementation "androidx.viewpager2:viewpager2:1.0.0"
```

- Để sử dụng ViewPager2, chúng ta sẽ thêm vào layout của MainActivity như sau :

**activity_main.xml**

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

- Từ đây, quá trình xử lý sẽ giống như bạn làm việc với RecyclerView.
Chúng ta sẽ tạo mới một layout, nó sẽ hiển thị giống như trang chính :

**res/layout > item_page.xml**

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

Như vậy, chúng ta đã sử dụng 2 TextView và 1 ImageView để hiển thị các giá trị ngẫu nhiên.

OK, tạo layout cho item đã xong. Giờ chúng ta tạo adapter thôi, cũng giống như RecyclerView vậy.

Đặt tên class là **ViewPageAdapter.kt** :

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

Cuối cùng, chúng ta gọi adapter từ MainActivity như sau :

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