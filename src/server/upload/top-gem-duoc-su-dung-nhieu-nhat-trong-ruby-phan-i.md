Framgia là một trong những công ty top đầu tại Việt Nam về Ruby và Ruby on Rails. Hầu hết những người đã sử dụng ruby đều có chung đánh giá rằng đây là một ngôn ngữ linh hoạt và có một cộng đồng hoạt động vô cùng sôi nổi. Bên cạnh đó, Ruby on Rails cũng được đánh giá cao bởi nhiều giải pháp có sẵn cho phép phát triển phần mềm một cách nhanh chóng. Sở dĩ nói như vậy là vì nó sử dụng các `Ruby gem` - Là những thư viện với các chức năng cụ thể cho phép chúng ra mở rộng và tùy chỉnh ứng dụng của mình. Trong RoR, có đầy đủ các gem để phục vụ các mục đích khác nhau: từ `authentication`  và `authorization`, cho đến `processing` và `testing`.
# Active Record 
Active Record là ORM mặc định của Ruby on Rails. Mặc dù nó cung cấp một lượng `function` phong phú, trong một vài project cụ thể ta vẫn cần phải custom lại theo yêu cầu của khách hàng. Dưới đây là các gem giúp mở rộng chức năng cho Active Record, làm cho nó trở nên mạnh mẽ, mềm dẻo và linh hoạt hơn. 

