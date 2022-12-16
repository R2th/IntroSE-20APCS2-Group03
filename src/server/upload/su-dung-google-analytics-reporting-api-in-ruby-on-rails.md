Hiểu điều khách hang muốn, bán thứ khách hàng cần là điều kiện đầu tiên khi bán hàng. Điều đó đặc biệt đúng với ngành thương mại điện tử nói chung. Tiếp cận khách hàng từ xa qua các website là cách tốt nhất, nhanh nhất và rẻ nhất để quảng cáo sản phẩm. Việc tổng hợp phân tích xây dựng phác đồ hành vi tiêu dùng khách hàng có thể hiểu những gì ảnh hưởng đến quyết định mua hàng của người tiêu dùng. Bằng cách hiểu làm thế nào người tiêu dùng quyết định về một snarn phẩm, họ có thể lấp đầy khoảng trống trên thị trường và xác định các sản phẩm cần thiết và các sản phẩm đã lỗi thời. Nghiên cứu hành vi của người tiêu dùng là bí mật quan trọng để tiếp cận và thu hút khách hàng giúp các nhà marketing quyết định cách trình bày sản phẩm của họ theo cách tạo ra tác động tối đa đến người tiêu dùng.
### Google Analytics Reporting API
***GA V4*** là một trong những nền tảng phân tích web phổ biến nhất, cho phép thu nhập dữ liệu tự động về người dùng truy cập trang web. Nó là dịch vụ miễn phí của Google cho phép tạo ra các bảng thống kê chi tiết về khách hàng, cung cấp một số liệu ấn tượng ( lượt xem trang, nước xuất xứ, thời giant rung bình trên trang,v.v…), xây dựng bảng điều khiển tùy chỉnh để hiển thị dữ kiệu Google Analytics, tự động hóa các nhiệm vụ báo cáo phức tạp để tiết kiệm thời gian, tích hợp dữ kiệu Google Analytics của khách hàng với các ứng dụng kinh doanh khác.

### Tích hợp báo cáo API vào ứng dụng Ruby on Rails 
Bước 1 Tạo tài khoản dịch vụ theo hướng dẫn phần Enable the API  
https://developers.google.com/analytics/devguides/reporting/core/v4/quickstart/service-py

Bước 2 Thêm tài khoản dịch vụ vào tài khoản GG Analytics  
Tài khoản dịch vụ sau khi tạo sẽ có email riêng  
Đăng nhập tài khoản gg analystics và thêm quyền cho tài khoản  https://support.google.com/analytics/answer/1009702   

Bước 3 Cài đặt thư viện 
 -  client  
`gem 'google-api-client', '~> 0.11', require: ‘google/apis/analyticsreporting_v4’ `
-    Google Auth  
`gem install googleauth `

