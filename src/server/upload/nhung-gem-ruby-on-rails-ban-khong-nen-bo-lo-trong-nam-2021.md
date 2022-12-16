Trong bài viết kỳ này, mình sẽ giới thiệu với các bạn về những gem rất là uy tín được các developer sử dụng nhiều nhất trong năm 2021. 

# Gem là gì ?
Gem là một thư viện của Ruby. Nó không có gì khác biệt với các thư viện của các ngôn ngữ bình thường khác như PHP, Java hay Python tuy nhiên thư viện trong Ruby được gọi là GEM. Đơn giản chỉ có vậy. Và tất nhiên khi cài đặt rails, chúng ta sẽ sử dụng câu lệnh : 

```
gem install rails -v "xxx"
```

Từ đó suy ra: rails cũng là một gem!

# Những Ruby gem hàng đầu mà các developer thường xuyên sử dụng trong năm nay:

### 1: ACTIVERECORD IMPORT

Có thể dễ dàng import hàng loạt bản ghi bằng **activerecord import**. Đây là một ruby gem rất nhanh và mạnh, bạn không cần phải đợi hàng tá thời giờ để import từng bản ghi một nữa. Để biết cách sử dụng, hãy tham khảo tại [đây](https://github.com/zdennis/activerecord-import) với mức đánh giá là 3,5K sao

### 2: KAMINARY

Với hàng trăm triệu lượt tải xuống, Kaminari đứng đầu trong danh sách ruby gem được sử dụng rộng rãi và phổ biến nhất. Bạn có thể phân trang bất cứ thứ gì kể cả đó là array.

**[GITHUB](https://github.com/kaminari/kaminari) : 7,9K sao

### 3: PARANOIA

Một khi bạn lỡ tay xóa một record thì có thể rất tồi tệ. Do đó, để khắc phục điều này, paranoia làm ẩn record bằng cách xác định phạm vi truy vấn trên model. Tuy nhiên, nếu muốn xóa hoàn toàn, bạn cần phải sử dụng hàm Really_destroy

**[GITHUB](https://github.com/rubysherpas/paranoia): 2,6K sao

### 4: PaperTrial

Bạn thường rất khó chịu với việc sử dụng các hành động hoàn tác và làm lại vì những thay đổi trong model của bạn. Gem PaperTrial giúp bạn giữ lại tất cả các thay đổi bằng cách đặt tên cho tất cả các phiên bản với mọi thay đổi và do đó, việc làm việc với model của bạn trở nên dễ dàng.

**[GITHUB](https://github.com/paper-trail-gem/paper_trail): 6K sao

### 5: GLOBALIZE

Gem này giúp bạn dễ dàng thêm ngôn ngữ nước ngoài vào ứng dụng của mình, tức là, để thích ứng với quốc tế hóa. Globalize gem được cung cấp bởi API i18n của Google. Gem này giúp dịch nội dung cơ sở dữ liệu không tĩnh.

**[GITHUB](https://github.com/globalize/globalize): 2K sao

### 6: AASM

Máy trạng thái cho các lớp Ruby. Nghe qua thì có vẻ rất khó hiểu nhưng gem này cho phép các developer ruby on rails thêm các trạng thái hữu hạn vào các class ruby của chúng. Nó là một thư viện chung cung cấp các bộ điều hợp cho các ORM khác nhau.

**[GITHUB](https://github.com/aasm/aasm): 4,3K sao

### 7: DRAPER

Với Draper, các developer có thể dễ dàng xây dựng các trình trang trí xung quanh các model. Sử dụng Draper Gem trong Ứng dụng Ruby on Rails của bạn thêm các chế độ xem sạch hơn nhiều. Không cần phải viết helper với Draper đang được sử dụng. Các developer có thể dễ dàng xác định một draper thay vì gọi helper theo truyền thống. Nó cũng cung cấp một danh sách các thuộc tính và các phương thức mở rộng cho đối tượng.

**[GITHUB](https://github.com/drapergem/draper): 4,9k sao

### 8: Single Form

Cái tên nói lên tất cả. Simple Form cho phép bạn sử dụng các form trong ứng dụng rails của mình với code hiệu quả và rõ ràng. Nó mang lại sự linh hoạt đặc biệt khi làm việc với các phần tử của form như checklist, radio button, drop-down lists, v.v...

**[GITHUB](https://github.com/heartcombo/simple_form): 7,8K sao

### 9: Meta Tags

Gem này giúp bạn tạo app thân thiện với SEO bằng cách tuân thủ các phương pháp hay nhất về SEO và tạo các thẻ meta hiệu quả.

**[GITHUB](https://github.com/kpumuk/meta-tags): 2,4K sao

### 10: SLIM

Nếu dùng gem thú vị này bạn sẽ được tận hưởng cảm giác thú vị khi code html mà như code css :D

**[GITHUB](https://github.com/kpumuk/meta-tags): 5k sao

### 11: HAML

Gem này là viết tắt của HTML Abstraction Markup Language. Các developer sử dụng nó để nâng cao cấu trúc và thiết kế của các tài liệu HTML / XML của họ.

**[GITHUB](https://github.com/haml/haml): 3,6k sao

### 12: PRY

Developer thường phải đối mặt với các vấn đề tích hợp thư viện hoặc khó khăn trong việc liên kết gem trong khi code. Trong thời gian đó, họ phải xử lý rất nhiều lỗi. Để loại bỏ những vấn đề này và gỡ lỗi, gem PRY rails hóa ra là một lựa chọn lý tưởng. gem này cho phép thiết lập các điểm ngắt và thực hiện gỡ lỗi mã từng bước. Pry đi kèm với một bộ tính năng độc đáo, bao gồm tô sáng cú pháp, gọi thời gian chạy, tích hợp vỏ lệnh, hỗ trợ đối tượng Exotic, hệ thống lệnh linh hoạt và mạnh mẽ.

**[GITHUB](https://github.com/pry/pry): 6,2k sao

### 13: Better Errors

Khi người dùng của bạn gặp phải một trang lỗi không hấp dẫn, họ có thể từ bỏ ứng dụng của bạn. Các trang lỗi tốt hơn sẽ thay thế các trang lỗi RoR vụng về và từ chối bằng các trang lỗi khá cải tiến và tốt hơn.

**[GITHUB](https://github.com/BetterErrors/better_errors): 6,7k sao

### 14: Binding of Caller

Gem ở trên giúp người dùng của bạn có trải nghiệm người dùng tốt hơn nhưng không tìm thấy lý do đằng sau lỗi. Ở đây, gem này cho phép tìm ra các biến dẫn đến ứng dụng bị treo.

**[GITHUB](https://github.com/banister/binding_of_caller): 616 sao

### 15: RSPEC RAILS

Gem RSPEC RAILS là một lựa chọn hoàn hảo cho các developer muốn viết các trường hợp kiểm thử đơn vị. Gem này tạo điều kiện cho ứng dụng tích hợp khuôn khổ RSpec vào bất kỳ dự án Rails nào. Người dùng chỉ cần tạo các tệp cấu hình và trợ giúp thông số kỹ thuật cần thiết. Khung được sử dụng trong môi trường TDD và BDD. Nói một cách dễ hiểu, gem cài đặt RSPEC RAILS có tính năng mô tả và cú pháp gọn gàng.

**[GITHUB](https://github.com/rspec/rspec-rails): 4,5k sao

### 16: Letter Opener

Gem này cho phép bạn xem bản xem trước của các thư mà ứng dụng Rails của bạn gửi - trên màn hình trình duyệt của bạn. Nó giúp bạn dễ dàng kiểm tra và chỉnh sửa trong hộp thư của mình.

**[GITHUB](https://github.com/ryanb/letter_opener): 3,2k sao

### 17: Capybara

Gem tích hợp các bài kiểm tra để trợ giúp người dùng bằng cách hướng dẫn họ thông qua quá trình liên tục bằng các cụm từ ngắn. Các nhà phát triển sử dụng nó hầu hết trong các tình huống ủy quyền. Capybara thường được sử dụng cùng với gem RSPEC.

**[GITHUB](https://github.com/teamcapybara/capybara): 9,3k sao

### 18: Database Cleaner

Gem này xóa sạch cơ sở dữ liệu thử nghiệm của bạn và bạn có thể đặt thời gian dọn dẹp - trước khi khởi chạy thử nghiệm hoặc trước và sau khi chạy thử nghiệm. Nó được hỗ trợ cho các phiên bản Ruby 1.9+.

**[GITHUB](https://github.com/DatabaseCleaner/database_cleaner):  2,7k sao

### 19: Factory_Girl

Gem factory_girl cung cấp dữ liệu giả cho các trường hợp test. Điều này giúp giảm bớt quá trình test của bạn vì sau đó bạn không phải nhập dữ liệu mỗi lần theo cách thủ công.

**[GITHUB](https://rubygems.org/gems/factory_girl):  2k sao

### 20: Shoulda_Matchers

Gem tuyệt vời này viết test một dòng xác thực / liên kết tương thích với Rspec. Bạn có thể nhanh chóng kiểm tra chức năng của ứng dụng của mình thực sự nhanh chóng bằng cách sử dụng các trình kết hợp.

**[GITHUB](https://rubygems.org/gems/shoulda-matchers):  3k sao

### 21: SimpleCov

Gem này đo độ bao phủ cho unit test của bạn

**[GITHUB](https://github.com/simplecov-ruby/simplecov):  4,2k sao

### 22: Rails_Controller_Testing

Hỗ trợ viết unit test cho controller

**[GITHUB](https://github.com/rails/rails-controller-testing):  229 sao

### 23: CANCANCAN

CANCANCAN Gem hoàn hảo để phát triển các ứng dụng phức tạp. Nó cho phép người dùng có nhiều quyền, nhưng cần hạn chế quyền truy cập đối với một số người dùng. Đá quý này mang lại sự dễ dàng trong việc thiết lập các giới hạn truy cập của người dùng và mọi thứ đều có thể quản lý được ở một nơi.

**[GITHUB](https://github.com/CanCanCommunity/cancancan):  4,8k sao

### 24: DEVISE

Khi tạo ứng dụng trên bất kỳ mạng xã hội nào hoặc xây dựng giải pháp thương mại điện tử, người dùng thường cần đăng nhập vào trang truyền thông xã hội. Nó sẽ cần cung cấp ủy quyền và xác thực cho ứng dụng cụ thể. Một số người sử dụng code của họ cho mục đích khác nhau; những người khác thích sử dụng gem này để xác thực. Gem DEVISE hóa ra là một trong những ruby gem tốt nhất năm 2021. Nó giúp công việc trở nên hiệu quả và dễ dàng. DEVISE bao gồm 10 module. Tuy nhiên, phải xử lý các URL chưa được tối ưu hóa của trang web. FriendlyId dễ dàng chuyển đổi các URL thành URL trang web dễ nhớ và thân thiện hơn nhiều. Phần tốt nhất là nó không yêu cầu bất kỳ sửa đổi mã nào trong ứng dụng web, khiến nó trở thành một Ruby gem nổi tiếng.

**[GITHUB](https://github.com/heartcombo/devise):  21,6k sao

### 25: OmniAuth

Đây là gem hỗ trợ devise để đăng nhập bên thứ 3 như google, facebook,...

**[GITHUB](https://github.com/omniauth/omniauth):  7,4k sao

### 26: Ruby-JWT

Hỗ trợ xác thức JWT

**[GITHUB](https://github.com/jwt/ruby-jwt):  3k sao

### 27: Rolify

Rolify là gem quản lý vai trò không thực thi bất kỳ phạm vi hỗ trợ nào trên đối tượng tài nguyên.

**[GITHUB](https://github.com/RolifyCommunity/rolify):  2,8k sao

### 28: activeadmin

Khung này dùng để xây dựng các giao diện của phong cách quản trị. Active Admin tóm tắt các mẫu ứng dụng kinh doanh và giúp các nhà phát triển dễ dàng triển khai các giao diện đẹp và trang nhã với ít nỗ lực hơn. Các tính năng khác nhau của nó bao gồm Phạm vi, Xác thực người dùng, Điều hướng chung, Mục hành động, Phần thanh bên, Kiểu chỉ mục, Bộ lọc, Tải xuống và APIS.

**[GITHUB](https://github.com/activeadmin/activeadmin):  8,9k sao

### 29: Rubocop

Bạn muốn viết code chuẩn chỉ? Hãy sử dụng rubocop

### 30: Sidekiq

Sidkiq là một công cụ tiêu chuẩn dùng cho background job, sạch sẽ và hiệu quả được sử dụng để xử lý Ruby. Đặc biệt cho các công việc đã lên lịch, Sidekiq được sử dụng. Thư viện Redis hỗ trợ gem này và nó sử dụng Redis như một cửa hàng quản lý công việc. Sidekiq đã thành công trong việc gây ấn tượng với một số lượng lớn developer vì nó sở hữu khả năng đa luồng. Sở hữu những khả năng này, việc sử dụng Sidekiq mang lại một tốc độ đáng kể. Lợi ích đáng kể của việc sử dụng gem này liên quan đến việc giám sát các công việc một cách thích hợp. Xử lý thích hợp các trạng thái và cơ hội thực hiện các công việc song song. Mặc dù Sidekiq không cần Rails, nhưng nó kết hợp với Rails để làm rõ và dễ dàng xử lý nền ở một mức độ lớn.

**[GITHUB](https://github.com/mperham/sidekiq):  10,8k sao

Chúc các bạn một ngày làm việc hiệu quả !