Các thiết bị Android hiện nay có đủ kích cỡ, hình dạng và mật độ màn hình. Đó là lý do tại sao ảnh vector rất được ưa chuộng sử dụng hiện nay. Nhưng chính xác thì chúng là gì? Lợi ích của chúng là gì?  Khi nào ta nên sử dụng chúng? Làm thế nào để bạn tạo và sử dụng chúng? Trong bài viết này, mình sẽ trả lời những câu hỏi này và giải thích lý do tại sao mình nghĩ rằng phần lớn tài nguyên trong ứng dụng của bạn phải là vectơ và cách tận dụng tối đa chúng.
 
##  Raster vs Vector

Hầu hết các định dạng hình ảnh(png,jpeg, bmp, gif, webp, ..) là raster, nó được tạo ra từ các điểm ảnh, mỗi màu khác nhau, sắp xếp để hiển thị ảnh. Còn vector sử dụng các điểm rời rạc, các đường và các vùng tương ứng với các đối tượng rời rạc thông qua tên hoặc mã số quy định. Sự khác biệt chính là các pixel hình ảnh raster không giữ lại được hình dạng khi kích cỡ tăng lên, khi bạn phóng to một bức ảnh lên, nó sẽ trở nên mờ vì lí do này. Hình ảnh vector giữ lại hình dạng bất kể kích thước, vì các công thức toán học chỉ ra cách hiển thị hình ảnh.

## Why vector
Có 3 lí do ta nên sử dụng ảnh vector đó là:

- Sharp
- Small
- Dynamic

## Sharp
Với vector bạn không cần lo lắng việc ảnh bị mờ đi khi thay đổi kích thước, bởi vì nó mô tả hình ảnh sử dụng tọa độ trong mặt phẳng 2 chiều. Các tọa độ này sẽ góp phần tạo nên các path và các path này còn có thể có các thuộc tính như màu, hình dạng, độ dày. Vì thế bạn có thể phóng to khung hình lên hoặc xuống và sau đó vẽ lại hình ảnh ở kích thước đó. Còn với ảnh raster được biểu diễn bằng từng điểm ảnh (pixel) nên khi phóng to nên chúng ta sẽ nhìn rõ các điểm ảnh, vì vậy độ phân giải của ảnh raster có giới hạn


