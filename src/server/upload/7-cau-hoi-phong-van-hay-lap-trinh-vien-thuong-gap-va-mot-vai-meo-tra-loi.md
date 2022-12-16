Chào các bạn, lại là mình đây.:sweat_smile:

Hôm nay mình xin phép được chia sẻ một số câu hỏi phỏng vấn mà lập trình viên thường gặp. À mà một số câu cũng không "thường gặp" lắm, thực chất là mình gặp. :joy: .Nhưng mình nghĩ chia sẻ ra cũng là một ý hay, thêm vào đó là câu trả lời của mình và một số tips mình nghĩ sẽ hữu dụng khi gặp những câu hỏi như vậy.
Thôi không dài dòng nữa, vào việc chính nào...

Đầu tiên là một số câu hỏi chung cho lập trình viên mà mình gặp phải , cụ thể hơn đó là về hướng đối tượng và về git :smile:
## Lập trình hướng đối tượng có bao nhiêu tính chất ? Em hiểu "trừu tượng" là gì?
### Lý thuyết
Lập trình hướng đối tượng có 4 tính chất chính:
* Tính trừu tượng (abstraction)
* Tính kế thừa (inheritance)
* Tính đóng gói (encapsulation)
* Tính đa hình (polymorphism)

Trừu tượng hóa là quá trình đơn giản hóa một đối tượng mà trong đó chỉ bao gồm những đặc điểm chính và bỏ qua những đặc điểm chi tiết nhỏ mà không làm thay đổi nội dung.
### Trả lời
Lập trình hướng đối tượng có 4 tính chất chính:
* Tính trừu tượng (abstraction)
* Tính kế thừa (inheritance)
* Tính đóng gói (encapsulation)
* Tính đa hình (polymorphism)

Trìu tượng hóa là quá trình đơn giản hóa một đối tượng mà trong đó chỉ bao gồm những đặc điểm chính mà chúng ta quan tâm, bỏ qua những đặc điểm, chi tiết nhỏ không quan trọng .( Đoạn này bê y chang lý thuyết mà vã thôi.:sweat_smile:). Ví dụ như là cùng một việc kể câu truyện  cô bé quàng khăn đỏ, ta có thể kể toàn bộ câu truyện, hoặc tóm tắt nó trong 5 dòng, 7 dòng bằng cách đúc rút những chi tiết chính, nhân vật chính. Bằng cách này, người nghe vẫn có thể hiểu được cốt truyện. 
### Tips

Trên phương diện một người phỏng vấn, họ nghe quá nhiều về lý thuyết, nhất là những câu hỏi đơn giản và cơ bản như này, nên họ cần nghe một điều gì đó mới mẻ, và chứng minh rằng bạn hiểu rõ vấn đề, nên thay vì chỉ nói rõ lý thuyết mà bạn đã học thuộc, hãy đưa một ví dụ thực tế và dễ hiểu nhất có thể, điều này sẽ giúp người phỏng vấn có cái nhìn thiện cảm hơn. ( Cái này là do anh CTO trực tiếp phỏng vấn mình chia sẻ chứ không phải mình chém đâu nha. :3 )
## Git là gì? Sự khác biệt giữa Git và SVN
Git là một trong những Hệ thống Quản lý Phiên bản Phân tán, vốn được phát triển nhằm quản lý mã nguồn (source code) hữu hiệu của Linux.

Trên Git, có thể lưu trạng thái của file khi có nhu cầu dưới dạng lịch sử cập nhật. Vì thế, có thể đưa file đã chỉnh sửa một lần về trạng thái cũ hay có thể hiển thị sự khác biệt ở nơi chỉnh sửa.

Thêm nữa, khi định ghi đè (overwrite) lên file mới nhất đã chỉnh sửa của người khác bằng file đã chỉnh sửa dựa trên file cũ, thì khi đăng (upload) lên server sẽ hiện ra cảnh cáo. Vì thế, sẽ không xảy ra thất bại về việc đã ghi đè lên nội dung chỉnh sửa của người khác mà không hề hay biết.

Sự khác biệt giữa Git và SVN:


| Git | SVN |
| -------- | -------- |
| Git là hệ thống quản lý phiên bản phân tán     | Git là hệ thống quản lý phiên bản tập trung     |
| Người dùng có thể clone toàn bộ repository về máy local    | Lịch sử version được lưu trữ trên server    |
| Có thể commit ngay cả khi bạn offline   | Chỉ có thể commit khi online |
| Việc push/pull được thực hiện nhanh hơn| Việc push/pull được thực hiện chậm hơn git |
|Công việc được chia sẻ một cách tự động thông qua commit|Không thể chia sẻ một cách tự động|


## Khi gặp một lỗi về git mà em không thể tìm ra nguyên nhân, em sẽ làm gì để xử lí lỗi này?
Vâng, vẫn là anh CTO lúc nãy, phỏng vấn internship mà hỏi khoai không chịu được. :v
### Trả lời
- Đầu tiên em sẽ dùng câu lệnh `git log --oneline` để kiểm tra xem có gặp vấn đề gì với danh sách commit không, nếu không em sẽ `git reset --soft` về commit được merge gần nhất và tiến hành commit lại
- Nếu trường hợp danh sách commit bị gặp vấn đề , em sẽ dùng câu lệnh `git reflog` để kiểm tra và revert lại những hành động vừa làm về thời điểm code vẫn ổn định và chưa gặp lỗi, sau đó tiếp tục làm việc theo đúng flow
( Phần này sau anh đó gật gật nên mình nghĩ cũng vừa ý rồi )
## Interface và Abstract class khác nhau điểm nào?
Câu này có vẻ là câu hỏi ưa thích khi phỏng vấn vị trí internship hay junior. Bằng chứng là mình có đi phỏng vấn chơi 3 nơi và cả 3 đều hỏi. :smile:
Thật ra nó cũng đơn giản thôi, mình tách thành bảng như sau cho dễ hiểu nhé :


