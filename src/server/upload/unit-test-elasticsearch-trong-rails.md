Đang loay tìm đề tài để viết bài thì mới nhớ ra là dự án đang cần cải thiện coverage cũng như tốc độ của unit test và có một vấn đề lớn gặp phải là những case liên quan đến elasticsearch đang khá là ... toang :rofl: vì chưa có config gì cả. Vậy nên mình quyết định viết bài này để tìm hiểu cách config test cho elasticsearch sao cho hiệu quả và chia sẻ với mọi người luôn :kissing_heart:

À quên mất là dự án mình đang sử dụng 2 gem **elasticsearch-model** và **elasticsearch-rails** nên mình sẽ sử dụng các method của 2 gem này, một số gem khác như **Searchkick** hay **Tire** mình nghĩ cũng sẽ tương tự thôi. Bắt đầu nào:

## Cài đặt môi trường test
Việc đầu tiên chúng ta phải làm là cài đặt môi trường test cho elasticsearch, chắc chắn bạn không muốn dữ liệu bay sạch sau khi chạy test đâu :sweat_smile:. Cách làm của mình là tách biệt index name của các môi trường bằng cách thêm prefix cho chúng:
```
module Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    unless ["production","staging"].include?(Rails.env)
      index_name [Rails.env, model_name.collection.gsub("/","-")].join("_")
    end
  end
end
```

Viết vào một module nhỏ để include vào những model cần sử dụng cho tiện:
```
class ModelA
    include Searchable
end
```

## Clear data sau mỗi test case
Việc tiếp theo cần làm là phải clear dữ liệu sau mỗi test case để đảm bảo không làm ảnh hưởng đến các test case khác:
```
# spec_helper.rb

RSpec.configure do |config|
  # ...
  config.before(:each) do
    [ModelA, ModelB].each do |model|
      model.__elasticsearch__.create_index!(force: true)
    end
  end
end
```

## Cải thiện tốc độ
Sau khi config như trên thì về cơ bản chúng ta đã có thể viết test bình thường rồi. Tuy nhiên trong một dự án, số lượng function sử dụng elasticsearch chiếm một tỉ lệ rất nhỏ, cho nên cứ drop và create index như vậy cho tất cả test case thật không hiệu quả cho lắm :stuck_out_tongue_winking_eye:. Ta sẽ cần một số hook như sau:

Stub callback index của tất cả Model để ngăn việc cứ tạo instance là sẽ đánh index mặc dù không có sử dụng đến:
```
config.before(:each) do
    [ModelA, ModelB].each do |model|
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :index_document)
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :update_document)
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :delete_document)
    end
end
```

Bỏ Stub cho những case sử dụng elasticseach và clear index:
```
config.before(:each, elasticsearch: true) do
    [ModelA, ModelB].each do |model|
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :index_document).and_call_original
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :update_document).and_call_original
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :delete_document).and_call_original
      
      model.__elasticsearch__.create_index!(force: true)
    end
end
```

Clear sạch sẽ index sau khi run test:
```
config.after(:suite) do
    [ModelA, ModelB].each do |model|
      model.__elasticsearch__.delete_index!
    end
end
```

Cuối cùng ta sẽ có file config như sau:
```
# spec_helper.rb

RSpec.configure do |config|
  # ...
  
  config.before(:each) do
    [ModelA, ModelB].each do |model|
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :index_document)
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :update_document)
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :delete_document)
    end
  end
  
  config.before(:each, elasticsearch: true) do
    [ModelA, ModelB].each do |model|
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :index_document).and_call_original
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :update_document).and_call_original
      allow_any_instance_of(model).to receive_message_chain(:__elasticsearch__, :delete_document).and_call_original
      
      model.__elasticsearch__.create_index!(force: true)
    end
  end
  
  config.after(:suite) do
    [ModelA, ModelB].each do |model|
      model.__elasticsearch__.delete_index!
    end
  end
end
```

Sau khi config xong với những case muốn sử dụng elasticsearch chỉ việc thêm như sau:
```
it 'should use elasticsearch', :elasticsearch do
  # test case ....
end
```

## Kết bài ...
Cuối cùng cũng xong :sweat_smile: cảm ơn vì đã đọc bài viết của mình đến tận đây, hy vọng nó giúp ích được chút ít cho bạn. Nếu có góp ý gì cho mình hãy để lại comment nhé :innocent: have fun!