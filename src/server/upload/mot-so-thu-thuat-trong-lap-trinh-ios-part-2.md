Xin chào tất cả các bạn, một tháng trôi qua nhanh quá, dù muốn hay không thì tôi lại quay trở lại với các bạn đây 😅, và sau đây sẽ là phần tiếp theo của loạt bài viết về [Một số thủ thuật trong lập trình iOS](https://viblo.asia/p/mot-so-thu-thuat-trong-lap-trinh-ios-part-1-maGK7jqO5j2)

## 1. Mở Terminal của project bằng Xcode Keyboard Shortcut
Bạn có biết rằng chúng ta có thể mở Terminal bằng Xcode tại đường dẫn của thư mục thông qua một cái gọi là custom keyboard shortcut? Đầu tiên, ta cần tạo một file script trong project bằng cách chọn File -> New -> File -> Shell Script rồi thêm dòng code sau vào file vừa tạo:

```
#!/bin/sh
open -a Terminal .
```

Bây giờ chúng ta mở terminal và chạy câu lệnh sau để tạo file thực thi:
```

chmod +x Script.sh

```

Sau đó mở Xcode ***Preferences*** và chọn tab ***Behaviors***. Chọn dấu '+' để thêm một *custom behavior*, và ở phía bên tay phải, check vào Run và chọn Choose script để chọn đến script vừa tạo ở các bước trước.

![](https://images.viblo.asia/ffbcbad6-0946-4210-8542-6d829119c90f.png)

Click vào biểu tượng ⌘ nằm bên cạnh custom behavior vừa tạo để cài đặt phím tắt. Tôi thường sử dụng tổ hợp phím `⌃ + ⌘ + T` để mở Terminal. (Chú thích: ⌘ = Command key, ⌃ = Control key, ⌥ = Option (alt) key, ⇧ = Shift key)

## 2. Clear Derived Data sử dụng Xcode Keyboard Shortcut

Hoàn toàn tương tự như các bước đã nêu ở trên, chúng ta có thể tạo một keyboard shortcut để thực thi các câu lệnh xóa derivedData bằng cách thêm các câu lệnh sau vào script:

```
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -frd ~/Library/Caches/com.apple.dt.Xcode/*
```

## 3. NSDoubleLocalizedStrings (Test Internationalization)
Chúng ta có thể sử dụng `NSDoubleLocalizedStrings` như một tham số khởi chạy (*launch argument*) để nhân đôi độ dài của tất các các NSLocalizedStrings, đây là một cách khá hay để test UI.

![](https://images.viblo.asia/ceb1d028-c034-4b66-836a-dea0da3e1cb6.png)

Và đây là kết quả:

![](https://images.viblo.asia/2d525687-275e-474b-81f9-dc1aef33a652.png)

## 4. Cài đặt UserDefault thông qua Launch Argument
Đây là một trong những tính năng ẩn cực hay của UserDefaults. Nếu chúng ta truyền một giá trị vào UserDefault bằng cách sử dụng *launch argument* nó tương tự như cách mà chúng ta set giá trị mới cho key ấy. Vù vậy chúng ta có thể dụng trick này để ghi đè giá trị hiện tại của User Default ấy, sẽ là rất hữu dụng trong việc debug:

![](https://images.viblo.asia/af685258-b6ef-4dbe-a181-6559f1ca8f73.png)

Và sau đây là kết quả:

![](https://images.viblo.asia/8550d303-1dd0-4820-a599-7aeca1497e1d.png)

## 5. Truy cập thư mục Document của ứng dụng thông qua app Files (Tệp)
Kể từ iOS 11 trở đi, nếu chúng ta cài đặt giá trị của *LSSupportsOpeningDocumentsInPlace* thành YES và *UIFileSharingEnabled* thành YES trong file *Info.plist*, thì người dùng có thể truy cập vào thư mục Documents của ứng dụng thông qua ứng dụng Files của Apple (tên tiếng Việt là Tệp).

```
<key>LSSupportsOpeningDocumentsInPlace</key>
<true/>
<key>UIFileSharingEnabled</key>
<true/>
```

Mở ứng dụng Files của Apple, chúng ta sẽ thu được kết quả như sau:

![](https://images.viblo.asia/47367663-deaf-4666-b2ab-c76db969041e.png)

## 6. Quick Jump đến một dòng nào đó trong Xcode file
Chắc hẳn không ít bạn đã biết đến tổ hợp phím `command + shift + o` sử dụng trong Xcode, dùng để mở một dialog có tên gọi "Open quickly", nơi mà chúng ta có thể di chuyển đến ngay file có tên chứa từ khóa nhập vào. Tuy nhiên, tôi sẽ bật mí với các bạn một điều nữa là chúng ta có thể jump thẳng đến một dòng bất kì của file đấy bằng cách thêm dòng cần đến đằng sau dấu hai chấm. Như sau, AppDelegate:44.

![](https://images.viblo.asia/db57967a-f554-4976-a1e4-f5e55628c42f.png)

Hãy thử xem, các bạn sẽ thấy sự kì diệu 😎

## 7. Where to Open a File
Trong Xcode, bạn có thể mở một file bằng rất nhiều cách, bạn có thể mở một file trong standard editor, hoặc mở trong assistant editor, hay mở trong tab mới hoặc tab hiện tại, hoặc thậm chí là trong một cửa sổ mới. Sau đây là cách mà chúng ta lựa chọn: Nhấn giữ tổ hợp phím ` ⇧ + ⌥ + ⌘` (Shilf + Option + Cmd) rồi click chuột vào file cần mở, một dialog như sau sẽ hiện ra để chúng ta lựa chọn.

![](https://images.viblo.asia/6b1befb5-97f8-4083-8c6e-90002b355774.png)

Tùy các lựa chọn mà các file sẽ hiển thị ở các vị trí khác nhau trong trình edit:

![](https://images.viblo.asia/09f06d4b-bce8-4bf7-a30c-0cf761dab838.png)


## 8. Git Blame
Nếu đang làm việc với Git, đã bao giờ bạn muốn tìm xem kẻ nào đã gây ra những dòng code đầy tội lỗi? =)) Đặt con trỏ chuột vào dòng code nghi vấn, chuột phải và chọn *Show Last Change For Line*.

![](https://images.viblo.asia/335613c8-eeba-4200-9c94-7b13d79ecb0f.png)

![](https://images.viblo.asia/ed935462-9bce-4729-b86f-3eeb1ec169f7.png)