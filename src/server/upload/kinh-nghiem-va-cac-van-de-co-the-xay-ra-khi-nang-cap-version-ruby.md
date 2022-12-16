# Giới thiệu
Thân chào các độc giả yêu quý! Mình vừa được trải nghiệm qua một task khá mới lạ đối với newbie như mình là nâng cấp version ruby trong dự án. Có thể nói trải nghiệm này mang lại cho mình nhiều kinh nghiệm và kiến thức. Hôm nay mình xin chia sẻ lại những kinh nghiệm đã có được nhằm giúp anh em sau này đỡ vất vả hơn nếu may mắn được làm những task liên quan đến update version nhé.

Bài viết hôm nay sẽ có những nội dung chính sau:
1. Quy trình và các bước làm
2. Các vấn đề xảy ra và kinh nghiệm khắc phục

Bắt đầu thôi nào!

# Quy trình và các bước làm

Mình có tham khảo trên mạng các bước làm và tìm được những kết quả chung chung như này:

> Update Ruby version => update các gem cho phù hợp => test lại => done!

Nghe có vẻ ngon ăn đấy, nhưng khi vào làm thì mới thấy nhiều vấn đề cần lưu tâm, và mình đúc kết lại quá trình chi tiết như sau:

1. Cài đặt ruby version mới, ở đây mình dùng rvm
    
    - Cài đặt rvm
    - rvm install <ruby_version>
    - rvm use <ruby_version_vừa_cài>
 
2. Vào dự án checkout ra nhánh mới để thực hiện update (điều dĩ nhiên)
3. Thay đổi version ruby của dự án trong file .ruby-version, nếu ko có file đó thì tìm trong gemfile. Ngoài ra search toàn bộ dự án, xem có chỗ nào config version của ruby thì phải thay đổi lại hết toàn bộ sang version mới
4. Kiếm tra bundle (Các gem có hoạt động ổn định không)
5. Kiểm tra các service có hoạt động ổn định sau khi update version không (Mysql, Redis, Sidekiq, Memcached,...)
6. Chạy test lại sau khi đã update
7. Config install, update version ruby trên server (nếu có)

# Các vấn đề xảy ra và kinh nghiệm khắc phục

## bundle install lỗi

### mysql2

Vấn đề đầu tiên và mình thấy là muôn thuở khi cài mới ruby version là lỗi gem mysql2:

> Error installing mysql2: ERROR: Failed to build gem native extension

Ở đây lỗi suggest bạn chạy `gem install mysql2 -v '0.5.x'` thì đừng nghe nó, chạy cũng lỗi thôi :joy: .Do phiên bản mới của ruby bị thiếu thư viện, nên chúng ta sẽ chạy command này để khắc phục vấn đề
> sudo apt-get install libmysqlclient-dev

### Các gem không tương thích

Tới đây nếu bạn nhìn vào log thì có thể thấy mysql được cài thành công rồi đấy! Tuy nhiên không phải chỉ có mỗi mysql2, một số gem nổi hứng lên nó vẫn sẽ lỗi ở giai đoạn này. Ở đây cần chú ý: 
> KHÔNG ĐƯỢC CHẠY BUNDLE UPDATE

Nếu chạy bundle update là nó sẽ toang luôn dự án đấy. Vì sao? Theo một câu nói của senior developer mà mình được nghe thì: "một số gem sẽ hoạt động tốt ở version này, nhưng sẽ hoạt động không ổn định trong version khác". Nếu chúng ta chạy bundle update thì những gem đang hoạt động ổn định nó sẽ update luôn. Trong trường hợp này chúng ta cần phải bình tĩnh xem xét xem là:
1. Những gem nào bị lỗi
2. Gem bị lỗi có phụ thuộc vào gem nào nữa không hay nó độc lập
3. Có cần update những gem nó phụ thuộc hay không

Để xem một gem có phụ thuộc vào gem nào khác hay không, sử dụng lệnh:
> gem dependency <gem_name>

Sau đó lựa chọn phương án update cho phù hợp, phù hợp như nào thì mình sẽ trình bày bên dưới!

## Update version sao cho an toàn?

### Lưu ý 1
Khi chạy `bnundle update <gem_name>` thì thường chúng ta sẽ nghĩ sẽ chỉ update mỗi gem mà mình chỉ định thôi. Nhưng không, cuộc đời đâu có màu hồng như vậy, nó sẽ update các gem mà nó phụ thuộc vào luôn, điều này dẫn đến hậu quả gì thì mình đã trình bày ở trên. Rất may mắn là từ phiên bản Bundler 1.14 trở lên có thêm option `--conservative`, nó sẽ update gem bạn chỉ định và ngăn bundler update bất kỳ gem nào mà nó phụ thuộc.
Như vậy chúng ta sẽ có:
> bundle update <gem_name> --conservative

