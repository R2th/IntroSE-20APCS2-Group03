Khi đã làm quen với Ruby, điều dễ dàng nhận thấy đó là `gem` có mặt ở mọi nơi trong thế giới ruby. Chúng là xương sống của mọi ứng dụng Ruby. Việc tạo gem thực sự là không khó. Trong loạt bài này, mình sẽ bắt đầu bằng cách trình bày những điều cơ bản nhất trong việc tạo ra một gem từ đầu, sau đó chuyển sang các chủ đề nâng cao hơn bao gồm các công cụ tạo gem và Rails Engines. Vậy gem là gì? Đơn giản là gem là mã nguồn ruby được đóng gói lại và có thể được cài đặt bởi các ứng dụng ruby khác. Ở mức cơ bản, một gem bao gồm một tệp Ruby và một gemspec. Gemspec (gem specification) mô tả gem và được trình quản lý gói RubyGems sử dụng để cài đặt gem.
# RubyGems
Trình quản lý gói RubyGems có thể tải xuống và cài đặt các gem vào hệ thống của bạn và cho phép bạn sử dụng các gem trong các chương trình Ruby khác. Ruby 1.9 đi kèm với RubyGems được cài đặt theo mặc định. Để sử dụng RubyGems trong ứng dụng trước của Ruby 1.9, bạn sẽ cần thêm dòng này
trong ứng dụng của bạn:
```
require 'rubygems'
```

# Gem Specification
Gem speicication dùng để mô tả gem. Thông thường, một gem spec sẽ trông như thế này:
```
Gem::Specification.new do |s|
  s.name = %q{my_gem}
  s.version = "0.0.1"
  s.date = %q{2011-09-29}
  s.summary = %q{my_gem is an awesome gem}
  s.files = [
    "Gemfile",
    "Rakefile",
    "VERSION",
    "lib/my_gem.rb"
  ]
  s.authors = ["Duy Buffet"]
  s.require_paths = ["lib"]
end
```
Gemspec là một file đơn giản mô tả các khía cạnh khác nhau của gem. Trên đây mình chỉ liệt kê các thuộc tính bắt buộc. 4 thuộc tính đầu tiên bản thân đã nói lên ý nghĩa của nó. Thuộc tính “files” liệt kê tất cả các tệp được bao gồm trong gem. Thuộc tính "require_paths" chỉ định thư mục chứa các tệp Ruby cần được tải bằng gem. Để có danh sách đầy đủ các thuộc tính có thể được sử dụng trong gemspec, tham khảo [tại đây](http://docs.rubygems.org/read/chapter/20).

Lý thuyết là vậy, phần dưới đây, mình sẽ hướng dẫn các bạn tạo một gem từ đầu.
# Hướng dẫn tạo gem
### 1. Xây dựng cấu trúc cơ bản một gem
Bật console lên và tạo folder chứa gem
```
$ mkdir awesome_gem
$ cd awesome_gem
$ mkdir lib
```

### 2. Tạo gemspec
Chúng ta sẽ sử dụng template từ phần trước cho file gemspec. Tạo một file có tên `awesome_gem.gemspec` trong thư mục gốc của gem của bạn. Sau đó, thêm code vào để tạo gemspec hợp lệ:
```
Gem::Specification.new do |s|
  s.name = %q{awesome_gem}
  s.version = "0.0.0"
  s.date = %q{2018-07-20}
  s.summary = %q{awesome_gem demo viblo}
  s.files = [
    "lib/awesome_gem.rb"
  ]
  s.authors = ["Duy Buffet"]
  s.require_paths = ["lib"]
end
```
File "awesome_gem.rb" trong thư mục lib là file sẽ được sử dụng để chứa code Ruby trong gem này.

### 3. Code
Để đơn giản, chúng ta sẽ chỉ sử dụng một file Ruby duy nhất trong gem này: /lib/awesome_gem.rb
Bạn sẽ thấy đây là cấu trúc trong hầu hết các gem mà bạn gặp phải. Các file gốc bên trong `lib` thường sẽ giống với tên của gem. Trong trường hợp này là `awesome_gem` và `/lib/awesome_gem.rb`.
```
# /lib/awesome_gem.rb
module AwesomeGem
  class WhoIs
    def self.awesome?
      puts "YOU ARE AWESOME!!"
    end
  end
end
```
Gem này sẽ cho phép bạn sử dụng phương thức `awesome?` của class `WhoIs` trong các chương trình Ruby khác.

### 4. Gen ra gem file
Giờ code thì đã có rồi, Để có thể sử dụng nó trong chương trình Ruby khác ta cần dùng đến `Rubygems`. `Rubygems` có giao diện dòng lệnh cho phép bạn tạo ra một gem. Kích hoạt lệnh này bên trong thư mục gốc của gem của bạn:
```
$ gem build awesome_gem.gemspec
```
Lệnh này dùng để build gem và xuất ra một file gem bao gồm version trong tên của nó. Vì gemspec chứa thuộc tính version có giá trị là “0.0.0”, tên gem sẽ được đặt tên là awesome_gem-0.0.0. Bạn sẽ thấy kết quả sau và một số cảnh báo về các thuộc tính bị thiếu:
```
WARNING:  licenses is empty, but is recommended.  Use a license identifier from
http://spdx.org/licenses or 'Nonstandard' for a nonstandard license.
WARNING:  no email specified
WARNING:  no homepage specified
WARNING:  See http://guides.rubygems.org/specification-reference/ for help
  Successfully built RubyGem
  Name: awesome_gem
  Version: 0.0.0
  File: awesome_gem-0.0.0.gem
```
Đến bước này thì gem đã được tạo ra trong thư mục gốc. Tiếp theo sẽ là bước cài đặt gem trên hệ thống.

### 5. Cài đặt gem
Bây giờ bạn đã có gem file, bạn có thể sử dụng RubyGems để cài đặt gem trên máy tính của bạn. Đây là lệnh để cài đặt awesome_gem.gem cục bộ:
```
$ gem install awesome_gem
```
Kết quả nhận được là:
```
Successfully installed awesome_gem-0.0.0
1 gem installed
```
Bây giờ, gem đã được cài đặt trên hệ thống của bạn và sẵn sàng để sử dụng trong các chương trình Ruby khác.

### 6. Add gem vào một chương trình ruby khác
Tạo một file Ruby mới sẽ được sử dụng để kiểm tra Gem đã tạo bên trên với tên `be_awesome.rb`. Require `awesome_gem`, `RubyGems` sẽ tìm gem và module này sẽ có thể được sử dụng:
```
require 'awesome_gem'

AwesomeGem::WhoIs.awesome?
```
Chạy chương trình bằng lệnh này và thưởng thức kết quả đạt được:
```
$ ruby be_awesome.rb
```
# Kết luận
Bài hướng dẫn này khá là đơn giản và chỉ trình bày những điều cơ bản về việc tạo ra một gem. Những kiến thức cơ bản sẽ cung cấp cho bạn nền tảng tốt để có thể  tiếp tục với các chủ đề nâng cao hơn.

### Nguồn tham khảo
1. [Site point](https://www.sitepoint.com/creating-your-first-gem/)