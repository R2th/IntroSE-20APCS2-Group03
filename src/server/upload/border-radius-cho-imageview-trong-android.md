Để default thì ImageView trong android không có border radius. Nhưng đôi lức mình cần phần border sau đây mình hưỡng dẫn dừng 1 thư viện **`cardview`**
  Đầu tiên mình nhúng thư viên vào
 ` implementation 'com.android.support:cardview-v7:27.+'`
   
   Tại file layout activity_main.xml custom border ImageView
  ```
 <android.support.v7.widget.CardView
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:id="@+id/parent_layout"
        android:layout_width="match_parent"
        android:layout_height="350dp"
        android:layout_margin="10dp"
        app:cardCornerRadius="10dp">

        <ImageView
            android:id="@+id/imageView"
            android:layout_width="match_parent"
            android:layout_height="350dp"
            android:contentDescription="@string/todo"
            app:cardCornerRadius="10dp"
            android:scaleType="centerCrop" />

    </android.support.v7.widget.CardView>
```
![](https://images.viblo.asia/3bc4722f-041f-446d-a674-d46b1f8a6df4.png)
kết Qủa