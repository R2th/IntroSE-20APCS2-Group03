# 1. Introduce
- Một trong những command được sử dụng nhiều nhất khi làm việc với Rails có lẽ là `bundle install` =))
- Vậy bạn có bao giờ hỏi ngoài `bundle install` còn có bundle gì nữa không.
- Bundler hoạt động như thế nào.
- Bài viết này sẽ tìm hiểu sương sương về những thứ trên.

# 2. Bundler
- Để install bundler bạn chạy command sau
    ```ruby
    gem install bundler
    ```
- Bundler sẽ install và tracking version của các gem được sử dụng trong dự án Ruby nhằm đảm bảo môi trường thống nhất cho Ruby project
- Bằng cách chạy `bundle install`, bundler sẽ install các gem được khai báo trong `Gemfile` và dependencies cần thiết của gem đó
- Thông tin về các gem đã được install và veriosn của gem cũng như bundler được tracking tại `Gemfile.lock`
- Vì vậy nên khi commit bạn nhớ commit cả `Gemfile` và `Gemfile.lock` lên github.

# 3. Gemfile
- `Gemfile` mô tả gem và các dependencies cần thiết cần được install để run một application nào đó của ruby.
- `Gemfile` được đặt ở root của thư mục dự án.
- Ví dụ đối với dự án Rails thì `Gemfile` sẽ được đặt trong cùng thư mục với `Rakefile`.

## a. Global Sources
- Ở đầu `Gemfile` sẽ khai báo source ở gem được list trong `Gemfile`, thường là `"https://rubygems.org"`
    ```ruby
    source "https://rubygems.org"
    ```

## b. Ruby
- Phần này là optional, chỉ cần thiết nếu dự án của bạn có yêu cầu về version của ruby, ví dụ
    ```ruby
    ruby "1.9.3"
    ```

## c. Gems
- List các gem cần thiết cho dự án của bạn, ví dụ
    ```ruby
    gem "nokogiri"
    ```
- Ngoài ra còn có thêm 1 số tham số optional khác

### i. Gem version (optional)
- Ví dụ
    ```ruby
    gem "nokogiri", "1.4.2"
    ```
- Thay vì mô tả chính các version của gem, bạn còn có thể mô tả version của gem theo những cách khác nhau
- Ví dụ `gem "nokogiri", ">=1.4.2"` sẽ install các version từ 1.4.2 trở về sau như 1.4.2, 1.4.3, 1.5, ....
- Ví dụ `gem "nokogiri", "<=1.4.2"` sẽ install các version từ 1.4.2 trở về trước như 1.4.1, 1.4.0, 1.3, ....
- Ngoài ra bạn còn có thể sử dụng `>1.4.2` hoặc `<1.4.2`
- Bạn cũng có thể sử dụng `gem "nokogiri", ">=1.4.2", "<=1.5.2"`
- Bên cạnh đó `gem "nokogiri", ~> 1.4.2"` sẽ tương đương với `gem "nokogiri", ">= 1.4.2", "< 1.5"`
- Bên cạnh đó `gem "nokogiri", ~> 1.4"` sẽ tương đương với `gem "nokogiri", ">= 1.4", "< 2.0"`

### ii. Gem Require (optional)
- Ví dụ 
    ```
     gem "nokogiri", require: false
    ```
- Mô tả gem có được auto require khi chạy `Bundler.require` hay không
- `require: true` gem sẽ được autorequire khi chạy `Bundler.require`
- `require: false` gem sẽ không được autorequire khi chạy `Bundler.require`
- Mặc định là `require: true` nên bạn chỉ cần thêm option này khi `require: false`

### iii. Gem group (optional)
- Ví dụ
    ```
     gem "nokogiri", group: :development
     gem "nokogiri", group: [:development, :test]
    ```
- Mô tả group của gem, có thể là `:default`, `:development`, `:test`, `:staging`, `:production`, `:heroku`, ...
- Thông qua `Bundler.setup` và `Bundler.require` để thêm gem và load path của ruby và require gem vào group
    ```ruby
    # load all groups to Ruby's load path
    Bundler.setup
    # load :default group to Ruby's load path
    Bundler.setup(:default)
    # load :default group and :test group to Ruby's load path
    Bundler.setup(:default, :test)
    
    # require gems in :default group
    Bundler.require
    # require gems in :test group
    Bundler.require(:test)
    # require gems in :development and :test group
    Bundler.require(:development, :test)
    ```
- Bạn cũng có thể khai báo gem theo group như sau
    ```ruby
    group :development, :test do
      gem "factory_bot_rails"
      gem "pry-rails"
    end
    ```

# 4. Bundle command
## a. bundle install
- Install gem được khai báo trong `Gemfile` và các dependencies cần thiết của các gem đó
- Tracking các gem đã install và version vào file `Gemfile.lock`
## b. bundle update
- Update gem lên version mới nhất
- Theo mặc định sẽ update toàn bộ gem được khai báo trong `Gemfile` và `Gemfile.lock`
## c. bundle cache
- Copy tất cả gem có trong `Gemfile` và `Gemfile.lock` vào thư mục `vendor/cache`
## d. bundle config
- Setting bundler config
## e. bundle help
- Hiển thi chi tiết các command của bundler
## f. bundle add
- Thêm gem vào `Gemfile` và chạy `bundle install`
- Có thể thêm các option như --group, --version của gem muốn thêm
## g. bundle gem
- Tạo skeleton project để tạo 1 gem mới
## h. bundle info
- Hiển thị thông tin của gem
## i. bundle init
- Tạo `Gemfile`
## k. bundle list
- Hiển thị danh sách gem có trong bundler
## l. bundle open
- Mở source code của gem
## m. bundle outdated
- Hiển thị danh sách các gem đã bị outdated và version mới hơn của gem đó
## n. bundle remove
- Xóa gem khỏi `Gemfile`
## o. bundle show
- Hiển thị tất cả gem có trong Gemfile
## p. bundle version
- Hiển thị verrsion của bundler