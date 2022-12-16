Nhiều ứng dụng có các bộ thử nghiệm chạy chậm hơn theo cấp số nhân khi độ phức tạp business tăng lên - một vấn đề rất đau đầu với các nhà phát triển về hiệu năng và hiệu quả của các test case.
Trong phần này, tôi sẽ cho bạn thấy cách tôi làm cho các test case của mình chạy nhanh hơn 70% bằng cách thay đổi một vài dòng.

# Tại sao cần thực hiện viết Test
Hãy thử tưởng tưởng bạn được đưa cho một source code với hệ thống test case đã pass tất cả các kết quả đầu ra và ảnh hưởng của nó. Bạn chắc chắn sẽ cực kỳ tự tin để refactor lại cho tới khi bạn hài lòng với chất lượng của nó. Lợi ích của điều này là cho phép bạn code nhanh hơn, sửa dễ dàng hơn và an toàn hơn, hạn chế những bug có thể xảy ra sau khi sửa code. Đây là một điều cực kỳ quan trọng vì thời gian maintain thường sẽ mất nhiều thời gian hơn thời gian phát triển và việc nhiều người tham gia trong một dự án cũng thường xuyên hơn nên một dự án có test đầy đủ là một điều cực kỳ tuyết vời. 

Ngược lại, với những phần code chưa được kiểm thử thì sẽ là ác mộng với bất kỳ một develop hoặc một team nào. Nó sẽ làm giảm tốc độ hoặc thậm chí gây ra những lỗi phát sinh tiềm ẩn cực kỳ nguy hại mà không dễ gì phát hiện được. Vì vậy, loại bỏ nỗi sợ này là điều tối quan trọng với các team và công ty có hiệu suất cao. 

