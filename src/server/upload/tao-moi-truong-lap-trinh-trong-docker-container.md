Chào mọi người,

Không biết mọi người có đang dùng cách sau đây để tạo môi trường lập trình hay không, hay là có cách nào hay hơn không nên mình viết bài này để chia sẻ về cách mà mình đang làm hiện tại.

Nói về mình trước, mình là người thích học rộng, muốn học nhiều cái để có kiến thức tổng quan về mọi thứ trong lĩnh vực lập trình. Mình chỉ là một tay mơ mới vào nghề thôi, cũng chưa chuyên sâu về một ngôn ngữ nào đó. Nhưng quan điểm của mình là biết rộng, biết nhiều để biết toàn bộ hệ thống hoạt động như thế nào sau đó chọn cho mình ngôn ngữ, framework, công nghệ mình thích nhất rồi đầu tư sâu. Tóm lại là biết rộng sau đó mới biết sâu.

Lan man nãy giờ nhưng ý mình muốn nói là mình hiện tại đang vọc nhiều ngôn ngữ lập trình như C, C++, Python, Ruby… Vấn đề là khi muốn lập trình ngôn ngữ nào đó thì phải cài đặt môi trường phát triển (development environment) cho từng ngôn ngữ đó. Hệ quả là trên con máy Mac nhỏ gọn của mình phải cài rất nhiều thứ rồi sau khi hết hứng thú thì có khi thì quên xóa, hoặc cho dù có xóa thì cũng không sạch được. Và thế là máy tính của mình sẽ có rất nhiều “rác”. Trong khi đó mình là người thích sự gọn gàng, ngăn nắp, sạch sẽ nên cảm thấy rất khó chịu.

Lúc đó thì mình mới biết tới Docker qua một clip trên Youtube nên mình cũng muốn tìm hiểu về container, Docker… Trong lúc tìm hiểu thì mình nhận ra à thì ra image là vậy, container là vậy và mình nảy ra ý tưởng là nếu một container có thể hoạt động như một máy tính (không có GUI) thì tại sao không dùng nó để làm môi trường lập trình. Thế là mình lên group Docker trên Facebook hỏi và tìm Google với keyword “development environment docker vscode” thì woa, có kết quả luôn nè. Thế là mình làm theo hướng dẫn và đã thành công.

## Cách tổ chức không gian làm việc (Workspace)

Mình tạo thư mục đặt tên là Dev, nơi để lưu tất cả những thứ liên quan đến lập trình. Trong thư mục Dev tạo các thư mục con có tên là các ngôn ngữ lập trình như C, C++, Python, Ruby, TypeScript. 

Quan trọng là chỗ này, ứng với mỗi thư mục mình sẽ tạo một dev container cho nó. Sau đó trong từng thư mục ngôn ngữ mình sẽ tạo các thư mục dự án (project).

Như vậy khi mình có hứng vọc Ruby mình sẽ mở thư mục Dev/Ruby bằng Visual Studio Code.

Sau mở thư mục trong Container (VS Code có tính năng này). Sau đó thì có thể làm việc với các project trong container như làm việc trên máy thật.

Trên đây là cách làm hiện tại của mình, các bạn có cách nào hay hơn hoặc có ý kiến gì vui lòng comment nhé.

P/S: Làm thế nào để tạo môi trường dev trong container thì mời bạn hỏi Mr.Google nhé.