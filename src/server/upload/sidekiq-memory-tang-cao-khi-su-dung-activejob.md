Dự án của tôi đang dùng có rất nhiều chỗ dùng chạy tự động và tôi có sử dụng Gem sidekiq.
Trong đó, tôi đã gặp 1 vấn đề là lượng ram của hệ thống sẽ tăng lên rất nhanh và không được giải phóng trong quá trình sử dụng ActiveJob(AJ) của Sidekiq.

## Vấn đề
Giả sử bạn có một chức năng gửi mail đến một list người dùng và tính năng này là tự động.
Khi đó có một cách làm đơn giản và dễ xử lý là: Một vòng lặp đi toàn bộ list user cần nhận mail và thực hiện lệnh gửi mail

Code
```
Contact.not_opted_out.each do |contact|
  BroadcastMessageDeliver.perform_async(contact.id, the_message.id)
end
```

Tuy nhiên,  nếu bạn có data lên tới hàng trăm nghìn bản ghi thì server của bạn dễ rơi vào tình trạng không đủ memory để duy trì. Điều này có thể tìm thấy tại [issues](https://github.com/mperham/sidekiq/issues/3782) . 

Tại issues này tác giả cũng đưa ra 1 ví dụ mà dẫn tới Memory của server tăng đột ngột. 

**Git:** https://github.com/davidpiegza/sidekiq-memory-test

Tác giả đưa ra 1 ví dụ đơn giản là tạo một vòng lặp ko có query nhưng lại gọi tới một AJ khác
```
class MainJob < ApplicationJob
  queue_as :default

  AMOUNT_SUB_JOBS = 250_000

  def perform
    AMOUNT_SUB_JOBS.times do |index|
      SubJob.perform_later(index)
    end
  end
end
```

```
class SubJob < ApplicationJob
  queue_as :default

  def perform(index)
    puts "Performing Job with index ##{index}"
  end
end
```

Điều này dẫn tới Memory sử dụng tới 522 MB. 

Tuy nhiên khi không sử dụng AJ thì memory của tác giả chỉ ở mức 60MB.

2 Ví dụ trên thì ví dụ đầu mình đưa ra cũng là một tinh huống tương tự mà mình gặp trong thực tế và nó gây ảnh hưởng rất lớn là hệ thống của mình bị treo. 

## Xử lý

##### Phương pháp 1
Theo như trong issues tác giả của Sidekiq mperham có cho một cách xử lý với AJ mà cái này có thể do mình chưa đọc kỹ Docs nên ko biết để xử lý kịp thời đó là xử dụng `push_bulk` của Sidekiq.

```
Contact.not_opted_out.find_in_batches do |batch|
  Sidekiq::Client.push_bulk(
    class: 'BroadcastMessageDeliver', 
    args: batch.map { |c| [c.id, the_message.id] }
  )
end
```

##### Phương pháp 2

Cách này là mình xử lý trong dự án của mình, vì hệ thống yêu cầu đến 7h sáng sẽ quét trong db 1 lượt để send mail thay vì mình sử dụng sidekiq thì bên mình chuyển sang dùng whenever nó cũng đáp ứng dược nhu cầu của khách hàng và cùng khá dễ dàng code.

##### Phương pháp 3 

Cách làm này mình search google và cũng là ý tưởng cho bài viết này: https://www.petekeen.net/using-que-instead-of-sidekiq
Sử dụng Gem [Que](https://github.com/chanks/que) thay cho Sử dụng AJ.(Tuy nhiên nó lại áp dụng với PostgreSQL nên mình cũng chưa thử)

Theo địn nghĩa thì nó được sinh ra để hỗ trợ ruby vs PostgreSQL để quán lý công việc bằng sử dụng advisory locks.

### Kết luận

Memory vs CPU chỉ tăng cao khi có số lượng được record hoặc vòng lặp được sinh ra nhiều lần vì vậy khi dev chúng ta cần làm cho số lượng bản ghi của chúng ta lên tới trăm nghìn và theo mình nghĩ nếu có thể bạn nên để rơi vào con số 1 triệu bản ghi thì sẽ có sự khác biệt rất lớn và có thể tham khảo sử dụng `benchmarks` để chắc chắn hơn.