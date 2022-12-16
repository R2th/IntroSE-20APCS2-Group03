Bất kỳ rubyist nào cũng đều vô cùng quen thuộc với khái niệm về Gem, ngay cả Rails cũng là một Gem của Ruby. Nếu làm về ruby hoặc cụ thể hơn là rails thì việc sử dụng Gem sẽ giúp chúng ta tiết kiệm thời gian rất nhiều khi có thể tái sử dụng các thư viện sẵn có, từ đó cải thiện hiệu năng công việc. Tuy nhiên bạn đã bao giờ đặt câu hỏi Gem được viết như thế nào? hay khi bạn muốn tái sử dụng hoặc chia sẻ cho cộng đồng một thư viện nào đó do chính bạn viết thì sẽ phải làm như thế nào chưa? Bài viết này sẽ giúp bạn nhanh chóng tiếp cận cách tạo ra một Gem thông qua việc làm một Gem đơn giản.

## Cấu trúc một GEM 

Để có thể viết được một GEM thì ta cần tìm hiểu cấu trúc tổ chức thư mục hay các file phải có của một gem nhé. Cách tạo ra cấu trúc này mình sẽ nói ở phần sau, còn bây giừo chúng ta hãy xem cấu trúc một gem sẵn có nhé.

![](https://images.viblo.asia/c7913195-ab07-43fd-b4bb-3336703495e0.png)

Như trong hình ta có thể thấy:
* **bin**: Chứa các bash script để tự động hoá các tác vụ khi người dùng cài đặt một GEM.
* **exe**: Chứa file thực thi để biến GEM thành các ứng dụng độc lập. Ví dụ như gem geocoder, sass... Đây là thư mục tuỳ chọn không nhất thiết phải có.
* **lib**: Nơi chứa code chính của GEM.
* **test**: Phục vụ cho việc viết test cho GEM
* **Gemfile**: Khi bạn muốn sử dụng lại một thư viện sẵn có thì đây là nơi bạn sẽ điền các GEM mong muốn vào. Hoạt động tương tự như ở rails, nó sẽ tự động tải các GEM có trong này về máy để có đủ môi trường sử dụng cho ứng dụng của bạn.
* **Rakefile**: Khi bạn muốn thực hiện những tác vụ tự động với gem như việc run test.
* **[filename].gemspec**: File mô tả GEM của bạn, giúp ruby có thể build ra GEM, nó giống như các file package.json ở nodejs.
* **[filename]-[version].gem**: Đây chính là GEM sau đã được build, nó sẽ là file bạn sẽ chia sẻ cho người khác hoặc up lên các gemserver để chia sẻ.
* Ngoài ra còn rất nhiều file linh tinh đi kèm :D

## Xây dựng GEM thực tế
Không có cách tìm hiểu nào hiệu quả hơn việc trực tiếp thực hành nó. Sau đây mình sẽ tiến hành xây dựng một GEM đơn giản để xem GEM hoạt động như thế nào. Trước khi bắt đầu mình coi như các bạn đã có những thứ sau trong máy:

* ruby > 2.0
* gem i bundler
* với editor mình dùng Rubymine

### 1. Ý tưởng
Mình sẽ viết một gem mà có thể chạy được trên terminal để tìm kiếm và trả về những question trên stackoverflow.
Dòng lệnh có dạng 
```
$ googem -k "keyword" -p 1 -s 10
```
trong đó 
* -k là đối số bắt buộc chứa keyword của người dùng cần tìm 
* -p là trang thứ bao nhiêu (tuỳ chọn)
* -s là số kết quả trên một trang (tuỳ chọn)

Cùng bắt đầu nào
### 2. Tạo cấu trúc gem và môi trường phát triển.
Để generate ra cấu trúc một gem ta sử dụng lệnh sau.

```
$ bundle gem googem --exe --coc --no-ext --mit --test=minitest
```
Trong đó **googem** là tên gem thôi, bạn thích để thế nào cũng được. Các đối số sau là để tạo ra file thực thi cho gem, sử dụng thư viện test nào.

Sau khi tạo ra generate bạn sẽ thấy trong thư mục vừa tạo ra sẽ có file **[filename].gemspec** bạn tiến hành sửa một vài thông tin trong đó, những mục cần sửa thì đều có chữ TODO. Các mục sửa đều là thông tin thêm về GEM như tên, tác giả, tác phẩm, bla..bla.. 

Đảm bảo sau khi sửa hết những mục có chữ TODO hãy chạy lệnh để build GEM.

```
$ gem build [filename].gemspec
```

Lệnh này sẽ tạo ra file đóng gói của GEM theo dạng **[filename]-[version].gem**. filename là tên gem, version là phiên bản, bạn có thể thay đổi trong thư mục **lib/[gemname]/version.rb**

Khi đã có gem hãy cài đặt gem vào local để có thể tiến hành phát triển va kiểm thử. Câu lệnh cài đặt gem cũng rất quen thuộc, bạn sẽ cài đặt gem thông qua file có đuôi `.gem`:
```
$ gem i ./[filename]-[version].gem
```
Như của mình thì sẽ là:
```
gem i ./googem-0.1.0.gem
```

### 3. Tiến hành code 
1. **Chỉnh sửa file thực thi `exe/[tên gem]`** 

    Vì ứng dụng của mình ban đầu là dạng ứng dụng độc lập sử dụng đối số dòng lệnh nên mọi thứ sẽ bắt đầu từ file thực thi `exe/googem`. Để dễ quản lý code mình tạo 1 file để handle cũng như giúp xử lý các đối số dòng lệnh khi chạy chương trình. Mình sẽ sửa file này như sau.

    ```ruby
    #!/usr/bin/env ruby

    require "googem/cli"

    Googem::Cli.run ARGV
    ```
    Như vậy công việc tiếp theo của chúng ta là tạo ra một file `cli.rb` trong đó có hàm `run` với đối số  ARGV rất quen thuộc khi lập trình với đối số dòng lệnh. Cùng chuyển qua bước tiếp nào :p 

2. **Quản lý đối số dòng lệnh**
    
    Để làm việc với đối số dòng lệnh thì mình sẽ sử dụng một lib dựng sẵn của ruby để giải quyết vấn đề này. Library này có tên là `optparse` sẽ giúp chúng ta xây dựng một bộ khung để parse các đối số. Hơn nữa chúng ta có thể validation các đối số dễ dàng hơn. Mọi người có thể đọc thêm docs của nó [tại đây](https://docs.ruby-lang.org/en/2.1.0/OptionParser.html)
    
    Dưới đây là file Cli của mình: 
    `googem/lib/googem/cli.rb`
    
    ```ruby
    require 'optparse'
    require 'googem'

    module Googem
      class Cli
        def self.run args, out = STDOUT
          options = {page: 1, size: 5}
          ARGV << '-h' if ARGV.empty?
          parser = OptionParser.new do |opts|
            opts.banner = "Usage: googem [options]"

            opts.on("-v","--version", "Show googem version") do
              require "googem/version"
              out << "Googem v#{Googem::VERSION}\n"
              exit
            end

            opts.on("-k","--keyword KEYWORDS", String, "Search by keyword \"keywords\", eg: $ googem -k \"ruby\"") do |keywords|
              options[:keywords] = keywords ||= nil
            end

            opts.on("-p","--page [page]", Integer, "Page number") do |page|
              options[:page] = page
            end

            opts.on("-s","--size [size]", Integer, "Page size") do |size|
              options[:size] = size
            end

            opts.on_tail("-h", "--help", "Show list commands") do
              puts opts
              exit
            end
          end
          begin
            parser.parse! args
          rescue
            puts "An unknown error. Try again with new keywords."
          end
          Googem::Search.do options[:keywords], options
        end
      end
    end
    ```
    
    Để có thể dễ dàng test cũng như debug chương trình ta nên cài đặt gem vào hệ thống ngay từ ban đầu:
    
    ```bash
    $ gem build googem.gemspec 
    $ gem i ./googem-0.1.0.gem 
    ```
    Ta có thể test luôn giao diện ta vừa mới viết, nhìn cũng ổn nưng mỗi tội chả có gì :v :
    ```bash
    $ googem
    Usage: googem [options]
    -v, --version                    Show googem version
    -k, --keyword KEYWORDS           Search by keyword "keywords", eg: $ googem -k "ruby"
    -p, --page [page]                Page number
    -s, --size [size]                Page size
    -h, --help                       Show list commands
    ```
    Như các bạn thấy tất cả các đối số của chúng ta sẽ được xử lý thông qua hàm dạng
    ```ruby
    opts.on("-x","--xxx", "xxx description") do
        # TODO
    end
    ```
    Các đối số sẽ đc parse và nhận biết qua từng khối `on` đó. Nghĩa là chương trình bạn có tối đa bao nhiêu đối số thì sẽ có bấy nhiêu hàm đoạn code trên. Chúng sẽ đi qua lần lượt từng khối code từ trên xuống dưới. Chính vì lý do đó mình có đặt một biến `options` để lưu giá trị mặc định của các đối số cũng như sẽ ghi nhận lại các giá trị nếu đối số được parse hay tồn tại. Các bạn cũng có thể đọc thêm docs của `optparse` để quy định kiểu giá trị đối số, kiểu đối số là require hay là option. Trong trường hợp người sử dụng không nhập đối số nào ta sẽ cho một đối số mặc định. 
    ```ruby
    ARGV << '-h' if ARGV.empty?
    ```
    Có những trường hợp ta không cần phải duyệt qua những đối số khác thì hãy thêm `exit` vào cuối block, ví dụ như lúc user kiểm tra --version hay --help.
    Như code bên trên thì đây chỉ là file để xử lý, parse các đối số, còn khi có các đối số rồi thì logic xử lý ta sẽ đút hết vào file khác sau đó gọi nó. Cụ thể ở đây là: 
    ```ruby
    Googem::Search.do options[:keywords], options
    ```
    Như vậy ta cần xây dựng một file search.rb có hàm `do` đầu vào là 2 đối số tỏng đó quan tọng nhất là đối số  keywords. Let do it!
    
3. **Code Code Code**

    Về cơ bản phần code này ai cũng có thể viết và tùy biến tùy vào mục đích của mình rồi. ở đây mình chỉ viết một vài điểm chính để mọi người hiểu hơn. Còn code như thế nào thì tùy bạn thích :p. Chi tiết code bạn có thể tham khảo tại repo github của mình đã viết sẵn:
    - Gem googem https://github.com/ohmygodvt95/googem
    - Stackoverflow API: https://api.stackexchange.com/docs/advanced-search
    
    3.1 **Sử dụng thư viện trong ứng dụng của bạn.**
    
      Dễ  dàng tích hợp thêm các thư viện khác bằng cách thêm vào các gem trong Gemfile. Dưới đây là Gemfile của mình: `Gemfile`
      ```ruby
        source "https://rubygems.org"
        git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }
        
        gem 'unirest' # dùng để tạo http request gọi api của stackoverflow
        gem 'oj'
        gem 'tty-spinner' # tạo hiệu ứng loading trên console giống mấy ứng dụng pro ấy :v
        gem 'tty-pager' # phân trang dành cho khi nội dung quá dài.
        gem 'tty-prompt' # tạo menu nhập liệu bằng console
        
        gemspec
      ```
        
      Khi sử dụng ở đâu bạn chỉ cần `require thư_viện` tương ứng là xong. Easy game! 
      
    3.2 **Phân chia code thành các file có nhiệm vụ chuyên biệt.**
      
      Nên chia nhỏ các function, file chạy ra để sau này dễ  bảo trì cũng như người khác đọc vào dễ hiểu. Ví dụ ở đây mình có thêm file `helper.rb` để viết hàm xử lý về thời gian đơn giản và request để lấy thông tin bằng api.
      
      ```ruby
    require 'unirest'
    require 'oj'
    require 'tty-spinner'
    require 'tty-pager'
    require 'cgi'

    module Googem
      module Helper
        def self.minutes_in_words(timestamp)
          minutes = (((Time.now - timestamp).abs)/60).round

          return nil if minutes < 0

          case minutes
          when 0..4            then 'less than 5 minutes ago'
          when 5..14           then 'less than 15 minutes ago'
          when 15..29          then 'less than 30 minutes ago'
          when 30..59          then 'greater than 30 minutes ago'
          when 60..119         then 'greater than 1 hour ago'
          when 120..239        then 'greater than 2 hours ago'
          when 240..479        then 'greater than 4 hours ago'
          when 480..719        then 'greater than 8 hours ago'
          when 720..1439       then 'greater than 12 hours ago'
          when 1440..11519     then 'greater than ' << ((minutes/1440).floor.to_s + ' day ago')
          when 11520..43199    then 'greater than ' << ((minutes/11520).floor.to_s + ' week ago')
          when 43200..525599   then 'greater than ' << ((minutes/43200).floor.to_s + ' month ago')
          else                      'greater than ' << ((minutes/525600).floor.to_s + ' year ago')
          end
        end

        def self.show_question question_id
          url = "https://api.stackexchange.com/2.2/questions/#{question_id}?pagesize=10&order=desc&sort=activity&site=stackoverflow&filter=!)5s.rMpmn9TU*hMdF1gjTFCFqR0v"
          spinner = TTY::Spinner.new("[:spinner] Getting data #{question_id} ... ", format: :pulse_2)

          prompt = -> (page_num) { output.puts "Page -#{page_num}- Press enter to continue" }
          pager = TTY::Pager::BasicPager.new
          spinner.auto_spin

          response = Unirest.get url, headers:{ "Accept" => "application/json" }
          document =  JSON.parse response.raw_body
          content = "Q: #{document["items"][0]["title"]}\nA: #{document["items"][0]["link"]}\n";
          content << "# QUESTION\n----------------------------------------------------------\n"
          content << "#{CGI.unescapeHTML(document["items"][0]["body_markdown"])}\n\n"
          content << "# ANSWERS\n----------------------------------------------------------\n"

          if document["items"][0]["answers"].nil?
            content << "No answers\n"
          else
            document["items"][0]["answers"].each_with_index do |i, index|
              content << "▷　#{index+ 1} ◇　by　#{i["owner"]["display_name"]}  ◇　#{minutes_in_words Time.at(i["creation_date"])}\n"
              content << "▷　#{i["link"]}\n"
              content << "----------------------------------------------------------\n"
              content << CGI.unescapeHTML(i["body_markdown"]) + "\n----------------------------------------------------------\n"
            end
          end

          spinner.success('Done!') # Stop animation
          pager.page content.encode('utf-8')
        end
      end
    end
      ```
    
### 4. Cấu hình xuất bản gem
  Sau khi đã hoàn thành Gem của chính mình bạn có thể xuất bản cho người khác sử dụng. Giống như các gem thông thường bạn có thể đưa lên các dịch vụ lưu trữ như https://rubygems.org để publish. Hoặc sử dụng github để lưu trữ các file .gem. Để cấu hình việc xuất bản gem chúng ta trực tiếp chỉnh sửa lên file `.gemspec`
  Chúng ta sẽ cùng xem xét `.gemspec` sau để hiểu rõ hơn:
      
  ```ruby
    # googem/googem.gemspec
    lib = File.expand_path("../lib", __FILE__)
    $LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
    require "googem/version"

    Gem::Specification.new do |spec|
      spec.name          = "googem"
      spec.version       = Googem::VERSION
      spec.authors       = ["ThienLV"]
      spec.email         = ["ohmygodvt95@gmail.com"]

      spec.summary       = %q{Use stackoverflow.com with commandline interface. Happy coding.}
      spec.description   = %q{Use stackoverflow.com with commandline interface. No browsers, no interface, only terminal. LIKE a BOSS}
      spec.homepage      = "https://github.com/ohmygodvt95/googem.git"
      spec.license       = "MIT"
      
      spec.metadata["allowed_push_host"] = "https://rubygems.org"

      spec.add_dependency 'unirest'
      spec.add_dependency 'oj'
      spec.add_dependency 'tty-spinner'
      spec.add_dependency 'tty-pager'
      spec.add_dependency 'tty-prompt'
      # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
      # to allow pushing to a single host or delete this section to allow pushing to any host.
      if spec.respond_to?(:metadata)
        spec.metadata["allowed_push_host"] = "https://rubygems.org"
      else
        raise "RubyGems 2.0 or newer is required to protect against " \
          "public gem pushes."
      end

      # Specify which files should be added to the gem when it is released.
      # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
      spec.files         = Dir.chdir(File.expand_path('..', __FILE__)) do
        `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
      end
      spec.bindir        = "exe"
      spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
      spec.require_paths = ["lib"]

      spec.add_development_dependency "bundler", "~> 1.16"
      spec.add_development_dependency "rake", "~> 10.0"
      spec.add_development_dependency "minitest", "~> 5.0"
    end
  ```
  
  Các thông số  quan trọng gồm có: 
 
  ```
    spec.add_dependency 'unirest'
    spec.add_dependency 'oj'
    spec.add_dependency 'tty-spinner'
    spec.add_dependency 'tty-pager'
    spec.add_dependency 'tty-prompt'
  ```
  -> Đây là những thư viện mà ta muốn nó được cài đặt cùng với chương trình của chúng ta. Khi install gem thì những thư viện được khai báo ở đây sẽ tự động được cài cùng để đảm bảo chúng ta có đầy đủ các thư viện phụ thuộc.
  
  ```ruby
    spec.metadata["allowed_push_host"] = "https://rubygems.org"
  ```
  -> Đây là nơi chúng ta sẽ sử dụng để publish gem. Có nhiều dịch vụ cho phép ta làm điều này, thậm chí còn có thể  tự xây dựng một server. Ở đây mình sử dụng rubygems.org là một gem hosting service vô cùng phổ biến. Các bạn hãy tự tạo tài khoản trên đó nhé!
  
### 5. Publish your gem
  Với các bước cấu hình ở trên ta sẽ tiến hành publish lên gem host service sử dụng tài khoản mà bạn đã đăng ký ở rubygems.
  Trước tiên hãy build gem lại một lần để cập nhật thông tin. Lưu ý rằng với việc phát triển thì version của gem rất quan trọng. Với mỗi lần build chúng ta nên lưu lại file gem đã build để cho người sử dụng có thể sử dụng đc những phiên bản thấp hơn. Với mỗi lần update code, và tiến hành build lại bạn hãy chỉnh sửa version ở trong file `googem/lib/googem/version.rb`. Tiến hành build
  
  ```bash
  $ gem build [filename].gemspec
  ```
  
  Sau khi build chúng ta sẽ upload lên host service bằng lệnh:
  ```bash
  $ gem push googem-0.1.0.gem # gem push [name]-[version].gem
  
  Enter your RubyGems.org credentials.
    Password:
    Signed in.
    Pushing gem to RubyGems.org...
    Successfully registered gem: googem-0.1.0 (0.1.0)
  ```
  Khi thành công bạn có thể kiểm tra trên trang ruby gem, kết quả sẽ như ảnh sau:
  
  ![](https://images.viblo.asia/363dc043-c03b-4410-828b-5ee60ddbb70a.png)
  
  # Tổng kết
  Trên đây mình đã hướng dẫn xây dựng một gem đơn giản và tiến hành publish nó. Trong các bài viết sau mình sẽ hướng dẫn xây dựng gem dành riêng cho Rails. Dưới đây là một vài hình ảnh gem vui vui của mình :v: 
  ```
  $ gem i googem
  
    Fetching: addressable-2.3.8.gem (100%)
    Successfully installed addressable-2.3.8
    Fetching: json-1.8.6.gem (100%)
    Building native extensions. This could take a while...
    Successfully installed json-1.8.6
    Fetching: mime-types-1.25.1.gem (100%)
    Successfully installed mime-types-1.25.1
    Fetching: rest-client-1.6.9.gem (100%)
    Successfully installed rest-client-1.6.9
    Fetching: unirest-1.1.2.gem (100%)
    Successfully installed unirest-1.1.2
    Fetching: oj-3.6.12.gem (100%)
    Building native extensions. This could take a while...
    Successfully installed oj-3.6.12
....
  ```
  
![](https://images.viblo.asia/c3c62f68-54a5-40c4-bd3c-4feb25757809.gif)

  # Tham khảo
*   https://guides.rubygems.org/publishing/
*   https://guides.rubygems.org/make-your-own-gem/
*   https://docs.ruby-lang.org/en/2.1.0/OptionParser.html
*   https://piotrmurach.github.io/tty/
*   https://api.stackexchange.com/docs