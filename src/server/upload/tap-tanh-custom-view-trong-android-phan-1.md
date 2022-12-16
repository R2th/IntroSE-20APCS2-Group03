Anh em code Android chắc cũng biết Android platform cung cấp khá đa dạng nhiều loại View Classes để "fit" với từng loại dự án khác nhau. Tuy nhiên, sẽ có một số dự án đặc trưng đòi hỏi sự cải tiến hoặc biến đổi khác nhau của view , đây là lí do ta nên biết custom view để tăng tính linh hoạt và tái sử dụng view.

![image.png](https://images.viblo.asia/b6459c79-1855-484e-892e-fec33aa15d23.png)

Ở phần 1 này chúng ta sẽ đi qua về "view lifecycle" và custom một số attributes view cơ bản , chưa có draw canvas và onMeasure() đâu :)) mình sẽ viết về nó ở phần 2.

# 1. View lifecycle
Activity , fragment , service ,... đều là các component sở hữu 1 vòng đời của riêng nó , View cũng như thế. Vòng đời của 1 view được mô tả như sau:
![image.png](https://images.viblo.asia/1d1f58bd-817e-4b50-b208-51420c5b217f.png)

### Constructor:

Khúc này chắc khá nhiều anh em hoang mang kiểu thấy tận 4 constructor overload được gọi , vậy chúng để làm gì nhỉ ?
```
constructor(context: Context): super(context)
```

Constructor này được gọi khi view chính thức được chạy vào context nơi mà view được chạy vào , có thể truy cập vào theme , resource qua context này .

```
constructor(context: Context, attrs: AttributeSet): super(context , attrs)
```

Thằng này được gọi khi ta inflate 1 view từ XML , cung cấp các thuộc tính default của AttributeSet cho sẵn và theme cũng là từ theme mặc định của context.

```
constructor(context: Context, attrs: AttributeSet, defStyle: Int): super(context, attrs, defStyle)
```

Được gọi khi view được inflate từ XML , kèm theo 1 style được lấy từ theme attribute.

```
constructor(context: Context, attrs: AttributeSet, defStyle: Int, defStyleRes: Int): super(context, attrs, defStyle, defStyleRes)
```

Được gọi khi view được inflate từ XML , kèm theo 1 style được lấy từ theme attribute hoặc style resource.

### OnAttachToWindow(): 

Đây là callback được gọi đến khi view được attach tới 1 window , lúc này view chính thức active và vẽ trên bề mặt window đó , các attribute và listener được thiết lập.

### OnDetachToWindow():

Lúc này view chính thức được gỡ khỏi bề mặt window , các attributes hay các resource được giải phóng và view inactive , được gọi khi chúng ta remove view khỏi Viewgroup hoặc destroy parent context của nó (fragment , activity,...)

### onMeasure():

Callback này được gọi để xác định , tính toán kính thước của các view phụ thuộc vào kích thước mà parent , viewgroup của nó cung cấp. Bạn sẽ được cung cấp 2 param là "widthMeasureSpec" và "heightMeasureSpec" , 2 chỉ số này được parent view cung cấp là kích thước mà view của bạn được vẽ.

### onLayout():

Callback này được gọi khi khi việc tính toán kích thước done và view được định vị trên màn hình.

### onDraw():

Sau khi tính toán và định hình vị trí  , view được vẽ trên layout mà nó được chỉ định. Object Canvas được sinh ra để thực hiện điều này .

Note: Vì onDraw() được gọi multiple time khi view có bất kì sự thay đổi nào trên màn hình , nên cẩn thận với việc khởi tạo nhiều object ở đây nha.

### invalidate():

Việc gọi method này làm mất hiệu lực của toàn bộ view , khi view đang được hiển thị thành công thì onDraw() sẽ được call ở 1 vài thời điểm trong tương lai.

Note: Thay vì gọi thẳng onDraw() , chúng ta sẽ gọi tới invalidate() , để tối ưu hóa hiệu năng, ta nên hạn chế call method này nhất có thể.

### requestLayout():

Method này được call khi có bất kì sự thay đổi nào trong layout view bound , nó sẽ định trước layout phase (measure -> layout -> draw) . 

Note: Chúng ta nên gọi phương thức này trên UI thread , nếu nó được gọi trên non-UI thread , hãy sử dụng Handler.

# 2. Define custom Attributes.

Custom views có thể được cấu hình qua XML resource file và qua thẻ <declare-styleable . Ví dụ bạn cần cấu hình shapeColor và isDisplayShapeName , ta sẽ khai báo như sau:

```
<resources>
   <declare-styleable name="ShapeSelectorView">
       <attr name="shapeColor" format="color" />
       <attr name="displayShapeName" format="boolean" />
   </declare-styleable>
</resources>
```

Khi đã define attribute trong resource , lúc này có thể sử dụng chúng trong layout XML :

```
<com.codepath.example.customviewdemo.ShapeSelectorView
           app:shapeColor="#7f0000"
           app:displayShapeName="true"
           android:id="@+id/shapeSelector"
           android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:layout_above="@+id/btnSelect"
           android:layout_alignParentLeft="true"
           android:layout_below="@+id/tvPrompt" />
```

# 3. Apply custom attributes.

Khi đã custom xong các thành phần (displayShapeName, shapeColor) , chúng ta cần trích xuất các thành phần này trong file CustomView , define chúng trong constructor với tham số truyền vào là AttributeSet (như tui đã nói bên trên).

![image.png](https://images.viblo.asia/dff45fd4-cd3f-4072-905b-ab006ea7c070.png)

Cùng với các method get,set các thuộc tính được khai báo:

```
public void setDisplayingShapeName(boolean state) {
    this.displayShapeName = state;
    invalidate();
    requestLayout();
  }
  
  public void setShapeColor(int color) {
    this.shapeColor = color;
    invalidate();
    requestLayout();
  }
```

Với các method này ta có thể set các thuộc tính trên bên ngoài code tùy với mục đích sử dụng.

# 4. Tổng kết.

Trên đây là bài viết nói về ViewLifeCycle và custom AttributeSet cơ bản. Phần 2 chúng ta sẽ nói tới draw view sử dụng Canvas và cách để build 1 thư viện crop image sử dụng Canvas.

Bài viết tham khảo:

https://guides.codepath.com/android/defining-custom-views#apply-custom-attributes

https://www.oodlestechnologies.com/dev-blog/understanding-custom-view-android/