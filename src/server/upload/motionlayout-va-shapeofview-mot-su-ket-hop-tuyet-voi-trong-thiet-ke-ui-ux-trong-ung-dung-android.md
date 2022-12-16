Bằng việc sử dụng MotionLayout bạn có thể tạo ra một sự khác biệt trong thiết kế UI UX mang phong cách fluid. Hãy quên những màn hình tĩnh khô cứng đi, thay vào đó là animation và các motion bắt mắt, gây thích thú cho người dùng, ngoài ra còn mang lại sự chuyên nghiệp cho ứng dụng của bạn. Rất có thể họ sẽ trầm trồ khen ngợi bạn đó.

![](https://cdn-images-1.medium.com/max/600/1*6Z2NwYYuloq_DGqEEjX6Nw.gif)![](https://cdn-images-1.medium.com/max/600/1*LQaFjdiPhRc5nWoSDVcgLQ.gif)

## MotionLayout
> **MotionLayout** là 1 class khả dụng trong ConstraintLayout 2.0  giúp Android developer quản lí motion và widget trong ứng dụng của họ

Với MotionLayout chúng ta có thể define các transition từ xml layout. Như ví dụ dưới đây ta define việc swipe 1 button màu đỏ từ trái sang bên phải và thay đổi màu, rotation cũng như size của button đó.
Để làm được như vậy đầu tiên ta phải define start contraint và bottom contraint. MotionLayout sẽ tự động tính toán motion và handle các event và animation:

![](https://cdn-images-1.medium.com/max/600/1*ukN1GVx0b6iKI8d7iLfHOw.gif)![](https://cdn-images-1.medium.com/max/600/1*JJ2iaRINx2NtOlci9EG6LQ.png)
![](https://cdn-images-1.medium.com/max/800/1*zNXgIhEiqZKL-3ecUzqw4w.png)

MotionLayout vẫn đang ở alpha stage, nhưng bạn có thể import nó như sau 
```
implementation 'androidx.constraintlayout:constraintlayout:2.0.0-alpha2'
```

Bạn cũng có thể tìm hiểu thêm về nó tại [đây](https://medium.com/google-developers/introduction-to-motionlayout-part-i-29208674b10d)

## ShapeOfView
*ShapeOfView* là 1 thư viện về UI có mặt trên github, nó có thể thay đổi hình dạng của 1 view. Ví dụ bạn có thể thêm 1 RoundRects, Arcs hay đường chéo cho layout của bạn. Nó có khả năng thực hiện animation, ví dụ, Tôi có thể tạo ra hiệu ứng tại 1 góc của view RoundRectShape

![](https://cdn-images-1.medium.com/max/800/1*hc2Pi6CO4N4QmktnBsMs1A.gif)![](https://cdn-images-1.medium.com/max/400/1*acPEO37d6tc2tnHOukvZwg.png)

Bạn có thể import thư viện này như sau:
```
implementation 'com.github.florent37:shapeofview:1.4.4'
```
Và có thể tìm hiểu thêm trên [github](https://github.com/florent37/ShapeOfView)

## MotionLayout + ShapeOfView
Đây mới là cái thực sự tôi muốn nói đến ở bài viết này. Khi khách hàng, hay sếp của bạn yêu cầu bạn làm 1 màn hình có thiết kế như dưới đây:
![](https://cdn-images-1.medium.com/max/600/1*BfGdHh2_eq39uW0IXM0nTg.png)
Thay vì cố chồng lấp view hay dùng trick để làm thì bạn có thể đường đường chính chính làm nó, mà lại có thể thêm vào đó những hiệu ứng cực kì đẹp mắt với animation. Để làm được việc đó hãy dùng MotionLayout và ShapeOfView
Lúc đó layout của ta sẽ bao gồm các thành phần sau :

1.  RecyclerView
2.  ArcView (class trong ShapeOfView ) chứa ImageView
3.  TextView có text là "I love Paris"

Và sắp xếp chúng trong MotionLayout
![](https://cdn-images-1.medium.com/max/800/1*h2Rponxg-n7H-Ufx0mrQpw.png)

Kịch bản của chuyển động đó là việc kéo Recycler lên top hay kéo xuống bottom thì phần view sẽ thay đổi theo nó, và kịch bản chuyển động của nó được định nghĩa tại 1 file xml
![](https://cdn-images-1.medium.com/max/600/1*WsmYJxe4wRslo74zzMe4bw.png)

**Start** : **ArcView** được attach tại top của screen với height là 240dp, góc của arc là 60dp, sử dụng **CustomAttribute**. RecyclerView có contraint với bottom của ArcView. TextView attach giữa ArcView và có textSize là 40.
**End**: **ArcView** vẫn ở top của screen nhưng height của nó giảm còn 80dp, góc của arc còn 0dp hay sẽ là 1 đường thẳng. contraint của RecyclerView vẫn không thay đổi. TextView sẽ attach vào bên trái của ArcView bằng cách xóa right contraint và thêm layout_marginStart, ngoài ra giảm textSize xuống 20
Kết quả đạt được sau kịch bản trên sẽ như sau:

![](https://cdn-images-1.medium.com/max/800/1*6Z2NwYYuloq_DGqEEjX6Nw.gif)

Nếu không thích dùng ArcView bạn có thể thay thế bằng DiagonalView thì bạn có thể đạt được kết quả như sau:

![](https://cdn-images-1.medium.com/max/800/1*B7Vs-4vPilvd2e-6VLSQDQ.gif)

Với MotionLayout bạn có thể làm nhiều hơn được thế.
Như vậy tôi đã đưa ra 1 ví dụ cụ thể có thể làm được với MotionLayout và ShapeOfView. Nếu muốn tạo ra 1 ứng dụng có tính linh động và đẹp mắt như thế này hãy thử với MotionLayout và ShapeOfView nhé. Mong rằng bài viết này sẽ có ích với các bạn. Chúc các bạn có thể ứng dụng thành công nó vào dự án của mình.


Nguồn [MotionLayout + ShapeOfView = 😍](https://proandroiddev.com/motionlayout-shapeofview-26a7ab10142f)