Như tiều đề của bài viết, mỗi khi chúng ta phải load ảnh có kích thước lớn bằng bitmaps thì hầu như sẽ gặp phải OOM. Mình dám chắc 100% các developer đã gặp phải trường hợp này ít nhất là 1 lần.
Vậy liệu có những giải pháp nào cho vấn đề này? Sau 1 thời gian search hàng loạt thì mình cũng đã kiếm được 1 số bài viết khá hay nói về vấn đề này. Và trong bài viết này mình xin phép được tổng hợp lại theo ý hiểu và chia sẻ vs mọi người những kiến thức cơ bản nhất về bitmap và làm sao để load bitmap 1 cách hiệu quả :))

Trước khi vào nội dung bài viết thì mình xin nc qua 1 chút về khái niệm Bitmaps. Như chính cái tên của nó, Bitmaps là 1 tập hợp (1 dãy) các bit 0 và 1. Các bạn chắc cũng biết rằng mỗi bức ảnh mà chúng ta có đều dk cấu tạo nên từ rất nhiều các pixel nhỏ phải k nào. Mỗi pixel sẽ mang thông tin về màu sắc của nó. Thì để biểu diễn đk các màu sắc này, máy tính xử dụng chính Bitmaps (dãy 0 và 1) để mô tả màu sắc của pixel đó. Thường thì mỗi pixel sẽ là 1 tập hợp các bits. Rồi cứ như thể, các pixel tổng hợp thành bức ảnh mà bạn nhìn thấy bằng mắt, còn máy tính nó sẽ hiểu bức ảnh đó là 1 tập hợp các bit mô tả màu sắc cho bức ảnh đó. :vv. Ok nghe cũng khá ổn phải k nào :))
Bây giờ vào phần chính nhé!
# Load bitmap into memory
Để có thể load bitmap vào memory thì việc đầu tiên bạn phải làm là decode bức ảnh đó thành bitmaps. 
```java
Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.mipmap.hqimage);
imageView.setImageBitmap(bitmap);
```
Ok. Rất đơn giản phải k nào. Nhưng có chút vấn đề ở đâu. Bạn tự hỏi rằng k biết image này nặng bao nhiêu?, nó được lưu trong bộ nhớ thì có tốn k nhỉ?... Để trả lời câu hỏi này bạn chỉ cần sử dụng **bitmap.getByteCount()** để lấy được lượng memory được dùng cho image này. Thì thật bất ngờ là khi mình test ra thấy lượng memory nó chiếm gấp đến hơn 3 lần size của nó trên disk. Điều này xảy ra là vì bức ảnh này đã được **compress** (nén) lại khi lưu ở disk. Lại thêm 1 câu hỏi nữa. Vậy **compress** là cái mịa gì? :)) Thực ra khái niệm này các bạn chắc hẳn đã nghe khá nhiều rồi nhưng mà vẫn chưa hiểu cơ chế thực sự của nó. **Compress** được chia làm 2 loại là nén k mất thông tin và nén mất thông tin. Về cơ bản thì cơ chế của nó sẽ là lược bỏ bớt các thông tin k cần thiết của đối tượng, hay hiểu nôm na là tóm tắt lại dữ liệu của đối tượng để nó k bị trùng lặp, chính điều này sẽ làm giảm dữ liệu thực tế của đối tượng khi được nén lại và lưu trên disk.
Tuy nhiên khi mà chúng ta load ảnh vào memory thì tất cả dữ liệu thực tế của bức ảnh sẽ phải tường minh hết để có thể chạy được. Và đây chính là **mấu chốt** cho nguyên nhân trên.
# Các bước xử lí
* Get size của image mà k load vào memory vội
* Tính toán kích thước phù hợp của ảnh cần hiển thị 
* Load bitmap vào memory với kích thước đã được tính toán

Ok. Cùng lần lượt xử lí theo các bước nhé! <br>
## Get size của image mà k load vào memory

