Nhờ các công cụ được tích hợp ngay trong RubyGems, việc tạo và xuất bản 1 gem vô cùng đơn giản. Trước khi đưa ra một số lưu ý khi viết gem, hãy cùng mình build 1 gem demo nhé.

# Tạo 1 gem đơn giản
## 1. Xây dựng gem

Cấu trúc cơ bản của 1 gem như sau:
```
$ tree
.
├── beautycode.gemspec
└── lib
    └── beautycode.rb
```

Code của gem được đặt trong thư mục `lib`.  Trong thư mục lib, có 1 file `.rb`,  cùng tên với gem, file này sẽ được load khi ta `require beautycode`. Ví dụ ở đây là file `beautycode.rb`.  Logic code trong `lib/beautycode.rb` khá đơn giản,  nó mục đích chỉ để ta thấy ý nghĩa của gem. Còn mọi xử lý logic chính của gem sẽ được sắp xếp hợp lí trong các file/thư mục khác, nhưng vẫn sẽ bên trong `lib`. Với ví dụ đơn giản này thì chỉ có 1 file `beautycode.rb`

```
$ cat lib/beautycode.rb
class Beautycode
  def self.hi
    puts "Hello world!"
  end
end
```

## 2. Gemspec
Gemspec xác định những gì có trong gem, ai đã tạo ra nó và phiên bản của gem. Nó cũng là những thông tin của bạn khi hiển thị gem trên RubyGems.org. Tất cả thông tin bạn thấy trên trang gem đều đến từ gemspec.
```
$ cat beautycode.gemspec 
Gem::Specification.new do |s|
  s.name        = 'beautycode'
  s.version     = '0.0.0'
  s.summary     = "Beautycode!"
  s.description = "A simple hello world gem"
  s.authors     = ["lanhnth-1450"]
  s.email       = 'nguyen.thi.huyen.lanh@sun-asterisk.com'
  s.files       = ["lib/beautycode.rb"]
  s.homepage    =
    'https://rubygems.org/gems/beautycode'
  s.license       = 'MIT'
end
```

## 3. build gem
Sau khi tạo file `.gemspec`, bạn có thể build gem. Sau đó cài gem ở local để có thể test luôn. 
```
$ gem build beautycode.gemspec
Successfully built RubyGem
Name: beautycode
Version: 0.0.0
File: beautycode-0.0.0.gem

$ gem install ./beautycode-0.0.0.gem
Successfully installed beautycode-0.0.0
1 gem installed
```

## 4. sử dụng gem
Cuối cùng hãy thử dử dụng gem mình vừa tạo:
```
$ irb
>> require 'beautycode'
=> true
>> Beautycode.hi
Hello world!
```


## 5. push gem

Đầu tiên chúng ta cần tạo một tài khoản ở trên trang https://rubygems.org để có thể publish gem lên trên đó. Sau khi tạo tài khoản xong, đăng nhập ở local bằng Command Line:
```
$ curl -u your_user_name https://rubygems.org/api/v1/api_key.yaml >~/.gem/credentials; chmod 0600 ~/.gem/credentials
Enter host password for user 'your_user_name':
```

Nhập account mà bạn vừa đăng kí vào. Đến đây bạn có thể publish gem từ local lên https://rubygems.org bằng Command Line được rồi.

Tiếp theo, chúng ta cần build gemspec

```
$ gem build beautycode.gemspec 
  Successfully built RubyGem
  Name: beautycode
  Version: 1.0.9
  File: beautycode-1.0.9.gem
```
Sau đó là push lên https://rubygems.org bằng:

```
$ gem push beautycode-1.0.9.gem
Pushing gem to https://rubygems.org...
Successfully registered gem: beautycode (1.0.9)
```

Sau 1 vài bước ở trên, mình đã build được 1 chú gem public trên đây: https://rubygems.org/gems/beautycode

