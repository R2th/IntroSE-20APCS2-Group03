> ![](https://cdn-images-1.medium.com/max/2560/1*C9YTPhelGjw4AoXlHeuqig.png)
# Overview
Ngày nay các thiết bị Android có rất nhiều hình dạng, kích thước và độ phân giải màn hình khác nhau. Đó là lý do tại sao ảnh Vector được thiết kế ra. Nhưng chính xác ảnh vector là gì ? nó mang lại những điểm tích cực và hạn chế gì? Khi nào thì chúng ta nên sử dụng chúng? Làm sao để tạo ra được ảnh Vector? Trong bài Viblo này chúng ta sẽ cùng nhau khám phá và tìm câu trả lời cho các câu hỏi bên trên.
# Raster vs Vector
Phần lớn các định dạng ảnh (png, jpeg, bmp, gif, webp,...) đều là raster chúng biểu diễn hình ảnh dưới dạng một lưới cố định. Hậu quả là chúng sẽ dùng cho một độ phân giải cụ thể mà chả cần quan tâm về nội dung của bức ảnh, chỉ cần mầu sắc cho mỗi pixel. Tuy nhiên đồ họa dạng Vector lại mô tả hình ảnh như một tập hợp các hình dạng được xác định trên một hệ tọa độ (*Cartesian*)

# Tại sao lại là vector?
Vector assets có ba ưu điểm chính là:
* Sharp
* Small
* Dynamic
## Sharp
Ảnh Vector căn chỉnh lại kích thước một cách hoàn hảo bởi vì chúng mô tả hình ảnh thông qua một hệ tọa độ, hệ tọa độ này có thể phóng to hoặc thu nhỏ sau đó vẽ lại ảnh ở kích thước đó. Mặt khác Raster assets có thể bị xấu đi khi chúng ta thay đổi kích thước của chúng, còn khi thu nhỏ chúng xuống có khả năng sẽ ổn nhưng đôi khi có thể xảy ra trường hợp bị dúm lại bởi vì chúng cần thêm các pixel còn thiếu vào!!
> ![](https://cdn-images-1.medium.com/max/800/1*Z_ol_Ajp2SsMNx3DHKUgfQ.png)
> Đây là thành phẩm của việc phóng to ảnh raster (bên trái) và ảnh Vector (bên phải)

Đó cũng chính là lý do tại sao Android cung cấp nhiều phiên bản của rừng Raster asset cho các màn hình có độ phân giải khác nhau:

> rawable-mdpi/foo.png
> 
> res/drawable-hdpi/foo.png
> 
> res/drawable-xhdpi/foo.png
> 
> …
> 

Android sẽ chọn ra ảnh có mật độ điểm ảnh **lớn nhất** và thu nhỏ lại (nếu cần). Với mục định các thiết bị có độ phân giải màn hình cao có thể hiển thị ảnh một cách đẹp nhất thì chúng ta cần tạo nhiều phiên bản của một bức ảnh nhưng với độ phân giải khác nhau.

> Nhiều thiết bị hiện đại không được thiết kế ở độ phân giải chính xác (ví dụ: Google Pixel 3 Xl là 522dpi, ở đâu đó trong khoảng xxhdpi & xxxhdpi) nên assets thường bị thu nhỏ lại.
> 
Do các Vector image có thể thay đổi kích thước một cách hoàn hảo nên chỉ cần một file Vector duy nhất và chắc chắn rằng nó sẽ hoạt động hoàn hảo trên bất kỳ độ phân giải màn hình nào của thiết bị.

## Small
Các Vector asset thông thường sẽ nhỏ gọn hơn Raster asset vì chỉ cần một file Vector duy nhất .
Ví dụ ở đây, Thay đổi từ  *Google I/O  app* nơi goolge đã chuyển một số biểu tượng từ PNG raster sang vectơ và giảm được 482KB. Trong khi điều này có vẻ không giảm được nhiều vì do  đây chúng ta sử dụng cho các icon có kích thước nhỏ, đối với hình ảnh có kích thước lớn hơn (như hình minh họa ở dưới) sẽ tiết kiệm được nhiều hơn.

>Inlustration dưới đây là một ví dụ được lấy từ Google I/O app năm ngoái:
> ![](https://cdn-images-1.medium.com/max/800/1*tzT8u-ungCXb_CHGAyAiPA.png)
> Illustrations là ứng cử viên tốt cho việc sử dụng ảnh Vector 
> 

Chúng ta không thể thay thế điều này bằng VectorDrawable vì làm nghiêng một bức ảnh không được hỗ trợ rộng rãi vào thời điểm đó (khác với bây giờ) Vì vậy chúng ta phải tạo ra nhiều phiên bản Raster asset. Nếu chúng ta có thể sử dụng một Vector, thì kích thước này sẽ là 30% cho kết quả tốt hơn:
> Raster: Download Size = 53.9KB (Raw file size = 54.8KB)
> 
> Vector: Download Size = 3.7KB (Raw file size = 15.8KB)
> 

Chú ý: trong khi cung cấp đủ Raster asset dựa theo độ phân giải cần thiết cho thiết bị, VectorDrawable thường sẽ vẫn nhỏ hơn và cũng không cần phải tạo ra nhiều Raster asset nữa.

## Dynamic
Vì Vector image mô tả nội dung của bức ảnh theo hệ tọa độ thay vì tính toán chúng thành các pixel, nó sẽ mở cho chúng ta khả năng tạo ra các Animation, Interactivity hoặc khả năng thay đổi dựa theo chủ đề của thiết bị. Tôi sẽ nói trong các bài viết trong tương lai nhé!!!
> ![](https://cdn-images-1.medium.com/max/800/1*rJQEzHNMyBrZxjzpPDb84w.gif)
> Các ảnh Vector duy trì cấu trúc hình ảnh để các phần tử riêng lẻ có thể căn chỉnh theo chủ đề hoặc thêm animation
> 
# Cái giá phải trả:
Vector image sẽ có vài nhược điểm mà chúng ta cần phải chú ý:
## Decoding

Như đã nêu trước đó , Vector asset mô tả nội dung của chúng theo hệ trục tọa độ , do đó chúng ta cần inflate và drawn trước khi sử dụng.
> ![](https://cdn-images-1.medium.com/max/800/1*OsKMU2enRRjNVo09fEb08A.png)
> Các bước xảy ra trong quá trình giải mã một vector trước khi biểu diễn chúng
Quá trình này có hai bước:
1.  Inflation: File Vector của bạn sẽ được đọc và phân tích trong [VectorDrawable](https://developer.android.com/reference/android/graphics/drawable/VectorDrawable) mô hình hóa các path,gruop ... tùy thuộc vào chúng ta định nghĩa.
2. Drawing: Các model object này sau đó được vẽ bằng cách thực hiện các lệnh vẽ Canvas

Cả hai bước này đều tỷ lệ thuận với độ phức tạp của file Vector và cách thức bạn sử dụng nó.  Nếu bạn sử dụng các hình dạng rất phức tạp, sẽ mất nhiều thời gian hơn để phân tích nó thành các [Path](https://developer.android.com/reference/android/graphics/Path) Tương tự, nhiều thao tác vẽ sẽ mất nhiều thời gian hơn để thực hiện (và trong một số tường hợp tốn kém hơn, ví dụ như thao tác clip). Chúng ta sẽ xem xét lại điều này trong bài viết sau nhé!!!

Đối với các dynamic vector, giai đoạn vẽ chỉ cần được thực hiện một lần và sau đó có thể được lưu vào bộ đệm thành Bitmap. Các animate vector, không thể tạo ra tối ưu hóa này vì các thuộc tính của chúng nhất thiết phải thay đổi và yêu cầu  cần được vẽ lại.

So sánh điều này với các raster asset như PNG chỉ cần giải mã nội dung tập tin, thì nó đã được  tối ưu hóa cao theo thời gian.

Đây là sự đánh đổi thiết yếu của raster vs vector. Các vectơ cung cấp các lợi ích đã nói ở trên nhưng với chi phí đắt hơn để biểu diễn. Trong những ngày đầu Android, các thiết bị ít mạnh hơn và độ phân giải màn hình khác nhau rất ít. Ngày nay, các thiết bị Android mạnh hơn và có độ phân giải màn hình rất lớn. Đây là lý do tại sao tôi tin rằng đã đến lúc tất cả các ứng dụng chuyển sang sử dụng vector asset.

## Suitability
> ![](https://cdn-images-1.medium.com/max/800/1*PyZVYFWUF5bH9DYpwW16aQ.png)
> 

Do tính chất của định dạng vector rất tuyệt vời  trong việc mô tả một số asset như các biểu tượng đơn giản, v.v ... Thật tồi tệ khi mã hóa hình ảnh người, động vật , môi trường ... có thể sẽ hiệu quả hơn rất nhiều khi chúng ta sử dụng định dạng raster (như webp). Tất nhiên đây chỉ là tương đối thôi tùy thuộc vào độ phức tạp asset của bạn.
## Conversion

Không có công cụ thiết kế (mà tôi biết) tạo ra VectorDrawables trực tiếp, điều đó có nghĩa là có một bước chuyển đổi từ các định dạng khác. Điều này có thể làm phức tạp quy trình làm việc giữa các designer và developer. Chúng tôi sẽ đi sâu vào chủ đề này trong một bài viết sau nhé!!
# Tại sao không sử dụng định dạng SVG?

Nếu bạn đã từng làm việc với các hình ảnh định dạng  vector, thì có lẽ bạn sẽ bắt gặp định dạng SVG (Đồ họa vectơ có thể mở rộng), định dạng ảnh được tiêu chuẩn được sử dụng trên web. Nó có khả năng tích hợp với trình duyệt, nhưng nó cũng là một tiêu chuẩn rộng lớn. Nó bao gồm nhiều khả năng phức tạp như thực thi các hiệu ứng javascript, làm mờ và lọc tùy ý hoặc nhúng các hình ảnh khác, thậm chí là các hình động. Android chạy trên các thiết bị di động bị hạn chế, vì vậy việc hỗ trợ toàn bộ thông số SVG không phải là mục tiêu thực tế.

Tuy nhiên, SVG bao gồm một đặc tả đường dẫn xác định cách mô tả và vẽ hình. Với API này, bạn có thể thể hiện hầu hết các hình dạng vector. Đây thực chất là những gì Android hỗ trợ: thông số đường dẫn SVG (cộng với một vài bổ sung). 

Ngoài ra, bằng cách xác định định dạng của riêng mình, VectorDrawable có thể tích hợp với các tính năng nền tảng Android. Ví dụ: làm việc với hệ thống tài nguyên Android để tham chiếu @colors, @dples hoặc @strings, làm việc với các thuộc tính chủ đề hoặc AnimatedVectorDrawable bằng Animators tiêu chuẩn.

# Khả năng của VectorDrawable
Như đã nêu, VectorDrawable hỗ trợ đặc tả đường dẫn SVG, cho phép bạn chỉ định một hoặc nhiều hình dạng sẽ được vẽ. Nó có file XML giống như thế này:
![](https://images.viblo.asia/d0fd0cd2-b252-494a-be39-bc774c3448cf.png)

Lưu ý rằng bạn cần định rõ kích thước bên trong vector asset, đó là kích thước nếu bạn đặt nó trong một ImageView wrap_content. Kích thước viewport thứ hai xác định khung vẽ ảo hoặc không gian tọa độ và tất cả các lệnh vẽ tiếp theo được xác định. Kích thước bên trong và viewport thứ hai có thể khác nhau (nhưng phải ở cùng tỷ lệ). Bạn có thể xác định các vector của mình trong khung hình 1 * 1 nếu bạn thực sự muốn.

Phần tử <vector> chứa một hoặc nhiều phần tử <path>. Chúng có thể được đặt tên nhưng chủ yếu phải chỉ định một yếu tố Path mô tả hình dạng. Các đoạn chuỗi khó hiểu này có thể được coi là một chuỗi các lệnh điều khiển bút trên một khung vẽ ảo:
> ![](https://cdn-images-1.medium.com/max/800/1*6BxPXqBgeJIpMoiYLoOygA.gif)
>     Trực quan hóa các Path
    
 Các lệnh trên di chuyển bút ảo, sau đó vẽ một đường đến một điểm khác, nhấc và di chuyển bút, sau đó vẽ một đường khác. Chỉ với 4 lệnh phổ biến nhất, chúng ta có thể mô tả khá nhiều hình dạng hay ho (dưới đây là một vài lệnh):
> M chuyển đến điểm
>  
> L chuyển đến dòng
>     
> C Đường cong
>     
> Z đóng (vẽ đến điểm đầu tiên)
>     
> (Lệnh viết hoa sử dụng tọa độ tuyệt đối và sử dụng chữ thường cho tọa độ tương đối)
    
Các bạn đang tự hỏi có thực sự cần quan tâm đến chi tiết đến mức độ này - bạn có thể lấy những thứ này từ các tệp SVG không? Mặc dù bạn không cần phải đọc và hiểu những gì nó sẽ vẽ, nhưng có một sự hiểu biết cơ bản về những gì VectorDrawable đang làm là vô cùng hữu ích và cần thiết để hiểu một số tính năng nâng cao mà VectorDrawable sẽ có sau này.
Bản thân các thẻ Path sẽ không vẽ bất cứ thứ gì , chúng cần có các thẻ stroke , fiil... thì chúng mới có nội dung
    
> ![](https://images.viblo.asia/a5c20300-4e24-4c06-9473-513b6549190f.png)
    
Mình sẽ trình bầy chi tiết về các tùy chỉnh của thẻ fill và thẻ stroke nhé!!
    
Ngoài ra có thể định nghĩa ra group của path. Điều này cho phép chúng ta định nghĩa các transformation được áp dụng cho các path ở trong Gruop này
    
>  ![](https://images.viblo.asia/43f5e400-b856-4899-be15-8503a8f6231f.png)
    Lưu ý rằng bạn có thể rotate/scale/translate các path riêng lẻ. Nếu bạn muốn làm điều này, bạn sẽ cần phải đặt chúng trong một group. Điều này dẫn hữu dụng trong trường hợp bạn muốn tạo animation nhé!


Cảm ơn các bạn đã đọc bài viết của mình nhé! hi vọng đã giúp các bạn hiểu thêm phần nào về Vector trong android !!!

Nguồn tham khảo:https://medium.com/androiddevelopers/understanding-androids-vector-image-format-vectordrawable-ab09e41d5c68
Tác giả: Nick Butcher