### Sử dụng google analytic api để thông kê lưu lượng người dùng
Trước khi bắt đầu tích hợp, bạn cần đăng nhập vào google console developer, enable google analytic API và google analytic reporting API, tạo project, service account rùi add nó đến tài khoản google analytic bên trên. Hướng dẫn theo link:
[https://developers.google.com/analytics/devguides/reporting/core/v4/quickstart/service-py](https://developers.google.com/analytics/devguides/reporting/core/v4/quickstart/service-py )

Mặc định, các API của google sử dụng authenticate oauth2 nên chúng ta sẽ thực hiện một số bước sau để lấy access_token:

```ruby
#lib/tasks/analytics.rake
require 'google/apis/analyticsreporting_v4'
require 'google/api_client/auth/key_utils'

namespace :analytics do
  desc 'get popular posts from google analytics'

  task popular_posts: :environment do
    keyfile = Rails.root.join('google_analytics.p12')
    analytics = Google::Apis::AnalyticsreportingV4
    client = analytics::AnalyticsReportingService.new
    client.authorization = Signet::OAuth2::Client.new(
      token_credential_uri: '[https://accounts.google.com/o/oauth2/token](https://accounts.google.com/o/oauth2/token)', 
      audience: '[https://accounts.google.com/o/oauth2/token](https://accounts.google.com/o/oauth2/token)',
      scope: '[https://www.googleapis.com/auth/analytics.readonly](https://www.googleapis.com/auth/analytics.readonly)',
      issuer: ENV['GA_ISSUER'],
      signing_key: Google::APIClient::KeyUtils.load_from_pkcs12(keyfile, ENV['GA_KEY_SECRET'])
    )
    client.authorization.fetch_access_token!
  end
end
```

Sau đó, dùng access_token nhận được để get thống kê lưu lượng trang web qua API 
```ruby
view_id = ENV['GA_VIEW_ID']
metric = analytics::Metric.new(expression: 'ga:pageviews', alias: 'pageviews')
dimension = analytics::Dimension.new(name: 'ga:pagePath')
date_range = analytics::DateRange.new(start_date: '7DaysAgo', end_date: 'today')
order_by = analytics::OrderBy.new(field_name: 'ga:pageviews', sort_order: 'DESCENDING')

request = analytics::GetReportsRequest.new(
  report_requests: [analytics::ReportRequest.new(
    view_id: view_id,
    metrics: [metric],
    dimensions: [dimension],
    date_ranges: [date_range],
    order_bys: [order_by]
  )]
)
response = client.batch_get_reports(request)
request = analytics::GetReportsRequest.new(
  report_requests: [analytics::ReportRequest.new(
    view_id: view_id,
    metrics: [metric],
    dimensions: [dimension],
    date_ranges: [date_range],
    order_bys: [order_by]
  )]
)
response = client.batch_get_reports(request)
data = response.reports.first.data
```
Dữ liệu response trả về sẽ có dạng như sau:

```ruby
=> #<Google::Apis::AnalyticsreportingV4::ReportData:0x00007ffab8642ef8
 @maximums=[#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab8641fd0 @values=["67"]>],
 @minimums=[#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab8640ef0 @values=["1"]>],
 @row_count=31,
 @rows=
  [#<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffabab77930
    @dimensions=["/posts/rails-blog"],
    @metrics=
     [#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffabab75ea0 @values=["67"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffab864bf30
    @dimensions=["/"],
    @metrics=
     [#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab864b5d0 @values=["30"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffab864acc0
    @dimensions=["/posts/23-years-old-blog"],
    @metrics=
     [#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab864a360 @values=["12"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffab8649a50
    @dimensions=["/posts/free-domain-and-https-heroku"],
    @metrics=
     [#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab86490f0 @values=["11"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffab86487e0
    @dimensions=["/posts/make-markdown-editor"],
    @metrics=[#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffabab6fb40 @values=["8"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffabab6c5d0
    @dimensions=["/posts/axios-token-configure"],
    @metrics=[#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab8653708 @values=["7"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffab8652df8
    @dimensions=["/about"],
    @metrics=[#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab8652498 @values=["6"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffab8651b88
    @dimensions=["/categories/Life"],
    @metrics=[#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab8651228 @values=["4"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffab8650918
    @dimensions=["/tags"],
    @metrics=[#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffabab67f08 @values=["4"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffabab66568
    @dimensions=["/categories/tech"],
    @metrics=[#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab865ba48 @values=["3"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffab865b138
    @dimensions=["/posts/boiler-room-home-theater"],
    @metrics=[#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab865a7d8 @values=["3"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffab8659ec8
    @dimensions=["/categories/Gadgets"],
    @metrics=[#<Google::Apis::AnalyticsreportingV4::DateRangeValues:0x00007ffab8659568 @values=["2"]>]>,
   #<Google::Apis::AnalyticsreportingV4::ReportRow:0x00007ffab8658c58
    @dimensions=["/categories/Music"],
```

Sau đó, extract các dữ liệu cần thiết
```ruby
num = 0
data.rows.each do |row|
  next unless row.dimensions.to_s.include?('/posts/')

  slug = row.dimensions.first.to_s[7..-1]
  post = Post.find_by(slug: slug)
  next if post.nil?

  num += 1
  popular_post = PopularPost.where(rank: num).first_or_create! do |new_popular_post|
    new_popular_post.rank = num
    new_popular_post.post = post
  end
  popular_post.update!(post_id: post.id)
  puts "#{num}: #{row.metrics.first.values.first}views: #{post.title}"
  break if num == 8
end
#popular_post.rb
#t.integer "rank", null: false
#t.bigint "post_id" 
#t.datetime "created_at", null: false
#t.datetime "updated_at", null: false
#t.index ["post_id"], name: "index_popular_posts_on_post_id"

class PopularPost < ApplicationRecord
  belongs_to :post
end
```
Thống kê in các thông tin về các post:

```ruby
1: 67views: Railsでブログを作ってみた
2: 12views: 23歳はブログを少しずつでも書こうと思う
3: 11views: 無料でドメイン割り当て、HTTPSを実現。Heroku + Cloudflare
4: 8views: 3分でマークダウンエディターを作る【UIkit】
5: 7views: axiosのヘッダーにtokenを埋め込んで常時使えるようにする
6: 3views: Boiler Roomをお酒片手にプロジェクターで観ると幸せになれる
7: 2views: 奇跡の自然、モハーの断崖。まさに世界の果て 【旅ログ】
```
Tổng kết lại:
```ruby
require 'google/apis/analyticsreporting_v4'
require 'google/api_client/auth/key_utils'

namespace :analytics do
  desc 'get popular posts from google analytics'

  task popular_posts: :environment do
    keyfile = Rails.root.join('google_analytics.p12')
    analytics = Google::Apis::AnalyticsreportingV4
    client = analytics::AnalyticsReportingService.new
    client.authorization = Signet::OAuth2::Client.new(
      token_credential_uri: '[https://accounts.google.com/o/oauth2/token](https://accounts.google.com/o/oauth2/token)', 
      audience: '[https://accounts.google.com/o/oauth2/token](https://accounts.google.com/o/oauth2/token)',
      scope: '[https://www.googleapis.com/auth/analytics.readonly](https://www.googleapis.com/auth/analytics.readonly)',
      issuer: ENV['GA_ISSUER'],
      signing_key: Google::APIClient::KeyUtils.load_from_pkcs12(keyfile, ENV['GA_KEY_SECRET'])
    )
    client.authorization.fetch_access_token!

    view_id = ENV['GA_VIEW_ID']
    metric = analytics::Metric.new(expression: 'ga:pageviews', alias: 'pageviews')
    dimension = analytics::Dimension.new(name: 'ga:pagePath')
    date_range = analytics::DateRange.new(start_date: '7DaysAgo', end_date: 'today')
    order_by = analytics::OrderBy.new(field_name: 'ga:pageviews', sort_order: 'DESCENDING')
    request = analytics::GetReportsRequest.new(
      report_requests: [analytics::ReportRequest.new(
        view_id: view_id,
        metrics: [metric],
        dimensions: [dimension],
        date_ranges: [date_range],
        order_bys: [order_by]
      )]
    )
    response = client.batch_get_reports(request)

    data = response.reports.first.data
    num = 0
    data.rows.each do |row|
      next unless row.dimensions.to_s.include?('/posts/')

      slug = row.dimensions.first.to_s[7..-1]
      post = Post.find_by(slug: slug)
      next if post.nil?

      num += 1
      popular_post = PopularPost.where(rank: num).first_or_create! do |new_popular_post|
        new_popular_post.rank = num
        new_popular_post.post = post
      end
      popular_post.update!(post_id: post.id)
      puts "#{num}: #{row.metrics.first.values.first}views: #{post.title}"
      break if num == 8
    end
  end
end
```
Bước cuối cùng là chạy rake task:
```
bundle exec rake analytics:popular_posts 
```
## Tài liệu tham khảo 
[https://developers.google.com/analytics/devguides/reporting/core/v4 ](https://developers.google.com/analytics/devguides/reporting/core/v4   )
[https://readysteadycode.com/howto-access-the-google-analytics-api-with-ruby](https://readysteadycode.com/howto-access-the-google-analytics-api-with-ruby   )
[https://github.com/googleapis/google-api-ruby-client](https://github.com/googleapis/google-api-ruby-client)
[https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/AnalyticsreportingV4/AnalyticsReportingService   ](https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/AnalyticsreportingV4/AnalyticsReportingService )