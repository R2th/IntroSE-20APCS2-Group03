> Fileprivate và private là một phần của các công cụ sửa đổi kiểm soát quyền truy cập trong Swift. Các từ khóa này có thể hạn chế quyền truy cập vào các phần code của bạn từ code trong các tệp nguồn và modul khác. Cấp độ truy cập private là cấp thấp nhất và hạn chế nhất trong khi truy cập mở là cấp cao nhất và ít hạn chế nhất. Trong bài viết này mình sẽ giải thích sự khác nhau giữa fileprivate và private

### 1. Khi nào thì nên sử dụng fileprivate

Mặc dù các từ khóa gần như giống nhau, nhưng có sự khác biệt rõ ràng trong các trường hợp sử dụng chúng. Quyền truy cập Fileprivate hạn chế việc sử dụng một entity trong cùng một tệp nguồn được xác định. Lý do duy nhất bạn sử dụng fileprivate là khi bạn muốn truy cập code của mình trong cùng một tệp từ các class hoặc struct khác nhau.

 Trong ví dụ sau, chúng ta có một` ImageProvider` và một `ImageViewController`. Chúng ta có thể sử dụng fileprivate nếu chúng được xác định trong cùng một tệp và chúng ta muốn cho phép truy cập vào image view từ `ImageProvider`

```
final class ImageViewController: UIViewController {

    fileprivate var imageView: UIImageView!

}

struct ImageProvider {

    let newImage: UIImage

    func updateImage(in viewController: ImageViewController) {
        // As we used fileprivate, we can now access the imageView property.
        viewController.imageView.image = newImage
    }
}
```

Tuy nhiên, nếu chúng ta tạo một file riêng biệt cho struct `ImageProvider`, chúng ta sẽ gặp lỗi trình biên dịch

![](https://images.viblo.asia/bd9fa88b-3834-4e15-b30e-4a72c937e4cd.png)

Theo ý kiến của mình, điều này làm cho nó trở thành một trường hợp sử dụng trong phạm vi nhỏ vì cấu trúc dự án của bạn thường xác định các entity trong file của chính chúng. Nếu bạn tự hỏi : “Khi nào thì sử dụng fileprivate”, hãy nghĩ về từ “file” trong fileprivate, dùng để chỉ “quyền truy cập riêng tư trong chính file đó”.

### 2. Khi nào thì sử dụng private

Từ khóa private được sử dụng nhiều hơn và hạn chế việc sử dụng một entity cho khai báo kèm theo và các phần extensions của nó. Tuy nhiên, các phần extension phải được xác định trong cùng một file. Nói cách khác, các khai báo private sẽ không hiển thị bên ngoài file. Bạn có thể sử dụng từ khóa này để chỉ hiển thị code tối thiểu cần thiết để tương tác với entity. Điều này sẽ cải thiện khả năng đọc và giúp người khác sử dụng và hiểu code của bạn dễ dàng hơn.

### 3. Fileprivate so với private

Để giải thích sự khác biệt này bằng cách mình lấy ví dụ về struct `ImageProvider`. Được khai báo trong cùng một file, chúng sẽ dẫn đến lỗi trình biên dịch như sau:

![](https://images.viblo.asia/a24daf33-6868-441c-a3fb-79173f242581.png)


Như bạn có thể thấy, image view được khai báo fileprivate có thể truy cập được trong cùng một file. Tuy nhiên, private image view không thể truy cập được vì nó chỉ hiển thị trong chính entity. Một extension cho `ImageViewController` sẽ có quyền truy cập vào image view được khai báo private này:

```
extension ImageViewController {
    func updateImage(_ newImage: UIImage) {
        privateImageView.image = newImage
        filePrivateImageView.image = newImage
    }
}
```

### 4. Xác định cấp độ truy cập chỉ cho set

Trong một số trường hợp, bạn có thể chỉ muốn xác định quyền truy cập vào bộ thiết lập thuộc tính. Điều này có thể hữu ích nếu bạn đã xác định các công cụ sửa đổi trong chính file đó. Cách làm như sau:

```
class ImageViewController: UIViewController {

    fileprivate(set) var filePrivateSetterImageView: UIImageView = UIImageView()
}
```

Các `filePrivateSetterImageView` bây giờ có thể được truy cập từ bất kỳ file và bất kỳ trường hợp nào, nhưng nó set là chỉ để truy cập từ bên trong file riêng của mình. Đây có thể là một sự linh hoạt tuyệt vời khi làm việc với các cấp độ truy cập và hoạt động với bất kỳ từ khóa cấp độ truy cập nào.

### 5. Kết luận

Trừ khi bạn đang xác định một số trường hợp trong một file, bạn sẽ không sử dụng file riêng tư thường xuyên. Từ khóa mô tả chính nó khá rõ ràng ở chỗ cấp độ truy cập của nó được liên kết với file được định nghĩa trong đó. Việc xác định các method và thuộc tính là private thường được thực hiện nhiều hơn và cho phép bạn chỉ hiển thị code được phép sử dụng từ bên ngoài instance.

Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn 😍.

Vậy là bài viết của mình đến đây là hết 😁. Cảm ơn các bạn đã theo dõi bài viết. 😃