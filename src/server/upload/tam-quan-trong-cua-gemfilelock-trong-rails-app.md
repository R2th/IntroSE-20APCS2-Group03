![](https://images.viblo.asia/23bffbcc-c30a-476a-8836-d287d9368c88.png)

## 1. Giới thiệu
Nếu bạn mới bắt đầu làm quen với Rails, hẳn bạn cũng từng thắc mắc không biết Rails quản lý Gemfiles và gem version kiểu gì đúng không. Bài viết này sẽ giải thích cho bạn về Gemfiles và hướng hẫn về cách cập nhật gem, cũng như hiểu về Gemfile.lock.

Lần đầu tiên bạn chạy `bundle install` trong một project Ruby có một Gemfile, Bundler sẽ tự động tạo một file có tên `Gemfile.lock`. Đó là nơi quản lý version của gem và các dependency của chúng. `Gemfile.lock` đảm bảo khi chúng ta chia sẻ project của mình với người khác hay khi deploy project trong một team, mọi người trong team sẽ sử dụng version của gem giống hệt nhau khi chúng ta chạy `bundle install`. Dưới đây, mình sẽ minh họa cho bạn một ví dụ để bạn thấy được tầm quan trọng của Gemfile.lock và lý do tại sao có sự tồn tại của nó.

Tí và Tèo là một đôi bạn thân, cùng có mong muốn tạo một trang web để bán hàng online. 
Tí bắt đầu tạo một Rails app mới trên máy tính của mình và Tí thêm gem rails này vào trong Gemfile:

```
gem "rails", "~> 6.0"
```
Sau đó Tí chạy `bundle install`. Version mới nhất tại thời điểm đó trên máy Tí là 6.0.3. Trong tháng tiếp theo, Rails phát hành version mới và version mới nhất hiện tại là 6.1.1. Trong thời gian này, Tí chưa chạy `bundle update rails` nên vẫn đang sử dụng version 6.0.3. Sau đó một tháng, Tí yêu cầu Tèo cộng tác cùng mình để xây dựng app. Tí chia sẻ repo với Tèo, nhưng không bao gồm `Gemfile.lock`. Tèo chạy `bundle install` trên máy tính nhưng máy của Tèo đang cài rails version 6.1.1. không tương thích với một số method mà Tí đã viết chỉ hoạt động với version 6.0.3 và đã bị bỏ khi nâng lên version mới. Nếu Tí có file `Gemfile.lock` trong repo, Tèo sẽ có Rails 6.0.3 sau khi chạy `bundle install` và ứng dụng sẽ hoạt động.

**`Gemfile.lock` được tạo tự động khi chúng ta chạy `bundle install` hoặc `bundle update`.**

Vậy bên trong Gemfile.lock này chứa những gì. Hãy cùng mình tìm hiểu nhé.

## 2. Nội dung file Gemfile.lock
### GEM (optional nhưng rất phổ biến)

Đây là danh sách gem và dependencies được lưu trữ trên Rubygems server.

- `remote`: https://rubygems.org/
 - `specs`: danh sách các dependencies, với version của chúng và các ràng buộc đối với bất kỳ subdependencies con nào

Khi chạy `bundle install` nó sẽ tự động thêm gem cùng version vào trong danh sách này.

### GIT (optional)

Đây là những dependencies có nguồn gốc từ git. Bạn sẽ thấy một trong những phần này khác nhau cho mỗi project và trong mỗi phần, sẽ có:

- `remote`: git remote. VD: git@github.com:rails/rails
- `revision`: tham chiếu commit Gemfile.lock bị lock.
- `tag`: (optional) tag được chỉ định trong Gemfile
- `specs`: danh sách các git dependencies được tìm thấy trên remote, với version của chúng và các ràng buộc đối với bất kỳ subdependencies con nào.

### PATH (optional)

Đây là những dependencies từ một path nhất định, được cung cấp trong Gemfile. 

- `remote`: path. VD: plugins/vendored-dependency
- `specs`: danh sách các git dependencies được tìm thấy trên remote, với version của chúng và các ràng buộc đối với bất kỳ subdependencies con nào

### PLATFORMS

Một khía cạnh khác của `Gemfile.lock` là có thể gây nhầm lẫn giữa flatforms section. Nó có thể trông như thế này:

```
PLATFORMS
  x86_64-darwin-19
```

Điều này chỉ định hệ điều hành có thể được install và deploy. Mỗi khi chạy `bundle install` trên một hệ điều hành mới được sử dụng để phát triển, các platform sections sẽ được cập nhật.

Ví dụ: nếu Tí đang sử dụng Windows và là người đầu tiên làm việc trong dự án, sau khi Tí chạy `bundle install`, Gemfile.lock sẽ hiển thị Windows platform:

```
PLATFORMS
  x64-mingw32
```

Sau đó, nếu Tèo chạy `bundle install` trên máy Mac Intel của mình, Mac platform sẽ được thêm vào:

```
PLATFORMS
  x64-mingw32
  x86_64-darwin-19
```

Tuy nhiên, nếuTí và Tèo deploy dự án tới một web server bằng Heroku, GitHub Pages, Netlify hoặc các dịch vụ tương tự khác, nó có thể không thành công. Bởi vì hầu hết các  web server đều chạy hệ điều hành `Linux` và nếu `Gemfile.lock` không bao gồm  Linux platform, depending trên version Bundler của Gemfile.lock được tạo với các platform trên, họ có thể nhận được thông báo lỗi khó hiểu như thế này khi deploy Rails app trên Heroku:

```
!     Could not detect rake tasks
!     ensure you can run `$ bundle exec rake -P` against your app
!     and using the production group of your Gemfile.
!     /tmp/build_5cb36f76/bin/rake:4:in `require': cannot load such file -- rake (LoadError)
!     from /tmp/build_5cb36f76/bin/rake:4:in `<main>'
!
remote: /tmp/codon/tmp/buildpacks/50d5eddf222a9b7326028041d4e6509f915ccf2c/lib/language_pack/helpers/rake_runner.rb:106:in `load_rake_tasks!': Could not detect rake tasks (LanguagePack::Helpers::RakeRunner::CannotLoadRakefileError)
remote: ensure you can run `$ bundle exec rake -P` against your app
remote: and using the production group of your Gemfile.
remote: /tmp/build_5cb36f76/bin/rake:4:in `require': cannot load such file -- rake (LoadError)
```

Hoặc gặp một lỗi như sau:
```
Your bundle only supports platforms ["x86_64-darwin-19"] but your local
platform is x86_64-linux. Add the current platform to the lockfile with 
`bundle lock --add-platform x86_64-linux` and try again.
```

Những lỗi này tương đối mới. Chúng bắt đầu xảy ra khi Bundler thay đổi cách thức hoạt động của các platforms vào cuối năm ngoái khi họ phát hành version 2.2. Trước đây, khi các dự án sử dụng Bundler version 2.1.x, platform section trong Gemfile.lock sẽ tự động chứa ruby platform, cùng với hệ điều hành hiện tại, như sau:

```
PLATFORMS
  ruby
  x86_64-darwin-19
```

Điều này cho phép các Ruby apps được deploy trên các servers Linux. Nhưng từ version 2.2, ruby platform này không được thêm  mặc định nữa. Thế nên, khi deploy chúng ta phải nhớ thêm các platform thích hợp. 

Vì vậy, nếu chúng ta dự định deploy tới một server với hệ điều hành Linux, chúng ta cần thêm platform Linux bằng command sau:

```
bundle lock --add-platform x86_64-linux
```

Trong một số trường hợp, điều này không đủ để deploy hoạt động. 

VD: Heroku vẫn đang sử dụng version Bundler 2.1.4 cũ hơn, ngay cả khi apps được bundle với version mới hơn. Nó thực hiện điều này bằng cách xóa `BUNDLED WITH` trong `Gemfile.lock` trước khi chạy `bundle install`. Vì vậy, nếu apps được bundle với version Bundler 2.2.x, để có thể deploy nó lên Heroku, bạn cần thêm cả platform Linux và Ruby. Vì vậy, ngoài command bạn đã chạy ở trên, hãy chạy command này:

```
bundle lock --add-platform ruby
```

Heroku nhận thức được điều này và họ đang suy nghĩ về nhiều cách khác nhau để có thể giải quyết nó. Nếu bạn tò mò, có những cuộc thảo luận thú vị trong repo [rubygems](https://github.com/rubygems/rubygems/issues/4269) và [heroku-buildpack-ruby](https://github.com/heroku/heroku-buildpack-ruby/issues/1106).

Tóm lại, nếu bạn định deploy Ruby app của mình và nếu Gemfile.lock thiếu platform Linux và Ruby, bạn phải thêm chúng.

### DEPENDENCIES

Danh sách các dependencies và version của gem được thêm trong Gemfile.

Các dependencies được thêm với source khác với Rubygems index  chính (ví dụ: git dependencies, path-based, dependencies) có `!` nghĩa là chúng được "ghim" vào source đó (mặc dù đôi khi người ta phải tìm trong Gemfile để xác định).

### RUBY VERSION (optional)

Version Ruby được thêm trong Gemfile.

### BUNDLED WITH (Bundler> = v1.10.x)

Version Bundler được sử dụng để tạo Gemfile.lock. Được sử dụng để nhắc người cài đặt cập nhật version Bundler của họ, nếu version cũ hơn version đã tạo.

Khi chạy `bundle install`, version của Bundler được sử dụng tại thời điểm đó sẽ được ghi lại ở cuối file `Gemfile.lock`. 

```
BUNDLED WITH
   2.2.8
```

Nếu cố gắng chạy `bundle install` trên một project mà version của bundler trong `Gemfile.lock` cũ hơn, bạn có thể gặp lỗi như sau:

```
Traceback (most recent call last):
    2: from ~/.gem/ruby/2.7.2/bin/bundle:23:in `<main>'
    1: from ~/.rubies/ruby-2.7.2/lib/ruby/site_ruby/2.7.0/rubygems.rb:300:in `activate_bin_path'
~/.rubies/ruby-2.7.2/lib/ruby/site_ruby/2.7.0/rubygems.rb:281:in 
`find_spec_for_exe': Could not find 'bundler' (1.17.3) required by your 
~/playground/testing_gemfiles/Gemfile.lock. (Gem::GemNotFoundException)
To update to the latest version installed on your system, run 
`bundle update --bundler`.
To install the missing version, run `gem install bundler:1.17.3`
```

Bạn có thể sử dụng command `bundle update --bundler` để update version bundler hiện tại.

Nếu muốn update chính xác một version nào đó, bạn chạy:
`bundle _2.x.x_ update --bundler`

## 3. Kết luận
Qua bài viết này chúng ta cần nắm được:
1. Tầm quan trọng của Gemfile.lock trong Rails app.
2. Nội dung bên trong file này. Chú ý: về Flatform và Bundle with.

Hy vọng nội dung mình trình bày bên trên sẽ hữu ích cho các bạn. Thanks all.

Ref:

- https://www.moncefbelyamani.com/understanding-the-gemfile-lock-file/
- https://stackoverflow.com/questions/7517524/understanding-the-gemfile-lock-file