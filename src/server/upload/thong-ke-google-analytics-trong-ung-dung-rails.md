# Google Analytics là gì?

Google Analytics là một trong số các công cụ seo miễn phí được cung cấp bởi Google nhằm thu thập dữ liệu về hiện diện kỹ thuật số của website của bạn.
Ứng dụng chủ yếu của Google Analytics là giúp các quản trị viên website hiểu được hành vi người dùng, từ đó đưa ra các chiến lược triển khai nhằm thúc đẩy bán hàng tốt hơn:

- Thống kê thời gian thực (real-time)
- Thống kê nguồn truy cập của người dùng, ngôn ngữ họ sử dụng cùng hệ điều hành của thiết bị người dùng
- Chỉ rõ hành vi người dùng trên website
- Phân tích lưu lượng truy cập theo nhân khẩu học



# Nhúng google analytics vào website của bạn

Các bạn có thể đăng nhập vào trang https://analytics.google.com/analytics/web/?pli=1#/, hoàn thành các bước cài đặt:

![](https://images.viblo.asia/efa46269-8478-41f3-b6ef-2572ef55e125.png)
![](https://images.viblo.asia/036eb9e8-a258-4bf5-9759-730932dcbd3f.png)
![](https://images.viblo.asia/6cd541d2-4fe9-4676-b7cd-24b7dac0153f.png)

Sau khi hoàn tất các bước khai báo thông tin đăng ký Google Analytics trên, Google yêu cầu bạn đồng ý những điểu khoản và chính sách của họ đặt bạn, Bạn chỉ cần tick vào ô và chọn nút Accept.

![](https://images.viblo.asia/0a8300df-4e0f-446e-9edb-118255658391.png)

Sau đó, nhúng đoạn script js vào header trong layout ứng dụng của bạn

![](https://images.viblo.asia/2f10fd97-de5d-4e97-8b8b-4cad154ab1c1.png)

# Sử dụng google analytic api để thông kê lưu lượng người dùng

Chúng ta sẽ sử dụng thư viện https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/AnalyticsreportingV4/AnalyticsReportingService

- Add gem đến gemfile:

```
gem 'google-api-client'
```
Trước khi bắt đầu tích hợp, bạn cần đăng nhập vào google console developer, enable google analytic API và google analytic reporting API, tạo project, service account rùi add nó đến tài khoản google analytic bên trên. Hướng dẫn theo link:

https://developers.google.com/analytics/devguides/reporting/core/v4/quickstart/service-py

- Mặc định, các API của google sử dụng authenticate oauth2 nên chúng ta sẽ thực hiện một số bước sau để lấy access_token:

```
#　lib/tasks/analytics.rake
require 'google/apis/analyticsreporting_v4'
require 'google/api_client/auth/key_utils'

namespace :analytics do
  desc 'get popular posts from google analytics'

  task popular_posts: :environment do
    keyfile = Rails.root.join('google_analytics.p12')
    analytics = Google::Apis::AnalyticsreportingV4
    client = analytics::AnalyticsReportingService.new
    client.authorization = Signet::OAuth2::Client.new(
      token_credential_uri: 'https://accounts.google.com/o/oauth2/token',
      audience: 'https://accounts.google.com/o/oauth2/token',
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      issuer: ENV['GA_ISSUER'],
      signing_key: Google::APIClient::KeyUtils.load_from_pkcs12(keyfile, ENV['GA_KEY_SECRET'])
    )
    client.authorization.fetch_access_token!
  end
end
```

- Sau đó, dùng access_token nhận được để get thống kê lưu lượng trang web qua API

```
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
```

```
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

```
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


- Sau đó, extract các dữ liệu cần thiết

```
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
```

```
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

```
1: 67views: Railsでブログを作ってみた
2: 12views: 23歳はブログを少しずつでも書こうと思う
3: 11views: 無料でドメイン割り当て、HTTPSを実現。Heroku + Cloudflare
4: 8views: 3分でマークダウンエディターを作る【UIkit】
5: 7views: axiosのヘッダーにtokenを埋め込んで常時使えるようにする
6: 3views: Boiler Roomをお酒片手にプロジェクターで観ると幸せになれる
7: 2views: 奇跡の自然、モハーの断崖。まさに世界の果て 【旅ログ】
```

Tổng kết lại:

```
require 'google/apis/analyticsreporting_v4'
require 'google/api_client/auth/key_utils'

namespace :analytics do
  desc 'get popular posts from google analytics'

  task popular_posts: :environment do
    keyfile = Rails.root.join('google_analytics.p12')
    analytics = Google::Apis::AnalyticsreportingV4
    client = analytics::AnalyticsReportingService.new
    client.authorization = Signet::OAuth2::Client.new(
      token_credential_uri: 'https://accounts.google.com/o/oauth2/token',
      audience: 'https://accounts.google.com/o/oauth2/token',
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
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

- Bước cuối cùng là chạy rake task:

```
bundle exec rake analytics:popular_posts
```


Source:

https://github.com/googleapis/google-api-ruby-client
https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/AnalyticsreportingV4/AnalyticsReportingService

https://hirozak.space/posts/get-popular-posts-from-google-analytics