![](https://images.viblo.asia/f537c1e8-43e0-4f05-9efa-31a6ffccbd58.png)

Ở chủ đề trước khi nói về những sự thay đổi ở Android Q, có nội dung là  [Khám phá Android Q: Location Permissions
](https://viblo.asia/p/kham-pha-android-q-location-permissions-E375zWodKGW), tiếp nối nó, hôm nay tôi sẽ đề cập đến một sự thay đổi khác mà theo tôi đánh giá khá hay cho dân lập trình chúng ta. Đó là vấn đề liên quan đến Sharing Shorcuts. Về code của demo của những thay đổi của Android Q bạn có thể cập nhật tại [đây](https://github.com/hitherejoe/Android-Q-Playground/tree/master). Và link tài liệu chính thức của Google bạn có thể tìm hiểu ở [đây](https://developer.android.com/preview/features#settings-panels)
Cụ thể thay đổi này sẽ hướng đến tính năng chia sẻ của Android. Android Q cho phép ta can thiệp sau hơn vào nó để cung cấp cho người dùng nhiều sự tiện lợi hơn. Nếu khó hình dung bạn có thể dùng thử app Google Photos trong tính năng chia sẽ của nó hoặc là cũng tôi ngay sau đây khám phá sự thay đổi đó và cách implement nó như thế nào nhé.
## Bài toán
Vâng không dài dòng nữa, sự thay đổi ở đây đó là sự hướng đến việc chia sẻ trực tiếp. Trước đây Direct Share API cho phép chúng ta cung cấp người nhận trực tiếp mà chúng ta muốn chia sẻ nội dung thông qua share sheet. Ví dụ bạn muốn share 1 link cho trực tiếp một người trong contact của mình hoặc 1 người trong email của mình mà không cần bất cứ các thao tác chọn từ list hay bất cả hành vi phức tạp nào khác. Tuy nhiên việc delay của tính năng này tôi vẫn chưa mấy hài lòng cho lắm. Để dễ hình dung mời bạn xem ảnh sau:
![](https://cdn-images-1.medium.com/max/1040/0*dgbsieh4ZNi1u-0x)
Credit:[ Marques Brownlee](https://www.youtube.com/channel/UCBJycsmduvYEL83R_U4JriQ)
Bạn sẽ thấy nó sẽ bị delay một chút trong khi chờ load lên danh sách share trực tiếp. nó thường xuyên xảy ra khiến cho người dùng khác khó chịu và có thể thiếu kiên nhẫn để chờ list trực tiếp đó được load ra. Để cải thiện tính năng này chúng ta sẽ có một phương pháp mới để làm mà tôi đã nói ở tiêu đề đó là Sharing Shorcuts. Điều này sẽ thay đổi cách thức mà ứng dụng cung cấp các tùy chọn chia sẻ trực tiếp chắc chắn rồi, nó sẽ nhanh hơn loại bỏ những yếu điểm mà Direct Share API mang lại.

## Implement
Đề làm được điều này, chúng ta cần cung cấp một danh sách đổi tượng share lúc app chạy. Cách thức triển khai này rất giống với shortcuts API nhằm tạo ra sự dễ dàng cho người dùng truy cập vào ứng dụng của mình. Và tượng tự với cách mà chúng ta khai báo một app shortcut tĩnh, định nghĩa share shortcuts bắt đầu bằng việc khai báo trong **res/xml**, ở ví dụ này tôi sẽ khai báo shortcuts lồng nhau, nghĩa là một shortcut lớn khi mở ra sẽ là 2 tùy chọn nữa. Để làm được điều đó trước tiên bạn cần tìm hiểu qua về :
* **Target class** : Nó được dùng để khai báo activity mà sẽ bật lên khi chọn vào chia sẻ đó
* **Mime Type**: Kiểu dữ liệu mà share- target được hiển thị
* **Category name**: Tên của tiêu đề share, nó có thể định nghĩa nhiều category

Ví dụ, nếu ta có 1 activity ShareActivity quản lí việc chia sẻ text, thì ta sẽ định nghĩa shortcuts xml như sau
```
<?xml version="1.0" encoding="utf-8"?>
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">
    <share-target android:targetClass="co.joebirch.androidqplayground.ShareActivity">
        <data android:mimeType="text/plain" />
        <category android:name="co.joebirch.androidqplayground.category.TEXT_SHARE_TARGET" />
    </share-target>
</shortcuts>
```
Tiếp theo ta cần tạo tham chiếu đến phím tắt chia sẻ ứng dụng trong file manifest
```
<activity android:name=".MainActivity">
    ...
```

```
    <meta-data android:name="android.app.shortcuts"
               android:resource="@xml/share_shortcuts" />
</activity>
```
Sau đó ta cần thêm shortcuts của ta vào [ShortcutManager](https://developer.android.com/reference/android/content/pm/ShortcutManager), điều này sẽ giúp hệ thống nhận biết các shortcuts của chúng ta và có thể hiển thị chúng ở danh sách chia sẻ của hệ thống. Ở đây chúng ta sử dụng Builder cho [ShortcutInfoCompat](https://developer.android.com/reference/android/support/v4/content/pm/ShortcutInfoCompat), nó sẽ hỗ trợ ta tạo shortcuts trong share sheet.
```
ShortcutInfoCompat.Builder(context, Integer.toString(id))
    .setShortLabel(id.toString())
    .setIcon(IconCompat.createWithResource(context, R.drawable.ic_android_black_24dp))
    .setIntent(Intent(Intent.ACTION_DEFAULT))
    .setLongLived()
    .setCategories(setOf(CATEGORY_TEXT_SHARE_TARGET))
    .setPerson(
        Person.Builder()
            .setName(id.toString())
            .build()
    )
    .build()
```
mặc dù class này đã có trước khi Android Q ra mắt nhưng có một số điểm thay đổi mà bạn cần lưu ý:
* **setCategories**: Ở Android Q để sử dụng shortcuts thì bạn bắt buộc phải set nó , điều này sẽ giúp hệ thống có thể lọc được các action 
* **setLongLived**: Khi một shortcuts được thiết lập để tồn lại lâu, điều đó có nghĩa là các dịch vụ hệ thống vẫn có thể truy cập nó từ bộ nhớ đệm ngay cả khi nó đã bị xóa như một shortcuts động
* **setPerson** : Dùng để set một Person liên hết đến shortcut này, mặc dù không phải là một thuộc tính bắt buộc nhưng nó sẽ giúp hệ thống cung cấp các đề xuất phù hợp hơn trong share sheet. Có thể set multi Person

Điều quan trọng cần lưu ý là những mục chia sẻ này vẫn có thể cần phải được cập nhật trong ứng dụng của bạn, vì trong trường hợp đó có thể không phải là trường hợp thêm chúng 1 lần. Ví dụ bạn đang làm việc với ứng dụng nhắn tin mà trong quá trình đó lại có thêm người bạn mới tham gia cuộc nói chuyện mà ta muốn chia sẻ cho người đó, thì ta phải update shortcut.

Khi ta đã có shortcut chúng ta có thể sử dụng Shortcut Manager để thêm shortcuts:
```
ShortcutManagerCompat.addDynamicShortcuts(context, shortcuts)
```
Bạn có thể thấy rằng tôi sử dụng ShortcutsManagerCompat thay vì ShortcutManager mà ta thường sử dụng trước đây, ShortcutManagerCompat đến từ AndroidX và cũng cấp cho chúng ta khả năng tương thích ngược khi làm việc với DirectShare API mà trước đây chúng ta sử dụng thay cho share shortcuts. Tuy nhiên để sử dụng ShortcutManagerCompat ta cần phải thêm một số dữ liệu meta bổ sung cho nó để xử lý cho mục đích chia sẻ

```
<activity android:name=".ShareActivity">
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
    </intent-filter>
```

```
<meta-data
            android:name="android.service.chooser.chooser_target_service"
            android:value="androidx.sharetarget.ChooserTargetServiceCompat" />
</activity>
```

Chúng ta có thể chạy app vào thử thực hiện việc share action ở Google Chrome thì thành quả đạt được sẽ như sau
![](https://images.viblo.asia/4b58e4a9-0a29-41f8-a880-2bb64f45311b.png)
## Tổng kết
Một điều quan trọng cần lưu ý đây vẫn là shortcut ứng dụng, vì vậy khi ta thêm chúng bằng ShortManager hay ShortcutManagerCompat mặc dù chúng đã được thêm vào mục chia sẻ nhưng chúng vẫn hiển thị từ trình khởi tạo ứng dụng khi long-press vào biểu tượng.
Mặc dù không phải tất cả các ứng dụng đề có thể sử dụng tính năng share shortcuts nhưng nó vẫn là thứ chắc chắn giúp việc trải nghiệm hệ thống Android của người dùng thêm tiện lợi và thú vị hơn. Nếu bạn đang làm việc với DirectShare API thì việc chuyển sang phương pháp mới này là điều nên làm. 

Nguồn

 https://medium.com/google-developer-experts/exploring-android-q-sharing-shortcuts-a59e3b4821da