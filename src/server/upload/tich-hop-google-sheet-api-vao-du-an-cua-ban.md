## 1. Lời mở đầu
Google Sheets là gì? Khi nói đến làm việc với các dữ liệu về bảng tính, nhiều người thường nghĩ ngay đến sử dụng Microsoft Excel mà không hay biết đã bỏ qua một trong những công cụ miễn phí hữu hiệu của Google mang tên Google Sheets.

Đây là một chương trình tạo lập và chỉnh sửa bảng tính với các tính năng cơ bản phổ biến như trên Excel nhưng được cải tiến và có nhiều ưu điểm vượt trội hơn so với excel, phù hợp với việc xử lý các dữ liệu đơn giản, kỹ năng bán hàng làm việc từ xa, hỗ trợ làm việc nhóm cũng như tương thích trên mọi thiết bị. 

Nó tiện ích như thế, bài toán là một dự án website cần lưu lại thông tin của khách hàng thành 1 sheet thì làm thế nào. Chả nhẽ chúng ta lại phải nhập thông tin của từng user khi user đó khi đăng ký -> vậy thì hơi tốn công nhỉ. Để giải quyết bài toán đó thì google drive cũng cung cấp cho chúng ta Api sử dụng để tương tác với Google Sheet. Để hiểu rõ hơn về vấn đề này thì chúng ta cùng đi tìm hiểu sâu về nó nhé.
## 2. Cài đặt 
### 2.1. Cài dặt google api 
Google Sheet API giúp cho các lập trình viên có thể tạo ra các ứng dụng tương tác với Google Sheet một cách dễ dàng, có thể khai thác các tính năng rất hưu ích của nó. Về cơ bản tương tác với Google Sheet Api theo các đơn vị bảng tính (spreadsheet), trang tính (sheet), vùng giá trị (range) và ô trang tính (cell).

B1: Tạo new project ở API & Services:

