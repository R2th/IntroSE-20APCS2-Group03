*Custom view không chỉ đơn giản là sử dụng phương thức onDraw() mà còn một hàm quan trong không kém đó là onMeasure(). Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu về hàm onMeasure và tầm quan trọng của nó*

Nếu đã từng custom một view trước đây, chúng ta không thường không cần override **onMeasure**, nhưng nó không phải là một điều tốt vì hàm onMeasure() mặc định không biết kích thước thực sự mà view cần (vì nó chỉ tính đến sự kết  hợp các layout params, thường được chỉ định trong XML, và *minWdith/minHeight* của view), do đó layout của chúng ta có thể cung cấp cho view một khoảng không gian lớn hơn những gì chúng thực sự cần.

# Bắt đầu
```Java
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec);
}
```

Do chúng ta sẽ tính toán kích thước của view nên chúng ta không cần gọi `super.onMeasure()`: Khi chúng ta quyết định override `onMeasure` nhiệm vụ của chúng ta là gọi `setMeasuredDimension(int width, int height)` do đó chúng ta không cần đến implementation mặc định của class `View`. Trong khi implement `onMeasure` chúng ta nên nhớ rằng:

* Padding của view
* Chiều rộng của chiều dài tối thiểu của view (sử dụng `getSuggestedMinimumWidth()` và `getSuggestedMinimumHeight()` để lấy những giá trị này)
* *widthMeasureSpec* và *heightMeasureSpec* là những yêu cầu được parent truyền cho chúng.

Do đó những tham số mà chúng ta nhận được trong phương thức `onMeasure`, `widthMeasureSpec` và `heightMeasureSpec`  sử dụng để tính toán một mode và một size (làm điều này để **reduce objects allocation**). Chúng ta sẽ thực hiện như sau:

```Java
int mode = MeasureSpec.getMode(widthMeasureSpec);
int size = MeasureSpec.getSize(widthMeasureSpec);
```

Trong khi size đơn giản chỉ là số pixel, mode là một khái niệm trừ tượng. Có 3 mode sau đây:

* `MeasureSpec.EXACTLY ` có nghĩa là view của chúng ta phải đúng chính xác kích thước được chỉ định. Điều này xảy ra khi chúng ta sử dụng một fixed size (như `android:layoutWidth="64dp"` )hoặc là `match_parent` (mặc dù đây là trách nhiệm của layout).
* `MeasureSpec.AT_MOST ` có nghĩa là view của chúng ta có thể lớn như nó muốn với kích thước được chỉ định. Điều này xảy ra khi chúng ta sử dụng `wrap_content` cũng có thể là `match_parent`
* `MeasureSpec.UNSPECIFIED ` có nghĩa là view  có thể chiếm nhiều không gian như nó muốn. Đôi khi điều này được sử dụng khi parent cố gắng xác định độ lớn của mỗi child cần trước khi gọi lài `measure`

# ResolveSize
Ngoài trừ những ràng buộc từ view cha, độ lớn của view của chúng ta phụ thuộc vào yếu tố gì? Ví dụ, nếu bạn vẽ một text bạn có thể tính toán nó (và nhiều đối tượng view cần tính toán nữa). Một khi chúng ta đạt được width và height mong muốn (đừng quên tính toán cả padding) sử dụng phương thức `resolveSize(int size, int measureSpec)`  để làm cho view ucar bạn phù hợp với các yêu cầu từ view cha.

Điều mà phương thức `resolveSize` làm là gọi `resolveSizeAndState` và sau đó xóa những phần không cần thiết từ kết quả.

Làm cách nào để `resolveSize` và `resolveSizeAndState` lựa chọn tùy chọn tốt nhất cho chúng ta? Nó sẽ trả về size mà bạn đã tính nếu mode là  MeasureSpec.UNSPECIFIED, size chưa trong `measureSpec` nếu `MeasureSpec.EXACTLY`, và giá trị nhỏ nhất giữa hai giá trị nếu MeasureSpec.AT_MOST.

Nêu bạn nghĩ rằng `resolveSize` mặc định không phù hợp với bạn. Bạn có thể thay đổi nó, ví dụ, phương thức dưới đây hoạt động giống như `resolveSize`.

```Java
private int measureDimension(int desiredSize, int measureSpec) {
        int result;
        int specMode = MeasureSpec.getMode(measureSpec);
        int specSize = MeasureSpec.getSize(measureSpec);

        if (specMode == MeasureSpec.EXACTLY) {
            result = specSize;
        } else {
            result = desiredSize;
            if (specMode == MeasureSpec.AT_MOST) {
                result = Math.min(result, specSize);
            }
        }

        if (result < desiredSize){
            Log.e("ChartView", "The view is too small, the content might get cut");
        }
        return result;
    }
```

Hãy nhớ rằng `onMeasure` yêu cầu bạn gọi `setMeasuredDimension(int width, int height)` một khi bạn biết độ lớn cần thiết của view. Nếu bạn không gọi phương thức đó một *IllegalStateException* sẽ được ném ra.

Do đó onMeasure sẽ trông như thế này:

```
@Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        Log.v("Chart onMeasure w", MeasureSpec.toString(widthMeasureSpec));
        Log.v("Chart onMeasure h", MeasureSpec.toString(heightMeasureSpec));

        int desiredWidth = getSuggestedMinimumWidth() + getPaddingLeft() + getPaddingRight();
        int desiredHeight = getSuggestedMinimumHeight() + getPaddingTop() + getPaddingBottom();

        setMeasuredDimension(measureDimension(desiredWidth, widthMeasureSpec),
                measureDimension(desiredHeight, heightMeasureSpec));
    }
```

# Mẹo nhỏ
Trong quá trình debug custom view của bạn bạn có thể đặt đoạn code này ở đầu hàm `onMeasure` của bạn:

```
Log.v("[View name] onMeasure w", MeasureSpec.toString(widthMeasureSpec));
Log.v("[View name] onMeasure h", MeasureSpec.toString(heightMeasureSpec));
```

Nó sẽ print ra một thứ tương tự như thế này:

```
V/ChartView onMeasure w: MeasureSpec: EXACTLY 720
V/ChartView onMeasure h: MeasureSpec: AT_MOST 1118
```

Khi đó bạn sẽ luôn luôn biết được yêu cầu mà view cha truyền vào và bạn có thể biết rằng view của bạn có hoạt động đúng hay không.

# Kết
Bài viết có tham khảo: https://medium.com/@quiro91/custom-view-mastering-onmeasure-a0a0bb11784d

Cảm ơn các bạn đã theo dõi bài viết. Hi vọng mọi người sẽ đọc các bài tiếp theo của mình trong tương lai. Thank you  ver much.