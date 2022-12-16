![](https://images.viblo.asia/1a3fe949-0cb4-4f55-9c6c-ccb70cc65e7f.jpg)

Làm việc với Ruby On Rails thực sự  sẽ còn suôn sẻ hơn nếu bạn làm theo những mẹo & thủ thuật hiệu quả đơn giản này trong khi phát triển ứng dụng của mình. Vì vậy, các nhà phát triển, bắt đầu ghi chú 10 mẹo & thủ thuật hữu ích này của Ruby On Rails để giúp ích được bạn trong quá trình phát triển.

# 1.  Đừng đặt quá nhiều logic trong controller
Rails dựa trên kiến trúc MVC. Maintain mội skinny controller là một trong những điều quan trọng nhất để tăng khả năng đọc và kiểm tra code.

Ví dụ: bạn có một controller trong đó hàm index sẽ trích xuất danh sách áo sơ mi màu đỏ và trắng.

```
class ShirtsController < ApplicationController
    def index
        @white_shirts = Shirt.where color: 'White'
        @red_shirts = Shirt.where colour: 'Red'
    end
end
```

Để xác định các truy vấn này cụ thể hơn nữa. Bây giờ, migrating đoạn mã này sang cơ sở dữ liệu có tên **Shirt model**, để trích xuất màu đỏ và trắng. Hy vọng bạn có thể thấy cách viết của hàm index của controller sẽ dễ dàng hơn.

```
class Shirt < ActiveRecord::Base
    scope :color, -> option { where color: option }
end

class ShirtsController < ApplicationController
    def index
        @white_shirts = Shirt.color ‘white’
        @red_shirts = Shirt.color ‘red’
    end
end
```

Luôn theo cách tiếp cận thứ hai khi bạn đối mặt với truy vấn cơ sở dữ liệu trong controller.

Chúng ta có nhiều logic, nhưng đây là những ví dụ tốt nhất chúng ta có thể sử dụng trong controller.

1. Logic xử lý cookie và session.
1. Logic tìm model chính xác để thực hiện các hoạt động DB.
1. Logic để kết xuất kết quả dựa trên loại yêu cầu như HTML, XML, JSON, v.v. hoặc chuyển hướng.
1. Logic để thu thập các tham số và sử dụng thông số đó để thực hiện các thao tác dựa trên yêu cầu của bạn.


# 2.  Đừng đặt quá nhiều logic trong view
ERB là một cách tuyệt vời để xây dựng views của bạn bằng cách nhúng ruby vào HTML. Tuy nhiên, bạn cần phải rất cẩn thận trong khi xây dựng views của mình, các tệp xem lớn rất khó quản lý và maintain. Đây cũng là một lĩnh vực có khả năng phải đối mặt với sự lặp lại code và đôi khi dẫn đến các vi phạm như DRY (không nên lặp lại code).

Một vài cách thực hành tốt nhất của Rails:
Luôn cố gắng sử dụng helpers trong views
Sử dụng layouts và các partials khi bạn cảm thấy cùng một đoạn mã lặp lại nhiều lần trong các views
Sử dụng presenters /decorators như Draper gem, điều này sẽ giúp bạn giảm dòng code trong các file views của bạn.

# 3.  Đừng đặt quá nhiều logic trong model
Một số chức năng như tạo email notifications, can thiệp vào các dịch vụ bên ngoài, không có liên quan đến trách nhiệm cốt lõi của Active Record model. Chức năng cốt lõi chính của Active Record là tìm và thực hiện các thao tác CRUD trong cơ sở dữ liệu.

Và một số logic tốt nhất mà chúng ta có thể sử dụng trong Model: 

1. Active Record relations(Associations) và validations.
1. Các hàm đơn giản sẽ cập nhật các thuộc tính và lưu chúng trong cơ sở dữ liệu.
1. Access Wrappers để ẩn thông tin internal model (ví dụ: phương thức full_name kết hợp các trường first_name và last_name trong cơ sở dữ liệu).
1. Các truy vấn liên quan đến cơ sở dữ liệu - Luôn cố gắng tránh sử dụng bất kỳ truy vấn Active Record nào bên ngoài model.

Theo nghĩa đen, tôi đã được đề cập đừng sử dụng quá nhiều logic ở bất cứ đâu trong MVC. Ở giai đoạn này, bạn có thể dừng lại và suy nghĩ như nơi nào khác chúng ta có thể đặt logic của mình? Bạn có toàn quyền sử dụng logic của mình nhưng không nên sử dụng bên trong MVC. Thay vào đó, bạn có thể sử dụng tất cả logic bên ngoài MVC, điều này sẽ không làm ảnh hưởng đến hiệu suất của ứng dụng đồng thời giúp chúng tôi dễ dàng quản lý các logics.

# 4. Đừng sử dụng quá nhiều Gems
Luôn nhớ rằng mỗi gem bạn thêm vào trong ứng dụng của bạn có thể có sự phụ thuộc vào các gems khác.

Sử dụng số lượng lớn gems làm cho kích thước của ứng dụng Rails của bạn lớn hơn mức cần thiết. Điều này có thể làm chậm hiệu suất của ứng dụng trên môi trường Production. Điều này cũng có thể dẫn đến cấu hình bộ nhớ máy chủ lớn hơn và tăng chi phí vận hành.

Vì vậy, luôn luôn cẩn thận và kiểm tra chéo trong khi thêm gems vào ứng dụng của bạn.

# 5. Luôn luôn kiểm tra logs ứng dụng của bạn
Vì tất cả các Ruby on Rails developers đều biết rằng trong rails có một file logs mặc định có sẵn trong quá trình development và trên production, hầu hết các developers sẽ bỏ qua thông tin trong các file này, điều quan trọng là phải xem xét file log của bạn trong suốt quá trình development và testing ứng dụng của bạn để bạn có thể theo dõi process flow.

Ví dụ: bạn sẽ thường gặp phải vấn đề truy vấn N + 1 và cách duy nhất để xác định vấn đề truy vấn N + 1 này là bằng cách xem lại log ứng dụng của bạn.

Xem lại các file log là một cách tuyệt vời để tìm thấy sự thiếu hiệu quả trong các đoạn code của bạn.

# 6.  Luôn viết Automated Tests
Cần có ít nhất một trường hợp thử nghiệm cấp cao được viết cho mỗi hành động trong các controller của bạn. Tại một thời điểm nào đó trong tương lai, nếu ứng dụng của bạn được mở rộng, sửa đổi hoặc nâng cấp lên phiên bản ROR mới nhất, testing framework này sẽ cung cấp một cách rõ ràng để xác minh chức năng cơ bản của ứng dụng của bạn. Bạn cũng có thể tìm thấy một số khiếm khuyết trong logic của mình bằng cách viết các test cases.

# 7. Background Tasks
Chúng ta có lẽ đã từng tích hợp các dịch vụ của bên thứ ba vào các ứng dụng của mình thông qua các loại gem gọi API của họ, nhưng chúng ta không thể đảm bảo rằng nó sẽ luôn chạy bình thường, nếu dịch vụ bắt đầu chạy rất chậm thì sao?

Để tránh việc chặn cuộc gọi này, bạn có thể thực hiện chúng dưới dạng background tasks, thay vì gọi trực tiếp các services này như một yêu cầu bình thường trong ứng dụng rails của bạn.

Dưới đây là một số gem phổ biến được sử dụng cho mục đích này:

1. Delayed Job
1. Sidekiq
1. Resque

# 8. Sử dụng Slim hoặc Haml Templating Language cho views
Theo mặc định, Rails sử dụng hệ thống Templating ERB cho phép bạn nhúng mã Ruby vào HTML. Nếu có thể, hãy luôn cố gắng sử dụng Slim hoặc HAML nhẹ hơn ERB. Ngoài ra, cú pháp Slim hoặc HAML này rất dễ dàng khi so sánh với ERB. Slim rất nhanh, động cơ templating nhẹ. Bằng cách sử dụng điều này, bạn có thể đạt được sự sạch sẽ của code, dễ đọc hơn và nó cũng có thể làm giảm thời gian phản hồi response của bạn. Ngoài ra, điều này cũng giúp xây dựng front-end của bạn rất nhanh.

# 9. Một số gems hữu ích để sắp xếp code của bạn và để tăng hiệu suất ứng dụng của bạn

1. Bullet - Gem mạnh mẽ làm tăng hiệu suất ứng dụng, xác định vấn đề truy vấn N + 1 và hiển thị thông báo cảnh báo trên trình duyệt của bạn.
1. Traceroute - Nó xác định các routes không sử dụng trong ứng dụng của bạn.
1. Rails Best Practices - Nó kiểm tra chất lượng code của ứng dụng rails và cung cấp các đề xuất.
1. Dead-weight - Nó xác định các CSS selectors không sử dụng.

# 10. Một số lời khuyên hữu ích về Ruby On Rails Tips
Indexing: Database indexing là một trong những cách đơn giản nhất để cải thiện hiệu suất cơ sở dữ liệu. Nó sẽ tăng cường tìm dữ liệu từ cơ sở dữ liệu.
Views: Không bao giờ gọi các truy vấn liên quan đến DB từ views của bạn, nó sẽ ảnh hưởng đáng kể đến hiệu suất ứng dụng của bạn.
Controller variables: Tất cả dynamic data mà bạn đang sử dụng trong views phải được xác định bởi các controllers.
SAAS: Luôn viết kiểu (CSS) theo cách tiếp cận SAAS, điều này sẽ luôn ngăn bạn ghi đè kiểu.
Content tag: Tránh content_tag trong helpers, thay vào đó gọi chúng trong partials.
Helpers: Rails generate theo mặc định một helper cho mỗi controller. Xóa tất cả chúng và sử dụng các helpers như form helper, links helper, menu helper, image helper, ... .

# Tham khảo
https://www.agiratech.com/10-useful-tips-for-ruby-on-rails-developers/