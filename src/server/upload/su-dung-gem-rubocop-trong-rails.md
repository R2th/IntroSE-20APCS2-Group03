# Mở đầu
Rubocop là một công cụ để kiểm tra code style dựa trên ruby-style-guide, xây dựng lên để nhằm phục vụ cho các Ruby developer.
Rubocop sử dụng những quy tắc được định sẵn để so sánh chúng với code của bạn rồi đưa ra các thông báo lỗi. Ta dễ dàng nhận thấy những lợi ích khi sử dụng Rubocop dưới đây:
* Đánh giá được source của dự án như là độ dài tối đa của lines, method, class,...
* Kiểm tra dễ dàng các lỗi về coding convention, tiết kiệm thời gian cho người review
* Tạo sự đồng bộ về source code của dự án

# Cài đặt
Để cài đặt bạn có thể gõ lệnh sau trên terminal:
```
gem install rubocop
```
Hoặc bạn có thể thêm dòng sau vào Gemfile rồi chạy lệnh bundle install:
```
gem 'rubocop'
```
# Cách sử dụng
* Chạy tất cả thư mục:
    ```
    rubocop
    ```
* Chạy riêng một thư mục:
    ```
    rubocop app/
    ```
* Chạy riêng 1 file:
    ```
    rubocop app/models/user.rb
    ```
* Chạy động thời các thư mục và các file khác nhau:
    ```
    rubocop app/models/user.rb app/controllers
    ```
# Cấu hình
Về cơ bản việc cài đặt như trên đã đủ để chúng ta dùng gem này rồi. Tuy nhiên tùy từng dự án, từng công ty mà các quy tắc code của chúng ta sẽ khác nhau do vậy rubocop không cố định hoàn toàn các quy tắc lỗi. Chúng ta hoàn toàn có thể chỉnh sửa config để rubocop bắt lỗi theo đúng những gì bạn muốn. Bạn có thể sửa trong file .rubocop.yml, lúc này nó sẽ ghi đè lên các cops( các quy tắc kiểm tra) mặc định tương ứng của nó.

Format của .rubocop.yml có dạng:
```
inherit_from: ../.rubocop.yml

Style/Encoding:
  Enabled: false

Layout/LineLength:
  Max: 99
```
* Inheritance
   
   Rubocop hỗ trợ kế thừa các config từ một hoặc nhiều tập tin config khác nhau. Tùy chọn inherit_from có thể được sử dụng để include config từ một hoặc nhiều file. Điều khiển cho nó có thể có những setting chung giữa các project trong một file .rubocop.yml gốc nào đó và sau đó có thể tùy chỉnh ở các file, thư mục con. Ví dụ sau ta có 2 file .rubocop_enabled.yml và .rubocop_disabled.yml được include vào file .rubocop.yml
    ```
    inherit_from:
      - .rubocop_enabled.yml
      - .rubocop_disabled.yml
    ```
* Including/Excluding files

    Include: chỉ check cops trong những file khai báo:
    ```
    AllCops:
      Include:
        - foo.unusual_extension
        - '**/*.rb'
        - '**/*.gemfile'
        - '**/*.gemspec'
        - '**/*.rake'
        - '**/*.ru'
        - '**/Gemfile'
        - '**/Rakefile'
    ```
    Exclude: check cops ngoại trừ các file khai báo
     ```
    AllCops:
      Exclude:
        - 'db/**/*'
        - 'config/**/*'
        - 'script/**/*'
        - 'bin/{rails,rake}'
    ```
* Cú pháp của một cops như sau:
    ```
    rule_name:
        Description: "description of rule"
        Enabled: true or false
        Key: Value
    ```
    Trong đó:
    * rule_name: là tên của một cop
    * Description: mô tả cop
    * Enabled: dùng để kích hoạt (true) hoặc vô hiệu hóa (false) một cop, thông thường theo mặc định sẽ là true
    * Key, value: dùng để thêm thông tin cho 1 cop nào đó, ví dụ như các giá trị Max cho độ dài dòng, của phương thức, của class,...
 
Ví dụ: Tôi có một đoạn code ruby sau
```
class TestsController < ActionController::Base
  def badName name
    if name == 'haininh'
    'Xin chao'
    else
      'Tam biet'
    end
  end
end
```
Sau khi chạy lệnh rubocop app/controllers/tests_controller.rb, kết quả ta có được như sau:
```
Inspecting 1 file
C

Offenses:

app/controllers/tests_controller.rb:1:1: C: Style/Documentation: Missing top-level class documentation comment.
class TestsController < ActionController::Base
^^^^^
app/controllers/tests_controller.rb:1:1: C: Style/FrozenStringLiteralComment: Missing magic comment # frozen_string_literal: true.
class TestsController < ActionController::Base
^
app/controllers/tests_controller.rb:2:7: C: Naming/MethodName: Use snake_case for method names.
  def badName name
      ^^^^^^^
app/controllers/tests_controller.rb:2:15: C: Style/MethodDefParentheses: Use def with parentheses when there are parameters.
  def badName name
              ^^^^
app/controllers/tests_controller.rb:4:5: C: Layout/IndentationWidth: Use 2 (not 0) spaces for indentation.
    'Xin chao'
    

1 file inspected, 5 offenses detected

```
Như trên ta thấy rubocop đã thông báo 5 lỗi về convention, ta phân tich các lỗi như sau:
* Đối với 2 lỗi là Style/Documentation: Missing top-level class documentation comment, Style/FrozenStringLiteralComment: Missing magic comment # frozen_string_literal: true theo cá nhân mình thấy thì n thực sự không quá là quan trọng nên chúng ta có thể disable nó đi trong file config như sau:
    ```
    Style/Documentation:
      Description: "Document classes and non-namespace modules."
      Enabled: false
    Style/FrozenStringLiteralComment:
      Enabled: false
    ```
 * Use snake_case for method names lỗi này là tên phương thức phải dưới dạng snake_case, trong ví dụ trên ta sửa như sau: badName => bad_name
 * Use def with parentheses when there are parameters: định nghĩa phương thức có các tham số thì phải có dấu ngoặc đơn, trong ví dụ sửa như sau: bad_name(name)
 * Layout/IndentationWidth: Use 2 (not 0) spaces for indentation: khi xuống dòng phải lùi vào 2 space

Đoạn code hoàn chỉnh sẽ như sau:
```
class TestsController < ActionController::Base
  def bad_name(name)
    if name == 'haininh'
      'Xin chao'
    else
      'Tam biet'
    end
  end
end
```
Bạn có thể tham khảo thêm 1 số cops ở đây: [ruby-style-guide](https://github.com/rubocop-hq/ruby-style-guide)

* Một số symbols có thể xuất hiện trong output như sau:


| Symbol | Mô tả |
| -------- | -------- | 
| .     | File không có bất cứ vấn đề gì    | 
|C    | File có chứa vấn đề liên quan đến convention    | 
| E   | File có chứa một error    | 
| F    | File có chứa một fata error   | 
|W    | File có chưa warning    | 
# Tổng kết
Bài viết có tham khảo:

https://github.com/rubocop-hq/rubocop/blob/master/manual/configuration.md

https://github.com/rubocop-hq/rubocop