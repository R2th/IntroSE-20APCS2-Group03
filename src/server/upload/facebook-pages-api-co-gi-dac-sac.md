# I. Đặt vấn đề
Nếu bạn đang xây dựng một trang web đồng thời cũng đang quản lý một trang Fanpage trên facebook để xây dựng hình ảnh cho trang web đó thì quản lý fanpage qua api mà chính Facebook cung cấp là việc khá là hiệu quả, giúp chúng ta tiết kiệm thời gian, dễ dàng quản lý fanpage hơn. Bài viết này mình sẽ thống kê lại những gì mình tìm hiểu được về Facebook Pages API mà mình đã tìm hiểu được trong vài hôm trước và trong bài viết mình sẽ tập trung chính vào giai đoạn lấy mã truy cập của Trang (page access tokens), thứ mà mình nghĩ là tốn nhiều thời gian và quan trọng hơn cả. Bắt đầu thôi <3 

# II. Page Access tokens và vai trò
## 1. Access Tokens
Access token là một đoạn mã được sinh ra ngẫu nhiên và sử dụng bí mật cho mỗi người dùng, ứng dụng khi thực hiện các thao tác quan trọng hay truy cập vào tài khoản của người dùng. Trong trường hợp này, bạn có thể hiểu access token như một đường hầm bí mật để đi vào ngôi nhà của bạn. Các hình thức xác thực như username, password giống như khóa và chìa khóa cửa nhà của bạn và access token sẽ không đi qua cánh cửa này.

Access token là chuỗi không rõ xác định người dùng, bất cứ ai có đoạn mã đó đều có thể thực hiện các chức năng mà đoạn mã đó cho phép. Ứng dụng hoặc trang có thể dùng mã đó để thực hiện lệnh gọi API và có thể lấy access token bằng nhiều phương thức khác nhau.

Khi ai đó kết nối với một ứng dụng bằng hình thức đăng nhập facebook, ứng dụng đó có thể lấy access token cung cấp quyền truy cập tạm thời, an toàn vào API facebook.

Mã truy cập mặc định của User và Page là short-lived, thông thường sẽ hết hạn trong vòng vài giờ kể từ khi được tạo ra. Tuy nhiên, nếu muốn dùng trong thời gian dài, chúng ta có thể tạo ra một long-lived access token dựa trên short-lived access token. Long-lived access token thường hoạt động trong khoảng thời gian 60 ngày và quyền hạn cũng cao hơn short-lived.

