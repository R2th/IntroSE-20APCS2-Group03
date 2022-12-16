Viết test là một phần rất quan trọng trong các dự án để đảm bảo chất lượng của các đoạn code của bạn. Với các dự án nhỏ số lượng test không lớn thì tốc độ cả mỗi test không phải vấn đề gì lớn. Tuy nhiên đối với các dự án lớn thì tốc độ của rspec ảnh hưởng rất nhiều đến dự án. Trong quá trình phát triển lượng code tăng lên đồng nghĩa với lượng test cũng tăng lên. Do vậy dự án lượng lượng test sẽ rất nhiều kéo theo đó thời gian chạy rspec cũng tăng lên đáng kể. Liệu bạn có thể đợi một giờ hoặc hơn thế nữa chỉ để chạy rspec trong khi ta có thể tối ưu để nó chạy nhanh hơn?

Dưới đây tôi xin đưa ra một số mẹo giúp tăng tốc rspec

#### 1. Tránh tạo dữ liệu trong db nhiều nhất có thể

Đa số các unit test ta có thể tạo ra object để test không nhất thiết phải tạo nó trong database

Ta có thể lấy một ví dụ sau
```ruby
class User < ActiveRecord::Base
  def full_name
    "#{first_name} #{last_name}"
  end
end
```

Ta viết rspec cho ví dụ trên như sau
```ruby
describe User do
  describe "#full_name" do
    let(:user) do
      FactoryGirl.create :user, first_name: "first_name",
        last_name: "last_name"
    end

    it{expect(user.full_name).to eq "first_name last_name"}
  end
end
```
Ta chạy thử rspec thì được kết quả sau
```
Finished in 2.57 seconds (files took 3.9 seconds to load)
1 example, 0 failures
```

Thay vì tạo ra một bản ghi trong db ta sửa lại thành chỉ build ra đối tượng như thế tốc độ sẽ cải thiện đáng kể bởi vì nó ko phải tương tác với database.

```ruby
describe User do
  describe "#full_name" do
    let(:user) do
      FactoryGirl.build :user, first_name: "first_name",
        last_name: "last_name"
    end

    it{expect(user.full_name).to eq "first_name last_name"}
  end
end
```
Sau khi sửa thì kết quả chạy rspec như sau
```
Finished in 2.3 seconds (files took 3.32 seconds to load)
1 example, 0 failures
```
Ta thấy với một test độ chênh lệch khoảng 0.3 giây, không lớn lắm. Tuy nhiên đây là trong trường hợp chạy một test riêng biệt kết quả sẽ chênh lệch khác nhiều trong các lần chạy khác nhau. Để kết quả chính xác hơn tôi sẽ tính tổng thời gian chạy 50 test case này
```
50.times{it{expect(user.full_name).to eq "first_name last_name"}}
```
Sau khi chạy ta được kết quả như sau
```
# create user
Finished in 9.08 seconds (files took 3.32 seconds to load)
50 examples, 0 failures

# build user
Finished in 3.19 seconds (files took 3.39 seconds to load)
50 examples, 0 failures
```
Qua ví dụ trên ta thấy có sự chênh lệch khá lớn. Trong trường hợp này với cùng một test case nếu bạn tạo dữ liệu trong db làm cho tốc độ bị chậm đi khoảng 2.8 lần (gần 3 lần)

#### 2. Build object trực tiếp thông không dùng đến FactoryGirl (FactoryBot)
Ở phần trên ta thấy việc không tạo dữ liệu trong database đã làm tăng tốc độ cho rspec một cách đang kể. Tuy nhiên liệu dùng FactoryGirl.build liệu đã tốt? FactoryGirl rất tiện lợi giúp bạn build ra một object đầy đủ các thuộc tính. Tuy nhiên một số trường hợp ta cũng không cần phải build ra các thuộc tính thừa không cần thiết, ta có thể bỏ qua không dùng FactoryGirl trong các trường hợp này cũng là một giải pháp giúp tăng tốc rspec khá hiệu quả

