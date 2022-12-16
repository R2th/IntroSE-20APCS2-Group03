# Giới thiệu
Mỗi ngày chúng ta đều sử dụng rất nhiều ứng dụng khác nhau, hầu hết chúng khá giống nhau thậm chí là giống nhau trong cả thiết kế. Đó là lý do mà tại sao nhiều khách hàng yêu cầu những ứng dụng cần có thiết kế giao diện riêng, tùy chỉnh làm sao cho ứng dụng Android của họ trở nên độc đáo và tương phản với những ứng dụng còn lại.

Nếu một tính năng cụ thể đòi hỏi một giao diện tùy chỉnh mà không được cung cấp sẵn bởi Android (gốc). Điều này dẫn đến chúng ta cần thiết kế lại giao diện sao cho bám sát với bản thiết kế, làm như vậy sẽ khá mất thời gian giành cho việc thiết kế giao diện của ứng dụng. Nhưng như thế không có nghĩa là chúng ta (các lập trình viên) sẽ không làm mà tôi khuyên bạn nên làm điều đó, làm như vậy mang lại tính độc đáo cho ứng dụng của khách hàng và hơn nữa việc tùy chỉnh lại giao diện (custom view) mang lại rất nhiều điều thú vị.

Gần đây mình đã gặp phải một tính huống tương tự như vậy, đó là tùy chỉnh 1 **`page indicator`** cho **`Android ViewPager`** sao cho khi chuyển trang thì sẽ hiển thị các chấm tròn ở dưới để người dùng biết là họ đang xem "page" nào. Không giống như IOS thì Android không cung cấp sẵn 1 `View` để làm điều này, và việc tôi cần làm là tủy chỉnh lại `Page indicator` sao cho giống với thiết kế của khách hàng.

Nếu bạn chưa thực hiện việc tùy chỉnh giao diện (Custom View) bao giờ thì bài viết này mình sẽ giới thiệu tới các bạn một cách chi tiết để làm thể nào có thể thực hiện 1 `Custom View` được tối ưu nhất.

Đầu tiên mình sẽ giới thiệu với các bạn sơ qua về vòng đời của 1 **`View`**. Vì 1 lý do nào đó mà `Google` không cung cấp chính xác điều này, nó dẫn đến tương đối nhiều sự hiểu lầm giữa các lập trình viên và sainh ra nhiều lỗi khá là ngớ ngẩn. Vậy nên hãy nhớ kỹ về điều này.

