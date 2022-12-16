# I. Dẫn nhập
* Trong bài viết này, chúng ta sẽ đi tìm hiểu về tất cả các hàm của Android Canvas. Các hàm này sẽ được chia là 4 nhóm chính:
1. Vẽ hình học
2. Vẽ văn bản
3. Vẽ màu sắc
4. Vẽ hình ảnh
* Để có những kiến thức căn bản về Android Canvas thì các bạn có thể tham khảo [bài viết](https://viblo.asia/p/tim-hieu-canvas-api-cua-android-bWrZnODnlxw) này của mình. 
* Nội dung của bài viết được tham khảo tại [đây](https://medium.com/mobile-app-development-publication/learn-all-android-canvas-draw-functions-dd5d6595884a).
# II. Nội dung chính
## 1. Vẽ hình học
### 1. drawLine
* Vẽ một đường thẳng đơn giản.
```
canvas.drawLine(startX, startY, endX, endY, paint)
```
![](https://images.viblo.asia/b85a0e1b-06dc-4f6b-9962-473dcf82ab17.png)
### 2. drawLines
* Nếu chúng ta muốn vẽ nhiều đường thẳng thì thay vì gọi *drawLine* nhiều lần, chúng ta có thể sử dụng *drawLines*. Chúng ta chỉ cần cung cấp một mảng float các giá trị tọa độ như sau:
```
canvas.drawLines(
    floatArrayOf(
        startFirstX, startFirstY, endFirstX, endFirstY,
        startSecondX, startSecondY, endSecondX, endSecondY),
    paint)
```
![](https://images.viblo.asia/17579288-9494-40f8-b396-f4c13c650a2e.png)
### 3. drawPoint
* Vẽ một điểm bất kỳ. Chúng ta cũng có thể vẽ một điểm bằng cách vẽ một đường thẳng có tọa độ bắt đầu và tạo độ kết thúc trùng nhau.
```
canvas.drawPoint(coordinateX, coordinateY, paint)
```
### 4. drawPoints
* Vẽ nhiều điểm tương ứng với mảng float tọa độ.
```
canvas.drawPoints(
    floatArrayOf(
        startX, startY,
        startSecondX, startSecondY),
    paint)
```
### 5. drawRect
* Vẽ một hình chữ nhật sử dụng tọa độ hoặc *Rect* class.
```
canvas.drawRect(
    Rect(startX, topY, endX, bottomY), 
    paint)
```
![](https://images.viblo.asia/f0382d82-9206-4261-87de-909627dfbd6e.png)
### 6. drawRoundRect
* Vẽ hình chữ nhật có các cạnh bo góc. Hàm này tương tự như *drawRect* nhưng có thêm *radiusX* và *radiusY* để định nghĩa độ cong của các cạnh.
```
canvas.drawRoundRect(rect, radiusX, radiusY, projectResources.paint)
```
* Nó sẽ vẽ một góc tròn đều nếu radiusX = radiusY
![](https://images.viblo.asia/7623adf4-023e-4836-b807-e9b19f459166.png)
* Khi radiusX = radius, nó sẽ có các góc tròn bình thường như bên dưới:

![](https://images.viblo.asia/aa82e2c7-25d6-4b6f-9c08-ff5e0b11815c.png)

* Nếu radiusX > radiusY, nó sẽ như sau:

![](https://images.viblo.asia/c2d585c8-591e-4743-b284-d29cb4ee7c50.png)

* Nếu radiusX < radiusY, nó sẽ như sau:

![](https://images.viblo.asia/20798145-ba04-48df-8eb8-bf4291b8ce64.png)

### 7. drawCircle
* Vẽ một đường tròn với tọa độ tâm và bán kính.
```
canvas.drawCircle(
    centerCoordinateX, centerCoordinateY,
    radius,
    paint)
```
![](https://images.viblo.asia/5f56e415-a101-4e16-8d2e-21db8713a5b8.png)
### 8. drawOval
* Không giống như vẽ đường tròn, chúng ta sẽ không cung cấp bán kính, thay vào đó chúng ta sẽ cũng cấp *Rect* và hình bầu dục sẽ được vẽ tương ứng.
```
canvas.drawOval(rect, paint)
```
![](https://images.viblo.asia/a92edac2-9227-4301-a20d-47db7d9fcae0.png)
### 9. drawArc
* Vẽ một vòng cung sử dụng cơ chế tương tự như vẽ một hình bầu dục: sử dụng *Rect*. Nó sẽ có thêm các tham số như: *startAngle*, *sweepAngle* và *useCenter*.
```
canvas.drawArc(rect, startAngle, sweepAngle, useCenter, paint)
```
* Với *startAngle*, điểm bắt đầu là tâm giữa cuối của *Rect* theo chiều kim đồng hồ (0 độ). *sweepAngle* được tính toán từ *startAngle*. *useCenter* là biến *Boolean* để xác định xem cung có kết nối với tâm hay không. 

![useCenter = false](https://images.viblo.asia/29e7f256-e46b-4d43-a429-b43877b22d2c.png)

![useCenter = true](https://images.viblo.asia/6ddbe2c6-c030-4a92-a8d9-4b6aae0339a3.png)

### 10. drawPath
* Để vẽ một thứ gì đó không bị giới hạn bởi các đường hình học thông thường thì chúng ta sẽ sử dụng *drawPath*. *Path* là một đối tượng chứa các đường mà chúng ta muốn vẽ. Nó bao gồm các chức năng như *moveTo* và *lineTo*, giống như vẽ và di chuyển bằng bút chì.
```
val path = Path()
path.moveTo(startX, topY)
path.lineTo(endX, bottomY)
path.moveTo(startX, bottomY)
path.lineTo(endX, topY)
canvas.drawPath(path, paint)
```
![](https://images.viblo.asia/5617a924-8607-4a0e-b934-2f145533369a.png)
### 11. drawVertices
* Đây là một hàm tương đối phức tạp, nó vẽ các hình tam giác hoặc các đỉnh với các điểm cực tiểu. Ví dụ: với sáu tọa độ, chúng ta có thể vẽ bốn hình tam giác.

![](https://images.viblo.asia/9967cadf-6589-4257-9542-c54fc739ebad.png)

* Khi được lặp lại, nó có thể được sử dụng để tạo mô hình 3D phức tạp. Hình  dưới đây (một bông hồng 3D) được vẽ bằng *drawVertices*

![](https://images.viblo.asia/0459df83-727f-442e-8359-5c566d6268db.gif)

## 2. Vẽ văn bản
### 1. drawText
* Chúng ta thường sử dụng *TextView* để hiện thị văn bản, tuy nhiên nếu chúng ta muốn kiểm soát văn bản tốt hơn, chẳng hạn như thay đổi động, định vị chính xác... thì *drawText* rất hữu ích.
```
canvas.drawText(text, coordinateX, coordinateY, paintText)
```
### 2. Vẽ StaticLayout
* *drawText* có nhược điểm là không tự động căn chỉnh khi nội dung dài hơn một dòng và nó cũng không thể xử lý ký tự xuống dòng *\n*. Do đó, chúng ta cần *StaticLayout* để vẽ văn bản và xử lý xuống dòng khi cần thiết.
* Bản chất của *StaticLayout* không phải là một hàm để vẽ của *canvas*, nhưng thay vì đó, nó sẽ tự vẽ chính nó vào *canvas*:
```
val staticLayout =
    StaticLayout.Builder.obtain(
        TEXT, 0, TEXT.length, textPaint, width
    ).build()

canvas.save()
canvas.translate(coordinateX, coordinateY)
staticLayout.draw(canvas)
canvas.restore()
```
![](https://images.viblo.asia/4e39e429-801d-4f73-8e6a-7b69d070a2fb.png)
### 3. drawPosText
* Cho phép đặt các ký tự ở các vị trí xác định. Như ví dụ ở hình dưới, các chữ cái của *fly* xuất hiện ở các tọa độ Y khác nhau:

![](https://images.viblo.asia/942fbf7f-9f12-496c-abfc-4c91f1a6dce9.png)

```
val posArray = listOf(x1, y1, x2, y2, x3, y3 ...).toFloatArray()
canvas.drawPosText(TEXT, startIndex, endIndex, posArray, paint)
```
* Số lượng các điểm tọa độ được cung cấp ít nhất phải bằng với các chữ cái được vẽ, nếu không sẽ bị lỗi.
### 4. drawTextOnPath
* Chúng ta có thể đặt văn bản dọc theo *path* được cung cấp. Vị trí x và y có liên quan đến vị trí của *path* đã cho.
```
canvas.drawTextOnPath(TEXT, path, x, y, paint)
```

![](https://images.viblo.asia/907c7ea7-ac2e-4273-8b74-111c5395c588.png)

### 5. drawTextRun
* Hàm này thường không sử dụng với tiếng Anh. Nó chỉ được áp dụng cho ngôn ngữ có các chữ cái được vẽ khác nhau phụ thuộc vào khả năng hiển thị của các chữ cái xung quanh.
* Ví dụ, hình ảnh dưới đây có hai dòng gồm hai chữ cái. Hai chữ cái ở cả hai dòng là giống nhau. Tuy nhiên, chúng được viết khác nhau. Trong dòng đầu tiên, nó là một phần của một từ lớn hơn, trong khi dòng thứ hai là hai chữ cái riêng lẻ.

![](https://images.viblo.asia/ebe135ee-38f4-454e-9bdd-f28354c9dd72.png)

## 3. Vẽ màu sắc
### 1. drawRGB
* Vẽ màu sắc cho *canvas*. Hàm này thường được dùng để cài đặt màu nền.
```
canvas.drawRGB(red, green, blue)
// Each is between 0 and 255, where 0 is not there, and 255 is full.
// When alpha is 255, it is opaque, and 0 is transparent.
```
### 2. drawARGB
* Tương tự như drawRGB, hàm này bổ sung khả năng làm trong suốt màu sắc.
```
canvas.drawARGB(alpha, red, green, blue)
// When alpha is 255, it is opaque, and 0 is transparent.
```
* Điều này rất hữu ích để đặt màu phía trước và làm mờ mục phía sau.

![Hình gốc](https://images.viblo.asia/feeb1f04-3956-4e2e-8b00-75d32845e705.png)

![Hình ảnh mờ màu đỏ nửa trong suốt](https://images.viblo.asia/26fbeffc-677f-4c74-ae3a-fc8df88ec4dc.png)
### 3. drawColor
* Hàm này đước sử trong trường hợp chúng ta muốn sử dụng màu từ *resource* thay vì đặt màu *ARGB*.
```
canvas.drawColor(context.getColor(R.color.colorPrimary))
```
### 4. drawPaint
* Đôi khi, chúng ta thích vẽ những màu sắc huyền ảo hơn thì thay vì sử dụng *ARGB* hoặc *resource color*, chúng ta có thể tạo một đối tượng *Paint*.
```
val gradientPaint by lazy {
    Paint().apply {
        shader = RadialGradient(
            width/2f,
            height/2f,
            height/2f,
            Color.GREEN,
            Color.RED,
            Shader.TileMode.MIRROR
        )
    }
canvas.drawPaint(gradientPaint)
```
![](https://images.viblo.asia/3980c0aa-e572-4d3d-a985-afbcd7c8d6fb.png)
## 4. Vẽ hình ảnh
### 1. drawBitmap
* Hàm này dùng để vẽ *bitmap* vào *canvas*.
```
private val bitmap by lazy {
    BitmapFactory.decodeResource(resources, R.drawable.image)
}
canvas.drawBitmap(bitmap, sourceRect, destRect, paint)
```
* Các tham số cần thiết là *bitmap* và *destRect*:

_ *bitmap* có thể lấy từ *resource*.

_ *destRect* là vùng hình chữ nhật của *canvas* để vẽ vào.

* Các tham số tùy chọn gồm *sourceRect* và *paint*:

_ *sourceRest* là vùng hình chữ nhật đại diện cho tập hợp con của hình để vẽ. Khi nó *null* thì toàn bộ hình ảnh sẽ được sử dụng.

_ *paint* có thể *null* và *Bitmap* vẫn được vẽ như bình thường. Nó rất hữu ích nếu chúng ta muốn tạo một lớp phủ với hình khác.
### 2. drawPicture
* Nếu chúng ta có nhiều thứ cần vẽ và điều này xảy ra nhiều lần và chúng ta không muốn quá trình xử lý chậm và phải vẽ lại chúng mỗi lần, chúng ta có thể đưa toàn bộ bản vẽ của mình vào *Picture*.
* Dưới đây là một ví dụ đơn giản, chúng ta lưu bản vẽ của mình thành một *Picture*
```
private val picture by lazy {
    val picture = Picture()
    val pCanvas = picture.beginRecording(width, height)
    pCanvas.drawBitmap(bitmap, null, rect, null)
    picture.endRecording()
    picture
}
```
* Khi cần thiết chỉ cần gọi
```
canvas.drawPicture(picture)
```
* Điều này sẽ đẩy nhanh toàn bộ quá trình vẽ của chúng ta cho những thứ cần phải vẽ đi vẽ lại nhiều lần.
###  3. drawBitmapMesh
* Đây là thao tác với hình ảnh *bitmap* đã được vẽ. Với một hình ảnh đã cho, chúng ta có thể đặt tọa độ bên trong hình ảnh và dịch một điểm đến một vị trí khác, do đó sẽ biến đổi hình ảnh của nó.
* Ví dụ hình ảnh dưới đây với tâm X, Y được hiển thị trong mặt cắt ngang đường trắng.

![](https://images.viblo.asia/cd34fd26-ad2d-422f-9d43-eb32516d8156.png)

* Tuy nhiên, sử dụng *drawBitmapMesh*, chúng ta có thể thay đổi tọa độ và biến đổi hình ảnh cho phù hợp.

![](https://images.viblo.asia/be8cefc2-926b-4c83-a57f-ca0f59ba17d6.png)
# III. Kết
* Hy vọng với bài viết này, các bạn sẽ có thêm những hiểu biết về Android Canvas và áp dụng nó trong thực tiễn.