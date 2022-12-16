Ở [bài viết](https://viblo.asia/p/ag-the-silver-searcher-Az45bgo6KxY) trước chúng ta đã sử dụng Ag để tìm kiếm các file có chứa các cụm từ cần tìm, nhưng điều gì sẽ xảy ra nếu chúng ta muốn tìm kiếm file bằng các tiêu chí khác thay vì chỉ tìm kiếm theo nội dung của file?

Lệnh `find` là một công cụ tìm kiếm. Với lệnh `find` chúng ta có thể nhanh chóng tìm kiếm các file có đường dẫn hoặc tên, chứa cụm từ truy vấn. Chúng ta cũng có thể tìm file được sở hữu bởi một người dùng nhất định, có kích thước nhất định, đã được sửa đổi lần cuối trong n ngày qua và hơn thế nữa.

Trong bài này, chúng ta sẽ xem xét một số tính năng hữu ích nhất của lệnh `find`. 

Source code chúng ta sử dụng trong các ví dụ của bài này là source code của Rails.

## The Basics (`-name`)
Lệnh `find` có cú pháp như sau
```
find PATH_TO_SEARCH OPTIONS_TO_USE PATTERN_TO_SEARCH_FOR
```
Áp dụng cấu trúc lệnh ở trên, bây giờ ta sẽ thử viết một truy vấn đơn giản để tìm tất cả các file kết thúc bằng `model.rb`.
```
find . -name model.rb
```
Như bạn có thể thấy bên dưới, kết quả không như chúng ta mong đợi, chúng chỉ trả về những file có tên chính xác là `model.rb`
```
./activemodel/lib/active_model/model.rb
```
Lý do là option `name` là mong đợi mong đợi một pattern, và pattern chúng ta đã đưa vào không có wild cards để chỉ ra rằng chúng ta muốn tìm với phần cuối của tên file.

Hãy thay đổi truy vấn của chúng ta một chút.
```
find . -name \*model.rb
```
```
./activerecord/test/models/arunit2_model.rb
./activemodel/lib/active_model.rb
./activemodel/lib/active_model/model.rb
./railties/lib/rails/generators/active_model.rb
```
Kết quả ở trên cho thấy rằng chúng ta đã tìm kiếm tại thư mục hiện tại (và các thư mục con của nó), đối với các file, tên file của chúng kết thúc bằng `* model.rb`.
## Searching Paths (`-path`)
Trong phần trước chúng ta đã học cách sử dụng tìm theo tên file, nhưng nếu chúng ta muốn tìm đường dẫn của các file hoặc các thư mục theo với một từ nào đó?

Để tìm kiếm trong một đường dẫn, chúng ta có thể sử dụng option `-path` thay cho `-name`. Hãy thử tìm bất kỳ file nào có đường dẫn chứa từ `session`.
```
find . -path \*session\*
```
```
./activerecord/test/models/possession.rb
./railties/test/application/middleware/session_test.rb
./guides/assets/images/security/session_fixation.png
./actionpack/lib/action_dispatch/middleware/session
./actionpack/lib/action_dispatch/middleware/session/mem_cache_store.rb
./actionpack/lib/action_dispatch/middleware/session/cookie_store.rb
./actionpack/lib/action_dispatch/middleware/session/cache_store.rb
./actionpack/lib/action_dispatch/middleware/session/abstract_store.rb
./actionpack/lib/action_dispatch/request/session.rb
./actionpack/test/fixtures/session_autoload_test
./actionpack/test/fixtures/session_autoload_test/session_autoload_test
./actionpack/test/fixtures/session_autoload_test/session_autoload_test/foo.rb
./actionpack/test/dispatch/session
./actionpack/test/dispatch/session/test_session_test.rb
./actionpack/test/dispatch/session/mem_cache_store_test.rb
./actionpack/test/dispatch/session/cookie_store_test.rb
./actionpack/test/dispatch/session/abstract_store_test.rb
./actionpack/test/dispatch/session/cache_store_test.rb
./actionpack/test/dispatch/request/session_test.rb
```
Ở trên cho thấy kết quả của truy vấn của chúng ta. Đầu ra cho chúng ta thấy nhiều tệp và thư mục chứa từ `session`.
### Find Only Files or Directories (`-type`)
Trong kết quả ở trên, chúng ta muốn tìm các file có tên đường dẫn chứa `session`. Nhưng dựa trên kết quả thì các thư mục có tên khớp với từ `session` cũng được hiển thị.

Bằng cách sử dụng option `type`, chúng ta có thể yêu cầu lệnh `find` tìm kiếm riêng cho các file `type -f`, hoặc chỉ các thư mục, `type -d`.

Bây giờ chúng ta có thể thay đổi truy vấn của mình để chỉ tìm kiếm các file có đường dẫn chứa từ `session` và không để tên thư mục được đưa vào kết quả.
```
find . -path \*session\* -type f
```
```
./activerecord/test/models/possession.rb
./railties/test/application/middleware/session_test.rb
./guides/assets/images/security/session_fixation.png
./actionpack/lib/action_dispatch/middleware/session/mem_cache_store.rb
./actionpack/lib/action_dispatch/middleware/session/cookie_store.rb
./actionpack/lib/action_dispatch/middleware/session/cache_store.rb
./actionpack/lib/action_dispatch/middleware/session/abstract_store.rb
./actionpack/lib/action_dispatch/request/session.rb
./actionpack/test/fixtures/session_autoload_test/session_autoload_test/foo.rb
./actionpack/test/dispatch/session/test_session_test.rb
./actionpack/test/dispatch/session/mem_cache_store_test.rb
./actionpack/test/dispatch/session/cookie_store_test.rb
./actionpack/test/dispatch/session/abstract_store_test.rb
./actionpack/test/dispatch/session/cache_store_test.rb
./actionpack/test/dispatch/request/session_test.rb
```
Tương tự, chúng ta cũng có thể tìm kiếm các thư mục có đường dẫn chứa `session`.
```
find . -path \*session\* -type d
```
```
./actionpack/lib/action_dispatch/middleware/session
./actionpack/test/fixtures/session_autoload_test
./actionpack/test/fixtures/session_autoload_test/session_autoload_test
./actionpack/test/dispatch/session
```
## And/Or Expressions (`-or`)
Chúng ta có thể sửa thêm tìm kiếm ở trên để chỉ tìm các file có tên đường dẫn chứa `session` và tên file chứa `mem`.
```
find . -path \*session\* -type f -name \*mem\*
```
```
./actionpack/lib/action_dispatch/middleware/session/mem_cache_store.rb
./actionpack/test/dispatch/session/mem_cache_store_test.rb
```
Như ở trên cho thấy, chúng ta có thể kết hợp cả hai option `-name` và `-path` với nhau để làm cho tìm kiếm của chúng ta trở nên cụ thể. Loại truy vấn này là truy vấn **AND**.

Chúng ta cũng có thể thực hiện các truy vấn **OR** bằng cách sử dụng toán tử `-or` và một số dấu ngoặc đơn.

Bây giờ ta sẽ viết truy vấn tìm các file có tên kết thúc bằng `.gemspec` hoặc `.jpg`.
```
find . \( -name \*.gemspec -or -name \*.jpg \) -type f
```
```
./activerecord/activerecord.gemspec
./activerecord/test/assets/flowers.jpg
./activesupport/activesupport.gemspec
./activemodel/activemodel.gemspec
./railties/railties.gemspec
./actionview/actionview.gemspec
./actioncable/actioncable.gemspec
./actionmailer/actionmailer.gemspec
./actionmailer/test/fixtures/attachments/foo.jpg
./actionmailer/test/fixtures/attachments/test.jpg
./activejob/activejob.gemspec
./rails.gemspec
./activestorage/test/fixtures/files/racecar.jpg
./activestorage/test/fixtures/files/racecar_rotated.jpg
./activestorage/activestorage.gemspec
./guides/assets/images/rails_guides_kindle_cover.jpg
./actionpack/test/fixtures/multipart/ruby_on_rails.jpg
./actionpack/actionpack.gemspec
```
Điều quan trọng ở đây là phải sử dụng chính xác số lượng các ký tự như dấu ngoặc đơn và dấu hoa thị để không gây nhầm lẫn cho hệ điều hành.
## Not Matching Query (`!`, `-not`)
Cho đến thời điểm này, chúng ta đã tìm kiếm các file có tên hoặc đường dẫn khớp với một pattern nhất định. Bây giờ, hãy làm ngược lại. Chúng ta có thể truy vấn file hoặc thư mục không khớp với một pattern nhất định.

Giả sử chúng ta muốn tìm tất cả các file trong thư mục không chứa từ `t` trong đường dẫn của chúng.

Để làm điều đó, chúng ta có thể sử dụng toán tử `-not` phía trước option `-path`.
```
find . -not -path \*t\* -type f
```
```
./.rubocop.yml
./CODE_OF_CONDUCT.md
./Brewfile
./README.md
./Rakefile
./Gemfile
./rails.gemspec
./MIT-LICENSE
./version.rb
./RELEASING_RAILS.md
./guides/CHANGELOG.md
./guides/rails_guides.rb
./guides/rails_guides/markdown/renderer.rb
./guides/rails_guides/kindle.rb
./guides/rails_guides/indexer.rb
./guides/rails_guides/helpers.rb
./guides/rails_guides/markdown.rb
./guides/Rakefile
./guides/source/ruby_on_rails_guides_guidelines.md
./guides/source/form_helpers.md
./guides/source/engines.md
./guides/source/configuring.md
./guides/source/plugins.md
./guides/source/command_line.md
./guides/source/i18n.md
./guides/source/kindle/rails_guides.opf.erb
./guides/source/upgrading_ruby_on_rails.md
./guides/source/rails_on_rack.md
./guides/source/api_app.md
./RAILS_VERSION
./Gemfile.lock
./CONTRIBUTING.md
```
Một cách khác để đạt được cùng một tập kết quả như trên là sử dụng `!` thay vì toán tử `-not`. Cả hai sẽ cung cấp cho bạn kết quả tương tự.
```
find . \! -path \*t\* -type f
```
## Find by Last Modified Time (`-mtime`)
`find` cho phép chúng ta tìm kiếm các file và thư mục theo nhiều cách khác nhau. Cho đến bây giờ, chúng ta đã tập trung vào tên của file hoặc đường dẫn của file, nhưng việc tìm kiếm file dựa trên ngày sửa đổi cuối cùng thì sao?

Sử dụng option `-mtime`, chúng ta có thể tìm kiếm các file có ngày sửa đổi cuối cùng trong n ngày qua.

Ở đây chúng ta có thể tìm thấy các file đã được sửa đổi trong ngày cuối cùng.
```
find . -mtime -1
```
Số mà chúng ta truyền vào `-mtime`, trong trường hợp này -1, là số ngày chúng ta muốn tìm. Ví dụ này trả về các file đã được sửa đổi trong 24 giờ qua. Tùy chọn -2 sẽ đại diện cho 48 giờ qua và cứ tiếp tục như vậy.

Sử dụng `-mmin`, chúng ta có thể tìm kiếm các file đã được sửa đổi trong n phút cuối cùng.
```
find . -mmin -5
```
## Find by File Size (`-size`)
Một option hữu ích khác là `-size`, như là tên của nó, cho phép chúng ta tìm kiếm các file có kích thước vượt quá số lượng được chỉ định.

Hãy tìm kiếm các file có kích thước lớn hơn 200 kilobyte.
```
find . -size +200k
```
```
./actionview/test/template/date_helper_test.rb
./actionview/test/ujs/public/vendor/jquery-2.2.0.js
./actioncable/test/javascript/vendor/mock-socket.js
./activestorage/test/fixtures/files/video_with_rectangular_samples.mp4
./activestorage/test/fixtures/files/racecar.jpg
./activestorage/test/fixtures/files/video.mp4
./activestorage/test/fixtures/files/racecar_rotated.jpg
./activestorage/test/fixtures/files/rotated_video.mp4
./guides/assets/images/getting_started/template_is_missing_articles_new.png
./guides/assets/images/getting_started/rails_welcome.png
```
## Performing Operations (`-delete`)
`find` cũng có khả năng thực thi các lệnh nhất định. Một trong các lệnh có sẵn hữu ích là option `-delete`.

Option `-delete` sẽ như tên của nó, sẽ xóa tất cả các file và thư mục khớp với pattern. Điều này làm cho loại hoạt động này cực kỳ hiệu quả khi chúng ta có thể kết hợp việc tìm kiếm và xóa thành một hoạt động thay vì hai.

Hãy tìm tất cả các file có tên kết thúc bằng `.yml` và xóa chúng. Ở đây ta cũng sử dụng option `-print` để hiển thị các file bị xóa.
```
find ./guides -type f -name \*.yml -print -delete
```
```
./guides/code/getting_started/config/database.yml
./guides/code/getting_started/config/locales/en.yml
./guides/code/getting_started/test/fixtures/comments.yml
./guides/code/getting_started/test/fixtures/posts.yml
```
## Conclusion
Chúng ta đã đề cập đến rất nhiều những gì có thể làm trong bài này, nhưng nó còn có nhiều khả năng hơn nữa. Bài không thể liệt kê tất cả option và cách khác nhau để tìm kiếm các file, nhưng hy vọng nó giúp các bạn hiểu được những gì công cụ này có thể thực hiện được.
## References
http://conqueringthecommandline.com/book/find