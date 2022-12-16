# I. Canvas API là gì?
* Canvas API là một framework dùng để vẽ, giúp cho chúng ta vẽ ra các thiết kế tùy chỉnh như đường nét, vòng tròn hoặc thậm chí là cả một hình chữ nhật. Chúng ta có thể vẽ ra bất kỳ hình dạng nào với Canvas.

* Hành động vẽ Canvas xảy ra trong Bitmap – nơi chúng ta sẽ vẽ phác thảo và sau đó Paint API sẽ tô màu và tạo ra bất kỳ phong cách nào mà chúng ta cần.

> Canvas giúp tạo ra khung sườn và Paint giúp làm đẹp thiết kế.

* Bài viết được tham khảo tại [đây](https://blog.mindorks.com/understanding-canvas-api-in-android)
# II. Hiểu hoạt động của Canvas
* Sẽ có 3 phương thức được gọi khi chúng ta tiến hành tạo ra custom view:

![](https://images.viblo.asia/87666218-1fbb-4407-b84d-d7bda7c19f26.png)

- onMeasure() sẽ đo kích thước của view và các thành phần hiện thị.
- onLayout() giúp cài đặt kích thước
- onDraw() giúp chúng ta vẽ lên view.

* Trong onDraw(), canvas được sử dụng để vẽ bằng cách phương thức hỗ trợ sẵn như: drawLine, drawArc... Nhưng làm cách nào để Canvas có thể vẽ chính xác trên màn hình?

* Canvas sử dụng hệ thống tọa độ để vẽ trên màn hình. Nó coi màn hình thiết bị như là một hệ thống tọa độ của chính nó.

![](https://images.viblo.asia/6cb6359c-92c5-4fc3-a427-42043fa45ba9.png)

- Điểm ở bên trái trên cùng là điểm (0,0) trong hệ thống tọa độ.
- Điểm ở dưới cùng bên phải là điểm (x,y) trong hệ thống tọa độ.
- Điểm ở chính giữa màn hình sẽ có tọa độ là (x/2, y/2)

# III. Cách thực hiện Canvas
* Chúng ta sẽ tiến hành vẽ trên view:

```
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
* Trong phương thức onDraw(), chúng ta sẽ vẽ ta thiết kế của mình. Chúng ta cần định nghĩa một đối tượng Paint trong view và cài đặt các thuộc tính cần thiết như màu sắc và kiểu vẽ:
```
private val myViewPaint =
    Paint().apply {
        isAntiAlias = true
        color = Color.BLACK
        style = Paint.Style.STROKE
    }
```
> isAntiAlias được dùng để tạo ra các cạnh sắc nét khi vẽ.
* Trong phương thức onDraw(), chúng ta sẽ tiến hành vẽ 1 đường thẳng:

```
canvas?.drawLine(0f, 5f, 0f, 10f, myViewPaint)
```

* Phương thức drawLine() sẽ cần 2 cặp tọa độ và đối tượng paint để vẽ. Trong đoạn code trên, 0f và 5f là tọa độ x và y của điểm đầu và 0f và 10f là tọa độ của điểm kết thúc. 
* Tương tự như vậy, bằng cách sử dụng tạo độ, chúng ta cũng có thể sử dụng Path() để vẽ một hình bất kỳ. Để vẽ một đường thẳng bằng Path, chúng ta sẽ làm như sau:
```
val path = Path().apply {
    moveTo(x1, y1)
    lineTo(x2, y2)
    close()
}
canvas?.drawPath(path, myViewPaint)
```
- moveTo() – được sử dụng để di chuyển đầu vẽ từ điểm này qua điểm khác.
- lineTo() – được sử dụng để vẽ một đường thằng từ (x1, y1) tới (x2, y2)

* Để vẽ một hình tròn, chúng ta sẽ làm như sau:

```
canvas?.drawCircle(x,y,radius,myViewPaint)
```

- Với x và y là tọa độ và bán kính của đường tròn. 
* Sau khi vẽ xong, chúng ta sẽ gọi phương thức invalidate() trong onDraw() của view. Để sử dụng View đã vẽ ở trên, chúng ta chỉ cần khi báo trong xml:
```
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    <app.himanshu.playground.CanvasView
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
</LinearLayout>
```
* Các điểm cần lưu ý:
- Hoạt động vẽ sẽ chạy trên UI main thread nên cần tránh thực hiện các thao tác quá lâu.
- Không thực hiện quá nhiều tính toán trong onDraw()
- Canvas làm việc với px không phải là dp.