# Google API Client
Các thư viện Client này được Google hỗ trợ chinh thức. Tuy nhiên, thư viện này được coi là hoàn thành và đang trạng thái bảo trì. Điều đấy có nghĩ là chúng tôi sẽ giải quyết những lỗi nghiêm trọng và các lỗi bảo mật nhưng không thêm bất cứ tính năng mới nào.
## Cài đặt
Thêm dòng sau vào Gem file và chạy lệnh bundle install:
```
gem 'google-api-client', '~> 0.11'
```
Hoặc tự cài đặt bằng lệnh:
```
gem install google-api-client
```
# Cách sử dụng
## Cách sử dụng cơ bản
Để sử dụng 1 API, bao gồm tạo các tệp được tạo tương ứng và khởi tạo các dịch vụ. Ví dụ sử dụng dịch vụ Driver Api:
```
require 'google/apis/drive_v2'

Drive = Google::Apis::DriveV2 # Alias the module
drive = Drive::DriveService.new
drive.authorization = ... # See Googleauth or Signet libraries

# Search for files in Drive (first page only)
files = drive.list_files(q: "title contains 'finances'")
files.items.each do |file|
  puts file.title
end

# Upload a file
metadata = Drive::File.new(title: 'My document')
metadata = drive.insert_file(metadata, upload_source: 'test.txt', content_type: 'text/plain')

# Download a file
drive.get_file(metadata.id, download_dest: '/tmp/myfile.txt')
```
## Quy ước đặt tên và biểu diễn JSON
Các thuộc tính đối tượng (Object properties) trong ruby sử dụng quy ước ruby tiêu chuẩn  để đặt tên -- snake_case. Điều nào khác với các biểu diễn JSON thông thường dùng camelCase cho các thuộc tính. Có một vài ngoại lệ đáng chú ý cho quy tắc này:
* Đối mỗi thuộc tính được xác định là hashes với key do người dùng định nghĩa, không có dịch trên mỗi khóa.
* Mỗi trường được nhúng trong request (ví dụ: Sheet API) thì được định nghĩa theo camelCase đối với các trường tham khảo.
Ngoài những trường hợp ngoại lệ trên, nếu thôi thuộc tính được sử dụng camelCase trong yêu cầu, nó sẽ được bỏ qua trong quá trình serialization và loại bỏ qua trong request.

## Media
Các phương thức cho phép các hoạt động media có thể thêm các tham số bổ sung để chỉ định nguồn tải lên hoặc nơi tải xuống.

Đối vời upload, tham số `upload_source` có thể định nghĩa được đường dẫn đến một file, một IO stream, hoặc đối tượng StringIO.

Đối với downloads, tham số `download_dest` có thể là đường dẫn một file, một `IO` stream hoặc một đối tượng `StringIO` 

Cả upload và downloads đều có thể tiếp tục. Nếu xảy ra lỗi trong khi truyền, yêu cầu sẽ được thử lại từ byte nhận được cuối cùng.
ưKhi kích hoạt thử lại toàn bộ các services, thì nó có thể hủy đối với mỗi lần gọi xác định thông qua việc gán giá trị 0 trong `options` của request.
```
drive.insert_file(metadata, upload_source: 'test.txt', content_type: 'text/plain', options: { retries: 0 })
```
Khi thử lại (retries) được bật, nếu server lỗi hoặc tốc độ bị giới hạn khi thực thi request, nó sẽ tự động thử lại với độ trễ tăng dần theo cấp sô nhân. Nếu một request không thể thử lại hoặc vượt quá số lần thử tối đa, một ngoại lệ (exception) sẽ được bắn ra.
## Callbacks
Khối (Block) sẽ xác định action khi API được gọi. Nếu có, khối sẽ gọi và trả về kết quả hoặc lỗi thay vì kết quả được trả về từ lần gọi hoặc raising lỗi. Ví dụ:
```
# Search for files in Drive (first page only)
drive.list_files(q: "title contains 'finances'") do |res, err|
  if err
    # Handle error
  else
    # Handle response
  end
end
```
Kiểu gọi này là bắt buộc khi gọi theo batch request do responses không khả dụng cho đến khi toàn bộ batch được hoàn tất.
## Paging
Để lấy nhiều trang dữ liệu, sử dụng phương thức `fetch_all` để bao truy vấn trang. Giá trị trả về làm một `Enumerable` nó tự động bổ sung trang khi cần thiết.
```
# List all calendar events
now = Time.now.iso8601
items = calendar.fetch_all do |token|
  calendar.list_events('primary',
                        single_events: true,
                        order_by: 'startTime',
                        time_min: now,
                        page_token: token)
end
items.each { |event| puts event.summary }
```
Với APIs sử dụng một trường khác với `items` không phải mục chứa kết quả, có thể cung cấp một tên thay thế.
```
# List all files in Drive
items = drive.fetch_all(items: :files) { |token| drive.list_files(page_token: token) }
items.each { |file| puts file.name }
```
## Batches
Nhiều request có thể gộp lại với nhau thành 1 HTTP request để tiết kiệm tài nguyên. Các yêu cầu sẽ được gọi đồng loại và các phản hồi sẽ được trả về khi kết quả được trả về hết.
```
# Fetch a bunch of files by ID
ids = ['file_id_1', 'file_id_2', 'file_id_3', 'file_id_4']
drive.batch do |drive|
  ids.each do |id|
    drive.get_file(id) do |res, err|
      # Handle response
    end
  end
end
```
Media operations -- uploads & download -- không bao gồm batch.
Tuy nhiên, một số API hỗ trợ batch upload. Upload nhiều file trong một batch, sử dụng hàm batch_upload. Batch upload chỉ nên sử dụng uploading nhiều file nhỏ. Đối với file lớn hơn thì nên tải riêng biệt để tận dụng các thư viện hỗ trợ tích hợp sẵn.
## Hashes
```
file = {id: '123', title: 'My document', labels: { starred: true }}
file = drive.create_file(file, {}) # Returns a Drive::File instance
```
Nó tương đương với
```
file = Drive::File.new(id: '123', title: 'My document')
file.labels = Drive::File::Labels.new(starred: true)
file = drive.update_file(file) # Returns a Drive::File instance
```
Cảnh báo: Phải cẩn trọng khi cung cấp hash cho đối tượng request. Nếu giá trị truyền vào cuối cùng là một method, ruby sẽ thông dịch hash là keyword arguments. Để tránh điều này xảy ra thì ta thêm một tham số phụ vào sau.

