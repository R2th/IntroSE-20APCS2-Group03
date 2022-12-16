Ở bài này, mình sẽ thực hiện Unit Testing để kiểm tra code chạy có chính xác không. Rails có riêng một nền tảng hổ trợ Unit Testing rất mạnh và mình sẽ tìm hiểu về nó.
Trong cấu trúc thư mục của 1 project có thư mục `test`, trong thư mục này cũng có các thư mục `models`, `controllers` và những thư mục và file khác tương tự như trong thư mục `app`. Ý nghĩa của thư mục này là tạo ra một môi trường giả lập để test, môi trường này có models riêng, controllers riêng và cơ sở dữ liệu riêng.
![](https://images.viblo.asia/e8a08291-c128-4d5f-b1bb-8f35a7504f21.png)
Khi chúng ta tạo một model bằng lệnh `generate scaffold`, thì trong thư mục gốc của project có một thư mục tên là `test/models`, trong đó sẽ có một file có tên theo dạng <tên model>_test.rb.
trong ứng dụng [toy_app](https://viblo.asia/p/ruby-create-application-with-scaffold-yMnKMgPal7P) đã làm thì file này sẽ là `micropost_test.rb` và `user_test.rb`, file này có nội dung như sau:
micropost_test.rb
```
require 'test_helper'

class MicropostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
```
Ở đây Rails định nghĩa `class MicropostTest` kế thừa từ lớp `ActiveSupport::TestCase`, class này thực ra cũng chỉ là kế thừa từ class `Test::Unit::TestCase` có trong Ruby thôi. Trong class này có một khối lệnh (đã được mặc định là comment) có cú pháp `test <tên test> do...end`, có thể hình dung đây giống như là một định nghĩa hàm/phương thức, khi kiểm tra thì Rails sẽ gọi chúng để chạy.
Tiếp theo, trong khối lệnh đó có dòng lệnh `assert true`, assert là một phương thức, giá trị trả về của phương thức này là **true** hoặc **false**, và cứ mỗi lần có một phương thức assert nào đó trả về **false** thì Rails báo lỗi.

Trước khi đi vào phần kiểm tra thì chúng ta phải chạy lệnh `rake db:migrate RAILS_ENV=test`:
```
tranthitinh:~/workspace/toy_app (modify) $ rake db:migrate RAILS_ENV=test
== 20171102064247 CreateUsers: migrating ======================================
-- create_table(:users)
   -> 0.0011s
== 20171102064247 CreateUsers: migrated (0.0012s) =============================

== 20171113021918 CreateMicroposts: migrating =================================
-- create_table(:microposts)
   -> 0.0013s
== 20171113021918 CreateMicroposts: migrated (0.0014s) ========================
```
Lệnh này cũng giống như lệnh `rake db:migrate`, tức là sẽ tạo các bảng trong CSDL, chỉ khác là tạo cho môi trường test, không đụng chạm gì tới file CSDL của app, mặc định Rails sử dụng CSDL SQLite3 nên file được tạo ra là file test.sqlite3 nằm trong thư mục db.
### Ví dụ Unit Testing
Thử sửa file micropost_test.rb như sau:
test/models/micropost_test.rb
```
require 'test_helper'

class MicropostTest < ActiveSupport::TestCase
  test "Is not null" do
        post = Micropost.new
        assert post.invalid?
        assert post.errors[:content].any?
        assert post.errors[:user_id].any?
    end
end
```
Trong đoạn code trên, mình định nghĩa một test có tên là “"Is not null”, trong đó tạo một đối tượng Micropost và không có thuộc tính nào có giá trị nào cả. 
Tiếp theo, gọi phương thức `assert` kiểm tra giá trị của phương thức `invalid?`, đây là một phương thức của class `ActiveRecord::Base`, phương thức này sẽ kiểm tra xem các thuộc tính của class tương ứng có hợp lệ hay không dựa trên các phương thức validates (đã làm trong bài trước), tất nhiên là không hợp lệ vì không có thuộc tính nào có giá trị nào cả, và Rails sẽ làm một việc là gán một chuỗi thông báo lỗi ứng với từng thuộc tính vào thuộc tính errors (đây là một mảng và cũng là một thuộc tính của class `ActiveRecord::Base`).
Tiếp theo, mình kiểm tra xem các phần tử của mỗi thuộc tính tương ứng trong thuộc tính errors có tồn tại hay không thông qua phương thức any?, phương thức này kiểm tra xem một thuộc tính nào đó có tồn tại hay không, ở đây là có tồn tại và phương thức assert sẽ trả về true.
Bây giờ chúng ta có thể chạy test bằng lệnh `rake test`
```
tranthitinh:~/workspace/toy_app (modify) $ rake test:models
Run options: --seed 3214

# Running:

..

Finished in 0.089803s, 22.2711 runs/s, 66.8132 assertions/s.
2 runs, 6 assertions, 0 failures, 0 errors, 0 skips
```
### Fixtures
Trong số các điều kiện kiểm tra mà chúng ta đã viết thì còn một điều kiện nữa là kiểm tra xem thuộc tính title có phải là duy nhất hay không. Để kiểm tra thì có một cách là mỗi lần test chúng ta tạo một đối tượng cụ thể, sau đó lưu vào CSDL, rồi lại một đối tượng khác có thuộc tính giống như đối tượng vừa tạo và kiểm tra, tuy nhiên cách này có hơi rắc rối, do đó Rails cung cấp cho chúng ta cơ chế `Fixtures`.
Fixtures có thể hiểu là các dữ liệu mẫu đã được lưu trong CSDL test, mỗi khi chạy test thì chúng ta có thể sử dụng các dữ liệu này.
Trong Rails thì các dữ liệu fixture được lưu trong thư mục mặc định là `test/fixtures` dưới định dạng CSV hoặc YAML. Khi tạo model thì Rails cũng tạo một file fixture mẫu trong thư mục này với định dạng YAML, ở đây chúng ta tạo model `Micropost` và file fixture tương ứng là `micropost.yml`, model `User` và file fixture tương ứng là `user.yml`, và mình sẽ dùng định dạng này luôn cho tiện. 
File `micropost.yml` mặc định có nội dung như sau:
```
# Read about fixtures at http://api.rubyonrails.org/classes/ActiveRecord/FixtureSet.html

one:
  content: MyText
  user_id: 1

two:
  content: MyText
  user_id: 1
```
File `user.yml` mặc định có nội dung như sau:
```
# Read about fixtures at http://api.rubyonrails.org/classes/ActiveRecord/FixtureSet.html

one:
  name: MyString
  email: MyString

two:
  name: MyString
  email: MyString
```

Lưu ý là các file .yml này luôn phải trùng với tên một bảng nào đó. Ngoài ra, cứ mỗi lần chúng ta chạy lệnh rails test thì các bảng trong file test.sqlite3 luôn được tạo mới và được chèn sẵn các dữ liệu fixtures này.
Bây giờ chúng ta sẽ thêm một bản ghi khác vào fixture `micropost.yml` như sau:
```
# Read about fixtures at http://api.rubyonrails.org/classes/ActiveRecord/FixtureSet.html

one:
  content: MyText
  user_id: 1

two:
  content: MyText
  user_id: 1
  
addnew:
  content: MyText
  user_id: 1
```
Lưu ý là các dòng được thụt vào bằng một dấu cách, không phải là dấu tab.
Tiếp theo chúng ta viết test như sau:
test/models/micropost_test.rb
```
require 'test_helper'

class MicropostTest < ActiveSupport::TestCase
  test "Is not null" do
        post = Micropost.new
        assert post.invalid?
        assert post.errors[:content].any?
        assert post.errors[:user_id].any?
    end
  fixtures :microposts
  
    test "content is can't be duplicated" do
        post = Micropost.new(:content => microposts(:addnew).content,
            :user_id => "2")
        assert !post.save
        assert_equal "has already been taken",
                     post.errors[:content].join('')
     end
end
```
Dòng `fixtures :microposts` sẽ chỉ định Rails lấy những bản ghi được định nghĩa trong file microposts.yml từ bảng microposts trong file test.sqlite3. Sau đó Rails sẽ tạo một phương thức có tên trùng với tên bảng, phương thức này sẽ nhận vào tên fixtures để tìm các bản ghi có tên tương ứng và tạo thành một đối tượng thuộc model đó, nhờ đó chúng ta có thể đọc dữ liệu từ bản ghi này.

Trong ví dụ trên, chúng ta tạo test có tên “content is can't be duplicated”, trong đó chúng ta tạo một đối tượng Micropost có thuộc tính content được lấy từ đối tượng tạo ra từ phương thức microposts(:addnew). Khi chúng ta gọi phương thức save để lưu đối tượng mới vào CSDL thì phương thức này sẽ trả về false, tức là không hợp lệ và assert sẽ tạo thông báo lỗi vào thuộc tính errors.

Bạn có thể chạy lệnh `rake test` để kiểm tra.