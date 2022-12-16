# I. Giới thiệu
## 1. Facebook Graph API là gì
### 1.1. Định nghĩa về API
Trước tiên để hiểu Facebook API là gì thì ta cũng cần hiểu về khái niệm API. API (Application Programming Interface) là giao diện lập trình ứng dụng, nó là phương thức để kết nối với các thư viện và ứng dụng khác. Window, Google, Twitter... đều có API riêng. Với API này ta có thể tạo ra các ứng dụng bằng cách sử dụng tính năng hoặc dữ liệu hiện có trên máy chủ của họ.

### 1.2. Định nghĩa về Facebook API

Facebook API là nền tảng do Facebook cung cấp cho người viết ứng dụng để dễ dàng trong việc tạo ứng dụng và đảm bảo người viết ứng dụng không can thiệp quá sâu vào hệ thống của Facebook.

Thông qua Facebook API, ta có thể lấy được thông tin về người dùng như là danh sách bạn bè, thông tin cá nhân, ảnh profile.... nếu như họ cấp quyền cho ta truy cập trang cá nhân của họ.

Facebook sẽ gửi một phương thức POST đến máy chủ Facebook API.  Nó bao gồm một số các thông số yêu cầu như api_key của ứng dụng, session_key của người dùng đưa ra yêu cầu. Bên cạnh đó Facebook còn thêm vào tham số fb_sig để thông báo ứng dụng đưa ra yêu cầu. Bằng cách này tất cả các lời gọi API sẽ được đảm bảo, Facebook có thể xác minh các yêu cầu được gửi từ một ứng dụng đã được chấp thuận.

