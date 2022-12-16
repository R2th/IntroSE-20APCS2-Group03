### Mở đầu 
Tất cả các tiện ích xem Android đều dựa trên View, để triển khai View, bạn sẽ bắt đầu một lớp con của View và ghi đè một số phương thức xem lại vòng đời, vì vậy trước tiên bạn cần hiểu vòng đời của View. Sơ đồ sau đây cho thấy một số phương pháp quan trọng để ghi đè: 
![](https://images.viblo.asia/d9342d23-1844-4039-8668-bae5cd801691.png)
Để bắt đầu, điều đầu tiên chúng ta phải làm là tạo một lớp kế thừa View và cung cấp hai hàm tạo mặc định cho phép chúng ta tạo khung nhìn theo chương trình (hàm tạo thứ 1) hoặc trong bố cục XML (hàm tạo thứ 2). Hàm tạo SwagPoint (Context context, AttributeSet attrs) quan trọng hơn ở đây vì nó được sử dụng khi Android làm inflates the view từ XML layout file nếu không bạn sẽ gặp exception.
```

public class SwagPoints extends View {

	// used in view creation programmatically
	public SwagPoints(Context context) {
		super(context);
	}

	// used in XML layout file
	public SwagPoints(Context context, AttributeSet attrs) {
		super(context, attrs);
	}
	
}
```
Sau đó có 1 số thứ điều khiển và thay đổi View như sau :
      1. Attributes : Xác định các thuộc tính cho phép các developer thay đổi diện mạo và hành vi trong tệp XML theo thiết kế của họ.
      2. Size : Xác định kích thước của View và các thành phần của nó.
      3. Drawing : Xác định cách mà view và các thành phần của nó được render trên màn hình.
      4. Touch : Xác định cách mà người dùng tương tác với view bằng cách chạm.
### 1. Attributes
Ở đây ta sẽ cung cấp một số thuộc tính tùy chỉnh cho nhà phát triển. Ta tạo tệp attrs.xml theo đường dẫn res/values/attrs.xml và định nghĩa các thuộc tính cho view trong thẻ <declare-styleable> như sau :
```
<resources>
    <declare-styleable name="SwagPoints">
        <attr name="points" format="integer" />
        <attr name="max" format="integer" />
        <attr name="min" format="integer"/>
        <attr name="step" format="integer"/>

        <attr name="indicatorIcon" format="reference" />

        <attr name="progressWidth" format="dimension" />
        <attr name="progressColor" format="color" />

        <attr name="arcWidth" format="dimension" />
        <attr name="arcColor" format="color" />

        <attr name="textSize" format="dimension"/>
        <attr name="textColor" format="color"/>

        <attr name="clockwise" format="boolean" />
        <attr name="enabled" format="boolean" />

    </declare-styleable>

</resources>
```
    Tiếp theo, sử dụng TypedArray để lấy các giá trị thuộc tính trong class và xác định các biến mẫu. Đẩy chúng vào hàm init() sau super() :
```
private void init(Context context, AttributeSet attrs) {

	float density = getResources().getDisplayMetrics().density;

	// Defaults, may need to link this into theme settings
	int arcColor = ContextCompat.getColor(context, R.color.color_arc);
	int progressColor = ContextCompat.getColor(context, R.color.color_progress);
	int textColor = ContextCompat.getColor(context, R.color.color_text);
	mProgressWidth = (int) (mProgressWidth * density);
	mArcWidth = (int) (mArcWidth * density);
	mTextSize = (int) (mTextSize * density);

	mIndicatorIcon = ContextCompat.getDrawable(context, R.drawable.indicator);

	if (attrs != null) {
		// Attribute initialization
		final TypedArray a = context.obtainStyledAttributes(attrs,
				R.styleable.SwagPoints, 0, 0);

		Drawable indicatorIcon = a.getDrawable(R.styleable.SwagPoints_indicatorIcon);
		if (indicatorIcon != null)
			mIndicatorIcon = indicatorIcon;

		int indicatorIconHalfWidth = mIndicatorIcon.getIntrinsicWidth() / 2;
		int indicatorIconHalfHeight = mIndicatorIcon.getIntrinsicHeight() / 2;
		mIndicatorIcon.setBounds(-indicatorIconHalfWidth, -indicatorIconHalfHeight, indicatorIconHalfWidth,
				indicatorIconHalfHeight);

		mPoints = a.getInteger(R.styleable.SwagPoints_points, mPoints);
		mMin = a.getInteger(R.styleable.SwagPoints_min, mMin);
		mMax = a.getInteger(R.styleable.SwagPoints_max, mMax);
		mStep = a.getInteger(R.styleable.SwagPoints_step, mStep);

		mProgressWidth = (int) a.getDimension(R.styleable.SwagPoints_progressWidth, mProgressWidth);
		progressColor = a.getColor(R.styleable.SwagPoints_progressColor, progressColor);

		mArcWidth = (int) a.getDimension(R.styleable.SwagPoints_arcWidth, mArcWidth);
		arcColor = a.getColor(R.styleable.SwagPoints_arcColor, arcColor);

		mTextSize = (int) a.getDimension(R.styleable.SwagPoints_textSize, mTextSize);
		mTextColor = a.getColor(R.styleable.SwagPoints_textColor, mTextColor);

		mClockwise = a.getBoolean(R.styleable.SwagPoints_clockwise,
				mClockwise);
		mEnabled = a.getBoolean(R.styleable.SwagPoints_enabled, mEnabled);
		a.recycle();
	}
}
```
### 2. Size
    Để kiểm soát được kích thước của view, ta phải @override lại phương thức onMeasure() và tính toán kích thước của từng thành phần. Ở đây ta sẽ phải xác định bán kính cung theo chiều rộng, chiều cao của view.
```
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {

	final int width = getDefaultSize(getSuggestedMinimumWidth(), widthMeasureSpec);
	final int height = getDefaultSize(getSuggestedMinimumHeight(), heightMeasureSpec);
	final int min = Math.min(width, height);

	mTranslateX = (int) (width * 0.5f);
	mTranslateY = (int) (height * 0.5f);

	int arcDiameter = min - getPaddingLeft();
	mArcRadius = arcDiameter / 2;
	float top = height / 2 - (arcDiameter / 2);
	float left = width / 2 - (arcDiameter / 2);
	mArcRect.set(left, top, left + arcDiameter, top + arcDiameter);

	updateIndicatorIconPosition();
	super.onMeasure(widthMeasureSpec, heightMeasureSpec);
}
```
### 3. Drawing
    Đây chính là nơi bạn thể hiện khả năng vẽ của mình ? Để vẽ view, bạn phải @override lại phương thứconDraw(Canvas canvas). Trước đó, bạn cần phải biết dùng gì để vẽ và vẽ như thế nào chứ ? Android cung cấp 2 lớp để làm việc này đó là Canvas và Paint. Trước khi sử dụng canvas để vẽ, bạn cần phải tạo một đối tượng Paint. Để tối ưu hiệu năng, việc tạo ra đối tượng Paint trước là khá quan trọng, bởi vì phương thức onDraw() được gọi bất cứ khi nào cần vẽ lại. Vì vậy ta không tạo đối tượng Paint bên trong hàm onDraw().

Không nên khởi tạo các đối tượng bên trong onDraw()

Ở đây chúng ta định nghĩa các đối tượng ( một cho arc, một cho progress và còn lại cho text) như các biến instance và được khởi tạo trong hàm init() :
```
private void init(Context context, AttributeSet attrs) {
	// ...
	
	mArcPaint = new Paint();
	mArcPaint.setColor(arcColor);
	mArcPaint.setAntiAlias(true);
	mArcPaint.setStyle(Paint.Style.STROKE);
	mArcPaint.setStrokeWidth(mArcWidth);

	mProgressPaint = new Paint();
	mProgressPaint.setColor(progressColor);
	mProgressPaint.setAntiAlias(true);
	mProgressPaint.setStyle(Paint.Style.STROKE);
	mProgressPaint.setStrokeWidth(mProgressWidth);

	mTextPaint = new Paint();
	mTextPaint.setColor(textColor);
	mTextPaint.setAntiAlias(true);
	mTextPaint.setStyle(Paint.Style.FILL);
	mTextPaint.setTextSize(mTextSize);
}
```
Khi đã xác định được đối tượng Paint, chúng ta có thể implement hàm onDraw(Canvas canvas) , ở đây ta sẽ vẽ ra text và vòng cung hiển thị giá trị hiện tại của seekbar :
```
@Override
protected void onDraw(Canvas canvas) {
	if (!mClockwise) {
		canvas.scale(-1, 1, mArcRect.centerX(), mArcRect.centerY());
	}

	// draw the text
	String textPoint = String.valueOf(mPoints);
	mTextPaint.getTextBounds(textPoint, 0, textPoint.length(), mTextRect);
	// center the text
	int xPos = canvas.getWidth() / 2 - mTextRect.width() / 2;
	int yPos = (int)((mArcRect.centerY()) - ((mTextPaint.descent() + mTextPaint.ascent()) / 2));
	canvas.drawText(String.valueOf(mPoints), xPos, yPos, mTextPaint);

	// draw the arc and progress
	canvas.drawArc(mArcRect, ANGLE_OFFSET, 360, false, mArcPaint);
	canvas.drawArc(mArcRect, ANGLE_OFFSET, mProgressSweep, false, mProgressPaint);

	if (mEnabled) {
		// draw the indicator icon
		canvas.translate(mTranslateX - mIndicatorIconX, mTranslateY - mIndicatorIconY);
		mIndicatorIcon.draw(canvas);
	}
}
```
    Khá là ổn rồi nhỉ, sau khi @override onDraw(), có một phương thức quan trọng khác về vẽ đó là invalidate(). Phương thức này được sử dụng khi việc vẽ lại là cần thiết, ta không gọi làm onDraw() một cách trực tiếp mà chỉ gọi phương thức này thôi. Bạn có thể sử dụng phương thức này bất cứ đâu bên trong custom view, tuy nhiên để hiệu năng tốt nhất, hãy nhớ rằng chỉ gọi nó khi cần.
### 4. Touching
Khi người dùng chạm vào màn hình, phương thức onTouchEvent() sẽ được gọi, vì vậy ta cần phải @override View.onTouchEvent() để xử lý các cử chỉ của người dùng :
```
@Override
public boolean onTouchEvent(MotionEvent event) {
	if (mEnabled) {
		this.getParent().requestDisallowInterceptTouchEvent(true);

		switch (event.getAction()) {
			case MotionEvent.ACTION_DOWN:
				if (mOnSwagPointsChangeListener != null)
					mOnSwagPointsChangeListener.onStartTrackingTouch(this);
				updateOnTouch(event);
				break;
			case MotionEvent.ACTION_MOVE:
				updateOnTouch(event);
				break;
			case MotionEvent.ACTION_UP:
				if (mOnSwagPointsChangeListener != null)
					mOnSwagPointsChangeListener.onStopTrackingTouch(this);
				setPressed(false);
				this.getParent().requestDisallowInterceptTouchEvent(false);
				break;
			case MotionEvent.ACTION_CANCEL:
				if (mOnSwagPointsChangeListener != null)
					mOnSwagPointsChangeListener.onStopTrackingTouch(this);
				setPressed(false);
				this.getParent().requestDisallowInterceptTouchEvent(false);
				break;
		}
		return true;
	}
	return false;
}
```
## Và đó là toàn bộ phần custom của mình . Chúc các bạn thành công 
Bài viết có tham khảo từ nhiều nguồn . Cảm ơn mn <3