![](https://images.viblo.asia/d92c6359-f1b0-4688-9103-b6218d5034f9.png)

Đó là lí do tại sao mà trên Android, ta cần cung cấp nhiều ảnh raster cho từng loại màn hình có mật độ pixel khác nhau 
- res/drawable-mdpi/foo.png
- res/drawable-hdpi/foo.png
- res/drawable-xhdpi/foo.png
- res/drawable-xxhdpi/foo.png

Android chọn mật độ lớn nhất gần nhất và thu nhỏ lại (nếu cần). Với xu hướng cho các thiết bị có màn hình mật độ cao hơn bao giờ hết, các nhà sản xuất ứng dụng phải tiếp tục tạo, bao gồm và vận chuyển các phiên bản lớn hơn của cùng một tài nguyên. Lưu ý rằng nhiều thiết bị hiện đại không được đặt trên các phần mật độ chính xác (ví dụ: Pixel 3 XL là 552dpi, nằm giữa xxhdpi & xxxhdpi) nên ảnh thường sẽ được thu nhỏ.

Còn ảnh vector thay đổi kích thước một cách dễ dàng do không phụ thuộc vào điểm ảnh nên nó sẽ hoạt động trên bất kỳ và tất cả các mật độ màn hình.

## Small
Ảnh vector nói chung nhỏ gọn hơn ảnh raster cả vì bạn chỉ cần bao gồm một phiên bản duy nhất còn với raster ta cần nhiều ảnh để phù hợp với tình độ phân giải màn hình

Ví dụ ở đây, Thay đổi từ ứng dụng Google I / O ta chuyển một số biểu tượng từ PNG raster sang vectơ và tiết kiệm 482KB. Trong khi điều này có vẻ không nhiều, điều này chỉ dành cho biểu tượng nhỏ; hình ảnh lớn hơn (như hình minh họa) sẽ có mức tiết kiệm lớn hơn. 

Ví dụ minh họa này từ luồng lên máy bay của ứng dụng I / O của năm trước chẳng hạn:
![](https://images.viblo.asia/3c4c3e76-c0e4-4e96-860a-e5d6a5858b6f.png)
Trước đây ta không thể sử dụng vector drawable vì gradients không được hỗ trợ tại thời điểm đó. Vì vậy ta phải sự dụng ảnh raster thay thế.

Nếu sử dụng ảnh vector thì ta sẽ tiết kiệm được 70% so với ảnh raster

- Raster: Download Size = 53.9KB (Raw file size = 54.8KB)
- Vector: Download Size = 3.7KB (Raw file size = 15.8KB)

Hiện nay khi sử dụng Android App Bundle tối ưu hóa cho từng thiết bị, nghĩa là nó chỉ lấy 1 ảnh raster ứng với mật độ phân giải theo thiết bị đó, ảnh vector vẫn luôn có lợi hơn vì kích thước nhỏ gọn hơn ảnh raster

## Dynamic
Vì hình ảnh vector mô tả nội dung của chúng thay vì 'flattening’ chúng ra pixel, chúng mở ra cơ hội cho những khả năng mới thú vị như animation , tương tác hoặc theo chủ đề động. 
![](https://images.viblo.asia/d644d289-2ab5-4462-a44a-8320d70d4c43.gif)
# Một số nhược điểm của ảnh vector
## Decoding
Như đã nói ở trên, ảnh vector chỉ mô tả nội dung của bức ảnh, vì vậy để hiển thị chúng cần được inflated và vẽ chúng

![](https://images.viblo.asia/6ef0828e-6e1f-4ff5-9a71-33d89978a056.png)
Có 2 bước để thực hiện việc này:
Inflation: File vector sẽ được đọc và phân tích thành [VectorDrawable ](https://developer.android.com/reference/android/graphics/drawable/VectorDrawable) và được mô hình hóa theo patch, groups,..

Drawing:  Sau đó các mô hình này được vẽ bằng các lệnh canvas 

Cả hai bước này để tỷ lệ thuận với độ phức tạp của vector. Nếu file vector của bạn càng phức tạp sẽ mất nhiều thời gian để phân tích thành các path. Tương tự nhiều thao tác vẽ sẽ mất nhiều thời gian để thực hiện.

Với các vector tĩnh, giai đoạn vẽ chỉ cần được thực hiện một lần và sau đó có thể được lưu vào bộ đệm cho Bitmap. Các animate vector, có thể tạo ra tối ưu hóa này vì các thuộc tính của chúng nhất thiết phải thay đổi yêu cầu vẽ lại.

So sánh điều này với các tài sản raster như PNG chỉ cần giải mã nội dung file -> tốt hơn về thời gian hiển thị

Đây là sự đánh đổi thiết yếu của raster vs vector. Các vectơ cung cấp các lợi ích đã nói ở trên nhưng với tốn nhiều thời gian hơn để hiển thị. Trong những ngày đầu Android, các thiết bị còn yếu và mật độ màn hình khác nhau rất ít. Ngày nay, các thiết bị Android mạnh hơn và có mật độ màn hình rất lớn. Đây là lý do tại sao mình tin rằng đã đến lúc tất cả các ứng dụng chuyển sang vector
## Suitability
![](https://images.viblo.asia/1bfd557b-b345-46b3-b181-ddced8d2dc22.png)
Do tính chất của định dạng, vectơ rất tuyệt trong việc mô tả một số ảnh như các biểu tượng đơn giản, v.v ... Thật khủng khiếp khi mã hóa hình ảnh kiểu chụp ảnh trong đó khó mô tả nội dung của chúng dưới dạng một loạt các hình dạng và nó có thể sẽ hiệu quả hơn rất nhiều để sử dụng định dạng raster (như webp).
## Why not SVG?
Nếu bạn đã từng làm việc với các định dạng hình ảnh vector, rất có thể bạn sẽ bắt gặp định dạng SVG (Đồ họa vectơ có thể mở rộng), tiêu chuẩn trên web. Nó có khả năng và trưởng thành với công cụ được thiết lập, nhưng nó cũng là một tiêu chuẩn rộng lớn . Nó bao gồm nhiều khả năng phức tạp như thực thi các hiệu ứng javascript, làm mờ và lọc tùy ý hoặc nhúng các hình ảnh khác, thậm chí là các hình động. Android chạy trên các thiết bị di động bị hạn chế nên việc hỗ trợ toàn bộ thông số SVG không phải là mục tiêu thực tế.


Tuy nhiên, SVG bao gồm một đặc tả đường dẫn xác định cách mô tả và vẽ hình. Với API này, bạn có thể thể hiện hầu hết các hình dạng vector. Đây thực chất là những gì Android hỗ trợ: thông số đường dẫn của SVG 


Ngoài ra, bằng cách xác định định dạng riêng, VectorDrawable có thể tích hợp với các tính năng của nền tảng Android. Ví dụ làm việc với các hệ thống nguồn Android để tham khảo @colors, @dimens hoặc @strings, làm việc với theme attributes hoặc AnimatedVectorDrawable sử dụng Animators.

## VectorDrawable’s Capabilities
VectorDrawable hỗ trợ [SVGs path spec](https://www.w3.org/TR/SVG/paths.html) , cho phép bạn chỉ định một hoặc nhiều hình dạng sẽ được vẽ. Nó được coi là một XML document:

```xml
<vector xmlns:android="http://schemas.android.com/apk/res/android"
  android:width="24dp"
  android:height="24dp"
  android:viewportWidth="24"
  android:viewportHeight="24">

    <path
      android:name="cross"
      android:pathData="M6.4,6.4 L17.6,17.6 M6.4,17.6 L17.6,6.4"
      android:strokeWidth="2"
      android:strokeLineCap="square"
      android:strokeColor="#999" />

</vector>
```
Lưu ý rằng bạn cần chỉ định kích thước của ảnh, đó là kích thước sẽ có nếu bạn đặt nó trong một wrap_content ImageView. Các viewport kích thước thứ hai xác định khung vẽ ảo hoặc không gian tọa độ tất cả các lệnh vẽ tiếp theo được xác định. Các kích thước và khung nhìn có thể khác nhau (nhưng phải ở cùng một tỷ lệ).

Thẻ <vector> chứa một hoặc nhiều thẻ path . Chúng có thể được đặt tên (để tham khảo sau này, ví dụ như hoạt hình) nhưng chủ yếu phải chỉ định một pathData  (mô tả hình dạng). 
    ![](https://images.viblo.asia/025cfffb-7772-4642-ab81-d3836db7ce36.gif)
    Các lệnh trên di chuyển bút ảo, sau đó vẽ một đường đến một điểm khác, nhấc và di chuyển bút, sau đó vẽ một đường khác. Chỉ với 4 lệnh phổ biến nhất, chúng ta có thể mô tả khá nhiều hình dạng bất kỳ ):

- M move to
- L line to
- C (cubic bezier) curve to
- Z close (line to first point)

Bạn có thể tự hỏi nếu bạn cần quan tâm đến mức độ chi tiết này - bạn không nhận được những thứ này từ các tệp SVG? Mặc dù bạn không cần phải đọc một patch và hiểu nó sẽ vẽ gì, nhưng việc hiểu cơ bản về những gì VectorDrawableđang làm là vô cùng hữu ích và cần thiết để hiểu một số tính năng nâng cao mà chúng ta sẽ có sau này.

Các đường dẫn tự chúng không vẽ bất cứ thứ gì, chúng cần được nét và / hoặc điền.
```xml
<vector ...>
    <path
      android:pathData="..."
      android:fillColor="#ff00ff"
      android:strokeColor="#999"
      android:strokeWidth="2"
      android:strokeLineCap="square" />

</vector>
```
Bạn cũng có thể xác định các group path. Điều này cho phép bạn xác định các phép biến đổi sẽ được áp dụng cho tất cả các path trong group.
```xml
<vector ...>

    <path .../>

    <group
        android:name="foo"
        android:pivotX="12"
        android:pivotY="0"
        android:rotation="45"
        android:scaleX="1.2"
        android:translateY="-4">

        <path ... />

    </group>

</vector>
```
Lưu ý bạn có thể xoay, chia tỉ lệ, dịch path riêng lẻ. Nếu muốn, bạn sẽ cần phải đặt chúng trong một group. Sự biến đổi này không có ý nghĩa gì đối với các hình ảnh tĩnh có thể "nướng trực tiếp chúng vào đường dẫn chúng, nhưng chúng cực kỳ hữu ích cho animation
Bạn cũng có thể xác định clip patch, đó là che dấu khu vực mà các đường dẫn khác trong cùng group có thể vẽ. Nó xác định chính xác cùng một cách với các path.
```xml
<vector ...>
  
  <clip-path
    android:name="mask"
    android:pathData="..." />

  <path .../>

</vector>
```

Path cũng có thể được cắt bớt; đó chỉ là vẽ một tập hợp con của toàn bộ path.
```xml
<vector...>

  <path
    android:pathData="..."
    android:trimPathStart="0.1"
    android:trimPathEnd="0.9" />

</vector>
```
![](https://images.viblo.asia/971db953-edaa-40a6-85dd-dc0e5124af51.gif)

Bạn có thể cắt từ đầu hoặc cuối path hoặc áp dụng bù cho bất kỳ đường viền nào. Chúng được định nghĩa là một phần của path [0,1]. Xem cách đặt các giá trị cắt khác nhau thay đổi phần của đường được vẽ. Cũng lưu ý rằng việc bù đắp có thể làm cho các giá trị trang trí bao quanh vòng. Thuộc tính này không có ý nghĩa gì đối với hình ảnh tĩnh nhưng tiện dụng cho animation

Thẻ vectơ gốc hỗ trợ thuộc tính alpha [0, 1]. Các group không có thuộc tính alpha nhưng các path riêng lẻ hỗ trợ fillAlpha / StroAlpha.
```xml
<vector ...
  android:alpha="0.7">

  <path
    android:pathData="..."
    android:fillColor="#fff"
    android:fillAlpha="0.5" />

</vector>
```
## Summary
Hy vọng bài viết này cung cấp cho bạn kiến thức về vector drawable và cách sử dụng chúng một cách hiệu quả. 
## Reference
https://medium.com/androiddevelopers/understanding-androids-vector-image-format-vectordrawable-ab09e41d5c68