![](https://images.viblo.asia/0e323f11-aedf-4838-be5b-92b8a9253fb4.png)

Sau đây mình sẽ giỡi thiệu với các bạn về chi tiết tứng phần trong vòng đời 1 của View.
# 1. Constructor
Một vòng đời của mọi `View` đều bắt đầu từ **Constructor**. Ở đây chúng ta có thể làm rất nhiều việc như chuẩn bị 1 bản vẽ 2D (Canvas), khỏi tạo các giá trị mặc định ban đầu, thực hiện 1 số điều kiện nhất định hoặc bất cứ điều gì bạn muốn...

Để cho `View` dễ dàng thiết lập và sử dụng thì ở đây chúng ta nên quan tâm đến **`AttributeSet interface`**. Nó giúp chúng ta lấy được các thông số mà chúng ta đã set cho View ở ngoài file `.xml`

Đầu tiên hãy tạo 1 file `attrs.xml` nơi đây sẽ đinh nghĩ tất cả các thuộc tính cho toàn bộ `Custom view` trong dự án của bạn. Như trong ví dụ trên mình cần tạo 1 Custom view tên là `PageIndicatorView` và Customview này cần 1 thuộc tính tên là `piv_count` để thiết lập số page count cho trước.

![](https://images.viblo.asia/2e8b0f04-e588-477a-8f0c-24b35a0c50b9.png)

Sau đó trong **Constructor** của **PageIndicatorView** mình sẽ lấy giá trị của thuộc tính này từ file thiết kế layout.

```Java
public PageIndicatorView(Context context, AttributeSet attrs) {
    super(context, attrs);
    TypedArray typedArray = getContext().obtainStyledAttributes(attrs, R.styleable.PageIndicatorView);
    int count = typedArray.getInt(R.styleable.PageIndicatorView_piv_count,0);
    typedArray.recycle();
}
```

Lưu ý:
- Khi tạo 1 thuộc tính cho `Custom View` thì bạn nên đặt 1 tiền tố cho nó để tránh nhầm lẫn giữa các thuộc tính của các `Custom View` khác nhau trong dự án.
- Sau khi bạn hoàn thành việc lấy dữ liệu từ file thiết kế layout bạn bạn nên gọi hàm **`recycle()`** để giải gióng bộ nhớ.

# 2. onAttachedToWindow

Sau khi View Parent gọi hàm `addView(View)`thì View sẽ được gắn vào 1 cửa sổ để hiển thị lên màn hình điện thoại. Ở giai đoạn này sau khi View được gắn lên 1 `Windowns` là lúc chúng ta sẽ biết được vị trí của View nằm ở đâu trong file thiết kế giao diện `layout.xml`, và thời điểm này là thời điểm tốt để bạn có thể lấy các Id của các View khác cùng nằm trong file `layout.xml` và lưu lại nếu sau này cần để sử dụng.

# 3. onMeasure
Đây là lúc mà View sẽ tính toán chiều cao, độ rộng cần thiết để View hiển thị. Ở đây bạn có thể thiết lập các thuộc tính cao, rộng cho View làm sao cho phù hợp nhất với bốc cục của giao diện.

Khi ghi đề phương thức này thì sau khi tính toán lại `width và  height` cho View thì bạn cần gọi hàm `setMeasuredDimension(int width, int height)` để thiết lập lại các thông số `width, height`.


# 4. onLayout
Phương thức này để gán thêm các View con vào View hiện tại. 
Như `PageIndicatorView` mình cần thiết kế ở trên thì mình không cần thiết ghi đè phương thức này.

# 5. onDraw
Đây là nơi phép thuật xảy ra. Có cả đối tượng Canvas và Paint sẽ cho phép bạn vẽ bất kỳ thứ gì bạn cần.

Một đối tương `Canvas` được cung cấp thông qua `parameter` của hàm `onDraw` nó là nền 2D cơ bản để bạn có thể vẽ các hình dạng khác nhau, trong khi đó đối tượng `Paint` được dùng để xác định hình dạng và màu sắc của đối tượng cần vẽ. Về cơn bản thì `Canvas` là tờ giấy trắng còn `Paint` là cây bút, bạn muốn thể hiện hình gì thì chỉ cần cầm cây bút vẽ lên tờ giấy trắng là xong.

![](https://images.viblo.asia/46fba898-e671-4e17-bdf6-99feb960baf6.png)

Trong khi `View` được hiển thị lên màn hình thì hàm `onDraw` sẽ được gọi nhiều lần, vì lý do đó mà bạn không nê khởi tạo đối tượng mới trong hàm `onDraw` mà nên khởi tạo đối tượng toàn cục rồi sử dụng lại trong hàm này bằng cách thay đổi thuộc tính của đối tượng đó.

![](https://images.viblo.asia/fbd83942-3e10-4292-a3c9-a8eb7b13a0f1.png)

Lưu ý:
- Trong khi thực hiện luôn ghi nhớ là tái sử dụng các đối tượng toàn cục vì IDE không thể **`recommend`** bạn nếu bạn gọi 1 hàm trong hàm `onDraw`.
- Không nên `hard code` kích thước của `View` trong hàm onDraw`. Cần xử lý tính toán các kích thước của `View` phụ thuộc vào đối tượng bạn cần vẽ.

# 6. View Update

Từ vòng đời của View bạn có thể nhận thấy View cung cấp cho chúng ta 2 hàm để có thể làm mới chính nó (`View`) là **invalidate() và requestLayout()**. 2 phương thức này giúp bạn có thể thay đổi View trong khi người dùng tương tác theo thời gian thực. Nhưng tại sao lại cần đến 2 phương thức để thực hiện 1 công việc, đươi đây sẽ là lý do để bạn biết điều đó.

- **invalidate()** cung cấp để gọi lại hàm `onDraw()` nhằm cho bạn có thể quay lại và tùy chỉnh màu sắc, cập nhật văn bản cho View nhưng lưu ý mà các cập nhật không nên thay đổi kích thước của View vì kích thước của View đã được tính toán trước ở hàm `onMeasure()`.
- **requestLayout()** nói đến đây chắc các bạn biết tác dụng của hàm này rồi đúng không. Hàm `requestLayout()` giúp lập trình viên có thể quay lại gần đầu vòng đời của View để có thể thay đổi kích thước View theo ý muốn.

# 7. Animation
Sự thay đổi trạng thái trên View kết hợp với hiệu ứng sẽ tạo cho người dùng cảm giác mượt mà hơn.

```Java
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

và đừng quên gọi invalidate() sau khi Animation kết thúc.

Bài viết trên đây mình đã giới thiệu cơ bản cách hoạt động của 1 View, và cách làm sao để bạn có thể Custom View theo ý muốn của mình. Hi vọng bài viết sẽ đem lại thêm hiểu biết về View trong Android cho các bạn.