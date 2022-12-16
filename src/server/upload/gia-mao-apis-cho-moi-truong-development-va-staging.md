> Bài viết gốc [Faking APIs in Development and Staging](https://thoughtbot.com/blog/faking-apis-in-development-and-staging)

Trong bài viết này sẽ dựa trên một app build để lấy những thôn tin phim cho những người hâm mộ. Một số tính năng dựa trên dữ liệu của của một số phim, diễn viên, tác gỉa. Hãy thử google để lấy ra nhữn thông tin đó sẽ có một loạt các dữ liệu và có một trang web  `movie-facts.com` họ đã thu thấp tất cả các dữ liệu này và có nhóm luôn luôn cập nhật mới nhất. Họ cho phép truy cập dữ liệu qua API tính phí.

### Test tính năng đầu tiên

Trong khi phát triển bắt đầu làm việc với tính năng dựa trên API trên với yêu cầu rằng
> Khi tham chiếu một tiêu đề phim trong một bài post phải tìm kiếm nhanh thông tin (các tác giả, diễn viên) 

Trong khi viết test

```
visit root_path

click_on "New Post"
fill_in :post, with "Jurassic World was soooo good!!!"
click_on "Post"

info_box = find(".info-box")
expect(info_box).to have_content("Chris Pratt")
```

Ở đây để pass test cần phải lấy được dữ liệu từ API. Tất cả code liên quan được tách biệt vào một adapter class

```
# app/models/movie_database.rb

class MovieDatabase
  BASE_URL = "http://api.movie-facts.com".freeze

  def actors_for(movie:)
    HTTParty.get(BASE_URL + "/movies/#{movie.id}/actors", format: :json)
  end
end
```

Bây giờ trường hợp có lỗi từ Webmock cho rằng các request bên ngoài bị chặn trong môi trường test.
Tiếp đến cần xây dựng một giả mạo test cho `movie-facts.com` API sử dụng Sinatra.

```
# spec/support/fake_movie_facts.rb

module FakeMovieFacts
  class Application < Sinatra::Base
    get "/movies/:movie_name/actors" do
      {
        actors: [
          {
            name: "Actor 1",
            character_played: "Character 1"
          },
          {
            name: "Actor 2",
            character_played: "Character 2"
          }
        ]
      }.to_json
    end
  end
end
```

Thực tế có nhiều cách để tạo giả mạo trong test như:
- Sự dụng [Webmock](https://thoughtbot.com/blog/how-to-stub-external-services-in-tests)
- Thông qua [middleware](https://thoughtbot.com/blog/faking-remote-services-with-rack-test)
- Sử dụng [capybara-discoball](https://github.com/thoughtbot/capybara_discoball)

Capybara Discoball là một gem cho phép boot các Rack app ngầm của chạy test một tính năng. Khi có app chạy adapter có thể chỉ đến app đó. Khi dùng Capybara Discoball bởi vì không cần phải giả tạo bất kỳ thứ khác. Ứng dụng đã tạo các yêu cầu HTTP tới API đang chạy ở localhost.

Tùy chỉnh dưới này cho phép Capybara Discoball chạy API của `movie-facts.com`

```
# spec/support/fake_movie_facts_runner.rb

FakeMovieFactsRunner =
  Capbybara::Discoball::Runner.new(FakeMovieFacts::Application) do |server|
    MovieDatabase.base_url = "#{server.host}:#{server.port}"
  end
```

Trong spec helper:

```
# spec/spec_helper.rb

FakeMovieFactsRunner.boot
```

Adapter `MovieDatabase`  chưa cho phép thay đổi base url vậy cần phải đổi ở class accessor hơn hard code tĩnh và mặc định nó là `movie-facts.com` API. 

```
# app/models/movie_database.rb

class MovieDatabase
  cattr_accessor :base_url
  base_url = "http://api.movie-facts.com"

  def actors_for(movie:)
    HTTParty.get(self.class.base_url + "/movies/#{movie.id}/actors", format: json)
  end
end
```

Đến đây đã hoàn thành và khi chạy test sẽ pass!

###  Giả mạo trong development
Với tính năng trên nó chỉ hoạt động trong môi trường test vì khi chạy trong môi trường development nó sẽ trả về unauthorized errors từ API của `movie-facts.com`. Làm sao để nó có thể chạy cả trong development?

Hãy mở terminal và chạy: `ruby spec/support/fakemoviefacts.rb`
Khi xem log cho thấy nó boots lên một Sinatra server trên `localhost:4567`.
emits
Bây giờ chỉ cần trỏ adapter sang url này, ngoài ra để cho phép base url đổi khi chạy runtime nên đặt giá trị mặc định vào biến môi trường thay vì hard code url đang sử dụng.

```
# app/models/movie_database.rb

class MovieDatabase
  cattr_accessor :base_url
  self.base_url = ENV.fetch("MOVIE_FACTS_API_BASE_URL")

  def actors_for(movie:)
    HTTParty.get(self.base_url + "/movies/#{movie.id}/actors", format: :json)
  end
end
```

Tiếp đến boot up Rails server lại: `MOVIEFACTSAPIBASEURL=localhost:4567 rails server`
Mở app trong browser và tạo một post request tham chiếu đến một phim. "Yo! it works!"

###  Giả mạo trong staging
Từ phần trước API đã hoạt động ở môi trường development và tiếp đến code cần phải deploy lên stag để mang demo cho khách hang. Giả sử API `movie-facts.com` thật sự chưa sẵn có khi chạy trên staging thì có giải pháp không?

Câu trả lời có, cho ứng dụng chính chạy và giả mạo có thể liên lạc với nhau qua HTTP. Cách đơn giản nhất là sở hữu một ứng dụng Heroku. Tuy nhiên, xây dựng giả mạo vào app của minh dẫn đến một việc tồi tệ. Các test vẫn cần giả mạo để pass. Vậy làm sao để chia sẻ ứng dụng chính trong khi vẫn có thể dễ deploy là ứng dụng chính nó?

Sau đây là cách giải quyết:
- Tách nó ra một git repository
- Bao nó là một gem vậy nó có thể dùng cho việc test
- Cung cấp một file `config.ru` trong root của gem vậy nó có thể deploy trên Heroku.

Khởi tạo một gem mới với `bundle gem fakemoviefacts` nó sẽ sinh ra cấu trúc như sau:
```
fake_movie_facts
├── Gemfile
├── README.md
├── Rakefile
├── bin
│   ├── console
│   └── setup
├── fake_movie_facts.gemspec
├── lib
│   ├── fake_movie_facts
│   │   └── version.rb
│   └── fake_movie_facts.rb
└── spec
    ├── fake_movie_facts_spec.rb
    └── spec_helper.rb
```

Tách `FakeMovieFacts::Application` từ main application sang `fake_movie_facts/lib/fake_movie_facts/application.rb` và thêm một `config.ru` vào trong root của repo:
```
# config.ru

$LOAD_PATH << File.expand_path("../lib", __FILE)
require "fake_movie_facts/application"

run FakeMovieFacts::Application
```

Heroku sẽ tự động chọn trên file `config.ru` khi deploy gem. Cũng có thể chạy nó ở máy local với command `rackup`.

Khi deploy cả 2 apps Heroku(staging) và sửa biến môi trường của ứng dụng chính trỏ tới gem :
`heroku config:set MOVIEFACTSAPIBASEURL=http://fake-movie-facts.herokuapp.com --remote staging`

Chạy test xác nhận cho rằng các thành phần khác nhau đang hoạt động chính xác với nhau.

### Giả mạo nâng cao
Khi tính năng hoàn thiện, còn có 1 yêu cầu rằng 
> Một user cần đăng ký để lấy được thông tin cho các phim sắp ra và cho nó vào tin tức mới nhất.

Task đề cập rằng `movie-news.com` có một API miễn phí cho phép đăng ký để nhận được các sự kiện qua một webhook. Từ phần trước, việc chạy test qua một tính năng spec và chạy vào Webmock vào lỗi `external URL` sẽ viết một giả mạo 
```
module FakeUpcomingMovieEvents
  class Application < Sinatra::Base
    post "subscriptions/:movie_name" do
      successful_subscription.to_json
    end

    private

    def successful_subscription
      {
        subscription_id: "123",
        movie_subscribed_to: params[:movie_name]
      }
    end
  end
end
```

Đến đây sẽ sửa được test lỗi nhưng nó lại dẫn đến một vấn đề khác và cần một cơ chế nào đó để kích hoạt sự kiện trong test. Do không thể quả lý sự kiện API của  `movie-events.com` nên phải giả mạo kích hoạt tự động sau mỗi khi đăng ký.

```
module FakeUpcomingMovieEvents
  class Application < Sinatra::Base
    post "subscriptions/:movie_name" do
      trigger_webhook

      successful_subscription.to_json
    end

    private

    def trigger_webhook(callback_url)
      HTTParty.post(params[:callback_url], event_payload_json)
    end

    def event_payload_json
      {
        event_type: "New Trailer",
        url: "http://video-sharing-platform.com/123"
      }.to_json
    end

    # ...
  end
end
```

Kết quả cho rằng một bug bất ngờ, deadlock đăng ký vì điểm cuối đăng ký có thể quay trở lại cho đến khi yêu cầu webhook thành công nhưng webhook có thể xử lý bởi ứng dụng chính cho đến khi yêu cầu đăng ký thành công. Tình huống Catch-22 này xảy ra do có hai nhiệm vụ được đồng bộ hóa (chặn).
Giải pháp có thể là tác vụ webhook sẽ chạy ngâm bằng thêm một hệ thống hàng đợi  như DelayedJob để giả mạo có vẻ rất nặng cuối cùng xây dựng gì đó sử dụng threads:
```
module FakeUpcomingMovieEvents
  class Application < Sinatra::Base
    post "subscriptions/:movie_name" do
      async do
        trigger_webhook(params[:callback_url])
      end

      successful_subscription.to_json
    end

    private

    def async
      Thread.new do
        sleep ENV.fetch("WEBHOOK_DELAY").to_i
        yield
      end
    end

    # other methods
  end
end
```

Với giải pháp trên nó sẽ sửa lỗi cho việc test. Tiếp đến cần trích ra một gem + `config.ru` như giả mạo trước và deploy lên heroku/staging. Tùy chọn giả mạo kích hoạt một sự kiện `New Trailer` 15 giầy sau khi đăng ký các sự kiện của một phim. 

#### Kết luận 
Giả mạo có thể giúp cho việc viết test ứng dụng mà nó tương tác với API bên ngoài. Lợi ích của nó mở rộng không chỉ test mà trong tình hướng API chưa sẵn có, không có sandbox mode hay chúng ta cần quản lý trên các event mà nó phát hành thì giả mạo là giải pháp tốt nhất trong developement và staging.