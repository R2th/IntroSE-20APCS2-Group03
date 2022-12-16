Theo một số thông tin rò rỉ mình nắm được thì khả năng phiên bản RUBY 3.0 sẽ được release vào dịp lễ Christmas năm nay(2020).
Mình có đọc một số bài viết nói về những vấn đề gặp phải của Ruby và Ruby on Rails(https://sloboda-studio.com/blog/tech/is-ruby-on-rails-dying/). Cơ mà theo bản thân mình thì Ruby vẫn còn phát triển mạnh và mình tin RUBY 3.0 này sẽ đem lại một số thay đổi vượt bậc về mọi mặt.

Hôm nay mình xin điểm qua một số tính năng và cải tiến có thể ra mắt vào version sắp tới **Ruby 3.0**.

Có 4 điểm chính được đề cập đến trong trong version 3.0 này là: **Performance**(hiệu suất), **Concurrency**(đồng thời), **Static analysis**(thống kê tĩnh) và **Transition issues**(các vấn đề về up/down version)

![](https://images.viblo.asia/cfdc97da-47b9-4982-8431-6e142395cbf8.png)
## Performance: no more issues
#### Memory performance
Ở Ruby 2.6 vẫn còn tồn đọng một số vấn đề về hiệu suất của Ruby on Rails và đặc biệt là vấn đề về xử lí bộ nhớ sử dụng.

Vấn đề này xảy ra khi chúng ta tạo mới một object và sau đó bị phân mảng và nằm rải rác trong bộ nhớ dẫn đến việc một phần bộ nhớ của CPU bị chiếm.

Để giải quyết vấn đề này Ruby 3.0 đã sử dụng **garbage compactor**, có thể hiểu nó như là một cái máy dọn rác. Một số tính năng của **GP**:

* **Object separation**: Tách biệt các object với nhau, ngoại trừ những object đang được sử dụng thì phần còn lại có thể đưa vào heap
* **Auto-compaction**: Tính năng này cho phép tự động dọn dẹp memory không cần thiết mà không cần phải chạy câu lệnh nào khác.
#### CPU performance
Một trong những bản cập nhật hứa hẹn nhất về hiệu xuất của Ruby CPU đó là phiên bản mới của Ruby JIT. Hy vọng trong phiên bản cập nhật mới của JIT sẽ cải thiện được những vấn đề của Ruby và mang lại hiệu xuất đáng kể ngoài JIT ở phiên bản hiện tại.
## Concurrency Changes
#### Falcon Rack web server and Async
Falcon Rack là một framework Input/Output không đồng bộ có thể kết hợp với Ruby. Cùng với **Async**, Falcon Rack sẽ không còn block dữ liệu Input/Ouput. Khác với web server hiện tại là sẽ block I/O và một số tiến trình sau phải cần thêm thời gian chờ cho đến khi tiến trình đang diễn ra sử dụng xong tài nguyên(tài nguyên ở đây có thể là memory, database), bất đồng bộ sẽ giải phóng server và cho phép tiếp nhận các request khác trong khi nó vẫn đang đợi database, kho bộ nhớ hoặc gọi API

#### Parallel computation
Ở phiên bản ruby hiện tại có hỗ trợ **global VM lock(GVL)**, nó cho phép chúng ta sử dụng parallel computing. Còn ở version 3.0, chúng ta có thể sử dụng parallel threaded computation.

Có nghĩa là ruby hiện tại là một ngôn ngữ đơn luồng. Với version 3.0, nó có thể xử lí song song nhiều tác vụ đồng nghĩa với việc thời gian xử lí sẽ nhanh hơn.
## Static analysis: Giúp clearer code
Static analysis là một tool cho phép người có thể kiểm tra đoạn code sau khi test. Điểm cộng của tool này là giúp code của chúng ta đúng chuẩn design hơn nhưng bù lại thì nó hoạt động dựa trên các annotation được viết trong các file ruby nên sẽ khó tránh khỏi việc trùng lặp trong code.

Có 2 phương pháp chính đó là:
- Steep
- Sorbet

Vào tháng 6/2020, đội Stripe đã cho ra đời một type-checker có tên là Sorbet, mặc dù là phiên bản đời đầu nhưng nó cũng khá mạnh để áp dụng vào Ruby. Mn có thể xem chi tiết hơn [ở đây nhé](https://github.com/sorbet/sorbet#running-the-tests). Sorbet sử dụng **inline type annotations** trong khi Steep thì **parallel annotation files**. Cũng chính vì thế Sorbet có vẻ nhanh.

## Backward compatibility
Việc chuyển đổi giữa các version Ruby khác nhau không còn là vấn đề và sẽ có **warnings** hiển thị ở logs giúp cho việc fix lỗi trở nên nhanh hơn.

![](https://images.viblo.asia/2add5a93-93a0-4430-86a6-c76d7b716dd6.png)

## Special features
- Right Assignment: `variable_value => variable_name`
- Một vài thư viện được cập nhật: RubyGems 3.2.0.rc.1, Bundler 2.2.0.rc.1, IRB 1.2.6, Reline 0.1.5

=> Trên đây là một số thông tin mình tổng hợp được về những tính mới có thể có trong phiên bản Ruby 3.0. Mọi người hãy cùng chào đón ngày ra mắt vào mùa lễ chrismas năm nay nhé. Có một số thông tin mình không hiểu lắm nên đã không đưa vào bài viết. Mọi có thể đọc thêm ở các link bên dưới phần tham khảo để hiểu rõ hơn nhé.

Cảm ơn mọi người đã đọc :hugs::hugs:

### Tài liệu tham khảo
- https://sloboda-studio.com/blog/big-news-ruby-version-3-0/
- https://medium.com/@gunjansolanki_007/ruby-3-0-revealed-b0cbfb352d8d