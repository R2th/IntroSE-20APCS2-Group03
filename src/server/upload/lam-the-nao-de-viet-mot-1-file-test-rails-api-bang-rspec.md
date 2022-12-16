Hôm nay, tôi sẽ chia sẻ với các bạn một vài cách để viết test cho GET, POST, PUT và DELETE routes trong RESTful Ruby on Rails API.

## Gems
Để chạy test, xử lý dữ liệu và dọn dẹp database sau khi test, chúng ta có thể sử dụng một vài gems được thiết kế cho những mục đích này.
Đầu tiên, hãy thêm những gems sau vào gemfile và chạy bundle trên terminal

```ruby
group :development, :test do
  gem 'rspec-rails', '~> 3.6'
  gem 'faker'
  gem 'factory_bot_rails'
  gem 'database_cleaner'
end
```

## File và Folder
Ruby on Rails sẽ tạo sẵn 1 folder test theo mặc định. Trong trường hợp bạn muốn sử dụng gem cho việc viết Rspec, bạn cần loại bỏ những folder này và tự khởi tạo 1 đường dẫn rspec khác thông qua terminal. Dòng lệnh sau sẽ giúp bạn thực hiện điều này:

`rails generate rspec:install`

Một folder spec sẽ được tạo ra trong project của bạn với 2 file mặc định ban đầu là rails_helper.rb và spec_helper.rb.

Rspec sẽ reset hoặc clean database sau mỗi lần chạy một phương thức test. Tuy nhiên, trong một vài trường hợp, chúng ta cần giữ lại data nhưng Rspec lại không có cơ chế để thực hiện điều này. Một trong những giải pháp cho vấn đề này là sử dụng *database-cleaner* gem nhằm mục đích đảm bảo rằng không một dữ liệu test nào của chúng ta bị đè lên nhau và dẫn đến kết quả sai trong quá trình test.

Bên trong file *spec/railshelper.rb*, thay đổi dòng sau:

`config.use_transactional_fixtures = true`

thành:

`config.use_transactional_fixtures = false`

Ở ngay dưới dòng này, chúng ta sẽ cấu hình cho database-cleaner:

```ruby
config.use_transactional_fixtures = false

config.before(:suite) do
  DatabaseCleaner.clean_with(:truncation)
end

config.before(:each) do
  DatabaseCleaner.strategy = :transaction
end

config.before(:each, :js => true) do
  DatabaseCleaner.strategy = :truncation
end

config.before(:each) do
  DatabaseCleaner.start
end

config.after(:each) do
  DatabaseCleaner.clean
end

config.before(:all) do
  DatabaseCleaner.start
end

config.after(:all) do
  DatabaseCleaner.clean
end
```
## Cài đặt Factory
Sau khi thực hiện xong những bước trên, chúng ta có thể bắt tay vào việc cài đặt một factory file chứa những method tự động tạo những dữ liệu giả cho quá trình test. Tạo một file trong folder spec và đặt tên nó là *factories.rb*.

Bên trong file *facetories.rb*, chúng ta thêm những dòng code sau để tạo ra những câu hỏi giả ngẫu nhiên cho database.

```ruby
FactoryBot.define do
  service_array = ["Test Service", "Test Service Two"]
  letter = ["a", "b", "c", "d"]
  
  factory :random_question, class: Question do
    question { Faker::Lorem.question }
    answer { Faker::Lorem.sentence }
    service { service_array.sample }
    number { Faker::Number.between(1, 2) }
    letter { letter.sample }
  end
end
```

Ở đây, chúng ta sử dụng thư viện gem *Faker* để tạo ra những giữ liệu giả ban đầu.  Ngoài ra, chúng ta còn tạo ra 1 *random_question* với question, answer được tạo ngẫn nhiên bằng *Faker::Lorem*, một number ngẫu nhiên từ 1 đến 2 bằng *Faker::Number*, một sample mẫu từ *service_array* và một letter từ *letter.sample*

## Tests
Cuối cùng, chúng ta tạo một folder bên trong spec folder, đây sẽ là nơi chúng ta tạo những file tests và thực thi nó.

Giả sử chúng ta sẽ tạo 1 file test để lấy tất cả câu hỏi và đặt tên nó là *get_questions_spec.rb*. Lưu ý phải thêm *spec.rb* vào cuối tên file để Rspec có thể tìm và thực thi nó như một file test bình thường.

Bên trong file, thêm những dòng sau:

