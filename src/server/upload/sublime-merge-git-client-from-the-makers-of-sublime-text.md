Chắc hẳn mọi người đã quá quen thuộc với trình soạn thảo mã nguồn đa nền tảng Sublime Text. Nhưng đây chỉ đơn thuần là 1 trình soạn thảo text và bạn muốn có thêm các chức năng giống với ide thì phải cài thêm các package của bên thứ 3. Và điển hình với việc sử dụng git để quản lý code. Đa số thường dùng terminal để làm những việc như commit, checkout. Ngày 20/9/2018 vừa qua, © Sublime HQ Pty Ltd đã tung ra git tool của riêng mình [Sublime Merge](https://www.sublimemerge.com/). 

Với giao diện quen thuộc của Sublime Text, chắc hẳn sẽ đem lại sự thân thuộc khi sử dụng.

Hãy cùng xem các tính năng mà nhà phát triển giới thiệu.

![](https://images.viblo.asia/17e2a6d3-ec89-4fed-a2cc-493b41c56fb0.PNG)
                               Commit nhanh hơn

### Integrated Merge Tool 

Integrated Merge Tool cho phép bạn giải quyết bất kỳ conflict nào trực tiếp trong Sublime Merge, thay vì phải mở trình soạn thảo lựa chọn của bạn.

Conflict được trình bày với khung nhìn 3 ngăn. Bên trái là những thay đổi của bạn và bên phải là branch cần merge. Trong ngăn giữa là văn bản được giải quyết, với các nút để chọn giữa các thay đổi của bạn hoặc của branch merge. Chức năng chỉnh sửa văn bản giống như Sublime Text cũng có sẵn cho các kết hợp phức tạp hơn.

Nhấp vào tiêu đề trong ngăn giữa sẽ chuyển đổi giữa kết quả hợp nhất có thể chỉnh sửa và base file.

Sử dụng `Ctrl + S` hoặc nút Lưu để lưu tệp đã merge của bạn. 

### Tìm kiếm mạnh mẽ

Tìm kiếm theo những gì bạn gõ sẽ ra chính xác commit mà bạn đang tìm kiếm.

Tìm kiếm commit messages, tác giả commit, tên tệp và mẫu ký tự đại diện. Truy vấn tìm kiếm phức tạp có thể được xây dựng bằng cách sử dụng `and` , `or` và kí tự `()`.

Ví dụ `min-parents:2 author:jskinner path:tests/* (bug fix or test)` sẽ tìm kiếm commit merge từ jskinner bên trong thư mục test chứa từ "bug" và "fix" hoặc từ "test" .

Bạn có thể mở tìm kiếm bằng `Ctrl + F` hoặc thông qua menu: `Navigate ▶ Search`. 

![](https://images.viblo.asia/90d98136-4da4-469f-8281-5a11c5d4e759.PNG)
Khả năng tìm kiếm mạnh mẽ

### Hiệu suất mạnh mẽ

Sublime Merge được xây dựng trên cùng một nền tảng tùy chỉnh như Sublime Text, cung cấp khả năng phản hồi nhanh. Với bộ công cụ giao diện người dùng mạnh mẽ, đa nền tảng, công cụ tô sáng cú pháp mạnh mẽ và thư viện đọc Git hiệu suất cao.

### Blame

Mở Blame của một tập tin thông qua Command Palette hoặc khi xem một commit để xem chính xác những dòng code của tập tin đã được thêm vào khi commit.

Dễ dàng xem tuổi tác, tác giả và băm của mỗi dòng mã và xem những dòng nào đến từ cùng một commit với mã hóa màu commit của chúng ta. Nhấp vào một dòng trong gutter để làm nổi bật tất cả các dòng khác từ cùng một commit.

Công cụ blame cũng sẽ phát hiện khi một đoạn mã được di chuyển từ một vị trí khác trong repository của bạn, vì vậy bạn có thể thực sự theo dõi lịch sử code của bạn

### Diffs nâng cao

Nó tạo cảm giác rằng chúng tôi cho bạn thấy chính xác các kí tự của những người khác đã được thay đổi trong commit.

Điều này bao gồm khi bạn đổi tên hoặc di chuyển tệp, khi bạn đang giải quyết conflict hoặc chỉ xem lịch sử commit.

Chọn bất kỳ hai commit nào trong Sublime Merge bằng `Ctrl + Chuột Trái` để hiển thị sự khác biệt giữa chúng. 

![](https://images.viblo.asia/864545ad-9880-4475-a845-7d26398726b4.PNG)
Review tốt hơn

![](https://images.viblo.asia/2cefc6b0-67ab-4d45-bb17-129bbcd9018a.PNG)
Sửa conflict

### Command Palette và key Bindings

Sử dụng bàn phím rất quan trọng đối với chúng tôi. Sử dụng `Tab` để điều hướng qua các phần của ứng dụng, `Dấu cách` để chuyển đổi mở rộng và `Enter`  stage/unstage hunks. Khi viết một commit message, sử dụng `Ctrl + Enter` để commit.

Command Palette được kích hoạt bởi Ctrl + P và cho phép truy cập nhanh đến một tập hợp lớn các lệnh Git cũng như các chức năng Sublime Merge khác. 

### Lịch sử tệp và Hunk

Từ bất kỳ tập tin hoặc hunk trong lịch sử sử dụng `... ▶ File History` tệp hoặc nút `Hunk History` để xem toàn bộ lịch sử của mã nguồn đó. Điều này cũng sẽ theo dõi bất kỳ tập tin di chuyển hoặc đổi tên trong cả repository.

### Chủ đề sáng và tối

Lựa chọn giữa ánh sáng và chủ đề tối cho phù hợp với phong cách của bạn. Bạn có thể xem trước các chủ đề trên.

Mở `Preferences ▶ Preferences…` để thay đổi chủ đề.

(Dark theme chỉ khả dụng khi có license key)

### Khả năng mở rộng

Cũng giống như Sublime Text, mọi thứ trong Sublime Merge đều có thể mở rộng được. Key bindings, menus, theming và bảng lệnh đều có thể tùy biến với các tệp JSON đơn giản. 

### Syntax Highlighting

Sublime Merge thực hiện đánh dấu cú pháp đầy đủ giống với Sublime Text cho mỗi dòng mã bạn thấy.

Thậm chí, chúng tôi sẽ sử dụng bất kỳ định nghĩa cú pháp bổ sung nào mà chúng tôi tìm thấy trong cài đặt Sublime Text về syntax highlighting! 

### Tích hợp dòng lệnh

Sublime Merge được thiết kế để làm việc song song với command line. Tất cả các thay đổi đối với kho lưu trữ được cập nhật trực tiếp và mọi thứ hoạt động giống như cách nó được kích hoạt từ command line hoặc giao diện người dùng.

Sử dụng công cụ `smerge` đi kèm với Sublime Merge để tương tác với command line: mở repositories, blame files hoặc tìm kiếm commits

### Real Git

Sublime Merge sử dụng cùng một thuật ngữ như Git, và không sử dụng bất kỳ trạng thái nào ngoài Git. Khi bạn làm việc với Sublime Merge, bạn đang làm việc với Real Git, không phải phiên bản đơn giản.

Bạn cũng có thể di chuột qua hầu hết các nút để xem lệnh git nào sẽ chạy. 


Donload Sublime Merge [tại đây](https://www.sublimemerge.com/download)