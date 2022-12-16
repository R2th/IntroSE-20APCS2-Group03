Log hệ thống là một thứ tuyệt vời để giúp cho một lập trình viên có thể điều tra khi xảy ra sự cố.
Tuy nhiên nó cũng sẽ làm cho một lập trình viên cảm thấy khủng hoảng khi phải điều đọc, kiểm tra một lúc rất nhiều dịch vụ khác nhau để tìm ra được vấn đề.  Vì vậy có một ý tưởng là tổng hợp lại tất cả các log của hệ thống vào một máy chủ hoặc một ứng dụng có khả năng dễ dàng phân tích và tìm kiếm.

Theo mình tìm hiểu và được gợi ý ban đầu thì có một dịch vụ rất được ưa thích là ELK Stack(Elasticsearch, Logstash, Kibana) được hỗ trợ bởi Elasticsearch.

Tuy nhiên, hôm nay mình muốn giới thiệu một ứng dụng có thể trợ giúp giống vậy là [Datadog](https://www.datadoghq.com/).

Đây là một đoạn log mà chúng ta thường thấy trong log của Rails server
```
Started GET "/" for ::1 at 2019-05-20 23:32:38 +0700
Processing by HomeController#index as HTML
  Rendering home/index.html.erb within layouts/application
  Rendered home/index.html.erb within layouts/application (0.5ms)
Completed 200 OK in 40ms (Views: 38.6ms | ActiveRecord: 0.0ms)
```

Và mong muốn mình có thể add được đoạn log này vào trong hệ thống Log Management của DataDog.
![DataDog1](https://images.viblo.asia/157d687c-b08a-4ec1-a9e1-aa917b3f068a.png)

## Thêm Gem cho Rails server
```
gem 'logging-rails', :require => 'logging/rails'
gem 'lograge'
```

## Cài đặt cho gem lograge

```
# Lograge config
config.lograge.enabled = true

# We are asking here to log in RAW (which are actually ruby hashes). The Ruby logging is going to take care of the JSON formatting.
config.lograge.formatter = Lograge::Formatters::Raw.new

# This is is useful if you want to log query parameters
config.lograge.custom_options = lambda do |event|
    { :ddsource => ["ruby"],
      :params => event.payload[:params].reject { |k| %w(controller action).include? k }
    }
end
```
Sau khi chạy bước này, bạn ko nên hoảng loạn khi thấy server chạy mà ko có log mà hãy tới bước tiếp theo.

## Config Log-rails
Thực hiện lệnh sau:
```
rails generate logging:install
Running via Spring preloader in process 602
      create  config/logging.rb
      insert  config/environments/development.rb
      insert  config/environments/production.rb
      insert  config/environments/development.rb
      insert  config/environments/production.rb
```

Chuẩn hóa lại định dạng của log sang json ở file `logging.rb`

```
# Objects are converted to strings using the :inspect method.
  Logging.format_as :json
```

Định nghĩa kiểu format cho json:

```
# The JSON layout
json_layout = Logging.layouts.json

# For instance, a file appender that'll going to be forwarder by a syslog Agent to Datadog
Logging.appenders.file(
    'datadog',
    :filename => config.paths['log'].first,
    :layout => json_layout
)
```

Kết quả sau khi config  chúng ta xem log server.

```
[2019-05-20T23:50:20] INFO  Rails : <Hash> {"method":"GET","path":"/","format":"html","controller":"HomeController","action":"index","status":200,"duration":255.57,"view":247.84,"db":0.0,"ddsource":["ruby"],"params":{}}

```

## Bước Cuối cùng

Thêm file config Datadog `sudo vi /etc/datadog-agent/conf.d/ruby.d/conf.yml`.

```
 1 conf.yml                                                                                                                                     X 
 #Log section
 logs:
 
     # - type : file (mandatory) type of log input source (tcp / udp / file)
     #   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
     #   service : (mandatory) name of the service owning the log
     #   source : (mandatory) attribute that defines which integration is sending the logs
     #   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribtue
     #   tags: (optional) add tags to each logs collected
 
   - type: file
     path: /home/framgia/Desktop/ruby-rails/data-dog-example/log/development.log
         service: data-dog-example-myapplication-demo
     source: ruby
     sourcecategory: sourcecode
     #For multiline logs, if they start with a timestamp with format yyyy-mm-dd uncomment the below processing rule
     log_processing_rules:
       - type: multi_line
         pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
         name: quytv_new_log_start_with_date
```

Thêm log cho service `Datadog-agent` bằng cách thêm dòng sau ở file: `/etc/datadog-agent/datadog.yaml`

```
logs_enabled: true
```

Cuối cùng khởi động lại service `Datadog`

```
sudo /etc/init.d/datadog-agent status
-> datadog-agent start/running, process 10443
sudo /etc/init.d/datadog-agent stop
-> datadog-agent stop/waiting
sudo /etc/init.d/datadog-agent start
datadog-agent start/running, process 2998
```

Cuối cùng chúng ta đã xong và hãy bật server Rails để kiểm tra log => Đợi 2->3 phút để kiểm tra  log trong Datadog.

### Chú ý

Nếu bạn làm theo hướng dẫn trên thì file log rails server của bạn sẽ khác so với trước rất nhiều, vì chúng đã được định dạng sang Json. Vì vậy nếu không thấy quen thì bạn hoàn toàn có thể bỏ bước sử dụng 2 gem (logging-rails, lograge) mà thay vào đó thực hiện luôn bước cuối cùng, chúng ta vẫn sẽ có log được đồng bộ lên services của Datadog.

## Kết quả

Sau khi đợi mình có kết quả:

![Kết quả](https://images.viblo.asia/8499acbc-664c-4bdf-a932-df4e9636996f.png)

Để thực hiện với log của nhiều server Rails khác nhau bạn có thể làm tương tự, nó có thể giúp bạn rút ngắn thời gian điều tra log rất nhiều.

Đồng thời Datadog cũng có hỗ trợ rất nhiều log cho các services khác nhau như: Mysql, Nginx, Elasticsearch... vì vậy các bạn có thê tìm hiểu thêm.

Bài này mình ko nói đến cài đặt Datadog-agent tuy nhiên bạn có thể tự tìm kiếm tại Viblo có hướng dẫn rồi.

Chúc may mắn.