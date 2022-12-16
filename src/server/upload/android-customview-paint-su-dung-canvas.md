## Tổng quan
Trong bài viết này, mình sẽ đi luôn vào phần thực hành, tạo custom view để vẽ giống như Paint, hay giống như các công cụ vẽ khác. Về phần lý thuyết Canvas các bạn có thể tham khảo ở các bài viết dưới đây:
- [Phần 1 Canvas](https://viblo.asia/p/canvas-trong-android-PdbknodRvyA)
- [Phần 2 Canvas](https://viblo.asia/p/canvas-trong-android-phan-2-xQMkJmjYeam)

Mình sẽ tạo Example demo như ảnh dưới đây.
![](https://images.viblo.asia/774ccb0f-c9f3-4241-b2ca-c487dd5aaefb.gif)

## 1. Create project
Tạo 1 project CanvasExample với 1 Activity Empty. Có thể không cần add layout file.
Định nghĩa 1 mã màu dưới đây vào file color.xml: 

```xml
<color name="opaque_orange">#FFFF5500</color>
<color name="opaque_yellow">#FFFFEB3B</color>
```

## 2. Create class custom view MyCanvasView
- Create new class MyCanvasView kế thừa từ lớp cha là View
- Định nghĩa, khai báo đối tượng Paint, Path. Để vẽ thì chắc chắn chúng ta sẽ cần 1 đối tượng là Paint. Còn path, chú ý Path sẽ import từ thư viện *android.graphics.Path*. Path sẽ đảm nhiệm vụ giữ lại các nét bạn đang vẽ khi người dùng di chuyển ngón tay của họ trên màn hình.
-  Đinh nghĩa, khai báo đối tượng Canvas và Bitmap objects. 
-  Định nghĩa, khai báo biến setting màu để vẽ, và màu của backgound.

Cụ thể như sau:
```java
private Paint mPaint;
private Path mPath;
private int mDrawColor; //Color line
private int mBackgroundColor; //Color background
private Canvas mExtraCanvas;
private Bitmap mExtraBitmap;
```


- Khởi tạo các đối tượng mPaint, mPath, mDrawColor, mBackgroundColor trên trong phương thức contructor. 
Cụ thể như sau:
```java
MyCanvasView(Context context) {
   this(context, null);
}

public MyCanvasView(Context context, AttributeSet attributeSet) {
   super(context);

   mBackgroundColor = ResourcesCompat.getColor(getResources(),
                   R.color.opaque_orange, null);
   mDrawColor = ResourcesCompat.getColor(getResources(),
           R.color.opaque_yellow, null);

   // Holds the path we are currently drawing.
   mPath = new Path();
   // Set up the paint with which to draw.
   mPaint = new Paint();
   mPaint.setColor(mDrawColor);
   // Smoothes out edges of what is drawn without affecting shape.
   mPaint.setAntiAlias(true);
   // Dithering affects how colors with higher-precision device
   // than the are down-sampled.
   mPaint.setDither(true);
   mPaint.setStyle(Paint.Style.STROKE); // default: FILL
   mPaint.setStrokeJoin(Paint.Join.ROUND); // default: MITER
   mPaint.setStrokeCap(Paint.Cap.ROUND); // default: BUTT
   mPaint.setStrokeWidth(12); // default: Hairline-width (really thin)
}
```


- Trong MainActivity, chỉnh sửa phương thức onCreate() :
+ Tạo instance MyCanvasView myCanvasView.
+ Setting SYSTEM_UI_FLAG_FULLSCREEN flag của myCanvasView
+ Set contentView của Activity chính là myCanvasView.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);

   MyCanvasView myCanvasView;
   // No XML file; just one custom view created programmatically.
   myCanvasView = new MyCanvasView(this);
   // Request the full available screen for layout.
   myCanvasView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN);
   setContentView(myCanvasView);
}
```


- Trong class MyCanvasView, override phương thức onSizeChanged().
Phương thức onSizeChanged() sẽ được gọi bất cứ khi nào view thay đổi size.  Vì khi start ban đầu thì view sẽ không có kích thước, nên phương thức onSizeChanged () cũng được gọi sau khi activity inflate view. Do đó phương thức này là nơi lý tưởng để tạo và thiết lập canvas. 
```java
@Override
protected void onSizeChanged(int width, int height,
                            int oldWidth, int oldHeight) {
   super.onSizeChanged(width, height, oldWidth, oldHeight);
   // Create bitmap, create canvas with bitmap, fill canvas with color.
   mExtraBitmap = Bitmap.createBitmap(width, height,
                         Bitmap.Config.ARGB_8888);
   mExtraCanvas = new Canvas(mExtraBitmap);
   // Fill the Bitmap with the background color.
   mExtraCanvas.drawColor(mBackgroundColor);
}
```


- Trong class MyCanvasView, override phương thức onDraw().
Tất cả quá trình vẽ của MyCanvasView đều xảy ra trong phương thức onDraw ().
Trong trường hợp này, bạn sẽ vẽ bitmap chứa đường dẫn (path) mà người dùng đã vẽ. Bạn sẽ tạo và lưu đường dẫn để đáp ứng với sự di chuyển trên màn hình của người dùng trong chuỗi các bước tiếp theo.
Lưu ý rằng canvas được truyền cho onDraw () khác với canvas được tạo trong phương thức onSizeChanged ().
Khi màn hình hiển thị lần đầu tiên, người dùng chưa vẽ gì nên màn hình chỉ hiển thị bitmap màu.
```java
@Override
protected void onDraw(Canvas canvas) {
   super.onDraw(canvas);
   // Draw the bitmap that stores the path the user has drawn.
   // Initially the user has not drawn anything
   // so we see only the colored bitmap.
   canvas.drawBitmap(mExtraBitmap, 0, 0, null);
}
```

- Đến bước này, các bạn hãy chạy ứng dụng của mình lên và sẽ thấy 1 màn hình full screen sẽ được tô màu cam, màu opaque_orange mà các bạn đã định nghĩa ở trên.

Và bây h chúng ta sẽ xử lý phản hồi, tương tác của người dùng khi chạm vào màn hình.
- Trong class MyCanvasView, override phương thức onTouchEvent().
Phương thức onTouchEvent()  sẽ được gọi bất cứ khi nào người dùng cham vào màn hình.
+ Lấy tọa độ X và Y khi user chạm vào màn hình
+ Xử lý các sự kiện có thể xảy ra khi user tương tác vs màn hình. Ví dụ: ACTION_DOWN, ACTION_MOVE, ACTION_UP...v.v.
+ Bạn sẽ phải call phương thức invalidate() để vẽ lại khung nhìn sau khi nó có sự thay đổi. Cụ thể là trong sự kiện ACTION_UP, user di chuyển vị trí chạm trên màn hình.
```java
@Override
public boolean onTouchEvent(MotionEvent event) {
   float x = event.getX();
   float y = event.getY();
   switch (event.getAction()) {
       case MotionEvent.ACTION_DOWN:
           touchStart(x, y);
           break;
       case MotionEvent.ACTION_MOVE:
           touchMove(x, y);
           invalidate();
           break;
       case MotionEvent.ACTION_UP:
           touchUp();
           break;
   }
   return true;
}
```

- Thêm các biến để giữ các giá trị *X* và *Y *mới nhất, đó chính là điểm bắt đầu cho đường dẫn (path) tiếp theo.
```java
private float mX, mY;
```

- Implement phương thức touchStart()
Khi người dùng bắt đầu vẽ một dòng mới, đặt phần đầu của đường viền (dòng) thành x, y và lưu tọa độ bắt đầu.
```java
private void touchStart(float x, float y) {
   mPath.moveTo(x, y);
   mX = x;
   mY = y;
}
```

- Implement phương thức touchMove()
```java
    private void touchMove(float x, float y) {
        float dx = Math.abs(x - mX);
        float dy = Math.abs(y - mY);
        if (dx >= 4 || dy >= 4) {
            mPath.quadTo(mX, mY, (x + mX)/2, (y + mY)/2);
            mX = x;
            mY = y;
            
            mExtraCanvas.drawPath(mPath, mPaint);
        }
    }
```

- Cuối cùng, implement phương thức touchUp(), đặt lại đường dẫn (path) để nó không bị vẽ lại khi bạn vẽ nhiều đường trên màn hình.
```java
private void touchUp() {
   mPath.reset();
}
```

Bậy h, hãy chạy ứng dụng lên, khi ứng dụng được mở, sử dụng ngón tay hoặc bút cảm ứng để vẽ lên màn hình và xem thành quả của mình :D

## Tổng kết
Qua bài viết, mình đã hướng dẫn các bạn tạo layout custom view paint, từ example này các bạn có thể bổ sung, thêm các tính năng như xóa, chọn style bút, chọn màu để vẽ..v.v.. để ứng dụng được hoàn chỉnh đẩy đủ các tính năng của Paint.
Cám ơn các bạn đã theo dõi bài viết của mình! Thanks all.