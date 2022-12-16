![](https://images.viblo.asia/f7be7f80-a908-4067-bac4-353cd12a1010.png)

Đến với ngôn ngữ Ruby và làm việc với framework Ruby on Rails thì chắc chắn bạn không còn xa lạ gì với khái niệm **RUBYGEMS** (gọi ngắn gọn là **GEMS**), GEMS có thể được sử dụng để mở rộng hoặc sửa đổi chức năng trong các ứng dụng được viết bằng ngôn ngữ Ruby (Ruby applications). Thông thường chúng được sử dụng để phân phối chức năng có thể tái sử dụng được chia sẻ với các Rubyists khác để sử dụng trong các ứng dụng và thư viện của chúng. Một số GEMS cung cấp các command tiện ích để giúp tự động hóa các tác vụ (tasks) và tăng tốc công việc trong quá trình xây dựng ứng dụng.

Trong bài viết này, mình sẽ liệt kê tập hợp các Ruby gems awesome được sử dụng trong quá trình xây dựng ứng dụng Rails (Rails application)
## User
### Authentication
* [Devise](https://github.com/plataformatec/devise/): cung cấp giải pháp xác thực người dùng linh hoạt cho Rails application dựa trên [Warden](https://github.com/wardencommunity/warden/wiki).
* [Knock](https://github.com/nsarno/knock): xác thực JWT (Json Web Token) cho Rails API.
* [Clearance](https://github.com/thoughtbot/clearance): xác thực với username và password.
* [Devise token auth](https://github.com/lynndylanhurley/devise_token_auth): xác thực dựa trên token cho Rails JSON API.
* [Sorcery](https://github.com/Sorcery/sorcery): xác thực cho Rails application, hỗ trợ: ActiveRecord, DataMapper, Mongoid and MongoMapper.
### Authorization
* [Pundit](https://github.com/varvet/pundit): cung cấp tập hợp các helpers, hướng dẫn bạn sử dụng các Ruby classes thông thường và các design patterns để xây dựng một hệ thống ủy quyền đơn giản, mạnh mẽ và có khả năng mở rộng.
* [Cancancan](https://github.com/CanCanCommunity/cancancan): thư viện mạnh mẽ hỗ trợ việc ủy quyền cho Ruby on Rails, hạn chế những tài nguyên (resources) mà người dùng được phép truy cập.
* [Rolify](https://github.com/RolifyCommunity/rolify): thư viện quản lý role với phạm vi resources tương ứng.
### Omniauth
* [omniauth-facebook](https://github.com/mkdynamic/omniauth-facebook)
* [omniauth-google-oauth2](https://github.com/zquestz/omniauth-google-oauth2)
* [omniauth-weibo-oauth2](https://github.com/beenhero/omniauth-weibo-oauth2)
* [omniauth-twitter](https://github.com/arunagw/omniauth-twitter)
* [omniauth-github](https://github.com/omniauth/omniauth-github)
* [omniauth-linkedin-oauth2](https://github.com/decioferreira/omniauth-linkedin-oauth2)
## ActiveRecord
* [Enumerize](https://github.com/brainspec/enumerize)
* [counter_culture](https://github.com/magnusvk/counter_culture): `Turbo-charged counter caches` cho Rails application.
* [custom_counter_cache](https://github.com/cedric/custom_counter_cache): cách tiếp cận đơn giản để tạo counter cache tùy chỉnh trong Rails, có thể sử dụng trong nhiều models.
* [Sequenced](https://github.com/derrickreimer/sequenced): là một gem đơn giản để sinh tuần tự ID cho ActiveRecord models.
* [FriendlyId](https://github.com/norman/friendly_id): cho phép tạo url đẹp và thân thiện với người dùng.
* [AASM](https://github.com/aasm/aasm): State machine cho Ruby classes (plain Ruby, Rails Active Record, Mongoid).
* [PaperTrail](https://github.com/paper-trail-gem/paper_trail): cho phép theo dõi sự thay đổi của dữ liệu trong models.
* [Paranoia](https://github.com/rubysherpas/paranoia): ActiveRecord plugin cho phép ẩn và khôi phục lại bản ghi mà không thực sự xóa chúng.
* [Validates](https://github.com/kaize/validates): cung cấp tập hợp các `validators` tùy chỉnh hữu ích cho Rails application, bao gồm:
> - EmailValidator
> - UrlValidator
> - SlugValidator
> - MoneyValidator
> - IpValidator
> - AssociationLengthValidator
> - AbsolutePathValidator
> - UriComponentValidator
> - ColorValidator
> - EanValidator (EAN-8 & EAN-13)
* [Globalize](https://github.com/globalize/globalize): Rails I18n thư viện chuẩn cho ActiveRecord model/data translation.
* [deep_cloneable](https://github.com/moiristo/deep_cloneable)
* [social_share](https://github.com/Timrael/social_shares): kiểm tra số lần url được chia sẻ trên mạng xã hội.
* [puclic_activity](https://github.com/chaps-io/public_activity): cách đơn giản để tracking các hoạt động trên models.
* [Goldiloader](https://github.com/salsify/goldiloader): ActiveRecord eager loading tự động để giảm số lượng truy vấn cơ sở dữ liệu cho ứng dụng.
* Tagging:
> - [ActsAsTaggableOn](https://github.com/mbleigh/acts-as-taggable-on): cho phép gắn thẻ tùy chỉnh trong Rails application.
> - [closure_tree](https://github.com/ClosureTree/closure_tree): dễ dàng và hiệu quả để tạo nên ActiveRecord models hỗ trợ phân cấp.
* [ActionStore](https://github.com/rails-engine/action-store): lưu trữ những loại actions khác nhau (như: like, flow, star, block, ...) trên một bảng thông qua ActiveRecord Polymorphic Association.
## Plugins
* [Spreadsheet](https://github.com/zdavatz/spreadsheet): thư viện được thiết kế để đọc và viết tài liệu spreadsheet.
* [Chartkick](https://github.com/ankane/chartkick): tạo biểu đồ cho ứng dụng.
* [Kaminari](https://github.com/kaminari/kaminari): phân trang.
* [CKEditor](https://github.com/galetahub/ckeditor): text editor được thiết kế để đơn giản hóa việc tạo nội dung trên web.
* [HTML::Pipeline](https://github.com/jch/html-pipeline): Github HTML xử lý các bộ lọc (filters) và tiện ích (utilities).
* [Slack Notifier](https://github.com/stevenosloan/slack-notifier): gửi thông báo tới Slack webhooks.
* [Rails ERD](https://github.com/voormedia/rails-erd): tạo Entity-Relationship Diagrams cho Rails applications.
* [Parity](https://github.com/thoughtbot/parity)
* [Airblussh](https://github.com/mattbrictson/airbrussh)
## API
* [Grape](https://github.com/ruby-grape/grape): Micro-framework để tạo REST-ful APIs trong Ruby
* [ActiveModel::Serializers](https://github.com/rails-api/active_model_serializers)
* [Jbuilder](https://github.com/rails/jbuilder): cung cấp DSL đơn giản để khai báo các cấu trúc JSON.
* [rest-client](https://github.com/rest-client/rest-client): HTML và REST-ful đơn giản cho Ruby.
* [has_scope](https://github.com/plataformatec/has_scope): mapping controller params đến các scope được đặt tên trong resource.
* Documentation:
> - [Grape Swagger](https://github.com/ruby-grape/grape-swagger): tự động tạo tài liệu trên Grape API.
> - [Grape Swagger UI](https://github.com/swagger-api/swagger-ui): hiển thị các tài liệu được tạo ra khi sử dụng Grape Swagger.
> - [apiary](https://apiary.io/): design, prototype, document, test API.
> - [apiblueprint](https://apiblueprint.org/)
## Email
- [letter_opener](https://github.com/ryanb/letter_opener): preview mail trên trình duyệt.
## File uploading
* [Carrierwave](https://github.com/carrierwaveuploader/carrierwave): cung cấp giải pháp upload files cho Rails, Sinatra, và các framework Ruby web khác.
> - [carrierwave_backgrounder](https://github.com/lardawge/carrierwave_backgrounder): giảm tải việc xử lý và lưu trữ ảnh, sử dụng Delay job, Resque, Sidekiq, Qu, Queue Classic or Girl Friday.
> - [Carrierwave Crop](https://github.com/kirtithorat/carrierwave-crop/): crop ảnh được upload sử dụng Jcrop plugin với chế độ xem trước.
> - [CarrierWave ImageOptimizer](https://github.com/jtescher/carrierwave-imageoptimizer)
* [Remotipart](https://github.com/JangoSteve/remotipart): Rails JQuery file uploads thông qua "remote: true" Rails form.
* [MiniMagick](https://github.com/minimagick/minimagick): ruby wrapper cho ImageMagick hay GraphicsMagick command line.
* [fog](https://github.com/fog/fog): Ruby cloud service library.
* [refile](https://github.com/refile/refile): file upload library cho Rails application, đơn giản và mạnh mẽ.
* [Paperclip](https://github.com/thoughtbot/paperclip): file attachment management cho ActiveRecord.
* [Dragonfly](http://markevans.github.io/dragonfly/)
* [Shrine](https://github.com/shrinerb/shrine): file attachment toolkit cho Ruby application.
## Searching
* [Ransack](https://github.com/activerecord-hackery/ransack): hỗ trợ tìm kiếm đơn giản và nâng cao cho Rails application.
* [Elasticsearch-rails](https://github.com/elastic/elasticsearch-rails): Elasticsearch tích hợp cho ActiveModel/Record và Rails.
* [Chewy](https://github.com/toptal/chewy): high-level Elasticsearch Ruby framework.
* [pg_search](https://github.com/Casecommons/pg_search): hỗ trợ full-text search của PostgreSQL.
* [Sunspot](https://github.com/sunspot/sunspot): Ruby library tương tác mạnh mẽ với Solr search engine.
* [Searchkick](https://github.com/ankane/searchkick): tìm kiếm thông minh một cách dễ dàng với Rails và Elasticsearch.
## Scheduled/Recurrence Jobs
* [Whenever](https://github.com/javan/whenever): Ruby gems cung cấp cú pháp rõ ràng để viết và triển khai cron job.
* [Resque](https://github.com/resque/resque): Redis-backed Ruby library để tạo bacground jobs, đặt chúng vào nhiều hàng đợi, và xử lý chúng sau đó.
* [Rufus-Scheduler](https://github.com/jmettraux/rufus-scheduler): Ruby gems để lập lịch jobs.
* [Delayed Job](https://github.com/collectiveidea/delayed_job)
* [Sidekiq](https://github.com/mperham/sidekiq): xử lý tác vụ ngầm một cách đơn giản và hiệu quả cho Ruby:
> - [Sidetiq](https://github.com/endofunky/sidetiq): Recurring jobs cho Sidekiq.
> - [Sidekiq-cron](https://github.com/ondrejbartas/sidekiq-cron): Scheduler/Cron cho Sidekiq jobs.
> - [Sidekiq-scheduler](https://github.com/Moove-it/sidekiq-scheduler)
* [Sucker Punch](https://github.com/brandonhilkert/sucker_punch): thư viện xử lý bất đồng bộ của Ruby.
## View Helper
* [Formtastic](https://github.com/justinfrench/formtastic)
* [Simple form](https://github.com/plataformatec/simple_form)
* [Nested form](https://github.com/ryanb/nested_form)
* [meta-tags](https://github.com/kpumuk/meta-tags): Search Engine Optimization (SEO) plugin cho Rails application.
* [active_link_to](https://github.com/comfy/active_link_to): thêm css class `active` vào links.
* [Cocoon](https://github.com/nathanvda/cocoon): Dynamic nested forms sử dụng jQuery.
## Environment Variables
* [Config](https://github.com/railsconfig/config)
* [Figaro](https://github.com/laserlemon/figaro)
* [Dotenv](https://github.com/bkeepers/dotenv)
* [opsworks-dotenv](https://github.com/mikamai/opsworks-dotenv)
## Admin Panel
* [ActiveAdmin](https://github.com/activeadmin/activeadmin)
* [RailsAdmin](https://github.com/sferik/rails_admin)
* [Typus](https://github.com/typus/typus)
* [Administrate](https://github.com/thoughtbot/administrate)
* [Trestle](https://github.com/TrestleAdmin/trestle)
## Logging
* [Impressionist](https://github.com/charlotte-ruby/impressionist)
* [Ahoy](https://github.com/ankane/ahoy)
* [Lograge](https://github.com/roidrage/lograge)
## Debug
* [byebug](https://github.com/deivid-rodriguez/byebug): đơn giản để sử dụng, giàu tính năng với debugger.
> - [pry-byebug](https://github.com/deivid-rodriguez/pry-byebug)
* [pry-rails](https://github.com/rweng/pry-rails)
* [awesome_print](https://github.com/awesome-print/awesome_print)
* [web-console](https://github.com/rails/web-console)
* [spring](https://github.com/rails/spring)
* [rails-footnotes](https://github.com/josevalim/rails-footnotes)
## Coding Style
* [RuboCop](https://github.com/rubocop-hq/rubocop)
* [Rails Best Practice](https://github.com/flyerhzm/rails_best_practices)
* [Metric Fu](https://github.com/metricfu/metric_fu)
* [Pronto](https://github.com/prontolabs/pronto)
## Testing
- [Rspec Rails](https://github.com/rspec/rspec-rails)
- [Capybara](https://github.com/teamcapybara/capybara)
> - [capybara-webkit](https://github.com/thoughtbot/capybara-webkit)
> - [selenium-webdriver](https://github.com/vertis/selenium-webdriver)
> - [poltergeist](https://github.com/teampoltergeist/poltergeist)
> - [page-object](https://github.com/cheezy/page-object)
* [factory_bot](https://github.com/thoughtbot/factory_bot)
* [factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails)
* [factory_factory_girl](https://github.com/st0012/factory_factory_girl)
* [Database Cleaner](https://github.com/DatabaseCleaner/database_cleaner)
* [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers)
* [ResponseCodeMatchers](https://github.com/r7kamura/response_code_matchers)
* [SimpleCov](https://github.com/colszowka/simplecov)
## Security
* [Brakeman](https://github.com/presidentbeef/brakeman): một công cụ phân tích tĩnh kiểm tra các lỗ hổng bảo mật cho các Rails application.
* [bundle-audit](https://github.com/rubysec/bundler-audit): kiểm tra `sự an toàn` các phiên bản của gems, và gems source.
* [Secure Headers](https://github.com/twitter/secure_headers)
## Production
* [Capistrano](https://github.com/capistrano/capistrano)
* [Slowpoke](https://github.com/ankane/slowpoke)
* [Rack Attack](https://github.com/kickstarter/rack-attack)
* [Responders](https://github.com/plataformatec/responders)
* [production_rails](https://github.com/ankane/production_rails)
* [Mina](https://github.com/mina-deploy/mina)
## Error Logging
* [Rollbar](https://github.com/rollbar/rollbar-gem)
* [Airbrake](https://github.com/airbrake/airbrake)
* [Errbit](https://github.com/errbit/errbit)
## Database
* [rails_db](https://github.com/igorkasyaphuf hnchuk/rails_db)
## Asset Pipeline
* [Alaska](https://github.com/mavenlink/alaska)

> Trên đây mình đã liệt kê ra một số GEMS điển hình, và tùy mỗi ứng dụng khác nhau mà sử dụng chúng cho phù hợp để có một Rails application awesome.
## Tài liệu tham khảo 
1, [Guides Ruby gems](https://guides.rubygems.org/)

2, [Awesome Rails gems](https://github.com/hothero/awesome-rails-gem)