Ngày 18/1/2019 bản beta của rails 6 đã được release, cùng với đó là các thay đổi góp phần cho ruby on rails càng ngày càng hoàn thiện thêm. Cùng điểm qua một số thay đổi quan trọng trong version này nhé:   
- Action Text.
- Action Mailbox.
- Multiple Database support.
- Parallel testing support.

2 framework mới được thêm vào là action text và action mailbox. Kèm với đó là hai nâng cấp mở rộng từ mặc định là việ hỗ trợ cùng lúc sử dụng nhiều database(multiple database) vầ kiểm thử song song(parallel testing).   

## Action Text    
Trước đây để sử dụng được rich text thì chúng ta phải thêm các thư viện bên ngoài vào để khởi tạo, tôi cũng đã từng đánh vật với mấy cái lỗi mà thầng ckeditor gây ra khi chúng tôi cố gắng custom nó theo spec. Nay từ rails 6 chúng ta sẽ có sẵn Action Text để làm việc này.  
Action text sẽ cho phép chúng ta thêm, sửa xoá nội dung rich text cực kì dễ dàng. Đây là sự kết hợp giữa [Trix editor](https://trix-editor.org/), Active Storage - xử lý file và hình ảnh và luồng xử lý văn bản để liên kết tất cả lại với nhau.  
Không chỉ vậy, Action text còn được xây dựng từ một phần code dùng để chỉnh sửa richtext của [Basecamp 3](https://basecamp.com/)
Trix cũng vừa bước sang version 1.0, được phát triển bởi 2 lập trình viên Sam Stephenson và Javan Makhmali. Cả 2 ông này đều đã làm việc trong quá trình clone code từ basecamp qua action text =)).
Video demo action text:

{@embed:https://www.youtube.com/watch?v=HJZ9TnKrt7Q&feature=youtu.be}
## Action Mailbox   
Là framework thứ 2 được thêm vào trong phiên bản này của rails. Do sự hoạt động chưa thực sự hiệu quả của action mailer nên phía phát triển quyết định thêm vào action mailbox và nó sẽ đóng vai trò như là hộp thư đến.  Nó như route để hướng dẫn mail đến controller để xử lý vậy. Nó xuất ra các email với  'ingresses' thích hợp cho Amazon SES, mailgun, sendgrid,... Bạn cũng có thể xử lý 'inbound mail' bằng cách sử dụng [Postfix ingress](https://github.com/rails/rails/blob/master/actionmailbox/app/controllers/action_mailbox/ingresses/postmark/inbound_emails_controller.rb).

Framework nầy cũng như action text hay action storage đều được 'clone' từ basecamp3 (action mailbox đã được chạy thử trên basecamp môi trường produciton ~ 1 tháng).  

Các email gửi đến được chuyển thành InboundEmail records thông qua Active records và tính năng lifecycle tracking, lưu trữ mail gốc trên cloud bằng active storage.  
## [Multiple Database](https://github.com/rails/rails/pull/34052)   
Mục đích:  
- kết nối tới nhiều database trong 1 model.
- chuyển đổi các kết nối bằng việc sử dụng các block ({})
chủ yếu là phương thức `connects_to`. Ví dụ rõ ràng theo đó là:
```
class AnimalsBase < ApplicationRecord
  connects_to database: { writing: :animals, reading: :animals_replica }
end
```

Và bên trong Application - ngoài file khai báo model, chúng ta có thể thay đổi connections của model bằng cách gọi đến block theo như:  
```
ModelInPrimary.connected_to(database: { slow_readonly: :primary_replica_slow }) do
  ModelInPrimary.do_something_thats_slow
end
```

Khi muốn query cho các model đã được connected tới nhiều database khác nhau:   
```
ActiveRecord::Base.connected_to(hander: :reading) do
  Dog.read_something_from_dog
  ModelInPrimary.do_something_from_model_in_primary
end
```
## [Parallel testing](https://github.com/rails/rails/pull/31900)
Chạy nhiều testcase cùng 1 lúc, trước giờ tôi thường comment các testcase đã pass và không liên quan đến testcase hiện tại để chạy thử cho nhanh, nhưng cách này lại có rủi ro tiềm ẩn!
các app mới sẽ mặc định có parallel nhưng với các app cũ thì cần thêm vào
```
class ActiveSupport::TestCase
  parallelize(workers: 2)
end
```

để sử dụng, khi chạy lệnh test các bạn thêm vào trước câu lệnh mặc định:  
`PARALLEL_WORKERS=15 bin/rails test`

nếu bạn có nhiều database, bạn cần thêm 1 chút gia vị vào trong test_helper.rb
```
class ActiveSupport::TestCase
  parallelize(workers: 2)

  parallelize_setup do |worker|
    # create a db w/ worker. Runs after processes are forked
  end

  parallelize_teardown do |worker|
    # delete the test databases or other cleanup. Runs before processes are closed
  end
end
```

Đây chỉ là 1 bài viết tổng hợp giới thiệu sơ qua nên còn nhiều thiếu sót, mong nhận được sự góp ý từ mọi người :grinning:   


nguồn: https://weblog.rubyonrails.org/2019/1/18/Rails-6-0-Action-Mailbox-Action-Text-Multiple-DBs-Parallel-Testing/