# Bài toán
Đã bao giờ bạn gặp tình huống phải xử lý việc chuyển trạng thái của các đối tượng, mà việc thay đổi trạng thái ấy có tính ràng buộc, có điều kiện, lại kèm theo một đống hook cần phải thực hiện với nó. Ví dụ một khóa học đang `init` (khởi tạo) bạn muốn cho nó sẵn sàng chạy thì chuyển trạng thái `pending` (chờ), sau khi khai giảng khóa học thì trạng thái cần chuyển sang `in_progress` (đang chạy), muốn kết thúc khóa học thì phải chuyển về trạng thái `finished` (kết thúc), muốn đóng khóa học trước khi kết thúc thì phải đưa trạng thái về `closed` (đóng). Ở đây về tính logic, rõ ràng bạn chỉ có thể cho chạy lớp học khi lớp đó đang chờ hoặc đang đóng. Bạn có thể kết thúc hay đóng, hoặc cho một lớp học vào trạng thái chờ nếu lớp đó đang chạy. Thêm nữa, mỗi khi chuyển trạng thái của khóa học, thông báo sẽ được gửi đến những người có vai trò nhất định trong khóa học đó (ví dụ như trainer và trainee cùng với giáo vụ). Khi kết thúc khóa học phải lưu lại thông tin về kết quả học tập của trainee.v.v Nếu bạn đang cố gắng thực hiện bài toán này bằng cách tạo ra một đống hàm, một chuỗi các biểu thức điều kiện và tạo ra callback ở khắp mọi nơi, thì mình tin rằng code của bạn sẽ trở thành một đống mess và chính bạn cũng tự nhận thấy rằng đó không phải là cách làm đúng.

Đây là lúc Máy trạng thái (State machine) xuất hiện và thể hiện những đặc điểm lợi thế của mình.

