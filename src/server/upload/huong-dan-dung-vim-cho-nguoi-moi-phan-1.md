Bạn đã bao giờ muốn học Vim, nhưng không chắc chắn cách bắt đầu? Không vấn đề gì.  Đây sẽ là bài viết hướng dẫn bạn cách sử dụng Vim và nơi bắt đầu sử dụng trình soạn thảo văn bản tốt nhất thế giới.

Lưu ý rằng đây là một bài viết rõ ràng dành cho những người mới bắt đầu sử dụng Vim. Nếu bạn đã sử dụng Vim một thời gian, tất cả những điều này sẽ trông hoàn toàn quen thuộc – và bạn có thể thắc mắc tại sao một số chủ đề không được đề cập. Kiên nhẫn,mình sẽ hoàn thành mọi thứ trong thời gian thích hợp, nhưng còn rất nhiều điều cần phải giải quyết!

 # Vim là gì, và tại sao ta phải sử dụng nó?
Vim là trình soạn thảo được nhiều nhà phát triển và người dùng thành thạo lựa chọn. Đây là một trình soạn thảo văn bản "phương thức" dựa trên trình soạn thảo vi được viết bởi Bill Joy vào những năm 1970 cho một phiên bản UNIX. Nó kế thừa các ràng buộc chính của vi, nhưng cũng bổ sung rất nhiều chức năng và khả năng mở rộng còn thiếu so với vi gốc.Trong Vim, bạn có làm nhiều việc mà không cần tay rời khỏi bàn phím. Mặc dù Vim là trình soạn thảo của nhiều người, nhưng tôi sẽ rất thẳng thắn: bạn có thể không muốn. Nếu bạn sẽ không bao giờ thực hiện bất kỳ công việc quản trị hệ thống hay chỉnh sửa văn bản nặng nề nào và nếu bạn không muốn đầu tư thời gian vào việc học các khả năng mà Vim có, thì việc học Vim có thể không phải là cách sử dụng thời gian tốt nhất của bạn.

# Các chế độ

Thiết kế của Vim dựa trên ý tưởng rằng lập trình viên dành nhiều thời gian để đọc, điều hướng và thực hiện các chỉnh sửa nhỏ, trái ngược với việc viết các luồng văn bản dài. Vì lý do này, Vim có nhiều chế độ hoạt động.

* Normal: để di chuyển xung quanh tệp và thực hiện chỉnh sửa
* Insert: để chèn văn bản
* Replace: để thay thế văn bản
* Visual (plain, line, or block): để chọn các khối văn bản
* Command-line: để chạy một lệnh

Các tổ hợp phím có ý nghĩa khác nhau trong các chế độ hoạt động khác nhau. Ví dụ: chữ x trong chế độ Insert sẽ chỉ chèn một ký tự chữ ‘x’, nhưng ở chế độ Normal, nó sẽ xóa ký tự dưới con trỏ và ở chế độ Visual, nó sẽ xóa vùng chọn.

Trong cấu hình mặc định của nó, Vim hiển thị chế độ hiện tại ở phía dưới bên trái. Chế độ ban đầu / mặc định là chế độ Normal. Nói chung, bạn sẽ dành phần lớn thời gian của mình giữa chế độ Normal và chế độ Insert.

Bạn thay đổi các chế độ bằng cách nhấn <ESC> (phím thoát) để chuyển từ bất kỳ chế độ nào về chế độ Normal. Từ chế độ Normal, vào chế độ Insert bằng i, chế độ Replace bằng R, Visual bằng v, Visual Line với V, Visual Block với <Cv> (Ctrl-V, đôi khi cũng được viết ^ V) và chế độ Dòng lệnh với `:` .
 
# Di chuyển trong Vim
   
Điều đầu tiên bạn muốn tìm hiểu là cách di chuyển xung quanh tệp. Khi ở chế độ lệnh, bạn sẽ muốn nhớ các phím sau và những gì chúng làm:

* h di chuyển con trỏ sang trái một ký tự.
* j di chuyển con trỏ xuống một dòng.
* k di chuyển con trỏ lên một dòng.
* l di chuyển con trỏ sang phải một ký tự.
* 0 di chuyển con trỏ về đầu dòng.
* $ di chuyển con trỏ đến cuối dòng.
* w di chuyển về phía trước một từ.
* b lùi lại một từ.
* G di chuyển đến cuối tệp.
* gg di chuyển đến đầu tệp.
    
Cách tốt nhất để học là thực hành. Hãy dành vài phút để dùng thử Vim. Nếu bạn đang sử dụng hệ thống Linux ngay bây giờ, hãy mở một thiết bị đầu cuối và nhập tên tệp vim. Vào chế độ chèn và nhập một chút (hoặc sao chép một số văn bản từ bài viết này vào Vim) rồi nhấn Escape để bắt đầu thực hành chuyển động xung quanh tệp. Khi bạn cảm thấy mình đã hiểu, đã đến lúc thử chỉnh sửa.
    
# Inserting text
    
Từ chế độ Normal, nhấn i để vào chế độ Insert. Bây giờ, Vim hoạt động giống như bất kỳ trình soạn thảo văn bản nào khác, cho đến khi bạn nhấn <ESC> để quay lại chế độ Bình thường. Điều này, cùng với những điều cơ bản được giải thích ở trên, là tất cả những gì bạn cần để bắt đầu chỉnh sửa tệp bằng Vim (mặc dù không đặc biệt hiệu quả, nếu bạn đang dành toàn bộ thời gian để chỉnh sửa từ chế độ Insert).
    
