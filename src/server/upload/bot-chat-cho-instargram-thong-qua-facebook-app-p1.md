# Lời nói đầu
Gần đây mình có dịp nghịch ngợm chút xíu với instargram và học được thêm một chút kiến thức về việc tạo bot chat tự động với instargram, nên hôm nay mình muốn chia sẻ luôn với mọi người về nó , việc này giúp mình note lại được những điều đã học hỏi được (Có gì sau quên cũng có cái mà đọc lại) . Những điều mình viết dưới đây dựa trên kiến thức hạn hẹp của bản thân . Nên nếu mọi có gì sai sót mọi người bỏ qua và comment thêm giúp mình để bài viết hoàn thiện hơn nhé ! Nào, triển thôi :D
# Nội dung
Vì để tạo bot có kha khá việc bạn cần quan tâm, nên mình sẽ chia nhỏ làm nhiều bài. Ở nội dung bài viết ngày hôm nay mình sẽ trình bày:
- Những điều cần chuẩn bị trước khi bắt tay vào làm
- Setup Facebook Login
-  Get the Page Access Token

> Bài viết này mình viết với điều kiện bạn đã quen thuộc với [Graph API](https://developers.facebook.com/docs/graph-api/) và [Facebook Login](https://developers.facebook.com/docs/facebook-login/), đồng thời biết cách thực hiện việc call API REST . 

> Nếu các bạn thấy thực sự cần thiết 1 bài về 2 đồng chí nói trên thì đón chờ những bài khác thuộc seri bot chat của nhé. Mình sẽ có 1 bài về bot chat với facebook (Nếu các bạn thật sự quan tâm)

## Trước khi bắt đầu bạn cần chuẩn bị những thứ sau .
Bạn cần có một số thứ sau :

- Một tài khoản instargram thuộc loại `Business Account` ([Bạn có thể vào đây để có hướng dẫn tạo tài khoản](https://help.instagram.com/502981923235522?fbclid=IwAR0ApI4wOIFKYBiYUkRQqL7yH44jgEtpTG6k0EY4DkOl8vjQWWSIyeE1ik8))
- Tạo một facebook page và kết nối page đó với tài khoản instargram bên trên  ([Bạn có thể vào đây để xem hướng dẫn](https://knowledgebase.constantcontact.com/articles/KnowledgeBase/35023-Connect-an-Instagram-Business-Profile-to-a-Facebook-Business-Page?lang=en_US))
- Tạo một app trên [https://developers.facebook.com/](https://developers.facebook.com/)  

Khi bạn đã có đủ những dữ kiện nói trên thì ta bắt đầu nhé !

## I, Config Facebook Login.

Đầu tiên, bạn cần vào app bạn vừa mới tạo trên https://developers.facebook.com/ của bạn :
- Click vào tab `Dashboard` bên trái
- Kéo xuống và nhìn vào block `Add Products to Your App`
- Add `Facebook Login` vào app của bạn

![](https://images.viblo.asia/b8d2187f-1030-416b-9e5d-a7dc2e1bd020.png)

- Click vào `Settings`
-  Ở đây có rât nhiều optional bạn hay đọc kĩ nhé , còn để đơn giản thì cứ để mặc định các optional đấy nhé
-  Một điều quan trọng , nếu bạn có 1 hệ thống riêng (kiểu build 1 app để chạy và facebook là bên t3 chỉ để lấy thông tin) thì bạn cần điền `Valid OAuth Redirect URIs`  (Chắc ae làm facebook login nhiều rồi thì biết, còn ai chưa biết thì mình sẽ làm 1 bài chia sẻ sau nhé)
-  `Facebook Login` là điều kiện bắt buộc để bạn có truy cập các tài nguyên của facebook , đây là bước đệm cho những bước tiếp theo

## II,  Get the Page Access Token via Instagram Developer Dashboard Tool
Để dễ dàng hơn, chúng ta có thể lấy trực tiếp access_token cho page bằng cách sau :
- Vào lại app của bạn  trên https://developers.facebook.com/
- Click vào tab `Dashboard` bên trái
- Kéo xuống và nhìn vào block `Add Products to Your App`
- Add `Messenger` vào app của bạn
- Click instagram Setting 
![](https://images.viblo.asia/8de07f4b-3107-4762-adae-5de81507bed3.png)

-  Click `Add or Remove Page` để thêm hoặc xóa page liên kết với tài khoản Instargram vào nhé 
-  Sau đó click button `Generate Token` như hình bên . Vậy là bạn đã có token để connect với Facebook Page và Instagram rồi

## III :  Enable Message Control Connected Tools Settings

Để quản lý message của  Instagram qua API, tài khoản `Instagram Business Account` sẽ cần bật chuyển đổi các công cụ được kết nối trong cài đặt control tin nhắn.
![](https://images.viblo.asia/e47980cd-2090-423b-bd7a-84e6e5e89da8.png)

## IV:  Get the Instagram Business Account's Inbox Objects

Lấy All cuộc hội thoại của tài khoản instagram , chúng ta chỉ cần sử dụng API sau :

```
curl -i -X GET \
 "https://graph.facebook.com/v9.0/17841405822304914/conversations?platform=instagram&access_token={access-token}"  
```

Và kết quả sẽ là 

```
{
  "data": [
    {
      "id": "aWdfZAG06MTpJR01lc3NhZA2VUaHJlYWQ6OTAwMTAxNDYyOTkyODI6MzQwMjgyMzY2ODQxNzEwMzAwOTQ5MTI4MTM2MDk5MDc1MzYyOTgx"
    },
    {
      "id": "aWdfZAG06MTpJR01lc3NhZA2VUaHJlYWQ6OTAwMTAxNDYyOTkyODI6MzQwMjgyMzY2ODQxNzEwMzAwOTQ5MTI4MTYzMzQ2MzE5NjM1NDcy"
    },
    {
      "id": "aWdfZAG06MTpJR01lc3NhZA2VUaHJlYWQ6OTAwMTAxNDYyOTkyODI6MzQwMjgyMzY2ODQxNzEwMzAwOTQ5MTI4MTk3MTY0NjI2NzAyMjMw"
    },
    {
      "id": "aWdfZAG06MTpJR01lc3NhZA2VUaHJlYWQ6OTAwMTAxNDYyOTkyODI6MzQwMjgyMzY2ODQxNzEwMzAwOTQ5MTI4MzkzNDI5MDYzMzkyNjU0"
    }
}
```

## V:  Add webhook to track message to Instagram 

Nếu bạn muốn track các tin nhắn đến một cách realtime, bạn có thể sử dụng webhook của Message Instagram. 

Việc bạn cần làm là cung cấp webhook cho Instagram (https nhé), và instagram sẽ call đến webhook này mỗi khi tài khoản của bạn nhận được tin nhắn. Và từ đó bạn có thể lên các kịch bản bot cho instagram nhé !

![](https://images.viblo.asia/4bf6facf-f08e-47b4-921d-f5b7818ce837.png)

# Lời kết
Ok, đến đây mình tạm kết thúc bài viết , trong bài viết sau mình sẽ trình bày cách setup webhook và push message để tạo thành 1 cơ chế nhận và trả lời tin nhắn của Bot hoàn thiện. Đồng thời sẽ có demo code 1 em bot cụ thể.
Cám ơn các bạn đã quan tâm !

# Tài liệu
https://developers.facebook.com/docs/messenger-platform/instagram/get-started