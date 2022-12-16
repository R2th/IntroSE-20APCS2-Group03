URL shortener gíup giải quyết việc chia sẻ URL dài bằng thu gọn nó thành một kích thước nhất định. Như chúng ta đã biết một số dịch vụ trang web như Twitter(giới hạn chỉ cho phép 140 ký tự), gửi SMS quảng cáo kèm link tới các user rất khó khăn  khi độ dài link truy cấp dài và yêu cầu xử lý rất lâu để gửi. Để sinh URL thu gọn chúng ta có thể sử dụng các dịch vụ như Goo.gl([với người chưa từng trước 13 tháng 4 2018 dùng sẽ không thể dùng được](https://developers.googleblog.com/2018/03/transitioning-google-url-shortener.html)) thay vì đó vẫn còn dịch tương tự như [Bitly](https://bitly.is/yournewhome) hoặc [Ow.ly](http://ow.ly/).

### Methods
Giải pháp có 2 phần chính:
- Một activerecord model ShortenedUrl để lưu thông tin chi tiết của link thu gọn trong đó thay vì sử dụng id của bản ghi sẽ sử dụng bộ mã 6 ký tự duy nhất.
- Một controller để chuyển trang tới link cụ thể khi người dùng click vào link đã thu gọn và link gốc truy vấn ra từ cơ sở dữ liệu.


### Code
Tạo model `ShortenedUrl`
```
class CreateShortenedUrls < ActiveRecord::Migration[5.1]
  def change
    create_table :shortened_urls do |t|
      t.text :original_url
      t.string :short_url
      t.string :sanitize_url

      t.timestamps
    end

    add_index :shortened_urls, :short_url, unique: true
  end
end
```

Mở model và viết một số hàm để xử lý thu gọn
```
UNIQUE_ID_LENGTH = 6 # Độ dài của bộ mã
ORIGINAL_VALID_FORMAT = /\A(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@,!:%_\+.~#?&\/\/=]*)?\z/  # Regex cho link nhập

# Tạo URL duy nhất từ link đã cho và lưu vào cơ sở dữ liệu
def generate_short_url
  url = ([*("a".."z"),*("0".."9")]).sample(UNIQUE_ID_LENGTH).join
  old_url = ShortenedUrl.where(short_url: url).last
  if old_url.present?
    self.generate_short_url
  else
    self.short_url = url
  end
end

def find_duplicate
  ShortenedUrl.find_by_sanitize_url self.sanitize_url
end

def new_url?
  find_duplicate.nil?
end
```

Định nghĩa các routes và tạo controller
```
# config/routes.rb
root to: "shortened_urls#index"
get "/:short_url", to: "shortened_urls#show"
get "shortened/:short_url", to: "shortened_urls#shortened", as: :shortened
resource :shortened_urls, only: :create
```
```
# Controller
  def index
    @url = ShortenedUrl.new
  end

  def show
    redirect_to @url.sanitize_url
  end

  def create
    @url = ShortenedUrl.new shortened_url_params
    @url.sanitize
    if @url.new_url?
      if @url.save
        redirect_to shortened_path @url.short_url
      else
        flash.now[:error] = "Check the errors below"
        render :index
      end
    else
      flash.now[:notice] = "A short link for this URL is existed!"
      redirect_to shortened_path @url.find_duplicate.short_url
    end
  end

  def shortened
    host = request.host_with_port
    @original_url = @url.sanitize_url
    @short_url = [host, @url.short_url].join "/"
  end
```
Tạo view cho action `index` và `shortened`
```
# index.html.slim
h2 Shorten URL
= form_for @url do |f|
  = error_message f.object, :original_url
  = f.text_field :original_url, size: '90%'
  = f.submit :submit
 
# shortened.html.slim
h2 Original Url:
= link_to @original_url
h2 Shortened Url:
= link_to @short_url, @short_url, target: :_blank, rel: [:noopener, :noreferrer]
```

### Demo
![](https://images.viblo.asia/c70c805b-4c97-4e63-8f22-642b50286c34.png)
![](https://images.viblo.asia/0871669b-d354-4c1c-963a-36ece7932aca.png)
![](https://images.viblo.asia/ce62eff0-23d8-40e7-9ef0-8a388e1d03dd.png)
![](https://images.viblo.asia/66dc8b10-f210-43a1-8459-7f748dbea53f.gif)

#### References
- [Bài gốc](https://www.railscarma.com/blog/technical-articles/simple-way-shorten-long-urls-rails/)

- [Source code](https://github.com/limkimhuor/shortener_url_app/tree/develop)