> Custom view là một trong những cách để biến những lập trình viên khô khan trở thành những người hoạ sĩ

Khi bạn cần tạo một số tùy chỉnh và sử dụng lại các View đó khi nó không được cung cấp bởi Android Ecosystem.  Custom View có thể được sử dụng như các Widget có sẵn như TextView, EditText, v.v. Trong blog này, chúng ta sẽ nói về khía cạnh cách chúng ta có thể tạo Custom view của riêng mình. Custom view có một số loại dưới đây: 

* Custom View: Nơi chúng ta có thể thoả sức sáng tạo
* Custom View Groups: Nơi chúng ta sử dụng những widget hiện có để tạo ra những custom view

Vậy trước hết, tại sao chúng ta cần Custom View :thinking:

Trong lĩnh vực làm Outsource hay Product thì việc Custom View là vô cùng quan trọng. Như Outsource thì làm sản phẩm một cách nhanh nhất để tiết giảm chi phí, vậy nên ta sử dụng một số UI library có License phù hợp để thêm vào sản phẩm, tuy nhiên thì thiết kế của khách hàng có thể sẽ khác so với library mà ta kiếm được. Chính vì thế chúng ta sẽ dựa vào library có sẵn đó rồi mông má lại sao cho giống thiết kế. Còn với Product muốn thành công, yếu tố UI cũng đóng vai trò quan trọng không kém nội dung, yếu tố độc và lạ của designer lại càng khiến cho việc Custom View quan trọng hơn bao giờ hết :open_mouth:
Ngoài những điểm mạnh kể trên, việc custom view còn mang đến một hiệu năng tuyệt vời cho ứng dụng của bạn :heart_eyes:

* Hiệu năng. Nếu bạn có nhiều views trong layout thì việc vẽ custom view thành một single view sẽ giúp layout nhẹ hơn và cải thiện hiệu năng của app
* Nếu view có quá nhiều tầng(hierachy) thì sẽ khó khi bảo trì và cài đặt. Custom view giúp giảm tải việc thêm chồng view không cần thiết.


# Vậy View là gì? :thinking: 
Như các bạn đã biết những widget mà chúng ta hay thường dùng như `TextView`, `EditText`, `Checkbox`,... Tất cả những thứ đó dù nó được kế thừa từ bất kỳ loại gì đi nữa, thì cuối cùng vẫn là con cháu của View. Ví dụ như `EditText` extends `TextView` rồi thì `TextView` extends `View`. Android chỉ cung cấp cho chúng ta những component cơ bản, hay support các UI theo định dạng material design. Việc của chúng ta là xào nấu từ những nguyên liệu có sẵn đó và cho lên những lib đẹp mê hồn 🤪

Cũng như Activity, Fragment, Service,... Thì View cũng có vòng đời của nó.Nhưng không rõ vì lý do gì mà Google không cung cấp tài liệu chính thức về lifecycle của view, việc này cũng gây ra không ít hiểu lầm giữa các developer và điều đó thường gây ra các vấn đề về lỗi.

