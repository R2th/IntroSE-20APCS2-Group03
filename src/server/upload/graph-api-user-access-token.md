# I, Access token trong Graph API là gì ?
Access token là một chuỗi được sinh ngẫu nhiên giúp xác định người dùng, ứng dụng hoặc trang và ta có thể dùng mã đó để thực hiện lệnh gọi Graph API.

Phần lớn những mã này sẽ được dùng bên trong ứng dụng mà các developer tạo ra, tuy nhiên để test, ta cũng có thể dùng HTTP request tương tác đến Graph API.

Hầu như các câu lệnh gọi đến Graph API đều cần đến access token nên nó rất quan trọng đối với việc truy vấn thông tin từ Graph API. Có đến 4 loại access token khác nhau dùng cho tùy trường hợp cụ thể, tuy nhiên hôm nay ta sẽ chỉ đề cập đến user access token - loại token được sử dụng phổ biến nhất.

# II, User access token:
User token là loại mã được sử dụng phổ biến nhất. Bạn cần có loại mã truy cập này bất cứ khi nào ứng dụng gọi API để đọc, sửa đổi hoặc ghi dữ liệu Facebook của một người cụ thể thay mặt họ. 

Bạn thường lấy được user access token qua hộp thoại đăng nhập và cần người dùng cho phép ứng dụng lấy mã đó.

Sau đây là một ví dụ về user token:

```bash
curl -i -X GET \
 "https://graph.facebook.com/{your-user-id}
   ?fields=name,email
   &access_token={your-user-access-token}"
```

Câu lệnh trên gửi một GET request lên graphAPI để lấy về email và name của user, tất nhiên đấy là trong trường hợp user đã xét duyệt quyền lấy các thông tin này cho ứng dụng.

**Đối với các app khác nhau, user token của cùng một user là khác nhau**

# III, Các loại user access token:

Có đến 2 loại user access token, 1 loại là short-lived và 1 loại là long-lived:

## 1.  **Short-lived:** 

   Là loại mã ngắn hạn, chỉ có hiệu lực trong 2 giờ kể từ thời điểm nó được tạo ra. Quyền của mã này cũng hạn chế hơn so với loại long-lived. 

   Để lấy mã này, ta cần có luồng hoạt động như sau:

