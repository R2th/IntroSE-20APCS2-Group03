Trong bài viết này, chúng ta sẽ xem xét phương thức update_counters của ActiveRecord. Trong quá trình này, chúng ta sẽ xem xét cái bẫy phổ biến của "race conditions" trong các ứng dụng đa luồng và cách phương pháp có thể ngăn chặn chúng.

### Đa luồng

Khi lập trình, chúng ta có một số cách để chạy mã song song, bao gồm processes, threads và gần đây (trong Ruby), fibers và reactors. Trong bài viết này, chúng ta sẽ chỉ lo lắng về các luồng, vì nó là dạng phổ biến nhất mà các nhà phát triển Rails sẽ gặp phải. Ví dụ: Puma là một máy chủ đa luồng và Sidekiq là một bộ xử lý công việc nền đa luồng.

Chúng ta sẽ không đi sâu vào chủ đề và sự an toàn của chủ đề ở đây. Điều chính cần biết là khi hai luồng đang hoạt động trên cùng một dữ liệu, dữ liệu có thể dễ dàng bị bất đồng bộ. Vấn đề này được gọi là "race condition".

### Race conditions

Race condition xảy ra khi hai (hoặc nhiều) luồng đang hoạt động trên cùng một dữ liệu tại cùng một thời điểm, có nghĩa là một luồng có thể kết thúc khi đang sử dụng dữ liệu cũ. Nó được gọi là "race condition" vì nó giống như hai luồng đang chạy đua với nhau, và trạng thái cuối cùng của dữ liệu có thể khác nhau tùy thuộc vào luồng nào "đã thắng cuộc đua". Có lẽ điều tồi tệ nhất là, các race condition rất khó tái tạo vì chúng thường chỉ xảy ra nếu các luồng "thay phiên nhau" theo một thứ tự cụ thể và tại một điểm cụ thể trong mã.

### Một ví dụ

Một kịch bản phổ biến được sử dụng để tái hiện một race condition là cập nhật số dư ngân hàng. Chúng ta sẽ tạo một lớp thử nghiệm đơn giản trong một ứng dụng Rails cơ bản để chúng tôi có thể xem điều gì sẽ xảy ra:

```ruby
class UnsafeTransaction
  def self.run
    account = Account.find(1)
    account.update!(balance: 0)

    threads = []
    4.times do
      threads << Thread.new do
        balance = account.reload.balance
        account.update!(balance: balance + 100)

        balance = account.reload.balance
        account.update!(balance: balance - 100)
      end
    end

    threads.map(&:join)

    account.reload.balance
  end
end
```

UnsafeTransaction của chúng ta khá đơn giản; chúng ta chỉ có một phương pháp tra cứu Tài khoản (mô hình chứng khoán Rails tiêu chuẩn với thuộc tính số dư BigDecimal). Chúng ta đặt lại số dư về 0 để làm cho việc chạy test đơn giản hơn.

Vòng lặp bên trong là nơi mọi thứ trở nên thú vị hơn một chút. Chúng ta đang tạo bốn chuỗi sẽ lấy số dư hiện tại của tài khoản, cộng 100 vào đó (ví dụ: khoản tiền gửi 100 đô la), và sau đó ngay lập tức trừ đi 100 (ví dụ: khoản rút 100 đô la). Chúng ta thậm chí còn sử dụng tải lại cả hai lần để chắc chắn rằng chúng ta có số dư cập nhật.

Các dòng còn lại chỉ là một số việc thu dọn. Thread.join có nghĩa là chúng ta sẽ đợi tất cả các luồng kết thúc trước khi tiếp tục và sau đó chúng ta trả lại số dư cuối cùng ở cuối phương thức.

Nếu chúng ta chạy điều này với một chuỗi duy nhất (bằng cách thay đổi vòng lặp thành 1. lần thực hiện), chúng ta có thể vui vẻ chạy nó hàng triệu lần và chắc chắn rằng số dư tài khoản cuối cùng sẽ luôn bằng 0. Tuy nhiên, hãy thay đổi nó thành hai (hoặc nhiều) luồng và mọi thứ ít chắc chắn hơn.

Chạy thử nghiệm của chúng ta một lần trong bảng điều khiển có thể sẽ cho chúng tôi câu trả lời chính xác:

```ruby
UnsafeTransaction.run
=> 0.0

Tuy nhiên, điều gì sẽ xảy ra nếu chúng ta chạy đi chạy lại nó. Giả sử chúng ta đã chạy nó mười lần:

(1..10).map { UnsafeTransaction.run }.map(&:to_f)
=> [0.0, 300.0, 300.0, 100.0, 100.0, 100.0, 300.0, 300.0, 100.0, 300.0]
```

Hãy nhớ rằng, mã của chúng ta lấy số dư hiện tại, cộng 100 và sau đó trừ ngay 100, vì vậy kết quả cuối cùng phải luôn là 0,0. Do đó, các mục nhập 100.0 và 300.0 này là bằng chứng cho thấy chúng ta có một race condition.

