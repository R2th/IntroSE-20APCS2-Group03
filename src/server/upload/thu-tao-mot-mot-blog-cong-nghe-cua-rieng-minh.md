### I. Lời mở đầu 
Nói đến blog chúng ta nghĩ ngay đến những thứ ban đầu như Yahoo! 360 hay gần đây hơn thì là những nền tảng như là Wordpress, Joomla, Blogspot v..v.. Nhưng dưới một góc độ của một lập trình viên không gì đẹp đẽ hơn 1 blog đơn giản, chú trọng vào nội dung và dễ dàng quản trị thông qua git repository của mình. Chắc hẳn mình vẫn muốn "chọc ngoáy" một chút vào code của mình, hay đơn giản là đôi khi mình cảm giác là làm việc với Interface nó cảm giác cứ thiếu độ linh hoạt và chuyên nghiệp nhất định, nên đôi khi làm việc với CLI lại là một điều tốt nhất. Ngoài ra thì bạn hoàn toàn có thể tự code cho mình 1 trang blog không cần theo chuẩn nào cả, bài này chỉ đề cập đến việc sử dụng những công cụ có sẵn để làm ra 1 trang blog nhanh - đẹp - hiệu quả. Và trong bài viết này mình muốn hướng dẫn các bạn tạo một blog sử dụng Github Page và Jekyll

### II. Github page là gì?

Bình thường nghe đến github thì nhiều người nghĩ đến nó chỉ đơn giản là một nơi để lưu trữ source code (dưới dạng các repository). Tuy nhiên, Github không chỉ cung cấp cho nưu lưu trữ mà còn là nơi để bạn lập blog (miễn phí, như mọi khi kể cả bây giờ github đã về tay Microsoft) với tên miền tênbạn.github.io hoặc một tên miền mà bạn sở hữu (có vẻ khá là giống với Wordpress ở khoản này). Bạn có khả năng thiết kế và tùy chỉnh theo ý mình 100%. Không như những nơi khác như Blogspot.com, Tumblr.com hay Wordpress.com (chấm com khác với phiên bản wordpress.org)... là những nền tảng bó buộc blog của bạn vào vài giao diện sẵn có.

Github page cũng có kho giao diện nhưng cũng không quá phong phú, và phần lớn là bạn nên tự sử dụng themes của mình hoặc là tự design nếu muốn.
Với việc có thể tùy biến sâu, Github page bạn có thể rút gọn mọi thành phần thừa thãi lùng bùng như trên những nền tảng trên, để lại một trang web nhẹ như lông hồng. Đơn giản tập trung vào mục đích. Hoặc ngược lại có thể trang trí hoành tráng hơn hẳn, miễn bạn có khả năng về lập trình hoặc design, hoặc đơn giản bạn có nhiều tiền để mua themes xịn.

### II. Jekyll là gì?

**Jekyll** là công cụ dùng để sinh ra các trang web tĩnh **(HTML, Javascript & CSS)** từ các file được viết theo cấu trúc gọi là `markup`. Có nhiều loại **markup**: `markdown`,`textile`, hoặc `HTML` chính là 1 markup phổ biến nhất. Tùy từng trường hợp mà chúng ta sử dụng cái nào cho phù hợp. Do Github sử dụng `markdown` (dưới 1 dạng được custom lại mà họ gọi là **GFM - Github Flavored Markdow**n), nên chúng ta sẽ sử dụng `markdown` làm `markup` cho các bài viết trên blog của mình.

Ngoài ra, **Jekyll** cũng là 1 công cụ gọi là `blog aware`, tức là chỉ cần làm theo cấu trúc của 1 trang blog (tuân theo các quy tắc đặt tiêu đề, thời gian & thư mục) là **Jekyll** sẽ tự động sinh ra các bài blog theo thứ tự thời gian cho chúng ta.

### III. Tại sao chúng ta lại cần đến Jekyll (có sử dụng Ruby) và Github blog? 
Blogspot, wordpress... sinh ra để viết blog, còn Github sinh ra là để làm việc với các phiên bản code do lập trình viên làm việc với nhau. Nhưng vì nó cung cấp dịch vụ host trang web tiện quá nên dần dần được sử dụng để đăng các web tĩnh, thường để trưng bày sản phẩm công nghệ hoặc lưu trữ lí lịch trích chéo nhưng không thích hợp cho blog. Tuy nhiên sự ra đời của Jekyll như giúp ta làm điều đó.

Một điều vốn dĩ dành cho dân lập trình chơi với nhau nên việc phải biết vài ngôn ngữ để tạo ra một trang blog Github giản dị, là điều các nhà phát triển không chút e ngại. May thay có những cá nhân muốn cộng đồng không chuyên cũng được tham gia sân chơi này, họ đã tạo điều kiện cho chúng ta bằng cách dùng những ngôn ngữ đó để viết một cái blog mẫu, sinh ra để cho người khác fork về dùng. 

Ngoài ra, Github khá quen thuộc với các lập trình viên. Nếu bạn là một lập trình viên thì việc commit code lên Github là một việc khá quen thuộc rồi. Làm website, viết blog theo cách đó chắc chắn sẽ làm bạn thấy thoải mái.

### IV. Cùng bắt tay vào làm một blog nào
Do **Jekyll** được **Github** tích hợp rất sâu, nên chúng ta sẽ sử dụng một cách khá dễ dàng

#### 4.1. Tạo một Github Repository
Tại Github, ta tạo 1 repository mới, giả sử tên là my-blog, clone về máy của mình bằng dòng lệnh

