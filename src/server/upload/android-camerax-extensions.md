Ở bài viết trước mình đã giới thiệu về **CameraX** - thư viện mới trong bộ **Jetpack** của google, nếu bạn chưa đọc thì có thể xem lại tại [đây](https://viblo.asia/p/android-camerax-maGK77kDKj2). Bài viết này mình sẽ giới thiệu một thành phần cũng rất quan trọng trong CameraX, đó là **Vendor Extensions**. 
# 1. Giới thiệu
Trong các buổi giới thiệu điện thoại gần đây của các nhà sản xuất điện thoại hệ điều hành Android như Samsung hay Google và Huawei thì chắc hẳn các bạn đã không còn xa lạ với các tính năng chụp ảnh bá đạo có thể kể đến như là *HDR*, *Bokeh*, *Night*, *Beauty*, *Auto*. Ngoài hệ thống phần cứng bao gồm bộ các camera thông thường, camera tele, camera góc rộng hay camera macro thì phần mềm tích hợp cũng làm cho các bức ảnh trở nên ảo diệu hơn trông thấy.

![](https://images.viblo.asia/69df4de2-0036-4ad3-85bd-855d4340d632.png)

Với sự cộng tác với 1 số nhà sản xuất thiết bị gốc (OEM) như LG và Samsung; Google đã phát triển tính năng mở rộng cho camera trên thiết bị di động. CameraX cung cấp 1 số API extensions như Bokeh, HDR và 1 số tính năng được implement bởi từng nhà sản xuất đặc biệt cho thiết bị của họ. 

Thiết bị hỗ trợ vendor extension phải đạt các điều kiện sau:
- Hiệu ứng phải có thư viện hỗ trợ từ nhà sản xuất thiết bị (OEM)
- Thư viện OEM phải được cài đặt trên thiết bị hiện tại
- Thư viện OEM báo cáo thiết bị hỗ trợ tiện ích mở rộng
- Thiết bị có phiên bản hệ điều hành mà thư viện yêu cầu

# 2. Extension architecture
![](https://images.viblo.asia/29f9cdb3-bfd2-448b-b643-9e66eec7d249.png)

Extensions được tách ra từ Camera2 core của CameraX. Trong hình, các đường mũi tên màu đỏ thể hiện đường đi khi người dùng kích hoạt tính năng tiện ích mở rộng (vd HDR)
# 3. Implementation
Để sử dụng các extensions, bạn phải implement thư viện hỗ trợ:

```java
implementation "androidx.camera:camera-extensions:1.0.0-alpha08"
```

Để sử dụng extension trong CameraX, bạn phải tạo object **Extender** tương ứng phù hợp với nhu cầu sử dụng:

- AutoImageCaptureExtender
- BeautyImageCaptureExtender
- BokehImageCaptureExtender
- HdrImageCaptureExtender
- NightImageCaptureExtender

Để bật extension, các bạn sử dụng method **enableExtension**()

```java
val cameraSelector = CameraSelector.Builder().requireLensFacing(CameraSelector.LENS_FACING_BACK).build()

val imageCaptureBuilder = ImageCapture.Builder()

try {
   val bokehImageCapture = BokehImageCaptureExtender.create(imageCaptureBuilder)

   if(bokehImageCapture.isExtensionAvailable(cameraSelector)){
       bokehImageCapture.enableExtension(cameraSelector)
       Log.d(TAG, "Bokeh extension is enabled")
   }
   else {
       Log.d(TAG, "Sorry! This device didn't support Bokeh extension")
   }
} catch (e: Exception){
   Log.d(TAG, e.message)
}
```

Ở đoạn code trên mình có tạo cameraSelector để chụp ảnh từ camera phía sau LENS_FACING_BACK và sử dụng hiệu ứng Bokeh khi thiết bị hỗ trợ. Nếu muốn sử dụng các hiệu ứng khác thì bạn hoàn toàn có thể với những object Extender mình đã liệt kê phía trên.

Tham khảo
https://developer.android.com/training/camerax/vendor-extensions