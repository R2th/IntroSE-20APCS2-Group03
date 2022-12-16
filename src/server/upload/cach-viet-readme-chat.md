Có thể cho rằng phần tài liệu quan trọng nhất cho bất kỳ dự án nguồn mở nào là `README`. Một `README` tốt không chỉ thông báo cho mọi người dự án làm gì và dự án đó dành cho ai mà còn cả cách họ sử dụng và đóng góp cho nó.

**README là gì ?**<br><br>
Về cơ bản, `README` là một tệp văn bản (.txt hoặc .md) hoạt động như tài liệu cho một dự án hoặc thư mục. Nó thường là phần `documentation` và `landing page` dễ thấy nhất cho hầu hết các dự án nguồn mở. Ngay cả tên tệp `README` cũng được viết hoa toàn bộ để thu hút sự chú ý của người đọc và đảm bảo đó là điều đầu tiên họ đọc.<br><br>
Có bằng chứng cho thấy `README` có từ những năm 1970. Ví dụ lâu đời nhất mà t có thể tìm thấy là README này cho máy tính PDP-10 của DEC, ngày 27 tháng 11 năm 1974. Mặc dù nguồn gốc của tên `README` bị tranh cãi, hai lý giả thuyết phổ biến nhất là:<br>
* *Các lập trình viên của các máy tính mainframe lớn ban đầu đi kèm với thẻ đục lỗ, sẽ để lại một chồng các hướng dẫn bằng giấy với chữ READ READ ME! được viết ở phía trước*.
* *Cái tên này lấy cảm hứng từ Alice ở xứ sở thần tiên của Lewis Carroll, trong đó nhân vật chính Alice tìm thấy một lọ thuốc có nhãn là DRINK ME! và chiếc bánh có nhãn "EAT ME" khiến cô ấy thay đổi kích thước*.
<br>
<br>
    
