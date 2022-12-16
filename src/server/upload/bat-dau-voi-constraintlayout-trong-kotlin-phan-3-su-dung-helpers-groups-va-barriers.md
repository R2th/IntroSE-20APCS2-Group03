## I) Helpers (Nhóm lề)
Có nhiều cách để làm, bạn có thể làm trong file xml, hoặc bạn có thể sử dụng layout design editor có sẳn của công cụ. Ở đây mình sử dụng layout design editor, để mở layout và click chuột phải chọn **Helpers** và chọn **Add Vertical Guideline** .
![](https://images.ctfassets.net/1es3ne0caaid/WznfOSPtqSmuOEAAwKmWY/953de5d31c31a7bc6886c962166e1529/constraintLayout-3-add-vertical-guide.png)
```
<android.support.constraint.Guideline
      android:id="@+id/guideline"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:orientation="vertical"
      app:layout_constraintGuide_begin="20dp" />
```
Trong hướng dẫn có thuộc tính orientation: vertical để theo chiều dọc. Thuộc tính cần chính là *layoutconstraintGuidebegin="20dp"* có nghĩa là nó sẽ start vào 20dp bên lề layout.
***Thuộc tính***
Nó có 3 thuộc tính:
* Chỉ định khoảng cách cố dịnh từ bên trái hoặc trên cùng của layout: `layout_constraintGuide_begin`
* Chỉ định khoảng cách cố định từ bên phải hoặc bên dưới của layout:` layout_constraintGuide_end`
* Chỉ định tỉ lệ phần trăm chiều rộng hoặc chiều cao của layout: `layout_constraintGuide_percent`
Mặc định, khi bạn tạo một Hepers trên layout design editor, nó sẽ định vị khi bắt đầu, nó sẽ trông như thế này:
![](https://images.ctfassets.net/1es3ne0caaid/21FFaj19FG6QmYGi088OUW/60b109bba9592617e32e37f0cb5902ec/constraintLayout-3-default-guidelines.png)
Nó có giá trị 20dp. Nếu bạn muốn vị trí ở cuối, thì đổi thuộc tính `app:layout_constraintGuide_begin` thành `layout_constraintGuide_end` Hoặc bạn có thể kéo thanh dọc qua bên phải theo hình ảnh bên dưới.
![](https://images.ctfassets.net/1es3ne0caaid/1vKIEmIjc8WSGwWkEOwCmA/99c3cb7752c855bf8f716ee1d522fdcb/constraintLayout-3-mod-guide-demo.gif)
Bạn cũng có thể sử dụng tỉ lệ phần trăm `app:layout_constraintGuide_percent` cũng giống như Bias, giá trị 0 sẽ ở đầu, bên trái của layout, giá trị 0.5 sẽ ở giữa, và giá trị 1 sẽ ở cuối layout. Trên giao diện bố trí thiết kế, nó hiển thị dưới dạng value 0 đến 100.
## II) Group (nhóm).
Nhóm nó là một phần trong Helper của constraint layout. Mục đích của nó là để phân loại các view giống nhau. Nó khác với ViewGroup thông thường mà chúng ta đã biết trong Android. Mặc dù một nhóm chỉ chứa tham chiếu đến ID của các thành phần khác, nhưng VIewGroup chứa chính các view thực tế. Group được sử dụng để hiển thị các view tham chiếu trong đó.
Để tạo một nhóm, bạn click chuột phải trên layout, chọn helpers, và select add nhóm, sau đó trong màn hình conpoment kéo các view bạn muốn thêm vào. 
![](https://images.ctfassets.net/1es3ne0caaid/5Ax1PmG8soC2WMIckEGY4m/3af0df2a50daf4a4c2ae24e790505e84/constraintLayout-3-add-group.gif)
```
<android.support.constraint.ConstraintLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      tools:context=".MainActivity">

      <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:text="TextView"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

      <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:text="Button"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView2" />

      <android.support.constraint.Group
        android:id="@+id/group"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:constraint_referenced_ids="button,textView2" />
    </android.support.constraint.ConstraintLayout>
```
Chú ý: ID của button và Textview tham chiếu trong nhóm. Bạn có thể chỉnh visibility của nhóm và nó sẽ ảnh hưởng đến visibility của view có ID trong Group. 
## III) Barriers (Thanh phân cách)
Đôi khi chúng ta cần tạo layout động và view với kích thước có thể co dãn dựa vào thông số chúng ta nhập.
Chúng có thể được tạo ở phía trên, phía dưới, bên trái hoặc bên phải của view.
![](https://images.ctfassets.net/1es3ne0caaid/3hBGbTIygoy806yO402qey/961dc1693766aca7c3ec6ac7876e4fe4/constraintLayout-3-barriers.png)
![](https://images.ctfassets.net/1es3ne0caaid/3hBGbTIygoy806yO402qey/961dc1693766aca7c3ec6ac7876e4fe4/constraintLayout-3-barriers.png)

Ở trên, lưu ý rằng view C bị giới hạn trong thanh phân cách, phân cách view ID của B và A. Có nghĩa là phân cách được đặt ở chế độ có thể co dãn được. Điều này rất hữu ích khi bạn không thực sự biết kích thước thực của các view.
***Tạo thanh phân cách***
Ở đây mình kéo 3 TextView vào layout:
![](https://images.ctfassets.net/1es3ne0caaid/5aYh9NyzLi22as4meMeO8/4e67877608a6a069c451f084233500e7/constraintLayout-3-add-barriers.png)
Từ hình ảnh trên, chúng ta có 3 TextView bị ràng buộc bên trái. Bây giờ chúng ta sẽ tạo ra thanh phân cách.
Trên layout, bạn dùng *helper tool* và chọn *Add vertical barrier*
![](https://images.ctfassets.net/1es3ne0caaid/49bYsx4ZE4E82WSKYwua4m/22966a0f34fe24693aabb70523ffee1f/constraintLayout-3-add-vertical-barrier.png)
Bạn chọn những phần tử muốn, rồi kéo vào view mà bạn muốn tạo một thanh phân cách.
![](https://images.ctfassets.net/1es3ne0caaid/5rbuneZddYCQiISG0AgmgW/bf7c6637159d7c107a0308788b339fdb/constraintLayout-3-add-vertical-barrier-demo.gif)
 ```
 <?xml version="1.0" encoding="utf-8"?>
    <android.support.constraint.ConstraintLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      tools:context=".MainActivity">

      <TextView
        android:id="@+id/textView3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="20dp"
        android:text="FirstText"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

      <TextView
        android:id="@+id/textView4"
        android:layout_marginTop="20dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:text="SecondTextLong"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView3" />

      <TextView
        android:id="@+id/textView5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="40dp"
        android:text="ThirdText"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView4" />

        <android.support.constraint.Barrier
          android:id="@+id/barrier2"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          app:barrierDirection="left"
          app:constraint_referenced_ids="textView4,textView3" />

    </android.support.constraint.ConstraintLayout>
```
Theo mặc định, thanh phân cách được đặt bên trái.
Giờ mình muốn thanh phân cách hướng về bên phải, chúng ta có thể thay đổi bằng cách chọn thuộc tính.
` app:layout_constraintStart_toStartOf="@id/barrier"`
![](https://images.ctfassets.net/1es3ne0caaid/5EESNnUC6AOQWq02KA2YgI/58b0a07556a83d6ffb3de8b84172e82e/constraintLayout-3-barrier-direction.png)

Cảm ơn bạn đã theo dõi bài viết, mời bạn xem phần 4 của constraintLayout:
https://viblo.asia/p/bat-dau-voi-constraintlayout-trong-kotlin-phan-4-su-dung-motionlayout-cho-animations-RQqKLE66Z7z

*Nguồn tham khảo: https://pusher.com/tutorials/constraintlayout-kotlin-part-3*