Để lấy mã truy cập cho trang mình sử dụng [Graph API](https://developers.facebook.com/tools/explorer) của facebook.

Bước 1: Truy cập trình khám phá đồ thị (Graph API Explorer): https://developers.facebook.com/tools/explorer.

Bước 2: Chọn ứng dụng bạn cấp quyền

Bước 3: Lấy mã Get token: Trong phần "Người dùng hoặc Trang" chọn trang muốn lấy access token

Bước 4: Ở phần quyền, chọn manage_pages và publish_pages

Bước 5: Lấy id của page. Ví dụ link dẫn dến trang là https://www.facebook.com/Testtt-114687390091699 thì id của trang sẽ là *114687390091699*

Bước 6: Điền như hình ở dưới rồi chọn Gửi
![](https://images.viblo.asia/8a01238c-744d-4f1a-9dba-e722c6fc8d98.png)

Kết quả: 
![](https://images.viblo.asia/a6f3d6bb-1c72-4444-ab27-3afb9fa2b1b3.png)




Mã truy cập được tạo qua đăng nhập [web](https://developers.facebook.com/tools/explorer/) là mã ngắn hạn nhưng bạn có thể chuyển các mã đó thành mã dài hạn bằng cách thực hiện lệnh gọi API qua mã truy cập dài hạn của quản trị viên.

Lấy mã truy cập dài hạn cho người dùng:
```
GET "https://graph.facebook.com/{graph-api-version}/oauth/access_token?  
    grant_type=fb_exchange_token&          
    client_id={app-id}&
    client_secret={app-secret}&
    fb_exchange_token={your-access-token}" 
```
- client_id: id của app liên kết với trang
- client_secret: khóa bí mật của ứng dụng liên kết đến trang
- fb_exchange_token: access token của người dùng lấy trên trang https://developers.facebook.com/tools/accesstoken/

**Lấy mã truy cập dài hạn cho Trang:**

Yêu cầu: 
- Mã truy cập dài hạn của người dùng
- Người dùng đó phải có ít nhất một vai trò trên trang đó



Request:
```
GET "https://graph.facebook.com/{graph-api-version}/{user-id}/accounts?access_token={long-lived-user-access-token}"
```

Response:
```
{ "data":[ { "access_token":"{long-lived-page-access-token}", "category":"Brand", "category_list":[ { "id":"1605186416478696", "name":"Brand" } ], "name":"Cute Kitten Page", "id":"{page-id}", "tasks":[ "ANALYZE", "ADVERTISE", "MODERATE", "CREATE_CONTENT", "MANAGE" ] } ], "paging":{ "cursors":{ "before":"MTM1MzI2OTg2NDcyODg3OQZDZD", "after":"MTM1MzI2OTg2NDcyODg3OQZDZD" } } } 
```

Theo mình tìm hiểu thì chúng ta cũng có thể lấy mã truy cập của trang mà không phải lo đến thời hạn sử dụng vì nó không bao giờ hết hạn, magic thật sự. Nhưng cách này có một điểm hạn chế là phải cung cấp mã truy cập dài hạn cho một bên thứ ba để đổi lấy một mã không có hạn sử dụng, sẽ ra sao nếu trang đó lấy mã truy cập dùng để làm những việc khác, vấn đề chỉ còn lại ở niềm tin mà thôi :v 

Để lấy mã truy cập trang không hết hạn thì bạn vào trang https://www.sociablekit.com/app/convert_token_to_never_expire.php rồi dán mã truy cập dài hạn mà mình đã hướng dẫn ở bước trên là xong, nhớ nhấn vào debug để xem kết quả nhé.

![](https://images.viblo.asia/08ac39b8-a27c-463e-8599-cfc1b347f43d.png)


## 2. Tasks
Facebook chia nhỏ các công việc của mỗi người quản lý trang bằng các task, từ đó có thể .Task được miêu tả như một nhóm các công việc cụ thể của người dùng liên quan đến Trang, có thể hiểu theo roles. Ví dụ một người có vai trò quảng cáo trang thì sẽ có các công việc như tạo quảng cáo, bài viết lên Trang, xem thông tin chi tiết của Trang...


| Task | Các hành động được phép | 
| -------- | -------- | -------- |
| ADVERTISE | Tạo quảng cáo và bài viết chưa đăng trên Trang | 
| ANALYZE | Xem thông tin chi tiết | 
| CREATE_CONTENT | Tạo bài viết với tư cách Trang | 
| MANAGE | Phê duyệt và quản lý tác vụ trên Trang cho Người dùng | 
| MODERATE | Trả lời và xóa bình luận, gửi tin nhắn với tư cách Trang | 

Có 6 loại vai trò khác nhau cho những người quản lý Trang, mỗi một vai trò sẽ bao gồm các Tasks khác nhau:

| Vai trò | Tác vụ tương đương | 
| -------- | -------- | -------- |
| Admin | ADVERTISE, ANALYZE, CREATE_CONTENT, MANAGE, MODERATE | 
| Advertiser | ADVERTISE, ANALYZE | 
| Analyst | ANALYZE | 
| Editor | ADVERTISE, ANALYZE, CREATE_CONTENT, MODERATE | 
| Moderator | ADVERTISE, ANALYZE, MODERATE | 

## 3. Permissions


| Quyền | Khả năng |
| -------- | -------- |
| manage_pages     | Cho phép ứng dụng của bạn truy xuất Mã truy cập Trang cho các Trang và Ứng dụng mà người đó quản trị     |
| publish_pages     | Giúp ứng dụng có khả năng đăng, bình luận và thích như bất kỳ Trang nào mà người dùng ứng dụng của bạn quản lý     |
| read_page_mailboxes     | Mang lại khả năng đọc từ Hộp thư trên Trang của các Trang do một người quản lý     |
| pages_show_list     | Cấp quyền truy cập để hiển thị danh sách Trang mà bạn quản lý     |
| pages_manage_cta     | Cấp quyền truy cập để quản lý các nút kêu gọi hành động của Trang mà bạn quản lý     |
| pages_manage_instant_articles     | Cho phép ứng dụng quản lý Bài viết tức thời thay mặt Trang Facebook mà người đó quản trị     |

Vì phần này khá là dài nên mình sẽ để link
[ở đây](https://developers.facebook.com/docs/facebook-login/permissions#reference-manage_pages)
để các bạn qua tham khảo


# III. Posting to a Page
Khi đã lấy được page access token, thì dựa vào đó chúng ta có thể đăng bài viết, hẹn lịch đăng bài viết, sử dụng webhooks để nhận thông báo, tin nhắn hoặc thậm chí là đi comment dạo như một người dùng bình thường. Dưới đây, mình chỉ liệt kê ra những thao tác cơ bản đó là đăng bài viết và comment với tư cách fanpage.
## 1. Contents

**Yêu cầu:**

- Là Admin của Trang
- Access token với quyền manage_pages và publish_pages

Để thực hiện đăng bài, chúng ta cần phải tạo một request tới graph.facebook.com

```
POST https://graph.facebook.com/id_page/feed
  ?message=Content of post
  &access_token=your-access-token
```

**Response**

Kết quả trả về chứa ID của bài viết
```
{
  "id": "114731276753977"
}
```


Từ ID của bài viết, ta có thể suy ra liên kết đến bài viết đó bằng cách thêm vào sau url của facebook:
```
https://www.facebook.com/114731276753977
```

Xóa bài viết:
```
DELETE https://graph.facebook.com/id_post
  ?access_token=your-access-token
```

Response
```
{
  "success": true
}
```

## 2. Links
Chức năng này cho phép chia sẻ các đường dẫn lên fanpage chính vì vậy mình thường dùng nó với mục đích duy nhất là share các bài viết ngoài facebook lên fanpage. Tương tự như phần trên, request có phần message cho phần nội dung nhưng có thêm phần link - đường dẫn đến bài viết mà bạn muốn đăng.
```
POST https://graph.facebook.com/id_page/feed
  ?message=Meow
  &link=www.viblo.asia
  &access_token=your-access-token
```

Response
```
{
  "id": "546349135390552_1116691191689674"
}
```

![](https://images.viblo.asia/c7871f99-d4ae-429e-9844-e3d9df99bf8d.png)
## 3. Photos/Videos
Chức năng này sẽ giúp bạn đăng ảnh hoặc video lên trên fanpage, ảnh sẽ xuất hiện trong dòng thời gian cũng như album ảnh của Trang, Video sẽ xuất hiện trong dòng thời gian của Trang cũng như tab Pages | Videos. Khác với 2 phần trên, chức năng này sử dụng phương thức post qua graph api. 

**Ảnh**
```
POST https://graph.facebook.com/{page-id}/photos  
```
Response
```
{
  "id":"1116692661689527", //photo ID
  "post_id":"546349135390552_1116692711689522"
}
```

**Video**
```
POST https://graph.facebook.com/546349135390552/videos    
```
Response
```
{
  "id":"1116696891689104"
}
```

## 4. Comment to a post
Đây là một chức năng khá là hay ho trong một số trường hợp chúng ta muốn comment tự động với tư cách của Trang.
**Yêu cầu:**
- Access token với các quyền manage_pages và publish_pages
- Vai trò là Admin của Trang
- ID của bài viết mà bạn muốn thêm bình luận

Request
```
POST https://graph.facebook.com/546349135390552_1129650603727066/comments
  ?message=Nice post!
  &access_token=page-access-token
```

Response
```
{
  "id":"1129650603727066_1139628382729288"
}
```

## 5. Publishing content
Khi đăng một bài viết bạn có thể lựa chọn thời gian đăng ngay lập tức, hẹn thời gian để bài viết tự đăng khi đến lịch hẹn hoặc tạm thời lưu bài viết đó dưới dạng nháp mà chỉ mình bạn xem được. Phân chia như vậy sẽ giúp chúng ta có thể quản lý bài viết dễ hơn, lên ý tưởng, chọn giờ để đăng...
### - Published content
Đây là loại mặc định của bài viết, bài viết được đăng ngay lập tức trên trang và cách làm mình đã hướng dẫn ở phần trên
### - Unpublished content
Bài viết được lưu lại và chỉ những người có vai trò trên trang mới có thể xem và sửa được, người dùng có thể quyết định thời gian đăng sau này. Để làm điều đó chúng ta chỉ việc thêm tùy chọn ```published = false``` trong request
```
POST https://graph.facebook.com/id_page/feed
  ?published=false
  ?message=Content of post
  &access_token=your-access-token
```

### - Scheduled post
Bài viết sẽ được lưu dưới dạng unpublished và khi đến hạn sẽ tự động được publish. Điều này khá là hữu dụng khi chúng ta muốn lên lịch đăng nội dung vào một khoảng thời gian nhất định, tạo ra một kế hoạch sẵn và cũng tránh trường hợp quên đăng đối với những đứa hay quên như mình.

Để tự động đăng bài viết, chúng ta đặt tùy chọn ```published = false``` và sử dụng trường ```scheduled_publish_time``` để cung cấp thời gianđăng, có thể chọn các định dạng dưới đây:

- Dấu thời gian UNIX bằng số nguyên [bằng giây] (ví dụ: 1530432000).
- Chuỗi mốc thời gian theo tiêu chuẩn ISO 8061 (ví dụ: 2018-09-01T10:15:30+01:00).
- Mọi chuỗi có thể phân tích cú pháp bằng strtotime() của PHP (ví dụ: +2 weeks, tomorrow)*.

*Lưu ý:* nếu đang dựa vào chuỗi ngày tương đối của strtotime(), bạn có thể đọc sau khi ghischeduled_publish_time của bài viết đã tạo để đảm bảo đó chính là điều bạn mong muốn.

# IV. Tài liệu tham khảo
https://developers.facebook.com/docs/pages