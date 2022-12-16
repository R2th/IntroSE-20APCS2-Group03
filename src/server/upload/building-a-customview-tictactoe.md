Đây là bài viết về việc làm thế nào để xây dựng một TicTacToe Custom View trong Android. Bài viết này sẽ cố gắng bao quát:
1. Drawing on canvas.
2. Handling Touch.
3. Animating on canvas.

## 1. Drawing on canvas
Custom views - Là quá trình tạo các view của riêng bạn bằng cách kế thừa các views có sẵn ví dụ lớp Button hoặc kế thừa lớp View.

### Why?
Quá trình xây dựng các custom views hoặc viewGroups không phải luôn luôn là cần thiết. Nhưng ở đây có một vài lý do tốt nên thực hiện:
1. Để xây dựng cái gì đó thực sự ngầu(animation hoặc UI) cái hiện tại không được cung cấp bởi các widgets chuẩn.
2. Tổ chức thành các modun hoặc một thành phần có thể tái sử dụng.
3. Tăng hiệu năng. Tránh cho kiến trúc view lồng nhau quá sâu bởi quá trình tạo các view phẳng hoặc hỗn hợp.

### Things required
Các thành phần mà chúng ta sẽ cần:
1. [Canvas](https://developer.android.com/reference/android/graphics/Canvas.html): lớp canvas nắm giữ các lời gọi "draw" và cuối cùng viết nó lên một bimap cái là kết quả cuối cùng được hiển thị. Nó hoạt động trên một Bitmap. Nói một cách đơn giản, nó là một lớp cái chứa các phương thức để vẽ các hình cơ bản(đường, đường tròn, vòng cung,...) và các hình phức tạp sử dụng đối tượng [Path](https://developer.android.com/reference/android/graphics/Path.html).

2. [Paint](https://developer.android.com/reference/android/graphics/Paint.html): Nó nói với canvas làm thế nào để vẽ. Style, colour, những thứ liên quan tới chữ(font, textSize,...). Hình dung nó như là một cây cọ sơn cái bạn có thể sử dụng để chọn màu sắc từ bảng màu sắc.

3. [Path](https://developer.android.com/reference/android/graphics/Path.html): để vẽ các hình hình học phức tạp(Chúng ta sẽ không sử dụng nó).

4. [Bitmap](https://developer.android.com/reference/android/graphics/Bitmap.html): Nắm giữ các Pixel. Một đối tượng bao bọc đơn giản cho tập hợp các pixels(Chúng ta sẽ sử dụng nó một các gián tiếp).

Quá trình vẽ bắt đầu với một canvas nhưng làm thế nào chũng ta sẽ lấy được canvas của mình? Phần này là đơn giản. Chúng ta sẽ lấy các canvas của mình bằng các kế thừa lớp View và ghi đè lại phương thức ***onDraw(canvas: Canvas)***.

Chúng ta lấy được Canvas của mình, giờ đây chúng ta sẽ xem xét làm thế nào để di chuyển canvas của mình.

### Navigating the Canvas
Đây là làm thế nào canvas của chúng ta sẽ được nhìn thấy ở đồ thị trên giấy.

<div align="center"><img src="https://images.viblo.asia/0ec6c361-4123-4faa-b76b-d7796a052efb.png" /></div>

1. Vị trí của Custom View là không quan trọng bên trong lớp cha.
2. Tọa độ Top-Left  của một view sẽ luôn tại (0, 0).
3. X tăng theo chiều qua phải.
4. Y tăng theo chiều xuống dưới.

Bây giờ để vẽ một cái gì đó trên canvas chúng ta cần một đối tượng [Paint](https://developer.android.com/reference/android/graphics/Paint.html). Nó là cái cơ bản nói rằng làm thế nào để vẽ.

Một điều quan trọng nhằm tránh đối tượng được chỉ định bên trong phương thức **onDraw()** bởi vì nó được gọi rất nhiều lần và điều này sẽ ảnh hưởng tới hiệu năng.

Mỗi khi chúng ta cần vẽ lại custom view của mình chúng ta sẽ gọi **invalidate()** hoặc **invalidate(Rect rect)**. Sau đó chỉ gọi invalidate trên vùng hình chữ nhật được cung cấp và lưu lại bởi các vòng đời CPU.

### Drawing TicTacOe Lines
Chúng ta tạo đối tượng Paint của mình bên ngoài hàm **onDraw()** và thiết lập các thuộc tính cơ bản. Đối tượng này sẽ được sử dụng cho qua strinfh vẽ các dòng nằm ngang và dọc của view.

```
private val paint = Paint()paint.color = ContextCompat.getColor(context, R.color.colorPrimary) paint.isAntiAlias = true 
paint.style = Paint.Style.STROKE 
paint.strokeWidth = resources.displayMetrics.density * 5//line width
```

Chúng ta đã hardcode **paint.strokeWidth** của mình thành 5 dựa trên mật độ điểm ảnh của thiết bị. Nhưng điều này sẽ được truyền qua một thuộc tính trong phần tiếp theo.

Quá trình vẽ một dòng trên canvas là khá đơn giản. Chúng ta phải truyền các tọa độ của điểm bắt đầu/dừng lại của mình. Tham số cuối là đối tượng **paint** của chúng ta cái chúng ta đã tạo ở bên trên.

```
drawLine(float startX, float startY, float stopX, float stopY, Paint paint)
```

Giờ đây, chúng ta chỉ phải tìm kiểm các tọa độ bắt đầu/dừng lại bên trong view của mình. Chúng ta biết độ cao/độ rộng(thông qua getHeight()/getWidth()) của view. Các dòng nằm dọc này sẽ phân chi aview thành ba phần bằng nhau. Quá trình sử dụng cái này chúng ta có thể tính toán các tọa độ của mình cho các dòng.

<div align="center"><img src="https://images.viblo.asia/20422a92-dd76-4e86-a479-a083d76d268c.jpeg" /></div>

Logic tương tự được sử dụng cho quá trình vẽ các dòng nằm ngang. Kiểm tra code bên dưới.

Phần giải thích sẽ được bỏ qua. Cuối cùng để vẽ các dòng này chúng ta gọi các phương thức này bên trong **onDraw()**

```
...
override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)
    drawVerticalLines(canvas)
    drawHorizontalLines(canvas)
}
```

### Define Individual Square Sections inside(Định nghĩa các phần hình vuông độc lập bên trong).
Giờ đây chúng ta phải phân chia view thành 9 hình vuông bởi vì chúng sẽ phải hành xử như những phần cá nhân riêng rẽ giống như một button bên trong một view cha.

<div align="center"><img src="https://images.viblo.asia/29233220-3faf-492c-b793-6b3fc9b9c6f1.png" /></div>

1. Có 9 phần hình vuông nơi text của chúng ta(X hoặc O) có thể xuất hiên khi user chạm vào chúng.
2. Chúng ta sẽ sử dụng [Rect](https://developer.android.com/reference/android/graphics/Rect.html) nhằm lưu lại tọa độ của 9 hình vuông trong một mảng hai chiều. Sau đó chúng ta sẽ sử dụng nó để định danh nơi mà user đã chạm vào.
3. Chúng ta cũng sẽ sử dụng rects bên trong mảng của mình nhằm căn giữa text(X hoặc O) bên trong chúng.

Để hiểu Rect là cái gì, xem thêm ở [đây](https://developer.android.com/reference/android/graphics/Rect.html).

```
Rect nắm giữ bố tọa độ integer cho một hình vuông. Hình vuông được đại diện
bởi tọa độ của 4 đỉnh của nó(trái, phải, trên, dưới). 
```

```
Rect(int left, int top, int right, int bottom)
```

Đây là làm thế nào để bạn tạo một Rect. Nó chỉ nắm giữ 4 tọa độ của hình vuông/hình chữ nhật của bạn và cung cấp các phương thức cái sẽ giúp cuộc sống của bạn trở nên dễ dàng hơn. Giống như phương thức này.

```
boolean contains(int x, int y) // passed coordinates are inside our //rectangle or not
```

Chúng ta sau đó sẽ sử dụng phương thức bên trên để tìm ra nơi user đã chạm vào hình chữ nhật của mình hoặc hình chữ nhật nào anh ta đã chạm vào trong view của chúng ta.

Một mảng nhằm lưu Rects và một cái khác để lưu giá trị (X hoặc O) của Rects đó. [Kotlin multidimensional arrays](https://discuss.kotlinlang.org/t/multi-dimensonal-arrays-are-a-pain-point-in-kotlin/561) là các Pain Points. Đoạn code trên chúng ta chỉ đơn giản khởi tạo và tính toán arryas của mình với các giá trị. Các giá trị bên trong của vòng lặp được tính toán dựa trên image ở bên [trên](https://images.viblo.asia/29233220-3faf-492c-b793-6b3fc9b9c6f1.png).

### Drawing text inside Square Sections
Giờ đây công việc tiếp theo là vẽ chữ "**X**" hoặc "**O**" bên trong mỗi ô vuông trong view của chúng ta. Chúng ta đưa rect đầu tiên từ array của mình và thử vẽ chữ vào trung tâm(giữa) của nó. Như vậy, chúng ta tìm được các tọa độ trung tâm(**rect.exactCenterX()** và **rect.exactCenterY()**) của rect một cách dễ dàng và truyền nó tới phương thức **drawText()**.

```
drawText(String text, float x, float y, Paint paint)
```

```
 private fun drawTextInsideRectangle(canvas: Canvas, rect: Rect, str: String) {
        val textX = (rect.exactCenterX())
        val textY = (rect.exactCenterY())
        canvas.drawText(str, textX, textY, textPaint)
    }
```

Chúng ta sẽ gọi phương thức **drawTextInsideREctangle(rect)** của mình khi chúng ta xác định được có sự kiện touch lên trên rect đó nhưng với mục đích testing nó bây giờ, chúng ta sẽ hardcode và truyền rect đầu tiên từ array cua rmifh và gọi nó bên trong **onDraw(canvas: Canvas)**.

```
override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)
    drawVerticalLines(canvas)
    drawHorizontalLines(canvas)
    drawTextInsideRectangle(canvas, squares[0][0], "X")
}
```

<div align="center"><img src="https://images.viblo.asia/301ae471-a95a-486c-8a3d-011911504c1d.png" /></div>

Cái này không nằm ở giữa của rect đầu tiên. Điều gì không đúng đã xảy ra? Quá trình vẽ chữ là một thử thách nhỏ bởi vì cách thức nó được vẽ bởi canvas.

### How the text gets drawn
<div align="center"><img src="https://images.viblo.asia/0a45ca25-b593-4c1f-a5c3-ad618b849281.png" /></div>

1. Canvas đối xử với các tọa độ X, Y được truyền qua như là tọa độ của điểm left/bottom của chữ chứ không vẽ tại trung tâm của nó. Xem điểm màu xanh.
2. Có vẻ như chữ được vẽ bottom-up(từ dưới lên) từ tọa độ được truyền vào.
3. Nhằm điều chỉnh điều này chúng ta sẽ phải đưa một nửa kí tự xuống bên dưới điểm màu xanh và một nửa chữ từ bên phải qua bên trái của điểm màu xanh. Chúng ta sẽ thực hiện điều này bằng cách tính toán chiều rộng/cao của kí tự của mình.

<div align="center"><img src="https://images.viblo.asia/5b4963b0-d1cf-4713-80da-b8de943947cc.png" /></div>

1. **Paint.measureText()** tính toán độ rộng của text.
2. **Paint.fontMetrics.ascent** trả về chiều cao của text bên trên baseline. Xem hình bên trên.

```
 private fun drawTextInsideRectangle(canvas: Canvas, rect: Rect, str: String) {
        val xOffset = textPaint.measureText(str) * 0.5f
        val yOffset = textPaint.fontMetrics.ascent * -0.4f
        val textX = (rect.exactCenterX()) - xOffset
        val textY = (rect.exactCenterY()) + yOffset
        canvas.drawText(str, textX, textY, textPaint)
    }
```

Sau quá trình điều chỉnh này, chữ của chúng ta sẽ được trình bày ở giữa của rect. Kiểm tra kết quả bên dưới.

<div align="center"><img src="https://images.viblo.asia/e65e9304-044a-4170-b4de-6b2d3c3765d4.png" /></div>

Bạn có thể xem toàn bộ project ở [đây](https://github.com/krishansharma91/TicTacToe?source=post_page-----6afa054df928----------------------).

## 2. Handling Touch
Trong phần trước chúng ta đã vẽ chữ vào bên trong ô vuông đầu tiên. Thực tế, chúng ta có thể vẽ text bên trong bất cứ ô vuông nào chúng ta cần, chúng ta chỉ phải chọn phần tử đúng từ mảng ô vuông của mình rồi truyền vào phương thức **drawTextInsideRectangle()**. Để thực hiện điều đó chúng ta cần xác định vùng touch của mỗi phần ô vuông riêng biệt.

Trước đó hãy đọc một chút về Android Touch System.

### Understanding Basics of Android Touch Event System
<div align="center"><img src="https://images.viblo.asia/b59eabbc-b7be-44bf-a528-ad327d0bc552.png" /></div>

Ở hình bên trên, khi người dùng touches vào View nó bắt đầu một luồng sự kiện touch cái được bao bọc như là một đối tượng **[MotionEvent](https://images.viblo.asia/b59eabbc-b7be-44bf-a528-ad327d0bc552.png)**. Đối tượng này có thông tin về vị trí touch, event action, number of pointers, event time, pressure, vv,.... Chúng ta chỉ quan tâm tới action và location ở đây.

<div align="center"><img src="https://images.viblo.asia/fabe1b58-1463-413e-8f3e-6f386b5ddab8.png" /></div>

1. Giờ đây, luồng sự kiện touch xảy ra trong hai pha. Trong pha đầu tiên, mỗi một giới hạn của một cái nào đó chứa tọa độ điểm touch được thông báo về sự kiện touch. Điều này bắt đầu tại Activity và các luồng từ trên xuống thông qua views hoặc viewGroups. Để sử lý sự kiện down chúng ta gọi phương thức **dispatchTouchEvent()**.
2. Luồng sự kiện có thể bị phá vỡ bởi bất cứ ai sử dụng **onInterceptTouchEvent()**(chỉ phải trả về **true**) khi chúng ta đang được thông báo về nó.
3. Giờ đây, khi cuối cùng luồng đạt được view mục tiêu, nó nhận được thông báo. Nếu người dùng triển khai **OnTouchListener.OnTouch()**, đây là nơi nó được xử lý ngoại trừ nó đi đến **onTouchEvent** của view đó. Từ view mục tiêu này pha xử lý được bắt đầu.
4. Nếu **onTouchEvent()** trả về **true** cho bất cứ sự kiện touch, thì luồng dừng lại ở đây. Điều này là cái chúng ta sẽ thực hiện, ghi đè **onTouchEvent()** và trả về **true** bên trong custom view của chúng ta.
5. Nếu view mục tiêu không xử lý sự kiện touch. Ví dụ trả về **false** từ **onTouchEvent()** thì quá trình xử lý luồng bắt đầu từ dưới lên trên, tất các các views từ dưới lên trên nhận được một cơ hội để xử lý nó một cách đề qui. Nếu không ai xử lý nó, activity nhận được cơ hội này nhằm xử lý nó và rồi xử lý quá trình dừng lại luồng ở đây.
6. Nếu bạn cần xem chi tiết hãy kiểm tra link [này](https://speakerdeck.com/newcircle/dave-smith-mastering-the-android-touch-system).

```
override fun onTouchEvent(event: MotionEvent): Boolean {
    val x = event.x 
    val y = event.y 
    when (event.action) { 
        MotionEvent.ACTION_DOWN -> {
   
        }
        MotionEvent.ACTION_MOVE -> {
 
        }
        MotionEvent.ACTION_UP -> {         

        }
        MotionEvent.ACTION_CANCEL -> {
         
        }

    }
    return true
}
```

1. **event.x** và **event.y** là các tọa độ điểm touch. Cái này gửi đến chúng ta thông tin touch cuối cùng.
2. một "**gesture**" bắt đầu với **ACTION_DOWN** và kết thúc với **ACTION_UP**.
3. **ACTION_DOWN**: Cái được gọi khi người dùng lần đầu tiên đặt ngón tay của họ vào màn hình. Tương tự **x**, **y** là tọa độ của điểm được touch. Đây là điểm bắt đầu của một gesture.
4. **ACTION_MOVE**: Cái được gọi khi người dùng bắt đầu di chuyển ngón tay của anh ta trên màn hình. Điều này sẽ được gọi nhiều lần và gửi tới bạn tọa độ **x**, **y** cuối cùng. Chúng ta không cần đến nó.
5. **ACTION_UP**: Cái được gọi khi người dùng bỏ tay của họ ra khỏi màn hình. Tọa độ **x**, **y** sẽ được gửi tới bạn là tọa độ nơi anh ta bỏ tay ra khỏi. Đây là điểm của cùng của một gesture.
6. **ACTION_CANEL**: Cái này được gọi khi view cha chiếm hữa sự kiện. Giống như khi chúng ta bắt đầu touch gesture trên một view bên trong **RecyclerView** nhưng thay vì sự kiên click, chúng ta bắt đầu một quá trình scroll. Điều này cũng có thể là điểm cuối cùng và ở đây chúng ta sẽ phải thiết lập lại mọi thứ và hành xử như thể gesture không bao giờ xảy ra.

**Note**: Để đơn giản, chúng ta đang nói về đối tượng touch là ngón tay nhưng nó có thể là bất cứ cái này: mouse, pen, finger, trackball,....

Nếu chúng ta trả về **false** từ **ACTION_DOWN** thì không sự kiện tương tác nào nhận được nữa.

### Detecting and Highlighting the Touched Rectangle
Chúng ta nhận được tọa độ(**x**, **y**) của sự kiện touch xảy ra trên **ACTION_DOWN**, chúng ta chỉ phải tìm trong mảng ô vuông của mình cái là ô vuông hiện tại được touched hoặc nói theo cách khác là tọa độ của ô vuông hiện tại.

Chúng ta duyệt mảng ô vuông(mảng rects) cái chúng ta đã lưu lại lúc trước và chúng ta kiểm tra xem liệu tọa độ **x**, **y** có nằm bên trong nó( **rect.contains(x, y)**). Nếu chúng ta tìm thấy một cái, chúng ta trả về một **[Pair](https://developer.android.com/reference/android/util/Pair.html)** của chỉ số cho ô vuông đó.

```
fun getRectIndexesFor(x: Float, y: Float): Pair<Int, Int> {
        squares.forEachIndexed {
            i, rects ->
            for ((j, rect) in rects.withIndex()) {
                if (rect.contains(x.toInt(), y.toInt()))
                    return Pair(i, j)
            }
        }
        return Pair(-1, -1) // x, y do not lie in our view
    }
```

Chúng ta sẽ sử dụng phương thức ở bên trên trong **ACTION_DOWN**.

Chúng ta cũng sẽ sử dụng một biến toàn cục **touching** nhằm xác định liệu người dùng đang touch và màn hình hay không? Một khi anh ta bỏ tay ra khỏi màn hình, chúng ta sẽ thiết lập nó thành **false**, kiểm tra **ACTION_UP** được cung cấp bởi mã nguồn ở bên dưới. Chúng ta lưu vị trí ô vuông được touched của mifnhv à rồi gọi phương thức **invalidate(rect: Rect)** nhằm cho view biết thời điểm để nó vẽ lại. Chú ý rằng chúng ta đang truyền một vùng rect như một tham số do đó nó vùng đó chỉ được vẽ lại.

Tại sao chúng ta cần vẽ lại? Đó là bởi vì chúng ta sẽ làm nổi bật ô vuông được chọn trong suốt quá trình **touching = true**.

```
var rectIndex = Pair(0, 0)
var touching: Boolean = false
..
..
MotionEvent.ACTION_DOWN -> {
    rectIndex = getRectIndexesFor(x, y)
    touching = true
    invalidate(squares[rectIndex.first][rectIndex.second])
}
MotionEvent.ACTION_UP -> {
    touching = false
    invalidate(squares[rectIndex.first][rectIndex.second])
}
..
```

Bây giờ, bên trong **onDraw()** khi chúng ta lấy được **touching** là **true** chúng ta sẽ làm nổi bật ô vuông được touched đó. Chúng ta biết ô vuông được touched bởi chúng ta đã lưu lại chỉ số của nó trong **rectIndex**. **rectIndex.first** và **rectIndex.second** trả về chỉ số hàng và cột của ô vuông được touched tương ứng.

```
..
     highLightPaint.color = ContextCompat.getColor(context, R.color.highlight_color)
     highLightPaint.style = Paint.Style.FILL
     highLightPaint.isAntiAlias = true
 ..
 
 override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        drawVerticalLines(canvas)
        drawHorizontalLines(canvas)
        
        if (touching) {
            drawHighlightRectangle(canvas)
        }
    }
    
    private fun drawHighlightRectangle(canvas: Canvas) {
        canvas.drawRect(squares[rectIndex.first][rectIndex.second], highLightPaint)
    }
```

Chúng ta đã sử dụng **canvas.drawRect(rect, paint)** để vẽ vùng(ô vuông) được làm nổi bật. Hãy xem kết quả.

<div align="center"><img src="https://images.viblo.asia/e9faea88-c2c3-4d29-9947-27fa8e999140.gif" /></div>

Nó không phải là quá khó? Đúng không?

Phần tiếp theo là vẽ chữ(**X** hoặc **O**) bên trong ô vuông đó, nhưng đừng chờ đợi đến khi chúng ta đã sẵn sàng thực hiện điều đó? Chúng ta phải truyền rect đó bên trong **drawTextInsideRectangle(rect: Rect)** cái chúng ta đã tạo từ trước.

Đúng, đó là một phần chính xác. Khi chúng ta gọi phương thức **invalidate()**, view được vẽ lại từ đầu. Trạng thái trước đó bị mất. Phân tích đoạn code bên dưới.

```
if (touching) {
    drawHighlightRectangle(canvas)
}
```

Phần ngược lại để xóa bỏ việc highlight khi người dùng bỏ ngón tay của anh ta ra khỏi màn hình?

Điều đó là không cần thiết bởi vì khi view được vẽ lại nó sẽ mất các trạng thái trước đó và sẽ không có việc highlight được khởi tạo. Cũng chú ý rằng chúng ta cũng đang vẽ lại các đường kẻ khi phương thức **invalidate()** được gọi.

Như vậy ngay các khỉ chúng ta vẽ chữ trong một ô vuông nó sẽ bị xóa đi khi chúng ta click vào một ô khác. Vậy chúng ta cần cái gì đó để lưu lại các trạng thái đó. Nhớ rằng trước đó chúng ta đã tạo một mảng **squareData** và khởi tạo cho tất cả text trống. Chúng ta sẽ sử dụng mảng đó. Chúng ta chỉ phải làm đầy mảng đó với chữ chính xác và bên trong **onDraw**, chúng ta phải vẽ mọi thứ từ quá trình sử dụng **drawInsideRectangle(rect: Rect)** của nó.

### Registering a click and storing the state
Làm đầy mảng với chữ đúng được thực hiện xong khi một touch gesture được xác định thành công. Chúng ta đã sử dụng chức năng **getRectIndexesFor()** bên trong **ACTION_DOWN** nhằm xác định việc khởi tạo ô vuông đã được touched và bên trong **ACTION_UP** nhằm xác định ô vuông cuối cùng được touched. Nếu cả ô vuông đầu tiên và ô vuông cuối cùng là giống nhau chúng ta chỉ ra nó giống như click, ngược lại, chúng ta bỏ qua nó. Điều đó có nghĩa là khi người dùng nhấn vào ô vuông này, và di chuyển ngón tay của anh ta sang ô vuông thứ hai và rồi nhấc ngón tay đó lên, chúng ta sẽ không chỉ ra nó như là một click.

```
MotionEvent.ACTION_UP -> {
    touching = false
    invalidate(squares[rectIndex.first][rectIndex.second])
    val (finalX1, finalY1) = getRectIndexesFor(x, y)
    if ((finalX1 == rectIndex.first) && (finalY1 == rectIndex.second)) { // if initial touch and final touch is in same rectangle or not
        squarePressListener?.onSquarePressed(rectIndex.first, rectIndex.second)
    }
}
```

Phương thức **onSquarePressed()** được thực hiện bên trong activity và thông báo cho nó về sự kiện click vào một ô vuông cụ thể. Dựa vào một vài logic, activity nó với **TicTacToeView** nhằm vẽ "**X**" hoặc "**O**".

```
val moveX = "X"
val moveY = "O"
..
fun drawXAtPosition(x: Int, y: Int) {
    squareData[x][y] = moveX
    invalidate(squares[x][y])
}

fun drawOAtPosition(x: Int, y: Int) {
    squareData[x][y] = moveY
    invalidate(squares[x][y])
}
```

Hai phương thức ở bên trên được sử dụng để làm đầy các mục bên trong **squareData** và sau đó, chúng ta tiến hành vẽ lại. Cách thức này khi người dung click vào một ô vuông, thông tin đó được truyền tới activity cái lần lượt gọi đến các phương thức **drawXAtPosition** hoặc **drawOAtPosition**. Các phương thức này nhập dữ liệu vào bên trong **squareData** dựa trên chỉ số của ô được clicked và rồi gọi **invalidate()** trên ô vuông đó.

Giờ đây chúng ta chỉ phải vẽ lại các trạng thái bên trong **onDraw()**.

```
override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)
    drawVerticalLines(canvas)
    drawHorizontalLines(canvas)
    drawSquareStates(canvas) // <------- here
    if (touching) {
        drawHighlightRectangle(canvas)
    }
}
private fun drawSquareStates(canvas: Canvas) {
        for ((i, textArray) in squareData.withIndex()) {
            for ((j, text) in textArray.withIndex()) {
                if (text.isNotEmpty()) {
                    drawTextInsideRectangle(canvas, squares[i][j], text)
                }
            }
        }
    }
     // created in the previous post
     private fun drawTextInsideRectangle(canvas: Canvas, rect: Rect, str: String) {
        val xOffset = textPaint.measureText(str) * 0.5f
        val yOffset = textPaint.fontMetrics.ascent * -0.4f
        val textX = (rect.exactCenterX()) - xOffset
        val textY = (rect.exactCenterY()) + yOffset
        canvas.drawText(str, textX, textY, textPaint)
    }
```

Phương thức **drawSquareStates()** được lặp cho đến hết mảng **squareData** và vã tất cả các mục bên trong **onDraw()**.

Hãy xem kết quả.

<div align="center"><img src="https://images.viblo.asia/c7c533ec-d549-4617-bbab-ba02ee30e734.gif" /></div>

## 3. Animating on canvas
### Draw a line over three same consecutive moves
Ở những phần trước, chúng ta đã xác định được bản thân các ô vuông được touched và làm đầy chúng với các giá trị (**X** hoặc **O**) phù hợp. Bộ máy TicTacToe chăm sóc quá trình cung cấp các giá trị(**X** hoặc **O**) và xác định người chiến thằng bằng bằng quá trình xác định nước đi chiến thắng. Trong phần này, chúng ta sẽ thêm vào animation(hoạt cảnh) cho nước đi chiến thằng cái chỉ là một dòng kẻ trên 3 điểm giống nhau trong các ô vuông liên tiếp. Hãy xem xét một số mã nguồn.

```
 private val path = Path()
..
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        drawVerticalLines(canvas)
        drawHorizontalLines(canvas)
        drawSquareStates(canvas)
        if (shouldAnimate) { <--------Check Here
            canvas.drawPath(path, paint) // path is storing our line
        }
        if (touching) {
            drawHighlightRectangle(canvas)
        }
    }
    
   fun animateWin(x1: Int, y1: Int, x3: Int, y3: Int) { // will be called from activity or fragment
        winCoordinates = arrayOf(x1, y1, x3, y3) // first and last coordinate of winning line
        if (winCoordinates[0] < 0) return
        val centerX = squares[winCoordinates[0]][winCoordinates[1]].exactCenterX()
        val centerY = squares[winCoordinates[0]][winCoordinates[1]].exactCenterY()
        val centerX2 = squares[winCoordinates[2]][winCoordinates[3]].exactCenterX()
        val centerY2 = squares[winCoordinates[2]][winCoordinates[3]].exactCenterY()

        path.reset()
        path.moveTo(centerX, centerY) // moving to centre of first square
        path.lineTo(centerX2, centerY2) // creating a line till centre of last square 
        shouldAnimate = true
        invalidate();
    }
```

Chúng ta đã vẽ  một dòng kẻ ở phần trước sử dụng **canvas.drawLine()** nhưng trong phần này, chúng ta sẽ vẽ nó sử dụng **Path**. Một lý do tuyệt vời đó lf chúng ta có thể tính toán chiều dài của path một cách rất dễ dàng.

phương thức **animateWin()** được gọi bởi một activity hoặc fragment với các tham số là tọa độ của mỗi ô vuông liên quan tới nước đi chiến thắng. Trong trường hợp ảnh bên dưới, các tham số sẽ là **0**, **0**, **2**, **2**.

Đường của chúng ta đầu tiên di chuyển từ trung tâm của ô vuông thứ nhất, nơi mà chúng ta nói với Path cho tới ô vuông kết thúc. Chú ý rằng không có quá trình vẽ nào thành công, quá trình vẽ sẽ xảy ra khi chúng ta cung cấp path này cho canvas cái chúng ta đang thực thi trên nó trong phương thức **onDraw()**. Chúng ta đang gọi **invalidate()** tại nơi kết thúc. Điều này tạo một đường mà không có bất cứ animation.

### animating the Path
Để tạo hiệu ứng hoạt hình cho line của chúng ta chúng ta sẽ sử dụng hai lớp [ValueAnimator](https://developer.android.com/reference/android/animation/ValueAnimator.html) và [DashPathEffect](https://developer.android.com/reference/android/graphics/DashPathEffect.html) và chúng ta cũng sẽ phải đo đạc path của mình cái trong trường hợp của chúng ta là một line.

Quá trình đo đạc chiều dài của line cái chúng ta phải vẽ là đơn giản.

```
val measure = PathMeasure(path, false)
val lineLength = measure.length
```

**Path** đã sử dụng bên trên là cái đang giữ lời gọi vẽ line của chúng ta.

Hãy xem [DashPathEffect](https://developer.android.com/reference/android/graphics/DashPathEffect.html) một cách riêng biêt. Đúng như cái tên gợi ý nó được sử dụng để vẽ các đường nét đứt thông thường(-------).

```
Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
paint.setStyle(Style.STROKE);
paint.setColor(Color.WHITE);
paint.setStrokeWidth(1);PathEffect effects = new DashPathEffect(new float[]{1,2,4,8} ,1);
paint.setPathEffect(effects);canvas.drawLine(0, 40, mWidth, 40, paint);
```

Trong mã nguồn bên trên, mảng các số float cần là một chiều dài đủ lớn và lớn hơn hoặc bằng 2. Trong đoạn code này, nó vẽ một đường đậm có chiều dài bằng 1, rồi vẽ một khoảng trống chiều dài 2, và rồi vẽ một đường đậm chiều dài 4, và rồi vẽ chiều dài của 8 khoảng trống. Chúng ta không cần điều đó bởi vì chúng ta không cần một đường nét đứt.

Tham số cuối cùng(offset value) của DashPathEffect là thành phần chìa khóa trong animation này. 1 là khoảng bù(offset) của điểm bắt đầu. Điều đó có nghĩa là đường kẻ sẽ được vẽ sau khi bỏ qua giá trị offset đó(ở đây là 1). Với đa dạng các giá trị offset, chúng ta có thể tăng cường hoặc giảm thiểu chiều dài có thể của đường.

Nhưng trong trường hợp của chúng ta, chúng ta không cần một đường nét đứt do đó để tránh điều đó chúng ta sẽ truyền **{length, length}** như là mảng float của mình. Bằng cách này, nó không thể tạo ra một được nét đứt bởi vì thành phần mảng thứ hai sẽ không nhận được cơ hội để vẽ bởi vì thành phần thứ nhất đã là **length** của đường hoàn thiện.

Còn về offset thì sao? Cái này chúng ta sẽ phải tính toán theo một cách thức mà khi bắt đầu animation nó là **length** của path. Bởi vì nó là **length** của path ở đây nó sẽ không là bất cứ line được hiển thị. Tại lúc kết thúc animation, nó sẽ là 0 do đó toàn bộ line được hiển thị.

### Understanding the logic behind animation using DashPathEffect
Mẹo là đơn giản. Thay vì quá trình tăng chiều dài của line chúng ta sẽ giảm offset length. Điều này được giải thích bằng một sơ đò.

<div align="center"><img src="https://images.viblo.asia/79598c4d-b579-4a25-bf20-ffdbf3860db3.png" /></div>

1. Ở phía bên trái của hình, bạn có thể thấy đường phát triển từ tọa độ thứ hai hướng tới cái thứ nhất. Cái thứ nhất là tọa độ bắt đầu của path và cái thứ hai là điểm kết thúc.
2. Tại nơi bắt đầu, khi **offset** của chúng ta có giá trị là **length** của path, cái này sẽ hoàn toàn không được vẽ như được giải thích ở bên trên.
3. Tại thời điểm kết thúc khi **offset** của chúng ta là 0, toàn bộ line sẽ được vẽ.
4. Giữa những khoảng kết thúc cực đoan đó, chúng ta sẽ phải giảm thiểu **offset** của mình dựa trên một vài phương thức thời gian và cái sẽ tạo line của chúng ta trông giống như là tăng theo hướng ngược lại từ tọa độ thứ hai đến tọa độ thứ nhất.

Chúng ta cần một phương thức tính thời gian đơn giản dựa trên đó chúng ta có thể thay đổi giá trị **offset**.

Để giảm giá trị offset dựa trên thời gian chúng ta sẽ sử dụng **valueAnimator** cái sẽ đảm nhiệm việc giả các giá trị từ **1** về **0** dựa trên thời gian của animation. Lớp này là tương tự với **ObjectAnimator** cái chúng ta sử dụng để thêm hoạt hình cho các views của mình.

```
 private fun animateWin() {
        val valueAnimator = ValueAnimator.ofFloat(1f, 0f)
        valueAnimator.duration = 600
        valueAnimator.addUpdateListener(this)
        valueAnimator.start()
    }
    
override fun onAnimationUpdate(animation: ValueAnimator) {
        val measure = PathMeasure(path, false)
        val offset = (measure.length * (animation.animatedValue as Float))
        paint.pathEffect = createPathEffect(measure.length, offset)
        invalidate()
    }

    private fun createPathEffect(pathLength: Float, offset: Float): PathEffect {
        return DashPathEffect(floatArrayOf(pathLength, pathLength),
                offset)
    }
```

Trong mã nguồn bên trên **onAnimationUpdate()** sẽ được gọi nhiều lần cùng với sự giảm giá trị của **animatedValue** theo thời gian. Sử dụng **animatedValue** chúng ta đang giảm thiểu **offset** theo thời gian và tạo một **pathEffect** mới với nó. Rồi chúng ta thiết lập **pathEffect** trong **paint** cũng như gọi **invalidate()**. Điều đó dẫn tới **onDraw()** nơi line của animation frame cụ thể được vẽ.

Dưới đây là kết quả cuối cùng.

<div align="center"><img src="https://images.viblo.asia/4904530b-a917-4c8c-8b16-9fa5ae75da10.gif" /></div>

Cuối cùng, bạn có thể xem toàn bộ mã nguồn của bài viết tại [đây](https://github.com/krishansharma91/TicTacToe).

## 4. Source
https://blog.mindorks.com/building-a-customview-tictactoe-6afa054df928
https://blog.mindorks.com/building-a-customview-tictactoe-eb439f506505
https://medium.com/mindorks/building-a-customview-tictactoe-b26f6d944218

## 5. Reference
http://www.curious-creature.com/2013/12/21/android-recipe-4-path-tracing/
http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0907/3429.html