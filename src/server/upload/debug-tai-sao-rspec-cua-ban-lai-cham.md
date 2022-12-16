Khi dự án của bạn đã trải qua một khoảng thời gian kha khá, số lượng test suite khá nhiều thì không có gì lạ khi thời gian chạy toàn bộ unit test của dự án tuơng đối lâu, vài chục phút không phải là hiếm gặp, cá biệt có khi nên tới cả tiếng đồng hồ. Nhưng số lượng test suit chưa hẳn là nguyên nhân chính dẫn đến việc đó, đôi khi với những test suite đơn giản thì thời gian chạy cũng làm bạn ngạc nhiên.

Ví dụ, ta có file spec như sau:

```ruby
# spec/models/user_spec.rb

describe "associations" do
  subject(:user) { User.new }

  it { should have_many(:orders) }
  # 12 additional association specs
end
```
![](https://images.viblo.asia/59f2b9e0-fa09-4a29-8396-499bdd26d712.png)
Hơn 3s cho những thông số chưa cần phát sinh query vào database. Vậy chúng ta hãy tìm hiểu xem taị sao lại vậy.

### Xác định nguyên nhân chậm trong file spec_helper

```ruby
# spec/spec_helper.rb`

RSpec.configure do |config|
  # > 300 dòng config và một loạt block before, after
end
```

Một file spec_helper cực lớn sẽ là một nguyên nhâm tiềm tàng. Để kiểm tra chúng ta hãy thử comment chúng và chạy lại.
![](https://images.viblo.asia/5968ffac-a6bc-422a-b6ca-9c690cad6487.png)
Mọi thứ hoàn toàn khác so với ban đầu. Và bạn hãy bỏ comment và tìm xem đâu là thủ phạm.

 - Thủ phạm 1:
 	```ruby
		# spec/spec_helper.rb

		config.before(:each) do
		  stub_something
		end
	```
	
	Block before này chỉ cần thiết với một số test suit nhất định, nhưng nó đang được chạy ở tất cảc test suite. Hãy kiểm tra lại logic và chạy nó ở những feature cần thiết.
	Ví dụ như sau:
	
	```ruby
		# spec/spec_helper.rb

		config.before(:each, type: :feature) do
		  stub_something
		end
	```
	
	Như vậy đã có vẻ khá tốt rồi nhưng logic trên vẫn được gọi tại một số thời điểm mà không cần thiết. Ta có thể tách biệt nó bằng các sử dụng metadata do user định nghĩa.
	
	```ruby
		# spec/spec_helper.rb

		config.before(:each, :stub_something) do
			stub_something
		end
	```

	```ruby
		# spec/features/user_does_something_spec.rb

		scenario "user does something", :stub_something do
			# spec logic
		end
	```
	
- Thủ phạm 2
	```ruby
		# spec/spec_helper.rb

		config.before(:each) do |example|
		  DatabaseCleaner.strategy = :truncation
		end
	```
	Sau mỗi test suite, Rspec có thể dùng một chiến lược để "thiết lập lại" cơ sở dữ liệu. Và chúng ta đang dùng 1 chiến lược chậm hơn khi so với transaction (https://github.com/DatabaseCleaner/database_cleaner#what-strategy-is-fastest). Nếu bạn vẫn muốn sử dụng nó thì hãy áp dụng cách fix như trên. 
	```ruby
		# spec/spec_helper.rb

		config.before(:each, :clean_database_with_truncation) do |example|
		  DatabaseCleaner.strategy = :truncation
		end
	```
	
### Xác định nguyên nhân chậm trong việc setup Spec.

Sử dụng flag profile của Rspec, chúng ta có thể xác định được những spec chậm nhất trong file.

```ruby
	rspec spec/models/user_spec.rb --profile 5
```
![](https://images.viblo.asia/016f9ea9-6843-4721-979e-3a934f477814.png)
Hãy kiểm tra spec chậm nhất:

```ruby
	# spec/models/user_spec.rb

	it "does something" do
	  user = FactoryGirl.create(:user)

	  # exercise on user

	  # expectation on user
	end
```

Sau comment mọi thứ ngoại trừ dòng FactoryGirl, tốc độ chạy gần như không thay đổi, vậy vấn đề nằm ở dòng FactoryGirl. Chúng ta cần kiểm tra xem FactoryGirl.create có thật sự cần thiết (Sự thật là phần lớn các test ko cần persit dữ liệu database) nếu không chúng ta có thể sử dụng build_stubbed. Tiếp đến chúng ta hay xem qua factory file xem có thể tối ưu được không.

```ruby
# spec/factories/user_factory.rb

FactoryGirl.define do
  factory :user do

  # more code

  after(:create) do |user|
    create(:billing_profile, user: user)
  end
end
```

FactoryGirl thiết lập mối quan hệ giữa các object mà không cần thiết phải khai báo trong test setup. Bạn có thể fix vấn đề này bằng cách chuyển association vào trong FactoryGirl trait và chạy lại test của bạn.

```ruby
# spec/factories/user_factory.rb

FactoryGirl.define do
  factory :user do

  # more code

  trait :with_billing_profile do
    after(:create) do |user|
      create(:billing_profile, user: user)
    end
  end
end
```
![](https://images.viblo.asia/34610579-2d5e-49fe-b1f3-644e37d6123d.png)
Tốc độ đã được cải thiện nhưng chúng ta vẫn chưa thể kết thúc. Chúng ta vẫn chạy toàn bộ test với việc add thêm billing_profile.

### Phòng tránh việc tương lai tốc độ lại bị chậm.

Dự án tiếp tự phát triển và mỗi lo ngại về việc các record không cần thiết được tạo ra trong tương lai là hoàn toàn có cơ sở. Sử dung tài liệu sau ( https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md#activesupport-instrumentation) chúng ta có thể thêm logic như sau để tăng khả năng hiển thị trong các trường hợp cần thiết.

```ruby
# spec/spec_helper.rb

config.before(:each, :monitor_database_record_creation) do |example|
  ActiveSupport::Notifications.subscribe("factory_girl.run_factory") do |name, start, finish, id, payload|
    $stderr.puts "FactoryGirl: #{payload[:strategy]}(:#{payload[:name]})"
  end
end
```
![](https://images.viblo.asia/a8a6b54a-46a9-4105-a185-552ef0e3e240.png)
Khi chạy rspec với metadata :monitor_database_record_creation cho phép chúng ta xác minh xem số lượng bản ghi được tạo bởi test có phù hợp với mong đợi hay không.

Chúng ta có thể 1 unit test tạo ra 13 bản ghi khi setup test và khi thực thi test chỉ tạo ra 4 bản ghi. Chúng ta cần loại bỏ để tránh gặp lại vấn đề trong tương lai.!

### Tài liệu tham khảo
1. https://robots.thoughtbot.com/debugging-why-your-specs-have-slowed-down