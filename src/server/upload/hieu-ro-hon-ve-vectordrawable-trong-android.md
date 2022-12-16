![](https://images.viblo.asia/fac87d39-f0bb-43c6-97d3-1faa8b9c3ded.png)

Như các bạn đã biết, các thiết bị `Android` có đủ kích cỡ, hình dạng và độ phân giải màn hình; đó là lý do tại sao việc sử dụng các `vector asset` không bị ảnh hưởng bởi độ phân giải sẽ tiết kiệm cho bạn kha khá thời gian và công sức khi phát triển ứng dụng. 
Nhưng chính xác thì chúng là gì? Lợi ích của chúng là gì? Ta phải đánh đổi gì nếu sử dụng chúng? Khi nào nên sử dụng chúng? Làm thế nào để tạo và sử dụng chúng? 
Hãy cùng mình trả lời các câu hỏi ở trên và tìm hiểu xem tại sao chúng ta nên sử dụng hầu hết tài nguyên trong ứng dụng dưới định dạng `vector` nhé.

# Raster vs Vector
Hầu hết các định dạng ảnh (png, jpeg, bmp, gif, webp, ...) được gọi là `raster`, có nghĩa là chúng hiển thị hình ảnh dưới dạng lưới pixel có kích thước cố định. Vì vậy, chúng được tạo ra cho một độ phân giải cụ thể (như các bạn thường thấy, khi ta đưa một hình ảnh dạng này vào thì thường phải có 3-5 hình với các kích thước khác nhau để đáp ứng cho từng độ phân giải tương ứng của thiết bị); tuy nhiên, định dạng `vector` hiển thị hình ảnh như một loạt các hình dạng được xác định trên một kích thước `canvas` trừu tượng (có thể hiểu đơn giản ảnh `vector` có thể bị giãn to nhỏ mà không bị vỡ hình, không có răng cưa).

# Taị sao lại là vector?
Các hình ảnh vector có 3 lợi ích chính:
* Sharp (sắc nét).
* Small (kích thước nhỏ).
* Dynamic (linh hoạt).

### Sharp
Hình ảnh `vector` có thể thay đổi kích thước một cách dễ dàng bởi vì chúng được vẽ trên một `canvas` và bạn có thể phóng to hay thu nhỏ `canvas` này lại và vẽ lại hình ảnh với kích thước mới nhận được. Còn các tài nguyên `raster` thường bị giảm chất lượng rất rõ rệt khi ta thay đổi kích thước ban đầu của chúng. Việc thu nhỏ tài nguyên `raster` có thể ít hoặc không ảnh huởng tới chất lượng ảnh, nhưng phóng to chúng lên thì hình ảnh chắc chắn sẽ bị mờ hay vỡ ảnh.

![](https://images.viblo.asia/914b9e7d-a34d-4eb0-bf4c-9de7f3bb733b.png)
<div align="center">Thử phóng to một hình ảnh `raster` (trái) và hình ảnh `vector` (phải)</div>
<br>
Đây chính là lí do mà chúng ta phải cung cấp nhiều phiên bản của cùng một hình ảnh cho từng độ phân giải màn hình trong `Android`:

* `res/drawable-mdpi/foo.png`
* `res/drawable-hdpi/foo.png`
* `res/drawable-xhdpi/foo.png`
* …

`Android` sẽ chọn hình ảnh ở trong thư mục `res` cho độ phân lớn hơn và gần nhất rồi thu nhỏ lại (nếu cần). Lưu ý rằng nhiều thiết bị hiện đại không nằm trong một độ phân giải chính xác (ví dụ: Pixel 3 XL là 552dpi, ở đâu đó giữa `xxhdpi` & `xxxhdpi`) nên hình ảnh thường sẽ được thu nhỏ.

Nếu sử dụng hình ảnh vector, bạn chỉ cần đúng một file vector và nó sẽ hoạt động ổn trên mọi loại màn hình.

### Small
Các `vector asset` nói chung thường nhỏ gọn hơn `raster asset` vì bạn chỉ cần một phiên bản duy nhất cho mọi độ phân giải và cơ chế nén của chúng cũng rất tốt.
<br><br>
Ví dụ, [ở đây](https://github.com/google/iosched/commit/78c5d25dfbb4bf8193c46c3fb8b73c9871c44ad6) là một thay đổi từ [ứng dụng Google I/O](https://play.google.com/store/apps/details?id=com.google.samples.apps.iosched), họ đổi một cố icon từ `raster PNG` thành `vector` và giảm được `428KB`. Dù đây không phải là một con số lớn, nhưng xét trên phương diện họ chỉ mới thay đổi các icon có kích thước nhỏ (nếu là các hình ảnh có kích thước lớn, ví dụ như các hình ảnh `illustration` thì còn tiết kiệm được nhiều hơn).
<br><br>
Lấy hình ảnh [illustration](https://github.com/google/iosched/blob/71f0c4cc20c5d75bc7b211e99fcf5205330109a0/android/src/main/res/drawable-nodpi/attending_in_person.png) từ ứng dụng `Google I/O` làm ví dụ:

![](https://images.viblo.asia/a2cc2684-69f8-450d-b675-106c75faeff1.png)

Nếu hình ảnh này được thay thế bằng `vector`, không những chất lượng hình ảnh được đảm bảo tốt hơn mà file `vector` có dung lượng nhỏ hơn rất nhiều:
* `Raster`: Kích thước tải xuống = 53,9KB (Kích thước raw = 54,8KB)
* `Vector`: Kích thước tải xuống = 3,7KB (Kích thước raw = 15,8KB)
<br><br>
**Lưu ý:** [Android App Bundle](https://developer.android.com/platform/technology/app-bundle/) đã cung cấp cho chúng ta lợi ích tương tự là chỉ tải về `asset` tương ứng cho thiết bị, nhưng một `VectorDrawable` vẫn sẽ có kích thước nhỏ hơn và giúp ta không cần phải chuẩn bị nhiều hình ảnh cho nhiều `asset`.

### Dynamic

Vì hình ảnh `vector` mô tả nội dung của chúng thay vì `flattening` thành pixel, chúng mở ra cơ hội cho những khả năng thú vị mới như `animation` hay các `theme` động.

![](https://images.viblo.asia/84017af5-362f-43a3-beca-6ec0d0c73426.gif)

# Điểm hạn chế
Không có gì là hoàn hảo cả, `VectorDrawable` cũng có những hạn chế mà bạn cần cân nhắc.

### Decoding
Như đã nói ở trên, `vector asset` mô tả nội dung của chúng, do đó chúng cần được `inflate` và vẽ ra trước khi sử dụng.

![](https://images.viblo.asia/ed801c73-c0af-4fdd-8074-fcfa6a3114bf.png)

Có hai bước đó là:
* **Inflation**: File `vector` của bạn phải được đọc và phân tích thành `VectorDrawable` (gồm các `Path`, `Group`, v.v. bạn khai báo).
* **Drawing**: Sau đó chúng được vẽ bằng cách thực hiện các lệnh trên `Canvas`.


Cả hai bước này đều tỷ lệ thuận với độ phức tạp của file `vector` và loại hoạt động bạn muốn thực hiện. Nếu bạn sử dụng các hình dạng rất phức tạp, sẽ mất nhiều thời gian hơn để phân tích thành các `Path`. Tương tự, nhiều thao tác vẽ cũng sẽ tiêu tốn nhiều thời gian hơn để thực hiện.

Đối với các `vector` tĩnh, giai đoạn vẽ chỉ cần được thực hiện một lần và sau đó có thể được lưu vào bộ đệm cho Bitmap. Nhưng các `animated vector` không thể hoạt động theo cách này vì các thuộc tính của chúng sẽ thay đổi liên tục để tạo thành `animation` và vì vậy cần phải vẽ lại liên tục.

Đây là sự đánh đổi cần cân nhắc của `raster` với `vector`. Các `vector` cung cấp các lợi ích đã nói ở trên nhưng cần nhiều tài nguyên hơn để `render`. Tuy nhiên, cấu hình của các thiết bị `Android` bây giờ đã mạnh hơn rất nhiều, cộng thêm việc độ phân giải màn hình thì ngày càng đa dạng nên `vector` càng tiện lợi và hữu ích hơn bao giờ hết.

### Suitability
![](https://images.viblo.asia/e3248be5-16c1-42bd-b2df-820c2e69198b.png)

Do tính chất của định dạng `vector`, chúng rất tuyệt vời khi sử dụng cho các tài nguyên đơn giản (ví dụ icon). Nhưng `vector asset` lại rất tệ khi cần phải mã hóa các hình ảnh dạng ảnh chụp (`photographic`) vì việc chuyển đổi nội dung bức ảnh thành các hình dạng là rất khó nên sử dụng định dạng `raster` (ví dụ như `webp`) thì sẽ hiệu quả hơn.

### Conversion
Hiện tại chưa hề có công cụ thiết kế nào tạo ra `VectorDrawable` một cách trực tiếp, điều đó có nghĩa là cần phải có một bước chuyển đổi từ các định dạng khác sang `VectorDrawable`. Điều này có thể làm phức tạp quy trình làm việc giữa các nhà thiết kế và nhà phát triển.

# Tại sao không sử dụng SVG?

Nếu bạn đã từng làm việc với các định dạng hình ảnh `vector`, thì có lẽ bạn cũng đã nghe qua định dạng `SVG` (Scalable Vector Graphics). `SVG` bao gồm nhiều khả năng phức tạp như thực thi `javascript`, các hiệu ứng làm mờ và `filter` tùy ý hoặc nhúng các hình ảnh khác, thậm chí cả các hình động. Tuy nhiên, `Android` chỉ chạy trên các thiết bị di động thì việc hỗ trợ toàn bộ chức năng của SVG không phải là một mục tiêu thực tế.

Tuy nhiên, `SVG` có bao gồm một thứ gọi là `path spec`, xác định cách mô tả và vẽ các `shape`. Với `API` này, bạn có thể thể hiện hầu hết các hình dạng dưới dạng vector. Đây thực chất là những gì Android hỗ trợ: `SVG's path spec` (và còn có một số thứ khác nữa).

Ngoài ra, bằng cách xác định định dạng của riêng mình, `VectorDrawable` có thể tích hợp với các tính năng nền tảng Android. Ví dụ: làm việc với hệ thống tài nguyên Android để tham chiếu tới `@colors`, `@dples` hoặc `@strings`, ...

Phần tiếp theo chúng ta sẽ đi sâu hơn vào khả năng và cách sử dụng cũng như tạo ra một `VectorDrawable`.