![](https://miro.medium.com/max/6804/1*FDNwpzHpVOOyFUAADr2Uog.png)

ằng cách sử dụng MotionLayout, bạn có thể tạo ra một phong cách hoàn toàn khác biệt và mượt mà cho ứng dụng của mình. Quên màn hình tĩnh mà không có bất kỳ hình ảnh động, thêm một số chuyển động!

![](https://miro.medium.com/max/1200/1*6Z2NwYYuloq_DGqEEjX6Nw.gif)

### MotionLayout

> **MotionLayout** là một class mới có mặt trên thư viện ConstrainLayout 2.0 để giúp các lập trình viên Android quản lý các hiệu ứng chuyển động và các animation trong ứng dụng.

Nó có thể xác định chuyển tiếp từ bố cục xml của chúng tôi. Chúng tôi xác định một hành động để thực hiện: Vuốt trên nút màu đỏ và giá trị bắt đầu: bên phải của nút.

Sau đó, chúng ta cần xác định các ràng buộc bắt đầu và các ràng buộc dưới cùng. MotionLayout sẽ tự động tính toán chuyển động và xử lý các sự kiện và hình ảnh động:

![](https://miro.medium.com/max/1600/1*ukN1GVx0b6iKI8d7iLfHOw.gif)

Code XML:

![](https://miro.medium.com/max/4096/1*JJ2iaRINx2NtOlci9EG6LQ.png)

![](https://miro.medium.com/max/1600/1*zNXgIhEiqZKL-3ecUzqw4w.png)

Implement vào gradle:

> implementation 'androidx.constraintlayout:constraintlayout:2.0.0-alpha2'
 
### ShapeOfView
ShapeOfView là một thư viện giao diện người dùng Android có sẵn trên Github, có thể thay đổi hình dạng của chế độ xem. Ví dụ: bạn có thể thêm một số RoundRects, Arcs hoặc đường chéo vào bố cục của mình. Nó có thể làm động các quan điểm đó, ví dụ, tôi có thể làm động các bán kính dưới cùng bên trái của RoundRectShape này:

![](https://miro.medium.com/max/960/1*hc2Pi6CO4N4QmktnBsMs1A.gif)
![](https://miro.medium.com/max/2944/1*acPEO37d6tc2tnHOukvZwg.png)

Bạn có thể sử dụng thư viện thông qua add gradle:
> implementation 'com.github.florent37:shapeofview:1.4.4'


### MotionLayout + ShapeOfView
![](https://miro.medium.com/max/2104/1*BfGdHh2_eq39uW0IXM0nTg.png)

Layout này bao gồm 3 views:
1. RecyclerView
2. ArcView, từ ShapeOfView, bao gồm ImageView.
3. TextView

![](https://miro.medium.com/max/1600/1*h2Rponxg-n7H-Ufx0mrQpw.png)

![](https://miro.medium.com/max/3320/1*WsmYJxe4wRslo74zzMe4bw.png)

**Bắt đầu**: ArcView được gắn trên đỉnh màn hình và chiều cao của nó là 240dp, góc cung của nó được xác định là 60dp, sử dụng CustomAttribution. RecyclerView có một ràng buộc ở dưới cùng của ArcView này. TextView được đính kèm ở giữa ArcView (các ràng buộc: trên cùng, bên trái, dưới cùng, bên phải) và có một textSize được đặt là 40 (sẽ sử dụng methode .setTextSize (float)). Kết thúc: ArcView được gắn ở phía trên màn hình, nhưng chiều cao của nó trở thành 80dp, góc cung của nó trở thành 0dp để phẳng. Ràng buộc RecyclerView Viking không thay đổi, nó nằm dưới ArcView. TextView chỉ cần được đính kèm ở bên trái ArcView: Tôi vừa loại bỏ các ràng buộc bên phải và thêm layout_marginStart. TextSize cuối cùng của TextView được đặt là 20. Kết quả thực sự trôi chảy và tuyệt vời!

Source: https://proandroiddev.com/motionlayout-shapeofview-26a7ab10142f