### BitmapFactory.Options
Là 1 metadata class. Tức là 1 class chứa các thông tin cần thiết về đối tượng Bitmaps. 
```java
BitmapFactory.Options options = new BitmapFactory.Options();
options.inJustDecodeBounds = true;
BitmapFactory.decodeResource(getResources(), R.mipmap.hqimage, options);
```
Như ta thấy, mk đã thêm **options** vào hàm **decodeResource**, trong đối tượng option này lại có set 1 thuộc tính là **inJustDecodeBounds = true**. Mục đích của nó là để k load bitmap vào memory vội. Vì thế ta có thể lấy size của image và scale nó trước khi load vào memory. Và đây là Log mình nhận được: 
```java
options.outHeight : 1126
options.outWidth : 2000
options.bitmap : null
```
## Tính toán kích thước phù hợp của ảnh cần hiển thị 
Bây giờ là lúc ta phải tính toán **inSampleSize** - nó là 1 thuộc tính của **BitmapFactory.Options**. Ví dụ ta có size ban đầu của ảnh là 1000x1000 thì khi set **inSampleSize = 2** thì bức ảnh sẽ được scale lại thành 500x500. Đơn giản thế thôi :vvv.
```java
BitmapFactory.Options options = new BitmapFactory.Options();
options.inJustDecodeBounds = true;
options.inSampleSize = 2; 
BitmapFactory.decodeResource(getResources(), R.mipmap.hqimage, options);
```
Tuy nhiên, giá trị này k thể set tùy tiện được mà ta phải có tính toán tùy theo kích thước thực sự của image. Nếu k ảnh khi được hiển thị lên sẽ k đầy đủ. Vậy làm sao để tính toán chính xác được giá trị **inSampleSize**. [Đây](https://developer.android.com/topic/performance/graphics/load-bitmap.html#load-bitmap). Các bạn chịu khó đọc thêm để hiểu nhé. :))
## Load bitmap vào memory với kích thước đã được tính toán
Cuối cùng ta chỉ cần load image có size sau khi được scale vào memory
```java
options.inSampleSize = calculateInSampleSize(options, 500,500);
options.inJustDecodeBounds = false;
Bitmap smallBitmap = BitmapFactory.decodeResource(getResources(), R.mipmap.hqimage, options);
```
Và thành quả ta đạt được đó chính là bộ nhớ mà bức ảnh chiếm trong memory đã giảm xuống rất đáng kể. Trong trường hợp này của mk là giảm tới 75% so với ban đầu với ảnh có size trong memory ban đầu là hơn 12MB
## Options
Ta cũng có thể reduce size image ngay trên disk thay vì là memory như trên. 

Đầu tiên ta cũng lấy size thực tế trước khi nén của bức ảnh.
```java
ByteArrayOutputStream bos = new ByteArrayOutputStream();
bitmap.compress(Bitmap.CompressFormat.JPEG, 100, bos);
byte[] bitmapdata = bos.toByteArray();
```
Giá trị **100** ở đây tức là sẽ không thay đổi hay làm giảm chất lượng của ảnh JPEG ban đầu, và sau đó sẽ lấy ra size on disk của bức ảnh. Để reduce size on disk của bức ảnh ta chỉ cần giảm giá trị này xuống **50** chẳng hạn
```java
bitmap.compress(Bitmap.CompressFormat.JPEG, 50, bos);
```
Kết quả mà mình nhận được đó là ảnh trên disk khi chưa nén là **1.6MB** còn sau khi thực hiện nén sẽ chỉ còn **24.4KB**

Và đây là thành quả!
![](https://images.viblo.asia/1d7ba5ca-ebe6-4651-b7aa-0e1ab23a6463.png)
Rất tuyệt phải k nào :vv. Mong là qua đây các bạn có thể hiểu cơ bản về Bitmap và cơ chế load bitmap, từ đó tránh gặp phải lỗi chết người OOM như ban đầu mình đề cập. :)))
# Tài liệu tham khảo 
[Android Jlelse](https://android.jlelse.eu/loading-large-bitmaps-efficiently-in-android-66826cd4ad53)

[Android Developer](https://developer.android.com/topic/performance/graphics/load-bitmap.html#load-bitmap)

[Wiki](https://en.wikipedia.org/wiki/Bitmap)