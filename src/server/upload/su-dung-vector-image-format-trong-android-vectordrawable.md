- Android devices có nhiều kích thước và mật độ màn hình. Do đó đây là lý do tại sao các developer thích sử dụng **resolution independent** như vector.
- Trong bài viết lần này, mình sẽ nêu ra tác dụng của VectorDrawable ? Khi nào nên sử dụng chúng ? Cách tạo ra chúng và sử dụng chúng ?

## I, Raster vs Vector
- Phần lớn các định dạng image như png, bmp, gif, webp... là raster. Có nghĩa là chúng đưa ra các hình ảnh như một mạng lưới các pixel, không hiểu bất cứ điều gì về nội dung. Do đó các raster sẽ chỉ phù hợp với việc sử dụng ở 1 độ phân giản nhất định.
- Vector biểu diễn hình ảnh qua 1 chuỗi các hình với **canvas size**.
## II, Lợi ích
- Vector sẽ có 3 lợi ích chính: sắc nét, nhỏ và linh hoạt.
###  1, Sắc nét
- Vector tùy chỉnh kích thước 1 cách linh hoạt vì chúng biểu diễn hình ảnh thông qua canvas size trừu tượng, nó sẽ tự động scale down or up and sau đó tự động vẽ lại hình ảnh trên kích thước được yêu cầu.
- Trái lại, raster có thể sẽ bị hư hỏng khi bạn resize nó. Giảm kích thước raster xuống có vẻ ổn nhưng nhưng tăng sẽ ảnh hưởng xấu như mờ vì chúng phải thêm các pixel bị thiếu.
- Đó là lý do nếu bạn muốn sử dụng raster thì bạn cần cung cấp các version cho 1 raster. Mỗi vesion sẽ tương ứng với 1 mật độ màn hình.
- **Ví dụ 1**: 
```
   res/drawable/foo.png.
   res/drawable-hdpi/foo.png => foo.png for high-density screen (240dpi).
   res/drawable-xhdpi/foo.png => foo.png for extra-high-density screeb (320dpi).
   res/drawable-xxhdpi => foo.png for extra-extra-high-density screen (480dpi).
   res/drawable-xxxhdpi => foo.png for extra-extra-extra-high-density screen (640dpi).
```
- Android sẽ chọn chọn raster trong folder có mật độ lớn hơn + gần nhất so với mật độ hiện tại của máy, sau đó sẽ giảm raster xuống nếu cần.
- Giờ đây, các thiết bị hầu hết có mật độ màn hình cao do đó có thể nếu áp dụng raster android sẽ phải tạo ra những folder với mật độ cao hơn.
- Nhiều thiết bị có mật độ không trùng với các mật độ trên mà nó có thể nằm ở giữa. 
- Ví dụ: Google Pixel 3 XL có mật độ là 552dpi, xxhdpi (480dpi) < 552dpi < xxxhpi (640dpi) do đo raster trong xxxhpi sẽ bị scale down.
- Đối với vector, nó sẽ resize dựa theo kích thước được yêu cầu, bạn chỉ cần có 1 file duy nhất và nó sẽ hoạt động trên bất kỳ thiết bị với bất cứ màn hình nào.

### 2, Kích thước nhỏ
- Vector thường sẽ nhỏ hơn raster bởi vì bạn chỉ cần đưa vào 1 file và nó cũng được nén rất tốt.
- Khi raster có kích thước càng lớn, bạn chuyển sang sử dụng vector sẽ tiết kiệm được càng nhiều.
- Khi sử dụng vector, bạn sẽ tiết kiệm được 30% so với việc sử dụng raster.
- **Ví dụ 2**: 
    - Raster: download size = 53.9KB (Raw file size = 54.8KB).
    - Vector: download size = 3.7KB (Raw file size = 15.8KB).
- **Chú ý**: Android App Bundle chỉ cung cấp resource tương ứng cho các thiết bị. Sử dụng VectorDrawable vẫn sẽ có lợi hơn vì kích thước nhỏ và không phải scale down hình ảnh như đã nói ở trên.

