Tiếp tục series có gì mới trên Android 9 (Pie) :D

## Hỗ trợ multi-camera và những cải tiến về camera

Trên các device chạy Android 9 sẽ có khả năng truy cập đồng thời vào các luồng từ 2 camera vật lý trở lên. Các device với 2 camera trước hoặc sau, bạn có thể tạo ra những tính năng độc đáo mà khó có thể làm với 1 camera như seamless zoom, chụp bokeh và stereo vision. Các API cũng hỗ trợ bạn gọi các logic hoặc các luồng máy ảnh tự động chuyển đổi giữa 2 hoặc nhiều máy ảnh.

Các cải tiến khác trong camera bao gồm thêm [**Session parameters**](https://developer.android.com/reference/android/hardware/camera2/params/SessionConfiguration.html) hỗ trợ giảm delay trong quá trình chụp và chia sẻ bề mặt cho phép camera xử lý các trường hợp sử dinjg khác nhau mà không cần dừng camera. API cũng hỗ trợ hiển thị dựa trên flash và truy cập vào OIS timestamp để ổn định hình ảnh ở tầng app-level và 1 số hiệu ứng khác.

Trong Android 9, [**multi-camera API**](https://developer.android.com/reference/android/hardware/camera2/CameraMetadata#REQUEST_AVAILABLE_CAPABILITIES_LOGICAL_MULTI_CAMERA) hỗ trợ camera monochrome cho các device với các loại tương thích [**FULL**](https://developer.android.com/reference/android/hardware/camera2/CameraMetadata.html#INFO_SUPPORTED_HARDWARE_LEVEL_FULL) hoặc [**LIMIT**](https://developer.android.com/reference/android/hardware/camera2/CameraMetadata.html#INFO_SUPPORTED_HARDWARE_LEVEL_LIMITED). Monochrome output sẽ được lưu qua định dạng [**YUV_420_888**](https://developer.android.com/reference/android/graphics/ImageFormat.html#YUV_420_888) với Y là grayscale, U (Cb) là 128 và V (Cr) là 128.

Android 9 cũng hỗ trợ [**external USB/UVC cameras**](https://developer.android.com/reference/android/hardware/camera2/CameraCharacteristics.html) trên các device được hỗ trợ.

## ImageDecoder cho drawables và bitmaps

Android 9 giới thiệu class [**ImageDecoder**](https://developer.android.com/reference/android/graphics/ImageDecoder.html) cung cấp một giải pháp hiện đại cho việc decode hình ảnh. Sử dụng class này thay thế cho các API [**BitmapFactory**](https://developer.android.com/reference/android/graphics/BitmapFactory.html) và [**BitmapFactory.Options**](https://developer.android.com/reference/android/graphics/BitmapFactory.Options.html).

**ImageDecoder** cho phép bạn tạo các [**Drawable**](https://developer.android.com/reference/android/graphics/drawable/Drawable.html) hoặc [**Bitmap**](https://developer.android.com/reference/android/graphics/Bitmap.html) từ các byte buffer, file hoặc một URI. Đầu tiên, gọi [**createSource()**](https://developer.android.com/reference/android/graphics/ImageDecoder.html#createSource(java.nio.ByteBuffer)) với source của image encoded. Sau đó, gọi [**decodeDrawable()**](https://developer.android.com/reference/android/graphics/ImageDecoder.html#decodeDrawable(android.graphics.ImageDecoder.Source)) hoặc [**decodeBitmap()**](https://developer.android.com/reference/android/graphics/ImageDecoder.html#decodeBitmap(android.graphics.ImageDecoder.Source)) bằng cách truyền vào đối tượng [**ImageDecoder.Source**](https://developer.android.com/reference/android/graphics/ImageDecoder.Source.html) để tạo **Drawable** hoặc **Bitmap**. Để thay đổi default setting, truyền [**OnHeaderDecodedListener**](https://developer.android.com/reference/android/graphics/ImageDecoder.OnHeaderDecodedListener.html) vào **decodeDrawable()** hoặc **decodeBitmap()**. **ImageDecoder** gọi [**onHeaderDecoded()**](https://developer.android.com/reference/android/graphics/ImageDecoder.OnHeaderDecodedListener.html#onHeaderDecoded(android.graphics.ImageDecoder,%20android.graphics.ImageDecoder.ImageInfo,%20android.graphics.ImageDecoder.Source)) với default width và height của ảnh. Nếu encoded image là ảnh GIF động hay WebP, **decodeDrawable()** trả về một **Drawable** là một instance của class [**AnimatedImageDrawable**](https://developer.android.com/reference/android/graphics/drawable/AnimatedImageDrawable.html).

Có các phương thức khác nhau được dùng để set image properties:
* Để scale decoded image đúng kích thước, truyền kích thước vào [**setTargetSize()**](https://developer.android.com/reference/android/graphics/ImageDecoder.html#setTargetSize(int,%20int)). Bạn cugnx có thể scale image bằng cách sử dụng sample size. Truyền sample size trực tiếp vào [**setTargetSampleSize()**](https://developer.android.com/reference/android/graphics/ImageDecoder.html#setTargetSampleSize(int)).
* Để crop ảnh trong khoảng của scale image, gọi phương thức [**setCrop()**](https://developer.android.com/reference/android/graphics/ImageDecoder.html#setCrop(android.graphics.Rect)).
* Để tạo mutable bitmap, truyền **true** vào [**setMutableRequired()**](https://developer.android.com/reference/android/graphics/ImageDecoder.html#setMutableRequired(boolean)).

**ImageDecoder** cho phép bạn thêm custom cũng như những effect phức tạp vào ảnh như thêm viền hoặc đánh dấu tròn. Sử dụng [**setPostProcessor()**](https://developer.android.com/reference/android/graphics/ImageDecoder.html#setPostProcessor(android.graphics.PostProcessor)) với một instance của class [**PostProcessor**](https://developer.android.com/reference/android/graphics/PostProcessor) để thực thi các lệnh drawing bạn muốn.

## Animation

Class [**AnimatedImageDrawable**](https://developer.android.com/reference/android/graphics/drawable/AnimatedImageDrawable.html) cũng đã xuất hiện trên Android 9 dùng để vẽ và hiển thị ảnh động GIF và WebP. **AnimatedImageDrawable** hoạt động tương tự như [**AnimatedVectorDrawable**](https://developer.android.com/reference/android/graphics/drawable/AnimatedVectorDrawable.html) trong đó render thread drive ảnh động của **AnimatedImageDrawable**. Render sử dụng một worker thread để decode nên việc decode sẽ khoogn ảnh hưởng các tác vụ khác trên render thread. Implement điều này sẽ cho phép app của bạn hiển thị ảnh đọng mà không cần quản lý cập nhật hoặc can thiệp vào các sự kiên khác trên giao diện người dùng của ứng dụng.

**AnimatedImageDrawable** có thể decode sử dụng instance của [**ImageDecoder**](https://developer.android.com/reference/android/graphics/ImageDecoder.html). Đoạn code dưới đây ví dụ cho việc sử dụng **ImageDecoder** để decode **AnimatedImageDrawable** của bạn:

```
@Throws(IOException::class)
private fun decodeImage() {
    val decodedAnimation = ImageDecoder.decodeDrawable(
        ImageDecoder.createSource(resources, R.drawable.my_drawable))

    // Prior to start(), the first frame is displayed.
    (decodedAnimation as? AnimatedImageDrawable)?.start()
}
```

**ImageDecoder** có một vài phương thức cho phép bạn chỉnh sửa thêm hình ảnh, ví dụ như sử dụng phương thức [**setPostProcessor()**](https://developer.android.com/reference/android/graphics/ImageDecoder.html#setPostProcessor(android.graphics.PostProcessor)) để modify hiển thị của ảnh như chèn dấu tròn hay bo góc ảnh.

## Autofill framework

Trên Android 9 đã có nhiều cải tiến ví dụ như Autofill service để nâng cao hơn nữa trải nghiệm người dùng khi điền vào các form. Để tìm hiểu về cách sử dụng các tính năng tự động điền trong ứng dụng, hay xem hướng dẫn [**Autofill Framework**](https://developer.android.com/guide/topics/text/autofill)

## Secure key import vào Keystore

Android 9 cung cấp thêm bảo mật mã khóa key bằng cách thêm tính năng import khóa bảo mật đã mã hóa vào Keystore sử dụng ASN.1-encoded key format. Keymaster sau đó sẽ giải mã key trong Keystore. Các content của key không bao giờ xuất hiện dưới dạng văn bản thô trong bộ nhớ chủ của device.
Tìm hiểu thêm về  Import key mã hóa bảo mật hơn tại [**Đây**](https://developer.android.com/training/articles/keystore#ImportingEncryptedKeys)

## API signature sceme với key rotation

APK Signature Scheme v3 đã được hỗ trợ trên Android 9. Scheme này có tùy chọn để include một bản ghi proof-of-rotation trong khối chữ ký của một certificate. Khả năng này cho phép ứng dụng của bạn được ký bằng certificate mới bằng cách liên kết các certificate trước đây của APK với certificate hiện tại đã ký.

Bài viết của mình đến đây là hết. Cảm ơn mọi người đã đọc :D