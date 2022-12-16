Thiết bị Android có rất nhiều kích cỡ, hình dáng và mật độ điểm ảnh của màn hình. Đó là lý do vì sao mà việc sử dụng các tài nguyên không phụ thuộc vào độ phân giải màn hình, như là vector assets được ưu tiên trong việc phát triển ứng dụng Android. Nhưng chính xác chúng là gì? Lợi ích chúng mang lại như thế nào? Khi nào ta nên dùng chúng? Làm cách nào để tạo và dùng chúng? Trong loạt bài viết này, mình sẽ làm rõ những câu hỏi này và giải thích tại sao mình cho rằng đa số assets trong một ứng dụng nên là vector, và làm cách nào để tận dụng chúng tối đa.
# Raster vs Vector
Hầu hết định dạng ảnh (png, jpeg, bmp, gif, webp, v.v... ) đều là raster, có nghĩa là chúng mô tả ảnh như là một lưới các pixel được fix sẵn. Do đó, nó định nghĩa sẵn một độ phân giải cụ thể cho ảnh và không biết gì về nội dung bên trong, ngoại trừ màu sắc của mỗi pixel. Tuy nhiên, vector sẽ mô tả ảnh như một chuỗi các hình dạng được định nghĩa dựa trên một "abstract canvas size".
# Những lợi ích
Vector assets có 3 lợi ích chính khi sử dụng, chúng là:
* Sharp
* Small
* Dynamic
## Sharp
Hình ảnh vector thay đổi kích thước một cách hoàn hảo, bởi vì chúng mô tả ảnh trên một "abstract canvas size", nên ta có thể scale canvas này to lên hay nhỏ lại, sau đó vẽ lại ảnh đó trên kích thước mới. Với raster asset, khi ta giảm kích thước xuống vẫn có thể ổn (vì ta đang bỏ bớt thông tin), nhưng khi ta tăng kích thước lên, ảnh sẽ bị vỡ, nhòe bởi chúng phải nội suy các pixel bị thiếu.
![](https://images.viblo.asia/dfaadc44-b7cc-4ba3-88f6-758b55cceaef.png)
Đó là lý do vì sao trên Android chúng ta cần phải cung cấp nhiều phiên bản của mỗi raster asset cho những màn hình có tỉ lệ khác nhau:
* res/drawable-mdpi/foo.png
* res/drawable-hdpi/foo.png
* res/drawable-xhdpi/foo.png
* ...
Android sẽ chọn tỉ lệ lớn hơn gần nhất với màn hình và scale ảnh nhỏ lại nếu cần thiết. Ngày nay, các thiết bị càng lúc càng tăng mật độ điểm ảnh, vậy nên khi phát triển ứng dụng Android, ta lại càng phải tiếp tục tạo, đưa vào ứng dụng những phiên bản lớn hơn của cùng một hình ảnh. 
Bởi vì vector asset được resize một cách hoàn hảo, nên ta chỉ cần thêm vào một asset duy nhất cho mỗi ảnh, và yên tâm rằng chúng sẽ vẫn hoạt động tốt trên nhiểu kích cỡ màn hình với mật độ điểm ảnh khác nhau.
## Small
Nhìn chung, vector assets thường gọn nhẹ hơn so với raster assets, bởi vì ta chỉ cần bao gồm một phiên bản duy nhất cho một ảnh, và cũng bởi vì vector assets được nén tốt.
Ví dụ, [đây là một thay đổi] (https://github.com/google/iosched/commit/78c5d25dfbb4bf8193c46c3fb8b73c9871c44ad6) từ một [ứng dụng của Google I/O](https://play.google.com/store/apps/details?id=com.google.samples.apps.iosched), khi chuyển một số icon từ PNG (raster) sang vector, và tiết kiệm được 482KB. Mặc dù kích thước này nghe có vẻ không nhiều, nhưng đó chỉ là với những icon nhỏ; với những bức ảnh hớn hơn (như hình dưới), ta có thể tiết kiệm được nhiều hơn.

![](https://images.viblo.asia/14bfb9df-9df4-4f55-961b-244a8cd6339f.png)

Trước đó, chúng ta không thể tạo được ảnh này bằng `VectorDrawable` do hiệu ứng gradients không được hỗ trợ rộng. Tuy nhiên, hiện nay đã có thể thay bằng ảnh vector, do đó có thể giảm 30% kích thước với với một hiệu quả tốt hơn:
* Raster: Download Size = 53.9KB (Raw file size = 54.8KB)
* Vector: Download Size = 3.7KB (Raw file size = 15.8KB)

## Dynamic
Bởi vì ảnh vector mô tả nội dung bên trong của chúng thay vì chỉ mô tả màu sắc mối điểm ảnh như là ảnh raster, cho nên ta có thể tạo ra những thứ thú vị như là animation, hoạt động tương tác hay là các theme động. Những điều này sẽ được đề cập thêm trong bài viết tiếp theo.
![](https://images.viblo.asia/b376e287-4b93-4bd2-a8a9-b1847b1a82a9.gif)
# Những thứ phải đánh đổi
Tuy nhiên, ảnh vector cũng có một số nhược điểm cần phải xem xét:
## Decoding
Như đã đề cập ở trên, vector assets mô tả nội dung bên trong của nó, do đó, chúng cần phải được inflate và được vẽ trước khi sử dụng.
![](https://images.viblo.asia/5d5d187a-2c19-4f1a-89bd-8dc2d2789ad3.png)
Có 2 bước để làm việc này:
1. **Inflation** Vector file sẽ được đọc và parse thành `VectorDrawable`, mô hình hóa các path, group, ... mà ta đã khai báo
2. **Drawing** Những model object này sẽ được vẽ bằng cách thực thi lệnh vẽ từ `Canvas`.
Cả hai bước này tỉ lệ thuận với độ phức tạp của vector và kiểu hoạt động ta thực hiện. Nếu ta sử dụng những shape phức tạp, nó sẽ tốn nhiều thời gian để parse thành một `Path`. Tương tự, nhiều thao tác vẽ sẽ khiến thời gian thực hiện dài hơn.
Với các vector tĩnh, giai đoạn drawing chỉ cần được thực hiện một lần và sau đó có thể được cache thành một `Bitmap`. Animated vetor, không thể thực hiện được việc tối ưu hóa này vì những thuộc tính của chúng cần phải được vẽ lại.
So sánh với raster asset, như là ảnh PNG chẳng hạn, nó chỉ cần được decode nội dung file, thứ đã được tối ưu cao theo thời gian.
Đây là sự đánh đổi thiết yếu của raster và vector. Vector cung cấp những ưu điểm đã nói ở trên, nhưng cái giá phải trả là tốn tài nguyên để render hơn. Trong những ngày đầu của Android, thiết bị kém mạnh mẽ và màn hình của các thiết bị ít khác biệt. Ngày nay, thiết bị Android đã mạnh mẽ hơn và đi kèm với đó là một số lượng lớn các loại màn hình. Đó là lý do vì sao các app sẽ dần chuyển sang dùng vector asset.
## Sự phù hợp
![](https://images.viblo.asia/8a78d218-97fc-410d-9d07-423c482dcdda.png)
Do tính chất của định dạng, vector phù hợp với các hình ảnh như là icon đơn giản. Chúng rất tệ trong việc mã hóa các hình ảnh kiểu ảnh chụp, hoặc trong một số trường hợp đặc biệt khác.
## Chuyển đổi
Không có công cụ thiết kế tạo ra `VectorDrawable` trực tiếp, có nghĩa là cần một bước chuyển đổi từ định dạng khác sang VectorDrawable. Điều này có thể làm phức tạp luồng làm việc giữa designer và developer.
# Tại sao không là SVG
Nếu bạn đã từng làm việc với định dạng ảnh vector, chắc có lẽ bạn đã nghe tới định dạng SVG (Scalable Vector Graphics), tiêu chuẩn phổ biến trong nền công nghiệp web. Nó là một tiêu chuẩn được sử dụng rộng rãi, bao gồm nhiều tính năng phức tạp như thực thi javascrip, blur, hiệu ứng filter hay nhúng ảnh khác vào, kể cả là ảnh động gif. Android chạy trên những thiết bị di động với nhiều hạn chế, vậy nên để hỗ trợ hoàn toàn SVG là một mục tiêu không thực tế.
Tuy nhiên, SVG bao gồm một path spect định nghĩa cách để vẽ nên shape. Với API này, ta có thể đưa ra hầu hết các shape vector. Đây thực chất là những gì Android hỗ trợ: path spec của SVG (với một số sự bổ sung).
Thêm vào đó, bằng cách định nghĩa format của riêng mình, `VectorDrawable` có thể tích hợp với các tính năng khác của Android. 
# Khả năng của VectorDrawable
Như đã nói, `VectorDrawable` hỗ trợ [SVG path spec](https://www.w3.org/TR/SVG/paths.html), cho phép ta có thể chỉ định một hoặc nhiều shape để vẽ. Nó được đưa ra dưới dạng các file XML:
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
Lưu ý rằng ta cần phải chỉ định intrinsic size của asset file. Intrinsic size là kích thước của image mà khi ta set nó vào một `ImageView` với kích thước là `wrap_content`. Giá trị thứ hai, `viewport` size xác định canvas ảo, hoặc là không gian tọa độ để các lệnh vẽ tiếp theo có thể hoạt động. Intrinsic và viewport có thể khác nhau (nhưng nên cùng một tỉ lệ). Ta có thể định nghĩa vector trong một canvas kích thước 1x1 nếu ta muốn.
Thẻ `<vector>` chứa một hoặc nhiều thẻ `<path>`. Chúng có thể được đặt tên (cho tham chiếu sau này, phục vụ cho animation chẳng hạn), nhưng đặc biệt cần chỉ định một phần tử `pathData` mô tả hình dạng của shape. Chuỗi giá trị này có thể coi là một chuỗi lệnh điều khiển giúp ta vẽ nên shape, như hình dưới đây:
![](https://images.viblo.asia/05873dd9-1008-4e8c-8a19-c54926d4f910.gif)
Những câu lệnh ở trên di chuyển cây bút ảo, sau đó vẽ một đường thẳng tới một điểm, rồi lại di chuyển cây bút, rồi lại vẽ một đường khác. Với chỉ 4 lệnh đơn giản và phổ biến, ta có thể thể vẽ nhiều hình dáng khác nhau (có nhiều lệnh hơn mà bạn có thể xem [ở đây](https://www.w3.org/TR/SVG/paths.html#PathData) ):
* `M` : di chuyển tới
* `L` : vẽ đường thẳng từ điểm hiện tại tới điểm này
* `C` :  vẽ đường cong từ điểm hiện tại tới điểm này
* `Z` :  vẽ đường thẳng tới điểm bắt đầu.
Bạn có thể hỏi tại sao cần quan tâm tới những chi tiết này, sao không lấy từ file SVG? Ở đây, mục đích của ta không phải là để đọc một path và hiểu nó sẽ vẽ gì, cái ta cần là hiểu cơ bản về cơ chế hoạt động của `VectorDrawable`, nó thực sự sẽ cần thiết và sẽ giúp ta dễ hiểu hơn khi cần thực hiện một số tính năng nâng cao sau này.
Path bản thân nó vẽ bất kỳ thứ gì, chúng cần phải được stoke và / hoặc fill:
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
Ta cũng có thể định nghĩa một nhóm các path. Điều này cho phép ta định nghĩa các transformation sẽ được apply tới tất cả các path trong group. 
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
Lưu ý rằng ta không hể xoay / scale / translate từng path riêng lẻ. Nếu ta muốn làm điều này, cần phải đặt chúng trong một group.
Ta cũng có thể định nghĩa `clip-path`, để có thể mask khu vực mà những `path` khác trong cùng group có thể vẽ. 
```
<vector ...>
  
  <clip-path
    android:name="mask"
    android:pathData="..." />

  <path .../>

</vector>
```
Một lưu ý rằng clip-path không được khử răng cưa.
![](https://images.viblo.asia/00469a26-b565-423b-8d6c-b83b6d9c893e.png)
Trong ví dụ này, ta có hai cách để vẽ biểu tượng màn chập của camera. Ở hình bên trái, ta vẽ các path. Ở hình bên phải, ta vẽ một hình vuông, mask hình màn chập. Mask có thể giúp ta tạo nên những hiểu ứng thú vị (đặc biệt là các hiệu ứng động), nhưng nó lại đem đến một số nhược điểm, do đó nếu có thể vẽ theo một cách khác để tránh dùng nó thì bạn hãy cố gắng để tránh.
Path có thể được trim. Có nghĩa là ta chỉ vẽ một phần của path. Ta có thể trim một path đầy đủ.
```
<vector...>

  <path
    android:pathData="..."
    android:trimPathStart="0.1"
    android:trimPathEnd="0.9" />

</vector>
```
![](https://images.viblo.asia/eeec5b83-d06e-4685-a447-2672f4e3fc70.gif)
Ta có thể trim từ start, end, hoặc bất kỳ vị trí nào. Nó được định nghĩa trong đoạn 0-1. Path có thể apply một offset tới bất kỳ trim nào. Cũng lưu ý rằng offset có thể làm cho giá trị trim "wrap around".
Thẻ root `<vector>` hỗ trợ thuộc tính `alpha`, với giá trị từ 0-1. Group không có thuộc tính alpha nhưng mỗi path riêng lẻ hỗ trợ thuộc tính `fillAlpha` / `strokeAlpha`.
```
<vector ...
  android:alpha="0.7">

  <path
    android:pathData="..."
    android:fillColor="#fff"
    android:fillAlpha="0.5" />

</vector>
```
# Tổng kết
Trên đây mình đã tổng kết một số kiến thức cơ bản về vector assets, những ưu điểm, nhược điểm của nó. Định dạng vector của Android có năng lực mạnh mẽ và được hỗ trợ rộng rãi, nên hi vọng bài viết giúp bạn có thêm những kiến thức bổ ích cho bản thân mình. Mình sẽ tiếp tục sẽ có thêm những bài viết về đề tài này trong tương lai. Cảm ơn bạn đã theo dõi bài viết.

Tài liệu tham khảo: https://medium.com/androiddevelopers/understanding-androids-vector-image-format-vectordrawable-ab09e41d5c68