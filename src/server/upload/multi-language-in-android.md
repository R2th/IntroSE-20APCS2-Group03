![](https://images.viblo.asia/2d9f47ca-3bed-4495-b455-59e39fa1f77f.jpg)
Trong ứng dụng của mình, bạn có thể thêm bao nhiêu ngôn ngữ tùy thích. Theo ngôn ngữ, ý tôi là ngôn ngữ của văn bản mà chúng ta thấy trong bất kỳ ứng dụng di động nào. Ví dụ: nếu bạn có người dùng tiếng Anh, tiếng Pháp và tiếng Hindi, thì bạn có thể có hỗ trợ ngôn ngữ cho tất cả các ngôn ngữ này. Giống như "Hello" trong tiếng Anh sẽ trở thành "Bonjour" trong tiếng Pháp và "नमस्ते" trong tiếng Hindi.

Nhưng làm thế nào chúng ta có thể thay đổi ngôn ngữ?  Hãy cùng tìm hiểu trong bài viết này.

Theo mặc định, bạn có tiếng Anh làm ngôn ngữ mặc định cho toàn bộ ứng dụng và văn bản tương ứng với ngôn ngữ tiếng Anh sẽ có trong tệp string.xml của chúng tôi. Vì vậy, tương tự, đối với các ngôn ngữ khác, bạn cần thêm tệp string.xml của chúng.

Vì vậy, về cơ bản Android tải các tài nguyên liên quan đến ngôn ngữ dựa trên cài đặt ngôn ngữ hệ thống. Ví dụ: nếu ngôn ngữ của điện thoại Android của bạn là tiếng Anh, thì string.xml của tiếng Anh sẽ được tải bởi Android. Chúng tôi không phải làm bất cứ điều gì thêm ở đây.

Tuy nhiên, nhiều lần, chúng tôi muốn người dùng chỉ thay đổi ngôn ngữ của Ứng dụng bằng cách chọn ngôn ngữ ưa thích chứ không phải bằng cách thay đổi ngôn ngữ của điện thoại Android của chúng tôi. Vì vậy, chúng ta hãy xem làm  điều này như thế nào nhé?
Trước hết, hãy tạo một dự án trong Android Studio. Ở đây, chúng ta sẽ có 2 acitvities:
- **MainActivity**:  Màn hình này sẽ chứa một TextView chào mừng và hai buttons, một để mở màn hình tiếp theo bằng tiếng Anh và nút kia để mở màn hình tiếp theo bằng ngôn ngữ Hindi..
- **LanguageActivity**: Màn hình này chứa một TextView hiển thị một số thông báo. Thông báo sẽ được hiển thị bằng tiếng Anh nếu ngôn ngữ của ứng dụng là tiếng Anh và thông báo sẽ được hiển thị bằng tiếng Hindi nếu ngôn ngữ của ứng dụng là tiếng Hindi.
Vì vậy, hãy bắt đầu với MainActivity. Sau đây là mã cho tệp activity_main.xml:
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/tvWelcome"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="40dp"
        android:text="@string/msg_welcome"
        android:textAlignment="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/btnEnglish"
        android:layout_width="match_parent"
        android:layout_height="56dp"
        android:layout_marginTop="40dp"
        android:text="@string/label_btn_english"
        android:textAllCaps="false"
        app:layout_constraintEnd_toEndOf="@id/tvWelcome"
        app:layout_constraintStart_toStartOf="@id/tvWelcome"
        app:layout_constraintTop_toBottomOf="@id/tvWelcome" />

    <Button
        android:id="@+id/btnHindi"
        android:layout_width="match_parent"
        android:layout_height="56dp"
        android:layout_marginTop="16dp"
        android:text="@string/label_btn_hindi"
        android:textAllCaps="false"
        app:layout_constraintEnd_toEndOf="@id/tvWelcome"
        app:layout_constraintStart_toStartOf="@id/tvWelcome"
        app:layout_constraintTop_toBottomOf="@id/btnEnglish" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

Và giao diện của màn LanguageActivity
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".LanguageActivity">

    <TextView
        android:id="@+id/tvLearning"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/msg_learning"
        android:textAlignment="center"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

 Cuối cùng, là file strings.xml
 `<resources>
    <string name="app_name">ChangeAppLocale</string>
    <string name="msg_welcome">Welcome to MindOrks!</string>
    <string name="label_btn_english">Open Next Activity in English</string>
    <string name="label_btn_hindi">Open Next Activity in Hindi</string>
    <string name="msg_learning">Hello Everyone! I am learning how to change the App Locale. Having fun in learning this.</string>
</resources>`
Như vậy, chúng ta đã hoàn thành xong phần điều kiện tiên quyết của mình. Bây giờ, chúng tôi đã sẵn sàng thêm một ngôn ngữ mới vào ứng dụng của mình. Làm theo các bước dưới đây để làm như vậy:
- Chuột phải vào folder res > New > Android Resource File
- Đặt tên file là strings.xml
- Chọn Locale
![](https://images.viblo.asia/c337a474-27f5-4682-9957-52dd66a62dd2.jpg)

- chọn locale của Hindi với tên viết tắt là "hi"
![](https://images.viblo.asia/63b5b347-6902-4df1-901f-d550990457cc.jpg)

Bây giờ, bạn cần đặt tất cả các giá trị của tất cả các chuỗi mà chúng tôi đã xác định trong tệp string.xml mặc định của chúng tôi cho tệp string.xml tiếng Hindi mới của chúng tôi.

Nhưng có một số trường hợp chúng tôi muốn giữ văn bản của ngôn ngữ mặc định. Ví dụ: tên của Ứng dụng phải giống nhau cho tất cả các ngôn ngữ. Trong trường hợp của chúng tôi, chúng tôi chỉ cần dịch thông báo được hiển thị trên LanguageActivity chứ không phải tất cả các văn bản như AppName, WelcomeMessage, v.v.

Vì vậy, đối với điều đó, chúng tôi cần đặt có thể dịch thành false trong tệp string.xml mặc định của chúng tôi (tệp tiếng Anh). Ví dụ:
```
<string name="app_name" translatable="false">ChangeAppLocale</string>
```

Tương tự, bạn cũng có thể đặt phiên dịch = "false" cho các giá trị chuỗi khác. Bây giờ, đối với các chuỗi khác mà bạn muốn dịch, bạn có thể chỉ cần thêm giá trị của chúng vào tệp string.xml của ngôn ngữ Hindi. Ví dụ, mã của string.xml (hi) sẽ là:

```
<resources>
    <string name="msg_learning">सभी को नमस्कार! मैं ऐप लोकेल को बदलना सीख रहा हूं। यह सीखने में मज़ा आ रहा है।</string>
</resources>
```

Bằng cách này, bạn đang yêu cầu ứng dụng Android sử dụng giá trị chuỗi theo ngôn ngữ của Ứng dụng.

Bây giờ, nhiệm vụ cuối cùng của chúng ta là thay đổi ngôn ngữ hoặc đơn giản là ngôn ngữ của ứng dụng khi chúng ta nhấp vào nút. Đối với điều này, hãy thêm hàm dưới đây vào tệp MainActivity.kt của bạn:
```
fun setAppLocale(context: Context, language: String) {
    val locale = Locale(language)
    Locale.setDefault(locale)
    val config = context.resources.configuration
    config.setLocale(locale)
    context.createConfigurationContext(config)
    context.resources.updateConfiguration(config, context.resources.displayMetrics)
}
```

Trong đoạn mã trên, hãy chuyển ngữ cảnh và mã ngôn ngữ rồi di chuyển tới màn LanguageActivity. Ví dụ:
```
enButton.setOnClickListener {
    setAppLocale(this, "en")
    val intent = Intent(this, LanguageActivity::class.java)
    startActivity(intent)
}

hiButton.setOnClickListener {
    setAppLocale(this, "hi")
    val intent = Intent(this, LanguageActivity::class.java)
    startActivity(intent)
}
```

Xong, như vậy các bạn có thể tạo ra một ứng dụng đa ngôn ngữ rồi nhé. Chúc các bạn thành công ^_^