### Giải pháp

Có một vài lựa chọn để ngăn chặn các race condition, nhưng gần như tất cả chúng đều xoay quanh một ý tưởng duy nhất: đảm bảo rằng chỉ có một thực thể đang thay đổi dữ liệu tại bất kỳ thời điểm nào.

### Giải pháp 1: Mutex

Tùy chọn đơn giản nhất là "khóa loại trừ lẫn nhau", thường được gọi là mutex. Bạn có thể coi mutex như một ổ khóa chỉ có một chìa khóa. Nếu một luồng đang giữ khóa, nó có thể chạy bất cứ thứ gì có trong mutex. Tất cả các chủ đề khác sẽ phải đợi cho đến khi họ có thể giữ chìa khóa.

Áp dụng mutex cho mã mẫu của chúng ta có thể được thực hiện như vậy:

```ruby
class MutexTransaction
  def self.run
    account = Account.find(1)
    account.update!(balance: 0)

    mutex = Mutex.new

    threads = []
    4.times do
      threads << Thread.new do
        mutex.lock
        balance = account.reload.balance
        account.update!(balance: balance + 100)
        mutex.unlock

        mutex.lock
        balance = account.reload.balance
        account.update!(balance: balance - 100)
        mutex.unlock
      end
    end

    threads.map(&:join)

    account.reload.balance
  end
end
```

Ở đây, mỗi khi chúng ta đọc và ghi vào tài khoản, đầu tiên chúng ta gọi mutex.lock, sau đó khi hoàn tất, chúng ta gọi mutex.unlock để cho phép các luồng khác có một lượt. Chúng ta chỉ có thể gọi mutex.lock ở đầu khối và mutex.unlock ở cuối; tuy nhiên, điều này có nghĩa là các luồng không còn chạy đồng thời, điều này phần nào phủ nhận lý do sử dụng các luồng ngay từ đầu. Đối với hiệu suất, tốt nhất là giữ mã bên trong mutex càng nhỏ càng tốt, vì nó cho phép các luồng thực thi càng nhiều mã song song càng tốt.

Chúng ta đã sử dụng .lock và .unlock để rõ ràng ở đây, nhưng lớp Mutex của Ruby cung cấp một phương thức đồng bộ hóa tốt để nhận một khối và xử lý điều này cho chúng ta, vì vậy chúng ta có thể làm như sau:

```ruby
mutex.synchronize do
  balance = ...
  ...
end
```

Ruby's Mutex thực hiện những gì chúng ta cần, nhưng như bạn có thể tưởng tượng, nó khá phổ biến trong các ứng dụng Rails khi cần khóa một hàng cơ sở dữ liệu cụ thể và ActiveRecord đã giúp chúng ta giải quyết tình huống này.

### Giải pháp  2: ActiveRecord Locks

ActiveRecord cung cấp một số cơ chế khóa khác nhau và chúng ta sẽ không đi sâu tìm hiểu tất cả chúng ở đây. Đối với mục đích của chúng ta, chúng ta chỉ có thể sử dụng khóa! để khóa một hàng mà chúng ta muốn cập nhật:

```ruby
class LockedTransaction
  def self.run
    account = Account.find(1)
    account.update!(balance: 0)

    threads = []
    4.times do
      threads << Thread.new do
        Account.transaction do
          account = account.reload
          account.lock!
          account.update!(balance: account.balance + 100)
        end

        Account.transaction do
          account = account.reload
          account.lock!
          account.update!(balance: account.balance - 100)
        end
      end
    end

    threads.map(&:join)

    account.reload.balance
  end
end
```

Trong khi Mutex "khóa" phần mã cho một chuỗi cụ thể, thì "lock!" khóa hàng cơ sở dữ liệu cụ thể. Điều này có nghĩa là cùng một mã có thể thực thi song song trên nhiều tài khoản (ví dụ: trong một loạt các công việc nền). Chỉ các luồng cần truy cập vào cùng một bản ghi mới phải đợi. ActiveRecord cũng cung cấp một phương thức #with_lock tiện dụng cho phép bạn thực hiện giao dịch và khóa một lần, vì vậy các bản cập nhật ở trên có thể được viết ngắn gọn hơn một chút như sau:

```ruby
account = account.reload
account.with_lock do
  account.update!(account.balance + 100)
end
...
```

### Giải pháp  3: Atomic methods

Một phương thức (hoặc hàm) 'atomic' không thể bị dừng giữa chừng trong quá trình thực thi. Ví dụ: phép toán += phổ biến trong Ruby không phải là nguyên tử, mặc dù nó trông giống như một phép toán đơn lẻ:

```ruby
value += 10

# equivalent to:
value = value + 10

# Or even more verbose:
temp_value = value + 10
value = temp_value
```