Ta sửa lại rspec như sau
```ruby
describe User do
  describe "#full_name" do
    let(:user) do
      User.new :user, first_name: "first_name",
        last_name: "last_name"
    end

    it{expect(user.full_name).to eq "first_name last_name"}
  end
end
```

chạy thử với 50 lần ta được một kết quả cũng khá tốt (2.14 giây so với 3.19 giây của FactoryGirl.build và 9.08 giây với FactoryGirl.create)
```
Finished in 2.14 seconds (files took 3.41 seconds to load)
50 examples, 0 failures
```

#### 3. [Nên sử dụng `let` thay cho `let!`](https://relishapp.com/rspec/rspec-core/v/2-5/docs/helper-methods/let-and-let)
Sử dụng `let` định nghĩa một method. Giá trị trả về của method này được cache lại cho các lần gọi khác nhau trong cùng một example nhưng đến example khác nó sẽ được khởi tạo lại. Có một điểm chú ý `let` là `lazy-evaluated` nó chỉ chạy khi phương thức do `let` định nghĩa được gọi.

Còn `let!` thì khác một chút nó định nghĩa một method đồng thời gọi method đó luôn.

Do vậy khi dùng `let!` với một số test không cần sử dụng đến dữ liệu này mà nó vẫn chạy sẽ làm rspec của bạn chạy chậm hơn

#### 4. Sử dụng before all

Với before(:each) (before) mỗi một test thì nó đều chạy lại một lần. Trong một số trường hợp để tránh chạy đi chạy lại nhằm tăng tốc cho rspec ta có thể dùng before(:all). Ta lấy một ví dụ dưới đây

```ruby
class Thing
  def widgets
    @widgets ||= []
  end
end

describe Thing do
  before(:all) do
    @thing = Thing.new
  end

  describe "initialized in before(:all)" do
    it "has 0 widgets" do
      @thing.should have(0).widgets
    end

    it "can get accept new widgets" do
      @thing.widgets << Object.new
    end

    it "shares state across examples" do
      @thing.should have(1).widgets
    end
  end
end
```

Trong ví dụ trên `@thing` sẽ chỉ được khởi tạo một lần khi chạy qua cả 3 lần test. Đây là một ví dụ đơn giản với một số trường hợp phức tạp xử lí nhiều mà phải lặp đi lặp lại cũng khá mất thời gian.

#### 5. [Sử dụng mock và stubs](https://viblo.asia/p/rspec-mocks-ogBG29q5MxnL)

Trong một số trường hợp để test một method A trong nội dung method A lại gọi đến method B. Việc test hoàn chỉnh method A với cả phần kết quả trả về của method B là khó và việc khởi tạo dữ liệu trong trường hợp này cũng rất phức tạp và tốn thời gian. Thay vì vậy ta có thể stubs lại method B cho nó trả về một giá trị nào đó rồi test method A dựa trên giá trị đã cho ở trên. Như vậy việc test cũng đơn giản hơn nhiều và lượng dữ liệu khởi tạo cũng không quá lớn.

#### 6. Không tự động build ra các associations không cần thiết
Việc tạo kèm các associations là khá mất thời gian hơn nữa một vài trường hợp sẽ tạo ra một dãy các quan hệ phụ thuộc trong khi test của bạn không cần thiết phải tạo ra đầy đủ hết dữ liệu như vậy
```
factory :authorization
  user { create :user }
end
```
Trong ví dụ trên một số trường hợp authorization không cần thiết phải tạo ra user thì ta không nên tạo user kèm với authorization. Ta có thể sửa lại như sau
```
factory :authorization
  trait :with_user do
    user { create :user }
  end
end
```
Khi nào cần tạo ra `authorization` có user ta sẽ gọi `build :authorization, :with_user`