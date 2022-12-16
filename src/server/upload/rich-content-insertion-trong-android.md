Trên ứng dụng Android, người dùng rất ưa thích sử dụng hình ảnh, video và các nội dung biểu cảm khác, nhưng việc chèn và di chuyển nội dung này trong ứng dụng không phải lúc nào cũng dễ dàng. Để giúp ứng dụng của bạn dễ dàng nhận về rich content, một API thống nhất mới đã được giới thiệu cho phép bạn nhận nội dung từ bất kỳ nguồn nào: clipboard, keyboard hoặc kéo và thả vào.

Để làm được điều này, bạn có thể sử dụng interface  [`OnReceiveContentListener`](https://developer.android.com/reference/android/view/OnReceiveContentListener) cho các UI components và nhận callback khi nội dung được chèn thông qua bất kỳ cơ chế nào. Callback này trở thành nơi duy nhất để code của bạn xử lý việc nhận tất cả nội dung, từ văn bản thuần túy cho đến markup, hình ảnh, video,  audio và những thứ khác.

Để tương thích ngược với các phiên bản Android trước, API mới đã được thêm sẵn vào AndroidX (từ phiên bản Core 1.5.0-beta1 và Appcompat 1.3.0-beta-01), chúng được khuyến nghị khi sử dụng khi triển khai tính năng này.

![img](https://developer.android.com/about/versions/12/images/copy-paste-drag-and-drop-in-split-screen.gif)


## Tổng quan

Với các API hiện có, mỗi cơ chế của UI — chẳng hạn như `long-press menu` và `drag and drop` — có API tương ứng của riêng nó. Điều này có nghĩa là bạn phải tích hợp với từng API riêng biệt, thêm code tương tự cho từng cơ chế chèn nội dung:

![img](https://developer.android.com/about/versions/12/images/required-apis-before.svg)

Unified content API hợp nhất code ở những nơi khác nhau bằng cách tạo một API duy nhất để triển khai, vì vậy bạn có thể tập trung vào logic dành riêng cho ứng dụng của mình và để platform xử lý phần còn lại:

![img](https://developer.android.com/about/versions/12/images/required-apis-after.svg)

Cách tiếp cận này cũng có nghĩa là khi các cách chèn nội dung mới được thêm vào platform, bạn không cần thực hiện thêm các thay đổi vào code để kích hoạt nó trong ứng dụng của mình. Nếu ứng dụng của bạn cần triển khai tùy chỉnh đầy đủ cho một trường hợp sử dụng cụ thể, bạn vẫn có thể sử dụng các API hiện có, các API này sẽ tiếp tục hoạt động theo cách tương tự.

## Implementation

Để có thể triển khai API này, bạn sẽ cần thêm các dependencies này trong project và target Android 12.

```java
implementation 'androidx.core:core-ktx:1.5.0-beta01'
implementation 'androidx.appcompat:appcompat:1.3.0-beta01'
```

API mới cung cấp một listener interface với một phương thức duy nhất [`OnReceiveContentListener`](https://developer.android.com/reference/android/view/OnReceiveContentListener). Để hỗ trợ các phiên bản cũ hơn của nền tảng Android, bạn nên sử dụng interface `OnReceiveContentListener` trong thư viện AndroidX Core.

To use the API, start implementing the listener by specifying what types of content your app can handle:
Để sử dụng API, hãy bắt đầu triển khai lắng nghe bằng cách chỉ định loại nội dung mà ứng dụng của bạn có thể xử lý:

```java
public class MyReceiver implements OnReceiveContentListener {
     public static final String[] MIME_TYPES = new String[] {"image/*", "video/*"};
     // ...
```

Sau khi chỉ định tất cả các loại MIME nội dung mà ứng dụng của bạn hỗ trợ, hãy triển khai phần còn lại của Listener:

```java
 public class MyReceiver implements OnReceiveContentListener {
     public static final String[] MIME_TYPES = new String[] {"image/*", "video/*"};

     @Override
     public ContentInfoCompat onReceiveContent(View view, ContentInfoCompat contentInfo) {
         Pair<ContentInfoCompat, ContentInfoCompat> split = contentInfo.partition(
                 item -> item.getUri() != null);
         ContentInfo uriContent = split.first;
         ContentInfo remaining = split.second;
         if (uriContent != null) {
             ClipData clip = uriContent.getClip();
             for (int i = 0; i < clip.getItemCount(); i++) {
                 Uri uri = clip.getItemAt(i).getUri();
                 // Logic để xử lý URI ...
             }
         }
         return remaining;
     }
 }
```

Nếu ứng dụng của bạn đã hỗ trợ chia sẻ với Intents, bạn có thể sử dụng lại logic dành riêng cho ứng dụng của mình để xử lý content URI. Trả lại mọi dữ liệu còn lại để ủy quyền xử lý dữ liệu đó cho platform.

Sau khi implement xong listener, hãy set listener trong constructor của UI element mà bạn sử dụng:

```java
public class MyActivity extends Activity {
     @Override
     public void onCreate(Bundle savedInstanceState) {
         // ...

         AppCompatEditText myInput = findViewById(R.id.my_input);
         ViewCompat.setOnReceiveContentListener(myInput, MyReceiver.MIME_TYPES, new MyReceiver());
     }
}
```

## So sánh với keyboard image API

Bạn có thể coi unified content API là phiên bản tiếp theo của [keyboard image API](https://developer.android.com/guide/topics/text/image-keyboard) hiện có. API mới hỗ trợ chức năng của keyboard image API cũng như một số tính năng bổ sung. Khả năng tương thích của thiết bị và tính năng khác nhau tùy thuộc vào việc bạn sử dụng thư viện Jetpack hay các API gốc từ Android SDK.

- ##### Khi sử dụng Jetpack

    | Action or feature                       | Supported by keyboard image API |   Supported by unified API    |
    | :-------------------------------------- | :-----------------------------: | :---------------------------: |
    | Insert from the keyboard                |  Yes (API level 13 and higher)  | Yes (API level 13 and higher) |
    | Insert using Paste from long-press menu |               No                |              Yes              |
    | Insert using drag and drop              |               No                | Yes (API level 24 and higher) |

<br>

- ##### Khi sử dụng native APIs

    | Action or feature                       | Supported by keyboard image API |  Supported by unified API   |
    | :-------------------------------------- | :-----------------------------: | :-------------------------: |
    | Insert from the keyboard                |  Yes (API level 25 and higher)  | Yes (Android 12 and higher) |
    | Insert using Paste from long-press menu |               No                | Yes (Android 12 and higher) |
    | Insert using drag and drop              |               No                | Yes (Android 12 and higher) |

## Reference

- https://developer.android.com/about/versions/12/features/unified-content-api
- https://joebirch.co/android/exploring-android-12-unified-rich-content-api