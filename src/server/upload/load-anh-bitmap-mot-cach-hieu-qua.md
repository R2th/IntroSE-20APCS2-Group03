Hiện nay có rất nhiều thư viện hỗ trợ cho vấn đề load một ảnh bitmap. Gile là thư viện giúp hiển thị ảnh nhanh và hiệu quả nhất. Ngoài ra còn có một số thư viện khác tương tự như Picasso, Fresco. Các thư viện này đơn giản hóa hầu hết các tác vụ phức tạp liên quan đến bitmap và các loại hình ảnh khác trên Android.

Hình ảnh thì có đủ hình dạng và kích cỡ. Trong nhiều trường hợp, chúng lớn hơn yêu cầu đối với giao diện người dùng ứng dụng (UI) thông thường. Ví dụ: ảnh được chụp bằng camera của thiết bị Android hiện này thường có độ phân giải cao hơn nhiều so với mật độ màn hình của thiết bị.

Nếu bạn đang làm việc với bộ nhớ hạn chế, lý tưởng nhất là bạn chỉ muốn tải phiên bản có độ phân giải thấp hơn trong bộ nhớ. Phiên bản độ phân giải thấp hơn phải phù hợp với kích thước của thành phần UI hiển thị nó. Một hình ảnh với độ phân giải cao hơn không cung cấp bất kỳ lợi ích nào, nhưng vẫn chiếm bộ nhớ lớn và phát sinh thêm chi phí hiệu suất do phải scale về kích thước phù hợp hiển thị trên thành phần UI.

Phần này hướng dẫn bạn giải mã các bitmap kích thước lớn mà không vượt quá giới hạn bộ nhớ của mỗi ứng dụng bằng cách tải một phiên bản tương tự nhưng có kích thước nhỏ hơn trong bộ nhớ.

## Đọc Bitmap Dimensions and Type

Lớp BitmapFactory cung cấp một số phương thức giải mã (**decodeByteArray()**, **decodeFile()**, **decodeResource()**, v.v.) để tạo Bitmap từ nhiều nguồn khác nhau. Chọn phương pháp giải mã phù hợp nhất dựa trên nguồn dữ liệu hình ảnh của bạn. Các phương thức này cố gắng phân bổ bộ nhớ cho bitmap được xây dựng và do đó có thể dễ dàng dẫn đến exception OutOfMemory. Mỗi loại phương thức giải mã có chữ ký bổ sung (**additional signatures**) cho phép bạn chỉ định các tùy chọn giải mã thông qua lớp **BitmapFactory.Options**. Đặt thuộc tính **inJustDecodeBound** thành true trong khi decode để tránh phân bổ bộ nhớ, ở đây sẽ trả về null cho đối tượng bitmap nhưng sẽ trả lại các giá trị outWidth, outHeight và outMimeType cho biết kích thướng ảnh bitmap sau khi decode. Kỹ thuật này cho phép bạn đọc kích thước và loại dữ liệu hình ảnh trước khi tạo và phân bổ bộ nhớ cho bitmap.

```
val options = BitmapFactory.Options().apply {
    inJustDecodeBounds = true
}
BitmapFactory.decodeResource(resources, R.id.myimage, options)
val imageHeight: Int = options.outHeight
val imageWidth: Int = options.outWidth
val imageType: String = options.outMimeType
```

Để tránh các exception java.lang.OutOfMemory, hãy kiểm tra kích thước của bitmap trước khi giải mã nó, trừ khi bạn hoàn toàn chắc chắn rằng hình ảnh có kích thước dự đoán phù hợp với bộ nhớ khả dụng.

## Tải một phiên bản Scaled Down tới bộ nhớ

Bây giờ kích thước hình ảnh đã được biết, chúng có thể được sử dụng để quyết định xem hình ảnh đầy đủ sẽ được tải vào bộ nhớ hay nếu một phiên bản Scaled Down nên được tải thay thế. Dưới đây là một số yếu tố cần xem xét:
* Ứớc tính kích thước trên bộ nhớ của việc tải hình ảnh đầy đủ.
* Dung lượng bộ nhớ của bạn phải đảm bảo có thể tải được hình ảnh đầy đủ với các phiên bản device khác nhau.
* Kích thước của thành phần ImageView hoặc UI đích mà hình ảnh sẽ được tải vào.
* Kích thước màn hình và mật độ của thiết bị hiện tại.
Ví dụ, sẽ là không đáng để tải hình ảnh 1024x768 pixel vào bộ nhớ nếu cuối cùng nó chỉ được hiển thị trong ImageView với kích thước 128x96 pixel.

Để yêu cầu bộ giải mã lấy mẫu hình ảnh, tải một phiên bản nhỏ hơn vào bộ nhớ, chúng ta sẽ đặt **inSampleSize** thành **true** trong đối tượng **BitmapFactory.Options**. 
Ví dụ: một hình ảnh có độ phân giải 2048x1536 được giải mã với inSampleSize bằng 4 tạo ra một bitmap khoảng 512x384. Tải ảnh với kích thước này vào bộ nhớ sử dụng 0,75 MB thay vì 12 MB cho hình ảnh đầy đủ (giả sử cấu hình bitmap của ARGB_8888). Ở đây, có một phương pháp để tính giá trị kích thước mẫu là lũy thừa của hai dựa trên chiều rộng và chiều cao mục tiêu:

```
fun calculateInSampleSize(options: BitmapFactory.Options, reqWidth: Int, reqHeight: Int): Int {
    // Raw height and width of image
    val (height: Int, width: Int) = options.run { outHeight to outWidth }
    var inSampleSize = 1

    if (height > reqHeight || width > reqWidth) {

        val halfHeight: Int = height / 2
        val halfWidth: Int = width / 2

        // Calculate the largest inSampleSize value that is a power of 2 and keeps both
        // height and width larger than the requested height and width.
        while (halfHeight / inSampleSize >= reqHeight && halfWidth / inSampleSize >= reqWidth) {
            inSampleSize *= 2
        }
    }

    return inSampleSize
}
```

Để sử dụng phương thức này, đầu tiên decode với **inJustDecodeBound** được đặt thành **true**, chuyển các tùy chọn qua và sau đó giải mã lại bằng giá trị **inSampleSize** mới và **inJustDecodeBound** được đặt thành **false**:
```
fun decodeSampledBitmapFromResource(
        res: Resources,
        resId: Int,
        reqWidth: Int,
        reqHeight: Int
): Bitmap {
    // First decode with inJustDecodeBounds=true to check dimensions
    return BitmapFactory.Options().run {
        inJustDecodeBounds = true
        BitmapFactory.decodeResource(res, resId, this)

        // Calculate inSampleSize
        inSampleSize = calculateInSampleSize(this, reqWidth, reqHeight)

        // Decode bitmap with inSampleSize set
        inJustDecodeBounds = false

        BitmapFactory.decodeResource(res, resId, this)
    }
}
```

Phương pháp này giúp dễ dàng tải một bitmap có kích thước lớn tùy ý vào ImageView hiển thị hình thu nhỏ 100x100 pixel, như ví dụ sau:
```
imageView.setImageBitmap(
        decodeSampledBitmapFromResource(resources, R.id.myimage, 100, 100)
)
```

Bạn có thể làm tương tự để giải mã bitmap từ các nguồn khác, bằng cách thay thế phương thức **BitmapFactory.decode*** thích hợp nếu cần.