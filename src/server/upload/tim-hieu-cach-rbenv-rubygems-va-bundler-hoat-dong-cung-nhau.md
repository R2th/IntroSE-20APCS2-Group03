Đối với các bạn mới tiếp xúc với Ruby thì đều biết đến Rbenv, RubyGems và Bundler. Chắc hẳn các bạn sẽ luôn tò mò về cách chúng làm việc cùng nhau để cung cấp quyền kiểm soát đối với môi trường code của bạn. Nếu bạn biết cách chúng hoạt động, bạn sẽ chuẩn bị tốt hơn để khắc phục bất kỳ sự cố nào bạn gặp phải. Bài viết này sẽ hướng dẫn bạn những kiến thức cơ bản về cách ba công cụ này thực hiện công việc của chúng.
## 1. Mở đầu
 Quản lý các *dependencies* trong Ruby thường liên quan đến việc chỉ định các phiên bản Ruby và gem mà dự án sử dụng. Hầu hết việc gỡ lỗi các *dependencies* là một công việc khá khó khăn. Bởi vì rất nhiều khi ta code mà thấy chúng đã hoạt động OK mà không kiểm tra gì thêm, khi có lỗi xảy ra sẽ rất khó để tìm ra lỗi và khắc phục sẽ bị chậm trễ. Bài viết này sẽ trình bày các phần liên quan đến quản lý *dependencies* trong Ruby. Điều này sẽ hỗ trợ gỡ lỗi các vấn đề kỳ lạ này khi chúng xảy ra.

