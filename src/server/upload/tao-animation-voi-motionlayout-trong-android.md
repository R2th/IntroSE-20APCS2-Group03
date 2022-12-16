[MotionLayout](https://developer.android.com/reference/android/support/constraint/motion/MotionLayout) là một phần của thư viện Android, nó kế thừa từ ConstraintLayout. 
Nó là widget duy nhất cho phép bạn tạo hiệu ứng animation bằng cách sử dụng XML. 

Trong hướng dẫn này, mình sẽ hướng dẫn các bạn cách thêm nó vào project Android Studio và tạo một vài animation khác nhau với nó.

## Chuẩn bị

Để làm theo hướng dẫn này, bạn sẽ cần:

* Android Studio 3.1.3 trở lên.
* Thiết bị hoặc trình giả lập chạy Android API 21 trở lên.
* Hiểu biết cơ bản về ConstraintLayout.

## 1. Thêm Dependencies

Để có thể sử dụng MotionLayout trong project Android Studio , bạn phải có phiên bản mới nhất của thư viện hỗ trợ Constraint Layout. 
Ngoài ra, để tránh xung đột phiên bản, hãy đảm bảo rằng bạn sử dụng phiên bản mới nhất của thư viện hỗ trợ appcompat v7.

Theo đó, hãy thêm vào file buidle.gradle của app như sau :

```
implementation 'com.android.support:appcompat-v7:27.0.2'
implementation 'com.android.support.constraint:constraint-layout:2.0.0-alpha1'
```

## 2. Định nghĩa một Layout

MotionLayout có thể làm mọi thứ mà ConstraintLayout có thể thực hiện. Do đó, bạn có thể tự do thay thế chúng cho nhau. 
Bây giờ, bạn hãy tạo một layout XML mới và thêm MotionLayout vào nó làm phần tử gốc.

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.motion.MotionLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/motion_container">
 
    <!-- More code here -->
 
</android.support.constraint.motion.MotionLayout>
```

Trong hướng dẫn này, chúng ta sẽ tạo animation chuyển động cho ImageView. Vì vây, hãy thêm nó vào bên trong layout :

```
<ImageView
    android:id="@+id/actor"
    app:srcCompat="@color/colorAccent"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

Tiếp theo, thêm một Button bạn có thể nhấn để bắt đầu animation :

```
<Button
    android:id="@+id/button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Press Me"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    android:onClick="start"/>
```

Ngoài ra, để theo dõi tiến trình của animation, hãy thêm SeekBar vào layout và đặt nó bên dưới Button :

```
<SeekBar
    android:layout_width="100dp"
    android:layout_height="wrap_content"
    app:layout_constraintTop_toBottomOf="@+id/button"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    android:layout_marginTop="10dp"
    android:id="@+id/seekbar"/>
```

Cuối cùng, thêm hàm lắng nghe sự kiện click của Button trong Activity :

```
fun start(v: View) {
    // More code here        
}
```

## 3. Tạo một Motion Scene

Bạn có thể nhận thấy rằng chúng ta đã không thêm bất kỳ ràng buộc nào vào ImageView trong khi dựng layout. Đó là bởi vì chúng ta sẽ thêm chúng vào một cảnh chuyển động thay thế ( Motion Scene ).
Motion Scene là một file XML chứa các chi tiết về animation mà bạn muốn tạo với MotionLayout.

Để tạo một Motion Scene, hãy tạo một file XML và thêm một phần tử MotionScene vào nó :

```
<?xml version="1.0" encoding="utf-8"?>
<MotionScene
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
 
    <!-- More code here -->
     
</MotionScene>
```

Một Motion Scene chứa các phần tử ConstraintSet chỉ định các ràng buộc được áp dụng cho một widget ở các điểm khác nhau trong animation. 
File Motion Scene thường chứa hai tập hợp : một cho phần đầu của animation và một cho kết thúc.

Đoạn code sau đây cho bạn thấy cách MotionLayout di chuyển ImageView từ góc dưới cùng bên phải của màn hình sang góc trên cùng bên trái :

```
<ConstraintSet android:id="@+id/starting_set">
    <Constraint android:id="@+id/actor"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        android:layout_width="60dp"
        android:layout_height="60dp"
        />
</ConstraintSet>
 
<ConstraintSet android:id="@+id/ending_set">
    <Constraint android:id="@+id/actor"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        android:layout_width="60dp"
        android:layout_height="60dp"
        />
</ConstraintSet>
```

Lưu ý rằng mỗi phần tử ConstraintSet phải luôn xác định cả vị trí và kích thước mong muốn. 
Điều này rất quan trọng vì nó sẽ ghi đè lên bất kỳ thông tin layout nào đã thiết lập trước đó.

Để giúp MotionLayout hiểu thứ tự mà trong đó các ràng buộc được áp dụng, bạn phải tạo một phần tử Transition. 
Bằng cách sử dụng các thuộc tính constraintSetStart và constraintSetEnd, bạn có thể chỉ định tập hợp nào phải được áp dụng trước và cuối cùng. 

Phần tử Transition cũng cho phép bạn chỉ định thời lượng của animation :

```
<Transition
    android:id="@+id/my_transition"
    app:constraintSetStart="@+id/starting_set"
    app:constraintSetEnd="@+id/ending_set"
    app:duration="2000">
     
</Transition>
```

Tại thời điểm này, Motion Scene đã hoàn tất. Tuy nhiên, MotionLayout vẫn chưa nhận thức được nó. 
Vì vậy, quay lại file layout XML, thêm thuộc tính layoutDescription vào và đặt giá trị của nó thành tên của file Motion Scene.

Nếu đặt tên của file motion scene là **my_scene.xml**, thì MotionLayout của bạn sẽ như sau :

```
<android.support.constraint.motion.MotionLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layoutDescription="@xml/my_scene"
    android:id="@+id/motion_container">
 
    ...
 
</android.support.constraint.motion.MotionLayout>
```

## 4. Bắt đầu Animation

Khi bạn chạy ứng dụng, MotionLayout sẽ tự động áp dụng ràng buộc được chỉ định trong thuộc tính constraintSetStart của phần tử Transition. 
Do đó, để bắt đầu animation , tất cả những gì bạn cần làm là gọi phương thức transitionToEnd() của widget. 

Code đây, phải được thêm vào hàm lắng nghe sự kiện nhấp chuột mà bạn đã tạo trong bước trước đó, cho bạn biết cách thực hiện :

```
motion_container.transitionToEnd()
```

Tại thời điểm này, nếu bạn chạy ứng dụng và nhấn vào Button, bạn có thể thấy ImageView di chuyển mượt mà trên màn hình.