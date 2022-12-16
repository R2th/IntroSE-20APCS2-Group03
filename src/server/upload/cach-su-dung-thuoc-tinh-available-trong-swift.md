> Đánh dấu các đoạn code là có sẵn cho mỗi nền tảng hoặc phiên bản là điều cần thiết trong bối cảnh ứng dụng luôn thay đổi và phát triển.Khi có phiên bản Swift mới hoặc phiên bản nền tảng, chúng ta muốn áp dụng nó càng sớm càng tốt. Nếu nó không hỗ trợ cho các phiên bản cũ hơn, chúng ta có thể sử dụng thuộc tính **available** trong Swift.

### 1. Kiểm tra phiên bản hệ điều hành để thực thi code 

Một ví dụ cơ bản về việc kiểm tra một phiên bản hệ điều hành cụ thể để thực thi một đoạn code. 

Ví dụ: nếu bạn chỉ muốn thực thi một đoạn code khi đó là iOS 14 trở lên, bạn sẽ sử dụng thuộc tính **available** như sau:

```
if #available(iOS 14, *) {
    print("This code only runs on iOS 14 and up")
} else {
    print("This code only runs on iOS 13 and lower")
}
```

Bạn cũng có thể sử dụng thuộc tính **available** bên trong câu lệnh guard:

```
guard #available(iOS 14, *) else {
    print("Returning if iOS 13 or lower")
    return
}

print("This code only runs on iOS 14 and up")
```

Điều này rất phù hợp cho các trường hợp bạn chỉ muốn thực thi code cho một phiên bản iOS cụ thể.

### 2. Sự khác biệt giữa @available và #available

Khi điều hướng qua các API Swift, bạn thường sẽ gặp phải thuộc tính **@available.** Chúng ta vừa đề cập đến thuộc tính # tương tự nhưng chỉ khác một chút. Câu trả lời ngắn gọn nhất để mô tả sự khác biệt của nó là:

* **@available** được sử dụng để đánh dấu tính khả dụng cho một class hoặc method
* **#available** được sử dụng để chỉ thực thi một đoạn code cho các nền tảng hoặc phiên bản cụ thể

### 3. Thiết lập tính khả dụng cho một class hoặc method 

Chúng ta có thể chứng minh điều này bằng cách đánh dấu một class hoặc method là có sẵn kể từ iOS 14:

```
@available(iOS 14, *)
final class NewAppIntroduction {
    // ..
}
```

Khi bạn cố gắng tạo một  instance của class này bên trong một dự án hỗ trợ các phiên bản thấp hơn iOS 14, bạn sẽ gặp phải lỗi sau:

