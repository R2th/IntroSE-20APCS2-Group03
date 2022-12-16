# Lời nói đầu
Là lập trình viên android, tất cả chúng ta đều sử dụng RecyclerView trong rất nhiều ứng dụng của mình. Luôn luôn cần liên kết dữ liệu với các view và xử lý sự kiện click, touch, ... của người dùng trên bất kỳ item nào của RecyclerView. Để thực hiện điều này, chúng ta cần biết được vị trí item mà người dùng vừa thao tác với nó, vậy một câu hỏi được đặt ra ở đây là làm thế nào lấy được ví trí (position) đó ? Chúng ta có ba lựa chọn, đầu tiên là tham số position bên trong hàm onBindViewHolder(), phương thức getAdapterPosition() và getLayoutPosition() bên trong ViewHolder.

Ở trong bài viết này mình đưa ra ví dụ chúng ta có một RecyclerView đơn giản hiển thị danh sách các số. Chúng ta cần liên kết dữ liệu với các item của RecyclerView và xử lý sự kiện khi người dùng click vào bất kỳ item nào trong số chúng. Mình sẽ sử dụng một trong ba tùy chọn lấy position đã nói bên trên để các bạn có thể thấy được sự khác biệt giữa chúng là gì?

# I. Tham số position bên trong hàm onBindViewHolder()
Như các bạn thấy, chúng ta có thể sử dụng tham số position này để liên kết dữ liệu với view, việc này hoàn toàn ổn.

![](https://images.viblo.asia/5bf4f8d9-1ffb-4b12-8c41-6012c755f21b.png)

Nhưng khi bạn sử dụng tham số này để xử lý sự kiện onClick() từ người dùng, bạn sẽ thấy một cảnh báo với nội dung "tham số này của bạn không được coi là cố định, thay vào đó hãy sử dụng holder.getAdapterPosition().

![](https://images.viblo.asia/dfb56fcc-a4e0-423c-b5cd-1c14267ede14.png)

Tại sao lại thế nhỉ ? Bởi vì khi bạn xóa, thêm hoặc thay đổi bất kỳ mục nào trong tập dữ liệu và thông báo cho RecyclerView bằng notifyItem*(), RecyclerView sẽ không gọi phương thức onBindViewHolder và cập nhật tất cả các vị trí của mục đó, nó sẽ chỉ cập nhật vị trí của các mục mới cho các cuộc gọi mới của onBindViewHolder và điều này sẽ gây ra sự không thống nhất giữa các mục được hiển thị và giá trị vị trí.

Để đơn giản hơn hãy tưởng tượng rằng chúng ta có RecyclerView sẽ hiển thị 10 mục, vậy RecyclerView sẽ tạo 10 mục và gọi onBindView cho 10 mục đó rồi truyền các vị trí từ 0 đến 9, vì vậy nếu bạn cố định vị trí bằng cách sử dụng nó để xử lý các lần click của người dùng và sau đó bạn thêm một mục ở vị trí 0 rồi thông báo cho tập dữ liệu rằng bạn đã chèn một mục mới bằng cách gọi đến phương thức notifyItemInserted(), RecyclerView sẽ tạo một mục mới ở vị trí 0 và chuyển nó vào layout nhưng các mục được tạo trước đó vẫn có vị trí cũ và nếu bạn sử dụng những vị trí đó bạn sẽ có 00123...9. Như vậy là không đúng, nó phải là 0123...10 thì mới chính xác. Ở đây sức mạnh của holder.getAdapterPosition() được thể hiện.

# II. Phương thức getAdapterPosition()

ViewHolder cung cấp cho chúng ta phương thức getAdapterPosition() luôn luôn cập nhật vị trí mới nhất của holder trong adapter. Điều đó nghĩa là gì ? Điều đó có nghĩa là bất cứ khi nào bạn nhấp vào một item (ViewHolder item), chúng ta sẽ hỏi adapter về vị trí của item đó. Vậy nên bạn sẽ có được vị trí mới nhất của item này.

![](https://images.viblo.asia/4933c7a3-ba10-446a-a25a-d393519080f5.png)

# III. Phương thức getLayoutPosition()

Phương thức getLayoutPosition() là gì và khi nào chúng ta sử dụng nó ? RecyclerView tách biệt tập dữ liệu với cách chúng ta hiển thị nó. Đó là lí do tại sao chúng ta phải sử dụng LayoutMangers để quản lý cách hiển thị dữ liệu từ tập dữ liệu. RecyclerView cập nhật layout với logic của từng phần, nghĩa là nó chờ đợi các thay đổi được thực hiện rồi sau đó mới hiển thị trên layout. Thời gian chờ này ít hơn 16 ms, do đó trong hầu hết các lần thử nghiệm, bạn sẽ không tìm thấy bất kỳ sự khác biệt nào giữa getAdapterPosition() và getLayoutPosition() vì khoảng thời gian chờ đợi quá nhỏ này. Tuy nhiên trong trường hợp bạn cần có được vị trí về mặt cập nhật layout, chẳng hạn: - Nếu người dùng yêu cầu vị trí thứ ba mà anh ta nhìn thấy và bạn sử dụng thao tác swipe/dismiss cho các item hoặc áp dụng bất kỳ animation hoặc decorations nào cho các item, tốt hơn là sử dụng getLayoutPosition() thay vì sử dụng getAdapterPosition() vì bạn sẽ luôn chắc chắn rằng bạn đang xử lý vị trí của các item theo cách bố trí mới nhất trên layout.

Theo kinh nghiệm của mình thì khi cần lấy vị trí item mà người dùng vừa click thì nên sử dụng getLayoutPosition().

# IV. Tài liệu tham khảo
https://medium.com/@noureldeen.abouelkassem/difference-between-position-getadapterposition-and-getlayoutposition-in-recyclerview-80279a2711d1

Cảm ơn bạn đã giành thời gian đọc bài viết và hy vọng những điều này sẽ giúp ích cho bạn.