| Interface | Abstract class|
| -------- | -------- |
| Không phải là class     | Là class, có chút tương đồng với interface |
| Chỉ định nghĩa methods trống không thực thi |  Phân ra 2 loại, abstract method ( giống như method của interface) và method thường (định nghĩa và thực thi như các method khác ) |
|  Một class có thể **implement** nhiều interface | Một class chỉ có thể **extend** một abstract class|

Bạn nên nhớ keyword chính để phân biệt giữa hai cái này đó là : interface thì được **implement** , còn abstract class thì được **extend** (kế thừa)
## Session và cookie là gì? Chúng khác nhau điểm nào?
### Trả lời
Một session hay còn gọi là một phiên làm việc,nó đơn giản là cách giao tiếp giữa client với server. Một session bắt đầu khi client gửi request đến server, và tồn tại xuyên suốt từ trang này đến trang khác trong ứng dụng và chỉ kết thúc khi hết thời gian timeout . Giá trị của session sẽ được lưu trong một tệp tin trên server

Cookie là một đoạn văn bản ghi thông tin được tạo ra và* lưu trên trình duyệt của máy người dùng. Cookie thường được tạo ra khi người dùng truy cập một website, cookie sẽ ghi nhớ những thông tin như tên đăng nhập, mật khẩu, các tuỳ chọn do người dùng lựa chọn đi kèm. Các thông tin này được lưu trong máy tính để nhận biết người dùng khi truy cập vào một trang web.

Sự khác nhau giữa session và cookie :


| Session | Cookie |
| -------- | -------- |
| Lưu trữ trong một thư mục trên server     | Lưu trữ ở client, cụ thể hơn là trên trình duyệt của người dùng  |
|  Khó có thể sửa đổi do được lưu trữ trên server | Dễ dàng sửa đổi do lưu trữ ở client |
## Khi đóng trình duyệt thì session sẽ mất đúng không ?
Đây gần như là câu thần chú auto được đọc ra với các bạn phỏng vấn internship hoặc junior : **Session sẽ mất khi trình  duyệt đóng**

Bản thân mình thấy câu nói này chỉ đúng một phần nhỏ, thậm chí xét theo nghĩa đen của câu nói thì mình nghĩ nó sai hoàn toàn. :v. 

Như ta đã khẳng định ở trên  **Session được lưu trên server** , vậy làm sao có thể mất khi đóng trình duyệt được. (confused). Qua quá trình tìm hiểu + hỏi một số dev lâu năm, mình cũng hiểu rõ , và có một câu trả lời của một người bạn mình thấy đúng và hợp lý nhất.

Thử tưởng tượng trong một ngày hè nóng bức, bạn đi bơi và được giao cho một ngăn tủ để quần áo. Mỗi tủ quần áo chỉ có thể mở được bằng một chìakhóa. Trong trường hợp này chiếc tủ chính là session, được lưu trên server ( phòng để đồ ). Bạn ( client ) giữ (lưu) một chiếc chìa khóa để mở tủ ( session cookie) . Nếu bạn làm mất chìa khóa thì bạn sẽ không dùng được tủ, và nếu tủ không được sử dụng một thời gian sẽ bị vứt đi ( có vẻ giàu.:relieved: ) 

=> Qua ví dụ trên ta có thể trả lời được câu hỏi này. Khi đóng trình duyệt, session cookie (lưu ở client ) tương ứng với session (lưu trên server) sẽ bị mất, đồng nghĩa session trên server cũng sẽ vô dụng ( nhưng vẫn ở đó cho đến khi hết thời gian mới tự xóa ) .  Đó là nguyên nhân mình nói khẳng định trên chỉ đúng một phần.

Khi bạn gặp câu hỏi này, bạn có thể trả lời nó mất hay không có lẽ đều được, nhưng mấu chốt bạn phải giải thích được để người phỏng vấn biết rằng bạn hiểu cốt lõi của vấn đề...

## Liệu có thể chỉnh sửa đường dẫn lưu session được không?

Session được lưu trên server, trong PHP, session được lưu dưới dạng  tập tin và lưu ở thư mục `/var/lib/php/session`. Ta có thể config đường dẫn lưu session ở trong file `php.ini`

Thậm chí ở một số project lớn, họ còn có thể lưu session trong database, hay một số hệ thống lưu trữ lớn khác. 


# Tổng kết
Bài viết cũng khá dài rồi, có lẽ mình xin phép dừng ở đây thôi. Bài viết trên là kiến thức của mình học được cộng với tham khảo một số nguồn. Nếu có gì sai xót hay nhầm lẫn, mong các bạn có thể góp ý trực tiếp bằng cách comment bên dưới. Camon và xinchao. :kissing: