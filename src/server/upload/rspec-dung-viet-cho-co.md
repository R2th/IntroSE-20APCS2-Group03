Có lẽ chủ đề về Unit test nói chung và Rspec nói riêng đã quá phổ biến trên Google. Chỉ cần gõ 2 từ khóa này bạn đã có vô số bài viết để đọc và học hỏi.

Trong bài viết này, mình xin chia sẽ một chút tâm sự mỏng về Unit test sử dụng Rspec, nên xin phép được dùng Rspec thay thế cho Unit test luôn.

Bản thân mình lúc mới học ROR theo cuốn [Ruby on Rails Tutorial](https://www.railstutorial.org/book) từng nghĩ rằng: viết unit test để làm gì, mặc dù cũng có Google đọc các thể loại chân kinh của các vị tiền bối để lại, nhưng có vẻ đạo hạnh không cao nên không thể giác ngộ. Và tất nhiên, những phần hướng dẫn unit test trong cuốn tutorial này đều được mình bỏ qua mà không một chút ngó ngàng.

Đến với project đầu đời, khi rspec là bắt buộc, mình cảm thấy khá là tốn thời gian cho việc viết rspec này, thực sự lúc đó vẫn chưa biết nó hữu ích chỗ nào. 

Ruby có một cái gem là `gem "simplecov"`, chỉ cần cài nó lên, nó sẽ hỗ trợ tính toán cho bạn những dòng code nào đã được cover test, những dòng nào chưa. Lúc đó với mục tiêu cover code thật là dễ dàng để bạn đạt phần trăm cover cao khi chỉ cần test vài trường hợp là nó đã cover được 100% file muốn unit test.

Nghĩ lại thấy thật là hổ thẹn!

### Vậy thì bạn bỏ thời gian viết Rspec tốt nó có lợi gì? 

Câu hỏi kinh điển này có rất nhiều câu trả lời trên Google, có lẽ ai cũng đã từng đọc. Tuy nhiên đọc là một chuyện, khi bạn làm dự án thực tế ngộ đạo và bỏ thời gian cho nó lại là một chuyện. Mình xin mạo muội đưa ra một số điểm lợi mà bản thân mình thấy:

- Đầu tiên dễ thấy nhất đó là bạn có một evindence làm hài lòng sếp, hài lòng khách hàng rằng Unit test của tôi cover được xx% code 
- Khi bạn viết Rspec tốt, một người mới join dự án họ có thể biết được cái function bạn viết nhằm mục đích gì, có bao nhiêu trường hợp xảy ra với function đó. Hay thậm chí chính là bạn khi đọc lại đống code của mình viết từ mấy tháng trước.
- Cái function bạn viết thì càng ngày càng phình to ra, tốc độ thì ì ạch. Một ngày đẹp trời, bạn được yêu cầu refactor lại function đó. Code xong xuôi hết, giờ lấy cơ sở nào để đảm bảo nó chạy đúng đây. Test từng trường hợp, bạn cũng không thể chắc chắn là có bao nhiêu trường hợp xảy ra và ước rằng lúc trước mình viết Rspec cover đủ trường hợp và giờ chỉ cần chạy 1 lệnh để check mà không cần phải lo lắng.

Lợi ích thì chắc là còn nhiều, nhưng mình xin phép dừng lại ở 3 điểm trên mà mình cảm thấy tâm đắc, giúp mình hồi tâm chuyển ý coi trọng Rspec.

### Viết Rspec như thế nào cho tốt?

Tiếp tục là một câu hỏi kinh điển trong lĩnh vực Unit test, mà cụ thể là với Rspec. Và tất nhiên, với Google bạn sẽ có rất nhiều đáp số.

Trước khi chém gió phần này, mình xin khẳng định mình viết Rspec chưa được tốt, và đang dần cải thiện mà thôi. Xin được liệt kê một số quan điểm cá nhân:

- Hãy mô tả nội dung bạn định test **ngắn gọn nhất** và **dễ hiểu nhất** bằng **describe** và **context**, cũng có nghĩa rằng tránh mô tả trong **it**, làm sao chỉ cần it expect là người đọc sẽ hiểu bạn muốn gì

```ruby
# Bad
describe "check user is admin" do
end

it "have status 200 if logged in" do
  expect(response).to respond_with 200
end

# Good
describe "#admin?" do
end

context "when user logged in" do
  it {expect(response).to respond_with 200}
end
```

- Một **it** chỉ nên kỳ vọng một kết quả, đừng bắt cá 2 tay :D

```ruby
# Bad
it do
  expect(response).to respond_with 200
  expect(response.body).to eq expected_results
end

# Good
it {expect(response).to respond_with 200}
it {expect(response.body).to eq expected_results}
```

- Sử dụng **let** thay vì tạo object trong before
- Không tạo dữ liệu thừa, cần gì thì tạo cái đó thôi
- Sử dụng **stub/mock**. Có một số case bạn sẽ không thể tác động được, ví dụ như Xóa record mà bị fail, bị dính exception trong quá trình lưu vào DB, dữ liệu từ một HTTP requests, ... Những lúc này hãy dùng stub hoặc mock

```ruby
# stub requests
let(:url) {"http://host.com/api/v1/"}
before {stub_request(:get, url).to_return(status: 200, body: expected_results}

# Mock expected results
before {allow_any_instance_of(User).to receive(:destroy).and_return false}
```

- Điều quan trọng: **Test tất cả những case mà bạn thấy được**. Chính điều này sẽ giúp bạn thấy được những lợi ích mà mình đã liệt kê ở trên

Ví dụ bạn có một đoạn code đơn giản giả định như sau:

```ruby
class CommentsController < ApplicationController
  before_action :auth_user, :load_post
  
  def create
    comment = current_user.comments.new comment_params.merge post_id: @post.id
    if comment.save
      # Do something
    else
      # Do something
    end
  end
 
  private
  def load_post
    # Find @post by ID
  end
end
```

Bạn sẽ viết bao nhiều test case cho đoạn code này? 

Nếu là một người đơn giản, chỉ cần viết 2 trường hợp save success và save fail, bật file thống kê coverage lên bạn sẽ nhận được con số 100%.

Tuy nhiên, hãy cố gắng test tất cả những case mà mình thấy được nhé: user chưa login, không tìm thấy @post, những trường hợp validate dữ liệu đặc biệt, .... Với những function càng phức tạp, bỏ thời gian cho việc này sẽ cho bạn nhiều cái lợi lắm đấy, trust me.

### Kết

Bài viết mang tính chất chém gió và hẳn các bạn cũng đã đọc qua hoặc sẽ được đọc qua những ý mình đã nêu trên. 

Tuy nhiên đọc là một chuyện, và thực tế nó sẽ là một chuyện. Mình dám cá các bạn ai cũng từng như mình xem nhẹ Rspec, viết cho có lệ.

Đừng viết Rspec cho có, hãy bỏ thời gian cho nó, bạn sẽ nhận lại được rất nhiều thứ sau này.

Thank for your reading!