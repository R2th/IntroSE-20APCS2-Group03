Bài biết này là các phần liên quan tới hệ gợi ý được sử dụng cho đồ án tốt nghiệp của mình

![](https://images.viblo.asia/f0891972-44cb-443b-b391-325b48ff8b09.png)
# 1 Thuật toán Chỉ số Sørensen–Dice 
## 1.1 Định nghĩa 
Chỉ số Sørensen–Dice là một phương pháp thống kê được sử dụng để đánh giá sự giống nhau của hai mẫu. Nó được phát triển độc lập bởi Thorvald Sørensen và Lee Raymond Dice. 
## 1.2 Công thức 
Công thức ban đầu của Sørensen được dự định sẽ được áp dụng cho dữ liệu rời rạc. Cho hai bộ X và Y, Chỉ số Sørensen-Dice được định nghĩa như sau: 
$$
DSC=\frac{2|X∩Y|}{|X|+|Y|}
$$
Trong đó: |X| và |Y| là số phần tử các bộ X, Y. DSC ở đây sẽ bằng 2 lần thương của số phần tử chung của 2 bộ chia cho tổng số phần tử của 2 bộ. 

Khi áp dụng cho các bộ dữ liệu boolean, sử dụng các định nghĩa true positive (TP), false positive (FP) và false negative (FN), ta có thể viết dưới dạng: 
$$
DSC=\frac{2TP}{2TP+FP+FN}
$$
Nó khác với chỉ số Jaccard chỉ tính true positive một lần ở cả tử số và mẫu số. DSC là thương số của độ tương tự và nằm trong khoảng từ 0 đến 1. Nó có thể được xem như là thước đo độ tương tự trên các tập hợp.  

## 1.3 So sánh với thuật toán Chỉ mục Jaccard 
Hệ số này không khác lắm về hình thức so với Chỉ mục Jaccard. Trong thực tế, nếu cho giá trị Chỉ số Sørensen–Dice là S, Chỉ mục Jaccard là J, ta có: $J =S/(2-S)$ và $S = 2J/(1+J)$. 

Tuy nhiên, Chỉ số Sørensen–Dice không tuân theo bất đẳng thức tam giác nên có thể được coi là phiên bản bán số liệu của Chỉ mục Jaccard. 

Chỉ số Sørensen–Dice cũng chỉ nhận giá trị từ 0 đến 1 như Chỉ mục Jaccard, nhưng hàm khác biệt tương ứng  
$$
d=1-\frac{2|X∩Y|}{|X|+|Y|}
$$
của Chỉ số Sørensen–Dice lại không phải là số liệu khoảng cách phù hợp do không thoả mãn bất đẳng thức tam giác 
## 1.4 Ứng dụng thực tế
Ứng dụng chủ yếu của Chỉ số Sørensen–Dice hiện tại là ở trong các lĩnh vực Sinh thái học và các lĩnh vực của Công nghệ thông tin như Nhận dạng hình ảnh và So sánh chuỗi kí tự. 
# 2 Giới thiệu về gem Predictor
Predictor là 1 gem được phát triển bởi công ty [Pathgather](https://www.pathgather.com/) và được quảng cáo là chính công ty cũng đang sử dụng gem này cho Recommender System của chính công ty. Đây là Github của gem: https://github.com/Pathgather/predictor

Theo như README của gem thì nó được forked lại từ gem [Recommendify](https://github.com/asmuth/recommendify) của Paul Asmuth, 1 gem được viết bởi ngôn ngữ Ruby và C và được viết lại nhằm mục đích:
* Đưa ra hiệu quả và trải nghiệm tốt hơn bằng cách sử dụng Redis cho hầu hết logic.
* Cung cấp các mục tương tự như "Người dùng đọc sách này cũng đọc ..."
* Cung cấp dự đoán được cá nhân hóa dựa trên lịch sử quá khứ của người dùng, chẳng hạn như "Bạn đã đọc 10 cuốn sách này, vì vậy bạn cũng có thể muốn đọc ..."

Gem này hiện tại đang sử dụng 2 thuật toán cho việc gợi ý là Jaccard và Sørensen–Dice. Và mặc dù là gem của 1 công ty nhưng công ty cũng rất sẵn lòng được commit bởi tất cả các Ruby dev trên thế giới. 
# 3 Thuật toán Sørensen–Dice trong gem Predictor
Tại README của gem, chúng ta có hướng dẫn sử dụng như sau:
```ruby
class CourseRecommender
  include Predictor::Base

  input_matrix :users, weight: 3.0
  input_matrix :tags, weight: 2.0
  input_matrix :topics, weight: 1.0, measure: :sorensen_coefficient # Use Sorenson over Jaccard
end
```
Về hướng dẫn sử dụng thì sẽ thuộc phần sau, nhưng ở đây có 2 điều cần quan tâm `measure:` và  `:sorensen_coefficient`

Và giải thích của measure ở đây:
```ruby
# predictor/lib/predictor/input_matrix.rb
module Predictor
  class InputMatrix
    def initialize(opts)
      @opts = opts
    end

    def measure_name
      @opts.fetch(:measure, :jaccard_index)
    end
    ...
```
Như vậy theo dòng code bên trên, chúng ta chỉ cần quyết định tên method và method đó được sử dụng. Còn không thì mặc định là Jaccard.

Và về cách cài đặt của  `:sorensen_coefficient`:
```ruby
# predictor/lib/predictor/distance.rb
module Predictor
  module Distance
    extend self

    def jaccard_index(key_1, key_2, redis = Predictor.redis)
      x, y = nil

      redis.multi do |multi|
        x = multi.sinterstore 'temp', [key_1, key_2]
        y = multi.sunionstore 'temp', [key_1, key_2]
        multi.del 'temp'
      end

      y.value > 0 ? (x.value.to_f/y.value.to_f) : 0.0
    end

    def sorensen_coefficient(key_1, key_2, redis = Predictor.redis)
      x, y, z = nil

      redis.multi do |multi|
        x = multi.sinterstore 'temp', [key_1, key_2]
        y = multi.scard key_1
        z = multi.scard key_2
        multi.del 'temp'
      end

      denom = (y.value + z.value)
      denom > 0 ? (2 * (x.value) / denom.to_f) : 0.0
    end
  end
end
```
Theo như module trên, ta có thể thấy method `sorensen_coefficient` đã được dựng rất sát so với công thức đã cho ban đầu. Thế nên ta hoàn toàn yên tâm khi sử dụng theo đúng hướng dẫn sử dụng là ta sẽ có hệ gợi ý dựa trên thuật toán Sørensen–Dice.
# 4 Cài đặt và sử dụng gem
Trước khi vào phần này thì mình xin được phép upload thiết kế CSDL của mình để mọi người có thể hình dung.

![](https://images.viblo.asia/34f3d7be-870d-437d-94e1-8d4e29c1ffe9.png)

Ở đây mình sẽ gợi ý sự kiện cho người dùng với các yếu tố gợi ý lấy thí nghiệm là tag, place, age_filter và provider_id. Bộ dữ liệu gồm có 12 event,6 tag, 2 user với role provider(project có 3 role là user, provider và admin), age_filter sẽ chạy từ 1 đến 10. Cách thức là lấy tất cả các dữ liệu dạng số để xử lý(tức là với tag, provider và place ta sẽ lấy id). Như vậy, tất cả các dữ liệu thử đều là kiểu `int`.
## 4.1 Cài đặt và sử dụng
Trước hết thì thêm vào Gemfile của project như sau:
```
gem 'predictor'
```
Sau đó thì chạy lệnh `bundle` là chúng ta đã có gem trong project.

Hãy cài trước Redis vì tiếp theo đó, chúng ta sẽ config
```ruby
# in config/initializers/predictor.rb
# đây là config của mình với local
Predictor.redis = Redis.new

# với link custom
# Predictor.redis = Redis.new(:url => ENV["PREDICTOR_REDIS"])
```
Tiếp theo ta sẽ tạo class
```ruby
# lib/event_recommender
require 'singleton'

class EventRecommender
    include Predictor::Base
    include Singleton
  
    # input_matrix :users, weight: 3.0, measure: :sorensen_coefficient # Use Sorenson over Jaccard
    input_matrix :age, weight: 2.0, measure: :sorensen_coefficient # Use Sorenson over Jaccard
    input_matrix :tags, weight: 1.0, measure: :sorensen_coefficient # Use Sorenson over Jaccard
    input_matrix :place, weight: 1.0, measure: :sorensen_coefficient # Use Sorenson over Jaccard
    input_matrix :provider, weight: 1.0, measure: :sorensen_coefficient # Use Sorenson over Jaccard

    def self.add_event(event)
        # incrementally update age matrix
        instance.age.add_to_set(event.age, event.id)
        # incrementally update place matrix
        instance.place.add_to_set(event.place.id, event.id)
        # incrementally update provider matrix
        instance.provider.add_to_set(event.provider.id, event.id)
        # incrementally update tags matrix
        event.tags.each do |tag|
          instance.tags.add_to_set(tag.id, event.id)
        end
        instance.process_items!(event.id)
    end

    def self.delete_event(event)
        # delete product from all matrices
        instance.delete_item!(event.id)
    end    
end
```
Ta thêm tiếp các dòng sau vào cuối model với mục đích thêm event mới vào recommender khi create và xoá event khỏi recommender khi delete
```ruby
# app/models/event
class Event < ApplicationRecord
    ...
    after_commit ->(event) do
        EventRecommender.add_event(event)
    end, if: :persisted?
    
    after_commit ->(event) do
        EventRecommender.delete_event(event)
    end, on: :destroy
end
```
Tại EventController, ta sẽ viết như sau:
```ruby
require 'event_recommender'

class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  def show
    @ids = EventRecommender.instance.similarities_for(@event.id)    
  end
```
Khi thêm như vậy, ta sẽ lọc ra được toàn bộ dãy các id của các event tương đồng với event đang được show bằng `similarities_for`. Và để kiểm chứng chúng ta sẽ chuyển sang view(code này khá xấu nên mong các bạn thông cảm. Mình cần nó chạy được để các bạn xem)
```ruby
app/views/events/show.html.erb
      <%# @ids từ controller %>
      <% @ids.each do |id| %>
        <% event=Event.find(id) %>
        <%= link_to event.name, event_path(event)%><br>
      <% end %>
```
## 4.2 Kết quả
Mình lấy sự kiện có id = 2. Đây là seed của event trong file seed.rb
```ruby
{
        name: "Dã ngoại ở công viên Thống Nhất",
        description: "Với cây xanh và hồ trong sạch, cùng trải nghiệm các hoạt động ngoài trời",
        place_id: 1,
        provider_id: 2,
        start: 5.days.from_now,
        end: 6.days.from_now,
        hidden_status: false,
        age_filter: 5,
        tag_ids: [4, 5, 6]
    }
```
và đây là kết quả dữ liệu đổ ra

![](https://images.viblo.asia/54b79d72-0e67-4f47-85e0-9c0d49b6cb36.png)

Các event được gợi ý lần lượt có dữ liệu là 4,5,7,6(chắc chắn là so với 12 event thì đây chỉ bằng 1/3). Mình sẽ gửi các bạn các event có id này có chứa dữ liệu gì ở file seed.rb
```ruby
# event.id = 4
{
        name: "Trải nghiệm tự tay làm đồ gốm",
        description: "1 trong những cách sáng tạo để có thể cho trẻ nhỏ học nghệ thuật",
        place_id: 4,
        provider_id: 2,
        start: 5.days.from_now,
        end: 6.days.from_now,
        hidden_status: false,
        age_filter: 5,
        tag_ids: [2]
    }, 
# event.id = 5
{
        name: "Khám phá rừng Cúc Phương",
        description: "Dịp để các em nhỏ tìm hiểu với thiên nhiên và tham quan Cây chò ngàn năm",
        place_id: 11,
        provider_id: 3,
        start: 10.days.from_now,
        end: 12.days.from_now,
        hidden_status: false,
        age_filter: 8,
        tag_ids: [2,4,5]
    }, 
# event.id = 6
{
        name: "Làm quen với nhạc cụ dân tộc",
        description: "Sự kiện tổ chức nhằm cho các em thiếu nhi làm quen với các nhạc cụ dân tộc và thử 1 vài nhạc cụ",
        place_id: 21,
        provider_id: 2,
        start: 10.days.from_now,
        end: 11.days.from_now,
        hidden_status: false,
        age_filter: 8,
        tag_ids: [2,4]
    },
# event.id = 7
{
        name: "Xem múa rối nước",
        description: "Sự kiện tổ chức nhằm cho các em thiếu nhi làm quen với nghệ thuật múa rối nước",
        place_id: 21,
        provider_id: 2,
        start: 12.days.from_now,
        end: 13.days.from_now,
        hidden_status: false,
        age_filter: 4,
        tag_ids: [2,4]
    },
```
Tóm tắt lại chúng ta có thể thấy độ tương đồng của các event theo các thuộc tính mình đem thí nghiệm như sau:
- Về place, các thuộc tính đã cho mình không chung nhau
- Về provider,  event có id thuộc tập {2,4,7,6} chung 1 provider có id = 2
- Về age, event có id thuộc tập {2,4} chung age_filter = 5; event có id thuộc tập {5,6} chung age_filter = 8
- Về tag, event có id=2 chung có các tag chứa id trong tập {4,5,6}, chung {4, 5} với event có id = 5, và chung duy nhất {4} với event có id = 7 và event có id = 6.

Nhìn kết quả này, ta cũng có thể thấy bộ event có id {5,6,7} sẽ luôn xuất hiện trong gợi ý của nhau. Và để kiểm chứng mình cũng vào id=5

![](https://images.viblo.asia/889694f5-123d-484e-9982-f9794e8f6591.png)

Như các bạn đã thấy, gợi ý đầu tiên là tên của event có id = 7 bên trên và thứ hai là tên của event có id = 6. 

Về tốc độ thì mình không thấy ảnh hưởng đáng kể ở trong log của rails.
#  5 Kết luận
Trên đây là tìm hiểu của mình về gem Predictor và chỉ mới dùng method `similarities_for` và đang nghiên cứu dở cách dùng `predictions_for`. Hiện tại tại thời điểm viết bài này code đồ án của mình vẫn có 1 số chỗ cần bổ sung và nâng cấp. Đây là link git của project: https://github.com/BlazingRockStorm/let-us-go . Mình thực sự thực sự cảm ơn các bạn nếu các commit cho mình để cải thiện được chức năng cho tốt hơn.

Rất mong các bạn cảm thấy bài viết có ích. Xin cảm ơn các bạn đã đọc bài viết của mình

# 6 Update và hướng dẫn thử
Sau 1 hồi loay hoay chỉnh giao diện thì mang tiếng là có chứng chỉ Front-end Dev của FreeCodeCamp nhưng thực tế thì mãi mình mới xử HTML/CSS đc :joy: Thế nên mình đã sửa phần kết luận và đưa link Git để các bạn có thể lấy về thử. Đây là ảnh của phần các event đc recommend

![](https://images.viblo.asia/37890968-d010-45aa-aadb-476fccd7314e.png)

Hướng dẫn cài đặt:
- Clone project
- Cài Docker
- Trong thư mục project, mở terminal, chạy: `docker-compose up --build`
- Mở terminal khác, truy cập thư mục project và chạy: `docker exec -ti let-us-go_web_1 /bin/sh`. Tại terminal đó lần lượt chạy `rails db:migrate` và `rails db:seed`
- Cuối cùng vào `0.0.0.0:3000` và dùng project