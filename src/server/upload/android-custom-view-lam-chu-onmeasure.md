# I.Giới thiệu
 Custom view không chỉ về phương thức onDraw(), onMeasure() cũng quan trọng không kém và sau đây mình sẽ giới thiệu về nó… 
 
 Nếu Bạn đã từng xây dựng ứng dụng với custom view trước đây, bạn có thể thường không phải override onMeasure, nhưng dù sao điều đó  cũng phải một ý tưởng tồi: việc triển khai mặc định không nhận biết lượng không gian (diện tích) của bạn thực sự cần dùng vì nó chỉ tính  đến sự kết hợp các thông số layout, thường được chỉ định trong XML. Do đó, bạn có thể bỏ qua ý nghĩ của mình về nó chiếm nhiều diện tích hơn là nó thực sự cần.

# II. Bắt đầu
```
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec);
}

```
 Vì chúng ta sẽ xử lý việc đo lường cho view, chúng ta không cần gọi super.onMeasure: Khi chúng ta quyết định override onMeasure, nhiệm vụ của chúng ta là gọi setMeasureDimension(int width, int height) vì vậy chúng ta không cần implement lớp View mặc định. Trong khi thực hiện onMeasure chúng ta nên ghi nhớ:
*   Padding 
*  	Chiều rộng nhỏ nhất và chiều cao nhỏ nhất của view. Sử dụng **getSuggestedMinimumWidth()** và **getSuggestedMinimumHeight()** để lấy giá trị của chúng
*  **widthMeasureSpec** and **heightMeasureSpec** là cái param được truyền từ lớp cha
####
 Các tham số chúng ta nhận được khi override onMeasure là widthMeasureSpec và heightMeasureSpec, là các biến số nguyên phức hợp bit được tạo bởi một chế độ và một kích thước (cấu trúc đã được thực hiện theo cách này để giảm sự phân bổ đối tượng). Chúng ta có thể làm cho chúng rõ ràng bằng cách:
```
int mode = MeasureSpec.getMode(widthMeasureSpec);
int size = MeasureSpec.getSize(widthMeasureSpec);
```

 Mặc dù kích thước đơn giản là số pixel, chế độ xem thì trừu tượng hơn. Có ba chế độ:
* 	**MeasureSpec.EXACTLY** có nghĩa là view sẽ được hiển thị với kích thước nó được chỉ định. Điều này có thể xảy ra khi chúng ta sử dụng kích thước cố định như `android:layout_width="64dp` hoặc thậm chí là *matchparent*
* 	**MeasureSpec.AT_MOS**T có nghĩa là view sẽ được hiển thị với kích thước lớn hơn được chỉ định. Điều này có thể được xảy ra khi chúng ta sử dụng *wrapcontent* hoặc cũng có thể là *matchparent*
* 	**MeasureSpec.UNSPECIFIED** có nghĩa chế độ này view có thể hiển thị với nhiều hơn không gian như mong muốn. Đôi khi, điều này được sử dụng khi parent đang cố gắng xác định độ lớn của từng con trong layout trước khi gọi lại measure
# II. Custom Resolve Size
-	CHúng ta có thể sử dụng phương thức` resolveSize(int size, int measureSpec)` ddeer điều chỉnh nhu cầu của bạn với ràng buộc mặc định
-	Những gif **resolveSize** làm là gọi **resolveSizeAndState** và sau đó xóa bit tùy chọn (Có thể là MEASURED_STATE_TOO_SMALL) từ kết quả.
-	Làm cách nào để resolveSize / resolveSizeAndState chọn tùy chọn tốt nhất cho bạn? Nó sẽ trả về kích thước bạn đã tính nếu chế độ là** MeasureSpec.UNSPECIFIED**, kích thước chứa trong measureSpec nếu **MeasureSpec.EXACTLY** hoặc giá trị tối thiểu giữa hai phương thức nếu **MeasureSpec.AT_MOST**.
-	Nếu bạn nghĩ rằng  resolveSize không phù hợp với bạn, bạn luôn có thể custom lại nó: phương thức ví dụ bên dưới hoạt động như resolveSize nhưng cũng ghi nhật ký nếu kết quả cuối cùng nhỏ hơn desiredSize.

```
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
 Như bạn có thể thấy, nếu specMode bằng EXACTLY thì chúng ta chỉ cần thiết lập specSize là kết quả, nếu không chúng ta sử dụng minWidth của chúng ta được cộng lại với padding. Đó là về cơ bản trường hợp UNSPECIFIED, nhưng nếu kích thước là AT_MOST, chúng ta giữ mức tối thiểu giữa giá trị này và specSize.
 
 Hãy nhớ rằng *onMeasure*  yêu cầu  bạn gọi `setMeasuredDimension(int width, int height)` một khi bạn biết độ lớn của view. Nếu không, một  *IllegalStateException* sẽ được ném ra.
 
 Vì vậy,  onMeasure có thể như sau:
 
```
 @override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        Log.v("Chart onMeasure w", MeasureSpec.toString(widthMeasureSpec));
        Log.v("Chart onMeasure h", MeasureSpec.toString(heightMeasureSpec));

        int desiredWidth = getSuggestedMinimumWidth() + getPaddingLeft() + getPaddingRight();
        int desiredHeight = getSuggestedMinimumHeight() + getPaddingTop() + getPaddingBottom();

        setMeasuredDimension(measureDimension(desiredWidth, widthMeasureSpec),
                measureDimension(desiredHeight, heightMeasureSpec));
    }
```
#    III. Mẹo
Khi **debug** bạn có thể dùng:
```
         Log.v("[View name] onMeasure w", MeasureSpec.toString(widthMeasureSpec));
        Log.v("[View name] onMeasure h", MeasureSpec.toString(heightMeasureSpec));
```     
Và đây là log:       
    ```
    V/CustomView onMeasure w: MeasureSpec: EXACTLY 720
    
    V/Customview onMeasure h: MeasureSpec: AT_MOST 1118
    ```
    
#     Kết luận
Như vậy mình đã giới thiệu xong về onMeasure trong custom view của android. Cảm ơn các bạn đã theo dõi bài viết của mình!