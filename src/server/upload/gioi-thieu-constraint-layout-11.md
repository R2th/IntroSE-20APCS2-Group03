Như các bạn đã biết Constraint Layout giúp chúng ta đơn giản đi rất nhiều trong việc tạo các layout, giao diện phức tạp và bạn có thể xây dựng hầu hết giao diện bạn muốn bằng cách tinh chỉnh trên UI Editor có trên Android Studio. Nó thường được mô tả và mạnh mẽ hơn rất nhiều với `RelativeLayout`. Với Constraint Layout bạn có thể xây dựng giao diện phức tạp mà không cần hệ thống phân cấp View phức tạp.
Constraint Layout 1.1 vừa được released với phiên bản ổn định và có rất nhiều tính năng hay. Một trong những tính năng đó là việc tối ưu hóa nhiều layout để chạy nhanh hơn và đơn giản hơn so với các phiên bản trước.
Thêm Constraint Layout vào project. 
**Android Gradle**
```
dependencies {  
    compile 'com.android.support.constraint:constraint-layout:1.1.0'  
}
```
## Một số tính năng mới ở phiên bản 1.1
### Percents
Trong Constraint Layout 1.0 để tạo View chiếm theo tỷ lệ phần trăm nào đó trên màn hình thì yêu cầu 2 GuildeLines. Nhưng với Constraint Layout 1.1 đã được đơn giản đi rất nhiều cho phép bạn constraint theo chiều Width hoặc Height.
![Specify the width of button using percents so it fits in the available space while maintaining your design.](https://images.viblo.asia/4a5e435b-42e6-414f-9295-d7fe56e49dc7.jpeg)
Tất cả View đều hỗ trợ thưộc tính `layout_constraintWidth_percent` và `layout_constraintHeight_percent`. Thuộc tính này giúp contraint tỷ lệ màn hình có sẵn. Ví dụ tạo 1 `Button` hoặc `TextView` chiếm 1 tỷ lệ trên màn hình với 1 vài dòng code trong XML 
```
<Button  
    android:layout_width="0dp"  
    android:layout_height="wrap_content"  
    app:layout_constraintWidth_percent="0.7" />
```
### Chains
Định vị nhiều elements với **Chain** cho phép bạn thiết lập chúng trên space màn hình. Trong Constraint 1.1 đã khắc phục được với `Chains` và có nhiều tính năng, tùy chọn. Bạn tạo `Chain` với constraints 2 hướng. Ví dụ trong hình ảnh dưới đây. 
![Chains let you configure how to layout multiple related views with spread, spread_inside, and packed.](https://images.viblo.asia/202e2a4f-7b3c-4468-ba1a-7df8af272d6e.gif)

`app:layout_constraintVertical_chainStyle` là thuộc tính có sẵn trên bất kỳ View in `Chain`. Bạn có thể thay đổi các tùy chọn `spread`, `spread_inside`, hoặc `packed`.

 -  **spread**  Phân bố đồng đều các View in Chain
-   **spread_inside** Định  vị phần tử đầu tiên và cuối cùng trên cạnh và phân bố đồng đều các view còn lại 
-    **packed**  Đặt các View sát nhau và ở trung tâm của `Chain`

### Barriers
Khi bạn có một số Views có thể thay đổi size khi chạy, bạn có thể sử dụng `Barrier`Constraint Layout cho các elements. `Barrier` được đặt ở start, top, end hoặc bottom của một số elements. Bạn có thể nghĩ nó như 1 group ảo( ưu điểm của Barrier là không đặt các elements này trong View Hierarchy).
`Barriers` rất hữu ích khi bạn đặt các làm ứng dụng đa ngôn ngữ với nội dụng không dự đoán trước được.
  ![](https://images.viblo.asia/82257260-b60a-4aae-8bc5-e896dbdc43a9.gif)
  `Barrier` sẽ luôn luôn ở bên ngoài các elements và bạn có thể sử dụng nó để constraint với các Views khác. Trong ví dụ trên, View được constraint ở vị trí kết thức của text có độ dài lớn nhât.
  
  ### Groups

Đôi khi bạn muốn cùng ẩn hoặc cùng hiện nhiều phần tử cùng một lúc. Rất may Constraint Layout đã hỗ trợ điều này với thuộc tính **groups**.
1 group nhưng không thêm phân cấp trong view hierarchy — nó chỉ là như là 1 thuộc tính trong XML. Trong ví dụ dưới, chúng ta găn tag  `profile_name`  và  `profile_image`để tham chiếu tới Views có id là  `profile`.

This is useful when you have several elements that are shown or displayed together.
```
<android.support.constraint.Group  
    android:id="@+id/profile"  
    app:constraint_referenced_ids="profile_name,profile_image" />
```

Trong logic khi bạn muốn ẩn hoặc hiện  `profile_name`  và `profile_image` thì bạn chỉ cần ẩn hoặc hiện group `profile`  .
```
profile.visibility = GONE

profile.visibility = VISIBLE
```

### Circular Constraints

Trong Constraint Layout phần lớn constraints được xác định theo kích thước màn hình — horizontal và vertical. Trong Constraint Layout 1.1 có 1 kiểm constraint mới ,`constraintCircle`, cho phép chỉ định constraints theo hình tròn.Thay vì cung cấp margin theo chiều horizontal và vertical, bạn chỉ định góc và bán kính của hình tròn. Điều này rất hữu ích cho các cho các View muốn thiết lập như là radial menu!
![](https://images.viblo.asia/8d249f37-d5a4-4d22-bfbe-b59f3e9ab500.gif)
Khi tạo circular constraints, chú ý rằng góc bắt đầu là ở trên cùng và tiến hành theo chiều kim đồng hồ. Dưới đây là cách tạo middle fab menu:
```
<android.support.design.widget.FloatingActionButton  
    android:id="@+id/middle_expanded_fab"  
    app:layout_constraintCircle="@+id/fab"  
    app:layout_constraintCircleRadius="50dp"  
    app:layout_constraintCircleAngle="315" />
```

### Animations với ConstraintSet

Bạn có thể sử dụng Constraint Layout cùng với [ConstraintSet](https://developer.android.com/reference/android/support/constraint/ConstraintSet)  để tạo hiệu ứng cho nhiều element cùng một lúc.

 `ConstraintSet` chỉ giữ các constraint của  `ConstraintLayout`. Bạn có thể tạo  `ConstraintSet`  trong code, hoặc  loading nó từ một layout file. Bạn có thể apply  `ConstraintSet`  cho  `ConstraintLayout`, cập nhật tất cả  constraints để khớp với những gì trong  `ConstraintSet`.

Để tạo animate,  hãy sử dụng  [TransitionManager.beginDelayedTransition()](https://developer.android.com/reference/android/transition/TransitionManager.html#beginDelayedTransition%28android.view.ViewGroup%29)   từ  support library. Function này sẽ khiến tất cả các thay đổi từ`ConstraintSet`  được làm động.

Dưới đây là video bao gồm chủ đề đi sâu hơn:
[Video ConstraintSet](https://youtu.be/OHcfs6rStRo)