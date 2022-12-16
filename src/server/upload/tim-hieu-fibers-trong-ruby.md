Ruby on Rails mang đến với một framework `Active Job` để khai báo và cho chúng chạy trên một số hàng đợi backend. Các job có thể từ đơn giản như đặt lịch trìn dọn dẹp, thành toán phí hàng tháng, gửi thư,.....

Trong bài viết này sẽ tìm hiểu về cách hoạt động, tận dụng dụng hiệu năng Fiber trong Ruby cho dự án.

### Fibers là gì?

Fibers là các workers, chúng chạy code và theo dõi quá trình của chính nó hay nói cách khác fibers là một cơ chế đồng thời.

Fibers cũng giống Threads nhưng khác nhau ở chỗ cho phép quản lý trên fibers nhiều hơn threads.

- Chúng ta sẽ nghĩ nó cho phép quản lý gì thêm?
Hệ điều hành quyết định khi nào chạy các `threads` và khi nào dừng lại chúng.
- Điều trên không phải với áp dụng với fibers!
Chúng ta cần báo một fiber chính xác khi nào chạy và khi nào phải dừng lại.

### Fibers vs Threads
Threads cho cảm gíac chạy ngầm để làm việc của chúng.

- Fiber không làm điều này.

Khi một fiber đang chạy nó trở thành chương trình chính cho đến khi dừng lại nó.
Hãy xem ví dụ sử dụng dưới này:
Tạo một fiber với `Fiber.new` và một block.
```
f = Fiber.new { puts 1 } 
```

Sau đó để chạy fiber cần dùng phương thức `resume`.
```
f.resume
```

Nó sẽ in `1` và nó trả lại việc quản lý cho chương trình chính.

#### Làm thế nào để dừng lại một fiber?
Với phương thức `Fiber.yield` khác với từ khóa `yield` dùng cho các [blocks](https://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/).

```
f = Fiber.new { puts 1; Fiber.yield; puts 2 }

f.resume
# 1

f.resume
# 2
```

Sau khi start fiber nó sẽ in `1` với `resume` tiếp đến dừng lại. Nếu tiếp tục gọi `resume` một lần nữa nó sẽ tiếp tục chính xác từ chỗ dừng lại và in `2`.

> Chú ý: Khi chạy `resume` một lần nữa sẽ trả về lỗi `FiberError: dead fiber called` bởi vì không còn code để chạy.

Đây là đặc điểm của việc sử dụng fiber.

Gọi đến `Fiber.yield` trong một fiber giống như ấn nút `pause`, cho phép dừng lại ở giữa vòng lặp hoặc bất kỳ code viết trong một fiber block.

### Fiber và Loops: Dãy vô tận
Chúng ta có thể dùng hiệu ứng `nút pause` để tạo một dãy vô tận.

#### Các thứ cần để tạo ra dãy vô tận
- Fibers
- Loop
- Counter

Ví dụ: Số factorial
```
factorial =
Fiber.new do
  count = 1

  loop do
    Fiber.yield (1..count).inject(:*)
    count += 1
  end
end
```

Chúng ta có thể dùng fiber nhiều lần theo mong muốn với phương thức `resume` để lấy số tiếp theo trong dãy.

Ví dụ:
```
Array.new(5) { factorial.resume }

# [1, 2, 6, 24, 120]
```

### Fibers và IO: Hoạt động bất đồng bộ 
Fibers nhanh và hiệu quả hơn threads cho những công việc cần chờ như kết nối mạng chẳng hạn.

#### Tại sao?
Bởi vì fiber cho kết quả ít context swtich. Một context switch là khi CPU thay đổi từ task hiện tại sang một task khác.

**Đây là một chút giá nhưng lại bổ sung nhiều!**
Bắt đầu sử dụng fibers:
- Vơi phương thức `IO.select` và [Reactor desgin pattern](https://en.wikipedia.org/wiki/Reactor_pattern)
- Với gem bất đồng bộ
- Với  ứng dụng server [falcon](https://github.com/socketry/falcon)

Hãy nhớ rằng: Đó không phải là phép kỳ diệu mà nó đáng để test và xem fiber có thể giúp gì cho chúng ta

### Kết luận 
Đến đây là kết thúc bài tìm hiểu và cách hoạt động của Fibers trong Ruby!
Một fiber cho phép tạo một đơn vị code có thể *dừng lại và tiếp tục theo mong muốn*

#### Tham khảo
- [Fibers](https://ruby-doc.org/core-2.5.0/Fiber.html)
- [Active Job](https://guides.rubyonrails.org/active_job_basics.html)
- [What Everyone Should Know About Fibers in Ruby](https://www.rubyguides.com/2019/11/what-are-fibers-in-ruby/)