# I. Dẫn nhập
[Glide](https://github.com/bumptech/glide) chắc hẳn là cái tên không còn mấy xa lạ đối với mỗi lập trình viên Android. Đóng vai trò là một thư viện hỗ trợ xử lý tài nguyên hình ảnh, Glide cực kỳ nhanh, mạnh mẽ và dễ dàng sử dụng. Và trong bài viết này chúng ta sẽ tiến hành cấu hình ***Authorization*** cho Glide để có thể xử lý tài nguyên hình ảnh từ các nguồn cần xác thực.
# II. Nội dung chính
Để tạo một request đơn giản trong Glide, chúng ta chỉ cần gọi:
```
Glide.with(this).load(IMAGE_SOURCE).into(catImageView);
```
Nhưng đối với các tài nguyên cần xác thực, làm sao để chúng ta có thể xử lý nó? Cách đơn giản nhất chúng ta sẽ làm như sau:
```
class Headers {
    private static final String AUTHORIZATION = "QWERTYUIOPASDFGHJKL";
    static GlideUrl getUrlWithHeaders(String url){
    return new GlideUrl(url, new LazyHeaders.Builder()
            .addHeader("Authorization", AUTHORIZATION)
            .build());
    }
}
```
Chúng ta sẽ sử dụng ***GlideUrl*** class, tạo ra một object với parameter là địa chỉ url và đưa vào header. Sau đó, chúng ta sử dụng ***GlideObject*** này đưa vào phương thức load như sau:
```
Glide.with(this).load(Headers.getUrlWithHeaders(IMAGE_SOURCE)).into(catImageView);
```
Đoạn code trên chạy đúng theo ý chúng ra chưa? Xét về mặt ***build-and-run*** thì chúng ta có thể thỏa mãn với cách làm trên, tuy nhiên, chúng ta sẽ đào sâu vào cốt lõi của vấn đề để xem xét các trường hợp đặc biệt. ***GlideUrl*** class sẽ không thể sử dụng theo cách [này](https://github.com/bumptech/glide/issues/454)· Giả sử chúng ta không hard-code địa chỉ url mà lấy ra từ API bất kỳ, và chúng ta cũng không thể chắc chắn về nội dung của API này, trường hợp địa chỉ url trả về là một ***empty string*** hoặc ***null***  thì app của chúng ra sẽ crash ngay lập tức! Để khắc phục triệt để trường hợp này, chúng ta sẽ sử dụng ***Module***  để thay đổi cách xử lý của Glide.
1. Chúng ta sẽ tạo ra ***GlideModuleWithHeaders*** class hiện thực ***GlideModule interface***
```
public class GlideModuleWithHeaders implements GlideModule {
@Override
public void applyOptions(Context context, GlideBuilder builder) {   /* nothing to do here */
}

@Override
public void registerComponents(Context context, Glide glide) {
    //todo
}
}
```
2. Đăng ký module trong ***AndroidManifest.xml***
```
<meta-data  android:name="com.nekodev.paulina.sadowska.glideheadersdemo.GlideModuleWithHeaders"
android:value="GlideModule" />
```
3. Cấu hình ***ProGuard*** như sau
```
-keep public class * implements com.bumptech.glide.module.GlideModule
for DexGuard only
-keepresourcexmlelements manifest/application/meta-data@value=GlideModule
```
4. Tạo HeaderLoader class đảm nhận việc tạo headers
```
class HeaderLoader extends BaseGlideUrlLoader<String> {
private static final String AUTHORIZATION = "QWERTYUIOPASDFGHJKL";
private static final Headers REQUEST_HEADERS = new LazyHeaders.Builder().addHeader("Authorization", AUTHORIZATION).build();

HeaderLoader(Context context) {
super(context);
}

@Override
protected String getUrl(String model, int width, int height) {
return model;
}

@Override
protected Headers getHeaders(String model, int width, int height) {
return REQUEST_HEADERS;
}
}
```
5. Chúng ta cần tạo ra một factory class cho ***HeaderLoader*** để có thể đăng ký trong Glide module
```
class HeaderLoaderFactory implements ModelLoaderFactory<String, InputStream> {
@Override
public StreamModelLoader<String> build(Context context, GenericLoaderFactory factories) {
return new HeaderLoader(context);
}

@Override
public void teardown() { /* nothing to free */ }
}
```
6. Bước cuối cùng là đăng ký ***HeaderLoader*** trong phương thức ***registerComponent*** của ***GlideModuleWithHeaders*** class
```
@Override
public void registerComponents(Context context, Glide glide) {
    glide.register(String.class, InputStream.class, new HeaderLoaderFactory());
}
```
Và bây giờ chúng ta có thể tạo request kèm theo header chỉ bằng cách đưa địa chỉ url vào phương thức load(). Đối với những API không cần header, nó sẽ được bỏ qua!
```
Glide.with(this)
    .load(IMAGE_SOURCE)
    .into(catImageView);
```
# III. Kết
Hy vọng với bài viết này, các bạn sẽ có thể sử dụng Glide một cách dễ dàng và thuần thục hơn! Bài viết của mình được lược dịch từ bài viết tại [đây](https://medium.com/@PaulinaSadowska/adding-headers-to-image-request-in-glide-dc9640ca9b12)