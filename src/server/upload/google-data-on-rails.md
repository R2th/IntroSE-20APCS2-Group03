Chao!

Đến hẹn lại lên, hôm nay mình xin giới thiệu đến các bạn một cách để connect trực tiếp đến Google và gọi ra những API open của nó dễ dàng.

PS. Mình lấy ngôn ngữ là Ruby, framework Rails để làm bài hướng dẫn ạ :D

# Ghét-đing xờ-ta-tít
Chúng ta cần có những cấu hình required: Ruby, RubyGems, Rails trước khi muốn sử dụng gdata cho ứng dụng. Một lưu ý nhỏ ở đây là trên trang tài liệu của Google đang để những phiên bản của Ruby cũng như Rails rất cũ so với thời điểm hiện tại. Nên mọi người khi đọc tài liệu thì có thể linh động chổ này nhé. Dùng version nào đấy cho mới mẻ hơn. ;)

Sau khi có môi trường tốt, bên trong ứng dụng đang phát triển, ta chạy:
```
sudo gem install gdata
```

Sau khi chạy xong câu lệnh này, nếu ai cẩn thận thì có thể chạy tiếp lệnh:
```
 gem list --local
```

để check xem gem đã install okie hay là chưa :D


Cài đặt xong rồi đấy, bạn có thể check version các thứ xem dư lào. Bây giờ mình đi tiếp tới phần Authenticate

# Authentication
Hình dung đơn giản như này nhé: Hiện tại mình đang muốn lấy api từ một ứng dụng đang có sẵn. Bời vậy nên ở góc nhìn của ứng dụng đấy, rõ ràng họ muộn kiểm định và cấp quyền tuy cập cho những request từ bên ngoài rồi. Vậy nên chúng ta cần đăng nhập để có thể access được các request.

Mình thấy ở chổ này nhà phát triển Google nó có lưu ý như thế này: Nếu đang phát triển các ứng dụng cho máy tính để bàn các kiểu(hồi xưa mình có học java swing á :D) thì có thể login bằng CliendLogin. Còn đối với các ứng dụng Web, nên ưu tiên dùng AuthSub hoặc OAuth.

Chúng ta lần lượt đi qua từng kiểu login xem nó như thế nào nhé!

## ClientLogin

Google nó có rất nhiều nền tảng cung cấp api cho khách hàng sử dụng. Những ví dụ điển hình như Gmail, Youtube...Chúng ta sẽ lần lượt login vào từng nền tảng đấy.

Giả sử như ta có một account Google có:

Email: user@gmail.com

Password: "pa$$word"

### Login DocList

```
client = GData::Client::DocList.new
client.clientlogin('user@gmail.com', 'pa$$word')
```

### Login Youtube

```
client = GData::Client::YouTube.new
client.clientlogin('user@gmail.com', 'pa$$word')
```

Nếu bạn muốn login để dùng full list service của Google. Bạn có thể login thằng vô class Base của nó. Nhưng trong trường hợp này thì nên dùng G Suite

```
client_login_handler = GData::Auth::ClientLogin.new('writely', :account_type => 'HOSTED')
token = client_login_handler.get_token('user@example.com', 'pa$$word', 'google-RailsArticleSample-v1')
client = GData::Client::Base.new(:auth_handler => client_login_handler)
```

Lại có một chổ lưu ý ở đây nữa. Đại loại ClientLogin khó có thể passing qua được những login cần CAPTCHA. Điều mình cần làm là add thêm condition CAPTCHA cho các trường hợp này bằng cách gọi method `clientlogin()`

```
client.clientlogin(username, password, captcha_token, captcha_answer)
```

