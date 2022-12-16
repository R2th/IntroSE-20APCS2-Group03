Load một bitmap lớn trong memory luôn luôn khó khăn. Và rất dễ làm cho app của chúng ta bị crash vì Out Of Memory. Như chúng ta đã biết android giới hạn bộ nhớ. Chúng ta phải ghi nhớ điều này.

Có rất nhiều câu hỏi trên stackoverflow về điều đó và bạn có thể bỏ qua bài viết này và coppy paste những đoạn code đó khi bạn xảy ra Out Of Memory. Nhưng với những người khác tôi muốn giới thiệu cách load một bitmap lớn và cách thực sự nó hoạt động.
> Tôi muốn cho bạn thấy logic đằng sau bitmap. Tôi đề xuất bạn sử dụng Picasso hoặc Glide để load image. Việc code lại những gì đã có sẵn thực sự không cần thiết.
# Load Bitmap trong Memory

Nó rất dễ. Tất cả những gì bạn cần là decode image của bạn sử dụng BitmapFactory.
```java
Bitmap bitmap=BitmapFactory.decodeResource(getResources(),R.mipmap.hqimage)
imageview.setImageBitmap(bitmap)
```

Mọi thứ trông ổn. Nhưng có một vấn đề mà tôi sẽ nói với bạn. Hãy kiểm tra kích thước của decode bitmap trong memory bằng phương thức getByteCount() nó sẽ trả ra size của bitmap. Ở đây ta thấy kích thước của bitmap ví dụ như 12262248 byte nó tương đương với 12.3MB tỏng khi kích thước của image thực sự trong ổ đĩa chỉ là 3.5MB. Điều này làm bạn thực sự bối rối. Và đây là lí do:
> Image được nén khi nó ở trong ổ đĩa (lưu dưới dạng JPG,PNG hoặc các định dạng tương tự). Một khi bạn load image trong memory, nó sẽ không nén và chiếm nhiều bộ nhớ.

## Các bước

* Lấy size của iamge mà không load nó trong bộ nhớ.
* Tính toán hệ số scale với độ lớn của ảnh.
* Load bitmap trong bộ nhớ và tính toán giá trị

## BimapFactory.Options

Đây là class cungc cấp metadata cho chúng ta. Chúng ta có thể sử dụng class này để hoàn thành bước đầu tiên
```java
BitmapFactory.Options options = new BitmapFactory.Options;
options.inJustDecodeBounds = true;
BitmapFactory.decodeResource(getResources, R.mipmap.hqimage, options);
```

Chúng ta truyền thể hiện của BitmapFactory.Options tới BitmapFactory.decodeSource(). Bạn có thể thấy chúng ta cấu hình "options" bằng cách thiết lập inJustDecodeBounds bằng true. Điều này có nghĩa gì? Nó nghĩa là bạn không muốn load bitmap trong bộ nhớ. Chúng ta chỉ muốn lấy ra thông tin (with, height, v.v..) về image. Vì thế chúng ta có thể tính toán hệ số sclae với những thông tin đó.

Khi chúng ta chạy code này và log ra giá trị của options:

```
options.outHeight : 1126
options.outWidth : 2000
options.bitmap : null
```

Ở đây chúng ta có kết quả. Chúng ta có height, width. Và tôi chỉ muốn thấy nếu bitmap thực sự là null.

## Giảm kích thước ảnh (trong Memory)

Bây giờ là lúc chúng ta tính toán inSampleSize. inSampleSize là một hệ số scale mà thuộc về lớp BitmapFacotry.Options.

Nếu chúng ta có một image 1000x1000 và chúng ta thiết lập inSampleSize là 2 trước khi quá trình decode diễn ra. Chúng ta sẽ có một bức ảnh 500x500 sau khi decode. Nếu chúng ta có ảnh 200x400 và chúng ta set inSampleSize là 5, chúng ta sẽ có ảnh 40x80 sau khi decode.
```java
BitmapFactory.Options options = new BitmapFactory.Options();
options.inJustDecodeBounds = true;
options.inSampleSize = 3; 
BitmapFactory.decodeResource(getResources(), R.mipmap.hqimage, options);
```

Liệu chúng ta có thể sử dụng nó như thế này? Không. Bởi vì chúng ta không biết kích thước của image. Nếu image nhỏ chúng ta làm nó nhỏ hơn nữa, người dùng của chúng ta có thể thấy các pixel thay vì image. Một vài hình ảnh phải thu nhỏ lại 5 lần. Một vài hình ảnh phải thu nhỏ lại 2 lần. Chúng ta không thể thiết lập hệ số scale như là một hằng số. Do đó chúng ta phải tính toán theo kích thước ảnh.

Tính toán inSampleSize tùy thuộc vào bạn. Ý tôi là, bạn có thể viết thuật toán của bạn theo những gì bạn cần. Trong tài liệu về android. Bạn cũng có thể tính toán inSampleSize bằng cách tăng nó lên 1x1.

Bạn có thể kiểm tra code tính toán inSampleSize từ tài liệu android.

```java
options.inSampleSize = calculateInSampleSize(options, 500,500);
options.inJustDecodeBounds = false;
Bitmap smallBitmap = BitmapFactory.decodeResource(getResources(), R.mipmap.hqimage, options);
```

Chúng ta chuyển inJustDecodeBounds thành false và lấy bitmap với thể hiện options.

Bây giờ, phương thức bitmap.getByteCount() sẽ trả ra 3.1MB. Đây là kích thước trong bộ nhớ. Như chúng ta đã nói từ trước. images đã nén khi nó ở trong ổ đĩa. Chúng lớn hơn khi chúng ta load chúng trong memory.

Chúng ta đã giảm từ 12.3MB thành 3.1 MB. Nó đã giảm 75% bô nhớ.

## Giảm kích thước ảnh (Trong ổ đĩa)

Chúng ta cũng có thể giảm kích thước ảnh trong ổ đĩa. Chúng ta có thể nén bitmap của chúng ta bằng sử dụng phương thức compress của Bitmap.

Hãy kiểm tra độ lớn của file mà không thay đổi chất lượng của ảnh bitmap. 100 nghĩa là cùng chất lượng

```java
ByteArrayOutputStream bos = new ByteArrayOutputStream();
bitmap.compress(Bitmap.CompressFormat.JPEG, 100, bos);
byte[] bitmapdata = bos.toByteArray();
```

Khi tôi tính toán cho image ban đầu, kết quả là 1.6MB trên ổ đĩa. Hãy thay đổi chất lượng và kiểm tra lại độ lớn của file.

```java
bitmap.compress(Bitmap.CompressFormat.JPEG, 50, bos);
```

Tôi thay đổi chất lượng thành 50. Và kết quả là 24.4KB.

Compress Format nên là .JPEG nếu chúng ta muốn thay đổi chất lượng của bitmap. Chất lượng không thể thay đổi với định danh PNG.

Chúng ta đã giảm kích thước file từ 1.6MB thành 24.4KB.

# Kết

Hi vọng qua bài viết của tôi. Mọi người đã hiểu hơn về những gì thực sử xảy ra khi chúng ta load một bitmap. Tôi khuyến khích mọi người dùng các thư viện như Picasso và Glide. Nhưng dù sao chúng ta cũng nên hiểu bản chất chứ. Nhỉ?