Các bạn truy cập link [API & Services](https://console.cloud.google.com/projectcreate?previousPage=%2Fapis%2Fdashboard%3FangularJsUrl%3D%26pli%3D1%26project%3Dsnappy-rainfall-308003&folder=&organizationId=0)  sẽ hiển thị link đăng ký tạo project mới, các bạn điền đầy đủ thông tin yêu cầu:

![](https://images.viblo.asia/70263e84-fbee-4d8d-8e83-b2c6d130b7e3.png)

Tạo thành công thì sẽ quay về màn hình quản lý, các bạn chọn button cố dấu `+ ENABLE APIS AND SERVICES `: 

![](https://images.viblo.asia/47550421-4b61-4f1a-8b44-b9606458d271.png)

B2: Kích hoạt API:

Chọn Google Drive APi, Google Sheets API và lần lượt kích hoạt( Enable )

![](https://images.viblo.asia/22d6de0c-f83e-44f0-9aa9-5bd6b229e089.png)

![](https://images.viblo.asia/bcd57af2-8604-43d2-b98c-44d32460d40f.png)

![](https://images.viblo.asia/f0d0c8a1-ed69-4bc7-b496-4a257d7db505.png)


B3: Tạo Service account:

Sau khi kích hoạt xong tại màn Google Drive Api chọn ` Credentials ` -> ` Service account `:

![](https://images.viblo.asia/1cc81b6f-67eb-4a2f-8b5a-63e2e8a84e4e.png)

Nhập thông tin của Service rồi chọn `DONE`

![](https://images.viblo.asia/72d81b65-b7f1-45f8-92f4-f94c75a8df00.png)

Tại đây google drive sẽ tạo ra một account tự động để ủy quyền thao tác với google sheet. Chúng ta chọn `Manage service accounts`

![](https://images.viblo.asia/d7532060-f491-4490-bf0f-4497d6bc6300.png)

B4: Export file config.json:

Chúng ta chọn ` Manage keys ` để vào phần generate private key.

![](https://images.viblo.asia/d5905dd2-208b-4d60-81e6-4d11aa8166bf.png)

Chọn `ADD KEY` -> `Create new key` -> `JSON`

![](https://images.viblo.asia/e28423f5-6ca6-4d67-8c13-1fc729dcfe32.png)
 
![](https://images.viblo.asia/50188349-a0ca-449d-a3f9-e8a2850e7665.png)

 Đến bước này thì sau khi kích đúp button `CREATE` thì sẽ dowload về máy tính chúng ta 1 file config dạng json với các thông số như :
 
```
{
  "type": "service_account",
  "project_id": "project_id",
  "private_key_id": "private_key_id",
  "private_key": "private_key",
  "client_email": "client_email",
  "client_id": "client_id",
  "auth_uri": "auth_uri",
  "token_uri": "token_uri",
  "auth_provider_x509_cert_url": "auth_provider_x509_cert_url",
  "client_x509_cert_url": "client_x509_cert_url"
}
```

Các bạn nhớ lưu file này nhé tí mình cần config vào trong dự án của mình.

Tiếp theo các bạn tạo 1 file sheet để insert dữ liệu, các bạn nhớ là chia sẻ file này cho tài khoản service account mà chúng ta vừa tạo ở trên nhé.

![](https://images.viblo.asia/36ce67ac-153a-44d3-917f-b05773abc7ed.png)

Mỗi file google sheet thì có url dạng: 

`https://docs.google.com/spreadsheets/d/sheet_id/edit#gid=0`

Ok đến đây là quá trình config xong google sheet api, các bạn chỉ cần lưu giúp mình `file private key json` chúng ta vừa dowload ở trên và` sheet_id của sheet` bạn cần thao tác. Chúng ta cùng đi tiếp vào phần tích hợp google sheet api vào dự án nhé.

### 2.2 Tích hợp vào dự án của bạn 
Mình lựa chọn ngôn ngữ Ruby on Rails để tích hợp google drive.
Đầu tiên các bạn tạo cho mình 1 project bằng lệnh :
```
rails new demo-google-drive-api -d mysql 
```
Các bạn thêm `gem 'google_drive'` vào `Gemfile` và chạy lệnh `bundle install` để cài đặt.

File json ở màn tạo private key ở trên chúng ta cho vào forder `config` dự án với url `config/google_drive_config.json`.

Ở đây mình sẽ tạo bảng User để lưu thông tin người dùng khi đăng ký mới, các bạn chạy lệnh dưới :
```
rails g model User full_name:string email:string address:text date_of_birth:date
rails db:migrate
```

**Insert data:**

Chúng ta tạo 1 service để thao tác với google sheet nhé: 
```
class AddUserInfoToGoogleSheetService
  def perform id
    user = User.find id
    user_count = User.count
    sheet_idx = 0
    session = GoogleDrive::Session.from_config("config/google_drive_config.json")
    worksheet = session.spreadsheet_by_key(ENV["SPREADSHEET_KEY"]).worksheets[sheet_idx]

    new_records = []
    new_records << handling_data(user, user_count)
    worksheet.insert_rows(user_count + 1, new_records)
    worksheet.save
    worksheet.reload
  end

  private

  def prefix_date date
    return if date.blank?

    date.strftime("%d/%m/%Y")
  end

  def handling_data user, stt
    [
      "#{stt}",
      user.full_name,
      user.email,
      user.address,
      prefix_date(user.date_of_birth),
      prefix_date(user.created_at)
    ]
  end
end

```
Trong đó :
- sheet_idx: Trong 1 file sheet có nhiều file sheet nhỏ đây là vị trí file mà bạn muốn thao tác với sheet.
- ENV["SPREADSHEET_KEY"]: Là id của sheet.

Ở model User chúng ta thêm call back `after_create` sau khi tạo User mới thì tự động push thông tin lên google sheet.
```
class User < ApplicationRecord
  after_create :handle_add_user_info_to_google_sheet

  private

  def handle_add_user_info_to_google_sheet
    AddUserInfoToGoogleSheetService.new.perform id
  end
end

```
Bây giờ chúng ta thử tạo một bản ghi User mới, các bạn gõ câu lệnh `rails c` chạy lệnh tạo bên dưới :
```
User.create full_name: "Nguyen Van A", email: "nguyenvana@gmail.com", address: "Bac Tu Liem - Ha Noi", date_of_birth: Date.parse("10/10/1996")
```

Và đây là kết quả nhận được khi chúng ta insert một User thì thông tin của User đó sẽ push lên google sheet giúp cho chúng ta quản lý dữ liệu một cách đơn giản, hiệu quả nhất.

![](https://images.viblo.asia/251771f7-6725-494f-9680-67c90ec0cdbc.png)

**Update data :**

Update fulle name dòng 2 cột B.
```
def perform
  sheet_idx = 0
  session = GoogleDrive::Session.from_config("config/google_drive_config.json")
  worksheet = session.spreadsheet_by_key(ENV["SPREADSHEET_KEY"]).worksheets[sheet_idx]
  worksheet["B2"] = "Le Van A"
  worksheet.save
  worksheet.reload
end
```
![](https://images.viblo.asia/24641681-fc72-44b2-a38c-e423d78eac12.png)



**Delete data :**

Xóa dòng 2-3
```
def perform
  sheet_idx = 0
  session = GoogleDrive::Session.from_config("config/google_drive_config.json")
  worksheet = session.spreadsheet_by_key(ENV["SPREADSHEET_KEY"]).worksheets[sheet_idx]
  worksheet.delete_rows(3, 2)
  worksheet.save
  worksheet.reload
end
```
![](https://images.viblo.asia/d1925cbe-a9c0-4220-b9fb-4d7121c67a3d.png)

Đến đây mình đã hướng dẫn cơ bản các bước config google api, tích hợp vào dự án Ruby on Rails.

## 3. Kết luận
Bài chia sẻ của mình đến đây xin được kết thúc hẹn các bạn vào lần chia sẻ kế tiếp nhé ! 

**Tài liệu :**
- https://github.com/gimite/google-drive-ruby