![](https://images.viblo.asia/b94d3cfb-979f-4d0b-bc2c-24c5d5396e32.png)

Đầu tiên thì khi user click vào nút "Đăng nhập bằng Facebook" trên website của mình, ta sẽ sử dụng SDK hoặc dùng JS để gửi request lên Facebook. Nếu lúc đó user chưa đăng nhập Facebook thì sẽ phải đăng nhập qua Login Dialog từ Facebook, cũng như xét duyệt các quyền mà ứng dụng yêu cầu. Sau khi người dùng xét duyệt ứng dụng, token sẽ được gửi về và chuyển hướng user đến redirect_url đã đăng ký trước đó.

**Cách lấy mã short-lived đối với các ứng dụng web:**

Trước khi sử dụng các cách dưới đây, ta cần tạo một ứng dụng trên Facebook và cài đặt như bài viết [này](https://viblo.asia/p/co-che-dang-nhap-ung-dung-web-app-bang-tai-khoan-facebook-code-vi-du-djeZ183YKWz), sau đó các bạn hãy copy app ID và app secret từ ứng dụng mình đã tạo để sử dụng ở các bước sau.

### Sử dụng JS SDK:

Đối với các lấy short-lived access token bằng SDK, các bạn có thể tham khảo qua bài viết [này](https://developers.facebook.com/docs/javascript/quickstart), hoặc có rất nhiều nguồn trên Internet hướng dẫn về việc đăng nhập facebook bằng SDK, việc lấy access token cũng nằm trong các bước đăng nhập facebook bằng SDK.

Tuy nhiên, không nên lạm dụng SDK, bởi vì sau khi lấy được user access token, do không thể tương tác với DB nên SDK sẽ lưu token đó vào trong cookie - cũng nguy hiểm chẳng kém việc lưu password vào cookie là bao. 

Mình khuyến khích các bạn sử dụng cách sau đây.

### Sử dụng HTTP request:

Bằng cách sử dụng HTTP request, ta được quyền tự do điều chỉnh cách tương tác của ứng dụng đối với token. Từ đó ta có thể lưu các token này vào đâu là tùy ý.

1. Tạo GET request tới đường dẫn sau:

```bash
curl -i -X GET \
    "http://graph.facebook.com/oauth/authorize?
        client_id={app-id-của-bạn}&
        scope={các-quyền-mong-muốn-từ-user}&
        redirect_uri={redirect-uri-đã-thiết-lập-khi-tạo-ứng-dụng}&
        response_type=token"
```

Trong đó các quyền có thể yêu cầu user trong param "scope" có thể xem ở list sau:

![](https://images.viblo.asia/4a3475ad-df51-474d-8bcb-1a5358023ac2.png)

Sau khi tạo request từ ứng dụng, user sẽ thấy dialog yêu cầu cấp quyền cho ứng dụng (nếu user đã đăng nhập Facebook, còn chưa thì yêu cầu user đăng nhập):

![](https://images.viblo.asia/a9574285-68db-4795-a93c-284ae53e6210.png)

Cuối cùng thì user được redirect về redirect uri mà ứng dụng của ta đã đăng ký cũng như gửi qua params kèm theo GET request ban nãy. Tuy nhiên lúc này nếu bạn để ý trên thanh url sẽ có dạng như sau:

```bash
"https://{redirect-uri}?access-token={access-token-được-trả-về-từ-facebook}"
```

Ta sẽ dùng JS hoặc ngôn ngữ server side bạn đang sử dụng để xử lý params truyền về này. Logic xử lý thế nào thì tùy bạn, tuy nhiên hãy lưu access token này trên server chứ đừng lưu ở client.

## 2, **Long-lived:**

Mã dài hạn có thời gian hiệu lực là 60 ngày (đối với các ứng dụng sử dụng Marketing API của Facebook thì nó có hiệu lực vĩnh viễn), và cần có mã dài hạn để lấy được Page/APP access token của các page/app mà user đó quản lý.

Để lấy được mã long-lived, ta cần có mã short-lived bằng cách lấy đã đề cập bên trên. Cùng với đó ta cũng cần có app ID và app secret của ứng dụng do ta tạo ra.

Sau khi có các thông tin bên trên, ta thực hiện lấy mã dài hạn bằng cách thực hiện HTTP request sau:

```bash
curl -i -X GET \
    "https://graph.facebook.com/oauth/access_token?
        grant_type=fb_exchange_token&
        client_id={app-id}&
        client_secret={app-secret}&
        fb_exchange_token={user-short-lived-token}"
```

> **Không nên gửi request này từ phía client mà hãy gửi từ phía server**

Vì sao lại như vậy ? Vì trong request có chứa app secret, mà việc chuyển app secret về phía client thì còn gì là secret nữa phải không ? Hacker có được app secret sẽ rất nguy hiểm.

Dữ liệu trả về sẽ là 1 file json có cấu trúc như sau:

```json
{
    "access_token": "...",
    "token_type": "..."
}
```

Access token trong file json đó chính là long-lived access token mà chúng ta cần lấy.

# Sử dụng user access token:

Những token này chắc chắn là để sử dụng trong Graph API rồi, vậy thử nghía qua một vài ví dụ nhé:

### 1, Yêu cầu thông tin cá nhân của người dùng:
Đây chính là ví dụ ở đầu mà ta đã đề cập đến:

```bash
curl -i -X GET \
  "https://graph.facebook.com/{your-user-id}
    ?fields=birthday,email,hometown
    &access_token={your-user-access-token}"
```

**Lưu ý** là nếu như đang yêu cầu thông tin của chính user sở hữu token đó, ta thay phần {your-user-id} bằng "me" là được, không cần phải là id của user đó.

Ngoài ra ta cũng có thể yêu cầu truy cập ảnh của user:

```bash
curl -i -X GET \
  "https://graph.facebook.com/{your-user-id}/photos
    ?access_token={your-user-access-token}"
```

Dữ liệu trả về sẽ có dạng như sau:

```json
{
  "data": [
    {
      "created_time": "2016-08-23T13:12:10+0000",
      "id": "1308573619175349"        // Photo ID
    },
    {
      "created_time": "2016-08-05T22:34:19+0000",
      "id": "1294456907253687"        // Photo ID
    },
    {
      "created_time": "2016-04-29T16:17:02+0000",
      "id": "1228552183844160"        // Photo ID
    }
  ]
}
```

###  2, Yêu cầu App/Page access token:

Để lấy được app/page access token do user đó quản lý, ta cần các điều kiện sau:

* Trong GET request gửi lên, ở phần "scope", ta phải yêu cầu các quyền "**manage_pages**" và "**publish_pages**"
* Ta phải có được long-lived user access token

Ta gửi request như sau lên Graph API:

```bash
curl -i -X GET \
  "https://graph.facebook.com/me/accounts?
      access_token={long-lived-user-access-token}"
```

Ta sẽ nhận được file JSON như sau:

```json
{
   "data": [
      {
         "access_token": "...",
         "category": "Software",
         "category_list": [
            {
               "id": "...",
               "name": "..."
            }
         ],
         "name": "...",
         "id": "...",
         "tasks": [
            "ANALYZE",
            "ADVERTISE",
            "MODERATE",
            "CREATE_CONTENT",
            "MANAGE"
         ]
      }
   ]
}
```

Từ đó ta sẽ lấy được page/app ID của page mà mình muốn lấy access token, sau đó việc lấy page/app access token rất đơn giản bằng request sau:

```bash
curl -i -X GET \
  "https://graph.facebook.com/my_page_id?
      fields=access_token&
      access_token={long-lived-user-access-token}"
```

# Tài liệu tham khảo:

1. https://developers.facebook.com/docs/facebook-login/access-tokens
2. https://developers.facebook.com/docs/graph-api/using-graph-api/