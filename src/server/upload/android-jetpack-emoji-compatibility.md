![](https://developer.android.com/guide/topics/ui/images/look-and-feel/emoji-compat/emoji-comparison.png)

# Emoji
> Emọi có ở khắp mọi nơi, trong ứng dụng hoặc là website nào đó bất cứ nơi nào có những đoạn hội thoại sẽ có sự xuất hiện của nhưng icon thể hiện cảm xúc. Chính vì thế việc xử lý hiển thị cho emoji là cần thiết đối với các ứng dụng Android. Chính bởi vậy, việc những dòng Android cũ không được cập nhật những icon mới nhất sẽ gặp vấn đề về hiển thị như trên, khiến việc trải nghiệm của người dùng trở nên khó khăn.

Thật may là mới đây Google đã phát hành một thư viện mới hỗ trợ giải quyết vấn đề trên được gọi là **EmojiCompat**. Mục đích của thư viện này là đảm bảo cho việc những thiết bị Android hệ điều hành cũ có thể cập nhật và hiển thị các emoji mới nhất bởi vì bản thân các emoji sẽ không tương thích ngược với các thiết bị cũ. Chúng ta sẽ đi giải quyết tình huống như sau:

![](https://blog.emojipedia.org/content/images/2017/01/missing-character-emoji-box.png)

Nếu như này thì rõ ràng là trải nghiệm người dùng đã bị ảnh hưởng và cuộc hội thoại giữa 2 người sẽ không thể tốt được, dẫn đến việc khó hiểu hoặc hiểu sai ý. Nhưng nếu sử dụng EmojiCompat thì sẽ thấy sự khác biệt: 

![](https://blog.emojipedia.org/content/images/2017/01/android-nougat-unicode-9-emojipedia.png)

# EmojiCompat
- Thư viện **EmojiCompat** bao gồm các thành phần hữu ích để đảm bảo sự nhất quán của trải nghiệm người dùng trên mọi thiết bị Android. Nó bao gồm **EmojiTextView**, **EmojiEditText** và **EmojiButotn** - Chúng được sử dụng để hiển thị những emoji mà hệ thống không hỗ trợ. Nó khác với chế độ xem văn bản thông thường như sau:

![](https://cdn-images-1.medium.com/max/800/1*EI4H3wkU2ZqlXNVjIzft3w.png)

- **EmojiCompat** hoạt động ra sao? Thư viện này mang lại bảng mã thống nhất từ thư viện CharSequence, nó biểu thị cho từng emoji và nếu emoji đó chưa có trên thiết bị đã cho thì thư viện sẽ thay thế bằng các thể hiện **EmojiSpan**. Khi hoàn thành công việc đó, EmojiCompat sẽ hiển thị Glyphs lên view.

![](https://cdn-images-1.medium.com/max/1000/1*goBA2HEDIyjvyWm93QLkyw.png)

> **EmojiSpan** là một lớp mới có trên API 26.0.0 (nó là một tiện ích của **ReplacementSpan** mà có thể bạn đã sử dụng trước đó). Khi emoji cần thay thế thành CharSequence, một thể hiện mới được khởi tạo từ lớp cha và được thêm vào trình tự để hiển thị emoji.

## EmojiCompat Components
![](https://developer.android.com/guide/topics/ui/images/look-and-feel/emoji-compat/basic-components.png)
- **Widgets**: Chứa những widget mặc định của Emoji như EmojiTextView, EmojiEditText, EmojiButton. Về cơ bản thì chúng là những triển khai mặc định để Emoji Glyphs hiển thị được.
- **EmojiCompat**:Là thành phần chịu trách nhiệm xử lý tất cả các giao tiếp diễn ra giữa application và các thành phần bên ngoài.
- **Config**: Là thành phần được sử dụng để cấu hình các thông số của mỗi thể hiển của EmojiCompat được tạo thành. Một số cài đặt cho EmojiCompat thông dụng: 
    - **setReplaceAll**: Mặc định EmojiCompat chỉ thay thế nhưng emoji mà nó có thể hiển thị, nhưng với config này thì chúng ta có thể thay thế toàn bộ bằng EmojiSpan.
    - **setEmojiSpanIndicatorEnabled**: Cài đặt này có thể chỉ ra 1 indicator có thể được thay thế bởi emojispan hay không. 
    - **setEmojiSpanIndicatorColor**: Có thể set màu backgound cho emoji
    - ...
- **EmojiSpan**: Một lớp con của **ReplacementSpan** thay thế ký tự và hiển thị Glyph.
- **EmojiCompat Font**: EmojiCompat sử dụng các font để hiển thị các emoji, các font có thể bị thay đổi theo từng version của Android, chính vì vậy EmojiCompat font sẽ cung cấp chính xác các font cần để hiển thị các emoji theo một cách thống nhất.
    - **Bundled fonts** để sử dụng font của APK
  ![](https://images.viblo.asia/7c03c9be-da19-49df-b4eb-73772b2f4eae.png)
    - **Downloadable fonts** để sử dụng font đã được yêu cầu trong thời gian chạy.
  ![](https://images.viblo.asia/a1a2b580-21f4-442b-95e3-605a24a9f526.png)

## EmojiCompat View
Có thể sử dung **EmojiCompat View** để hiển thị Text, Button, EditText bên trong các giao diện màn hình như sau:

![](https://images.viblo.asia/255f0ab5-9f35-4661-ba45-31d29569d98c.png)

Khi ta sử dụng cách trên, view sẽ tự động xử lý các trường hợp để hiển thị emoji, có nghĩa nó là một cách đơn giản để cài đặt hiển thị text cho view và EmojiCompat View sẽ tự động xử lý cho chúng ta. Tuy nhiên trong một số trường hợp bạn không muốn hiển thị các chế độ xem ở trên thì vẫn có thể sử dụng EmojiCompat ở chế độ xem chuẩn:
![](https://images.viblo.asia/6d939683-73ee-4c9d-8b63-888f76691c06.png)

## App Compat Support
**EmojiCompat** hỗ trợ cho việc sử dụng các cài đặt của **App Compat**, bạn chỉ cần thêm phụ thuộc mới để làm việc này
```
compile "com.android.support:support-emoji-appcompat:$version"
```

Sau đó việc sử dụng EmojiCompat sẽ giống như bình thường:
![](https://images.viblo.asia/371d8e20-1678-4255-a751-3133ed2b17e4.png)



-----

Trên đây là một số tìm hiểu của mình về thư viện **EmojiCompat** được Google đưa ra nhằm hỗ trợ các thiết bị cũ trong vấn đề tương thích hiển thị với các thiết bị version cao hơn.

Tham khảo: [Android Develop](https://developer.android.com/guide/topics/ui/look-and-feel/emoji-compat)