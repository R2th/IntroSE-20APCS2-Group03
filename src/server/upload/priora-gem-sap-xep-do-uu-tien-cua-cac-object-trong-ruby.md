> Bài viết gốc [Introducing Priora: An Object Prioritization Utility Gem for Ruby](https://medium.com/rubyinside/introducing-priora-an-object-prioritization-utility-gem-for-ruby-dda60acb5ac5)


Trong bài viết này sẽ giới thiệu về gem hỗ trợ việct sắp xếp độ ưu tiên mảng của các object theo một số business logic cụ thể. Dưới đây class của các object là `Post` nó được khởi tạo với những thuộc tính đặc trưng `author`, `like_count` và `is_sponsored`.

```
class Post
  attr_reader :author, :like_count, :is_sponsored

  def initialize(author:, like_count:, is_sponsored:)
    @author = author
    @like_count = like_count
    @is_sponsored = is_sponsored
  end
end
```

Theo thói quen việc sắp xếp độ ưu tiên có thể giải quyết bằng tạo một service class để xử lý với điều kiện rằng tất cả object có thể sắp xếp được, thay vì tạo service class có thể thực hiện toán tử `<=>` với `Post` để sắp xếp và đảo lại mảng.

Thế nhưng sắp xếp độ ưu tiên của `Post` yêu cầu với bài toán này không hợp lệ vì trong đó cần cách sắp xếp khác nhau. Vậy không thể sử dụng `<=>` với `Post`. Trong Ruby cung cấp `Enumerable#sort_by` nhận block để phục vụ việc sắp xếp tùy chỉnh, một vấn đề nữa xảy ra khi thuộc tính để xếp đọ ưu tiên của mảng là `boolean` no không thể sắp xếp được. Các ngon ngữ khác biến đổi ngầm `true` thành 1 và `false` thành 0 vậy cho phép thực thi sắp xếp nhưng với Ruby lại không được. Monkey-patching `TrueClass` và `FalseCalss` không phải là lựa chọn để giải quyết vấn đề trên.

### Giới thiệu
Khái niệm về `sắp xếp` rất phổ biến và do có sự hỗ trợ của khóa học máy tính vá các thuật toán, sắp xếp độ ưu tiên không phải là tương đồng nó dựa vào một mức trừu tượng cao hơn, sắp xếp độ ưu tiên là việc sử dụng sắp xếp cho một số mục đích (`business logic`) xếp các object đặc biệt trong một tập lên đầu.

Như ban đầu bài toán cần giải quyết là sắp xếp các object dữ liệu theo độ ưu tiên mà căn bản dữ liệu trỏ các object trả về (getters), mà phải bỏ qua được rắc rối việc chuyển đổi `true`, `false` và `nil` trong các giá trị sắp xếp được.  

### Thực thi
Để mô phỏng mục đích cụ thể hơn hãy khở tạo 3 instance với thuộc tính riêng biệt:

```
low_like_count_sponsored = Post.new(author: 'Jay C.',
like_count: 10, is_sponsored: true)
high_like_count_unsponsored = Post.new(author: 'Aaron R.',
like_count: 90, is_sponsored: false)
high_like_count_sponsored = Post.new(author: 'Don Y.',
like_count: 90, is_sponsored: true)
```

Sử dụng `Priora` cho phép sắp xếp độ ưu tiên dễ dàng theo mong muốn 

```
unprioritized_array = [high_like_count_unsponsored, low_like_count_sponsored, high_like_count_sponsored]
prioritized_array =  [high_like_count_sponsored, high_like_count_unsponsored, low_like_count_sponsored]
Priora.prioritize(unprioritized_array, by: [:like_count, :is_sponsored]) == prioritized_array
=> true
```

Ví dụ trên mô tả cách làm việc của `Priora.prioritize` nhận một tập chưa được sắp xếp độ ưu tiên và một danh sách thuộc tính ưu tiên. Trong đó các thuộc tính ưu tiên phải truyền qua `by` parameter, là các mảng của `symbol`. Với kết quả mong muốn là có được các object của `Post` với số like đầu tiên, với nhà tài trợ thứ 2 khi 2 post object hoặc nhiều hơn có số `like_count` bằng nhau.

### Cố định các class xếp độ ưu tiên
Trong trường hợp cần thực thi xếp độ ưu tiên giữa các object `Post` thì không cần thay đổi độ ưu tiên mỗi lần mà `Priora` hỗ trợ class method bằng `prioritize_by`, sau đó có thể viết trong class `Post` như sau:

```
class Post
  include Priora
  prioritize_by :like_count, :is_sponsored
  attr_reader :author, :like_count, :is_sponsored
  def initialize(author:, like_count:, is_sponsored:)
    @author = author
    @like_count = like_count
    @is_sponsored = is_sponsored
  end
end
```

Từ ví dụ trước để có được mảng đã xếp độ ưu tiên như sau:

```
Priora.prioritize(unprioritized_array) == prioritized_array
=> true
```

Sử dụng class method `prioritize_by` giúp tăng cương về đọc hiểu về code và độ linh hoạt, các thứ tự ưu tiên được khái báo trong class.

### Lợi ích sử dụng tùy chọn `Enumerable#sort`
Một giải pháp tương tự có thể thực thi như sau:
```
unprioritized_array.sort { |a, b|
  [a.like_count, a.is_sponsored ? 1 : 0] <=> 
  [b.like_count, b.is_sponsored ? 1 : 0] }.reverse == prioritized_array
=> true
```

Đương nhiên đúng như nhau nhưng hãy xem xét một số vấn đề sau:
- Dài dòng hơn và dễ gây ra lỗi
- Khái bái logic xếp độ ưu tiên 2 lần, không thể dùng `sort_by` vì boolean không thể sort được.
- Xử lý biến đổi giá trị boolean (`true`/`false`) thành giá trị có thể sắp xếp được (`1`/`0`) do vậy lẫn mức trừu tượng và gây nhầm lẫn cho một số người đọc code sau.

### Sắp xếp ngược, mở rộng
Priora dựa trên giả thiết rằng khi một tập sắp xếp độ ưu tiên hay hướng tới kết quả của sắp xếp và đảo ngược kết quả. Đây là do tính về xếp tăng dần từ số lượng nhỏ lên số lượng lớn, trong khi nói về `ưu tiên` hoặc `ưu tiên cao nhất` sẽ nghĩ đến mục to nhất sẽ lên đầu. Khi các mục đó là object dữ liệu, nó phục thuộc về xác định rằng nó hơn nhau ở những điểm nào.

**Định hướng ưu tiên**
Rõ ràng không phải lúc nào cũng đúng và một số tiến trình ưu tiên cần xử lý các mục nhỏ trước, Priora có hỗ trợ việc này, bằng thay đổi hướng ưu tiên cho một số ưu tiên cụ thể:

```
Priora.prioritize(unprioritized_array, by: [[like_count: :asc], :is_sponsored])
=> [low_like_count_sponsored, high_like_count_sponsored, high_like_count_unsponsored]
```

Cho thấy rằng `Post` với `like_count` thấp lên đầu, tuy nhiên các post có `like_count` cao được ưu tiên bởi `is_sponsored` vậy `Post` có tài trợ lên đầu.

Cảm ơn các bạn đài đọc bài viết này.

### Tham khảo
- [Introducing Priora: An Object Prioritization Utility Gem for Ruby](https://medium.com/rubyinside/introducing-priora-an-object-prioritization-utility-gem-for-ruby-dda60acb5ac5)
- [Priora](https://github.com/eliav-lavi/priora)