## Lifecycle
![lifecycle of view](https://images.viblo.asia/616e4097-c494-42c9-8fd8-9f8377319337.png)

### Constructor

Tất cả view đều bắt đầu vòng đời của nó từ một constructor. Constructor là nơi chúng ta khai báo và cung cấp nhưng thứ cần thiết cho việc vẽ : thiết lập các giá trị khởi đầu, các tham số mặc định, giá trị tính toán v..v..

* `View(Context context)` constructor này sẽ được sử dụng khi mà chúng ta add view lúc code.
* `View(Context context, AttributeSet attrs)` constructor này sẽ được sử dụng khi chúng ta khai báo view trong XML (file layout xml, attrs chứa các attribute truyền vào view trong xml).
* `View(Context context, AttributeSet attrs, int defStyleAttr)` cũng dùng trong XML nhưng thêm 1 tham số đó là các thuộc tính style của theme mặc định.
* `View(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) ` như cái 3 nhưng có thêm tham số để truyền style riêng thông qua resource.

**Attributes**

Ở đây ta sẽ cung cấp một số thuộc tính tùy chỉnh cho nhà phát triển. Ta tạo tệp attrs.xml theo đường dẫn res/values/attrs.xml và định nghĩa các thuộc tính cho view trong thẻ <declare-styleable> như sau :
```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <declare-styleable name="RadialProgressBar">
        <!--outer view-->
        <attr name="outerProgress" format="integer"/>
        <attr name="outerProgressColor" format="color"/>
        <attr name="outerProgressStartAngle" format="integer"/>
        <attr name="outerMaxProgress" format="integer"/>
        <attr name="outerEmptyProgressColor" format="color"/>
        <!--center view-->
        <attr name="centerProgress" format="integer"/>
        <attr name="centerProgressColor" format="color"/>
        <attr name="centerProgressStartAngle" format="integer"/>
        <attr name="centerMaxProgress" format="integer"/>
        <attr name="centerEmptyProgressColor" format="color"/>


        <!--inner view-->
        <attr name="innerProgress" format="integer"/>
        <attr name="innerProgressColor" format="color"/>
        <attr name="innerProgressStartAngle" format="integer"/>
        <attr name="innerMaxProgress" format="integer"/>
        <attr name="innerEmptyProgressColor" format="color"/>


        <!-- Common Attrs-->
        <attr name="useRoundedCorner" format="boolean"/>
        <attr name="isAnimationOn" format="boolean"/>
        <attr name="hasElevation" format="boolean"/>
        <attr name="hasEmptyProgressBar" format="boolean"/>
        <attr name="hasOneProgressView" format="boolean"/>
        <attr name="hasTwoProgressView" format="boolean"/>
        <attr name="circleThickness" format="float"/>
        <attr name="circlePadding" format="float"/>
    </declare-styleable>
</resources>
```

**Note:**

- Khi khai báo các attribute của custom views. Để tránh nhầm lẫn và conflict với các attribute name đã có sẵn trong SDK. Ta thường đặt thêm một prefix (thường là các chữ cái đầu của custom view) để dễ dàng cho việc tìm kiếm.
- Nếu sử dụng Android Studio, Lint sẽ khuyên bạn call recycle() khi đã xong việc với attribute. Lý do là để bỏ những rằng buộc không cần thiết đến với các dữ liệu không được sử dụng lại nữa (Vì mục đích của ta chỉ cần lấy được các giá trị của attribute).

Tiếp theo, sử dụng TypedArray để lấy các giá trị thuộc tính trong class và xác định các biến mẫu

```
private fun parseAttributes(a: TypedArray) {
        mOuterProgress = a.getInteger(R.styleable.RadialProgressBar_outerProgress, mOuterProgress)
        mProgressColorOuterView = a.getColor(R.styleable.RadialProgressBar_outerProgressColor, mProgressColorOuterView)
        mInnerProgress = a.getInteger(R.styleable.RadialProgressBar_innerProgress, mInnerProgress)
        mProgressColorInnerView = a.getColor(R.styleable.RadialProgressBar_innerProgressColor, mProgressColorInnerView)
        mCenterProgress = a.getInteger(R.styleable.RadialProgressBar_centerProgress, mCenterProgress)
        mProgressColorCenterView =
            a.getColor(R.styleable.RadialProgressBar_centerProgressColor, mProgressColorCenterView)
        hasOneProgressView = a.getBoolean(R.styleable.RadialProgressBar_hasOneProgressView, hasOneProgressView)
        hasTwoProgressView = a.getBoolean(R.styleable.RadialProgressBar_hasTwoProgressView, hasTwoProgressView)
        mRoundedCorners = a.getBoolean(R.styleable.RadialProgressBar_useRoundedCorner, mRoundedCorners)
        isAnimationOn = a.getBoolean(R.styleable.RadialProgressBar_isAnimationOn, isAnimationOn)
        mStartAngleOuterView = a.getInteger(R.styleable.RadialProgressBar_outerProgressStartAngle, mStartAngleOuterView)
        mStartAngleCenterView =
            a.getInteger(R.styleable.RadialProgressBar_centerProgressStartAngle, mStartAngleCenterView)
        mStartAngleInnerView = a.getInteger(R.styleable.RadialProgressBar_innerProgressStartAngle, mStartAngleInnerView)
        mMaxProgressOuterView = a.getInteger(R.styleable.RadialProgressBar_outerMaxProgress, mMaxProgressOuterView)
        mMaxProgressInnerView = a.getInteger(R.styleable.RadialProgressBar_innerMaxProgress, mMaxProgressInnerView)
        mMaxProgressCenterView = a.getInteger(R.styleable.RadialProgressBar_centerMaxProgress, mMaxProgressCenterView)
        mElevation = a.getBoolean(R.styleable.RadialProgressBar_hasElevation, mElevation)
        mEmptyProgressBar = a.getBoolean(R.styleable.RadialProgressBar_hasEmptyProgressBar, mEmptyProgressBar)
        mEmptyProgressColorCenterView =
            a.getColor(R.styleable.RadialProgressBar_centerEmptyProgressColor, mEmptyProgressColorCenterView)
        mEmptyProgressColorOuterView =
            a.getColor(R.styleable.RadialProgressBar_outerEmptyProgressColor, mEmptyProgressColorOuterView)
        mEmptyProgressColorInnerView =
            a.getColor(R.styleable.RadialProgressBar_innerEmptyProgressColor, mEmptyProgressColorInnerView)
        mCircleThickness = a.getFloat(R.styleable.RadialProgressBar_circleThickness, mCircleThickness)
        mCirclePadding = a.getFloat(R.styleable.RadialProgressBar_circlePadding, mCirclePadding)
        a.recycle()
        hasElevation(mElevation)
        hasOneProgressView(hasOneProgressView)
        hasTwoProgressView(hasTwoProgressView)
        hasEmptyProgressBar(mEmptyProgressBar)
        setEmptyProgressColorCenterView(mEmptyProgressColorCenterView)
        setEmptyProgressColorOuterView(mEmptyProgressColorOuterView)
        setEmptyProgressColorInnerView(mEmptyProgressColorInnerView)
        setAnimationInProgressView(isAnimationOn)
        setMaxProgressOuterView(mMaxProgressOuterView)
        setMaxProgressInnerView(mMaxProgressInnerView)
        setMaxProgressCenterView(mMaxProgressCenterView)
        setOuterProgress(mOuterProgress)
        mOuterColor.add(mProgressColorOuterView)
        setOuterProgressColor(mOuterColor)
        setInnerProgress(mInnerProgress)
        mInnerColor.add(mProgressColorInnerView)
        setInnerProgressColor(mInnerColor)
        setCenterProgress(mCenterProgress)
        mCenterColor.add(mProgressColorCenterView)
        setCenterProgressColor(mCenterColor)
        useRoundedCorners(mRoundedCorners)
        setStartAngleCenterView(mStartAngleCenterView)
        setStartAngleInnerView(mStartAngleInnerView)
        setStartAngleOuterView(mStartAngleOuterView)
        setCircleThickness(mCircleThickness)
        setCirclePadding(mCirclePadding)

    }
```
### OnAttachedToWindow
Sau khi parent view gọi `addView(View)` thì custom view sẽ được attach vào window. Ở giai đoạn này, custom view sẽ biết được vị trí các view ở xung quanh nó. Lúc này ta có thể `findViewById` được và lưu vào global reference (nếu cần).

### OnMeasure
Lúc này custom view đang trong giai đoạn tìm ra kích thước(size) của nó. Đây là một method quan trọng, trong hầu hết trường hợp ta thường chỉ định(hoặc có thể can thiệp thay đổi) kích thước của custom view mong muốn khi hiển thị trên layout. Khi overriding method này, cần lưu ý đến method setMesuredDimension(int width, int height)

### OnLayout
Ở đây thực hiện việc chỉ định kích thước và vị trí các children view bên trong custom view.

### OnDraw
    
Đây chính là nơi bạn thể hiện khả năng vẽ của mình 😄 Để vẽ view, bạn phải @override lại phương thứconDraw(Canvas canvas). Trước đó, bạn cần phải biết dùng gì để vẽ và vẽ như thế nào chứ ? Android cung cấp 2 lớp để làm việc này đó là Canvas và Paint. Trước khi sử dụng canvas để vẽ, bạn cần phải tạo một đối tượng Paint. Để tối ưu hiệu năng, việc tạo ra đối tượng Paint trước là khá quan trọng, bởi vì phương thức onDraw() được gọi bất cứ khi nào cần vẽ lại. Vì vậy ta không tạo đối tượng Paint bên trong hàm onDraw().
Canvas instance được nằm trong parameter của onDraw, nó đơn giản là để vẽ các hình khác nhau, còn Paint object sẽ chỉ định màu sắc (chung hơn là style) của hình đó. Nó được sử dụng hầu như mọi nơi đễ vẽ bất kì một đường thằng, hình vuông, tròn hay bất cứ hình gì…

    > Không nên khởi tạo các đối tượng bên trong onDraw()
    
Khi vẽ custom view, ta cần ghi nhớ một điều rằng onDraw sẽ được gọi rất nhiều lần. Khi có bất kì sự thay đổi nào, khi ta vuốt hay kéo ngang màn hình … view sẽ được vẽ lại. Chính vì vậy mà Android Studio khuyên rằng nên tránh khai báo khởi tạo Object trong method này mà thay vào đó nên tạo mới ở chỗ khác và gọi sử dụng nó.
    
    **ViewUpdate** Nhìn vào View lifecycle bạn sẽ thấy 2 method được sử dụng để tự nó thực hiện việc vẽ lại : `invalidate()` và `requestLayout()` giúp bạn tương tác qua lại với custom view, bạn hoàn toàn có thể thay đổi view khi đang runtime. Nhưng tại sạo lại có tận 2 method ?

`invalidate()` sử dụng được vẽ lại các view đơn giản. Ví dụ khi bạn update lại text, color hay tương tác chạm điểm. Có nghĩa là view chỉ cần đơn giản gọi onDraw() để update lại trạng thái của view.
`requestLayout()` như bạn thấy trong sơ đồ lifecycle thì method này sẽ gọi lại view update từ onMeasure(). Điều đó có nghĩa là việc thực hiện vẽ lại view sẽ được tính toán lại kích thước. Kích thước mới có thể được tính lại ở onMeasure vẽ sẽ thực hiện vẽ theo kích thước mới đó.
    
### Animation
    
Animation trong custom view là quá trình xử lí các frame liên tiếp. Có nghĩa là khi bạn muốn tạo một vòng tròn có bán kính di chuyển từ nhỏ đến lớn để tạo ra hình tròn thay đổi to nhỏ. Ở từng bước bạn cần tăng giá trị bán kính lên và gọi invalidate() để vẽ view mới.

Để làm animation custom view, ta có class ValueAnimator. Class này giúp ta thiết lập animation của view từ lúc bắt đầu và kết thúc, ngoài ra có còn hỗ trợ Interpolator (style animation có sẵn).
    
```
fun setOuterProgress(progress: Int) {
        if (progress != 0) mOuterProgress = progress
        val animator =
            ValueAnimator.ofFloat(mSweepAngleOuterView.toFloat(), calcSweepAngleFromOuterProgress(mOuterProgress))
        animator.removeAllUpdateListeners()
        animator.interpolator = DecelerateInterpolator()
        animator.duration = mAnimationDurationOuterView.toLong()
        animator.addUpdateListener { valueAnimator ->
            val value: Float = valueAnimator.animatedValue as Float
            mSweepAngleOuterView = (value.toInt())
            invalidate()
        }
        animator.start()

    }
```
    
> Đứng quên gọi invalidate() mỗi khi set giá trị animation mới.

## Summary
    
Trên đây là một số chia sẻ của mình về một số cách custom view trong Android :heart_eyes: Cảm ơn mọi người đã theo dõi