# Command-line
    
Có thể nhập Command-line bằng cách gõ `:` ở chế độ Normal. Con trỏ của bạn sẽ chuyển đến dòng lệnh ở cuối màn hình khi nhấn:. Chế độ này có nhiều chức năng, bao gồm mở, lưu và đóng tệp cũng như thoát Vim.

* `: q`  thoát (đóng cửa sổ)
* `: w ` save (“ghi”)
* `: wq ` lưu và thoát
* `: e ` {name of file} mở tệp để chỉnh sửa
* `: ls ` hiển thị bộ đệm mở
* `: help` {topic} mở trợ giúp
* `: help: w` mở trợ giúp cho lệnh: w
    
# Editing Vim
    
Bây giờ bạn đã biết cách di chuyển một chút, hãy thử chỉnh sửa. Di chuyển con trỏ đến đầu một từ. Bây giờ gõ x. Chuyện gì đã xảy ra? Bạn đã xóa ký tự mà con trỏ trên đó. Bạn muốn hoàn tác nó? Không vấn đề gì. Nhập u (để hoàn tác) và nó sẽ được khôi phục.

Bạn muốn xóa toàn bộ một từ? Di chuyển con trỏ của bạn đến đầu từ một lần nữa. Sử dụng dw. Lưu ý rằng thao tác này sẽ chỉ xóa từ khỏi con trỏ khi bật – vì vậy nếu bạn có con trỏ ở giữa từ, nó sẽ chỉ xóa từ thời điểm đó trở đi. Một lần nữa, bạn sẽ hoàn tác nó. Lưu ý rằng Vim có nhiều cấp độ hoàn tác, vì vậy bạn có thể hoàn tác thay đổi trước đó và thay đổi trước đó, v.v.

Muốn hoàn tác việc hoàn tác của bạn? Nhấn Ctrl-r. Thao tác đó sẽ thực hiện lại lần hoàn tác cuối cùng của bạn.

Một lần nữa, đây là danh sách dài hơn về các lệnh mà bạn chắc chắn muốn biết khi bắt đầu:

* d bắt đầu thao tác xóa.
* dw sẽ xóa một từ.
* d0 sẽ xóa về đầu dòng.
* d$ sẽ xóa đến cuối dòng.
* dgg sẽ xóa về đầu tệp.
* dG sẽ xóa đến cuối tệp.
* u sẽ hoàn tác hoạt động cuối cùng.
* Ctrl-r sẽ thực hiện lại lần hoàn tác cuối cùng.
    
Bạn có thể nhận thấy rằng một số lệnh kết hợp thao tác văn bản và phím di chuyển. gg đưa bạn đến cuối tệp và d được dùng để xóa. Kết hợp chúng mang lại cho bạn thứ gì đó mạnh mẽ hơn. Vim là như vậy. Nếu bạn đang làm việc trong Vim và nghĩ rằng “này, tôi tự hỏi liệu mình có thể kết hợp hai thứ mà tôi biết để tạo ra một thứ gì đó dễ dàng hơn không”, câu trả lời thường là (nhưng không phải lúc nào cũng vậy).
    
# Copying And Pasting
   
Bạn đã học cách xóa văn bản. Văn bản cuối cùng mà bạn đã xóa được lưu trữ trong bộ đệm sẵn sàng để dán lại vào tài liệu. Vì vậy, nếu bạn đã chạy dd và xóa toàn bộ dòng, bây giờ bạn có thể nhấn p hoặc P để dán lại vào tài liệu. Điều này áp dụng cho các dòng đơn, nhiều dòng và thậm chí toàn bộ tài liệu.

Khi bạn đã đánh dấu những gì bạn muốn, hãy nhấn vào y và nó sẽ “kéo” văn bản vào bộ đệm để được dán sau đó. Vì vậy, một thao tác dán thông thường có thể trông như thế này:

Nhấn v để đánh dấu một số văn bản. Sau đó nhấn y để kéo nó vào bộ đệm. Sau đó, di chuyển con trỏ đến nơi bạn muốn và sử dụng p trong chế độ lệnh. Xong rồi đấy –  bạn vừa dán một số văn bản!

Các lệnh bạn cần nhất để bắt đầu:

* v đánh dấu một ký tự tại một thời điểm.
* V đánh dấu từng dòng một.
* Ctrl-v đánh dấu theo cột.
* p dán văn bản sau dòng hiện tại.
* P dán văn bản trên dòng hiện tại.
* y copy văn bản vào bộ đệm sao chép.
    
Trên đây là phần giới thiệu qua về Vim cũng như cách sử dụng cơ bản dành cho các bạn mới tìm hiểu. Ở bài viết sau mình sẽ nói thêm về các câu lệnh hay dùng khác trong vim và cách config giúp làm việc hiệu quả hơn. Các bạn có thể tham khảo thêm một số tài liệu về vim dành cho người mới dưới đây:
*     https://opensource.com/article/19/3/getting-started-vim
*     https://www.linux.com/training-tutorials/vim-101-beginners-guide-vim/
    
 Cảm ơn bạn đã đọc bài viết !