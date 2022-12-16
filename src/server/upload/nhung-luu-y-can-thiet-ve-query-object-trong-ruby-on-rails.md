Query object (còn được gọi là truy vấn) là một mẫu giúp phân tách các ActiveRecord model lớn và giữ cho code của vừa gọn vừa dễ đọc. Mặc dù bài viết này được viết cho Ruby On Rails, nó dễ dàng áp dụng cho các framework khác, đặc biệt là các framework dựa trên MVC và áp dụng ActiveRecord model.
# Khi nào nên sử dụng Query Object?
Mọi người nên cân nhắc sử dụng query objects pattern khi cần thực hiện các truy vấn phức tạp với các quan hệ trong ActiveRecord. Thông thường việc sử dụng scope cho các mục đích như vậy không được khuyến khích. Theo nguyên tắc thông thường, nếu scope tương tác với nhiều hơn một cột và / hoặc join với các bảng khác, thì nó nên được xem xét để chuyển đến query object - bên cạnh đó chúng ta có thể giới hạn số lượng scope được định nghĩa trong các model của mình tối thiểu cần thiết. Ngoài ra, bất cứ khi nào một chuỗi scope được xử lý, cũng nên xem xét sử dụng  query object.
# Làm cách nào để sử dụng hiệu quả Query Object pattern?
## #1 Bám sát một quy ước đặt tên
Để làm cho việcđặt têncho các query object dễ dàng hơn, chúng ta có thể thiết lập một số quy tắc cơ bản để tuân theo. Một ý tưởng là luôn luôn đặt hậu tố **Query** cho query object, nhờ đó chúng ta biết đang xử lý truy vấn chứ không phải là ActiveRecord. Một ý tưởng khác là luôn luôn sử dụng tên số nhiều của một model mà truy vấn đó được thiết kế để làm việc với nó. Theo cách này sẽ rõ ràng hơn cho chúng ta, ví dụ như `RecentProjectUsersQuery` sẽ trả về một relation của user khi được gọi. Bất cứ cách tiếp cận nào chúng ta chọn áp dụng, hầu hết đều có lợi khi tuân theo một cách đặt tên cụ thể, nó giúp giảm nhầm lẫn bất cứ khi nào chúng ta cần tạo một class mới.
##  #2 Sử dụng phương thức `.call` trả về một relation để gọi các Query Object
Ngược lại với các service object, khi mà chúng ta có một số mức độ tự do trong việc đặt tên phương thức dành riêng cho việc sử dụng một service object, để tận dụng tối đa query object pattern trong rails, chúng ta nên thực hiện phương thức `.call` trả về một relation object. Nếu chúng ta tuân theo quy tắc này, các đối tượng truy vấn như vậy có thể dễ dàng được sử dụng để xây dựng scope nếu được yêu cầu.
## #3 Luôn chấp nhận relation như đối tượng là đối số đầu tiên
Việc cho phép nhận một relation như là một đối số đầu tiên khi gọi các đối tượng truy vấn là tốt. Điều này không chỉ là yêu cầu khi sử dụng các query object làmscope mà còn có thể làm cho các query object của mình kết nối thành chuỗi, giúp chúng ta có thêm mức độ linh hoạt. Để giữ cho tính dễ sử dụng không bị ảnh hưởng, hãy đảm bảo cung cấp một realtion đầu vào mặc định, như vậy có thể sử dụng query object mà không cần cung cấp đối số. Điều quan trọng nữa là luôn trả về relation từ query object có cùng subject (bảng) như realtion query object được cung cấp.
## #4 Cung cấp một cách để chấp nhận các tham sốn bổ sung
Mặc dù đôi khi việc này có thể tránh được bằng cách phân lớp các query object hiện có hoặc định nghĩa các query object mới, nhưng sớm hay muộn chúng ta cũng sẽ cần chấp nhận một số tham số bổ sung cho query object mà chúng ta đã định nghĩa. Điều này có thể được sử dụng để tùy chỉnh logic về cách query object trả về kết quả, điều đó có thể biến query object đó thành bộ lọc linh hoạt một cách hiệu quả. Để duy trì tốt mức độ dễ đọc, chỉ nên truyền các tham số như hash / keyword và luôn cung cấp các giá trị mặc định.
## #5 Tập trung vào việc dễ dàng đọc hiểu của phương thức truy vấn
Bất kể chúng ta quyết định lưu trữ logic cốt lõi của truy vấn trong chính phương thức `.call` hoặc bất kỳ phương thức nào khác của query object, chúng ta nên làm cho nó dễ đọc nhất có thể. Đây sẽ là nơi đầu tiên các dev khác sẽ xem xét để tìm hiểu xem query object đó là gì, vì vậy nỗ lực nhỏ này có thể giúp cuộc sống của họ dễ dàng hơn.
## #6 Nhóm các query object trong namespaces
Tùy thuộc vào mức độ phức tạp của dự án và mức độ sử dụng của ActiveRecord, chúng ta có thể có khá nhiều query object. Để sắp xếp code tốt hơn, chúng ta nên tập hợp các query object tương tự vào các namespaces. Một ý tưởng để nhóm là sử dụng tên của model mà các truy vấn đó xử lý, nhưng nó có thể là bất cứ điều gì hợp lý. Như thường lệ, bằng cách bám vào một cách nhóm các đối tượng truy vấn, chúng ta sẽ dễ dàng quyết định vị trí thích hợp cho lớp đó khi chúng ta định nghĩa một đối tượng mới. Lưu trữ tất cả các đối tượng truy vấn của chúng ta trong `app/queries` cũng là một cách.
## #7 Xem xét deligating tất cả các phương thức cho kết quả của `.call`
Có thể xem xét triển khai method_missing  cho query object để ủy quyền tất cả các phương thức cho kết quả của phương thức `.call`. Bằng cách này, một query object có thể được sử dụng như một relation - ví dụ: `RecentProjectUsersQuery.where(first_name: “Tony”)` thay vì `RecentProjectUsersQuery.call.where(first_name: “Tony”)`. Tuy nhiên, như với bất kỳ trường hợp nào, theo cách tiếp cận này phải quyết định chính đáng và hiểu rõ những gì đang làm.
# Tổng kết
Query object là một pattern đơn giản, dễ kiểm tra, giúp trừu tượng hóa các truy vấn, quan hệ và chuỗi scope với việc triển khai phức tạp. Bằng cách tuân theo một số quy tắc đơn giản được nêu ở trên, chúng ta có thể đảm bảo rằng pattern này vẫn có thể đọc được, linh hoạt và dễ sử dụng không chỉ cho chúng ta, mà trước hết, cho những người khác có thể làm việc với code của chúng ta trong tương lai. Một ví dụ dưới đây trình bày một cách thực hiện object như vậy.
```ruby
module Users
  class WithRecentlyCreatedProjectQuery
    DEFAULT_RANGE = 2.days

    def self.call(relation = User.all, time_range: DEFAULT_RANGE)
      relation.
        joins(:projects).
        where('projects.created_at > ?', time_range.ago).
        distinct
    end
  end
end
```
*Nguồn: [Błażej Kosmowski](https://medium.com/selleo/essential-rubyonrails-patterns-part-2-query-objects-4b253f4f4539)*