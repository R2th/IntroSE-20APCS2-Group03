Chắc hẳn các lập trình viên Android đều đã tiếp xúc với các thư viện load ảnh quen thuộc như Glide với Picaso với những tính năng rất tuyệt vời, tuy nhiên có 1 thư viện khác cũng có những ưu điểm với tính năng không mấy kém cạnh 2 thư viện nêu trên mà không phải ai cũng biết và sử dụng qua thư viện này, đó là Fresco. Trong bài viết này mình sẽ giới thiệu khái quát về Fresco, ưu điểm, nhược điểm và demo 1 ví dụ về cách sử dụng em nó trong project Android như thế nào.

## 1. Thư viện load ảnh Fresco
### 1.1. Giới thiệu:
Fresco là thư viện mạnh mẽ về load ảnh và hiển thị ảnh trong Android. Nó hỗ trợ rất nhiều các phiên bản Android, thậm chí các phiên bản Android đời đầu như Android 2.3 GingerBread (API 9). Fresco sẽ thực hiện load ảnh trên mạng, từ bộ nhớ trong hay cả trong local resource trong project của bạn. Khi tải ảnh về, Fresco sẽ tiến hành lưu cache, có 3 cấp độ của quá trình này, 2 cấp độ sẽ lưu ở bộ nhớ trong và 1 cấp độ sẽ lưu ở bộ nhớ ngoài.
### 1.2. Các tính năng của Fresco
**1.2.1. Hiển thị và vẽ ảnh**
Fresco sử dụng Drawee để hiển thị ảnh, khi hiển thị nó sẽ có 1 số tính năng sau:
* 	Có thể scale ảnh focus theo từng point, hay là center
* 	Hiển thị ảnh bo góc, thậm chị là bo ảnh thành hình tròn
* 	Khi tải ảnh không thành công, người dùng có thể tap vào nơi hiển thị ảnh để tại lại
* 	Hỗ trợ hiển thị progressbar, background, overlay quanh viền ảnh.
* 	Hiển thị 1 lớp phủ khi người dùng click vào ảnh.

**1.2.2. Load ảnh**
*   Có thể lưu cache với nhiều kích thước ảnh, khi load từ cache lên sẽ chọn ảnh có kích thước phù hợp nhất.
* 	Hiển thị ảnh có độ phân giải thấp trước cho đến khi load được ảnh có độ phân giải cao hơn và thế chỗ vào nó.
* 	Khi load ảnh thành công sẽ gửi 1 sự kiện cho ứng dụng thông báo load thành công.
* 	Có thể thay đổi kích thước và xoay ảnh khi load ảnh
* 	Hỗ trợ decode ảnh WebP.
* 	Hỗ trợ load ảnh GIFs

### **1.3. Fresco giải quyết các vấn đề thường gặp trong load ảnh**
**1.3.1. Out of memory**

OOM là lỗi rất thường gặp, nó xảy ra với load ảnh là khi load ảnh kích thước quá lớn dẫn đến không đủ bộ nhớ. 

Fresco giải quyết vấn đề này bằng cách resize lại ảnh sao cho phù hợp với view hiển thị ảnh.

**1.3.2. Load ảnh chậm**

Vấn đề này xảy ra khi do khi load ảnh vào view để hiển thị, tác vụ tải ảnh từ trên mạng và decode những bitmap không cần thiết luôn được thực hiện. 

Fresco giải quyết vấn đề này bằng cách lưu thông tin của bức ảnh vào trong cache, chúng ta sẽ không phải decode 1 bức ảnh nhiều lần vì sẽ rất mất thời gian. Khi cần load ảnh, nó sẽ kiểm tra trong cache xem ảnh phù hợp đã có chưa và load lên view. Điều này sẽ tiết kiệm rất nhiều thời gian và tài nguyên khi sử dụng app.

**1.3.3. Giật lag**

Khi load ảnh với những bitmap lớn, Gabarge Collector - trình thu dọn rác tự động của hệ thống sẽ chạy lâu hơn. Khi mà thời gian GC chạy lâu hơn, sẽ dẫn đến skip UI, Chính điều này sẽ ảnh hưởng đến hiệu năng của máy gây giật lag. 

Fresco giải quyết vấn đề này bằng cách tạo ra 1 nơi chứa các Bitmap được gọi là BitmapPool để tái sử dụng các Bitmap. Bitmap Pool sẽ giúp giảm quá trình cấp phát và thu hồi bộ nhớ của ứng dụng, giúp GC chạy nhanh hơn, sẽ giảm được vấn đề giật lag gây ra do GC.