```
file = {id: '123', title: 'My document', labels: { starred: true }}
file = drive.create_file(file) # Raises ArgumentError: unknown keywords: id, title, labels
file = drive.create_file(file, {}) # Returns a Drive::File instance
```
## Using raw JSON
Để xử lý JSON serialization hoặc deserialization trong ứng dụng, gán các tùy chọn `skip_serialization` hoặc `skip_deserializaton`. Khi dùng skip_serialization cho một request, Body là phải là một string được chuyển đổi từ một JSON.
Khi cài đặt skip_deserialization là true, response trả về sẽ giống như một string bao gồm JSON được trả về từ server.
## Ủy Quyền (Authorization)
OAuth 2 được dùng cho các ứng dụng ủy quyền. Thư viện sử dụng cả Signet và Google Auth Library for Ruby để hỗ trợ OAuth.
Google Auth Library for Ruby cung cấp triển khai xác thực đăng nhập ứng dụng cho ruby.
Nó cung cấp các đơn giản để có thông tin ủy quyền để sử dụng trong việc gọi API của google, phù hợp nhất cho các trường hợp mà gọi api có cùng cách thức và ủy quyền độc lập với người dùng. Nó được đề xuất để ủy quyền cho việc gọi Clound API, đặc biệt khi bạn xây dựng cho một ứng dụng Google Compute Engine.
Đối với mỗi người dùng, hãy sử dụng Signet để có ủy quyền của người dùng
### Passing authorization to requests

### Authorization using API keys
Một số API cho phép sử dụng API key thay cho OAuth2 token. Đối với các APIs này, gán giá trị `key` cho đối trượng service. Ví dụ như:
```
require 'google/apis/translate_v2'

translate = Google::Apis::TranslateV2::TranslateService.new
translate.key = 'YOUR_API_KEY_HERE'
result = translate.list_translations('Hello world!', 'es', source: 'en')
puts result.translations.first.translated_text
```
### Authorization using environment variables
Trong thư viện GoogleAuth Library for Ruby đã hỗ trợ xác thực thông qua biến môi trường nếu bạn không muốn kiểm tra thông tin đăng nhập của nhà phát triển hoặc private key. Chỉ cần đặt các biến sau cho ứng dụng của bạn
```
GOOGLE_ACCOUNT_TYPE="YOUR ACCOUNT TYPE" # ie. 'service'
GOOGLE_CLIENT_EMAIL="YOUR GOOGLE DEVELOPER EMAIL"
GOOGLE_PRIVATE_KEY="YOUR GOOGLE DEVELOPER API KEY"
```
## Logging
Thư viện này đã bao gồm Logger instance thí dụ nó được dùng để bắt thông tin gỡ lỗi (debugging information)
Khi chạy biến môi trường trong Rails, thì thư viện sẽ mặc định sử dụng `::Rails.logger`. Nếu bạn muốn sử dụng một logger instance riêng biệt cho API được gọi, bạn có thể cung cấp một đối tượng logger mới.
```
Google::Apis.logger = Logger.new(STDERR)
```
Hoặc bạn có thể gán giá trị cho biến mối trường `GOOGLE_API_USE_RAILS_LOGGER` bất kỳ giá trị nào trừ `true`, nó sẽ gửi toàn bộ thông tin logging ra STDOUT

Gán logging cho client:
```
Google::Apis.logger.level = Logger::DEBUG
```
## Samples
Xem các samples để biết các sử dụng các thư viện client cho các dịch vụ khác nhau.
## Generating APIs
Đôi vời End point clound hoặc các API không có trong gem không hỗ trợ.
Tạo từ một file ở local
```
$ generate-api gen <outdir> --file=<path>
```
Một URL được chỉ định
```
$ generate-api gen <outdir> --url=<url>
```
## Supported Ruby Versions
Thư viện này hiện tại hỗ trợ Ruby 1.9+
Tuy nhiên, Ruby 2.4 hoặc cao hơn rất được khuyến khích, các bản phát hành trước đó đã đạt hoặc sắp hết hạn. Sau 31 tháng 3 năm 2019, Google sẽ chỉ cung cấp hỗ trợ chính thức cho các phiên bản Ruby được coi là hiện tại và được hỗ trợ bởi Ruby Core (có nghĩa là, các phiên bản Ruby đang trong trạng thái bình thường hoặc bảo trì bảo mật)
# Tham khảo
Bài viết được dịch từ nguồn: https://github.com/googleapis/google-api-ruby-client