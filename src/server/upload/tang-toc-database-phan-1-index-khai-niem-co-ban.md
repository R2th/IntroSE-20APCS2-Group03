Các bạn có thể xem đầy đủ các phần tại [đây](https://viblo.asia/s/lam-sao-de-trang-web-chay-nhanh-DVK2jDrnKLj) nhé

Phần đầu tiên trong chuỗi bài là các phần liên quan tới database, nhiều bạn thích trình bày các vấn đề khác về database tuy nhiên theo kinh nghiệm cá nhân mình thấy hiểu về index trong db rất quan trọng trong quá trình nâng cao hiệu năng của chương trình, đôi khi chỉ cần đánh index thôi mà tốc độ đang từ rùa bò trở nên tốc độ bàn thờ . Nhưng có phải index luôn giúp truy vấn nhanh hơn không?
Đầu tiên là khái niệm index là gì?

Bây giờ mọi người chỉ cần dùng điện thoại, máy tính là có từ điển tra một phát là ra từ ngày, ngày xưa mình học tiếng anh phải tra một quyền từ điển dày cộp như thế này
![](https://images.viblo.asia/eede0293-6929-47e5-8350-8d680d594b3c.jpeg)

Nếu quyển từ điển đó mà không có thứ tự, cách tra tốt nhất là gì? Có thể có bạn có nhiều cách nhưng với mình chắc là đọc từ đầu tới cuối để tìm từ cần tra. Có lẽ nhiều bạn sẽ bảo ai lại dở hơi đi làm một quyển từ điển mà không có thứ tự, nhưng lại không ai bảo có thằng dở hơi nào tạo table mà không đánh index.

Nhiều người hay so sánh index với mục lục của cuốn sách, điều đó tương đối đúng nó giúp tìm nội dung của một chương nhanh hơn, nó nằm ngoài nội dung chính (thường ở đầu hay cuối cuốn sách), nó chỉ đơn giản trỏ tới số trang có nội dung cần tìm. Index cũng như vậy nó cũng nằm độc lập với bảng, nó có chỗ lưu trữ riêng của nó, và nó trỏ tới bản ghi cần tìm. Tuy nhiên cấu trúc của index thì không giống mới mục lục, với mục lục bạn vẫn cần phải tìm hết mục lục từ trên xuống dưới để tìm ra chương mình cần tìm, nhưng index thì khôn hơn một tý, nó  giống một quyển từ điển . Khi bạn  truy vấn theo  index cũng như khi bạn tra từ điển (có thứ tự dò nhanh hơn không cần phải đọc hết từ đầu đến cuối). Tuy nhiên index  phức tạp hơn từ điển, từ điển một khi đã in ra thì không đổi nữa, muốn đổi thì đợi lần tái bản sau nhé! Còn database thì thường xuyên được cập nhật, thêm sửa xóa dẫn đến index cũng phải được cập nhật liên tục.

Mục lục của cuốn sách cố định sau khi in xong, nó không bao giờ lớn hơn kích thước nội dung , còn index thì có thể theo nhiều trường dữ liệu khác nhau, nó tốn dung lượng lưu trữ trong ổ cứng, làm phình to database (tốn tài nguyên ở đây chứ đâu). Mỗi khi dữ liệu thay đổi nó lại phải cập nhật lại, chèn thêm bớt index sau khi thêm sửa xóa. Vấn đề làm sao để khi bạn thay đổi dữ liệu database chạy vẫn nhanh, nó không cần đợi quá lâu để đợi cập nhật index, vậy làm thế nào mà index lại được cập nhanh như thế sau mỗi lệnh insert, delete,update? Dữ đúng thứ tự của index mà không cần thay đổi một đống data của index.

Điều này được giải quyết bằng cách kết hợp hai cấu trúc dữ liệu "doubly linked list" và một "cây tìm kiếm". Hai cấu trúc này giải thích hầu hết các đặc điểm về hiệu năng của database. Về cấu trúc dữ liệu của index mình sẽ mô tả ở bài sau. 

Bây giờ mình phải đi ngủ rồi.
Các bài viết về index mình đều tham khảo tại https://use-the-index-luke.com/sql/table-of-contents
Các bạn có thể vào đọc nhé!

Bài sau [Leaf Nodes](https://viblo.asia/p/tang-toc-database-index-phan-2-leaf-nodes-bJzKmdrY59N)