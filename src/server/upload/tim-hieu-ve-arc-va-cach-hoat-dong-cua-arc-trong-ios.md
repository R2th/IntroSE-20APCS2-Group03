Xin chào các bạn, khi bạn tiếp xúc về ngôn ngữ lập trình `Swift` thì chắc chắn bạn sẽ luôn nghe đến khái niệm như là ARC là gì và cách hoạt động ra làm sao... thì mình hi vọng sau bài này sẽ đem lại cho các bạn mới học Swift như mình 1 cái nhìn tổng quát về nó nhé.
# Giới thiệu ARC.
Thì trước tiên đi đến ARC là gì thì mình muốn nói 1 chút về memory management là gì? Thì memory management được hiểu theo 1 cách đơn giản là nó là quá trình khởi tạo - sử dụng - cũng như là giải phóng bộ nhớ khi mà chúng ta không còn dùng tới nữa. Tại vì sao mà mình đề cập tới vấn đề này mà không phải là ARC? và ARC với memory management có gì liên kết gì với nhau? thì các bạn hãy bình tĩnh.

Mặc dù di động thời nay phần cứng của chúng ngày càng phát triển nhưng khi chúng ta cứ dùng hoan phí bộ nhớ, thì về lâu về dài nó sẽ gây ra hiện tượng giật lag làm khó chịu với người dùng và trước đây các lập trình viên để viết code để quản lý bộ nhớ thì bây h từ iOS 5 trở lên chúng ta đã có ARC để hỗ trợ chúng ta trong việc quản lý bộ nhớ.

ARC là gì? Nó là tên viết tắt của Automatic Reference Counting, nó là cơ chế giúp chúng ta quản lý bộ nhớ ở trong `Swift`. Nếu chúng ta có 1 đối tượng và nó không có tham chiếu nào thì nó tương đương với việc `reference counting = 0`, cơ chế ARC sẽ hoạt động và sẽ xoá những đối tượng có `reference counting = 0` và giải phóng trả bộ nhớ về cho hệ thống.

# Cách ARC hoạt động
Sau đây mình sẽ có hình ảnh minh hoạ về các hoạt động của ARC như sau:

![](https://images.viblo.asia/6a6d1135-cb82-4c87-825a-6a707fc6b8c7.jpg)

Đầu tiên, ở hình trên khi chúng ta khởi tạo 2 đối tượng thì hệ thống sẽ cấp phát cho mỗi đứa tượng mỗi vùng nhớ riêng biệt, và trong mỗi vùng nhớ chúng ta có chứa thuộc tinh là name. Và bạn để ý thì sẽ bạn sẽ thấy `reference counting = 1` ở mỗi vùng nhớ thì tại sao lại như vậy. Lý do là vì khi chúng ta khởi tạo 2 đối tượng thì vùng nhớ cho 2 đối tượng đó và `reference counting = 1` có nghĩa là có 1 đối tượng trỏ đến vùng nhớ nhớ đó, và chúng ta sẽ cho 1 chút thay đổi như sau.

![](https://images.viblo.asia/85f0f082-f048-4ddc-a576-9177ad401a10.jpg)

Chúng ta sẽ cho 1 chút thay đổi như trên hình như sau, ở đối tượng `User 2` chúng ta sẽ không tham chiếu trỏ vào vùng nhớ của chính nó nữa mà thay vào đó sẽ là vùng nhớ của `User 1` và như trên hình bạn có thể thấy reference counting của `User 1` sẽ là 2 thì vì sao lại như vậy? Khi mà  `User 2` tham chiếu tới thì ARC sẽ nhận biết được là có thêm 1 đối tượng khác trỏ vào vùng nhớ đó 
thì ngay lập tực vùng nhớ của  `User 1` sẽ tăng lên thành 2, và cùng lúc đó tại vùng nhớ cũ của  `User 2` thì reference counting sẽ còn lại là 0 bởi vì không còn đối tượng nào trỏ tới vùng nhớ đó nữa cả, thì như chúng ta đã định nghĩa ở phần trước, ARC sẽ xoá những vùng nhớ nào có `reference counting = 0` và giải phóng trả bộ nhớ về cho hệ thống và kết quả như hình ở trên.

Bài viết của mình tới đây là kết thúc, mong thông qua bài viết của mình các bạn có thể phần nào đó hiểu về cách hoạt động của ARC là như thế nào. Cảm ơn các bạn đã đọc và chúc các bạn 1 ngày tốt lành!