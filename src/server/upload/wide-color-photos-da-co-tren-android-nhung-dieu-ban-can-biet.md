Android hiện tại đang ở thời điểm mà gam màu sRGB với 8 bit cho mỗi kênh màu là không đủ để tận dụng lợi thế của công nghệ màn hình và camera. Trên Android giờ đây đã được cải thiện để biến việc chụp ảnh với với dải màu rộng (wide color photography) trở thành hiện thực với nhiều bit và gam màu hơn. Nghĩa là người dùng sẽ có thể ghi lại sự phong phú của các cảnh vật, chia sẻ wide color photo với bạn bè và xem được wide color photo trên điện thoại của họ, và điều này đã trở thành sự thật trên Android Q. Và vì thế, việc chuẩn bị cho ứng dụng hỗ trợ wide color photo bây giờ đã dần trở nên quan trọng. 

Trước khi bắt đầu bài hướng dẫn, chúng ta cần làm rõ một điều: tại sao wide color photo quan trọng? 
Chất lượng màn hình hiển thị và cảm biến máy ảnh điện thoại đang dần trở nên tố hơn hàng năm. Ngày càng nhiều điện thoại mới được bán ra với màn hình hiển thị được hiệu chỉnh và có khả năng hiển thị wide color gamuts. Cảm biến máy ảnh hiện đại có khả năng chụp phong cảnh với dải màu rộng hơn ngoài sRGB và tạo nên những bức ảnh có dải gam màu rộng. Và khi 2 điều đó cùng xuất hiện, nó tạo ra trải nghiệm chụp ảnh từ đầu đến cuối với những màu sắc rực rỡ hơn cả thế giới thực.

