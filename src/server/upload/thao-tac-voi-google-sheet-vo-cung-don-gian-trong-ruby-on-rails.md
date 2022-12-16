# 1. Google developer console 
## 1.1 Tạo new project
Đăng nhập vào https://console.developers.google.com/?angularJsUrl=
Trên thanh header chọn [Select a project] để tạo mới project
![](https://images.viblo.asia/c2926ea2-1ab2-4dba-8cf2-d8c4279e5f8b.png)

Ví dụ như mình đã tạo google-sheet-api
![](https://images.viblo.asia/99968184-b13f-473d-b30e-18daa9996b5c.png)
## 1.2 Enable APIs and Service
Chọn project: google-sheet-api Click vào **Enable APIs and Service**
![](https://images.viblo.asia/3820cbd4-fe44-4b6a-bb27-4d058c9997ba.png)
Để xuất hiện màn hinh bên dưới. 
![](https://images.viblo.asia/ccbe6c5d-fefa-42c0-8699-47f44e82cb27.png)
Tiếp đó tìm APIs và Service của **Google driver API** và **Google sheet API** để **Enable** nó lên
![](https://images.viblo.asia/0fc301ce-3ae9-4dc2-b5c0-4622ad7f07ac.png)
![](https://images.viblo.asia/e527f5fa-6fb9-4ca8-8fbc-52532d8aa1d8.png)

Sau đó click vào Google APIs để về trang chủ và chọn **Credentials** 
![](https://images.viblo.asia/576176d9-6b9f-489c-be7c-2dc3e92e5db6.png)
Click vào **Create credentials** và chọn option **Service account key**
![](https://images.viblo.asia/316f0e00-8343-4889-94ac-d6e53965756c.png)https://images.viblo.asia/316f0e00-8343-4889-94ac-d6e53965756c.png

Sau đó tạo service name của bạn và chọn role
![](https://images.viblo.asia/360c223a-0666-4a2a-bcbf-bc8511e21606.png)
rồi create vào **Create** để download key về máy

# 2. Tạo Project google-sheet-api
Tạo thư mục project: `mkdir google-sheet-api`

Di chuyển key vừa download lúc nãy vào thư mục `cp Downloads/google-sheet-api-8af1289c9ba0.json google-sheet-api/client_secret.json`

Di chuyển tới thư mục project `cd google-sheet-api `

Tạo Gemfile `bundle init`

Tạo file spreadsheet `touch spreadsheet.rb`
![](https://images.viblo.asia/c16b55ca-4d3d-4267-a00a-d27e21a43ebb.png)

## 2.1. Gemfile
Thêm `gem "google_driver"` và chạy `bundle` để cài đặt
```
# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# gem "rails"
gem "google_driver"
```

## 2.2 Chuẩn bị file google sheet và share quyền

Tiến hành share quyền cho email là value của key **client_email** trong file json **client_secret.json** mình tải về ban đầu đối với googlesheet mình muốn thao tác.
![](https://images.viblo.asia/afc0c156-0b73-4a00-b0d9-7aad189a1ec9.png)

# 3. Thao tác với google sheet
## 3.1 Lấy dữ liệu từ google sheet
Lấy 3 dòng đầu và 2 cột
```
require "bundler"
Bundler.require

session = GoogleDrive::Session.from_service_account_key("client_secret.json")

spreadsheet = session.spreadsheet_by_title("Học Sinh")
worksheet = spreadsheet.worksheets.first # lấy ra sheet đầu tiên trong file googlesheet

worksheet.rows.first(3).each {|row| puts row.first(2).join(" | ")}
```

Chạy `bundle exec ruby spreadsheet.rb` ta có Kết quả

![](https://images.viblo.asia/29f5e0a3-3c4b-4821-943b-028fdbac8c91.png)

### 3.2 Insert dữ liệu vào file googlesheet

```
require "bundler"
Bundler.require

session = GoogleDrive::Session.from_service_account_key("client_secret.json")

spreadsheet = session.spreadsheet_by_title("Học Sinh")
worksheet = spreadsheet.worksheets.first # lấy ra sheet đầu tiên trong file googlesheet

puts "importing"

new_records = [
  [4, "Trần E", 19],
  [5, "Lý F", 20]
]
worksheet.insert_rows(worksheet.num_rows + 1, new_records)
worksheet.save

puts "imported"
```

Chạy `bundle exec ruby spreadsheet.rb` ta có Kết quả
![](https://images.viblo.asia/0a94c2ef-8ffc-4b1e-bc92-1f163e720bf4.png)https://images.viblo.asia/0a94c2ef-8ffc-4b1e-bc92-1f163e720bf4.png

## 3.3 Update dữ liệu file googlesheet
```
require "bundler"
Bundler.require

session = GoogleDrive::Session.from_service_account_key("client_secret.json")

spreadsheet = session.spreadsheet_by_title("Học Sinh")
worksheet = spreadsheet.worksheets.first # lấy ra sheet đầu tiên trong file googlesheet

puts "updating"

worksheet["B3"] = "Name Updated"
worksheet.save

puts "updated"

```
Chạy `bundle exec ruby spreadsheet.rb` ta có Kết quả
![](https://images.viblo.asia/7d3d90d9-f55c-4858-82d0-41ec531e1a29.png)

## 3.4 Remove dữ liệu file googlesheet
```
require "bundler"
Bundler.require

session = GoogleDrive::Session.from_service_account_key("client_secret.json")

spreadsheet = session.spreadsheet_by_title("Học Sinh")
worksheet = spreadsheet.worksheets.first # lấy ra sheet đầu tiên trong file googlesheet

puts "deleting"

worksheet.delete_rows(4, 2) # remove 2 line tính từ line thứ 4
worksheet.save

puts "deleted"
```
Chạy `bundle exec ruby spreadsheet.rb` ta có Kết quả
![](https://images.viblo.asia/b628c84f-9485-4261-b0ca-f5f65b6570a8.png)

# Tài liệu tham khảo
https://www.youtube.com/watch?v=VqoSUSy011I