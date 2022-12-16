![](https://images.viblo.asia/062030bb-16aa-42e0-9e77-c5ff69b358cd.png)

Một ngày có hàng trăm ứng dụng mới ra đời, với những mục đích khác nhau, nhưng về các view có thể thấy là đều giống nhau ở những nét cơ bản. Đó là lý do tại sao, rất nhiều khách hàng đã yêu cầu lập trình viên tạo các giao diện khác biệt, cụ thể mà không giống các ứng dụng khác nhằm tạo trải nghiệm mới mẻ cho người dùng, và đó là vì sao chúng ta cần tạo các Custom view. 

Trong hầu hết trường hợp, việc tạo custom view là điều không hề đơn giản và mất rất nhiều thời gian. Nhưng đổi lại ta sẽ có các view mang những đặc điểm khác biệt, cũng là một cách tạo sự thú vị trong việc lập trình nhất là lập trình ứng dụng di động.

Ví dụ chúng ta có một task là tạo `page indicator` cho view pager. Không giống như iOs,  Android không hỗ trợ chế độ xem như vậy, do đó ta cần phải tạo một custom view. Các bạn có thể xem toàn bộ libs [ở đây](https://github.com/romandanylyk/PageIndicatorView)

![](https://images.viblo.asia/e01a1960-b883-43f9-8fbc-f2c2584a492a.png)

Hầu hết việc tạo các custom view tốn nhiều thời gian hơn các view thông thường, bạn chỉ nên thực hiện nếu không còn cách nào khác theo yêu cầu của khách hàng hoặc gặp phải các trường hợp sau:
 - Về performance. Nếu bạn có quá nhiều view trong một layout và bạn muốn tạo 1 custom view để làm layout đó nhẹ hơn.
 - Một view có nhiều phân cấp phức tạp
 - Phải vẽ thủ công một custom view hoàn chỉnh.
  
Nếu bạn chưa từng tạo một custom view hoàn chỉnh thì bài viết này sẽ giúp cho bạn có một cái nhìn tổng quan về cách để làm một custom view cho riêng mình, bên cạnh đó là tránh những sai lầm phổ biến.

Đầu tiên các bạn nên xem qua 1 vòng đời của view, vì một lý do nào đó mà Google không cung cấp sơ đồ chính thức một vòng đời của view, dẫn đến hiểu lầm giữa các dev và tạo nên nhiều bug và issues, vậy nên bạn hãy để ý đến nó nhé!

![](https://images.viblo.asia/9becf181-a0ca-4e4f-a289-238dd7ae5c30.png)

## Constructor
Mọi View đều bắt đầu từ một constructor, nó tạo chuẩn bị cho bản vẽ đầu tiên như thực hiện các tính toán, set default value hoặc bất cứ điều gì mà ta cần. Bên cạnh đó, AttributeSet interface giúp view dễ sử dụng và thiết lập bằng các static param trên màn hình.
Ta sẽ bắt đầu với việc tạo file đặt tên là 'attrs.xml', trong đó bao gồm tất cả các thuộc tính có thể có cho các custom view khác nhau, bạn có thể xem trong ví dụ sau:

![](https://images.viblo.asia/dc78b115-52a9-4d69-bbab-d6e82c307c0b.png)

Chúng ta có một view gọi là PageIndicatorView và một thuộc tính piv_count.

Điều thứ 2 trong view constructor, bạn cần lấy các thuộc tính và sử dụng như sau:
```
public PageIndicatorView(Context context, AttributeSet attrs) {
    super(context, attrs);
    TypedArray typedArray = getContext().obtainStyledAttributes(attrs, R.styleable.PageIndicatorView);
    int count = typedArray.getInt(R.styleable.PageIndicatorView_piv_count,0);
    typedArray.recycle();
}
```

Lưu ý:
- Khi tạo các custom attributes hãy đặt tên với các tiền tố đơn giản, việc này nhằm tránh bị conflict tên giữa các attributes khác thuộc các view khác, như ở trên là `piv_`
- Trong Android Studio, Lint sẽ khuyên bạn nên gọi method `recycle()`, lý do là để loại bỏ các dữ liệu ràng buộc không hiệu quả sẽ không được sử dụng nữa.
## onAttachedToWindow
Sau khi parent view gọi hàm `addView (View)` thì view đó sẽ được gắn vào window. Bạn nên đặt view của mình bên trong `layout.xml,` giúp việc findbyId khi set thuộc tính hoặc lưu dưới dạng global reference .
## onMeasure
Nghĩa là custom view của bạn đã có được kích thước rõ ràng, nó rất quan trọng khi bạn đặt các kích thước đặc biệt cho view để phù hợp với màn hình.
Trong method này, bạn cần đặt `setMeasuredDimension(int width, int height)`
![](https://images.viblo.asia/599a7b1c-e5a1-4372-9291-e3c392b52cb8.png)

Khi setting size cho custom view, bạn nên handle các trường hợp view có thể có kích thước cụ thể trong layout.xml hoặc trong code. Để tính toán nó ta cần:
1. Tính toán width và height của view.
2. Get MeasureSpec (width and height) cho view của bạn

```
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int widthMode = MeasureSpec.getMode(widthMeasureSpec);
        int widthSize = MeasureSpec.getSize(widthMeasureSpec);
        int heightMode = MeasureSpec.getMode(heightMeasureSpec);
        int heightSize = MeasureSpec.getSize(heightMeasureSpec);
    }
```
3. Kiểm tra MeasureSpec mode mà người dùng thiết lập, qua đó thay đổi kích thước view của bạn
```
int width;
if (widthMode == MeasureSpec.EXACTLY) {
  width = widthSize;
} else if (widthMode == MeasureSpec.AT_MOST) {
  width = Math.min(desiredWidth, widthSize);
} else {
  width = desiredWidth;
}
```
Lưu ý:
- `MeasureSpec.EXACTLY` : là giá trị được hardcode, vậy nên bạn nên đặt width và height cho view của mình cụ thể.
- `MeasureSpec.AT_MOST` : được sử dụng để làm view của bạn lớn như khi bạn set width và height cụ thể ở trên.
- `MeasureSpec.UNSPECIFIED` : nó là kích thước thực của view, bạn có thể sử dụng kích thước mong muốn mà bạn đã tính toán ở trên.
Hãy chắc chắn các giá trị truyền vào là không âm rước khi set giá trị cuối cùng cho `setMeasuredDimension`, điều đó giúp tránh các issuse cho layout preview.
## onLayout
Trong method này, chúng ta sẽ gán kích thước và vị trí cho mỗi chidrend view, vậy nên nếu bạn đang muốn tạo một custom view đơn giản (extend từ View) không có các chidrend view phức tạp thì không cần phải override method này. 
## onDraw
Đây là method chính dùng để vẽ view. Cả hai object `Canvas` và `Paint` sẽ cho phép bạn vẽ bất cứ thứ gì mà bạn cần. 
`Canvas` trả về các hình dạng cơ bản khác nhau còn `Paint` sẽ trả về màu sắc cho hình dạng đó. Hiểu đơn giản là `canvas` vẽ một đối tượng và `paint` tạo kiểu cho nó, bất kể đó là đường thẳng, hình tròn hay hình chữ nhật.

![](https://images.viblo.asia/9e4666c9-dcaa-4474-a7f1-b9a9d61025aa.png)

Một lưu ý khi tạo custom view là bạn cần nhớ hàm `onDraw` được gọi rất nhiều lần, bất kể có sự thay đổi gì như kéo, cuộn, vuốt view thì đều sẽ được vẽ lại. Đó là lý do tại sao Android Studio khuyên bạn nên tránh phân bổ đối tượng trong quá trình onDraw, thay vào đó hãy chỉ tạo một lần và sử dụng lại. 

![](https://images.viblo.asia/558bc477-b4fd-4df6-a5b7-89d01a5407f9.png)

![](https://images.viblo.asia/06d39d8d-6ac7-4d75-881a-c45869d67eb0.png)

Lưu ý:
- Trong khi vẽ luôn luôn ghi nhớ tái sử dụng các đối tượng thay vì tạo đối tượng mới
- Đừng hardcode kích thước view của bạn khi vẽ để handle trường hợp một dev khác cũng cần một view như thế nhưng khác size. Do đó bạn nên thiết kế custom view tùy thuộc vào size.
## View Update
Từ vòng đời của View ở trên ta có thể thấy có 2 method chính dùng để vẽ lại view là `invalidate ()` và `requestLayout ()`, giúp bạn tạo một interface custom view, nhằm thay đổi view theo runtime. 
- `invalidate ()` : đơn giản là vẽ lại view, ví dụ như bạn cập nhật text, color hoặc là khi bạn touch vào. Có nghĩa view sẽ chỉ gọi onDraw thêm một lần nữa để update lại nó.
- `requestLayout ()` : cập nhật view chỉ từ `onMearsure()`, nó cập nhật lại và tính toán cả kích cỡ, vị trí của view, sau đó sẽ vẽ lại theo tham số mới.
## Animation
Animation trong custom view là một process các frame. Ví dụ bạn muốn tạo một vòng tròn có animate là từ nhỏ đến lớn, thì bạn phải tạo một vòng tròn và tăng kích cỡ nó từng lần một và sau mỗi lần tăng sẽ phải gọi lại hàm invalidate() để vẽ nó.
Sử dụng `ValueAnimator` để animate bất kỳ giá trị nào từ bắt đầu đến kết thúc.
```
ValueAnimator animator = ValueAnimator.ofInt(0, 100);
animator.setDuration(1000);
animator.setInterpolator(new DecelerateInterpolator());
animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
  public void onAnimationUpdate(ValueAnimator animation) {
    int newRadius = (int) animation.getAnimatedValue();
  }
});
animator.start();
```
Lưu ý: Đừng quên gọi `invalidate()` mỗi lần có một giá trị animate mới xuất hiện.

![](https://images.viblo.asia/33548d96-81aa-4baa-be26-9703cfd84f51.gif)

Hy vọng bài viết này sẽ giúp bạn phần nào hiểu và viết được custom view của mình. 

Bạn có thể tìm hiểu thêm ở [video này](https://www.youtube.com/watch?v=4NNmMO8Aykw)

[Nguồn tài liệu](https://proandroiddev.com/android-draw-a-custom-view-ef79fe2ff54b)