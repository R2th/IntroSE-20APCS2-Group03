# 1) Giới thiệu
Sử dụng biểu tượng cảm xúc là một tính năng không thể thiếu trong những ứng dụng có tính năng bình luận. Thế nhưng, không phải thiết bị android nào cũng có các emoticon giống nhau và đầy đủ như nhau. Trong bài viết này, mình sẽ giới thiệu về một thư viện hỗ trợ là EmojiCompat để xử lý vấn đề này.
Thư viện hỗ trợ EmojiCompat nhằm mục đích giữ cho các thiết bị Android được cập nhật với biểu tượng cảm xúc mới nhất. Nó ngăn ứng dụng của bạn hiển thị các ký tự biểu tượng cảm xúc bị thiếu ở dạng ô vuông, cho biết thiết bị của bạn không có phông chữ để hiển thị văn bản. Bằng cách sử dụng thư viện hỗ trợ EmojiCompat, người dùng ứng dụng của bạn không cần đợi các bản cập nhật hệ điều hành Android để có biểu tượng cảm xúc mới nhất.
![](https://images.viblo.asia/3378b472-c936-4a1d-8ec1-41d6869c2ae9.png)
# 2) EmojiCompat hoạt động như thế nào?
Thư viện hỗ trợ EmojiCompat cung cấp các lớp để triển khai hỗ trợ biểu tượng cảm xúc tương thích ngược trên các thiết bị chạy Android 4.4 (API cấp 19) trở lên.

EmojiCompat xác định biểu tượng cảm xúc cho một unicode nhất định, thay thế chúng bằng EmojiSpans nếu cần và cuối cùng hiển thị các biểu tượng cảm xúc
![](https://images.viblo.asia/ed997c34-161e-4928-9673-2956dac4df42.png)
Bạn có thể cấu hình EmojiCompat thông qua 2 cách sau:
## a) Downloadable fonts configuration
Cấu hình phông chữ có thể tải xuống sử dụng tính năng thư viện hỗ trợ  Downloadable Fonts để tải xuống phông chữ biểu tượng cảm xúc. Nó cũng cập nhật  dữ liệu biểu tượng cảm xúc cần thiết mà thư viện hỗ trợ EmojiCompat cần theo kịp các phiên bản mới nhất của đặc tả Unicode.
### Thêm thư viện hỗ trợ
```
dependencies {
    ...
    implementation "com.android.support:support-emoji:28.0.0"
}
```
### Khởi tạo Downloadable fonts configuration
Bạn cần khởi tạo EmojiCompat dữ liệu và kiểu chữ. Vì việc khởi tạo có thể mất một chút thời gian nên quá trình khởi tạo  sẽ chạy trên background thread
Các bước thực hiện:
- Tạo một thể hiện của lớp FontRequest và cung cấp quyền.
- Tạo một thể hiện của FontRequestEmojiCompatConfig.
- Khởi tạo EmojiCompat bằng cách gọi phương thức init ()
```
FontRequest fontRequest = new FontRequest(
       "com.example.fontprovider",
       "com.example",
       "emoji compat Font Query",
       CERTIFICATES);
     EmojiCompat.Config config = new FontRequestEmojiCompatConfig(this, fontRequest);
     EmojiCompat.init(config);
```
- Sử dụng các widget của EmojiCompat trong bố cục XML.
```
<android.support.text.emoji.widget.EmojiTextView
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>

<android.support.text.emoji.widget.EmojiEditText
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>

<android.support.text.emoji.widget.EmojiButton
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"/>
```
### Tùy chọn cấu hình
Bạn có thể sử dụng các phương thức sau từ lớp cơ sở để đặt cấu hình:
- *setReplace ALL ()*: Xác định xem EmojiCompat có nên thay thế tất cả biểu tượng cảm xúc mà nó tìm thấy bằng EmojiSpans hay không. Theo mặc định, EmojiCompat cố gắng hết sức để hiểu nếu hệ thống có thể hiển thị biểu tượng cảm xúc và không thay thế các biểu tượng cảm xúc đó. Khi được đặt thành true, EmojiCompat thay thế tất cả các biểu tượng cảm xúc mà nó tìm thấy bằng EmojiSpans.
- *setEmojiSpanIndicatorEnabled()*: Indicates whether EmojiCompat has replaced an emoji with an EmojiSpan. When set to true, EmojiCompat draws a background for the EmojiSpan. This method is mainly used for debugging purposes.
- setEmojiSpanIndicatorColor (): Đặt màu để biểu thị EmojiSpan. Giá trị mặc định là XANH.
- registerInitCallback: Thông báo cho ứng dụng về trạng thái khởi tạo EmojiCompat.
```
EmojiCompat.Config config = new FontRequestEmojiCompatConfig(...)
       .setReplaceAll(true)
       .setEmojiSpanIndicatorEnabled(true)
       .setEmojiSpanIndicatorColor(Color.GREEN)
       .registerInitCallback(new InitCallback() {...})
```

## b) Bundled fonts configuration
EmojiCompat cũng có sẵn trong một phiên bản font đi kèm.
### Trước tiên, bạn hãy thêm thư viện hỗ trợ
```
dependencies {
    ...
    implementation "com.android.support:support-emoji-bundled:$version"
}
```
### Sử dụng font có sẵn để cấu hình EmojiCompat
- Sử dụng BundledEmojiCompatConfig để tạo một thể hiện của EmojiCompat.
- Gọi phương thức init () để khởi tạo EmojiCompat.
```
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        EmojiCompat.Config config = new BundledEmojiCompatConfig(this);
        EmojiCompat.init(config);
        ...
    }
}
```
### Sử dụng EmojiCompat với custom widget
- Nếu bạn ko thể thay đổi tất cả các widget trong dự án của mình thành các widget do EmojiCompat cung cấp. EmojiCompat cũng cung cấp hàm progress() để xử lý chuỗi trước khi truyền vào widget
```
CharSequence processed = EmojiCompat.get().process("neutral face \uD83D\uDE10");
```
- Dưới đây là ví dụ cho việc sử dụng method progress()
activity_main.xml
```
<?xml version="1.0" encoding="utf-8"?>
<ScrollView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/scroll"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.example.android.emojicompat.MainActivity">

    <LinearLayout
        android:id="@+id/container"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="@dimen/spacing_normal">

        <TextView
            android:id="@+id/regular_text_view"
            android:layout_width="match_parent"
            android:text=""
            android:layout_height="wrap_content"
            android:layout_marginBottom="@dimen/spacing_small"
            android:textSize="@dimen/text_size"/>

    </LinearLayout>

</ScrollView>
```
MainActivity.java
```
public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    private static final String RAINBOW_FLAG = "\uD83C\uDFF3️\u200D\uD83C\uDF08";

    private static final String WOMAN_SINGER = "\uD83D\uDC69\u200D\uD83C\uDFA4";

    static final String EMOJI = RAINBOW_FLAG + " " + WOMAN_SINGER;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        initEmojiCompat();

        setContentView(R.layout.activity_main);


        final TextView regularTextView = findViewById(R.id.regular_text_view);
        //Ở đây nếu bạn sử dụng luôn regularTextView.setText(getString(R.string.regular_text_view, EMOJI)), emoticon sẽ không được hiển thị chính xác (xem hình minh họa bên dưới)
        EmojiCompat.get().registerInitCallback(new InitCallback(regularTextView));
    }

    private void initEmojiCompat() {
        final EmojiCompat.Config config;
            config = new BundledEmojiCompatConfig(getApplicationContext());
        EmojiCompat.init(config);
    }

    private static class InitCallback extends EmojiCompat.InitCallback {

        private final WeakReference<TextView> mRegularTextViewRef;

        InitCallback(TextView regularTextView) {
            mRegularTextViewRef = new WeakReference<>(regularTextView);
        }

        @Override
        public void onInitialized() {
            final TextView regularTextView = mRegularTextViewRef.get();
            if (regularTextView != null) {
                final EmojiCompat compat = EmojiCompat.get();
                final Context context = regularTextView.getContext();
                regularTextView.setText(
                        compat.process(context.getString(R.string.regular_text_view, EMOJI)));
            }
        }

    }

}
```
Và đây là kết quả của việc sử dụng và không sử dụng EmojiCompat trên thiết bị android 5.0
![](https://images.viblo.asia/a53e3b1e-964d-4832-9e28-2ff7872bafca.jpg)
![](https://images.viblo.asia/e8778e3b-2ed6-497d-a8db-71223b13237c.jpg)
# 3) Kết luận
Trên đây là bài giới thiệu sơ bộ về thư viện hỗ trợ EmojiCompat. Hi vọng bài viết này sẽ giúp ích cho các bạn trong việc xử lý emoticon
Bạn có thể tham khảo thêm tại:
https://developer.android.com/guide/topics/ui/look-and-feel/emoji-compat