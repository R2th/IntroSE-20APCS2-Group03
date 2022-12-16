> Nếu bạn làm việc trên một ứng dụng Chat hoặc tạo một ứng dụng mà người dùng phải giao tiếp với những người dùng khác, thì bài viết này là dành cho bạn. Biểu tượng cảm xúc mới liên tục được thêm vào tiêu chuẩn Unicode. Bây giờ, điều quan trọng là tất cả người dùng sẽ có thể thấy Emoji mới ngay cả khi chúng bị kẹt trên các Phiên bản Android Cũ đó.
> 
 
> Nếu bạn vẫn thấy empty box☒ with the cross, Điều đó có nghĩa rằng app của bạn không dùng EmojiCompatLibrary.
May mắn cho các develop Android, Google đã phát hành một thư viện mới có tên là EmojiCompat. Với thư viện hỗ trợ EmojiCompat, người dùng ứng dụng của bạn không cần đợi bản cập nhật HĐH Android để có Emoji mới nhất. Thư viện hỗ trợ EmojiCompat tương thích với các thiết bị chạy Android 4.4 (API cấp 19) trở lên.
![](https://images.viblo.asia/cfd0bafa-ddf8-4a66-9121-491472b9d5da.png)

### Cách hoạt động :
EmojiCompat xác định biểu tượng cảm xúc cho một CharSequence, thay thế chúng với EmojiSpans,  và cuối cùng nó sẽ render emoji glyphs lên view 
![](https://images.viblo.asia/33dd01df-9329-4b5b-b471-29016dd760e8.png)
|Before use Emoji | After use Emoji |
| -------- | -------- |
|  ![](https://images.viblo.asia/03665de9-31b7-4839-b645-3304a4585a96.png)    | ![](https://images.viblo.asia/62acb7dd-6995-4537-ac01-76184ce9a9f6.png)|
### EmojiCompat Widgets
1. EmojiCompatTextView
2. EmojiCompatEditText
3. EmojiCompatButton
### Android App Setup
1. thêm thư viện hỗ trợ vào dependency section :
```
compile "com.android.support:support-emoji-appcompat:$version"
```
 
 2.Emoji Compat xây dựng trên cơ chế phông chữ có thể tải xuống, để đảm bảo rằng bạn luôn có sẵn Emoji mới nhất. Vì vậy, nếu bạn muốn phông chữ Emoji có thể tải xuống khi ứng dụng của bạn được cài đặt từ cửa hàng play. Thêm vào Manifest.xml :
```
<meta-data android:name="fontProviderRequests" android:value="Noto Color Emoji Compat"/>
```
3. Khi sử dụng cấu hình phông chữ có thể tải xuống, hãy tạo đối tượng FontRequest và FontRequestEmojiCompatConfig của bạn.
```
val fontRequest = android.support.v4.provider.FontRequest(
                "com.google.android.gms.fonts",
                "com.google.android.gms",
                "Noto Color Emoji Compat",
                R.array.com_google_android_gms_fonts_certs)
val config = FontRequestEmojiCompatConfig(this, fontRequest)
                .setReplaceAll(true)
                .setEmojiSpanIndicatorEnabled(true)
                .setEmojiSpanIndicatorColor(Color.MAGENTA)
                .registerInitCallback(this)
EmojiCompat.init(config)
```
**Configuration Options**
* setReplaceAll:  Khi được đặt thành true, thay thế tất cả các biểu tượng cảm xúc bằng EmojiSpans. Theo mặc định, EmojiCompat cố gắng hiểu rõ nhất nếu hệ thống có thể hiển thị biểu tượng cảm xúc và không thay thế các biểu tượng cảm xúc đó.
* setEmojiSpanIndicatorEnabled: Cho biết liệu EmojiCompat có thay thế biểu tượng cảm xúc bằng EmojiSpan hay không. 
* setEmojiSpanIndicatorColor: dùng để set màu cho Emoji . default là green
4.Using EmojiCompat Widgets
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
* Sử dụng Emoji mà không có widget trong file Xml thì bạn vẫn có thể dùng EmojiCompat để covert CharSequence . EmojiCompat cung cấp một phương thức "process" mà trả về một CharSequence .
```
val charSequence = EmojiCompat.get().process("Normal TextView \uD83D\uDE48\uD83D\uDE49\uD83D\uDE4A")
normalTextView.text = charSequence
```
* Sử dụng EmojiCompat.IntitCallback
```
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
```
 
 Nguồn : https://developer.android.com/guide/topics/ui/look-and-feel/emoji-compat 
 
**Trên đây là mục đích sử dụng và tổng quan về Emoji Android Jetpack . Thank for watching !!**