_Bài viết được dịch từ thoughtworks.com
Trong bất cứ vòng đời của dự án nào, mục đính của chúng ta nên là tự động hóa mọi hoạt động cần lặp lại khi tạo và bảo trì hệ thống. Việc thực hành tự động hóa Ruthless automation là cách để tự động hóa các nhiệm vụ như vậy.

Trong vòng đời dự án, do lí do hạn chế về mặt thời gian hoặc thiếu nhận thức về việc cần thiết phải tự động hóa, chúng ta có xu hướng bỏ qua hoặc không xác định được tự động hóa các công việc bằng tay và lặp đi lặp lại các công việc đó.

Tôi sẽ chia sẻ với các bạn về cách mà tôi xác định và tự động hóa một số công việc giúp tôi giảm bớt các công việc bằng tay và tăng năng suất.

Dự án mà tôi tham gia là một trang web tiếp thị có nội dung phong phú, đòi hỏi dữ liệu tương tác phức tạp với tính sẵn sàng cao.

Dưới đây là một vài tình huống tôi đã gặp và đã cố gắng tự động hóa những công việc mệt nặng nề trong đó.

Liên tục lặp lại việc thiết lập dữ liệu kiểm thử
Khó khăn:
Chúng ta có rất nhiều loại môi trường ví dụ như SIT, Integration, UAT, vv... Với mỗi chức năng mới ta lại phải kiểm thử xem chức năng này có hoạt động ổn định trong các môi trường nói trên hay không.

Mỗi khi có chức năng mới ra đời, tôi lại phải tạo dữ liệu mẫu trên nhiều môi trường kiểm thử. Mặc dù tôi có thể REST plugins cho trình duyệt (ví dụ như POSTMAN), tôi vẫn gặp khó khăn với việc theo dõi tất cả dữ liệu dành cho chức năng mới. Ngoài ra tôi cũng có sự chuẩn bị cho mỗi môi trường khi xóa dữ liệu. Khi xóa dữ liệu, tôi cần phải tạo lại dữ liệu một lần nữa. Thêm vào đó, việc upload nhiều biến thể của cùng một dữ liệu càng trở nên khó khăn. Đây là điều tôi không bao giờ mong muốn.

Giải pháp:
Tôi đã viết một đoạn script nhỏ để giải quyết vấn đề của mình. Với đoạn script này, tôi có thể upload biến thể của dữ liệu lên bất kì môi trường nào hỗ trợ và nhờ đó tôi có thể dễ dàng theo dõi phiên bản dữ liệu nào đang được sử dụng trên môi trường kiểm thử nào.