# Giới thiệu
![](https://images.viblo.asia/d75b6198-c1f0-4f6a-9617-8d3a30ffbff7.png)
Bạn đã từng làm việc với các thành phần Custom UI không có sẵn trong nhóm Android Widget và tự hỏi nó được tạo ra như thế nào?

Đó là điều kỳ diệu của API Canvas có trong Android. Tôi nghĩ rằng chính cái tên canvas đã định nghĩa rằng đó là một sân chơi cho các nghệ sĩ và bạn phải thể hiện nghệ thuật tốt nhất của mình.

Trong blog này, chúng ta sẽ cùng tìm hiểu về,

*  API Canvas trong Android là gì?
* Hiểu biết về việc thực hiện canvas.
* Làm cách nào chúng ta có thể tạo ra thành phần UI riêng bằng API canvas?

Nguồn: https://blog.mindorks.com/understanding-canvas-api-in-android 
# API Canvas trong Android là gì?
Canvas API trong Android là một khung vẽ giúp chúng ta vẽ thiết kế tùy chỉnh như đường, vòng tròn hoặc thậm chí là một hình chữ nhật. Sử dụng chúng, chúng ta có thể tạo bất kỳ hình dạng nào tùy theo thiết kế.

Bản vẽ canvas xuất hiện trong Bitmap, nơi chúng ta vẽ phác thảo và sau đó Paint API giúp tô màu theo bất kỳ Style nào chúng ta cần.
> Canvas helps to create the skeleton and Paint helps in beautifying the design.
# Hiểu biết về việc thực hiện canvas.
Vì chúng ta biết Canvas giúp thiết kế views, hãy hiểu cách views được hiển thị ra. Có các layout methods được gọi, chúng là
![](https://images.viblo.asia/ef9430fc-422d-4dc1-9665-0f67ce359a82.png)

Ở đây, **onMeasure()** - đo kích thước của view và children của view có mặt ở đó, **onLayout()** - giúp thiết lập kích thước và **onDraw()** là giúp vẽ trên views.

Vì vậy, trong **onDraw()** canvas được sử dụng để vẽ bằng các phương thức có sẵn của nó, như drawLine, drawArc, v.v. Nhưng, canvas thực sự tự vẽ trên màn hình như thế nào?

Canvas theo hệ tọa độ để tự vẽ trên màn hình. Nó coi màn hình điện thoại là hệ thống tọa độ của riêng mình.

 Xem ảnh bên dưới để hiểu về tọa độ của nó
 ![](https://images.viblo.asia/4b969ec1-6b6d-4825-b9d9-0ba30606bbe9.png)

Ở đây thì
* Góc trên bên trái đại diện cho điểm (0,0) trong hệ tọa độ.
* và góc dưới bên phải là điểm (x,y) trong hệ tọa độ.
*  như vậy thì, điểm chính giữa của màn hình được biểu thị bằng điểm (x/2,y/2)

# Làm cách nào chúng ta có thể tạo ra thành phần UI riêng bằng API canvas?
Cho đến bây giờ, chúng ta đã tìm hiểu làm thế nào chúng ta có thể sử dụng Canvas và những yếu tố nào chúng ta cần quan tâm trong khi vẽ trên canvas. Bây giờ, hãy xem làm thế nào chúng ta thực sự có thể vẽ trên canvas.

Để vẽ một bản vẽ tùy chỉnh của riêng chúng ta, chúng ta có thể thực hiện nó trong các view class riêng. Ở đây tôi sẽ tạo CanvasView của riêng mình,

```kotlin
class CanvasView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {


   
    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        //here we have to use the canvas API to draw
    }
}
```
Như bạn có thể thấy, trong **onDraw()** chúng ta sẽ vẽ bản thiết kế của riêng mình.

Now, to draw on Canvas we need the Paint object in the view class. So to define paint,
Bây giờ, để vẽ trên Canvas, chúng ta cần đối tượng Paint trong view class. Vì vậy, để define paint,

```kotlin
private val myViewPaint =
    Paint().apply {
        isAntiAlias = true
        color = Color.BLACK
        style = Paint.Style.STROKE
    }
```
Ở đây, tôi đã khởi tạo đối tượng paint và đặt thuộc tính tùy chỉnh cho nó như là màu sắc và style để lưu trữ thông tin cần vẽ trên canvas.

> isAntiAlias - is used to make the edges smooth while drawing.

Bây giờ, hãy bắt đầu bằng cách vẽ một đường trên canvas. Trong, onDraw () tôi sẽ viết,

```kotlin
canvas?.drawLine(0f, 5f, 0f, 10f, myViewPaint)
```
Ở đây, drawLine () lấy tọa độ hai điểm và paint để tự vẽ. Trong đoạn mã trên, 0f và 5f là tọa độ x và y cho điểm đầu tiên và 0f và 10f là tọa độ cho điểm thứ hai.

Tương tự, thay vì phối hợp điểm qua, chúng ta cũng có thể sử dụng **Path()** để vẽ hình dạng tùy chỉnh.

Path được sử dụng để vẽ hình bằng cách chuyển cho chúng những việc cần làm từ điểm này sang điểm khác. Để vẽ một đường bằng cách sử dụng Path, chúng ta phải sử dụng,

```kotlin
val path = Path().apply {
    moveTo(x1, y1)
    lineTo(x2, y2)
    close()
}
canvas?.drawPath(path, myViewPaint) 
```
Ở đây, trong đoạn code trên, chúng ta đã sử dụng một path để vẽ một đường. hãy để tôi giải thích từng dòng để làm cho bạn hiểu.

* **moveTo** - cái này được sử dụng để di chuyển đầu vẽ từ điểm này sang điểm khác. Vì vậy, ở đây đầu vẽ đã chuyển đến (x1, y1).

* **lineTo** - cái này được sử dụng để vẽ một đường tới (x2, y2) từ (x1, y1). Khi chúng ta đã chuyển đến (x1, y1), đó sẽ là điểm bắt đầu của chúng ta để vẽ đường.

PS. Sử dụng Path bạn có thể vẽ bất kỳ loại hình dạng nào bạn muốn.

và bây giờ, chỉ để vẽ đường bằng cách sử dụng đường dẫn, chúng ta cần sử dụng canvas.drawPath chứ không phải canvas.drawLine như chúng ta đã sử dụng trong code trước đó.

Tương tự, để vẽ một vòng tròn, chúng tôi sử dụng

```kotlin
canvas?.drawCircle(x,y,radius,myViewPaint)
```
Trong đó x và y là tọa độ của điểm và chúng ta vượt qua bán kính của đường tròn.

Bây giờ, để vẽ cái này, cuối cùng trên màn hình, chúng ta gọi invalidate() trong onDraw của chế độ view.

Để sử dụng lớp View ở trên trong Activity, chúng ta chỉ cần sử dụng sau trong tệp XML,

```kotlin
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    <app.himanshu.playground.CanvasView
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
</LinearLayout>
```
# Kết luận
Điểm cần nhớ,
* Vì bản vẽ xảy ra trên luồng UI chính, tránh vẽ lại trong cùng một phần quá lâu.
* Đừng thực hiện nhiều phép tính trong onDraw ()
* Canvas hoạt động trên pixel và không phải dp.

Chúc các bạn thành công :D