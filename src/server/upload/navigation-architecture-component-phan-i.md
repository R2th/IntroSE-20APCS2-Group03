# I, Giới thiệu
- XIn chào mọi người lại là mình đây. Trong bài viết lần này mình sẽ cùng mọi người tìm hiểu seri về navigation - 1 trong các component của architecture component.
- Không giới thiệu dài dòng nữa. Chúng ta hãy đi vào phần I, giới thiệu cơ bản về Navigation.
- Các bạn có thể nghĩ nó không quan trọng nhưng hãy tìm hiểu kỹ càng về Navigation được Google thực hiện chính xác theo các nguyên tắc cơ bản đó.

## II, Tổng quan
1. **Navigation là gì ?**

- Navigation là thành phần cung cấp việc tương tác, cho phép chúng ta điều hướng các thành phần trong ứng dụng.
- Để thực hiện navigation đơn giản, Android đã cung cấp 1 đối tượng là **Navigation component** trong Android Jetpack giúp implement đơn giản.
- Trong navigation chúng ta cũng sẽ có 1 khái niệm nữa chính là **destination**. Vậy **destination** là gì ?
- **Destination** là một phần nhỏ của UI. **Fragment** là 1 trong những tiêu biểu của **destination** trong mỗi screen của app.

2. **Thành phần của Navigation component**

- Navigation component gồm 3 thành phần chính:
- **Navigation graph**: Là 1 file XML trong thư mục res/navigation. Nó chứ tất cả thông tin về việc điều hướng của các destination.
- **NavHost**: Là 1 empty container, là nơi hiển thị các destination được khai báo trong navigation graph.
- **NavController**: Là đối tượng quản lý việc điều hướng trong NavHost. Mỗi NavHost lại có 1 NavController để quản lý việc điều hướng trong nó.
3. **Lợi ích của Navigation component**

- Có nhiều lợi ích của Navigation component đem lại đó là:
- Xử lý fragment transactions.
- Xử lý nút **up** và **back** theo đúng nguyên lý của navigation.
- Cung cấp nguồn resource chuẩn dành cho animation và transaction.
- Thực hiện và xử lý deep link.
- Hộ trợ kết hợp với các component như Drawer, Bottom Navigation, Action Bar.
- **Safe args**: là 1 plugin cung cấp type safe khi điều hướng và truyền data giữa các destinaiton.

# III, Nguyên lý của Navigation
* Phần này cũng khá là quan trọng nhưng mọi người thường hay không để ý.
* Nếu bạn thực hiện navigation ở mức nông thì dường như không liên quan nhưng deep sâu hơn thì bạn sẽ gặp nhưng case mà chỉ khi bạn nhớ các nguyên lý này thì mới có thể giải thích được.
* Dẫu sao thì mức developer của chúng ta vẫn chưa thể can thiệp quá sâu vào một library mới như Navigation component.
* Dưới đây là các nguyên lý của nó.
1. **Fixed start destination**
* Theo nguyên lý này, tất cả các app đều phải có 1 start destination cố định.
* Đây là màn hình đầu tiên khi user nhìn lúc họ mở app từ launcher.
* Đây còn là màn hình cuối cùng user nhìn thấy khi họ muốn trở về launcher khi ấn nút **back**.
2. **Navigation state được thể hiện là 1 stack các destination**
* Khi app được chạy, 1 Task mới sẽ được tạo ra và nó sẽ hiển thị start destination.
* Start destination trở thành destination đầu tiên trong back stack.
* Khi user điều hướng, top của back stack là screen hiện tại.
* Mỗi lần user start 1 destination, thì destination đó sẽ được đưa lên top của back stack.
* Start destination luôn nằm ở đáy của back stack.
* Bạn tương tác với back stack là tương tác với top destination của back stack đó: 
    * **push**: đưa 1 destination mới lên top. 
    * **pop**: loại bỏ top destination khỏi back stack.
3. **Up và back có chức năng tương đương trong app task**
![](https://images.viblo.asia/5f03e76a-e688-4305-a3dc-dfa7113b8282.png)
* Nếu bạn làm việc với android mà vẫn chưa biết 2 nút này thì trên là hình ảnh của 2 nút theo thứ tự là **up** (thường xuất hiện trên ActionBar) và **back** (xuất hiện ở **navigation bar** - thanh điều hướng).
* Không cần giải thích hơn nữa chính tiêu đề đã nói lên hết nội dung của nguyên lý.
4. **Up button không bao giờ exit app**
* Nếu user đang ở start destination, up button sẽ bị ẩn đi vì nó không được exit app. Back button thì vẫn exit app bình thường.
5. **Deep linking mô phỏng navigation** 
* Khi deep link hoặc việc điều hướng tới 1 destination, bạn có thể sử up button để trở lại các destination trước.
* Khi deep link tới 1 destination trong app task của bạn, bất cứ back stack đang tồn tại nào của app task cũng bị remove và bị thay thế bởi back stack của deep link.
# IV, Tổng kết
* Có khá nhiều lý thuyết để nhớ với Navigation.
* Hi vọng mình có thể giúp cho mọi người hiểu thêm phần nào về nó,
* Trong phần tiếp theo mình sẽ cố gắng đưa ra các ví dụ trực quan để implement navigation.
* **Happy coding !**