Chắc hẳn khi đọc bài viết này bạn có thể đã biết về Glide hoặc đơn giản bạn gặp khó khăn với xử lí hình ảnh khi code Android.Bài viết này sẽ là một gợi ý dành cho bạn !

# Bắt đầu 
Trong Android, khi làm việc với một image ( bitmaps ) thường rất khó khăn.App của bạn có thể rơi vào trạng thái Out Of Memory ( OOM ) thường xuyên nếu không được xử lý một cách chính xác. Đây là mối quan tâm thực sự với nhiều Android Developer.
    
Những vấn đề mà các bạn sẽ gặp phải khi làm việc với ImageView trong Android : 
*  Lỗi OOM
*  Tải ảnh vào view chậm
*  UI không có tính tương tác và sự mượt mà 
       
Trong bài viết này, tôi sẽ có một gợi ý cho các bạn, đó là **Glide** - Miến phí và mạnh mẽ

![](https://images.viblo.asia/45711bba-247e-471c-ac68-0d3d6d9bf43b.png)
     
# Glide giải quyết các vấn đề trên ra sao ?  
## Lỗi Out Of Memory ( OOM ) 
Cơ chế của Glide giúp nó có thể load ảnh theo đúng size mà view yêu cầu.Giả sử bạn đang có 1 bức ảnh với size 720*1280 và bạn cần hiển thị nó trên 1 view chỉ có size 400*400. Thay vì load nguyên bản bức ảnh của bạn, Glide sẽ giảm xuống đúng size mà view yêu cầu rồi hiển thị nó. Bằng cách này, bitmap sẽ chiếm ít bộ nhớ hơn. Đó cũng là điều chúng ta cần.
         
    GlideApp.with(context).load(url).into(imageView);
         
         
## Tốc độ load ảnh chậm
        
 Đây cũng là 1 vấn đề hay gặp phải khi load 1 bitmap vào view. Một trong những lý do chính của việc tải chậm là do không thể hủy bỏ nó như khi hủy download. Bitmap sẽ được decode ngay cả khi view đã không còn hiển thị với người dùng.Điều này gây ra rất nhiều task tải ảnh hoàn thành mà không cần thiết.
Với Glide, nó hoàn toàn nhận biết được vòng đời của Activity hay Fragment, và khi cần thiết có thể hủy ngay task load ảnh.Chỉ thực hiện load ảnh nào có thể hiển thị cho người dùng.Đây chính là lý do để load nhanh hơn.
Ngoài ra, khi bitmap đã được decode thì nó sẽ được lưu trữ lại với Glide. Với lần sử dụng tiếp theo hoàn toàn không phải decode lại nữa.
        
### Khi ta cung cấp một url, Glide sẽ làm như sau : 

* Kiểm tra xem image với url đó đã được lưu trong memory cache hay không
* Nếu đã được lưu thì nó chỉ phải load ảnh từ memory cache
* Nếu không có, tiếp tục check ở disk cache
* Nếu đã tồn tại ở disk cache, nó sẽ load bitmap từ đây, đồng thời cũng lưu vào memory cache
* Nếu không có thì mới tải ảnh từ url,  hiển thị lên view, đồng thời lưu nó vào cả memory và disk cache

## UI không phản hồi 

Một trong những nguyên nhân chính của vấn đề này là do bạn đang thực hiện quá nhiều task ở main thread.Hầu hết đó là các task liên quan đến render UI.
Android thực hiện update UI mỗi 16ms.nếu thực hiện task quá thời gian này , android sẽ hủy bỏ task đó cũng như bỏ qua frame.Vì vậy số frame trên giây sẽ ít đi.
Nếu FPS ( Frame per Second ) càng thấp, nguwoif dùng sẽ càng thấy ứng dụng của bạn không phản hồi.Khi load bitmap cũng như vậy, mặc dù bạn có thể load nó ở background nhưng UI vẫn lag.
Chính vì do kích cỡ lớn của nó nên Garbage Collector ( GC ) phải hoạt động lên tục, buộc hệ thống phải bỏ qua nhiều frame. 
    
    Thời điểm mà GC chạy thì app sẽ không chạy 

Vậy Glise giải quyết như thế nào ? Sử dung Bitmap Pool  

Vơi Bitmap Pool, glide sẽ giảm tối thiểu các cuộc gọi đến GC nhất có thể.
Mặt khác, nó còn dùng đến thuộc tính **inBitmap** ( để có thể sử dụng lại bitmap memory  ) .Giả sử app của bạn cần load 2 bitmap (bitmapOne,bitmapTwo). Khi load bitmapOne,  hệ thống sẽ cấp phát bộ nhớ cho bitmap này.và khi không còn cần dùng đến nó , thay vì hủy thì nó sẽ dùng bitmapOne như là 1 **inBitmap** cho bitmapTwo. Với cách này, phần bộ nhớ có thể được sử dụng lại.

    Bitmap bitmapOne = BitmapFactory.decodeFile(filePathOne);
    imageView.setImageBitmap(bitmapOne);
    // lets say , we do not need image bitmapOne now and we have to set // another bitmap in imageView
    final BitmapFactory.Options options = new BitmapFactory.Options();
    options.inJustDecodeBounds = true;
    BitmapFactory.decodeFile(filePathTwo, options);
    options.inMutable = true;
    options.inBitmap = bitmapOne;
    options.inJustDecodeBounds = false;
    Bitmap bitmapTwo = BitmapFactory.decodeFile(filePathTwo, options);
    imageView.setImageBitmap(bitmapTwo);
     
Bằng cách này, GC sẽ không được gọi đi gọi lại nhiều lần vì chúng ta không hủy bỏ tham chiếu đến bitmapOne mà sẽ load bitmapTwo vào ngay phần bộ nhớ đó.
Vậy nói đến đây thì Bitmap Pool là gì ? Đây sẽ là 1 danh sách các bitmap mà không còn cần dùng đến , tuy nhiên chúng vẫn tồn tại và sẵn sàng load bitmap mới vào cùng bộ nhớ đó.

# Cách sử dụng Glide
  ## Import Glide 
  Để sử dụng Glide , các bạn có 2 cách như sau : 
* Sử dụng Gradle :
    Thêm các dependence sau vào file **build.gradle** của bạn 
    

            implementation 'com.github.bumptech.glide:glide:4.6.1'  
            annotationProcessor 'com.github.bumptech.glide:compiler:4.6.1'

* Sử dụng Maven 
         ```
        <dependency>  
      <groupId>com.github.bumptech.glide</groupId>
      <artifactId>glide</artifactId>
      <version>4.6.1</version>
    ```</dependency>  
    <dependency>  
      <groupId>com.github.bumptech.glide</groupId>
      <artifactId>compiler</artifactId>
      <version>4.6.1</version>
      <optional>true</optional>
    </dependency>  
    <dependency>  
      <groupId>com.google.android</groupId>
      <artifactId>support-v4</artifactId>
      <version>r7</version>
    </dependency>  
    ```
  
  
## Một số cách load Image với Glide
### Load Image từ Url
   Glide builder yêu cầu ít nhất 3 tham số sau : 
*    **with ( Context context )** :  Context là cần thiết cho hầu hết các API call của Android. Với Gile cũng vậy
*    **load ( String url )** : Đây là nơi bạn xác định đâu là image bạn muốn load thông qua url
*    **into ( ImageView targetImageView )** :  ImageView mục tiêu bạn muốn hiển thị bức ảnh trên 

   Ví dụ : 
   
    ImageView targetImageView = (ImageView) findViewById(R.id.imageView);  
    String internetUrl = "http://i.imgur.com/DvpvklR.png";

    Glide  
    .with(context)
    .load(internetUrl)
    .into(targetImageView);  
    
 ### Load Image từ resource 
 
Trong trường hợp này, thay vì cung cấp cho nó 1 url ảnh từ internet, bạn sẽ cung cấp 1 resource của image với kiểu là int. Ví dụ : 

    int resourceId = R.mipmap.ic_launcher;

    GlideApp  
    .with(context)
    .load(resourceId)
    .into(imageViewResource);  
    
  Bạn có thể thấy thắc mắc vì nếu load ảnh từ resource như thế này thì chúng ta có thể dùng luôn method có sẵn của ImageView. Tuy nhiên với Glide nó sẽ thú vị hơn vì bạn còn có thể kết hợp load ảnh với hiệu ứng động. Chúng ta sẽ bàn đến nó sau. 
  
  ### Load Image từ File 
  
  Cách này hữu ích khi bạn để cho người dùng có thể chọn ảnh từ file của họ để hiển thị ( dạng  thư viện ảnh ) . Tham số truyền vào là một File Object 
  
    File file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "Running.jpg");

    GlideApp  
    .with(context)
    .load(file)
    .into(imageViewFile);  
    
   ### Load Image từ Uri 
   
   Với cách này , bạn có thể load một ảnh được định nghĩa bởi một Uri. 
   
    Uri uri = resourceIdToUri(context, R.mipmap.future_studio_launcher);

    GlideApp  
    .with(context)
    .load(uri)
    .into(imageViewUri); 
    
   Bạn có thể dùng function sau để chuyển đổi image từ resource sang Uri : 
   
    public static final String ANDROID_RESOURCE = "android.resource://";  
    public static final String FOREWARD_SLASH = "/";

    private static Uri resourceIdToUri(Context context, int resourceId) {  
    return Uri.parse(ANDROID_RESOURCE + context.getPackageName() + FOREWARD_SLASH + resourceId);
    } 
    
    
  ### Load Image Bitmap 
  
  Bắt đầu từ Glide 4.3.0 bạn hoàn toàn có thể truyền vào 1 bitmap hoặc 1 Drawable object để hiển thị  : 
  
    Bitmap bm = ...

    Glide  
    .with(context)
    .load(bm)
    .into(imageView);
    
    
  ## Custom Transformations 
  
  Transformation được sử dụng cho Image trước khi nó được hiển thị.Để thực hiện việc custom, các bạn cần phải tạo class mới và implement **Transformation interface**. 
  
  Các method mà bạn cần phải implement và xử lý tương đối phức tạp.Glide đã cung cấp cho chúng ta 1 class khá thuận tiện khi các bạn muốn custom transformation khi hiển thị ảnh từ Bitmap, đó là class  **BitmapTransformation** .
  
  Ví dụ ở đây mình có tạo class BlurTransformation và cho extend từ BitmapTransformation  để custom blur transformation với **Renderscrip**:  
  
    public class BlurTransformation extends BitmapTransformation {

    private RenderScript rs;

    public BlurTransformation(Context context) {
        super(context);

        rs = RenderScript.create(context);
    }

    @Override
    protected Bitmap transform(BitmapPool pool, Bitmap toTransform, int outWidth, int outHeight) {
        Bitmap blurredBitmap = toTransform.copy(Bitmap.Config.ARGB_8888, true);

        // Allocate memory for Renderscript to work with
        Allocation input = Allocation.createFromBitmap(rs, blurredBitmap, Allocation.MipmapControl.MIPMAP_FULL, Allocation.USAGE_SHARED);
        Allocation output = Allocation.createTyped(rs, input.getType());

        // Load up an instance of the specific script that we want to use.
        ScriptIntrinsicBlur script = ScriptIntrinsicBlur.create(rs, Element.U8_4(rs));
        script.setInput(input);

        // Set the blur radius
        script.setRadius(10);

        // Start the ScriptIntrinisicBlur
        script.forEach(output);

        // Copy the output to the blurred bitmap
        output.copyTo(blurredBitmap);

        return blurredBitmap;
    }

    @Override
    public void updateDiskCacheKey(MessageDigest messageDigest) {
        messageDigest.update("blur transformation".getBytes());
    }
}
  
  Bây giờ công việc sẽ đơn giản hơn, chúng ta chỉ cần apply transformation trên cho Glide như sau : 
  
    GlideApp  
    .with(context)
      .load(eatFoodyImages[0])
      .transform(new BlurTransformation(context))
      .into(imageView2); 
      
# Kết Luận
Trên đây mình đã mô tả cách mà Glide hoạt động và giải quyết các vấn đề khó khăn khi làm việc với bitmap trong Android.Các bạn có thể tự tìm hiểu thêm về cách sử dụng trong Project Android.Chúc các bạn một ngày vui vẻ ^.^