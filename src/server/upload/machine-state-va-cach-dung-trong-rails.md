### **I. Tổng quan về machine state**

- Machine state là một biểu đồ trạng thái. Nói dễ hiểu hơn, nó là cách để kiểm soát các trạng thái theo điều kiện tương ứng. Ví dụ bạn có một tập các trạng thái khác nhau, tùy thuộc vào điều kiện và trạng thái hiện tại, bạn sẽ có các hành động khác nhau trong thời điểm hiện tại.
- Ví dụ: Khi có bug, bạn phải fix, nếu vẫn còn bug, bạn phải tiếp tục fix cho đến khi hết bug thì bạn mới có thể close task vừa làm. Đó là một tập các trạng thái của task và tùy vào bug gặp phải mà bạn sẽ có các cách fix khác nhau để hoàn thành task.
- Vậy làm thế nào để sử dụng machine state? Có rất nhiều gem giúp chúng ta làm machine state trong ruby. Chúng ta sẽ thực hành qua một ví dụ cụ thể trong rails với gem "aasm" - một state machines trong ruby.

### **II. Cài đặt**

- Chúng ta có thể cài đặt gem trong console qua câu lệnh:

```
gem install aasm
```

- Hoặc có thể thêm trong Gemfile khi dùng Bundler:

```
gem "aasm"
```

### **III. Một ví dụ đơn giản**

In this example, we need to write rspec for this method:

```ruby
class Job
  include AASM

  enum status: {sleeping: 1, running: 2, cleaning: 3}

  aasm column: :status, enum: true do
    state :sleeping, initial: true
    state :running, :cleaning

    event :run do
      transitions from: :sleeping, to: :running
    end

    event :clean do
      transitions from: :running, to: :cleaning
    end

    event :sleep do
      transitions from: [:running, :cleaning], to: :sleeping
    end
  end

end
```

Với ví dụ trên, khi khởi tạo một object Job ta sẽ có các hành động có thể thực hiện là "run", "clean", "sleep" và các trạng thái "sleeping", "running", "cleaning".

- Ta có thể mô tả hoạt động của state machine này bằng các câu lệnh ví dụ trong rails c:

```
job = Job.new
job.sleeping? # => true
job.may_run?  # => true
job.run
job.running?  # => true
job.sleeping? # => false
job.may_run?  # => false
job.run       # => raises AASM::InvalidTransition
```

Như vậy:

- Khi khởi tạo Job (`job = Job.new`), status mặc định của Job được khởi tạo là "sleeping" (`job.sleeping? # => true`), tương ứng với câu `state :sleeping, initial: true` trong model. Khi đó, job có thể thực hiện action "run" (`job.may_run?  # => true`) bởi ta đã thiết lập `event :run` với điều kiện `transitions from: :sleeping, to: :running`. Tức là ta chỉ có thể chạy action "run" khi Job đang ở trạng thái "sleeping" và trạng thái trả về của Job sau khi thực hiện "run" sẽ là "running".
- Sau khi chạy "run" (`job.run`), Job sẽ ở trạng thái "running" (`job.running?  # => true`), như vậy ta không thể chạy "run" lần nữa (`job.may_run?  # => false`). Nếu chạy "run" lần nữa thì sẽ báo lỗi (`job.run       # => raises AASM::InvalidTransition`)

### **V. Kết luận**

Trên đây là một ví dụ cơ bản nhất trong việc sử dụng state machine thông qua `gem "aasm"`. Hi vọng bài viết có thể cung cấp cách nhìn tổng quan, dễ hiểu nhất cho những bạn mới tiếp xúc với khái niệm "machine state". Chúng ta có thể khai thác rất nhiều tính năng mở rộng trong gem qua hướng dẫn của gem: https://github.com/aasm/aasm .
Bạn cũng có thể tham khảo chi tiết khái niệm "machine state" trong link: http://vaidehijoshi.github.io/blog/2015/03/17/a-machine-state-of-mind-part-1-understanding-state-machines/