Ở cấp độ công nghệ, điều này có nghĩa là những hình ảnh đến với app của bạn cùng với [ICC profile](https://en.wikipedia.org/wiki/ICC_profile), đó không phải sRGB mà là một số dải màu rộng hơn: Display P3, Adobe RGB... Đối với user, điều đó có nghĩa là ảnh của họ sẽ trông thật hơn: 

<div align="center">

![](https://images.viblo.asia/816e8c91-a51f-4253-a3a3-fdc1f6d3b1dc.jpg)
    
    
  *Display P3*
    
</div>

<div align="center">
    
   ![](https://images.viblo.asia/62308995-c41f-4968-9350-4589d87c7688.jpg)
    
   *sRGB*

</div>

<div align="center">

![](https://images.viblo.asia/cabad5e9-b499-42f0-8e2a-b50c535e088d.png)
    
    
  *Display P3*
    
</div>

<div align="center">
    
   ![](https://images.viblo.asia/a2bf3711-1851-4524-b2ca-14e5ab7b4669.png)
    
   *sRGB*

</div>

Trên đây là hình ảnh của Display P3 và sRGB tương ứng của cùng một cảnh. Nếu bạn đang đọc bài viết này trên một màn hình có khả năng hiển thị gam màu wide color, bạn có thể nhận thấy sự khác biệt đáng kể giữa chúng.

## Color Tests

Có 2 loại test để biết liệu app của bạn có đáp ứng được wide color hay chưa. Một trong số đó là kiểm tra độ chính xác màu (correctness test), hai là kiểm tra độ rộng dải màu (wide color test)

### Color Correctness test: application của bạn đã sẵn sàng cho wide color gamut?

Wide color gamut application sẵn sàng khi ứng dụng quản lý màu sắc một cách chủ động. Nghĩa là khi được cùng cấp hình ảnh, ứng dụng luôn check không gian màu và thực hiện chuyển đổi dựa trên khả năng hiển thị gam màu rộng, và do đó, ngay cả khi ứng dụng không thể xử lý gam màu rộng, nó vẫn có thể hiển thị gam màu sRGB của hình ảnh chính xác mà không bị biến dạng màu sắc.

Dưới đây là ví dụ chính xác về màu sắc của hình ảnh với profile ICC Display P3.

<div align="center">
    
   ![](https://images.viblo.asia/ec8e867d-02f2-4b20-8452-db88b8b74713.png)

</div>

Tuy nhiên, nếu ứng dụng của bạn không đúng màu, thì thông thường ứng dụng của bạn sẽ thao tác / hiển thị hình ảnh mà không chuyển đổi không gian màu chính xác, dẫn đến biến dạng màu. Ví dụ, bạn có thể có được hình ảnh dưới đây, nơi màu sắc bị tẩy trắng bớt và mọi thứ trông có vẻ bị méo.

<div align="center">
    
   ![](https://images.viblo.asia/9ab63338-64b7-4f47-8190-d624ebb0d28a.png)

</div>

### Wide Color test: application của bạn có hỗ trợ wide color gamut?

Một application có hỗ trợ gam màu rộng thì sẽ có khả năng hiển thị màu bên ngoài dải màu sRGB khi được cung cấp hình ảnh có gam màu rộng.  Đây là một hình ảnh bạn có thể sử dụng để kiểm tra xem ứng dụng của bạn có gam màu rộng hay không, nếu có, thì logo Android màu đỏ sẽ xuất hiện. Lưu ý rằng bạn phải chạy thử nghiệm này trên một thiết bị có khả năng gam màu rộng, ví dụ như Pixel 3 hoặc Samsung Galaxy S10.

<div align="center">
    
   ![](https://images.viblo.asia/d989ea4b-a8f3-4acf-9479-226df5d51940.png)

</div>

## Bạn nên làm gì để chuẩn bị?

Để chuẩn bị cho việc chụp ảnh gam màu rộng, ứng dụng của bạn ít nhất phải vượt qua wide color gamut ready test, đó là kiểm tra độ chính xác màu. Nếu ứng dụng của bạn vượt qua các bài wide color gamut ready test, điều đó thật tuyệt vời! Nhưng nếu không, đây là các bước để làm cho gam màu rộng sẵn sàng.

Điều quan trọng cần chuẩn bị và bằng chứng trong tương lai là ứng dụng của bạn sẽ không bao giờ giả định không gian màu sRGB của các hình ảnh bên ngoài mà nó có được. Điều này có nghĩa là ứng dụng phải kiểm tra không gian màu của hình ảnh được giải mã và thực hiện chuyển đổi khi cần thiết. Không làm như vậy sẽ dẫn đến biến dạng màu sắc và profile màu bị loại bỏ ở đâu đó trong cấu trúc ứng dụng của bạn.

### Bắt buộc: Hãy chỉnh màu

It nhất là màu sắc của bạn phải chính xác. Nếu ứng dụng của bạn không áp dụng gam màu rộng, rất có thể bạn chỉ muốn giải mã mọi hình ảnh thành không gian màu sRGB. Bạn có thể làm điều đó bằng cách sử dụng BitmapFactory hoặc ImageDecoder.

#### Using BitmapFactory

Trong API 26, đã có [inPreferredColorSpace](https://developer.android.com/reference/kotlin/android/graphics/BitmapFactory.Options.html#inPreferredColorSpace:android.graphics.ColorSpace) trong [BitmapFactory.Option](https://developer.android.com/reference/kotlin/android/graphics/BitmapFactory.Options.html), cho phép bạn chỉ định không gian màu mục tiêu mà bạn muốn bitmap được decoded. Giả sử bạn muốn decoded một tệp, bên dưới là code bạn  có thể sử dụng để quản lý màu:

```kotlin
final BitmapFactory.Options options = new BitmapFactory.Options();
// Decode this file to sRGB color space.
options.inPreferredColorSpace = ColorSpace.get(Named.SRGB);
Bitmap bitmap = BitmapFactory.decodeFile(FILE_PATH, options);
```

#### Using ImageDecoder

Trong Android P (API 28),  đã có sự xuất hiện của ImageDecoder, một cách tiếp cận hiện đại hóa để giải mã hình ảnh. Nếu bạn nâng cấp apk của mình lên API 28 trở lên, chúng tôi khuyên bạn nên sử dụng nó thay vì API BitmapFactory và BitmapFactory.Option.

Dưới đây là đoạn code để decode hình ảnh thành bitmap sRGB bằng API ImageDecoder#decodeBitmap.

```kotlin
ImageDecoder.Source source =
        ImageDecoder.createSource(FILE_PATH);
try {
    bitmap = ImageDecoder.decodeBitmap(source,
            new ImageDecoder.OnHeaderDecodedListener() {
                @Override
                public void onHeaderDecoded(ImageDecoder decoder,
                        ImageDecoder.ImageInfo info,
                        ImageDecoder.Source source) {
                    decoder.setTargetColorSpace(ColorSpace.get(Named.SRGB));
                }
            });
} catch (IOException e) {
    // handle exception.
}
```

Chi tiết hãy tham khảo [ImageDecoder APIs](https://developer.android.com/reference/android/graphics/ImageDecoder)

#### Bad practices

Một số bad practices điển hình bao gồm (nhưng không giới hạn ở những điều này):

* Luôn giả sử không gian màu sRGB
* Tải lên hình ảnh dưới dạng kết cấu mà không có sự chuyển đổi cần thiết
* Bỏ qua profile ICC trong khi nén

Tất cả những điều này gây ra một kết quả nghiêm trọng cho người dùng: Méo màu. Ví dụ: bên dưới là đoạn code dẫn đến ứng dụng không đúng màu:

```kotlin
// This is bad, don't do it!
final BitmapFactory.Options options = new BitmapFactory.Options();
final Bitmap bitmap = BitmapFactory.decodeFile(FILE_PATH, options);
glTexImage2D(GLES20.GL_TEXTURE_2D, 0, GLES31.GL_RGBA, bitmap.getWidth(),
        bitmap.getHeight(), 0, GLES20.GL_RGBA, GLES20.GL_UNSIGNED_BYTE, null);
GLUtils.texSubImage2D(GLES20.GL_TEXTURE_2D, 0, 0, 0, bitmap,
        GLES20.GL_RGBA, GLES20.GL_UNSIGNED_BYTE);        
```
 
Không có kiểm tra không gian màu trước khi tải lên bitmap dưới dạng kết cấu, và do đó, ứng dụng sẽ kết thúc với hình ảnh bị bóp méo dưới đây từ bài kiểm tra độ chính xác của màu.

<div align="center">
    
   ![](https://images.viblo.asia/b7764768-9663-4b3c-ba12-342444241955.png)

</div>

### Tùy chọn: Có khả năng màu rộng

Bên cạnh những thay đổi ở trên, bạn phải thực hiện để xử lý hình ảnh chính xác, nếu ứng dụng của bạn dựa nhiều vào hình ảnh, bạn sẽ muốn thực hiện các bước bổ sung để hiển thị những hình ảnh này trong phạm vi sống động đầy đủ bằng cách bật chế độ gam màu rộng trong file manifest hoặc tạo profile Display P3.

Để bật gam màu rộng trong Activity, hãy đặt thuộc tính [colorMode](https://developer.android.com/reference/android/R.attr.html#colorMode) thành wideColorGamut trong file AndroidManifest.xml. Bạn cần thực hiện việc này cho từng Activity mà bạn muốn bật chế độ màu rộng.

```kotlin
android:colorMode="wideColorGamut"
```

Bạn cũng có thể set chế độ màu programmatically trong activity bằng cách gọi phương thức [setColorMode(int)](https://developer.android.com/reference/android/view/Window.html#setColorMode(int)) và chuyển qua [COLOR_MODE_WIDE_COLOR_GAMUT](https://developer.android.com/reference/android/content/pm/ActivityInfo.html#COLOR_MODE_WIDE_COLOR_GAMUT).

Để hiển thị nội dung gam màu rộng, bên cạnh nội dung màu rộng, bạn cũng cần tạo bề mặt gam màu rộng để hiển thị. Ví dụ, trong OpenGL, ứng dụng của bạn phải kiểm tra các tiện ích mở rộng sau:

* [EXT_gl_colorspace_display_p3_passthrough](https://www.khronos.org/registry/EGL/extensions/EXT/EGL_EXT_gl_colorspace_display_p3_passthrough.txt)
* [EXT_gl_colorspace_display_p3](https://www.khronos.org/registry/EGL/extensions/EXT/EGL_EXT_gl_colorspace_display_p3.txt)

Và sau đó, yêu cầu Display P3 làm không gian màu khi tạo các bề mặt của bạn, như được hiển thị trong đoạn code sau:

```kotlin
private static final int EGL_GL_COLORSPACE_DISPLAY_P3_PASSTHROUGH_EXT = 0x3490;

public EGLSurface createWindowSurface(EGL10 egl, EGLDisplay display,
                                      EGLConfig config, Object nativeWindow) {
  EGLSurface surface = null;
  try {
    int attribs[] = {
      EGL_GL_COLORSPACE_KHR, EGL_GL_COLORSPACE_DISPLAY_P3_PASSTHROUGH_EXT,
      egl.EGL_NONE
    };
    surface = egl.eglCreateWindowSurface(display, config, nativeWindow, attribs);
  } catch (IllegalArgumentException e) {}
  return surface;
}
```

## Kết luận

Cuối cùng, nếu bạn sở hữu hoặc duy trì một library /decode hình ảnh, ít nhất bạn cũng sẽ cần phải vượt qua các bài kiểm tra độ chính xác màu. Để hiện đại hóa thư viện của bạn, có hai điều chúng tôi khuyên bạn nên làm khi bạn mở rộng API để quản lý màu:

1. Đặc biệt khuyên bạn nên chấp nhận rõ ràng [ColorSpace](https://developer.android.com/reference/android/graphics/ColorSpace) làm tham số khi bạn thiết kế API mới hoặc mở rộng API hiện có. Thay vì mã hóa một không gian màu, một tham số ColorSpace rõ ràng là một minh chứng tốt hơn.
2. Đặc biệt khuyến nghị tất cả các API kế thừa để giải mã rõ ràng bitmap thành không gian màu sRGB. Trong lịch sử không có quản lý màu sắc, và do đó Android đã coi mọi thứ là sRGB cho đến Android 8.0 (API 26). Điều này cho phép bạn giúp người dùng của bạn duy trì khả năng tương thích ngược.

Sau khi hoàn thành, hãy quay lại phần trên và thực hiện hai bài kiểm tra màu.

Cảm ơn mọi người đã đọc bài của mình :D 

<div align="right">
    
   [Nguồn](https://android-developers.googleblog.com/2019/05/wide-color-photos-are-coming-to-android.html).

</div>