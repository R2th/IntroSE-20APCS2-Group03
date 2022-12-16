![](https://images.viblo.asia/20b7499a-cbae-491a-a5fc-949cb58c55d5.png)
Là một lập trình viên chắc hẳn bạn cũng đã từng làm việc với Heroku, đây là một trong những nền tảng đám mây đầu tiên, hỗ trợ rất tốt cho một số ngôn ngữ lập trình cũng như cho developer trong quá trình phát triển sản phẩm. Ngày hôm nay mình sẽ hướng đẫn các bạn các bước để đưa một Rails app có tích hợp Vue lên Heroku. Các bạn có thể tham khảo thêm bài viết hướng dẫn cài đặt và tích hợp Vue vào trong Rails app tại đây

## Cài đặt Heroku
Để có thể thao tác với Heroku ngay từ trên máy local của mình, chúng ta cần phải cài đặt **Heroku CLI** (Command Line Interface).

Nếu các bạn sử dụng macOS thì trên terminal sẽ chạy lệnh:
```
brew tap heroku/brew && brew install heroku
```
Trong trường hợp Ubuntu thì lệnh cài đặt sẽ là:
```
sudo snap install --classic heroku
```
## Tạo app trên Heroku
Trước tiên bạn hãy chắc chắn bạn đang đứng trong thư mục chứa Rails app. Chúng ta sẽ login vào Heroku thông qua CLI:
```
heroku login
```
Sau khi đăng nhập thành công, để tạo một app trên Heroku, bạn chỉ cần chọn cho app của mình một cái tên nào đó mà bạn thích. Tiếp theo là chạy lệnh:
```
heroku create yourappname
```
Nếu như tên bạn chọn là hợp lệ và trước đó chưa có ai chọn nó thì output bạn nhận được sẽ là:
```
Creating ⬢ yourappname... done
https://yourappname.herokuapp.com/ | https://git.heroku.com/yourappname.git
```
Để thuận tiện cho quá trình deploy sau này, chúng ta sẽ add thêm một git remote:
```
git remote add heroku https://git.heroku.com/yourappname.git
```
Heroku sử dụng một hook để mỗi khi bạn đẩy code của mình lên repository của heroku thì app của bạn sẽ tự động được deploy. Branch mặc định là master.

## Tích hợp Vue
Nếu như bạn muốn sử dụng Vue trong app của mình thì có thể tham khảo qua bài viết [này](https://www.dnlblog.com/posts/tich-hop-vue-vao-trong-rails). Trong bài viết mình đã hướng dẫn khá chi tiết về các bước để tích hợp Vue vào trong Rails. Trong trường hợp bạn không muốn sử dụng Vue thì có thể bỏ qua phần này để chuyển đến các phần tiếp theo.

## Cài đặt và config database
Heroku sử dụng PostgreSQL như là database mặc định vì thế nếu như bạn muốn dùng MySQL cho ứng dụng của mình thì bạn sẽ phải cài đặt thêm một add-on hỗ trợ. Một sự lựa chọn mà bạn có thể xem xét đó là  ClearDB MySQL. Một số add-on yêu cầu tài khoản của bạn phải được đăng ký thẻ tín dụng, tuy nhiên bạn cũng không cần lo lắng vì điều này bởi đa phần các add-on trên Heroku đều có thể sử dụng mà không phải mất phí.

#### MySQL
Để cài đặt ClearDB MySQL các bạn có thể vào đây, sau đó ấn vào nút Install ClearDB MySQL sau đó lựa chọn app (trong trường hợp tài khoản của bạn có nhiều app) và hoàn tất quá trình cài đặt.

Bạn cũng có thể sử dụng CLI để cài đặt. 

```
heroku addons:create cleardb:ignite
# -----> Adding cleardb to sharp-mountain-4005... done, v18 (free)
```
Sau bước này bạn đã có một database MySQL, việc tiếp theo cần làm là config để app của bạn trỏ tới nó. Để lấy được đường dẫn tới database vừa tạo, chúng ta chạy lệnh sau:

```
heroku config | grep CLEARDB_DATABASE_URL
# CLEARDB_DATABASE_URL => mysql://adffdadf2341:adf4234@us-cdbr-east.cleardb.com/heroku_db?reconnect=true
```
Copy lại giá trị của CLEARDB_DATABASE_URL sau đó chạy:
```
heroku config:set DATABASE_URL='mysql://adffdadf2341:adf4234@us-cdbr-east.cleardb.com/heroku_db?reconnect=true'
```
#### PostgreSQL
Trước tiên chúng ta phải migrate database hiện tại sang PostgreSQL. Nếu như khi tạo ứng dụng Rails các bạn đã chỉ định sử dụng database là PostgreSQL (`rails new app_name -d postgres`) thì có thể bỏ qua phần này còn nếu không thì chúng ta sẽ thêm vào Gemfile:
```ruby
gem "pg", "~> 0.20"
gem "rails_12factor"
```
Bạn nên chỉ rõ phiên bản của gem "pg" nếu không có thể sẽ gặp một số lỗi tương thích. Trong trường hợp trên máy của bạn đã cài PostgreSQL thì có thể để gem "pg" ngoài các group, còn không thì có thể sử dụng sqlite3 hoặc mysql2 cho môi trường development và test trong khi gem "pg" sẽ được sử dụng trong group production. Tiếp theo là chạy:
```
bundle --without production
```
Config production
Trong `config/environments/production.rb` có hai điều cần lưu ý:
```ruby
config.assets.compile = false
config.serve_static_assets = true
```
Đây là hai config quan trọng liên quan đến việc quản lý các tài nguyên tĩnh như css, js, image...
Trên môi trường development `config.assets.compile` có giá trị là true. Với mỗi một request, các file assets sẽ được compile lại để đảm bảo các thay đổi sẽ được luôn được cập nhật. Tuy nhiên trên môi trường production, điều này lại ảnh hưởng lớn tới performance của hệ thống. Vì vậy các file assets sẽ chỉ được compile một lần duy nhất và lưu lại trong thư mục **public/assets**. Giá trị `config.serve_static_assets = true` sẽ chỉ định Rails lấy các tài nguyên tĩnh trong thư mục **public/assets** chứ không phải trong **app/assets** nữa.

Chạy lệnh dưới đây để thực hiện compile:
```
RAILS_ENV=production rails assets:clean assets:precompile
```
Chỉ có những file được đăng ký ở trong **config/initializers/assets.rb** mới được compile ngoài các file mặc định là **application.css** và** application.js**. Trong những file này, các thành phần được require vào, trong khi compile, chúng sẽ được gộp và compress lại. Điều này đôi khi gây nên các xung đột, nhất là đối với các file javascript. Vì thế thứ tự require các file là rất quan trọng. Trong nhiều trường hợp cần thiết phải xóa hẳn thư mục **public/assets** đi rồi mới thực hiện compile lại.

Khi chạy compile cũng có thể xuất hiện các lỗi liên quan đến Uglifier. Đó có thể là do bạn đã sử dụng các cú pháp của ES6 trong một file js nào đó của mình. Để khắc phục điều này chỉ cần tìm config:
```ruby
config.assets.js_compressor = :uglifier
```
và thay đổi lại thành: 
```ruby
config.assets.js_compressor = Uglifier.new(harmony: true)
```
## Deploy
Mọi thứ đã chạy trơn chu thì đây chính là lúc đưa code của bạn lên Heroku. Việc đầu tiên cần làm là kiểm tra .gitignore và chắc chắn rằng thư mục public/assets không nằm trong danh sách.
```
git add .
git commit -m "Deploy heroku"
git push heroku master -f
```
Trong quá trình deploy có thể xảy ra lỗi require tree must be a directory. Lỗi này sảy ra khi trong config mặc định của Rails có require các thư mục này nhưng vì một lí do nào đó nó không còn tồn tại nữa hoặc trong thư mục đó không có file .keep nên nó đã bị git coi như là một thư mục rỗng và bị bỏ qua. Cũng cần xem lại trong .gitignore, nếu có các thư mục khả nghi là đang gây ra lỗi thì cũng xem xét bỏ chúng khỏi danh sách, commit lại code và đẩy lên heroku một lần nữa. Khi quá trình deploy thành công, chúng ta chạy tiếp lệnh:
```
heroku run rails db:migrate
```
Nếu như không còn phát sinh thêm lỗi nào nữa thì giờ là lúc kiểm tra xem app của chúng ta đã hoạt động được hay chưa:
```
heroku open
```
## Custom domain
Heroku cho phép bạn có thể thay thế domain mặc định của app bằng một domain nào đó mà bạn sở hữu. Để sử dụng được dịch vụ này thì tài khoản của bạn cần phải được đăng ký thẻ tín dụng. Các bước thực hiện rất đơn giản:

* Đầu tiên, bạn chạy dòng lệnh sau để thêm một custom domain vào app:
```
heroku domains:add www.your-custom-domain.com
```
* Sau khi chạy thành công thì ở phần setting của app trên heroku sẽ xuất hiện domain mà bạn vừa thêm vào:

|  Domain |  Name	DNS Target |
| -------- | -------- |
| www.your-custom-domain.com | whispering-willow-5678.herokudns.com |

* Copy phần DNS Target rồi vào trang quản lý domain của bạn, thêm một record DNAME:

|Record|	Name|	Target|
| -------- | -------- | -------- |
|CNAME|	www	| whispering-willow-5678.herokudns.com|
Đợi một vài phút để DNS cập nhật những thay đổi của bạn, sau thời gian đó bạn đã có thể vào app của mình thông quan custom domain.

#### Cloudflare SSL
Khi bạn muốn sử dụng SSL cho domain của mình, Heroku cũng cung cấp cho bạn một dịch vụ để thực hiện điều này. Tuy nhiên đây là một dịch vụ có tính phí. Rất may mắn là chúng ta đã có Cloudflare, chỉ với vài bước đơn giản bạn đã có thể tích hợp SSL cho app của mình.

* Tạo một tài khoản Cloudflare, đăng nhập và add site của bạn vào. Trong trường hợp này là `your-custom-domain.com`.
* Trong trang quản lý site ở phần DNS, chúng ta thêm vào một record:

|Type|	Name|	Content|
| -------- | -------- | -------- |
|CNAME|	www	|yourappname.herokuapp.com|
* Chuyển sang phần **SSL/TLS**, chọn option **Full** (Encrypts end-to-end, using a self signed certificate on the server)
* Vào phần quản lý DNS Management, thay đổi nameservers mặc định của nhà cung cấp bằng nameservers của Cloudflare

Đợi một vài phút để các thay đổi được cập nhật. Sau đó bạn hãy vào đường dẫn:
```
https:://your-custom-domain.com
```
Nếu như app của bạn hiện ra thì xin chúc mừng, chúng ta đã thành công.

## Summary
Vừa rồi mình đã hướng dẫn các bạn toàn bộ các bước cài đặt để đưa một Rails app lên Heroku. Toàn bộ các dịch vụ được sử dụng trong bài viết đều miễn phí tuy nhiên bạn cũng đã có được một website chuyên nghiệp.

Blog: https://www.dnlblog.com/posts/deploy-rails-vue-app-to-heroku