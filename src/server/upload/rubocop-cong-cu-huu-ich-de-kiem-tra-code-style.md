## Rubocop
Rubocop là một công cụ để kiểm tra code style dựa trên ruby-style-guide, xây dựng lên để phục vụ cho developers. Việc sử dụng Rubocop trong dự án sẽ giúp bạn tiết kiệm rất nhiều thời gian cho việc review coding convention, đảm bảo code không bị mắc phải những lỗi cơ bản.

Rubocop sử dụng các quy tắc được định sẵn để so sánh chúng với code của bạn rồi đưa ra các thông báo lỗi.

Sử dụng Rubocop trong projects giúp chúng ta tiết kiệm thời gian cho việc review coding convention và đảm bảo code không mắc phải những lỗi convention cơ bản.
## Cài đặt
Có 2 cách để có thể cài đặt rubocop vào project
1. Cho vào Gemfile và bundle install
```
#Gemfile 
gem 'rubocop'
```
2. Chạy trực tiếp trên terminal
```
gem install rubocop
```
## Hướng dẫn sử dụng
* Để chạy tất cả thư mục
```
rubocop
```
* Chạy riêng một thư mục
```
rubocop app/
```
* Chạy riêng từng file một
```
rubocop app/models/test.rb
```
* Thậm chí bạn có thể chạy đồng thời các thư mục và các file khác nhau
```
rubocop app/models/test.rb app/controllers/
```
## Cấu hình file rubocop.yml
Tùy từng dự án, từng công ty mà các quy tắc khi code cũng sẽ khác nhau, chính vì thế rubocop không cố định hoàn toàn các quy tắc lỗi. Bạn hoàn toàn có thể chỉnh sửa config để rubocop bắt lỗi theo đúng những gì mà bạn muốn. Bạn có thể sửa trong file .rubocop.yml, lúc này nó sẽ overwrite lên các cops (các quy tắc kiểm tra) mặc định tương ứng của nó.

Cú pháp của một cops như sau:
```
rule_name:
  Description: 'a description of a rule'
  Enabled : (true or false)
  Key: Value
```
Trong đó:
* rule_name:  là tên của cops
* Description : mô tả cop
* Enable : cho phép cop có được thực hiện hay không, thông thường theo mặc định sẽ là true.
* Key và Value : dùng để thêm thông tin cho một cop nào đó, ví dụ như các giá trị Max cho độ dài của dòng, của phương thức, của class

Format của .rubocop.yml có dạng:
```
inherit_from: ../.rubocop.yml

Style/Encoding:
  Enabled: false

Metrics/LineLength:
  Max: 80
```
## Enable and Disable
Tuy nhiên trong một số trường hợp không phải lúc nào cũng có thể tuân thủ theo các quy tắc trong rubocop vậy làm thế nào để bỏ qua việc kiểm tra này. Có một số cách để bỏ qua việc kiểm tra quy tắc trong robocop
* Bỏ qua việc kiểm tra rubocop với một class, một method hay một line:
Ví dụ rubocop.yml
```
inherit_from: ../.rubocop.yml

Style/Encoding:
  Enabled: false

Metrics/MethodLength:
  Max: 80
```
Vậy với một method dài hơn 80 dòng chúng ta làm như thế nào. Thông thường chúng ta sẽ tìm cách chia nhỏ method đó ra nhưng đôi khi không thể chia nhỏ được. Vậy cách hữu ích nhất là bỏ qua việc kiểm tra này. Việc này cực kỳ đơn giản là thêm một comment Rubocop với bắt đầu bằng `# rubocop:disable`
```
def very_long_method # rubocop:disable Metrics/MethodLength
   method này dài hơn 80 dòng
end
```
* Cách bỏ qua kiểm tra trên vô cùng hữu ích với một code block hoặc một line, vậy với ví dụ sau thì làm thế nào?
```
Dòng 1[Dòng dài hơn 80 ký tự]
Dòng 2[Dòng dài hơn 80 ký tự]
Dòng 3[Dòng dài hơn 80 ký tự]
```
Chúng ta có một cách hữu ích hơn với trường hợp như thế này bằng cách sử dụng `# rubocop:disable` và `# rubocop:enable`. Với `disable` là bắt đầu bỏ qua kiểm tra và `enable` là tiếp tục kiểm tra. Ví dụ như
```
# rubocop:disable Metrics/LineLength
Dòng 1[Dòng dài hơn 80 ký tự]
Dòng 2[Dòng dài hơn 80 ký tự]
Dòng 3[Dòng dài hơn 80 ký tự]
# rubocop:enable Metrics/LineLength
```
## Kết luận
Như vậy trong bài này mình đã cùng mọi người tìm hiểu về một gem rất hữu ích trong code style. Chúc các bạn học tập hiệu quả.

Bài viết có tham khảo từ:

https://medium.freecodecamp.org/rubocop-enable-disable-and-configure-linter-checks-for-your-ruby-code-475fbf11046a

https://github.com/rubocop-hq/rubocop