Emojis ![](https://images.viblo.asia/85338ddc-3a74-4cb9-bb25-99b74fbe990d.png) là một cách tuyệt vời để thể hiện cảm xúc của chúng ta và gửi đi những suy nghĩ của chúng ta tới những người , họ đang sử dụng một ngôn ngữ khác có thể hiểu được chúng ta. Bất kỳ một ứng dụng mạng xã hội nào cũng cung cấp cho bạn môt bộ Emojis. Hãy xem những tin nhắn sau cùng của bạn để xem bạn đã sử dụng chúng bao nhiêu lần . Nó thực sự cũng rất quan trọng trong ứng dụng của bạn. Thật may mắn hệ điều hành Android cũng hỗ trợ Emojis trên Text Fields.
Trong bài viết này tôi sẽ hướng dẫn các bạn làm thế nào để tích hợp emojis keyboard trong ứng dụng của bạn bằng cách sử dụng thư viện [SuperNova-Emoji](https://github.com/hani-momanii/SuperNova-Emoji)

### Tích Hơp Emojis Keyboard
Bên dưới là cú pháp đơn giản cho việc tích hợp Emojis Keyboard . Constructor của **EmojiIconActions** cần 4 tham số  là **Context, RootView, EmojiconEditText, and ImageView** . Thường sử dụng parent layout như là RootView là lựa chọn tốt nhất để hiển thị Emojis Keyboard trên tất cả các view. **EmojiconEditText** là một **EditText** với nhiều thuộc tính đã được custom để có thể hiển thị emojis . Tham số cuối cùng là ImageView sẽ được sử dụng để chuyển đổi giữa normal keyboard và  emojis keyboard.
Để hiển thị emojis trong TextView chúng ta sẽ sử dụng **EmojiconTextView** , cũng thực chất là một TextView với nhiều thuộc tính đã được custom để cho phép hiển thị được emojis.
```
EmojIconActions emojIcon= new EmojIconActions(this, rootView, emojiconEditText, 
                            emojiImageView);
 
emojIcon.ShowEmojIcon();
```

Nếu bạn muốn sử dụng nó trong layout xml chúng ta sử dụng **EmojiconEditText** thay cho **EditText **
```
<hani.momanii.supernova_emoji_library.Helper.EmojiconEditText
    android:id="@+id/emojicon_edit_text"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    emojicon:emojiconSize="28sp" />
```

**EmojiconTextView** thay cho **TextView**

```
<hani.momanii.supernova_emoji_library.Helper.EmojiconTextView
    android:id="@+id/emojicon_text_view"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    emojicon:emojiconSize="28sp"/>
```

![](https://images.viblo.asia/58604022-1910-4db0-a6dc-81dff2ae6c5c.png)

### Thay Đổi Toggle Icon Mặc Định

Để chuyển đổi giữa normal keyboard và emojis keyboard . Bạn có thể gọ phương thức  **setIconsIds()**, phương thức này cần 2 tham số 
 **keyboard Icon ID** và  **smiley Icon ID**.
 
```
emojIcon.setIconsIds(R.drawable.ic_action_keyboard,R.drawable.smiley);

```

![](https://images.viblo.asia/bdb349f5-0170-4495-8d9b-95f6736b35cc.png)

### Sử Dụng Emojis Mặc Định Trên Device
Thư viện SuperNove-Emoji cho phép bạn sử dụng các Emojis mặc định trên device bằng cách bạn chỉ cần thiết lập một giá trị boolean của 2 phương thức **setUseSystemEmoji()** và **setUseSystemDefault()**   tới giá trị TRUE trong mỗi  **EmojiconTextView**  và **EmojiconEditText**  mà bạn đang cho hiển thị emojis.

```
emojIcon.setUseSystemEmoji(true);
textView.setUseSystemDefault(true);
emojiconEditText.setUseSystemDefault(true);
```

trong xml 
```
emojicon:emojiconUseSystemDefault="true"
```

### Thay Đổi Size Emojis

Để thay đổi size của Emojis bạn phải thay đổi size của text bằng cách xét giá trị cho phương thức **setEmojiconSize()**

```
textView.setEmojiconSize(30);
```

trong xml 
```
emojicon:emojiconSize="28sp"
```

![](https://images.viblo.asia/7c389823-8e65-481a-b77c-304c3d46e933.png)

### Phát Hiện Khi Keyboard Đã Được Mở Và Đóng

Thư viện SuperNova-Emoji cho phép bạn phát hiện khi user mở hoặc đóng keyboard . Sử dụng đoan code bên dưới:

```
emojIcon.setKeyboardListener(new EmojIconActions.KeyboardListener() {
            @Override
            public void onKeyboardOpen() {
                Log.i("Keyboard","open");
            }
 
            @Override
            public void onKeyboardClose() {
                Log.i("Keyboard","close");
            }
        });
```

### Thay Đổi  Color của Emoji Keyboard Để Phù Hợp Với Theme Trong App 
Bạn có thể xét 3 màu tới emojis keyboard bằng các thêm 3 tham số tới constructor. Với các màu lần lượt là tabs icons color, tabs color, và background color. Chúng ta sẽ sử dụng cùng cấu trúc ở trên với các giá trị màu

```
EmojIconActions emojIcon= new EmojIconActions(this, rootView, emojiconEditText, emojiImageView,
"#F44336","#e8e8e8","#f4f4f4");
 
emojIcon.ShowEmojIcon();
```

![](https://images.viblo.asia/0690d386-530f-41b4-b444-68f9248b7a65.png)

### Tạo Sample App 

Bây giờ chúng ta sẽ tạo một sample app và áp dụng những gì chúng ta vừa tìm hiểu ở trên
Việc đầu tiên chúng ta cần làm là mở file ** build.gradle** và thêm thư viện supernova emoji

```
repositories {
    maven { url "https://dl.bintray.com/hani-momanii/maven"}
}
 
dependencies {
    .
    .
    .
    // Supernova Emoji
    compile 'hani.momanii.supernova_emoji_library:supernova-emoji-library:0.0.2'
}
```

Tiếp theo chúng ta sẽ mở file layout của main activity và thêm những đoạn code bên dưới:

```
activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:emojicon="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/root_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="info.androidhive.emojis.MainActivity">
 
    <ImageView
        android:id="@+id/emoji_btn"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_alignParentBottom="true"
        android:layout_alignParentLeft="true"
        android:padding="4dp"
        android:src="@drawable/ic_insert_emoticon_black_24dp" />
 
    <ImageView
        android:id="@+id/submit_btn"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_alignParentBottom="true"
        android:layout_alignParentRight="true"
        android:padding="4dp"
        android:src="@android:drawable/ic_menu_send" />
 
    <hani.momanii.supernova_emoji_library.Helper.EmojiconEditText
        android:id="@+id/emojicon_edit_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_toLeftOf="@id/submit_btn"
        android:layout_toRightOf="@id/emoji_btn"
        emojicon:emojiconSize="28sp" />
 
 
    <CheckBox
        android:id="@+id/use_system_default"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:checked="false"
        android:text="Use System Default?" />
 
    <hani.momanii.supernova_emoji_library.Helper.EmojiconTextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_centerVertical="true"
        android:layout_marginTop="26dp"
        android:text="Hello Emojis!"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#000000"
        emojicon:emojiconSize="45sp"
        emojicon:emojiconUseSystemDefault="true" />
</RelativeLayout>
```
Tiếp theo chúng tao mởi file **MainActivity.java** và thêm những đoạn code bên dưới
```

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ImageView;
 
import hani.momanii.supernova_emoji_library.Actions.EmojIconActions;
import hani.momanii.supernova_emoji_library.Helper.EmojiconEditText;
import hani.momanii.supernova_emoji_library.Helper.EmojiconTextView;
 
public class MainActivity extends AppCompatActivity {
 
    private static final String TAG = MainActivity.class.getSimpleName();
    CheckBox mCheckBox;
    EmojiconEditText emojiconEditText;
    EmojiconTextView textView;
    ImageView emojiImageView;
    ImageView submitButton;
    View rootView;
    EmojIconActions emojIcon;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        rootView = findViewById(R.id.root_view);
        emojiImageView = (ImageView) findViewById(R.id.emoji_btn);
        submitButton = (ImageView) findViewById(R.id.submit_btn);
        mCheckBox = (CheckBox) findViewById(R.id.use_system_default);
        emojiconEditText = (EmojiconEditText) findViewById(R.id.emojicon_edit_text);
        textView = (EmojiconTextView) findViewById(R.id.textView);
        emojIcon = new EmojIconActions(this, rootView, emojiconEditText, emojiImageView);
        emojIcon.ShowEmojIcon();
        emojIcon.setIconsIds(R.drawable.ic_action_keyboard, R.drawable.smiley);
        emojIcon.setKeyboardListener(new EmojIconActions.KeyboardListener() {
            @Override
            public void onKeyboardOpen() {
                Log.e(TAG, "Keyboard opened!");
            }
 
            @Override
            public void onKeyboardClose() {
                Log.e(TAG, "Keyboard closed");
            }
        });
 
        mCheckBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                emojIcon.setUseSystemEmoji(b);
                textView.setUseSystemDefault(b);
 
            }
        });
 
 
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String newText = emojiconEditText.getText().toString();
                textView.setText(newText);
            }
        });
    }
}
```

Bây giờ bạn hãy chạy app và nhìn kết quả 

![](https://images.viblo.asia/2ef96754-337e-4d51-9875-8185cd6fe3fb.png)