Như chúng ta đã biết thì **BottomNavigationView** là 1 thanh điều hướng giúp người dùng dễ dàng khám phá và chuyển đổi giữa các view cấp cao chỉ trong 1 lần chạm, từ khi ra mắt **BottomNavigationView** hỗ trỡ rất nhiều chức năng tối ưu và linh hoạt giúp chúng ta dễ dàng xử lý hơn thay vì phải tự custom 1 layout như trước đây. Bên cạnh đó để người dùng có cái nhìn trực quan và trải nghiệm tốt hơn thì việc cải tiến BottomNavigationView là điều không tránh khỏi, cụ thể chúng ta có thể nhìn vào bản thiết kế dưới đây và thấy được sự khác biệt của nó. 
![](https://images.viblo.asia/8230b814-c694-483f-874f-e718c508637d.png)
<div align="center">

*Curve BottomNavigationView*
    
</div>


Đó là có sự xuất hiện của một đường cong trên thanh điều hướng,  điều này khiến mình thấy rất hứng thú và thế là mình tiến hành tìm tòi cách để custom đường cong như vậy. Sau một hồi nghiên cứu và thảo luận thì mình phát hiện ra rằng đó là 1 loại đường cong Bézier

### Đường cong Bézier
![](https://images.viblo.asia/845bb005-8fa9-4361-8b78-e6a0861ab587.png)

Sở dĩ nó được gọi là đường cong Bézier bởi vì đây chính là tên của một kĩ sư người Pháp **Pierre Bézier** khi mà ông phát minh ra nó để thiết kế thân ô tô. Và loại đường cong này rất phù hợp cho bản thiết kế của mình. Để hiểu rõ hơn về đường cong Bézier các bạn có thể đọc [tại đây](https://vi.wikipedia.org/wiki/%C4%90%C6%B0%E1%BB%9Dng_cong_B%C3%A9zier) .

![](https://images.viblo.asia/f466e6b1-4b01-4e3e-9734-93a493a458e3.jpeg)
<div align="center">

*Cubic Bézier curves*
    
</div>
Đường cong Bézier bậc ba (cubic): Xét về mặt định nghĩa thì nó được chia thành 4 điểm kiểm soát. Trong đó điểm đầu tiên và điểm cuối cùng chỉ định vị trí bắt đầu và kết thúc của đường cong cần vẽ, còn điểm thứ 2 và 3 thì ảnh hưởng đến độ trễ của đường cong.
Bây giờ chúng ta sẽ đi sâu vào code để xem cách mà nó tạo đượng cong Bézier trong Android như thế nào.

Đầu tiên chúng ta sẽ tạo 1 custom view mà kế thừa từ  [BottomNavigationView](https://developer.android.com/reference/android/support/design/widget/BottomNavigationView) để tận dụng mọi lợi thế và tính năng có sẵn của nó.

```javascript
public class CurvedBottomNavigationView extends BottomNavigationView {
    public CurvedBottomNavigationView(Context context) {
        super(context);
        init();
    }
    public CurvedBottomNavigationView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }
    public CurvedBottomNavigationView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }
    private void init() {
        mPath = new Path();
        mPaint = new Paint();
        mPaint.setStyle(Paint.Style.FILL_AND_STROKE);
        mPaint.setColor(Color.WHITE);
        setBackgroundColor(Color.TRANSPARENT);
    }
}
```

Ở đây, chúng ta chỉ thêm phương thức ```init()``` vào hàm khởi tạo chủ yếu để khởi tạo các đối tượng [path](https://developer.android.com/reference/android/graphics/Path) và [paint](https://developer.android.com/reference/android/graphics/Paint) .

**Path** được dùng để vẽ các hình dạng hình học, trong đó bao gồm cả đường cong Bézier. Thông thường **Path** sẽ vẽ 1 đường thằng mà nối 2 điểm lại với nhau: 1 điểm bắt đầu và 1 điểm kết thúc. Bởi mặc định **BottomNavigationView** chính là 1 hình chữ nhật, vậy nên chúng ta sẽ dùng **Path** để vẽ lại nó với đường cong như trên.
Khi tạo 1 đối tượng Path chúng ta có thể không cân truyền vào 1 param nào cho nó nhưng mình khuyên bạn nên truyền vào cho 1 biến flag  **ANTI_ALIAS_FLAG**  để giúp nét vẽ trở nên mượt hơn. Đâu tiên chúng ta nên xác định được cái gì muốn vẽ, view sẽ hiển thị như thế nào, view chỉ có phần viền mà không có phần bên trong của nó, hay chỉ có phần bên trong mà không có phần viền, hay là cả 2. Trong trường hợp của mình thì  chúng ta sẽ vẽ cả phần viền và phân thân nên sẽ dùng thuộc tính ```setStyle(Paint.Style.FILL_AND_STROKE)```, việc còn lại chúng ta chỉ cần chọn color và background phù hợp để vẽ.

![](https://images.viblo.asia/52dd52d4-e752-4d4c-93b5-4973d0e56f46.png)

Bầy giờ chúng ta sẽ tiến hành khởi tạo vị trí các điểm cần vẽ. Vị trí của các điểm sẽ phụ thuộc vào width và height của 1 view. P1 chính là nơi bắt đầu của điểm mà Path sẽ vẽ, **P2** là điểm bắt đầu của đường cong đầu tiên. Để có thể tính toán được vị trí của điểm, mình sẽ dùng 1 FAB button và căn cứ vào radius của nó để tính toán đường nét, đường cong cho phù hợp, có thể nó không hoàn toàn chính xác lắm. Các điểm còn lại **P3**, **P4** việc xử lý hoàn toàn giống như **P1**, **P2** khi mà **P3** sẽ bắt đầu tại điểm kết thúc của P2 và chính là điểm bắt đầu của đường cong thứ 2, **P4** là điểm kết thúc của đường cong thứ 2.


* **Tránh thực hiện các tính toán trên phương thức ```onDraw()``` bởi vì hàm này sẽ được gọi lại rất nhiều lần, do đó sẽ gây ảnh hưởng đến performance. Vì bậy chúng ta nên tính toán vị trị của các điểm ở trong hàm```onSizeChanged``` bởi vì hàm này chỉ được gọi chỉ khi kích thước của view đã thay đổi nên sẽ không ảnh hưởng lắm về performance.**

```javascript
 @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        // get width and height of navigation bar
        // Navigation bar bounds (width & height)
         mNavigationBarWidth = getWidth();
         mNavigationBarHeight = getHeight();
        // the coordinates (x,y) of the start point before curve
        mFirstCurveStartPoint.set((mNavigationBarWidth / 2) - (CURVE_CIRCLE_RADIUS * 2) - (CURVE_CIRCLE_RADIUS / 3), 0);
        // the coordinates (x,y) of the end point after curve
        mFirstCurveEndPoint.set(mNavigationBarWidth / 2, CURVE_CIRCLE_RADIUS + (CURVE_CIRCLE_RADIUS / 4));
        // same thing for the second curve
        mSecondCurveStartPoint = mFirstCurveEndPoint;
        mSecondCurveEndPoint.set((mNavigationBarWidth / 2) + (CURVE_CIRCLE_RADIUS * 2) + (CURVE_CIRCLE_RADIUS / 3), 0);

        // the coordinates (x,y)  of the 1st control point on a cubic curve
        mFirstCurveControlPoint1.set(mFirstCurveStartPoint.x + CURVE_CIRCLE_RADIUS + (CURVE_CIRCLE_RADIUS / 4), mFirstCurveStartPoint.y);
        // the coordinates (x,y)  of the 2nd control point on a cubic curve
        mFirstCurveControlPoint2.set(mFirstCurveEndPoint.x - (CURVE_CIRCLE_RADIUS * 2) + CURVE_CIRCLE_RADIUS, mFirstCurveEndPoint.y);

        mSecondCurveControlPoint1.set(mSecondCurveStartPoint.x + (CURVE_CIRCLE_RADIUS * 2) - CURVE_CIRCLE_RADIUS, mSecondCurveStartPoint.y);
        mSecondCurveControlPoint2.set(mSecondCurveEndPoint.x - (CURVE_CIRCLE_RADIUS + (CURVE_CIRCLE_RADIUS / 4)), mSecondCurveEndPoint.y);
    }
```

Bây giờ sẽ đến phần thú vị và phứt tạp nhất. Để bắt đầu chúng ta sẽ tiến hành reset path và clear tất cả các đường thằng và đường cong từ nó, sau đó chúng ta sẽ tiến hành di chuyển nó đếm điểm **P1** bằng cách gọi hàm ```moveTo(x,y)``` , đồng thời sử dụng hàm lineTo(x,y) để vẽ đoạn thẳng đầu tiên kéo dài từ **P1** đến **P2**. À mà thật sự chúng ta không cần gọi hàm moveTo làm gì cả bởi vì mặc định sẽ không có điểm nào được chỉ định trước đó cả nên hàm moveTo(0,0) sẽ được gọi tự động và sẽ di chuyển đến vị trị **P1** như trên.
Để vẽ 1 đượng cong bậc 3 (cubic) chúng ta sẽ sử dụng hàm ```cubicTo(x1,y1,x2,y2,x3,y3)```, để ý kỹ ở các điểm (x1,y1) và (x2,y2) , 2 thằng này có vai trò ảnh hưởng đến độ trễ của đường cong, và khi 1 đường cong được vẽ thì nó sẽ không đi qua 2 điểm này, (x3,y3) chính là điểm kết thúc của đường cong, có thể nhìn vào hình minh họa dưới đây để hiểu rõ hơn.

![](https://images.viblo.asia/abd8d2cc-af48-4f8a-afd1-2918841aa7b5.gif)

Để tính toán được vị trí các điểm này, chắc chắn chúng ta phải đoán, mò mẫn để tim đúng vị trí thích hợp cho các điểm kiểm soát của bạn ~.~. Cơ mà đã có [tool]((http://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html)) hỗ trợ sẵn kèm theo [demo](https://android-coding.blogspot.com/2012/04/draw-cubic-bezier-on-path-cubicto.html) nên chúng ta có thể biết được chính xác vị trí của điểm cần vẽ hơn.

Với đường còn còn lại chúng ta cũng làm tương tự như trên, đồng thời sẽ vẽ phần còn lại của navigation bar đơn giản chỉ việc sử dụng hàm ```lineTo()```

```javascript
 @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        
        //point calculation 
        
        mPath.reset();
        mPath.moveTo(0, 0);
        mPath.lineTo(mFirstCurveStartPoint.x, mFirstCurveStartPoint.y);

        mPath.cubicTo(mFirstCurveControlPoint1.x, mFirstCurveControlPoint1.y,
                mFirstCurveControlPoint2.x, mFirstCurveControlPoint2.y,
                mFirstCurveEndPoint.x, mFirstCurveEndPoint.y);

        mPath.cubicTo(mSecondCurveControlPoint1.x, mSecondCurveControlPoint1.y,
                mSecondCurveControlPoint2.x, mSecondCurveControlPoint2.y,
                mSecondCurveEndPoint.x, mSecondCurveEndPoint.y);

        mPath.lineTo(mNavigationBarWidth, 0);
        mPath.lineTo(mNavigationBarWidth, mNavigationBarHeight);
        mPath.lineTo(0, mNavigationBarHeight);
        mPath.close();
    }
```

Cuối cùng chúng ta sẽ dùng [canvas](https://developer.android.com/reference/android/graphics/Canvas) để tiến hành vẽ lại BottomNavigationBar
```javascript
 @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawPath(mPath, mPaint);
    }
```

Trên đây toàn bộ nội dung mình truyền tải, nếu có xai xót mong được góp ý.

Các bạn có thể xem toàn bộ source code [tại đây](https://github.com/IslamBesto/CustomBottoBar/tree/java) (bao gồm cả java, kotlin).

**Nguồn tham khảo**: https://proandroiddev.com/how-i-drew-custom-shapes-in-bottom-bar-c4539d86afd7