Chắc hẳn bạn đã từng sử dụng hoặc ít nhất cũng nghe thấy ConstraintLayout rồi chứ. 
Constraint layout là dạng layout tốt nhất để dựng UI, nó có thể đáp ứng được khả năng tự điều chỉnh kích thước theo kích thước màn hình. Mặc dù constraint layout có khả năng thực hiện công việc đó kể từ phiên bản 1.0.0 nhưng vẫn chưa đầy đủ . Và trong phiên bản mới nhất này thì nó đã được bổ sung khá là nhiều. 

![alt](https://cdn-images-1.medium.com/max/800/1*eKrCrosZ_zWKoQsDF4ufZQ.png)

## **Circular Positioning**

Một view có thể được định vị dựa trên 1 view khác với một góc và khoảng cách được đo từ điểm trung tâm của cả hai view. 
Bạn có thể tưởng tượng nó giống như là một vệ tinh xoay quanh 1 hành tinh với một số góc và một khoảng cách.

![alt](https://cdn-images-1.medium.com/max/800/1*GzLnKniwl1dbhNA2J5WyzQ.png)

Một view có thể được tùy chỉnh theo bất kỳ góc và bán kính nào đối với điểm trung tâm của nó. Để xem được căn chỉnh bạn có thể quan tâm đến những thuộc tính sau

app:layout_constraintCircle — Get aligned with this view

app:layout_constraintCircleAngle — Angle from the aligned view

app:layout_constraintCircleRadius — Distance from the aligned view

```
<Button
    android:id="@+id/btCenter"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Center Button"/>

<Button
    android:id="@+id/btAlign"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Aligned Button"
    app:layout_constraintCircle="@id/btCenter"
    app:layout_constraintCircleAngle="45"
    app:layout_constraintCircleRadius="120dp" />
```

![alt](https://cdn-images-1.medium.com/max/800/1*2GO_YmwfHprDv2r7Qex8Xg.jpeg)

## **Barrier**

Chiều rộng của view có thể tự động giảm hoặc tăng để phù hợp với chiều rộng của view. Barrier sẽ được tùy chỉnh theo View có chiều rộng tối đa trong nhóm view mà nó được tham chiếu đến

![alt](https://cdn-images-1.medium.com/max/800/1*rHW1BKt1jLHorT9JSxc7tg.png)

Một Barrier có thể được thiết lập để bắt đầu, kết thúc, trên cùng, dưới cùng - ở đây hộp màu xanh luôn luôn ở bên phải của Barrier, nơi Barrier có thể tự động tùy chỉnh dựa trên chiều rộng tối đa trong hộp màu xám.

Theo dõi đoạn code sau :

```
<Button
    android:id="@+id/btName"
    android:layout_width="100dp"
    android:layout_height="wrap_content" />

<Button
    android:id="@+id/btAge"
    android:layout_width="150dp"
    android:layout_height="wrap_content"
    app:layout_constraintTop_toBottomOf="@+id/btName" />

<android.support.constraint.Barrier
    android:id="@+id/barrier"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:barrierDirection="end"
    app:constraint_referenced_ids="btName,btAge" />

<Button
    android:id="@+id/btAddress"
    android:layout_width="120dp"
    android:layout_height="wrap_content"
    app:layout_constraintStart_toEndOf="@+id/barrier" />
```

Ở đây btAge có layout_width = 150dp lớn hơn btName với layout_width = 100dp nên barrier sẽ tự động đặt sau 150dp. Sau đó nếu có thay đổi về width thì barrier sẽ tự động tahy đổi cho phù hợp.
{@youtube: https://youtu.be/F4yB1n7utAg}

## **Group**
Theo mình đây chính là tính năng được nhiều người  mong đợi nhất,  điều này có thể giải quyết một cách dễ dàng nếu nếu như visibility của cái multiple views đc set là visible hay gone. Viewgroup có chứa các view khác nhau và setting của viewgroup cũng sẽ ẩn tất cả các view con của nó. Group cũng đang có tính năng tương tự nhưng không phải là groupviews mà thay vào đó chỉ yêu cầu id.
```
<Button
    android:id="@+id/btCenter"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Center Button"
    android:textAllCaps="false"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<Button
    android:id="@+id/btAlign"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Aligned Button"
    android:textAllCaps="false"
    app:layout_constraintCircle="@id/btCenter"
    app:layout_constraintCircleAngle="45"
    app:layout_constraintCircleRadius="120dp" />

<android.support.constraint.Group
    android:id="@+id/group"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:visibility="gone"
    app:constraint_referenced_ids="btAlign,btCenter" />
```

## **Placeholder**

Được sử dụng để tự độngset content vào screen mà bất kỳ view nào cũng có thể thành placeholder chỉ chỉ cần truyền id cho nó. Nếu view tồn tại trên cùng một màn hình với placeholder thì view sẽ tự động gone.

```
<ImageView
    android:id="@+id/iv_call"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:src="@drawable/ic_launcher_background" />

<android.support.constraint.Placeholder
    android:layout_width="match_parent"
    android:layout_height="100dp"
    app:content="@+id/iv_call"
    app:layout_constraintBottom_toBottomOf="parent" />
```

Để đặt nội dung được lập trình sử dụng : placeholder.setContentId(viewId)

{@youtube: https://youtu.be/zeIuCa5H0z4}

## **Dimension constraints**

Thường yêu cầu chiều rộng hoặc chiều cao xem là wrap content instead of match constraint or match parent nhưng không may wrap content phải chịu nhiều ràng buộc nếu thay đổi chiều rộng hoặc chiều cao. OK. bạn yên tâm ở phiên bản 1.1.0, sự cố đó được giải quyết bằng cách sử dụng

app:layout_constrainedWidth=”true”

or

app:layout_constrainedHeight=”true”

Nghĩa là nó áp đặt ràng buộc những cũng cho phép view width/ height  vẫn là wrap content


![alt](https://cdn-images-1.medium.com/max/800/1*ify5Rpw70YY1NdQmv2rPfw.jpeg)

```
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Hello this is an example with constraint width"
    app:layout_constrainedWidth="true"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="@+id/guideline_50"/>
```

Một điều constraint layout vẫn còn hạn chế là khả năng xác địnhtỷ lệ % chiều rộng và chiều cao. Việc xác định width/ height theo tỷ lệ %  vô cùng hữu ích cho giao diện người dùng. Xác định width/ height trong bằng dp chưa thực sự tốt đối với việc hiển thị ở nhiều màn hình có nhiều tỷ lệ khác nhau, đặc biệt là thời điểm hịện tại thì có quá nhiều dòng điện thoại hẹ điều hành Android với nhiều kích thucows tỉ lệ khác nhau. Nhưng bây giờ chiều rộng và chiều cao có thể được xác định theo tỷ lệ phần trăm bằng cách sử dụng ayout_constraintWidth_percent and layout_constraintHeight_percent.


Để sử dụng phần trăm cho chiều rộng và chiều cao, nên là match constraint(0dp)  và :

app: layout_constraintWidth_default = ”percent 

hoặc

app: layout_constraintHeight_default =” percent ”need to set as percent

```
<TextView
    android:id="@+id/bt"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:text="Hello Width In Percentage"
    app:layout_constraintWidth_default="percent"
    app:layout_constraintWidth_percent="0.5"
    app:layout_constraintLeft_toLeftOf="parent" />
```

Ở đây 0.5 tức là 50%. Tuừ 0 -> 1 tương đương 0 -> 100%.

Có vài tính năng thú vị hơn nữa của constraint layout như là achieving animation  bằng cách sử dụng constraint set, optimizing layout sử dụng constraint optimizer and complex chain support. Thật tuyệt vời phải không. 

Thank for watching !.
Tham khảo : AndroidPub.