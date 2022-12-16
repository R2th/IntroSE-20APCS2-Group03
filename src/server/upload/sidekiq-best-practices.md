Dưới đây là một số lời khuyên giúp bạn làm việc với Sidekiq hiệu quả hơn.
Đối với ai chưa biết thì Sidekiq là một framework dùng để xử lý các background job trong ruby. Nó nhắm đến mục tiêu đơn giản để tích hợp vào bất kể ứng dụng Rails hiện đại nào, đồng thời đưa tới hiệu năng cao hơn so với những giải pháp cũ.
Có thể tìm hiểu thêm ở [Đây](https://github.com/mperham/sidekiq)

## 1. Make your job parameters small and simple
**Sidekiq** sẽ lưu các đối số của hàm *perform_async* vào Redis, một cách "đại tiện" ta hay làm thế này:
```
quote = Quote.find(quote_id)
Worker.perform_async(quote)
```

Điều mà ta đang làm ở đây là lưu toàn bộ object Quote vào redis. Tuy nhiên vấn đề gặp phải nếu như object quote đó có thay đổi mà worker vẫn chưa chạy. Điều này có thể dẫn đến sai lệch bởi object quote đã không còn như lúc chúng ta thêm tác vụ vào queue của jobs.
Chính vì thế đừng lưu cả một object như vậy, hãy chỉ lưu cách nhận dạng ra object đó. Khi job chạy nó sẽ tìm ra object nó cần để xử lý, đảm bảo object toàn vẹn, không bị sai lệch.
```
Worker.perform_async(quote)
```

## 2. Make your job idempotent and transactional

**Idempotency** ở đây nghĩ là bạn có thể thực thi job của bạn nhiều lần mà không bị lỗi. Ví dụ với những chức năng có cảnh báo lỗi, khi thực thi gặp vấn đề, nó quẳng ra lỗi và tiếp tục thử lại cho đến khi nào thành công thì thôi. Giả dụ, bạn có một job email cho người dùng về các khoản được hoàn lại vào thẻ tính dụng

```
def perform(card_charge_id)
  charge = CardCharge.find(card_charge_id)
  charge.void_transaction
  Emailer.charge_refunded(charge).deliver
end
```

Điều gì xảy ra khi email không hiển thị do lỗi? Phương thức void_transaction có xử lý trường hợp các khoản đã được hoàn trả không? Bạn có thể sử dụng một transaction cơ sở dữ liệu để đảm bảo thay đổi dữ liệu được khôi phục nếu có lỗi hoặc bạn có thể viết mã của bạn để có khả năng phục hồi khi đối mặt với lỗi. Chỉ cần nhớ rằng Sidekiq sẽ thực hiện công việc của bạn **ít nhất** một lần, không phải là **chính xác** một lần. Vì thế hãy handle việc xảy ra lỗi để job có thể chạy lại nhiều lần mà vẫn an toàn.

## 3. Embrace Concurrency

Sidekiq được thiết kế để thực thi song song nhiều công việc vì thế hãy thiết kế công việc của bạn để bạn có thể chạy nhiều lệnh song song. Nó có các tính năng cơ bản để điều chỉnh tương tranh (ví dụ: nhắm mục tiêu quy trình sidekiq tại hàng đợi có số chuỗi đã xác định) nhưng kiến trúc hệ thống của bạn đơn giản hơn nhiều nếu bạn không có sự chuyên môn hóa như vậy.

Bạn có thể sử dụng **Connection pool** để giới hạn tổng số kết nối đến một máy chủ có tài nguyên hạn chế nếu Sidekiq của bạn đang "tấn công" nó với lưu lượng truy cập lớn. Mặc định, một process, sidekiq tạo ra 25 threads, nếu nó làm tắc nghẽn hệ thống của bạn, bạn có thể giảm nó xuống

```
sidekiq -c 10
```
Không nên đặt concurrency cao hơn 50, bạn sẽ gặp rắc rối với setting cao như vậy. Lưu ý rằng ActiveRecord có connection pool cần phải được cấu hình đúng trong config / database.yml để làm việc tốt với lưu lượng cao. Đặt cài đặt pool thành thứ gì đó gần hoặc bằng số lượng mặc định của sidekiq:

```
production:
  adapter: mysql2
  database: foo_production
  pool: 25
```

Nguồn [Sidekiq wiki](https://github.com/mperham/sidekiq/wiki/Best-Practices)