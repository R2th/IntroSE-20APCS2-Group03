Đối với một developer thì việc viết function test là một điều không hề xa lạ, nhưng chúng ta đang chỉ dừng lại ở một mức độ còn rất nhỏ. Nó đơn giản chỉ là rspec hay unit test cho những function nhỏ trong đó, rất ít người viết acceptance test cho ứng dụng của mình. Có rất nhiều nguyên nhân khiến chung ra không nghĩ đến việc đó: effort, thời gian, ... Nhưng chúng ta thử nghĩ nếu như chỉ cần có integration test đơn giản như 1 follow gắn kết những function mình đã làm nó có thể giúp ích rất nhiều. Ít nhất khi bạn sửa 1 function nào đó cũng đảm bảo được follow cơ bản của một màn hình luôn chạy ổn định. Dưới đây sẽ giới thiệu bạn làm follow cơ bản cho một quá trình acceptance test sử dụng [Capybara](https://github.com/teamcapybara/capybara) và [Rspec](https://github.com/rspec/rspec-rails) Với việc live testing có nghĩa là nó sẽ auto bật trình duyệt lên bạn có thể nhìn một các sinh động trên trình duyệt.

#### Cài đặt
Để sử dụng chúng thì bước đầu tiên chính là cài đặt.
- Đối với Rails mới đây khi tạo ra thì đã auto add 2 gem hỗ trợ acceptance test là 
 ```bash
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
 ```
Chúng ta sẽ cài đặt thêm `chromedriver-helper` để dùng cho chrome như driver cho selenium.

 ```bash
gem "chromedriver-helper"
```
Sau khi cài đặt xong [chromedriver-helper](https://github.com/flavorjones/chromedriver-helper) chúng ta sẽ dùng được 2 lệnh `chromedriver-helper` và `chromedriver-update`. `chromedriver-helper` dùng cho việc cài đặt mới và `chromedriver-update` nếu không truyền version cho `chromedriver-update` thì nó sẽ mặc định lấy version để update. Một điều quan trọng trong bước cài đặt chính là version `chromedriver` phải support version `chrome` mà bạn đang dùng thì chúng ta mới có thể sử dụng được. Để xem version `chromedriver` support version `chrome` nào thì chúng ta có thể xem tại [đây](http://chromedriver.chromium.org/downloads). Bạn có thể kiểm tra version `chrome` và `chromedriver` của mình để so sánh và update với việc truyền version cho `chromedriver-update` rất dễ để sử dụng. Ví dụ chrome của mình version `69.0` => mình sẽ update `chromedriver` về `2.44` hoặc `2.43`
```bash
chromedriver-update 2.44
```

- Cài đặt rspec dùng với `capybara` và `selenium-webdriver` với `chrome` là driver. Trong `spec_helper.rb` thêm vào settings sau:

 ```ruby
  require 'capybara/rspec'

  Capybara.register_driver :chrome do |app|
      Capybara::Selenium::Driver.new(app, browser: :chrome)
   end

  Capybara.javascript_driver = :chrome
```

Như vậy là đã xong phần cài đặt, chúng ta sẽ tiến hành thực hành viết acceptance test đơn giản.

#### Testing
Ở đây mình dùng `Rspec` nên sẽ add thêm folder `spec/features` để chứa file test cho `capybara`, và `capybara` chỉ chạy với những test có tag `type: :feature` or `type: :system` đó là lý do sẽ tạo thư mục mới để phân biệt riêng cho nó.

Chúng ta sẽ viết test đơn giản cho màn hình tạo `User` với field `name` và `age` cả 2 đều validate presence  true. 
- Follow create user

```ruby
 # spec/features/create_user.rb
 require 'rails_helper'

 describe 'creating a user', type: :feature, js: true do
   it 'successfully creates user' do
     visit '/users'
     click_link 'New User'

     within '#new_user' do
       fill_in 'Name', with: "Ngoc Nguyen"
       fill_in 'Age', with: 27
     end
    click_button 'Create User'

    expect(page).to have_content 'User was successfully created.'
    expect(page).to have_content 'Ngoc Nguyen'
  end

  it 'failed creates user with error age' do
    visit '/users'
    click_link 'New User'

    within '#new_user' do
      fill_in 'Name', with: "Ngoc Nguyen"
      fill_in 'Age', with: ""
    end
    click_button 'Create User'

    expect(page).to have_content "Age can't be blank"
  end
end
```

- Follow update user
Tương tự trên ta có follow cho update user cho trường hợp edit, trước khi edit 1 là ta có thể ghép tiếp vào follow của create khi back về index thì sẽ edit tiếp, hoặc là sẽ làm theo cách là tự tạo 1 user trước sau đó sẽ edit user đó.
```ruby
 # spec/features/create_user.rb
require 'rails_helper'
describe 'updating a user', type: :feature, js: true do
    before :each do
      @user = create :user
    end

    it 'successfully creates user' do
      visit '/users'
      click_link 'Edit'

      within '#edit_user' do
        fill_in 'Name', with: "Nguyen Thi Ngoc"
        fill_in 'Age', with: 20
      end
      click_button 'Update User'

      expect(page).to have_content 'User was successfully updated.'
      expect(page).to have_content 'Nguyen Thi Ngoc'
    end

    it 'failed creates user with error name' do
      visit '/users'
      click_link 'Edit'

      within '#edit_user' do
        fill_in 'Name', with: ""
        fill_in 'Age', with: 20
      end
      click_button 'Update User'

      expect(page).to have_content "Name can't be blank"
    end
end
```
Sau đó chúng ta sẽ chạy lệnh test với rspec như chúng ta vẫn thường chạy.

{@embed: https://www.youtube.com/embed/vtz_sqBNfBw}

```bash
framgia@framgia0032-lt:~/rails-project/capybara_example$ rspec
......

Finished in 8.78 seconds (files took 2.13 seconds to load)
6 examples, 0 failures
```
Ngoài ra chúng ta cũng có thể screenshot lại màn hình web lúc chạy test để xem lại kết quả test lúc đó đúng trả về cái gì bằng cách thêm lệnh `save_screenshot`

```ruby
 describe 'creating a user', type: :feature, js: true do
   it 'successfully creates user' do
     visit '/users'
     click_link 'New User'

     within '#new_user' do
       fill_in 'Name', with: "Ngoc Nguyen"
       fill_in 'Age', with: 27
     end
    click_button 'Create User'

    expect(page).to have_content 'User was successfully created.'
    expect(page).to have_content 'Ngoc Nguyen'
	page.save_screenshot('screenshot.png')
  end
end
```
Nó sẽ lưu lại screenshot sau khi chạy xong test vào thư mục `tmp/capybara/your_screenshot`
Như vậy là kết thúc một follow đơn giản cho việc tạo ra một acceptance test hy vọng bạn có thể áp dụng để dự án không bị die những follow cơ bản khi sửa 1 function nào đó. Các bạn cũng có thể clone ví dụ dưới về chạy thử.

> https://github.com/nguyenngoc2505/capybara_example