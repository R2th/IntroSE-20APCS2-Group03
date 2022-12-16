Hiện tại việc lắng nghe sự kiện back từ device Android chỉ được thực hiện ở Activity bằng cách override hàm onBackPressed() và implement các phương thức cần thiết. Vậy còn Fragment thì sao? Chúng ta không thể sử dụng cùng phương thức như ở Activity vì đơn giản là không có hàm đó để cho chúng ta override :). Vậy làm cách nào để lắng nghe sự kiện back từ hệ thống, cách làm hay sử dụng nhất là phương pháp dưới đây
```kotlin
requireActivity().onBackPressedDispatcher.addCallback(this) {
    // Thực hiện implement các chức năng khi có sự kiện back
}
```

Cách làm này có thể lắng nghe sự kiện back khi user nhấn nút back trên device tại các Fragment đang trực tiếp tương tác với user, nhưng ở một số device có firmware thấp có thể không có tác dụng và không nhận được sự kiện back. Và nếu Activity chứa Fragment này cùng lắng nghe sự kiện onBackPressed() thì sẽ dễ dẫn đến xung đột và code sẽ khó quản lý. 

Với những vấn đề trên, ở bài viết này xin giới thiệu một phương pháp lắng nghe hiệu quả sự kiện onBackPressed() tránh được một số vấn đề về thiết bị, xung đột khi cùng lắng nghe sự kiện này.

Đầu tiên, chúng ta có thể thấy rằng việc code ứng dụng Andoird hiện nay thường dựa trên các mô hình Framework như MVP, MVVM, Clean Architect... Chúng ta đều xây dựng được các BaseActivity, BaseFragment... để implement các đặc tính chung.

Chúng ta sẽ tạo ra lớp BaseFragment mà có hàm onBackPressed() để lắng nghe các sự kiện back khi cần, nếu Fragment nào cần xử lý sự kiện này chỉ cần override lại. Hàm có nội dung như dưới đây
```kotlin
abstract class BaseFragment : Fragment() {
    open fun onBackPressed(): Boolean {
        return false
    }
}
```
Việc return về một giá trị Boolean để báo hiệu cho biết là Fragment đó có quản lý sự kiện onBackPressed() hay không. Chúng ta sẽ thấy được ý nghĩa của nó ở hàm bên dưới.

Như phần đầu bài viết đã nói trong Fragment không có phương thức onBackPressed() để override, vậy chúng ta lắng nghe sự kiện này từ đâu? Câu trả lời là từ chính Activity chứa các Fragment này. Và sau đây là cách chúng ta lắng nghe sự kiện back từ Activity và truyền về cho Fragment.

```kotlin
override fun onBackPressed() {
    try {
        var handled = false // 1
        supportFragmentManager.fragments.forEach { fragment ->
            if (fragment is NavHostFragment) {
                fragment.childFragmentManager.fragments.forEach { childFragment -> //2
                    if (childFragment is BaseFragment) { // 3
                        handled = childFragment.onBackPressed() // 4
                        if (handled) { //5
                            return
                        }
                    }
                }
            }
        }

        if (!handled) { //6
            super.onBackPressed()
        }
    } catch (e: Exception) {
        super.onBackPressed()
    }
}
```
Ta có thể hiểu được hàm trên qua thứ tự thực hiện các bước như sau:
1. Tạo biến handled để giúp xác nhận là có Fragment cần xử lý sự kiện onBackPressed hay không
2. Chạy lần lượt qua các Fragment mà Activity này quản lý
3. Kiểm tra Fragment đang có có phải là con của BaseFragment hay không
4. Nếu là con của BaseFragment thì gọi hàm onBackPressed của Fragment. Chính tại dòng này sẽ giúp gọi thực thi các chức năng cần thiết khi user nhấn Back ở Fragment đó. Nếu có override lại hàm onBackPressed trong Fragment thì trả về giá trị true, ngược lại trả về giá trị false mặc định.
5. Nếu Fragment có handle việc xử lý sự kiện Back thì không cần Activity xử lý nữa, return thoát khỏi hàm điều này tránh phải việc xung đột khi có nhiều bên cùng lắng nghe sự kiện Back.
6. Nếu không có Fragment nào xử lý sự kiện Back, sử dụng sự kiện Back của Activity

Dựa trên việc cài đặt này sẽ giúp chúng ta dễ dàng quản lý việc nhấn Back từ device, giúp tránh được các vấn đề phát sinh. Hy vọng mọi người có thể có nhiều cách hay hơn. Bài viết đến đây xin kết thúc :man_dancing::man_dancing::man_dancing: