![](https://images.viblo.asia/cbcbfe44-9040-4570-ab99-cc5a44713351.png)

Hãy nhìn vào nhưng view ở trên, với nhưng `View` object có sẵn liệu chúng ta có thể làm được như vậy không? Hoặc nếu bạn làm được thì nó có dễ dàng không? Với canvas chúng ta hoàn toàn có thể xử lý được 1 cách dễ dàng vấn đề trên. Vì vậy, trong bài viết này mình sẽ chia sẻ lại những gì mình tìm hiểu được về canvas một cách dễ hiểu nhất :D

Nội dung bài viết sẽ bao gồm:
1. Giới thiệu chung về canvas
2. Một số phương thức cơ bản
3. Tìm hiểu chi tiết hơn thông qua sample

## 1. Giới thiệu chung về canvas
`Canvas` được xem như là một bền mặt 2D (hình dung như tờ giấy, bảng) mà chúng ta có thể vẽ bất cứ thứ gì lên đó. 
- Canvas cung cấp các phương thức để chuyển đổi các điểm vẽ của chúng ta thành bitmap.
- Instance của `Bitmap` class được liên kết với `View` instance và thể hiện nó ở trên UI
- Paint object chứa thông tin về kiểu và màu sắc về cách vẽ các hình học (chẳng hạn như đường thẳng, hình chữ nhật, hình bầu dục và đường dẫn), text và bitmap.

`Canvas` xác định các hình dạng mà bạn có thể vẽ trên màn hình, trong khi `Paint` xác định màu sắc, kiểu, phông chữ, v.v. của mỗi hình dạng bạn vẽ.

Khi thực hiện vẽ chúng ta sẽ lấy gốc tọa độ (0,0) ở góc trên bên trái của màn hình như hình ảnh ở bên dưới.

![](https://images.viblo.asia/08041b09-a9ad-4f0c-8c97-7b65c7ea2198.png)

## 2. Một số phương thức draw cơ bản
### Vẽ hình học
#### drawLine
Đơn giản chỉ là vẽ  1 đường gạch ngang/dọc/chéo.
```JAVA
canvas.drawLine(startX, startY, endX, endY, paint)
```

![](https://images.viblo.asia/c4b78f4a-5a25-496e-bf28-7facad715b53.png)

#### drawLines
Nếu bạn muốn vẽ nhiều hơn 1 line, thì bạn có thể sử dụng `drawLines` . Bạn chỉ việc cung cấp các thông tin các giá trị tọa độ thôi.
```JAVA
canvas.drawLines(
    floatArrayOf(
        startFirstX, startFirstY, endFirstX, endFirstY,
        startSecondX, startSecondY, endSecondX, endSecondY),
    paint)
```

![](https://images.viblo.asia/76a2532e-2ed7-45b5-b6b7-8e2fe18a60d1.png)

#### drawPoint
Cái tên quá rõ ràng. Vẽ 1 điểm =]]
```JAVA
canvas.drawPoint(coordinateX, coordinateY, paint)
```
#### drawPoints
Vẽ nhiều điểm
```JAVA
canvas.drawPoints(
    floatArrayOf(startX, startY, startSecondX, startSecondY),
    paint)
```
#### drawRect
Quen thuộc nhất chắc là `drawRect`  vẽ hình chữ nhật. Chúng ta có thể truyền tọa độ hoặc sử dụng class `Rect` .

![](https://images.viblo.asia/aa8a1af6-b038-4a7e-b59b-b0f28810f336.png)

#### drawRoundRect
Round là vòng -> tròn, drawRoundRect là vẽ hình chữ nhật có bo các góc dựa vào thuộc tính radiusX và radiusY để điều chỉnh độ cong của góc.
```JAVA
canvas.drawRoundRect(rect, radiusX, radiusY, projectResources.paint)
```

![](https://images.viblo.asia/f90fd10a-097c-4f2d-a501-4b0a137b121d.png)

Nếu radiusX = radiusY:

![](https://images.viblo.asia/72debf76-fe84-4b4a-86c3-6d79dc4114b0.png)

Nếu radiusX > radiusY:

![](https://images.viblo.asia/e685edd1-9903-40a6-929c-965029be5d1a.png)

Nếu radiusX < radiusY:

![](https://images.viblo.asia/91f142c0-7d78-45d4-a85f-8b17d08262f9.png)

#### drawCircle
`drawCircle` vẽ hình tròn với centerCoordinateX, centerCoordinateY là tọa độ tâm, radius là bán kính
```JAVA
canvas.drawCircle(
    centerCoordinateX, centerCoordinateY,
    radius,
    paint)
```

![](https://images.viblo.asia/8208dcc5-2537-4407-b9d1-f8e563eaecda.png)

#### drawOval
Không giống như vẽ hình tròn, `drawOval` không cung cấp bán kính, mà sẽ dựa vào tỉ lệ hình chữ nhật.
```JAVA
canvas.drawOval(rect, paint)
```

![](https://images.viblo.asia/b08e60d3-29a9-4b56-ac48-b94080946651.png)

#### drawArc
`drawArc` sử dụng cơ chế tương tự như vẽ 1 hình trái xoan. `drawArc` sử dụng `Rect` và có thêm các params như là `startAngle`, `sweepAngle` và `useCenter`.

- Đối với `startAngle`,  tính từ giữa của hình chữ nhật, và quay theo chiều kim đồng hồ
- Đối với `sweepAngle`,  tính từ giữa của hình chữ nhật, và quay ngược chiều kim đồng hồ

Cả `startAngle` và `sweepAngle` đều sử dụng đơn vị là độ góc.

- `useCenter` là 1 giá trị kiểu boolean quyết định arc sử dụng tâm để vẽ hay không?

Ví dụ: 

`useCenter = false`

![](https://images.viblo.asia/6045b17e-dfb8-4289-adf8-b56ea5c5f742.png)

`useCenter = true`

![](https://images.viblo.asia/263b5297-17a0-424a-b7f6-9bab4f19b4a7.png)


#### drawPath
`drawPath` là phương thức khá hữu dụng, hay được sử dụng trong những app vẽ vời như paint.
```JAVA
val path = Path().apply {
moveTo(startX, topY)
lineTo(endX, bottomY)
moveTo(startX, bottomY)
lineTo(endX, topY)
}
canvas.drawPath(path, paint)
```

![](https://images.viblo.asia/51cae04f-ae4d-49c3-8632-5ed535f10425.png)

### Vẽ text
Vẽ text một cách linh động hơn so với sử dụng `TextView` 
```
canvas.drawText(text, coordinateX, coordinateY, paintText)
```
với:
- text là String data.
- coordinateX và coordinateY được sử dụng để định vị tọa độ của text. 
- paintText quyết định bạn sẽ vẽ nó như nào (kích cỡ, màu)



### Vẽ màu
#### drawRGB
```JAVA
canvas.drawRGB(red, green, blue)
```

#### drawARGB
```java
canvas.drawARGB(alpha, red, green, blue)
```

#### drawColor
```java
canvas.drawColor(context.getColor(R.color.colorPrimary))
```

### Vẽ hình ảnh
 #### drawBitmap
```java
private val bitmap by lazy {
    BitmapFactory.decodeResource(resources, R.drawable.image)
}
canvas.drawBitmap(bitmap, sourceRect, destRect, paint)
```

required parameters là bitmap và destRect.

bitmap có thể extracted từ resources.

destRect khu vực hình chữ nhật mà canvas có thể vẽ vào

## 3. Tìm hiểu chi tiết hơn thông qua sample
Quay trở lại với cái hình ảnh ban đầu, chúng ta sẽ làm 1 demo nho nhỏ làm làm cái bảng paint thôi. Dùng Java nha :v

![](https://images.viblo.asia/cbcbfe44-9040-4570-ab99-cc5a44713351.png)

Cấu trúc project vô cùng đơn giản, gồm:
- CanvasCustomView: Vẽ canvas
- MainActivity: dùng để hiển thị CanvasCustomView

![](https://images.viblo.asia/472c8d53-d58f-4470-85a7-da098b30bbcc.PNG)

CanvasCustomView.class
```java
public class CanvasCustomView extends View {
    public int width;
    public int height;
    private Bitmap mBitmap;
    private Canvas mCanvas;
    private Path mPath;
    Context context;
    private Paint mPaint;
    private float mX, mY;
    private static final float TOLERANCE = 5;

    public CanvasCustomView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        // Khởi tạo đối tượng Path. Cái này được dùng để tạo ra các đường vẽ
        mPath = new Path();

        // Như đã trình bày ở trên, Paint xác định màu sắc, kiểu, phông chữ, v.v. của mỗi hình dạng bạn vẽ.
        mPaint = new Paint();
        mPaint.setAntiAlias(true);
        mPaint.setColor(Color.BLACK);
        mPaint.setStyle(Paint.Style.STROKE);
        mPaint.setStrokeJoin(Paint.Join.ROUND);
        mPaint.setStrokeWidth(4f);
    }

    // override onSizeChanged
    //onSizeChanged () được gọi khi view lần đầu tiên được chỉ định một kích thước và nếu kích thước của view thay đổi vì bất kỳ lý do gì. Tính toán vị trí, kích thước và bất kỳ giá trị nào khác liên quan đến kích thước view trong onSizeChanged (), thay vì tính toán lại chúng mỗi khi bạn vẽ
    
    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);

        // Canvassẽ vẽ lên Bitmap đã xác định
        mBitmap = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        mCanvas = new Canvas(mBitmap);
    }

    // override onDraw
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        // Vẽ mPath sử dụng mPaint
        canvas.drawPath(mPath, mPaint);
    }

    // ACTION_DOWN xác định điểm vẽ tại thời điểm press/touch
    private void startTouch(float x, float y) {
        mPath.moveTo(x, y);
        mX = x;
        mY = y;
    }

    // ACTION_MOVE dùng để move các điểm vẽ (x,y) tạo thành các nét vẽ
    private void moveTouch(float x, float y) {
        float dx = Math.abs(x - mX);
        float dy = Math.abs(y - mY);
        if (dx >= TOLERANCE || dy >= TOLERANCE) {
            mPath.quadTo(mX, mY, (x + mX) / 2, (y + mY) / 2);
            mX = x;
            mY = y;
        }
    }

//Reset các đường vẽ và update lại UI
    public void clearCanvas() {
        mPath.reset();
        invalidate();
    }

    // when ACTION_UP dừng vẽ/touch
    private void upTouch() {
        mPath.lineTo(mX, mY);
    }

    //override the onTouchEvent
    @Override
    public boolean onTouchEvent(MotionEvent event) {
    //get tọa độ x, y của event coordinates để vẽ/di chuyển các điểm vẽ.
        float x = event.getX();
        float y = event.getY();

        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                startTouch(x, y);
                invalidate();
                break;
            case MotionEvent.ACTION_MOVE:
                moveTouch(x, y);
                invalidate();
                break;
            case MotionEvent.ACTION_UP:
                upTouch();
                invalidate();
                break;
        }
        return true;
    }
}

```

MainActivity.class
```java
public class MainActivity extends AppCompatActivity {
    private CanvasCustomView mCanvasView; / /khai báo view

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mCanvasView = findViewById(R.id.signature_canvas);
    }

    public void clearCanvas(View view) {
        if (mCanvasView == null) return;
        mCanvasView.clearCanvas(); //clear canvas và refesh lại view
    }
}
```

activity_main.xml
```java
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.example.myapplication.CanvasCustomView
        android:id="@+id/signature_canvas"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:textColor="#FFFFFF" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|center"
        android:onClick="clearCanvas"
        android:text="Clear Canvas" />
</FrameLayout>
```

Hết dồi. Run app và vẽ thôi. Cảm ơn bạn đã dành thời gian xem bài viết.

Tham khảo tại:
- https://google-developer-training.github.io/android-developer-advanced-course-practicals/unit-5-advanced-graphics-and-views/lesson-11-canvas/11-1c-p-apply-clipping-to-a-canvas/11-1c-p-apply-clipping-to-a-canvas.html
- https://medium.com/mobile-app-development-publication/learn-all-android-canvas-draw-functions-dd5d6595884a