**1.4. Quá trình lưu data vào trong cache của Fresco**
* Khi nhận được yêu cầu load ảnh, Fresco sẽ thực hiện các bước sau:
    * Kiểm tra ảnh đó đã có trong ***memory cache*** hay chưa, nếu có rồi thì lấy từ ***memory cache*** ra và load ảnh đó vào view.
    * Nếu ảnh chưa có trong ***memory cache***, sẽ tiếp tục kiểm tra trong ***disk cache*** nếu có rồi thì lấy ra và load vào view đồng thời lưu vào ***memory cache***.
    * Nếu chưa có ở cả ***memory cache*** và ***disk cache***, sẽ tiến hành load ảnh trên mạng về rồi load vào view, đồng thời lưu cà vào*** memory cache*** và ***disk cache***.

## 2. Cách thêm và sử dụng thư viện ảnh Fresco trong project Android.
* Đầu tiên, ở build-gradle trong level app của project, import thêm thư viện 
    ```
    implementation 'com.facebook.fresco:fresco:1.13.0'
    ```

    Nếu muốn thêm các chức năng như là hỗ trợ ảnh GIFs, WebP, animation thì import thêm những thư viện sau: 
    ```
    // For animated GIF support
        implementation 'com.facebook.fresco:animated-gif:1.13.0'
    ```

    ```
    // For WebP support, including animated WebP
        implementation 'com.facebook.fresco:animated-webp:1.13.0'
        implementation 'com.facebook.fresco:webpsupport:1.13.0'
    ```

    ```
    // For WebP support, including animated WebP
        implementation 'com.facebook.fresco:animated-webp:1.13.0'
        implementation 'com.facebook.fresco:webpsupport:1.13.0'
    ```

    ```
    // For WebP support, without animations
        implementation 'com.facebook.fresco:webpsupport:1.13.0'
    ```
    
    
*    Tiếp theo, khai báo và khởi tạo Fresco trong Application của app và cấp quyền INTERNET cho ứng dụng, hãy nhớ khai báo application trong Android Manifest nhé.
```
    public class MyApplication extends Application {

        @Override
        public void onCreate() {
            super.onCreate();
            Fresco.initialize(this);
        }
    }
```

```
<uses-permission android:name="android.permission.INTERNET" />

    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
```

* Bước tiếp là vẽ layout cho gian diện, ở đây mình vẽ giao diện đơn giản gồm 1 button, 1 view để hiển thị ảnh, khi click vào botton thì ảnh sẽ được hiển thị trong view

```
<Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Show image"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.47"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.245" />

    <com.facebook.drawee.view.SimpleDraweeView
        android:id="@+id/view_fresco"
        android:layout_width="200dp"
        android:layout_height="300dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.497"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button"
        app:layout_constraintVertical_bias="0.301" />
```

**Lưu ý**: Fresco không hỗ trợ wrap_content trong view, bạn nên set cứng kích thước cho view, để giải thích cho vấn đề này, bạn đọc có thể tìm hiểu thêm ở [đây](https://frescolib.org/docs/faq.html) 
* Cuối cùng, trong Fragment, Activity hay view nó đó sẽ khai báo SimpleDraweeView và setImageUrl cho nó. Đây là ví dụ tròn Fragment của mình

```
 private SimpleDraweeView draweeView;

    public static DemoFrescoFragment getInstance() {
        return new DemoFrescoFragment();
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = LayoutInflater.from(getActivity()).inflate(R.layout.fragment_demo_fresco, container, false);
        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        draweeView = getActivity().findViewById(R.id.view_fresco);
        buttonShowImage = getActivity().findViewById(R.id.button);
        buttonShowImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showImage();
            }
        });
    }

    private void showImage() {
        Uri uri = Uri.parse("http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-2_044126655.jpg");
        draweeView.setImageURI(uri);
    }
```

Thế thôi là chúng ta đã có thể sử dụng Fresco để hiển thị trong ứng dụng Android rồi, rát đơn giản phải không.

## 3. Tổng kết

Bên trên mình đã khái quát về thư viện load ảnh Fresco và cách sử dung nó trong project Android rồi, mong sẽ hữu ích với bạn đọc. Mình có làm 1 ví dụ đơn giản về sử dụng Fresco để load ảnh, source code mình để tại [đây](https://github.com/hungth-1726/DemoFresco)
, các bạn có thể tham khảo.

Nếu có thắc mắc hay câu hỏi gì hãy comment xuống dưới để chúng ta cùng bàn luận và giải quyết nhé. Kiến thức trong bài viết mình có tham khảo ở trang web dưới đây: 
    https://frescolib.org/