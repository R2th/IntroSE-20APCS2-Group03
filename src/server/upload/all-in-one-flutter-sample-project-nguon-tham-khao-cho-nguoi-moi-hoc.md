Chắc anh em cũng biết Flutter vẫn còn là một vùng đất mới mẻ không chỉ ở riêng Việt Nam mà còn cả trên thế giới, vì vậy chưa có 1 hình mẫu project nào đủ phổ biến để trở thành tiêu chuẩn chung cho cộng đồng cả. Chính trên website [Flutter Architecture Sample](https://fluttersamples.com/) cũng nói `Flutter cung cấp cực kì nhiều sự tự do đa dạng hoá` dẫn đến không có cái gì là tiêu chuẩn cả, bản thân website này cũng phải đưa ra rất nhiều gợi ý mô hình khác nhau cho người đọc lựa chọn. Với một người mới học Flutter như mình, để quyết định áp dụng mô hình nào trong khi chưa có hiểu biết sâu về Flutter giống như bắc thang lên hỏi ông trời vậy.

Do vậy, mình nghĩ rằng thay vì cứ viết project máy móc theo 1 mô hình có sẵn nào đó (mà chưa hiểu bài toán của mỗi mô hình đang giải quyết là gì) thì tại sao mình không áp dụng những nguyên lý lập trình căn bản nhất, đặc biệt là 5 nguyên lý SOLID, mà mình vẫn thường làm trong các project Android từ trước đến giờ để dựng lên được 1 cấu trúc sơ khai nhất mà (trong tương lai) vẫn sẽ đảm bảo các yếu tố:
- Dễ đọc: Chỉ cần có hiểu biết căn bản về SOLID là ai cũng có thể đọc hiểu được.
- Dễ thay thế và mở rộng: Dễ dàng refactor theo một mô hình kiến trúc khác hoặc sử dụng các thư viện khác, framework khác, nhờ vào việc kết hợp SOLID và một chút tư tưởng của Clean Architecture (theo tiêu chí là phải basic nhất nên mình không implement toàn bộ Clean Architecture).
- Đóng gói sẵn: Tích hợp đầy đủ `Unit Test`, `Integration Test`, `Coverage Report`, `CI/CD` và cả 1 server demo để anh em an tâm là nhánh master luôn luôn sống, cứ vững lòng chỉnh sửa tiếp dựa trên code base này. Nó cũng đóng vai trò là nguồn tham khảo cho anh em luôn, nếu sau này cần phải động tới những công việc "tay to" ấy.
- Ngoài ra, phải kế thừa được những lợi thế khác từ việc implement kiến trúc và nguyên tắc SOLID mà mình chưa liệt kê ra hết ở đây.

Khi đảm bảo các yếu tố này, project sẽ có ích cho những anh em nào mới chuyển qua Flutter. Nó giúp anh em đỡ tốn thời gian vào việc tìm hiểu các kiến thức bên lề và công việc tay to, thay vào đó anh em sẽ tập trung vào việc học ngôn ngữ Dart, framework Flutter và business logic hơn.

Lí do mình để project dưới dạng open source là bởi có những phần mình chưa viết tốt, có thể các anh em sẽ có những đóng góp hay hơn nhiều. Vì vậy rất mong anh em có thể fork về review và góp ý thêm để project hoàn thiện hơn.

Nói đã lắm rồi, sau đây là link project: https://github.com/trunghq3101/sample_flutter_messenger , mời anh em vào xem.

Nó vẫn còn sơ khai nên anh em có thể star để theo dõi những update tiếp nhé. Mình cũng sẽ refactor lại 1 chút (hoặc nhiều nhiều chút) trong thời gian tới.

Thân ái,
Code On Sunday.