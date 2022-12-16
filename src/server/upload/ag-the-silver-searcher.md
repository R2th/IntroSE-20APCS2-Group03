Tìm kiếm đoạn code nào đó là điều mà hầu hết chúng ta thực hiện hàng ngày. Cho dù đó là để refactor hoặc chỉ đơn giản là tìm nơi một biến, lớp, hoặc phương thức đã được thực hiện. Các công cụ tìm kiếm không tốt có thể khiến công việc của chúng ta khó khăn hơn mức cần thiết.

Trong bài viết này, tôi sẽ giới thiệu một công cụ có thể giúp tìm kiếm một số lượng lớn các tệp nhanh chóng và dễ dàng. Đó là `ag`.

Chúng ta sẽ muốn có một khối lượng code khá lớn để tìm kiếm nhằm thể hiện sức mạnh của `ag`, vì vậy trong bài viết này chúng ta sẽ sử dụng source code `Rails` để thực hiện demo.
## Installation
Nếu bạn đang sử dụng máy Mac, cách tốt nhất và dễ nhất để cài đặt `ag` là sử dụng Homebrew.
```
$ brew install ag
```
Đối với Ubuntu >= 13.10 (Saucy) hoặc Debian >= 8 (Jessie)
```
apt-get install silversearcher-ag
```
Ngoài ra để cài đặt cho các hệ điều hành khác, mọi người có thể đọc ở [đây](https://github.com/ggreer/the_silver_searcher)
## The Basics
Cú pháp của một lệnh `Ag` là
```
ag [FILE-TYPE] [OPTIONS] PATTERN [PATH]
```

Hãy bắt đầu bằng cách xem xét loại tìm kiếm cơ bản nhất mà chúng ta có thể thực hiện bằng `ag`.

Tác giả của framework `Ruby on Rails` là một người có tên viết tắt là **DHH**. Hãy xem liệu ta có thể tìm thấy bất kỳ sự xuất hiện của những chữ cái đó trong toàn bộ source code của `Rails` hay không
```
$ ag DHH
```
Kết quả tìm kiếm sẽ như thế này
```
activerecord/CHANGELOG.md
47:    *DHH*
51:    *DHH*

activerecord/lib/active_record/relation.rb
51:    #   users = User.where(name: 'DHH')
52:    #   user = users.new # => #<User id: nil, name: "DHH", created_at: nil, updated_at: nil>

activerecord/lib/active_record/relation/query_methods.rb
765:    #   users = users.create_with(name: 'DHH')
766:    #   users.new.name # => 'DHH'

activesupport/lib/active_support/core_ext/module/attribute_accessors_per_thread.rb
21:  #   Thread.current[:attr_Current_user] = "DHH"
22:  #   Current.user # => "DHH"
71:  #   Current.user = "DHH"
72:  #   Thread.current[:attr_Current_user] # => "DHH"
81:  #   Current.new.user = "DHH" # => NoMethodError
112:  #   Account.user = "DHH"
113:  #   Account.user     # => "DHH"
114:  #   Account.new.user # => "DHH"
125:  #   Account.user  # => "DHH"
134:  #   Current.new.user = "DHH"  # => NoMethodError
143:  #   Current.new.user = "DHH"  # => NoMethodError

actionview/lib/action_view/helpers/atom_feed_helper.rb
45:      #             author.name("DHH")
78:      #             author.name("DHH")

actionview/test/template/atom_feed_helper_test.rb
27:                author.name("DHH")
44:                author.name("DHH")
61:                author.name("DHH")
78:                author.name("DHH")
90:            author.name("DHH")
114:                author.name("DHH")
132:                author.name("DHH")
150:                author.name("DHH")
168:                author.name("DHH")
190:                author.name("DHH")
210:                  author.name("DHH")
298:      assert_select "author name", text: "DHH"

actioncable/lib/action_cable/channel/streams.rb
28:    #   ActionCable.server.broadcast "comments_for_45", author: 'DHH', content: 'Rails is just swell'

activestorage/test/models/attachments_test.rb
9:  setup { @user = User.create!(name: "DHH") }

activestorage/test/template/image_tag_test.rb
34:    @user = User.create!(name: "DHH")

guides/source/caching_with_rails.md
66:INFO: Action Caching has been removed from Rails 4. See the [actionpack-action_caching gem](https://github.com/rails/actionpack-action_caching). See [DHH's key-based cache expiration overview](http://signalvnoise.com/posts/3113-how-key-based-cache-expiration-works) for the newly-preferred method.
686:* [DHH's article on key-based expiration](https://signalvnoise.com/posts/3113-how-key-based-cache-expiration-works)

guides/source/active_record_migrations.md
112:`YYYYMMDDHHMMSS_create_products.rb`, that is to say a UTC timestamp
230:`db/migrate/YYYYMMDDHHMMSS_add_details_to_products.rb` file.

guides/source/getting_started.md
687:If you look in the `db/migrate/YYYYMMDDHHMMSS_create_articles.rb` file
```

Như bạn có thể thấy, đối số đầu tiên chúng ta chuyển vào là cụm từ tìm kiếm mà chúng ta muốn tìm trong thư mục tệp của chúng ta. Theo mặc định, truy vấn này được chạy đệ quy đối với thư mục hiện tại.

Nếu chúng ta muốn chỉ định một đường dẫn để tìm kiếm, chúng ta có thể truyền vào đối số cuối cùng. Ví dụ: nếu ta chỉ muốn tìm kiếm trong thư mục `guides`, ta có thể sửa đổi truy vấn của mình để trông giống như sau:
```
$ ag DHH guides/
```

Kết quả của ta bây giờ sẽ chỉ giới hạn trong thư mục đó như dưới đây
```
guides/source/caching_with_rails.md
66:INFO: Action Caching has been removed from Rails 4. See the [actionpack-action_caching gem](https://github.com/rails/actionpack-action_caching). See [DHH's key-based cache expiration overview](http://signalvnoise.com/posts/3113-how-key-based-cache-expiration-works) for the newly-preferred method.
686:* [DHH's article on key-based expiration](https://signalvnoise.com/posts/3113-how-key-based-cache-expiration-works)

guides/source/active_record_migrations.md
112:`YYYYMMDDHHMMSS_create_products.rb`, that is to say a UTC timestamp
230:`db/migrate/YYYYMMDDHHMMSS_add_details_to_products.rb` file.

guides/source/getting_started.md
687:If you look in the `db/migrate/YYYYMMDDHHMMSS_create_articles.rb` file
```

### Regular Expression Searches
`Ag` có hỗ trợ tìm kiếm theo `regular expression`. Điều này có thể cực kỳ hữu ích cho việc tạo các truy vấn tìm kiếm chi tiết hơn.

Bây giờ ta hãy thử tìm kiếm bất kỳ sự xuất hiện nào của từ `readme` ở cuối dòng.
```
$ ag readme$
```
Kết quả là
```
railties/lib/rails/generators/rails/app/app_generator.rb
50:    def readme

railties/lib/rails/generators/rails/app/templates/README.md.tt
1:# README

railties/lib/rails/generators/rails/plugin/plugin_generator.rb
40:    def readme

railties/test/generators/actions_test.rb
427:  def test_readme
```
### Literal Expression Searches
Mặc định `Ag` xem cụm từ tìm kiếm là một `regular expression`. Điều này có nghĩa là nếu chúng ta tìm kiếm mẫu `.rb` nó sẽ khớp với bất kỳ ký tự đơn nào theo sau là `rb`. Đây có thể không phải là những gì chúng ta muốn. Hãy tìm kiếm `.rb` trong `railties/CHANGELOG.md`.
```
$ ag .rb railties/CHANGELOG.md
```
```
5:     Skip `config/spring.rb` when spring isn't loaded.
61:    Verb              | GET
66:    Verb              | GET
```
Ở trên liệt kê các kết quả tìm kiếm của chúng ta. Vì `Ag` tìm `.rb` như một `regular expression`, kết quả của ta bao gồm một số thứ không mong muốn, chẳng hạn như `Verb`.

Để khắc phục điều này, chúng ta có thể thêm vào truy vấn của mình option `-Q`. Điều này sẽ tìm kiếm chính xác `.rb` trong file.
```
$ ag -Q .rb railties/CHANGELOG.md
```
```
5:     Skip `config/spring.rb` when spring isn't loaded.
```
## Listing Files (`-l`)
Theo mặc định, khi thực hiện tìm kiếm với Ag, kết quả sẽ bao gồm số dòng cũng như dòng mà chứa từ được tìm thấy.

Mức độ chi tiết này vô cùng hữu ích trong nhiều trường hợp, nhưng nếu chúng ta thực sự chỉ muốn xem danh sách các tên file, mà không thấy bối cảnh của từ được tìm thấy thì option `-l` có thể giúp chúng ta với điều này.
```
$ ag DHH -l
```
Kết quả hiện được hiển thị dưới dạng danh sách các file
```
activestorage/test/template/image_tag_test.rb
activestorage/test/models/attachments_test.rb
activesupport/lib/active_support/core_ext/module/attribute_accessors_per_thread.rb
actioncable/lib/action_cable/channel/streams.rb
guides/source/caching_with_rails.md
guides/source/active_record_migrations.md
guides/source/getting_started.md
activerecord/lib/active_record/relation.rb
activerecord/lib/active_record/relation/query_methods.rb
activerecord/CHANGELOG.md
actionview/test/template/atom_feed_helper_test.rb
actionview/lib/action_view/helpers/atom_feed_helper.rb
```
Danh sách các file được hiển thị như thế này giúp chúng ta dễ quản lý hơn một chút và có thể cho chúng ta biết rõ hơn về số lượng file trong kết quả của truy vấn.
## Scoping to Files (-G)
Rất thường xuyên, chúng ta sẽ chỉ muốn tìm kiếm các loại file nhất định hoặc trong các file có phần mở rộng cụ thể. Để thực hiện điều này, chúng tôi có thể sử dụng option `-G`

Bây giờ ta sẽ thử tìm kiếm `readme` trong source code, nhưng lần này ta sẽ giới hạn kết quả tìm kiếm vào những file có tên chứa từ `action`.
```
$ ag readme -l -G action
```
```
railties/test/generators/actions_test.rb
railties/lib/rails/generators/actions.rb
```
Hãy sửa đổi truy vấn của chúng ta một chút và tìm kiếm các file có tên kết thúc bằng `ec`.\
```
$ ag readme -l -i -G ec
```
Như kết quả bên dưới, chúng ta không hoàn toàn có kết quả truy vấn như mong muốn, vì nó cũng trả về các file như `activerecord/lib/active_record/base.rb`, có chứa `ec` trong từ `record`
```
rails.gemspec
activestorage/activestorage.gemspec
railties/lib/rails/generators/rails/plugin/templates/%name%.gemspec.tt
railties/railties.gemspec
actionpack/actionpack.gemspec
activejob/activejob.gemspec
activesupport/activesupport.gemspec
activemodel/activemodel.gemspec
actioncable/actioncable.gemspec
activerecord/lib/active_record/base.rb
activerecord/activerecord.gemspec
actionview/actionview.gemspec
actionmailer/actionmailer.gemspec
```
Thay vì tìm các file kết thúc bằng `ec`, kết quả tìm kiếm hiển thị cho ta các file có chứa `ec` ở bất kỳ đâu trong tên file. Làm cách nào để chúng ta khắc phục truy vấn của mình để lấy lại kết quả mà chúng ta muốn?

`-G` cho phép chúng ta truyền các `regular expressions`, vì vậy ta có thể dễ dàng sửa đổi truy vấn tìm kiếm của mình để cải thiện kết quả bằng cách sử dụng `$` để cho biết rằng ta chỉ muốn tìm với tên file kết thúc bằng `ec`.
```
$ ag readme -l -i -G ec$
```
```
activestorage/activestorage.gemspec
rails.gemspec
railties/railties.gemspec
actionpack/actionpack.gemspec
activejob/activejob.gemspec
activesupport/activesupport.gemspec
activemodel/activemodel.gemspec
actioncable/actioncable.gemspec
activerecord/activerecord.gemspec
actionview/actionview.gemspec
actionmailer/actionmailer.gemspec
```
Như bạn có thể thấy, kết quả tìm kiếm của ta hiện chỉ chứa các file có tên kết thúc bằng `ec`.
## Ignoring Paths
Một cách quan trọng khác để lọc kết quả tìm kiếm là bỏ qua một số thư mục nhất định mà chúng ta không quan tâm. `Ag` có một vài tính năng hữu ích giúp chúng ta làm điều đó.
### ` –ignore-dir` option
Hãy bắt đầu với truy vấn tìm từ `readme` và kết quả của nó
```
$ ag readme -l
```
```
activestorage/test/dummy/app/assets/javascripts/application.js
activestorage/activestorage.gemspec
rails.gemspec
railties/test/generators/api_app_generator_test.rb
railties/test/generators/plugin_generator_test.rb
railties/test/generators/actions_test.rb
railties/test/generators/app_generator_test.rb
railties/RDOC_MAIN.rdoc
railties/lib/rails/generators/app_base.rb
railties/lib/rails/generators/rails/plugin/USAGE
railties/lib/rails/generators/rails/plugin/plugin_generator.rb
railties/lib/rails/generators/rails/plugin/templates/%name%.gemspec.tt
railties/lib/rails/generators/rails/plugin/templates/rails/javascripts.js.tt
railties/lib/rails/generators/rails/plugin/templates/Rakefile.tt
railties/lib/rails/generators/rails/app/app_generator.rb
railties/lib/rails/generators/rails/app/templates/app/assets/javascripts/application.js.tt
railties/lib/rails/generators/rails/app/templates/README.md.tt
railties/lib/rails/generators/actions.rb
railties/lib/rails/api/task.rb
railties/railties.gemspec
actionpack/test/controller/action_pack_assertions_test.rb
actionpack/actionpack.gemspec
activejob/lib/active_job/queue_adapters.rb
activejob/activejob.gemspec
activesupport/activesupport.gemspec
activemodel/activemodel.gemspec
actioncable/actioncable.gemspec
guides/source/rails_application_templates.md
guides/source/configuring.md
guides/source/5_0_release_notes.md
guides/source/plugins.md
guides/source/upgrading_ruby_on_rails.md
guides/source/working_with_javascript_in_rails.md
guides/source/command_line.md
guides/source/asset_pipeline.md
guides/source/contributing_to_ruby_on_rails.md
guides/source/4_1_release_notes.md
guides/source/getting_started.md
guides/source/generators.md
activerecord/lib/active_record/base.rb
activerecord/activerecord.gemspec
actionview/actionview.gemspec
actionview/package.json
README.md
actionmailer/actionmailer.gemspec
```
Điều gì sẽ xảy ra nếu chúng ta không muốn nhìn thấy bất kỳ kết quả nào từ thư mục `railties/lib`? Để giải quyết vấn đề đó, chúng ta có thể sử dụng option `-ignore-dir`.
```
$ ag readme -l --ignore-dir=railties/lib
```
Tất cả các kết quả từ các file nằm trong thư mục đó sẽ bị bỏ qua.
```
activestorage/test/dummy/app/assets/javascripts/application.js
activestorage/activestorage.gemspec
rails.gemspec
railties/test/generators/api_app_generator_test.rb
railties/test/generators/plugin_generator_test.rb
railties/test/generators/actions_test.rb
railties/test/generators/app_generator_test.rb
railties/RDOC_MAIN.rdoc
railties/railties.gemspec
actionpack/test/controller/action_pack_assertions_test.rb
actionpack/actionpack.gemspec
activejob/lib/active_job/queue_adapters.rb
activejob/activejob.gemspec
activesupport/activesupport.gemspec
activemodel/activemodel.gemspec
actioncable/actioncable.gemspec
guides/source/rails_application_templates.md
guides/source/configuring.md
guides/source/5_0_release_notes.md
guides/source/plugins.md
guides/source/upgrading_ruby_on_rails.md
guides/source/working_with_javascript_in_rails.md
guides/source/command_line.md
guides/source/asset_pipeline.md
guides/source/contributing_to_ruby_on_rails.md
guides/source/4_1_release_notes.md
guides/source/getting_started.md
guides/source/generators.md
activerecord/lib/active_record/base.rb
activerecord/activerecord.gemspec
actionview/actionview.gemspec
actionview/package.json
README.md
actionmailer/actionmailer.gemspec
```
Chúng ta có thể dễ dàng nối nhiều `-ignore-dir` với nhau để lọc kết quả của chúng ta hơn nữa.
```
$ ag readme -l --ignore-dir=railties/lib --ignore-dir=guides/source
```
```
activestorage/test/dummy/app/assets/javascripts/application.js
activestorage/activestorage.gemspec
rails.gemspec
railties/test/generators/api_app_generator_test.rb
railties/test/generators/plugin_generator_test.rb
railties/test/generators/actions_test.rb
railties/test/generators/app_generator_test.rb
railties/RDOC_MAIN.rdoc
railties/railties.gemspec
actionpack/test/controller/action_pack_assertions_test.rb
actionpack/actionpack.gemspec
activejob/lib/active_job/queue_adapters.rb
activejob/activejob.gemspec
activemodel/activemodel.gemspec
activesupport/activesupport.gemspec
actioncable/actioncable.gemspec
activerecord/lib/active_record/base.rb
activerecord/activerecord.gemspec
actionview/actionview.gemspec
actionview/package.json
README.md
actionmailer/actionmailer.gemspec
```

`-ignore-dir` cũng sẽ cho phép chúng ta lọc ra các file cụ thể, không chỉ là các thư mục.
```
$ ag readme -l --ignore-dir="*.rb" --ignore-dir="*.gemspec"
```
```
activestorage/test/dummy/app/assets/javascripts/application.js
railties/RDOC_MAIN.rdoc
railties/lib/rails/generators/rails/plugin/USAGE
railties/lib/rails/generators/rails/plugin/templates/%name%.gemspec.tt
railties/lib/rails/generators/rails/plugin/templates/rails/javascripts.js.tt
railties/lib/rails/generators/rails/plugin/templates/Rakefile.tt
railties/lib/rails/generators/rails/app/templates/app/assets/javascripts/application.js.tt
railties/lib/rails/generators/rails/app/templates/README.md.tt
guides/source/rails_application_templates.md
guides/source/configuring.md
guides/source/5_0_release_notes.md
guides/source/plugins.md
guides/source/upgrading_ruby_on_rails.md
guides/source/working_with_javascript_in_rails.md
guides/source/command_line.md
guides/source/asset_pipeline.md
guides/source/contributing_to_ruby_on_rails.md
guides/source/4_1_release_notes.md
guides/source/getting_started.md
guides/source/generators.md
actionview/package.json
README.md
```
### VCS Ignore Files
`Ag` sẽ tự động đọc trong các file VCS (version control system), chẳng hạn như `.gitignore` đối với Git và kết quả trả về sẽ bỏ qua những file có trong `.gitignore`

Ví dụ, source code của Rails đã có một file `.gitignore`, ta hãy thêm các thư mục `railties/lib` và `guides/source ` vào đó
```
.Gemfile
.byebug_history
.ruby-version
/*/doc/
/*/test/tmp/
/.bundle
/dist/
/doc/
/guides/output/
debug.log
node_modules/
package-lock.json
pkg/
railties/lib
guides/source
```
Bây giờ nếu chúng ta chạy cùng một truy vấn, nhưng không có option `-ignore-dir`, `ag` sẽ trả về kết quả giống với lệnh
```
$ ag readme -l --ignore-dir=railties/lib --ignore-dir=guides/source
```
Tất nhiên, có thể có những lúc nếu bạn không muốn sử dụng tính năng này, sử dụng option `–skip-vcs-ignores` chúng ta có thể nhận được kết quả ban đầu của truy vấn của mình. Option `-skip-vcs-ignores` sẽ bỏ qua các file sau: `.gitignore`, `.hgignore`, `.svnignore`.
## Searching from Standard Input
`Ag` có thể sử kết quả của lệnh khác để cung cấp dữ liệu rồi tìm kiếm. Ví dụ, chúng ta có thể sử dụng lệnh `ps` để lấy danh sách tất cả các tiến trình đang chạy trên máy của chúng ta, và sau đó tìm kiếm cụ thể bằng cách sử dụng `Ag`.
```
ps -e | ag redis
```
```
8911 ?        00:00:00 redis-server
```
Ở trên ta tìm kiếm qua tất cả các tiến trình đang chạy để tìm một tiến trình có chứa từ `redis`

Khả năng này cực kỳ hữu ích, không chỉ cho việc tìm kiếm những thứ như các tiến trình, mà còn để đọc file đầu vào từ một lệnh như `cat`, và một số ứng dụng khác

Một cách khác để thực hiện tìm kiếm tương tự này là sử dụng lệnh `grep` :grin:
## References
http://conqueringthecommandline.com/book/ack_ag
https://github.com/ggreer/the_silver_searcher