```
$ git clone git@github.com:<username>/my-blog.git
```
> Trong đó `<username>` là tên tài khoản của bạn trên Github
> 
#### 4.2. Cài đặt Jekyll
Đầu tiên là `Ruby`, phiên bản ổn định nhất hiện tại là`2.2.4`. Đối với các bạn dùng Mac OS thì đã có sẵn Ruby rồi, nhưng là phiên bản `1.9.x`. Tốt nhất nên cài qua RVM/Rbenv (Linux) hoặc HomeBrew (Mac OS)

Sau khi đã có Ruby, ta cần cài đặt 1 gem có tên là `bundler`. (Gem là các bộ thư viện được cộng đồng viết cho Ruby)

```
$ gem install bundler
```
Sau khi đã clone repository `my-blog` từ **Github** & cài đặt `bundler` thành công, ta tạo 1 file có tên Gemfile trong thư mục `my-blog`. `Gemfile` là cách mà Ruby quản lý các `gems` của **project**.

```
$ vi Gemfile
```
Bạn nào chưa cài `vi` thì có thể sử dụng `touch` hoặc `nano` nhé
Trong `Gemfile`, chúng ta khai báo các `gems` cần dùng với **Jekyll**

```
source 'https://rubygems.org'

group :jekyll_plugins do
  gem 'github-pages', '~> 84'
  gem 'jekyll-paginate', '~> 1.1'
end
```
Trong Terminal ta gọi `bundle` để cài đặt các `gems` đã khai báo trong `Gemfile`

```
$ bundle install
```

#### 4.3 Sử dụng custom theme
Cộng đồng lập trình viên ưa thích `Jekyll` đã tạo ra rất nhiều bộ theme đẹp, tiện dụng và public lên các trang chia sẻ theme của Jekyll (tính năng này giống với Wordpress hay Joomla). Một trong các trang tập hợp các theme đẹp là [JekyllThemes.io](https://jekyllthemes.io/)

Sau khi chọn được 1 `theme` ưng ý, các bạn `download` và giải nén vào thư mục my-blog của mình. Chú ý: cần phải giải nén toàn bộ nội dung vào thư mục gốc `my-blog`, dễ nhận thấy nhất là có file` _config.yml`, đây là file chứa các cài đặt gốc của **blog** viết bằng **Jekyll**

#### 4.4 Cấu trúc một thư muc Jekyll

Bạn vào trang Github chứa mã nguồn của một themes vừa Fork về sẽ thấy một loạt thư mục, tập tin với chức năng khác nhau bạn cần nắm để từng bước làm chủ website của mình.

**Một số file ở thư mục gốc cần chú ý:**
* `_config.yml` : File cấu hình của Jekyll. Bạn cần quẩy file này tưng bừng lên để nắm được cách tùy chỉnh trang Jekyll của mình.
* `index.html` : Đây là mã nguồn của trang chủ. Bên trong ngoài mã HTML còn có YAML, Liquid templating.
* `aboutme.md` : trang giới thiệu về bản thân bạn trên website. Tôi nghĩ bạn nên bắt đầu chỉnh sửa file này trước.
 
**Các thư mục cần chú ý cho người mới:**
* `_posts` : chứa các bài viết trên trang của bạn.
* `_layouts` : các cấu trúc trang sửa dụng trong các trang, các bài viết trên blog của bạn.
* `css, js` : chứa các tập tin css, js tùy biến giao diện và làm website của bạn trở nên sinh động hơn.

#### 4.5. Viết post bằng Jekyll
Các bài post của chúng ta sẽ được viết bằng `markdown`, sử dụng các cú pháp `kramdown`

Các bài blog được đặt trong thư mục `_posts`, có cú pháp đặt tên theo dạng` yyyy-mm-dd-<post-name>.markdown`, trong đó

* `yyyy`: năm bài viết, dưới dạng 4 chữ số
* `mm`: tháng bài viết, 2 chữ số
* `dd`: ngày bài viết, 2 chữ số
* `<post-name>`: tên bài viết, chứa các ký tự chữ và số, không nên chứa các ký tự tiếng Việt có dấu
Sau khi có bài viết bằng `markdown`, chạy lệnh `serve` để xem được bài viết

```
$ jekyll serve
```
Lúc này, toàn bộ blog sẽ truy cập được thông qua địa chỉ `localhost:4000` hoặc `127.0.0.1:4000`

#### 4.6. Deploy lên Github Pages
Github cung cấp cơ chế Github Pages, thông qua đó giúp người dùng publish các trang web tĩnh (HTML, Javascript & CSS) tại địa chỉ `https://<username>.github.io/<repo-name>`. Ở đây, `<repo-name>` chính là `my-blog`

Để `deploy` được lên** Github Pages**, tại **Terminal**, ta `commit` các thay đổi và `checkout` sang branch mới tên là `gh-pages`:

```
## In master branch
$ git checkout -b gh-pages

## In gh-pages branch
$ git push -u origin gh-pages
```

Tại các lần sau, khi viết bài mới, ta vẫn làm việc ở `master`, nhưng khi muốn `deploy` thì `merge` các thay đổi vào `gh-pages` và `push` lên:

```
## In master branch
$ git checkout gh-pages

## In gh-pages branch
$ git merge master
$ git push origin gh-pages
```

Lúc này, các thay đổi sẽ được cập nhật lên trang `https://<username>.github.io/<repo-name>`

Lưu ý: để sử dụng trang `https://<username>.github.io` (không có phần `<repo-name>` ở đằng sau), chúng ta cần tạo 1 repo có tên là `<username>.github.io` trên **Github** và thao tác giống như project `my-blog` ở trên.