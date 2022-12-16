Constraint Layout là một trong những thành phần được sử dụng phổ biến nhất trong bộ thư viện Jetpack của Android. Gần đây, Constraint Layout phiên bản 2.0 đã được phát hành những tính năng mới hết sức hữu ích và thú vị. Trong bài viết này, mình sẽ tổng hợp lại một số tính năng đó để chúng ta cùng tìm hiểu.

Đầu tiên, để sử dụng Constraint Layout 2.0 trong project, ta phải thêm dependency của nó vào file `build.gradle`:

`implementation “androidx.constraintlayout:constraintlayout:2.0.1”`
# Flow
[Flow](https://developer.android.com/reference/androidx/constraintlayout/helper/widget/Flow?hl=en) là một layout ảo mới cho xây dựng các view liên kết với nhau mà có thể được ngắt xuống dòng dưới, hoặc một phần khác trên màn hình, khi chúng vượt quá không gian cho phép. Tính năng này hữu ích khi ta sử dụng nhiều item trong một liên kết, nhưng không chắc chắn được độ lớn của container tại thời điểm runtime. Ta có thể sử dụng tính năng này để xây dựng layout với kích thước động cho ứng dụng.
![](https://images.viblo.asia/c6560526-f830-405c-92be-abafe246b154.gif)

Cách `Flow` tạo ra liên kết khi các kích thước phần tử vượt quá khả năng chứa của container.

`Flow` là một layout ảo. Layout ảo trong constraint layout là các view group ảo tham gia vào việc tao nên bố cục của layout, nhưng không được thêm vào cây phân cấp layout. Thay vào đó, chúng tham chiếu tới những view khác trong constraint layout để hoàn thiện layout.

![](https://images.viblo.asia/9d0c4c2b-779f-416d-b228-436d68cdd753.gif)

Mô phỏng các chế độ của `Flow`: `none`,`chain`,`align`

Để sử dụng Flow trong Constraint Layout 2.0, sử dụng thẻ `Flow`. `Flow` tạo ra một view group ảo bao quanh view mà ta truyền vào trong `constraint_referenced_ids`, ví dụ:
```
<androidx.constraintlayout.helper.widget.Flow
       android:layout_width="0dp"
       android:layout_height="wrap_content"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintTop_toTopOf="parent"
       app:flow_wrapMode="chain"
       app:constraint_referenced_ids="card1, card2, card3"
   />
```
Một trong những thuộc tính quan trọng nhất của `Flow` là `wrapMode`, thứ cho phép chúng ta có thể thiết lập cách xử lý khi nội dung tràn ra ngoài, tức là cần xuống dòng.
Ta có thể chỉ định 3 giá trị cho `wrapMode`, bao gồm:
* **`none`** - tạo một chain duy nhất, nội dung bị tràn sẽ không được xử lý.
* **`chain`** - khi bị tràn, tạo một chain mới cho các phần tử bị tràn.
* **`none`** - tương tự như `chain`, nhưng căn các phần tử theo cột.
Để hiểu rõ hơn nữa về `Flow`, bạn có thể [đọc tài liệu chính thức ](https://developer.android.com/reference/androidx/constraintlayout/helper/widget/Flow)về nó.
# Layer
Tiếp tục là một helper mới, [`Layer`](https://developer.android.com/reference/androidx/constraintlayout/helper/widget/Layer), cho phép chúng ta có thể tạo một layer ảo từ một số view. Khác với `Flow`, `Layer` không giúp chúng ta sắp xếp vị trí của view. Thay vào đó, nó cho phép chúng ta áp dụng các transformation trên nhiều view cùng một lúc. 
Tính năng này hữu dụng khi dúng ta cần xây dựng animation để `rotate`, `translate` hay `scale` một số view cùng nhau.
![](https://images.viblo.asia/569270ab-9f80-4e82-9b16-b7426aa4b7e2.gif)

Áp dụng transformation tới nhiều view cùng lúc bằng các sử dụng `Layer`

Một `Layer` được xác định kích thước trong layout và sẽ kích thước được xác định dựa trên tất cả những view mà nó tham chiếu tới.
Để sử dụng `Layer` trong Constraint Layout 2.0, ta sử dụng thẻ `Layer`, ví dụ:
```
<androidx.constraintlayout.helper.widget.Layer
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       app:constraint_referenced_ids="card1, card2, card3"
   />
```
Để hiểu rõ hơn nữa về `Layer`, bạn có thể [đọc tài liệu chính thức ](https://developer.android.com/reference/androidx/constraintlayout/helper/widget/Layer)về nó.
# Motion Layout
![](https://images.viblo.asia/d22a1045-9d0f-451f-9541-f7f3c702a75f.gif)

[Các ví dụ về MotionLayout của Google](https://github.com/android/views-widgets-samples/tree/master/ConstraintLayoutExamples/motionlayoutintegrations)

Motion Layout là một trong những tính năng được mong đợi nhất của Constraint Layout 2.0. Nó cung cấp một hệ thống phong phú các animation cho việc kết nối các view. `MotionLayout` được dựa trên `ConstraintLayout`, cụ thể hơn, là kế thừa từ `ConstraintLayout`, cho phép ta có thể tạo hoạt ảnh giữa các tập hợp các constraint (hay `ConstraintSet`). Ta có thể tuỳ biến lại cách mà các view di chuyển, cuộn, thu phóng, xoay, mờ hoặc bất kỳ thuộc tính hoạt ảnh nào. `MotionLayout` đồng thời cũng xử lý các cử chỉ vật lý và điều khiển tốc độ của các hoạt ảnh. Các hoạt ảnh được xây dụng trong `MotionLayout` có thể được tua và đảo ngược. Điều đó có nghĩa là ta có thể nhảy tới bất kỳ thời điểm nào của hoạt ảnh hoặc đảo ngược nó.

Được tích hợp trong Android Studio, Motion Editor cho phép ta có thể xây dựng, preview và chỉnh sửa animation được xây dựng bởi `MotionLayout`. Điều này có nghĩa là ta có thể dễ dàng tuỳ chỉnh, thiết đặt và xây dựng các hoạt ảnh một cách ưng ý nhất cho ứng dụng của mình.
`MotionLayout` là một công cụ xây dựng hoạt ảnh rất đa năng. Ta có thể sử dụng nó để xây dựng nên bất kỳ hiệu ứng đẹp mắt nào trong Android. Tuy nhiên, có 2 trường hợp mà `MotionLayout` sẽ vượt trội hơn hẳn so với các tuỳ chọn khác:
* **Hoạt cảnh có thể tua được**: các hoạt ảnh được điều khiển bởi các input, như là việc thu phóng toolbar theo trạng thái cuộn.
* **Chuyển đổi trạng thái**: các hoạt ảnh được điều khiển bởi sử thay đổi trạng thái, như là người dùng đi vào một màn hình.

[Ví dụ mới về việc tích hợp MotionLayout](https://github.com/android/views-widgets-samples/tree/master/ConstraintLayoutExamples/motionlayoutintegrations) hướng dẫn chúng ta cách sử dụng `MotionLayout` để xây dựng nên rất nhiều animation phong phú với các tình huống sử dụng khác nhau. Mỗi màn hình được xây dựng nhằm đưa ra các giải pháp cho các tình huống thực tế khi phát triển ứng dụng Android. Bạn có thể tham khảo thêm để có thể có cái nhìn rõ hơn về `MotionLayout`, cũng như có thể dễ dàng tích hợp nó vào ứng dụng của bạn.
# Tổng kết
Trên đây là những tính năng mà mình tổng kết được từ `ConstraintLayout` 2.0. Ngoài ra, còn có nhiều tính năng khác nữa mà bạn có thể tìm thấy trên tài liệu của nó. Nếu bạn tìm được tính năng nào thú vị khác nữa, hãy chia sẻ nhé.

Cảm ơn đã dành thời gian đọc bài viết.
# Tài liệu tham khảo
[Introducing Constraint Layout 2.0](https://medium.com/androiddevelopers/introducing-constraint-layout-2-0-9daa3e99995b)