Có lẽ tất cả các bạn developer ít nhất đều đã từng trải qua cảm giác này khi bắt đầu một dự án hoàn toàn mới đối với mình cùng với một bản base đã được xây dựng khá đầy đủ và hoàn chỉnh. Đó là cảm giác vô cùng bối rối (okay), đặc biệt là đối với những bạn fresher, vì vậy mục đích của bài viết này đó là cung cấp cho các bạn một số gợi ý hữu ích để có thể bình tĩnh tiếp cận với nhưng thứ mới mẻ này.

## Hãy hỏi thật nhiều
Đối với nhưng dự án đã không còn trong giai đoạn mới phát triển có nghĩa là khối lượng công việc và tính năng của dự án đã khá hoàn thiện, một tay mơ không thể đọc code không là có thể hiểu được toàn bộ dự án, chính vì vậy hãy đặt ra các câu hỏi cần thiết cho việc nghiên cứu code dự án. Tuy nhiên bạn phải hỏi những gì ?

### Mô hình code (architectural pattern)
Đây chắc là câu hỏi đầu đầu tiên nên được đặt ra. MVP, MVVM hay bất cứ một mô hình nào được quyết định sử dụng trong dự án. Đôi khi thậm chí còn remix pattern (cry), cái được dùng chỗ này, cái được dùng chỗ khác.  Đôi khi dự án chẳng sử dụng một mô hình nào cả, hay sử dụng một mô hình mà bạn cho rằng lỗi thời, khó sử dụng. Hãy hỏi để có thể sau này bạn sẽ phải code, cần chuẩn bị để dự án không còn sinh thêm 1 cái pattern mới nào khác nữa. Lời khuyên tốt nhất tôi có thể nói với các bạn là hãy cố làm quen với mô hình dự án đó (cry)

### Các “di sản” bạn sẽ phải kế thừa
Đó là những đoạn code (may thì là các class Helper, Utils...., “đen” thì dính cả thư viện hay framework đã cũ nào đó …) được việt từ rất lâu bởi một ai đó (có thể không rõ danh tính) không còn làm ở dự án nữa. Nhìn chung thì các “di sản” này đều rất “lớn”,”phức tạp”,”khó đọc”,”designed cũ”,”deprecated...” và không thể hiểu hết được cách hoạt động chi tiết của chúng. Hãy hỏi những người rõ về nó để hiểu được cách chúng kết nối với các thành phần khác trong toàn dự án. Rất có thể sau này bạn sẽ phải kế thừa những di sản này và viết tiếp chúng (yaoming)

### Các thư viện được sử dụng trong dự án
Bạn có thể tìm nó trong project, tuy nhiên hỏi thì cũng không sao :v Nắm rõ được các thư viện được sử dụng trong dự án thì bạn sẽ tận dụng được các chức năng mà thư viện sẵn có đã cung cấp. Ta chỉ cần tìm tài liệu về các thư viện đó để nghiên cứu, và nắm được mục đích của thư viện đó trong project là như thế nào

## Một số hotkey trên AndroidStudio hỗ trợ việc vọc code