Nếu luồng đột nhiên "ngủ" giữa việc xác định giá trị +10 là gì và ghi kết quả trở lại giá trị, thì nó sẽ mở ra khả năng xảy ra race condition. Tuy nhiên, hãy tưởng tượng rằng Ruby không cho phép các luồng ngủ trong hoạt động này. Nếu chúng ta có thể nói một cách chắc chắn rằng một luồng sẽ không bao giờ ngủ (ví dụ: máy tính sẽ không bao giờ chuyển việc thực thi sang một luồng khác) trong quá trình hoạt động này, thì nó có thể được coi là một hoạt động "atomic".

Một số ngôn ngữ có phiên bản nguyên tử của các giá trị nguyên thủy cho chính xác loại an toàn luồng này (ví dụ: AtomicInteger và AtomicFloat). Tuy nhiên, điều này không có nghĩa là chúng ta không có sẵn một vài thao tác "atomic" với tư cách là nhà phát triển Rails. Một khi ví dụ là phương thức update_counters của ActiveRecord.

Mặc dù điều này nhằm mục đích nhiều hơn để giữ cho bộ nhớ đệm của bộ đếm được cập nhật, nhưng không có gì ngăn cản chúng ta sử dụng nó trong các ứng dụng của mình.

Sử dụng phương pháp này cực kỳ đơn giản:

```ruby
class CounterTransaction
  def self.run
    account = Account.find(1)
    account.update!(balance: 0)

    threads = []
    4.times do
      threads << Thread.new do
        Account.update_counters(account.id, balance: 100)

        Account.update_counters(account.id, balance: -100)
      end
    end

    threads.map(&:join)

    account.reload.balance
  end
end
```

The actual SQL being produced comes out like this (at least for postgres on my machine):

Không có mutexes, không có ổ khóa, chỉ có hai dòng Ruby; update_counters lấy ID bản ghi làm đối số đầu tiên, sau đó chúng ta cho nó biết cột nào cần thay đổi (số dư :) và số lượng cần thay đổi theo (100 hoặc -100). Lý do điều này hoạt động là chu kỳ đọc-cập nhật-ghi hiện xảy ra trong cơ sở dữ liệu trong một lệnh gọi SQL duy nhất. Điều này có nghĩa là chuỗi Ruby của chúng ta không thể làm gián đoạn hoạt động; ngay cả khi nó ngủ, nó sẽ không thành vấn đề vì cơ sở dữ liệu đang thực hiện tính toán thực tế.

SQL thực sự đang được sản xuất xuất hiện như thế này:

```postgres 
Account Update All (1.7ms)  UPDATE "accounts" SET "balance" = COALESCE("balance", 0) + $1 WHERE "accounts"."id" = $2  [["balance", "100.0"], ["id", 1]]
```

Cách này cũng hoạt động tốt hơn nhiều, điều này không có gì đáng ngạc nhiên, vì việc tính toán diễn ra đầy đủ trong cơ sở dữ liệu; chúng ta không bao giờ phải tải lại bản ghi để nhận giá trị mới nhất. Tuy nhiên, tốc độ này có một cái giá phải trả. Bởi vì chúng ta đang làm điều này trong SQL thô, chúng ta đang bỏ qua mô hình Rails, có nghĩa là bất kỳ xác thực hoặc lệnh gọi lại nào sẽ không được thực thi (có nghĩa là, trong số những thứ khác, không có thay đổi nào đối với dấu thời gian updated_at).

### Kết luận

Race conditions rất dễ xảy ra, thường không thể tái hiện và khó lường trước được. Ruby và Rails, ít nhất, cung cấp cho chúng ta một số công cụ hữu ích để giải quyết những vấn đề này khi chúng ta tìm thấy chúng.

Đối với mã Ruby nói chung, Mutex là một lựa chọn tốt và có lẽ là điều đầu tiên mà hầu hết các nhà phát triển nghĩ đến khi nghe đến thuật ngữ "an toàn luồng".

Với Rails, nhiều khả năng là dữ liệu đến từ ActiveRecord. Trong những trường hợp này, hãy khóa! (hoặc with_lock) dễ sử dụng và cho phép nhiều thông lượng hơn mutex, vì nó chỉ khóa các hàng có liên quan trong cơ sở dữ liệu.

Thành thật mà nói ở đây, tôi không chắc mình sẽ tiếp cận update_counters nhiều trong thế giới thực. Nó không phổ biến đến mức các nhà phát triển khác có thể không quen với cách nó hoạt động và nó không làm cho ý định của mã đặc biệt rõ ràng. Nếu phải đối mặt với các mối quan tâm về an toàn luồng, các khóa của ActiveRecord (lock! Hoặc with_lock) đều phổ biến hơn và truyền đạt rõ ràng hơn ý định của người lập trình.

Tuy nhiên, nếu bạn phải sao lưu nhiều công việc 'cộng hoặc trừ' đơn giản và bạn cần tốc độ, thì update_counters có thể là một công cụ hữu ích trong túi sau của bạn.