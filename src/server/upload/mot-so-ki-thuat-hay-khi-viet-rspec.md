Chào mọi người. Ở bài viết trước mình đã giới thiệu về một example để viết RSpec với Model. Lẽ ra mình sẽ viết tiếp một bài về example với Controller, tuy nhiên hiện tại các bài viết nghiên cứu về nó khá nhiều các bạn có thể tìm hiểm thêm. Cho nên hôm nay mình sẽ viết 1 bài cũng về RSpec, tuy nhiên mình sẽ giới thiệu 2 kỹ thuật mà mình thấy các bạn đồng nghiệp của mình hoặc là không biết đến sự tồn tại của nó hoặc là ít dùng đến nó :D.
### DRY your specs using RSpec's `shared_examples_for`
Có một điều mà mình nhận ra ở các dev ở công ty mình đó là các bạn ấy thường không chú trọng lắm đến vấn đề viết test cho dự án, trong khi nó đóng vai trò rất quan trọng trong việc maintain dự án, thường thì những đoạn spec mình đã đọc nó bị dài và khó hiểu. Cũng như việc viết code, rspec của bạn cũng cần được tổ chức một cách rõ ràng và dễ hiểu. Ở Rails, mọi người thường nhắc đến nguyên tắc DRY trong khi code và khi viết test cũng vậy, RSpec đã cung cấp cho chúng ta một công cụ gọi là `shared_examples_for` giúp cho chúng ta tránh lặp lại những đoạn test trùng nhau, làm cho các file rspec của chúng ta trông ngắn gọn và dễ follow hơn.
Đế sử dụng nó thì cực kì đơn giản, tất cả đều có trên google nhưng quan trọng là chúng ta có chịu tìm hiểu hay không mà thôi. Để có thể hiểu được chúng ta cùng tham khảo ví dụ sau. Giả sử trong ứng dụng của mình có 2 model đó là User và Project, cả 2 đều tồn tại các relation phục vụ cho chức năng follow. Việc liên kết các relation và thực hiện việc follow được viết trong module Followable.
```
# app/models/concerns/followable.rb
module Followable
  extend ActiveSupport::Concern

  included do
    has_many :followings, as: :followable, dependent: :destroy, class_name: 'Follow'
    has_many :followers, through: :followings, source: :user
  end

  def add_follower(user)
    followings.create(user: user)
  end
end

# app/models/user.rb
class User < ActiveRecord::Base
  include Followable
end

# app/models/project.rb
class Project < ActiveRecord::Base
  include Followable
end
```
Sử dụng Factory Bot để set up dữ liêu, Chúng ta sẽ có đoạn spec như ở dưới
```
# spec/models/user_spec.rb
require 'rails_helper'

describe User do
  let(:user) { create(:user) }

  describe '#add_follower' do
    it 'should add a new follower' do
      expect { user.add_follower }.
        to change { user.followers.count }.from(0).to(1)
    end
  end
end

# spec/models/user_spec.rb
describe Project do
  let(:project) { create(:project) }

  describe '#add_follower' do
    it 'should add a new follower' do
      expect { project.add_follower }.
        to change { project.followers.count }.from(0).to(1)
    end
  end
end
```
Khi viết code, thì module Followable giúp cho code chúng ta nhìn gọn hơn và tuân thủ theo nguyên tắc DRY. Cho nên việc viết test cũng vậy, chúng ta cần kết thục viết lại các đoạn test giống nhau, đều này rất hay xảy ra với các bạn new dev, mà ngay cả bản thân của mình cũng từng mắc phải, là cứ copy chỗ này bỏ vào chỗ khác như ở ví dụ trên, làm cho đoạn test của chúng ta dài loằng ngoằng :v: 
Vậy làm thế nào để tránh việc duplicate các đoạn test, cùng xem cách mà mình sử dụng thằng shared_examples_for để thực hiện việc đó nhé.
Chúng ta sẽ tạo một thư mục để viết những đoạn test có thể sử dụng lại. Có thể nói thằng này tương tự như một module trong Rails vậy thôi.
```
# spec/spec_helper.rb
Dir[Rails.root.join('spec/shared_examples/**/*.rb')].each { |f| require f }

# spec/shared_examples/followable.rb
shared_examples_for 'is_followable' do
  let(:resource) { create(described_class.name.underscore) }

  describe '#add_follower' do
    it 'should add a new follower' do
      expect { resource.add_follower }.
        to change { resource.followers.count }.from(0).to(1)
    end
  end
end
```
Để có thể sử dụng đọạn test trên, thì ở các file test rspec, chúng ta chỉ cần gọi tên chúng sau từ khóa it_behaves_like, là có thể gọi đến các đọạn test mà chúng ta đã viết ở trên để sử dụng lại :D, chả khác gì module cả phải không nào.
```
require 'rails_helper'

# spec/models/user_spec.rb
describe User do
  it_behaves_like 'is_followable'
end

# spec/models/project_spec.rb
describe Project do
  it_behaves_like 'is_followable'
end
```
Rất dễ phải không nào, các đoạn test của chúng ta bây giờ nhìn clear hơn và dễ dàng nhúng vào các đoạn spec khác có chức năng tương tự.
Ngoài từ it_behaves_like chúng ta có thể sử dụng it_should_behaves_like hoặc include_examples. Tuy nhiên giữa chúng có sự khác biệt như sau:
* `include_examples` - includes examples trong context hiện tại
* `it_behaves_like` và `it_should_behave_like` - include examples trong nested context.

