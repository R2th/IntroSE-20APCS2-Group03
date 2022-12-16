Xin chào tất cả mọi người :blush:, mình là Thâm. Trong bài viết này mình sẽ hướng dẫn các bạn tạo cho riêng mình một ruby gem và publish lên trang https://rubygems.org/ nhé.
### Giới thiệu
Trong quá trình học ruby căn bản, mình đã viết chương trình quiz nho nhỏ, về sau khi học rails, mình đã sử dụng rất nhiều Gem, bắt đầu trong đầu mình nảy ra câu hỏi "Gem là gì? Nó hoạt động như thế nào? Mình tự build có dễ không?". Bài viết này sẽ giúp bạn nhanh chóng tiếp cận cách tạo ra một Gem thông qua việc làm một Gem đơn giản
### Khởi tạo gem
Trước tiên, bạn chạy lệnh `bundle gem <gem_name>` các files và thư mục cơ bản cần có để bắt nghịch ngợm. Ở đây mình tạo gem có tên là `sun_quiz` câu lệnh của mình sẽ là `bundle gem sun_quiz`. Khi tạo thành công sẽ hiện ra như sau:

![](https://images.viblo.asia/6e957273-80b0-43a4-bd0f-d5eb56fc06d7.png)
### Cấu trúc của Gem
Để có thể viết được một Gem thì ta cần tìm hiểu cấu trúc tổ chức thư mục hay các file phải có của một gem nhé.
![](https://images.viblo.asia/d73bde57-9e9f-4b31-9684-916c9b104587.png)
* bin: Chứa các bash script để tự động hoá các tác vụ khi người dùng cài đặt một Gem.
* lib: Nơi chứa code chính của Gem.
* test: Phục vụ cho việc viết test cho Gem
* Gemfile: Khi bạn muốn sử dụng lại một thư viện sẵn có thì đây là nơi bạn sẽ điền các Gem mong muốn vào. Hoạt động tương tự như ở rails, nó sẽ tự động tải các Gem có trong này về máy để có đủ môi trường sử dụng cho ứng dụng của bạn.
* Rakefile: Khi bạn muốn thực hiện những tác vụ tự động với gem như việc run test.
* `.gemspec`: File mô tả Gem của bạn, ví dụ như mô tả, tác giả, phiên bản,... của Gem
### Viết Gem thực tế
Như mình đã đề cập ở trên, lib là thư mục chứa code chính của Gem. Đó là quy ước để một file Ruby cùng tên với tên của gem trong lib vì file sẽ được tải khi `require "your_gem"` được chạy. File đó chịu trách nhiệm thiết lập code và API của gem. (Nếu bạn chạy lệnh `bundle gem <gem_name>` như mình ở trên thì file cùng tên với tên của gem sẽ được tạo tự động).

`file: sun_quiz.rb`

![](https://images.viblo.asia/faedc8eb-1d91-415b-9885-71e27b28e802.png)https://images.viblo.asia/faedc8eb-1d91-415b-9885-71e27b28e802.png

Đến bước này, cơ bản là chúng ta đã hoàn thành gem file của mình.
### Publish
Đầu tiên chúng ta cần tạo một tài khoản ở trên trang https://rubygems.org để có thể publish Gem lên trên đó. Sau khi tạo tài khoản xong, đăng nhập ở local bằng câu lệnh:

`curl -u your_user_name https://rubygems.org/api/v1/api_key.yaml >~/.gem/credentials; chmod 0600 ~/.gem/credentials
Enter host password for user 'your_user_name':`

Tiếp theo, các phải sửa đổi `spec.summary, spec.descrip, spec.homepage và spec.respond_to?` trong file`.gempec`.  File sẽ trông giống như thế này sau khi sửa:

![](https://images.viblo.asia/75caadf7-ddf9-45f1-9d93-2bf892636d92.png)

Tiến hành build và tạo bản release đầu tiên:

![](https://images.viblo.asia/e522338f-6d12-4b4e-91d1-7cd67849fcca.png)https://images.viblo.asia/e522338f-6d12-4b4e-91d1-7cd67849fcca.png

Gem mình vừa release:

![](https://images.viblo.asia/9b58ca25-65f2-45a3-9723-16743f4b1079.png)https://images.viblo.asia/9b58ca25-65f2-45a3-9723-16743f4b1079.png

Cuối cùng, mọi người commit code và đẩy lên github để chia sẻ với các bạn khác nhé. Vậy là chúng ta đã có Gem của riêng mình rồi đấy :)
### Chạy thử
Tải Gem về máy `gem install sun_quiz`, sau đó tạo một file ruby, thêm `require 'rubygems'` và
`require 'sun_quiz'` vào đầu dòng, sử dụng class trong gem như sau:

![](https://images.viblo.asia/257abab1-e4b1-42a0-a8bd-765312a3d742.png)https://images.viblo.asia/257abab1-e4b1-42a0-a8bd-765312a3d742.png

Chạy trên command line `ruby quiz.rb` sẽ có kết quả như sau:

![](https://images.viblo.asia/11df91ff-7fcb-4fbb-8eeb-72f95b99999a.gif)https://images.viblo.asia/11df91ff-7fcb-4fbb-8eeb-72f95b99999a.gif
### Kết luận
Trên đây mình đã hướng dẫn viết một gem đơn giản và tiến hành publish. Lần đầu viết bài có nhiều sai xót mong mọi người thông cảm và đóng góp ạ. Cảm ơn mọi người đã theo đọc bài viết. Enjoy coding <3