```ruby
require 'rails_helper'

describe "get all questions route", :type => :request do
  let!(:questions) {FactoryBot.create_list(:random_question, 20)}
  
  before {get '/api/v1/questions'}
  
  it 'returns all questions' do
    expect(JSON.parse(response.body).size).to eq(20)
  end
  
  it 'returns status code 200' do
    expect(response).to have_http_status(:success)
  end
end
```

Hãy cùng xem chúng ta đã làm gì. Đầu tiên, chúng ta đã tạo 20 câu hỏi ngẫu nhiên trong database bằng cách sử dụng FactoryBot. Sau đó, chúng ta viết 2 test case để kiểm tra số lượng kết quả câu hỏi API trả về và status của nó.  Ở đây chúng ta mong rằng API sẽ trả về 20 kết quả ứng với 20 câu hỏi đã được tạo ra ở trên và status code là 200.

Tiếp theo, hãy tạo 1 file *post_question_spec.rb* để kiểm tra method POST.

```ruby
require 'rails_helper'
describe "post a question route", :type => :request do
  before do
    post '/api/v1/questions', params: { :question => 'test_question', :answer =>         'test_answer', :service => 'test_service', :number => 2, :letter => 'a' }
  end
  
  it 'returns the question' do
    expect(JSON.parse(response.body)['question']).to eq('test_question')
  end
  
  it 'returns the question\'s answer' do
    expect(JSON.parse(response.body)['answer']).to eq('test_answer')
  end
  
  it 'returns the question\'s service' do
    expect(JSON.parse(response.body)['service']).to eq('test_service')
  end
  
  it 'returns the question\'s letter' do
    expect(JSON.parse(response.body)['letter']).to eq('a')
  end
  
  it 'returns the question\'s number' do
    expect(JSON.parse(response.body)['number']).to eq(2)
  end
  
  it 'returns a created status' do
    expect(response).to have_http_status(:created)
  end
end
```
Ở đây chúng ta đã thực hiện gọi 1 API để tạo 1 question mới với những dự liệu mẫu cho trước và kiểm tra xem những giá trị trả về có khớp với nội dung chúng ta tạo ra không.

Tiếp theo, hãy đến với method UPDATE bằng cách tạo 1 file *put_question_spec.rb*.

```ruby
require 'rails_helper'

describe "PUT /api/v1/questions/:id" do
  before(:each) do
    @question = create(:random_question)
  end
  
  it 'updates a question' do
    @new_question = Faker::Lorem.question
    @new_answer = Faker::Lorem.sentence
    
    put "/@question.id">api/v1/questions/#{@question.id}", params: {question:  @new_question, answer: @new_answer}
    
   expect(response.status).to eq(202)
   expect(Question.find(@question.id).question).to eq(@new_question)
   expect(Question.find(@question.id).answer).to eq(@new_answer)
  end
end
```
Trong trường hợp này, chúng ta đã tạo 1 câu hỏi ngẫu nhiên trước và sau đó gọi PUT request, gửi lên những params cho trước và kiểm tra xem kết quả trả về có được cập nhật hay không.

Cuối cùng, hãy cùng thử delete 1 câu hỏi. Tạo file *delete_question_spec.rb* và thêm những dòng sau:

```ruby
require 'rails_helper'

describe "delete question route" do
  before(:each) do
    @question_one = create(:random_question)
    @question_two = create(:random_question)
  end
  
  it 'should delete the question' do
    get "/api/v1/questions"
    expect(response.status).to eq(200)
    expect(JSON.parse(response.body)).to eq([YAML.load(@question_one.to_json),YAML.load(@question_two.to_json),])
    delete "/api/v1/questions/#{@question_one.id}"
    expect(response.status).to eq(204)
    get "/api/v1/questions"
    expect(JSON.parse(response.body)).to eq([YAML.load(@question_two.to_json)])
  end
end
```

Giống như những routes khác, đầu tiên chúng ta tạo 2 câu hỏi ngẫu nhiên bằng FactoryBot. Sau đó, chúng ta gọi 1 API request để xóa câu hỏi đầu tiên rồi gọi 1 GET request để kiểm tra những kết quả còn lại. Trong trường hợp này, chúng ta mong muốn kết quả trả về sẽ chỉ có câu hỏi thứ 2 vì câu hỏi thứ nhất đã bị xóa trước đó.

Trên đây là những chia sẻ khi bạn muốn thực hiện test 1 API sử dụng Rspec.

Cảm ơn bạn đã đọc bài viết của mình. Xin chào và hẹn gặp lại trong những bài viết sau.