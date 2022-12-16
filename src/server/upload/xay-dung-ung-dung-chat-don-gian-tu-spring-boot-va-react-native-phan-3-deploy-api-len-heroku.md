Sorry cho những bạn theo dõi bài của mình, vì lâu quá mới lên phần mới, sợ chủ đề nó nguội cha cmnr  :sweat_smile: :sweat_smile: :sweat_smile:. 2 tuần nay bận sml với dự án công ty, cộng thêm mắc virus c…úm, và thêm cái tính lười nó nổi dậy :cold_sweat: :cold_sweat: :cold_sweat: . Mình có tật là nếu làm việc quá nhiều và căng thẳng, là sau đó não muốn đi…nghỉ dưỡng :expressionless: :expressionless: :expressionless:, mọi người có giống như vậy không? :stuck_out_tongue_winking_eye: :stuck_out_tongue_winking_eye: :stuck_out_tongue_winking_eye:

Bài viết này gồm có 4 phần:
-	[Dựng Database với Heroku PostgreSql](https://viblo.asia/p/xay-dung-ung-dung-chat-don-gian-tu-springboot-va-react-native-phan-1-dung-database-voi-heroku-postgres-L4x5xL2O5BM)
-	[Xây dựng API cho ứng dụng Chat với Spring Boot](https://viblo.asia/p/xay-dung-ung-dung-chat-don-gian-tu-springboot-va-react-native-phan-2-xay-dung-api-cho-ung-dung-chat-voi-springboot-WAyK87gk5xX)
-	***Deploy API lên Heroku***
-	Xây dựng giao diện Chat đơn giản trên điện thoại với React Native

#### Kiến thức nền cho phần này:
-	Test API bằng các công cụ hỗ trợ như Postman, TalendAPI,… (Trong phần này, mình sẽ minh họa bằng TalendAPI)
Bắt đầu thôi!

#### Bước 1: Cài đặt Heroku-cli
Bước này là vô cùng quan trọng nhé. Nếu bạn nào là tín đồ commandline thì nên cài đặt để có thể tận dụng các câu lệnh của heroku. Riêng mình thì dùng để coi log và điều tra bug phát sinh. Truy cập tại [đây](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) để có thể cài đặt.

![Imgur](https://i.imgur.com/9hHSGBb.png)

Ngoài ra, các bạn có thể tham khảo trước một số câu lệnh của heroku tại [đây](https://devcenter.heroku.com/articles/heroku-cli).

#### Bước 2: Cài đặt TalendAPI

Ở bước này chúng ta cần có một công cụ để test API. Đa phần mình thấy mọi người hay sử dụng postman, tuy nhiên gần đây sếp mình có chỉ thêm một công cụ rất hay gọi là TalendAPI, là một chrome extension. Gọn nhẹ và cài đặt nhanh, sử dụng cũng không quá phức tạp, sử dụng một khoảng thời gian thì mình cảm thấy vô cùng tiện lợi. Tuy nhiên, bạn nào cảm thấy postman xài ngon và phù hợp rồi, cứ xài hén.
Cài đặt tại [đây](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm) bạn nhé.

![Imgur](https://i.imgur.com/wjbVF8U.png)

#### Bước 3: Deploy API lên Hero

Như trong phần 1 mình đã trình bày cách đăng ký app cũng như xây dựng database cho app, các bạn hãy truy cập lại Dashboard của bản thân trên Heroku và làm theo các bước như sau:

![Imgur](https://i.imgur.com/aG2gyob.png)

Bước 0: Vào dashboard của App chitchatapi-app
Bước 1: Chuyển qua tab ***Deploy***
Bước 2: Kết nối với tài khoản Github của bạn
Bước 3: Nhập tên Repository trên Github
Bước 4: ***Search*** với tên vừa nhập ở bước 3
Bước 5: Sau khi ra kết quả, nhấp ***Connect***

![Imgur](https://i.imgur.com/dml7QIt.png)

Sau khi Connect thành công, hãy nhấp ***Deploy Branch***.

![Imgur](https://i.imgur.com/NTLw1qz.png)

Click ***View*** sau khi deploy thành công và lưu ý hãy nhớ đường dẫn để chúng ta có thể test API ở bước 5.

#### Bước 4: Mở heroku server log

Trong khi chúng ta test API, có khả năng nhiều sẽ gặp lỗi, vì vậy chúng ta sẽ chạy câu lệnh heroku show log trước.
Mở cmd và gõ câu lệnh sau: ***heroku logs –tail –app=your_project_name*** (trong ***your_project_name*** là tên app bạn đăng ký)

![Imgur](https://i.imgur.com/LjdgIAH.png)

Bạn cứ giữ nguyên màn hình commandlined để có thể coi log khi chúng ta đang test API nhé.

#### Bước 5: Test API bằng TalendAPI

Ở bước này mình sẽ chủ yếu test 2 Controller quan trọng và cơ bản nhất: lấy toàn bộ messages và thêm một message mới.

***Lấy toàn bộ Messages***

![Imgur](https://i.imgur.com/ANtJT8I.png)

Lưu ý đúng các thông tin sau:
- **METHOD: GET**
- **SCHEMA: url app của bạn + “/messages”**

Sau khi bấm ***Send*** ta nhận được ***Response code 200*** với danh sách các messages mà chúng ta đã thêm vào trong Database ở [phần 1](https://viblo.asia/p/xay-dung-ung-dung-chat-don-gian-tu-springboot-va-react-native-phan-1-dung-database-voi-heroku-postgres-L4x5xL2O5BM)

***Thêm một message mới***

![Imgur](https://i.imgur.com/6sulbXN.png)

- **METHOD: GET**
- **SCHEMA: url app của bạn + “/message/chat”**
- **HEADERS: Content-Type: application/json**
- **BODY**:

```json
{
  "username": "naked", //your username
  "password": "123",
  "messages": "oh yess",
  "status": 1
}
```

Sau khi bấm **Send**, ta nhận được **Response code 201** và nhận được danh sách messages mới bao gồm message ta mới thêm vào ở trên.

Trong quá trình deploy và test, nếu bị gặp trở ngại gì, đừng ngần ngại comment bên dưới và chụp thêm cho mình cái log của heroku server, chúng ta sẽ cùng giải quyết với nhau nhé :smile: :smile: :smile: