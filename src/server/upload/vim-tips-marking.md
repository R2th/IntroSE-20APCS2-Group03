# Introduction
Marking là một tính năng khá ít được biết đến trong vim. Tuy nhiên, một khi bạn gặp một project lớn, hoặc phải debug chéo file thì nó lại tỏ ra đặc biệt hữu ích. Hãy cùng tìm hiểu cách sử dụng tính năng này trong vim nhé!
# What is Marks?
Trước khi cùng đi tìm hiểu cách khai thác tính năng này của vim, ta cần tìm hiểu xem nó giải quyết vấn đề gì:
* Thử tưởng tượng project của bạn có nhiều file, khi bạn debug đến một dòng nào đó của file, nó lại dẫn sang file khác, bạn sang file đó, tìm hiểu xong, thì quên mất đoạn code mình đến trước đó nằm ở file nào, dòng nào, và lại phải mất thời gian ngồi tìm lại.
* Marks dịch ra tiếng việt là "đánh dấu". Đúng như tên gọi của nó, tính năng này dùng để đánh dấu một đoạn code mà sau này bạn muốn tham khảo lại. Bạn có thể tưởng tượng nó khá giống với tính năng "bookmarks" của trình duyệt.
* Tóm lại, Marks ở trong vim là một tính năng cho phép bạn có thể đánh dấu lại các đoạn code mà mình muốn, từ đó có thể tham khảo lại một cách nhanh chóng

# Two types of marks
* Vim cho phép bạn tạo 2 loại marks
    * Temporary marks: (Local marks): những đoạn code dùng temporary marks chỉ có tác dụng khi buffer sử dụng mark đó còn đang mở, đóng buffer vào là mất luôn (Buffer là gì thì bạn tham khảo bài viết trước của mình nhé)
    * Long-terms marks (Global marks): là những marks sẽ chỉ mất khi bạn xóa nó.

# Creating marks
* cú pháp chung để tạo marks:
    * m{a-zA-Z}: có nghĩa là bạn bấm `m`, theo sau là các kí tự a-z cả hoa và thuờng, vậy là xong! Ví dụ: `ma`, `mZ`

# Viewing marks
* để xem những marks đã được tạo, chúng ta dùng lệnh:
    * `:marks`
  
chúng ta sẽ thấy kết quả như màn hình dưới: ![](https://images.viblo.asia/199ebe76-1c4a-4d78-8f54-379654b102a0.png)
Hãy cùng xem xét qua bảng này:
* cột `marks`: là index của mark, vd là mark số 0, số 1,...
* cột `line`: là dòng mà mark đó đang chỉ đến
* cột `col`: là cột mà mark đó đang chỉ đến
* cột `file/text`: là file/dòng mà mark đó đang chỉ đến


ví dụ, ở đây bạn có thể thấy mark số 0 đang chỉ đến dòng 1 và cột 0, dòng đó có nội dung `#include <stdio.h>`
hay mark số 4 đang chỉ đến dòng 11, cột 1 của file wsdebug.c

# Local and Global marks
* Việc đánh dấu bằng chữ hoa hay chữ thường (vd: `ma` và `mA`) mang ý nghĩa rất khác nhau trong vim, cụ thể:
    * Với chữ thường: bạn sẽ tạo local marks (có nghĩa mark của bạn chỉ dùng được trên file đang mở, nếu bạn cố gắng truy cập vào 1 local mark chưa được định nghĩa trong file, command này sẽ không có tác dụng)
    * với chữ hoa: bạn sẽ tạo global marks (có nghĩa là với marks này, bạn có thể truy cập chúng từ bất cứ đâu)

* Hãy thử xét ví dụ đơn giản sau, giả sử file của mình đang như thế này, con trỏ chuột đang ở chữ p dòng thứ 6, mình bấm `mA` trong normal mode:
    * ![](https://images.viblo.asia/d0aaaf08-35bf-48ce-a5bf-d476fa631ad3.png)
* Giờ hãy thử mở 1 file khác hoàn toàn:
    * ![](https://images.viblo.asia/2644e371-29c5-4c2d-94d8-f229ff5babd9.png)
* Hãy do marks của mình có tên `A`, mình sẽ truy cập đến đó qua command: `'A` (chú ý là file hiện tại bạn cần save hoặc không có thay đổi gì trên buffer mới chuyển được nhé), kết quả, mình trở lại đúng nơi mà mình đánh dấu mark `A`:
    * ![](https://images.viblo.asia/d0aaaf08-35bf-48ce-a5bf-d476fa631ad3.png)
* Vậy là xong! còn nếu bạn làm việc với file quá dài, thì bạn có thể dùng local marks: thay `A` bằng `a`, mọi thao tác còn lại đều tuơng tự!

# Navigating marks
Bạn có thể di chuyển giữa các marks với nhau, do vim cung cấp 2 kiểu mark là local và global nên cách di chuyển giữa các marks cũng được phân biệt như vậy.

Đầu tiên, hãy cùng xem xét các commands của local marks:
* `]'`: chuyển đến dòng chứa mark tiếp theo 
* `['`: chuyển đến dòng chứa mark trước đó
* ``]` ``: chuyển đến dòng và cột chứa mark tiếp theo
* ``[` ``: chuyển đến dòng và cột chứa mark trước đó

(thực tế thì mình chỉ dùng 2 cái đầu thôi, 2 cái kia khó bấm cả khó nhớ quá!)


Hãy thử xét một ví dụ, hiện tại file này của mình: ![](https://images.viblo.asia/d0aaaf08-35bf-48ce-a5bf-d476fa631ad3.png)

Chúng ta sẽ thử add local marks cho chữ p ở dòng 6, chữ f ở dòng 9 và chữ r ở dòng 16 (bạn nhớ cách add local marks chứ? là `ma`, `mb`, `mc`, `a, b, c` tùy bạn chọn, chữ cái khác cũng được, không sao, miễn là chúng không trùng nhau)

Sau khi add xong, hãy thử dùng tổ hợp phím `]'` và `['` di chuyển qua lại để xem kết quả nhé (chú ý là nếu bạn ở mark đầu tiên thì chỉ có thể next thôi, dùng command previous là nó không ra đâu)


# Navigate to specified mark
* command: `'a` với `a` là tên mark của bạn

Thực ra phần này mình đã minh họa ở trên rồi, các bạn có thể add marks rồi thử lại nhé :D. Chú ý thêm là cách dùng mark này được sử dụng cho cả global mark và local mark.

# Deleting mark:
* Trước hết, bạn cần biết rằng vim lưu trữ các global mark ở file .viminfo. Như vậy, muốn xóa sạch global mark, ta chỉ cần xóa file này là xong
* Nếu như bạn chỉ muốn xóa một mark nhất định nào đó mà không muốn xóa hết, hãy dùng lệnh `delmarks <tên_mark>`, ví dụ: `:delmarks A B c 1`

# Summary:
Ở đây mình xin tóm tắt lại những command mình đề cập tới trong bài, những command này là những cái mình sử dụng nhiều nhất:
* tạo marks: `m{a-zA-Z}
* xem danh sách marks: `:marks`
* nhảy đến 1 marks nhất định: `'a`
* nhảy tới mark tiếp theo: `]'`
* nhảy tới mark trước đó: `['`
* xóa marks: `delmark <mark_names>`

Đó là một số kiến thức và ví dụ cơ bản về việc dùng marks trong vim. Tính năng này như mình đã nói là một tính năng mà không nhiều người để ý khi dùng vim, nhưng một khi đã sử dụng thì mình thấy nó lại cực kì hiệu quả trong việc tăng tốc workflow khi làm việc với vim.

Tất nhiên, đây chỉ là những kiến thức đơn giản nhất, mang tính giới thiệu và minh họa tính năng này trong vim. Bạn cần luyện tập và hãy thử kết hợp nó với những command khác nhằm tăng tốc cho công việc của mình.

Chúc các bạn thành công!