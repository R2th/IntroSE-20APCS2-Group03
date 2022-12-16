Trước khi chúng ta bắt đầu, điều đáng nói là dễ dàng vượt lên trên đỉnh khi nói đến animation. Mặc dù việc tiếp tục thêm các thành phần phức tạp hơn vào animation là rất hấp dẫn, đôi khi biết khi nào nên ngừng thêm các thành phần bổ sung hoặc thậm chí loại bỏ các thành phần không phù hợp với layout tổng thể, là chìa khóa để đạt được animation tự nhiên.
![](https://i1.wp.com/blog.stylingandroid.com/wp-content/uploads/2019/07/icon.png?w=312&ssl=1)

Hơn nữa, các hình ảnh động hiệu quả nhất thường là những hình ảnh kết hợp hoạt hình thành phần khá đơn giản bổ sung cho nhau và tạo ra thứ gì đó có vẻ khó đạt được hơn nhiều so với thực tế.

Hãy bắt đầu bằng cách nhìn vào hiệu ứng tổng thể mà chúng ta sẽ đạt được. Dưới đây là một Thanh toolbar có thể xuất hiện trong một ứng dụng thể thao hiển thị thông tin về một trận bóng đá đang diễn ra:

![](https://i2.wp.com/blog.stylingandroid.com/wp-content/uploads/2019/07/animated.gif?resize=512%2C1024&ssl=1)

Mặc dù có khá nhiều thứ đang diễn ra trong hoạt hình, mọi thứ đều di chuyển cùng nhau, và do đó, hiệu ứng tổng thể cảm thấy khá trôi chảy. Khối hình chữ nhật màu xanh lá cây thực tế là Thanh toolbar không thực sự thay đổi kích thước, nhưng văn bản thời gian khớp hiện tại (89,59) di chuyển ra ngoài giới hạn của Thanh toolbar và có một hình dạng bong bóng mở rộng từ dưới cùng của Thanh toolbar để chứa nó . Đây là một phần của hoạt hình có lẽ là thú vị nhất, vì vậy phần lớn bài viết này sẽ tập trung vào đó.

Tôi sẽ không đưa ra một mô tả đầy đủ về các cơ chế của MotionLayout như bài viết trước đã trình bày về điều đó. Điều quan trọng là chúng tôi xác định một cách hiệu quả hai trạng thái tĩnh với mỗi trạng thái được biểu diễn dưới dạng Constraintset. Trạng thái mở rộng trông như thế này:

![](https://i0.wp.com/blog.stylingandroid.com/wp-content/uploads/2019/07/expanded.png?resize=512%2C1024&ssl=1)

Và trạng thái thu gọn trông như thế này:

![](https://i2.wp.com/blog.stylingandroid.com/wp-content/uploads/2019/07/collapsed.png?resize=512%2C1024&ssl=1)

Bản thân MotionLayout được khai báo như sau:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.motion.widget.MotionLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layoutDescription="@xml/collapsing_toolbar"
    tools:context=".MainActivity">
 
    <View
        android:id="@+id/toolbar"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:background="@color/colorPrimary" />
 
    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/event_name"
        android:textAppearance="@style/TextAppearance.AppCompat.Widget.ActionBar.Subtitle.Inverse" />
 
    <TextView
        android:id="@+id/score"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/score"
        android:textAppearance="@style/TextAppearance.AppCompat.Widget.ActionBar.Title.Inverse" />
 
    <ImageView
        android:id="@+id/man_city_logo"
        android:layout_width="wrap_content"
        android:layout_height="0dp"
        android:adjustViewBounds="true"
        android:contentDescription="@null"
        android:paddingStart="16dp"
        android:paddingEnd="16dp"
        android:src="@drawable/man_city" />
 
    <TextView
        android:id="@+id/man_city"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/man_city"
        android:textAppearance="@style/TextAppearance.AppCompat.Widget.ActionBar.Title.Inverse"
        app:layout_constraintBaseline_toBaselineOf="@id/score"
        app:layout_constraintEnd_toStartOf="@id/man_city_logo"/>
 
    <ImageView
        android:id="@+id/watford_logo"
        android:layout_width="wrap_content"
        android:layout_height="0dp"
        android:adjustViewBounds="true"
        android:contentDescription="@null"
        android:paddingStart="16dp"
        android:paddingEnd="16dp"
        android:src="@drawable/watford" />
 
    <TextView
        android:id="@+id/watford"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/watford"
        android:textAppearance="@style/TextAppearance.AppCompat.Widget.ActionBar.Title.Inverse"
        app:layout_constraintBaseline_toBaselineOf="@id/score"
        app:layout_constraintStart_toEndOf="@id/watford_logo"/>
 
    <View
        android:id="@+id/toolbar_extension"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:background="@drawable/bubble"
        android:backgroundTint="@color/colorPrimary"
        app:layout_constraintEnd_toEndOf="@id/time"
        app:layout_constraintStart_toStartOf="@id/time" />
 
    <TextView
        android:id="@+id/time"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingStart="24dp"
        android:paddingEnd="24dp"
        android:text="@string/time"
        android:textAppearance="@style/TextAppearance.AppCompat.Widget.ActionBar.Subtitle.Inverse" />
 
    <FrameLayout
        android:id="@+id/recyclerview"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/toolbar_extension" />
</androidx.constraintlayout.motion.widget.MotionLayout>
```

Mặc dù MotionLayout là một lớp con của ConstraintLayout, không có ràng buộc nào được khai báo trong tệp bố cục này - tất cả chúng đều được khai báo trong tệp layoutDescriptor có tên @xml/collapsing_toolbar.

Tệp này chứa MotionScene cho MotionLayout của chúng tôi:

```xml
<?xml version="1.0" encoding="utf-8"?>
<MotionScene xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <Transition
        app:constraintSetEnd="@id/collapsed"
        app:constraintSetStart="@id/expanded">

        <OnSwipe
            app:dragDirection="dragUp"
            app:touchAnchorId="@id/recyclerview"
            app:touchAnchorSide="top" />

    </Transition>

    <ConstraintSet android:id="@+id/collapsed">
        ...
    </ConstraintSet>

    <ConstraintSet android:id="@+id/expanded">
        ...
    </ConstraintSet>

</MotionScene>
```

Điều này tuyên bố các ràng buộc cho từng phần mở rộng và thu gọn trong Constraintset của chính nó và liên kết điều này sẽ là một cử chỉ kéo để kéo chuyển tiếp giữa hai trạng thái. Đối với bất kỳ ai không quen thuộc với điều này: bài viết trước đây của MotionLayout sẽ đề cập chi tiết hơn về vấn đề này.

Hầu hết các hình ảnh động mà chúng tôi áp dụng cho các chế độ xem riêng lẻ đều được nhân rộng chúng. Nếu bạn nhìn vào GIF hoạt hình trước đó cho thấy hình ảnh động trông như thế nào và tập trung vào văn bản F.A. Cup Final 2019 ở trên cùng, thì nó chỉ đơn giản là ngày càng lớn hơn và các ràng buộc trong ConstraintSets là:

```xml
<?xml version="1.0" encoding="utf-8"?>
<MotionScene xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    ...
    <ConstraintSet android:id="@+id/collapsed">
        ...
        <Constraint android:id="@id/title">
            <Transform
                android:scaleX="0.5"
                android:scaleY="0.5" />
            <Layout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                app:layout_constraintBottom_toTopOf="@id/score"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="@id/toolbar" />
        </Constraint>
        ...
    </ConstraintSet>

    <ConstraintSet android:id="@+id/expanded">
        ...
        <Constraint android:id="@id/title">
            <Transform
                android:scaleX="1.0"
                android:scaleY="1.0" />
            <Layout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent" />
        </Constraint>
        ...
    </ConstraintSet>

</MotionScene>
```


Mặc dù có một số khác biệt nhỏ trong các thuộc tính layout_constraint, nhưng điều quan trọng ở đây là Biến đổi sẽ chia tỷ lệ văn bản giữa các trạng thái được cộng tác và mở rộng. MotionLayout sẽ tự động thực hiện việc chia tỷ lệ này cho chúng tôi. Những gì chúng tôi nhận được miễn phí là nếu chúng tôi giới hạn các Chế độ xem khác ở dưới cùng của Chế độ xem này, chúng sẽ di chuyển khi tỷ lệ được áp dụng cho Chế độ xem này. Vì vậy, hiệu ứng hình ảnh là các Khung nhìn bên dưới nó di chuyển khi nó lớn lên và co lại. Trong GIF, hãy xem cách tên đội và điểm di chuyển khi kích thước của văn bản tiêu đề thay đổi.

Chúng tôi sử dụng cùng một kỹ thuật để chia tỷ lệ logo của đội và văn bản thời gian khớp (89:59). Tôi sẽ không bao gồm những cá nhân đó, nhưng kiểm tra mã nguồn đi kèm để thấy điều này.

The match time text is worth looking at, though:

```xml
<?xml version="1.0" encoding="utf-8"?>
<MotionScene xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    ...
    <ConstraintSet android:id="@+id/collapsed">
        ...
        <Constraint android:id="@id/toolbar">
            <Layout
                android:layout_width="0dp"
                android:layout_height="?attr/actionBarSize"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent" />
        </Constraint>
        ...
        <Constraint android:id="@id/time">
            <Transform
                android:scaleX="0.5"
                android:scaleY="0.5" />
            <Layout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                app:layout_constraintBottom_toBottomOf="@id/toolbar"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@id/score" />
        </Constraint>
        ...
    </ConstraintSet>

    <ConstraintSet android:id="@+id/expanded">
        ...
        <Constraint android:id="@id/toolbar">
            <Layout
                android:layout_width="0dp"
                android:layout_height="0dp"
                app:layout_constraintBottom_toTopOf="@id/time"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent" />
        </Constraint>
        ...
        <Constraint android:id="@id/time">
            <Transform
                android:scaleX="1.0"
                android:scaleY="1.0" />
            <Layout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@id/score"
                android:layout_marginTop="8dp"/>
        </Constraint>
        ...
    </ConstraintSet>

</MotionScene>
```

Loại tỷ lệ tương tự đang được thực hiện, nhưng ở trạng thái thu gọn, nó nằm trong Thanh toolbar, nhưng ở trạng thái mở rộng, nó nằm bên dưới nó.

Về bản thân, điều đó sẽ không hoạt động tốt cho trạng thái mở rộng vì bản thân văn bản là ánh sáng và nền bên dưới Thanh công cụ cũng sáng. Vì vậy, chúng tôi cần ‘bong bóng 'màu xanh lá cây đó thả xuống bên dưới Thanh công cụ để đảm bảo rằng văn bản có nền tương phản.

Bản thân bong bóng là một VectorDrawable:

```xml
<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="48dp"
    android:height="16dp"
    android:viewportWidth="150"
    android:viewportHeight="50">
    <path
        android:fillColor="@android:color/white"
        android:pathData="M0,0 a 25,25 0 0 1 25,25 a 25,25 0 0 0 25,25 h 50 a 25,25 0 0 0 25,-25 a 25,25 0 0 1 25,-25 Z" />
</vector>
```

Nó bao gồm một số cung và đường ngang, và thực sự trông như thế này:

![](https://i1.wp.com/blog.stylingandroid.com/wp-content/uploads/2019/07/bubble.png?resize=300%2C127&ssl=1)

Hình dạng phải được hiển thị trong hình ảnh trạng thái mở rộng tĩnh mà chúng ta đã xem trước đó và một tông màu xanh lá cây được áp dụng trong bố cục. Điều thú vị là cách điều này được áp dụng trong MotionScene:

```xml
<?xml version="1.0" encoding="utf-8"?>
<MotionScene xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    ...
    <ConstraintSet android:id="@+id/collapsed">
        ...
        <Constraint android:id="@id/toolbar_extension">
            <Layout
                android:layout_width="0dp"
                android:layout_height="0dp"
                app:layout_constraintBottom_toBottomOf="@id/toolbar"
                app:layout_constraintEnd_toEndOf="@id/time"
                app:layout_constraintStart_toStartOf="@id/time"
                app:layout_constraintTop_toBottomOf="@id/toolbar" />
        </Constraint>
        ...
    </ConstraintSet>

    <ConstraintSet android:id="@+id/expanded">
        ...
        <Constraint android:id="@id/toolbar_extension">
            <Layout
                android:layout_width="0dp"
                android:layout_height="0dp"
                app:layout_constraintBottom_toBottomOf="@id/time"
                app:layout_constraintEnd_toEndOf="@id/time"
                app:layout_constraintStart_toStartOf="@id/time"
                app:layout_constraintTop_toTopOf="@id/time" />
        </Constraint>
        ...
    </ConstraintSet>

</MotionScene>
```

Ở trạng thái thu gọn, cả trên cùng và dưới cùng của Chế độ xem này bị giới hạn ở dưới cùng của Thanh công cụ. Nó sẽ không có chiều cao như là kết quả.

Ở trạng thái mở rộng, cả trên cùng và dưới cùng của Chế độ xem này bị ràng buộc ở trên cùng và dưới cùng của TextView thời gian khớp. Kết quả là nó sẽ có chiều cao phù hợp với TextView phù hợp với thời gian.

Đã được thực hiện. Nếu chúng ta kết hợp tất cả những thứ này lại với nhau, chúng ta sẽ có được những điều sau đây:

![](https://i2.wp.com/blog.stylingandroid.com/wp-content/uploads/2019/07/animated.gif?resize=512%2C1024&ssl=1)
#
Nguồn Tham khảo: https://blog.stylingandroid.com/motionlayout-dynamic-toolbar/