![](https://images.viblo.asia/d9494c5f-9a67-4686-90ae-c07ef3ec1cad.png)
## 2. Ruby Code Loading
Theo mặc định, Ruby cung cấp hai phương thức chính để tải code được định nghĩa ở nơi kháclà `load` và `require`.
```
load 'json.rb'
require 'json.rb'
require_relative 'json.rb'
```
Cả hai phương thức loading đều chấp nhận cả đường dẫn tuyệt đối và tương đối làm đối số. Tuy nhiên, có hai yếu tố khác biệt:

1. Nhiều lệnh gọi tới `load` sẽ thực thi lại file, trong khi nhiều lệnh gọi tới `require` sẽ không thực thi lại file; thay vào đó, nó sẽ `return false`.
2. Các lệnh gọi `load` chỉ giải quyết đến các đường dẫn tuyệt đối và tương đối. Các lệnh gọi để `require` sẽ kiểm tra `$LOAD_PATH` thời điểm đường dẫn không phân giải thành đường dẫn tuyệt đối.

Một biến thể thứ ba là `require_relative`, sử dụng các đường dẫn tương đối để yêu cầu codes liên quan đến vị trí của file hiện tại hơn là quy trình làm việc Ruby.
## 3. Rbenv
Trình quản lý phiên bản là một công cụ được sử dụng để quản lý và dễ dàng chuyển đổi giữa các phiên bản của trình thông dịch (trong trường hợp này là Ruby) và chỉ định vị trí để tìm các gem tương ứng cho dự án. Trình quản lý phiên bản phần lớn là các công cụ bất khả tri ngôn ngữ và các ngôn ngữ khác nhau có cách triển khai tương ứng, chẳng hạn như [Nvm](https://github.com/nvm-sh/nvm) , [n](https://github.com/tj/n) cho Node.js, [pyenv](https://github.com/pyenv/pyenv) cho Python và [Rbenv](https://github.com/rbenv/rbenv) , [rvm](https://rvm.io/) và [chruby](https://github.com/postmodern/chruby) cho Ruby. Bây giờ, ta sẽ xem rbenv làm gì với Ruby nhé.

### 1. Cài đặt Ruby Version
Chúng ta dùng câu lệnh `$ rbenv install` để cài đặt 1 phiên bản bất kì của Ruby:
```
# Install ruby 2.6.1
$ rbenv install 2.6.1
Downloading openssl-1.1.1i.tar.gz...
-> https://dqw8nmjcqpjn7.cloudfront.net/e8be6a35fe41d10603c3cc635e93289ed00bf34b79671a3a4de64fcee00d5242
Installing openssl-1.1.1i...
Installed openssl-1.1.1i to /home/directory/.rbenv/versions/2.6.1

Downloading ruby-2.6.1.tar.bz2...
-> https://cache.ruby-lang.org/pub/ruby/2.6/ruby-2.6.1.tar.bz2
Installing ruby-2.6.1...
ruby-build: using readline from homebrew
Installed ruby-2.6.1 to /home/directory/.rbenv/versions/2.6.1

# Check Installation
$ rbenv versions # Shows all versions installed.
  system
  2.6.1

# Lookup versions available for installation
$ rbenv install -L
1.8.5-p52
1.8.5-p113
1.8.5-p114
...
2.7.0-rc1
2.7.0-rc2
2.7.0
...
truffleruby+graalvm-20.1.0
truffleruby+graalvm-20.2.0
truffleruby+graalvm-20.3.0

# The full list above amounts to about 500 versions, scrolling through the entire list is a lot.
# The command below is an easy shortcut to find your specific version with fzf.
$ rbenv install `rbenv install -L | fzf`
```

### 2. Chuyển đổi giữa các Versions

Có một số cách để xác định cách chuyển đổi giữa các phiên bản của Ruby;  `rbenv` thực hiện như sau:
* Kiểm tra RBENV_VERSION.
* Tìm kiếm tệp `.ruby-version`  trong thư mục của script và tệp cha của nó cho đến khi nó truy cập vào thư mục gốc.
*  Tìm kiếm tệp `.ruby-version` trong `$PWD` và các thư mục mẹ của nó cho đến khi nó truy cập vào thư mục gốc.
* Sử dụng file `~/.rbenv/version`.
Ưu tiên đi từ trên xuống dưới. `~/.rbenv/version` là dự phòng cuối cùng và được coi là phiên bản global. Xem bên dưới:
```
# Inside First Project Root

# Select ruby version for project
$ touch .ruby-version && echo "2.7.1" >> .ruby-version

# Verify selected version
$ ruby --version
ruby 2.7.1p83 (2020-03-31 revision a0c7c23c9c) [x86_64-darwin20] # Result

$ rbenv version
2.7.1 (set by /path/to/current/directory/.ruby-version) # Result

# Change selected version
$ : >> .ruby-version && echo "2.6.1" >> .ruby-version

# Verify selection change
$ ruby --version
ruby 2.6.1p33 (2019-01-30 revision 66950) [x86_64-darwin20] # Result

$ rbenv version
2.6.1 (set by /path/to/current/directory/.ruby-version)

# Change selection with RBENV_VERSION while .ruby-version is present
$ export RBENV_VERSION=2.5.1

# Verify selection change
# .ruby-version is ignored.
$ ruby --version
ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-darwin20] # Result

$ rbenv version
2.5.1 (set by RBENV_VERSION environment variable) # Result

# Change to a version that is not installed & remove RBENV_VERSION
$ unset RBENV_VERSION & : >> .ruby-version && echo "2.4.1" >> .ruby-version

# Verify selection change
$ ruby --version
rbenv: version `2.4.1' is not installed (set by full/path/to/current/directory/.ruby-version) # Result
```

### 3. Shims và Rehashing
Hai khái niệm này cần được hiểu đúng để có thể gỡ lỗi `rbenv` một cách hiệu quả.

`Shims` là các tập lệnh cơ bản nhẹ tồn tại trong `PATH` để chặn các lệnh và định tuyến chúng đến phiên bản thích hợp để thực thi. Ở cấp độ cao, mọi lệnh (ví dụ rspec:) đều được dịch sang `rbenv exec rspec`. Xem chi tiết bên dưới.

Đầu tiên, `rbenv` tạo một  *shim* cho tất cả các lệnh *( rspec, bundlev.v.)* trên tất cả các phiên bản Ruby đã cài đặt để chặn các lệnh gọi đến CLI bất kể phiên bản nào. Những *shim* này có thể được tìm thấy tại `~/.rbenv/shims`. Mỗi *shim* chứa cùng một tập lệnh *bash*, như được hiển thị bên dưới:
```
#!/usr/bin/env bash
set -e
[ -n "$RBENV_DEBUG" ] && set -x

program="${0##*/}"
if [ "$program" = "ruby" ]; then
   for arg; do
     case "$arg" in
     -e* | -- ) break ;;
     */* )
        if [ -f "$arg" ]; then
         export RBENV_DIR="${arg%/*}"
         break
       fi
       ;;
     esac
   done
 fi

 export RBENV_ROOT="/home/directory/.rbenv"
 exec "/usr/local/Cellar/rbenv/1.1.2/libexec/rbenv" exec "$program" "$@"
```

Tiếp theo, đoạn script trên tạm dịch như sau:

* Nếu tên chương trình ruby có đối số `-e`
    * Dịch sang `rbenv exec ruby <args>`
* Nếu tên chương trình ruby có đường dẫn đến tập lệnh,
    * Đặt vào thư mục *RBENV_DIR* của tập lệnh. Điều này cho phép `rbenv` tìm kiếm `.ruby-version` trong thư mục của tập lệnh trước *$PWD.* Nếu  `.ruby-version` được chỉ định ở cả hai vị trí, `rbenv` chọn thư mục của script.
* Nếu tên chương trình không phải là Ruby,
   * Dịch sang `rbenv exec <program-name> <args>`.

Cuối cùng, `rbenv exec <command-name> <args>` xác định phiên bản chính xác để chuyển lệnh bằng cách kiểm tra biến môi trường `RBENV_VERSION` . Hãy nhớ rằng, `RBENV_VERSION` được thiết lập bởi thuật toán được xác định ở trên.

*Shims* trên *PATH* phải được dán sẵn ; điều này đảm bảo chúng là điểm liên hệ đầu tiên cho các tệp thực thi Ruby của bạn và có thể chặn đúng cách. Cách tốt nhất tôi tìm thấy để hiểu *PATH* thiết lập của bạn và biết liệu shim của bạn có đang chặn đúng cách hay không là như sau:
```
$ which -a bundle

/path/to/home/.rbenv/shims/bundle
/usr/bin/bundle
```

*which -a bundle*: cái này nhìn qua `PATH` và in ra theo thứ tự tìm thấy, vị trí `bundle` có thể tìm thấy. Nếu nội dung nào đó được in trước bất kỳ thứ gì bên trong `~/.rbenv/shims`, điều đó có nghĩa là shim của bạn không được thiết lập đúng cách. `rbenv which bundle` sẽ không tiết lộ điều này vì lệnh hoạt động trong bối cảnh `rbenv` không tìm kiếm *PATH* của bạn.

*Rehashing* là quá trình tạo *shims*. Khi bạn mới cài đặt một gem, Ruby cung cấp một tệp thực thi, chẳng hạn như rspec, bạn cần chạy `rbenv rehash` để tạo `shim` để các lệnh gọi tiếp theo rspec có thể bị chặn rbenv và chuyển sang phiên bản Ruby thích hợp.
## 4. RubyGems
Tiếp theo là *Ruby Gems*. Nó có sẵn từ trang Ruby chính thức. *Ruby Gems* là một hệ thống đóng gói Ruby được thiết kế để tạo điều kiện thuận lợi cho việc tạo, chia sẻ và cài đặt thư viện; về mặt nào đó, nó là một hệ thống đóng gói phân phối tương tự như `apt-get`, nhưng được nhắm mục tiêu vào phần mềm Ruby. *RubyGems* là phương thức de-facto để chia sẻ *gems*. Chúng thường được cài đặt tại `~/.rbenv/versions/{version-number}/lib/ruby/gems/{minor-version}/`hoặc biến thể của nó, tùy thuộc vào trình quản lý phiên bản nào được sử dụng. Phương thức bắt buộc mặc định của Ruby `Kernel.require `không cung cấp bất kỳ cơ chế nào để tải gem từ thư mục cài đặt Gems. `Rubygems` `monkey-patches Kernel.require` để

* Đầu tiên, tìm kiếm gem trong *$LOADPATH*.
* Nếu không tìm thấy, hãy tìm kiếm gem trong *GEMS INSTALLATION DIRECTORY*.
   * Sau khi tìm thấy, hãy thêm đường dẫn đến *$LOADPATH*.

Điều này hoạt động "nguyên bản" vì Ruby đã đi kèm với *RubyGems* theo mặc định kể từ phiên bản 1.9; các phiên bản Ruby trước yêu cầu *RubyGems* phải được cài đặt theo cách thủ công. Mặc dù điều này hoạt động tự nhiên, điều quan trọng là phải biết sự khác biệt này khi gỡ lỗi.

*Gem* là một loạt các codes liên quan được sử dụng để giải quyết một vấn đề cụ thể. Cài đặt một gem và nhận thông tin về môi trường gem như sau:
```
$ gem install gemname
$ gem env

RubyGems Environment: 
    - RUBYGEMS VERSION: 3.1.2 
    - RUBY VERSION: 2.7.1 (2020-03-31 patchlevel 83) [x86_64-darwin20] 
    - INSTALLATION DIRECTORY: /path/to/home/.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0 
    - USER INSTALLATION DIRECTORY: /path/to/home/.gem/ruby/2.7.0 
    - RUBY EXECUTABLE: /path/to/home/.rbenv/versions/2.7.1/bin/ruby 
    - GIT EXECUTABLE: /usr/bin/git 
    - EXECUTABLE DIRECTORY: /path/to/home/.rbenv/versions/2.7.1/bin 
    - SPEC CACHE DIRECTORY: /path/to/home/.gem/specs 
    - SYSTEM CONFIGURATION DIRECTORY: /path/to/home/.rbenv/versions/2.7.1/etc 
    - RUBYGEMS PLATFORMS:   
        - ruby   
        - x86_64-darwin-20 
    - GEM PATHS:    
        - /path/to/home/.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0    
        - /path/to/home/.gem/ruby/2.7.0 
    - GEM CONFIGURATION:    
        ...
    - REMOTE SOURCES:    
        - https://rubygems.org/ 
    - SHELL PATH:    
        - /path/to/home/.rbenv/versions/2.7.1/bin
```

*RubyGems* giải quyết vấn đề này như thế nào? Nó *monkey-patches* yêu cầu của hệ thống Kernel  bằng `require` của nó . Với vị trí tại chỗ này, khi `require honeybadger` được gọi, nó sẽ tìm kiếm trong thư mục `gems honeybadger.rb`và kích hoạt gem khi được tìm thấy.

Ví dụ:` require 'honeybadger'` tạo ra một cái gì đó tương tự như sau:

```
spec = Gem::Specification.find_by_path('honeybadger')
spec.activate
```
Kích hoạt một gem chỉ đơn giản là đặt nó vào *$LOADPATH*. *RubyGems* cũng giúp tải xuống tất cả các dependencies của một gem trước khi tải gem đó xuống.

Ngoài ra, *Rubygems* có một tính năng tuyệt vời cho phép bạn mở thư mục của gem được liên kết với `gem open <gem-name>`
    
##  5. Bundler
    
 Tại lớp này, *Bundler* giúp chúng tôi dễ dàng chỉ định tất cả các phụ thuộc dự án của mình và tùy chọn chỉ định phiên bản cho mỗi phần. Sau đó, nó phân giải các gem của chúng ta, cũng như cài đặt nó và các phụ thuộc của nó. Việc xây dựng pre-packler các ứng dụng trong thế giới thực đi kèm với vô số thách thức, chẳng hạn như sau:

* Các ứng dụng của chúng ta tồn tại với nhiều *dependencies* và những *dependencies* này có nhiều dependencies khác và các phiên bản tương ứng của chúng. Việc cài đặt sai phiên bản của một gem sẽ dễ dàng phá vỡ ứng dụng  và việc khắc phục sự cố này đòi hỏi rất nhiều nước mắt.
* Ngoài ra, hai (2) *dependencies* của chúng ta có thể tham chiếu đến cùng một *dependencies* cấp ba. Tìm kiếm khả năng tương thích là một vấn đề.
* Khi có nhiều ứng dụng trên cùng một máy, với nhiều *dependencies* khác nhau, ứng dụng có thể truy cập vào bất kỳ gem nào được cài đặt trên máy, điều này đi ngược lại nguyên tắc [least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) và để ứng dụng hiển thị với tất cả các gem được cài đặt trên máy.

*Bundler* giải quyết tất cả ba vấn đề và cung cấp một cách lành mạnh để quản lý *dependencies* vào ứng dụng bằng cách thực hiện như sau.
###     1. Bundler giải quyết các *dependencies* và tạo một tệp *lockfile*:
 
```
# Gemfile
gem 'httparty'
```
Nếu chúng tôi chạy bundlehoặc bundle install, nó sẽ tạo ra tệp khóa:
```
GEM
  specs:
    httparty (0.18.1)
      mime-types (~> 3.0)
      multi_xml (>= 0.5.2)
    mime-types (3.3.1)
      mime-types-data (~> 3.2015)
    mime-types-data (3.2020.1104)
    multi_xml (0.6.0)

PLATFORMS
  ruby

DEPENDENCIES
  httparty

BUNDLED WITH
   2.1.4
```
Từ phần trên, trình gói tạo ra phiên bản `httparty` sẽ được cài đặt, cũng như các *dependencies* của riêng nó trong `Gemfile.lock`.Tệp này là bản thiết kế của các *dependencies*  củaứng dụng và nên được kiểm tra trong kiểm soát version. Nó đảm bảo rằng các *dependencies* của dự án nhất quán giữa các môi trường (develop, staging hay production).
###  2. Bundler giải quyết khả năng tương thích giữa các phụ thuộc
   Nó giải quyết các *dependencies* `httparty` bằng cách tìm một phiên bản phù hợp cho các *dependencies* của nó và chỉ định chúng. *Bundler* cũng cố gắng giải quyết *dependencies* giữa các gem. Ví dụ,
```
# Gemfile
gem 'httparty' # That relies on gem 'mime-types', '>= 3.0.1, < 4.0.1'
gem 'rest-client' # That relies on gem 'mime-types', '>= 2.0.1, < 3.0'
```
   Ví dụ trên là tùy ý và sẽ dẫn đến lỗi, chẳng hạn như sau:
    
```
Bundler could not find compatible versions for gem "mime-types":
In Gemfile:
    httparty was resolved to 0.18.1, which depends on
        mime-types ('>= 3.0.1, < 4.0.1')

    rest-client was resolved to 2.0.4, which depends on
        mime-types ('>= 2.0.1, < 3.0')
```
    
Điều này là do hai gem có các *dependencies* không tương thích và không thể tự động giải quyết.
    
*Bundler* hạn chế quyền truy cập vào các gem được cài đặt nhưng không được chỉ định trong *Gemfile*
Trong một tệp gem mẫu như sau,

```
# Gemfile
gem 'httparty'

# irb
require 'rest-client'

# raises
LoadError (cannot load such file -- rest-client)
```
nó đảm bảo rằng *Gemfile* chỉ có thể yêu cầu các *dependencies* được chỉ định.

### 3. Bundle exec
Khi bạn chạy rspec trong thư mục dự án, có khả năng chạy một phiên bản khác với phiên bản đã được chỉ định trong *Gemfile*. Điều này là do phiên bản mới nhất sẽ được chọn để chạy so với phiên bản được chỉ định trong *Gemfile*. `bundle exec rspec` đảm bảo rspec được chạy trong bối cảnh của dự án đó (tức là, các gem được chỉ định trong *Gemfile*).

### 4. Bundle binstubs
*Binstubs* là các trình bao bọc xung quanh các tệp thực thi Ruby để dễ sử dụng `bundle exec`.

Để cho một **binstub** chạy, hãy sử dụng `bundle binstubs gem-name`. Điều này tạo ra một *binstub* trong thư mục `./bin` nhưng có thể được định cấu hình với thư mục` --path`  nếu được đặt.

Tham khảo và xem thêm:

[* How Do Gems Work?](https://www.justinweiss.com/articles/how-do-gems-work/)

[* Rbenv](https://github.com/rbenv/rbenv)

[* RubyGems](https://rubygems.org/)

[* Bundler](https://bundler.io/)