**Nên để những gì vào trong README ?**<br><br>
Ok, vậy tập tin README tuyệt vời nên chứa gì?<br>
Để bắt đầu, t khuyên bạn nên bao gồm những điều quan trọng sau:
* ***Đặt tên cho project (hoặc cái gì đó mà README muốn hướng tới):*** <br> *Đừng quên đặt tên cho dự án của bạn hoặc làm nổi bật tên. Có một số dự án đáng ngạc nhiên trên GitHub không có tên.*
* ***Giới thiệu hoặc tóm tắt:*** <br> *Viết một đoạn giới thiệu ngắn hai hoặc ba dòng giải thích dự án của bạn làm gì và dự án đó dành cho ai. Ngoài ra, hãy bỏ các tiêu đề như 'Giới thiệu', 'Tóm tắt' hoặc 'Tổng quan' - rõ ràng đây là phần giới thiệu.*
* ***Điều kiện tiên quyết:*** <br> *Ngay sau phần giới thiệu của bạn, hãy thêm một phần có tiêu đề liệt kê bất kỳ kiến thức hoặc công cụ tiên quyết nào mà bất kỳ ai muốn sử dụng dự án có thể cần trước khi bắt đầu. Ví dụ: nếu nó chạy trên phiên bản Python mới nhất, hãy bảo họ cài đặt Python. Đây là một ví dụ:*<br>
```
Prerequisites

Before you continue, ensure you meet the following requirements:

* You have installed the latest version of Ruby.
* You are using a Linux or Mac OS machine. Windows is not currently supported.
* You have a basic understanding of graph theory.
```
* ***Cách cài đặt:*** <br> *Cung cấp các bước cài đặt! Thật đáng ngạc nhiên khi có nhiều dự án t đã dùng qua chỉ cung cấp các hướng dẫn sử dụng cơ bản và họ mong bạn sẽ biết cách cài đặt nó một cách thần kỳ nào đó. Đảm bảo chia phần cài đặt thành các bước được đánh số nếu nó yêu cầu nhiều bước.*
* ***Cách sử dụng:*** <br> *Thêm các bước để sử dụng dự án khi người dùng đã cài đặt nó. Đảm bảo bao gồm các ví dụ sử dụng và tham chiếu giải thích các tùy chọn lệnh hoặc flag nếu bạn nghĩ rằng chúng sẽ hữu ích. Nếu bạn có tài liệu nâng cao hơn trong một tệp hoặc trang web riêng biệt, hãy liên kết đến tài liệu này từ đây.*
* ***Làm thế nào để đóng góp:*** <br> *Cung cấp các bước để đóng góp cho dự án. Ngoài ra, bạn có thể muốn tạo hướng dẫn cho các contributors trong một tệp riêng và liên kết với hướng dẫn này từ `README` của bạn nếu bạn muốn mọi người đọc nó trước khi đóng góp` pull request` cho dự án của bạn.*
* ***Thêm contributors:*** <br> *Điền tên bất kỳ contributor nào đã có nhiều đóng góp cho dự án vào mục tác giả. Đó là một cách hay để làm cho dự án nguồn mở được cảm thấy như một nỗ lực của cả nhóm và thừa nhận sự đóng góp của tất cả những người đã dành thời gian để đóng góp.*
* ***Thêm nguồn dẫn chứng:*** <br> *Tương tự, nếu bạn đã sử dụng sản phẩm của bất kỳ ai khác (mã, thiết kế, hình ảnh, v.v.) có bản quyền yêu cầu xác nhận, bạn có thể muốn thêm nó vào đây. Bạn cũng có thể thừa nhận bất kỳ nhà phát triển hoặc tổ chức nào khác đã giúp đỡ với dự án.*
* ***Thông tin liên lạc:*** <br> *Bạn có thể không muốn làm điều này vì bạn là một người cực kỳ riêng tư nhưng nếu ai đó có thắc mắc, muốn cộng tác với bạn hoặc đủ ấn tượng với dự án của bạn để cung cấp cho bạn cơ hội việc làm, thật hợp lý khi có chi tiết liên hệ của bạn vào ngay chính giữa một cách to và rõ rảng.*
* ***Thông tin bản quyền:*** <br> *Bạn chắc chắn muốn bao gồm thông tin giấy phép nếu có. Các công ty khởi nghiệp và các công ty khác phụ thuộc vào phần mềm của bên thứ ba dường như không thể sử dụng dự án của bạn trừ khi bạn cung cấp điều này. Kiểm tra choosealicense.com hoặc opensource.org để biết danh sách các giấy phép bạn có thể sử dụng.*
<br><br><br>
**Thêm lửa vào REAME** 🔥<br><br>
Nếu bạn thực sự muốn làm cho *README* của bạn nổi bật và trông thật sự chất, bạn có thể làm những việc sau:<br><br>
* ***Thêm logo:*** *Nếu dự án của bạn có logo, hãy thêm biểu tượng này ở đầu `README` của bạn. Thương hiệu làm cho một dự án trông ngầu hơn và giúp mọi người ghi nhớ nó.*
* ***Thêm  badges và shields:*** *Bạn có thể thêm badges và shields để phản ánh tình trạng hiện tại của dự án, giấy phép mà nó sử dụng và nếu có bất kỳ sự phụ thuộc nào mà nó sử dụng là cập nhật. Thêm vào đó nó sẽ trông khá tuyệt! Bạn có thể tìm thấy một loạt các badges ở Shields.io.*
* ***Thêm ảnh chụp màn hình:*** *Đôi khi một ảnh chụp màn hình đơn giản hoặc một bộ ảnh chụp màn hình có thể giúp bạn đỡ phải ngồi gõ vài chục dòng mô tả. Tuy nhiên, nếu bạn sử dụng ảnh chụp màn hình, bạn sẽ cần cập nhật chúng mỗi khi bạn cập nhật dự án của mình.*
* ***Sử dụng Emoji?***
<br><br><br>
**Resources**<br>

1. https://www.youtube.com/watch?v=2dAK42B7qtw
2. https://www.youtube.com/watch?v=fXMN4X9B8Rg&feature=youtu.be
3. https://github.com/kefranabg/readme-md-generator
4. https://dev.to/scottydocs/how-to-write-a-kickass-readme-5af9