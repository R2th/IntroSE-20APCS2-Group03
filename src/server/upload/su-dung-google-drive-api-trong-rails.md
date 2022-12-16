![](https://images.viblo.asia/626d6baf-b3f9-40a6-a00f-6157024f5d32.png)
Các bạn có lẽ đã ít nhiều nghe về hoặc làm việc với [google drive](https://developers.google.com/drive/) rồi. Nhưng hôm nay mình sẽ giới thiệu 1 số chức năng sử dụng google drive thường dùng.

Trong Rails chúng ta có gem "google-api-client" để hỗ trợ thao tác với google drive. Xem chi tiết tại [https://github.com/googleapis/google-api-ruby-client](https://github.com/googleapis/google-api-ruby-client)
1. Install gem:
```
gem 'google-api-client', '~> 0.11'
```
Sau đó chạy 
```
bundle install
```

2. Sử dụng
Tạo 1 service để gọi mỗi lần cần connect đến API:
 `services/google_drive_service.rb:`
 ```
 require 'google/apis/drive_v2'
 
 
class GoogleDriveService
  def initialize(session)
    @session = session
    @credentials = session[:credentials]
  end

  def drive
    drive = Google::Apis::DriveV2::DriveService.new
    client_opts = JSON.parse(@credentials)
    auth_client = Signet::OAuth2::Client.new(client_opts)
    #Authentication
    .........
    drive.authorization = auth_client
    drive
  end
end
 ```
 * [List files](https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/DriveV2/DriveService#list_files-instance_method):
```
drive = GoogleDriveService.new(session).drive
query = "('root' in parents and trashed = false or sharedWithMe = true)"
query += " and fullText contains '#{params[:search]}'" if params[:search].present?
query = {
  max_results: 25,
  q: query
}
file_drives = drive.list_files(query)
```
Bạn hãy xem đoạn code trên:

Câu query trên sẽ lấy ra tất cả các file được shared với tài khoản google drive đang sử dụng.
**Warning**: Mặc định hàm list file sẽ trả về tất cả các file(bao gồm cả những file đã xóa nằm trong trash) nên để lấy chỉ những file thật sự cần ta thêm điều kiện `trashed=false`.

Câu query trên cũng trả về những file theo điều kiện search name chứa: params[:search] mà client gửi lên.
Bây giờ đã có list, bạn có thể sử dụng tùy theo nhu cầu, vd như hiển thị list file, phân trang, embed file vào hệ thống để có thể chỉnh sửa như đang làm việc với file trên google drive. 

* [Get file](https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/DriveV2/DriveService#get_file-instance_method):
```
drive = GoogleDriveService.new(session).drive
file = drive.get_file(file_id, fields: 'id, title, iconLink, alternateLink, thumbnailLink, mimeType, owners, embedLink, labels')
```
file_id: là ID của file cần lấy info

fields: là các fields cần lấy ra, VD đoạn code trên lấy ra các thông tin: id, iconlink, owners, ambedLink...của file
* [List comment](https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/DriveV3/DriveService#get_comment-instance_method):
```
google_drive_service = Google::Apis::DriveV2::DriveService.new
#authorization
....
authorization.refresh!
google_drive_service.authorization = authorization
comment_infor = google_drive_service.list_comments(file_id, page_token: page_token)
```
file_id: ID của file muốn get.
page_token: Mã lưu từ page trước để có thể tiếp tục request lên page tiếp theo.

* [Copy file](https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/DriveV3/DriveService#copy_file-instance_method):

Hàm copy file được sử dụng khi bạn được share quyền trên file nhưng bạn muốn tạo 1 file giống hệt trên drive của mình để có thể sử dụng riêng mà k bị thay đổi bởi owner của file đó:
```
drive_service = GoogleDriveService.new(session).drive
file = drive_service.copy_file(file_id, fields: 'id, title, iconLink, alternateLink, thumbnailLink, mimeType, owners, embedLink, parents')
```
fields: Các field được chỉ rõ trong response trả về sau khi file được copy

* [Create permission](https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/DriveV3/DriveService#create_permission-instance_method):

Vấn đề về permission khá quan trọng khi làm việc với các file clound. Không thể lúc nào tạo file cũng để quyền public được :D!
```
role = :writer
user_permission = {
  type: 'user',
  role: role,
  email_address: email,
  send_notification_email: false
}
drive_service = GoogleDriveService.new(session).drive
drive_service.create_permission(file_id, user_permission, fields: 'id', transfer_ownership: true, &callback)
```
type: Loại user được cấp quyền

role: quyền được cấp, ở đây là quyền chỉnh sửa

email_address: email người được cấp quyền tham chiếu đến

send_notification_email: có gửi mail thông báo sau khi set lại permission không


**Summary**: 

Về cơ bản chỉ cần những hàm như trên thì đã có thể đủ các thao tác thực hiện với files trong google drive rồi. Để tìm hiểu rõ hơn các bạn tham khảo full document tại:
[https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/DriveV3](https://www.rubydoc.info/github/google/google-api-ruby-client/Google/Apis/DriveV3)