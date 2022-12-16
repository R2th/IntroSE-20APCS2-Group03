# Tổng quan
Khi phát triển 1 ứng dụng Android, giao diện là 1 phần cực kỳ quan trọng, vì nó tương tác trực tiếp với người dùng và là thứ quyết định đến cảm tình của người dùng với ứng dụng. Chắc hẳn, Developer chúng ta luôn muốn giao diện ứng dụng của mình phải thật bắt mắt, bắt trend, đem lại cảm tình tốt cho người dùng. Hiện nay có khá nhiều thư viện hỗ trợ xây dựng giao diện đẹp và tối ưu. Tuy nhiên, trong bài viết này, mình sẽ chia sẻ một số tiểu tiết nhỏ giúp trang trí cho giao diện thêm sinh động và sáng sủa hơn. Tuy nhỏ nhưng những tips này chắc hẳn sẽ đem lại hiệu ứng rất tốt cho ứng dụng của bạn. 
Những tips mình sẽ chia sẻ gồm:

- Thay đổi màu bóng đổ View.
- Tạo hiệu ứng Ripple cho các phần tử View.
- Làm trong suốt Status Bar hoặc đổi màu tùy thích.
- Xây dựng Background Gradient đẹp.

# Thay đổi màu bóng đổ View
Hiệu ứng đổ bóng giúp các phần tử View cần nhấn mạnh nổi bật lên so với tổng thể khung hình, tạo hiệu ứng vật thể tốt cho các phần tử hiển thị. Để đổ bóng cho 1 View, ta đơn giản chỉ cần set thuộc tính Elevation là xong, Ví dụ với Elevation = 12dp, ta sẽ được hiệu ứng sau: 

![](https://images.viblo.asia/f25cc403-1d95-40ee-b156-13f559dc163f.jpg)

Vậy nếu ta muốn custom màu sắc của bóng đổ thì sao? Ví dụ như hiệu ứng kính màu? Chắc hẳn hiệu ứng này sẽ làm cho giao diện đẹp hơn rất nhiều. Khi đó, ta sẽ sử dụng đến thuộc tính  `android:outlineSpotShadowColor`. Thuộc tính này cho phéo ta thiết lập màu sắc cho bóng đổ, Ví dụ với outlineSpotShadoeColor cùng màu với background của View, ta sẽ thu được kết quả sau:

![](https://images.viblo.asia/ead392c9-a1ad-46e0-bb39-0112b33545bd.jpg)

Kết hợp thuộc tính này với 1 chút mắt thẩm mỹ, chắc chắc giao diện ứng dụng của bạn sẽ hiện đại hơn rất nhiều.

# Tạo hiệu ứng Ripple cho các phần tử View

Mặc định, Ripple là hiệu ứng mỗi khi click vào 1 button hay 1 phần tử nào đó, được Material Design hỗ trợ. Tuy nhiên, với những view ta custom background, hoặc textView, cardView, ... Mặc định không có hiệu ứng này thì sao?. Lúc này ta sẽ tự set cho chúng. 

Ở đây, ta sẽ kết hợp 3 thuộc tính là clickable, forcusable và foreground để tự tạo hiệu ứng Ripple cho View. Thêm 3 thuộc tính này cho View như code bên dưới, ta sẽ thu được kết quả giống như hiệu ứng mặc định của Material Design:

```
android:clickable="true"
android:focusable="true"
android:foreground="?attr/selectableItemBackgroundBorderless"
```

Hiệu ứng này khá hữu ích, giúp tương tác giữa người dùng với các view trở nên thật hơn, không chỉ còn là những dòng text và icon tĩnh nữa, khi kết hợp với Card View, radius, .. ta thu được kết quả như hình dưới:

![](https://images.viblo.asia/08bf330e-4a0f-4a2d-bd1c-15f72acabeda.gif)


# Làm trong suốt Status Bar hoặc đổi màu tùy thích
Để làm trong suốt Status Bar cho 1 activity, ta sẽ tạo 1 hàm trong activity đó có nội dung như sau:

```
private fun makeStatusBarTransparent() {
        window.apply {
            setFlags(
                WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
            )
            statusBarColor = Color.TRANSPARENT
        }
    }
```

Trong đó, `Color.TRANSPARENT` chính là màu sắc bạn muốn set cho status bar (trường hợp này là trong suốt). Ta hoàn toàn có thể set 1 màu bất kỳ cho status bar, miễn sao nó không cùng màu với thông tin hiển thị trên đó (tùy thuộc vào theme mà bạn kế thừa). 

Cuối cùng là gọi đến hàm này trong onCreate của activity, trước hàm super hoặc trước khi inflate layout:

```
override fun onCreate(savedInstanceState: Bundle?) {
        makeStatusBarTransparent()
        super.onCreate(savedInstanceState)
    }
```

Ta sẽ thu được kết quả sau:

![](https://images.viblo.asia/2bb5fb0e-78c5-4c97-82fc-6f72f56c6c50.jpg)


# Xây dựng Background Gradient đẹp
Để tạo 1 background Drawable gradient đẹp, ta sẽ tạo 1 file xml chứa đoạn thuộc tính như sau:

```
    <gradient
        android:angle="90"
        android:endColor="@color/color_gradient_top"
        android:centerColor="@color/color_gradient_center"
        android:startColor="@color/color_gradient_bottom"
        android:type="linear" />
```

startColor, centerColor và endColor là 3 màu đại diện cho 3 khoảng gradient. type là kiểu chuyển, gồm linear - sweep và radial, angle là góc chuyển. Hãy thử kết hợp các thuộc tính này với nhau và tìm ra kiểu gradient bạn thích. Ví dụ này mình dùng 2 màu startColor, endColor là màu da cam và màu hồng, không có centerColor, góc là 45 độ, kiểu là linear, và đây là thành quả:

![](https://images.viblo.asia/77687bb1-996d-482c-bc86-82f35810f06e.jpg)


# Tổng kết
Trên đây là những hướng dẫn nhỏ cho các bạn áp dụng để trang trí thêm cho giao diện của mình. Tuy chỉ là những thuộc tính và hiệu ứng nhỏ, nhưng hiệu ứng nó đem lại sẽ rất tốt nếu ta biết cách kết hợp, cộng với 1 chút thẩm mỹ. Còn khá nhiều những tips nữa, mình sẽ cập nhật thêm vào thời gian tới. Chúc các bạn design giao diện thật đẹp!