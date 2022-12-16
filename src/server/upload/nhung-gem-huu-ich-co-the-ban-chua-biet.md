## **1. Brakeman**

**a. Mục đích**

Brakeman là 1 gem như 1 máy quét có thể tìm ra và nhận dạng những tổn hại có thể gây ra trong Rails application. Ngoài ra bạn có thể tùy chỉnh danh sách những cảnh báo để không phải nhận những thông báo không cần thiết.

**b. Cài đặt**

Bạn có thể cài đặt dễ dàng bằng cách sử dụng RubyGems

`gem install brakeman`

**c. Sử dụng**

- Để xem các tùy chọn, ta sử dụng lệnh: 

`brakeman --help`

- Để đưa ra 1 hoặc nhiều output file cho kết quả: 

`brakeman -o output_file`

`brakeman -o output.html -o output.json`

- Để xem thông tin tất cả các debug: 

`brakeman -o output_file`

- Để so sánh kết quả các lần scan trước: 

`brakeman --compare old_report.json`




## **2. Kaminari**

**a. Mục đích**

Kaminari là 1 gem cho chức năng phân trang 1 cách mạnh mẽ, rõ ràng, chi tiết. Mục tiêu để xử lý các ActiveRecord query

**b. Cài đặt**

Để cài đặt, bạn chỉ cần thêm vào gemfile

`gem 'kaminari'`

sau đó: 

`bundle install`

**c. Ví dụ**

- Để phân 7 trang của User(mặc định 25 bản ghi mỗi trang), ta sử dụng: 

`User.page(7)`

(lưu ý: việc phân trang bắt đầu từ trang 1)

- Bạn có thể lấy được các thuộc tính trang bằng việc sử dụng các phương thức sau: 

```
User.count                     #=> 1000
User.page(1).limit_value       #=> 20
User.page(1).total_pages       #=> 50
User.page(1).current_page      #=> 1
User.page(1).next_page         #=> 2
User.page(2).prev_page         #=> 1
User.page(1).first_page?       #=> true
User.page(50).last_page?       #=> true
User.page(100).out_of_range?   #=> true
```

- Để hiện nhiều hơn user mỗi trang: 

`User.page(7).per(50)`

Link: https://github.com/kaminari/kaminari


## **3. Rubocop**

**a. Mục đích**

Rubocop là 1 gem phân tích code. Nó kiểm tra và đảm bảo code của bạn theo Ruby Style Guide. Nó sẽ thông báo ngay trên command line và đảm bảo không bỏ sót bất kì một vi phạm nào. 1 vài lập trình viên sẽ có thể cảm thấy nó rất phiền phức, tuy nhiên bạn có thể tùy chỉnh để nó chỉ hiện những gợi ý bạn muốn. Và 1 điều tuyệt vời hơn nữa là Rubocop tự động fix những lỗi xuống dòng, cú pháp,...

**b. Cài đặt**

Thêm vào Gemfile: 

`$ gem install rubocop`

sau đó chạy lệnh: 

`bundle install `

**c. Sử dụng**

Bạn chỉ cần chạy Rubocop trong project folder, còn lại nó sẽ tự làm: 

```
$ cd my/cool/ruby/project
$ rubocop
```





## **4. Act as taggable on**

**a. Mục đích**

Để phân loại, cấu trúc dữ liệu trên blog, website hay mạng xã hội, bạn có thể cần thêm tag. Act as taggable on là 1 gem cho phép bạn gắn thẻ các đối tượng  theo 1 vài thuộc tính phụ thuộc vào nội dung của application.

**b. Cài đặt**

Để cài đặt, bạn thêm vào Gemfile: 

`gem 'acts-as-taggable-on', '~> 4.0'`

sau đó: 

`bundle install`

**c. Ví dụ**

- Cài đặt: 

```
class User < ActiveRecord::Base
  acts_as_taggable # Alias for acts_as_taggable_on :tags
  acts_as_taggable_on :skills, :interests
end

class UsersController < ApplicationController
  def user_params
    params.require(:user).permit(:name, :tag_list) ## Rails 4 strong params usage
  end
end

@user = User.new(:name => "Bobby")
```

- Thêm hoặc xóa 1 single tag: 

```
@user.tag_list.add("awesome")   # add a single tag. alias for <<
@user.tag_list.remove("awesome") # remove a single tag
```

- Thêm và xóa mutilple tags

```
@user.tag_list.add("awesome", "slick")
@user.tag_list.remove("awesome", "slick")
```

Link: https://github.com/mbleigh/acts-as-taggable-on


## **5. Deep cloneable**

**a. Mục đích**

Nếu bạn muốn tạo 1 bản sao của Active Record object và các quan hệ của nó, deep cloneable sẽ giúp được bạn. Nó thêm các phương thức vào đối tượng để sao chép chính bản thân nó. Deep cloneable cho bạn 1 bản sao chính xác và hoàn chỉnh mà không tốn nhiều công sức.

**b. Cài đặt**

Thêm deep_cloneable vào Gemfile: 

`gem 'deep_cloneable', '~> 2.3.2'`

sau đó: 

`bundle install`



Link: https://github.com/moiristo/deep_cloneable














Source: https://rubygarage.org/blog/best-ruby-gems-we-use