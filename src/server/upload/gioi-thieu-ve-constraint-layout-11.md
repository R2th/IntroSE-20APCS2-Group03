Constraint Layout đơn giản hoá việc tạo các layout phức tạp trong Android bằng cách làm cho nó có thể xây dựng được hầu hết các UI của bạn với visual editor trong Android Studio. Nó thường được mô tả là mạnh mẽ hơn `RelativeLayout`. Với Constraint Layout, bạn có thể xây dựng các layout phức tạp mà không cần xây dựng hệ thống phân cấp view (view hierarchies).

Constraint Layout 1.1 đã được release phiên bản ổn định với rất nhiều tiện ích. 

## Android Gradle
```
dependencies {
    compile 'com.android.support.constraint:constraint-layout:1.1.0'
}
```
Để sử dụng các tính năng mới trong project của bạn, thêm Constraint Layout 1.1 vào dependencies của project.

## Các tính năng mới trong phiên bản 1.1
### Percents (Phần trăm)
Trong Constraint Layout 1.0, để tạo một view chiếm tỉ lệ phần trăm của màn hình, yêu cầu phải tạo ra 2 guidelines. Trong Constraint Layout 1.1, chúng ta tạo nó đơn giản hơn bằng cách cho phép constrain bất kỳ view nào với phần trăm width hoặc height.
![](https://images.viblo.asia/665b08da-550d-4029-8961-c86e2ac4dbb5.jpeg)
Hình trên định nghĩa width của button sử dụng phần trăm percents, vì vậy nó phù hợp với không gian có sẵn trong khi vẫn duy trì design.
Tất cả các view đều support thuộc tính `layout_constraintWidth_percent` và `layout_constraintHeight_percent`. Nó xác định ràng buộc được cố định với một tỉ lệ phần trăm của không gian có sẵn. Vì vậy, để tạo một `Button` hoặc một `TextView` được mở rộng để fill đầy phần trăm màn hình, thực hiện khai báo một vài dòng code trong file XML như sau:
```
<Button
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    app:layout_constraintWidth_percent="0.7" />
```
### Chains (Chuỗi)
Định vị nhiều phần tử bằng một **Chain** cho phép chúng ta thiết lập cách chúng lấp đầy không gian có sẵn. Trong phiên bản 1.1, một sỗ lỗi với chains đã được sửa và làm chúng hoạt động được trên nhiều view hơn. Bạn tạo một chain bằng cách thêm các constraint theo cả 2 hướng.
![](https://images.viblo.asia/43bcd6f1-c2e2-4f22-a6b0-1b3e81f692c1.gif)
Thuộc tính `app:layout_constraintVertical_chainStyle` được khai báo trên bất kỳ view nào trong chain. Có thể thiết lập 3 giá trị `spread`, `spread_inside`, hoặc `packed`.
* spread: phân bố đồng đều tất cả các view trong chain.
* spread_inside: vị trí phần tử đầu tiên và cuối cùng đặt trên cạnh, các phần tử còn lại được phân bố đồng đều.
* packed: đóng gói tất cả các phần tử lại với nhau và đặt ở trung tâm của chain.

### Barriers (rào chắn)
Khi bạn có một số view có thể thay đổi kích thước lúc runtime, bạn có thể sử dụng **barrier** để constraint các phần tử. Một barrier được đặt ở `start`, `top`, `end` hoặc `bottom` của một số phần tử.  Bạn có thể nghĩ nó như là một nhóm ảo, ảo - vì không có một view hierarchy nào được thêm vào ở đây.
Barriers rất hữu dụng trong trường hợp strings hoặc nội dung được hiển thị là không biết trước.
![](https://images.viblo.asia/ca3038a0-bdb2-4292-bac9-21c83efcde02.gif)
Trong ví dụ trên, view bên phải bị ràng buộc luôn ở cuối của `TextView` có chiều rộng lớn nhất.

### Groups
Đôi khi bạn cần hiển thị hoặc ẩn nhiều phần tử cùng một lúc. Để support tính năng này, Constraint Layout đã thêm vào **Group**.
Một group không thêm level vào view hierarchy - nó thực sự chỉ là cách để gắn tag các view.
Trong ví dụ sau, chúng ta gắn tag `profile_name` và `profile_image` được tham chiếu bởi id `profile`.
Điều này rất hữu ích khi bạn có nhiều phần tử được hiển thị hoặc ẩn cùng nhau.
```
<android.support.constraint.Group
    android:id="@+id/profile"
    app:constraint_referenced_ids="profile_name,profile_image" />
```
Sau khi bạn đã định nghĩa nhóm `profile` bạn có thể thiết lập thuộc tính `visibility` cho nhóm, và nó sẽ apply cho cả `profile_name` và `profile_image`.
```
profile.visibility = GONE
profile.visibility = VISIBLE
```

### Circular Constraints
Trong Constraint Layout, hầu hết các ràng buộc được xác định bởi screen dimensions  -  horizontal và vertical. Trong Constraint Layout 1.1, có một loại ràng buộc mới, đó là `constraintCircle`, cho phép bạn chỉ định các ràng buộc theo hình tròn. Thay vì cung cấp margin ngang và dọc, bạn chỉ định góc và bán kính của hình tròn. 
![](https://images.viblo.asia/f2da84ea-84ec-45fe-a8dd-6d8d4e696dbd.gif)
Khi tạo các circular constraints, lưu ý rằng góc bắt đầu là ở top và tiến độ theo chiều kim đồng hồ.
```
<android.support.design.widget.FloatingActionButton
    android:id="@+id/middle_expanded_fab"
    app:layout_constraintCircle="@+id/fab"
    app:layout_constraintCircleRadius="50dp"
    app:layout_constraintCircleAngle="315" />
```

### New Optimizations (Tối ưu hoá mới)
Constraint Layout 1.1 thêm một số tối ưu hoá mới giúp tăng tốc layout của bạn. Các tối ưu hoá chạy riêng biệt và cố gắng giảm các ràng buộc cần thiết cho các view trong layout.
Nhìn chung, chúng làm việc bằng cách tìm các constants trong layout của bạn và đơn giản nó.
Có một thuộc tính mới là `layout_optimizationLevel`, cho phép thiết lập mức tối ưu hoá. Nó có các thiết lập sau:
* **barriers**: tìm ra các barriers và thay thế chúng bằng những ràng buộc đơn giản.
* **direct**: tối ưu hoá các phần tử được kết nối trực tiếp với các phần tử cố định.
* **standard**: là mức tối ưu hoá mặc định bao gồm **barriers** và **direct**.
* **dimensions**: nó tối ưu hoá layout bằng cách tính dimensions (đang được thử nghiệm, có thể gây ra một số issue cho layout)
* **chains**

Ví dụ:
```
<android.support.constraint.ConstraintLayout 
    app:layout_optimizationLevel="standard|dimensions|chains"
```

## Kết luận
Để tìm hiểu thêm về Constraint Layout 1.1, có thể tham khảo tạị:

[Build a Responsive UI with ConstraintLayout | Android Developers](https://developer.android.com/training/constraint-layout/)

[ConstraintLayout | Android Developers](https://developer.android.com/reference/android/support/constraint/ConstraintLayout)

[Code lab](https://codelabs.developers.google.com/codelabs/constraint-layout/#0)