Trong trang tài liệu hướng dẫn của Google, nó có add thêm một link khá hay để các bạn tìm hiểu thêm, mình để lên [ĐÂY](https://developers.google.com/accounts/docs/AuthForInstalledApps#Response) nhé!

## AuthSub

Để dùng AuthSub, đầu tiên các bạn cần generate AuthSubRequest URL trước đã

```
scope = 'http://www.google.com/calendar/feeds/'
next_url = 'http://example.com/change/to/your/app'
secure = false  # set secure = true for signed AuthSub requests
sess = true
authsub_link = GData::Auth::AuthSub.get_url(next_url, scope, secure, sess)
```


Nó sẽ tạo ra link bên dưới trong `authsub_link`:

```
https://www.google.com/accounts/AuthSubRequest?next=http%3A%2F%2Fexample.com%2Fchange%2Fto%2Fyour%2Fapp&scope=http%3A%2F%2Fwww.google.com%2Fcalendar%2Ffeeds%2F&session=1&secure=0
```


Bạn cũng có thể dùng thêm authsub_url cho client object. Mỗi service class đã được set một `authsub_scope` mặc định như bên dưới

```
client = GData::Client::DocList.new
next_url = 'http://example.com/change/to/your/app'
secure = false  # set secure = true for signed AuthSub requests
sess = true
domain = 'example.com'  # force users to login to a G Suite hosted domain
authsub_link = client.authsub_url(next_url, secure, sess, domain)
```

URL tương ứng: 

```
https://www.google.com/accounts/AuthSubRequest?next=http%3A%2F%2Fexample.com%2Fchange%2Fto%2Fyour%2Fapp&scope=http%3A%2F%2Fdocs.google.com%2Ffeeds%2F&session=1&secure=0&hd=example.com
```

###  Dùng session thay cho các authenticate cho single-request.

Bài toán đặt ra ở đây cũng đơn giản thôi. Thay vì với mỗi request lên api. Bạn cần có một token add theo request để thực hiện authent. Và công việc add token được thực hiện lặp đi lặp lại. Thì chúng ta có thể tạo ra một session với một lần access authent duy nhất. Sau đấy trong phiên đăng nhập của session, chúng ta có thể access request thoải mái.

```
client.authsub_token = params[:token] # extract the single-use token from the URL query params
session[:token] = client.auth_handler.upgrade()
client.authsub_token = session[:token] if session[:token]
```


Như đoạn code bên trên ghi rõ. Sau khi nhận parrams token-single request. Ta thực hiện add token đó cho token của một session và tiến hành kiểm tra authent trên session đó. Nếu token tồn tại thì request pass được authenticate.

Sau khi thực hiện tạo được session rồi. Ta cần đưa các giá trị cần bảo mật vào biến môi trường. Trên VD gốc của tài liệu đang viết như này:


```
PRIVATE_KEY = '/path/to/private_key.pem'

client.authsub_token = params[:token]
client.authsub_private_key = PRIVATE_KEY
session[:token] = client.auth_handler.upgrade()
client.authsub_token = session[:token] if session[:token]
```

### Token management

AuthSub cung cấp thêm cho ta 2 handlers để quản lý token: AuthSubTokenInfor và AuthSubRevokeToken. Chứng năng của 2 thằng này là để check thông tin, tính hợp lệ của token và thu hồi.

Bạn có thể nhìn qua 2 ví dụ dưới để thấy

```
client.auth_handler.info
```

```
client.auth_handler.revoke
```

## Accessing feeds

Bây giờ ta xem xét các phương thức gửi request lên api với những ví dụ cụ thể.

### GET (fetching data)



```
feed = client.get('http://docs.google.com/feeds/documents/private/full').to_xml

feed.elements.each('entry') do |entry|
  puts 'title: ' + entry.elements['title'].text
  puts 'type: ' + entry.elements['category'].attribute('label').value
  puts 'updated: ' + entry.elements['updated'].text
  puts 'id: ' + entry.elements['id'].text
  
  # Extract the href value from each <atom:link>
  links = {}
  entry.elements.each('link') do |link|
    links[link.attribute('rel').value] = link.attribute('href').value
  end
  puts links.to_s
end
```


### POST (creating new data)

VD này đang dùng phương thức POST để tạo mới một data trên server. Cụ thể nó thêm mới `new_writer@example.com` vào docs với id là `doc_id`
```
# Return documents the authenticated user owns
feed = client.get('http://docs.google.com/feeds/documents/private/full/-/mine').to_xml
entry = feed.elements['entry']  # first <atom:entry>

acl_entry = <<-EOF
<entry xmlns="http://www.w3.org/2005/Atom" xmlns:gAcl='http://schemas.google.com/acl/2007'>
  <category scheme='http://schemas.google.com/g/2005#kind'
    term='http://schemas.google.com/acl/2007#accessRule'/>
  <gAcl:role value='writer'/>
  <gAcl:scope type='user' value='new_writer@example.com'/>
</entry>
EOF

# Regex the document id out from the full <atom:id>.
# http://docs.google.com/feeds/documents/private/full/document%3Adfrk14g25fdsdwf -> document%3Adfrk14g25fdsdwf
doc_id = entry.elements['id'].text[/full\/(.*%3[aA].*)$/, 1]
response = client.post("http://docs.google.com/feeds/acl/private/full/#{doc_id}", acl_entry)
```

### PUT (updating data)

Tương tự POST. Bạn có thể dùng PUT để update những data mới bạn cần

```
entry = feed.elements['entry'] # first <atom:entry>

# Update the document's title
entry.elements['title'].text = 'Updated title'
entry.add_namespace('http://www.w3.org/2005/Atom')
entry.add_namespace('gd','http://schemas.google.com/g/2005')

edit_uri = entry.elements["link[@rel='edit']"].attributes['href']
response = client.put(edit_uri, entry.to_s)
```


### Delete

Cuối cùng là Delete :D

```
entry = feed.elements['entry'] # first <atom:entry>
edit_uri = entry.elements["link[@rel='edit']"].attributes['href']
client.headers['If-Match'] = entry.attribute('etag').value  # make sure we don't nuke another client's updates
client.delete(edit_uri)
```

Trên đây mình vừa giới thiệu tới các bạn một gem khá hay hổ trợ cho việc connect và sự dụng api của Google từ ứng dụng đang phát triển của bạn.  Mình hy vọng nó sẽ giúp ích cho các bạn khi cần :D

[Tài liệu tham khảo](https://developers.google.com/gdata/articles/gdata_on_rails)