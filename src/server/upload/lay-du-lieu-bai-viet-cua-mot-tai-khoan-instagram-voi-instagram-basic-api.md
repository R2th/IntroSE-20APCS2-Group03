Vừa qua mình có làm một task nho nhỏ về việc cập nhật thông tin bài viết của một tài khoản instagram xác định. Trong quá trình làm mình tìm thấy 1 vài hướng và cuối cùng chốt lại sử dụng Instagram Basic API. Bài viết là sự tổng hợp những gì bản thân mình đã tìm hiểu trong quá trình làm task

## I. Giới thiệu
[Instagram Basic Display](https://developers.facebook.com/docs/instagram-basic-display-api/overview) là một HTTP-based API được xây dựng nhằm cung cấp một giao diện cho phép các ứng dụng có thể lấy thông tin về tài khoản của người dùng như bài viết, ảnh, video hay album.

### 1. Các API thành phần
Instagram Basic Display bao gồm 2 API thành phần chính
- `api.instagram.com`: sử dụng để xác thực và lấy token của người dùng
- `graph.instagram.com`: sử dụng để lấy token dài hạn cũng như thông tin của người dùng và thông tin của người dùng

### 2. Các quyền cần thiết
#### a. instagram_graph_user_profile
Quyền [instagram_graph_user_profile](https://developers.facebook.com/docs/instagram-basic-display-api/overview/permissions#instagram-graph-user-profile) cho phép ứng dụng có thể đọc được các thông tin cơ bản của một tài khoản người dùng bao gồm
- id
- username
- account_type
- media_count

Quyền này cũng cần thiết để truy cập được tới media của người dùng
#### b. instagram_graph_user_media
Quyền [instagram_graph_user_media](https://developers.facebook.com/docs/instagram-basic-display-api/overview/permissions#instagram_graph_user_media) cho phép ứng dụng đọc các thông tin media của người dùng như ảnh, video hay album cũng như các edge liên quan.

Quyền này cần được cấp cùng với quyền *instagram_graph_user_profile*

Các trường có thể có của một media bao gồm
- id
- caption
- media_type (IMAGE, VIDEO hay CAROUSEL_ALBUM)
- media_url
- permalink
- thumbnail_url (chỉ cho kiểu VIDEO)
- timestamp
- username

### 3. Rate Limit
Ứng dụng bị hạn chế theo giờ là `200 * số lượng người dùng`

## II. Sử dụng cơ bản
### 1. Thiết lập ứng dụng
Việc đầu tiên, API này cung cấp giao diện cho các ứng dụng nên đương nhiên là phải khởi tạo một ứng dụng đã. Truy cập tới trang  [Meta for developers](https://developers.facebook.com/). Nếu chưa có tài khoản developer hãy tạo mới 1 cái.

Vào màn hình *My Apps*

![image.png](https://images.viblo.asia/4f5653d3-d0c9-42a4-b4c7-4d842a97017e.png)

Tiếp theo là khởi tạo một ứng dụng. Có thể chọn *không có* cho linh hoạt vì chúng ta chỉ sử dụng Instagram Basic Display thôi.

![image.png](https://images.viblo.asia/31604552-ec83-47dc-9650-a52937db67a4.png)

Sau khi nhập xong các thông tin cần thiết, tại màn ứng dụng, chọn instagram basic display

![image.png](https://images.viblo.asia/fb07e377-1658-4d49-97ef-e8ca665a0915.png)

Tiếp theo điền các thông tin cần thiết cho ứng dụng ở **Settings** > **Basic**

![image.png](https://images.viblo.asia/ff769950-1336-4dc5-808c-3fe3a01be82c.png)

Thêm một platform (ở đây mình chọn web)

![image.png](https://images.viblo.asia/6b18d498-a707-42c2-8702-e37b8b2426cf.png)

Bây giờ thì khởi tạo 1 ứng dụng instagram basic display 

![image.png](https://images.viblo.asia/00c82bf3-cfab-4a5a-8d59-61bd043bb235.png)

Điền các url cần thiết

![image.png](https://images.viblo.asia/07ca1982-bd59-4630-8192-4be64fe3fcaf.png)

Cấp các quyền cần thiết

![image.png](https://images.viblo.asia/d65cfd33-5a16-4da6-ba68-f015f3e33ab0.png)

### 2. Tạo instagram basic display tester
Sau khi đã điền xong các thông tin cần thiết, có thể tạo tester để bắt đầu sử dụng api. Tại màn hình quản lý, vào **Roles > Roles**

![image.png](https://images.viblo.asia/68c0c815-c835-4b7b-bfd5-d085b8e0c3e2.png)

Tại phần *Instagram Testers*, khởi tạo một tester cho ứng dụng (khác tài khoản developer)

![image.png](https://images.viblo.asia/dd87898b-7c71-43ce-9c12-bc07d5d200d5.png)

Đăng nhập vào tài khoản tester, vào **Settings > Apps and Websites > Tester Invites** và chấp nhận.

![image.png](https://images.viblo.asia/ce1d3aed-a053-42ec-ba9f-9be61c746a60.png)

### 3. Khởi tạo access token
Việc setup đã xong, giờ là lúc lấy access token để làm việc rồi. Sử dụng tài khoản tester truy cập tới đường dẫn 

```
https://api.instagram.com/oauth/authorize
  ?client_id={instagram-app-id}
  &redirect_uri={redirect-uri}
  &scope={scope}
  &response_type=code
  &state={state} (có thể có hoặc không)
```

Tại màn hình cấp quyền chọn *Allow*

![image.png](https://images.viblo.asia/68378dc5-5b98-4ad2-9436-d781865c2a7c.png)

Nếu thành công chúng ta sẽ có một code trả về trên đường dẫn redirect

```
{redirect_uri}?code={authorization_code}
```

Sử dụng code vừa rồi để lấy một access token hợp lệ

```bash
curl -X POST \
  https://api.instagram.com/oauth/access_token \
  -F client_id={client_id} \
  -F client_secret={client_secret} \
  -F grant_type=authorization_code \
  -F redirect_uri={redirect_uri} \
  -F code={authorization_code}
```

Nếu thành công, ta sẽ có access token trong dữ liệu gửi về dưới dạng

```json
{
  "access_token": "{access_token}",
  "user_id": {user_id}
}
```

Token này hoàn toàn có thể sử dụng được rồi. Tuy nhiên để ứng dụng có thể sử dụng lâu dài, ta sẽ lấy một token dài hạn hơn

```
curl -i -X GET "https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret={instagram-app-secret}
  &access_token={short-lived-access-token}"
```

Nếu thành công, ta sẽ có một token mới với thời hạn 60 ngày

```json
{
  "access_token":"{long-lived-user-access-token}",
  "token_type": "bearer",
  "expires_in": 5183944  // Number of seconds until token expires
}
```

Token này có thể refesh sau 1 ngày và trước khi hết hạn

```
curl -i -X GET "https://graph.instagram.com/refresh_access_token
  ?grant_type=ig_refresh_token
  &access_token={long-lived-access-token}"
```

### 4. Lấy thông tin cần thiết
Sau khi đã có token thì công việc còn lại khá là đơn giản. Chúng ta sẽ sử dụng `graph.instagram.api` để lấy thông tin của người dùng

#### a. Lấy thông tin profile
Thông tin cơ bản của người dùng có thể lấy tại 

```
GET /me?fields={fields}&access_token={access-token}
```

Xem thêm về user tại [đây](https://developers.facebook.com/docs/instagram-basic-display-api/reference/user)

![image.png](https://images.viblo.asia/632824ad-0f42-4be7-aaec-44a5f38b0637.png)
#### b. Lấy thông tin media
API:

```
GET /me/media?fields={fields}&access_token={access-token}
```

Xem thêm về các fields tại [đây](https://developers.facebook.com/docs/instagram-basic-display-api/reference/media)

![image.png](https://images.viblo.asia/5bc7ce93-2d82-4807-ab12-cdeea22da7a6.png)

#### c. Lấy thông tin các item trong album
Đối với các media_type *CAROUSEL_ALBUM* sẽ có nhiều media, do đó có thể lấy thông tin các media có trong album tại

```
GET /{media-id}/children
```

## III. References
[https://developers.facebook.com/docs/instagram-basic-display-api/](https://developers.facebook.com/docs/instagram-basic-display-api/)