`Pagination` - Để phân trang, bạn hãy thử sử dụng gem có tên là [Kaminari](https://github.com/kaminari/kaminari). Đây là một `paginator` cực ký linh hoạt, không cần config gì phức tạp và sử ụn scope để xử lý các query của ActiveRecord.

`Categorization` - Để phân loại và cấu trúc dữ liệu trong một blog, một trang web tin tức, hay một mạng xã hội, bạn có thể muốn sử dụng `tag`. Trong trường hợp này, gem [ActsAsTaggableOn](https://github.com/mbleigh/acts-as-taggable-on) cho phép bạn gán nhãn object (model và controller) theo một số thuộc tính tùy vào nội dung app.

`Clone` - Nếu bạn cần tạo một bản sao của một `Active Record object` và các quan hệ của nó, hãy xem qua [deep_cloneable](https://github.com/moiristo/deep_cloneable), gem có thêm các `method` cho `object` để sao chép chính nó. Deep_cloneable cung cấp cho bạn một bản sao chính xác với công sức tối thiểu. 

`Soft delete` - [Paranoia](https://github.com/rubysherpas/paranoia), thay thế cho `acts_as_paranoid`,  thực hiện một hàm `soft delete`. Sau khi gọi destroy trên một `ActiveRecord object`, `Paranoia` không xóa những record đó trong database. Thay vào đó, gem này sẽ ẩn object bằng cách `scoping` các query trên model. Nếu bạn thực sự muốn xóa record, bạn phải dùng hàm `really_destroy.`

`Finite state machines` - [AASM](https://github.com/aasm/aasm), thay thế cho plugin `theacts_as_state_machine`, hoạt động với bất kỳ object Ruby nào có chứa ActiveRecord. `AASM` thêm các `finite state machines` (một tập các rule mà app cần tuân theo) vào các class Ruby.

`Versioning` - [PaperTrail](https://github.com/airblade/paper_trail) sẽ giúp cho bạn không còn bực bội khi không thể `undo` hay `redo` thay đổi trong model. Với `PaperTrail`, bạn có thể `version` model của mình, add, undo, redo, phục hồi dữ liệu, làm việc với quan hệ giữa các model, ..v..v..

`Internationalization` - bạn sẽ cần đến gem [Globalize](https://github.com/globalizejs/globalize) để dịch ứng dụng của mình sang các ngôn ngữ khác, được hỗ trợ bởi `I18n API`. `Globalize` thêm các bản dịch của nội dung website vào `ActiveRecord model`, đặc biệt hữu ích khi bạn giải quyết các database có nội dung `non-static`.

# Testing
Chắc hẳn chúng ta đã không ít lần viết test trong các project của mình. Và dưới đây là các gem mà được các developer sử dụng nhiều nhất để hỗ trợ quá trình test, đảm bảo chất lượng cho project của họ

Với unit test, chúng ta có [Rspec](https://github.com/rspec/rspec-rails), một `testing framework` chính được sử dụng trong môi trường TDD và BDD. Cú pháp của `rspec` khá gọn gàng và dễ hiểu, vì thế các test (hay spec) được viết một cách giống nhất có thể với ngôn ngữ chúng ta sử dụng hàng ngày. `Rspec` là một công cụ vô cùng hiệu quả cho việc test hành vi của model hay một library.

[Database Cleaner](https://github.com/DatabaseCleaner/database_cleaner) cũng thường được sử dụng với rspec để dọn dẹp database trong quá trình test. Nó cung cấp cho chúng ta một sự linh hoạt trong việc lựa chọn khi nào DB được dọn dẹp: trước khi chạy test hoặc cả trước và sau khi chạy mỗi test. Và nếu bạn gặp phải vấn đề từ các request mở rộng trong quá trình test, bạn có thể muốn tìm một giải phép như gem [VCR](https://github.com/vcr/vcr), nó sẽ thu thập lại tất cả các request đó cùng với response và ghi lại vào một file để bạn có thể `replay` lại chúng trong khi test.

Tiếp theo là việc tạo test data, chắc hẳn các bạn cũng khá quen thuộc với [factory_bot](https://github.com/thoughtbot/factory_bot). Nó cho phép các bạn tạo một tập dữ liệu cho model, vì thế không cần phải nhập data bằng tay mỗi lần chạy unit test. Bện cạnh đó chúng ta cũng sử dụng gem [Faker](https://github.com/stympy/faker)  để tạo dữ liệu fake cho model như name, email, ....

Sau đó là [Capybara](https://github.com/jnicklas/capybara), một testing framework hỗ trợ cho việc test giao diện. Nó giúp cho bạn test các ứng dụng web của mình bằng cách mô phỏng một người dùng thực sẽ tương tác với ứng dụng của bạn như thế nào.

Một gem khác, [Shoulda matchers](https://github.com/thoughtbot/shoulda-matchers), cho phép ta dễ dàng test các functions điển hình của Rails như `validations` và `association` bằng cách viết các test one-line tương thích với `rspec`. Nói cách khác, `shoulda-matchers` cung cấp các `matcher` nhằm giúp các developer test các tính năng cơ bản của rails một cách dễ dàng và nhanh chóng. 

Cuối cùng là gem [simplecov](https://github.com/colszowka/simplecov) cho phép chúng ta xem lượng code được cover bởi unit test. Gem này giúp chúng ta kiểm tra xem bao nhiêu code đã được test và cố gắng để được kết quả tốt hơn (mặc dù có một sự thật là đạt 100% là một thử thách không hề nhỏ)

# Coding style
Coding stype rất quan trọng. Để viết được những dòng code chất lượng, những Ruby dev giỏi follow các style trong [The Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide). Nhưng tại sao các developer lại quan tâm đến style nhiều như vậy? Theo `Ruby Style Guide`, nếu viết tốt thì code trong ruby có thể được đọc như ngôn ngữ tự nhiên, và có thể hiểu dễ dàng bởi những người không phải là dev. Hơn nữa, những dòng code được viết tốt thì sẽ dễ dàng để maintain, chỉnh sửa và mở rộng.
Để đảm bảo chất lượng code, các developer áp dụng cá gem để phân tích của họ và đưa ra các gợi ý tốt hơn. Dưới đây là một số gem như thế.

Gem [rails_best_practices](https://github.com/flyerhzm/rails_best_practices) là một công cụ tiêu chuẩn để phân tích và tìm ra những đoạn code xấu. Một số đoạn code tuy không phải là lỗi về kỹ thuật, nhưng có thể làm phát sinh các vấn đề khác trong tương lại. `Rails_best_practices` đưa ra các gợi ý để cải thiện đoạn code của bạn. Ví dụ: xóa các đoạn tab thừa, comment trong model.... Bạn có thể chia sẻ kết quả phân tích với đồng nghiệp và theo dõi kết quả qua thời gian để nhận thấy rằng những đoạn code của mình đã được cải thiện như thế nào.

Một gem khác cũng được sử dụng thường xuyên bên cạnh `rails_best_practice`, đó là [rubocop](https://github.com/bbatsov/rubocop). Nó giúp đảm bảo code của bạn tuân thủ đúng theo `Ruby Style Guide`. `Rubocop` không cho phép viết những dòng code sai quy tắc, chúng sẽ được report lại ngay trong command line. Một vào developer có thể cảm thấy điều này khác phiền phức, nhưng nó hoàn toàn có thể cấu hình lại để chỉ show ra các gợi ý refactor code. Và một điều quan trọng, với những lỗi như line break, syntax,... rubocop có thể fix một cách tự động mà không cần bạn động tay vào.

Cuối cùng, gem [RubyCritic](https://github.com/whitesmith/rubycritic) giúp cung cấp report dựa trên chất lượng code. Nó sẽ tạo một file HTML và  bao gồm tên file, chất lượng và đánh giá từ "A' đến "F"
(còn nữa)
Cảm ơn các bạn đã theo dõi bài viết của mình.

Nguồn: https://rubygarage.org/blog/best-ruby-gems-we-use