Trước tiên, Deprecating là tính từ chỉ một tính năng, đoạn code đã lỗi thời, được thay thế bằng cái mới hơn, và tốt nhất nên tránh sử dụng tính năng, đoạn code đó. Trong bài viết mình sẽ không dịch deprecate ra vì không thực sự có từ tiếng Việt nào thể hiện đúng ý nghĩa của nó.

Khi update Rails app sang một version framework mới hơn, bạn thường thấy cảnh báo deprecation trong logs app hoặc test  output. Cảnh báo deprecation cho bạn thời gian để giải quyết vấn đề trước khi nó trở thành một error thực sự. Một cảnh báo deprecation tốt có thể cho bạn biết phải fix như thế nào và ở đâu.
Rails hỗ trợ việc tạo một cảnh báo deprecation tốt một cách khá đơn giản, chỉ cần thay đổi một chút code vào app.
### Thêm cảnh báo deprecation
Trong method bạn muốn thêm deprecate, sử dụng  ```ActiveSupport::Deprecation.warn```, cùng với string mô tả cái gì deprecated, và lập trình viên phải làm như thế nào để xử lí.
```
def process_widget
  ActiveSupport::Deprecation.warn(
    "#process_widget is deprecated. " \
    "Use #send_widget_to_processor instead."
  )
  # other code ...
end
```
Sao đó, trong app logs của bạn (hoặc trong test output), bạn sẽ thấy thông báo như sau:
```
DEPRECATION WARNING: #process_widget is deprecated. Use
#send_widget_to_processor instead. (called from create at /path/to/
my_app/app/controllers/widgets_controller.rb:123)
```
Cảnh báo deprecation chỉ ra rõ ở đâu trong app của bạn vẫn còn sử dụng code "tối cổ". Nếu bạn không thấy cảnh báo deprecation trong test output, và bạn tự tin với độ bao phủ của các test case thì hãy xóa đoạn code "tối cổ" đi.
### Tại sao bạn nên deprecate code của mình
Bạn có thể thắc mắc tại sao phải deprecate code trong khi có thể fix nó luôn ngay từ "cái nhìn đầu tiên"? Khi nâng cấp một đoạn code sẽ có thể có rất nhiều tính năng cần thay đổi theo. Vậy nên tự đặt ra một số câu hỏi như sau có thể giúp bạn đưa ra quyết định dễ dàng hơn:
* Cần bao lâu để chuyển đổi qua code mới? Một giờ? Một ngày? Một tuần? Hay lâu hơn?
* Team của bạn có thể chuyển đổi ngay hay không? Hay đang có các task với mức độ ưu tiên cao hơn?
* Bạn có thể trao đổi sự nâng cấp với nhiều team khác hay không?

Việc ngưng sử dụng code deprecated càng tốn nhiều thời gian hoặc càng nhiều người cần được biết sự nâng cấp đó, thì việc sử dụng cảnh báo deprecation càng có nhiều lợi ích.

Về quan điểm cá nhân, tôi tích cảnh báo deprecation bởi vì chúng thật sự quá "noisy" và tôi không thể phớt lờ nó mãi, chúng được gắn thẳng vào code thay vì sử dụng Jira hoặc Trello để không lãng quên nó. Giống như các tool khác, việc sử dụng nó vào code của bạn hoàn toàn phụ thuộc vào quyết định của bạn và team.

Mong rằng mẹo nhỏ này hữu ích với bạn