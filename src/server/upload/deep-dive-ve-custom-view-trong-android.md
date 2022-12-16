# 1. Custom View là gì?

    CustomView là tạo 1 class extend từ View, override onDraw() và sử dụng Pain và Canvas để vẽ trên View. Sâu i zì :V

TextView, Edittex, Checkbox,... Tất cả những thứ đó dù cha ông nó là gì đi nữa, thì cuối cùng vẫn là "đệ" của View. Ví dụ như EditText extends TextView rồi thì TextView extends View. Cũng như Activity, Fragment, Service,... Thì View cũng có vòng đời của nó. Tuy nhiên thì Google không có một tài liệu chính thống nào cho nó, mà hình ảnh dưới đây hoàn toàn là do kinh nghiêm ông cha ta đúc kết lại.
# 2. Lifecycle
![](https://images.viblo.asia/e202d65a-1b8f-41b1-8c6e-3ee2e759ef6c.png)


### Constructor
1. View(Context context)constructor này sẽ được sử dụng khi mà chúng ta add view lúc code.
2. View(Context context, AttributeSet attrs) constructor này sẽ được sử dụng khi chúng ta khai báo view trong XML (file layout xml, attrs chứa các attribute truyền vào view trong xml).
3. View(Context context, AttributeSet attrs, int defStyleAttr) cũng dùng trong XML nhưng thêm 1 tham số đó là các thuộc tính style của theme mặc định.
4. View(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) như cái 3 nhưng có thêm tham số để truyền style riêng thông qua resource.

Chúng ta để ý tới constructor 2. Chúng ta sẽ dùng AttributeSet để truyền các tham số, các giá trị khởi tạo ban đầu. Đầu tiên tạo file values/attrs.xml<br>

```xml
<ImageView
  android:layout_width="wrap_content"
  android:layout_height="wrap_content"
  android:src="@drawable/icon"/>
```

*Question?*
- Làm thế nào để thêm tham số vào contructor custom view?
- `layout_width`, `layout_height`, `src`nòi ở đâu ra?
- Mấy cái trên truyền qua View như thế nào?

>declare-styleable

    Chúng được nòi ra từ <declare-styleable> trong file attrs.xml
    Mỗi declare-styleable sẽ tạo ra 1 R.styleable.[tên] cộng với 1 R.styleable.[tên]_[thuộc tính] cho từng thuộc tính
    - R.styleable.[tên]: 1 array bao gồm tất cả các thuộc tính
    - R.styleable.[tên]_[thuộc tính]: 1 index trong array

```xml

<declare-styleable name="ImageView">
  <!-- Sets a drawable as the content of this ImageView. -->
  <attr name="src" format="reference|color" />
</declare-styleable>
```
>AttributeSet
```java
XmlPullParser parser = resources.getXml(myResource);
AttributeSet attributes = Xml.asAttributeSet(parser);
```

    XML -> View dưới dạng 1 AttributeSet - tập hợp các thuộc tính.
    Thường thì không truy cập biến này 1 cách trực tiếp, thay vào đó sẽ parsing nó qua Theme.obtainStyledAttributes() – convert  resource references (ví dụ  "@string/my_label") qua kiểu mong muốn - trả về 1 TypedArray để truy cập các thuộc tính. Nếu k thích thì sử dụng getAttributeResourceValue(int, int) để check thủ công sau đó tìm kiếm resource nếu cần


```java
public ImageView(Context context, AttributeSet attrs) {
  TypedArray ta = context.obtainStyledAttributes(attrs, R.styleable.ImageView, 0, 0);
  Drawable src = ta.getDrawable(R.styleable.ImageView_src);
  setImageDrawable(src);
  ta.recycle();
}
```
recycle() call khi đã xong việc với attribute. Lý do là để bỏ những rằng buộc không cần thiết đến với các dữ liệu không được sử dụng lại nữa 


```xml

<declare-styleable name="ImageView">
  <!-- Sets a drawable as the content of this ImageView. -->
  <attr name="src" format="reference|color" />
</declare-styleable>

<?xml version="1.0" encoding="utf-8"?>
<resources>
    <declare-styleable name="IndicatorView">
        <attr name="iv_color_selected" format="color"/>
        <attr name="iv_distance" format="dimension"/>
    </declare-styleable>
</resources>
```
`iv` là tiền tố phân biệt với các custom view hoặc thư viện khác

- Tên Custom view: `IndicatorView`
- Thuộc tính khoảng cách `iv_radius_distance` kiểu `dimension`
- Thuộc tính màu selected `iv_color_selected` kiểu `color`

1 số kiểu như:
- reference 
    
        tham chiếu tới id tài nguyên khác (e.g, "@color/my_color", "@layout/my_layout")
- color
- boolean
- dimension
- float
- integer
- string
- fraction
- enum
    ```xml
    <attr name="my_enum_attr">
        <enum name="value1" value="1" />
        <enum name="value2" value="2" />
    </attr>
    ```
- flag
    ```xml
    <attr name="my_flag_attr">
        <flag name="fuzzy" value="0x01" />
        <flag name="cold" value="0x02" />
    </attr>
    ```
Có thể set 2 kiểu cho thuộc tính như `format="reference|color"`

Trong class CustomView extend từ View với constructor có chứa tham số AttributeSet. Lấy các thuộc tính và giá trị như code dưới:
```kotlin
class IndicatorView : View {
    
    constructor(context: Context) : super(context)

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        init(context, attrs)
    }

    private fun init(context: Context, attrs: AttributeSet) {
        val attribute = context.obtainStyledAttributes(attrs, R.styleable.IndicatorView)

        this.radiusUnselected =
            attribute.getDimensionPixelSize(R.styleable.IndicatorView_iv_radius_unselected, DEFAULT_RADIUS_UNSELECTED)

        this.distance = attribute.getInt(R.styleable.IndicatorView_iv_distance, DEFAULT_DISTANCE)

        this.colorSelected =
            attribute.getColor(R.styleable.IndicatorView_iv_color_selected, Color.parseColor("#ffffff"))

        attribute.recycle()
    }
}


```
`recycle()` call khi đã xong việc với attribute. Lý do là để bỏ những rằng buộc không cần thiết đến với các dữ liệu không được sử dụng lại nữa (Vì mục đích của ta chỉ cần lấy được các giá trị của attribute).

### OnAttachedToWindow
Sau khi parent view gọi addView(View) thì custom view sẽ được attach vào window. Ở giai đoạn này, custom view sẽ biết được vị trí các view ở xung quanh nó. Lúc này ta có thể findViewById được và lưu vào global reference (nếu cần).

### OnMeasure
![](https://images.viblo.asia/0f5130a4-53e8-4a9c-a95f-f5b1ba1b1468.PNG)
![](https://images.viblo.asia/4133e693-d245-4830-8070-6a627ad1e358.PNG)
![](https://images.viblo.asia/f6c68b45-2504-4449-8aa9-0a0e928968e0.PNG)
![](https://images.viblo.asia/e4e3b74a-55b0-4081-bfc6-5b498c36ebaf.PNG)

giao diện có 2 thành phần chính đó là view cha (ViewGroup) và view con, các view con sẽ nằm trong view cha. Chúng ta có thể xác định kích thước của các view thông qua code Java là LayoutParams() hoặc trong XML là layout_width, layout_height. Để view cha có thể tính toán và sắp xếp các view con của nó một cách hòa thuận, thì cơ bản sẽ như thế này. Khi method onMeasure của view cha được thực hiện, view cha sẽ tìm và coi các thông số (width & height) của tất cả các view con và tính toán xem đứa con đó kích thước sẽ nên như thế nào dựa trên không gian khả dụng và thông số các view con đó yêu cầu muốn có. Sau đó nó sẽ thiết lập các liên kết, rồi chuyển thông tin kích cỡ và lời nhắn thông qua MeasureSpec đến các đứa con của mình (thông tin này sẽ được view con nhận tại method onMeasure của nó). Lời nhắn có thể sẽ mang những ý nghĩa như này AT_MOST: "Dù thế nào đi nữa thì con cũng chỉ cao 400dp mà thôi", hoặc EXACTLY: "Con nhất định phải cao 400dp", hoặc UNSPECIFIED: "Con muốn như thế nào thì tùy ý con"

```java
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
      int widthMode = MeasureSpec.getMode(widthMeasureSpec);
      int widthSize = MeasureSpec.getSize(widthMeasureSpec);
      int heightMode = MeasureSpec.getMode(heightMeasureSpec);
      int heightSize = MeasureSpec.getSize(heightMeasureSpec);

      //desiredWidth: dựa vào nội dung muốn hiển thị mà bạn sẽ tính ra bạn cần tối thiểu bao nhiêu
      //không gian để bạn hiển thị
      ...
      int width;
      if (widthMode == MeasureSpec.EXACTLY) {
          width = widthSize;
      } else if (widthMode == MeasureSpec.AT_MOST) {
          width = Math.min(desiredWidth, widthSize);
      } else {
          width = desiredWidth;
      }
      ...
}
```
- `MeasureSpec.EXACTLY`: điều này nghĩa là chúng ta đã xác định cứng kích thước trong xml, như kiểu layout_width=300dp.
- `MeasureSpec.AT_MOST`: không nên vượt quá giới hạn này, vậy nên mới sử dụng câu lệnh Math.min(desiredWidth, widthSize).
- `MeasureSpec.UNSPECIFIED`: cho bạn thỏa sức, nhưng chúng ta chỉ cần những gì chúng ta thực sự cần mà thôi width = desiredWidth.

Sau khi view con tính toán xong việc nó cần kích thước như thế nào thì gọi đến method setMeasuredDimension để xác nhận, view cha sẽ nhận được thông tin đó và sẽ còn phải tính toán thêm vài lần nữa mới kết thúc, đoạn này chúng ta chưa cần quan tâm.

### onLayout
Tại phương thức này thì mọi chuyện đã xong, kích thước đã được set cho tất cả các view con, lúc này chúng ta dùng lệnh getWidth, getHeight thì mới có giá trị, chứ ở các method trước chưa tính toán xong thì chỉ có = 0 mà thui.

### onDraw
sử dụng Canvas và Paint object để vẽ. Canvas instance được nằm trong parameter của onDraw, nó đơn giản là để vẽ các hình khác nhau, còn Paint object sẽ chỉ định màu sắc (chung hơn là style) của hình đó. Nó được sử dụng hầu như mọi nơi đễ vẽ bất kì một đường thằng, hình vuông, tròn hay bất cứ hình gì…<br>
Khi vẽ custom view, ta cần ghi nhớ một điều rằng onDraw sẽ được gọi rất nhiều lần. Khi có bất kì sự thay đổi nào, khi ta vuốt hay kéo ngang màn hình … view sẽ được vẽ lại. Chính vì vậy mà Android Studio khuyên rằng nên tránh khai báo khởi tạo Object trong method này mà thay vào đó nên tạo mới ở chỗ khác và gọi sử dụng nó.

### ViewUpdate 
Nhìn vào View lifecycle sẽ thấy 2 method được sử dụng để tự nó thực hiện việc vẽ lại: `invalidate()` và `requestLayout()` giúp bạn tương tác qua lại với custom view, bạn hoàn toàn có thể thay đổi view khi đang runtime. Nhưng tại sạo lại có tận 2 method ?

- `invalidate()` sử dụng được vẽ lại các view đơn giản. Ví dụ khi bạn update lại text, color hay tương tác chạm điểm. Có nghĩa là view chỉ cần đơn giản gọi onDraw() để update lại trạng thái của view.
- `requestLayout()` như bạn thấy trong sơ đồ lifecycle thì method này sẽ gọi lại view update từ onMeasure(). Điều đó có nghĩa là việc thực hiện vẽ lại view sẽ được tính toán lại kích thước. Kích thước mới có thể được tính lại ở onMeasure vẽ sẽ thực hiện vẽ theo kích thước mới đó.

### Touching
Để handle các sự kiện chạm , kéo vào màn hình, override `onTouchEvent()`

# 3. Optimize performance
- *Invalidate intelligently*: không gọi `invalidate()` cho đến khi 1 cái gì đó hiển thị cho user thay đổi. Nếu có thể nên pass 1 đối tượng vẽ vào `invalidate()` để nói với GPU phần nào của màn hình được vẽ
- *Draw carefully*: không vẽ những thứ mà người dùng không nhìn thấy. Màn hình là một bề mặt 2D và sẽ vô dụng khi vẽ một thứ mà sau đó bị chồng chéo bởi một thứ khác, use `Canvas.clipRect()`. Không vẽ một cái gì đó nằm ngoài giới hạn màn hình, use `canvas.quickReject()`
- *Never allocate objects in onDraw*: onDraw() được gọi 60 lần/s, mặc dù bộ thu gom rác(garbage collectors) rất nhanh nhưng nó chạy trên 1 luồng riêng nên ăn rất nhiều pin. Tóm lại là không khởi tạo object trong onDraw 

# 4. Thing
Mình là 1 Big Fan của câu ngạn ngữ thần thành *Đừng đi làm lại cái bánh xe mà người khác đã làm rồi*.

Vậy lên theo mình thì với các View Custom basic thì chúng ta lên 
sử dụng thư viện cho nhanh với điều kiện các thư viện này được maintain dễ custom. Với các TH có yêu cầu design thì tất nhiên rồi, quất thôi tuy có mất nhiều time. Còn với 1 số TH như Toolbar, Loading View, Swip Refersh, NoDataScreen ... của riêng app thì nên custom vì nó khá đơn giản không phải vẽ view nhiều, dễ dàng dùng và sửa đổi về sau.

>Nguồn: [1](https://viblo.asia/p/android-custom-view-924lJr6zlPM)
[2](https://kipalog.com/posts/Android--Hieu-sau-hon-ve-CustomView-va-Huong-dan-xay-dung-thu-vien-UI-IndicatorView)
[3](https://medium.com/dualcores-studio/make-an-android-custom-view-publish-and-open-source-99a3d86df228#.oqx0a0tiq)
[4](https://medium.com/@douglas.iacovelli/the-beauty-of-custom-views-and-how-to-do-it-79c7d78e2088)
[5](https://academy.realm.io/posts/360andev-huyen-tue-dao-measure-layout-draw-repeat-custom-views-and-viewgroups-android/)
[6](https://medium.com/mindorks/how-to-create-custom-views-141dc0570e57)
[7](https://proandroiddev.com/building-a-custom-view-a-practical-example-2753cb9d0e80)