Vậy nếu như dự án của bạn không may dùng bundler thấp hơn cái trên thì sao? Mình đã tham khảo và xin đưa ra 3 suggest như sau:
**Cách 1:**
- Tìm gem bạn muốn update trong gemfile
- Chỉ định version rõ ràng cho nó
- Chạy bundle install và xem xem có hiệu quả hay không

**Cách 2:**
- Thay đổi trực tiếp version của gem trong gemfile.lock
- bundle install

**Cách 3:**
- Chạy bundle update <gem_name>
- Xem các thay đổi của gemfile.lock bằng git, và sửa lại về ban đầu trừ gem bạn muốn update

### Lưu ý 2

Khi đã bundle thành công, bạn thực hiện tiếp quy trình các bước như chạy rails server, sidekiq, rails console, hoặc chạy rspec các thứ, vân vân và mây mây... Thì đâu đó sẽ gặp lỗi, giai đoạn này sẽ rất khó khăn và giải quyết được hay không phụ thuộc vào trình độ search google của bạn (newbie thôi chứ mấy đại ca tay to chắc không cần đâu :laughing: ) Chúng ta cần tìm hiểu xem rằng:
- Nguyên nhân dẫn tới lỗi là do đâu
- Lỗi đó có liên quan tới gem hay không
- Gem nào đang thực thi việc dẫn tới lỗi

Sau khi xác định đúng thằng gem (đừng xác định sai mà khổ) gây ra lỗi thì chúng ta sẽ thực hiện update nó theo những điều mình đã nói ở trên, sẽ có 2 trường hợp xảy ra:
**Trường hợp 1: Gem đó đã chưa update ở bước làm trước**

Ở trường hợp này chúng ta sẽ thực hiện update như bình thường, nhớ làm theo lưu ý 1

**Trường hợp 2: Gem đó đã được update ở bước làm trước**

Ở trường hợp này chúng ta cần quay về version trước của nó để xem xét xem gem này có những version nào, và chúng ta sẽ update TỪNG VERSION MỘT từ version ban đầu lên cao dần. Ví dụ version gem A hiện tại là 2.3.1, version cao nhất của nó là 2.4.10, thì chúng ta sẽ update rồi chạy thử từng version từ 2.3.1 lên 2.4.10 xem version nào thì chạy ok, để xem các version thì bạn cần xem nguồn của nó, ví dụ như trang https://rubygems.org

## Vấn đề về Rspec

Một kinh nghiệm nho nhỏ thôi. Trước khi update version ruby, bạn hãy đứng ở version cũ chạy test xem có fail những testcase nào không, nếu có thì note lại. Để làm gì? Trong quy trình làm mình trình bày ở trên thì có bước chạy test, bạn thực hiện chạy toàn bộ rspec xem có fail case nào không, nếu có thì sẽ so sánh với lúc trước khi update xem nó có khác nhiều lắm không, từ đó sẽ giảm lượng lớn thời gian ngồi fix. Lúc chạy tới bước này mình đã không làm như vậy nên đã phải switch lại môi trường rất mất thời gian, hơn nữa dự án mình đang tham gia khá là nặng, rspec chạy rất lâu (cỡ 2-3 tiếng) nên quay qua quay lại hết cả buổi.

Thông thường sẽ có các trường hợp sau:

1. Ban đầu chạy không fail, update xong thì fail => Theo kinh nghiệm thì do version của 1 gem không phù hợp với ruby version mới dẫn đến việc bị fails, cách khắc phục là bạn hãy đọc lại lưu ý 2 ở trên (update từng version một).
2. Ban đầu chạy fail, update xong thì fail nhiều hơn => Loại trừ những test ban đầu fail ra, tìm cách fix những test fail còn lại, hướng giải quyết như trường hợp 1.
3. Ban đầu chạy fail, update xong thì không fail => Chúc mừng bạn, bạn thật thần thánh!

# Kết luận
Trên đây mình đã chia sẻ những kinh nghiệm, cách khắc phục trong quá trình update version ruby trong một dự án. Hi vọng sẽ giúp những người anh em thiện lành đi sau cẩn thận hơn và không đi vào vết xe đổ của mình. Nếu anh em có ai có những kinh nghiệm thú vị hơn hoặc góp ý cho bài viết của mình thì hãy bình luận phía bên dưới để cùng nhau phát triển nhé. Cảm ơn mọi người đã đọc bài viết này. Chúc mọi người một ngày làm việc hiệu quả!

Happy coding!