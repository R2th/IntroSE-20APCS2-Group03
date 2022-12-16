Xin chào, mình đã trở lại rồi đây. Ở phần này mình sẽ tiếp tục chia sẻ cách tích hợp con Simsimi vào chatwork. Nếu ai chưa xem Phần 1 thì có thể xem ở [link này ](https://viblo.asia/p/chatwork-webhook-tich-hop-ai-simsimi-vao-chatwork-phan-1-Ljy5VmMklra)nhé :
# Tài khoản chatwork của bot và kết nối rails :gear: :hammer_and_wrench:
-Botchat đơn thuần là một tài khoản chatwork, vậy nên việc đầu tiên cần làm là tạo một tài khoản chatwork

-Sau khi tạo và đăng nhập, ở góc trái ta chọn "Tích hợp"
![](https://images.viblo.asia/ac7963f5-733d-48b2-ab5f-203072360c90.png)

-Tiếp theo ta chọn API, sau đó nhập password để hiển thị Token

-Token API này chính là chìa khóa để app rails của chúng ta có thể login vào tài khoản chatwork con bot và thao tác trên đó
Tại file .env ta thêm 1 biến môi trường.(Các bạn cũng có thể khai báo biến trực tiếp ở controller cho nhanh gọn lẹ)
```
CHATWORK_API_TOKEN = "chatwork_api_token bạn vừa lấy đc"
```

Tiếp theo, tạo ngay một controller, ở đây mình để tên là webhook_controller.rb
Trên đầu file thêm vào 2 dòng sau
`require "chatwork"`
`require 'uri'`

![](https://images.viblo.asia/fe25a9a2-02fd-445a-9fe2-2cf980778440.png)

Vì mình đặt API_Token ở .env nên mình sẽ tạo thêm một hàm load cái api_token đó và cho nó luôn chạy trước tiên

![](https://images.viblo.asia/2737b0d4-30c1-4109-925d-68bcf829213d.png)

# Tạo tài khoản simsimi và lấy key :old_key:
-Nói sơ về API Simsimi này thì nó có 2 bản Trial và Paid, bản Paid thì phải trả tiền nó sẽ có nhiều tính năng hơn và thông minh hơn. Ở đây mình là dev nghèo nên chỉ dám xài bản free (khoc). Giới hạn của bản free là chỉ đc 7days và 100 requests thôi. 
Các bạn [vào đây](http://developer.simsimi.com/api) đăng ký tài khoản và lấy key nhé

Sau khi điền form tất tần tật này nọ (điền cho có thôi chứ cũng không quan trọng đâu :D ) thì sẽ vào đây, ở đây có key, sau khi active thì nó sẽ bắt đầu tính ngày. Hết 7 ngày thì nghỉ chơi :D
![](https://images.viblo.asia/1c494202-79a6-44f0-a686-efc9139f0cdb.png)
(key ở trên hết hạn rồi nha :rofl: )
Xong. Tạm thời để cái key đó tí tính tiếp ha!
# Xử lý Payload :computer:
-Như đã nói ở phần trước, body request được gửi cho API từ webhook có dạng json. Những data này còn được gọi là payload

-Đầu tiên, ta cần khai báo route để cho chatwork webhook gửi dữ liệu về mỗi khi có event xảy ra trên chatwork. Tại file routes.rb ta thêm
```
post "/payload" => "webhook#payload"
```

Như vậy, mỗi khi webhook có sự kiện thì nó sẽ gửi data về action payload ở trong webhook_controller.rb
    
Payload đơn giản mà nói thì là một hash đa cấp, nên chúng ta xử lý nó như những params thông thường. Để lấy id account mention đến chatbot, room id, hoặc message id ta chỉ cần params[:webhook_event]+key cần gọi

![](https://images.viblo.asia/8df77405-952c-43f1-8b2b-32e2e517312a.png)

Ở đây mình đặt biến luôn cho tiện xử lý
Các bạn cũng biết, tin nhắn mention đến một ai đó ở cw có tạng "[to:account_id] Đoạn text tin nhắn". Bước này, mình tính toán và cắt "Đoạn text tin nhắn" ra riêng, mục đích là để gửi cho API simsimi để nó xử lý
![](https://images.viblo.asia/f759c3cb-1fb7-4701-8247-edee15230234.png)

Tới đây là xong 50% rồi đấy, chỉ cần bạn kết nối internet cho app server, sau đó mention con bot thì data đã đc gửi đến action payload rồi :3 

# Xử lý Simsimi
Tiếp theo, mình tạo một class Simsimi ở tại lib/simsimi.rp như sau
![](https://images.viblo.asia/e7233aa6-515f-4fe6-a91c-ca953535d918.png)

Biến mess chính là đoạn tin nhắn mình đã tách ở phía trên, truyền vào đây để gửi cho server simsimi xử lý
bên trong hàm là API request, tất cả đều dễ hiểu đúng không nào, ta có *request["X-Api-Key"]* chính là key simsimi mới đăng ký ở trên, let's bỏ vào thôi :3 

```
    res = JSON.parse response.body
    res["atext"]
```
Cuối action ta trả về res[atext], cũng chính là đoạn text reply của Simsimi.

Quay lại webhook controller, mình gọi và gắn biến cho đoạn text đó sao cho con bot sẽ reply lại người đã mention nó.
![](https://images.viblo.asia/7ed424f8-4637-4087-b8ac-9a04c510ab45.png)

Cuối cùng là gọi api chatwork, truyền vào room_id và đoạn reply. XONGGGGGGGGGGGG................. 90%!

# Chạy app server trên internet 
Ở đây các bạn có thể deploy lên một server hoặc sử dụng ngrok để đưa app lên internet (Để Webhook chatwork trả data về được )

Sau khi app đã chạy thành công, các bạn [vào đây](https://www.chatwork.com/service/packages/chatwork/subpackages/webhook/list.php) và Create New một webhook
Ở đây field webhook URL các bạn điền URL để gọi đến payload của app là ok(dưới hình là mình ví dụ, chứ mình deploy ở heroku =))))) ).
![](https://images.viblo.asia/8a1ca42d-d6ca-42bb-9f81-943f43eaa945.png)


Bonus: Nếu các bạn chưa từng sử dụng heroku thì mình để link hướng dẫn ở đây nhé: https://viblo.asia/p/cach-tao-va-deploy-mot-ung-dung-don-gian-len-heroku-Az45bAjOlxY
# Demo
Lúc trước chạy ngrok thì ok ngon lành cả rồi nhưng hiện tại thì ngrok đã bị chặn, mình cũng đã deploy lên heroku nhưng vì một vài sự cố  nên con bot tạm thời đã tèo, hứa sẽ update demo sớm nhất có thể (Chắc chắn rồi vì mình cũng đang nóng lòng xem nó chửi lộn với anh chị em trên chatwork mà :D )

Update: Mình đã deploy thành công ở heroku. Để cho tiện thì mình show tòan bộ controller ở đây, chỉ cần ntn là nó chạy ngon lành nhé. 
![](https://images.viblo.asia/4f67f891-e6de-4478-b998-8ed85af60a90.png)
Đây là thành quả =)) Hình như bản free trial bị giới hạn IQ của em nó, em nó rep rất tiết kiệm từ luôn.
![](https://images.viblo.asia/127a4756-60be-4f56-9461-48cebd15e39d.png)

# Kết 
Đơn giản phải không nào, tuy không mất nhiều công sức, nhưng con bot nói xàm này lại có thể mang lại kha khá value cho mọi người. Mình có mẹo nhỏ để sử dụng bản free trial là đăng ký cùng lúc nhiều tài khoản, sau đó lấy tất cả keys cho vào một mảng rồi cho rails tự động dùng dần, cứ hết 100 requests thì lại tự động đổi key là ok :D mỗi 1 tuần tốn công vào thay key 1 lần thôi :D
Cám ơn các bạn đã đọc, chúc các bạn vui vẻ! :sunflower::sunflower::sunflower:

Tham khảo: 
- https://viblo.asia/p/tao-chatbot-cho-chatwork-voi-api-simsimi-va-java-eW65G2eYlDO
- https://viblo.asia/p/web-hook-la-gi-cac-khai-niem-co-ban-ve-webhook-yMnKMOpjl7P