### Cấu trúc thư mục
Nếu một dự án có cấu trúc tốt thì AS cũng sẽ cho ta giao diện trực quan dễ quản lí và gọn gàng. Càng nhiều thư mục thì cấu trúc dự án càng chi tiết, cụ thể.
![](https://images.viblo.asia/ba072d4b-30e9-4b5e-88ec-2a125f67d345.png)

Tuy nhiên không phải lúc nào đời cũng như mơ. 
![](https://images.viblo.asia/bbfa6c99-dd29-49a8-8d2c-8c1d891db86b.png)

Sử dụng hotkey để làm quen với việc di chuyển các class, thư mục một cách chuyên nghiệp và nhanh chóng.

| Function | macOS | Windows |
| -------- | -------- | -------- |
| Open a class     | cmd + o     | ctrl + n     |
| Open a file      | cmd + shift + o     | ctrl + shift + n    |
| Open a symbol    |cmd + alt + o      | alt + shift + n    |


### Layout Inspector
![](https://images.viblo.asia/0d4b1ace-aef7-45f4-8384-0e1657aa2281.png)

Một công cụ hữu ích của Android Studio. Layout Inspector giúp ta kiểm tra những view nào đang hiển thị trên device (hay emulator). Click Tools > Android > Layout Inspector sau đó chọn sẽ kiểm tra màn hình nào.
Nhìn vào cây view thì bạn có thể hiểu được thứ tự hiển thị các component trên view và các properties của view đó. Một vài field hay được lưu ý đó là IDs, width, height, visibility…
![](https://images.viblo.asia/cd53f334-b79c-45d1-9ead-3cd7db7d052d.png)
Ví dụ từ IDs hay string resource IDs, bạn có thể trace ra đoạn code xử lí và thao tác với view đó, hoặc nội dung string resource. “Find in Path” là chức năng hữu dụng để tìm kiểm những phần cài đặt này.
| Function | macOS | Windows |
| -------- | -------- | -------- |
| Find in Path     | cmd + shift + f     | ctrl + shift + f     |

### Bookmarks
Bookmarks vô cùng hữu ích khi đọc code mới, khi ta phải trace một chuỗi code dài và được khai báo ở các file khác nhau hay khoanh vùng khu vực xảy ra bug thì bookmark giúp bạn theo dõi được các điểm mốc (point) mà bạn đã đánh dấu ( vì nghĩ là nơi xảy ra bug hoặc là nơi code xử lí sẽ đi qua). Bạn có thể quay lại xem đoạn code này trong danh sách bookmark mà không phải mất công tìm lại.
| Function | macOS | Windows |
| -------- | -------- | -------- |
| Place a bookmark on the code line     | f3     | f11     |
| View all of your bookmarks    |cmd + f3     |shift + f11     |
| Add labels while viewing bookmarks     |  	cmd + enter    |ctrl + enter     |

### Navigate Backward/Forward
Di chuyển qua lại các file class thao tác gần nhất. Khá đơn giản nhưng được sử dụng rất nhiều. Hãy thử và cảm nhận :)
| Function | macOS | Windows |
| -------- | -------- | -------- |
| Navigate backward and forward     | cmd + alt + left/right     | ctrl + alt + left/right    |
### Recent Files
Hiện thị popup các file bạn đã vào gần đây. Gần giống chức năng trên nhưng đi kèm với bộ filter name và tìm kiếm các file rộng hơn.
| Function | macOS | Windows |
| -------- | -------- | -------- |
| Show recently viewed files     |  	cmd + e     | ctrl + e  |
| Show recently edited files     |  	cmd + shift + e   | ctrl + shift + e  |
## Một vài trick debugging trong AndroidStudio

### Conditional Breakpoints

| Function | macOS | Windows |
| -------- | -------- | -------- |
| Place a breakpoint   |  	 	cmd + f8     | ctrl + f8  |
Right-click vào breakpoint để đặt điều kiện pass.
![](https://images.viblo.asia/9ce99edb-d162-4838-9bde-04844a31d29e.png)
### Evaluate Expression
Giúp ta tính toán các hàm, giá trị trong quá trình debugging. Nhưng nên cẩn thận khi thay đổi state của objects vì chúng vẫn giữ trạng thái đó trong quá trình thực thi chương trình.
| Function | macOS | Windows |
| -------- | -------- | -------- |
| Invoke the popup   |  	 	 	option + f8     | alt + f8  |
![](https://images.viblo.asia/e4782f0b-a75f-4f9e-87d6-43c5fe06b6ab.png)
Bài viết đã cung cấp cho các bạn một vài gợi ý hữu ích khi sử dụng các công cụ trên AndroidStudio đặc biệt là đối với những người mới. Hy vọng nó sẽ giúp ích cho các bạn, cảm ơn đã theo dõi.

[Nguồn](https://pspdfkit.com/blog/2018/code-navigation-for-beginners/#frequently-used-libraries)