Bài toán ví dụ ở trên có thể được diễn tả lại bằng máy trạng thái như hình:
![](https://images.viblo.asia/426c9e0a-ff89-4d66-a369-f05ae47f5570.png)

Trong đó:

`init`, `pending`, `in_progress`, `finished`, `closed` là các trạng thái của khóa học
`ready`, `start`, `stop`, `finish`, `close` là các sự kiện (event). Các sự kiện này phát sinh khi nhận các input như click lên button, hoặc được kích hoạt bằng job… Các sự kiện sẽ gây ra sự thay đổi trạng thái (ví dụ sự kiện `start` sẽ là từ `pending` -> `in_progress`), còn được gọi là quá trình chuyển đổi (transition)
Phần tiếp theo mình sẽ giới thiệu về việc áp dụng máy trạng thái để giải quyết bài toán chuyển đổi phức tạp này với `gem aasm`.

# Gem aasm
Gem này chứa gói AASM, một thư viện cho phép chúng ta thêm vào các class của Ruby một máy trạng thái hữu hạn (finite-state machine FSM). AASM là viết tắt của plugin acts_as_state_machine trước đây, hiện nay đã không còn sử dụng riêng cho ActiveRecord mà còn được tích hợp cho nhiều ORM khác. Một điều chắc chắn là nó có thể sử dụng cho bất cứ Ruby class nào dù cho parent class có là gì đi nữa.

### Cài đặt gem
```ruby
gem install aasm
```
Hoặc là sử dụng Bundler
```ruby
gem "aasm"
bundle install
```
### Generators
Sau khi cài đặt xong bạn có thể sử dụng generator
```ruby
rails generate aasm NAME [COLUMN_NAME]
```

Nếu bạn đã có một trường để lưu trạng thái của model rồi thì không cần thực hiện bước này nữa. Nếu chưa thì bạn cần thực hiện câu lệnh trên và thay NAME là tên model. COLUMN_NAME là tên của trường trạng thái bạn cần dùng, có thể tùy chọn, vì mặc định nếu để trống thì nó sẽ được đăt là “aasm_state”. Câu lệnh sẽ sinh ra model (nếu nó chưa tồn tại) và generate tự động đoạn block aasm (bạn sẽ thấy ở phần sau). Nếu bạn sử dụng Active Record thì nó sẽ đồng thời tạo một file migration để thêm trường trạng thái vào trong bảng.

### Cách dùng
Giờ ta sẽ áp dụng máy trạng thái sử dụng gem aasm, bằng cách include module AASM, định nghĩa các state (trạng thái), events (sự kiện) cùng với các transitions (chuyển dịch) tương ứng.
```ruby
class Course
  include AASM

  aasm do
    state :init, initial: true
    state :pending, :in_progress, :finished, :closed

    event :ready do
      transitions from: :init, to: :pending
    end

    event :start do
      transitions from: :pending, to: :in_progress
    end

    event :stop do
      transitions from: :in_progress, to: :pending
    end
    
    event :finish do
      transitions from: :in_progress, to: :finished
    end
    
    event :close do
      transitions from: :pending, to: :closed
      transitions from: :in_progress, to: :closed 
      # có thể viết gộp lại như dưới đây
      # transitions from: [:pending, :in_progress], to: :closed
    end
  end
end
```

Từ đây bạn có thể nhận thấy rằng chúng ta đang khai báo một máy trạng thái với khả năng cung cấp một cơ chế để quản lý ràng buộc các trạng thái, các sự kiện và chuyển đổi rất rõ ràng và tường minh. Khối lệnh trên sẽ cung cấp cho class Course một vài public methods như sau:

```ruby
course = Course.new
course.init?       # => true
course.may_ready?  # => true
course.ready
course.pending?    # => true
course.init?       # => false
course.may_ready?  # => false
course.ready       # => raises AASM::InvalidTransition
```

Khá là dễ để hiểu được ý nghĩa của các phương thức này, nên mình sẽ không giải thích quá nhiều. Để ý ở dòng cuối cùng, khi course đang ở trạng thái pending thì nó không thể thực hiện event ready, theo mặc định thì việc gọi đến một sự kiện mà không được phép sẽ raise ra lỗi `AASM::InvalidTransition`.

Tuy nhiên nếu bạn không thích exceptions mà muốn kết quả đơn giản là true hay false, thì chỉ cần thêm:
```ruby
class Course
  ...
  aasm whiny_transitions: false do
    ...
  end
end
```

`whiny` có nghĩa là càu nhàu, như vậy là bạn hiểu ý của option này là gì rồi đấy 😄. Kết quả sau trả về sẽ như chúng ta muốn:

```ruby
course.pending?    # => true
course.may_ready?  # => false
course.ready       # => false
```

Khi chạy một event, bạn có thể truyền vào phương thức của nó một block, và block ấy sẽ được gọi chỉ khi transition thành công:

```ruby
course.ready do
  notify_all_users  # ví dụ như vậy
end
```

### Callbacks
Callbacks là cách tuyệt vời để thực hiện các tác vụ đi kèm với quá trình chuyển đổi trạng thái. Bạn có thể định nghĩa callbacks cho events, transitions hoặc states dưới dạng các phương thức, Procs hay classes. Callbacks được gọi tại các thời điểm khác nhau trong vòng đời của quá trình chuyển đổi trạng thái. Bảng sau mô tả một life cycle hoàn chỉnh kèm theo các callback được sắp xếp theo thứ tự tương ứng:

```ruby
begin
  event           before_all_events
  event           before
  event           guards
  transition      guards
  old_state       before_exit
  old_state       exit
                  after_all_transitions
  transition      after
  new_state       before_enter
  new_state       enter
  ...update state...
  event           before_success      # if persist successful
  transition      success             # if persist successful
  event           success             # if persist successful
  old_state       after_exit
  new_state       after_enter
  event           after
  event           after_all_events
rescue
  event           error
  event           error_on_all_events
ensure
  event           ensure
  event           ensure_on_all_events
end
```
Giờ chúng ta sẽ thử áp dụng vào bài toán mẫu để khiến nó trở nên thực tế hơn một chút.

```ruby
class Course
  include AASM

  aasm do
    state :init, initial: true
    state :pending, before_enter: :save_progress
    state :in_progress, :finished, :closed

    after_all_events Proc.new { |*args| notify_somebody(*args) }

    event :ready do
      transitions from: :init, to: :pending
    end

    event :start do
      transitions from: :pending, to: :in_progress
    end

    event :stop do
      transitions from: :in_progress, to: :pending
    end
    
    event :finish, success: :dump_trainee_data do
      transitions from: :in_progress, to: :finished
    end
    
    event :close do
      transitions from: :pending, to: :closed
      transitions from: :in_progress, to: :closed 
    end
  end
  
  private
  
  # Lưu quá trình học
  def save_progress
    ...
  end
  
  # Lưu dữ liệu học của trainee
  def dump_trainee_data
    ...
  end
  
  # Gửi thông báo đến đối tượng nào đó
  def notify_somebody(subjects)
    ...
  end
end
```

OK, ví dụ vài callbacks như vậy thôi nhé. Dưới đây là giải thích ngắn gọn về cách dùng:
* `state :pending, before_enter: :save_progress` -> `:save_progress` thực hiện khi course bắt đầu vào trạng thái `:pending`.
* `event :finish, success: :dump_trainee_data` -> `:dump_trainee_data` thực hiện khi course thực hiện thành công `event :finish`
* `after_all_events Proc.new { |*args| notify_somebody(*args) }` -> callback dạng proc được sử dụng để truyền tham số cho event (*), thực hiện sau mỗi khi event kết thúc.

(*) Chúng ta có thể truyền tham số cho **event** bằng cú pháp như sau:

```
course.ready(:pending, managers)
```

Trong đó tham số đầu tiên xác định trạng thái kết thúc của **transition**, phần còn lại chính là tham số truyền vào cho **event**. Cụ thể trong trường hợp này, `notify_somebody` sẽ nhận đối số truyền vào là `managers`. Bạn cũng có thể truyền vào tham số đầu tiên cho **event** là nil, khi đó **AASM** sẽ thực hiện **transition** đầu tiên định nghĩa cho **event** đó.

Trong trường hợp một lỗi xảy ra khi diễn ra **event**, nó sẽ được rescued và truyền vào callback `:error`, do đó chúng ta có thể dùng nó để xử lý tùy ý.

```ruby
event :close do
  error do |e|
    ...
  end
  transitions from: :pending, to: :closed
  transitions from: :in_progress, to: :closed 
end
```
Trong quá trình callback diễn ra bạn cũng có thể kiểm tra các thông tin về state hoặc event đang chạy:

```ruby
def dump_trainee_data
  ...
  logger.info "from #{aasm.from_state} to #{aasm.to_state}"
  ...
  puts "triggered #{aasm.current_event}"
end

```

### Guards
Giả sử bạn muốn ràng buộc các **transition**, cho phép chúng được thực hiện chỉ khi thỏa mãn một điều kiện cho trước. Lúc này chúng ta cần sử dụng **guard** (lính canh) cho **transition**. Nếu **guard** trả về `false` thì **transition** sẽ bị denied (`raise AASM::InvalidTransition` hoặc trả về `false`). Ví dụ:

```ruby
event :finish, success: :dump_trainee_data do
  transitions from: :in_progress, to: :finished, guard: :evaluations_finished?
end

course = Course.new
course.may_finish?            # => false nếu :evaluations_finished? trả về false và ngược lại
```
Tuy nhiên thì có vẻ như bạn sẽ thích ràng buộc **transition** bằng `if`, `unless` hơn vì nó khá gần Ruby:

**NOTE**: Khi một **event** có nhiều **transitions**, **transition** đầu tiên thực hiện thành công sẽ ngăn các transitions tiếp theo trong cùng **event** được thực hiện.


### ActiveRecord
Như đã nói ở phần trước, aasm sẽ sinh ra cho model một trường trạng thái mặc định là aasm_state, tuy nhiên ta có thể custom tên trường trạng thái theo ý sử dụng như sau:

```ruby
aasm column: :status do
  ...
end
```
Thường trong thực tế chúng ta sẽ ưa dùng trường trạng thái với kiểu enum hơn dựa trên những ưu điểm của nó. Để sử dụng enum, chúng ta chỉ cần áp dụng đơn giản như dưới đây:

```ruby
class Course < ActiveRecord::Base
  include AASM

  enum status: {
    init: 1,
    pending: 2,
    in_progress: 3,
    finished: 4,
    closed: 5
  }

  aasm column: :status, enum: true do
    state :init, initial: true
    state :pending, before_enter: :save_progress
    state :in_progress, :finished, :closed
  end
end
```

# Kết luận
Trên đây mình đã trình bày sơ qua về khái niệm của một máy trạng thái và đưa ra cách áp dụng nó vào một bài toán thực tế, sử dụng gem aasm. Còn rất nhiều chi tiết nâng cao liên quan đến việc sử dụng aasm để giúp bạn có thể xử lý bài toán của mình một cách tinh tế hơn, tuy nhiên trong khuôn khổ bài viết mình chỉ trình bày những đặc điểm đặc trưng và cơ bản để áp dụng với bài toán thường gặp. Nếu bạn muốn tìm hiểu sâu hơn, hãy đọc thêm ở [đây](https://github.com/aasm/aasm). Cảm ơn sự chú ý theo dõi!