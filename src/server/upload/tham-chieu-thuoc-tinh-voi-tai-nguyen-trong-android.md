Như chúng ta đã biết android sử dụng các tệp XML để xây dựng giao diện, việc sử dụng XML của android khá đơn giản. Hầu hết khi bắt đầu học android chúng ta thường chỉ học qua chứ không đào sâu đến nó, qua bài viết này chúng ta hãy cùng khám phá những vấn đề đó:

**1.  tham chiếu ? và @ trong xml**

có nhiều cách để tham chiếu trong xml, điển hình có 2 cách sau:

```
    android:textColor="@color/colorPrimary"
    android:textColor="?android:attr/colorPrimary" 
```

2 cách tham chiếu trên khác nhau ở chỗ :
    
* @ dùng để tham chiếu tài nguyên thực tế. hãy nghĩ về nó đang được gọi theo giá trị ví dụ như:  `@ color / colorPrimary` trỏ đến dòng `<color name = "colorPrimary"> # 333333 </ color>` trong res / values / color.xml. Hầu hết các tham chiếu trong XML thuộc loại này.
*  ? dùng để tham chiếu đến thuộc tính style , giá trị tài nguyên thực tế được chỉ ra bởi thuộc tính trong style phụ thuộc vào theme hiện tại. Vì vậy nó cũng giống như cách java gọi đến tham chiếu. Ưu điểm của cách này là chúng ta có thể tự thay chúng mà không cần sửa đổi trong xml. Ví dụ như: `?attr/colorPrimary` nó sẽ gọi đến ` <item name="colorPrimary">@color/colorPrimary</item>` trong res/values/style.xm.

Cú pháp để tham chiếu của @ với ? trong xml là:
* `@[package:]type/name`
    * package (tùy chọn) là tên package của tài nguyên . giá trị mặc định là tên của tài nguyên.
    * type là một trong những loại  color, string, dimen, layout, anim...
    * name là tên tài nguyên thực tế
*  `?[package:]type/name`
    *  package (tùy chọn) là tên package của tài nguyên . gía trị mặc định là tên của tài nguyên.
    *  type (tùy chọn) luôn luôn là attr khi tham chiếu thuộc tính. Đó là lí do nó là tùy chọn
    *  name tên tài nguyên thực tế

**2. Attribute Namespaces**

bạn có biết sự khác nhau giữa android:attribute, app:attribute và tools:attribute?

câu trả lời là android:attribute, app:attribute and tools:attribute là namespace của thuộc tính và tùy thuộc vào namespace bạn muốn sử dụng, bạn có thể khai báo namespace (xmlns) trong root view.
 ```
xmlns:android="http://schemas.android.com/apk/res/android" 
xmlns:app="http://schemas.android.com/apk/res-auto" 
xmlns:tools="http://schemas.android.com/tools" 
```
các thành phần trong namespace:
* android: bao gồm tất cả các thuộc tính được cung cấp bởi hệ thống android
* app: bao gồm các thuộc tính cung cấp bởi app hoặc thư viện sử dụng trong app. Đó là lí do tại sao thuộc tính của AppCompat đươc khai báo bởi namespace app. Bạn cũng có thể dễ dàng tạo ra thuộc tính sử dụng namespace app khi sử dụng dâta binding hoặc custom view
* tools: cung cấp các thuộc tính trong thời gian thiết kế. Vì hầu hết view được điền dữ liệu động trong khi ứng dụng chạy, android studio cũng không thể hiển thị bố cục trông như thế nào khi đang chạy . Tools cung cấp các thuộc tính có thể xác định các đặc điểm bố cục chỉ hiển thị trong bản xem trước bố cục của Android Studio.Khi bạn tạo ứng dụng, công cụ xây dựng sẽ xóa các thuộc tính này để không ảnh hưởng đến kích thước APK hoặc thời gian chạy ứng dụng của bạn.

**3.Include & Merge tags**
 
Một trong những tính năng được đánh giá thấp của Android XML là khả năng tái sử dụng các thành phần bố cục. Các thành phần chung có thể được tách ra thành tệp XML của riêng chúng và có thể được bao gồm với `<include layout = "@ layout / component" />` Titlebar là thành phần phổ biến nhất được phân tách thành bố cục riêng của nó. Các thành phần khác như float button hoặc thanh điều hướng bên dưới cũng có thể được tách ra. Các thẻ include làm cho mô đun này có thể thực hiện điều đó.

Nhưng một vấn đề với thẻ include là nếu bạn muốn tách nhiều hơn một view  thành một tệp XML duy nhất, bạn sẽ phải bọc chúng với một view gốc.View gốc này không phục vụ mục đích thực nào khác ngoài việc làm chậm hiệu suất giao diện người dùng của bạn, do nó làm tăng chiều sâu trong hệ thống view. Thẻ ` <merge> </ merge> `có thể được sử dụng như một view gốc trong các trường hợp như này và khi chạy trình biên dịch tự động loại bỏ nó.