Tùy vào trường hợp để sử dụng nó cho hiệu quả các bạn nhé.
### Writing Your Own RSpec Matchers
Kĩ thuật thứ hai mà mình muốn giới thiệu cho các bạn đó là định nghĩa một matcher trong RSpec cho riêng bạn. Mặc dù RSpec đã cung cấp cho chúng ta rất nhiều matcher rất tốt, tuy nhiên với mỗi dự án nhất định thì sẽ có nhiều yêu cầu riêng hoặc độ phức tạp về xử lí logic phải qua  nhiều bước, và việc sử dụng các matcher mặc định của RSpec có thể không đáp ứng được các yêu cầu của chúng ta. May mắn thay RSpec cho phép chúng ta có thể tự định nghĩa một matcher cho riêng mình.
Vậy làm cách nào để tự định nghĩa một matcher cho riêng mình, chúng ta cùng tham khảo một ví dụ đơn giản sau. Giả sử mình matcher khối lượng công việc mà mình mong muốn của một dự án thông qua hàm size. Thay vì phải viết `expect(project.size).to eq(5)` thì mình mong muốn viết theo ý của mình như sau `expect(project).to be_of_size(5)`.
Đầu tiên để viết một custom matcher, chúng ta sẽ đặt file chứa chúng vào folder `spec/support`, chúng sẽ được tự động import khi chúng ta bắt đầu chạy RSpec khi chúng ta settings việc autoload thư mục `spec/support` ở file rails_helper. Ở RSpec 3.1 đã tồn tại dòng config đó ở file rails_helper, chúng ta chỉ cần uncomment đi là nó sẽ tự động load các file ở thư mục support.
Tạo tập tin mới trong thư mục spec/support/ và đặt tên là size_matchers.rb hoặc bất cứ cái gì bạn muốn. Chúng ta sẽ sử dụng một metaprogramming ở đây để khai báo một custom matcher mới:
```
RSpec::Matchers.define *:be_of_size* do |expected|  
  match do |actual|
    actual.size == expected
  end
end
```
Việc định nghĩa bắt đầu với việc gọi RSpec::Matchers.define, truyền vào cho nó tên của matcher mà chúng ta muốn định nghĩa, và sau đó là một block code, block code này chứa một argument đó chính là giá trị mà chúng ta mong muốn, giá trị đó sẽ được truyền vào khi matcher được gọi, chúng ta có thể gọi đây là giá trị truyền cho matcher.
Trong block code thì method `match` lại gọi đến một block khác và truyền vào tham số actual, đây chính là tham số mà chúng ta truyền cho hàm expect. Trong block code sau hàm match này thì sẽ là chỗ xử lí logic để trả về kết quả là test case của chúng ta có pass hay không. Như ở ví dụ trên thì trong này sẽ xử lí xem size của dự án là actual.size có bằng với kết quả mà chúng ta mong muốn là expected hay không.
Để dễ hình dung thì mình sẽ tóm gọn cú pháp để sử dụng custom matcher trên như sau:
```
expect(actual_value).to be_of_size(expected_value)
```
Và bạn có thể sử dụng chúng trong các đoạn test của bạn như sau:
```
it ​"can calculate total size"​ ​do​
  expect(project).to be_of_size(10)
  expect(project).not_to be_of_size(5)
end
```
Tất nhiên ví dụ trên chỉ là một ví dụ đơn giản để giải thích cho các bạn hiểu mà thôi, còn trên thực tế các bạn có thể viết các đoạn xử lí logic phức tạp để test trong block code ở sau function match.
Ngoài ra, RSpec còn cho phép chúng ta định nghĩa các message description cho các matcher như sau:
```
RSpec::Matchers.define ​:be_of_size​ ​do​ |expected|
  match ​do​ |actual|
    actual.size == expected
  end
  
  description ​do​
    "have tasks totaling ​​#{​expected​}​​ points"​
  end
  
  failure_message ​do​ |actual|
    "expected project ​​#{​actual.name​}​​ to have size ​​#{​expected​}​​, was ​​#{​actual​}​​"​
  end
  
  failure_message_when_negated ​do​ |actual|
    "expected project ​​#{​actual.name​}​​ not to have size ​​#{​expected​}​​, but it did"​
  end
end
```
Việc thêm description này sẽ làm cho việc mô tả spec có ý nghĩa và dễ hiểu hơn.
### Kết luận
Như vậy mình vừa giới thiệu qua cho các bạn các 2 kĩ thuật để giúp cho việc viết test của bạn clear và dễ hiểu hơn, có thể xử lí những đoạn test khó mà RSpec không thể xử lí được.
Tuy nhiên việc sử dụng nó cũng cần phải đúng lúc đúng chỗ. Ngoài ra chúng ta có thể tìm hiểu thêm về các kỹ thuật TDD thông qua việc đọc sách và tham khảo trên mạng. Nó sẽ giúp ích rấ nhiều về lối tư duy cũng như việc code dễ dàng hơn.
Các kĩ thuật trên mình đều học được từ cuốn [Rails 5 Test Prescriptions](https://www.safaribooksonline.com/library/view/rails-5-test/9781680505566/), trong cuốn này có rất nhiều kỹ thuật hay và các lưu ý quan trọng giúp cho các bạn viết test tốt hơn.