![](https://images.viblo.asia/96d21e08-ca7e-4682-9aba-473434f631f0.png)

Như bạn có thể thấy, trình biên dịch sẽ giúp chúng ta khắc phục lỗi này với một số gợi ý. Hai trong số nó sẽ chuyển vấn đề sang một vị trí khác trong code của bạn bằng cách đánh dấu class gọi là khả dụng kể từ iOS 14. **#available** sẽ giúp chúng ta trong trường hợp này:

```
if #available(iOS 14, *) {
    let appIntroduction = NewAppIntroduction()
} else {
    // .. use the old app introduction
}
```

Chúng ta có thể làm giống hệt như vậy đối với các method sử dụng thuộc tính **@available**:

```
@available(iOS 14, *)
func launchNewAppIntroduction() {
    let appIntroduction = NewAppIntroduction()
}
```

### 4. Các giá trị có thể có cho thuộc tính available

Trong các ví dụ trên, chúng ta chỉ sử dụng để kiểm tra iOS 14. Tuy nhiên, chúng ta có thể làm được nhiều việc hơn nữa với thuộc tính **available** trong Swift.

Rõ ràng, chúng ta có thể thay thế số 14 bằng bất kỳ phiên bản hệ điều hành nào có sẵn. Nền tảng, trong trường hợp này là iOS, cũng có thể được thay thế. Danh sách các thuộc tính có sẵn cho đến ngày hôm nay như sau:

* iOS
* iOSApplicationExtension
* macOS
* macOSApplicationExtension
* macCatalyst
* macCatalystApplicationExtension
* watchOS
* watchOSApplicationExtension
* tvOS
* tvOSApplicationExtension
* swift

Các tùy chọn bao gồm các nền tảng cũng như từ khoá `swift` để đánh dấu các đoạn code là có sẵn kể từ một phiên bản Swift cụ thể.

Dấu hoa thị cho biết tính khả dụng của khai báo trên tất cả các tên nền tảng được liệt kê ở trên, trừ khi được chỉ định cụ thể. Bạn cũng có thể chỉ định nhiều nền tảng cùng một lúc nếu được yêu cầu:

```
@available(iOS 14, macOS 11.0, *)
func launchNewAppIntroduction() {
    let appIntroduction = NewAppIntroduction()
}
```

### 5. Đánh dấu một method là không được dùng hoặc bị loại bỏ 

Một giá trị thuộc tính khác được sử dụng để đánh dấu các phương thức là không được dùng nữa hoặc bị loại bỏ. Các method bắt đầu không được dùng nữa và cuối cùng sẽ được đánh dấu là bị loại bỏ. Hãy tưởng tượng có một ứng dụng trong đó phần giới thiệu ứng dụng sẽ không còn được hiển thị trên iOS 14 trở lên. Bạn có thể đánh dấu method cụ thể nếu nó được sử dụng từ SDK là không dùng được nữa và bị loại bỏ như sau:

```
@available(iOS, deprecated: 12, obsoleted: 13, message: "We no longer show an app introduction on iOS 14 and up")
func launchAppIntroduction() {
    // ..
}
```

Khi triển khai code, họ sẽ gặp phải lỗi sau:

![](https://images.viblo.asia/7134bd34-5223-4617-afab-a8749b3cc9d9.png)


Việc đánh số phiên bản khi sử dụng các giá trị này thường gây nhầm lẫn. Trong ví dụ code ở trên, bạn có thể nghĩ rằng method này không dùng nữa trên iOS 12 và bị loại bỏ trong iOS 13. Tuy nhiên, nó được đọc theo cách khác:

* Phương pháp này không được dùng trong các phiên bản cao hơn X 
* Phương pháp này bị loại bỏ trong các phiên bản cao hơn X

Thông báo được sử dụng để mô tả lý do và có thể hữu ích để giải thích thay đổi cho những người triển khai.

### 6. Đánh dấu một method là đã đổi tên

Khi phát triển SDK cho open-source hoặc người dùng khác, bạn có thể muốn chuyển người triển khai sang các method code mới hơn của mình. Trong những trường hợp này, bạn có thể sử dụng thuộc tính đã đổi tên:

```
@available(*, unavailable, renamed: "launchOnboarding")
func launchAppIntroduction() {
    // Old implementation
}

func launchOnboarding() {
    // New implementation
}
```

Lưu ý rằng trước tiên chúng ta đánh dấu một method là không khả dụng. Giá trị được đổi tên cho biết method nào nên được sử dụng để thay thế.

Xcode sẽ giúp người triển khai một cách độc đáo bằng cách hiển thị tùy chọn sửa lỗi cho việc đổi tên của chúng ta:

![](https://images.viblo.asia/95ba00c0-3b23-40c7-b0f8-a1d9c3df138f.png)

### 7. Câu lệnh phủ định sẵn có 

Một câu hỏi thường gặp khi làm việc với thuộc tính **available** là phủ định câu lệnh và viết code như là: "Chỉ chạy điều này nếu phiên bản iOS thấp hơn X". 

Việc này sẽ được thực hiện như sau: 

```
if #available(iOS 14, *) { } else {
    // Run iOS 13 and lower code.
}
```

### 8. Kết luận 

Chúng ta đã đề cập đến tất cả các khả năng sử dụng thuộc tính **available** trong Swift. Bạn có thể chạy code cho các phiên bản Swift và nền tảng cụ thể và giờ đây bạn có thể đánh dấu các method là không dùng nữa, bị loại bỏ hoặc đã được đổi tên.

 Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn 😍.

Vậy là bài viết của mình đến đây là hết 😁. Cảm ơn các bạn đã theo dõi bài viết. 😃