Ở [bài viết trướ](https://viblo.asia/p/tim-hieu-ve-dinh-dang-anh-vector-cua-android-vectordrawable-djeZ1RBYlWz)c chúng ta đã tìm hiểu về định dạng ảnh vector của Android, khả năng và lợi ích của VectorDrawable mang lại. Chúng ta cũng đã tìm hiểu cách thức định nghĩa các paths để tạo lên shapes trong vector assets của chúng ta. Ở bài viết này, mình sẽ đi sâu vào những kĩ thuật như: Sử dụng **color resources**, **theme colors**, **color state lists** và **gradients**.
# Simple Colors
Cách dễ nhất để vẽ một path là chỉ định một màu cụ thể cho fill/stroke
```
<vector ...>
    <path
          android:pathData="..."
          android:fillColor="#ff00ff"
          android:strokeColor="#999"
          android:strokeWidth="2"
          android:strokeLineCap="square" />
</vector>
```
Bạn có thể định nghĩa một hoặc cả hai thuộc tính fill/stroke nhưng chúng chỉ được định nghĩa một lần trong một path (không giống một vài gói graphics). Các thuộc tính fill sẽ được xử lý vẽ trước sau đó đến stroke. Các strokes thì luôn luôn ở giữa (một lần nữa không giống với một số các ứng dụng graphics cho phép strokes bên trong hoặc bên ngoài). Chúng cần định nghĩa strokeWidth và bạn cũng có thể định nghĩa thêm các thuộc tính strokeLineCap, strokeLineJoin để tạo hình dạng cho đường nét tham gia và kết thúc của các stroked (thuộc tính strokeMiterLimit cho những góc cạnh). Dashed strokes không được hỗ trợ
Cả fills và strokes đều cung cấp các thuộc tính alpha riêng biệt: fillAlpha và strokeAlpha [0-1] giá trị mặc định của cả hai là 1 (tức là hoàn toàn mờ). Nếu bạn định nghĩa fillColor hoặc strokeColor với một giá trị alpha thì cả hai giá trị sẽ được kết hợp. 
Ví dụ: Nếu bạn định nghĩa một màu 50% transparent red (`fillcolor = #80ff0000`) và 0.5 alpha (`fillAlpha = 0.5`) thì kết quả sẽ là 25% transparent red.
Những thuộc tính alpha riêng biệt giúp dễ dàng tạo hiệu ứng mờ cho Path.
# Color Resources
Vectors hỗ trợ khai báo màu `@color` resource cho cả fill và stroke:
```
<vector ...>
    <path
        android:pathData="..."
        android:fillColor="@color/teal"
        android:strokeColor="@color/purple"
        android:strokeWidth="2" />
</vector>
```
Điều này cho phép bạn có thể thay đổi màu sắc một cách dễ dàng hơn và giúp bạn có thể hạn chế ứng dụng của mình trong một bảng màu nhất quán.
Nó cũng cho phép bạn cung cấp các giá trị màu khác nhau trong các cấu hình khác nhau bằng cách sử dụng [Android’s resource qualifiers](https://developer.android.com/guide/topics/resources/providing-resources#AlternativeResources). Ví dụ: Bạn có thể cung cấp các giá trị màu thay thế trong chế độ ban đêm (`res/colors-night/colors.xml`) hoặc nếu thiết bị hỗ trợ các gam màu rộng (`res/colors-widecg/colors.xml`).
# Theme Colors
Tất cả các phiên bản của vectors (từ API 14 đến AndroidX) đều hỗ trợ thuộc tính theme (ví dụ: `?attr/colorPrimary`) để chỉ định colors. Những colors được cung cấp bởi một theme rất hữu dụng, bạn có thể dùng chúng ở nhiều nơi khác nhau trong ứng dụng của mình.
Có hai cách chính để sử dụng theme colors.
## Themed fills/strokes
Bạn có thể khai báo trực tiếp theme colors vào fill/stroke paths:
```
<vector ...>
    <path
        android:pathData="..."
        android:fillColor="?attr/colorPrimary" />
</vector>
```
Điều này sẽ rất hữu dụng nếu bạn có nhiều phần tử trong một asset mà bạn muốn xét colors dựa trên các theme khác nhau. 
Ví dụ: Một ứng dụng thể thao có thể có các theme khác nhau để hiển thị màu của đội
![](https://images.viblo.asia/db38e5f1-dee4-4f48-91cd-5a97720e51e3.png)
## Tinting
Vector cung cấp hai thuộc tính `tint` và `tintMode`:
```
<vector ...
    android:tint="?attr/colorControlNormal">

    <path ... />
</vector>
```
Bạn có thể sử dụng thuộc tính này để áp dụng một tông màu tĩnh, nhưng sẽ hữu ích hơn nếu bạn sử dụng kết hợp với các thuộc tính theme. Nó cho phép bạn thay đổi màu sắc của toàn bộ asset phụ thuộc vào theme mà nó được áp dụng.
Ví dụ: Bạn có thể tint một icon sử dụng `?attr/colorControlNormal` để áp dụng màu tiêu chuẩn cho các icon và thay đổi theo các theme sáng và tối. Bằng cách này bạn có thể sử dụng một icon trên nhiều màn hình theme khác nhau. Xét tint cho icon hiển thị màu phù hợp trên màn hình sáng/tối:
![](https://images.viblo.asia/bc478206-e34c-4794-9c45-c365108db4db.png)
Một lợi ích của việc sử dụng tint là bạn không phải phụ thuộc vào source artwork cho asset của bạn (thường là từ người thiết kế) để có những tông màu chính xác. Áp dụng một tiêu chuẩn tint như `?attr/colorControlNormal` lên các icons vừa giúp bạn tạo theme vừa đảm bảo rằng các assets sẽ có màu đúng và giống nhau.
Thuộc tính `tintMode` cho phép bạn thay đổi blending mode sử dụng để tạo tint trong drawable. Nó hỗ trợ: `add`, `multiply`, `screen`, `src_atop`, `src_over` hoặc `src_in`; tương ứng với [PorterDuff.Mode](https://developer.android.com/reference/android/graphics/PorterDuff.Mode). Kiểu `src_in` mặc định thường là cái bạn muốn, coi hình ảnh giống như một mặt nạ alpha và áp dụng single tint color lên toàn bộ icon, bỏ qua mọi thông tin màu trong các individual paths. Vì vậy, nếu bạn muốn tint icons thì tốt nhất nên sử dụng fill/stroke hoàn toàn mờ (quy ước là sử dụng `#fff`).
Vậy khi nào nên tint các assets và khi nào nên sử dụng theme colors trên các individual paths khi mà cả hai đều có thể đạt được kết quả tương tự nhau? Nếu bạn muốn sử dụng theme color trên một số paths, thì bạn phải sử dụng chúng trực tiếp. Mặt khác, nếu asset của bạn có bất kỳ rendering chồng chéo nào thì filling với theme color có thể không tạo ra hiệu ứng bạn muốn, nhưng nếu sử dụng tint thì có thể. Ví dụ về assets với overlapping paths và semi-opaque theme colors: so sánh tint và fills
![](https://images.viblo.asia/04364f1b-71eb-4a6a-9c8f-76b2ab06db93.png)
Lưu ý rằng bạn có thể thay đổi theme ở các level khác nhau Activity/View bằng cách xết thuộc tính `android:theme`, hoặc bạn cũng có thể sử dụng `ContextThemeWrapper` để chỉ định theme trong code.
```
val themedContext = ContextThemeWrapper(context, R.style.baz)
val drawable = AppCompatResources.getDrawable(themedContext, R.drawable.vector)
```
# ColorStateLists
VectorDrawable hỗ trợ [ColorStateLists](https://developer.android.com/reference/android/content/res/ColorStateList) cho fill/strokes. Bằng cách này, bạn có thể tạo một single drawable mà path có thể thay đổi màu phụ thuộc vào trạng thái của view/drawable (như là: pressed, selected, activated,…). Ví dụ về vector ứng với trạng thái pressed và selected:
![](https://images.viblo.asia/92d0302b-764c-47c7-9379-4f25d50772b4.gif)
```
<selector ...>
    <item android:state_pressed="true"
        android:color="?attr/colorPrimary"
        app:alpha="0.8"/>
     <item android:color="#ec407a"/>
</selector>
```
Mặc dù việc sử dụng nhiều drawable trong `StateListDrawable` cũng đem kết quả tương tự, nhưng nếu sự khác nhau trong việc render giữa các trạng thái là ít thì việc sử dụng `ColorStateLists` sẽ đem lại hiệu quả hơn. Điều này cũng làm giảm sự trùng lặp và dễ dàng có thể sửa đổi.
# Gradients
![](https://images.viblo.asia/ed2e3116-61c2-4c69-8cec-bfacb2da2600.png)
VectorDrawable hỗ trợ `linear`, `radial` và `sweep` (tên khác angular) gradients cho cả fills and strokes. Nó được hỗ trợ từ API 14 đến AndroidX. Gradients được khai báo trong tệp riêng của chúng trong res/colors nhưng chúng ta có thể sử dụng [inline resource technique](https://developer.android.com/guide/topics/resources/complex-xml-resources) để thay vào đó khai báo gradient trong một vector.
```
<vector ...>
    <path android:pathData="...">
        <aapt:attr name="android:fillColor">
        <gradient .../>
        </aapt:attr>
  </path>
</vector>
```
Tại thời điểm build, Gradient được trính xuất vào resource của chính nó và một tham chiếu đến nó được chèn vào phần tử cha. Nếu bạn sử dụng cùng một gradient nhiều lần thì tốt hơn là khai báo nó một lần và tham chiếu nó như là inline version.
Khi chỉ định gradients, mọi tọa độ đều nằm trong không gian khung nhìn từ phần tử vector gốc. Chúng ta hãy xem xét từng loại gradient và cách sử dụng chúng.
## Linear
```
<gradient
    android:type="linear"
    android:startX="12"
    android:startY="0"
    android:endX="12"
    android:endY="24"
    android:startColor="#1b82bd"
    android:endColor="#a242b4"/>
```
Linear gradients phải chỉ định tọa độ start/end X/Y và `type = “linear”`
## Radial
```
<gradient
    android:type="radial"
    android:centerX="0"
    android:centerY="12"
    android:gradientRadius="12"
    android:startColor="#1b82bd"
    android:endColor="#a242b4"/>
```
Sweep gradients phải chỉ định center X/Y và `type = “sweep”`
## Color Stops
Color Stops cho phép chỉ định một startColor, centerColor và endColor trực tiếp trong gradient. Bạn có thể thêm các phần tử item bên trong để chỉ định color và offset [0-1] giúp kiểm soát màu chi tiết hơn.
```
<gradient ...>
     <item
         android:offset="0.0"
         android:color="#1b82bd"/>
     <item
         android:offset="0.72"
         android:color="#6f5fb8"/>
     <item
         android:offset="1.0"
         android:color="#a242b4"/>
</gradient>
```
## Tile Modes
Câu hỏi đặt ra  nếu gradient không bao bọc toàn bộ path fill/stroke thì cần phải làm gì? Linear và radial (trừ sweep) gradients đưa ra khái niệm về titling để giải quyết vấn đề này. Mặc định là clamp, tức chỉ tiếp tục màu start/end.
Ngoài ra, bạn có thể chỉ định các chế độ repeat hoặc mirror tile modes (lặp lại hoặc phản chiếu). Trong các ví dụ dưới đây, Radial gradient được xác định trên vòng tròn màu xanh lam trung tâm -> vòng màu tím và fill hình vuông bene ngoài
![](https://images.viblo.asia/0b1062f0-89a8-4052-a224-8a3ecdd3915a.png)
## Patterns
Chúng ta có thể kết hợp sử dụng các điểm color stops và các chế độ tile để đạt được rudimentary pattern trong các vector. Ví dụ: Nếu bạn chỉ định các điểm color stops trùng khớp, bạn có thể đạt được các thay đổi màu đột ngột. Kết hợp điều này với chế độ tile mode repeat chúng ta sẽ tạo được mô hình sọc. Ví dụ dưới đây là một loading indicator được tạo thành từ một pattern filled shape duy nhất.
![](https://images.viblo.asia/e57bad84-9ad6-48e3-91bb-783bb1876314.gif)
Lưu ý rằng kĩ thuật này khác xa so với mẫu SVG đầy đủ, nhưng nó có thể hữu ích.
## Illustrations
![](https://images.viblo.asia/e6b909eb-4016-4c8c-9f5d-94c1cf11eaa4.png)
Gradients cực kì phổ biến trong các vector artwork lớn như illustrations. Các vector có thể phù hợp illustrations nhưng nếu ở kích thước lớn chúng sẽ rất tốn bộ nhớ.
## Shadows
VectorDrawable không hỗ trợ hiệu ứng đổ bóng; tuy nhiên hiệu ứng shadows đơn giản cũng có thể tạo ra bằng cách sử dụng gradients. Ví dụ icon ứng dụng sử dụng radial gradients sẽ gần giống hiệu ứng đổ bóng cho hình tròn màu trắng và linear gradient tạo bóng dưới các hình tam giác:
![](https://images.viblo.asia/85df8c88-755d-44fd-8e93-364b5d0ab558.png)
Một lần nữa, khá là phức tạp khi muốn tạo ra hiệu ứng đổ bóng hoàn toàn vì chỉ các linear/radial/sweep gradients có thể vẽ và chúng không dọc theo một đường dẫn tùy ý. Bạn có thể ước chừng một số hình dạng; đặc biệt bằng cách áp dụng các phép biến đổi cho các phần tử gradient như ví dụ dưới: Sử dụng thuộc tính scaleY để biến đổi vòng tròn với radial gradient thành một hình bầu dục để tạo bóng.
![](https://images.viblo.asia/bc970081-05d0-4719-86b6-e2f5f5aaf759.gif)
## Tổng kết
Hi vọng rằng qua bài viết, bạn thấy được các tính năng nâng cao của VectorDrawables mà bạn có thể sử dụng để tạo ra những assets phức tạp trong ứng dụng của bạn hoặc thậm chí có thể thay thế nhiều assets bằng một file duy nhất, giúp bạn giảm được dung lượng ứng dụng
Cảm ơn bạn đã dành thời gian đọc hết bài viết! Hẹn gặp lại vào bài viết tiếp theo.
Bài viết có tham khảo từ https://medium.com/androiddevelopers/draw-a-path-rendering-android-vectordrawables-89a33b5e5ebf