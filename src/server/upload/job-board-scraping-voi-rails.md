Dữ liệu liên quan đến công việc(jobs) là một trong những dữ liệu yêu thích của nhiều người.
Mặc dù có một số[ public database](https://www.kaggle.com/datasets) tuyệt vời với thông tin liên quan đến công việc, nhưng nó cũng có thể được thu thập từ nhiều trang khác nhau.

Trong bài viết này mình xây dựng một bảng công việc trong Ruby on Rails sẽ tự động chạy một lần mỗi ngày, được lưu trữ miễn phí trên Heroku.

# Setup
Giả sử bạn đã cài đặt thành công Ruby, Rails và DB. Hãy tạo một project mới hoặc cd tới một project có sẵn của bạn nhé !

```
rails new scrape_app -d postgresql
cd scrape_app/
```

Ở đây mình dùng postgresql để phía dưới deploy production lên heroku dễ dàng hơn. Các bạn chọn bất kì DB nào cũng được :D.

Nếu sử dụng thêm gem đừng quên *bundle install* nhé !
# Configure the Database
Mở file /config/database.yml và update lại như sau:
```
default: &default
  adapter: postgresql
  encoding: unicode
  host: localhost
  username: xxx # fill in your username
  password: xxx # fill in your password
  port: 5432
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: scrape_app_development
  
production:
  <<: *default
  database: scrape_app_production
  username: scrape_app
  password: <%= ENV['SCRAPE_APP_DATABASE_PASSWORD'] %>
```

Replace xxx thành username/password posgres của bạn.
Tiếp theo chạy lệnh `rails db:create` để tạo database.
# Create the ORM Model
Dùng scaffold để tạo model Job cho nhanh
`rails g scaffold Jobs title:string company:string url:string location:string`

Ta sẽ được file này `db/migrate/20200813034505_create_jobs.rb`
```
class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.string :title
      t.string :company
      t.string :url
      t.string :location

      t.timestamps
    end
  end
end
```

Chạy `rails db:migrate` để rails tạo bảng và các thuộc tính cho ta nhá.

![](https://images.viblo.asia/1cb78206-d882-4f1d-8091-d4baf276916a.png)

# Create a Rake Task
Trong `/lib/tasks` tạo mới một file tên `scrape.rake`. Khi bạn muốn viết code và đặt lịch cho nó chạy thì đây là nơi đặt đoạn mã đó.

Ở đây mình sẽ crawl các việc làm tốt nhất của topcv nha. 
Update file `scrape.rake` :
```
task scrape: :environment do
  require 'open-uri'
 
  # Link mình muốn vào
  URL_BASIC = 'https://www.topcv.vn/viec-lam-tot-nhat'

  # Cho Nokogiri open url và inspect nó
  doc_basic = Nokogiri::HTML(open(URL_BASIC))
  
  # Đếm số trang cần crawl
  pages = doc_basic.search('ul.pagination > li').count - 2

  # Bắt đầu crawl từng page với index là i
  (1..pages).each do |i|
    URL = "https://www.topcv.vn/viec-lam-tot-nhat?page=#{i}"
    doc = Nokogiri::HTML(open(URL))
    postings = doc.search('div.result-job-hover')

    postings.each do |p|
      # Lấy thông tin từng field mình mong muốn theo tag html
      job_title = remove_n_string(p.search('div > div > h4.job-title > a > span.bold.transform-job-title').text)
      url = remove_n_string(p.search('div > div > h4.job-title > a')[0]['href'])
      company = remove_n_string(p.search('div > div > div.row-company').text)
      location = remove_n_string(p.search('div > div > div#row-result-info-job > div.address')[0].text)

      # Bỏ qua các job đã tồn tại trong database
      if Job.where(title: job_title, location: location, company: company).count <= 0
        Job.create(
          title: job_title,
          location: location,
          company: company,
          url: url
        )
        puts 'Added: ' + (job_title ? job_title : '')
      else
        puts 'Skipped: ' + (job_title ? job_title : '')
      end
    end
  end
end

# Loại bỏ \n chứa trong string
def remove_n_string string
  string.gsub("\n","")
end
```

Nokogiri là thư viện parsing html của Ruby, bài viết này sẽ không đề cập tới việc sử dụng gem này. Hãy tham khảo [ở đây](https://nokogiri.org/) nhé.
# Run Locally
Now let's get started - nhào vô chạy code nào
`rake scrape`

Sau khi chạy xong, bạn có thể xem data dưới local của bạn bằng PGAdmin,  DBeaver hoặc console ...

![](https://images.viblo.asia/7fd0c878-25e6-4bd4-ad82-ea80029f29f7.png)

Vấn đề duy nhất của chúng ta là không muốn chạy thủ công mỗi ngày. Để khắc phục điều đó bằng cách deploy lên Heroku và schedule task.
Nếu bạn có sẵn server thì dùng Whenever, sidekiq để lập schedule cũng được.
# Deploy to Production
Mặc định bạn đã có account của heroku và push code lên github hoặc gitlab.

Tạo mới 1 app ở dashboard

![](https://images.viblo.asia/5a8b18b9-867d-4218-9363-8fb1bcaed353.png)

Vào tab Deploy > App connected to GitHub > Chọn repo và nhánh của mình > Manual deploy > Chọn Deploy

Quá trình deploy có thể diễn ra vài phút.
# Configure Scheduler in Production
Bây giờ chúng ta cần config rake task trên thành scheduled job.
Trong tab của Heroku chọn Tab Resources > Tìm kiếm addon Heroku Scheduler > Add Addon đó vào project của bạn.

![](https://images.viblo.asia/bd105477-26f8-4780-9329-4a5cd6e77444.PNG)

**Lưu ý: Tuy addon này miễn phí nhưng heroku vẫn bắt bạn set Billing nhé.**

Mở Heroku Scheduler tiến hành config như sau :

![](https://images.viblo.asia/54641b06-ab79-4e6c-912b-be5ac206a4d0.PNG)

**Lưu ý 2 : Giờ config là giờ UTC nhé. Ở đây mình set 6:30AM UTC tức là 1:30 PM +7**

***Lưu ý quan trọng: Đừng cố tình crawl data liên tục trang của người khác khi không cần thiết nếu bạn không muốn site của họ chặn IP của bạn*** :joy::joy::joy:

Và đây là thành quả của mình 

![](https://images.viblo.asia/ff4812cb-5f0a-4555-9026-05bbe455eb63.PNG)

# References
* https://nokogiri.org/
* https://github.com/vuongtq-2116/scrape_app/tree/develop
* https://iscrape-jobs.herokuapp.com/
* https://towardsdatascience.com/job-board-scraping-with-rails-872c432ed2c8