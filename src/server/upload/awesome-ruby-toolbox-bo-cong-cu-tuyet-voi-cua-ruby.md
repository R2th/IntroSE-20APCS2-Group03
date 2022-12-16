Ruby - một ngôn ngữ lập trình nổi tiếng, người hâm mộ của nó gọi nó là một ngôn ngữ đẹp, nghệ thuật và còn tiện dụng, thiết thực. Ruby có một bộ sưu tập các thư viện, công cụ, framework và phần mềm tuyệt vời để thiết kế, xây dựng các ứng dụng và ứng dụng web hiện đại. Tuy nhiên không phải ai cũng biết hết các công cụ tuyệt vời đó.

Có một bộ sưu tập các thư viện Ruby từ https://www.ruby-toolbox.com do công đồng phân loại, với việc loại bỏ các thư viện không được dùng nữa, nhờ tác giả Clszowka ta có được Awesome Ruby Toolbox.

## Active Record Plugins
### Active Record Default Values
### Active Record Enumerations
[Enumerize](https://github.com/brainspec/enumerize) - Các thuộc tính được liệt kê với I18n và hỗ trợ ActiveRecord/Mongoid/MongoMapper/Sequel.

[Simple enum](https://github.com/lwe/simple_enum) - Cung cấp các trường giống enum cho các mô hình ActiveRecord,ActiveModel và Mongoid.

[Enumerate it](https://github.com/cassiomarques/enumerate_it) - Giúp bạn khai báo và sử dụng enumerations một cách rất đơn giản và linh hoạt.

### Active Record Index Assistants
[schema_plus](https://github.com/lomba/schema_plus) - SchemaPlus là một gem chỉ đơn giản là kéo vào một tập hợp các gem khác từ họ SchemaPlus của các phần mở rộng ActiveRecord.

[lol_dba](https://github.com/plentz/lol_dba) - ol_dba là một gói nhỏ các nhiệm vụ quét các mô hình ứng dụng của bạn và hiển thị danh sách các cột có thể được lập chỉ mục. Ngoài ra, nó có thể tạo ra các lệnh sql.

[immigrant](https://github.com/jenseng/immigrant) - Thêm một generator để tạo khóa ngoài dựa trên các liên kết hiện tại trong model của bạn.

### Active Record Named Scopes
[Ransack](https://github.com/ernie/ransack) - Ransack được kế thừa từ gem MetaSearch. Nó cải thiện và mở rộng các chức năng của MetaSearch, nhưng không có API tương thích 100%.

[Filterrific](https://github.com/jhund/filterrific) - Filterrific là một plugin của Rails Engine giúp dễ dàng lọc, tìm kiếm và sắp xếp danh sách ActiveRecord của bạn.

### Active Record Nesting
[Awesome nested set](https://github.com/collectiveidea/awesome_nested_set) - thực hiện thiết lập tuyệt vời các thuộc tính lồng nhau cho Active Record.

[Ancestry](https://github.com/stefankroes/ancestry) - cho phép các bản ghi của một ActiveRecord Model được tổ chức trong một cấu trúc cây, sử dụng một cơ sở dữ liệu được định dạng dạng cột. Nó cho thấy tất cả các quan hệ cấu trúc cây tiêu chuẩn (ancestors, parent, root, children, siblings, descendants) và tất cả chúng có thể được tìm nạp trong một truy vấn sql đơn. Các tính năng bổ sung là named_scopes, kiểm tra tính toàn vẹn, khôi phục toàn vẹn, sắp xếp cây thành các hash và các strategy khác nhau để xử lý các hồ sơ không có parent.

[Closure Tree](https://github.com/mceachen/closure_tree) - Dễ dàng và hiệu quả làm cho ActiveRecord Model của bạn hỗ trợ cấu trúc phân cấp.

### Active Record Sharding
[Octopus](https://github.com/tchandy/octopus) - Gem này cho phép bạn chia sẻ cơ sở dữ liệu với ActiveRecord. Điều này cũng cung cấp một giao diện để nhân rộng.

[Activerecord-turntable](https://github.com/drecom/activerecord-turntable) - ActiveRecord sharding mở rộng.

### Active Record Soft Delete
[Paranoia](https://github.com/radar/paranoia) - Paranoia như là acts_as_paranoid cho Rails 3, nhưng sử dụng ít mã hơn rất nhiều. Bạn sẽ sử dụng một trong hai (plugin hoặc gem) nếu bạn muốn rằng khi bạn xóa một đối tượng Active Record mà nó không thực sự bị xóa, mà chỉ "ẩn" đi. Paranoia thực hiện điều này bằng cách thêm trường deleted_at ghi lại thời điểm bạn xóa bản ghi và ẩn nó bằng cách dò tìm tất cả các truy vấn trên model của bạn để chỉ bao gồm các bản ghi có deleted_at trống.

[Permanent records](https://github.com/JackDanger/permanent_records) - Không bao giờ mất dữ liệu. Thay vì xóa các bản ghi, thì đặt deleted_at và cung cấp cho bạn tất cả các phạm vi bạn cần để làm việc với dữ liệu của mình.

[destroyed_at](https://github.com/dockyard/destroyed_at) - Xóa bỏ an toàn cho ActiveRecord.

### Active Record Sortables
[Acts as list](https://github.com/swanandp/acts_as_list) - Tiện ích "acts_as" này cung cấp khả năng sắp xếp và sắp xếp lại một số đối tượng trong danh sách. Lớp có nhu cầu này có cột "vị trí" được định nghĩa là một số nguyên trên bảng cơ sở dữ liệu được ánh xạ.

### Active Record User Stamping
### Active Record Value Cleanup
[Strip attributes](https://github.com/rmm5t/strip_attributes) - StripAttributes tự động loại bỏ tất cả các khoảng trống đầu và cuối của thuộc tính trước khi xác nhận. Nếu thuộc tính trống, giá trị này sẽ mặc định là nil.

### Active Record Versioning
[PaperTrail](https://github.com/airblade/paper_trail) - Theo dõi thay đổi đối với dữ liệu của bạn. Tốt cho việc kiểm toán hoặc thay đổi phiên bản.

[audited](https://github.com/collectiveidea/audited) - Ghi lại tất cả thay đổi đối với model của bạn.

[auditable](https://github.com/harleyttd/auditable) - Một gem đơn giản để kiểm tra các thuộc tính hoặc phương thức của các ActiveRecord Model bằng cách lấy các snapshot và phân biệt chúng cho bạn.

### Pagination
[Kaminari](https://github.com/amatsuda/kaminari) - Kaminari dựa trên Scope & Engine, sạch sẽ, mạnh mẽ, bất khả tri, có thể tuỳ chỉnh và tinh vi cho Rails 3+.

[Will_paginate](https://github.com/mislav/will_paginate) - will_paginate cung cấp một API đơn giản để thực hiện các truy vấn được phân trang với Active Record, DataMapper và Sequel, và bao gồm các trình trợ giúp để hiển thị các liên kết phân trang trong các ứng dụng web Rails, Sinatra và Merb.

[Sorted](https://github.com/mynameisrufus/sorted) - Thư viện sắp xếp dữ liệu, được sử dụng bởi các thư viện khác để xây dựng các truy vấn và hơn thế nữa.

### Rails Comments
[Acts as commentable with threading](https://github.com/elight/acts_as_commentable_with_threading) - Tương tự như acts_as_commentable; tuy nhiên, sử dụng awesome_nested_set để cung cấp các luồng bình luận.

[Commontator](https://github.com/lml/commontator) - Một công cụ của Rails cho bình luận.

### Rails DB Bootstrapping
### Rails Ratings
### Rails Search
[Sunspot](https://github.com/sunspot/sunspot) - Sunspot là một thư viện cung cấp API mạnh mẽ cho công cụ tìm kiếm Solr. Sunspot quản lý cấu hình của các lớp Ruby liên tục để tìm kiếm và lập chỉ mục và cho thấy các tính năng mạnh mẽ nhất của Solr thông qua một bộ sưu tập các DSL. Các hoạt động tìm kiếm phức tạp có thể được thực hiện mà không cần viết tay bất kỳ truy vấn nào hoặc xây dựng các tham số Solr bằng tay.

[sunspot_rails](https://github.com/sunspot/sunspot) - Sunspot::Rails là phần mở rộng của thư viện Sunspot cho tìm kiếm Solr. Sunspot::Rails thêm tích hợp giữa Sunspot và ActiveRecord, bao gồm định nghĩa các phương thức tìm kiếm và lập chỉ mục liên quan trên các ActiveRecord Model, chạy một cá thể Solr tương thích Sunspot cho môi trường phát triển và thử nghiệm, và tự động thực hiện thay đổi chỉ mục Solr ở cuối mỗi yêu cầu Rails.

[Thinking-sphinx](https://github.com/pat/thinking-sphinx) - Một layer thông minh cho ActiveRecord (thông qua Rails và Sinatra) cho công cụ full-text search Sphinx.

[Tire](https://github.com/karmi/tire) - Nó cung cấp API giống Ruby cho giao tiếp thông thạo với máy chủ Elasticsearch và kết hợp với lớp ActiveModel để sử dụng thuận tiện trong các ứng dụng Rails. Nó cho phép xóa và tạo các chỉ mục, xác định ánh xạ cho chúng, hỗ trợ API hàng loạt và trình bày một DSL dễ sử dụng để xây dựng các truy vấn của bạn. Nó có khả năng tương thích ActiveRecord / ActiveModel đầy đủ, cho phép bạn lập chỉ mục các mô hình của bạn (tăng dần khi lưu hoặc hàng loạt), tìm kiếm và phân trang kết quả. Vui lòng kiểm tra tài liệu tại http://karmi.github.com/retire/.

[searchkick](https://github.com/ankane/searchkick) - Tìm kiếm thông minh được thực hiện dễ dàng.

[elasticsearch](https://github.com/elasticsearch/elasticsearch-ruby) - Tích hợp Ruby cho Elasticsearch (máy khách, API, v.v.).

[pg_search](https://github.com/Casecommons/pg_search) - PgSearch xây dựng Active Record named scopes tận dụng lợi thế full-text search của PostgreSQL.

[elasticsearch-rails](https://github.com/elasticsearch/elasticsearch-rails) - Tích hợp Ruby on Rails cho Elasticsearch.

[Scoped search](https://github.com/wvanbergen/scoped_search) - Giúp dễ dàng tìm kiếm dựa trên ActiveRecord của bạn. Nó sẽ tạo ra một scope: search_for có thể được gọi bằng một chuỗi truy vấn. Nó sẽ xây dựng một truy vấn SQL bằng cách sử dụng chuỗi truy vấn được cung cấp và một định nghĩa chỉ rõ trên những trường nào cần tìm kiếm. Bởi vì chức năng được xây dựng trên scope, kết quả của  search_for có thể được sử dụng giống như bất kỳ scope nào khác, vì vậy nó có thể kết hợp với một scope khác hoặc kết hợp với will_paginate.

[searchlight](https://github.com/nathanl/searchlight) - Searchlight là một cách low-magic để tạo các tìm kiếm bằng cách sử dụng ORM. Nó tương thích với ActiveRecord, Sequel, Mongoid và bất kỳ ORM nào khác có thể xây dựng các truy vấn bằng cách gọi phương thức chuỗi.

[elastictastic](https://github.com/brewster/elastictastic) - Elastictastic là một trình ánh xạ object-document và bộ chuyển đổi API nhẹ cho ElasticSearch. Trường hợp sử dụng chính của Elastictastic là định nghĩa các Model sử dụng ElasticSearch như một kho dữ liệu hướng tài liệu chính và để trưng ra chức năng tìm kiếm của ElasticSearch để truy vấn các model đó.

### Rails Tagging
[Acts-as-taggable-on](https://github.com/mbleigh/acts-as-taggable-on) - Với ActsAsTaggableOn, bạn có thể gắn thẻ một model duy nhất trên một số ngữ cảnh, chẳng hạn như kỹ năng, sở thích và giải thưởng. Nó cũng cung cấp các chức năng nâng cao khác.

## Background Processing
### Background Jobs
[Resque](https://github.com/resque/resque) - Resque là thư viện Ruby được Redis sao lưu để tạo các công việc nền, đặt các công việc đó lên nhiều hàng đợi và xử lý chúng dần dần. Các công việc nền có thể là bất kỳ class hoặc module Ruby nào đáp ứng để thực hiện. Các class hiện tại của bạn có thể dễ dàng được chuyển đổi thành công việc nền hoặc bạn có thể tạo các class mới đặc biệt để làm việc. Hoặc, bạn có thể làm cả hai. Resque được lấy cảm hứng từ DelayedJob và bao gồm ba phần: * Thư viện Ruby để tạo, truy vấn và xử lý công việc * Nhiệm vụ Rake để bắt đầu một tiến trình xử lý công việc * Ứng dụng Sinatra để theo dõi hàng đợi, công việc, và các worker.

[sidekiq](https://github.com/mperham/sidekiq) - Xử lý nền đơn giản, hiệu quả cho Ruby.

[Delayed job](https://github.com/collectiveidea/delayed_job) - Delayed_job (hoặc DJ) đóng gói mô hình phổ biến của việc thực thi không đồng bộ các tác vụ dài trong nền. Nó là một trích xuất trực tiếp từ Shopify, nơi bảng công việc chịu trách nhiệm cho vô số nhiệm vụ cốt lõi.

[Beanstalkd](https://github.com/kr/beanstalkd) - Beanstalk là một hàng đợi công việc đơn giản, nhanh chóng.

[Bunny](https://github.com/ruby-amqp/bunny) - Dễ sử dụng, tính năng Ruby client cho RabbitMQ 3.3 và các phiên bản mới hơn.

[concurrent-ruby](https://github.com/jdantonio/concurrent-ruby) - Công cụ đồng thời hiện đại bao gồm agents, futures, promises, thread pools, actors, supervisors và hơn thế nữa. Lấy cảm hứng từ Erlang, Clojure, Go, JavaScript, actors và các mẫu đồng thời cổ điển.

[delayed_job_active_record](https://github.com/collectiveidea/delayed_job_active_record) - Phụ trợ ActiveRecord cho Delayed::Job, tác giả Tobias Lütke.

[sucker_punch](https://github.com/brandonhilkert/sucker_punch) - Thư viện xử lý không đồng bộ cho Ruby.

[amqp](https://github.com/ruby-amqp/amqp) - Trình khách RabbitMQ dựa trên EventMachine.

[Queue Classic](https://github.com/ryandotsmith/queue_classic) - queue_classic là một thư viện xếp hàng cho các ứng dụng Ruby. (Rails, Sinatra, vv ..) queue_classic có tính năng bỏ phiếu công việc không đồng bộ, cơ sở dữ liệu duy trì khóa và không phụ thuộc vô lý. Như một vấn đề của thực tế, queue_classic chỉ yêu cầu pg.

[Cloud-crowd](https://github.com/documentcloud/cloud-crowd) - Đám đông đột nhiên xuất hiện khi ở đó không có gì trước đó, là một hiện tượng bí ẩn và phổ quát. Một vài người có thể đã đứng cùng nhau -- năm, mười hoặc mười hai, cũng không nhiều hơn; không có gì đã được công bố, không có gì được mong đợi. Đột nhiên ở khắp mọi nơi có rất nhiều người và nhiều hơn nữa đến từ tất cả các bên làm cho tắc nghẽn. CloudCrowd được thiết kế để làm cho việc xử lý phân tán trở nên dễ dàng cho các lập trình viên Ruby.

[backburner](https://github.com/nesquena/backburner) - Beanstalk các công việc nền được thực hiện dễ dàng.

[Beetle](https://github.com/xing/beetle) - Cơ sở hạ tầng truyền tin tin cậy, tính có sẵn cao.

### Daemonizing
[dante](https://github.com/bazaarlabs/dante) - Biến bất kỳ quá trình nào thành một con quỷ.

### Daemon Management
[foreman](https://github.com/ddollar/foreman) - Trình quản lý quy trình cho các ứng dụng có nhiều thành phần.

### Scheduling
[Rufus-scheduler](https://github.com/jmettraux/rufus-scheduler) - Lập lịch trình công việc cho Ruby.

## Code Quality
### Code Metrics
[SimpleCov](https://github.com/colszowka/simplecov) - Code coverage cho Ruby 1.9+ với thư viện cấu hình mạnh mẽ và tự động hợp nhất.

[rubocop](https://github.com/bbatsov/rubocop) - Công cụ kiểm tra kiểu code Ruby tự động. Nhằm mục đích hướng code Ruby theo style của cộng đồng.

[Rails best practices](https://github.com/railsbp/rails_best_practices) - Một công cụ kiểm tra code cho các mã rails, được viết bằng Ruby.

[Reek](https://github.com/troessner/reek) - Reek là một công cụ kiểm tra các class, module và method Ruby và báo cáo bất kỳ đoạn mã tồi nào mà nó tìm thấy.

[coveralls](https://github.com/lemurheavy/coveralls-ruby) - Ruby thực hiện API Coveralls.

[rubycritic](https://github.com/whitesmith/rubycritic) - RubyCritic là một công cụ bao quanh các gem phân tích tĩnh khác nhau để cung cấp một báo cáo về chất lượng code Ruby của bạn.

[foodcritic](https://github.com/acrmp/foodcritic) - Công cụ Lint cho sách dạy nấu ăn.

[MetricFu](https://github.com/metricfu/metric_fu) - Kiểm tra code từ Flog, Flay, Saikuro, Churn, Reek, Roodi, Code Statistics, và Rails Best Practices. (và tùy chọn RCov)

[guard-rubocop](https://github.com/yujinakayama/guard-rubocop) - Guard::Rubocop tự động kiểm tra kiểu code Ruby với RuboCop khi các tập tin được sửa đổi.

## Communication
### Asynchronous E-Mail
[Resque Mailer](https://github.com/zapnap/resque_mailer) - Rails plugin để gửi email không đồng bộ với ActionMailer và Resque.

### CRM Apps
[Fat free crm](https://github.com/fatfreecrm/fat_free_crm) - Nền tảng Ruby on Rails CRM cho Web 2.0 và hơn thế nữa.

### E-Mail Preview
[MailCatcher](https://github.com/sj26/mailcatcher) - MailCatcher chạy một máy chủ SMTP cực kỳ đơn giản, bắt bất kỳ thư nào được gửi đến nó để hiển thị trong giao diện web. Chạy trình quản lý thư, đặt ứng dụng yêu thích của bạn để phân phối tới smtp: //127.0.0.1: 1025 thay vì máy chủ SMTP mặc định của bạn, sau đó vào http://127.0.0.1:1080 để xem thư.

[Letter Opener](https://github.com/ryanb/letter_opener) - Khi thư được gửi từ ứng dụng của bạn, Letter Opener sẽ mở bản xem trước trong trình duyệt thay vì gửi ngay.

[mail_view](https://github.com/37signals/mail_view) - Kiểm tra email trực quan.

[Rails Email Preview](https://github.com/glebm/rails_email_preview) - Một Rails Engine để xem trước văn bản thuần và email html trong trình duyệt của bạn.

[sanitize_email](https://github.com/pboling/sanitize_email) - Email Condom cho máy chủ Ruby của bạn. Trong Rails, Sinatra, ..., hoặc đơn giản là gem mail: Hỗ trợ trong development, testing, QA và production khắc phục sự cố, các vấn đề email mà không lo lắng rằng các email sẽ được gửi trực tiếp đến các địa chỉ thực tế.

### E-Mail Processing
[griddler](https://github.com/thoughtbot/griddler) - SendGrid Parse API client Rails Engine.

[Mailman](https://github.com/titanous/mailman) - Mailman giúp dễ dàng xử lý các email đến bằng một DSL định tuyến đơn giản.

[mail_room](https://github.com/tpitale/mail_room) - mail_room sẽ proxy email (gmail) từ IMAP đến một phương thức phân phối.

### E-Mail Sending

[Action Mailer](https://github.com/rails/rails) - Email trên Rails. Soạn, phân phối, nhận và kiểm tra email bằng cách sử dụng mẫu controller/view quen thuộc. First-class hỗ trợ email nhiều phần và tệp đính kèm.

[Mail](https://github.com/mikel/mail) - Một trình xử lý thực sự của Ruby Mail.

### Exchange Clients
[viewpoint](https://github.com/zenchild/Viewpoint) - Một thư viện truy cập máy khách Ruby cho Microsoft Exchange Web Services (EWS). Bạn có thể tìm thấy các ví dụ tại đây: http://distributed-frostbite.blogspot.com.

### Forum Systems
[forem](https://github.com/radar/forem) - The best Rails 3 and Rails 4 forum engine. Ever.

### Inline CSS for E-Mail
[Roadie](https://github.com/mange/roadie) - Roadie cố gắng gửi email HTML chèn các stylesheets và viết lại các URL tương đối cho bạn.

### IRC Bots
[Cinch](https://github.com/cinchrb/cinch) - Một DSL đơn giản, thân thiện để tạo chương trình IRC.

## Content Management & Blogging
### Blog Engines
[Publify](https://github.com/fdv/publify) - Vì Typo đã tồn tại từ tháng 3 năm 2005, đây có thể là nền tảng viết blog lâu đời nhất trong Rails. Nó có một bộ đầy đủ các tính năng mà bạn mong đợi từ một công cụ như vậy, bao gồm khả năng SEO mạnh mẽ, đầy đủ các chủ đề và các plug-in mở rộng.

[blogit](https://github.com/KatanaCode/blogit) - Thêm một blog vào ứng dụng Rails của bạn trong vài phút với Công cụ Rails mountable này.

### Content Management
[Refinery CMS](https://github.com/refinery/refinerycms) - Một Ruby on Rails CMS hỗ trợ Rails 4.2, thân thiện và dễ mở rộng.

[Locomotive](https://github.com/locomotivecms/engine) - LocomotiveCMS là một hệ thống CMS thế hệ tiếp theo với các công cụ quản trị tuyệt vời, khuôn mẫu mềm và chỉnh sửa nội tuyến được hỗ trợ bởi mongodb và đường Rails 3.2

[Comfortable Mexican Sofa](https://github.com/comfy/comfortable-mexican-sofa) - ComfortableMexicanSofa là một Rails 4 CMS Engine mạnh mẽ.

[Radiant](https://github.com/radiant/radiant) - Radiant là một hệ thống xuất bản đơn giản và mạnh mẽ được thiết kế cho các nhóm nhỏ. Nó được xây dựng với Rails và tương tự như Textpattern hoặc MovableType, nhưng là một hệ thống quản lý nội dung mục đích chung - không chỉ đơn thuần là một công cụ viết blog.

[Alchemy CMS](https://github.com/magiclabs/alchemy_cms) - Alchemy là một Rails 4 CMS mạnh mẽ, thân thiện và linh hoạt.

### Static Website Generation
[Jekyll](https://github.com/mojombo/jekyll) - Jekyll là một trình tạo trang web tĩnh, đơn giản, blog aware.

[Middleman](https://github.com/middleman/middleman) - Trình tạo trang web tĩnh. Cung cấp hàng chục hàng chục ngôn ngữ khuôn mẫu (Haml, Sass, Compass, Slim, CoffeeScript, ...). Giúp giảm thiểu, tối ưu, cache busting, Yaml data, ... là một phần dễ dàng trong chu kỳ phát triển của bạn.

[high_voltage](https://github.com/thoughtbot/high_voltage) - Cháy trong vũ trường. Cháy trong ... chuông taco.

[Namnoc](https://github.com/nanoc/nanoc) - Nanoc là một bộ tạo trang web tĩnh tập trung vào tính linh hoạt. Nó biến đổi nội dung từ một định dạng như Markdown hoặc AsciiDoc thành một định dạng khác, thường là HTML và đưa ra các trang một cách nhất quán để duy trì giao diện của trang web trong suốt. Các trang web tĩnh được xây dựng với Nanoc có thể được triển khai tới bất kỳ máy chủ web nào.

[Awestruct](https://github.com/awestruct/awestruct) - Awestruct là một công cụ phát triển và xuất bản trang web tĩnh. Nó hỗ trợ một danh sách rộng lớn của cả ngôn ngữ lập trình và đánh dấu thông qua Tilt (Haml, Slim, AsciiDoc, Markdown, Sass qua Compass, vv), cung cấp bố cục và kiểu dáng di động đầu tiên thông qua Bootstrap hoặc Foundation, cung cấp nhiều tùy chọn triển khai khác nhau (rsync, git, S3), xử lý các tối ưu hóa trang web (giảm thiểu, tối ưu, cache busting), bao gồm các phần mở rộng tích hợp như quản lý bài đăng trên blog và có khả năng mở rộng cao.

### Wiki Apps
[Gollum](https://github.com/gollum/gollum) - Đơn giản, Wiki được Git hỗ trợ với API và giao diện người dùng cục bộ.

[Instiki](https://github.com/parasew/instiki) - Instiki là một bản sao Wiki được viết bằng Ruby đi kèm với một máy chủ web nhúng. Bạn có thể thiết lập Instiki chỉ bằng một vài bước. Có thể là thiết lập wiki đơn giản nhất từ trước tới nay.

[Irwi](https://github.com/alno/irwi) - Irwi là plugin Ruby on Rails bổ sung chức năng wiki vào ứng dụng của bạn.

## Data Persistence
### Amazon DynamoDB
### CouchDB Clients
[Couchrest](https://github.com/couchrest/couchrest) - CouchRest cung cấp một giao diện đơn giản trên đầu trang API RESTful HTTP của CouchDB, cũng như bao gồm một số kịch bản tiện ích để quản lý các view và các tệp đính kèm.

[CouchRest Model](https://github.com/couchrest/couchrest_model) - CouchRest Model cung cấp các tính năng bổ sung cho lớp CouchRest Document chuẩn như các thuộc tính, thiết kế view, các liên kết, callbacks, định kiểu và xác nhận hợp lệ.

[Couch potato](https://github.com/langalex/couch_potato) - Ruby persistence layer for CouchDB.

### CSV Parsers
### Data Migration
### MongoDB Clients
[Mongo Ruby Driver](https://github.com/mongodb/mongo-ruby-driver) - Trình điều khiển Ruby cho MongoDB.

[MongoMapper](https://github.com/jnunemaker/mongomapper) - MongoMapper là một Object-Document Mapper cho Ruby and Rails.

## Data Persistence
### Amazon DynamoDB
### CouchDB Clients
[Couchrest](https://github.com/couchrest/couchrest) - CouchRest cung cấp một giao diện đơn giản trên đầu trang API RESTful HTTP của CouchDB, cũng như bao gồm một số kịch bản tiện ích để quản lý các view và các tệp đính kèm.

[CouchRest Model](https://github.com/couchrest/couchrest_model) - CouchRest Model cung cấp các tính năng bổ sung cho lớp CouchRest Document chuẩn như các thuộc tính, thiết kế view, các liên kết, callbacks, định kiểu và xác nhận hợp lệ.

[Couch potato](https://github.com/langalex/couch_potato) - Ruby persistence layer for CouchDB.

### CSV Parsers
### Data Migration
### MongoDB Clients
[Mongo Ruby Driver](https://github.com/mongodb/mongo-ruby-driver) - Trình điều khiển Ruby cho MongoDB.

[MongoMapper](https://github.com/jnunemaker/mongomapper) - MongoMapper là một Object-Document Mapper cho Ruby and Rails.

### Object-relational mapping
[Active Record](https://github.com/rails/rails) - Cơ sở dữ liệu trên Rails. Xây dựng mô hình miền liên tục bằng cách ánh xạ các bảng cơ sở dữ liệu đến các lớp Ruby. Các quy ước mạnh mẽ cho các associations, validations, aggregations, migrations, và testing được đưa vào.

[Sequel](https://github.com/jeremyevans/sequel) - Bộ công cụ cơ sở dữ liệu cho Ruby.

[Squeel](https://github.com/ernie/squeel) - Squeel mở ra sức mạnh của Arel trong ứng dụng Rails của bạn với một cú pháp dựa trên block tiện dụng. Bạn có thể viết truy vấn phụ, truy cập các hàm được đặt tên do RDBMS của bạn cung cấp, và nhiều hơn nữa, tất cả mà không cần viết chuỗi SQL. Hỗ trợ Rails 3 và 4.

[Ruby Object Mapper](https://github.com/rom-rb/rom) - Bộ công cụ persistence and mapping cho Ruby.

### Redis Clients
[Redis Ruby](https://github.com/redis/redis-rb) - Một máy Ruby cố gắng kết hợp một-một với API của Redis, trong khi vẫn cung cấp một giao diện thành ngữ. Nó có tính năng thread-safety, client-side sharding, pipelining, và một nỗi ám ảnh cho hiệu suất.

[Redis Store](https://github.com/jodosha/redis-store) - Namespaced Rack::Session, Rack::Cache, I18n và cache Redis cho các Ruby web framework.

[Redis Objects](https://github.com/nateware/redis-objects)- Ánh xạ các loại Redis trực tiếp đến các đối tượng Ruby. Làm việc với bất kỳ class hoặc ORM.

[Ohm](https://github.com/soveran/ohm) - Ohm là một thư viện cho phép lưu trữ một đối tượng trong Redis, một cơ sở dữ liệu key-value liên tục. Nó có hiệu suất rất tốt.

### SQL Database Adapters
[mysql2](https://github.com/brianmario/mysql2) - Một thư viện Mysql đơn giản, nhanh chóng cho Ruby, ràng buộc với libmysql.

[sqlite3-ruby](https://github.com/luislavena/sqlite3-ruby) - Module này cho phép các chương trình Ruby giao tiếp với cơ sở dữ liệu SQLite3.

[jdbc-mysql](https://github.com/jruby/activerecord-jdbc-adapter) - Cài đặt gem require 'jdbc/mysql' và gọi Jdbc::MySQL.load_driver trong JRuby để nạp trình điều khiển.

[jdbc-postgres](https://github.com/jruby/activerecord-jdbc-adapter) - Cài đặt gem require 'jdbc/postgres' và gọi Jdbc::Postgres.load_driver trong JRuby để nạp trình điều khiển.

[ruby-oci8](https://github.com/kubo/ruby-oci8) - ruby-oci8 là một giao diện ruby cho Oracle sử dụng API OCI8. Nó có sẵn với Oracle 10g hoặc mới hơn bao gồm cả Oracle Instant Client.

[postgresql_cursor](https://github.com/afair/postgresql_cursor) - PostgreSQL Cursor là một phần mở rộng của PostgreSQLAdapter ActiveRecord cho các tập kết quả rất lớn. Nó cung cấp một con trỏ open/fetch/close để truy cập dữ liệu mà không cần tải tất cả các hàng vào bộ nhớ, và thay vào đó tải các hàng kết quả theo "khối" (mặc định là 1000 hàng), đệm chúng và trả về từng hàng một.

## E-Commerce and Payments
### Online Shops
[Spree](https://github.com/spree/spree) - Spree là một framework thương mại điện tử mã nguồn mở cho Ruby on Rails. Tham gia với chúng tôi trên http://slack.spreecommerce.com

[RoR eCommerce](https://github.com/drhenner/ror_ecommerce) - Nền tảng thương mại điện tử Ruby on Rails, giải pháp hoàn hảo cho việc kinh doanh nhỏ của bạn.

### Payments
[Active Merchant](https://github.com/Shopify/active_merchant) - Active Merchant là một thư viện trừu tượng thanh toán đơn giản được sử dụng trong và được tài trợ bởi Shopify. Nó được viết bởi Tobias Luetke, Cody Fauser, và những người đóng góp.

[Stripe](https://github.com/stripe/stripe-ruby) - Stripe là cách dễ nhất để chấp nhận thanh toán trực tuyến. Xem https://stripe.com để biết chi tiết.

[braintree](https://github.com/braintree/braintree_ruby) - Thư viện Ruby tích hợp với Cổng Braintree.

[stripe_event](https://github.com/integrallis/stripe_event) - Tích hợp webhook cho các ứng dụng Rails.

[adyen](https://github.com/wvanbergen/adyen) - Gói để đơn giản hóa bao gồm các dịch vụ thanh toán Adyen vào ứng dụng Ruby on Rails. Gói này cung cấp chức năng tạo biểu mẫu thanh toán, xử lý và lưu trữ thông báo được gửi bởi Adyen và sử dụng các dịch vụ SOAP do Adyen cung cấp. Hơn nữa, nó chứa các phương thức trợ giúp, mocks và matchers để mô phỏng các tests/specs cho mã của bạn.

[sepa_king](https://github.com/salesking/sepa_king) - Triển khai pain.001.002.03 và pain.008.002.02 (ISO 20022).

### Subscription Management
## Fun
### Game libraries
[Gosu](https://github.com/jlnr/gosu) - Thư viện phát triển trò chơi 2D. Gosu có giao diện dễ sử dụng và thân thiện với trò chơi với đồ họa 2D và văn bản (được tăng tốc bằng phần cứng 3D), mẫu âm thanh và âm nhạc cũng như bàn phím, chuột và đầu vào gamepad/joystick. Cũng bao gồm các trình diễn để tích hợp với RMagick, Chipmunk và OpenGL.

### Music & MIDI
-----
Trên đây là phần đầu của Awesome Ruby Toolbox, phần tiếp theo bao gồm Graphics, QR Codes, Security, ...

-----



Xem thêm tại https://github.com/debbbbie/awesome-ruby-toolbox