Trong phạm vi bài viết này, mình sẽ không trình bày chi tiết các bước để build 1 gem, để tìm hiểu đầy đủ hơn, bao gồm việc viết test cho gem, bạn có thể tham khảo thêm ở [đây](https://guides.rubygems.org/make-your-own-gem/)
Bây giờ, mình sẽ tổng hợp 1 số vấn đề hay gặp trong quá trình viết gem nhé.

# Một số lưu ý

## 1. có 2 cách để bắt đầu với ruby gem ## 
Ban đầu mình hơi bị rối, vì đọc 2 bài mà 1 bài thì tạo file `beautycode.gemspec` (cách 1), 1 bài thì dùng `bundle` như này (beautycode là tên gem)
Cách 2:
```
bundle gem beautycode
```
Cơ bản 2 cách này đều phục vụ mục đích build gem. Khác nhau ở chỗ dùng bundle thì phù hợp để phát triển gem (chạy thử, chỉnh sửa, viết test cho gem). Còn cách 1, đơn giản nhất, bạn chỉ cần 1 file `.gemspec`, 1 thư mục `lib`  chứa code của gem và config version. Sau đó build rồi push gem thôi. Cách 1 phù hợp khi bạn đã có sẵn source code. Còn init ban đầu để phát triển 1 gem, ta dùng `bundle` nha.

Khi làm theo cách 1, có thể bạn chỉ cần 5p để sở hữu 1 gem cho mình, tham khảo cách tạo demo 1 gem mình chia sẻ ở phần giới thiệu nhé. 


## 2. build 1 gem mà tên gem đã tồn tại ?

Được chứ :v Tuy nhiên bạn sẽ không thể push gem lên rubygems.org được. Vì có rất nhiều file và source code có liên quan đến tên gem, nên việc đổi tên gem khá mất thời gian. Vậy nên trước khi build gem, nhớ check xem gem đó đã tồn tại trên service host mà bạn sẽ push chưa nhé.

Chi tiết hơn, bạn có thể xem thêm về hướng dẫn cách đặt tên gem, version, và tên những gem liên quan ở đây nhé:  https://guides.rubygems.org/patterns/#consistent-naming


## 3. publish gem
Với những cấu hình ở  `.gemspec` ta sẽ tiến hành publish gem lên host service. Nhớ trước khi push gem thì build lại 1 lần để đảm bảo cập nhật thông tin. Để thuận tiện cho việc phát triển và sử dụng gem, thì version rất quan trọng.

Vì vậy, mỗi lần update code, lúc build và push gem, ta có thể chỉnh sửa version trong file beautycode/lib/beautycode/version.rb và push đúng version gem vừa build. 
Ví dụ sửa version
```
# beautycode/lib/beautycode/version.rb
module Beautycode
  VERSION = "1.1.0"
end
```
sửa version trong .gemspec
```
$ cat beautycode.gemspec 
Gem::Specification.new do |s|
  s.name        = "beautycode"
  s.version     = Beautycode::VERSION
  s.summary     = "Beautycode!"
  s.description = "A simple hello world gem"
  s.authors     = ["lanhnth-1450"]
  s.email       = 'nguyen.thi.huyen.lanh@sun-asterisk.com'
  s.files       = ["lib/beautycode.rb"]
  s.homepage    =
    'https://rubygems.org/gems/beautycode'
  s.license       = 'MIT'
end
```

```
# build gem
gem build beautycode.gemspec
```

```
# push gem
gem push beautycode-1.1.0.gem
```

Thành quả: 
![](https://images.viblo.asia/82bae599-7825-4aac-995e-d2d4eb32cc96.png)  


## 4. private gem cho dự án riêng ?
Yes. Hoàn toàn có thể. Thực hiện các thao tác build gem như bình thường, sau đó, không push lên rubygem mà push lên private repository trên github hoặc sử dụng ở local. Có một số cách dùng như sau:

### i. putting the username and password into the URL
Theo như gợi ý từ Heroku, thì cách dễ nhất là đặt cả user_name và pw vào url như này: 
```
gem 'my_gem', :git => 'https://my_username:my_password@github.com/my_github_account/my_repo.git', :ref => 'revision_no'
```
Cái này thì hoạt động tốt, tuy nhiên việc đặt pw vào Gemfile có vẻ không được hay cho lắm. Do đó bạn có thể tạo mới 1 github accout mới, và add user đó vào repo git. Nó chưa phải là an toàn tuyệt đối, tuy nhiên vẫn hơn là đặt password vào Gemfile.

Có 2 cách khác tôi thấy hay hơn, như này: 

### ii. set up your own gem server: 
```
gem sources -a http://mygemserver.mycompany.com:8808
gem install my_private_gem
```

### iii. vendor the gem:
```
gem 'my_gem', :path => 'vendor/private_gems/my_gem-0.0.2'
```

Phần setup gem server mình chưa tìm hiểu chi tiết, nên để hiểu chi tiết hơn bạn có thể xem ở đây nhé: https://olemortenamundsen.wordpress.com/2010/09/13/working-with-private-rubygems-in-rails-3-deploying-to-heroku/

# Tổng kết
Bài viết có tham khảo từ nhiều nguồn và có kết hợp kinh nghiệm của mình, hy vọng những điều mình chia sẻ ở trên có ích với bạn, cảm ơn đã đọc đến đây. 


# Tham khảo

https://dev.to/morinoko/5-things-i-learned-from-creating-my-first-ruby-gem-from-scratch-1l9i

https://www.jetbrains.com/help/ruby/creating-and-publishing-your-first-ruby-gem.html#gemspec

https://www.sitepoint.com/creating-your-first-gem/