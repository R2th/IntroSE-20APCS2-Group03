#  3 simple rules để trở thành git Master
Ở bài viết này tôi muốn trình bày về 3 simple rules để giúp bạn trở thành một Git Master
Mình sẽ không trình bày về các thao tác với Git ở đây nếu bạn chưa quen với Git thì có thể tham  khảo [trang chủ của Git](https://git-scm.com/docs/gittutorial) 
Không đợi gì nữa chúng ta sẽ bắt đầu luôn.
## Rule 1: Tạo một Git repository cho mọi new project
Quy tắc đầu tiên này khá đơn giản, nhưng việc tạo ra một thói quen là rất quan trọng. Mỗi khi bạn bắt đầu làm việc về một thứ gì đó mới - project cá nhân , một dự án học tập, một giải pháp , v.v. - bạn nên tạo một kho lưu trữ Git mới và đẩy nó vào GitHub. Có một repo chuyên dụng là bước đầu tiên để có thể sử dụng kiểm soát phiên bản cho mỗi dòng mã bạn viết. Sử dụng kiểm soát phiên bản là cách bạn sẽ làm việc khi bạn tham gia một công ty và bắt đầu làm việc trên các dự án trong thế giới thực. Tìm hiểu điều này sớm và biến nó trở thành thói quen.
## Rule #2: Tạo a new branch cho mọi  new feature
 Nếu bạn không biết nhánh là gì có thể tham khảo tại [Github Flow](https://guides.github.com/introduction/flow/)
 
 ![](https://images.viblo.asia/cd211839-4893-4c99-850d-98ff8fe71a5e.png)
 Làm việc với các nhánh cho phép bạn và các thành viên trong nhóm của bạn làm việc trên các tính năng khác nhau theo cách song song trong khi vẫn giữ mã cụ thể cho mỗi đối tượng địa lý được tách biệt với phần còn lại. Điều này làm cho mã không ổn định trở nên khó khăn hơn để được hợp nhất vào cơ sở mã chính. Ngay cả khi bạn là người duy nhất trong nhóm của bạn, việc sử dụng để sử dụng các chi nhánh tính năng sẽ làm cho quy trình Github Flow trở nên dễ dàng hơn khi bạn tham gia một công việc thực sự.
## Rule #3: Sử dụng Pull Requests để merge code tới Master
Mỗi repository bắt đầu với một nhánh master theo mặc định. Bạn không bao giờ nên push các thay đổi trực tiếp đến nhánh chính. Thay vào đó, bạn nên sử dụng các nhánh tính năng như được mô tả ở trên, và mở một Pull Request mới để kết hợp mã chi nhánh tính năng với mã chi nhánh chính.
Trên thực tế, Một người nào đó trọng dự án sẽ xem sét và đánh giá Pull Request của bạn trước khi approval nó. Git hub sẽ tự động kiểm tra code của bạn và thông báo cho bạn biết những  vấn đề xảy ra với nó.Bạn cũng sẽ được thông báo nếu có bất kỳ xung đột hợp nhất nào giữa code của bạn và code trong nhánh master. Điều này có thể xảy ra khi 2 người trong team của bạn cùng sửa một file nào đó trên cùng một dòng ...
Sau khi code của bạn đã được review , test và aprove người review sẽ đưa cho bạn một thumbs up để bạn merge pull request hoặc người ta sẽ tự merge pull request.

![](https://images.viblo.asia/a9e6c534-573b-4816-9d3c-200bf803d984.png)

Ngay cả khi bạn đang làm việc một mình, làm quen với việc tạo ra các pull request như một cách để kết hợp các thay đổi của bạn với nhánh chính. Điều này, bằng cách này, là công việc cơ bản được sử dụng bởi hầu hết các dự án nguồn mở.
Hiểu được ba quy tắc này sẽ giúp bạn dễ dàng nhận được đóng góp của mình mà không có bất kỳ vấn đề gì.

Tôi viết bài viết dựa trên nhưng gì đã học được. Hy vọng bài viết sẽ giúp bạn một phần trở thành Git Master