Một trường hợp gây cảm giác khá bất tiện khi chúng ta có nhiều class với cùng tên nhưng khác package. Chỉ duy nhất 1 class sẽ được hỗ trợ import cho bạn. Các class cùng tên khác nếu muốn dùng thì sẽ phải gõ đầy đủ tham chiếu package của nó. Điều này làm cho code nhìn khá là dài dòng cũng như mất thêm nhiều thời gian.

Kotlin cung cấp key **alias** để giải quyết vấn đề này. Bản chất, alias sẽ cung cấp một tên thay thế cho 1 tham chiếu đến class của bạn. Như trường hợp trên, thay vì gõ cả đoạn package thì ta chỉ dùng 1 tên thay thế đã định nghĩa một cách ngắn gọn hơn.

```
typealias PresenterUtils =
            com.dattien.demo.presenter.utils.Utils
```

Ở ví dụ trên ta đã định nghĩa cho class **Utils** tại package **com.dattien.demo.presenter.utils** với tên là **PresenterUtils**.

Từ nay chỉ cần gọi **PresenterUtils** mà không cần gõ đoạn tham chiếu dài dòng kia mà vẫn không bị conflic với các class utils ở các tầng khác như 
**com.dattien.demo.domain.utils.Utils** hay **com.dattien.demo.data.utils.Utils**

```
Lưu ý là các đoạn def với alias được đặt ở mọi file trong project nhưng phải ở bên ngoài class
```

Một số ví dụ khác
```
typealias MapIntToList = HashMap<Int, List<String>>
```

và sử dụng như sau:

```
val map = MapIntToList()
```

Alias cho các inner class và interface
```
class DemoClass {
    interface ViewHolderCallback

    inner class CustomViewHolder
}
typealias ViewHolderCallbackInner = com.dattien.demo.presenter.DemoClass.ViewHolderCallback

typealias CustomViewHolderInner = com.dattien.demo.presenter.DemoClass.CustomViewHolder
```

Phân biệt các resource 

```
typealias AndroidColors = android.R.color
typealias ProjectColors = R.color
ContextCompat.getColor(this, ProjectColors.colorPrimary)
ContextCompat.getColor(this, AndroidColors.black)
```

Bài viết này khá ngắn gọn vậy thôi. Hy vọng với tip này có thể giúp ích phần nhỏ cho việc code của các bạn thuận tiện hơn. Happy coding !