### 1.3. Định nghĩa về Facebook Graph API
Graph ở đây chính là đồ thị. Graph sinh ra để miêu tả quan hệ giữa các thực thể.
![](https://images.viblo.asia/9c7428e7-de93-48a1-b9a3-983a4ebc7ba2.png)

Facebook coi các mối quan giữa các thực thể như là một "Đồ thị xã hội" (Social Graph).

Facebook Graph API là cách chủ yếu để tải dữ liệu vào và lấy dữ liệu ra từ đồ thị xã hội của Facebook. Đó là một HTTP API cấp thấp mà bạn có thể sử dụng để truy vấn dữ liệu, post status, tải lên hình ảnh và một loạt các nhiệm vụ khác. 
## 2. Cấu trúc Facebook Graph API
Graph API được đặt tên theo ý tưởng "đồ thị xã hội" - đại diện cho các thông tin trên Facebook. Nó bao gồm:

1. `nodes` (nút): là các đối tượng riêng như là người dùng, ảnh, trang cá nhân, bình luận...
2. `edges` (cạnh): là các kết nối giữa những đối tượng riêng ở trên, ví dụ như kết nối hình ảnh và trang chứa hình ảnh đó, bình luận và bức ảnh được bình luận...
3. `fields` (trường): dữ liệu của đối tượng riêng ở trên, ví dụ như tên, ngày sinh của người dùng, tên trang...

Vì vậy mà chúng ta sử dụng Graph API là để:
1. Sử dụng `nodes` để lấy dữ liệu về đối tượng cụ thể.
2. Sử dụng `edges`để lấy tập hợp các đối tượng khác được kết nối với `node`.
3. Sử dụng `fileds` để chỉ định dữ liệu mà bạn muốn có trong phản hồi từ Facebook.

### 2.1.HTTP
Graph API dựa trên HTTP nên API này hoạt động với bất cứ ngôn ngữ nào có thư viện HTTP, chẳng hạn như cURL và urllib. Bạn cũng có thể sử dụng Graph API ngay trong trình duyệt của mình.

Ví dụ: https://graph.facebook.com/facebook/picture?redirect=false tương đương với thực hiện yêu cầu cURL sau:
```
curl -i -X GET \
 "https://graph.facebook.com/facebook/picture?redirect=false&access_token={valid-access-token-goes-here}"
```
### 2.2. Access token (mã truy cập)
Bạn có thể nhận thấy tham số `access_token` trong yêu cầu ở URL trên. Hầu hết các yêu cầu của Graph API đều yêu cầu access token và cách dễ nhất để lấy access token là bắt người dùng đăng nhập Facebook từ ứng dụng của bạn.
### 2.3. URL lưu trữ
Hầu như tất cả các yêu cầu đều được chuyển đến URL lưu trữ graph.facebook.com. Chỉ có video tải lên sử dụng graph-video.facebook.com.
### 2.4. Objects ID
Mỗi `node` có một ID duy nhất để truy cập thông qua Graph API. Để có thông tin về node, bạn phải truy vấn trực tiếp đến ID của node đó.
```
GET
graph.facebook.com /{node-id}
 ```
 Nếu muốn lấy dữ liệu cụ thể (fields) về một node, bạn có thể thêm tham số `fields` và chỉ định trường mà mình muốn có trong phản hồi trả về. Chẳng hạn bạn muốn lấy email của một đối tượng (node) thì bạn cần truy vấn như sau:
 ```
 GET
graph.facebook.com /{node-id}?fields=email
 ```
 
 Hầu hết các `node` đều có `edges` (cạnh). Nó có thể trả về tập hợp các đối tượng được kết nối với `node` đó. Để truy vấn một cạnh, bạn có thể sử dụng cả ID node và tên cạnh. Ví dụ bạn muốn truy vấn cạnh `photos` của node:
 ```
 GET
 graph.facebook.com/{node-id}/photos
 ```
 
 Một số `node` cho phép bạn cập nhật trường bằng thao tác POST. Ví dụ nếu bạn là admin của trang Facebook, bạn có thể cập nhật trường `descriptions` như sau:
 ```
POST
graph.facebook.com /{node-id}?description=haha
```

Bạn cũng có thể xóa 1 node bằng cách thực hiện thao tác DELETE trên ID node:
```
DELETE
graph.facebook.com/{node-id}
```

# II. Hướng dẫn sử dụng Graph API
Đầu tiên, bạn hãy truy cập vào trang dành cho người phát triển: https://developers.facebook.com/

Nếu bạn chưa có ứng dụng trên Facebook thì có thể search cách tạo ứng dụng nhé.

Đi tới Graph API Explorer bằng cách chọn More > Tools > Graph API Explore hoặc truy cập vào link này:
https://developers.facebook.com/tools/explorer/
![](https://images.viblo.asia/040ac0c5-d2a4-4868-877f-78302fdce34b.png)

Để ý trong trang này, bạn sẽ thấy có 4 phần quan trọng cần chú ý:
1. `Access Token`: Là mã gửi lên server. Nếu bạn đang login 1 tài khoản Facebook thì giá trị này sẽ được hiển thị mặc định cho tài khoản đó. Với từng ứng dụng sẽ có mã mặc định khác nhau.
2. `URL` gửi lên server để nhận thông tin trả về. Mặc định là `/me?fields=id,name`
3. Sau khi nhấn thử `Submit`, ở bên trái màn hình, bạn có thể chọn `fields` tùy thích để test thử.
4. Bên phải màn hình là kết quả trả về sau khi bạn gửi request.

![](https://images.viblo.asia/29e3885d-8082-469a-9997-897f7cdfebf3.png)

Bình thường ứng dụng chỉ được phép truy cập public profile của người dùng, nếu bạn muốn truy vấn thêm thì cấp thêm quyền bằng cách kích vào button Get Token > Get User Access Token. Nó sẽ hiển thị 1 popup gồm các quyền như là user_friends (lấy danh sách bạn bè), user_birthday (lấy ngày sinh của người dùng), user_link (lấy link trong trang cá nhân)...
Khi cấp 1 quyền nào đấy thì sẽ mở ra 1 hộp thoại với nội dung như sau:
![](https://images.viblo.asia/ede5a01e-619e-498f-ade1-d06f792d7a96.png)

Trường hợp trên là mình cấp quyền get list friends.
Sau khi cấp quyền, bạn chọn fields là `friends` và submit thì sẽ nhận được danh sách bạn bè cùng sử dụng ứng dụng với mình.

Vì bài vẫn còn ngắn nên mình sẽ lảm nhảm thêm về `Access token`.
## Access token
Khi ai đó kết nối với một ứng dụng bằng cách Đăng nhập vào Facebook và đồng ý cấp quyền truy cập cho ứng dụng thì lúc đó ứng dụng sẽ lấy được mã truy cập tạm thời của người dùng đó.

Mã truy cập là một chuỗi xác định người dùng, ứng dụng hoặc trang. Ứng dụng có thể dùng mã đó để thực hiện lệnh gọi Graph API. 

 Bạn có thể lấy mã truy cập bằng nhiều phương thức. Phần sau của tài liệu này sẽ nêu từng phương thức. Mã bao gồm thông tin về thời gian mã sẽ hết hạn và ứng dụng đã tạo mã đó. Vì kiểm tra quyền riêng tư, phần lớn các lệnh gọi API trên Facebook đều cần có mã truy cập. Mã truy cập có các loại khác nhau để hỗ trợ các trường hợp sử dụng khác nhau.
 
 Có 3 loại mã truy cập là:
 
 - Mã truy cập người dùng: dùng để thay mặt một người  sửa đổi hoặc ghi dữ liệu Facebook của người đó
 - Mã truy cập ứng dụng: dùng để đăng hành động trong Open Graph
 - Mã truy cập trang: dùng để sửa đổi dữ liệu thuộc về 1 trang Facebook
 
Sở dĩ gọi là mã truy cập tạm thời vì mã truy cập có 2 loại:
- Mã ngắn hạn: Thường có thời hạn khoảng 1 đến 2 giờ.
- Mã dài hạn: Thường có thời hạn khoảng 60 ngày.

 Các thời hạn này sẽ không giữ nguyên, bạn không nên dựa vào đó - thời hạn có thể thay đổi mà không có cảnh báo hoặc có thể hết hạn sớm.
 Mã truy cập được tạo bằng cách đăng nhập web thường là mã ngắn hạn nhưng bạn cũng có thể chuyển thành mã dài hạn bằng cách thực hiện lệnh gọi API phía máy chủ cùng với secret key của ứng dụng.
 
 Sau khi có mã truy cập, bạn có thể sử dụng mã này để thực hiện gọi lệnh từ ứng dụng di động, trình duyệt web hoặc từ máy chủ của bạn đến máy chủ của Facebook.  Nếu mã được lấy trên ứng dụng, bạn có thể chuyển mã đó xuống máy chủ và dùng trong lệnh gọi máy chủ đến máy chủ. 
 Hiện giờ mình thấy đều phải sử dụng HTTPs để lấy được mã truy cập. Thế nên mình phải sử dụng ngrok để public host, chuyển từ localhost sang HTTPS.
 
 Vậy thôi, bài viết của mình sẽ dừng lại ở đây. Cảm ơn các bạn đã đón đọc!
 
 > Tham khảo:
 >1. https://developers.facebook.com/docs/graph-api/using-graph-api
 >2. https://developers.facebook.com/docs/facebook-login/access-tokens/