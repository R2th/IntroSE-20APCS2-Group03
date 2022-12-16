Bật USB debgging trong Developer Options có lẽ là công việc đầu tiên của hầu hết các Android developer khi mới bắt đầu tìm hiểu Android, tuy nhiên đôi khi chúng ta lại bỏ qua nhiều tính năng hữu ích có sẵn trong Developer Option. Trong bài viết này chúng ta hãy cùng nhau tìm hiểu một số tính năng thực sự hữu ích của nó nhé.

# Layot Inspector

Tôi tin là tất cả chúng ta đều đã sử dụng nó để xem các view và các container chiếm không gian như như thế nào trên màn hình và nó là một trong những chức năng hữu dụng nhất đối với tôi.

Như các bạn thấy trong bức ảnh trên size của mỗi TextView, Image hoặc các Container mà bạn có được vẽ với đường kẻ màu hồng nhạt.

# Simulate Display cutout

Với option này, bạn có thể bắt chước hình dạng màn hình với các vị trí camera kahcs nhau trên các thiết bị với các sự lựa chọn *Middle*, Right hoặc *tall*. Chúng ta có thể không sử dụng nó nhiều trong cá ứng dụng nhưng nó rất cần thiết khi bạn cần tạo ra một layout toàn màn hình và cần đảm bảo rằng không có bất kì phần quan trọng nào trong layout bị camera che khuất.

# Minimum Width

Mỗi Android UI cần đợc test trên nhiều thiết bị với các hình dạng và kích thước khác nhau để đảm bảo chất lượng. Size có nghĩa là độ phân giải ví dụ 360x480, 720x1080 v.v... Thông thường, chúng ta làm việc này bằng cách cài đặt ứng dụng lên tất cả các devices mà chúng ta có sẵn. Bạn có thể ngạc nhiên nếu tôi nói rằng việc này là không cần thiết nhưng sự thật nó là một hành động thừa thãi và tốn nhiều công sức

Với option có sẵn này bây giờ chúng ta có thể mô phỏng các độ phân giải khác nhau trên các device chỉ cần bằng cách nhập giá trị width. Trên Android 10 nó được gọi là **Smalles width**.

# Don't Keep Activities
Nếu bạn muốn giả lập cách ứng dụng của bạn hoạt động khi activity bị hủy khi ứng dụng của bạn ở background thì bạn có thể làm việc này bằng cách sử dụng thiết lập này

Kích hoạt option này và thấy rằng liệu các ViewModel của bạn có giữ state khi tạo lại hay không.

# Profile GPU Rendering

Thiết lập này hiển thị một thanh đồ thị gồm có các màu khác nhau đại diện cho các bước của việc render screen ví dụ measure, draw, input handling, sync upload, etc...

Lý twowngrnhaats là trong khi bạn sử dụng ứng dụng của mình, bạn không nên vượt quá đường màu xanh lá cây. Đường màu xanh lá cây này biểu thị mốc thời gian 16ms vì vậy nếu biểu đồ này của bạn liên tục vượt qua đường này có nghĩa là một vài frame đã bị bỏ qua. 


# Strict Mode enabled

Strict mode là một developer tool mà xác định việc đọc ghi đĩa trên Main Thread hoặc xử lý công việc mạng trên Main Thread. Khi kích hoạt nó, bạn sẽ nhận được Logs cảnh bằng trong Logcat mà bạn có thể sử dụng để fix các hoạt động đó

# Animator duration scale/Transition animation scale.
Với thiết lập này, bạn có thể làm chậm thời gian diễn ra của bất kỳ animation nào trong device của bạn vì vậy nếu bạn đang làm việc với animation và không thể quyết định khoảng thời gian animation diễn ra sao cho phù hợp thì hãy sử dụng setting này.

# Night Mode

Nếu bạn đang xây dựng một ứng dụng mà support Dark mode  thì bạn có thể bật/tắt night mode từ optionn này. Mặc dù trong phần lớn các thiết bị lựa chọn này cũng được đặt trong các ô thông báo.

# Debug GPU Overdraw

Giao diện người dùng phẳng nhưng vẫn mất nhiều thời gian để vẽ nó nếu bạn gặp phải điều này thì có khả năng rằng bạn đã vô tình overdraw quá mức.

> Overdraw xuát hiện khi ứng dụng của bạn vẽ cùng một pixel nhiều lần.

Giả sử bạn set một giá trị background color cho view và cũng một giá trị color cho view cha của nó vì vậy khi màn hình của bạn được vẽ tất cả sự chồng chéo giữa view con và view cha của nó sẽ được vẽ ít nhất 2 lần lần và có thể là nguyên nhân gây ra việc render chậm.

Kích hoạt thiết lập này và tìm kiếm những bất thường như vậy trong ứng dụng của bạn và sửa chúng càng sớm càng tốt.


***Sau đây tôi đề xuất một vài setting muốn bạn tự cố gắng tìm hiểu và tin tôi đi sẽ có ngày bạn cần dùng đến nó***

* Force RTL Layout direction.
* Pointer Location.
* System Tracing.
* Select debug app/Wait fỏ debuggers (Thiết lập này đảm bảo rằng ứng dụng của bạn sẽ không được chạy nếu không ở trong chế độ debug).
* Enable view attribute Inspection.
* Select mock location.
* Demo Mode (giả lập 100% pin và lừa bạn bè của banh :D)


# Kết
Cảm ơn đã theo dõi và ủng hộ bài viết của tôi. Hãy like nếu nó hữu ích cho bạn.

# Tham khảo
Bài viết này có tham khảo từ nguồn: 
https://medium.com/mindorks/developer-options-in-android-dfa94fe6c501