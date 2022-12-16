# Lời dẫn
ViL là ngôn ngữ kịch bản, chúng ta sẽ cùng làm trình thông dịch cho nó. Bạn có thể dùng bất cứ ngôn ngữ nào để triển khai trình thông dịch, trong series này mình sẽ sử dụng Dart. 

Dart là ngôn ngữ được tối ưu hóa cho ứng dụng khách chạy nhanh trên mọi nền tảng. Với việc sử dụng dart, sau khi thực hiện xong series này, chúng ta sẽ làm IDE cho ViL bằng Flutter 
chạy trên cả 5 nền tảng: Android, iOS, MacOS, Windows và Linux với chỉ một codebase!

Đừng sợ nếu bạn chưa biết về Dart, nếu bạn đã biết cơ bản về một trong các ngôn ngữ phổ biến như C/C++, Java, Javascript, ... bạn chỉ cần 15 phút để quen với Dart.

Bạn hãy thử Dart trên Web tại: https://dartpad.dev/?null_safety=true 

Tải Dart SDK tại: https://dart.dev/get-dart
# Trình thông dịch là gì?
Theo wikipedia, trình thông dịch là một chương trình máy tính trực tiếp thực thi các lệnh được viết bằng một ngôn ngữ lập trình hay ngôn ngữ kịch bản, mà không yêu cầu phải biên dịch trước thành một chương trình ngôn ngữ máy. Trình thông dịch thường sử dụng một trong các chiến lược sau để thực thi chương trình:
- Phân tích cú pháp mã nguồn và thực hiện trực tiếp hành vi của nó
- Dịch mã nguồn thành một vài biểu diễn trung gian có tính hiệu quả (intermediate representation) và thực thi ngay lập tức
- Thực thi rõ ràng mã lưu trữ được biên dịch trước được tạo ra bởi một trình biên dịch như là một phần của hệ thống thông dịch

# Lời kết
Các bài viết tiếp theo, mình sẽ viết về từng bước của một trình thông dịch:
- `Scanning`: Tách code thuần sang Token
- `Parser`: Xây dựng cây cú pháp từ Token
- `Interpreter`: Thực thi code.

# Mã nguồn
Bạn có thể theo dõi mã nguồn từng bài viết tại đây. Đừng ngại để lại cho mình một sao nhé 😍

ViL : https://github.com/definev/vil