### 3, Linh hoạt
- Vì vector biểu diễn nội dung của nó thông qua canvas size thay vì san đều các pixel, chúng cung cấp cho ta những tính năng mới như animation, dynamic themeing...

## III, Nhược điểm
- Bên cạnh những lợi ích mà vector mang lại thì nó cũng có 1 số nhược điểm.

### 1, Decoding
- Vì vector mô tả nội dung bên trong thông qua canvas size nên chúng cần được inflate và được vẽ trước khi sử dụng.

![](https://images.viblo.asia/bcfae442-6fda-4e2b-9b29-522449e1d87a.png)
- Có 2 bước để vector có thể hiển thị hình ảnh trên device:
    - **Inflation**: Vector được đọc và chuyển đổi thành **VectorDrawable** mô hình hoá path, group... mà bạn khai báo.
    - **Drawing**:   Các path, group... này sẽ được vẽ bằng cách sử dụng câu lệnh của Canvas.
- Những bước này tỉ lệ thuận với độ phức tạp của vector và loại thao tác mà bạn thực hiện. 
    - Nếu bạn sử dụng các hình dạng phức tạp, bạn sẽ mất nhiều thời gian hơn để phân tích **Path**.
    - Tương tự, nhiều thao tác **draw** sẽ làm mất nhiều time hơn (một số thao tác tốn kém hơn như clip).
- Trong khi raster như png chỉ cần mất thời gian cho việc decode content của file, vector gặp bất lợi trong quá trình render do tiime dài hơn.
- Giờ đây, Android device đã mạnh mẽ và cải tiến hơn rất nhiều, bạn sẽ gần như không thấy sự khác biệt giữa việc render của raster và vector. Hơn thế nữa nhiều screen destiny cũng được giải quyết dễ dàng thông qua việc sử dụng vector.

### 2, Sự tương thích 
- Vector thường dùng trong việc biểu diễn một số kiểu như simple icon...
- Vector sẽ gặp rất nhiều khó khăn trong việc mã hoá các những photographic image như ảnh chân dung... bởi vì rất khó để inflate content của photographic image mà chỉ thông qua các Path, Group...
- Do đó bạn muốn dùng các photographic image thì raster (như webp - cũng khá nhẹ và hiệu quả) sẽ hiệu quả hơn nhiều.
- Quyết định sử dụng raster hay vector sẽ còn tuỳ thuộc vào từng trường hợp và quyết định vào chính bạn.

### 3, Khó khăn trong việc tạo ra
* Không có 1 công cụ thiết kế nào mà tôi biết giúp bạn tạo 1 VectorDrawable trực tiếp, điều đó có nghĩa là bạn phải tạo ra vector từ các định dạng khác.
* Bạn có thể sẽ cảm thấy phức tạp và đau đầu về việc chuyển đổi này.

## IV, Tại sao lại không phải là svg ?
* Nếu bạn đã từng làm việc với các vector image format, bạn có thể sẽ biết tới **SVG** (Scalable vector graphics), nó là 1 chuyển được sử dụng nhiều trên web.
* Có những công cụ sẵn để tạo ra nó.
* SVG cũng là 1 chuẩn cần nhiều tài nguyên hơn để có thể render.
* Nó bao gồm nhiều tuỳ chỉnh nhủ thực thi các hiệu ứng Javascript, làm mờ, lọc tuỳ ý, nhúng vào các image khác hay thậm chí tạo ra các ảnh động.
* Đối với Android mặc dù phần cứng cũng như cơ chế đã được nâng cấp và tối ưu hoá lên nhiều nhưng vẫn chỉ là hữu hạn, do đó việc hỗ trợ toàn bộ các thông số trong svg là 1 điều không thực tế.
* Có 1 điểm chung giữa SVG và định dạng vector mà Android hỗ trợ là Path. Với Path chúng ta có thể hầu hết các hình khối.
* Ngoài ra, bằng cách tạo ra định dạng riêng, VectorDrawable có thể tích hợp các tính năng mà Android cung cấp.
* **Ví dụ 3**: 
    * Làm việc với Android resource để tham chiếu tới **@colors**, **@dimens** hoặc **@strings**.
    * Làm việc với theme attribute.
    * **AnimatedVectorDrawable** sử dụng để tạo ra Animator.

## V, Khả năng của VectorDrawable
### 1, Cở bản về vector trong android
* VectorDrawable hỗ trợ Path (tương tự như SVG) do đó nó cho phép bạn xác định 1 hay nhiều hình có thể được vẽ.
* VectorDrawable được tạo ra trong 1 file xml với dạng tương tự như **ví dụ 4 sau đây**:
```
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
* Để mình giải thích chi tiết hơn về các thuộc tính:
    * **android:width** và **android:height** định nghĩa intrinsic size (kích thước thật) của drawable, do đó nó sẽ hầu như được sử dụng khi component sử dụng VectorDrawable đó có **width/height = wrap_content**.
    * **android:viewportWidth** và **android:viewportHeight** định nghĩa canvas size để vẽ các Path.
    * Android mặc định rằng góc (top, left) của canvas là (0,0).
    * Ở ví dụ 4, mình đã thiết lập viewportWidth và viewportHeight là 24 do đó góc (bottom, right) sẽ là (24, 24).
* <Vector> có thể bao gồm 1 hay nhiều Path. Các Path sẽ phải chỉ định một yếu tố **pathData** để biểu diễn shape.
* Thuộc tính **pathData** của **Path** được lưu dưới dạng 1 String. 
* Tưởng tượng bạn vẽ 1 **Path** thông qua việc điều khiển 1 cây bút với các thông số mà **pathData** cung cấp.
* **Ví dụ 5**:

![](https://images.viblo.asia/27b0db5b-f5b5-41df-ba8d-d82effde8666.png)
* Và kết quả là:

![](https://images.viblo.asia/6e55fede-fd67-4dc2-ab58-aa2d05c5dd21.png)
* Và đây là hình ảnh chi tiết của việc vẽ:

![](https://images.viblo.asia/6d7ccc69-8c46-40c3-b945-c369dba84edd.png)
* Bạn có thể sử dụng 4 lệnh cơ bản nhất cũng có thể tạo ra rất nhiều hình khác nhau: 
    * **M (move to)**: dịch chuyển tới đâu. M đầu tiên cũng chính là điểm bắt đầu.
    * **L (line to)**: điểm cuối của 1 đường thẳng.
    * **C (cubic bezier) curve to**: điểm cuối của đường cong.
    * **z (line to first point) close**: đường thẳng tới điểm đầu tiên.
* Ở ví dụ 5, cây bút sẽ di chuyển dựa trên các thông số trên:
    * Ta có viewportWidth = 24 và viewportHeight = 24. Mỗi trục có 12 ô vuông do đó mỗi ô sẽ có viewport size = 2.
    * **B1**: Bút sẽ đặt ở điểm (x, y) = (6.4, 6.4).
    * **B2**: Bút sẽ vẽ 1 line (đường thẳng tới (x, y) = (17.6, 17.6). Do có **z** ở cuối nên nó sẽ bị kết thúc nét vẽ đầu tiên.
    * **B3**: Bút vẽ đặt ở điểm (x, y) = (6.4, 17.6).
    * **B4**: Bút vẽ sẽ vẽ 1 (line) đường thẳng tới (x, y) = (17.6, 6.4). Do có **z** ở cuối nên nó sẽ bị kết thúc nét.
* Thuộc tính **pathData** chỉ định nghĩa hình dạng của **Path**, do đó để có thể vẽ được 1 Path, bạn cần phải kết hợp **pathData** với 1 trong 2 đối tượng sau:
    * **stroke** (viền): bạn nên xác định ít nhất **strokeWidth** (độ dày) và **strokeColor** (màu sắc).
    * **fill** (content): bạn nên xác định ít nhát **fillColor** (màu).
* Ở ví dụ thứ 5, nếu không thêm 1 trong 2 thuộc tính **strokeWidth** và **strokeColor** thì sẽ không hiển thị được hình dạng của Path.

###  2, Sử dụng group và filling/stroking path
* Bạn có thể định nghĩa 1 nhóm các **Path**. Điều này cho phép bạn định nghĩa ra các transition được áp dụng cho tất cả các **Path** trong group đó.
* **Ví dụ 6**:
```
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
* Bạn không thể rotate, scale hay translate những **Path** riêng lẻ (không ở trong group). Do đó nhớ rằng muốn tạo transition cho **Path** thì hãy đặt nó vào trong **group**.
* Bạn có thể định nghĩa **clip-path** để đánh dấu khu vực mà các Path khác trong cùng 1 nhóm có thể vẽ. **clip-path** cũng được định nghĩa giống **path**.
* **Ví dụ 7**:
```
<vector ...>
  
  <clip-path
    android:name="mask"
    android:pathData="..." />

  <path .../>

</vector>
```
* Điểm hạn chết của** clip-path** là không khủ răng của (not anti-aliased).
* **Ví dụ 8**:

![](https://images.viblo.asia/8d4db078-1d8b-461d-9a3b-356e783978ed.png)
* Ở ví dụ 8, bạn có thể thấy 2 cách vẽ icon. Cách 1 sử dụng **path** còn cách 2 sử dụng hình vuông rắn để đánh dấu các điểm. 
* Việc đánh dấu này tạo ra hiệu ứng thú vị (đặc biệt khi sử dụng để tạo animation) nhưng nó khá tốn kém do đó bạn có thể tránh nó bằng cách cách vẽ 1 hình theo một cách khác.
*  Các **path** có thể bị cắt khi bạn vẽ 1 tập con của path. Bạn có thể cắt 1 **filled** hoặc **stroked paths** nhưng cắt **stroked paths** vẫn phổ biến hơn.
*  **Ví dụ 9**:

![](https://images.viblo.asia/ca611195-34c9-486a-a045-37a4a0628670.png)
    ![](https://images.viblo.asia/432e464f-2c04-468f-87b3-8011eb7050b9.png)
    ![](https://images.viblo.asia/4384e88b-5b3c-408f-8a91-4d1b45998f4d.png)
*  Bạn có thể cắt từ start  - **trimPathStart** hoặc end - **trimpathEnd** của 1 **path** hoặc thêm **offset** cho việc cắt.
*  Bạn sẽ tạo ra bằng cách trích 1 phần của Path với giá trị [0, 1].
*  Ở hình 1 của ví dụ 9, phần con được tạo ra ở vị trí 0.25 (trimPathStart) -> 0.75 (trimPathEnd) của **path** cha.
*  Ở hình 2 của ví dụ 9, phần con được tạo ra ở vị trí 0.5 (trimPathStart + trimPathOffset) => 1 (trimPathEnd + trimPathOffset).
*  Ở hình 3 của ví dụ 9, phần con được tạo ra ở vị trí 0.5 (trimPathStart + trimPathOffset) => 0,152 (trimPathEnd + trimPathOffset - 1) do trimPathEnd + trimPathOffset > 1.
*  **<vector>**  hỗ trợ alpha trong khoảng [0, 1]. **Group** không có alpha nhưng mỗi **path** trong group lại hỗ trợ.

```
<vector ...
  android:alpha="0.7">

  <path
    android:pathData="..."
    android:fillColor="#fff"
    android:fillAlpha="0.5" />

</vector>
```
## VI, Tổng kết.
*  Hị vọng bài viết lần này sẽ cho bạn cái nhìn tổng quan hơn về vector trong Android cũng như những lợi thế và hạn chết của nó.
*  Hiện nay hầu hết các device đều có cấu hình cao và hỗ trợ hoàn toàn vector, do đó mình khuyên nên sử dụng vector như default. Nhưng bạn cũng phải sử dụng đúng hoàn cảnh giữa vector và raster.
*  Bài viết đến đây là kết thúc rồi. 
*  Haapy conding !!!