# Niềm tin vào TDD
Chắc hẳn các bạn đã nghe rất nhiều tới TDD, tôi ngày càng yêu TDD. Nó nhắc nhở tôi về [phương pháp khoa học](https://en.wikipedia.org/wiki/Scientific_method) - kết quả thành công được xác định trước khi thử nghiệm. Vì vậy, kết quả sẽ không ảnh hưởng đến phán đoán của bạn.

TDD khiến bạn tập trung vào những điều quan trọng  - **đầu vào** và **đầu ra**, chứ không phải những gì diễn ra bên trong. Chúng ta thường thay đổi việc thực hiện một class nhiều lần trong suốt quá trình phát triển bằng cách chia nó thành các class nhỏ, đảo ngược logic hoặc sử dụng các cấu trúc dữ liệu khác nhau. Với TDD, bạn có thể tin tưởng rằng refactor sẽ không thay đổi kết quả đầu ra. Đây là lý do tại sao TDD rất mạnh mẽ.

# Vấn đề - Các bài kiểm tra quá chậm
Tôi đã hoàn thành bộ thử nghiệm của mình - 45 test case RSpec / Minitest. Nhưng chúng quá chậm - chạy mất tới hơn 25 giây.

Khi thực hành với TDD, bạn cần chạy nhiều lần (thông qua chu trình [đỏ, xanh, refactor](https://www.codecademy.com/articles/tdd-red-green-refactor)). Và 25 giây là một khoảng thời gian khá dài để chờ kết quả (đây chỉ là 1 ví dụ nhỏ). Điều này làm cho ngày của tôi nhàm chán hơn rất nhiều. Tôi có thể làm gì?

# Nguyên nhân - Tại sao nó lại quá chậm như vậy?

Có hai lý do chính khiến các test case chạy quá chậm:

1. **Active Record:** Ruby on Rails giúp việc kết hợp truy cập DB bên trong các class quá dễ dàng - điều này dẫn đến việc viết các unit/integration test kết hợp, chậm hơn đáng kể so với unit tests. Đây là các bài kiểm tra mà bạn kiểm tra class của mình nhưng cũng tạo các đối tượng trong DB trong quy trình. Truy cập DB chậm hơn nhiều so với thực thi code, và chính nó làm chậm các bài kiểm tra của bạn.
2. **Factory cascade:** Để tạo ra các đối tượng phức tạp đó trong các test case, nhiều nhà phát triển RoR sử dụng [factory-bot](https://github.com/thoughtbot/factory_bot) gem. Nó là một gem tuyệt vời giúp cải thiện chất lượng code và giúp tạo ra các test case súc tích bằng cách tận dụng `Factory` pattern. Nhưng có khả năng, nó cũng dẫn đến một hiện tượng gọi là `factory cascade`(tạm dịch: chuỗi factory). Một factory cascade là khi một factory sử dụng các factory khác, và các factory đó sử dụng các factory khác nữa. Cá biệt, bạn có thể dễ dàng thấy mình thực hiện hơn 30 câu truy vấn `insert` DB trong một test case duy nhất. (Xem [bài viết tuyệt vời này để tìm hiểu thêm về chủ đề này](https://evilmartians.com/chronicles/testprof-2-factory-therapy-for-your-ruby-tests-rspec-minitest).)

Vì vậy, tôi không chỉ tạo ra các bản ghi vào DB trong các thử nghiệm của mình, mà tôi còn tạo ra rất nhiều trong số chúng - và điều đó gây ra chậm.

#  Giải pháp: Test-prof Gem 
Có gem khá ngầu được gọi là [test-prof](https://test-prof.evilmartians.io/#/). Nó có một số công cụ có thể giúp bạn phân tích bộ thử nghiệm của mình và cải thiện nó. Không có gì phức tạp trong code của tôi, nên ngay lập tức nghi ngờ một `factory cascade`.

Để hiểu mức độ tồi tệ của factory cascade, tôi đã sử dụng [factory profiler](https://test-prof.evilmartians.io/#/factory_prof) mà gem cung cấp.

Kết quả của FactoryProf:

![](https://images.viblo.asia/787403b8-023f-4de0-a476-2359daa14bb5.png)

Đối với 45 test case, 1.490 bản ghi đã được tạo trong DB, khiến 45 test case này mất hơn 15 giây (khoảng 65% thời gian chạy) để tạo đối tượng. Số lượng bản ghi thật kinh khủng! Hãy đọc phần bên dưới để xem cách tôi giảm 70% đối tượng và thời gian chạy.

Điều đầu tiên tôi nhận thấy là tôi đã tạo ra 152 bản ghi `location` và mất bốn giây - nhưng không cái nào trong số chúng được gọi rõ ràng từ bộ thử nghiệm của tôi (top-level là 0).

![](https://images.viblo.asia/3f701cee-7e2d-46ed-91ab-538c79aa7457.png)

Để dừng việc này lại thì tôi sẽ đi tìm kiếm factory nào đã tạo locations. Thủ phạm dường như là `invoice` factory. Vì tôi xây dựng một class quản lý dữ liệu invoice, bạn có thể giả sử tôi gọi tới `invoice` factory khá thường xuyên.

```ruby
FactoryBot.define do
  factory :invoice do
    some_dependency { "foo" }
    ...
    location    # ---> thủ phạm
```

Trong trường hợp bạn không biết - bạn không nên sử dụng phương thức `create` của `FactoryBot` mỗi khi bạn cần một đối tượng. Bạn chỉ nên sử dụng nó nếu bạn cần duy trì đối tượng trong DB. Có các tùy chọn khác có thể sử dụng là:
* `FactoryBot.build` - Nó sẽ không tạo đối tượng trong DB, do đó, nó nhanh hơn nhiều so với `create`, nhưng nó sẽ có các associations trong DB. Vì vậy, nó có thể gây ra factory cascade!
* `FactoryBot.build_stubbed` - Nó cũng sẽ không tạo đối tượng trong DB, và không tạo associations. Đẹp. Nhưng có một điểm thu hút: Nó sẽ điền vào cột `id` và tất cả các trường được xác định trong factory. Khi sử dụng phương thức này, bạn sẽ không thể sử dụng các associations mà không cần khai báo chúng một cách rõ ràng với factory - ví dụ: `FactoryBot.build_stubbed (:location, address: address)`

OK, hãy tiến hành sửa lại như sau

```ruby
let(:invoice) { FactoryBot.build_stubbed(:final_invoice, location: location) }
let(:location) { FactoryBot.build_stubbed(:location) }
```

Hãy xem kết quả tôi nhận được khi sử dụng `build_stubbed`:

![](https://images.viblo.asia/4435dca7-ee13-478a-940d-71b1cb40f53f.png)

Nhìn xem, khi  stub `locations` cũng đã giảm đáng kể số lượng `address` và `bank_accounts` được tạo. Và chúng tôi đã giảm 30% thời gian chạy.

Tiếp theo hãy xem chúng ta có thể làm gì thêm hay không?

![](https://images.viblo.asia/a7b15cb5-9c0e-4f47-828d-f666231f20b8.png)

`primary_reservation` có vẻ như cũng là một tác nhân nữa. Một lần nữa, chúng ta lại thấy một factory không được gọi một cách rõ ràng mà mất một lượng lớn thời gian chạy - tám giây. Hãy cùng xem factory có thể là thủ phạm ở đây:

```ruby
FactoryBot.define do
  factory :line_item do
    some_dependency { "foo" } 
    association :reservation, factory: :primary_reservation
```

Aha! Nó là factory `line_item`. Các item  là các hàng trong `invoice` - do đó, họ đã sử dụng khá nhiều trong bộ thử nghiệm này. Hãy tìm những nơi mà không cần sử dụng và gán giá trị `nil` cho chúng:

```ruby
let!(:line_item) { FactoryBot.create(:line_item, reservation: nil) }
```

```ruby
let(:primary_reservation) { FactoryBot.build_stubbed(:primary_reservation, location: location) }
```

Hãy xem kết quả:

![](https://images.viblo.asia/a85471dc-893b-4fb1-aa4b-bb3358b555ab.png)

Sáu giây nữa đã biến mất. Thật tuyệt với, việc tạo đối tượng giảm từ hơn 15 giây xuống còn bốn giây - giảm hơn 70%.
Bốn giây dường như đủ nhanh để dừng lại ở thời điểm này. 

# Tổng hợp lại

* Hãy cẩn thận khi sử dụng `FactoryBot.create`. Nó có thể làm chậm việc test một cách đáng kể.
* Luôn cố gắng sử dụng `build_stubbed` bất cứ khi nào có thể, và nếu không thể thì có thể sử dụng `build`.
* Nếu bắt buộc phải sử dụng `create`, hãy sử dụng `test-prof` để hiểu mức độ xấu của nó với test case và cố gắng tối ưu hóa nó bằng thông tin này.

Cảm ơn các bạn đã đọc. Bài viết được dịch từ [nguồn](https://medium.com/better-programming/cut-your-rspec-minitest-runtime-with-testprof-d19e55783050)